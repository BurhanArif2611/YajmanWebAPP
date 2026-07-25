import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "saffron",
  className,
}: {
  children: React.ReactNode;
  variant?: "saffron" | "light" | "magenta" | "peach";
  className?: string;
}) {
  const variants = {
    saffron: "bg-brand-saffron-400 text-white",
    light: "bg-white/90 text-text-primary",
    magenta: "bg-brand-magenta text-white",
    peach: "bg-brand-saffron-100 text-brand-saffron-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
