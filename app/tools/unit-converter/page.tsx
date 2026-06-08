"use client";

import { useState } from "react";

export default function UnitConverter() {
  const [meters, setMeters] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const value = Number(meters);

    if (!value) return;

    setResult(value / 1000);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Unit Converter
        </h1>

        <input
          type="number"
          placeholder="Enter Meters"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <button
          onClick={convert}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Convert to Kilometers
        </button>

        {result !== null && (
          <div className="mt-6 text-center">
            <p className="text-xl">
              {result} KM
            </p>
          </div>
        )}

      </div>
    </main>
  );
}