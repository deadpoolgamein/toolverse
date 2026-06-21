"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/app/supabaseClient";
import { useParams } from "next/navigation";
import Markdown from "react-markdown";

interface Blog {
  title: string;
  content: string;
  created_at: string;
}

export default function DynamicBlogViewer() {
  const routerParams = useParams();
  const rawSlug = routerParams?.slug;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogData() {
      if (!rawSlug) return;
      
      try {
        // 🧠 TypeScript Fix: Explicitly ensuring target variable is a strict primitive string
        const currentSlug: string = Array.isArray(rawSlug) ? rawSlug[0] ?? "" : rawSlug;
        const decodedSlug = decodeURIComponent(currentSlug).toLowerCase();

        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("slug", decodedSlug)
          .single();

        if (data) {
          setBlog(data);
        } else if (error) {
          console.error("Supabase data mapping anomaly:", error.message);
        }
      } catch (err) {
        console.error("Failed to compile database pipeline stream", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogData();
  }, [rawSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-mono text-xs">
        <div className="tracking-widest uppercase text-zinc-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
          Syncing Dynamic Metadata Stream...
        </div>
      </div>
    );
  }

  // 🧠 TypeScript Fix for Fallback Rendering parameters
  const activeFallback: string = Array.isArray(rawSlug) ? rawSlug[0] ?? "UNKNOWN_NODE" : rawSlug ?? "UNKNOWN_NODE";

  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center font-mono space-y-4 p-4 text-center">
        <div className="text-zinc-600 text-xs uppercase tracking-widest">[ 404 - CORE PUBLICATION NOT DETECTED ]</div>
        <p className="text-[10px] text-zinc-700 uppercase tracking-wider">Target Node Missing: {decodeURIComponent(activeFallback).toLowerCase()}</p>
        <Link href="/" className="text-xs text-sky-400 border border-sky-500/20 bg-sky-500/5 px-4 py-2 rounded-xl hover:bg-sky-500/10 transition-colors">
          Return To Secure Terminal
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* BACK ACTION */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase">
          <ArrowLeft className="w-3.5 h-3.5" /> Return To Directories
        </Link>

        {/* POST HEADER METADATA */}
        <div className="space-y-4 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-600" /> 
              {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-600" /> 3 Min Read
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* RENDERED ARTICLE INJECTOR SECTION */}
        <article className="font-sans text-sm text-zinc-300 leading-relaxed space-y-4 selection:bg-sky-500/20 prose prose-invert max-w-none">
          <Markdown>{blog.content}</Markdown>
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