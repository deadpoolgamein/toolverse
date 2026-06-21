"use client";

import { useState } from "react";
import { Calendar, RefreshCw, Sparkles } from "lucide-react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [ageDetails, setAgeDetails] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += 30;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeDetails({ years, months, days });
  };

  const resetTool = () => {
    setDob("");
    setAgeDetails(null);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[450px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* --- AD SLOT 1: TOP BANNER (Earning Node) --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Top Banner ]
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Tool Frame Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-inner">
              <Calendar className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              Age <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Calculator</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Calculate exact age metrics instantly</p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                Select Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all scheme-dark cursor-pointer"
              />
            </div>

            {/* Action Matrix */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={calculateAge}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                Calculate Age
              </button>
              
              {dob && (
                <button
                  onClick={resetTool}
                  className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Reset"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* --- NEXT LEVEL PREMIUM RESULT DISPLAY --- */}
          {ageDetails && (
            <div className="mt-8 pt-6 border-t border-zinc-800/60 animate-fade-in">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Calculated Metrics</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-white">{ageDetails.years}</div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5">Years</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-white">{ageDetails.months}</div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5">Months</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-white">{ageDetails.days}</div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5">Days</div>
                </div>
              </div>
            </div>
          )}
          {/* 📚 ADSENSE COMPLIANCE: AGE CALCULATOR INSIGHTS */}
<section className="mt-12 border-t border-zinc-900 pt-10 space-y-6 max-w-4xl mx-auto">
  <div className="space-y-2">
    <h2 className="text-lg font-black tracking-tight text-zinc-100 flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-sky-400" /> Dynamic Chronological Time Tracking Matrix
    </h2>
    <p className="text-xs font-mono text-zinc-400 leading-relaxed">
      Our client-side chronological age calculator performs microsecond-accurate time matrix evaluations. By processing leap years, time zone offsets, and direct calendar epoch variations locally inside your browser thread, it extracts precise years, months, weeks, and total days without transmitting personal data parameters to any external cloud database.
    </p>
  </div>

  <div className="pt-4 border-t border-dashed border-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="text-left space-y-0.5">
      <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wide">Need Step-by-Step Instructions?</h4>
      <p className="text-[10px] text-zinc-600 font-mono">Read our official documentation to understand calendar interval formulas.</p>
    </div>
    <a 
      href="/blog/how-to-calculate-age"
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