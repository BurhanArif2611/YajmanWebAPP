import type { DeliveryPlatform, DeviceSource, DeviceType } from "@/types/api";

export type WebClientContext = {
  device_source: DeviceSource;
  platform: DeliveryPlatform;
  device_type: DeviceType;
  browser: string;
};

export function detectBrowser(): string {
  if (typeof navigator === "undefined") return "browser";
  const ua = navigator.userAgent;
  if (/edg/i.test(ua)) return "edge";
  if (/opr|opera/i.test(ua)) return "opera";
  if (/chrome|crios/i.test(ua)) return "chrome";
  if (/firefox|fxios/i.test(ua)) return "firefox";
  if (/safari/i.test(ua)) return "safari";
  return "browser";
}

export function getWebClientContext(): WebClientContext {
  return {
    device_source: "web",
    platform: "web",
    device_type: "browser",
    browser: detectBrowser(),
  };
}
