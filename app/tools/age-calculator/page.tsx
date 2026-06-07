"use client";

import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");

  const calculateAge = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += 30;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge(`${years} Years, ${months} Months, ${days} Days`);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Age Calculator
        </h1>

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <button
          onClick={calculateAge}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate Age
        </button>

        {age && (
          <div className="mt-6 text-center text-black">
            <h2 className="text-xl font-semibold">Your Age</h2>
            <p className="mt-2">{age}</p>
          </div>
        )}
      </div>
    </main>
  );
}