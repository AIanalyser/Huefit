import { HueFitSelection } from "@/types";

interface ResultLeftPanelProps {
  selection: HueFitSelection | null;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5" style={{ borderBottom: "1px solid rgba(120,100,80,0.08)" }}>
      <span className="text-[10px] uppercase tracking-widest font-medium flex-shrink-0" style={{ color: "#8A837C", letterSpacing: "0.08em" }}>
        {label}
      </span>
      <span className="text-xs font-semibold text-right" style={{ color: "#1A1612" }}>
        {value}
      </span>
    </div>
  );
}

export default function ResultLeftPanel({ selection }: ResultLeftPanelProps) {
  if (!selection) return null;

  const { skin_tone, outfit_name, outfit_id, gender, category, color_palette } = selection;

  return (
    <div className="space-y-5">
      {/* Outfit name — editorial */}
      <div>
        <p
          className="text-[9px] font-semibold uppercase tracking-widest mb-1"
          style={{ color: "#8A837C", letterSpacing: "0.12em" }}
        >
          Selected Look
        </p>
        <h3
          className="font-serif italic font-light leading-tight"
          style={{ fontSize: "clamp(20px,3vw,28px)", color: "#1A1612" }}
        >
          {outfit_name}
        </h3>
        <p className="text-xs mt-1 font-mono" style={{ color: "#B0A89E" }}>
          {outfit_id}
        </p>
      </div>

      <div className="divider" />

      {/* Skin tone */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#8A837C", letterSpacing: "0.12em" }}>
          Skin Tone
        </p>
        <div className="flex items-center gap-3">
          {/* Shade strip */}
          <div className="flex rounded-xl overflow-hidden flex-shrink-0" style={{ width: 52, height: 20 }}>
            {skin_tone.available_hex.map((c) => (
              <div key={c} className="flex-1" style={{ background: c }} />
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "#1A1612" }}>{skin_tone.label}</p>
            <p className="text-[10px] font-mono" style={{ color: "#8A837C" }}>{skin_tone.id}</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Meta rows */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#8A837C", letterSpacing: "0.12em" }}>
          Details
        </p>
        <Row label="Gender" value={gender.charAt(0).toUpperCase() + gender.slice(1)} />
        <Row label="Category" value={category.charAt(0).toUpperCase() + category.slice(1)} />
        <Row label="Palette" value={color_palette.id} />
      </div>

      <div className="divider" />

      {/* Colour palette circles */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#8A837C", letterSpacing: "0.12em" }}>
          Palette
        </p>
        <div className="flex flex-wrap gap-2">
          {color_palette.colors.slice(0, 8).map((c, i) => (
            <div
              key={`${c}-${i}`}
              className="rounded-full border-2"
              style={{
                width: 28,
                height: 28,
                background: c,
                borderColor: "rgba(255,255,255,0.7)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
