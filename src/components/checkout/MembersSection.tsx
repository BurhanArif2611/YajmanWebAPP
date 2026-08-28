"use client";

import { Input } from "@/components/ui/Input";

const MAX_MEMBERS = 2;

export function MembersSection({
  members,
  onChange,
}: {
  members: string[];
  onChange: (members: string[]) => void;
}) {
  const canAddMore = members.length < MAX_MEMBERS;

  return (
    <>
      <p className="text-sm text-text-muted">
        Panditji will take these names along with gotra during the puja. You can add up to{" "}
        {MAX_MEMBERS} members.
      </p>

      <div className="flex items-center justify-between">
        <span className="font-sans text-base font-bold text-text-primary">
          Members
        </span>
        {canAddMore && (
          <button
            type="button"
            onClick={() => onChange([...members, ""])}
            className="text-sm font-bold text-brand-saffron-400 underline"
          >
            + Add new
          </button>
        )}
      </div>

      {members.map((value, i) => (
        <Input
          key={i}
          type="text"
          value={value}
          onChange={(e) => {
            const next = [...members];
            next[i] = e.target.value;
            onChange(next);
          }}
          placeholder={`${i + 1}. member`}
          containerClassName="bg-white"
        />
      ))}
    </>
  );
}
