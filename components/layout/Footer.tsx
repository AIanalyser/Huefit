import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(120,100,80,0.12)", backgroundColor: "#FAF8F5" }}>
      <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div>
            <p
              className="text-sm font-semibold tracking-widest mb-3"
              style={{ color: "#1A1612", letterSpacing: "0.14em" }}
            >
              HUEFIT
            </p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#8A837C" }}>
              AI-powered personal colour analysis and outfit recommendations.
              Discover what looks best on you.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-xs" style={{ color: "#8A837C" }}>
            <div className="space-y-2.5">
              <p className="font-semibold text-[10px] uppercase tracking-widest" style={{ color: "#4A4540" }}>
                Product
              </p>
              <Link href="/analyze" className="block hover:text-ink transition-colors" style={{ color: "#8A837C" }}>
                Colour Analysis
              </Link>
              <a href="/#how-it-works" className="block hover:text-ink transition-colors" style={{ color: "#8A837C" }}>
                How It Works
              </a>
            </div>
          </div>
        </div>

        <div className="divider mt-10 mb-5" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px]" style={{ color: "#8A837C" }}>
            © {new Date().getFullYear()} HueFit. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "#8A837C" }}>
            Powered by Google Gemini
          </p>
        </div>
      </div>
    </footer>
  );
}
