"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Send, ArrowLeft, CheckCircle2, Megaphone, EyeOff, Code } from "lucide-react";
import Link from "next/link";

export default function AdminPanel() {
  // Tabs for clean management
  const [activeTab, setActiveTab] = useState("blog"); // blog, alert, ads, tools
  const [status, setStatus] = useState("");

  // 1. Blog State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("tools");

  // 2. Global Alert Banner State
  const [alertText, setAlertText] = useState("");
  const [alertActive, setAlertActive] = useState(false);

  // 3. AdSense Activation State
  const [adsActive, setAdsActive] = useState(true);

  // 4. Tool Status State
  const [toolDisabled, setToolDisabled] = useState(false);

  // Load existing settings on mount
  useEffect(() => {
    const savedAlertText = localStorage.getItem("draksyon_alert_text") || "";
    const savedAlertActive = localStorage.getItem("draksyon_alert_active") === "true";
    const savedAdsActive = localStorage.getItem("draksyon_ads_active") !== "false"; // default true
    const savedToolStatus = localStorage.getItem("draksyon_tool_disabled") === "true";

    setAlertText(savedAlertText);
    setAlertActive(savedAlertActive);
    setAdsActive(savedAdsActive);
    setToolDisabled(savedToolStatus);
  }, []);

  // Save Blog Handler
  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content) {
      alert("Arey bhai, Blog ki saari fields bharna zaroori hai!");
      return;
    }
    const newPost = {
      id: Date.now().toString(),
      title, description, content, category,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };
    const existingPosts = JSON.parse(localStorage.getItem("draksyon_blogs") || "[]");
    existingPosts.unshift(newPost);
    localStorage.setItem("draksyon_blogs", JSON.stringify(existingPosts));
    
    setTitle(""); setDescription(""); setContent("");
    triggerSuccess();
  };

  // Save System Configurations (Alerts, Ads, Tools)
  const saveSystemConfig = () => {
    localStorage.setItem("draksyon_alert_text", alertText);
    localStorage.setItem("draksyon_alert_active", alertActive.toString());
    localStorage.setItem("draksyon_ads_active", adsActive.toString());
    localStorage.setItem("draksyon_tool_disabled", toolDisabled.toString());
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setStatus("SUCCESS");
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-16 px-4 sm:px-6 relative">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-red-500 transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO MAIN PLATFORM</span>
        </Link>

        {/* Matrix Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-7 h-7 text-red-500" />
            <div>
              <h1 className="text-2xl font-black tracking-tight">Darksyon Mega Control Panel</h1>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-0.5">Central Processing Unit Live</p>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {status === "SUCCESS" && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-3 font-mono text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
            <span>Matrix config updated! Live nodes refreshed successfully.</span>
          </div>
        )}

        {/* Tab Switchers */}
        <div className="grid grid-cols-4 gap-2 mb-8 bg-zinc-900/40 p-1.5 border border-zinc-900 rounded-xl font-mono text-[10px] sm:text-xs font-bold text-center">
          <button onClick={() => setActiveTab("blog")} className={`py-2 rounded-lg transition-all ${activeTab === "blog" ? "bg-zinc-800 text-red-500 border border-zinc-700" : "text-zinc-400"}`}>
            📝 BLOGS
          </button>
          <button onClick={() => setActiveTab("alert")} className={`py-2 rounded-lg transition-all ${activeTab === "alert" ? "bg-zinc-800 text-red-500 border border-zinc-700" : "text-zinc-400"}`}>
            📢 ALERTS
          </button>
          <button onClick={() => setActiveTab("ads")} className={`py-2 rounded-lg transition-all ${activeTab === "ads" ? "bg-zinc-800 text-red-500 border border-zinc-700" : "text-zinc-400"}`}>
            💰 ADS LAYOUT
          </button>
          <button onClick={() => setActiveTab("tools")} className={`py-2 rounded-lg transition-all ${activeTab === "tools" ? "bg-zinc-800 text-red-500 border border-zinc-700" : "text-zinc-400"}`}>
            🛠️ TOOLS MGMT
          </button>
        </div>

        {/* TAB 1: BLOG WRITER */}
        {activeTab === "blog" && (
          <form onSubmit={handlePublishBlog} className="space-y-5 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setCategory("tools")} className={`py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${category === "tools" ? "bg-red-500/10 border-red-500 text-red-500" : "bg-zinc-950 border-zinc-800 text-zinc-400"}`}>TOOL BLOG GUIDE</button>
              <button type="button" onClick={() => setCategory("random")} className={`py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${category === "random" ? "bg-red-500/10 border-red-500 text-red-500" : "bg-zinc-950 border-zinc-800 text-zinc-400"}`}>RANDOM TECH INSIGHT</button>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Headline</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-red-500 text-zinc-200 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Short Summary</label>
              <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Summary for home card grid..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-red-500 text-zinc-200 outline-none resize-none" />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Main Content</label>
              <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content body here..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-red-500 text-zinc-200 outline-none" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-mono font-bold bg-zinc-100 text-zinc-950 hover:bg-red-500 hover:text-white rounded-xl transition-all">
              <Send className="w-3.5 h-3.5" /> PUBLISH DYNAMIC BLOG
            </button>
          </form>
        )}

        {/* TAB 2: GLOBAL NOTICE BANNER */}
        {activeTab === "alert" && (
          <div className="space-y-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 backdrop-blur-md">
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Global Alert Ribbon Text</label>
              <input type="text" value={alertText} onChange={(e) => setAlertText(e.target.value)} placeholder="e.g., 🚀 Server Patch 1.0.4 deployed. Processing speeds enhanced by 200%!" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-red-500 text-zinc-200 outline-none" />
            </div>
            <div className="flex items-center justify-between bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 4-4 text-zinc-500" />
                <span className="text-xs font-mono text-zinc-400">Display Status: {alertActive ? "ON LIVE HEADER" : "HIDDEN"}</span>
              </div>
              <button onClick={() => setAlertActive(!alertActive)} className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold border ${alertActive ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-500"}`}>
                {alertActive ? "DEACTIVATE" : "ACTIVATE"}
              </button>
            </div>
            <button onClick={saveSystemConfig} className="w-full py-3.5 text-xs font-mono font-bold bg-zinc-100 text-zinc-950 hover:bg-red-500 hover:text-white rounded-xl transition-all">
              SAVE NOTICE BOARD NODE
            </button>
          </div>
        )}

        {/* TAB 3: ADS MONETIZATION LAYOUT */}
        {activeTab === "ads" && (
          <div className="space-y-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-mono text-zinc-400">Google AdSense Injector Modules</span>
              </div>
              <button onClick={() => setAdsActive(!adsActive)} className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold border ${adsActive ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-500"}`}>
                {adsActive ? "ADS MODE: ACTIVE" : "ADS MODE: DISABLED"}
              </button>
            </div>
            <p className="text-[11px] font-mono text-zinc-500 leading-relaxed bg-zinc-950/50 p-3 rounded-lg border border-zinc-900">
              💡 NOTE: Disabling this module turns off all [Ad Space placeholders] instantly across home and inner routes for clear premium analytics testing.
            </p>
            <button onClick={saveSystemConfig} className="w-full py-3.5 text-xs font-mono font-bold bg-zinc-100 text-zinc-950 hover:bg-red-500 hover:text-white rounded-xl transition-all">
              SAVE AD MATRIX RULES
            </button>
          </div>
        )}

        {/* TAB 4: TOOLS MANAGEMENT */}
        {activeTab === "tools" && (
          <div className="space-y-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-mono text-zinc-400">Emergency Maintenance Lock (Main Tool Grid)</span>
              </div>
              <button onClick={() => setToolDisabled(!toolDisabled)} className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold border ${toolDisabled ? "bg-red-500/10 border-red-500 text-red-500" : "bg-zinc-900 border-zinc-800 text-zinc-500"}`}>
                {toolDisabled ? "UNDER MAINTENANCE: ON" : "RUNNING SMOOTH"}
              </button>
            </div>
            <button onClick={saveSystemConfig} className="w-full py-3.5 text-xs font-mono font-bold bg-zinc-100 text-zinc-950 hover:bg-red-500 hover:text-white rounded-xl transition-all">
              SAVE SYSTEM STATE
            </button>
          </div>
        )}

      </div>
    </main>
  );
}