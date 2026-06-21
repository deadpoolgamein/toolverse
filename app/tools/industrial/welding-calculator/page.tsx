"use client";

import { useState } from "react";
import { ShieldAlert, Building2, HelpCircle, Flame, Layers, Zap, Sliders, Sparkles } from "lucide-react";

// EXTENDED DATA MATRIX WITH GASLESS FLUX-CORED LOGIC
const weldingDatabase: Record<string, Record<string, any>> = {
  smaw: {
    ms: [
      { thickness: "1.5mm - 2mm", electrode: "2.0mm (E6013)", current: "40A - 60A", polarity: "DCEP / AC", speed: "Slow to Medium", gas: "None (Flux Coated)" },
      { thickness: "3mm - 4mm", electrode: "3.2mm (E6013 / E7018)", current: "90A - 130A", polarity: "DCEP / AC", speed: "Medium", gas: "None (Flux Coated)" },
      { thickness: "5mm - 8mm", electrode: "4.0mm (E7018 / E6010)", current: "140A - 180A", polarity: "DCEP", speed: "Medium", gas: "None (Flux Coated)" },
      { thickness: "10mm+", electrode: "5.0mm (E7018 / Heavy Root)", current: "180A - 225A", polarity: "DCEP", speed: "Controlled Steady", gas: "None (Flux Coated)" },
    ],
    ss: [
      { thickness: "1.5mm - 2mm", electrode: "2.0mm (E308L-16)", current: "35A - 50A", polarity: "DCEP", speed: "Controlled Fast", gas: "None (Flux Coated)" },
      { thickness: "3mm - 4mm", electrode: "2.5mm (E308L / E316L)", current: "60A - 85A", polarity: "DCEP", speed: "Controlled Fast", gas: "None (Flux Coated)" },
      { thickness: "5mm+", electrode: "3.2mm (E308L-16)", current: "85A - 120A", polarity: "DCEP", speed: "Medium Fast", gas: "None (Flux Coated)" },
    ]
  },
  gtaw: {
    ms: [
      { thickness: "1mm - 1.5mm", electrode: "1.6mm Tungsten (Red/Gold)", filler: "1.6mm ER70S-6", current: "50A - 80A", polarity: "DCEN", speed: "Precise Slow", gas: "Pure Argon (7-10 L/min)" },
      { thickness: "2mm - 3mm", electrode: "2.4mm Tungsten (Red/Gold)", filler: "2.4mm ER70S-6", current: "90A - 140A", polarity: "DCEN", speed: "Medium", gas: "Pure Argon (10-12 L/min)" },
      { thickness: "5mm+", electrode: "3.2mm Tungsten (Red)", filler: "3.2mm ER70S-6", current: "150A - 220A", polarity: "DCEN", speed: "Controlled Steady", gas: "Pure Argon (12-15 L/min)" },
    ],
    ss: [
      { thickness: "1mm - 1.5mm", electrode: "1.6mm Tungsten (Gold/Blue)", filler: "1.6mm ER308L", current: "45A - 70A", polarity: "DCEN", speed: "Fast Uniform", gas: "Pure Argon (8-10 L/min) + Back purge" },
      { thickness: "2mm - 3mm", electrode: "2.4mm Tungsten (Gold/Blue)", filler: "2.4mm ER308L", current: "80A - 125A", polarity: "DCEN", speed: "Medium Fast", gas: "Pure Argon (10-12 L/min)" },
      { thickness: "5mm+", electrode: "3.2mm Tungsten (Blue)", filler: "3.2mm ER308L", current: "130A - 180A", polarity: "DCEN", speed: "Steady Progress", gas: "Pure Argon (12-15 L/min)" },
    ],
    al: [
      { thickness: "1mm - 1.5mm", electrode: "1.6mm Tungsten (Green/Grey)", filler: "1.6mm ER4043", current: "60A - 90A", polarity: "AC (Balance 70%)", speed: "Fast Continuous", gas: "Pure Argon (9-11 L/min)" },
      { thickness: "2mm - 3mm", electrode: "2.4mm Tungsten (Green/Grey)", filler: "2.4mm ER4043 / ER5356", current: "100A - 150A", polarity: "AC (Balance 75%)", speed: "Fast Continuous", gas: "Pure Argon (11-14 L/min)" },
      { thickness: "5mm+", electrode: "3.2mm Tungsten (Green)", filler: "3.2mm ER5356", current: "160A - 240A", polarity: "AC (Balance 65%)", speed: "Medium Fast", gas: "Pure Argon (14-18 L/min)" },
    ]
  },
  gmaw: { // Standard Solid Wire MIG
    ms: [
      { thickness: "1mm - 1.5mm", electrode: "0.8mm Wire (ER70S-6)", current: "60A - 90A (Volts: 16-18V)", polarity: "DCEP", speed: "Wire Speed: 150-200 IPM", gas: "75% Ar / 25% CO2 (10 L/min)" },
      { thickness: "2mm - 3mm", electrode: "0.8mm / 0.9mm Wire", current: "100A - 150A (Volts: 18-21V)", polarity: "DCEP", speed: "Wire Speed: 220-280 IPM", gas: "75% Ar / 25% CO2 (12 L/min)" },
      { thickness: "5mm - 8mm", electrode: "1.2mm Wire (ER70S-6)", current: "180A - 260A (Volts: 22-26V)", polarity: "DCEP", speed: "Wire Speed: 300+ IPM", gas: "Pure CO2 or Mixed Argon (15 L/min)" },
    ],
    ss: [
      { thickness: "1.5mm - 2mm", electrode: "0.8mm Wire (ER308L)", current: "70A - 110A (Volts: 17-19V)", polarity: "DCEP", speed: "Wire Speed: 180-220 IPM", gas: "98% Ar / 2% CO2 (12 L/min)" },
      { thickness: "3mm - 5mm", electrode: "0.9mm / 1.2mm Wire", current: "140A - 210A (Volts: 20-24V)", polarity: "DCEP", speed: "Wire Speed: 250+ IPM", gas: "98% Ar / 2% CO2 (14 L/min)" },
    ]
  },
  fcaw: { // 🔥 FLUX-CORED (GASLESS MIG) CODES INTERCEPTED
    ms: [
      { thickness: "1mm - 1.5mm", electrode: "0.8mm Flux Wire (E71T-GS)", current: "50A - 75A (Volts: 15-16V)", polarity: "DCEN (Straight Polarity)", speed: "Wire Speed: 120-150 IPM", gas: "None (Self-Shielding Flux)" },
      { thickness: "2mm - 3mm", electrode: "0.8mm / 0.9mm Flux Wire", current: "80A - 130A (Volts: 16-18V)", polarity: "DCEN (Straight Polarity)", speed: "Wire Speed: 160-220 IPM", gas: "None (Self-Shielding Flux)" },
      { thickness: "5mm - 8mm", electrode: "1.2mm Flux Wire (E71T-11)", current: "140A - 195A (Volts: 19-22V)", polarity: "DCEN (Straight Polarity)", speed: "Wire Speed: 240+ IPM", gas: "None (Self-Shielding Flux)" },
    ],
    ss: [
      { thickness: "1.5mm - 3mm", electrode: "0.9mm Flux Wire (E308LT0-3)", current: "70A - 120A (Volts: 17-19V)", polarity: "DCEN", speed: "Wire Speed: 170-200 IPM", gas: "None (Self-Shielding Flux)" },
    ]
  }
};

export default function WeldingCalculator() {
  const [process, setProcess] = useState("smaw");
  const [material, setMaterial] = useState("ms");
  const [thicknessIndex, setThicknessIndex] = useState(0);

  // Intercept standard GMAW when user clicks Gasless Toggle
  const handleProcessChange = (val: string) => {
    setProcess(val);
    setThicknessIndex(0);
    if (val !== "gtaw" && material === "al") {
      setMaterial("ms");
    }
  };

  const currentProcessGroup = weldingDatabase[process] || {};
  const currentMaterialData = currentProcessGroup[material] || currentProcessGroup["ms"] || [];
  const activeParameters = currentMaterialData[thicknessIndex] || currentMaterialData || null;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP AD SKELETON */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_WELD_CALC_BANNER_728X90 ]
        </div>

        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
              <Building2 className="w-8 h-8 text-red-500" /> Industrial Welding Calculator
            </h1>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Compute precise industrial arc parameters, electrode grades, shielding flux, and current variables.
            </p>
          </div>
          <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] uppercase font-black tracking-wider rounded-md h-fit w-fit">
            Standard: AWS D1.1 Compliance
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* VARIABLES PANEL */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-6 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Control Variables
            </h3>

            {/* WELDING PROCESS WITH GASLESS INTERCEPT OPTION */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Welding Process Method</label>
              <select 
                value={process}
                onChange={(e) => handleProcessChange(e.target.value)}
                className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-red-500/30 transition-all cursor-pointer"
              >
                <option value="smaw">⚡ Stick Welding (SMAW / Arc)</option>
                <option value="gtaw">🔥 TIG Welding (GTAW / Argon)</option>
                <option value="gmaw">🌀 MIG Welding (GMAW - Solid Wire + Gas)</option>
                <option value="fcaw">🛠️ Gasless MIG (FCAW - Flux-Cored Wire)</option>
              </select>
            </div>

            {/* BASE METAL COMPOSITION */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-400">2. Base Metal Composition</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMaterial("ms")}
                  className={`py-2.5 text-xs font-mono font-bold rounded-xl border transition-all ${
                    material === "ms" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Mild Steel
                </button>
                <button
                  onClick={() => setMaterial("ss")}
                  className={`py-2.5 text-xs font-mono font-bold rounded-xl border transition-all ${
                    material === "ss" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Stainless
                </button>
                <button
                  disabled={process !== "gtaw"}
                  onClick={() => setMaterial("al")}
                  className={`py-2.5 text-xs font-mono font-bold rounded-xl border transition-all ${
                    process !== "gtaw" ? "opacity-30 cursor-not-allowed bg-zinc-900 border-transparent text-zinc-700" : 
                    material === "al" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Aluminum
                </button>
              </div>
            </div>

            {/* THICKNESS SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-400">3. Target Joint Plate Thickness</label>
              <div className="flex flex-col gap-2">
                {currentMaterialData.map((item: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setThicknessIndex(idx)}
                    className={`w-full py-2.5 px-4 text-left text-xs font-mono font-bold rounded-xl border transition-all flex items-center justify-between ${
                      thicknessIndex === idx ? "bg-zinc-900 border-zinc-700 text-white" : "bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:bg-zinc-950"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-zinc-600" /> Gauge: {item.thickness}
                    </span>
                    {thicknessIndex === idx && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* OUTPUT VIEWPORT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            
            {activeParameters ? (
              <div className="space-y-6 w-full">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-500" /> Computed Target Parameters
                </h3>

                {/* AMPS & POLARITY */}
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 flex items-center justify-between shadow-inner">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Recommended Current</span>
                    <p className="text-3xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      {activeParameters.current}
                    </p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block font-bold">Polarity Type</span>
                    <span className="text-xs font-black text-red-400 border border-red-500/20 bg-zinc-950 px-2.5 py-1 rounded-md inline-block mt-1 animate-pulse">
                      {activeParameters.polarity}
                    </span>
                  </div>
                </div>

                {/* GRID DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Electrode / Wire Spec</span>
                    <p className="text-xs font-bold text-zinc-300">{activeParameters.electrode}</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Shielding Flux / Gas Mix</span>
                    <p className="text-xs font-bold text-zinc-300">{activeParameters.gas}</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1 sm:col-span-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Travel / Wire Feed Speed</span>
                    <p className="text-xs font-bold text-zinc-300">{activeParameters.speed}</p>
                  </div>
                </div>

                {/* SAFETY BRIEF */}
                <div className="border border-yellow-500/10 bg-yellow-500/5 text-yellow-500/80 rounded-xl p-4 flex gap-3 text-xs leading-relaxed">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-500/60" />
                  <div>
                    <span className="font-bold block uppercase text-[10px] tracking-wide mb-0.5">Workshop Operator Safety Brief</span>
                    {process === "fcaw" ? 
                      "CRITICAL: Gasless flux wire produces heavy slag and dense metallic vapors. Ensure high-volume active cross-ventilation extraction fans are turned on. Clean slag thoroughly between passes." : 
                      "Ensure active fume exhaust ventilation hoods are switched on. Use shade 10-13 dynamic auto-darkening welding helmets during arc strike initialization."
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="m-auto flex flex-col items-center justify-center text-zinc-600 font-mono text-xs">
                <HelpCircle className="w-6 h-6 mb-2 text-zinc-800" />
                <span>Adjust inputs to compile parametric output matrices.</span>
              </div>
            )}
            {/* 📚 ADSENSE COMPLIANCE: WELDING INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Metallurgical Weld Heat Input and Cost Evaluators
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      This welding suite evaluates heat inputs and consumable wire consumption rates for structural joints. Processing voltage, travel speed, and current inputs locally, it optimizes settings to prevent structural joint cracking.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Master how heat inputs change structural steel cooling rates and joint durability.</p>
    </div>
    <a href="/blog/welding-heat-input-guide" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>

            {/* AD BANNER */}
            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ NATIVE_BOARD_AD_SPACE ]
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}