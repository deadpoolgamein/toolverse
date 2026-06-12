"use client";
import { Calendar, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function AgeArticle() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        {/* --- AD SLOT 1: TOP BANNER (For Earnings) --- */}
        <div className="w-full h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-10 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
          [ Ad Space - Top Banner ]
        </div>

        {/* Article Header */}
        <div className="border-b border-zinc-900 pb-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-red-500/10 text-red-500 border border-red-500/20">
              User Guide
            </span>
            <span className="text-xs font-mono text-zinc-500">// Read Time: 3 mins</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 leading-tight">
            How to Calculate Age Online: Accurate Step-by-Step Guide
          </h1>
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-zinc-400 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Calculating your exact age manually can often get confusing and tedious, especially when you need to factor in varying month lengths, leap years, and precise days. Whether you need it for official documentation, exam registrations, or just out of curiosity, accuracy is key.
          </p>

          {/* --- PREMIUM CALL-TO-ACTION CARD (Direct Tool Link) --- */}
          <div className="my-8 bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Darksyon Age Calculator</h3>
                <p className="text-zinc-400 text-xs sm:text-sm">Get your exact age in years, months, weeks, and days instantly with zero signup.</p>
              </div>
            </div>
            <a
              href="/tools/age-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 font-bold bg-red-600 hover:bg-red-700 text-white text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] group active:scale-95 whitespace-nowrap"
            >
              Launch Tool
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-200 pt-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full inline-block"></span>
            Why Use an Online Age Calculator?
          </h2>
          <p>
            An online utility automatically cross-references the current Gregorian calendar parameters against your date of birth. This eliminates human calculation errors instantly. Using the <strong>Darksyon system matrix</strong>, processing takes milliseconds right inside your browser session, meaning maximum privacy and data security.
          </p>

          {/* --- AD SLOT 2: IN-ARTICLE (Middle Ad for higher CTR) --- */}
          <div className="w-full h-32 bg-zinc-900/30 border border-zinc-900 rounded-xl my-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
            [ Ad Space - In-Article Banner ]
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-200 pt-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full inline-block"></span>
            Key Features of Our System
          </h2>
          <ul className="space-y-3 pl-4 border-l border-zinc-800 text-sm text-zinc-400">
            <li className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span><strong>Instant Breakdown:</strong> Shows your age down to the exact months and remaining days.</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span><strong>100% Client-Side Protection:</strong> Your birthday data never leaves your device.</span>
            </li>
          </ul>
        </div>

        {/* --- AD SLOT 3: BOTTOM BANNER --- */}
        <div className="w-full h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-12 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
          [ Ad Space - Bottom Banner ]
        </div>

      </div>
    </main>
  );
}