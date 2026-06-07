"use client";

import { useState } from "react";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);

  const calculateDiscount = () => {
    const p = Number(price);
    const d = Number(discount);

    if (!p || !d) return;

    const discountAmount = (p * d) / 100;
    const result = p - discountAmount;

    setSaved(discountAmount);
    setFinalPrice(result);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Discount Calculator
        </h1>

        <input
          type="number"
          placeholder="Original Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={calculateDiscount}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate Discount
        </button>

        {finalPrice !== null && (
          <div className="mt-6">
            <p>
              <strong>You Save:</strong> ₹{saved?.toFixed(2)}
            </p>

            <p className="mt-2">
              <strong>Final Price:</strong> ₹{finalPrice.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}