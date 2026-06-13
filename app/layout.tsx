import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // AdSense script chalane ke liye zaroori hai
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
 });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DRAKSYON - Gaming, AI, Tools & Blogs",
  description:
    "DRAKSYON is an all-in-one platform for Gaming, AI, Tools, Blogs and digital resources.",
  verification: {
    google: "XS0bHzyuQExu7uDOKfm0hHmcANx4J-Owc_dGP3kpHa8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* --- YAHA PAR AAPKA REAL ADSENSE CODE AUTOMATIC SET HAI --- */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8180011709154612"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        {children}
      </body>
    </html>
  );
}