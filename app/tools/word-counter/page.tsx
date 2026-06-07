"use client";

import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const characters = text.length;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Word Counter
        </h1>

        <textarea
          rows={8}
          placeholder="Type or paste your text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-4 rounded-lg mb-6"
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h2 className="font-bold text-xl">{words}</h2>
            <p>Words</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h2 className="font-bold text-xl">{characters}</h2>
            <p>Characters</p>
          </div>
        </div>
      </div>
    </main>
  );
}