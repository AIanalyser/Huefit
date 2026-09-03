// ============================================
// HUEFIT — Type Definitions
// ============================================

export type SkinToneId =
  | "TONE_01"
  | "TONE_02"
  | "TONE_03"
  | "TONE_04"
  | "TONE_05"
  | "TONE_06";

export type Gender = "male" | "female";

export type OutfitCategory =
  | "formal"
  | "casual"
  | "ethnic"
  | "party"
  | "suits";

export type PaletteSetId = "soft-natural" | "vibrant-rich";

export type GenerationStatus = "idle" | "pending" | "analyzing" | "generating" | "completed" | "failed";

export type AnalysisStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface SkinTone {
  id: SkinToneId;
  label: string;
  hex: string[];
}

export interface Outfit {
  id: string;
  gender: Gender;
  category: OutfitCategory;
  name: string;
  dressType: string;
  template: string;
}

export interface ColorPalette {
  id: string;
  toneId: SkinToneId;
  setId: PaletteSetId;
  name: string;
  description: string;
  colors: string[];
}

export interface ColorAnalysisResult {
  toneId: SkinToneId;
  label: string;
  selectedHex: string;
  confidence: number;
  undertone: "warm" | "cool" | "neutral";
  lighting: "natural" | "artificial" | "mixed" | "poor";
  notes: string;
}

export interface GarmentRegionMapping {
  template: string;
  regions: {
    name: string;
    label: string;
    colorIndex: number;
  }[];
}

export interface HueFitSelection {
  skin_tone: {
    id: SkinToneId;
    label: string;
    selected_hex: string;
    available_hex: string[];
  };
  gender: Gender;
  category: OutfitCategory;
  outfit_id: string;
  outfit_name: string;
  color_palette: {
    id: string;
    colors: string[];
  };
  template_id: string;
}

export interface GeneratedOutfitResult {
  imageUrl: string | null;
  imageBase64: string | null;
  prompt: string;
  status: GenerationStatus;
  resolution: string;
  format: string;
  timestamp: string;
  error?: string;
}

export interface AnalysisState {
  // Current step
  currentStep: AnalysisStep;
  
  // Step 1: Photo
  uploadedImage: string | null;
  uploadedFile: File | null;
  
  // Step 2: Skin Tone
  analysisResult: ColorAnalysisResult | null;
  selectedTone: SkinTone | null;
  
  // Step 3: Gender
  selectedGender: Gender | null;
  
  // Step 4: Outfit
  selectedCategory: OutfitCategory | null;
  selectedOutfit: Outfit | null;
  
  // Step 5: Colors
  selectedPalette: ColorPalette | null;
  selectedColors: string[];
  colorMode: "palette" | "mixmatch";
  
  // Step 6: Result
  generationStatus: GenerationStatus;
  generatedResult: GeneratedOutfitResult | null;
  
  // Error
  error: string | null;
  
  // Actions
  setStep: (step: AnalysisStep) => void;
  setUploadedImage: (image: string | null, file: File | null) => void;
  setAnalysisResult: (result: ColorAnalysisResult | null) => void;
  setSelectedTone: (tone: SkinTone | null) => void;
  setSelectedGender: (gender: Gender | null) => void;
  setSelectedCategory: (category: OutfitCategory | null) => void;
  setSelectedOutfit: (outfit: Outfit | null) => void;
  setSelectedPalette: (palette: ColorPalette | null) => void;
  setSelectedColors: (colors: string[]) => void;
  setColorMode: (mode: "palette" | "mixmatch") => void;
  setGenerationStatus: (status: GenerationStatus) => void;
  setGeneratedResult: (result: GeneratedOutfitResult | null) => void;
  setError: (error: string | null) => void;
  buildSelection: () => HueFitSelection | null;
  reset: () => void;
}
