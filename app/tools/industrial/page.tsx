"use client";

import { useState } from "react";
import { Building2, Search, ChevronRight, ArrowRight, Zap, Flame } from "lucide-react";
import Link from "next/link";
import { Scale, Gauge, Cpu, Scissors, Activity, Layers } from "lucide-react";


const industrialToolsList = [
  {
    id: "welding-calculator",
    title: "Welding Parameters Calculator",
    description: "Compute precise industrial arc parameters, electrode grades, shielding flux, and current variables.",
    link: "/tools/industrial/welding-calculator", // Sahi path mapping
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Flame
  },
  // Baad mein jo dusre pipe miter ya cone tools banayenge wo yahan add hote jayenge
  {
    id: "metal-weight-calculator",
    title: "Metal Weight Calculator",
    description: "Estimate core weight and volume mass for iron sheets, box pipes, L-angles, and tubes.",
    link: "/tools/industrial/metal-weight-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Scale // Is component ke top par import { Scale } from "lucide-react" check kar lena bhai!
  },
  {
    id: "drilling-calculator",
    title: "Drilling Speed & Feed Calculator",
    description: "Compute precise industrial RPM limits and mechanical feed metrics for hard alloys.",
    link: "/tools/industrial/drilling-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Gauge // top par import { Gauge } from "lucide-react" check kar lena!
  },
  {
    id: "threading-calculator",
    title: "Tap Drill Size Calculator",
    description: "Compute structural core drill bits required for ISO Metric and UNC thread tapping.",
    link: "/tools/industrial/threading-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Cpu
  },
  {
    id: "miter-calculator",
    title: "Miter Cut Layout Calculator",
    description: "Compute precision structural diagonal marking offsets for metal frames and corner layouts.",
    link: "/tools/industrial/miter-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Scissors
  },
  {
    id: "pipe-notch-calculator",
    title: "Pipe Notch & Saddle Calculator",
    description: "Compute structural cut-back layout points for seamless pipe intersection joints.",
    link: "/tools/industrial/pipe-notch-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Activity
  },
  {
    id: "cone-calculator",
    title: "Cone Flat Layout Pattern Calculator",
    description: "Develop 2D flat sheets dimensions for industrial hoppers, funnels, and concentric cones.",
    link: "/tools/industrial/cone-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Layers
  },
  {
    id: "staircase-calculator",
    title: "Staircase Stringer & Slope Estimator",
    description: "Compute mechanical cutting angles, slopes, and total stringer beam lengths for stairs.",
    link: "/tools/industrial/staircase-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Activity
  },
  {
    id: "gas-calculator",
    title: "Welding Gas Shielding Cost Estimator",
    description: "Estimate total compressed shielding gas volume consumption and expenses for TIG/MIG runs.",
    link: "/tools/industrial/gas-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Flame
  },
  {
    id: "bending-calculator",
    title: "Sheet Metal Bend Allowance Calculator",
    description: "Compute blank length flat developments before executing press brake bending folds.",
    link: "/tools/industrial/bending-calculator",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    icon: Layers
  }
];

export default function IndustrialHubPage() {
  const [query, setQuery] = useState("");

  const filteredTools = industrialToolsList.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 📢 ADS PLACEHOLDER 1: TOP BANNER */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_INDUSTRIAL_HUB_TOP_AD_728X90 ]
        </div>

        {/* HEADER SECTION */}
        <section className="text-center space-y-4 border-b border-zinc-900 pb-10">
          <div className="flex items-center justify-center gap-3">
            <Building2 className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Industrial Suite
            </h1>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Specialized engineering, fabrication, and metallurgy tools designed for industry professionals.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search industrial tools..."
              className="w-full h-11 rounded-xl bg-zinc-900/30 border border-zinc-900 pl-11 pr-4 text-sm font-mono placeholder:text-zinc-700 focus:border-red-500/30 transition-all backdrop-blur-md outline-none"
            />
          </div>
        </section>

        {/* GRID LAYOUT */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
            Active Industrial Modules ({filteredTools.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.link}
                className={`group border border-zinc-900 bg-zinc-900/40 rounded-2xl p-6 space-y-4 transition-all duration-3xl hover:bg-zinc-900/80 ${tool.borderGlow}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <tool.icon className="w-5 h-5 text-zinc-500 group-hover:text-red-400 transition-colors" />
                    <h3 className="text-md font-bold text-zinc-200 group-hover:text-white transition-colors">{tool.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-red-400 transition-all" />
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">{tool.description}</p>
                
                <div className="border-t border-zinc-900/60 pt-3 text-[10px] font-mono uppercase text-zinc-600 group-hover:text-red-400 tracking-wider flex items-center gap-1">
                  Launch Module <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}

            {/* 📢 ADS PLACEHOLDER 2 */}
            {filteredTools.length > 0 && (
              <div className="border border-zinc-900/40 bg-zinc-900/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed text-[11px] font-mono text-zinc-700 min-h-[160px]">
                <span>[ SPONSORED PRODUCTION LINK ]</span>
              </div>
            )}
          </div>
        </section>

        {/* 📢 ADS PLACEHOLDER 3 */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest mt-12">
          [ DARKSYON_INDUSTRIAL_BOTTOM_AD_728X90 ]
        </div>

      </div>
    </main>
  );
}