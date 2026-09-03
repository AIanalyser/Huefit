import { z } from "zod";

export const skinToneIdSchema = z.enum(["TONE_01", "TONE_02", "TONE_03", "TONE_04", "TONE_05", "TONE_06"]);

export const genderSchema = z.enum(["male", "female"]);

export const outfitCategorySchema = z.enum(["formal", "casual", "ethnic", "party", "suits"]);

export const hexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid HEX color");

export const colorAnalysisRequestSchema = z.object({
  image: z.string().min(1, "Image data is required"),
});

export const generateOutfitRequestSchema = z.object({
  skin_tone: z.object({
    id: skinToneIdSchema,
    label: z.string(),
    selected_hex: hexColorSchema,
    available_hex: z.array(hexColorSchema).length(4),
  }),
  gender: genderSchema,
  category: outfitCategorySchema,
  outfit_id: z.string().min(1),
  outfit_name: z.string().min(1),
  color_palette: z.object({
    id: z.string().min(1),
    colors: z.array(hexColorSchema).min(1).max(10),
  }),
  template_id: z.string().min(1),
});

export const imageUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((f) => f.size <= 10 * 1024 * 1024, "File size must be less than 10MB")
    .refine(
      (f) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type),
      "File must be JPG, JPEG, PNG, or WEBP"
    ),
});
