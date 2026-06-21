"use client";

import { useState } from "react";
import { ArrowLeftRight, UploadCloud, RefreshCw, Sparkles, FileImage } from "lucide-react";

export default function PNGToJPG() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [converted, setConverted] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setConverted(false);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const downloadJPG = () => {
    if (!image) return;

    const img = new window.Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image matrix data
      ctx?.drawImage(img, 0, 0);

      const jpgUrl = canvas.toDataURL("image/jpeg", 0.9);

      const link = document.createElement("a");
      link.href = jpgUrl;
      const baseName = fileName.substring(0, fileName.lastIndexOf(".")) || "converted-image";
      link.download = `${baseName}.jpg`;
      link.click();

      setConverted(true);
    };

    img.src = image;
  };

  const resetTool = () => {
    setImage(null);
    setFileName("");
    setConverted(false);
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
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              PNG to <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">JPG Converter</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Convert lossless PNG images into compressed JPEG files instantly</p>
          </div>

          {/* Upload Dropzone Container */}
          {!image && (
            <div className="mb-6">
              <label
                htmlFor="imageUpload"
                className="group block w-full border-2 border-dashed border-zinc-800 hover:border-red-500/40 bg-zinc-950/50 hover:bg-zinc-950 rounded-2xl p-10 text-center cursor-pointer transition-all duration-200"
              >
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="w-10 h-10 text-zinc-600 group-hover:text-red-500 transition-colors mb-3" />
                  <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                    Upload PNG Image Asset
                  </span>
                  <span className="text-xs text-zinc-600 mt-1">Client-side rendering avoids data server tracking</span>
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept=".png,image/png"
                onChange={handleUpload}
                className="hidden"
              />
            </div>
          )}

          {/* File Sizing & Image Preview Box */}
          {image && (
            <div className="mb-6 space-y-4 animate-fade-in">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Conversion Preview Buffer</span>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 p-2 rounded-2xl max-w-sm mx-auto shadow-inner relative group">
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-xl object-contain"
                />
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 max-w-sm mx-auto flex items-center gap-3 text-xs font-mono">
                <FileImage className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="truncate text-zinc-400 flex-1">{fileName}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                  PNG Input
                </span>
              </div>
            </div>
          )}

          {/* Execution Operation Control Buttons */}
          {image && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={downloadJPG}
                  className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Convert & Download JPG
                </button>
                <button
                  onClick={resetTool}
                  className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Clear Panel"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {converted && (
                <div className="text-center text-xs font-mono text-emerald-500 animate-fade-in">
                  ✓ JPEG layout compiled and deployed successfully!
                </div>
              )}
            </div>
          )}
          {/* 📚 ADSENSE COMPLIANCE: CONVERTER INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Intra-Format Binary Image Transcoding
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      This localized image transcoding engine converts file formats between lossy JPEG compression and alpha-supported PNG layouts. By drawing raw pixel arrays onto active canvas blocks, it alters output wrappers directly in browser cache memory to ensure data privacy.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Analyze the trade-offs between lossy JPEG matrices and alpha-channel PNG formats.</p>
    </div>
    <a href="/blog/image-format-conversion-guide" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
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