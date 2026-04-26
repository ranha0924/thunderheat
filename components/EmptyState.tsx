import { cn } from "@/lib/utils";

type Variant = "empty" | "loading" | "error" | "offline";

interface EmptyStateProps {
  variant: Variant;
  title: string;
  body?: string;
  cta?: { label: string; onClick?: () => void; href?: string };
  className?: string;
}

const ICONS: Record<Variant, string> = {
  empty: "○",
  loading: "◐",
  error: "△",
  offline: "✕",
};

export function EmptyState({
  variant,
  title,
  body,
  cta,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6",
        className,
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 bg-ink-100 text-ink-500",
          variant === "loading" && "animate-spin",
        )}
      >
        {ICONS[variant]}
      </div>
      <h3 className="text-base font-bold text-ink-900 mb-2 tracking-tight">
        {title}
      </h3>
      {body && (
        <p className="text-sm text-ink-500 leading-relaxed mb-5 max-w-[280px]">
          {body}
        </p>
      )}
      {cta &&
        (cta.href ? (
          <a
            href={cta.href}
            className="bg-ink-900 text-paper px-5 py-2.5 rounded-chip text-sm font-semibold"
          >
            {cta.label}
          </a>
        ) : (
          <button
            onClick={cta.onClick}
            className="bg-ink-900 text-paper px-5 py-2.5 rounded-chip text-sm font-semibold"
          >
            {cta.label}
          </button>
        ))}
    </div>
  );
}
