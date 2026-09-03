import { NextRequest, NextResponse } from "next/server";
import { generateOutfitRequestSchema } from "@/lib/validation/schemas";
import { getAIProvider } from "@/lib/ai/provider";
import { getOutfitById } from "@/data/outfits";
import { getSkinTone } from "@/data/skinTones";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source_image, ...selectionData } = body;

    // Validate the selection payload
    const parsed = generateOutfitRequestSchema.safeParse(selectionData);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid selection data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const selection = parsed.data;

    // Security: validate outfit_id against server-side dataset
    const outfit = getOutfitById(selection.outfit_id);
    if (!outfit) {
      return NextResponse.json(
        { error: `Unknown outfit ID: ${selection.outfit_id}` },
        { status: 400 }
      );
    }

    // Security: validate skin tone ID
    const tone = getSkinTone(selection.skin_tone.id);
    if (!tone) {
      return NextResponse.json(
        { error: `Unknown skin tone ID: ${selection.skin_tone.id}` },
        { status: 400 }
      );
    }

    // Validate template matches outfit
    if (outfit.template !== selection.template_id) {
      return NextResponse.json(
        { error: "Template ID does not match outfit" },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.generateOutfit(selection, source_image);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[generate-outfit] Error:", err);
    return NextResponse.json(
      {
        error: "Outfit generation failed",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
