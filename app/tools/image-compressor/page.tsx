"use client";

import { useState } from "react";

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(70);
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

  const compressImage = () => {
    if (!image) return;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      ctx?.drawImage(img, 0, 0);

      const compressedImage = canvas.toDataURL(
        "image/jpeg",
        quality / 100
      );

      const link = document.createElement("a");

      link.href = compressedImage;
      link.download = "compressed-image.jpg";

      link.click();
    };

    img.src = image;
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Image Compressor
        </h1>

        <div className="mb-4">
          <label
            htmlFor="imageUpload"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg cursor-pointer"
          >
            Upload Image
          </label>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
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
            <img
              src={image}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg border"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="font-semibold">
            Compression Quality: {quality}%
          </label>

          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) =>
              setQuality(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        {image && (
          <button
            onClick={compressImage}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Compress & Download
          </button>
        )}

      </div>
    </main>
  );
}