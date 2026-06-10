"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [search, setSearch] = useState("");
  const tools = [
    
    {
    name: "Age Calculator",
    link: "/tools/age-calculator",
  },
  {
    name: "GST Calculator",
    link: "/tools/gst-calculator",
  },
  {
    name: "Percentage Calculator",
    link: "/tools/percentage-calculator",
  },
  {
    name: "BMI Calculator",
    link: "/tools/bmi-calculator",
  },
  {
    name: "EMI Calculator",
    link: "/tools/emi-calculator",
  },
  {
    name: "QR Generator",
    link: "/tools/qr-generator",
  },
  {
    name: "Word Counter",
    link: "/tools/word-counter",
  },
  {
    name: "Password Generator",
    link: "/tools/password-generator",
  },
  {
    name: "Discount Calculator",
    link: "/tools/discount-calculator",
  },
  {
    name: "SIP Calculator",
    link: "/tools/sip-calculator",
  },
  {
    name: "Loan Calculator",
    link: "/tools/loan-calculator",
  },
  {
    name: "Character Counter",
    link: "/tools/character-counter",
  },
  {
    name: "Text Case Converter",
    link: "/tools/text-case-converter",
  },
  {
    name: "Image Resizer",
    link: "/tools/image-resizer",
  },
  {
    name: "JPG to PNG",
    link: "/tools/jpg-to-png",
  },
  {
    name: "PNG to JPG",
    link: "/tools/png-to-jpg",
  },
  {
    name: "Image Compressor",
    link: "/tools/image-compressor",
  },
  {
    name: "Currency Converter",
    link: "/tools/currency-converter",
  },
  {
    name: "Unit Converter",
    link: "/tools/unit-converter"
  },
  {
    name: "Image Cropper",
    link: "/tools/image-cropper",
  },
  ];
  const featuredTools = [
  "Age Calculator",
  "SIP Calculator",
  "Image Compressor",
];


  const totalTools = tools.length;
  const calculators = [
  "Age Calculator",
  "GST Calculator",
  "Percentage Calculator",
  "BMI Calculator",
  "EMI Calculator",
  "Discount Calculator",
  "SIP Calculator",
  "Loan Calculator",
  "Currency Converter",
  "Unit Converter",
];

const utilityTools = [
  "Word Counter",
  "Password Generator",
  "QR Generator",
  "Character Counter",
  "Text Case Converter",
  
  
];

const imageTools = [
  "Image Resizer",
  "JPG to PNG",
  "PNG to JPG",
  "Image Compressor",
  "Image Cropper"
];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-red-800">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            

            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              DRAKSYON
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-700">
            <a href="/blog" className="hover:text-red-600">
              Blog
            </a>
            
            <a href="/" className="hover:text-red-600">
              Home
            </a>

            <a href="/about" className="hover:text-red-600">
              About
            </a>

            <a href="/contact" className="hover:text-red-600">
              Contact
            </a>

            <a href="/privacy-policy" className="hover:text-red-600">
              Privacy
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-zinc-900 to-red-950 text-white text-center py-20 px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          <img
            src="/logo.png"
            alt="DRAKSYON Logo"
            className="w-40 md:w-56 mx-auto mb-6"
          />
          DRAKSYON
        </h1>

        <p className="text-xl text-gray-300 mb-6">
          Gaming • AI • Tools • Blogs
        </p>

        <p className="text-red-500 font-semibold mb-8">
          {totalTools}+ Digital Resources Available
        </p>

        <div className="max-w-md mx-auto mb-10 relative">
          <input
            type="text"
            placeholder="🔍 Search games, tools, AI & blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-red-800 bg-zinc-900 text-white rounded-xl px-4 py-3"
          />

          {search && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-red-900 rounded-xl shadow-xl z-50 overflow-hidden">
              {tools
                .filter((tool) =>
                  tool.name.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 8)
                .map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.link}
                    className="block px-4 py-3 cursor-pointer hover:bg-red-900 hover:text-red-300 transition text-gray-200 border-b border-gray-200 last:border-b-0"
                  >
                    {tool.name}
                  </a>
                ))}
            </div>
          )}
        </div>

      </section>


      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-[#111111] text-white border border-red-900 p-6 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white">
              {totalTools}
            </h3>
            <p className="text-white">
              Tools
            </p>
          </div>

          <div className="bg-[#111111] text-white border border-red-900 p-6 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white">
              100%
            </h3>
            <p className="text-white">
              Free
            </p>
          </div>

          <div className="bg-[#111111] text-white border border-red-900 p-6 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white">
              📱
            </h3>
            <p className="text-white">
              Mobile Friendly
            </p>
          </div>

          <div className="bg-[#111111] text-white border border-red-900 p-6 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white">
              🔒
            </h3>
            <p className="text-white">
              No Signup
            </p>
          </div>

        </div>
      </section>


      {/* Featured Tools */}
      <section className="max-w-6x1 mx-auto px-6 pb-10 pt-8 bg-zinc-1000  rounded-3xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">
          🔥 Most Popular Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
           {tools
             .filter((tool) =>
               featuredTools.includes(tool.name)
             )
             .map((tool) => (
               <a
                 key={tool.name}
                 href={tool.link}
                 className="bg-[#111111] text-white border border-red-900 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg hover:border-red-700 transition block"
               >
                 <h3 className="text-lg font-semibold text-white">
                   {tool.name}
                 </h3>
               </a>
             ))}
         </div>
       </section>

      {/* Calculators */}
<section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
  <h2 className="text-3xl font-bold text-center mb-10 text-white">
    Calculators
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    {tools
      .filter(
        (tool) =>
          calculators.includes(tool.name) &&
          tool.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((tool) => (
        <a
          key={tool.name}
          href={tool.link}
          className="bg-[#111111] text-white border border-red-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-red-900/30 hover:border-red-700 transition block"
        >
          <h3 className="text-lg font-semibold text-white">
            {tool.name}
          </h3>
        </a>
      ))}
  </div>
</section>

{/* Utility Tools */}
<section className="max-w-6xl mx-auto px-6 pb-20">
  <h2 className="text-3xl font-bold text-center mb-10 text-white">
    Utility Tools
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    {tools
      .filter(
        (tool) =>
          utilityTools.includes(tool.name) &&
          tool.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((tool) => (
        <a
          key={tool.name}
          href={tool.link}
          className="bg-[#111111] text-white border border-red-900 rounded-3xl p-8 text-center shadow-lg hover:shadow-red-900/30 hover:border-red-700 transition block"
        >
          <h3 className="text-lg font-semibold text-white">
            {tool.name}
          </h3>
        </a>
      ))}
  </div>
</section>

{/* Image Tools */}
<section className="max-w-6xl mx-auto px-6 pb-20">
  <h2 className="text-3xl font-bold text-center mb-10 text-white">
    Image Tools
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    {tools
      .filter(
        (tool) =>
          imageTools.includes(tool.name) &&
          tool.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((tool) => (
        <a
          key={tool.name}
          href={tool.link}
          className="bg-[#111111] text-white border border-red-900 rounded-3xl p-8 text-center shadow-lg hover:shadow-red-900/30 hover:border-red-700 transition block"
        >
          <h3 className="text-lg font-semibold text-white">
            {tool.name}
          </h3>
        </a>
      ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gradient-to-br from-black via-zinc-900 to-red-950 text-white text-center py-20 px-6">
  <div className="max-w-7xl mx-auto px-6 py-10">
    <div className="grid md:grid-cols-3 gap-8">

      <div>
        <h3 className="font-bold text-xl mb-3">
          DRAKSYON
        </h3>

        <p>
          Free online tools for everyone.
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-3">
          Quick Links
        </h3>

        <ul className="space-y-2">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-3">
          Contact
        </h3>

        <p>
          draksyon.support@gmail.com
        </p>
      </div>

    </div>

    <div className="border-t border-red-500 mt-8 pt-4 text-center">
      © 2026 DRAKSYON. All Rights Reserved.
    </div>
  </div>
</footer>
    </main>
  );
}