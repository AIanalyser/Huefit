"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAnalyze = pathname?.startsWith("/analyze") || pathname?.startsWith("/results");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        className="w-full max-w-4xl transition-all duration-300"
        style={{
          background: scrolled ? "rgba(250,248,245,0.82)" : "rgba(255,255,255,0.52)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.44)",
          borderRadius: 100,
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset"
            : "0 4px 20px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
        }}
      >
        <div className="flex items-center justify-between px-5 py-2.5 sm:py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            style={{ textDecoration: "none" }}
          >
            {/* Monogram mark */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest transition-transform group-hover:scale-105"
              style={{ background: "#1A1612", color: "#FAF8F5", letterSpacing: "0.08em" }}
            >
              H
            </div>
            <span
              className="text-sm font-semibold tracking-widest hidden sm:block"
              style={{ color: "#1A1612", letterSpacing: "0.12em" }}
            >
              HUEFIT
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { href: "/", label: "Home" },
              { href: "/#how-it-works", label: "How It Works" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-medium tracking-wide transition-colors"
                style={{ color: "#6B6460", letterSpacing: "0.04em" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/analyze"
            className="btn-primary hidden sm:inline-flex"
            style={{
              padding: "8px 20px",
              fontSize: "12px",
              letterSpacing: "0.06em",
            }}
          >
            {isAnalyze ? "Continue Analysis" : "Start Analysis"}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-5 transition-all"
              style={{
                background: "#1A1612",
                transform: open ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="block h-px w-5 transition-all"
              style={{
                background: "#1A1612",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-5 transition-all"
              style={{
                background: "#1A1612",
                transform: open ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="sm:hidden px-5 pb-4 animate-fade-in flex flex-col gap-3"
            style={{ borderTop: "1px solid rgba(120,100,80,0.1)", paddingTop: 12 }}
          >
            <Link href="/" onClick={() => setOpen(false)} className="text-sm font-medium" style={{ color: "#4A4540" }}>
              Home
            </Link>
            <Link href="/#how-it-works" onClick={() => setOpen(false)} className="text-sm font-medium" style={{ color: "#4A4540" }}>
              How It Works
            </Link>
            <Link
              href="/analyze"
              onClick={() => setOpen(false)}
              className="btn-primary self-start"
              style={{ fontSize: "13px", padding: "10px 24px" }}
            >
              Start Analysis
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
