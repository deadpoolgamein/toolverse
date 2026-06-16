"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Activity, Move, PenTool } from "lucide-react";

export default function PipeWrapCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [pipeDiameter, setPipeDiameter] = useState<number>(60);
  const [branchAngle, setBranchAngle] = useState<number>(90);

  const [circumference, setCircumference] = useState<number>(0);
  const [quarterDivision, setQuarterDivision] = useState<number>(0);
  const [layoutPoints, setLayoutPoints] = useState<Record<string, number>>({});

  useEffect(() => {
    let diaMm = pipeDiameter;
    if (unitSystem === "imperial") {
      diaMm = pipeDiameter * 25.4;
    }

    if (diaMm <= 0 || isNaN(diaMm) || branchAngle <= 0 || branchAngle > 90) {
      setCircumference(0);
      setQuarterDivision(0);
      setLayoutPoints({});
      return;
    }

    const totalWrap = Math.PI * diaMm;
    const quarter = totalWrap / 4;
    const angleRad = (branchAngle * Math.PI) / 180;
    const r = diaMm / 2;

    const offset0 = 0;
    const offset45 = (r * (1 - Math.sqrt(1 - 0.5))) / Math.sin(angleRad);
    const offset90 = (r * (1 - Math.sqrt(1 - 1))) / Math.sin(angleRad);

    if (unitSystem === "metric") {
      setCircumference(Number(totalWrap.toFixed(1)));
      setQuarterDivision(Number(quarter.toFixed(1)));
      setLayoutPoints({
        p0: Number(offset0.toFixed(1)),
        p45: Number(offset45.toFixed(1)),
        p90: Number(offset90.toFixed(1)),
      });
    } else {
      setCircumference(Number((totalWrap / 25.4).toFixed(3)));
      setQuarterDivision(Number((quarter / 25.4).toFixed(3)));
      setLayoutPoints({
        p0: Number((offset0 / 25.4).toFixed(3)),
        p45: Number((offset45 / 25.4).toFixed(3)),
        p90: Number((offset90 / 25.4).toFixed(3)),
      });
    }
  }, [unitSystem, pipeDiameter, branchAngle]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <PenTool className="w-8 h-8 text-red-500" /> Pipe Wrap Marking Tool
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Simple 2D layout guide to cut pipe joints (Saddle/Mouth) using a paper strip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* LEFT: INPUTS & DIAGRAM */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1 text-red-500">
                1. Dimensions (Maap)
                </h3>

                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setUnitSystem("metric")} className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all ${unitSystem === "metric" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>mm / Meter</button>
                    <button onClick={() => setUnitSystem("imperial")} className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all ${unitSystem === "imperial" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}>Inch / Foot</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Pipe Diameter (OD)</label>
                    <input type="number" value={pipeDiameter} onChange={(e) => setPipeDiameter(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-sm text-white outline-none focus:border-red-500/40" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Joint Angle (Degree)</label>
                    <input type="number" value={branchAngle} onChange={(e) => setBranchAngle(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-sm text-white outline-none focus:border-red-500/40" />
                  </div>
                </div>
            </div>

            {/* SIMPLE VISUAL GUIDE */}
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                2. Marking Guide (Diagram)
                </h3>
                <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-900 flex flex-col items-center justify-center">
                    {/* SIMPLIFIED SVG */}
                    <svg width="100%" height="120" viewBox="0 0 200 80">
                      {/* Paper Strip */}
                      <rect x="10" y="10" width="180" height="60" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="4,2" />
                      {/* Vertical Lines */}
                      <line x1="10" y1="10" x2="10" y2="70" stroke="#444" strokeWidth="1" />
                      <line x1="55" y1="10" x2="55" y2="70" stroke="#444" strokeWidth="1" />
                      <line x1="100" y1="10" x2="100" y2="70" stroke="#ef4444" strokeWidth="1" />
                      <line x1="145" y1="10" x2="145" y2="70" stroke="#444" strokeWidth="1" />
                      <line x1="190" y1="10" x2="190" y2="70" stroke="#444" strokeWidth="1" />
                      {/* The Curve */}
                      <path d="M 10 10 C 55 40, 145 40, 190 10 L 190 70 L 10 70 Z" fill="#ef444410" stroke="#ef4444" strokeWidth="2" />
                      {/* Points */}
                      <circle cx="10" cy="10" r="2" fill="white" />
                      <circle cx="100" cy="40" r="2" fill="#ef4444" />
                      <circle cx="190" cy="10" r="2" fill="white" />
                    </svg>
                    <div className="w-full grid grid-cols-3 text-[8px] font-mono text-zinc-500 mt-2 text-center">
                      <span>START (0)</span>
                      <span className="text-red-500 uppercase">Center Mark</span>
                      <span>END (360°)</span>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT: RESULTS & STEPS */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-4 mb-6">
                3. Marking Values (Kitna Nishan Lagana Hai)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* RESULT 1 */}
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Paper Strip Length</span>
                  <p className="text-2xl font-black text-white">{circumference || "0"} <span className="text-xs text-zinc-600 font-normal">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                  <p className="text-[9px] text-zinc-600">Total paper piece to cut.</p>
                </div>

                {/* RESULT 2 */}
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Quarter Gap</span>
                  <p className="text-2xl font-black text-white">{quarterDivision || "0"} <span className="text-xs text-zinc-600 font-normal">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                  <p className="text-[9px] text-zinc-600">Distance between 4 vertical lines.</p>
                </div>

                {/* RESULT 3 (CRITICAL) */}
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1 md:col-span-2">
                  <span className="text-[10px] font-mono text-red-500 uppercase font-bold tracking-tighter">Center Notch Depth (Important)</span>
                  <p className="text-4xl font-black text-red-500">{layoutPoints.p90 ?? "0"} <span className="text-sm font-normal text-zinc-600">{unitSystem === "metric" ? "mm" : "in"}</span></p>
                  <p className="text-[10px] text-zinc-500">This is how deep the curve goes in the middle.</p>
                </div>
              </div>

              {/* EASY STEPS */}
              <div className="mt-8 space-y-4">
                 <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">Step-by-Step Marking</h4>
                 <div className="grid grid-cols-1 gap-2 text-[11px] font-mono text-zinc-500">
                    <div className="flex gap-3 items-start bg-zinc-900/40 p-3 rounded-lg">
                      <span className="bg-red-500 text-white w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[9px]">1</span>
                      <p>Cut a paper strip of <b className="text-zinc-200">{circumference}</b> length and wrap it around the pipe.</p>
                    </div>
                    <div className="flex gap-3 items-start bg-zinc-900/40 p-3 rounded-lg">
                      <span className="bg-red-500 text-white w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[9px]">2</span>
                      <p>Divide paper into 4 parts. At the middle line, mark a point <b className="text-red-400">{layoutPoints.p90}</b> deep from the top edge.</p>
                    </div>
                    <div className="flex gap-3 items-start bg-zinc-900/40 p-3 rounded-lg">
                      <span className="bg-red-500 text-white w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[9px]">3</span>
                      <p>Draw a curved line connecting the start edge to this middle point, and back to the end edge. Cut along this curve.</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider">
              [ DARKSYON_PIPE_WRAP_AD ]
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}