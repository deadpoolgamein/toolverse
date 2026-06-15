"use client";

import { useState } from "react";
import { FileText, Type, Sparkles, RefreshCw } from "lucide-react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const clearText = () => {
    setText("");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- AD SLOT 1: TOP BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Top Banner ]
      </div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Tool Frame Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-6 relative">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-inner">
              <Type className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              Character <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Counter</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Analyze your characters, words, and paragraph constraints</p>

            {/* Clear Floating Action Button */}
            {text && (
              <button
                onClick={clearText}
                className="absolute right-0 top-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-all active:scale-95 shadow-lg"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Text Area Input */}
          <div className="mb-6">
            <textarea
              rows={8}
              placeholder="Type, paste, or draft your text layout metrics here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-zinc-800 bg-zinc-950 text-white placeholder-zinc-700 rounded-2xl p-4 text-sm sm:text-base focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none shadow-inner leading-relaxed"
            />
          </div>

          {/* Real-time Analytics Dashboard Widgets */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
              <Sparkles className="w-3 h-3 text-red-500" />
              <span>Real-Time Matrix Counters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Counter 1 */}
              <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 text-center group hover:border-zinc-800 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-red-500 transition-colors duration-200">
                  {characters}
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1 tracking-wider">Characters</div>
              </div>

              {/* Counter 2 */}
              <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 text-center group hover:border-zinc-800 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-red-500 transition-colors duration-200">
                  {charactersWithoutSpaces}
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1 tracking-wider">No Spaces</div>
              </div>

              {/* Counter 3 */}
              <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 text-center group hover:border-zinc-800 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-red-500 transition-colors duration-200">
                  {words}
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1 tracking-wider">Words</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- AD SLOT 2: BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Bottom Banner ]
      </div>

    </main>
  );
}