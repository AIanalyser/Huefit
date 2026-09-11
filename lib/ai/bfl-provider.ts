import { InferenceClient } from "@huggingface/inference";
import {
  GeneratedOutfitResult,
  HueFitSelection,
} from "@/types";
import { AIProvider } from "./provider";
import { buildOutfitPrompt } from "./buildOutfitPrompt";

const HF_MODEL = "Qwen/Qwen-Image-Edit";
const HF_PROVIDER = "fal-ai";

const NEGATIVE_PROMPT = `
new person,
new human,
realistic human face,
facial features,
eyes,
nose,
mouth,
ears,
hair,
facial expression,
identity change,
different mannequin,
different mannequin head,
different body,
different pose,
different proportions,
different camera,
different composition,
new outfit,
redesigned clothing,
added clothing,
removed clothing,
extra garments,
extra accessories,
background change,
text,
logo,
watermark,
photograph of a real person
`;

export class BFLProvider implements AIProvider {
  private client: InferenceClient;

  constructor() {
    const token = process.env.HF_TOKEN || "";

    if (!token) {
      throw new Error("HF_TOKEN is not configured");
    }

    this.client = new InferenceClient(token);
  }

  // Gemini remains responsible for skin-tone analysis.
  async analyzeImage(imageBase64: string) {
    const { GeminiProvider } = require("./gemini-provider");
    const gemini = new GeminiProvider();

    return gemini.analyzeImage(imageBase64);
  }

  async generateOutfit(
    selection: HueFitSelection,
    sourceImageBase64?: string
  ): Promise<GeneratedOutfitResult> {
    const prompt = buildOutfitPrompt(selection);

    if (!sourceImageBase64) {
      return this.failedResult(
        prompt,
        "Dataset template image was not provided"
      );
    }

    try {
      console.log("[HF] Starting image editing");
      console.log(`[HF] Model: ${HF_MODEL}`);
      console.log(`[HF] Provider: ${HF_PROVIDER}`);
      console.log(`[HF] Template: ${selection.template_id}`);
      console.log(
        `[HF] Skin tone: ${selection.skin_tone.selected_hex}`
      );
      console.log(
        `[HF] Garment colors: ${selection.color_palette.colors.join(", ")}`
      );

      const cleanBase64 = sourceImageBase64.replace(
        /^data:image\/[a-zA-Z0-9.+-]+;base64,/,
        ""
      );

      const inputImage = new Blob(
        [Buffer.from(cleanBase64, "base64")],
        { type: "image/png" }
      );

      const output = await this.client.imageToImage({
        model: HF_MODEL,
        inputs: inputImage,
        parameters: {
          prompt,
          negative_prompt: NEGATIVE_PROMPT,
          guidance_scale: 7.5,
          num_inference_steps: 30,
          target_size: {
            width: 1024,
            height: 1536,
          },
        },
        provider: HF_PROVIDER,
      });

      const outputBuffer = Buffer.from(
        await output.arrayBuffer()
      );

      const imageBase64 = outputBuffer.toString("base64");

      console.log(
        "[HF] Image generation completed successfully"
      );

      return {
        imageUrl: null,
        imageBase64: `data:image/png;base64,${imageBase64}`,
        prompt,
        status: "completed",
        resolution: "1024 × 1536",
        format: "PNG",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(
        "[HF] Image generation error:",
        error
      );

      return this.failedResult(
        prompt,
        error instanceof Error
          ? error.message
          : "Hugging Face image generation failed"
      );
    }
  }

  private failedResult(
    prompt: string,
    error: string
  ): GeneratedOutfitResult {
    return {
      imageUrl: null,
      imageBase64: null,
      prompt,
      status: "failed",
      resolution: "1024 × 1536",
      format: "PNG",
      timestamp: new Date().toISOString(),
      error,
    };
  }
}