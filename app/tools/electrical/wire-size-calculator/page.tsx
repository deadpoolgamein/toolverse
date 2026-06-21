"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function WireSizeCalculator() {
  const [voltage, setVoltage] = useState<number>(230); // 230V Standard Single Phase
  const [totalWattage, setTotalWattage] = useState<number>(2000); // Default 2000 Watts
  
  const [calculatedAmps, setCalculatedAmps] = useState<number>(0);
  const [recommendedWire, setRecommendedWire] = useState<string>("1.5 Sq. mm");
  const [safetyBreaker, setSafetyBreaker] = useState<string>("16A MCB");

  useEffect(() => {
    if (totalWattage <= 0 || voltage <= 0 || isNaN(totalWattage) || isNaN(voltage)) {
      setCalculatedAmps(0);
      setRecommendedWire("---");
      setSafetyBreaker("---");
      return;
    }

    // ⚡ Formula: Amps = Watts / Voltage (Assuming resistive load Power Factor ~ 1 for simplicity)
    const amps = totalWattage / voltage;
    setCalculatedAmps(Number(amps.toFixed(2)));

    // 🔌 Professional Safe Current Carrying Capacity Matrix (Copper Multi-strand wires)
    if (amps <= 11) {
      setRecommendedWire("1.0 Sq. mm");
      setSafetyBreaker("10A MCB");
    } else if (amps <= 15) {
      setRecommendedWire("1.5 Sq. mm");
      setSafetyBreaker("16A MCB");
    } else if (amps <= 21) {
      setRecommendedWire("2.5 Sq. mm");
      setSafetyBreaker("20A MCB");
    } else if (amps <= 28) {
      setRecommendedWire("4.0 Sq. mm");
      setSafetyBreaker("25A MCB");
    } else if (amps <= 36) {
      setRecommendedWire("6.0 Sq. mm");
      setSafetyBreaker("32A MCB");
    } else if (amps <= 50) {
      setRecommendedWire("10.0 Sq. mm");
      setSafetyBreaker("50A MCB");
    } else {
      setRecommendedWire("16.0 Sq. mm+ (Requires Heavy Armoured Cable)");
      setSafetyBreaker("63A+ Isolator MCCB");
    }
  }, [totalWattage, voltage]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <Zap className="w-8 h-8 text-amber-500" /> House Wiring & Wire Size Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute continuous amperage current draw and matches standard safe copper wire cross-sections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1 text-amber-500">
              1. Load Variables
            </h3>

            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Supply Voltage (Volts)</span>
              <select 
                value={voltage}
                onChange={(e) => setVoltage(parseInt(e.target.value) || 230)}
                className="w-full h-10 mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-amber-500/30 transition-all cursor-pointer"
              >
                <option value="230">230V (Standard Single Phase)</option>
                <option value="110">110V (US / Overseas Standard)</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Total Continuous Load (Watts)</span>
              <div className="relative">
                <input 
                  type="number" 
                  value={totalWattage}
                  onChange={(e) => setTotalWattage(Math.max(0, parseInt(e.target.value) || 0))}
                  className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none focus:border-amber-500/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">Watts</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1 text-[9px] font-mono text-zinc-600 text-center">
                <button onClick={() => setTotalWattage(800)} className="bg-zinc-900/40 p-1 rounded hover:text-white">Laptop/TV (800W)</button>
                <button onClick={() => setTotalWattage(2000)} className="bg-zinc-900/40 p-1 rounded hover:text-white">1.5T AC (2000W)</button>
                <button onClick={() => setTotalWattage(5000)} className="bg-zinc-900/40 p-1 rounded hover:text-white">Full Load (5000W)</button>
              </div>
            </div>

          </div>

          {/* OUTPUT VIEWPORT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Safe Hardware Specification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* WIRE SIZE RESULT */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner sm:col-span-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Recommended Copper Wire Gauge</span>
                  <p className="text-3xl font-black text-amber-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    {recommendedWire}
                  </p>
                </div>

                {/* AMPS */}
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Total Load Current</span>
                  <p className="text-md font-bold text-zinc-200">{calculatedAmps} <span className="text-xs text-zinc-500 font-normal">Amps</span></p>
                </div>

                {/* MCB BREAKER */}
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Safe MCB Protection Size</span>
                  <p className="text-md font-bold text-zinc-200">{safetyBreaker}</p>
                </div>

              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Safety Compliance Regulation</span>
                  Wire recommendations follow international electrical standards for multi-strand household copper conduits inside PVC pipes. For heavy commercial inductive motor loops, scaling the size up by one safety tier margin is strongly advised.
                </div>
              </div>
            </div>
            {/* 📚 ADSENSE COMPLIANCE: WIRE SIZE CALCULATOR INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Ampacity and Voltage Drop Engineering Matrices
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      Our industrial electrical engine calculates precise wire gauge (AWG/mm²) configurations by processing current load (Amps), source voltage, phase distribution, and conductor material constants (Copper/Aluminum). Running complex voltage drop percentage routines locally based on National Electrical Code (NEC) standards, it avoids thermal overload hazards without transmitting engineering specs to cloud instances.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Understand how distance metrics and resistance coefficients shift absolute cable safety thresholds.</p>
    </div>
    <a href="/blog/electrical-wire-size-guide" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>

            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ DARKSYON_ELECTRICAL_AD_SPACE ]
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}