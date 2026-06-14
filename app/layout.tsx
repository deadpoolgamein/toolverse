"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import Link from "next/link";
import "./globals.css"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- DETECT ADMIN BANNER DATA (GLOBAL ROUTE SYNCHRONIZER) ---
  const [alertText, setAlertText] = useState("");
  const [isAlertActive, setIsAlertActive] = useState(false);

  useEffect(() => {
    const syncAlertState = () => {
      const savedText = localStorage.getItem("draksyon_alert_text") || "";
      const savedActive = localStorage.getItem("draksyon_alert_active") === "true";
      setAlertText(savedText);
      setIsAlertActive(savedActive);
    };

    syncAlertState();
    window.addEventListener("storage", syncAlertState);
    return () => window.removeEventListener("storage", syncAlertState);
  }, []);

  return (
    <html lang="en">
      {/* 🔴 GOOGLE VERIFICATION HEAD SECTION 🔴 */}
      <head>
        {/* 1. APNA GOOGLE SITE VERIFICATION CODE NICHE VALA CONTENT="..." MEIN REPLACE KAREIN */}
        <meta name="google-site-verification" content="XS0bHzyuQExu7uDOKfm0hHmcANx4J-Owc_dGP3kpHa8" />
        
        {/* Aapka title aur baaki ke tags yahan automatic inject honge */}
        <title>Darksyon - Matrix Tools Portal</title>
      </head>

      <body className="bg-zinc-950 text-white min-h-screen antialiased selection:bg-red-500/30 selection:text-red-200">
        
        {/* POOL WRAPPER */}
        <div className="flex flex-col min-h-screen">

          {/* DYNAMIC GLOBAL ALERT RIBBON */}
          {isAlertActive && alertText && (
            <div className="w-full bg-gradient-to-r from-red-600/20 via-red-500/30 to-red-600/20 border-b border-red-500/30 py-2.5 px-4 text-center text-xs font-mono tracking-wide text-red-200 flex items-center justify-center gap-2 sticky top-0 z-50 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <span>{alertText}</span>
            </div>
          )}

          {/* 🔴 NAVIGATION BAR WITH FIXED SOLID DARK STYLE */}
          <nav className={`border-b border-zinc-900/80 bg-zinc-950 backdrop-blur-md sticky z-40 transition-all duration-200 ${isAlertActive && alertText ? 'top-[37px]' : 'top-0'}`}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
              
              <div className="flex items-center gap-1">
                {/* LOGO LINK TO HOME PAGE */}
                <Link href="/" className="cursor-pointer group select-none">
                  <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 group-hover:from-white group-hover:to-zinc-200 transition-all">
                    DARK<span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">SYON</span>
                  </h1>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-400">
                <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                <Link href="/blog" className="hover:text-red-500 transition-colors">Blog</Link>
                <Link href="/about" className="hover:text-red-500 transition-colors">About</Link>
                <Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
                <Link href="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy</Link>
              </div>

            </div>
          </nav>

          {/* Dynamic Content */}
          <div className="flex-grow">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}