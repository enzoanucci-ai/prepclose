import Anthropic from "@anthropic-ai/sdk";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { SUSPENSION_CATEGORIES } from "@/lib/suspensionPatterns";
import { getSubmission } from "@/lib/submissionStore";

const client = new Anthropic();

const REFERENCE_LIBRARY = SUSPENSION_CATEGORIES.map((c) => {
  return `### ${c.label}
Common triggers: ${c.triggers.join("; ")}
Typical root causes: ${c.rootCausePatterns.join("; ")}
Effective corrective actions: ${c.correctiveActionPatterns.join("; ")}
Effective preventive actions: ${c.preventiveActionPatterns.join("; ")}`;
}).join("\n\n");

const SYSTEM_PROMPT = `You help suspended Amazon sellers write a Plan of Action (POA) to submit for account reinstatement.

Amazon's Seller Performance team expects a POA with exactly three sections, in this order:
1. Root Cause — a specific, honest explanation of what caused the issue. No excuses, no blaming Amazon or customers.
2. Corrective Actions — the concrete steps already taken to fix the specific issue Amazon flagged.
3. Preventive Actions — the concrete, ongoing steps that will stop this from happening again.

Write in first person as the seller, professional and concise, no filler, no apologetic tone beyond a brief acknowledgment. Amazon rejects vague POAs ("we will do better") — every action must be specific and verifiable.

Use the seller's actual situation as described in their message, including any screenshot of the suspension notice they attached — read it carefully for the exact policy cited and any ASIN/order numbers. Use the reference library below only to recognize the likely suspension category and match the tone/specificity of what works — do not copy it verbatim, adapt it to the seller's real facts. If the seller's situation doesn't clearly match a category, write a general but still specific POA based on what they described.

Reference library of suspension categories:

${REFERENCE_LIBRARY}

Output the POA as plain text with the three headers "Root Cause", "Corrective Actions", and "Preventive Actions", each followed by 2-4 sentences or a short bulleted list. Do not add a greeting, sign-off, or any text outside the three sections.`;

// Simple in-memory rate limit as a second layer of defense against abuse.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests from this connection. Try again in an hour." },
      { status: 429 },
    );
  }

  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  if (!sessionId) {
    return NextResponse.json({ error: "Missing checkout session." }, { status: 400 });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments aren't set up yet on the server." }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Couldn't verify payment for this session." }, { status: 400 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed for this session." }, { status: 402 });
  }

  const submissionId = session.metadata?.submissionId;
  const submission = submissionId ? getSubmission(submissionId) : undefined;
  if (!submission) {
    return NextResponse.json(
      { error: "We couldn't find your submission — it may have expired. Contact enzo@prepclose.com." },
      { status: 404 },
    );
  }

  const { suspensionNotice, accountDetails, name } = submission;

  const userContent: Anthropic.MessageParam["content"] = [
    {
      type: "text",
      text: `Seller name: ${name || "(not provided)"}

Suspension notice from Amazon:
"""
${suspensionNotice}
"""

Additional context from the seller about their account/situation:
"""
${accountDetails || "(none provided)"}
"""

Write the Plan of Action.`,
    },
  ];

  if (submission.screenshotBase64 && submission.screenshotMediaType) {
    userContent.unshift({
      type: "image",
      source: {
        type: "base64",
        media_type: submission.screenshotMediaType as "image/png" | "image/jpeg" | "image/webp",
        data: submission.screenshotBase64,
      },
    });
  }

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 4000,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userContent }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ error: "No response generated. Try again." }, { status: 502 });
    }

    return NextResponse.json({ poa: textBlock.text });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Server is missing a valid ANTHROPIC_API_KEY." },
        { status: 500 },
      );
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Rate limited — try again shortly." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `Claude API error: ${err.message}` }, { status: 502 });
    }
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
