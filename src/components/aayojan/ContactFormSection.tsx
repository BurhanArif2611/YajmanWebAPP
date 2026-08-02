"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DateField } from "@/components/ui/DateField";
import { Button } from "@/components/ui/Button";
import { submitAayojanContact } from "@/lib/api/aayojan";
import { ApiError } from "@/lib/apiError";
import type { AayojanEvent } from "@/types/api";

const SUCCESS_TIMEOUT = 5000;

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

export function ContactFormSection({ events }: { events: AayojanEvent[] }) {
  const eventOptions = events.map((event) => ({ value: event.title, label: event.title }));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [city, setCity] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setEventName("");
    setCity("");
    setNumberOfPeople("");
    setPreferredDate(undefined);
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
      await submitAayojanContact({
        name: name.trim(),
        phone: phoneDigits,
        email: email.trim() || undefined,
        city: city.trim() || undefined,
        event_name: eventName || undefined,
        number_of_people: numberOfPeople ? Number(numberOfPeople) : undefined,
        preferred_date: preferredDate ? format(preferredDate, "yyyy-MM-dd") : undefined,
      });
      resetForm();
      setSuccessMessage("Thanks! We've received your enquiry and will get back to you shortly.");
      setTimeout(() => setSuccessMessage(null), SUCCESS_TIMEOUT);
    } catch (err) {
      if (err instanceof ApiError && err.isValidationError && err.details) {
        setFieldErrors(
          Object.fromEntries(err.details.map((d) => [d.field, d.message]))
        );
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
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-8 lg:pt-0">
      <div className="mx-auto grid grid-cols-1 gap-0 lg:grid-cols-2 lg:items-center max-w-6xl">
        <div className="relative h-72 w-full rounded-l-2xl md:h-[670px]">
          <Image
            src="/images/ayongan/image-3.png"
            alt="Kalash yatra procession"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="rounded-r-2xl bg-surface-peach p-6 md:p-10 md:py-24">
          <span className="font-decorative text-2xl text-brand-saffron-400">
            Contact us
          </span>
          <h2 className="mt-2 font-sans text-3xl font-semibold text-text-primary md:text-4xl">
            Get In Touch With Us !
          </h2>

          {successMessage && (
            <p className="mt-4 rounded-xl bg-success/10 px-4 py-3 text-sm font-medium text-success">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" error={fieldErrors.name}>
                <Input
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  containerClassName="bg-white"
                />
              </Field>
              <Field label="Number" error={fieldErrors.phone}>
                <Input
                  type="tel"
                  placeholder="Enter number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  containerClassName="bg-white"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Email" error={fieldErrors.email}>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  containerClassName="bg-white"
                />
              </Field>
              <Field label="Event" error={fieldErrors.event_name}>
                <Select
                  value={eventName}
                  onChange={setEventName}
                  options={eventOptions}
                  placeholder={eventOptions.length ? "Select event" : "No events available"}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="City" error={fieldErrors.city}>
                <Input
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  containerClassName="bg-white"
                />
              </Field>
              <Field label="Number Of people" error={fieldErrors.number_of_people}>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter number of people"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  containerClassName="bg-white"
                />
              </Field>
            </div>

            <Field label="Preferred Date" error={fieldErrors.preferred_date}>
              <DateField selected={preferredDate} onSelect={setPreferredDate} />
            </Field>

            {error && <p className="text-sm font-medium text-error">{error}</p>}

            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full justify-center rounded-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
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
