import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HueFit — AI Color & Outfit Analyzer",
  description:
    "Discover the colors that look best on you. AI-powered personal color analysis and outfit recommendations based on your skin tone.",
  keywords: [
    "color analysis",
    "outfit recommendation",
    "skin tone",
    "fashion AI",
    "personal styling",
  ],
  openGraph: {
    title: "HueFit — AI Color & Outfit Analyzer",
    description:
      "AI-powered personal color analysis and outfit recommendations based on your skin tone.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
