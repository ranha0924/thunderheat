import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const VARIANT: Record<Variant, string> = {
  primary: "bg-ink-900 text-paper",
  secondary: "bg-white border border-ink-200 text-ink-900",
  ghost: "text-ink-500",
  outline: "border-[1.5px] border-ink-900 text-ink-900 bg-transparent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", fullWidth, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "rounded-card px-5 py-3 font-bold text-sm tracking-tight transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT[variant],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    />
  );
});
