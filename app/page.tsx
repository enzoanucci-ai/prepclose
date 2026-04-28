import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-md z-50">
        <span className="text-lg font-bold tracking-tight">Prepclose</span>
        <a
          href="https://cal.com/enzo-nucci-wik89x/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
        >
          Book a call
        </a>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-8 pt-28 pb-24 text-center">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Sales Intelligence Automation
          </div>

          <h1 className="text-6xl font-extrabold leading-[1.08] tracking-tight mb-6">
            Your reps should be<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              closing, not researching.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            We automate the intelligence layer between your lead list and your sales calls.
            Every rep walks into every call with a full brief — automatically.
          </p>

          <a
            href="https://cal.com/enzo-nucci-wik89x/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-base font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition shadow-lg shadow-indigo-500/25"
          >
            Book a 20-min call
          </a>

          {/* Mock brief card */}
          <div className="mt-16 max-w-lg mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs text-gray-400 font-medium">Pre-call brief — generated 4 min ago</span>
              </div>
              <span className="text-xs text-indigo-400 font-medium">Acme Corp</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Company", value: "Acme Corp — B2B SaaS, Series B, 120 employees" },
                { label: "Funding", value: "$18M raised — last round 8 months ago" },
                { label: "Hiring signals", value: "3 open SDR roles, VP of RevOps posted last week" },
                { label: "Recent news", value: "Just launched new enterprise tier, expanding to EMEA" },
                { label: "Pain point", value: "Using spreadsheets for lead tracking, no CRM hygiene" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 text-sm">
                  <span className="text-gray-500 w-28 shrink-0">{item.label}</span>
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
          <h2 className="text-3xl font-bold mb-14 text-center">Research is killing your pipeline</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "30 min",
                label: "Average prep time per call",
                sub: "Manually Googling, checking LinkedIn, skimming news. Every rep. Every call.",
              },
              {
                stat: "40%",
                label: "Calls with zero prep",
                sub: "When reps are busy, research gets skipped. They show up cold and the prospect notices.",
              },
              {
                stat: "$0",
                label: "Revenue from bad first impressions",
                sub: "One unprepared call can kill a deal that took weeks of outbound to generate.",
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

      {/* Solution */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-4">What we do</p>
          <h2 className="text-3xl font-bold mb-4 text-center">Everything your reps need, automated</h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Custom pipelines that research every new lead the moment they enter your CRM
            and deliver a brief before the call is scheduled.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: "⚡",
                title: "Lead enrichment",
                desc: "Company size, funding stage, hiring signals, tech stack, recent news — pulled automatically the moment a lead lands.",
              },
              {
                icon: "📋",
                title: "Pre-call brief",
                desc: "A structured one-pager delivered to Slack or email before every call. No manual work. No missed context.",
              },
              {
                icon: "🔍",
                title: "Competitor monitoring",
                desc: "Weekly digest of what your competitors are doing — new features, pricing changes, customer complaints, press mentions.",
              },
              {
                icon: "🔄",
                title: "CRM sync",
                desc: "Enriched data written back to HubSpot or Salesforce automatically. Your CRM stays clean without anyone touching it.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-4">The process</p>
          <h2 className="text-3xl font-bold mb-14 text-center">Up and running in two weeks</h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "We audit your current workflow",
                desc: "One 20-minute call. We map where research is happening manually, where leads come from, and which tools your team uses.",
              },
              {
                step: "02",
                title: "We build the automation",
                desc: "Custom pipeline built on your stack. Firecrawl for web data, Claude for analysis, n8n for orchestration. Delivered in 1-2 weeks.",
              },
              {
                step: "03",
                title: "Your reps get briefs, not busywork",
                desc: "From day one, every new lead gets researched and briefed automatically. Your team just shows up and sells.",
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
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-4">Pricing</p>
          <h2 className="text-3xl font-bold mb-4 text-center">Two ways to work together</h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Same automation stack. Different scope.
          </p>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Tier 1 */}
            <div className="rounded-2xl border border-white/10 p-8 hover:border-white/20 transition">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Starter</p>
              <p className="text-5xl font-extrabold mb-1">$600<span className="text-xl font-medium text-gray-500">/mo</span></p>
              <p className="text-gray-500 text-sm mb-8">Best for early-stage teams and founder-led sales</p>
              <ul className="space-y-3 text-sm text-gray-400 mb-10">
                {[
                  "Pre-call brief for every new lead",
                  "Lead enrichment — company, funding, hiring signals, news",
                  "Delivered to Slack or email",
                  "Onboarding + setup included",
                  "Monthly workflow review",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5 shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://cal.com/enzo-nucci-wik89x/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Get started
              </a>
            </div>

            {/* Tier 2 */}
            <div className="rounded-2xl border border-indigo-500/50 p-8 relative bg-indigo-500/5">
              <span className="absolute -top-3 left-6 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most popular
              </span>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Growth</p>
              <p className="text-5xl font-extrabold mb-1">$4,000<span className="text-xl font-medium text-gray-500"> build</span></p>
              <p className="text-gray-400 text-sm mb-8">+ $1,800/mo — Best for Series A teams with RevOps</p>
              <ul className="space-y-3 text-sm text-gray-400 mb-10">
                {[
                  "Everything in Starter",
                  "Competitor monitoring — weekly digest",
                  "Cold outreach personalization layer",
                  "Full CRM sync — HubSpot or Salesforce",
                  "Lead scoring + inbound routing",
                  "Dedicated Slack channel for support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5 shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://cal.com/enzo-nucci-wik89x/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
              >
                Book a call
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t border-white/10 relative overflow-hidden" id="book">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to stop paying reps<br />to do research?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Book a 20-minute call. We audit your workflow and tell you exactly what can be automated — no pitch, no pressure.
          </p>
          <a
            href="https://cal.com/enzo-nucci-wik89x/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-base font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition shadow-xl shadow-indigo-500/20"
          >
            Book a 20-min call
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-6 flex items-center justify-between text-sm text-gray-600">
        <span className="font-semibold text-white">Prepclose</span>
        <span>Sales intelligence, automated.</span>
      </footer>

    </main>
  );
}
