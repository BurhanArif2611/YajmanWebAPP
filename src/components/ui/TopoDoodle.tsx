import { cn } from "@/lib/utils";

export function TopoDoodle({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute h-40 w-40 md:h-56 md:w-56", className)}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path d="M-20 60C20 20 60 100 100 60S180 20 220 60" />
      <path d="M-20 90C20 50 60 130 100 90S180 50 220 90" />
      <path d="M-20 120C20 80 60 160 100 120S180 80 220 120" />
    </svg>
  );
}
