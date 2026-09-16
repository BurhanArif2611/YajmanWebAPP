"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
  label = "Quantity",
}: {
  value: number;
  min?: number;
  max: number;
  onChange: (next: number) => void;
  label?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-text-primary">{label}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={value <= min}
          onClick={() => onChange(clamp(value - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={16} />
        </button>
        <span className="min-w-[2ch] text-center font-sans text-lg font-semibold text-text-primary">
          {value}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={value >= max}
          onClick={() => onChange(clamp(value + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
