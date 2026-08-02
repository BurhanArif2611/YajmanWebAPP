"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/lib/api/contact";
import { ApiError } from "@/lib/apiError";

const SUCCESS_TIMEOUT = 5000;

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-text-primary">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-error">{error}</span>}
    </label>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCity("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneDigits = digitsOnly(phone);
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
      await submitContact({
        name: name.trim(),
        phone: phoneDigits,
        email: email.trim() || undefined,
        city: city.trim() || undefined,
        message: message.trim() || undefined,
      });
      resetForm();
      setSuccessMessage("Thanks! We've received your message and will get back to you shortly.");
      setTimeout(() => setSuccessMessage(null), SUCCESS_TIMEOUT);
    } catch (err) {
      if (err instanceof ApiError && err.isValidationError && err.details) {
        setFieldErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])));
      } else {
        setError(
          err instanceof ApiError ? err.message : "Couldn't send your message. Try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl bg-surface-peach p-6 md:p-10"
    >
      {successMessage && (
        <p className="rounded-xl bg-success/10 px-4 py-3 text-sm font-medium text-success">
          {successMessage}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" error={fieldErrors.name}>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            containerClassName="bg-white"
          />
        </Field>
        <Field label="Email" error={fieldErrors.email}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            containerClassName="bg-white"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone" error={fieldErrors.phone}>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            containerClassName="bg-white"
          />
        </Field>
        <Field label="City" error={fieldErrors.city}>
          <Input
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            containerClassName="bg-white"
          />
        </Field>
      </div>

      <Field label="Message" error={fieldErrors.message}>
        <textarea
          rows={5}
          placeholder="Tell us more about your requirement..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-xl border border-border-dark bg-white p-4 text-base font-medium text-text-primary outline-none placeholder:text-text-light"
        />
      </Field>

      {error && <p className="text-sm font-medium text-error">{error}</p>}

      <Button type="submit" size="lg" className="w-full justify-center rounded-full" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
