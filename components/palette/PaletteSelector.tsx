"use client";

import { useState } from "react";
import { ColorPalette, SkinToneId } from "@/types";
import {
  getSoftPalette,
  getVibrantPalette,
  getCustomColorsForTone,
} from "@/data/palettes";
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
  toneId,
  selectedPalette,
  selectedColors,
  colorMode,
  onSelectPalette,
  onToggleColor,
  onClearColors,
  onSetColorMode,
}: PaletteSelectorProps) {
  const softPalette = getSoftPalette(toneId);
  const vibrantPalette = getVibrantPalette(toneId);
  const customColors = getCustomColorsForTone(toneId);

  const [customiseOpen, setCustomiseOpen] = useState(false);

  const handleCustomiseOpen = () => {
    setCustomiseOpen(true);
    onClearColors();
    onSetColorMode("mixmatch");
  };

  const handleCustomiseBack = () => {
    setCustomiseOpen(false);
    onClearColors();
    onSetColorMode("palette");
  };

  const handleCustomColourToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      onClearColors();

      const remaining = selectedColors.filter((c) => c !== color);

      remaining.forEach((c) => {
        onToggleColor(c);
      });

      return;
    }

    if (selectedColors.length >= 2) {
      return;
    }

    onToggleColor(color);
  };

  return (
    <div className="animate-fade-up">
      {/* Heading */}
      <p
        className="text-[10px] font-semibold uppercase tracking-widest mb-2"
        style={{
          color: "#8A837C",
          letterSpacing: "0.1em",
        }}
      >
        Step 03 — Palette
      </p>

      <h2
        className="font-serif italic font-light mb-1"
        style={{
          fontSize: "clamp(28px,5vw,42px)",
          color: "#1A1612",
        }}
      >
        Your Colours
      </h2>

      <p
        className="text-sm mb-7"
        style={{ color: "#6B6460" }}
      >
        Choose a curated palette or customise your own.
      </p>

      {/* =========================================================
          NORMAL PALETTE VIEW
         ========================================================= */}
      {!customiseOpen && (
        <>
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
                  background:
                    colorMode === mode
                      ? "#1A1612"
                      : "transparent",
                  color:
                    colorMode === mode
                      ? "#FAF8F5"
                      : "#6B6460",
                  letterSpacing: "0.04em",
                }}
              >
                {mode === "palette"
                  ? "Full Palette"
                  : "Mix & Match"}
              </button>
            ))}
          </div>

          {/* =====================================================
              FULL PALETTE
             ===================================================== */}
          {colorMode === "palette" && (
            <div className="space-y-4">
              {softPalette && (
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{
                      color: "#8A837C",
                      letterSpacing: "0.09em",
                    }}
                  >
                    Soft &amp; Natural
                  </p>

                  <PaletteCard
                    palette={softPalette}
                    isSelected={
                      selectedPalette?.id === softPalette.id
                    }
                    onSelect={() =>
                      onSelectPalette(softPalette)
                    }
                  />
                </div>
              )}

              {vibrantPalette && (
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{
                      color: "#8A837C",
                      letterSpacing: "0.09em",
                    }}
                  >
                    Vibrant &amp; Rich
                  </p>

                  <PaletteCard
                    palette={vibrantPalette}
                    isSelected={
                      selectedPalette?.id === vibrantPalette.id
                    }
                    onSelect={() =>
                      onSelectPalette(vibrantPalette)
                    }
                  />
                </div>
              )}

              {/* =================================================
                  CUSTOMISE CARD
                 ================================================= */}
              <button
                onClick={handleCustomiseOpen}
                className="w-full text-left p-5 rounded-2xl transition-all"
                style={{
                  background:
                    "rgba(255,255,255,0.48)",
                  backdropFilter: "blur(12px)",
                  border:
                    "1px solid rgba(26,22,18,0.12)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(26,22,18,0.28)";
                  e.currentTarget.style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(26,22,18,0.12)";
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                      style={{
                        color: "#8A837C",
                        letterSpacing: "0.09em",
                      }}
                    >
                      Customise
                    </p>

                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1612" }}
                    >
                      Choose your own colours
                    </p>

                    <p
                      className="text-xs mt-1"
                      style={{ color: "#8A837C" }}
                    >
                      Get access to all remaining colours
                      beyond the curated palettes.
                    </p>
                  </div>

                  <span
                    className="text-xl shrink-0"
                    style={{ color: "#6B6460" }}
                  >
                    →
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* =====================================================
              MIX & MATCH
             ===================================================== */}
          {colorMode === "mixmatch" && (
            <>
              <MixMatchSelector
                toneId={toneId}
                selectedColors={selectedColors}
                onToggleColor={onToggleColor}
                onClearColors={onClearColors}
              />

              {/* Customise option while in Mix & Match */}
              <button
                onClick={handleCustomiseOpen}
                className="w-full text-left p-5 rounded-2xl mt-6 transition-all"
                style={{
                  background:
                    "rgba(255,255,255,0.48)",
                  backdropFilter: "blur(12px)",
                  border:
                    "1px solid rgba(26,22,18,0.12)",
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                      style={{
                        color: "#8A837C",
                        letterSpacing: "0.09em",
                      }}
                    >
                      Customise
                    </p>

                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1612" }}
                    >
                      Choose from all other colours
                    </p>

                    <p
                      className="text-xs mt-1"
                      style={{ color: "#8A837C" }}
                    >
                      Select up to 2 colours for your outfit.
                    </p>
                  </div>

                  <span
                    className="text-xl shrink-0"
                    style={{ color: "#6B6460" }}
                  >
                    →
                  </span>
                </div>
              </button>
            </>
          )}
        </>
      )}

      {/* =========================================================
          CUSTOMISE VIEW
         ========================================================= */}
      {customiseOpen && (
        <div className="animate-fade-in space-y-6">
          {/* Customise heading */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: "#6B6460",
                  letterSpacing: "0.09em",
                }}
              >
                Customise
              </p>

              <p
                className="text-sm mt-1"
                style={{ color: "#8A837C" }}
              >
                All available colours beyond the curated palettes.
              </p>
            </div>

            <button
              onClick={handleCustomiseBack}
              className="text-xs font-medium shrink-0"
              style={{ color: "#6B6460" }}
            >
              ← Back to palettes
            </button>
          </div>

          {/* =====================================================
              SELECTED OUTFIT
             ===================================================== */}
          <div
            className="p-4 rounded-2xl"
            style={{
              background:
                "rgba(255,255,255,0.48)",
              backdropFilter: "blur(12px)",
              border:
                "1px solid rgba(255,255,255,0.42)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  color: "#6B6460",
                  letterSpacing: "0.09em",
                }}
              >
                Your Outfit
              </p>

              <div className="flex items-center gap-3">
                <p
                  className="text-xs"
                  style={{ color: "#8A837C" }}
                >
                  {selectedColors.length}/2
                </p>

                {selectedColors.length > 0 && (
                  <button
                    onClick={onClearColors}
                    className="text-xs font-medium"
                    style={{ color: "#6B6460" }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* TOP */}
              <div
                className="p-3 rounded-xl"
                style={{
                  background:
                    "rgba(250,248,245,0.75)",
                  border:
                    "1px solid rgba(26,22,18,0.08)",
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#8A837C" }}
                >
                  Top
                </p>

                {selectedColors[0] ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full shrink-0"
                      style={{
                        background:
                          selectedColors[0],
                        boxShadow:
                          "0 1px 5px rgba(0,0,0,0.15)",
                      }}
                    />

                    <span
                      className="text-xs font-medium"
                      style={{ color: "#4A4540" }}
                    >
                      {selectedColors[0]}
                    </span>
                  </div>
                ) : (
                  <p
                    className="text-xs"
                    style={{ color: "#B0A89E" }}
                  >
                    Select first colour
                  </p>
                )}
              </div>

              {/* BOTTOM */}
              <div
                className="p-3 rounded-xl"
                style={{
                  background:
                    "rgba(250,248,245,0.75)",
                  border:
                    "1px solid rgba(26,22,18,0.08)",
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#8A837C" }}
                >
                  Bottom
                </p>

                {selectedColors[1] ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full shrink-0"
                      style={{
                        background:
                          selectedColors[1],
                        boxShadow:
                          "0 1px 5px rgba(0,0,0,0.15)",
                      }}
                    />

                    <span
                      className="text-xs font-medium"
                      style={{ color: "#4A4540" }}
                    >
                      {selectedColors[1]}
                    </span>
                  </div>
                ) : (
                  <p
                    className="text-xs"
                    style={{ color: "#B0A89E" }}
                  >
                    Select second colour
                  </p>
                )}
              </div>
            </div>

            <p
              className="text-xs mt-3 text-center"
              style={{ color: "#8A837C" }}
            >
              Select up to 2 colours — first for the top,
              second for the bottom.
            </p>
          </div>

          {/* =====================================================
              ALL REMAINING COLOURS
             ===================================================== */}
          <div>
            <p
              className="text-xs font-semibold mb-3"
              style={{ color: "#4A4540" }}
            >
              Available Colours
            </p>

            <div className="grid grid-cols-6 sm:grid-cols-8 gap-4">
              {customColors.map((color, index) => {
                const isActive =
                  selectedColors.includes(color);

                const disabled =
                  !isActive &&
                  selectedColors.length >= 2;

                return (
                  <button
                    key={`${color}-${index}`}
                    type="button"
                    onClick={() =>
                      !disabled &&
                      handleCustomColourToggle(color)
                    }
                    disabled={disabled}
                    title={color}
                    className="flex justify-center transition-all"
                    style={{
                      opacity: disabled ? 0.3 : 1,
                      cursor: disabled
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    <div
                      className="rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        width: 42,
                        height: 42,
                        background: color,
                        borderColor: isActive
                          ? "#1A1612"
                          : "rgba(255,255,255,0.8)",
                        boxShadow: isActive
                          ? "0 0 0 2px #FAF8F5, 0 0 0 3.5px #1A1612"
                          : "0 1px 5px rgba(0,0,0,0.12)",
                        transform: isActive
                          ? "scale(1.1)"
                          : undefined,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {selectedColors.length >= 2 && (
              <p
                className="text-xs mt-4 text-center font-medium"
                style={{ color: "#8A6A2A" }}
              >
                Maximum 2 colours selected.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}