"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Activity } from "lucide-react";

export default function StaircaseCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [totalRise, setTotalRise] = useState<number>(2500); // mm or inches
  const [totalRun, setTotalRun] = useState<number>(3500);  // mm or inches

  const [slopeAngle, setSlopeAngle] = useState<number>(0);
  const [stringerLength, setStringerLength] = useState<number>(0);

  useEffect(() => {
    if (totalRise <= 0 || totalRun <= 0 || isNaN(totalRise) || isNaN(totalRun)) {
      setSlopeAngle(0);
      setStringerLength(0);
      return;
    }

    // 1. Calculate Slope Angle = atan(Rise / Run) converted to degrees
    const angleRad = Math.atan(totalRise / totalRun);
    const angleDeg = (angleRad * 180) / Math.PI;

    // 2. Calculate Stringer Length = sqrt(Rise^2 + Run^2)
    const length = Math.sqrt(Math.pow(totalRise, 2) + Math.pow(totalRun, 2));

    setSlopeAngle(Number(angleDeg.toFixed(1)));
    if (unitSystem === "metric") {
      setStringerLength(Number((length / 1000).toFixed(2))); // Convert mm to Meters for length display
    } else {
      setStringerLength(Number((length / 12).toFixed(2))); // Convert inches to Feet
    }
  }, [unitSystem, totalRise, totalRun]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            🪜 Staircase Stringer & Railing Estimator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute precision layout slopes, structural cutting angles, and total stringer beam lengths for steel stairs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Frame Boundaries
            </h3>

            {/* UNITS */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Dimension Unit System</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setUnitSystem("metric")} className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${unitSystem === "metric" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>Metric (mm)</button>
                <button onClick={() => setUnitSystem("imperial")} className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${unitSystem === "imperial" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>Imperial (Inches)</button>
              </div>
            </div>

            {/* TOTAL RISE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 block">2. Total Vertical Rise (Height)</label>
              <div className="relative">
                <input type="number" value={totalRise} onChange={(e) => setTotalRise(Math.max(0, parseFloat(e.target.value) || 0))} className="h-10 w-full rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">{unitSystem === "metric" ? "mm" : "Inch"}</span>
              </div>
            </div>

            {/* TOTAL RUN */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 block">3. Total Horizontal Run (Length)</label>
              <div className="relative">
                <input type="number" value={totalRun} onChange={(e) => setTotalRun(Math.max(0, parseFloat(e.target.value) || 0))} className="h-10 w-full rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">{unitSystem === "metric" ? "mm" : "Inch"}</span>
              </div>
            </div>
          </div>

          {/* OUTPUT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-red-500" /> Compiled Structural Angles
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Cutting & Slope Angle</span>
                  <p className="text-4xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    {slopeAngle}°
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Total Beam Length</span>
                  <p className="text-4xl font-black text-zinc-200 font-mono tracking-wider">
                    {stringerLength} <span className="text-xs text-zinc-500 font-normal">{unitSystem === "metric" ? "Meters" : "Feet"}</span>
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs font-mono leading-relaxed text-zinc-400">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Fabrication Advice</span>
                  The computed cutting slope angle applies perfectly to both the **Staircase Side Channel/Stringer** and the **Handrail Railing Layout**. Standard comfortable stair slopes are ideally positioned between 30° and 38°.
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