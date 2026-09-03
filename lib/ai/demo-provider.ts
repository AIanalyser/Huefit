import { AIProvider } from "./provider";
import { ColorAnalysisResult, GeneratedOutfitResult, HueFitSelection, SkinToneId } from "@/types";
import { skinTones } from "@/data/skinTones";
import { buildOutfitPrompt } from "./buildOutfitPrompt";

/**
 * DemoProvider — works without any API key.
 * Produces deterministic, realistic-looking results for the full user journey.
 * The demo flow ends at the OutfitPlaceholder (CSS fashion figure) instead of
 * an AI-generated image. The prompt is still constructed and surfaced so
 * developers can see exactly what would be sent to Gemini.
 */
export class DemoProvider implements AIProvider {
  async analyzeImage(imageBase64: string): Promise<ColorAnalysisResult> {
    // Realistic delay to simulate network round-trip
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // Deterministic: pick tone based on base64 checksum (stable across runs)
    const chars = imageBase64.slice(50, 80);
    let sum = 0;
    for (let i = 0; i < chars.length; i++) sum += chars.charCodeAt(i);
    const toneIndex = sum % 6;
    const tone = skinTones[toneIndex];
    const undertones: ("warm" | "cool" | "neutral")[] = ["warm", "cool", "neutral"];
    const undertone = undertones[toneIndex % 3];
    const confidence = 0.80 + (toneIndex * 0.02);

    return {
      toneId: tone.id,
      label: tone.label,
      selectedHex: tone.hex[0],
      confidence,
      undertone,
      lighting: "natural",
      notes: `Demo mode · Detected ${tone.label} (${undertone} undertone) · Configure GEMINI_API_KEY for live AI analysis.`,
    };
  }

  async generateOutfit(
    selection: HueFitSelection,
    _sourceImageBase64?: string
  ): Promise<GeneratedOutfitResult> {
    // Simulate progressive generation delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const prompt = buildOutfitPrompt(selection);

    return {
      imageUrl: null,
      imageBase64: null,  // No AI image in demo — OutfitPlaceholder renders instead
      prompt,
      status: "completed",
      resolution: "1024 × 1024",
      format: "PNG",
      timestamp: new Date().toISOString(),
    };
  }
}
