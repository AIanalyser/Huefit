"use client";

import { SkinTone, ColorAnalysisResult } from "@/types";
import { skinTones } from "@/data/skinTones";
import SkinToneCard from "./SkinToneCard";

interface SkinToneSelectorProps {
  analysisResult: ColorAnalysisResult | null;
  selectedTone: SkinTone | null;
  onSelectTone: (tone: SkinTone) => void;
}

export default function SkinToneSelector({ analysisResult, selectedTone, onSelectTone }: SkinToneSelectorProps) {
  const isLowConfidence = analysisResult && analysisResult.confidence < 0.7;

  return (
    <div className="animate-fade-up">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
        Step 01 — Skin Tone
      </p>
      <h2
        className="font-serif italic font-light mb-1"
        style={{ fontSize: "clamp(28px,5vw,42px)", color: "#1A1612" }}
      >
        Your Skin Tone
      </h2>
      <p className="text-sm mb-7" style={{ color: "#6B6460" }}>
        {analysisResult
          ? "AI detected your tone. Confirm or adjust."
          : "Select the skin tone that matches you most closely."}
      </p>

      {/* AI result panel */}
      {analysisResult && (
        <div
          className="mb-6 p-5 rounded-2xl animate-scale-in"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-start gap-4">
            {/* Colour preview */}
            <div
              className="w-12 h-12 rounded-xl flex-shrink-0"
              style={{
                background: analysisResult.selectedHex,
                boxShadow: "0 2px 10px rgba(0,0,0,0.14)",
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-semibold" style={{ color: "#1A1612" }}>
                  {analysisResult.label}
                </span>
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: "#1A1612", color: "#FAF8F5", letterSpacing: "0.08em" }}
                >
                  AI · {Math.round(analysisResult.confidence * 100)}%
                </span>
              </div>
              <p className="text-xs" style={{ color: "#8A837C" }}>
                {analysisResult.undertone} undertone · {analysisResult.lighting} lighting
              </p>
              {isLowConfidence && (
                <p className="text-xs mt-1.5 font-medium" style={{ color: "#8A6A2A" }}>
                  Low confidence — please confirm your selection below.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tone list */}
      <div className="space-y-2">
        {skinTones.map((tone) => (
          <SkinToneCard
            key={tone.id}
            tone={tone}
            isSelected={selectedTone?.id === tone.id}
            isRecommended={analysisResult?.toneId === tone.id}
            onSelect={() => onSelectTone(tone)}
          />
        ))}
      </div>
    </div>
  );
}
