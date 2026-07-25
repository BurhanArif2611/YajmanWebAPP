import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
