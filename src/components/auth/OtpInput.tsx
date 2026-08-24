"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LENGTH = 6;

export function OtpInput({
  onChange,
  onComplete,
  error,
  disabled,
}: {
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}) {
  const [values, setValues] = useState<string[]>(Array(LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Clear the boxes whenever the parent flags an invalid attempt so the
  // user isn't stuck editing a known-wrong code digit by digit.
  useEffect(() => {
    if (!error) return;
    queueMicrotask(() => {
      setValues(Array(LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    });
  }, [error]);

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[index] = digit;
    setValues(next);
    onChange?.(next.join(""));

    if (digit && index < LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (digit && index === LENGTH - 1) {
      const joined = next.join("");
      if (joined.length === LENGTH) onComplete?.(joined);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setValues(next);
    onChange?.(next.join(""));
    if (pasted.length === LENGTH) {
      onComplete?.(next.join(""));
      inputsRef.current[LENGTH - 1]?.focus();
    } else {
      inputsRef.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="flex w-full max-w-md gap-1.5 sm:gap-3">
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-lg border text-center text-base font-semibold text-text-primary outline-none focus:border-brand-saffron-400 disabled:opacity-50 sm:h-14 sm:max-w-12 sm:text-lg",
            error ? "border-error" : "border-border-dark"
          )}
        />
      ))}
    </div>
  );
}
