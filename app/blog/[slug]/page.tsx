"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Calendar, BookOpen, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/app/supabaseClient"; // Aapka standard client import path
// ... baki ke saare purane imports waise hi chalne dein

interface Blog {
  title: string;
  content: string;
  created_at: string;
}
// 🚀 FORCE NEXT.JS TO BYPASS STATIC CACHE AND FETCH FRESH DATA ON EVERY CLICK
export const dynamic = "force-dynamic";




export default function DynamicBlogViewer({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("slug", resolvedParams.slug)
          .single();

        if (data) setBlog(data);
      } catch (err) {
        console.error("Failed to read routing parameters", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogData();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-mono text-xs">
        <div className="animate-pulse tracking-widest uppercase text-zinc-500">Syncing Dynamic Metadata Stream...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center font-mono space-y-4">
        <div className="text-zinc-600 text-xs uppercase tracking-widest">[ 404 - CORE PUBLICATION NOT DETECTED ]</div>
        <Link href="/" className="text-xs text-sky-400 border border-sky-500/20 bg-sky-500/5 px-4 py-2 rounded-xl hover:bg-sky-500/10 transition-colors">
          Return To Secure Terminal
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-4 select-none">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* BACK ACTION */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase">
          <ArrowLeft className="w-3.5 h-3.5" /> Return To Directories
        </Link>

        {/* POST HEADER METADATA */}
        <div className="space-y-4 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-zinc-600" /> {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-zinc-600" /> 4 Min Read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* RENDERED ARTICLE INJECTOR SECTION */}
        <article className="font-sans text-sm text-zinc-300 leading-relaxed space-y-6 whitespace-pre-wrap selection:bg-sky-500/20">
          {blog.content}
        </article>

        {/* GLOBAL NOTICE BANNER FOR ADSENSE BOT */}
        <div className="mt-12 p-4 border border-zinc-900 bg-zinc-900/10 rounded-2xl flex items-center gap-3 text-xs font-mono text-zinc-500">
          <Sparkles className="w-5 h-5 text-sky-400 flex-shrink-0" />
          <span>All contents and operations listed are verified informational metrics optimized for global developers.</span>
        </div>

      </div>
    </main>
  );
}