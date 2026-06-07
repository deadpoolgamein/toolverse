"use client";

import { useState } from "react";

export default function JPGToPNG() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const downloadPNG = () => {
    if (!image) return;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx?.drawImage(img, 0, 0);

      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.href = pngUrl;
      link.download = "converted-image.png";

      link.click();
    };

    img.src = image;
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          JPG to PNG Converter
        </h1>

        <div className="mb-4">
          <label
            htmlFor="imageUpload"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg cursor-pointer"
          >
            Upload JPG Image
          </label>

          <input
            id="imageUpload"
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        {fileName && (
          <p className="text-center text-gray-600 mb-4">
            Selected File: {fileName}
          </p>
        )}

        {image && (
          <div className="mb-4">
            <p className="font-semibold mb-2 text-center">
              Image Preview
            </p>

            <img
              src={image}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg border"
            />
          </div>
        )}

        {image && (
          <button
            onClick={downloadPNG}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Convert & Download PNG
          </button>
        )}

      </div>
    </main>
  );
}