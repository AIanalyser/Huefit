import { Upload, Palette, Shirt, Wand2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Your Photo",
    description: "Take a selfie or upload a clear front-facing photo in natural lighting.",
    icon: Upload,
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    title: "Discover Your Colors",
    description: "Our AI analyzes your skin tone and recommends your ideal color palette.",
    icon: Palette,
    color: "bg-purple-50 text-purple-600",
  },
  {
    number: "03",
    title: "Choose Your Outfit",
    description: "Select from formal, casual, ethnic, party, or suit categories.",
    icon: Shirt,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    number: "04",
    title: "Generate Your Look",
    description: "AI creates a personalized outfit preview with your selected colors.",
    icon: Wand2,
    color: "bg-amber-50 text-amber-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
            How HueFit Works
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Four simple steps to discover your perfect colors and create your
            ideal outfit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color} transition-transform group-hover:scale-110`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-text-muted tracking-widest">
                  STEP {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
