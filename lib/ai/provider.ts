import {
  ColorAnalysisResult,
  GeneratedOutfitResult,
  HueFitSelection,
} from "@/types";

export interface AIProvider {
  analyzeImage(
    imageBase64: string
  ): Promise<ColorAnalysisResult>;

  generateOutfit(
    selection: HueFitSelection,
    sourceImageBase64?: string
  ): Promise<GeneratedOutfitResult>;
}

export function getAIProvider(): AIProvider {
  const bflApiKey = process.env.BFL_API_KEY || "";
  const geminiApiKey = process.env.GEMINI_API_KEY || "";

  const hasBFL = bflApiKey.trim().length > 0;
  const hasGemini = geminiApiKey.trim().length > 0;

  // ------------------------------------------------------------
  // BFL / FLUX is the primary provider for outfit generation.
  // ------------------------------------------------------------

  if (hasBFL) {
    const { BFLProvider } = require("./bfl-provider");
    return new BFLProvider();
  }

  // ------------------------------------------------------------
  // Gemini remains available when BFL is not configured.
  // ------------------------------------------------------------

  if (hasGemini) {
    const { GeminiProvider } = require("./gemini-provider");
    return new GeminiProvider();
  }

  // ------------------------------------------------------------
  // Final fallback: demo provider.
  // ------------------------------------------------------------

  const { DemoProvider } = require("./demo-provider");
  return new DemoProvider();
}