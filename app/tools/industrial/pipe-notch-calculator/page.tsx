"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Activity, ShieldAlert } from "lucide-react";

export default function PipeNotchCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [pipeDia, setPipeDia] = useState<number>(50); // Outer Diameter
  const [branchAngle, setBranchAngle] = useState<number>(90); // Joint angle (usually 90)

  // Computed layout points (offsets around the pipe circumference at 0°, 45°, 90°, 135°, 180°)
  const [offsets, setOffsets] = useState<Record<string, number>>({});

  useEffect(() => {
    let diaMm = pipeDia;
    if (unitSystem === "imperial") {
      diaMm = pipeDia * 25.4;
    }

    if (diaMm <= 0 || isNaN(diaMm) || branchAngle <= 0 || branchAngle > 90) {
      setOffsets({});
      return;
    }

    const angleRad = (branchAngle * Math.PI) / 180;
    const r = diaMm / 2;

    // Volumetric curvature profiling matrix
    // Formulas mapping coordinates for 0, 45, and 90 degree ordinal axis points
    const offset0 = 0;
    const offset45 = r * (1 - Math.sqrt(1 - 0.5)) / Math.sin(angleRad);
    const offset90 = r * (1 - Math.sqrt(1 - 1)) / Math.sin(angleRad); // Peak notch depth

    if (unitSystem === "metric") {
      setOffsets({
        pt0: Number(offset0.toFixed(1)),
        pt45: Number(offset45.toFixed(1)),
        pt90: Number(offset90.toFixed(1)),
      });
    } else {
      setOffsets({
        pt0: Number((offset0 / 25.4).toFixed(3)),
        pt45: Number((offset45 / 25.4).toFixed(3)),
        pt90: Number((offset90 / 25.4).toFixed(3)),
      });
    }
  }, [unitSystem, pipeDia, branchAngle]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            🚰 Pipe Notch & Saddle Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute precise geometric cut-back coordinates to create perfect seamless pipe-to-pipe mouth joints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Layout Metrics
            </h3>

            {/* UNITS */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Measurement System</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setUnitSystem("metric")} className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${unitSystem === "metric" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>Metric (mm)</button>
                <button onClick={() => setUnitSystem("imperial")} className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${unitSystem === "imperial" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>Imperial (Inch)</button>
              </div>
            </div>

            {/* DIAMETER */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 block">2. Pipe Outer Diameter (OD)</label>
              <div className="relative">
                <input type="number" value={pipeDia} onChange={(e) => setPipeDia(Math.max(0, parseFloat(e.target.value) || 0))} className="h-10 w-full rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">{unitSystem === "metric" ? "mm" : "Inch"}</span>
              </div>
            </div>

            {/* ANGLE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 block">3. Branch Intersection Angle</label>
              <div className="relative">
                <input type="number" value={branchAngle} onChange={(e) => setBranchAngle(Math.max(1, Math.min(90, parseFloat(e.target.value) || 0)))} className="h-10 w-full rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">Degrees (°)</span>
              </div>
            </div>
          </div>

          {/* OUTPUT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-red-500" /> Curve Marking Template Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Side Base (0°)</span>
                  <p className="text-2xl font-black text-zinc-300">{offsets.pt0 ?? "---"} <span className="text-xs text-zinc-600">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Mid Curve (45°)</span>
                  <p className="text-2xl font-black text-red-400">{offsets.pt45 ?? "---"} <span className="text-xs text-zinc-600">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Center Peak (90°)</span>
                  <p className="text-2xl font-black text-red-500">{offsets.pt90 ?? "---"} <span className="text-xs text-zinc-600">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs font-mono leading-relaxed text-zinc-400">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Layout Scribing Instructions</span>
                  Divide the pipe circumference into 4 equal quarters. Mark the center peak depth at the top and bottom quarters, then blend the points through the 45° marks to create a clean wrapping template curve before cutting.
                </div>
              </div>
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