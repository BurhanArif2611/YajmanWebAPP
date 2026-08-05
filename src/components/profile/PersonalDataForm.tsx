"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { getProfile, updateProfile, uploadAvatar, type UpdateProfileInput } from "@/lib/api/profile";
import { updateStoredUser } from "@/lib/auth";
import { ApiError } from "@/lib/apiError";
import type { User } from "@/types/api";

const GENDER_OPTIONS = ["Male", "Female", "Other"].map((label) => ({
  value: label,
  label,
}));

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

export function PersonalDataForm() {
  const router = useRouter();
  const { isLoggedIn, ready } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<UpdateProfileInput>({});
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

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

  const updateMutation = useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfile(input),
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      updateStoredUser(user);
      setSavedMessage("Profile updated.");
      setTimeout(() => setSavedMessage(null), 3000);
    },
  });

  const avatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      updateStoredUser(user);
      setAvatarError(null);
    },
    onError: (err) => {
      setAvatarError(err instanceof Error ? err.message : "Couldn't upload photo.");
    },
  });

  const handleField = (key: keyof UpdateProfileInput) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  const submitError =
    updateMutation.error instanceof ApiError ? updateMutation.error : null;

  const avatarSrc = profileQuery.data?.avatar_url || "/images/testimonials/avatar-3.png";

  if (!ready || (ready && !isLoggedIn)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface-peach p-6 md:p-10">
      <div className="flex items-center justify-between gap-4 border-b border-border-dark/30 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-surface-muted">
            <Image
              src={avatarSrc}
              alt={profileQuery.data?.name ?? "Profile photo"}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-sans text-2xl font-bold text-text-primary">
              My Profile
            </h1>
            <p className="text-sm text-text-muted">
              {profileQuery.data?.phone ?? "Manage your account details."}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
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
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) avatarMutation.mutate(file);
              e.target.value = "";
            }}
          />
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Name" error={submitError?.fieldMessage("name")}>
              <Input
                placeholder="Enter your name"
                value={form.name ?? ""}
                onChange={handleField("name")}
              />
            </Field>
            <Field label="Email" error={submitError?.fieldMessage("email")}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={form.email ?? ""}
                onChange={handleField("email")}
              />
            </Field>

            <Field label="Whatsapp Number" error={submitError?.fieldMessage("phone")}>
              <Input
                type="tel"
                value={form.phone ?? ""}
                onChange={handleField("phone")}
                leading={
                  <Image src="/icons/whatsapp.png" alt="" width={20} height={20} />
                }
              />
            </Field>


            <Field label="Gender">
              <Select
                value={form.gender ?? "Male"}
                onChange={(value) => setForm((f) => ({ ...f, gender: value }))}
                options={GENDER_OPTIONS}
              />
            </Field>
            <Field label="Place of birth">
              <Input
                placeholder="Enter your place of birth"
                value={form.place_of_birth ?? ""}
                onChange={handleField("place_of_birth")}
              />
            </Field>

            <Field label="Date of birth">
              <Input
                type="date"
                value={form.date_of_birth ?? ""}
                onChange={handleField("date_of_birth")}
              />
            </Field>
            <Field label="Time of birth">
              <Input
                type="time"
                value={form.time_of_birth ?? ""}
                onChange={handleField("time_of_birth")}
              />
            </Field>
          </div>

          {submitError && !submitError.isValidationError && (
            <p className="mt-4 text-sm text-error">{submitError.message}</p>
          )}
          {savedMessage && (
            <p className="mt-4 text-sm font-medium text-success">{savedMessage}</p>
          )}

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="rounded-full px-10"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
