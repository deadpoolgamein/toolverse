"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Activity, Gauge } from "lucide-react";

// STANDARD CUTTING SPEED MATRIX (Vc in m/min) BASED ON MATERIAL & BIT TYPE
const cuttingSpeeds: Record<string, Record<string, number>> = {
  ms: { hss: 30, carbide: 70 },  // Mild Steel
  ss: { hss: 15, carbide: 40 },  // Stainless Steel
  al: { hss: 90, carbide: 200 }, // Aluminum
  ci: { hss: 22, carbide: 55 },  // Cast Iron
};

export default function DrillingCalculator() {
  const [material, setMaterial] = useState("ms");
  const [bitType, setBitType] = useState("hss");
  const [unitSystem, setUnitSystem] = useState("metric"); // metric (mm) vs imperial (inch)
  
  const [diameterInput, setDiameterInput] = useState<number>(12); // Default 12mm drill
  const [calculatedRpm, setCalculatedRpm] = useState<number>(0);
  const [calculatedFeed, setCalculatedFeed] = useState<number>(0);

  useEffect(() => {
    // 1. Get Cutting Speed (Vc) from Matrix
    const Vc = cuttingSpeeds[material]?.[bitType] || 30;

    // 2. Convert Diameter to MM if it's in Inches
    let diameterMm = diameterInput;
    if (unitSystem === "imperial") {
      diameterMm = diameterInput * 25.4; // Inch to mm
    }

    if (diameterMm <= 0 || isNaN(diameterMm)) {
      setCalculatedRpm(0);
      setCalculatedFeed(0);
      return;
    }

    // 3. Compute RPM = (Vc * 1000) / (pi * Diameter)
    const rpm = (Vc * 1000) / (Math.PI * diameterMm);

    // 4. Estimate Feed Rate (mm/min) based on drill diameter rules of thumb
    // Standard rule: feed per rev (f) is roughly 0.02 * diameter for HSS
    const feedPerRev = bitType === "hss" ? 0.015 * diameterMm : 0.025 * diameterMm;
    const feedRate = rpm * feedPerRev;

    setCalculatedRpm(Math.round(rpm));
    setCalculatedFeed(Math.round(feedRate));

  }, [material, bitType, unitSystem, diameterInput]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* AD BANNER TOP */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_DRILLING_BANNER_728X90 ]
        </div>

        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <Gauge className="w-8 h-8 text-red-500" /> Drilling Speed & Feed Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Calculate mathematically optimized RPM and feed rates for standard workshop column and radial drills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Machining Input
            </h3>

            {/* UNIT TOGGLE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Drill Unit System</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUnitSystem("metric")}
                  className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                    unitSystem === "metric" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}
                >
                  Metric (mm)
                </button>
                <button
                  onClick={() => setUnitSystem("imperial")}
                  className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                    unitSystem === "imperial" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}
                >
                  Imperial (Inch)
                </button>
              </div>
            </div>

            {/* MATERIAL TYPE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">2. Target Workpiece Material</label>
              <select 
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-red-500/30 transition-all cursor-pointer"
              >
                <option value="ms">Mild Steel (Structural Iron)</option>
                <option value="ss">Stainless Steel (Hard Alloy)</option>
                <option value="al">Aluminum (Soft/Fast Metal)</option>
                <option value="ci">Cast Iron (Brittle Material)</option>
              </select>
            </div>

            {/* DRILL BIT TYPE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">3. Drill Bit Composition</label>
              <select 
                value={bitType}
                onChange={(e) => setBitType(e.target.value)}
                className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-red-500/30 transition-all cursor-pointer"
              >
                <option value="hss">🛠️ HSS (High Speed Steel - Standard)</option>
                <option value="carbide">💎 Carbide (Premium Hardened Tip)</option>
              </select>
            </div>

            {/* DRILL DIAMETER */}
            <div className="border-t border-zinc-900/60 pt-4 space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-400 block">4. Drill Bit Diameter Size</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={diameterInput}
                  onChange={(e) => setDiameterInput(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="h-10 w-full rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none focus:border-red-500/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">
                  {unitSystem === "metric" ? "mm" : "Inch"}
                </span>
              </div>
            </div>

          </div>

          {/* COMPUTATIONAL OUTPUT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-red-500" /> Operational Machine Metrics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* RPM OUTPUT BOX */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Recommended Speed (RPM)</span>
                  <p className="text-4xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    {calculatedRpm > 0 ? calculatedRpm : "---"}
                  </p>
                </div>

                {/* FEED RATE OUTPUT BOX */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Estimated Feed Rate</span>
                  <p className="text-4xl font-black text-zinc-200 font-mono tracking-wider">
                    {calculatedFeed > 0 ? `${calculatedFeed}` : "---"}{" "}
                    <span className="text-xs text-zinc-500 font-normal">mm/min</span>
                  </p>
                </div>

                {/* RELEVANT METRIC CONTEXT INFO */}
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Material Cutting Surface Speed ($V_c$)</span>
                  <p className="text-xs font-bold text-zinc-300">
                    {cuttingSpeeds[material]?.[bitType]} Meters / Minute
                  </p>
                </div>
              </div>

              {/* SAFETY AND WORKSHOP INTELLIGENCE NOTE */}
              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Coolant Recommendation</span>
                  Always deploy standard fluid soluble oil emulsions or active cutting coolants when machining Stainless Steel (SS) or Cast Iron to avoid immediate structural thermal breakdown of the drill cutting edge.
                </div>
              </div>
            </div>

            {/* AD SPACE */}
            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ NATIVE_BOARD_AD_SPACE ]
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}