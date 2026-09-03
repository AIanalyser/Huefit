import { GenerationStatus } from "@/types";

interface StatusBadgeProps {
  status: GenerationStatus;
}

const config: Record<
  GenerationStatus,
  { label: string; classes: string; dot: string }
> = {
  idle: {
    label: "IDLE",
    classes: "bg-gray-100 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  },
  pending: {
    label: "PENDING",
    classes: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400 animate-pulse-soft",
  },
  analyzing: {
    label: "ANALYZING",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500 animate-pulse-soft",
  },
  generating: {
    label: "GENERATING",
    classes: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500 animate-pulse-soft",
  },
  completed: {
    label: "COMPLETED",
    classes: "bg-success-light text-emerald-700 border-emerald-200",
    dot: "bg-success",
  },
  failed: {
    label: "FAILED",
    classes: "bg-error-light text-red-700 border-red-200",
    dot: "bg-error",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${cfg.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
