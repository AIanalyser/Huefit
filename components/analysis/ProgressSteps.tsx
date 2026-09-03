const steps = [
  { num: 1, code: "01", label: "Tone" },
  { num: 2, code: "02", label: "Style" },
  { num: 3, code: "03", label: "Palette" },
  { num: 4, code: "04", label: "Your Look" },
];

// Map the 5-step internal flow onto 4 visible phases
function getPhase(step: number): number {
  if (step <= 2) return 1;
  if (step === 3) return 2;
  if (step <= 5) return 3;
  return 4;
}

interface ProgressStepsProps {
  currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const phase = getPhase(currentStep);

  return (
    <div className="w-full px-6 py-5">
      <div className="flex items-center max-w-xl mx-auto">
        {steps.map((step, i) => {
          const isCompleted = phase > step.num;
          const isCurrent = phase === step.num;

          return (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              {/* Node + label */}
              <div className="flex flex-col items-center gap-1.5">
                {/* Monogram circle */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-300"
                  style={{
                    background: isCompleted
                      ? "#1A1612"
                      : isCurrent
                      ? "#1A1612"
                      : "rgba(255,255,255,0.55)",
                    color: isCompleted || isCurrent ? "#FAF8F5" : "#8A837C",
                    border: isCompleted || isCurrent
                      ? "1.5px solid #1A1612"
                      : "1.5px solid rgba(120,100,80,0.2)",
                    backdropFilter: "blur(8px)",
                    boxShadow: isCurrent ? "0 0 0 3px rgba(26,22,18,0.09)" : "none",
                  }}
                >
                  {isCompleted ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.2L4.2 7.4L8 3" stroke="#FAF8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    step.code
                  )}
                </div>

                {/* Label */}
                <span
                  className="text-[9px] font-medium uppercase tracking-widest whitespace-nowrap transition-colors"
                  style={{
                    color: isCurrent ? "#1A1612" : isCompleted ? "#7C6A5A" : "#8A837C",
                    letterSpacing: "0.08em",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="flex-1 mx-2 mt-[-14px] transition-all duration-500"
                  style={{
                    height: 1,
                    background: isCompleted
                      ? "linear-gradient(90deg, #1A1612, rgba(120,100,80,0.25))"
                      : "rgba(120,100,80,0.14)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
