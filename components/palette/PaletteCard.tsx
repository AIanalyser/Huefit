"use client";

import { ColorPalette } from "@/types";

interface PaletteCardProps {
  palette: ColorPalette;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PaletteCard({ palette, isSelected, onSelect }: PaletteCardProps) {
  return (
    <button
      onClick={onSelect}
      aria-label={`Select ${palette.name} palette`}
      aria-pressed={isSelected}
      className="w-full text-left transition-all duration-200"
      style={{
        background: isSelected ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.42)",
        backdropFilter: "blur(12px)",
        border: isSelected ? "1.5px solid #1A1612" : "1.5px solid rgba(120,100,80,0.14)",
        borderRadius: 18,
        boxShadow: isSelected ? "0 0 0 3px rgba(26,22,18,0.07)" : "none",
        padding: "20px",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1A1612" }}>{palette.name}</p>
          <p className="text-xs mt-0.5" style={{ color: "#8A837C" }}>{palette.description}</p>
        </div>
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

      {/* Colour swatches — circles */}
      <div className="flex flex-wrap gap-2">
        {palette.colors.slice(0, 10).map((color, i) => (
          <div
            key={`${color}-${i}`}
            className="rounded-full border-2"
            style={{
              width: 28,
              height: 28,
              background: color,
              borderColor: "rgba(255,255,255,0.7)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
            title={color}
          />
        ))}
      </div>

      {/* Hex row */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {palette.colors.slice(0, 5).map((color, i) => (
          <span
            key={`hex-${i}`}
            className="text-[9px] font-mono"
            style={{ color: "#B0A89E" }}
          >
            {color}
          </span>
        ))}
      </div>
    </button>
  );
}
