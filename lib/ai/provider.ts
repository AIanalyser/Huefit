import { ColorAnalysisResult, GeneratedOutfitResult, HueFitSelection } from "@/types";

export interface AIProvider {
  analyzeImage(imageBase64: string): Promise<ColorAnalysisResult>;
  generateOutfit(selection: HueFitSelection, sourceImageBase64?: string): Promise<GeneratedOutfitResult>;
}

export function getAIProvider(): AIProvider {
  const isDemoMode = process.env.DEMO_MODE === "true" || !process.env.GEMINI_API_KEY;
  
  if (isDemoMode) {
    // Dynamic import to keep demo provider separate
    const { DemoProvider } = require("./demo-provider");
    return new DemoProvider();
  }
  
  const { GeminiProvider } = require("./gemini-provider");
  return new GeminiProvider();
}
