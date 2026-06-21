"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { QrCode, RefreshCw, Sparkles, Download } from "lucide-react";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!text) return;
    try {
      // Configured options for premium dark mode contrast
      const url = await QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQr(url);
    } catch (err) {
      console.error(err);
    }
  };

  const resetTool = () => {
    setText("");
    setQr("");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[450px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* --- AD SLOT 1: TOP BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Top Banner ]
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Tool Frame Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-inner">
              <QrCode className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              QR Code <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Generator</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Generate matrix code blocks for text or URLs instantly</p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Payload / Target URL
              </label>
              <input
                type="text"
                placeholder="e.g. https://yourwebsite.com"
                value={text}
                onChange={(e) => { setText(e.target.value); if(qr) setQr(""); }}
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
              />
            </div>

            {/* Action Matrix Control */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={generateQR}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Generate QR
              </button>
              
              {(text || qr) && (
                <button
                  onClick={resetTool}
                  className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Reset Workspace"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* --- PREMIUM COMPONENT RESULT DISPLAY --- */}
          {qr && (
            <div className="mt-8 pt-6 border-t border-zinc-800/60 animate-fade-in space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Matrix Output Block</span>
              </div>
              
              {/* Specialized bounding container with clear background to give contrast to the code */}
              <div className="bg-white border border-zinc-800 p-4 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-2xl relative group overflow-hidden">
                <img src={qr} alt="QR Code Output" className="w-full h-full object-contain rounded-lg" />
              </div>

              {/* Action Downloader Trigger */}
              <div className="pt-2">
                <a
                  href={qr}
                  download="qrcode-matrix.png"
                  className="w-full py-2.5 px-4 font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-white rounded-xl text-zinc-400 text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-red-500" /> Download Matrix Asset
                </a>
              </div>
            </div>
          )}
          {/* 📚 ADSENSE COMPLIANCE: QR GENERATOR INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> High-Density 2D Matrix Barcode Encoding
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      Our QR engine translates custom string payloads into structured 2D binary matrices using native encoding protocols. It includes automated Reed-Solomon error correction layers to keep barcode blocks perfectly scannable even under physical distortion.
    </p>
  </div>
  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Learn how error correction variables preserve data block readability globally.</p>
    </div>
    <a href="/blog/qr-code-encoding-standards" className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap">
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