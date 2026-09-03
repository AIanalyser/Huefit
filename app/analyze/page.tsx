"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/lib/store";
import { compressImage } from "@/lib/utils/helpers";
import { getOutfits } from "@/data/outfits";
import { getSkinTone } from "@/data/skinTones";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProgressSteps from "@/components/analysis/ProgressSteps";
import StepNavigation from "@/components/analysis/StepNavigation";
import PhotoUploader from "@/components/upload/PhotoUploader";
import SkinToneSelector from "@/components/skin-tone/SkinToneSelector";
import GenderSelector from "@/components/outfit/GenderSelector";
import CategorySelector from "@/components/outfit/CategorySelector";
import OutfitGrid from "@/components/outfit/OutfitGrid";
import PaletteSelector from "@/components/palette/PaletteSelector";
import LoadingState from "@/components/ui/LoadingState";

type UploadPath = "upload" | "manual" | null;

export default function AnalyzePage() {
  const router = useRouter();
  const store = useAnalysisStore();
  const [uploadPath, setUploadPath] = useState<UploadPath>(null);

  // ── Step 1: Photo Upload handlers ──────────────────────────────
  const handleImageUpload = (dataUrl: string, file: File) => {
    store.setUploadedImage(dataUrl, file);
    store.setError(null);
  };
  const handleRemoveImage = () => {
    store.setUploadedImage(null, null);
    store.setAnalysisResult(null);
  };

  const handleAnalyzePhoto = async () => {
    if (!store.uploadedImage) return;
    store.setGenerationStatus("analyzing");
    store.setError(null);
    try {
      const compressed = store.uploadedFile
        ? await compressImage(store.uploadedFile)
        : store.uploadedImage;
      const res = await fetch("/api/color-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: compressed }),
      });
      if (!res.ok) throw new Error(`Analysis failed: ${res.status}`);
      const data = await res.json();
      store.setAnalysisResult(data);
      const detectedTone = getSkinTone(data.toneId);
      if (detectedTone) store.setSelectedTone(detectedTone);
      store.setGenerationStatus("idle");
      store.setStep(2);
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      store.setGenerationStatus("idle");
    }
  };

  const handleManualPath = () => {
    setUploadPath("manual");
    store.setAnalysisResult(null);
    store.setStep(2);
  };

  const goNext = () => { if (store.currentStep < 6) store.setStep((store.currentStep + 1) as any); };
  const goBack = () => {
    if (store.currentStep > 1) store.setStep((store.currentStep - 1) as any);
    else { setUploadPath(null); store.setStep(1 as any); }
  };

  const handleToggleColor = useCallback((color: string) => {
    const current = store.selectedColors;
    if (current.includes(color)) {
      store.setSelectedColors(current.filter((c) => c !== color));
      store.setColorMode("mixmatch");
    } else if (current.length < 5) {
      store.setSelectedColors([...current, color]);
      store.setColorMode("mixmatch");
    }
  }, [store]);

  const handleGenerate = async () => {
    const selection = store.buildSelection();
    if (!selection) { store.setError("Please complete all selections before generating."); return; }
    store.setGenerationStatus("generating");
    store.setError(null);
    try {
      const body: Record<string, unknown> = { ...selection };
      if (store.uploadedImage) body.source_image = store.uploadedImage;
      const res = await fetch("/api/generate-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Generation failed: ${res.status}`);
      const data = await res.json();
      store.setGeneratedResult(data);
      store.setGenerationStatus(data.status ?? "completed");
      router.push("/results");
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Generation failed.");
      store.setGenerationStatus("failed");
    }
  };

  const isAnalyzing = store.generationStatus === "analyzing";
  const isGenerating = store.generationStatus === "generating";
  const filteredOutfits = store.selectedGender && store.selectedCategory
    ? getOutfits(store.selectedGender, store.selectedCategory) : [];

  const stepCanContinue: Record<number, boolean> = {
    1: !!store.uploadedImage, 2: !!store.selectedTone,
    3: !!store.selectedGender, 4: !!store.selectedOutfit,
    5: store.selectedColors.length >= 1, 6: false,
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#FAF8F5" }}>
      <Header />

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="orb w-96 h-96 -top-24 -right-24 opacity-35"
          style={{ background: "radial-gradient(circle, rgba(196,170,145,0.3) 0%, transparent 70%)" }} />
        <div className="orb w-80 h-80 bottom-0 -left-20 opacity-25"
          style={{ background: "radial-gradient(circle, rgba(180,155,170,0.22) 0%, transparent 70%)" }} />
      </div>

      <main className="flex-1 relative z-10 pt-28 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">

          {/* Progress pill */}
          <div
            className="mb-8 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.52)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.42)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <ProgressSteps currentStep={store.currentStep} />
          </div>

          {/* Step card */}
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.56)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.46)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
            }}
          >
            {/* Global error */}
            {store.error && (
              <div
                className="mb-6 px-4 py-3 rounded-2xl text-sm animate-fade-in"
                style={{
                  background: "rgba(155,58,58,0.07)",
                  border: "1px solid rgba(155,58,58,0.16)",
                  color: "#9B3A3A",
                }}
              >
                {store.error}
              </div>
            )}

            {/* ── Step 1: Path chooser OR Upload UI ── */}
            {store.currentStep === 1 && (
              <>
                {/* Path chooser */}
                {!uploadPath && !store.uploadedImage && (
                  <div className="animate-fade-up">
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A837C", letterSpacing: "0.1em" }}>
                      Step 01 — Tone
                    </p>
                    <h2
                      className="font-serif italic font-light mb-1"
                      style={{ fontSize: "clamp(28px,5vw,42px)", color: "#1A1612" }}
                    >
                      How would you like to begin?
                    </h2>
                    <p className="text-sm mb-8" style={{ color: "#6B6460" }}>
                      Upload a photo for AI colour detection, or choose your tone manually.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Upload */}
                      <button
                        onClick={() => setUploadPath("upload")}
                        className="card-select text-left p-6 rounded-2xl"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                          style={{ background: "#1A1612" }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 11V4M5 7L8 4L11 7M2 13H14" stroke="#FAF8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-sm font-semibold mb-1" style={{ color: "#1A1612" }}>Upload Photo</p>
                        <p className="text-xs leading-relaxed" style={{ color: "#8A837C" }}>
                          AI analyses your selfie for the most precise colour match.
                        </p>
                        <span className="block mt-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#7C6A5A", letterSpacing: "0.1em" }}>
                          Recommended
                        </span>
                      </button>

                      {/* Manual */}
                      <button
                        onClick={handleManualPath}
                        className="card-select text-left p-6 rounded-2xl"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                          style={{ background: "rgba(120,100,80,0.1)", border: "1px solid rgba(120,100,80,0.18)" }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="5" stroke="#7C6A5A" strokeWidth="1.5"/>
                            <circle cx="8" cy="8" r="2" fill="#7C6A5A"/>
                          </svg>
                        </div>
                        <p className="text-sm font-semibold mb-1" style={{ color: "#1A1612" }}>Select Manually</p>
                        <p className="text-xs leading-relaxed" style={{ color: "#8A837C" }}>
                          Choose from six calibrated skin-tone options.
                        </p>
                        <span className="block mt-3 text-[10px] font-medium" style={{ color: "#8A837C" }}>
                          Quick start
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload UI */}
                {uploadPath === "upload" && (
                  <>
                    <PhotoUploader
                      uploadedImage={store.uploadedImage}
                      onImageUpload={handleImageUpload}
                      onRemoveImage={handleRemoveImage}
                    />
                    {isAnalyzing && <LoadingState message="Analysing your photo…" />}
                    <StepNavigation
                      showBack
                      onBack={() => { setUploadPath(null); store.setError(null); }}
                      backLabel="Change"
                      onContinue={store.uploadedImage ? handleAnalyzePhoto : undefined}
                      showContinue={!!store.uploadedImage}
                      continueLabel="Analyse My Colours"
                      isLoading={isAnalyzing}
                      canContinue={!!store.uploadedImage && !isAnalyzing}
                    />
                  </>
                )}
              </>
            )}

            {/* ── Step 2: Skin Tone ── */}
            {store.currentStep === 2 && (
              <>
                <SkinToneSelector
                  analysisResult={store.analysisResult}
                  selectedTone={store.selectedTone}
                  onSelectTone={(tone) => { store.setSelectedTone(tone); store.setError(null); }}
                />
                <StepNavigation onBack={goBack} onContinue={goNext} canContinue={stepCanContinue[2]} />
              </>
            )}

            {/* ── Step 3: Gender ── */}
            {store.currentStep === 3 && (
              <>
                <GenderSelector
                  selectedGender={store.selectedGender}
                  onSelectGender={(g) => { store.setSelectedGender(g); store.setError(null); }}
                />
                <StepNavigation onBack={goBack} onContinue={goNext} canContinue={stepCanContinue[3]} />
              </>
            )}

            {/* ── Step 4: Category + Outfit ── */}
            {store.currentStep === 4 && (
              <>
                <div className="space-y-8">
                  <CategorySelector
                    selectedCategory={store.selectedCategory}
                    onSelectCategory={(cat) => { store.setSelectedCategory(cat); store.setSelectedOutfit(null); store.setError(null); }}
                  />
                  {store.selectedCategory && (
                    <>
                      <div className="divider" />
                      <OutfitGrid
                        outfits={filteredOutfits}
                        selectedOutfit={store.selectedOutfit}
                        onSelectOutfit={(outfit) => { store.setSelectedOutfit(outfit); store.setError(null); }}
                      />
                    </>
                  )}
                </div>
                <StepNavigation onBack={goBack} onContinue={goNext} canContinue={stepCanContinue[4]} />
              </>
            )}

            {/* ── Step 5: Palette ── */}
            {store.currentStep === 5 && store.selectedTone && (
              <>
                <PaletteSelector
                  toneId={store.selectedTone.id}
                  selectedPalette={store.selectedPalette}
                  selectedColors={store.selectedColors}
                  colorMode={store.colorMode}
                  onSelectPalette={(p) => { store.setSelectedPalette(p); store.setError(null); }}
                  onToggleColor={handleToggleColor}
                  onClearColors={() => store.setSelectedColors([])}
                  onSetColorMode={store.setColorMode}
                />
                <StepNavigation
                  onBack={goBack}
                  onContinue={handleGenerate}
                  continueLabel="Generate My Look"
                  canContinue={stepCanContinue[5] && !isGenerating}
                  isLoading={isGenerating}
                />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
