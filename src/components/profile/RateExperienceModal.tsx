"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/AppImage";
import { Camera, Star, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitReview } from "@/lib/api/bookings";
import { resolveImageUrl } from "@/lib/mappers/service";
import { ApiError } from "@/lib/apiError";
import { cn } from "@/lib/utils";
import {
  IMAGE_UPLOAD_ACCEPT,
  MAX_REVIEW_PHOTOS,
  REVIEW_PHOTOS_UPLOAD_HINT,
  validateImageUpload,
} from "@/lib/imageUpload";
import type { BookingDetail } from "@/types/api";

export function RateExperienceModal({
  booking,
  onClose,
  onSubmitted,
}: {
  booking: BookingDetail;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setPhotoError(null);

    const next: File[] = [...photos];
    for (const file of Array.from(files)) {
      if (next.length >= MAX_REVIEW_PHOTOS) break;
      try {
        validateImageUpload(file);
        next.push(file);
      } catch (err) {
        setPhotoError(err instanceof Error ? err.message : "Couldn't add this photo.");
        break;
      }
    }
    setPhotos(next.slice(0, MAX_REVIEW_PHOTOS));
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("rating", String(rating));
      if (title.trim()) formData.set("title", title.trim());
      if (comment.trim()) formData.set("comment", comment.trim());
      photos.forEach((file) => formData.append("photos", file));

      await submitReview(booking.id, formData);
      onSubmitted();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit your review. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 animate-overlay-in" onClick={onClose} />

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
              src={resolveImageUrl(booking.service_image)}
              alt={booking.service_title}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <p className="font-sans text-lg font-bold text-text-primary">
            {booking.service_title}
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

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your review a title (optional)"
          maxLength={200}
          className="mt-6 w-full rounded-xl border border-border-dark p-4 text-sm text-text-primary outline-none placeholder:text-text-light"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience..."
          rows={4}
          className="mt-3 w-full resize-none rounded-xl border border-border-dark p-4 text-sm text-text-primary outline-none placeholder:text-text-light"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept={IMAGE_UPLOAD_ACCEPT}
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={photos.length >= MAX_REVIEW_PHOTOS}
          className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-brand-saffron-400 text-sm font-semibold text-brand-saffron-400 disabled:opacity-50"
        >
          <Camera size={18} />
          Add Photos ({photos.length}/{MAX_REVIEW_PHOTOS})
        </button>
        <p className="mt-2 text-center text-xs text-text-muted">{REVIEW_PHOTOS_UPLOAD_HINT}</p>
        {photoError && <p className="mt-2 text-center text-xs font-medium text-error">{photoError}</p>}

        {photos.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {photos.map((file, i) => (
              <div
                key={i}
                className="relative flex h-16 w-16 items-center justify-center rounded-lg bg-surface-muted text-xs text-text-muted"
              >
                <Camera size={16} />
                <button
                  onClick={() => setPhotos((p) => p.filter((_, idx) => idx !== i))}
                  aria-label="Remove photo"
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-text-primary text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="mt-4 text-sm font-medium text-error">{error}</p>}

        <Button
          size="lg"
          className="mt-6 w-full justify-center rounded-full"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </div>
  );
}
