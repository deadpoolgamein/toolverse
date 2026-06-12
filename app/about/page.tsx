"use client";

export default function About() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-red-500 selection:text-white pt-20">
      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">Darksyon</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Discover the vision behind our all-in-one digital tools and gaming resource platform.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900/40 border border-zinc-900 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-xl font-bold text-red-500 mb-3">// Our Vision</h2>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Darksyon is crafted to break the clutter of the internet. Instead of bookmarking dozens of different websites for simple daily tasks, AI assistance, or gaming stats, we provide a unified, lightning-fast dashboard that respects your performance and your time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">⚡ High Performance</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Built on next-gen tech architecture ensuring zero lag, fast calculations, and flawless mobile responsiveness.
              </p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">🔒 Complete Privacy</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Most of our utility tools work entirely client-side. Your data never touches our servers, keeping you safe.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}