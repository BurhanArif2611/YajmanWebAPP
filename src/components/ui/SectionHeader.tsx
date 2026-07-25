import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = "center",
  className,
  headingClassName,
  eyebrowClassName,
}: {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  headingClassName?: string;
  eyebrowClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span
        className={cn(
          "font-decorative text-2xl md:text-3xl text-brand-saffron-400",
          eyebrowClassName
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary",
          headingClassName
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "font-sans text-base text-text-muted max-w-prose",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
