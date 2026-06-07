"use client";

import { useState } from "react";

export default function EMICalculator() {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEMI = () => {
    const P = Number(loan);
    const annualRate = Number(rate);
    const Y = Number(years);

    if (!P || !annualRate || !Y) return;

    const r = annualRate / 12 / 100;
    const n = Y * 12;

    const emiValue =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    setEmi(emiValue);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          EMI Calculator
        </h1>

        <input
          type="number"
          placeholder="Loan Amount"
          value={loan}
          onChange={(e) => setLoan(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={calculateEMI}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate EMI
        </button>

        {emi !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">
              Monthly EMI
            </h2>

            <p className="mt-2 text-2xl">
              ₹{emi.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}