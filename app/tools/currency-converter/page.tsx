"use client";

import { useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const convertCurrency = () => {
    const usd = Number(amount);

    if (!usd) return;

    const rate = 85; // 1 USD = 85 INR

    setResult(usd * rate);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Currency Converter
        </h1>

        <input
          type="number"
          placeholder="Enter USD Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <button
          onClick={convertCurrency}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Convert to INR
        </button>

        {result && (
          <div className="mt-6 text-center">
            <p className="text-xl">
              ₹{result.toFixed(2)}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}