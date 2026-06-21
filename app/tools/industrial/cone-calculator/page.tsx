"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Layers, Sparkles } from "lucide-react";

export default function ConeCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [topDia, setTopDia] = useState<number>(40);  // Small radius end
  const [bottomDia, setBottomDia] = useState<number>(100); // Big radius end
  const [height, setHeight] = useState<number>(80);  // Vertical height

  const [innerRadius, setInnerRadius] = useState<number>(0);
  const [outerRadius, setOuterRadius] = useState<number>(0);
  const [patternAngle, setPatternAngle] = useState<number>(0);

  useEffect(() => {
    let tD = topDia, bD = bottomDia, h = height;
    if (unitSystem === "imperial") {
      tD *= 25.4; bD *= 25.4; h *= 25.4;
    }

    if (tD < 0 || bD <= tD || h <= 0 || isNaN(tD) || isNaN(bD) || isNaN(h)) {
      setInnerRadius(0); setOuterRadius(0); setPatternAngle(0);
      return;
    }

    const r1 = tD / 2;
    const r2 = bD / 2;

    // Flat template development geometry formulas
    const slantHeight = Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(h, 2));
    const R_outer = (r2 * slantHeight) / (r2 - r1);
    const R_inner = R_outer - slantHeight;
    const theta = (360 * r2) / R_outer;

    if (unitSystem === "metric") {
      setInnerRadius(Number(R_inner.toFixed(1)));
      setOuterRadius(Number(R_outer.toFixed(1)));
    } else {
      setInnerRadius(Number((R_inner / 25.4).toFixed(3)));
      setOuterRadius(Number((R_outer / 25.4).toFixed(3)));
    }
    setPatternAngle(Number(theta.toFixed(1)));
  }, [unitSystem, topDia, bottomDia, height]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            📐 Cone Flat Layout Development Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Develop 2D flat patterns for industrial cones, hoppers, and conical frustums.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Target Proportions
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Measurement System</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setUnitSystem("metric")} className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${unitSystem === "metric" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>Metric (mm)</button>
                <button onClick={() => setUnitSystem("imperial")} className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${unitSystem === "imperial" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>Imperial (Inch)</button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <span className="text-xs font-mono text-zinc-500 block">Top Flat Diameter (Small End)</span>
                <input type="number" value={topDia} onChange={(e) => setTopDia(Math.max(0, parseFloat(e.target.value) || 0))} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500 block">Bottom Base Diameter (Big End)</span>
                <input type="number" value={bottomDia} onChange={(e) => setBottomDia(Math.max(0, parseFloat(e.target.value) || 0))} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500 block">Vertical Cone Height</span>
                <input type="number" value={height} onChange={(e) => setHeight(Math.max(0, parseFloat(e.target.value) || 0))} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-red-500" /> Flat Pattern Blueprint
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Inner Radius (R1)</span>
                  <p className="text-xl font-black text-zinc-300">{innerRadius} <span className="text-xs font-normal text-zinc-600">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Outer Radius (R2)</span>
                  <p className="text-xl font-black text-red-400">{outerRadius} <span className="text-xs font-normal text-zinc-600">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Pattern Angle (θ)</span>
                  <p className="text-xl font-black text-red-500">{patternAngle}°</p>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs font-mono leading-relaxed text-zinc-400">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Scribing Directions</span>
                  On a flat metal sheet, use a compass or wire rope radius pivot to scribe two concentric arcs using **R1** and **R2**. Measure the total template arc sweep up to the exact **Pattern Angle (θ)** before slicing.
                </div>
              </div>
              {/* 📚 ADSENSE COMPLIANCE: CONE INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Truncated Cone Radial Development Solvers
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      Our fabrication layout utility calculates flat sheet developments for concentric cones and frustums. Processing top/bottom diameters and vertical height metrics on client threads, it returns precise flat template radius cuts instantly.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Master radial layout methods used to wrap flat plates into 3D conical sheets.</p>
    </div>
    <a href="/blog/truncated-cone-fabrication-guide" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
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