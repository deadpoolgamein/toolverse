"use client";

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambient Glow Patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-md mx-auto px-4 animate-fade-in">
        
        {/* Cyber Alert Icon Warning Badge */}
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 text-red-500 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        {/* Big Glow Numeric Heading */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-zinc-100 drop-shadow-[0_0_30px_rgba(239,68,68,0.25)] select-none">
          4<span className="text-red-500">0</span>4
        </h1>

        {/* Informational Sub-text Labels */}
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-4 text-zinc-200">
          Matrix Node Not Found
        </h2>
        
        <p className="text-zinc-500 text-xs sm:text-sm mt-3 leading-relaxed max-w-xs mx-auto">
          The routing endpoint element you are trying to intercept does not exist or has been shifted.
        </p>

        {/* Back to Home CTA Matrix Control Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.45)] transition-all active:scale-95 group"
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to Core Dashboard</span>
          </Link>
        </div>

        {/* Security / System Footer Note */}
        <div className="mt-12 text-[10px] font-mono text-zinc-700 tracking-wider uppercase">
          Status Code: 404 // Sandbox Operations Safe
        </div>

      </div>
    </main>
  );
}