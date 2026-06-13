"use client";

import { useState } from "react";

export default function AISEOMetaWriter() {
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSEO = async () => {
    if (!topic) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/seo-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.output);
      } else {
        setResponse("Failed to generate SEO content.");
      }
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">

        <h1 className="text-4xl font-bold mb-2">
          AI <span className="text-red-500">SEO Meta Writer</span>
        </h1>

        <p className="text-zinc-400 mb-6">
          Generate SEO-friendly meta titles and descriptions instantly.
        </p>

        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter keyword, website topic, blog title..."
          className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-xl p-4 outline-none focus:border-red-500"
        />

        <button
          onClick={generateSEO}
          disabled={loading}
          className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Generating..." : "Generate SEO Content"}
        </button>

        {response && (
          <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-xl p-4 whitespace-pre-wrap">
            {response}
          </div>
        )}
      </div>
    </main>
  );
}