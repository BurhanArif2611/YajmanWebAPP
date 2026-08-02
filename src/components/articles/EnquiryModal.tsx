"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitServiceInquiry } from "@/lib/api/services";
import { ApiError } from "@/lib/apiError";

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

export function EnquiryModal({
  serviceId,
  category,
  serviceName,
  onClose,
}: {
  serviceId: string;
  category: string;
  serviceName?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneDigits = digitsOnly(number);
    if (!name.trim() || !/^[6-9]\d{9}$/.test(phoneDigits)) {
      setFieldErrors({
        ...(!name.trim() ? { name: "Name is required." } : {}),
        ...(!/^[6-9]\d{9}$/.test(phoneDigits)
          ? { phone: "Enter a valid 10-digit phone number." }
          : {}),
      });
      return;
    }

    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      await submitServiceInquiry(serviceId, {
        name: name.trim(),
        phone: phoneDigits,
        email: email.trim() || undefined,
        message: message.trim() || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError && err.isValidationError && err.details) {
        setFieldErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])));
      } else {
        setError(
          err instanceof ApiError ? err.message : "Couldn't submit your enquiry. Try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 animate-overlay-in" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-modal animate-scale-in md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-bold text-text-primary">Enquire Now</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <p className="mt-6 text-sm text-text-muted">
            Thanks{name ? `, ${name}` : ""}! We&apos;ve noted your enquiry about{" "}
            <span className="font-semibold text-text-primary">{category}</span> and will get
            back to you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <p className="mb-1 text-sm font-semibold text-text-primary">Category</p>
              <p className="rounded-xl border border-border-dark bg-surface-muted px-4 py-3 text-sm text-text-secondary">
                {category}
                {serviceName ? ` — ${serviceName}` : ""}
              </p>
            </div>

            <div>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                containerClassName="bg-white"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs font-medium text-error">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Your number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                containerClassName="bg-white"
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-xs font-medium text-error">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                containerClassName="bg-white"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs font-medium text-error">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`What would you like to know about ${category}?`}
                rows={4}
                className="w-full resize-none rounded-xl border border-border-dark p-4 text-sm text-text-primary outline-none placeholder:text-text-light"
              />
              {fieldErrors.message && (
                <p className="mt-1 text-xs font-medium text-error">{fieldErrors.message}</p>
              )}
            </div>

            {error && <p className="text-sm font-medium text-error">{error}</p>}

            <Button
              type="submit"
              size="lg"
              className="w-full justify-center rounded-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
