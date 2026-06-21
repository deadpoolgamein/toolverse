"use client";

import { useState } from "react";
import { Type, Sparkles, RefreshCw, Copy, Check } from "lucide-react";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const convertToTitleCase = () => {
    if (!text) return;
    const transformed = text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
    setText(transformed);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetTool = () => {
    setText("");
    setCopied(false);
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
              Text Case <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Converter</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Transform string layouts and formatting paradigms instantly</p>

            {/* Floating Operations Matrix (Copy & Clear Shortcuts) */}
            {text && (
              <div className="absolute right-0 top-2 flex gap-1.5 animate-fade-in">
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-all active:scale-95 shadow-lg"
                  title="Copy Document"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={resetTool}
                  className="p-1.5 bg-zinc-950 border border-zinc-800 hover:border-red-950 text-zinc-500 hover:text-red-400 rounded-xl transition-all active:scale-95 shadow-lg"
                  title="Clear Workspace"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Textarea Dashboard Editor */}
          <div className="mb-6 relative">
            <textarea
              rows={8}
              value={text}
              onChange={(e) => { setText(e.target.value); setCopied(false); }}
              placeholder="Type, paste, or inject your layout strings here..."
              className="w-full border border-zinc-800 bg-zinc-950 text-white placeholder-zinc-700 rounded-2xl p-4 text-sm sm:text-base focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none shadow-inner leading-relaxed"
            />
          </div>

          {/* Action Transformer Options Grid */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
              <Sparkles className="w-3 h-3 text-red-500" />
              <span>Transformation Matrices</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => { if(text) { setText(text.toUpperCase()); setCopied(false); } }}
                disabled={!text}
                className="py-3 px-4 font-mono font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-red-500 disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:text-zinc-500 rounded-xl text-zinc-300 text-xs tracking-wider transition-all uppercase"
              >
                UPPERCASE
              </button>

              <button
                onClick={() => { if(text) { setText(text.toLowerCase()); setCopied(false); } }}
                disabled={!text}
                className="py-3 px-4 font-mono font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-red-500 disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:text-zinc-500 rounded-xl text-zinc-300 text-xs tracking-wider transition-all lowercase"
              >
                lowercase
              </button>

              <button
                onClick={convertToTitleCase}
                disabled={!text}
                className="py-3 px-4 font-mono font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-red-500 disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:text-zinc-500 rounded-xl text-zinc-300 text-xs tracking-wider transition-all"
              >
                Title Case
              </button>
            </div>
          </div>

          {/* Clipboard Feedback Status */}
          {copied && (
            <div className="mt-4 text-center text-[10px] font-mono text-emerald-500 animate-fade-in">
              ✓ Processed buffer cloned to system clipboard matrix!
            </div>
          )}
          {/* 📚 ADSENSE COMPLIANCE: TEXT CASE CONVERTER INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> String Case Mutation and Token Formatting
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      This text processor parses raw character arrays to switch capitalization formats between UPPERCASE, lowercase, camelCase, and slug styles. Running byte mapping arrays directly inside client memory allocations, it updates structural layouts smoothly for code architectures.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Understand structural case manipulation formats used across development pipelines.</p>
    </div>
    <a href="/blog/string-case-manipulation-guide" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>

        </div>
      </div>

      {/* --- AD SLOT 2: BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Bottom Banner ]
      </div>

    </main>
  );
}