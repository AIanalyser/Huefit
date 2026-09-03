import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ── How It Works ──────────────────────────────────────
const steps = [
  {
    num: "01",
    label: "Skin Tone",
    desc: "Upload a selfie or choose your skin tone from six calibrated options.",
  },
  {
    num: "02",
    label: "Style",
    desc: "Select your gender and the type of outfit you're looking for.",
  },
  {
    num: "03",
    label: "Palette",
    desc: "Pick a curated colour palette or mix and match your own combination.",
  },
  {
    num: "04",
    label: "Your Look",
    desc: "AI renders a realistic fashion mannequin wearing your chosen outfit and colours.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: "#FAF8F5" }}>
      <Header />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">
          {/* Background orbs */}
          <div
            className="orb w-[560px] h-[560px] -top-32 -left-32 opacity-40"
            style={{ background: "radial-gradient(circle, rgba(196,170,145,0.35) 0%, transparent 70%)" }}
          />
          <div
            className="orb w-[480px] h-[480px] top-1/4 right-0 opacity-30"
            style={{ background: "radial-gradient(circle, rgba(180,155,170,0.28) 0%, transparent 70%)" }}
          />
          <div
            className="orb w-[400px] h-[400px] bottom-0 left-1/3 opacity-25"
            style={{ background: "radial-gradient(circle, rgba(210,190,160,0.3) 0%, transparent 70%)" }}
          />

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-medium tracking-widest uppercase animate-fade-up"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "#7C6A5A",
                letterSpacing: "0.1em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-soft-pulse"
                style={{ background: "#7C6A5A" }}
              />
              AI Personal Colour Studio
            </div>

            {/* Headline — serif + sans split */}
            <h1 className="mb-6 animate-fade-up delay-1" style={{ opacity: 0 }}>
              <span
                className="block font-serif italic font-light leading-none"
                style={{
                  fontSize: "clamp(56px, 10vw, 100px)",
                  color: "#1A1612",
                  letterSpacing: "-0.01em",
                }}
              >
                Discover
              </span>
              <span
                className="block font-sans font-semibold leading-tight"
                style={{
                  fontSize: "clamp(22px, 4vw, 38px)",
                  color: "#4A4540",
                  letterSpacing: "0.02em",
                  marginTop: "-4px",
                }}
              >
                Your Signature Style.
              </span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 animate-fade-up delay-2"
              style={{ color: "#6B6460", opacity: 0 }}
            >
              Upload your photo. AI analyses your skin tone, then recommends
              outfits and colours that truly suit you — rendered as a realistic
              fashion lookbook.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up delay-3" style={{ opacity: 0 }}>
              <Link href="/analyze" className="btn-primary" style={{ fontSize: "14px", padding: "14px 32px" }}>
                Start Your Analysis
              </Link>
              <a href="#how-it-works" className="btn-ghost" style={{ fontSize: "13px" }}>
                See how it works
              </a>
            </div>

            {/* Subtle tone strip */}
            <div className="flex items-center justify-center gap-1.5 mt-14 animate-fade-up delay-4" style={{ opacity: 0 }}>
              {["#F7E7D3","#E8C09E","#C98F6B","#A96B4A","#7E4933","#542C20"].map((c, i) => (
                <div
                  key={i}
                  className="rounded-full border-2 border-white shadow-sm"
                  style={{ width: 28, height: 28, background: c }}
                  title={`Skin tone ${i + 1}`}
                />
              ))}
              <span className="ml-2 text-xs" style={{ color: "#8A837C" }}>6 tones supported</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-soft-pulse">
            <div className="w-px h-12" style={{ background: "linear-gradient(180deg, transparent, rgba(120,100,80,0.3))" }} />
            <span className="text-[9px] uppercase tracking-widest" style={{ color: "#8A837C" }}>Scroll</span>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────── */}
        <section id="how-it-works" className="py-24 sm:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#8A837C" }}>
                Process
              </p>
              <h2 className="font-serif italic font-light" style={{ fontSize: "clamp(36px,6vw,60px)", color: "#1A1612" }}>
                Four steps to your
                <br />
                <em>perfect look.</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="relative py-8 md:py-0 md:px-6"
                  style={{
                    borderTop: "1px solid rgba(120,100,80,0.12)",
                    borderRight: i < steps.length - 1 ? "1px solid rgba(120,100,80,0.08)" : "none",
                  }}
                >
                  <p
                    className="font-serif font-light mb-4"
                    style={{ fontSize: 40, color: "rgba(120,100,80,0.2)", lineHeight: 1 }}
                  >
                    {step.num}
                  </p>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#1A1612", letterSpacing: "0.02em" }}>
                    {step.label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#8A837C" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────── */}
        <section className="py-24 px-6">
          <div
            className="max-w-3xl mx-auto text-center py-20 px-8 rounded-3xl relative overflow-hidden"
            style={{
              background: "#1A1612",
            }}
          >
            {/* Soft glow */}
            <div
              className="orb w-72 h-72 top-0 left-1/4 opacity-20"
              style={{ background: "radial-gradient(circle, rgba(200,170,140,0.6) 0%, transparent 70%)" }}
            />

            <p
              className="font-serif italic font-light mb-3 relative z-10"
              style={{ fontSize: "clamp(32px,6vw,56px)", color: "#FAF8F5" }}
            >
              Ready to find your colours?
            </p>
            <p className="text-sm mb-8 relative z-10" style={{ color: "rgba(250,248,245,0.55)" }}>
              Takes less than two minutes. No account needed.
            </p>
            <Link
              href="/analyze"
              className="relative z-10 inline-flex items-center gap-2 btn-glass"
              style={{ padding: "13px 30px", fontSize: "13px" }}
            >
              Begin Your Analysis
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
