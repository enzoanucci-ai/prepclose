"use client";

import { useState } from "react";
import Link from "next/link";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the "data:image/png;base64," prefix — we only want the raw base64.
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AppealPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suspensionNotice, setSuspensionNotice] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let screenshotBase64: string | undefined;
      let screenshotMediaType: string | undefined;
      if (screenshot) {
        screenshotBase64 = await fileToBase64(screenshot);
        screenshotMediaType = screenshot.type;
      }

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          suspensionNotice,
          accountDetails,
          screenshotBase64,
          screenshotMediaType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
      } else {
        window.location.href = data.url;
      }
    } catch {
      setError("Couldn't reach the server. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-md z-50">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Prepclose
        </Link>
        <span className="text-xs text-gray-500">Amazon Reinstatement Appeal Generator</span>
      </nav>

      <section className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-3">Generate your Plan of Action</h1>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Fill this out, pay $699, and we&apos;ll draft a Plan of Action in the format Amazon&apos;s
          Seller Performance team expects. Review it carefully and edit anything before you submit
          it yourself — this isn&apos;t legal advice, just a strong first draft.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Suspension notice from Amazon
            </label>
            <textarea
              value={suspensionNotice}
              onChange={(e) => setSuspensionNotice(e.target.value)}
              rows={6}
              required
              placeholder="Paste the full email or Seller Central message here..."
              className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Screenshot of the notice (optional)
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-gray-200 file:text-sm hover:file:bg-white/20"
            />
            <p className="text-gray-600 text-xs mt-2">
              Helpful if the notice has details that didn&apos;t copy/paste cleanly. PNG, JPEG, or WebP, under ~4MB.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Anything else Amazon should know (optional)
            </label>
            <textarea
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
              rows={4}
              placeholder="What happened, what you've already fixed, sourcing details, etc."
              className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting to payment..." : "Continue to payment — $699"}
          </button>
        </form>

        {error && (
          <div className="mt-8 p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}
      </section>
    </main>
  );
}
