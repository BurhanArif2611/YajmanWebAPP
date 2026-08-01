import { apiFetch } from "@/lib/fetch";
import type { DeviceToken, User } from "@/types/api";

export function getProfile() {
  return apiFetch<User>("/profile", { auth: true });
}

export type UpdateProfileInput = Partial<{
  name: string;
  email: string;
  phone: string;
  calling_number: string;
  gender: string;
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
}>;

export function updateProfile(input: UpdateProfileInput) {
  return apiFetch<User>("/profile", {
    method: "PATCH",
    auth: true,
    body: input,
  });
}

const MAX_AVATAR_BYTES = 10 * 1024 * 1024;

export class AvatarValidationError extends Error { }

export function uploadAvatar(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new AvatarValidationError("Please choose an image file.");
  }
  if (file.size > MAX_AVATAR_BYTES) {
    throw new AvatarValidationError("Image must be 10MB or smaller.");
  }

  const formData = new FormData();
  formData.append("avatar", file);

  return apiFetch<User>("/profile/avatar", {
    method: "POST",
    auth: true,
    isFormData: true,
    body: formData,
  });
}

export function registerDeviceToken(input: {
  token: string;
  platform: "web" | "android" | "ios";
  device_info?: Record<string, unknown>;
}) {
  return apiFetch<DeviceToken>("/profile/device-tokens", {
    method: "POST",
    auth: true,
    body: input,
  });
}

export function listDeviceTokens() {
  return apiFetch<DeviceToken[]>("/profile/device-tokens", { auth: true });
}

export function deleteDeviceToken(token: string) {
  return apiFetch<null>("/profile/device-tokens", {
    method: "DELETE",
    auth: true,
    body: { token },
  });
}
