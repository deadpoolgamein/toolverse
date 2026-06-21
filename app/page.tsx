"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Zap, 
  Hammer, 
  HardHat, 
  ArrowRight, 
  Video, 
  Bot, 
  Calculator, 
  ImageIcon as ImageIcon, 
  Wrench,
  Sparkles,
  BookOpen,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize temporary local client mapping to secure metadata streams
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

const toolCategories = [
  {
    id: "industrial",
    title: "Industrial & Welding Suite",
    description: "Advanced parameters for arc welding, miter cuts, metal mass estimation, and pipe notch profiles.",
    link: "/tools/industrial",
    icon: Building2,
    count: "7 Active",
    borderGlow: "hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/20"
  },
  {
    id: "ai",
    title: "AI Generation Suite",
    description: "Artificial Intelligence models and prompt generation matrices for automated asset workflows.",
    link: "/tools/ai",
    icon: Bot,
    count: "AI Core",
    borderGlow: "hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]",
    tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
  },
  {
    id: "calculators",
    title: "Advanced Calculators",
    description: "Multi-functional mathematical formulas, ratios, and standard numeric engineering solvers.",
    link: "/tools/calculators",
    icon: Calculator,
    count: "Core",
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    id: "electrical",
    title: "Electrical & Power Suite",
    description: "Automated load calculation matrix, safe wire gauge configurations, and voltage drop limits.",
    link: "/tools/electrical",
    icon: Zap,
    count: "New Hub",
    borderGlow: "hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    id: "image",
    title: "Image & Media Tools",
    description: "Client-side image compression, format converters, and visual dimension modification tools.",
    link: "/tools/image",
    icon: ImageIcon,
    count: "Media",
    borderGlow: "hover:border-pink-500/30 hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]",
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20"
  },
  {
    id: "utility",
    title: "General Utilities",
    description: "Essential cross-industry daily production tools, text formatters, and baseline units micro-apps.",
    link: "/tools/utility",
    icon: Wrench,
    count: "Utility",
    borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
  },
  {
    id: "woodworking",
    title: "Carpentry & Woodworking Suite",
    description: "Cubic Feet (CFT) timber volume estimators and plywood blank yield layout optimization tools.",
    link: "/tools/woodworking",
    icon: Hammer,
    count: "New Hub",
    borderGlow: "hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  {
    id: "construction",
    title: "Civil Construction Suite",
    description: "Precision estimation matrix for brick counts, concrete volumetric ratios, and floor tile pricing layout.",
    link: "/tools/construction",
    icon: HardHat,
    count: "New Hub",
    borderGlow: "hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    id: "video",
    title: "Video Processing Suite",
    description: "High-performance client-side video background removal, real-time filters, and layout manipulation modules.",
    link: "/tools/video",
    icon: Video,
    count: "New Suite",
    borderGlow: "hover:border-sky-500/30 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)]",
    tagColor: "bg-sky-500/10 text-sky-400 border-sky-500/20"
  },
];

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🌐 FETCH RANDOM BLOGS FROM ADMIN PANEL DATABASE
  useEffect(() => {
    async function fetchBlogs() {
      try {
        if (!supabaseUrl || !supabaseAnonKey) {
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3); // Shows latest 3 dynamic posts to crawler

        if (data) setBlogs(data);
      } catch (err) {
        console.error("Database fetch locked", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 rounded-full px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Production Engine V2.0
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 leading-none">
            DARKSYON PORTAL
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Universal mathematical matrices and cross-industry utility suites. Built for high-performance responsive computations.
          </p>
        </section>

        {/* TOP AD BANNER */}
        <div className="w-full max-w-5xl mx-auto h-[90px] bg-zinc-900/10 border border-dashed border-zinc-900 rounded-2xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_GLOBAL_HOME_TOP_BANNER_728X90 ]
        </div>

        {/* CATEGORIES GRID */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
            System Directories / Select Suite
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category) => (
              <Link
                key={category.id}
                href={category.link}
                className={`group border border-zinc-900/80 bg-zinc-900/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:bg-zinc-900/40 ${category.borderGlow}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                      <category.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${category.tagColor}`}>
                      {category.count}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-zinc-900/60 pt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase text-zinc-600 group-hover:text-zinc-200 transition-colors">
                  Access Hub Direct <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 📚 NEW DYNAMIC SECTION: RANDOM BLOGS ADMIN PANEL DISPATCHER */}
        <section className="space-y-6 pt-10 border-t border-zinc-900">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-400" /> Knowledge Base / Random Publications
            </h2>
            <Link 
              href="/blog" 
              className="text-[10px] font-mono uppercase text-zinc-400 hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              View All Posts <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-44 rounded-2xl bg-zinc-900/20 border border-zinc-900/60 animate-pulse" />
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="group border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-sky-500/20 transition-all duration-300"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase">
                      <Calendar className="w-3 h-3 text-zinc-600" />
                      {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <h3 className="text-sm font-bold text-zinc-200 group-hover:text-sky-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-500 line-clamp-3 leading-relaxed">
                      {post.content.replace(/[#*`\-]/g, "")}
                    </p>
                  </div>
                  <div className="text-[9px] font-mono text-zinc-600 uppercase group-hover:text-zinc-300 transition-colors pt-2 border-t border-zinc-900 flex items-center gap-1">
                    Read Article <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center font-mono text-zinc-700 text-xs py-10 border border-dashed border-zinc-900 rounded-2xl">
              [ NO RANDOM PUBLICATIONS DISPATCHED YET - LOGIN TO ADMIN PANEL TO POST ]
            </div>
          )}
        </section>

        {/* BOTTOM AD BANNER */}
        <div className="w-full max-w-5xl mx-auto h-[90px] bg-zinc-900/10 border border-dashed border-zinc-900 rounded-2xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_GLOBAL_HOME_BOTTOM_BANNER_728X90 ]
        </div>

      </div>
    </main>
  );
}