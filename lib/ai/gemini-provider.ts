import { AIProvider } from "./provider";
import { ColorAnalysisResult, GeneratedOutfitResult, HueFitSelection, SkinToneId } from "@/types";
import { skinTones } from "@/data/skinTones";
import { buildOutfitPrompt } from "./buildOutfitPrompt";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";
const GEMINI_IMAGE_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp-image-generation:generateContent";

export class GeminiProvider implements AIProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
  }

  async analyzeImage(imageBase64: string): Promise<ColorAnalysisResult> {
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    const prompt = `Analyze the skin tone of the person in this image. You must classify it into EXACTLY one of these 6 categories:

1. TONE_01 - Very Light (HEX range: #F7E7D3 to #E8C19F)
2. TONE_02 - Light (HEX range: #E8C09E to #CC9870)
3. TONE_03 - Light Medium (HEX range: #C98F6B to #AE6D4D)
4. TONE_04 - Medium (HEX range: #A96B4A to #8A5138)
5. TONE_05 - Deep (HEX range: #7E4933 to #603326)
6. TONE_06 - Very Deep (HEX range: #542C20 to #3A1C16)

Respond ONLY with valid JSON in this exact format:
{
  "toneId": "TONE_XX",
  "label": "<label>",
  "selectedHex": "<closest HEX from the ranges above>",
  "confidence": <0.0 to 1.0>,
  "undertone": "warm" | "cool" | "neutral",
  "lighting": "natural" | "artificial" | "mixed" | "poor",
  "notes": "<brief analysis notes>"
}`;

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } },
            ],
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 500,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse AI response");
      }

      const result = JSON.parse(jsonMatch[0]);
      
      // Validate toneId
      const validTones: SkinToneId[] = ["TONE_01", "TONE_02", "TONE_03", "TONE_04", "TONE_05", "TONE_06"];
      if (!validTones.includes(result.toneId)) {
        result.toneId = "TONE_03"; // Default fallback
        result.label = "Light Medium";
      }

      return result as ColorAnalysisResult;
    } catch (error) {
      console.error("Gemini analysis error:", error);
      // Fallback to demo analysis
      const { DemoProvider } = require("./demo-provider");
      const demo = new DemoProvider();
      const result = await demo.analyzeImage(imageBase64);
      result.notes = "AI analysis encountered an error. Showing estimated result. Please manually select your skin tone.";
      result.confidence = 0.5;
      return result;
    }
  }

  async generateOutfit(selection: HueFitSelection, sourceImageBase64?: string): Promise<GeneratedOutfitResult> {
    const prompt = buildOutfitPrompt(selection);

    try {
      const parts: any[] = [{ text: prompt }];
      
      if (sourceImageBase64) {
        const cleanBase64 = sourceImageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
        parts.push({
          inline_data: { mime_type: "image/jpeg", data: cleanBase64 },
        });
      }

      const response = await fetch(`${GEMINI_IMAGE_API_URL}?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini image generation error: ${response.status}`);
      }

      const data = await response.json();
      
      // Check for image in response
      const candidate = data.candidates?.[0]?.content?.parts || [];
      let imageBase64 = null;
      let textResponse = "";

      for (const part of candidate) {
        if (part.inline_data) {
          imageBase64 = part.inline_data.data;
        }
        if (part.text) {
          textResponse = part.text;
        }
      }

      return {
        imageUrl: null,
        imageBase64: imageBase64 ? `data:image/png;base64,${imageBase64}` : null,
        prompt,
        status: imageBase64 ? "completed" : "completed",
        resolution: "1024 × 1024",
        format: "PNG",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Gemini generation error:", error);
      return {
        imageUrl: null,
        imageBase64: null,
        prompt,
        status: "failed",
        resolution: "1024 × 1024",
        format: "PNG",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Generation failed",
      };
    }
  }
}
