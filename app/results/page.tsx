"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/lib/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResultLeftPanel from "@/components/results/ResultLeftPanel";
import ResultCenterPanel from "@/components/results/ResultCenterPanel";
import ResultRightPanel from "@/components/results/ResultRightPanel";
import Link from "next/link";

export default function ResultsPage() {
  const router = useRouter();
  const store = useAnalysisStore();
  const selection = store.buildSelection();

  useEffect(() => {
    if (!store.selectedTone && !store.generatedResult) {
      router.replace("/analyze");
    }
  }, [store.selectedTone, store.generatedResult, router]);

  const handleRegenerate = async () => {
    if (!selection) return;
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
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Regeneration failed.");
      store.setGenerationStatus("failed");
    }
  };

  const handleTryAnother = () => { store.setStep(4); router.push("/analyze"); };
  const handleStartOver  = () => { store.reset(); router.push("/"); };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#FAF8F5" }}>
      <Header />

      {/* Fixed background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="orb w-[500px] h-[500px] -top-32 left-1/4 opacity-30"
          style={{ background: "radial-gradient(circle, rgba(196,170,145,0.28) 0%, transparent 70%)" }} />
        <div className="orb w-96 h-96 bottom-0 right-0 opacity-22"
          style={{ background: "radial-gradient(circle, rgba(180,155,170,0.2) 0%, transparent 70%)" }} />
      </div>

      <main className="flex-1 relative z-10 pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Page header */}
          <div className="mb-10 flex items-start justify-between gap-4">
            <div>
              <Link
                href="/analyze"
                onClick={() => store.setStep(5)}
                className="inline-flex items-center gap-1.5 text-xs mb-3 transition-colors"
                style={{ color: "#8A837C" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 10L4 6L8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Analysis
              </Link>
              <h1
                className="font-serif italic font-light"
                style={{ fontSize: "clamp(28px,5vw,48px)", color: "#1A1612", lineHeight: 1.1 }}
              >
                Your Signature Look.
              </h1>
              {store.selectedOutfit && (
                <p className="text-sm mt-2" style={{ color: "#6B6460" }}>
                  {store.selectedOutfit.name}
                  <span style={{ color: "#B0A89E", marginLeft: 8 }}>·</span>
                  <span className="ml-2 capitalize" style={{ color: "#8A837C" }}>
                    {store.selectedOutfit.category}
                  </span>
                </p>
              )}
            </div>
          </div>

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

          {/* 3-column editorial layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-8 items-start">

            {/* LEFT — Metadata panel */}
            <div
              className="order-2 lg:order-1 rounded-3xl p-6"
              style={{
                background: "rgba(255,255,255,0.52)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.44)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <ResultLeftPanel selection={selection} />
            </div>

            {/* CENTER — Mannequin image (dominant) */}
            <div className="order-1 lg:order-2">
              <ResultCenterPanel
                selection={selection}
                generatedResult={store.generatedResult}
                generationStatus={store.generationStatus}
                onRegenerate={handleRegenerate}
              />
            </div>

            {/* RIGHT — Actions panel */}
            <div
              className="order-3 rounded-3xl p-6"
              style={{
                background: "rgba(255,255,255,0.52)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.44)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <ResultRightPanel
                generatedResult={store.generatedResult}
                generationStatus={store.generationStatus}
                outfitId={store.selectedOutfit?.id ?? ""}
                paletteId={store.selectedPalette?.id ?? "custom"}
                onTryAnother={handleTryAnother}
                onStartOver={handleStartOver}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
