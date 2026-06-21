"use client";

import { useState, useEffect } from "react";
import { Sliders, HelpCircle, ShieldCheck, Hammer, Sparkles } from "lucide-react";

export default function CftCalculator() {
  const [woodType, setWoodType] = useState<"round" | "square">("square");
  
  // Square Lumber Inputs
  const [width, setWidth] = useState<number>(12);  // Inches
  const [thickness, setThickness] = useState<number>(1); // Inches
  const [lengthSquare, setLengthSquare] = useState<number>(8); // Feet

  // Round Log Inputs
  const [girth, setGirth] = useState<number>(36); // Goli/Girth in Inches
  const [lengthRound, setLengthRound] = useState<number>(10); // Feet

  const [pricePerCft, setPricePerCft] = useState<number>(1500); // INR per CFT

  const [calculatedCft, setCalculatedCft] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    let cft = 0;

    if (woodType === "square") {
      if (width > 0 && thickness > 0 && lengthSquare > 0) {
        // 📐 Square Lumber Formula: (Width" x Thickness" x Length') / 144
        cft = (width * thickness * lengthSquare) / 144;
      }
    } else {
      if (girth > 0 && lengthRound > 0) {
        // 🪵 Round Log (Hoppus Formula used in India): ((Girth" / 4)^2 x Length') / 144
        const quarterGirth = girth / 4;
        cft = (Math.pow(quarterGirth, 2) * lengthRound) / 144;
      }
    }

    setCalculatedCft(Number(cft.toFixed(2)));
    setTotalCost(Math.round(cft * pricePerCft));
  }, [woodType, width, thickness, lengthSquare, girth, lengthRound, pricePerCft]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <Hammer className="w-8 h-8 text-emerald-500" /> Wood Cubic Feet (CFT) Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Compute exact structural timber volumetric mass in Cubic Feet (CFT) for logs and commercial lumbers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* CONTROLS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
              1. Material Configuration
            </h3>

            {/* TOGGLE WOOD TYPE */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setWoodType("square")} 
                className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all ${woodType === "square" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}
              >
                Chakor / Square Lumber
              </button>
              <button 
                onClick={() => setWoodType("round")} 
                className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all ${woodType === "round" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"}`}
              >
                Gool / Round Log
              </button>
            </div>

            {/* DYNAMIC INPUTS BASED ON SELECTION */}
            {woodType === "square" ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Width (Chaudai - Inches)</span>
                  <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Thickness (Motai - Inches)</span>
                  <input type="number" value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Length (Lambai - Feet)</span>
                  <input type="number" value={lengthSquare} onChange={(e) => setLengthSquare(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Girth / Goli (Round Circumference - Inches)</span>
                  <input type="number" value={girth} onChange={(e) => setGirth(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Length (Lambai - Feet)</span>
                  <input type="number" value={lengthRound} onChange={(e) => setLengthRound(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
                </div>
              </div>
            )}

            <div className="border-t border-zinc-900 pt-4">
              <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase">Rate Per CFT</span>
              <input type="number" value={pricePerCft} onChange={(e) => setPricePerCft(parseFloat(e.target.value) || 0)} className="h-10 w-full mt-1 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-white outline-none" />
            </div>

          </div>

          {/* OUTPUT VIEWPORT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between min-h-[400px]">
            
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Volumetric Calculations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Total Volume (CFT)</span>
                  <p className="text-4xl font-black text-emerald-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {calculatedCft} <span className="text-xs font-normal text-zinc-500">cu ft</span>
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Estimated Cost</span>
                  <p className="text-4xl font-black text-white font-mono tracking-wider">
                    ₹{totalCost}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Mathematical Rule</span>
                  For Square Boards, standard custom volume scales via length, width, and depth metrics. For Round Logs, the system automatically deploys the **Hoppus Quarter-Girth Formula** which accounts for natural wood taper loss during factory sawing conversions.
                </div>
              </div>
            </div>
            {/* 📚 ADSENSE COMPLIANCE: CFT CALCULATOR INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Cubic Feet Timber Volumetric Core
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      Our structural carpentry engine calculates exact Cubic Feet (CFT) and Cubic Meters (CBM) volumes for timber logs and rectangular wood planks. By parsing dynamic cross-sectional area multipliers on the client thread, it eliminates physical material yield wastage for logging operations.
    </p>
  </div>

  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Learn how cylinder scaling formulas isolate cylindrical logs into flat layouts.</p>
    </div>
    <a 
      href="/blog/cft-measurement-guide"
      className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(14,165,233,0.05)] transition-all whitespace-nowrap"
    >
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>

            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ DARKSYON_WOODWORKING_AD_SPACE ]
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}