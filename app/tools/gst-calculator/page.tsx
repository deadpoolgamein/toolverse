"use client";

import { useState } from "react";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("18");
  const [result, setResult] = useState<{
    gstAmount: number;
    totalAmount: number;
  } | null>(null);

  const calculateGST = () => {
    const amt = Number(amount);
    const gstRate = Number(gst);

    if (!amt || !gstRate) return;

    const gstAmount = (amt * gstRate) / 100;
    const totalAmount = amt + gstAmount;

    setResult({
      gstAmount,
      totalAmount,
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          GST Calculator
        </h1>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <select
          value={gst}
          onChange={(e) => setGst(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        >
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>
        </select>

        <button
          onClick={calculateGST}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate GST
        </button>

        {result && (
          <div className="mt-6">
            <p>
              <strong>GST Amount:</strong> ₹{result.gstAmount.toFixed(2)}
            </p>

            <p className="mt-2">
              <strong>Total Amount:</strong> ₹{result.totalAmount.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}