"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, RefreshCw } from "lucide-react";

interface PhotoUploaderProps {
  uploadedImage: string | null;
  onImageUpload: (imageDataUrl: string, file: File) => void;
  onRemoveImage: () => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;

export default function PhotoUploader({ uploadedImage, onImageUpload, onRemoveImage }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndUpload = useCallback((file: File) => {
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File size must be less than 10 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) onImageUpload(result, file);
    };
    reader.onerror = () => setError("Failed to read file. Please try again.");
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndUpload(file);
  }, [validateAndUpload]);

  if (uploadedImage) {
    return (
      <div className="animate-fade-up">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
          Step 01 — Tone
        </p>
        <h2 className="font-serif italic font-light mb-6" style={{ fontSize: "clamp(28px,5vw,42px)", color: "#1A1612" }}>
          Your Photo
        </h2>

        <div className="relative max-w-xs mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.1)",
            }}
          >
            <img src={uploadedImage} alt="Uploaded photo" className="w-full h-auto max-h-80 object-contain" />
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => inputRef.current?.click()}
              className="btn-ghost"
              style={{ fontSize: "12px", padding: "8px 18px" }}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Replace
            </button>
            <button
              onClick={() => { onRemoveImage(); setError(null); }}
              className="btn-ghost"
              style={{ fontSize: "12px", padding: "8px 18px", color: "#9B3A3A", borderColor: "rgba(155,58,58,0.2)" }}
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>

        <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => {
          const f = e.target.files?.[0]; if (f) validateAndUpload(f); e.target.value = "";
        }} className="hidden" aria-label="Replace photo" />
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
        Step 01 — Tone
      </p>
      <h2 className="font-serif italic font-light mb-1" style={{ fontSize: "clamp(28px,5vw,42px)", color: "#1A1612" }}>
        Upload Your Photo
      </h2>
      <p className="text-sm mb-7" style={{ color: "#6B6460" }}>
        Use a clear front-facing photo in natural light for the best AI result.
      </p>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload photo"
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
        className="relative rounded-3xl border-2 border-dashed p-16 text-center cursor-pointer transition-all duration-200"
        style={{
          borderColor: isDragging ? "#7C6A5A" : "rgba(120,100,80,0.2)",
          background: isDragging
            ? "rgba(255,255,255,0.65)"
            : "rgba(255,255,255,0.38)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Upload icon — circle */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
            style={{
              background: isDragging ? "#1A1612" : "rgba(255,255,255,0.7)",
              border: "1px solid rgba(120,100,80,0.18)",
            }}
          >
            <Upload className="h-5 w-5" style={{ color: isDragging ? "#FAF8F5" : "#7C6A5A" }} />
          </div>

          <div>
            <p className="text-sm font-semibold" style={{ color: "#1A1612" }}>
              {isDragging ? "Drop here" : "Drag & drop your photo"}
            </p>
            <p className="text-xs mt-1" style={{ color: "#8A837C" }}>
              or{" "}
              <span className="underline underline-offset-2" style={{ color: "#7C6A5A" }}>
                browse files
              </span>
            </p>
          </div>

          <p className="text-[10px] uppercase tracking-widest" style={{ color: "#B0A89E", letterSpacing: "0.07em" }}>
            JPG · PNG · WEBP · Max 10 MB
          </p>
        </div>
      </div>

      {error && (
        <div
          className="mt-4 px-4 py-3 rounded-xl text-xs font-medium animate-fade-in"
          style={{
            background: "rgba(155,58,58,0.07)",
            border: "1px solid rgba(155,58,58,0.18)",
            color: "#9B3A3A",
          }}
        >
          {error}
        </div>
      )}

      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => {
        const f = e.target.files?.[0]; if (f) validateAndUpload(f); e.target.value = "";
      }} className="hidden" aria-label="Upload photo" />
    </div>
  );
}
