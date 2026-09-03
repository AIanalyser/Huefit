"use client";

import { ColorPalette, SkinToneId } from "@/types";
import { getSoftPalette, getVibrantPalette } from "@/data/palettes";
import PaletteCard from "./PaletteCard";
import MixMatchSelector from "./MixMatchSelector";

interface PaletteSelectorProps {
  toneId: SkinToneId;
  selectedPalette: ColorPalette | null;
  selectedColors: string[];
  colorMode: "palette" | "mixmatch";
  onSelectPalette: (palette: ColorPalette) => void;
  onToggleColor: (color: string) => void;
  onClearColors: () => void;
  onSetColorMode: (mode: "palette" | "mixmatch") => void;
}

export default function PaletteSelector({
  toneId, selectedPalette, selectedColors, colorMode,
  onSelectPalette, onToggleColor, onClearColors, onSetColorMode,
}: PaletteSelectorProps) {
  const softPalette = getSoftPalette(toneId);
  const vibrantPalette = getVibrantPalette(toneId);

  return (
    <div className="animate-fade-up">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
        Step 03 — Palette
      </p>
      <h2
        className="font-serif italic font-light mb-1"
        style={{ fontSize: "clamp(28px,5vw,42px)", color: "#1A1612" }}
      >
        Your Colours
      </h2>
      <p className="text-sm mb-7" style={{ color: "#6B6460" }}>
        Choose a curated palette or mix &amp; match your own.
      </p>

      {/* Mode toggle */}
      <div
        className="inline-flex rounded-full p-1 mb-7"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.42)",
        }}
      >
        {(["palette", "mixmatch"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => onSetColorMode(mode)}
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all"
            style={{
              background: colorMode === mode ? "#1A1612" : "transparent",
              color: colorMode === mode ? "#FAF8F5" : "#6B6460",
              letterSpacing: "0.04em",
            }}
          >
            {mode === "palette" ? "Full Palette" : "Mix & Match"}
          </button>
        ))}
      </div>

      {colorMode === "palette" ? (
        <div className="space-y-4">
          {softPalette && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.09em" }}>
                Soft &amp; Natural
              </p>
              <PaletteCard
                palette={softPalette}
                isSelected={selectedPalette?.id === softPalette.id}
                onSelect={() => onSelectPalette(softPalette)}
              />
            </div>
          )}
          {vibrantPalette && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.09em" }}>
                Vibrant &amp; Rich
              </p>
              <PaletteCard
                palette={vibrantPalette}
                isSelected={selectedPalette?.id === vibrantPalette.id}
                onSelect={() => onSelectPalette(vibrantPalette)}
              />
            </div>
          )}
        </div>
      ) : (
        <MixMatchSelector
          toneId={toneId}
          selectedColors={selectedColors}
          onToggleColor={onToggleColor}
          onClearColors={onClearColors}
        />
      )}
    </div>
  );
}
