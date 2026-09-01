import { apiFetch } from "@/lib/fetch";
import { getWebClientContext } from "@/lib/webClient";
import type {
  DeliveryPlatform,
  DeviceSource,
  DeviceType,
  User,
  VerifyOtpResponse,
} from "@/types/api";

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
  options?: {
    deviceToken?: string | null;
    deviceSource?: DeviceSource;
    platform?: DeliveryPlatform;
    deviceType?: DeviceType;
    browser?: string;
  },
) {
  const deviceToken = options?.deviceToken?.trim();
  const web = getWebClientContext();

  return apiFetch<VerifyOtpResponse>("/auth/verify-otp", {
    method: "POST",
    body: {
      phone,
      otp,
      country_code: countryCode,
      device_source: options?.deviceSource ?? web.device_source,
      platform: options?.platform ?? web.platform,
      device_type: options?.deviceType ?? web.device_type,
      browser: options?.browser ?? web.browser,
      ...(deviceToken ? { device_token: deviceToken } : {}),
    },
  });
}

export function logoutRequest(
  refreshToken: string,
  deviceToken?: string | null,
) {
  const token = deviceToken?.trim();
  return apiFetch<null>("/auth/logout", {
    method: "POST",
    auth: true,
    body: {
      refresh_token: refreshToken,
      ...(token ? { device_token: token } : {}),
    },
  });
}

export function getMe() {
  return apiFetch<User>("/auth/me", { auth: true });
}
