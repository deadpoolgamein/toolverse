"use client";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, User, ShieldCheck, BookOpen } from "lucide-react";
import Link from "next/link";

interface BlogStructure {
  id: number;
  title: string;
  description: string;
  content: string;
  created_at: string;
}

export default function RandomBlogListPage() {
  // Yahan humne ek Array state banayi hai taaki saare blogs store ho sakein
  const [blogsList, setBlogsList] = useState<BlogStructure[] | null>(null);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const { data: cloudData, error } = await supabase
          .from("blogs")
          .select("id, title, description, content, created_at")
          .order("id", { ascending: false }); // Sabse naya sabse upar, par saare aayenge (.limit hataya)

        if (error) throw error;

        if (cloudData && cloudData.length > 0) {
          setBlogsList(cloudData);
        } else {
          setBlogsList([]); // Khali array agar koi blog na ho
        }
      } catch (err) {
        console.error("Error loading all articles:", err);
      }
    };

    fetchAllBlogs();
  }, []);

  if (!blogsList) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-mono text-xs text-zinc-700 tracking-widest">
        SYNCHRONIZING GLOBAL BLOG ARCHIVE...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-red-500 transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO MATRIX CORE</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-2 border-b border-zinc-900 pb-6 mb-10">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100">
            Random Tech Insights Archive
          </h1>
          <p className="text-sm font-mono text-zinc-500">
            Total Synchronized Nodes: {blogsList.length}
          </p>
        </div>

        {/* --- DYNAMIC BLOGS LIST LOOP --- */}
        {blogsList.length === 0 ? (
          <p className="text-zinc-500 font-mono text-xs">No entries found in the cloud vault.</p>
        ) : (
          <div className="space-y-12">
            {blogsList.map((blog) => (
              <article key={blog.id} className="border border-zinc-900 bg-zinc-900/10 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-zinc-800 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-500/10 transition-colors" />
                
                <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-red-500 font-bold tracking-widest uppercase bg-red-500/5 border border-red-500/10 px-2.5 py-1 rounded-full">
                  <BookOpen className="w-3 h-3" />
                  <span>ARTICLE NODE #{blog.id}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-100 group-hover:text-red-400 transition-colors">
                  {blog.title}
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {blog.description}
                </p>

                {/* Main Content inside the list item */}
                <div className="text-zinc-300 text-sm sm:text-base leading-relaxed pt-2 border-t border-zinc-900/50 font-normal whitespace-pre-wrap">
                  {blog.content}
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-zinc-600 pt-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    <span>DARKSYON ADMIN</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Footer */}
        <div className="mt-16 p-4 bg-zinc-900/20 border border-zinc-900 rounded-2xl flex items-start gap-3 font-mono text-[11px] text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <span>All decentralized data streams are served via secure globally replicated edge clusters.</span>
        </div>
      </div>
    </main>
  );
}