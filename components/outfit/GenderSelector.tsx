"use client";

import { Gender } from "@/types";

const genders: { id: Gender; label: string; tagline: string }[] = [
  { id: "male", label: "Male", tagline: "Formal · Casual · Ethnic · Party · Suits" },
  { id: "female", label: "Female", tagline: "Formal · Casual · Ethnic · Party · Suits" },
];

interface GenderSelectorProps {
  selectedGender: Gender | null;
  onSelectGender: (gender: Gender) => void;
}

export default function GenderSelector({ selectedGender, onSelectGender }: GenderSelectorProps) {
  return (
    <div className="animate-fade-up">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
        Step 02 — Style
      </p>
      <h2
        className="font-serif italic font-light mb-1"
        style={{ fontSize: "clamp(28px,5vw,42px)", color: "#1A1612" }}
      >
        Who are you styling?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#6B6460" }}>
        Select a gender to see the right outfit options.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto sm:max-w-md">
        {genders.map((g) => {
          const isSelected = selectedGender === g.id;
          return (
            <button
              key={g.id}
              onClick={() => onSelectGender(g.id)}
              aria-label={`Select ${g.label}`}
              aria-pressed={isSelected}
              className="card-select rounded-2xl p-8 text-center flex flex-col items-center gap-3 transition-all"
              style={isSelected ? { borderColor: "#1A1612", background: "rgba(255,255,255,0.82)" } : {}}
            >
              {/* Minimal icon — geometric */}
              <div
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 transition-all"
                style={{
                  borderColor: isSelected ? "#1A1612" : "rgba(120,100,80,0.2)",
                  background: isSelected ? "#1A1612" : "rgba(255,255,255,0.5)",
                }}
              >
                {/* Abstract fashion silhouette - just an elegant shape */}
                {g.id === "male" ? (
                  <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                    <circle cx="11" cy="5.5" r="4.5" fill={isSelected ? "#FAF8F5" : "#8A837C"} />
                    <path d="M4 14C4 11 6.5 9 11 9C15.5 9 18 11 18 14V22H4V14Z" fill={isSelected ? "#FAF8F5" : "#8A837C"} opacity="0.8" />
                    <rect x="4" y="22" width="5" height="6" rx="2" fill={isSelected ? "#FAF8F5" : "#8A837C"} opacity="0.6" />
                    <rect x="13" y="22" width="5" height="6" rx="2" fill={isSelected ? "#FAF8F5" : "#8A837C"} opacity="0.6" />
                  </svg>
                ) : (
                  <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                    <circle cx="11" cy="5.5" r="4.5" fill={isSelected ? "#FAF8F5" : "#8A837C"} />
                    <path d="M4 14C4 11 6.5 9 11 9C15.5 9 18 11 18 14L16 22H6L4 14Z" fill={isSelected ? "#FAF8F5" : "#8A837C"} opacity="0.8" />
                    <path d="M6 22L4 28H18L16 22H6Z" fill={isSelected ? "#FAF8F5" : "#8A837C"} opacity="0.5" />
                  </svg>
                )}
              </div>

              <p
                className="text-base font-semibold"
                style={{ color: "#1A1612", letterSpacing: "0.02em" }}
              >
                {g.label}
              </p>
              <p className="text-[10px]" style={{ color: "#8A837C" }}>
                {g.tagline}
              </p>

              {isSelected && (
                <span
                  className="text-[9px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full mt-1"
                  style={{ background: "#1A1612", color: "#FAF8F5", letterSpacing: "0.07em" }}
                >
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
