"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Home() {
  // --- DETECT LIVE BLOG DATA FROM SUPABASE CLOUD ---
  const [blogData, setBlogData] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const fetchLiveBlog = async () => {
      try {
        // Supabase se blogs table ka sabse naya (latest) data order wise uthana
        const { data, error } = await supabase
          .from("blogs")
          .select("title, description")
          .order("id", { ascending: false }) // Newest post first
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          setBlogData({
            title: data[0].title,
            description: data[0].description
          });
        } else {
          // Backup Default Text agar database khali ho
          setBlogData({
            title: "The Future of Single-Purpose AI Tools: Why Micro-Utilities Are Winning in 2026",
            description: "As the digital landscape matures, users are breaking away from bloated, multi-modal AI chatbots. Single-purpose macro grids are capturing organic traffic."
          });
        }
      } catch (err) {
        console.error("Error fetching live blog:", err);
        // Error ke case mein bhi screen blank nahi hogi, fallback dikhega
        setBlogData({
          title: "The Future of Single-Purpose AI Tools: Why Micro-Utilities Are Winning in 2026",
          description: "As the digital landscape matures, users are breaking away from bloated, multi-modal AI chatbots. Single-purpose macro grids are capturing organic traffic."
        });
      }
    };

    fetchLiveBlog();
  }, []);
  const [search, setSearch] = useState("");
  const tools = [
    { name: "Age Calculator", link: "/tools/age-calculator" },
    { name: "GST Calculator", link: "/tools/gst-calculator" },
    { name: "Percentage Calculator", link: "/tools/percentage-calculator" },
    { name: "BMI Calculator", link: "/tools/bmi-calculator" },
    { name: "EMI Calculator", link: "/tools/emi-calculator" },
    { name: "QR Generator", link: "/tools/qr-generator" },
    { name: "Word Counter", link: "/tools/word-counter" },
    { name: "Password Generator", link: "/tools/password-generator" },
    { name: "Discount Calculator", link: "/tools/discount-calculator" },
    { name: "SIP Calculator", link: "/tools/sip-calculator" },
    { name: "Loan Calculator", link: "/tools/loan-calculator" },
    { name: "Character Counter", link: "/tools/character-counter" },
    { name: "Text Case Converter", link: "/tools/text-case-converter" },
    { name: "Image Resizer", link: "/tools/image-resizer" },
    { name: "JPG to PNG", link: "/tools/jpg-to-png" },
    { name: "PNG to JPG", link: "/tools/png-to-jpg" },
    { name: "Image Compressor", link: "/tools/image-compressor" },
    { name: "Currency Converter", link: "/tools/currency-converter" },
    { name: "Unit Converter", link: "/tools/unit-converter" },
    { name: "Image Cropper", link: "/tools/image-cropper" },
    { name: "AI Tweet Generator", link: "/tools/ai-tweet-generator" },
    { name: "AI SEO Meta Writer", link: "/tools/ai-seo-description" },
  ];

  const featuredTools = ["Age Calculator", "SIP Calculator", "Image Compressor"];
  const totalTools = tools.length;

  const calculators = [
    "Age Calculator", "GST Calculator", "Percentage Calculator", "BMI Calculator",
    "EMI Calculator", "Discount Calculator", "SIP Calculator", "Loan Calculator",
    "Currency Converter", "Unit Converter",
  ];

  const utilityTools = [
    "Word Counter", "Password Generator", "QR Generator", "Character Counter", "Text Case Converter",
  ];

  const imageTools = [
    "Image Resizer", "JPG to PNG", "PNG to JPG", "Image Compressor", "Image Cropper"
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-red-500 selection:text-white overflow-x-hidden">

      
      
      

      {/* --- HERO SECTION --- */}
      <section className="relative text-center py-24 px-6 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            AI Tools, Generators <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">& Digital Utilities.</span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-4">
            Gaming • AI • Digital Utilities • Tech Blogs
          </p>

          <p className="text-zinc-500 text-sm max-w-2xl mx-auto">
            Free AI tools, generators, calculators and productivity utilities for creators, gamers and businesses.
          </p>

          <p className="text-red-500 text-sm font-mono tracking-widest uppercase mb-8">
            // {totalTools}+ Premium Resources Loaded
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search games, tools, AI & blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-zinc-800 bg-zinc-900/50 text-white placeholder-zinc-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            />

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <a
                href="/tools/ai-tweet-generator"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition"
             >
                AI Tweet Generator
              </a>

              <a
                href="/tools/ai-seo-description"
                className="px-5 py-2.5 border border-zinc-700 hover:border-red-500 rounded-xl font-medium transition"
             >
                AI SEO Writer
              </a>
            </div>

            {search && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden text-left max-h-60 overflow-y-auto">
                {tools
                  .filter((tool) =>
                    tool.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(0, 8)
                  .map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.link}
                      className="block px-4 py-3 text-sm text-zinc-300 hover:bg-red-500/10 hover:text-white transition-colors border-b border-zinc-800/50 last:border-b-0"
                    >
                      {tool.name}
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl text-center backdrop-blur-sm">
            <h3 className="text-2xl font-black text-red-500">{totalTools}</h3>
            <p className="text-zinc-400 text-xs mt-1 font-medium">Total Tools</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl text-center backdrop-blur-sm">
            <h3 className="text-2xl font-black text-red-500">100%</h3>
            <p className="text-zinc-400 text-xs mt-1 font-medium">Free To Use</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl text-center backdrop-blur-sm">
            <h3 className="text-2xl font-black text-red-500">📱</h3>
            <p className="text-zinc-400 text-xs mt-1 font-medium">Mobile Optimized</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl text-center backdrop-blur-sm">
            <h3 className="text-2xl font-black text-red-500">🔒</h3>
            <p className="text-zinc-400 text-xs mt-1 font-medium">No Login Needed</p>
          </div>
        </div>
      </section>

      {/* --- AD SLOT 1: HOME TOP BANNER --- */}
      <div className="w-full max-w-4xl mx-auto h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-12 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase relative z-10">
        [ Ad Space - Home Top Banner ]
      </div>

      {/* --- DYNAMIC FEATURED BLOG WIDGET (FLICKER-PROOF) --- */}
<section className="w-full max-w-4xl mx-auto mt-16 px-4 relative z-10 mb-16">
  <div className="w-full h-[1px] bg-zinc-900 mb-12" />

  <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden group">
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-[60px] pointer-events-none group-hover:scale-125 transition-transform duration-500" />

    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-red-500 font-bold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>FEATURED INSIGHT HUB</span>
        </div>
        
        {/* 🔴 Only render when blogData is populated inside browser (No more flicker) */}
        {blogData ? (
          <>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-100 transition-all">
              {blogData.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {blogData.description}
            </p>
          </>
        ) : (
          // Temporary placeholder box with same exact height to avoid layout shift
          <div className="space-y-2 py-2">
            <div className="h-6 bg-zinc-900/50 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-zinc-900/50 rounded w-full animate-pulse" />
          </div>
        )}
      </div>

      <div className="flex-shrink-0">
        <Link 
          href="/random-blog" 
          className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-red-500 text-zinc-300 rounded-xl transition-all duration-300 active:scale-95 group/btn shadow-inner"
        >
          <span>READ FULL ARTICLE</span>
          <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* --- AD SLOT 2: HOME BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl mx-auto h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-16 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase relative z-10 shadow-inner"> {/* Yahan 'mt-16' badha diya hai */}
        [ Ad Space - Home Bottom Banner ]
      </div>

      {/* --- MOST POPULAR TOOLS --- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-8 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-500 rounded-full"></span>
          🔥 Most Popular Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools
            .filter((tool) => featuredTools.includes(tool.name))
            .map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                className="group bg-zinc-900/40 border border-zinc-900/80 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-zinc-900/80 hover:border-red-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                <h3 className="text-base font-semibold text-zinc-300 group-hover:text-white transition-colors">
                  {tool.name}
                </h3>
              </a>
            ))}
        </div>
      </section>

      
      {/* --- AI TOOLS --- */}
<section className="max-w-6xl mx-auto px-6 py-12">
  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-8 flex items-center gap-2">
    <span className="w-1 h-5 bg-red-500 rounded-full"></span>
    🤖 AI Tools
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* AI Tweet Generator */}
    <Link
      href="/tools/ai-tweet-generator"
      className="group bg-zinc-900/30 border border-zinc-900 hover:border-red-500/40 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
    >
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-all" />

      <div>
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
          🚀
        </div>

        <div className="flex items-center gap-2">
          <h3 className="font-bold text-zinc-100 group-hover:text-red-500 transition-colors">
            AI Tweet Generator
          </h3>

          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase">
            AI Free
          </span>
        </div>

        <p className="text-zinc-500 text-xs mt-2">
          Generate viral Twitter/X posts and threads instantly.
        </p>
      </div>

      <div className="text-[10px] font-mono text-zinc-600 mt-4">
        Launch AI Model →
      </div>
    </Link>

    {/* AI SEO META WRITER */}
    <Link
      href="/tools/ai-seo-description"
      className="group bg-zinc-900/30 border border-zinc-900 hover:border-red-500/40 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
    >
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-all" />

      <div>
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
          🔍
        </div>

        <div className="flex items-center gap-2">
          <h3 className="font-bold text-zinc-100 group-hover:text-red-500 transition-colors">
            AI SEO Meta Writer
          </h3>

          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase">
            AI Free
          </span>
        </div>

        <p className="text-zinc-500 text-xs mt-2">
          Create SEO-friendly meta descriptions with one click.
        </p>
      </div>

      <div className="text-[10px] font-mono text-zinc-600 mt-4">
        Launch AI Model →
      </div>
    </Link>

  </div>
</section>

      {/* --- CALCULATORS --- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-8 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-500 rounded-full"></span>
          Calculators
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools
            .filter((tool) => calculators.includes(tool.name) && tool.name.toLowerCase().includes(search.toLowerCase()))
            .map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                className="group bg-zinc-900/30 border border-zinc-900/60 rounded-xl p-5 text-center transition-all duration-200 hover:bg-zinc-900/70 hover:border-red-500/20"
              >
                <h3 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {tool.name}
                </h3>
              </a>
            ))}
        </div>
      </section>

      {/* --- UTILITY TOOLS --- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-8 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-500 rounded-full"></span>
          Utility Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools
            .filter((tool) => utilityTools.includes(tool.name) && tool.name.toLowerCase().includes(search.toLowerCase()))
            .map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                className="group bg-zinc-900/30 border border-zinc-900/60 rounded-xl p-5 text-center transition-all duration-200 hover:bg-zinc-900/70 hover:border-red-500/20"
              >
                <h3 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {tool.name}
                </h3>
              </a>
            ))}
        </div>
      </section>

      {/* --- IMAGE TOOLS --- */}
      <section className="max-w-6xl mx-auto px-6 py-12 mb-12">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-8 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-500 rounded-full"></span>
          Image Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools
            .filter((tool) => imageTools.includes(tool.name) && tool.name.toLowerCase().includes(search.toLowerCase()))
            .map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                className="group bg-zinc-900/30 border border-zinc-900/60 rounded-xl p-5 text-center transition-all duration-200 hover:bg-zinc-900/70 hover:border-red-500/20"
              >
                <h3 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {tool.name}
                </h3>
              </a>
            ))}
        </div>
      </section>

      {/* --- AD SLOT 2: HOME BOTTOM BANNER (FIXED SPACING) --- */}
      <div className="w-full max-w-4xl mx-auto h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-16 mb-20 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase relative z-10 shadow-inner">
        [ Ad Space - Home Bottom Banner ]
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-500 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm text-left">
          <div>
            <h3 className="font-bold text-white text-base mb-3">DARKSYON</h3>
            <p className="text-zinc-400">Free high-performance digital tools & gaming utilities.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-300 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-red-500 transition-colors">Contact</a></li>
              <li><a href="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:text-red-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="/disclaimer" className="hover:text-red-500 transition-colors">Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-zinc-300 mb-3">Support</h3>
            <p className="text-zinc-400">draksyon.support@gmail.com</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-zinc-900/50 mt-12 pt-6 text-center text-xs">
          © 2026 DRAKSYON. All Rights Reserved.
        </div>
      </footer>

    </main>
  );
}