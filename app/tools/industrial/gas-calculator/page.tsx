"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Flame, Sparkles } from "lucide-react";

export default function GasCalculator() {
  const [weldLength, setWeldLength] = useState<number>(10); // Total length in meters
  const [flowRate, setFlowRate] = useState<number>(12);     // Liters per minute
  const [travelSpeed, setTravelSpeed] = useState<number>(25); // cm per minute
  const [cylinderCost, setCylinderCost] = useState<number>(2500); // Local currency cost per full cylinder

  const [totalGasLiters, setTotalGasLiters] = useState<number>(0);
  const [cylinderFraction, setCylinderFraction] = useState<number>(0);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  useEffect(() => {
    if (weldLength <= 0 || flowRate <= 0 || travelSpeed <= 0 || isNaN(weldLength) || isNaN(flowRate) || isNaN(travelSpeed)) {
      setTotalGasLiters(0); setCylinderFraction(0); setEstimatedCost(0);
      return;
    }

    // 1. Convert weld length from meters to cm (Meters * 100)
    const lengthCm = weldLength * 100;
    
    // 2. Calculate Total Arc Time in Minutes = Length (cm) / Speed (cm/min)
    const arcTimeMinutes = lengthCm / travelSpeed;

    // 3. Gas consumed (Liters) = Arc Time (min) * Flow Rate (L/min)
    const totalLiters = arcTimeMinutes * flowRate;

    // 4. Standard 47L gas cylinder contains roughly 7000 Liters of compressed gas at 150 bar
    const cylindersNeeded = totalLiters / 7000;
    const projectCost = cylindersNeeded * cylinderCost;

    setTotalGasLiters(Math.round(totalLiters));
    setCylinderFraction(Number(cylindersNeeded.toFixed(3)));
    setEstimatedCost(Math.round(projectCost));
  }, [weldLength, flowRate, travelSpeed, cylinderCost]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            💨 Welding Shielding Gas & Cost Estimator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Estimate gas volume consumption rates and financial expenditure for commercial MIG (CO2/Argon) and TIG pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-4 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Operational Parameters
            </h3>

            <div>
              <span className="text-xs font-mono text-zinc-500 block">Total Welding Joint Length (Meters)</span>
              <input type="number" value={weldLength} onChange={(e) => setWeldLength(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Gas Flow Rate (Liters / Minute)</span>
              <input type="number" value={flowRate} onChange={(e) => setFlowRate(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Welding Travel Speed (cm / Minute)</span>
              <input type="number" value={travelSpeed} onChange={(e) => setTravelSpeed(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Full Gas Cylinder Commercial Cost</span>
              <input type="number" value={cylinderCost} onChange={(e) => setCylinderCost(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
          </div>

          {/* OUTPUT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-500" /> Commercial Overhead Output
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Total Gas Used</span>
                  <p className="text-xl font-black text-zinc-300">{totalGasLiters} <span className="text-xs font-normal text-zinc-600">Liters</span></p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Cylinder Share</span>
                  <p className="text-xl font-black text-red-400">{cylinderFraction} <span className="text-xs font-normal text-zinc-600">Qty</span></p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Gas Expense Cost</span>
                  <p className="text-xl font-black text-red-500">{estimatedCost.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Estimation Parameters</span>
                  Calculations assume a standard D-size compressed industrial cylinder base (approx 7,000 baseline free gas liters volume capability). Add a 10% reserve padding value for localized wind-dispersion gas losses during outdoor operations.
                </div>
              </div>
              {/* 📚 ADSENSE COMPLIANCE: GAS INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Thermodynamic Ideal Gas Law State Analyzers
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      This scientific analyzer processes ideal gas states using localized multi-variable thermodynamic checks. Balancing continuous shifts across pressure, volume, temperature, and moles variables, it delivers instant value corrections.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Analyze gas compression equations and temperature conversions in closed containers.</p>
    </div>
    <a href="/blog/ideal-gas-law-formulations" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>
            </div>
            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ NATIVE_BOARD_AD_SPACE ]
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}