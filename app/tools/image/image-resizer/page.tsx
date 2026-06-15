"use client";

import { useRef, useState } from "react";
import { Move, UploadCloud, RefreshCw, Sparkles, Download } from "lucide-react";

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [fileName, setFileName] = useState("");
  const [resized, setResized] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const resizeImage = () => {
    if (!image || !canvasRef.current) return;

    const img = new window.Image();

    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");

      canvas.width = Number(width);
      canvas.height = Number(height);

      ctx?.drawImage(
        img,
        0,
        0,
        Number(width),
        Number(height)
      );
      setResized(true);
    };

    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = fileName ? `resized-${fileName}` : "resized-image.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const resetTool = () => {
    setImage(null);
    setWidth("800");
    setHeight("600");
    setFileName("");
    setResized(false);
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
              <Move className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              Image <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Resizer</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Modify image width and height bounds instantly</p>
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
                    Select Graphic Asset
                  </span>
                  <span className="text-xs text-zinc-600 mt-1">Supports PNG, JPG, WebP layers</span>
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Image Upload Status & Original Asset Preview */}
          {image && (
            <div className="mb-6 space-y-4 animate-fade-in">
              <div className="border border-zinc-800 bg-zinc-950 p-2 rounded-2xl max-w-sm mx-auto shadow-inner">
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-xl object-contain"
                />
              </div>
              <div className="text-center text-xs font-mono text-zinc-500 truncate max-w-xs mx-auto">
                File: {fileName}
              </div>
            </div>
          )}

          {/* Dimensions Controls Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Target Width
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={width}
                  onChange={(e) => { setWidth(e.target.value); setResized(false); }}
                  placeholder="Width"
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
                />
                <span className="absolute right-4 text-[10px] font-mono font-bold text-zinc-600 select-none">PX</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Target Height
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => { setHeight(e.target.value); setResized(false); }}
                  placeholder="Height"
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
                />
                <span className="absolute right-4 text-[10px] font-mono font-bold text-zinc-600 select-none">PX</span>
              </div>
            </div>
          </div>

          {/* Action Matrix Buttons */}
          <div className="space-y-3">
            {image && !resized && (
              <button
                onClick={resizeImage}
                className="w-full py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Process & Resize
              </button>
            )}

            {/* Hidden canvas required for structural scaling */}
            <canvas ref={canvasRef} className="hidden" />

            {resized && (
              <div className="flex gap-2 animate-fade-in">
                <button
                  onClick={downloadImage}
                  className="flex-1 py-3.5 px-4 font-bold bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Resized Asset
                </button>
                <button
                  onClick={resetTool}
                  className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Reset Workspace"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- AD SLOT 2: BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Bottom Banner ]
      </div>

    </main>
  );
}