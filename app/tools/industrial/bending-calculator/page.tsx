"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Layers } from "lucide-react";

export default function BendingCalculator() {
  const [thickness, setThickness] = useState<number>(3);    // Sheet thickness in mm
  const [insideRadius, setInsideRadius] = useState<number>(3); // Inside bend radius in mm
  const [bendAngle, setBendAngle] = useState<number>(90);    // Angle of bend in degrees
  const [kFactor, setKFactor] = useState<number>(0.44);      // K-factor for steel standard

  const [bendAllowance, setBendAllowance] = useState<number>(0);

  useEffect(() => {
    if (thickness <= 0 || insideRadius < 0 || bendAngle <= 0 || isNaN(thickness) || isNaN(insideRadius) || isNaN(bendAngle)) {
      setBendAllowance(0);
      return;
    }

    // Standard Metrological Engineering Formula for Bend Allowance (BA)
    // BA = Angle * (pi / 180) * (Radius + (K-Factor * Thickness))
    const angleRadians = (bendAngle * Math.PI) / 180;
    const BA = angleRadians * (insideRadius + (kFactor * thickness));

    setBendAllowance(Number(BA.toFixed(2)));
  }, [thickness, insideRadius, bendAngle, kFactor]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            📐 Sheet Metal Bend Allowance Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute precision layout dynamic elongation developments before processing industrial press folds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-4 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Gauge Metrics (mm)
            </h3>

            <div>
              <span className="text-xs font-mono text-zinc-500 block">Sheet Metal Material Thickness</span>
              <input type="number" value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Inside Folding Bend Radius</span>
              <input type="number" value={insideRadius} onChange={(e) => setInsideRadius(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Desired Target Bend Angle (°)</span>
              <input type="number" value={bendAngle} onChange={(e) => setBendAngle(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Material Factor constant (K-Factor)</span>
              <input type="number" step="0.01" value={kFactor} onChange={(e) => setKFactor(parseFloat(e.target.value) || 0)} className="h-9 w-full mt-1 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>
          </div>

          {/* OUTPUT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-red-500" /> Developed Blank Material Size
              </h3>

              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Calculated Bend Allowance (BA)</span>
                <p className="text-4xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  {bendAllowance} <span className="text-sm font-normal text-zinc-500">mm</span>
                </p>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Press Deployment Guide</span>
                  Add this calculated **Bend Allowance (BA)** factor directly to your straight leg lengths dimension configurations to determine the complete precise flat metal sheet blank size before starting any stamping process operations.
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