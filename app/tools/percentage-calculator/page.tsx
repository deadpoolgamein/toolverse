"use client";

import { useState } from "react";

export default function PercentageCalculator() {
  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = Number(percentage);
    const n = Number(number);

    if (isNaN(p) || isNaN(n)) return;

    setResult((p / 100) * n);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Percentage Calculator
        </h1>

        <input
          type="number"
          placeholder="Enter Percentage"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Enter Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">
              Result
            </h2>

            <p className="mt-2 text-lg">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}