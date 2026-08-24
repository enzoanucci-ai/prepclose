"use client";

import { useState } from "react";
import Link from "next/link";

export default function AppealPage() {
  const [suspensionNotice, setSuspensionNotice] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [poa, setPoa] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPoa(null);

    try {
      const res = await fetch("/api/generate-poa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suspensionNotice, accountDetails }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setPoa(data.poa);
      }
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
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
          Paste the suspension notice Amazon sent you, add any context about what happened, and
          we&apos;ll draft a Plan of Action in the format Amazon&apos;s Seller Performance team expects.
          Review it carefully and edit anything before you submit it yourself — this isn&apos;t legal
          advice, just a strong first draft.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            {loading ? "Drafting your Plan of Action..." : "Generate Plan of Action"}
          </button>
        </form>

        {error && (
          <div className="mt-8 p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {poa && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Your draft Plan of Action</h2>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 whitespace-pre-wrap text-sm text-gray-200 leading-relaxed">
              {poa}
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Edit this to make sure every detail is accurate before submitting it to Amazon. Amazon
              rejects appeals with inaccurate or unverifiable claims.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
