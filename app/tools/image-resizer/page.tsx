"use client";

import { useRef, useState } from "react";

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [fileName, setFileName] = useState("");
  const [resized, setResized] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (
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

  const resizeImage = () => {
    if (!image || !canvasRef.current) return;

    const img = new Image();

    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");

      canvas.width = Number(width);
      canvas.height = Number(height);

      ctx?.drawImage(
        img,
        0,
        0,
        Number(width),
        Number(height)
      );
      setResized(true);
    };

    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");

    link.download = "resized-image.png";
    link.href = canvasRef.current.toDataURL();

    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Image Resizer
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
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>


        {fileName && (
          <p className="text-center text-gray-600 mb-4">
            Selected File: {fileName}
          </p>
        )}


        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
            className="border p-3 rounded-lg"
          />
        </div>

        <button
          onClick={resizeImage}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mb-4"
        >
          Resize Image
        </button>

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

        <canvas
          ref={canvasRef}
          className="border w-full mb-4"
        />

        {resized && (
          <button
            onClick={downloadImage}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Download Image
          </button>
        )}
      </div>
    </main>
  );
}