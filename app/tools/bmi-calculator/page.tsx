"use client";

import { useState } from "react";
import { Activity, RefreshCw, Sparkles } from "lucide-react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    const w = Number(weight);
    const h = Number(height) / 100;

    if (!w || !h) return;

    const result = w / (h * h);
    setBmi(result);

    if (result < 18.5) {
      setStatus("Underweight");
    } else if (result < 25) {
      setStatus("Normal Weight");
    } else if (result < 30) {
      setStatus("Overweight");
    } else {
      setStatus("Obese");
    }
  };

  const resetTool = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setStatus("");
  };

  // Status ke hisab se alag glowing colors dene ke liye custom code
  const getStatusColor = (statusText: string) => {
    if (statusText === "Normal Weight") return "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]";
    if (statusText === "Underweight") return "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]";
    if (statusText === "Overweight") return "text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]";
    return "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]";
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
              <Activity className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              BMI <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Calculator</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Calculate Body Mass Index instantly</p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                placeholder="e.g. 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
              />
            </div>

            {/* Action Matrix */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={calculateBMI}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Calculate BMI
              </button>
              
              {(weight || height) && (
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
          {bmi && (
            <div className="mt-8 pt-6 border-t border-zinc-800/60 animate-fade-in">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Calculated Health Index</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-center flex flex-col justify-center">
                  <div className="text-2xl font-black text-white">{bmi.toFixed(2)}</div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1">Your BMI</div>
                </div>
                
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-center flex flex-col justify-center">
                  <div className={`text-lg font-extrabold ${getStatusColor(status)}`}>
                    {status}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1">Weight Status</div>
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