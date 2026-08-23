import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Last 10 digits from a phone string; safe for empty/undefined values. */
export function digitsOnly(value: string | null | undefined) {
  return String(value ?? "").replace(/\D/g, "").slice(-10);
}

/** Loose match so labels don't have to exactly mirror the API's name casing/spacing. */
export function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeTime(date: string | Date) {
  const diffMs = new Date(date).getTime() - Date.now();
  const diffSeconds = Math.round(diffMs / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diffSeconds) >= secondsInUnit) {
      return rtf.format(Math.round(diffSeconds / secondsInUnit), unit);
    }
  }
  return "just now";
}
