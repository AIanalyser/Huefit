import { generateImage } from "ai";
import { xai } from "@ai-sdk/xai";
import {
  ColorAnalysisResult,
  GeneratedOutfitResult,
  HueFitSelection,
} from "@/types";
import { AIProvider } from "./provider";
import { buildOutfitPrompt } from "./buildOutfitPrompt";

export class GrokProvider implements AIProvider {
  private readonly apiKey: string;

  constructor() {
    const apiKey = process.env.XAI_API_KEY || "";

    if (!apiKey.trim()) {
      throw new Error("XAI_API_KEY is not configured");
    }

    this.apiKey = apiKey;
  }

  async analyzeImage(imageBase64: string): Promise<ColorAnalysisResult> {
    // Keep image analysis compatible with the existing Gemini implementation.
    const { GeminiProvider } = require("./gemini-provider");
    const provider = new GeminiProvider();

    return provider.analyzeImage(imageBase64);
  }

  async generateOutfit(
    selection: HueFitSelection,
    sourceImageBase64?: string,
  ): Promise<GeneratedOutfitResult> {
    const timestamp = new Date().toISOString();
    const prompt = buildOutfitPrompt(selection);

    if (!sourceImageBase64) {
      throw new Error("Source dataset image is required for Grok editing");
    }

    try {
      const imageData = sourceImageBase64.startsWith("data:")
        ? sourceImageBase64
        : `data:image/png;base64,${sourceImageBase64}`;

      const result = await generateImage({
        model: xai.image("grok-imagine-image-2.0"),
        prompt: {
          text: prompt,
          images: [imageData],
        },
        providerOptions: {
          xai: {
            resolution: "1k",
            output_format: "png",
          },
        },
        maxRetries: 1,
      });

      const image = result.image;

      return {
        imageUrl: null,
        imageBase64: `data:image/png;base64,${image.base64}`,
        prompt,
        status: "completed",
        resolution: "1024x1536",
        format: "png",
        timestamp,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown Grok generation error";

      console.error("Grok image generation failed:", error);

      return {
        imageUrl: null,
        imageBase64: null,
        prompt,
        status: "failed",
        resolution: "1024x1536",
        format: "png",
        timestamp,
        error: message,
      };
    }
  }
}