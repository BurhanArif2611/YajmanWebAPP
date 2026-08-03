"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { acceptAssignment, rejectAssignment, withdrawAssignment } from "@/lib/api/panditAssignments";
import { ApiError } from "@/lib/apiError";

type Mode = "accept" | "reject" | "withdraw";

const NOTES_MAX = 1000;

const COPY: Record<
  Mode,
  {
    title: string;
    description: string;
    placeholder: string;
    confirmLabel: string;
    confirmingLabel: string;
    required: boolean;
    requiredError: string;
    genericError: string;
  }
> = {
  accept: {
    title: "Accept Assignment",
    description: "Add any notes for this booking (optional).",
    placeholder: "Notes (optional)",
    confirmLabel: "Confirm Accept",
    confirmingLabel: "Accepting...",
    required: false,
    requiredError: "",
    genericError: "Couldn't accept this assignment. Try again.",
  },
  reject: {
    title: "Reject Assignment",
    description: "Let us know why you're rejecting this assignment.",
    placeholder: "Reason for rejecting",
    confirmLabel: "Confirm Reject",
    confirmingLabel: "Rejecting...",
    required: true,
    requiredError: "Please tell us why you're rejecting this assignment.",
    genericError: "Couldn't reject this assignment. Try again.",
  },
  withdraw: {
    title: "Withdraw Assignment",
    description: "Let us know why you need to withdraw after accepting.",
    placeholder: "Reason for withdrawing",
    confirmLabel: "Confirm Withdraw",
    confirmingLabel: "Withdrawing...",
    required: true,
    requiredError: "Please tell us why you're withdrawing.",
    genericError: "Couldn't withdraw this assignment. Try again.",
  },
};

export function AssignmentActionModal({
  assignmentId,
  mode,
  onClose,
  onDone,
}: {
  assignmentId: string;
  mode: Mode;
  onClose: () => void;
  onDone: () => void;
}) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const copy = COPY[mode];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleConfirm = async () => {
    const trimmed = text.trim();
    if (copy.required && !trimmed) {
      setError(copy.requiredError);
      return;
    }
    if (trimmed.length > NOTES_MAX) {
      setError(`Keep it under ${NOTES_MAX} characters.`);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      if (mode === "accept") await acceptAssignment(assignmentId, trimmed || undefined);
      else if (mode === "reject") await rejectAssignment(assignmentId, trimmed);
      else await withdrawAssignment(assignmentId, trimmed);
      onDone();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : copy.genericError);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 animate-overlay-in" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-modal animate-scale-in md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-bold text-text-primary">{copy.title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-sm text-text-muted">{copy.description}</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={copy.placeholder}
          rows={4}
          maxLength={NOTES_MAX}
          className="mt-4 w-full resize-none rounded-xl border border-border-dark p-4 text-sm text-text-primary outline-none placeholder:text-text-light"
        />

        {error && <p className="mt-3 text-sm font-medium text-error">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="min-h-[44px] flex-1 rounded-full border border-border-dark text-sm font-medium text-text-primary hover:bg-surface-muted"
          >
            Cancel
          </button>
          <Button
            variant="dark"
            className="flex-1 justify-center rounded-full"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? copy.confirmingLabel : copy.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
