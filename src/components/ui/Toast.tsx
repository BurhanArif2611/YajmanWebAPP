"use client";

import { useEffect } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toast({
  message,
  variant = "success",
  visible,
  onDismiss,
  durationMs = 4000,
}: {
  message: string;
  variant?: "success" | "error";
  visible: boolean;
  onDismiss: () => void;
  durationMs?: number;
}) {
  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(id);
  }, [visible, durationMs, onDismiss]);

  if (!visible) return null;

  const Icon = variant === "success" ? CheckCircle2 : XCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[60] flex w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-modal animate-scale-in sm:bottom-8"
    >
      <Icon
        size={20}
        className={cn(
          "mt-0.5 shrink-0",
          variant === "success" ? "text-success" : "text-error"
        )}
      />
      <p className="min-w-0 flex-1 text-sm font-medium text-text-primary">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 text-text-muted hover:text-text-primary"
      >
        <X size={16} />
      </button>
    </div>
  );
}
