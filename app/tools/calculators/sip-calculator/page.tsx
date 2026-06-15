"use client";

import { useState } from "react";
import { TrendingUp, RefreshCw, Sparkles } from "lucide-react";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const [result, setResult] = useState<{
    investedAmount: number;
    estReturns: number;
    maturityAmount: number;
  } | null>(null);

  const calculateSIP = () => {
    const P = Number(monthlyInvestment);
    const annualRate = Number(rate);
    const Y = Number(years);

    if (!P || !annualRate || !Y) return;

    const r = annualRate / 12 / 100;
    const n = Y * 12;

    const futureValue =
      P *
      (((Math.pow(1 + r, n) - 1) / r) *
        (1 + r));

    const totalInvested = P * n;
    const totalReturns = futureValue - totalInvested;

    setResult({
      investedAmount: totalInvested,
      estReturns: totalReturns,
      maturityAmount: futureValue,
    });
  };

  const resetTool = () => {
    setMonthlyInvestment("");
    setRate("");
    setYears("");
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
              <TrendingUp className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              SIP <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Calculator</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Calculate future wealth compound matrices instantly</p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Monthly Investment Amount
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
                />
                <span className="absolute right-4 text-sm font-bold text-zinc-600 select-none">₹</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Expected Return Rate (Annual)
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="e.g. 12"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
                />
                <span className="absolute right-4 text-sm font-bold text-zinc-600 select-none">%</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Investment Time Horizon
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="e.g. 10"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl pl-4 pr-16 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
                />
                <span className="absolute right-4 text-xs font-mono font-bold text-zinc-500 uppercase select-none">
                  Years
                </span>
              </div>
            </div>

            {/* Action Matrix Elements */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={calculateSIP}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Calculate SIP
              </button>
              
              {(monthlyInvestment || rate || years) && (
                <button
                  onClick={resetTool}
                  className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Reset Calculator"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* --- PREMIUM COMPONENT MULTI-COLUMN BREAKDOWN DISPLAY --- */}
          {result && (
            <div className="mt-8 pt-6 border-t border-zinc-800/60 animate-fade-in space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Compound Yield Analytics</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className="text-sm font-bold text-zinc-400">₹{result.investedAmount.toFixed(0)}</div>
                  <div className="text-[9px] text-zinc-500 font-mono uppercase mt-0.5">Invested Capital</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className="text-sm font-bold text-emerald-400">₹{result.estReturns.toFixed(0)}</div>
                  <div className="text-[9px] text-zinc-500 font-mono uppercase mt-0.5">Estimated Wealth Gain</div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  ₹{result.maturityAmount.toFixed(0)}
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1 tracking-wide">
                  Total Maturity Value
                </div>
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