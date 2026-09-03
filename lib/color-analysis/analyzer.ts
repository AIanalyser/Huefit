import { SkinToneId, ColorAnalysisResult } from "@/types";
import { skinTones } from "@/data/skinTones";

// Calculate color distance between two hex colors
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 0, g: 0, b: 0 };
}

function colorDistance(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

export function mapToSkinTone(detectedHex: string): { toneId: SkinToneId; confidence: number } {
  let bestMatch: SkinToneId = "TONE_03";
  let bestDistance = Infinity;

  for (const tone of skinTones) {
    for (const hex of tone.hex) {
      const distance = colorDistance(detectedHex, hex);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestMatch = tone.id;
      }
    }
  }

  // Normalize confidence: 0 distance = 1.0, 200+ distance = 0.5
  const confidence = Math.max(0.5, 1.0 - (bestDistance / 400));

  return { toneId: bestMatch, confidence };
}

export function analyzeLighting(imageData: string): "natural" | "artificial" | "mixed" | "poor" {
  // Basic heuristic based on image data characteristics
  // In production, this would use actual image analysis
  return "natural";
}

export function calculateConfidence(distance: number): number {
  return Math.max(0.5, 1.0 - (distance / 400));
}
