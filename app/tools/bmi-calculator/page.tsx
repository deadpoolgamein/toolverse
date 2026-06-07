"use client";

import { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    const w = Number(weight);
    const h = Number(height) / 100;

    if (!w || !h) return;

    const result = w / (h * h);

    setBmi(result);

    if (result < 18.5) {
      setStatus("Underweight");
    } else if (result < 25) {
      setStatus("Normal Weight");
    } else if (result < 30) {
      setStatus("Overweight");
    } else {
      setStatus("Obese");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          BMI Calculator
        </h1>

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={calculateBMI}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">
              BMI: {bmi.toFixed(2)}
            </h2>

            <p className="mt-2">
              Status: {status}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}