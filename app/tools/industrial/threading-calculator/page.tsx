"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Cpu, ShieldAlert, Sparkles } from "lucide-react";

// GLOBAL THREAD DATA MATRIX
const metricThreads = [
  { name: "M3 x 0.5", diameter: 3, pitch: 0.5, drill: 2.5 },
  { name: "M4 x 0.7", diameter: 4, pitch: 0.7, drill: 3.3 },
  { name: "M5 x 0.8", diameter: 5, pitch: 0.8, drill: 4.2 },
  { name: "M6 x 1.0", diameter: 6, pitch: 1.0, drill: 5.0 },
  { name: "M8 x 1.25", diameter: 8, pitch: 1.25, drill: 6.8 },
  { name: "M10 x 1.5", diameter: 10, pitch: 1.5, drill: 8.5 },
  { name: "M12 x 1.75", diameter: 12, pitch: 1.75, drill: 10.3 },
  { name: "M14 x 2.0", diameter: 14, pitch: 2.0, drill: 12.0 },
  { name: "M16 x 2.0", diameter: 16, pitch: 2.0, drill: 14.0 },
  { name: "M20 x 2.5", diameter: 20, pitch: 2.5, drill: 17.5 },
];

const imperialThreads = [
  { name: '1/4" - 20 UNC', drill: "#7 (5.1mm)", clearance: 'F (6.5mm)' },
  { name: '5/16" - 18 UNC', drill: "F (6.6mm)", clearance: 'P (8.2mm)' },
  { name: '3/8" - 16 UNC', drill: "5/16\" (7.9mm)", clearance: 'W (9.8mm)' },
  { name: '1/2" - 13 UNC', drill: "27/64\" (10.7mm)", clearance: '17/32\" (13.5mm)' },
  { name: '5/8" - 11 UNC', drill: "17/32\" (13.5mm)", clearance: '21/32\" (16.7mm)' },
  { name: '3/4" - 10 UNC', drill: "21/32\" (16.5mm)", clearance: '25/32\" (19.8mm)' },
];

export default function ThreadingCalculator() {
  const [threadStandard, setThreadStandard] = useState("metric");
  const [selectedIndex, setSelectedIndex] = useState(3); // Default to M6 or 1/2"

  useEffect(() => {
    setSelectedIndex(0); // Reset index on system standard switch
  }, [threadStandard]);

  const activeMetric = metricThreads[selectedIndex] || metricThreads;
  const activeImperial = imperialThreads[selectedIndex] || imperialThreads;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP AD */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_THREADING_BANNER_728X90 ]
        </div>

        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <Cpu className="w-8 h-8 text-red-500" /> Tap Drill Size Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute precision core drill bit diameters before initializing mechanical threading operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Thread Selection
            </h3>

            {/* STANDARD TOGGLE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Thread Classification</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setThreadStandard("metric")}
                  className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                    threadStandard === "metric" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}
                >
                  ISO Metric (M-Series)
                </button>
                <button
                  onClick={() => setThreadStandard("imperial")}
                  className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                    threadStandard === "imperial" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}
                >
                  Imperial (UNC Coarse)
                </button>
              </div>
            </div>

            {/* DYNAMIC THREAD SIZE LIST */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">2. Target Thread Size</label>
              <select 
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(parseInt(e.target.value) || 0)}
                className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-red-500/30 transition-all cursor-pointer"
              >
                {threadStandard === "metric" 
                  ? metricThreads.map((t, idx) => <option key={idx} value={idx}>{t.name} Thread</option>)
                  : imperialThreads.map((t, idx) => <option key={idx} value={idx}>{t.name}</option>)
                }
              </select>
            </div>

          </div>

          {/* OUTPUT VIEWPORT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                ⚙️ Core Operational Parameters
              </h3>

              {threadStandard === "metric" ? (
                // METRIC DISPLAY MATRIX
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Required Drill Bit Size</span>
                    <p className="text-4xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      {activeMetric.drill.toFixed(1)} <span className="text-sm font-normal text-zinc-500">mm</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                      <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Major Bolt Dia</span>
                      <p className="text-sm font-bold text-zinc-200">{activeMetric.diameter} mm</p>
                    </div>
                    <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                      <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Thread Pitch</span>
                      <p className="text-sm font-bold text-zinc-200">{activeMetric.pitch} mm</p>
                    </div>
                  </div>
                </div>
              ) : (
                // IMPERIAL DISPLAY MATRIX
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Required Tap Drill Size</span>
                    <p className="text-4xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      {activeImperial.drill}
                    </p>
                  </div>

                  <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Close Clearance Hole Size</span>
                    <p className="text-sm font-bold text-zinc-200">{activeImperial.clearance}</p>
                  </div>
                </div>
              )}

              {/* WARNING LABELS */}
              <div className="border border-yellow-500/10 bg-yellow-500/5 text-yellow-500/80 rounded-xl p-4 flex gap-3 text-xs leading-relaxed font-mono">
                <ShieldAlert className="w-5 h-5 flex-shrink-0 text-yellow-500/60 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] tracking-wide mb-0.5">Tapping Torque Brief</span>
                  Apply steady pressure and back off the tap 1/4 turn after every full rotation to clear out metallic chips and structural debris from the threads.
                </div>
              </div>
              {/* 📚 ADSENSE COMPLIANCE: THREADING INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Screw Thread Pitch and Clearance Geometry Solvers
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      Our mechanical threading module computes pitch diameter limits, major/minor diameters, and tapping drill dimensions for standard fasteners. It balances metrics across ISO and Unified Thread standards to prevent bolt strip risks.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Analyze minor diameters and threading tolerances needed for secure industrial bolting.</p>
    </div>
    <a href="/blog/machining-screw-threads-guide" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>
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