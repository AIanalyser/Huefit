"use client";

import { SkinToneId } from "@/types";
import { getPalettesForTone } from "@/data/palettes";

interface MixMatchSelectorProps {
  toneId: SkinToneId;
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  onClearColors: () => void;
}

const MAX = 5;

export default function MixMatchSelector({ toneId, selectedColors, onToggleColor, onClearColors }: MixMatchSelectorProps) {
  const palettes = getPalettesForTone(toneId);
  const canSelect = selectedColors.length < MAX;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Tray */}
      <div
        className="p-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.48)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.42)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#6B6460", letterSpacing: "0.09em" }}>
            Selection ({selectedColors.length}/{MAX})
          </p>
          {selectedColors.length > 0 && (
            <button
              onClick={onClearColors}
              className="text-xs transition-colors"
              style={{ color: "#8A837C" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#9B3A3A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8A837C")}
            >
              Clear all
            </button>
          )}
        </div>

        {selectedColors.length === 0 ? (
          <p className="text-xs" style={{ color: "#B0A89E" }}>
            Tap colours below to build your palette (2–5 colours).
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color) => (
              <button
                key={color}
                onClick={() => onToggleColor(color)}
                title={`Remove ${color}`}
                className="group relative"
              >
                <div
                  className="w-10 h-10 rounded-full border-2 transition-transform group-hover:scale-95"
                  style={{
                    background: color,
                    borderColor: "#1A1612",
                    boxShadow: "0 0 0 2px #FAF8F5, 0 0 0 3.5px #1A1612",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.25)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedColors.length > 0 && selectedColors.length < 2 && (
          <p className="text-xs mt-2 font-medium" style={{ color: "#8A6A2A" }}>
            Select at least 2 colours to continue.
          </p>
        )}
      </div>

      {/* Palette pools */}
      {palettes.map((palette) => (
        <div key={palette.id}>
          <p className="text-xs font-semibold mb-3" style={{ color: "#4A4540" }}>
            {palette.name}
          </p>
          <div className="flex flex-wrap gap-3">
            {palette.colors.map((color, i) => {
              const isActive = selectedColors.includes(color);
              const disabled = !isActive && !canSelect;
              return (
                <button
                  key={`${palette.id}-${i}`}
                  onClick={() => !disabled && onToggleColor(color)}
                  disabled={disabled}
                  title={color}
                  className="transition-all"
                  style={{ opacity: disabled ? 0.3 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                >
                  <div
                    className="rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      width: 36,
                      height: 36,
                      background: color,
                      borderColor: isActive ? "#1A1612" : "rgba(255,255,255,0.75)",
                      boxShadow: isActive
                        ? "0 0 0 2px #FAF8F5, 0 0 0 3.5px #1A1612"
                        : "0 1px 4px rgba(0,0,0,0.12)",
                      transform: isActive ? "scale(1.1)" : undefined,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
