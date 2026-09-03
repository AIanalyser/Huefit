"use client";

import { useEffect, useRef, useState } from "react";
import { GeneratedOutfitResult, GenerationStatus, HueFitSelection } from "@/types";
import { Download, RefreshCw } from "lucide-react";
import { downloadImage } from "@/lib/utils/helpers";

interface ResultCenterPanelProps {
  generatedResult: GeneratedOutfitResult | null;
  generationStatus: GenerationStatus;
  selection: HueFitSelection | null;
  onRegenerate: () => void;
}

const messages = [
  "Creating your look…",
  "Applying your colour palette…",
  "Rendering the outfit…",
  "Finalising your look…",
];

function GeneratingState({ outfitName }: { outfitName?: string }) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[480px] gap-8 p-8">
      {/* Spinner rings */}
      <div className="relative w-20 h-20">
        <span
          className="absolute inset-0 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(120,100,80,0.12)", borderTopColor: "#7C6A5A" }}
        />
        <span
          className="absolute inset-2 rounded-full border animate-spin"
          style={{
            borderColor: "rgba(120,100,80,0.08)",
            borderTopColor: "rgba(120,100,80,0.3)",
            animationDirection: "reverse",
            animationDuration: "1.4s",
          }}
        />
        {/* centre dot */}
        <span
          className="absolute inset-[38%] rounded-full animate-soft-pulse"
          style={{ background: "#7C6A5A" }}
        />
      </div>

      {/* Message */}
      <div className="text-center">
        <p className="text-sm font-semibold mb-1 transition-all" style={{ color: "#1A1612" }}>
          {messages[msgIdx]}
        </p>
        {outfitName && (
          <p className="text-xs" style={{ color: "#8A837C" }}>
            {outfitName}
          </p>
        )}
      </div>

      {/* Shimmer block — preview placeholder */}
      <div className="w-48 rounded-2xl overflow-hidden" style={{ height: 220 }}>
        <div className="w-full h-full animate-shimmer" />
      </div>

      <p className="text-[10px] uppercase tracking-widest text-center max-w-xs" style={{ color: "#B0A89E", letterSpacing: "0.1em" }}>
        Powered by Google Gemini · This may take up to 30 seconds
      </p>
    </div>
  );
}

function FailedState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[480px] gap-5 p-8 text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "rgba(155,58,58,0.08)", border: "1px solid rgba(155,58,58,0.15)" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 7V11M10 13.5V14M3 17H17L10 4L3 17Z" stroke="#9B3A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold mb-1" style={{ color: "#1A1612" }}>
          Something went wrong
        </p>
        <p className="text-xs" style={{ color: "#8A837C" }}>
          The image could not be generated. Please try again.
        </p>
      </div>
      <button onClick={onRetry} className="btn-ghost" style={{ fontSize: "13px" }}>
        <RefreshCw className="h-3.5 w-3.5" />
        Try Again
      </button>
    </div>
  );
}

function DemoFallback({ selection }: { selection: HueFitSelection | null }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[480px] p-8 gap-6">
      {/* Demo placeholder — neutral frame */}
      <div
        className="w-52 rounded-2xl flex flex-col items-center justify-center gap-4"
        style={{
          height: 320,
          background: "radial-gradient(ellipse at 50% 30%, #F0EBE3 0%, #E3DDD5 100%)",
          border: "1px solid rgba(120,100,80,0.12)",
        }}
      >
        {/* Minimal fashion silhouette */}
        <svg width="80" height="160" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <ellipse cx="40" cy="18" rx="12" ry="14" fill="#C8B8A8" opacity="0.7" />
          {/* Neck */}
          <rect x="36" y="30" width="8" height="8" rx="2" fill="#C8B8A8" opacity="0.6" />
          {/* Shoulders / torso */}
          <path d="M16 42 Q20 36 40 36 Q60 36 64 42 L66 88 H14 Z" fill="#B0A090" opacity="0.55" />
          {/* Arms */}
          <path d="M16 44 L8 80" stroke="#C8B8A8" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
          <path d="M64 44 L72 80" stroke="#C8B8A8" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
          {/* Lower body */}
          <path d="M14 88 L12 152 H34 L40 120 L46 152 H68 L66 88 Z" fill="#A09080" opacity="0.45" />
        </svg>

        <div className="text-center px-4">
          <p className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
            Demo Mode
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold mb-1" style={{ color: "#1A1612" }}>
          {selection?.outfit_name ?? "Your Look"}
        </p>
        <p className="text-xs mb-4" style={{ color: "#8A837C" }}>
          Connect Gemini to generate your realistic fashion lookbook.
        </p>
        <div className="flex gap-1.5 justify-center">
          {selection?.color_palette.colors.slice(0, 6).map((c, i) => (
            <div key={i} className="rounded-full border-2 border-white shadow-sm" style={{ width: 20, height: 20, background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResultCenterPanel({ generatedResult, generationStatus, selection, onRegenerate }: ResultCenterPanelProps) {
  const hasImage = !!(generatedResult?.imageBase64 || generatedResult?.imageUrl);
  const imgSrc = generatedResult?.imageBase64 ?? generatedResult?.imageUrl ?? null;

  const handleDownload = () => {
    if (generatedResult?.imageBase64) {
      downloadImage(
        generatedResult.imageBase64,
        `huefit-${selection?.outfit_id ?? "look"}.png`
      );
    }
  };

  return (
    <div className="flex flex-col">
      {/* Image frame */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 24,
          boxShadow: "0 24px 80px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8) inset",
          border: "1px solid rgba(255,255,255,0.55)",
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, #F5EFE7 0%, #EDE4D8 100%)",
          minHeight: 480,
        }}
      >
        {generationStatus === "generating" || generationStatus === "analyzing" || generationStatus === "pending" ? (
          <GeneratingState outfitName={selection?.outfit_name} />
        ) : generationStatus === "failed" ? (
          <FailedState onRetry={onRegenerate} />
        ) : hasImage && imgSrc ? (
          <div className="relative group">
            <img
              src={imgSrc}
              alt={`${selection?.outfit_name ?? "Outfit"} — AI Generated`}
              className="w-full h-auto"
              style={{ display: "block", minHeight: 480, objectFit: "cover" }}
            />
            {/* Download overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
              <button
                onClick={handleDownload}
                className="btn-glass"
                style={{ fontSize: "12px", padding: "8px 18px" }}
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          </div>
        ) : (
          <DemoFallback selection={selection} />
        )}
      </div>

      {/* Regenerate beneath image */}
      {(generationStatus === "completed" || generationStatus === "failed") && (
        <div className="flex justify-center mt-4">
          <button onClick={onRegenerate} className="btn-ghost" style={{ fontSize: "12px", padding: "8px 20px" }}>
            <RefreshCw className="h-3.5 w-3.5" />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
