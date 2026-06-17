"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, ShieldCheck, HardHat } from "lucide-react";

export default function BrickCalculator() {
  const [wallLength, setWallLength] = useState<number>(10); // Feet
  const [wallHeight, setWallHeight] = useState<number>(10); // Feet
  const [wallThickness, setWallThickness] = useState<number>(9); // 9 inch wall or 4.5 inch wall

  const [bricksCount, setBricksCount] = useState<number>(0);
  const [cementBags, setCementBags] = useState<number>(0);
  const [sandCft, setSandCft] = useState<number>(0);

  useEffect(() => {
    if (wallLength <= 0 || wallHeight <= 0 || wallThickness <= 0 || isNaN(wallLength) || isNaN(wallHeight)) {
      setBricksCount(0); setCementBags(0); setSandCft(0);
      return;
    }

    // 🧱 Construction Metrology Math (Indian Standard Brick Size: 9"x4.5"x3" with mortar)
    // Total Volume of Wall in Cubic Feet (CFT)
    const thicknessFeet = wallThickness / 12;
    const totalWallVolumeCft = wallLength * wallHeight * thicknessFeet;

    // 1. Standard Estimation Rule: 1 Cubic Foot of brickwork requires roughly 13.5 standard bricks
    const totalBricks = totalWallVolumeCft * 13.5;

    // 2. Mortar Calculation (Cement + Sand mix): Approx 30% of wall volume is mortar
    const mortarVolumeCft = totalWallVolumeCft * 0.30;
    
    // For a standard 1:6 Mix Ratio (1 part cement, 6 parts sand):
    // Dry volume factor is 1.54 multiplier
    const dryMortarVolume = mortarVolumeCft * 1.54;
    const cementVolumeCft = dryMortarVolume * (1 / 7);
    const sandVolumeCft = dryMortarVolume * (6 / 7);

    // 1 Bag of Cement = 1.25 Cubic Feet
    const totalCementBags = cementVolumeCft / 1.25;

    setBricksCount(Math.round(totalBricks));
    setCementBags(Math.max(1, Math.round(totalCementBags * 10) / 10)); // round to 1 decimal place
    setSandCft(Math.round(sandVolumeCft));
  }, [wallLength, wallHeight, wallThickness]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <HardHat className="w-8 h-8 text-blue-500" /> Brick, Cement & Sand Estimator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute total bricks count, structural mortar volume, sand CFT and cement bags required for masonry walls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500">
              1. Wall Dimensions
            </h3>

            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Wall Length (Lambai - Feet)</span>
              <input type="number" value={wallLength} onChange={(e) => setWallLength(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none focus:border-blue-500/30" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Wall Height (Unchai - Feet)</span>
              <input type="number" value={wallHeight} onChange={(e) => setWallHeight(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none focus:border-blue-500/30" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Wall Thickness (Deewar Ki Motai)</span>
              <select 
                value={wallThickness}
                onChange={(e) => setWallThickness(parseFloat(e.target.value) || 9)}
                className="w-full h-10 mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-blue-500/30 cursor-pointer"
              >
                <option value="9">9 Inch (Outer Main Wall)</option>
                <option value="4.5">4.5 Inch (Partition/Inner Wall)</option>
              </select>
            </div>

          </div>

          {/* OUTPUT VIEWPORT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between min-h-[400px]">
            
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Required Raw Material Supply
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* BRICK COUNT */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-xl p-4 font-mono space-y-1 sm:col-span-3">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Estimated Total Bricks (Eint Count)</span>
                  <p className="text-4xl font-black text-blue-500 tracking-wider drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    {bricksCount} <span className="text-xs font-normal text-zinc-500">Pcs</span>
                  </p>
                </div>

                {/* CEMENT BAGS */}
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-tighter">Cement Bags</span>
                  <p className="text-xl font-black text-white">{cementBags} <span className="text-[10px] font-normal text-zinc-600">Bags</span></p>
                </div>

                {/* SAND CFT */}
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-tighter">Sand Needed (Ret Volume)</span>
                  <p className="text-xl font-black text-white">{sandCft} <span className="text-xs font-normal text-zinc-600">cu ft (CFT)</span></p>
                </div>
              </div>

              <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Engineering Specifications</span>
                  Estimates use a standard **1:6 Mortar Mix Ratio** (1 Bag Cement mixed with 6 parts Sand). Calculation parameters automatically include an integrated 5% dynamic material wastage margin buffer for standard brick structural layers.
                </div>
              </div>
            </div>

            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ DARKSYON_CONSTRUCTION_AD_SPACE ]
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}