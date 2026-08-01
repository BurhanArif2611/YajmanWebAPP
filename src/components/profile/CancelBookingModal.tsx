"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cancelBooking } from "@/lib/api/bookings";
import { ApiError } from "@/lib/apiError";

export function CancelBookingModal({
  bookingId,
  onClose,
  onCancelled,
}: {
  bookingId: string;
  onClose: () => void;
  onCancelled: () => void;
}) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!reason.trim()) {
      setError("Please tell us why you're cancelling.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await cancelBooking(bookingId, reason.trim());
      onCancelled();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't cancel this booking. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 animate-overlay-in" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-modal animate-scale-in md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-bold text-text-primary">Cancel Booking</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-sm text-text-muted">
          Let us know why you&apos;re cancelling. If a payment was captured, we&apos;ll try to
          refund it automatically.
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for cancellation"
          rows={4}
          className="mt-4 w-full resize-none rounded-xl border border-border-dark p-4 text-sm text-text-primary outline-none placeholder:text-text-light"
        />

        {error && <p className="mt-3 text-sm font-medium text-error">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="min-h-[44px] flex-1 rounded-full border border-border-dark text-sm font-medium text-text-primary hover:bg-surface-muted"
          >
            Keep Booking
          </button>
          <Button
            variant="dark"
            className="flex-1 justify-center rounded-full"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? "Cancelling..." : "Confirm Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
}
