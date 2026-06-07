"use client";

import { useState } from "react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    const P = Number(loanAmount);
    const r = Number(interestRate) / 100;
    const t = Number(years);

    if (!P || !r || !t) return;

    const interest = P * r * t;
    const total = P + interest;

    setTotalInterest(interest);
    setTotalPayment(total);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Loan Calculator
        </h1>

        <input
          type="number"
          placeholder="Loan Amount (₹)"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Loan Period (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={calculateLoan}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate Loan
        </button>

        {totalPayment !== null && (
          <div className="mt-6">
            <p>
              <strong>Total Interest:</strong> ₹
              {totalInterest?.toFixed(2)}
            </p>

            <p className="mt-2">
              <strong>Total Payment:</strong> ₹
              {totalPayment.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}