"use client";

import { useState } from "react";
import ReactCrop, {
  Crop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

export default function ImageCropper() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();

  const onSelectFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const reader = new FileReader();

    reader.addEventListener("load", () =>
      setImgSrc(reader.result?.toString() || "")
    );

    reader.readAsDataURL(e.target.files[0]);
  };

  const downloadCrop = () => {
    const image = document.getElementById(
      "crop-image"
    ) as HTMLImageElement;

    if (!image || !crop) return;

    const canvas = document.createElement("canvas");
    const scaleX =
      image.naturalWidth / image.width;

    const scaleY =
      image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const link = document.createElement("a");

    link.download = "cropped-image.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-8 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Image Cropper
        </h1>

        <label
          htmlFor="imageUpload"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg cursor-pointer mb-6"
        >
          Upload Image
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="hidden"
        />

        {imgSrc && (
          <div className="flex justify-center mb-6">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
            >
              <img
                id="crop-image"
                src={imgSrc}
                alt="Crop Preview"
                className="max-h-[500px]"
              />
            </ReactCrop>
          </div>
        )}

        {imgSrc && (
          <button
            onClick={downloadCrop}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Crop & Download
          </button>
        )}

      </div>
    </main>
  );
}