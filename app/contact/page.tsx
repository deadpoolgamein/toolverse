"use client";

export default function Contact() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans pt-20">
      <div className="max-w-xl mx-auto px-6 py-16 relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="text-center mb-12 relative z-10">
          <h1 className="text-4xl font-black mb-3">Get In <span className="text-red-500">Touch</span></h1>
          <p className="text-zinc-400 text-sm">Have a suggestion or facing an issue? We're here to help.</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-900 p-8 rounded-2xl shadow-xl backdrop-blur-sm relative z-10">
          <div className="mb-6 pb-6 border-b border-zinc-800/60 text-center">
            <p className="text-xs font-mono uppercase text-zinc-500 mb-1">Direct Support Email</p>
            <a href="mailto:draksyon.support@gmail.com" className="text-lg font-semibold text-red-400 hover:text-red-500 transition-colors">
              draksyon.support@gmail.com
            </a>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Message</label>
              <textarea 
                rows={4} 
                placeholder="How can we improve Darksyon for you?" 
                className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
              ></textarea>
            </div>
            <button className="w-full py-3 px-4 font-bold bg-red-600 hover:bg-red-700 rounded-xl text-white shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all text-sm active:scale-95">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}