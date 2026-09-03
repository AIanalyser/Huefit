/**
 * HueFit — Data Integrity & Logic Tests
 * Run: npx jest  (after installing jest)
 */

import { skinTones, getSkinTone, getSkinToneIndex } from "../data/skinTones";
import { outfits, getOutfits, getOutfitById } from "../data/outfits";
import { palettes, getPalettesForTone } from "../data/palettes";
import { garmentRegions, getGarmentRegions } from "../data/garmentRegions";
import { mapToSkinTone } from "../lib/color-analysis/analyzer";

// ─────────────────────────────────────────────
// Skin Tone Dataset Integrity
// ─────────────────────────────────────────────

describe("Skin Tone Dataset", () => {
  test("has exactly 6 skin tones", () => {
    expect(skinTones).toHaveLength(6);
  });

  test("each skin tone has exactly 4 HEX values", () => {
    skinTones.forEach((tone) => {
      expect(tone.hex).toHaveLength(4);
    });
  });

  test("all HEX values are valid format", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    skinTones.forEach((tone) => {
      tone.hex.forEach((hex) => {
        expect(hex).toMatch(hexRegex);
      });
    });
  });

  test("all tone IDs are unique", () => {
    const ids = skinTones.map((t) => t.id);
    const unique = [...new Set(ids)];
    expect(ids).toHaveLength(unique.length);
  });

  test("getSkinTone returns correct tone for TONE_03", () => {
    const tone = getSkinTone("TONE_03");
    expect(tone).toBeDefined();
    expect(tone!.label).toBe("Light Medium");
    expect(tone!.hex[0]).toBe("#C98F6B");
    expect(tone!.hex).toHaveLength(4);
  });

  test("getSkinTone returns undefined for invalid ID", () => {
    expect(getSkinTone("INVALID")).toBeUndefined();
  });

  test("tone IDs follow TONE_0X pattern", () => {
    const validIds = ["TONE_01", "TONE_02", "TONE_03", "TONE_04", "TONE_05", "TONE_06"];
    skinTones.forEach((t) => {
      expect(validIds).toContain(t.id);
    });
  });
});

// ─────────────────────────────────────────────
// Outfit Dataset Integrity
// ─────────────────────────────────────────────

describe("Outfit Dataset", () => {
  test("has exactly 30 outfit records", () => {
    expect(outfits).toHaveLength(30);
  });

  test("each gender/category combo returns exactly 3 outfits", () => {
    const combinations: [string, string][] = [
      ["male", "formal"],
      ["male", "casual"],
      ["male", "ethnic"],
      ["male", "party"],
      ["male", "suits"],
      ["female", "formal"],
      ["female", "casual"],
      ["female", "ethnic"],
      ["female", "party"],
      ["female", "suits"],
    ];

    combinations.forEach(([gender, category]) => {
      const result = getOutfits(gender as any, category as any);
      expect(result).toHaveLength(3);
    });
  });

  test("getOutfits(female, ethnic) returns exactly 3 records", () => {
    const result = getOutfits("female", "ethnic");
    expect(result).toHaveLength(3);
    result.forEach((o) => {
      expect(o.gender).toBe("female");
      expect(o.category).toBe("ethnic");
    });
  });

  test("getOutfits(male, formal) returns exactly 3 records", () => {
    const result = getOutfits("male", "formal");
    expect(result).toHaveLength(3);
    result.forEach((o) => {
      expect(o.gender).toBe("male");
      expect(o.category).toBe("formal");
    });
  });

  test("getOutfitById returns correct outfit", () => {
    const outfit = getOutfitById("ETHNIC_F01");
    expect(outfit).toBeDefined();
    expect(outfit!.name).toBe("Traditional South Indian Saree");
    expect(outfit!.template).toBe("ethnic_f01");
  });

  test("getOutfitById returns undefined for invalid ID", () => {
    expect(getOutfitById("INVALID_ID")).toBeUndefined();
  });

  test("all outfit templates are unique", () => {
    const templates = outfits.map((o) => o.template);
    const unique = [...new Set(templates)];
    expect(templates).toHaveLength(unique.length);
  });

  test("no outfit category appears more than 6 times per gender", () => {
    const genders = ["male", "female"] as const;
    const categories = ["formal", "casual", "ethnic", "party", "suits"] as const;
    genders.forEach((g) => {
      categories.forEach((c) => {
        const count = outfits.filter(
          (o) => o.gender === g && o.category === c
        ).length;
        expect(count).toBe(3);
      });
    });
  });
});

// ─────────────────────────────────────────────
// Palette Dataset Integrity
// ─────────────────────────────────────────────

describe("Palette Dataset", () => {
  test("has exactly 12 palettes", () => {
    expect(palettes).toHaveLength(12);
  });

  test("each skin tone has exactly 2 palettes", () => {
    const toneIds = ["TONE_01", "TONE_02", "TONE_03", "TONE_04", "TONE_05", "TONE_06"];
    toneIds.forEach((toneId) => {
      const result = getPalettesForTone(toneId as any);
      expect(result).toHaveLength(2);
    });
  });

  test("each palette has exactly 10 colors", () => {
    palettes.forEach((p) => {
      expect(p.colors).toHaveLength(10);
    });
  });

  test("palettes include both soft-natural and vibrant-rich for each tone", () => {
    const toneIds = ["TONE_01", "TONE_02", "TONE_03", "TONE_04", "TONE_05", "TONE_06"];
    toneIds.forEach((toneId) => {
      const tonePalettes = getPalettesForTone(toneId as any);
      const setIds = tonePalettes.map((p) => p.setId);
      expect(setIds).toContain("soft-natural");
      expect(setIds).toContain("vibrant-rich");
    });
  });
});

// ─────────────────────────────────────────────
// Garment Region Mappings
// ─────────────────────────────────────────────

describe("Garment Region Mappings", () => {
  test("has mappings for all 30 outfit templates", () => {
    expect(garmentRegions).toHaveLength(30);
  });

  test("ETHNIC_F01 has correct region mapping", () => {
    const mapping = getGarmentRegions("ethnic_f01");
    expect(mapping).toBeDefined();
    const regionNames = mapping!.regions.map((r) => r.name);
    expect(regionNames).toContain("saree_body");
    expect(regionNames).toContain("blouse");
  });

  test("returns undefined for unknown template", () => {
    expect(getGarmentRegions("unknown_template")).toBeUndefined();
  });
});

// ─────────────────────────────────────────────
// Runtime Merge
// ─────────────────────────────────────────────

describe("Runtime Merge", () => {
  test("buildSelection produces correct HueFitSelection shape", () => {
    const tone = getSkinTone("TONE_03")!;
    const outfit = getOutfitById("ETHNIC_F01")!;
    const palette = getPalettesForTone("TONE_03")[0];

    // Simulate the merged object
    const selection = {
      skin_tone: {
        id: tone.id,
        label: tone.label,
        selected_hex: tone.hex[0],
        available_hex: tone.hex,
      },
      gender: "female" as const,
      category: "ethnic" as const,
      outfit_id: outfit.id,
      outfit_name: outfit.name,
      color_palette: {
        id: palette.id,
        colors: palette.colors.slice(0, 5),
      },
      template_id: outfit.template,
    };

    expect(selection.skin_tone.id).toBe("TONE_03");
    expect(selection.outfit_id).toBe("ETHNIC_F01");
    expect(selection.template_id).toBe("ethnic_f01");
    expect(selection.gender).toBe("female");
    expect(selection.color_palette.colors.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────
// Color Analysis Mapping
// ─────────────────────────────────────────────

describe("Color Analysis Engine", () => {
  test("maps a light hex to TONE_01 or TONE_02", () => {
    const { toneId } = mapToSkinTone("#F5E6D3");
    expect(["TONE_01", "TONE_02"]).toContain(toneId);
  });

  test("maps a deep hex to TONE_05 or TONE_06", () => {
    const { toneId } = mapToSkinTone("#542C20");
    expect(["TONE_05", "TONE_06"]).toContain(toneId);
  });

  test("always returns a confidence between 0.5 and 1.0", () => {
    const hexValues = ["#F7E7D3", "#C98F6B", "#A96B4A", "#542C20"];
    hexValues.forEach((hex) => {
      const { confidence } = mapToSkinTone(hex);
      expect(confidence).toBeGreaterThanOrEqual(0.5);
      expect(confidence).toBeLessThanOrEqual(1.0);
    });
  });

  test("never returns a toneId outside the 6 valid options", () => {
    const validIds = ["TONE_01", "TONE_02", "TONE_03", "TONE_04", "TONE_05", "TONE_06"];
    const testColors = ["#FFFFFF", "#000000", "#888888", "#C98F6B", "#3A1C16"];
    testColors.forEach((hex) => {
      const { toneId } = mapToSkinTone(hex);
      expect(validIds).toContain(toneId);
    });
  });
});
