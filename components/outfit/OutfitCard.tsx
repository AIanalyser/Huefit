"use client";

import { Outfit } from "@/types";

interface OutfitCardProps {
  outfit: Outfit;
  isSelected: boolean;
  onSelect: () => void;
}

const categoryLabel: Record<string, string> = {
  formal:  "Formal Wear",
  casual:  "Casual Wear",
  ethnic:  "Ethnic Wear",
  party:   "Party & Occasion",
  suits:   "Tailoring",
};

export default function OutfitCard({ outfit, isSelected, onSelect }: OutfitCardProps) {
  return (
    <button
      onClick={onSelect}
      aria-label={`Select ${outfit.name}`}
      aria-pressed={isSelected}
      className="w-full text-left transition-all duration-200"
      style={{
        background: isSelected ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.42)",
        backdropFilter: "blur(12px)",
        border: isSelected ? "1.5px solid #1A1612" : "1.5px solid rgba(120,100,80,0.14)",
        borderRadius: 18,
        boxShadow: isSelected ? "0 0 0 3px rgba(26,22,18,0.07), 0 4px 20px rgba(0,0,0,0.06)" : "none",
        padding: "20px",
      }}
    >
      {/* Top row: category tag + selected indicator */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className="text-[9px] font-semibold uppercase tracking-widest"
          style={{ color: "#8A837C", letterSpacing: "0.1em" }}
        >
          {categoryLabel[outfit.category] ?? outfit.category}
        </span>

        <div
          className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: isSelected ? "#1A1612" : "transparent",
            borderColor: isSelected ? "#1A1612" : "rgba(120,100,80,0.2)",
          }}
        >
          {isSelected && (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 4L3.2 6.2L7 2" stroke="#FAF8F5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="divider mb-3" />

      {/* Name */}
      <p className="text-sm font-semibold mb-1 leading-snug" style={{ color: "#1A1612" }}>
        {outfit.name}
      </p>

      {/* Dress type */}
      <p className="text-xs capitalize" style={{ color: "#8A837C" }}>
        {outfit.dressType.replace(/_/g, " ")}
      </p>

      {/* Code */}
      <p
        className="text-[10px] font-mono mt-3"
        style={{ color: "#B0A89E", letterSpacing: "0.04em" }}
      >
        {outfit.id}
      </p>
    </button>
  );
}
