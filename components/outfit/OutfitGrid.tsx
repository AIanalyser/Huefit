"use client";

import { Outfit } from "@/types";
import OutfitCard from "./OutfitCard";

interface OutfitGridProps {
  outfits: Outfit[];
  selectedOutfit: Outfit | null;
  onSelectOutfit: (outfit: Outfit) => void;
}

export default function OutfitGrid({ outfits, selectedOutfit, onSelectOutfit }: OutfitGridProps) {
  if (outfits.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm" style={{ color: "#8A837C" }}>No outfits available for this selection.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-5">
        <h3 className="text-sm font-semibold" style={{ color: "#1A1612" }}>Select an Outfit</h3>
        <span className="text-xs" style={{ color: "#8A837C" }}>{outfits.length} options</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            isSelected={selectedOutfit?.id === outfit.id}
            onSelect={() => onSelectOutfit(outfit)}
          />
        ))}
      </div>
    </div>
  );
}
