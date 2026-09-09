"use client";

import Image from "next/image";
import { Outfit } from "@/types";

interface OutfitCardProps {
  outfit: Outfit;
  isSelected: boolean;
  onSelect: () => void;
}

const categoryLabel: Record<string, string> = {
  formal: "Formal Wear",
  casual: "Casual Wear",
  ethnic: "Ethnic Wear",
  party: "Party & Occasion",
  suits: "Tailoring",
};

const templateImageMap: Record<string, string> = {
  formal_m01: "/huefit-dataset/male/formal_1.png",
  formal_m02: "/huefit-dataset/male/formal_2.png",
  formal_m03: "/huefit-dataset/male/formal_3.png",

  casual_m01: "/huefit-dataset/male/casual_1.png",
  casual_m02: "/huefit-dataset/male/casual_2.png",
  casual_m03: "/huefit-dataset/male/casual_3.png",

  ethnic_m01: "/huefit-dataset/male/ethinic_1.png",
  ethnic_m02: "/huefit-dataset/male/ethinic_2.png",
  ethnic_m03: "/huefit-dataset/male/ethinic_3.png",

  party_m01: "/huefit-dataset/male/party_1.png",
  party_m02: "/huefit-dataset/male/party_2.png",
  party_m03: "/huefit-dataset/male/party_3.png",

  suit_m01: "/huefit-dataset/male/suit_1.png",
  suit_m02: "/huefit-dataset/male/suit_2.png",
  suit_m03: "/huefit-dataset/male/suit_3.png",

  formal_f01: "/huefit-dataset/female/formalfemale_1.png",
  formal_f02: "/huefit-dataset/female/formalfemale_2.png",
  formal_f03: "/huefit-dataset/female/formalfemale_3.png",

  casual_f01: "/huefit-dataset/female/casualfemale_1.png",
  casual_f02: "/huefit-dataset/female/casualfemale_2.png",
  casual_f03: "/huefit-dataset/female/casualfemale_3.png",

  ethnic_f01: "/huefit-dataset/female/ethinicfemale_1.png",
  ethnic_f02: "/huefit-dataset/female/ethinicfemale_2.png",
  ethnic_f03: "/huefit-dataset/female/ethinicfemale_3.png",

  party_f01: "/huefit-dataset/female/partyfemale_1.png",
  party_f02: "/huefit-dataset/female/partyfemale_2.png",
  party_f03: "/huefit-dataset/female/partyfemale_3.png",

  suit_f01: "/huefit-dataset/female/suitfemale_1.png",
  suit_f02: "/huefit-dataset/female/suitfemale_2.png",
  suit_f03: "/huefit-dataset/female/suitfemale_3.png",
};

export default function OutfitCard({
  outfit,
  isSelected,
  onSelect,
}: OutfitCardProps) {
  const imageSrc = templateImageMap[outfit.template];

  return (
    <button
      onClick={onSelect}
      aria-label={`Select ${outfit.name}`}
      aria-pressed={isSelected}
      className="w-full text-left transition-all duration-200 overflow-hidden"
      style={{
        background: isSelected
          ? "rgba(255,255,255,0.88)"
          : "rgba(255,255,255,0.42)",
        backdropFilter: "blur(12px)",
        border: isSelected
          ? "1.5px solid #1A1612"
          : "1.5px solid rgba(120,100,80,0.14)",
        borderRadius: 18,
        boxShadow: isSelected
          ? "0 0 0 3px rgba(26,22,18,0.07), 0 4px 20px rgba(0,0,0,0.06)"
          : "none",
      }}
    >
      {/* Dataset preview */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 280,
          background: "#F7F5F2",
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={outfit.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-xs" style={{ color: "#8A837C" }}>
              Preview unavailable
            </span>
          </div>
        )}

        {/* Selection indicator */}
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full border flex items-center justify-center"
          style={{
            background: isSelected ? "#1A1612" : "rgba(255,255,255,0.85)",
            borderColor: isSelected
              ? "#1A1612"
              : "rgba(120,100,80,0.25)",
          }}
        >
          {isSelected && (
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
            >
              <path
                d="M1 4.5L3.5 7L8 2"
                stroke="#FAF8F5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className="text-[9px] font-semibold uppercase tracking-widest"
            style={{
              color: "#8A837C",
              letterSpacing: "0.1em",
            }}
          >
            {categoryLabel[outfit.category] ?? outfit.category}
          </span>
        </div>

        <div className="divider mb-3" />

        <p
          className="text-sm font-semibold mb-1 leading-snug"
          style={{ color: "#1A1612" }}
        >
          {outfit.name}
        </p>

        <p
          className="text-xs capitalize"
          style={{ color: "#8A837C" }}
        >
          {outfit.dressType.replace(/_/g, " ")}
        </p>

        <p
          className="text-[10px] font-mono mt-3"
          style={{
            color: "#B0A89E",
            letterSpacing: "0.04em",
          }}
        >
          {outfit.id}
        </p>
      </div>
    </button>
  );
}