import { apiFetch } from "@/lib/fetch";
import {
  ImageValidationError,
  validateImageUpload,
} from "@/lib/imageUpload";
import type { DeliveryPlatform, DeviceToken, DeviceType, User } from "@/types/api";

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

export { ImageValidationError as AvatarValidationError };

export function uploadAvatar(file: File) {
  validateImageUpload(file);

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
  device_token: string;
  platform: DeliveryPlatform;
  device_type?: DeviceType;
  browser?: string;
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
    body: { device_token: token },
  });
}
