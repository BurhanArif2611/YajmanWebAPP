"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProfileUpdateConfirmModal({
  onClose,
  onConfirm,
  confirming,
}: {
  onClose: () => void;
  onConfirm: () => void;
  confirming: boolean;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !confirming) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, confirming]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 animate-overlay-in"
        onClick={confirming ? undefined : onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-modal animate-scale-in md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-bold text-text-primary">Update profile?</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={confirming}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-text-muted hover:text-text-primary disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-sm text-text-muted">
          Your updated name, contact details, and birth information will be saved to your Yajman
          account.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={onClose}
            disabled={confirming}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="rounded-full"
            onClick={onConfirm}
            disabled={confirming}
          >
            {confirming ? "Saving..." : "Yes, update profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}
