"use client";

import { useState } from "react";
import { Percent, RefreshCw, Sparkles } from "lucide-react";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("18");
  const [result, setResult] = useState<{
    gstAmount: number;
    totalAmount: number;
    splitGst: number;
  } | null>(null);

  const calculateGST = () => {
    const amt = Number(amount);
    const gstRate = Number(gst);

    if (!amt || !gstRate) return;

    const gstAmount = (amt * gstRate) / 100;
    const totalAmount = amt + gstAmount;
    const splitGst = gstAmount / 2; // CGST and SGST breakdown split

    setResult({
      gstAmount,
      totalAmount,
      splitGst,
    });
  };

  const resetTool = () => {
    setAmount("");
    setGst("18");
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
              <Percent className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              GST <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Calculator</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Compute gross amounts and tax components instantly</p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Base Amount (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Select GST Rate (Slab)
              </label>
              <select
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
              >
                <option value="5" className="bg-zinc-900 text-white">5% Tax Rate</option>
                <option value="12" className="bg-zinc-900 text-white">12% Tax Rate</option>
                <option value="18" className="bg-zinc-900 text-white">18% Tax Rate</option>
                <option value="28" className="bg-zinc-900 text-white">28% Tax Rate</option>
              </select>
            </div>

            {/* Action Matrix */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={calculateGST}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Calculate GST
              </button>
              
              {(amount || gst !== "18") && (
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

          {/* --- PREMIUM COMPONENT RESULT BREAKDOWN --- */}
          {result && (
            <div className="mt-8 pt-6 border-t border-zinc-800/60 animate-fade-in space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Tax Breakdown Matrices</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className="text-base font-bold text-zinc-300">₹{result.splitGst.toFixed(2)}</div>
                  <div className="text-[9px] text-zinc-500 font-mono uppercase mt-0.5">CGST Split</div>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className="text-base font-bold text-zinc-300">₹{result.splitGst.toFixed(2)}</div>
                  <div className="text-[9px] text-zinc-500 font-mono uppercase mt-0.5">SGST Split</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-center flex flex-col justify-center">
                  <div className="text-xl font-black text-red-500">₹{result.gstAmount.toFixed(2)}</div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1">Total Tax</div>
                </div>
                
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-center flex flex-col justify-center">
                  <div className="text-xl font-black text-white">₹{result.totalAmount.toFixed(2)}</div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1">Gross Price</div>
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