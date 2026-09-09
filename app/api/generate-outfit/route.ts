import { NextRequest, NextResponse } from "next/server";
import { generateOutfitRequestSchema } from "@/lib/validation/schemas";
import { getOutfitById } from "@/data/outfits";
import { getSkinTone } from "@/data/skinTones";
import { getAIProvider } from "@/lib/ai/provider";
import fs from "fs/promises";
import path from "path";

// ============================================================
// HueFit dataset mapping
// ============================================================

const DATASET_FILES: Record<string, string> = {
  // -------------------------
  // Male
  // -------------------------
  formal_m01: "formal_1.png",
  formal_m02: "formal_2.png",
  formal_m03: "formal_3.png",

  casual_m01: "casual_1.png",
  casual_m02: "casual_2.png",
  casual_m03: "casual_3.png",

  ethnic_m01: "ethinic_1.png",
  ethnic_m02: "ethinic_2.png",
  ethnic_m03: "ethinic_3.png",

  party_m01: "party_1.png",
  party_m02: "party_2.png",
  party_m03: "party_3.png",

  suit_m01: "suit_1.png",
  suit_m02: "suit_2.png",
  suit_m03: "suit_3.png",

  // -------------------------
  // Female
  // -------------------------
  formal_f01: "formalfemale_1.png",
  formal_f02: "formalfemale_2.png",
  formal_f03: "formalfemale_3.png",

  casual_f01: "casualfemale_1.png",
  casual_f02: "casualfemale_2.png",
  casual_f03: "casualfemale_3.png",

  ethnic_f01: "ethinicfemale_1.png",
  ethnic_f02: "ethinicfemale_2.png",
  ethnic_f03: "ethinicfemale_3.png",

  party_f01: "partyfemale_1.png",
  party_f02: "partyfemale_2.png",
  party_f03: "partyfemale_3.png",

  suit_f01: "suitfemale_1.png",
  suit_f02: "suitfemale_2.png",
  suit_f03: "suitfemale_3.png",
};

// ============================================================
// Read dataset image and convert it to a Gemini-compatible
// base64 data URL.
// ============================================================

async function loadDatasetImage(
  templateId: string,
  gender: "male" | "female"
): Promise<string> {
  const filename = DATASET_FILES[templateId];

  if (!filename) {
    throw new Error(
      `No dataset image mapped for template: ${templateId}`
    );
  }

  const genderFolder =
    gender === "male" ? "male" : "female";

  const imagePath = path.join(
    process.cwd(),
    "public",
    "huefit-dataset",
    genderFolder,
    filename
  );

  const imageBuffer = await fs.readFile(imagePath);

  if (imageBuffer.length === 0) {
    throw new Error(
      `Dataset image is empty: ${filename}`
    );
  }

  return `data:image/png;base64,${imageBuffer.toString(
    "base64"
  )}`;
}

// ============================================================
// POST /api/generate-outfit
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // The uploaded source image is intentionally ignored here.
    // It is used only during skin-tone analysis.
    const { source_image: _sourceImage, ...selectionData } =
      body;

    // ========================================================
    // Validate selection
    // ========================================================

    const parsed =
      generateOutfitRequestSchema.safeParse(selectionData);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid selection data",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const selection = parsed.data;

    // ========================================================
    // Validate outfit
    // ========================================================

    const outfit = getOutfitById(selection.outfit_id);

    if (!outfit) {
      return NextResponse.json(
        {
          error: `Unknown outfit ID: ${selection.outfit_id}`,
        },
        { status: 400 }
      );
    }

    // ========================================================
    // Validate skin tone
    // ========================================================

    const tone = getSkinTone(selection.skin_tone.id);

    if (!tone) {
      return NextResponse.json(
        {
          error: `Unknown skin tone ID: ${selection.skin_tone.id}`,
        },
        { status: 400 }
      );
    }

    // ========================================================
    // Validate template
    // ========================================================

    if (outfit.template !== selection.template_id) {
      return NextResponse.json(
        {
          error: "Template ID does not match outfit",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // Validate colors
    // ========================================================

    if (
      !selection.color_palette.colors ||
      selection.color_palette.colors.length === 0
    ) {
      return NextResponse.json(
        {
          error: "No garment colors selected",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // Load the FIXED HueFit dataset template
    // ========================================================

    console.log(
      "[generate-outfit] Loading HueFit dataset template"
    );

    console.log(
      `[generate-outfit] Template: ${selection.template_id}`
    );

    console.log(
      `[generate-outfit] Gender: ${selection.gender}`
    );

    const datasetImageBase64 =
      await loadDatasetImage(
        selection.template_id,
        selection.gender
      );

    console.log(
      "[generate-outfit] Dataset image loaded successfully"
    );

    // ========================================================
    // Use the existing AI provider
    // ========================================================

    const provider = getAIProvider();

    console.log(
      "[generate-outfit] Sending dataset image to AI provider"
    );

    const result =
      await provider.generateOutfit(
        selection,
        datasetImageBase64
      );

    console.log(
      "[generate-outfit] Outfit generation completed"
    );

    // ========================================================
    // Return the existing HueFit result format
    // ========================================================

    return NextResponse.json(result);

  } catch (err) {
    console.error(
      "[generate-outfit] Error:",
      err
    );

    return NextResponse.json(
      {
        error: "Outfit generation failed",
        message:
          err instanceof Error
            ? err.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}