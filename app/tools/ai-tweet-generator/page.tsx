"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, Copy, Check, MessageSquare, Share2 } from "lucide-react";

export default function AITweetGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional & tech");
  const [contentType, setContentType] = useState("single viral post");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateContent = async () => {
    if (!topic) return;
    setLoading(true);
    setResponse("");

    try {
      // Free Gemini API Key Placeholder from Google AI Studio
      const res = await fetch("/api/tweet-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          tone,
          contentType,
        }),
      });

      const data = await res.json();
      let aiText = "System Timeout. Please check your API limits or configuration.";

      if (data.success && typeof data.output === "string") {
        aiText = data.output;
      } else if (data?.candidates && Array.isArray(data.candidates) && data.candidates[0]) {
        const candidate = data.candidates[0];
        const content = candidate.content;
        if (content && Array.isArray(content.parts) && content.parts[0]) {
          const part = content.parts[0];
          // part may be a string or an object with a text property
          if (typeof part === "string") aiText = part;
          else if (part && typeof part.text === "string") aiText = part.text;
        }
      }
      setResponse(aiText);
    } catch (error) {
      console.error(error);
      setResponse("Error matrix connection failed. Please ensure your Gemini endpoint key is configured properly.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetTool = () => {
    setTopic("");
    setResponse("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans antialiased pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- AD SLOT 1: TOP BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mb-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Top Banner ]
      </div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Tool Frame Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 text-red-500 shadow-inner">
              <Share2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              AI Tweet <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Generator</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Generate viral Twitter posts and threads using free automation matrix models</p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                What is your post topic or link context?
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 5 simple habits that changed my software engineering career..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-zinc-800 bg-zinc-950 text-white placeholder-zinc-700 rounded-xl p-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none shadow-inner"
              />
            </div>

            {/* Content Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                  Select Tone Matrix
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-red-500 transition-all cursor-pointer"
                >
                  <option value="witty & funny">Witty / Funny</option>
                  <option value="professional & tech">Professional / Tech</option>
                  <option value="motivational & deep">Motivational / Inspiring</option>
                  <option value="casual & informative">Casual / Informative</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 mb-2">
                  Format Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full border border-zinc-800 bg-zinc-950 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-red-500 transition-all cursor-pointer"
                >
                  <option value="single viral post">Single Standalone Tweet</option>
                  <option value="comprehensive 4-part thread">X/Twitter Multi-Thread</option>
                </select>
              </div>
            </div>

            {/* Action Operations Control Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={generateContent}
                disabled={loading || !topic}
                className="flex-1 py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 rounded-xl text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Output</span>
                  </>
                )}
              </button>
              
              {(topic || response) && !loading && (
                <button
                  onClick={resetTool}
                  className="p-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Clear Panel"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* --- PREMIUM AI RESPONSE PANEL DISPLAY --- */}
          {response && (
            <div className="mt-8 pt-6 border-t border-zinc-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  <MessageSquare className="w-3.5 h-3.5 text-red-500" />
                  <span>Generated Feed Matrix</span>
                </div>
                
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-mono font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-all active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Content"}</span>
                </button>
              </div>
              
              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 shadow-inner">
                <p className="text-zinc-300 font-sans text-sm sm:text-base whitespace-pre-wrap leading-relaxed select-all">
                  {response}
                </p>
              </div>

              {copied && (
                <div className="text-center text-[10px] font-mono text-emerald-500">
                  ✓ Formatted content matrix successfully copied!
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* --- AD SLOT 2: BOTTOM BANNER --- */}
      <div className="w-full max-w-4xl h-24 bg-zinc-900/30 border border-zinc-900 rounded-xl mt-8 flex items-center justify-center text-xs font-mono text-zinc-600 tracking-widest uppercase">
        [ Ad Space - Bottom Banner ]
      </div>

    </main>
  );
}