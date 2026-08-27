import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/** Pin + address when available; otherwise pin + category name only. */
export function ServiceLocationLine({
  address,
  categoryLabel,
  iconSize = 14,
  truncate,
  className,
}: {
  address?: string;
  categoryLabel?: string;
  iconSize?: number;
  truncate?: boolean;
  className?: string;
}) {
  const addressText = address?.trim() ?? "";
  const category = categoryLabel?.trim() ?? "";
  const displayText = addressText || category;

  if (!displayText) return null;

  return (
    <p className={cn("flex min-w-0 items-start gap-1.5 text-sm text-text-muted", className)}>
      <MapPin size={iconSize} className="mt-0.5 shrink-0 text-brand-saffron-400" />
      <span className={cn("min-w-0 break-words", truncate && "truncate")}>{displayText}</span>
    </p>
  );
}
