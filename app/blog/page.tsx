"use client";

export default function Blog() {
  // Aapke actual folder structure ke mutabik blogs ki list
  const blogs = [
    {
      title: "How to Calculate Age Accurately Online",
      desc: "Learn the step-by-step method to calculate precise age, leaps years, and months using our free digital tools.",
      category: "Guides",
      date: "June 2026",
      link: "/blog/how-to-calculate-age"
    },
    {
      title: "How to Compress Images Online Without Losing Quality",
      desc: "A complete guide for gamers and developers to reduce image sizes layout assets quickly for web upload.",
      category: "Image Tools",
      date: "June 2026",
      link: "/blog/how-to-compress-images-online"
    },
    {
      title: "SIP vs Lumpsum Investment: Which is Better for You?",
      desc: "An in-depth analysis of systematic investment plans versus one-time lumpsum investments with calculator metrics.",
      category: "Finance",
      date: "May 2026",
      link: "/blog/sip-vs-lumpsum-investment"
    },
    {
      title: "What is GST Calculator and How to Use It?",
      desc: "Understand net and gross tax calculations easily with clear structural breakdowns for businesses.",
      category: "Calculators",
      date: "May 2026",
      link: "/blog/what-is-gst-calculator"
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans pt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <div className="text-center md:text-left mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Darksyon <span className="text-red-500">Insights</span>
          </h1>
          <p className="text-zinc-500 text-sm">
            SEO-Optimized Tech Guides, Gaming Tutorials, and Financial Walkthroughs.
          </p>
        </div>

        {/* --- FUTURE ADSENSE SLOT (TOP BANNER) --- */}
        <div className="w-full h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-12 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
          [ Ad Space - Top Banner ]
        </div>

        {/* Blog Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post, index) => (
            <a 
              key={index} 
              href={post.link}
              className="group bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:bg-zinc-900/70 hover:border-red-500/20 transition-all duration-200 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-red-500/10 text-red-500 border border-red-500/20">
                    {post.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-600">{post.date}</span>
                </div>
                <h2 className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {post.desc}
                </p>
              </div>
              <span className="text-xs font-bold text-red-500/80 group-hover:text-red-500 transition-colors flex items-center gap-1">
                Read Article <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          ))}
        </div>

        {/* --- FUTURE ADSENSE SLOT (BOTTOM BANNER) --- */}
        <div className="w-full h-28 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-12 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
          [ Ad Space - Bottom Banner ]
        </div>

      </div>
    </main>
  );
}