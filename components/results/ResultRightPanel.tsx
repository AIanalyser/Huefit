"use client";

import { useEffect, useState } from "react";
import { GeneratedOutfitResult, GenerationStatus } from "@/types";
import { Download, Share2 } from "lucide-react";
import { downloadImage, shareResult } from "@/lib/utils/helpers";

interface ResultRightPanelProps {
  generatedResult: GeneratedOutfitResult | null;
  generationStatus: GenerationStatus;
  outfitId: string;
  paletteId: string;
  onTryAnother: () => void;
  onStartOver: () => void;
}

export default function ResultRightPanel({
  generatedResult, generationStatus, outfitId, paletteId, onTryAnother, onStartOver,
}: ResultRightPanelProps) {
  const hasImage = !!(generatedResult?.imageBase64 || generatedResult?.imageUrl);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleDownload = () => {
    if (generatedResult?.imageBase64) {
      downloadImage(generatedResult.imageBase64, `huefit-${outfitId}-${paletteId}.png`);
    }
  };

  const handleShare = () => {
    shareResult("My HueFit Look", "Check out my AI-personalised outfit!", window.location.href);
  };

  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Status */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.12em" }}>
          Status
        </p>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background:
                generationStatus === "completed"
                  ? "#3A6B4A"
                  : generationStatus === "failed"
                  ? "#9B3A3A"
                  : "#7C6A5A",
              animation: generationStatus === "generating" || generationStatus === "analyzing"
                ? "softPulse 1.5s infinite"
                : "none",
            }}
          />
          <span className="text-xs font-semibold capitalize" style={{ color: "#1A1612" }}>
            {generationStatus === "idle" ? "Ready" : generationStatus}
          </span>
        </div>
      </div>

      <div className="divider" />

      {/* Output details */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.12em" }}>
          Output
        </p>
        <div className="space-y-2 text-xs" style={{ color: "#4A4540" }}>
          <div className="flex justify-between">
            <span style={{ color: "#8A837C" }}>Format</span>
            <span className="font-medium">{generatedResult?.format ?? "PNG"}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#8A837C" }}>Resolution</span>
            <span className="font-medium">{generatedResult?.resolution ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#8A837C" }}>Generated</span>
            <span className="font-medium">{date}</span>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Primary actions */}
      <div className="space-y-2">
        {hasImage && (
          <button onClick={handleDownload} className="btn-primary w-full" style={{ fontSize: "12px", padding: "11px" }}>
            <Download className="h-3.5 w-3.5" />
            Download Look
          </button>
        )}
        {canShare && (
          <button onClick={handleShare} className="btn-ghost w-full" style={{ fontSize: "12px", padding: "10px" }}>
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
        )}
      </div>

      <div className="divider" />

      {/* Secondary actions */}
      <div className="space-y-2">
        <button onClick={onTryAnother} className="btn-ghost w-full" style={{ fontSize: "12px", padding: "10px" }}>
          Try Another Outfit
        </button>
        <button
          onClick={onStartOver}
          className="w-full text-xs py-2.5 rounded-full transition-colors text-center"
          style={{ color: "#8A837C" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#1A1612")}
          onMouseLeave={e => (e.currentTarget.style.color = "#8A837C")}
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
