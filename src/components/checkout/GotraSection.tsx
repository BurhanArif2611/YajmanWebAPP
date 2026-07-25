"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";

export function GotraSection() {
  const [unknown, setUnknown] = useState(true);

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
          placeholder="Bharadwaja"
          disabled={unknown}
          containerClassName="bg-white"
          trailing={<AlertCircle size={18} className="text-text-light" />}
        />
      </div>

      <Checkbox
        checked={unknown}
        onChange={(e) => setUnknown(e.target.checked)}
        label="I do not know gotra"
      />
    </>
  );
}
