import { apiFetch } from "@/lib/fetch";
import type { User, VerifyOtpResponse } from "@/types/api";

export function sendOtp(phone: string, countryCode = "+91") {
  return apiFetch<{ expires_in: number }>("/auth/send-otp", {
    method: "POST",
    body: { phone, country_code: countryCode },
  });
}

export function verifyOtp(
  phone: string,
  otp: string,
  countryCode = "+91",
  deviceSource: "web" | "android" | "ios" = "web"
) {
  return apiFetch<VerifyOtpResponse>("/auth/verify-otp", {
    method: "POST",
    body: { phone, otp, country_code: countryCode, device_source: deviceSource },
  });
}

export function logoutRequest(refreshToken: string) {
  return apiFetch<null>("/auth/logout", {
    method: "POST",
    auth: true,
    body: { refresh_token: refreshToken },
  });
}

export function getMe() {
  return apiFetch<User>("/auth/me", { auth: true });
}
