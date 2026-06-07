"use client";

import { useState } from "react";

export default function TextCaseConverter() {
  const [text, setText] = useState("");

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Text Case Converter
        </h1>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text..."
          className="w-full border p-4 rounded-lg mb-6"
        />

        <div className="grid md:grid-cols-2 gap-4">

          <button
            onClick={() => setText(text.toUpperCase())}
            className="bg-blue-600 text-white py-3 rounded-lg"
          >
            UPPERCASE
          </button>

          <button
            onClick={() => setText(text.toLowerCase())}
            className="bg-blue-600 text-white py-3 rounded-lg"
          >
            lowercase
          </button>

          <button
            onClick={() =>
              setText(
                text.replace(
                  /\w\S*/g,
                  (txt) =>
                    txt.charAt(0).toUpperCase() +
                    txt.substr(1).toLowerCase()
                )
              )
            }
            className="bg-blue-600 text-white py-3 rounded-lg"
          >
            Title Case
          </button>

          <button
            onClick={() => setText("")}
            className="bg-red-500 text-white py-3 rounded-lg"
          >
            Clear
          </button>

        </div>
      </div>
    </main>
  );
}