import { AIProvider } from "./provider";

import {
  ColorAnalysisResult,
  GeneratedOutfitResult,
  HueFitSelection,
  SkinToneId,
} from "@/types";

import { buildOutfitPrompt } from "./buildOutfitPrompt";

// ============================================================
// Current Gemini models
// ============================================================

// General multimodal model used for skin-tone analysis.
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash-lite:generateContent";

// Native Gemini image generation/editing model.
const GEMINI_IMAGE_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash-image:generateContent";

export class GeminiProvider implements AIProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";

    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
  }

  // ============================================================
  // Skin tone analysis
  // ============================================================

  async analyzeImage(
    imageBase64: string
  ): Promise<ColorAnalysisResult> {
    const cleanBase64 = imageBase64.replace(
      /^data:image\/[a-zA-Z0-9.+-]+;base64,/,
      ""
    );

    const prompt = `Analyze the skin tone of the person in this image.

You must classify it into EXACTLY one of these 6 categories:

1. TONE_01 - Very Light
   HEX range: #F7E7D3 to #E8C19F

2. TONE_02 - Light
   HEX range: #E8C09E to #CC9870

3. TONE_03 - Light Medium
   HEX range: #C98F6B to #AE6D4D

4. TONE_04 - Medium
   HEX range: #A96B4A to #8A5138

5. TONE_05 - Deep
   HEX range: #7E4933 to #603326

6. TONE_06 - Very Deep
   HEX range: #542C20 to #3A1C16

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
      const response = await fetch(
        `${GEMINI_API_URL}?key=${this.apiKey}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                  {
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: cleanBase64,
                    },
                  },
                ],
              },
            ],

            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 500,
            },
          }),
        }
      );

      if (!response.ok) {
        let message =
          `Gemini API error: ${response.status}`;

        try {
          const errorData =
            await response.json();

          console.error(
            "[Gemini] Skin analysis API error:",
            errorData
          );

          if (errorData?.error?.message) {
            message =
              `Gemini API error: ${errorData.error.message}`;
          }
        } catch {
          // Ignore JSON parsing failure.
        }

        throw new Error(message);
      }

      const data = await response.json();

      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "";

      // Extract JSON from Gemini response.
      const jsonMatch =
        text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error(
          "Could not parse AI response"
        );
      }

      const result =
        JSON.parse(jsonMatch[0]);

      // Validate tone ID.
      const validTones: SkinToneId[] = [
        "TONE_01",
        "TONE_02",
        "TONE_03",
        "TONE_04",
        "TONE_05",
        "TONE_06",
      ];

      if (!validTones.includes(result.toneId)) {
        result.toneId = "TONE_03";
        result.label = "Light Medium";
      }

      return result as ColorAnalysisResult;

    } catch (error) {
      console.error(
        "Gemini analysis error:",
        error
      );

      // Fallback to demo analysis.
      const { DemoProvider } =
        require("./demo-provider");

      const demo =
        new DemoProvider();

      const result =
        await demo.analyzeImage(
          imageBase64
        );

      result.notes =
        "AI analysis encountered an error. Showing estimated result. Please manually select your skin tone.";

      result.confidence = 0.5;

      return result;
    }
  }

  // ============================================================
  // Dataset-based outfit generation
  // ============================================================

  async generateOutfit(
    selection: HueFitSelection,
    sourceImageBase64?: string
  ): Promise<GeneratedOutfitResult> {

    const prompt =
      buildOutfitPrompt(selection);

    try {

      // --------------------------------------------------------
      // Dataset image is mandatory.
      // The user's uploaded photo is NOT used here.
      // --------------------------------------------------------

      if (!sourceImageBase64) {
        throw new Error(
          "Dataset template image was not provided"
        );
      }

      // --------------------------------------------------------
      // Detect MIME type from the dataset data URL.
      // Our HueFit dataset images are PNG.
      // --------------------------------------------------------

      const mimeMatch =
        sourceImageBase64.match(
          /^data:(image\/[a-zA-Z0-9.+-]+);base64,/
        );

      const mimeType =
        mimeMatch?.[1] || "image/png";

      const cleanBase64 =
        sourceImageBase64.replace(
          /^data:image\/[a-zA-Z0-9.+-]+;base64,/,
          ""
        );

      console.log(
        "[Gemini] Starting dataset-based outfit generation"
      );

      console.log(
        `[Gemini] Template: ${selection.template_id}`
      );

      console.log(
        `[Gemini] Image MIME type: ${mimeType}`
      );

      console.log(
        "[Gemini] Sending dataset image + color instructions to Gemini"
      );

      // --------------------------------------------------------
      // Gemini receives:
      //
      // 1. Our strict editing prompt
      // 2. The selected HueFit dataset image
      //
      // The dataset image is the visual source.
      // --------------------------------------------------------

      const parts = [
        {
          text: prompt,
        },
        {
          inline_data: {
            mime_type: mimeType,
            data: cleanBase64,
          },
        },
      ];

      const response =
        await fetch(
          `${GEMINI_IMAGE_API_URL}?key=${this.apiKey}`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              contents: [
                {
                  parts,
                },
              ],

              generationConfig: {
                responseModalities: [
                  "TEXT",
                  "IMAGE",
                ],

                // Do NOT force aspect ratio or image size here.
                // Gemini will use the supplied dataset image
                // dimensions as the visual reference.

                temperature: 0.4,

                maxOutputTokens: 8192,
              },
            }),
          }
        );

      // --------------------------------------------------------
      // Handle Gemini API errors
      // --------------------------------------------------------

      if (!response.ok) {

        let errorMessage =
          `Gemini image generation error: ${response.status}`;

        try {

          const errorData =
            await response.json();

          console.error(
            "[Gemini] Image generation API error:",
            errorData
          );

          const apiMessage =
            errorData?.error?.message;

          if (apiMessage) {
            errorMessage =
              `Gemini image generation error: ${apiMessage}`;
          }

        } catch {
          // Ignore JSON parsing failure.
        }

        throw new Error(
          errorMessage
        );
      }

      // --------------------------------------------------------
      // Parse Gemini response
      // --------------------------------------------------------

      const data =
        await response.json();

      console.log(
        "[Gemini] Response received"
      );

      const candidateParts =
        data.candidates?.[0]?.content?.parts ||
        [];

      let imageBase64:
        string | null = null;

      let outputMimeType =
        "image/png";

      let textResponse =
        "";

      // --------------------------------------------------------
      // Find generated image
      // --------------------------------------------------------

      for (
        const part of candidateParts
      ) {

        if (
          part.inline_data?.data
        ) {

          imageBase64 =
            part.inline_data.data;

          outputMimeType =
            part.inline_data.mime_type ||
            "image/png";
        }

        if (part.text) {
          textResponse =
            part.text;
        }
      }

      // Keep this log useful during testing.
      if (textResponse) {
        console.log(
          "[Gemini] Text response:",
          textResponse
        );
      }

      // --------------------------------------------------------
      // Gemini returned no image
      // --------------------------------------------------------

      if (!imageBase64) {

        console.error(
          "[Gemini] No image found in response:",
          JSON.stringify(
            data,
            null,
            2
          )
        );

        throw new Error(
          "Gemini returned no generated image"
        );
      }

      console.log(
        "[Gemini] Generated image received successfully"
      );

      // --------------------------------------------------------
      // Return HueFit result
      // --------------------------------------------------------

      return {

        imageUrl: null,

        imageBase64:
          `data:${outputMimeType};base64,${imageBase64}`,

        prompt,

        status: "completed",

        resolution:
          "1024 × 1536",

        format:
          outputMimeType
            .split("/")
            .pop()
            ?.toUpperCase() ||
          "PNG",

        timestamp:
          new Date().toISOString(),
      };

    } catch (error) {

      console.error(
        "Gemini generation error:",
        error
      );

      return {

        imageUrl: null,

        imageBase64: null,

        prompt,

        status: "failed",

        resolution:
          "1024 × 1536",

        format: "PNG",

        timestamp:
          new Date().toISOString(),

        error:
          error instanceof Error
            ? error.message
            : "Generation failed",
      };
    }
  }
}