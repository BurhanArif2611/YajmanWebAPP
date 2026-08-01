"use client";

import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";

export function GotraSection({
  gotra,
  onGotraChange,
  unknown,
  onUnknownChange,
}: {
  gotra: string;
  onGotraChange: (value: string) => void;
  unknown: boolean;
  onUnknownChange: (value: boolean) => void;
}) {
  return (
    <>
      <p className="text-sm text-text-muted">
        Gotra will be recited during the puja.
      </p>

      <div>
        <p className="mb-2 text-sm font-semibold text-text-primary">
          Enter Gotra
        </p>
        <Input
          type="text"
          value={gotra}
          onChange={(e) => onGotraChange(e.target.value)}
          placeholder="Bharadwaja"
          disabled={unknown}
          containerClassName="bg-white"
          trailing={<AlertCircle size={18} className="text-text-light" />}
        />
      </div>

      <Checkbox
        checked={unknown}
        onChange={(e) => onUnknownChange(e.target.checked)}
        label="I do not know gotra"
      />
    </>
  );
}
