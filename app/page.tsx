import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold tracking-tight">Prepclose</span>
        <Link
          href="#book"
          className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-700 transition"
        >
          Book a call
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 pt-24 pb-20 text-center">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
          Sales Intelligence Automation
        </p>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-6">
          Your reps should be closing,<br />not researching.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          We automate the intelligence layer between your lead list and your sales calls.
          Every rep walks into every call with a full brief — automatically.
        </p>
        <Link
          href="#book"
          className="inline-block bg-indigo-600 text-white text-base font-semibold px-8 py-4 rounded-xl hover:bg-indigo-500 transition shadow-lg"
        >
          Book a 20-min call
        </Link>
      </section>

      {/* Problem */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">The problem no one talks about</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "30 min",
                label: "Average prep time per call",
                sub: "Manually Googling, checking LinkedIn, skimming recent news. Every rep. Every call.",
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
              <div key={item.stat} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <p className="text-4xl font-extrabold text-indigo-600 mb-2">{item.stat}</p>
                <p className="font-semibold text-gray-900 mb-2">{item.label}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-4 text-center">What Prepclose does</h2>
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
            We build automated pipelines that research every new lead the moment they enter your CRM
            and deliver a structured brief before the call is scheduled.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Lead enrichment",
                desc: "Company size, funding stage, hiring signals, tech stack, recent news — pulled automatically the moment a lead lands.",
              },
              {
                title: "Pre-call brief",
                desc: "A structured one-page brief delivered to Slack or email before every call. No manual work. No missed context.",
              },
              {
                title: "Competitor monitoring",
                desc: "Weekly digest of what your competitors are doing — new features, pricing changes, customer complaints, press mentions.",
              },
              {
                title: "CRM sync",
                desc: "Enriched data and brief notes written back to HubSpot or Salesforce automatically. Your CRM stays clean without anyone touching it.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 transition">
                <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">How it works</h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "We audit your current workflow",
                desc: "One 20-minute call. We map where research is happening manually, where leads come from, and which tools your team uses.",
              },
              {
                step: "02",
                title: "We build the automation",
                desc: "Custom pipeline built on your stack. Firecrawl for web data, Claude for analysis, n8n for orchestration. Delivered in 1–2 weeks.",
              },
              {
                step: "03",
                title: "Your reps get briefs, not busywork",
                desc: "From day one, every new lead gets researched and briefed automatically. Your team just shows up and sells.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-white p-6 rounded-2xl border border-gray-100">
                <span className="text-3xl font-extrabold text-indigo-100 shrink-0">{item.step}</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20" id="pricing">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Two ways to work together</h2>
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
            Both tiers use the same automation stack. The difference is scope.
          </p>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Tier 1 */}
            <div className="rounded-2xl border border-gray-200 p-8">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Sales Intelligence</p>
              <p className="text-4xl font-extrabold mb-1">
                $900<span className="text-lg font-medium text-gray-400">/mo</span>
              </p>
              <p className="text-gray-500 text-sm mb-8">Best for early-stage teams and founder-led sales</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-10">
                {[
                  "Automated pre-call brief for every new lead",
                  "Lead enrichment (company, funding, hiring signals, news)",
                  "Delivered to Slack or email",
                  "Onboarding + setup included",
                  "Monthly workflow review",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#book"
                className="block text-center border border-gray-900 text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition"
              >
                Get started
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="rounded-2xl border-2 border-indigo-600 p-8 relative">
              <span className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most popular
              </span>
              <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-2">Revenue Intelligence</p>
              <p className="text-4xl font-extrabold mb-1">
                $5,000<span className="text-lg font-medium text-gray-400"> build</span>
              </p>
              <p className="text-gray-500 text-sm mb-8">+ $1,500/mo — Best for Series A teams with RevOps</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-10">
                {[
                  "Everything in Sales Intelligence",
                  "Competitor monitoring (weekly digest)",
                  "Cold outreach personalization layer",
                  "Full CRM sync (HubSpot or Salesforce)",
                  "Lead scoring + inbound routing",
                  "Dedicated Slack channel for support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#book"
                className="block text-center bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-500 transition"
              >
                Book a call
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-24 text-center" id="book">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to stop paying reps to do research?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Book a 20-minute call. We audit your current workflow and tell you exactly
            what can be automated — no pitch, no pressure.
          </p>
          <a
            href="https://cal.com"
            className="inline-block bg-indigo-500 text-white text-base font-semibold px-10 py-4 rounded-xl hover:bg-indigo-400 transition shadow-xl"
          >
            Book a 20-min call
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 py-6 flex items-center justify-between text-sm text-gray-400">
        <span className="font-semibold text-gray-900">Prepclose</span>
        <span>Sales intelligence, automated.</span>
      </footer>

    </main>
  );
}
