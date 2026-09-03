import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  onBack?: () => void;
  onContinue?: () => void;
  canContinue?: boolean;
  continueLabel?: string;
  backLabel?: string;
  showBack?: boolean;
  showContinue?: boolean;
  isLoading?: boolean;
}

export default function StepNavigation({
  onBack,
  onContinue,
  canContinue = true,
  continueLabel = "Continue",
  backLabel = "Back",
  showBack = true,
  showContinue = true,
  isLoading = false,
}: StepNavigationProps) {
  return (
    <div
      className="flex items-center justify-between pt-8 mt-8"
      style={{ borderTop: "1px solid rgba(120,100,80,0.1)" }}
    >
      {showBack && onBack ? (
        <button onClick={onBack} className="btn-ghost" style={{ fontSize: "13px", padding: "10px 20px" }}>
          <ArrowLeft className="h-3.5 w-3.5" style={{ color: "#6B6460" }} />
          {backLabel}
        </button>
      ) : (
        <div />
      )}

      {showContinue && onContinue && (
        <button
          onClick={onContinue}
          disabled={!canContinue || isLoading}
          className="btn-primary"
          style={{ fontSize: "13px", padding: "11px 26px" }}
        >
          {isLoading ? (
            <>
              <span
                className="w-3.5 h-3.5 rounded-full border-2 animate-spin"
                style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#FAF8F5" }}
              />
              Working…
            </>
          ) : (
            <>
              {continueLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
