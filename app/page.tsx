"use client";

import { useState } from "react";
import { Search, Sparkles, Video, Image as ImageIcon, Calculator, Zap, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";

const portalHubs = [
  {
    id: "ai-tools",
    title: "AI Power Tools",
    description: "Enterprise neural computational tools for automation and generation.",
    icon: Sparkles,
    color: "bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-blue-500/30",
    shadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    link: "/tools/ai",
  },
  {
    id: "video-studio",
    title: "Video Studio",
    description: "Browser-side instant video manipulation, conversion, and effects.",
    icon: Video,
    color: "bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-green-500/30",
    shadow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]",
    link: "/tools/video",
  },
  {
    id: "image-hub",
    title: "Image Hub",
    description: "Cloud and client-side photo processing, background removal, and editing.",
    icon: ImageIcon,
    color: "bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-amber-500/30",
    shadow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
    link: "/tools/image",
  },
  {
    id: "calculators",
    title: "Calculators",
    description: "Advanced computational tools for multi-disciplinary complex mathematics.",
    icon: Calculator,
    color: "bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-purple-500/30",
    shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
    link: "/tools/calculators",
  },
  {
    id: "industrial-suite",
    title: "Industrial Suite",
    description: "Niche computational tools for engineering, fabrication, and welding.",
    icon: Building2,
    color: "bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-red-500/30",
    shadow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    link: "/tools/industrial",
  },
  {
    id: "utility-box",
    title: "Utility Box",
    description: "A collective toolkit for everyday file operations and system checks.",
    icon: Zap,
    color: "bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-cyan-500/30",
    shadow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
    link: "/tools/utility",
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHubs = portalHubs.filter((hub) =>
    hub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hub.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 📢 AD PLACEHOLDER 1: TOP LEADERBOARD BANNER */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_TOP_LEADERBOARD_AD_728X90 ]
        </div>

        {/* HERO & SEARCH SECTION */}
        <section className="text-center space-y-6 border-b border-zinc-900 pb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            DARK<span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">SYON</span> MATRIX PORTAL
          </h1>
          <p className="text-xs font-mono text-zinc-400 max-w-xl mx-auto">
            Select a computational domain hub to access specialized client-side and cloud-based operational tools.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search domain hubs..."
              className="w-full h-12 rounded-xl bg-zinc-900/30 border border-zinc-900 pl-11 pr-4 text-sm font-mono placeholder:text-zinc-700 focus:border-zinc-800 transition-all backdrop-blur-md outline-none"
            />
          </div>
        </section>

        {/* HUBS CATEGORY GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
              Computational Domains ({filteredHubs.length} Active Hubs)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHubs.map((hub) => (
              <Link 
                key={hub.id} 
                href={hub.link} 
                className={`group border border-zinc-900/80 rounded-2xl p-6 space-y-4 transition-all duration-3xl ${hub.color} ${hub.shadow}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <hub.icon className="w-6 h-6 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
                    <h3 className="text-lg font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors">{hub.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">{hub.description}</p>
                
                <div className="border-t border-zinc-900/60 pt-3 text-[10px] font-mono uppercase text-zinc-600 group-hover:text-zinc-400 tracking-wider transition-colors">
                  Open Category
                </div>
              </Link>
            ))}

            {/* 📢 AD PLACEHOLDER 2: IN-GRID NATIVE ADS CARD */}
            {filteredHubs.length > 0 && (
              <div className="border border-zinc-900/40 bg-zinc-900/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed text-[11px] font-mono text-zinc-700 min-h-[160px]">
                <span>[ SPONSORED LINK ]</span>
              </div>
            )}
          </div>

          {/* NO RESULTS VIEW */}
          {filteredHubs.length === 0 && (
            <div className="text-center py-20 border border-zinc-900 rounded-2xl bg-zinc-950/20 backdrop-blur-md space-y-2 font-mono">
              <Zap className="w-6 h-6 text-zinc-700 mx-auto" />
              <p className="text-xs font-bold text-zinc-400">NO HUB MATCHED</p>
            </div>
          )}
        </section>

        {/* 📢 AD PLACEHOLDER 3: BOTTOM HORIZONTAL AD UNIT */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest mt-12">
          [ DARKSYON_BOTTOM_BANNER_AD_728X90 ]
        </div>

      </div>
    </main>
  );
}