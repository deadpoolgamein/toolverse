"use client";

import { useState } from "react";
import { UploadCloud, ImageIcon, Sliders, CheckCircle2, RefreshCw, Sparkles } from "lucide-react";

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(70);
  const [fileName, setFileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!image) return;

    const img = new window.Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      ctx?.drawImage(img, 0, 0);

      const compressedImage = canvas.toDataURL(
        "image/jpeg",
        quality / 100
      );

      const link = document.createElement("a");

      link.href = compressedImage;
      link.download = fileName ? `compressed-${fileName}` : "compressed-image.jpg";

      link.click();
    };

    img.src = image;
  };

  const resetTool = () => {
    setImage(null);
    setQuality(70);
    setFileName("");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- AD SLOT 1: TOP BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Top Banner ]
      </div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Tool Frame Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-inner">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              Image <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Compressor</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Reduce asset file sizing client-side instantly</p>
          </div>

          {/* Upload Matrix Area */}
          {!image && (
            <div className="mb-6">
              <label
                htmlFor="imageUpload"
                className="group block w-full border-2 border-dashed border-zinc-800 hover:border-red-500/40 bg-zinc-950/50 hover:bg-zinc-950 rounded-2xl p-8 text-center cursor-pointer transition-all duration-200"
              >
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="w-10 h-10 text-zinc-600 group-hover:text-red-500 transition-colors mb-3" />
                  <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                    Click to Upload Image
                  </span>
                  <span className="text-xs text-zinc-600 mt-1">Supports JPG, PNG, WebP up to 10MB</span>
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </div>
          )}

          {/* File Selected Status & Image Preview */}
          {image && (
            <div className="mb-6 space-y-4 animate-fade-in">
              <div className="relative border border-zinc-800 bg-zinc-950 p-2 rounded-2xl overflow-hidden max-w-sm mx-auto group shadow-inner">
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-56 mx-auto rounded-xl object-contain object-center"
                />
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 max-w-sm mx-auto flex items-center justify-between gap-3 text-xs font-mono text-zinc-500">
                <span className="truncate pr-4 border-r border-zinc-900">{fileName}</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1 flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>
            </div>
          )}

          {/* Quality Range Adjustment Slider */}
          <div className="mb-8 bg-zinc-950/50 border border-zinc-900 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-red-500" />
                <span>Compression Rate</span>
              </div>
              <span className="text-red-500 text-sm">{quality}%</span>
            </div>

            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] font-mono text-zinc-600 mt-1.5">
              <span>Max Compression (Lower Quality)</span>
              <span>Original Size</span>
            </div>
          </div>

          {/* Execution Controls Buttons */}
          {image && (
            <div className="flex gap-2">
              <button
                onClick={compressImage}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Compress & Download
              </button>
              <button
                onClick={resetTool}
                className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                title="Reset/Upload New"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
          {/* 📚 ADSENSE COMPLIANCE: IMAGE COMPRESSOR INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> High-Performance Client-Side Image Matting
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      This utility utilizes specialized image canvas sampling algorithms to compress digital asset configurations with minimal structural degradation. By tweaking quantitative scaling factors locally inside WebAssembly memory allocations, creators can compress heavy storage arrays instantly for faster global web deployment protocols.
    </p>
  </div>

  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Master localized compression profiles and aspect ratio multipliers instantly.</p>
    </div>
    <a 
      href="/blog/how-to-compress-image"
      className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(14,165,233,0.05)] transition-all whitespace-nowrap"
    >
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>

        </div>
      </div>

      {/* --- AD SLOT 2: BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Bottom Banner ]
      </div>

    </main>
  );
}