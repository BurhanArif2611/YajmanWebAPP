"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";

export function MembersSection() {
  const [members, setMembers] = useState([""]);

  return (
    <>
      <p className="text-sm text-text-muted">
        Panditji will take these names along with gotra during the puja.
      </p>

      <div className="flex items-center justify-between">
        <span className="font-sans text-base font-bold text-text-primary">
          Members
        </span>
        <button
          onClick={() => setMembers((m) => [...m, ""])}
          className="text-sm font-bold text-brand-saffron-400 underline"
        >
          + Add new
        </button>
      </div>

      {members.map((_, i) => (
        <Input
          key={i}
          type="text"
          placeholder={`${i + 1}. member`}
          containerClassName="bg-white"
        />
      ))}
    </>
  );
}
