import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div
      className="flex flex-col min-h-full"
      style={{ background: "#FAF8F5" }}
    >
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-20">
        <div className="text-center max-w-md">
          <p
            className="font-serif text-6xl mb-4"
            style={{ color: "#1A1612" }}
          >
            404
          </p>

          <h1
            className="text-lg font-semibold mb-3"
            style={{ color: "#1A1612" }}
          >
            This page doesn&apos;t exist
          </h1>

          <p
            className="text-sm mb-8"
            style={{ color: "#8A837C" }}
          >
            The link may be broken, or the page may have moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="btn-primary">
              Back Home
            </Link>

            <Link
              href="/analyze"
              className="text-sm font-medium"
              style={{ color: "#6B6460" }}
            >
              Start Analysis
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
