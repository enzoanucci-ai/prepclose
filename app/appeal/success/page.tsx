"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [poa, setPoa] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing checkout session.");
      setLoading(false);
      return;
    }

    fetch("/api/generate-poa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Something went wrong.");
        } else {
          setPoa(data.poa);
        }
      })
      .catch(() => setError("Couldn't reach the server. Try again."))
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-md z-50">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Prepclose
        </Link>
        <span className="text-xs text-gray-500">Payment confirmed</span>
      </nav>

      <section className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-3">Your Plan of Action</h1>

        {loading && (
          <p className="text-gray-400">Drafting your Plan of Action — this takes about a minute...</p>
        )}

        {error && (
          <div className="mt-4 p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {poa && (
          <div className="mt-4">
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#0a0a0f]" />}>
      <SuccessContent />
    </Suspense>
  );
}
