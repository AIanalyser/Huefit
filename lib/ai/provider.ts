import {
  ColorAnalysisResult,
  GeneratedOutfitResult,
  HueFitSelection,
} from "@/types";

export interface AIProvider {
  analyzeImage(imageBase64: string): Promise<ColorAnalysisResult>;
  generateOutfit(
    selection: HueFitSelection,
    sourceImageBase64?: string,
  ): Promise<GeneratedOutfitResult>;
}

export function getAIProvider(): AIProvider {
  const xaiApiKey = process.env.XAI_API_KEY || "";
  const hfToken = process.env.HF_TOKEN || "";
  const geminiApiKey = process.env.GEMINI_API_KEY || "";

  const hasXAI = xaiApiKey.trim().length > 0;
  const hasHF = hfToken.trim().length > 0;
  const hasGemini = geminiApiKey.trim().length > 0;

  // Grok is now the preferred image-generation provider.
  if (hasXAI) {
    const { GrokProvider } = require("./grok-provider");
    return new GrokProvider();
  }

  if (hasHF) {
    const { BFLProvider } = require("./bfl-provider");
    return new BFLProvider();
  }

  if (hasGemini) {
    const { GeminiProvider } = require("./gemini-provider");
    return new GeminiProvider();
  }

  const { DemoProvider } = require("./demo-provider");
  return new DemoProvider();
}