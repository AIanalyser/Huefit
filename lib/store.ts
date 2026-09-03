import { create } from "zustand";
import { AnalysisState, AnalysisStep, ColorAnalysisResult, SkinTone, Gender, OutfitCategory, Outfit, ColorPalette, GenerationStatus, GeneratedOutfitResult, HueFitSelection } from "@/types";

const initialState = {
  currentStep: 1 as AnalysisStep,
  uploadedImage: null,
  uploadedFile: null,
  analysisResult: null,
  selectedTone: null,
  selectedGender: null,
  selectedCategory: null,
  selectedOutfit: null,
  selectedPalette: null,
  selectedColors: [] as string[],
  colorMode: "palette" as const,
  generationStatus: "idle" as GenerationStatus,
  generatedResult: null,
  error: null,
};

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  ...initialState,

  setStep: (step: AnalysisStep) => set({ currentStep: step }),
  setUploadedImage: (image: string | null, file: File | null) => set({ uploadedImage: image, uploadedFile: file }),
  setAnalysisResult: (result: ColorAnalysisResult | null) => set({ analysisResult: result }),
  setSelectedTone: (tone: SkinTone | null) => set({ selectedTone: tone }),
  setSelectedGender: (gender: Gender | null) => set({ selectedGender: gender, selectedCategory: null, selectedOutfit: null }),
  setSelectedCategory: (category: OutfitCategory | null) => set({ selectedCategory: category, selectedOutfit: null }),
  setSelectedOutfit: (outfit: Outfit | null) => set({ selectedOutfit: outfit }),
  setSelectedPalette: (palette: ColorPalette | null) => set({ selectedPalette: palette, selectedColors: palette ? palette.colors.slice(0, 5) : [], colorMode: "palette" }),
  setSelectedColors: (colors: string[]) => set({ selectedColors: colors }),
  setColorMode: (mode: "palette" | "mixmatch") => set({ colorMode: mode }),
  setGenerationStatus: (status: GenerationStatus) => set({ generationStatus: status }),
  setGeneratedResult: (result: GeneratedOutfitResult | null) => set({ generatedResult: result }),
  setError: (error: string | null) => set({ error }),

  buildSelection: (): HueFitSelection | null => {
    const state = get();
    if (!state.selectedTone || !state.selectedGender || !state.selectedCategory || !state.selectedOutfit || state.selectedColors.length === 0) {
      return null;
    }
    return {
      skin_tone: {
        id: state.selectedTone.id,
        label: state.selectedTone.label,
        selected_hex: state.selectedTone.hex[0],
        available_hex: state.selectedTone.hex,
      },
      gender: state.selectedGender,
      category: state.selectedCategory,
      outfit_id: state.selectedOutfit.id,
      outfit_name: state.selectedOutfit.name,
      color_palette: {
        id: state.selectedPalette?.id || "custom",
        colors: state.selectedColors,
      },
      template_id: state.selectedOutfit.template,
    };
  },

  reset: () => set({ ...initialState }),
}));
