"use client";

import { useState, useEffect } from "react";
import { BookOpen, ArrowRight, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

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

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllPublications() {
      try {
        if (!supabaseUrl || !supabaseAnonKey) return;
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });

        if (data) setBlogs(data);
      } catch (err) {
        console.error("Central repository locked", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPublications();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-4 select-none">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER AREA */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-sky-400" /> Central Knowledge Publication Matrix
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Deep-dive operational manuals, mathematical documentations, and programmatic structural tutorials.
          </p>
        </div>

        {/* MAIN LIST INDEX */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, n) => (
              <div key={n} className="h-28 rounded-2xl bg-zinc-900/20 border border-zinc-900/60 animate-pulse" />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-sky-500/20 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase">
                    <Calendar className="w-3 h-3 text-zinc-600" />
                    {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <h3 className="text-base font-bold text-zinc-200 group-hover:text-sky-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 line-clamp-2 leading-relaxed">
                    {post.content.replace(/[#*`\-]/g, "")}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-zinc-600 uppercase group-hover:text-zinc-300 transition-colors pt-3 border-t border-zinc-900/60 flex items-center gap-1">
                  Open Publication Document <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center font-mono text-zinc-700 text-xs py-16 border border-dashed border-zinc-900 rounded-2xl">
            [ SECURE DATABASE INVENTORIES CURRENTLY EMPTY - TRANSMIT ENTRIES FROM THE PANEL ]
          </div>
        )}

      </div>
    </main>
  );
}