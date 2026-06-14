"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Trash2, Download, Image as ImageIcon, Palette, Sparkles, AlertTriangle } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

export default function BgRemoverPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [bgColor, setBgColor] = useState("#ff0000"); // Default Red Backdrop
  const [mode, setMode] = useState<"remove" | "change">("remove");
  const [progressMsg, setProgressMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    
    // Reset previous states
    setProcessedBlob(null);
    setProcessedUrl(null);
  };

  // --- ASALI AI PROCESSING PIPELINE ---
  const handleProcessAI = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProgressMsg("⚡ Initializing Neural WASM Pipeline...");

    try {
      // Direct client-side AI image layer separation
      const outputBlob = await removeBackground(selectedFile, {
        progress: (key, current, total) => {
          const percent = Math.round((current / total) * 100);
          setProgressMsg(`🤖 Computing Layers (${percent}%) - ${key.replace("/", " ")}`);
        }
      });

      setProcessedBlob(outputBlob);
      setProcessedUrl(URL.createObjectURL(outputBlob));
    } catch (error) {
      console.error("AI Model Error:", error);
      alert("Extraction failed. Please try a different clear asset layer.");
    } finally {
      setIsProcessing(false);
      setProgressMsg("");
    }
  };

  // --- REAL FUNCTIONAL DOWNLOAD SYSTEM ---
  const handleDownload = () => {
    if (!processedBlob && !processedUrl) return;

    // Agar Transparant Mode hai toh seedha PNG blob download hoga
    if (mode === "remove" && processedUrl) {
      const link = document.createElement("a");
      link.href = processedUrl;
      link.download = `darksyon_matte_${Date.now()}.png`;
      link.click();
    } 
    // Agar Backdrop background change mode hai, toh canvas par background paint karke download karenge
    else if (mode === "change" && processedUrl) {
      const img = new Image();
      img.src = processedUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          // 1. Fill custom solid backdrop background color
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // 2. Overlay transparent extracted subject on top
          ctx.drawImage(img, 0, 0);
          
          // 3. Fire download trigger
          const finalLink = document.createElement("a");
          finalLink.href = canvas.toDataURL("image/jpeg", 0.9);
          finalLink.download = `darksyon_changed_bg_${Date.now()}.jpg`;
          finalLink.click();
        }
      };
    }
  };

  const triggerReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessedBlob(null);
    setProcessedUrl(null);
  };

  // Cleanup Object URLs to avoid browser memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (processedUrl) URL.revokeObjectURL(processedUrl);
    };
  }, [previewUrl, processedUrl]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-red-500 font-bold tracking-widest uppercase bg-red-500/5 border border-red-500/10 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>AI NEURAL VISION ENGINE V2</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-100">
            Smart Background Remover & Changer
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            100% Browser-Native extraction pipeline. Your media files are processed locally via WebAssembly structures and never uploaded to any server.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CONTROLS */}
          <div className="lg:col-span-1 bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 space-y-6 backdrop-blur-md h-fit">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-3">
              Configuration Matrix
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">Operation Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode("remove")}
                  className={`py-2 px-3 text-xs font-mono rounded-xl border font-bold transition-all ${
                    mode === "remove" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                  }`}
                >
                  Transparent PNG
                </button>
                <button
                  onClick={() => setMode("change")}
                  className={`py-2 px-3 text-xs font-mono rounded-xl border font-bold transition-all ${
                    mode === "change" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                  }`}
                >
                  Custom Backdrop
                </button>
              </div>
            </div>

            {mode === "change" && (
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Solid Matte Backdrop</span>
                </label>
                <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-8 rounded-lg bg-transparent border-none cursor-pointer outline-none"
                  />
                  <span className="font-mono text-xs text-zinc-300 uppercase font-bold">{bgColor}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleProcessAI}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-900 disabled:text-zinc-600 text-zinc-950 font-mono text-xs font-black tracking-widest py-4 px-6 rounded-xl transition-all active:scale-[0.99]"
            >
              {isProcessing ? "COMPUTING..." : "EXECUTE AI EXTRACTION"}
            </button>
          </div>

          {/* DISPLAY PIPELINE WORKSPACE */}
          <div className="lg:col-span-2 min-h-[400px] bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center p-6 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem]">
            
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

            {!previewUrl ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full max-w-md border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/5 hover:bg-zinc-900/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer group transition-all"
              >
                <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-zinc-500 group-hover:text-red-500 group-hover:border-red-500/20 transition-all">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-zinc-300">DRAG & DROP OR SEARCH IMAGE</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Supports clear PNG or JPEG structures</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col space-y-4 relative">
                
                <div 
                  className="w-full flex-1 min-h-[350px] border border-zinc-900 rounded-2xl overflow-hidden relative flex items-center justify-center transition-all"
                  style={{ backgroundColor: processedUrl && mode === "change" ? bgColor : "transparent" }}
                >
                  {/* Checkerboard Pattern for transparent views */}
                  {(mode === "remove" || !processedUrl) && (
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#18181b_25%,transparent_25%),linear-gradient(-45deg,#18181b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#18181b_75%),linear-gradient(-45deg,transparent_75%,#18181b_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0] opacity-30 -z-10" />
                  )}

                  <img 
                    src={processedUrl || previewUrl} 
                    alt="Matrix pipeline asset" 
                    className={`max-w-full max-h-[380px] object-contain transition-all duration-300 ${isProcessing ? "opacity-20 blur-xs" : ""}`}
                  />

                  {isProcessing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-zinc-950/60 backdrop-blur-xs">
                      <span className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      <span className="font-mono text-[11px] font-bold text-red-400 tracking-widest text-center px-4 max-w-xs uppercase">
                        {progressMsg}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-zinc-900 pt-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase">
                    <ImageIcon className="w-4 h-4 text-zinc-600" />
                    <span>{selectedFile ? (selectedFile.name.length > 18 ? `${selectedFile.name.slice(0, 18)}...` : selectedFile.name) : ""}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={triggerReset}
                      disabled={isProcessing}
                      className="p-2.5 bg-zinc-900/50 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/20 text-zinc-400 hover:text-red-400 rounded-xl transition-all disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={handleDownload}
                      disabled={!processedUrl || isProcessing}
                      className="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-900 text-zinc-950 disabled:text-zinc-600 border border-zinc-800 rounded-xl font-bold font-black tracking-wider transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD OUTPUT</span>
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Note regarding Video limitations */}
        <div className="p-4 bg-zinc-900/10 border border-zinc-900 rounded-2xl flex items-start gap-3 font-mono text-[11px] text-zinc-500">
          <AlertTriangle className="w-4 h-4 text-amber-500/70 flex-shrink-0 mt-0.5" />
          <span>V2 Pipeline currently optimized for advanced edge-side Image Matting. High-dimensional batch video array models will be activated once hardware model quantization weights finish optimization testing.</span>
        </div>

      </div>
    </main>
  );
}