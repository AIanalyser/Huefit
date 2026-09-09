"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/lib/store";

const categoryLabels: Record<string, string> = {
  formal: "Formal",
  casual: "Casual",
  ethnic: "Ethnic",
  party: "Party / Special Occasion",
  suits: "Suits",
};

const genderLabels: Record<string, string> = {
  male: "Male",
  female: "Female",
};

export default function PromptFlowPage() {
  const router = useRouter();
  const store = useAnalysisStore();
  const selection = store.buildSelection();

  /*
   * If the user reaches this page without completing
   * the HueFit selection flow, send them back to analysis.
   */
  if (!selection) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#FAF8F5" }}
      >
        <div className="text-center">
          <p
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "#7654FF" }}
          >
            HueFit
          </p>

          <h1
            className="font-serif italic font-light mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              color: "#1A1612",
            }}
          >
            No selection found.
          </h1>

          <p
            className="text-sm mb-7"
            style={{ color: "#8A837C" }}
          >
            Complete the styling flow first to view your AI input.
          </p>

          <Link
            href="/analyze"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
            style={{
              background: "#1A1612",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            Start Styling
          </Link>
        </div>
      </div>
    );
  }

  const tone = selection.skin_tone;
  const palette = selection.color_palette;

  const selectedColors =
    palette.colors && palette.colors.length > 0
      ? palette.colors
      : ["#D8C5B5", "#B99C88", "#8A6B58", "#554238"];

  const primaryColors = selectedColors.slice(0, 4);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#FAF8F5",
        color: "#1A1612",
      }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute"
          style={{
            width: "700px",
            height: "700px",
            top: "-280px",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(118,84,255,0.13) 0%, rgba(118,84,255,0.05) 35%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        <div
          className="absolute"
          style={{
            width: "500px",
            height: "500px",
            bottom: "-220px",
            right: "-180px",
            background:
              "radial-gradient(circle, rgba(205,184,160,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <header
        className="relative z-10 w-full"
        style={{
          height: "94px",
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(220,214,207,0.7)",
        }}
      >
        <div
          className="mx-auto h-full flex items-center justify-between px-6 sm:px-10 lg:px-24"
          style={{ maxWidth: "1440px" }}
        >
          <Link
            href="/"
            style={{
              color: "#2B2825",
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-0.06em",
              textDecoration: "none",
            }}
          >
            HueFit
          </Link>

          <div
            className="hidden sm:block"
            style={{
              color: "#7C746D",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Your Hue. Your Style. Your Best You.
          </div>
        </div>
      </header>

      {/* Main */}
      <main
        className="relative z-10 flex-1 px-5 sm:px-8 lg:px-12"
        style={{
          paddingTop: "76px",
          paddingBottom: "90px",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "1240px",
          }}
        >
          {/* Intro */}
          <section className="text-center">
            <p
              style={{
                color: "#7654FF",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.32em",
                marginBottom: "52px",
              }}
            >
              SELECTION COMPLETE
            </p>

            <h1
              style={{
                fontSize: "clamp(42px, 6vw, 68px)",
                lineHeight: 1.04,
                fontWeight: 300,
                letterSpacing: "-0.055em",
                margin: 0,
                color: "#25211F",
              }}
            >
              Your{" "}
              <span style={{ color: "#6848F5" }}>
                AI styling input
              </span>{" "}
              is ready.
            </h1>

            <p
              style={{
                marginTop: "22px",
                color: "#8B837C",
                fontSize: "16px",
                lineHeight: 1.6,
              }}
            >
              All selected preferences have been merged into one
              structured object for the image-generation stage.
            </p>
          </section>

          {/* Selection cards */}
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            style={{
              marginTop: "48px",
            }}
          >
            {/* Skin Tone */}
            <div
              className="rounded-3xl text-center"
              style={{
                minHeight: "150px",
                padding: "28px 20px 22px",
                background: "rgba(255,255,255,0.86)",
                border: "1px solid #E6DED6",
                boxShadow: "0 8px 28px rgba(35,28,22,0.035)",
              }}
            >
              <p
                style={{
                  color: "#9A9189",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  marginBottom: "24px",
                }}
              >
                SKIN TONE
              </p>

              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                {tone.label}
              </p>

              <div
                style={{
                  height: "24px",
                  borderRadius: "7px",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: `repeat(${tone.available_hex.length}, 1fr)`,
                }}
              >
                {tone.available_hex.map((hex) => (
                  <div
                    key={hex}
                    style={{
                      background: hex,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Gender */}
            <div
              className="rounded-3xl text-center"
              style={{
                minHeight: "150px",
                padding: "28px 20px 22px",
                background: "rgba(255,255,255,0.86)",
                border: "1px solid #E6DED6",
                boxShadow: "0 8px 28px rgba(35,28,22,0.035)",
              }}
            >
              <p
                style={{
                  color: "#9A9189",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  marginBottom: "24px",
                }}
              >
                GENDER
              </p>

              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                {genderLabels[selection.gender] ?? selection.gender}
              </p>
            </div>

            {/* Category */}
            <div
              className="rounded-3xl text-center"
              style={{
                minHeight: "150px",
                padding: "28px 20px 22px",
                background: "rgba(255,255,255,0.86)",
                border: "1px solid #E6DED6",
                boxShadow: "0 8px 28px rgba(35,28,22,0.035)",
              }}
            >
              <p
                style={{
                  color: "#9A9189",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  marginBottom: "24px",
                }}
              >
                CATEGORY
              </p>

              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                {categoryLabels[selection.category] ??
                  selection.category}
              </p>
            </div>

            {/* Outfit */}
            <div
              className="rounded-3xl text-center"
              style={{
                minHeight: "150px",
                padding: "28px 20px 22px",
                background: "rgba(255,255,255,0.86)",
                border: "1px solid #E6DED6",
                boxShadow: "0 8px 28px rgba(35,28,22,0.035)",
              }}
            >
              <p
                style={{
                  color: "#9A9189",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  marginBottom: "24px",
                }}
              >
                OUTFIT
              </p>

              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: 1.35,
                }}
              >
                {selection.outfit_name}
              </p>
            </div>

            {/* Palette */}
            <div
              className="rounded-3xl text-center"
              style={{
                minHeight: "150px",
                padding: "28px 20px 22px",
                background: "rgba(255,255,255,0.86)",
                border: "1px solid #E6DED6",
                boxShadow: "0 8px 28px rgba(35,28,22,0.035)",
              }}
            >
              <p
                style={{
                  color: "#9A9189",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  marginBottom: "24px",
                }}
              >
                COLOUR PALETTE
              </p>

              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  marginBottom: "16px",
                }}
              >
                {store.selectedPalette?.name ?? "Custom Palette"}
              </p>

              <div
                style={{
                  height: "24px",
                  borderRadius: "7px",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: `repeat(${primaryColors.length}, 1fr)`,
                }}
              >
                {primaryColors.map((hex) => (
                  <div
                    key={hex}
                    style={{
                      background: hex,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Final input panel */}
          <section
            className="grid grid-cols-1 lg:grid-cols-[1fr_420px] overflow-hidden"
            style={{
              marginTop: "32px",
              minHeight: "460px",
              borderRadius: "34px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(250,247,243,0.78))",
              border: "1px solid #E6DED6",
              boxShadow: "0 16px 50px rgba(35,28,22,0.045)",
            }}
          >
            {/* Left */}
            <div
              className="flex flex-col justify-center"
              style={{
                padding: "64px 58px",
              }}
            >
              <p
                style={{
                  color: "#7654FF",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  marginBottom: "22px",
                }}
              >
                FINAL INPUT
              </p>

              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 46px)",
                  lineHeight: 1.08,
                  fontWeight: 300,
                  letterSpacing: "-0.045em",
                  margin: 0,
                  color: "#292522",
                }}
              >
                Ready for Gemini
              </h2>

              <p
                style={{
                  maxWidth: "600px",
                  marginTop: "22px",
                  color: "#8A837C",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Your selected skin tone, gender, outfit and colour
                palette have been combined into a structured input.
                This object is ready to be passed to the image
                generation stage.
              </p>

              {/* Flow */}
              <div
                className="flex flex-wrap items-center gap-2"
                style={{
                  marginTop: "34px",
                }}
              >
                <div
                  style={{
                    padding: "9px 14px",
                    borderRadius: "999px",
                    background: "#F0EBE6",
                    color: "#5F5851",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  User Selection
                </div>

                <span style={{ color: "#B0A79E" }}>→</span>

                <div
                  style={{
                    padding: "9px 14px",
                    borderRadius: "999px",
                    background: "#F0EBE6",
                    color: "#5F5851",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  Structured Input
                </div>

                <span style={{ color: "#B0A79E" }}>→</span>

                <div
                  style={{
                    padding: "9px 14px",
                    borderRadius: "999px",
                    background: "#EEE9FF",
                    color: "#6848F5",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  Gemini
                </div>
              </div>

              {/* Template information */}
              <div
                style={{
                  marginTop: "30px",
                  padding: "16px 18px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(220,212,204,0.8)",
                  maxWidth: "520px",
                }}
              >
                <div
                  className="flex items-center justify-between gap-4"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  <span style={{ color: "#938A82" }}>
                    Template
                  </span>

                  <span
                    style={{
                      color: "#39332E",
                      fontWeight: 700,
                    }}
                  >
                    {selection.template_id}
                  </span>
                </div>

                <div
                  className="flex items-center justify-between gap-4"
                  style={{
                    marginTop: "10px",
                    fontSize: "11px",
                  }}
                >
                  <span style={{ color: "#938A82" }}>
                    Outfit ID
                  </span>

                  <span
                    style={{
                      color: "#39332E",
                      fontWeight: 700,
                    }}
                  >
                    {selection.outfit_id}
                  </span>
                </div>
              </div>
            </div>

            {/* Right — visual template */}
            <div
              className="flex items-center justify-center"
              style={{
                minHeight: "460px",
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(247,243,239,0.7) 68%, rgba(240,235,230,0.45) 100%)",
                position: "relative",
              }}
            >
              {/* Soft floor glow */}
              <div
                style={{
                  position: "absolute",
                  width: "230px",
                  height: "70px",
                  bottom: "58px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse, rgba(60,45,35,0.12) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {/* Dummy mannequin */}
              <div
                style={{
                  position: "relative",
                  width: "190px",
                  height: "360px",
                }}
              >
                {/* Head */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "78px",
                    height: "78px",
                    borderRadius: "50%",
                    background: tone.selected_hex,
                    boxShadow:
                      "0 10px 25px rgba(50,35,25,0.12)",
                  }}
                />

                {/* Neck */}
                <div
                  style={{
                    position: "absolute",
                    top: "68px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "34px",
                    height: "32px",
                    borderRadius: "8px",
                    background: tone.selected_hex,
                  }}
                />

                {/* Body / outfit */}
                <div
                  style={{
                    position: "absolute",
                    top: "75px",
                    left: "25px",
                    width: "140px",
                    height: "210px",
                    borderRadius: "40px 40px 24px 24px",
                    overflow: "hidden",
                    background: primaryColors[0],
                    boxShadow:
                      "0 16px 30px rgba(50,35,25,0.08)",
                  }}
                >
                  {/* Outfit colour blocks */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${primaryColors[0]} 0%, ${primaryColors[0]} 50%, ${primaryColors[1] ?? primaryColors[0]} 50%, ${primaryColors[1] ?? primaryColors[0]} 75%, ${primaryColors[2] ?? primaryColors[0]} 75%, ${primaryColors[2] ?? primaryColors[0]} 100%)`,
                    }}
                  />

                  {/* HueFit mark */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255,255,255,0.82)",
                      fontSize: "9px",
                      fontWeight: 800,
                      letterSpacing: "0.22em",
                    }}
                  >
                    HUEFIT
                  </div>
                </div>

                {/* Left arm */}
                <div
                  style={{
                    position: "absolute",
                    top: "90px",
                    left: "8px",
                    width: "34px",
                    height: "170px",
                    borderRadius: "20px",
                    background: primaryColors[0],
                    transform: "rotate(4deg)",
                  }}
                />

                {/* Right arm */}
                <div
                  style={{
                    position: "absolute",
                    top: "90px",
                    right: "8px",
                    width: "34px",
                    height: "170px",
                    borderRadius: "20px",
                    background:
                      primaryColors[1] ?? primaryColors[0],
                    transform: "rotate(-4deg)",
                  }}
                />

                {/* Legs */}
                <div
                  style={{
                    position: "absolute",
                    top: "272px",
                    left: "52px",
                    width: "38px",
                    height: "85px",
                    borderRadius: "0 0 18px 18px",
                    background:
                      primaryColors[2] ?? "#454545",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "272px",
                    right: "52px",
                    width: "38px",
                    height: "85px",
                    borderRadius: "0 0 18px 18px",
                    background:
                      primaryColors[3] ??
                      primaryColors[2] ??
                      "#454545",
                  }}
                />
              </div>
            </div>
          </section>

          {/* Structured object */}
          <section
            style={{
              marginTop: "32px",
              padding: "34px",
              borderRadius: "30px",
              background: "rgba(255,255,255,0.72)",
              border: "1px solid #E6DED6",
              boxShadow: "0 10px 35px rgba(35,28,22,0.035)",
            }}
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p
                  style={{
                    color: "#7654FF",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    marginBottom: "8px",
                  }}
                >
                  STRUCTURED OBJECT
                </p>

                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                  }}
                >
                  AI Input Preview
                </h3>
              </div>

              <div
                style={{
                  padding: "7px 12px",
                  borderRadius: "999px",
                  background: "#EEE9FF",
                  color: "#6848F5",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                READY
              </div>
            </div>

            <pre
              style={{
                margin: 0,
                padding: "24px",
                borderRadius: "20px",
                background: "#211E1B",
                color: "#EDE8E3",
                fontSize: "12px",
                lineHeight: 1.7,
                overflowX: "auto",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {JSON.stringify(selection, null, 2)}
            </pre>
          </section>

          {/* Bottom actions */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{
              marginTop: "34px",
            }}
          >
            <button
              onClick={() => router.back()}
              className="rounded-full"
              style={{
                padding: "12px 24px",
                border: "1px solid #DDD5CC",
                background: "rgba(255,255,255,0.7)",
                color: "#5F5851",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ← Back to Results
            </button>

            <Link
              href="/"
              className="rounded-full"
              style={{
                padding: "12px 24px",
                background: "#1A1612",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Start Over
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}