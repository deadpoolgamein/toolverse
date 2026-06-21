"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Scissors, ShieldAlert, Sparkles } from "lucide-react";

export default function MiterCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric"); // metric (mm) vs imperial (inch)
  const [profileWidth, setProfileWidth] = useState<number>(50); // Default 50mm or 2 inches
  const [jointAngle, setJointAngle] = useState<number>(90); // Default 90 degree corner frame
  
  const [cutAngle, setCutAngle] = useState<number>(45);
  const [markingOffset, setMarkingOffset] = useState<number>(0);

  useEffect(() => {
    // 1. Calculate individual piece cut angle (usually Joint Angle / 2)
    const singleCutAngle = jointAngle / 2;
    setCutAngle(singleCutAngle);

    // 2. Normalise width input to MM for formula processing
    let widthMm = profileWidth;
    if (unitSystem === "imperial") {
      widthMm = profileWidth * 25.4; // Inch to mm
    }

    if (widthMm <= 0 || isNaN(widthMm) || singleCutAngle <= 0 || singleCutAngle >= 90) {
      setMarkingOffset(0);
      return;
    }

    // 3. Formula: Offset = Width * tan(Cut Angle)
    // Convert degrees to radians for JS Math.tan
    const angleRadians = (singleCutAngle * Math.PI) / 180;
    const offset = widthMm * Math.tan(angleRadians);

    // 4. Return output scaled to original system view
    if (unitSystem === "metric") {
      setMarkingOffset(Number(offset.toFixed(1)));
    } else {
      setMarkingOffset(Number((offset / 25.4).toFixed(3))); // Convert back to Inches
    }

  }, [unitSystem, profileWidth, jointAngle]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP AD SKELETON */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_MITER_BANNER_728X90 ]
        </div>

        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <Scissors className="w-8 h-8 text-red-500" /> Miter Cut Layout Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute precision geometric marking offsets for metal angles, channels, and box pipes layout marking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Layout Variables
            </h3>

            {/* UNIT SYSTEM */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Measurement System</label>
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

            {/* WIDTH FIELD */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 block">2. Profile / Angle Width</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={profileWidth}
                  onChange={(e) => setProfileWidth(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="h-10 w-full rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none focus:border-red-500/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">
                  {unitSystem === "metric" ? "mm" : "Inch"}
                </span>
              </div>
            </div>

            {/* TARGET JOINT ANGLE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 block">3. Desired Frame Corner Angle</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={jointAngle}
                  onChange={(e) => setJointAngle(Math.max(1, Math.min(179, parseFloat(e.target.value) || 0)))}
                  className="h-10 w-full rounded-xl bg-zinc-950 border border-zinc-900 pr-16 pl-3 font-mono text-xs text-right text-white outline-none focus:border-red-500/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">
                  Degrees (°)
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-600">Standard square corner frames require a 90° value layout.</p>
            </div>

          </div>

          {/* OUTPUT VIEWPORT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                📐 Precision Marking Blueprint
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* MARKING OFFSET OUTPUT BOX */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner sm:col-span-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Marking Offset Distance (X)</span>
                  <p className="text-4xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    {markingOffset > 0 ? markingOffset : "---"}{" "}
                    <span className="text-sm font-normal text-zinc-500">{unitSystem === "metric" ? "mm" : "Inch"}</span>
                  </p>
                </div>

                {/* SINGLE BLADE CUT ANGLE */}
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Chop-Saw Blade Angle</span>
                  <p className="text-md font-bold text-zinc-200">{cutAngle}°</p>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Target Calculation Mod</span>
                  <p className="text-xs font-bold text-red-400 uppercase font-mono">{unitSystem === "metric" ? "METRIC OFFSET" : "IMPERIAL OFFSET"}</p>
                </div>
              </div>

              {/* HOW TO MARK BRIEF DESCRIPTION */}
              <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-4 flex gap-3 text-xs font-mono leading-relaxed text-zinc-400">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">How To Mark This Layout</span>
                  Measure the computed distance (X) from the extreme edge of your profile and place a point. Draw a straight diagonal scribed line from that point back to the zero corner edge, then execute your chop-saw blade cut along that vector path.
                </div>
              </div>
              {/* 📚 ADSENSE COMPLIANCE: MITER INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Angular Miter Joint Cutting Grid Optimizers
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      Our spatial carpentry miter script computes exact saw blade angles for multi-sided frame intersections. Balancing wall angles against corner parameters, it generates precise cutting steps to ensure seamless joint fits.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Learn how composite angles align crown moldings and raw framing structures cleanly.</p>
    </div>
    <a href="/blog/miter-joint-cutting-angles" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>
            </div>

            {/* AD SPACE BASEMENT */}
            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ NATIVE_BOARD_AD_SPACE ]
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}