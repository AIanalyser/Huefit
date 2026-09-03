import { SkinTone } from "@/types";

interface SkinToneCardProps {
  tone: SkinTone;
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
}

export default function SkinToneCard({ tone, isSelected, isRecommended, onSelect }: SkinToneCardProps) {
  return (
    <button
      onClick={onSelect}
      aria-label={`Select ${tone.label} skin tone`}
      aria-pressed={isSelected}
      className="group flex items-center gap-4 w-full text-left py-3.5 px-4 rounded-2xl transition-all duration-200"
      style={{
        background: isSelected ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.38)",
        border: isSelected
          ? "1.5px solid #1A1612"
          : "1.5px solid rgba(120,100,80,0.14)",
        backdropFilter: "blur(12px)",
        boxShadow: isSelected
          ? "0 0 0 3px rgba(26,22,18,0.07), 0 4px 16px rgba(0,0,0,0.06)"
          : "none",
      }}
    >
      {/* Swatch gradient bar */}
      <div className="flex rounded-xl overflow-hidden flex-shrink-0 shadow-sm" style={{ width: 56, height: 32 }}>
        {tone.hex.map((c) => (
          <div key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight" style={{ color: "#1A1612" }}>
          {tone.label}
        </p>
        <p className="text-[10px] font-mono mt-0.5" style={{ color: "#8A837C" }}>
          {tone.id}
        </p>
      </div>

      {/* AI badge */}
      {isRecommended && (
        <span
          className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: "#1A1612", color: "#FAF8F5", letterSpacing: "0.07em" }}
        >
          AI
        </span>
      )}

      {/* Checkmark */}
      {isSelected && (
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "#1A1612" }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#FAF8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </button>
  );
}
