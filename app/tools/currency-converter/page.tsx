"use client";

import { useState } from "react";
import { Coins, RefreshCw, Sparkles } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const convertCurrency = () => {
    const usd = Number(amount);

    if (!usd) return;

    const rate = 85; // 1 USD = 85 INR
    setResult(usd * rate);
  };

  const resetTool = () => {
    setAmount("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[450px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* --- AD SLOT 1: TOP BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Top Banner ]
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Tool Frame Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-inner">
              <Coins className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              Currency <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Converter</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Convert international currency tokens instantly</p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Enter Amount (USD)
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl pl-4 pr-14 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
                />
                <span className="absolute right-4 text-xs font-mono font-bold text-zinc-500 uppercase select-none">
                  USD
                </span>
              </div>
            </div>

            {/* Action Matrix */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={convertCurrency}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Convert to INR
              </button>
              
              {amount && (
                <button
                  onClick={resetTool}
                  className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Reset"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* --- PREMIUM RESULT DISPLAY --- */}
          {result !== null && (
            <div className="mt-8 pt-6 border-t border-zinc-800/60 animate-fade-in">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Conversion Matrix</span>
              </div>
              
              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 text-center">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  ₹{result.toFixed(2)}
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1 tracking-wide">
                  Indian Rupee (INR)
                </div>
              </div>

              {/* Rate Specification Badge */}
              <div className="mt-3 text-center text-[10px] font-mono text-zinc-600">
                Base conversion node: 1 USD = 85.00 INR
              </div>
            </div>
          )}

        </div>
      </div>

      {/* --- AD SLOT 2: BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Bottom Banner ]
      </div>

    </main>
  );
}