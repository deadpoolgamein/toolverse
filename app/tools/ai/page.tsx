"use client";

import { useState } from "react";
import { Sparkles, Search, ChevronRight, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const aiToolsList = [
  {
    id: "ai-seo-description",
    title: "AI SEO Description Generator",
    description: "Generate highly optimized, metadata-rich SEO descriptions powered by neural processing layers.",
    link: "/tools/ai/ai-seo-description",
    borderGlow: "hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
  },
  {
    id: "ai-tweet-generator",
    title: "AI Tweet Generator",
    description: "Convert high-level textual inputs into highly engaging matrix-driven viral social posts.",
    link: "/tools/ai/ai-tweet-generator",
    borderGlow: "hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
  },
];

export default function AiHubPage() {
  const [query, setQuery] = useState("");

  const filteredTools = aiToolsList.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 📢 ADS PLACEHOLDER 1: TOP BANNER */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_AI_HUB_TOP_AD_728X90 ]
        </div>

        {/* HEADER SECTION */}
        <section className="text-center space-y-4 border-b border-zinc-900 pb-10">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              AI Power Tools
            </h1>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Deploy language models and advanced text classification directly on secure pipeline integrations.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI automated tools..."
              className="w-full h-11 rounded-xl bg-zinc-900/30 border border-zinc-900 pl-11 pr-4 text-sm font-mono placeholder:text-zinc-700 focus:border-blue-500/30 transition-all backdrop-blur-md outline-none"
            />
          </div>
        </section>

        {/* GRID LAYOUT */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
            Active Neural Engines ({filteredTools.length})
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
                    <Sparkles className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                    <h3 className="text-md font-bold text-zinc-200 group-hover:text-white transition-colors">{tool.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-400 transition-all" />
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">{tool.description}</p>
                
                <div className="border-t border-zinc-900/60 pt-3 text-[10px] font-mono uppercase text-zinc-600 group-hover:text-blue-400 tracking-wider flex items-center gap-1">
                  Launch Generator <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}

            {/* 📢 ADS PLACEHOLDER 2 */}
            {filteredTools.length > 0 && (
              <div className="border border-zinc-900/40 bg-zinc-900/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed text-[11px] font-mono text-zinc-700 min-h-[160px]">
                <span>[ SPONSORED AI LINK ]</span>
              </div>
            )}
          </div>
        </section>

        {/* 📢 ADS PLACEHOLDER 3 */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest mt-12">
          [ DARKSYON_AI_HUB_BOTTOM_AD_728X90 ]
        </div>

      </div>
    </main>
  );
}