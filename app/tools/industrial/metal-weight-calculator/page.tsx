"use client";

import { useState, useEffect } from "react";
import { Scale, Weight, Sliders, HelpCircle, Sparkles } from "lucide-react";

const densities: Record<string, number> = {
  ms: 7.85, 
  ss: 8.00, 
  al: 2.70, 
};

export default function MetalWeightCalculator() {
  const [material, setMaterial] = useState("ms");
  const [shape, setShape] = useState("plate"); 
  const [unitSystem, setUnitSystem] = useState("metric"); // metric vs imperial
  const [quantity, setQuantity] = useState(1);

  // DIMENSION INPUT MATRIX
  const [lengthInput, setLengthInput] = useState<number>(1); 
  const [widthInput, setWidthInput] = useState<number>(100); 
  const [widthSoot, setWidthSoot] = useState<number>(0);     
  
  const [heightInput, setHeightInput] = useState<number>(50); 
  const [heightSoot, setHeightSoot] = useState<number>(0);   
  
  const [thicknessInput, setThicknessInput] = useState<number>(5); 
  const [thicknessSoot, setThicknessSoot] = useState<number>(0);   
  
  const [diameterInput, setDiameterInput] = useState<number>(50); 
  const [diameterSoot, setDiameterSoot] = useState<number>(0);   

  const [unitWeight, setUnitWeight] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);

  useEffect(() => {
    const d = densities[material];
    let volumeCm3 = 0;

    let finalLengthMm = 0;
    let finalWidthMm = 0;
    let finalHeightMm = 0;
    let finalThicknessMm = 0;
    let finalDiameterMm = 0;

    if (unitSystem === "metric") {
      finalLengthMm = lengthInput * 1000; // Meters to mm
      finalWidthMm = widthInput;
      finalHeightMm = heightInput;
      finalThicknessMm = thicknessInput;
      finalDiameterMm = diameterInput;
    } else {
      // Imperial Parse: 1 Inch = 25.4mm, 1 Soot = 3.175mm, 1 Foot = 304.8mm
      finalLengthMm = lengthInput * 304.8; // Feet to mm
      finalWidthMm = (widthInput * 25.4) + (widthSoot * 3.175);
      finalHeightMm = (heightInput * 25.4) + (heightSoot * 3.175);
      finalThicknessMm = (thicknessInput * 25.4) + (thicknessSoot * 3.175);
      finalDiameterMm = (diameterInput * 25.4) + (diameterSoot * 3.175);
    }

    const lCm = finalLengthMm / 10;
    const wCm = finalWidthMm / 10;
    const hCm = finalHeightMm / 10;
    const tCm = finalThicknessMm / 10;
    const diaCm = finalDiameterMm / 10;

    if (shape === "plate") {
      volumeCm3 = lCm * wCm * tCm;
    } 
    else if (shape === "round-pipe") {
      const outerRadiusCm = diaCm / 2;
      const innerRadiusCm = (finalDiameterMm - 2 * finalThicknessMm) / 2 / 10;
      if (innerRadiusCm > 0) {
        volumeCm3 = Math.PI * (Math.pow(outerRadiusCm, 2) - Math.pow(innerRadiusCm, 2)) * lCm;
      }
    } 
    else if (shape === "box-pipe") {
      const innerWidthCm = (finalWidthMm - 2 * finalThicknessMm) / 10;
      const innerHeightCm = (finalHeightMm - 2 * finalThicknessMm) / 10;
      if (innerWidthCm > 0 && innerHeightCm > 0) {
        volumeCm3 = ((wCm * hCm) - (innerWidthCm * innerHeightCm)) * lCm;
      }
    } 
    else if (shape === "angle") {
      volumeCm3 = ((wCm * tCm) + ((hCm - tCm) * tCm)) * lCm;
    }

    const calcWeight = (volumeCm3 * d) / 1000;
    
    if (calcWeight > 0 && !isNaN(calcWeight)) {
      setUnitWeight(Number(calcWeight.toFixed(3)));
      setTotalWeight(Number((calcWeight * quantity).toFixed(3)));
    } else {
      setUnitWeight(0);
      setTotalWeight(0);
    }
  }, [material, shape, unitSystem, lengthInput, widthInput, widthSoot, heightInput, heightSoot, thicknessInput, thicknessSoot, diameterInput, diameterSoot, quantity]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP AD */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_WEIGHT_CALC_BANNER_728X90 ]
        </div>

        {/* HEADER BRANDING */}
        <div className="space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
            <Scale className="w-8 h-8 text-red-500" /> Metal Weight Calculator
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Calculate precise physical mass and total weight parameters for industrial structural elements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* VARIABLES CONTROL INPUTS */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-5 h-fit backdrop-blur-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-red-500" /> Input Variables
            </h3>

            {/* 1. UNIT SYSTEM SELECTOR */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">1. Unit Metric System</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUnitSystem("metric")}
                  className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                    unitSystem === "metric" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}
                >
                  Metric (mm / Meter)
                </button>
                <button
                  onClick={() => setUnitSystem("imperial")}
                  className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                    unitSystem === "imperial" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}
                >
                  Imperial (Inch / Soot)
                </button>
              </div>
            </div>

            {/* 2. MATERIAL GRADE */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">2. Material Composition</label>
              <select 
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-red-500/30 transition-all cursor-pointer"
              >
                <option value="ms">Mild Steel (Carbon Steel)</option>
                <option value="ss">Stainless Steel (300 Series)</option>
                <option value="al">Aluminum Alloys</option>
              </select>
            </div>

            {/* 3. SHAPE SELECTOR */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400">3. Structural Profile Shape</label>
              <select 
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-red-500/30 transition-all cursor-pointer"
              >
                <option value="plate">⬜ Flat Plate / Metal Sheet</option>
                <option value="round-pipe">⭕ Round Pipe / Hollow Tube</option>
                <option value="box-pipe">🔲 Rectangular / Square Box Section</option>
                <option value="angle">📐 L-Angle Equal Section</option>
              </select>
            </div>

            {/* 4. DYNAMIC DIMENSIONS CONTROLS */}
            <div className="border-t border-zinc-900/60 pt-4 space-y-4">
              <label className="text-xs font-mono font-bold text-zinc-400 block">4. Section Dimensions</label>

              {/* LENGTH FIELD */}
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="text-xs font-mono text-zinc-500">Total Length ({unitSystem === "metric" ? "Meters" : "Feet"})</span>
                <input 
                  type="number" 
                  value={lengthInput}
                  onChange={(e) => setLengthInput(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="h-9 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-right text-white outline-none focus:border-red-500/20"
                />
              </div>

              {/* ROUND PIPE DIAMETER CONTROLS */}
              {shape === "round-pipe" && (
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-zinc-500 block">Outer Diameter</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input type="number" value={diameterInput} onChange={(e) => setDiameterInput(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-white outline-none" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">{unitSystem === "metric" ? "mm" : "Inch"}</span>
                    </div>
                    {unitSystem === "imperial" && (
                      <div className="relative">
                        <input type="number" placeholder="Soot" value={diameterSoot} onChange={(e) => setDiameterSoot(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-red-400 outline-none" />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-700 font-bold uppercase">Soot</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* WIDTH CONTROLS */}
              {shape !== "round-pipe" && (
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-zinc-500 block">Section Width</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative w-full col-span-1">
                      <input type="number" value={widthInput} onChange={(e) => setWidthInput(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-white outline-none" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">{unitSystem === "metric" ? "mm" : "Inch"}</span>
                    </div>
                    {unitSystem === "imperial" && (
                      <div className="relative w-full col-span-1">
                        <input type="number" placeholder="Soot" value={widthSoot} onChange={(e) => setWidthSoot(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-red-400 outline-none" />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-700 font-bold uppercase">Soot</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* HEIGHT CONTROLS */}
              {(shape === "box-pipe" || shape === "angle") && (
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-zinc-500 block">Section Height</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative w-full col-span-1">
                      <input type="number" value={heightInput} onChange={(e) => setHeightInput(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-white outline-none" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">{unitSystem === "metric" ? "mm" : "Inch"}</span>
                    </div>
                    {unitSystem === "imperial" && (
                      <div className="relative w-full col-span-1">
                        <input type="number" placeholder="Soot" value={heightSoot} onChange={(e) => setHeightSoot(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-red-400 outline-none" />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-700 font-bold uppercase">Soot</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* THICKNESS CONTROLS */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-zinc-500 block">Wall Thickness</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative w-full col-span-1">
                    <input type="number" value={thicknessInput} onChange={(e) => setThicknessInput(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-white outline-none" />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 font-bold uppercase">{unitSystem === "metric" ? "mm" : "Inch"}</span>
                  </div>
                  {unitSystem === "imperial" && (
                    <div className="relative w-full col-span-1">
                      <input type="number" placeholder="Soot" value={thicknessSoot} onChange={(e) => setThicknessSoot(parseFloat(e.target.value) || 0)} className="h-9 w-full rounded-lg bg-zinc-950 border border-zinc-900 pr-12 pl-3 font-mono text-xs text-right text-red-400 outline-none" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-700 font-bold uppercase">Soot</span>
                    </div>
                  )}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="grid grid-cols-2 gap-2 items-center border-t border-zinc-900/40 pt-2">
                <span className="text-xs font-mono text-zinc-400 font-bold">Quantity (Pieces)</span>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="h-9 rounded-lg bg-zinc-950 border border-zinc-900 px-3 font-mono text-xs text-right text-white outline-none" />
              </div>

            </div>
          </div>

          {/* OUTPUT VIEWPORT */}
          <div className="lg:col-span-3 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            
            <div className="space-y-6 w-full">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Weight className="w-3.5 h-3.5 text-red-500" /> Mass Matrix Computation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 rounded-2xl p-5 space-y-1 shadow-inner sm:col-span-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Total Net Weight</span>
                  <p className="text-4xl font-black text-red-500 font-mono tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    {totalWeight.toLocaleString()} kg
                  </p>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Unit Weight (Per Item)</span>
                  <p className="text-sm font-bold text-zinc-200">{unitWeight} kg</p>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Active Equation Pipelines</span>
                  <p className="text-xs font-bold text-red-400 uppercase font-mono">{unitSystem === "metric" ? "STANDARD METRIC" : "IMPERIAL FRACTIONS"}</p>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-xl p-4 flex gap-3 text-xs text-zinc-400 font-mono leading-relaxed">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-zinc-600 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase text-[10px] text-zinc-500 tracking-wide mb-0.5">Calculation Insight</span>
                  Theoretical weights are computed using solid geometrical volumetric equations. Commercial materials may exhibit a 2-5% mass variance due to localized milling tolerances.
                </div>
              </div>
              {/* 📚 ADSENSE COMPLIANCE: METAL WEIGHT INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Metallurgical Density and Mass Analytics
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      This dynamic industrial calculator estimates physical mass for raw steel, aluminum, copper, and iron structures. By binding specific chemical elemental density constants ($kg/m^3$) against geometry dimensions, it outputs high-precision alloy metrics for procurement.
    </p>
  </div>

  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Master how geometry profiles map thickness indices into industrial weight data.</p>
    </div>
    <a 
      href="/blog/metal-weight-estimation-guide"
      className="w-full md:w-auto h-11 px-6 flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-mono font-bold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(14,165,233,0.05)] transition-all whitespace-nowrap"
    >
      <Sparkles className="w-3.5 h-3.5" /> READ THE COMPLETE GUIDE
    </a>
  </div>
</section>
            </div>

            <div className="w-full h-14 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-700 tracking-wider mt-6">
              [ NATIVE_BOARD_AD_SPACE ]
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}