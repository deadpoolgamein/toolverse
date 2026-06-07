"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!text) return;

    const url = await QRCode.toDataURL(text);
    setQr(url);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          QR Code Generator
        </h1>

        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={generateQR}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Generate QR
        </button>

        {qr && (
          <div className="mt-6 flex justify-center">
            <img src={qr} alt="QR Code" width={200} />
          </div>
        )}
      </div>
    </main>
  );
}