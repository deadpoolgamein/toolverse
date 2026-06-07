"use client";

import { useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let result = "";

    for (let i = 0; i < 12; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(result);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Password Generator
        </h1>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-6">
            <input
              value={password}
              readOnly
              className="w-full border p-3 rounded-lg text-center"
            />
          </div>
        )}
      </div>
    </main>
  );
}