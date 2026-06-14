"use client";

import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { LayoutDashboard, Megaphone, FileText, Settings, ShieldCheck } from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"blogs" | "alerts" | "settings">("blogs");

  // --- ALERT STATE SYSTEM ---
  const [alertText, setAlertText] = useState("");
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");

  // --- BLOG STATE SYSTEM (LIVE CLOUD) ---
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newContent, setNewContent] = useState("");
  const [blogStatus, setBlogStatus] = useState("");

  // Load existing alert settings locally for now
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAlertText(localStorage.getItem("draksyon_alert_text") || "");
      setIsAlertActive(localStorage.getItem("draksyon_alert_active") === "true");
    }
  }, []);

  // --- ALERT SAVE HANDLER ---
  const handleSaveAlerts = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertStatus("⚡ Committing alert modifications...");
    try {
      localStorage.setItem("draksyon_alert_text", alertText);
      localStorage.setItem("draksyon_alert_active", isAlertActive ? "true" : "false");
      
      // Dispatch storage event to update layout ribbon instantly
      window.dispatchEvent(new Event("storage"));
      setAlertStatus("🚀 SYSTEM NOTICE UPDATE DISPATCHED SUCCESSFULLY!");
    } catch (err) {
      setAlertStatus("❌ NOTICE EXCEPTION: Verification failure");
    }
  };

  // --- LIVE SUPABASE CLOUD PUBLISH HANDLER ---
  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle || !newDesc) {
      setBlogStatus("❌ Headline and Teaser Description are required!");
      return;
    }

    setBlogStatus("⚡ Syncing payload with Cloud Cluster...");

    try {
      // Supabase ke 'blogs' table mein automatic insert operation
      const { data, error } = await supabase
        .from("blogs")
        .insert([
          { 
            title: newTitle, 
            description: newDesc, 
            content: newContent || newDesc 
          }
        ]);

      if (error) throw error;

      setBlogStatus("🚀 TRANSMISSION SUCCESSFUL: Live on Global Cloud Nodes!");
      
      // Clear forms after absolute delivery success
      setNewTitle("");
      setNewDesc("");
      setNewContent("");

    } catch (error: any) {
      console.error("Cloud Error:", error);
      setBlogStatus(`❌ MATRIX BREAK: ${error.message || "Database network timeout"}`);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-16 px-4 selection:bg-red-500/30 selection:text-red-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* --- LEFT SIDE NAVIGATION CONTROLS --- */}
        <div className="space-y-2 md:col-span-1">
          <div className="p-4 border border-zinc-900 bg-zinc-900/10 rounded-2xl mb-4 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 tracking-wider">
              <LayoutDashboard className="w-4 h-4" />
              <span>CORE ADMIN MATRIX</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
              activeTab === "blogs"
                ? "bg-red-600/10 border border-red-500/30 text-red-400 shadow-lg shadow-red-500/5"
                : "border border-zinc-900 bg-transparent text-zinc-400 hover:border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📝 BLOGS GATEWAY</span>
          </button>

          <button
            onClick={() => setActiveTab("alerts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
              activeTab === "alerts"
                ? "bg-red-600/10 border border-red-500/30 text-red-400 shadow-lg shadow-red-500/5"
                : "border border-zinc-900 bg-transparent text-zinc-400 hover:border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>🚨 SYSTEM ALERTS</span>
          </button>
        </div>

        {/* --- RIGHT SIDE WORKSPACE CONFIGURATION --- */}
        <div className="md:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          
          {/* TAB 1: LIVE CLOUD BLOG CMS */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black tracking-tight text-zinc-100">Live Database Blog Publisher</h2>
                <p className="text-xs font-mono text-zinc-500 mt-1">Deploy automated dynamic markdown payloads directly to global infrastructure nodes.</p>
              </div>

              <form onSubmit={handlePublishBlog} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Post Title / Headline</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., The Death of Bloated AI: Micro-Utilities in 2026"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none font-sans transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Short Teaser Summary</label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Provide a compelling 2-line description for the main card module..."
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none font-sans transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Main Article Body Content</label>
                  <textarea
                    rows={6}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Enter structural detailed paragraphs for the standalone reading router..."
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none font-sans transition-all resize-none"
                  />
                </div>

                {blogStatus && (
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px] text-red-400 animate-pulse">
                    {blogStatus}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-mono text-xs font-black tracking-widest py-3.5 px-6 rounded-xl transition-all active:scale-[0.99]"
                >
                  PUBLISH DYNAMIC BLOG NODE
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: GLOBAL NOTICE BOARD ALERTS */}
          {activeTab === "alerts" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black tracking-tight text-zinc-100">Global System Alerts</h2>
                <p className="text-xs font-mono text-zinc-500 mt-1">Broadcast high-priority notices dynamically right above the structural layout navigation menu.</p>
              </div>

              <form onSubmit={handleSaveAlerts} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Alert Matrix Status</label>
                  <button
                    type="button"
                    onClick={() => setIsAlertActive(!isAlertActive)}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                      isAlertActive 
                        ? "bg-red-600/10 border-red-500/30 text-red-400" 
                        : "bg-zinc-950 border-zinc-800 text-zinc-500"
                    }`}
                  >
                    STATUS: {isAlertActive ? "🔴 ACTIVE BROADCASTING" : "⚪ MUTED DEACTIVATED"}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Notice Text Script</label>
                  <input
                    type="text"
                    value={alertText}
                    onChange={(e) => setAlertText(e.target.value)}
                    placeholder="e.g., MATRIX MAINTENANCE PROTOCOL ENGAGED: UNDERGOING CLUSTER OPTIMIZATION"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none font-mono transition-all"
                  />
                </div>

                {alertStatus && (
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px] text-red-400 animate-pulse">
                    {alertStatus}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-mono text-xs font-black tracking-widest py-3.5 px-6 rounded-xl transition-all active:scale-[0.99]"
                >
                  SAVE SYSTEM NOTICE NODE
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}