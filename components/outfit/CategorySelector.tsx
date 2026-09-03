"use client";

import { OutfitCategory } from "@/types";
import { getCategories } from "@/data/outfits";

interface CategorySelectorProps {
  selectedCategory: OutfitCategory | null;
  onSelectCategory: (category: OutfitCategory) => void;
}

const categoryMeta: Record<string, string> = {
  formal:  "Shirts, blazers, and tailored trousers for professional settings.",
  casual:  "T-shirts, jeans, and relaxed everyday ensembles.",
  ethnic:  "Sarees, kurtas, veshtis, and traditional South Indian dress.",
  party:   "Statement looks, midi dresses, and occasion wear.",
  suits:   "Two-piece, three-piece, and skirt suits — sharp tailoring.",
};

export default function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const categories = getCategories();

  return (
    <div className="animate-fade-up">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
        Step 02 — Style
      </p>
      <h2
        className="font-serif italic font-light mb-1"
        style={{ fontSize: "clamp(28px,5vw,42px)", color: "#1A1612" }}
      >
        Category
      </h2>
      <p className="text-sm mb-7" style={{ color: "#6B6460" }}>
        What style are you looking for today?
      </p>

      <div className="space-y-2">
        {categories.map((cat, i) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              aria-label={`Select ${cat.label}`}
              aria-pressed={isSelected}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all duration-200 animate-fade-up"
              style={{
                animationDelay: `${i * 0.06}s`,
                opacity: 0,
                background: isSelected ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.38)",
                backdropFilter: "blur(12px)",
                border: isSelected ? "1.5px solid #1A1612" : "1.5px solid rgba(120,100,80,0.14)",
                boxShadow: isSelected ? "0 0 0 3px rgba(26,22,18,0.07)" : "none",
              }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1A1612" }}>
                  {cat.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#8A837C" }}>
                  {categoryMeta[cat.id] ?? cat.description}
                </p>
              </div>

              <div
                className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ml-4 transition-all"
                style={{
                  background: isSelected ? "#1A1612" : "transparent",
                  borderColor: isSelected ? "#1A1612" : "rgba(120,100,80,0.25)",
                }}
              >
                {isSelected && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#FAF8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
