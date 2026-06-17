"use client";

import { useState } from "react";
import { Zap, Search, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const electricalToolsList = [
  {
    id: "wire-size-calculator",
    title: "House Wiring Load & Wire Size Calculator",
    description: "Select household appliances to compute total amperage load and recommend safe copper wire gauge (Sq. mm).",
    link: "/tools/electrical/wire-size-calculator",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
    icon: Zap
  }
];

export default function ElectricalHubPage() {
  const [query, setQuery] = useState("");

  const filteredTools = electricalToolsList.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <section className="text-center space-y-4 border-b border-zinc-900 pb-10">
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Electrical & Power Suite
            </h1>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Professional diagnostic modules for safe load balancing, current wiring sizing, and power grid optimization.
          </p>

          <div className="max-w-xl mx-auto relative group pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search electrical tools..."
              className="w-full h-11 rounded-xl bg-zinc-900/30 border border-zinc-900 pl-11 pr-4 text-sm font-mono placeholder:text-zinc-700 focus:border-amber-500/30 transition-all backdrop-blur-md outline-none"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
            Active Electrical Modules ({filteredTools.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.link}
                className={`group border border-zinc-900 bg-zinc-900/40 rounded-2xl p-6 space-y-4 transition-all duration-300 hover:bg-zinc-900/80 ${tool.borderGlow}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <tool.icon className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                    <h3 className="text-md font-bold text-zinc-200 group-hover:text-white transition-colors">{tool.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-amber-400" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">{tool.description}</p>
                <div className="border-t border-zinc-900/60 pt-3 text-[10px] font-mono uppercase text-zinc-600 group-hover:text-amber-400 tracking-wider flex items-center gap-1">
                  Launch Module <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}