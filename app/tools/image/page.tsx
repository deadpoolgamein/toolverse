"use client";

import { useState } from "react";
import { Image as ImageIcon, Search, ChevronRight, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const imagesToolsList = [
  {
    id: "bg-remover",
    title: "AI Background Remover",
    description: "Enterprise-grade background manipulation powered by remote server-side neural layers.",
    link: "/tools/image/bg-remover",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Reduce file sizes efficiently while preserving premium matrix pixel density.",
    link: "/tools/image/image-compressor",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
  },
  {
    id: "image-cropper",
    title: "Image Cropper",
    description: "Crop and trim precise dimensions with advanced aspect ratio anchoring.",
    link: "/tools/image/image-cropper",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
  },
  {
    id: "image-resizer",
    title: "Image Resizer",
    description: "Scale images to custom width and height inputs on target layers.",
    link: "/tools/image/image-resizer",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
  },
  {
    id: "jpg-to-png",
    title: "JPG to PNG Converter",
    description: "Transform lossy JPG frameworks into alpha-channel transparent PNG formats.",
    link: "/tools/image/jpg-to-png",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
  },
  {
    id: "png-to-jpg",
    title: "PNG to JPG Converter",
    description: "Convert high-resolution PNG matrices into lightweight optimized JPG files.",
    link: "/tools/image/png-to-jpg",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
  },
];

export default function ImageHubPage() {
  const [query, setQuery] = useState("");

  const filteredTools = imagesToolsList.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 📢 ADS PLACEHOLDER 1: TOP BANNER */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_IMAGE_HUB_TOP_AD_728X90 ]
        </div>

        {/* HEADER SECTION */}
        <section className="text-center space-y-4 border-b border-zinc-900 pb-10">
          <div className="flex items-center justify-center gap-3">
            <ImageIcon className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Image Hub Studio
            </h1>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Manipulate digital graphics, execute compression engines, and transform formats entirely client-side.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search graphics & image tools..."
              className="w-full h-11 rounded-xl bg-zinc-900/30 border border-zinc-900 pl-11 pr-4 text-sm font-mono placeholder:text-zinc-700 focus:border-amber-500/30 transition-all backdrop-blur-md outline-none"
            />
          </div>
        </section>

        {/* GRID LAYOUT */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
            Active Processing Modules ({filteredTools.length})
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
                    <ImageIcon className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                    <h3 className="text-md font-bold text-zinc-200 group-hover:text-white transition-colors">{tool.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-amber-400 transition-all" />
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">{tool.description}</p>
                
                <div className="border-t border-zinc-900/60 pt-3 text-[10px] font-mono uppercase text-zinc-600 group-hover:text-amber-400 tracking-wider flex items-center gap-1">
                  Launch Processor <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}

            {/* 📢 ADS PLACEHOLDER 2: IN-GRID NATIVE ADS */}
            {filteredTools.length > 0 && (
              <div className="border border-zinc-900/40 bg-zinc-900/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed text-[11px] font-mono text-zinc-700 min-h-[160px]">
                <span>[ SPONSORED GRAPHICS LINK ]</span>
              </div>
            )}
          </div>
        </section>

        {/* 📢 ADS PLACEHOLDER 3: BOTTOM BANNER */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest mt-12">
          [ DARKSYON_IMAGE_HUB_BOTTOM_AD_728X90 ]
        </div>

      </div>
    </main>
  );
}