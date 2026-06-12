"use client";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans pt-20">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-black mb-2">Privacy <span className="text-red-500">Policy</span></h1>
        <p className="text-xs font-mono text-zinc-500 mb-10 uppercase tracking-widest">// Last Updated: June 2026</p>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">1. Information We Collect</h2>
            <p>
              Darksyon provides web utilities and calculation tools. We do not require users to create accounts for generic usage, and we do not store any inputs you enter into our standard conversion or calculation tools. All computations are handled securely via your local browser environment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">2. Cookies and Analytics</h2>
            <p>
              We may utilize minimal, privacy-compliant cookies or analytical tracking solutions to better understand site traffic patterns, loading optimization errors, and general mobile performance analytics to polish UI features over time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">3. Contact Information</h2>
            <p>
              For any questions regarding safety specifications, data privacy concerns, or legal inquiries, reach out directly via our corporate email support matrix: <span className="text-red-400">draksyon.support@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}