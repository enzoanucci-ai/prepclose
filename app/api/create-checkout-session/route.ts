import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveSubmission } from "@/lib/submissionStore";

const PRICE_CENTS = 69900; // $699

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Payments aren't set up yet on the server." },
      { status: 500 },
    );
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let body: {
    suspensionNotice?: string;
    accountDetails?: string;
    email?: string;
    name?: string;
    screenshotBase64?: string;
    screenshotMediaType?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const suspensionNotice = body.suspensionNotice?.trim();
  const accountDetails = body.accountDetails?.trim() ?? "";
  const email = body.email?.trim();
  const name = body.name?.trim() ?? "";
  const screenshotBase64 = body.screenshotBase64?.trim() || null;
  const screenshotMediaType = body.screenshotMediaType?.trim() || null;

  if (!suspensionNotice || suspensionNotice.length < 20) {
    return NextResponse.json(
      { error: "Paste the suspension notice you received from Amazon (at least a few sentences)." },
      { status: 400 },
    );
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
  if (screenshotBase64 && (!screenshotMediaType || !ALLOWED_IMAGE_TYPES.includes(screenshotMediaType))) {
    return NextResponse.json({ error: "Screenshot must be a PNG, JPEG, or WebP image." }, { status: 400 });
  }
  // Rough cap on decoded size (~4MB) to stay under serverless payload limits.
  if (screenshotBase64 && screenshotBase64.length > 5_600_000) {
    return NextResponse.json({ error: "Screenshot is too large — please use a smaller image." }, { status: 400 });
  }

  const submissionId = randomUUID();
  saveSubmission(submissionId, {
    suspensionNotice,
    accountDetails,
    email,
    name,
    screenshotBase64,
    screenshotMediaType,
  });

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Amazon Reinstatement Plan of Action",
            description: "AI-drafted Plan of Action for your Amazon suspension appeal.",
          },
          unit_amount: PRICE_CENTS,
        },
        quantity: 1,
      },
    ],
    metadata: { submissionId, name: name || "(not provided)" },
    success_url: `${origin}/appeal/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/appeal`,
  });

  return NextResponse.json({ url: session.url });
}
