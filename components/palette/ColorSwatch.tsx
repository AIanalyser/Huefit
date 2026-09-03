"use client";

interface ColorSwatchProps {
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function ColorSwatch({
  color,
  isSelected = false,
  onClick,
  size = "md",
}: ColorSwatchProps) {
  const sizeClasses = {
    sm: "w-6 h-6 rounded-md",
    md: "w-9 h-9 rounded-lg",
    lg: "w-12 h-12 rounded-xl",
  };

  return (
    <button
      onClick={onClick}
      className={`color-swatch ${sizeClasses[size]} ${
        isSelected ? "selected" : ""
      } group relative`}
      style={{ backgroundColor: color }}
      aria-label={`Color ${color}${isSelected ? " (selected)" : ""}`}
      aria-pressed={isSelected}
      title={color}
    >
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-text-primary text-white px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none z-10">
        {color}
      </span>
    </button>
  );
}
