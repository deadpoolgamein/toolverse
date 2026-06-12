"use client";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans pt-20">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-black mb-2">Terms & <span className="text-red-500">Conditions</span></h1>
        <p className="text-xs font-mono text-zinc-500 mb-10 uppercase tracking-widest">// Last Updated: June 2026</p>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and using Darksyon, you agree to be bound by these Terms and Conditions. Our platform provides web utility tools and calculators free of charge. If you do not agree with any part of these terms, you are prohibited from using the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">2. Use License & Intellectual Property</h2>
            <p>
              The code, design assets, and mathematical algorithms running on Darksyon are protected by digital property laws. You may use our tools for personal or commercial calculations. However, scraping our tools or attempting to replicate the source code layout maliciously is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">3. Disclaimer of Liability</h2>
            <p>
              All calculation results provided by our tools (including GST, SIP, and Age utilities) are for informational purposes only. Darksyon does not guarantee 100% legal or financial compliance based on these results. Users are advised to cross-verify crucial metrics independently.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">4. Modifications to Services</h2>
            <p>
              We reserve the right to modify, optimize, or temporarily discontinue any tool or feature on this website without prior notice to maintain server performance and update security frameworks.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}