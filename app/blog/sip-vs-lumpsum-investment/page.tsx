"use client";
import { TrendingUp, ArrowRight, DollarSign, Award } from "lucide-react";

export default function SipArticle() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        {/* --- AD SLOT 1 --- */}
        <div className="w-full h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-10 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
          [ Ad Space - Top Banner ]
        </div>

        <div className="border-b border-zinc-900 pb-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-red-500/10 text-red-500 border border-red-500/20">
              Finance Strategy
            </span>
            <span className="text-xs font-mono text-zinc-500">// Read Time: 5 mins</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 leading-tight">
            SIP vs Lumpsum Investment: Which Path is Best for You?
          </h1>
        </div>

        <div className="prose prose-invert max-w-none text-zinc-400 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Deciding between a Systematic Investment Plan (SIP) and a one-time Lumpsum financial allocation can drastically affect your wealth compounding journey. Understanding market parameters and compound math is vital for long-term target yields.
          </p>

          {/* --- CTA CARD --- */}
          <div className="my-8 bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Darksyon SIP Calculator</h3>
                <p className="text-zinc-400 text-xs sm:text-sm">Forecast your maturity wealth metrics and estimated returns instantly with precision values.</p>
              </div>
            </div>
            <a href="/tools/sip-calculator" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 font-bold bg-red-600 hover:bg-red-700 text-white text-sm rounded-xl transition-all group active:scale-95 whitespace-nowrap">
              Calculate Returns <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-200 pt-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full inline-block"></span>
            Why Dollar-Cost Averaging Wins
          </h2>
          <p>
            An online SIP structure highlights how micro-transactions reduce the impact of market volatility. Using the <strong>Darksyon dashboard</strong> financial mathematical suite, projecting safe parameters across 10, 20, or 30 years takes seconds.
          </p>

          {/* --- AD SLOT 2 --- */}
          <div className="w-full h-32 bg-zinc-900/30 border border-zinc-900 rounded-xl my-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
            [ Ad Space - In-Article Banner ]
          </div>
        </div>

        {/* --- AD SLOT 3 --- */}
        <div className="w-full h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-12 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
          [ Ad Space - Bottom Banner ]
        </div>
      </div>
    </main>
  );
}