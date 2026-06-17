"use client";

import { useState, useRef, useEffect } from "react";
import { Sliders, HelpCircle, Video, Play, Pause, Upload, RotateCcw, Eye } from "lucide-react";

export default function VideoBackgroundRemover() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replaceColor, setReplaceColor] = useState<string>("#00ff00"); // Default green mask tracking
  const [similarity, setSimilarity] = useState<number>(120); // Chroma range threshold
  const [backgroundColor, setBackgroundColor] = useState<string>("#00000000"); // Default Transparent

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // File Upload Handler
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoSrc) URL.revokeObjectURL(videoSrc); // Clean up memory leak
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsPlaying(false);
    }
  };

  // Convert Hex color to RGB object for matrix calculation
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 255, b: 0 };
  };

  // Real-time Canvas Processor Loop
  const processFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.paused || video.ended) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Match canvas size to source video parameters
    if (canvas.width !== video.videoWidth) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Draw original video frame buffer onto hidden layers
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const length = frame.data.length;

    const targetRgb = hexToRgb(replaceColor);
    const bgRgb = backgroundColor === "#00000000" ? null : hexToRgb(backgroundColor);

    // Dynamic Pixel-by-Pixel Chroma Key Processing Core
    for (let i = 0; i < length; i += 4) {
      const r = frame.data[i];
      const g = frame.data[i + 1];
      const b = frame.data[i + 2];

      // Euclidean color distance tracking matrix
      const distance = Math.sqrt(
        Math.pow(r - targetRgb.r, 2) +
        Math.pow(g - targetRgb.g, 2) +
        Math.pow(b - targetRgb.b, 2)
      );

      // If pixel match is below similarity threshold, remove/replace it
      if (distance < similarity) {
        if (bgRgb) {
          frame.data[i] = bgRgb.r;     // R
          frame.data[i + 1] = bgRgb.g; // G
          frame.data[i + 2] = bgRgb.b; // B
          frame.data[i + 3] = 255;     // Solid opacity
        } else {
          frame.data[i + 3] = 0; // Alpha 0 -> Completely Transparent
        }
      }
    }

    // Render processed frame buffer onto visible canvas viewport
    ctx.putImageData(frame, 0, 0);
    requestRef.current = requestAnimationFrame(processFrame);
  };

  // Play/Pause Controller Sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
      requestRef.current = requestAnimationFrame(processFrame);
    } else {
      video.pause();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, replaceColor, similarity, backgroundColor]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <Video className="w-8 h-8 text-sky-400" /> AI Video Background Remover
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Real-time browser-native video background isolating engine using high-performance frame matrices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* CONTROLS AREA */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1">
              <Sliders className="w-3 h-3" /> Processing Parameters
            </h3>

            {/* UPLOAD TRIGGER */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Upload Source Video</span>
              <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-zinc-800 rounded-xl bg-zinc-950 hover:bg-zinc-900/30 cursor-pointer transition-colors group">
                <Upload className="w-5 h-5 text-zinc-600 group-hover:text-sky-400 transition-colors mb-1" />
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">Choose MP4 / WebM File</span>
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
              </label>
            </div>

            {/* COLOR CHROMA PICKER */}
            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Target Background Color to Remove</span>
              <div className="flex gap-2 mt-1.5">
                <input 
                  type="color" 
                  value={replaceColor} 
                  onChange={(e) => setReplaceColor(e.target.value)} 
                  className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 cursor-pointer p-0.5"
                />
                <input 
                  type="text" 
                  value={replaceColor} 
                  onChange={(e) => setReplaceColor(e.target.value)}
                  className="h-10 flex-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none"
                />
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-1 text-[8px] font-mono text-zinc-600 text-center">
                <button onClick={() => setReplaceColor("#00ff00")} className="bg-zinc-900/40 p-1 rounded hover:text-white">Green Screen</button>
                <button onClick={() => setReplaceColor("#ffffff")} className="bg-zinc-900/40 p-1 rounded hover:text-white">White Wall</button>
                <button onClick={() => setReplaceColor("#0000ff")} className="bg-zinc-900/40 p-1 rounded hover:text-white">Blue Screen</button>
              </div>
            </div>

            {/* RANGE THRESHOLD */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase">
                <span className="text-zinc-500">Color Sensitivity Match</span>
                <span className="text-sky-400">{similarity}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="300" 
                value={similarity} 
                onChange={(e) => setSimilarity(parseInt(e.target.value) || 10)}
                className="w-full accent-sky-500 bg-zinc-950 h-1 rounded"
              />
            </div>

            {/* NEW BACKGROUND CONFIG */}
            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Replace Background With</span>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <button 
                  onClick={() => setBackgroundColor("#00000000")} 
                  className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all ${backgroundColor === "#00000000" ? "bg-sky-500/10 border-sky-500/30 text-sky-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}
                >
                  Transparent (Alpha)
                </button>
                <button 
                  onClick={() => setBackgroundColor("#ff0000")} 
                  className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all ${backgroundColor !== "#00000000" ? "bg-sky-500/10 border-sky-500/30 text-sky-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}
                >
                  Solid Studio Color
                </button>
              </div>
              {backgroundColor !== "#00000000" && (
                <input 
                  type="color" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)} 
                  className="w-full h-8 mt-2 rounded-lg bg-zinc-950 border border-zinc-800 cursor-pointer"
                />
              )}
            </div>

          </div>

          {/* DISPLAY VIEWPORT AREA */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between min-h-[450px]">
            <div className="space-y-6 w-full h-full flex flex-col">
              
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-sky-500" /> Live Render Output Pipeline
              </h3>

              {/* MEDIA VIEWPORTS WORKSPACE */}
              <div className="flex-1 w-full bg-zinc-950 border border-zinc-900 rounded-xl relative overflow-hidden flex items-center justify-center min-h-[220px]">
                {videoSrc ? (
                  <>
                    {/* Hidden Native Streaming Buffer */}
                    <video 
                      ref={videoRef} 
                      src={videoSrc} 
                      loop 
                      muted 
                      playsInline 
                      className="hidden" 
                    />
                    {/* Processed Rendering Output Layer */}
                    <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
                  </>
                ) : (
                  <div className="text-center font-mono space-y-1 text-zinc-600 text-xs">
                    <p className="uppercase tracking-widest font-bold">No Video Uploaded</p>
                    <p className="text-[10px] text-zinc-700">Upload a clip to feed the isolation matrix</p>
                  </div>
                )}
              </div>

              {/* CONTROLLERS FOOTER BAR */}
              {videoSrc && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="flex-1 h-10 rounded-xl bg-sky-500 font-mono font-bold text-xs text-black flex items-center justify-center gap-1.5 hover:bg-sky-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                    {isPlaying ? "PAUSE PIPELINE" : "START ISOLATION"}
                  </button>
                  <button 
                    onClick={() => {
                      if(videoRef.current) videoRef.current.currentTime = 0;
                      processFrame();
                    }}
                    className="w-12 h-10 border border-zinc-900 bg-zinc-950 rounded-xl flex items-center justify-center hover:text-sky-400 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* COMPLIANCE GUIDE */}
              <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Engine Information</span>
                  Processing executes 100% locally inside your device GPU buffer web streams. For optimal results, use input videos with distinct flat background walls and adjust color similarity ranges to clear edge halos.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}