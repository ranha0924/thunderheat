import { cn } from "@/lib/utils";

type Variant = "default" | "terracotta" | "lavender" | "sage" | "butter" | "ink";
type Size = "sm" | "md";

interface ChipProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
}

const VARIANT: Record<Variant, string> = {
  default: "bg-ink-100 text-ink-700",
  terracotta: "bg-terracotta-soft text-terracotta-deep",
  lavender: "bg-lavender text-ink-900",
  sage: "bg-sage text-ink-900",
  butter: "bg-butter text-ink-900",
  ink: "bg-ink-900 text-paper",
};

const SIZE: Record<Size, string> = {
  sm: "px-2.5 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export function Chip({
  variant = "default",
  size = "md",
  children,
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-chip font-semibold tracking-tight",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
