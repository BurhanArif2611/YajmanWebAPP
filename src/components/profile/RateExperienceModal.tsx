"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Star, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Booking } from "@/lib/constants";

export function RateExperienceModal({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(4);
  const [photos, setPhotos] = useState<number[]>([1, 2, 3]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 animate-overlay-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-modal animate-scale-in md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-bold text-text-primary">
            Rate Your Experience
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <Image
              src={booking.image}
              alt={booking.title}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <p className="font-sans text-lg font-bold text-text-primary">
            {booking.title}...
          </p>

          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)} aria-label={`${i + 1} stars`}>
                <Star
                  size={28}
                  className={cn(i < rating ? "text-brand-gold-400" : "text-border-dark")}
                  fill={i < rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Tell us about your experience..."
          rows={4}
          className="mt-6 w-full resize-none rounded-xl border border-border-dark p-4 text-sm text-text-primary outline-none placeholder:text-text-light"
        />

        <button
          onClick={() => setPhotos((p) => [...p, p.length + 1])}
          className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-brand-saffron-400 text-sm font-semibold text-brand-saffron-400"
        >
          <Camera size={18} />
          Add Photos
        </button>

        {photos.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {photos.map((id) => (
              <div
                key={id}
                className="relative flex h-16 w-16 items-center justify-center gap-1 rounded-lg bg-surface-muted text-xs text-text-muted"
              >
                <Camera size={16} />
                Photo
                <button
                  onClick={() => setPhotos((p) => p.filter((x) => x !== id))}
                  aria-label="Remove photo"
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-text-primary text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <Button size="lg" className="mt-6 w-full justify-center rounded-full">
          Submit Review
        </Button>
      </div>
    </div>
  );
}
