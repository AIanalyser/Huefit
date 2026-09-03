import { Brain, Palette, ShieldCheck, Layers } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced AI analyzes your skin tone, undertone, and lighting to provide accurate color recommendations.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Palette,
    title: "Curated Color Palettes",
    description:
      "Soft naturals or vibrant jewel tones — get two expert-curated palettes tailored to your unique skin tone.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Layers,
    title: "30 Outfit Options",
    description:
      "Choose from formal, casual, ethnic, party, and suit categories with 3 options per style for men and women.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Your photos are analyzed in real-time and never stored. All AI processing happens securely server-side.",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function FeaturesSection() {
  return (
    <section id="palettes-preview" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
            Why Choose HueFit
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Powered by AI, designed for everyone. Find the colors and outfits that make you look your best.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border p-6 sm:p-8 hover:border-accent/30 transition-all hover:shadow-lg"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg transition-transform group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skin tone preview strip */}
        <div className="mt-16 text-center">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
            Supports All Skin Tones
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { label: "Very Light", colors: ["#F7E7D3", "#F3D9C0", "#EFCFB3", "#E8C19F"] },
              { label: "Light", colors: ["#E8C09E", "#DDB28D", "#D5A37D", "#CC9870"] },
              { label: "Light Medium", colors: ["#C98F6B", "#C18460", "#B87856", "#AE6D4D"] },
              { label: "Medium", colors: ["#A96B4A", "#9F6244", "#94593E", "#8A5138"] },
              { label: "Deep", colors: ["#7E4933", "#74412F", "#6A3A2B", "#603326"] },
              { label: "Very Deep", colors: ["#542C20", "#4C261C", "#432119", "#3A1C16"] },
            ].map((tone) => (
              <div key={tone.label} className="flex flex-col items-center gap-1.5">
                <div className="flex gap-0.5">
                  {tone.colors.map((c) => (
                    <div
                      key={c}
                      className="w-6 h-6 sm:w-8 sm:h-8 first:rounded-l-lg last:rounded-r-lg"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-text-muted font-medium">
                  {tone.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
