import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-md z-50">
        <span className="text-lg font-bold tracking-tight">Prepclose</span>
        <Link
          href="/appeal"
          className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
        >
          Start my appeal
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-8 pt-28 pb-24 text-center">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Amazon Account Reinstatement
          </div>

          <h1 className="text-6xl font-extrabold leading-[1.08] tracking-tight mb-6">
            Suspended account?<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Get back in, fast.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            We generate a strong, Amazon-policy-aware Plan of Action in minutes — a fraction of the
            cost and time of hiring a suspension consultant or lawyer.
          </p>

          <Link
            href="/appeal"
            className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-base font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition shadow-lg shadow-indigo-500/25"
          >
            Generate my Plan of Action
          </Link>

          <div className="mt-16 max-w-lg mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-400 font-medium">Plan of Action — draft ready</span>
              </div>
              <span className="text-xs text-indigo-400 font-medium">ASIN suspension</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Root Cause", value: "Sourced inventory from an unverified supplier without invoices proving an authorized supply chain." },
                { label: "Corrective", value: "Removed the affected ASIN, obtained invoices from an authorized distributor covering the last 365 days." },
                { label: "Preventive", value: "Switched to brand-authorized distributors only, added a supplier vetting checklist before any new SKU goes live." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 text-sm">
                  <span className="text-gray-500 w-20 shrink-0">{item.label}</span>
                  <span className="text-gray-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-4">The problem</p>
          <h2 className="text-3xl font-bold mb-14 text-center">A suspension freezes your business overnight</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "28%",
                label: "of new sellers hit a suspension in year one",
                sub: "Inventory and cash get frozen the moment it happens — every day matters.",
              },
              {
                stat: "65%",
                label: "of appeals succeed — if the POA is strong",
                sub: "Amazon rejects vague, generic Plans of Action. Specificity is what gets you reinstated.",
              },
              {
                stat: "$2K+",
                label: "what a suspension lawyer or consultant charges",
                sub: "For a document you can get a strong first draft of in minutes.",
              },
            ].map((item) => (
              <div key={item.stat} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-indigo-500/30 transition">
                <p className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">{item.stat}</p>
                <p className="font-semibold text-white mb-2 text-sm">{item.label}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-4">The process</p>
          <h2 className="text-3xl font-bold mb-14 text-center">From suspension notice to submitted appeal</h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Paste your suspension notice",
                desc: "Drop in the email or Seller Central message Amazon sent you, plus any context on what happened.",
              },
              {
                step: "02",
                title: "We draft your Plan of Action",
                desc: "Root cause, corrective actions, and preventive actions — written in the format and tone Amazon's Seller Performance team expects.",
              },
              {
                step: "03",
                title: "Review, edit, and submit",
                desc: "Check every detail is accurate, make it yours, and submit it through Seller Central. You're always the one who submits.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-indigo-500/30 transition">
                <span className="text-3xl font-extrabold text-white/10 shrink-0 leading-none mt-1">{item.step}</span>
                <div>
                  <p className="font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-white/10" id="pricing">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-3xl font-bold mb-4">One appeal. One price.</h2>
          <p className="text-gray-400 mb-14 max-w-md mx-auto">
            No subscription — you pay once, for the situation you&apos;re in right now.
          </p>

          <div className="rounded-2xl border border-indigo-500/50 bg-indigo-500/5 p-10 mx-auto max-w-sm">
            <p className="text-5xl font-extrabold mb-2">$699</p>
            <p className="text-gray-400 text-sm mb-8">per Plan of Action</p>
            <ul className="space-y-3 text-sm text-gray-400 mb-10 text-left">
              {[
                "Full Plan of Action draft in minutes",
                "Root Cause, Corrective, and Preventive sections",
                "Matched against real Amazon suspension patterns",
                "Unlimited regenerations for this case",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5 shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/appeal"
              className="block text-center bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
            >
              Start my appeal
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Every day suspended is<br />money you&apos;re not making.
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Get a draft Plan of Action in the next five minutes.
          </p>
          <Link
            href="/appeal"
            className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-base font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition shadow-xl shadow-indigo-500/20"
          >
            Generate my Plan of Action
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-6 flex flex-col items-center gap-2 text-sm text-gray-600 text-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Prepclose</span>
          <span>— AI-generated Amazon reinstatement appeals.</span>
        </div>
        <p className="text-xs text-gray-700 max-w-md">
          Not a law firm. We generate a draft Plan of Action for you to review and submit yourself —
          not legal advice.
        </p>
      </footer>

    </main>
  );
}
