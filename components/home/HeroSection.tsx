import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Eye } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                AI-Powered Styling
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-[1.1] mb-6">
              Find Your Perfect Colors.{" "}
              <span className="gradient-text">Build Your Perfect Outfit.</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed max-w-lg mb-8">
              AI-powered personal color analysis and outfit recommendations
              based on your skin tone. Discover what looks best on you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
              >
                Start Color Analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#palettes-preview"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border px-7 py-3.5 text-sm font-semibold text-text-primary hover:border-primary/30 hover:bg-surface transition-all"
              >
                <Palette className="h-4 w-4" />
                Explore Color Palettes
              </a>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="relative bg-surface rounded-3xl p-8 border border-border shadow-xl shadow-black/5">
              {/* Simulated analysis card */}
              <div className="space-y-6">
                {/* Skin tone preview row */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-4 w-4 text-accent" />
                    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Skin Tone Analysis
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {["#F7E7D3", "#E8C09E", "#C98F6B", "#A96B4A", "#7E4933", "#542C20"].map(
                      (color, i) => (
                        <div
                          key={color}
                          className="animate-swatch-pop rounded-xl shadow-sm border border-white/50 flex-1 aspect-square"
                          style={{
                            backgroundColor: color,
                            animationDelay: `${i * 0.08}s`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Outfit preview */}
                <div className="bg-white rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Recommended Palette
                    </span>
                    <span className="text-[10px] font-medium text-success bg-success-light px-2 py-0.5 rounded-full">
                      92% Match
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {["#D4A574", "#C4956A", "#B8845B", "#8FBC8F", "#6B8E6B",
                      "#A87550", "#8B6B4A", "#4A6741", "#556B2F", "#2F4538"].map(
                      (color, i) => (
                        <div
                          key={`${color}-${i}`}
                          className="rounded-lg aspect-square animate-swatch-pop"
                          style={{
                            backgroundColor: color,
                            animationDelay: `${0.4 + i * 0.05}s`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Mini outfit cards */}
                <div className="grid grid-cols-3 gap-2">
                  {["Formal", "Casual", "Ethnic"].map((label, i) => (
                    <div
                      key={label}
                      className={`rounded-xl p-3 text-center border transition-all ${
                        i === 1
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border bg-white"
                      }`}
                    >
                      <div className="text-lg mb-1">
                        {i === 0 ? "👔" : i === 1 ? "👕" : "🪷"}
                      </div>
                      <span className="text-[11px] font-medium text-text-primary">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center animate-float">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
