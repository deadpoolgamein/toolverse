"use client";

import { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { Crop as CropIcon, UploadCloud, RefreshCw, Sparkles } from "lucide-react";

import "react-image-crop/dist/ReactCrop.css";

export default function ImageCropper() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const reader = new FileReader();

    reader.addEventListener("load", () =>
      setImgSrc(reader.result?.toString() || "")
    );

    reader.readAsDataURL(e.target.files[0]);
  };

  const downloadCrop = () => {
    const image = document.getElementById("crop-image") as HTMLImageElement;

    if (!image || !crop) return;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const resetTool = () => {
    setImgSrc("");
    setCrop(undefined);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- AD SLOT 1: TOP BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Top Banner ]
      </div>

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Tool Frame Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-inner">
              <CropIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              Image <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Cropper</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Crop, align, and trim canvas ratios securely in-browser</p>
          </div>

          {/* Upload Dropzone Container */}
          {!imgSrc && (
            <div className="mb-6">
              <label
                htmlFor="imageUpload"
                className="group block w-full border-2 border-dashed border-zinc-800 hover:border-red-500/40 bg-zinc-950/50 hover:bg-zinc-950 rounded-2xl p-10 text-center cursor-pointer transition-all duration-200"
              >
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="w-10 h-10 text-zinc-600 group-hover:text-red-500 transition-colors mb-3" />
                  <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                    Click to Select Image Asset
                  </span>
                  <span className="text-xs text-zinc-600 mt-1">Supports PNG, JPG, WebP bounding elements</span>
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
              />
            </div>
          )}

          {/* ReactCrop Advanced Editor Display */}
          {imgSrc && (
            <div className="mb-8 space-y-4 animate-fade-in">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Adjust Selection Parameters</span>
              </div>

              <div className="flex justify-center border border-zinc-800 bg-zinc-950/70 p-4 rounded-2xl max-h-[550px] overflow-auto shadow-inner">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  className="rounded-lg overflow-hidden border border-zinc-900"
                >
                  <img
                    id="crop-image"
                    src={imgSrc}
                    alt="Crop Preview"
                    className="max-h-[450px] object-contain"
                  />
                </ReactCrop>
              </div>
            </div>
          )}

          {/* Action Operation Controls Buttons */}
          {imgSrc && (
            <div className="flex gap-2">
              <button
                onClick={downloadCrop}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Crop & Download
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

      {/* --- AD SLOT 2: BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Bottom Banner ]
      </div>

    </main>
  );
}