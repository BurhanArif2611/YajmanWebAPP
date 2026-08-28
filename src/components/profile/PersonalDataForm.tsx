"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/ui/AppImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, CheckCircle2, Loader2 } from "lucide-react";
import { format, isAfter, parseISO, startOfDay, subYears } from "date-fns";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Select } from "@/components/ui/Select";
import { DateField } from "@/components/ui/DateField";
import { Toast } from "@/components/ui/Toast";
import { ProfileUpdateConfirmModal } from "@/components/profile/ProfileUpdateConfirmModal";
import { useAuth } from "@/hooks/useAuth";
import { getProfile, updateProfile, uploadAvatar, type UpdateProfileInput } from "@/lib/api/profile";
import { updateStoredUser } from "@/lib/auth";
import { ApiError } from "@/lib/apiError";
import { digitsOnly } from "@/lib/utils";
import { AVATAR_UPLOAD_HINT, IMAGE_UPLOAD_ACCEPT } from "@/lib/imageUpload";
import type { User } from "@/types/api";

const GENDER_OPTIONS = ["Male", "Female", "Other"].map((label) => ({
  value: label,
  label,
}));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<keyof UpdateProfileInput, string>>;

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

function toFormState(user: User): UpdateProfileInput {
  return {
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    calling_number: user.calling_number ?? "",
    gender: user.gender ?? "Male",
    date_of_birth: user.date_of_birth ?? "",
    time_of_birth: user.time_of_birth ?? "",
    place_of_birth: user.place_of_birth ?? "",
  };
}

function validateProfileForm(form: UpdateProfileInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = form.name?.trim() ?? "";

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Enter at least 2 characters.";
  }

  const email = form.email?.trim() ?? "";
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const callingDigits = digitsOnly(form.calling_number);
  if (form.calling_number?.trim() && !/^[6-9]\d{9}$/.test(callingDigits)) {
    errors.calling_number = "Enter a valid 10-digit calling number.";
  }

  if (form.date_of_birth) {
    const dob = parseISO(form.date_of_birth);
    if (Number.isNaN(dob.getTime())) {
      errors.date_of_birth = "Enter a valid date of birth.";
    } else if (isAfter(startOfDay(dob), startOfDay(new Date()))) {
      errors.date_of_birth = "Date of birth cannot be in the future.";
    }
  }

  const place = form.place_of_birth?.trim() ?? "";
  if (place && place.length < 2) {
    errors.place_of_birth = "Enter at least 2 characters for place of birth.";
  }

  return errors;
}

export function PersonalDataForm() {
  const router = useRouter();
  const { isLoggedIn, ready } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<UpdateProfileInput>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; variant: "success" | "error" }>({
    visible: false,
    message: "",
    variant: "success",
  });
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);
  const dobMinDate = useMemo(() => subYears(today, 120), [today]);

  useEffect(() => {
    if (ready && !isLoggedIn) {
      router.replace("/login");
    }
  }, [ready, isLoggedIn, router]);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: ready && isLoggedIn,
  });

  useEffect(() => {
    if (!profileQuery.data) return;
    queueMicrotask(() => setForm(toFormState(profileQuery.data!)));
  }, [profileQuery.data]);

  const dismissToast = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  const updateMutation = useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfile(input),
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      updateStoredUser(user);
      setFieldErrors({});
      setShowConfirmModal(false);
      setProfileUpdated(true);
      setToast({
        visible: true,
        message: "Your profile has been updated successfully.",
        variant: "success",
      });
    },
    onError: (err) => {
      if (err instanceof ApiError && err.details?.length) {
        const apiErrors: FieldErrors = {};
        for (const detail of err.details) {
          apiErrors[detail.field as keyof UpdateProfileInput] = detail.message;
        }
        setFieldErrors(apiErrors);
      }
      setShowConfirmModal(false);
      setToast({
        visible: true,
        message:
          err instanceof ApiError ? err.message : "Couldn't update your profile. Please try again.",
        variant: "error",
      });
    },
  });

  const avatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      updateStoredUser(user);
      setAvatarError(null);
      setToast({
        visible: true,
        message: "Profile photo updated.",
        variant: "success",
      });
    },
    onError: (err) => {
      setAvatarError(err instanceof Error ? err.message : "Couldn't upload photo.");
    },
  });

  const clearFieldError = (key: keyof UpdateProfileInput) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    if (profileUpdated) setProfileUpdated(false);
  };

  const handleField = (key: keyof UpdateProfileInput) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    clearFieldError(key);
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const fieldError = (key: keyof UpdateProfileInput) => fieldErrors[key];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateProfileForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = () => {
    const { phone: _phone, ...payload } = form;
    updateMutation.mutate(payload);
  };

  const submitError =
    updateMutation.error instanceof ApiError ? updateMutation.error : null;

  const dobSelected = form.date_of_birth ? parseISO(form.date_of_birth) : undefined;
  const dobValue =
    dobSelected && !Number.isNaN(dobSelected.getTime()) ? dobSelected : undefined;

  const avatarSrc = profileQuery.data?.avatar_url || "/images/testimonials/avatar-3.png";

  if (!ready || (ready && !isLoggedIn)) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-6 rounded-2xl bg-surface-peach p-4 sm:p-6 md:p-10">
        <div className="flex flex-col gap-4 border-b border-border-dark/30 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-muted sm:h-16 sm:w-16">
              <Image
                src={avatarSrc}
                alt={profileQuery.data?.name ?? "Profile photo"}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-sans text-xl font-bold text-text-primary sm:text-2xl">
                  My Profile
                </h1>
                {profileUpdated && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                    <CheckCircle2 size={12} />
                    Updated
                  </span>
                )}
              </div>
              <p className="truncate text-sm text-text-muted">
                {profileQuery.data?.phone ?? "Manage your account details."}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarMutation.isPending}
              className="flex shrink-0 items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-saffron-400 disabled:opacity-50"
            >
              {avatarMutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Camera size={18} />
              )}
              Edit
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={IMAGE_UPLOAD_ACCEPT}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) avatarMutation.mutate(file);
                e.target.value = "";
              }}
            />
            <p className="max-w-[12rem] text-right text-xs text-text-muted sm:max-w-none">
              {AVATAR_UPLOAD_HINT}
            </p>
            {avatarError && <span className="text-xs text-error">{avatarError}</span>}
          </div>
        </div>

        {profileQuery.isLoading && (
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        )}

        {profileQuery.isError && (
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-10 text-center shadow-card">
            <p className="text-sm text-error">
              {profileQuery.error instanceof ApiError
                ? profileQuery.error.message
                : "Couldn't load your profile."}
            </p>
            <Button size="sm" onClick={() => profileQuery.refetch()}>
              Retry
            </Button>
          </div>
        )}

        {profileQuery.data && (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-card md:p-8">
            {profileUpdated && (
              <div
                role="status"
                className="mb-6 flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm font-medium text-success"
              >
                <CheckCircle2 size={18} className="shrink-0" />
                Your profile details have been saved.
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Name" error={fieldError("name")}>
                <Input
                  placeholder="Enter your name"
                  value={form.name ?? ""}
                  onChange={handleField("name")}
                  error={!!fieldError("name")}
                />
              </Field>
              <Field label="Email" error={fieldError("email")}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email ?? ""}
                  onChange={handleField("email")}
                  error={!!fieldError("email")}
                />
              </Field>

              <Field label="Whatsapp Number">
                <Input
                  type="tel"
                  value={form.phone ?? ""}
                  disabled
                  readOnly
                  containerClassName="cursor-not-allowed bg-surface-muted opacity-80"
                  leading={
                    <Image src="/icons/whatsapp.png" alt="" width={20} height={20} />
                  }
                />
              </Field>

              <Field label="Calling Number" error={fieldError("calling_number")}>
                <Input
                  type="tel"
                  placeholder="Enter calling number"
                  value={form.calling_number ?? ""}
                  onChange={handleField("calling_number")}
                  error={!!fieldError("calling_number")}
                />
              </Field>

              <Field label="Gender" error={fieldError("gender")}>
                <Select
                  value={form.gender ?? "Male"}
                  onChange={(value) => {
                    clearFieldError("gender");
                    setForm((f) => ({ ...f, gender: value }));
                  }}
                  options={GENDER_OPTIONS}
                  error={!!fieldError("gender")}
                />
              </Field>
              <Field label="Place of birth" error={fieldError("place_of_birth")}>
                <Input
                  placeholder="Enter your place of birth"
                  value={form.place_of_birth ?? ""}
                  onChange={handleField("place_of_birth")}
                  error={!!fieldError("place_of_birth")}
                />
              </Field>

              <Field label="Date of birth" error={fieldError("date_of_birth")}>
                <DateField
                  selected={dobValue}
                  onSelect={(date) => {
                    clearFieldError("date_of_birth");
                    setForm((f) => ({ ...f, date_of_birth: format(date, "yyyy-MM-dd") }));
                  }}
                  minDate={dobMinDate}
                  maxDate={today}
                  placeholder="Select date of birth"
                  error={!!fieldError("date_of_birth")}
                />
              </Field>
              <Field label="Time of birth" error={fieldError("time_of_birth")}>
                <Input
                  type="time"
                  value={form.time_of_birth ?? ""}
                  onChange={handleField("time_of_birth")}
                  error={!!fieldError("time_of_birth")}
                />
              </Field>
            </div>

            {submitError && !submitError.isValidationError && (
              <p className="mt-4 text-sm text-error">{submitError.message}</p>
            )}

            <div className="mt-8 flex justify-end">
              <Button type="submit" size="lg" className="rounded-full px-10">
                Save
              </Button>
            </div>
          </form>
        )}
      </div>

      {showConfirmModal && (
        <ProfileUpdateConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmUpdate}
          confirming={updateMutation.isPending}
        />
      )}

      <Toast
        message={toast.message}
        variant={toast.variant}
        visible={toast.visible}
        onDismiss={dismissToast}
      />
    </>
  );
}
