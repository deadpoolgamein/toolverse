"use client";

import { useState } from "react";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const [maturityAmount, setMaturityAmount] = useState<number | null>(null);

  const calculateSIP = () => {
    const P = Number(monthlyInvestment);
    const annualRate = Number(rate);
    const Y = Number(years);

    if (!P || !annualRate || !Y) return;

    const r = annualRate / 12 / 100;
    const n = Y * 12;

    const futureValue =
      P *
      (((Math.pow(1 + r, n) - 1) / r) *
        (1 + r));

    setMaturityAmount(futureValue);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          SIP Calculator
        </h1>

        <input
          type="number"
          placeholder="Monthly Investment (₹)"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Expected Return (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Investment Period (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={calculateSIP}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate SIP
        </button>

        {maturityAmount !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">
              Maturity Amount
            </h2>

            <p className="mt-2 text-2xl">
              ₹{maturityAmount.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}