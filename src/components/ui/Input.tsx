import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "pill";

type InputProps = {
  variant?: Variant;
  leading?: ReactNode;
  trailing?: ReactNode;
  containerClassName?: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const variantClasses: Record<Variant, string> = {
  default: "rounded-md border border-border-dark bg-white",
  pill: "rounded-full border-none bg-surface-muted",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = "default", leading, trailing, containerClassName, className, error, ...rest },
  ref
) {
  return (
    <div
      className={cn(
        "flex min-h-[56px] items-center gap-3 px-4 transition-colors focus-within:border-brand-saffron-400",
        variantClasses[variant],
        error && "border-error focus-within:border-error",
        containerClassName
      )}
    >
      {leading && <span className="flex shrink-0 items-center text-text-light">{leading}</span>}
      <input
        ref={ref}
        className={cn(
          "min-h-[44px] w-full bg-transparent text-base font-medium text-text-primary outline-none placeholder:text-text-light",
          className
        )}
        {...rest}
      />
      {trailing && <span className="flex shrink-0 items-center">{trailing}</span>}
    </div>
  );
});
