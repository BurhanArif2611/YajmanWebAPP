"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  label?: React.ReactNode;
  containerClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, containerClassName, className, ...rest }, ref) {
    return (
      <label
        className={cn(
          "flex min-h-[24px] cursor-pointer items-center gap-3 text-base font-medium text-text-primary",
          containerClassName
        )}
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            className={cn("peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-border-dark bg-white checked:border-brand-saffron-400 checked:bg-brand-saffron-400", className)}
            {...rest}
          />
          <Check
            size={14}
            strokeWidth={3}
            className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
          />
        </span>
        {label}
      </label>
    );
  }
);
