import { NextRequest, NextResponse } from "next/server";
import { colorAnalysisRequestSchema } from "@/lib/validation/schemas";
import { getAIProvider } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request
    const parsed = colorAnalysisRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { image } = parsed.data;

    // Get AI provider (demo or Gemini, determined server-side)
    const provider = getAIProvider();
    const result = await provider.analyzeImage(image);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[color-analysis] Error:", err);
    return NextResponse.json(
      {
        error: "Color analysis failed",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
