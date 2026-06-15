"use client";

import { useState } from "react";
import { Calculator, Search, ChevronRight, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const calculatorsList = [
  {
    id: "emi-calculator",
    title: "EMI Calculator",
    description: "Equated Monthly Installment computational matrix for systematic loans.",
    link: "/tools/calculators/emi-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
  {
    id: "loan-calculator",
    title: "Loan Calculator",
    description: "Detailed break-up and total interest amortization analysis.",
    link: "/tools/calculators/loan-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
  {
    id: "sip-calculator",
    title: "SIP Calculator",
    description: "Systematic Investment Plan projection engine for future returns.",
    link: "/tools/calculators/sip-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
  {
    id: "gst-calculator",
    title: "GST Calculator",
    description: "Calculate Net price, CGST, SGST, and IGST components instantly.",
    link: "/tools/calculators/gst-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    description: "Precise lifespan time-matrix computation down to the exact minutes.",
    link: "/tools/calculators/age-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Execute fraction increases, absolute shifts, and baseline percentages.",
    link: "/tools/calculators/percentage-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
  {
    id: "discount-calculator",
    title: "Discount Calculator",
    description: "Compute structural final deductions, clearance sales, and gross savings.",
    link: "/tools/calculators/discount-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
  {
    id: "bmi-calculator",
    title: "BMI Calculator",
    description: "Body Mass Index assessment engine mapped with fitness parameters.",
    link: "/tools/calculators/bmi-calculator", // Nested Route Link
    borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
  },
];

export default function CalculatorsCategoryPage() {
  const [query, setQuery] = useState("");

  const filteredCalculators = calculatorsList.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 📢 ADS PLACEHOLDER 1: TOP BANNER */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest">
          [ DARKSYON_CALCULATOR_TOP_AD_728X90 ]
        </div>

        {/* HEADER SECTION */}
        <section className="text-center space-y-4 border-b border-zinc-900 pb-10">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Computational Calculators
            </h1>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Execute advanced logical algorithms, mathematical equations, and financial models.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search math & financial calculators..."
              className="w-full h-11 rounded-xl bg-zinc-900/30 border border-zinc-900 pl-11 pr-4 text-sm font-mono placeholder:text-zinc-700 focus:border-purple-500/30 transition-all backdrop-blur-md outline-none"
            />
          </div>
        </section>

        {/* GRID LAYOUT */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
            Available Calculation Matrix ({filteredCalculators.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((tool) => (
              <Link
                key={tool.id}
                href={tool.link}
                className={`group border border-zinc-900 bg-zinc-900/40 rounded-2xl p-6 space-y-4 transition-all duration-3xl hover:bg-zinc-900/80 ${tool.borderGlow}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                    <h3 className="text-md font-bold text-zinc-200 group-hover:text-white transition-colors">{tool.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-purple-400 transition-all" />
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">{tool.description}</p>
                
                <div className="border-t border-zinc-900/60 pt-3 text-[10px] font-mono uppercase text-zinc-600 group-hover:text-purple-400 tracking-wider flex items-center gap-1">
                  Launch App <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}

            {/* 📢 ADS PLACEHOLDER 2 */}
            {filteredCalculators.length > 0 && (
              <div className="border border-zinc-900/40 bg-zinc-900/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed text-[11px] font-mono text-zinc-700 min-h-[160px]">
                <span>[ SPONSORED UNIT INDEX ]</span>
              </div>
            )}
          </div>
        </section>

        {/* 📢 ADS PLACEHOLDER 3 */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl flex items-center justify-center text-xs font-mono text-zinc-700 tracking-widest mt-12">
          [ DARKSYON_CALCULATOR_BOTTOM_AD_728X90 ]
        </div>

      </div>
    </main>
  );
}