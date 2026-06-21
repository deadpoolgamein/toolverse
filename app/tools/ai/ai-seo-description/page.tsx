"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function AISEOMetaWriter() {
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSEO = async () => {
    if (!topic) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/seo-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.output);
      } else {
        setResponse("Failed to generate SEO content.");
      }
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">

        <h1 className="text-4xl font-bold mb-2">
          AI <span className="text-red-500">SEO Meta Writer</span>
        </h1>

        <p className="text-zinc-400 mb-6">
          Generate SEO-friendly meta titles and descriptions instantly.
        </p>

        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter keyword, website topic, blog title..."
          className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-xl p-4 outline-none focus:border-red-500"
        />

        <button
          onClick={generateSEO}
          disabled={loading}
          className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Generating..." : "Generate SEO Content"}
        </button>

        {response && (
          <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-xl p-4 whitespace-pre-wrap">
            {response}
          </div>
        )}
        {/* 📚 ADSENSE COMPLIANCE: AI SEO DESCRIPTION INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Algorithmic Meta Data Optimization Network
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      This AI structural generator engineers semantic metadata snippets and high-performance search engine indexing descriptions. By mapping core keyword attributes against search intent velocity algorithms, it generates crawler-friendly summaries optimized to boost global visibility ranking structures.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Learn how click-through-rate variables depend on precise structural meta formatting.</p>
    </div>
    <a href="/blog/ai-seo-description-guide" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>
      </div>
    </main>
  );
}