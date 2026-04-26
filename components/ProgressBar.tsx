import { cn } from "@/lib/utils";

type Variant = "terracotta" | "sage" | "lavender" | "ink";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: Variant;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const FILL: Record<Variant, string> = {
  terracotta: "bg-terracotta",
  sage: "bg-sage-deep",
  lavender: "bg-lavender-deep",
  ink: "bg-ink-900",
};

export function ProgressBar({
  value,
  max = 100,
  variant = "terracotta",
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1.5 text-[11px] text-ink-500 font-medium">
          {label && <span>{label}</span>}
          {showLabel && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-1.5 w-full rounded-chip bg-ink-100 overflow-hidden">
        <div
          className={cn("h-full rounded-chip transition-all", FILL[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
