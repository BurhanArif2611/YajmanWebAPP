import { deleteDeviceToken, registerDeviceToken } from "@/lib/api/profile";
import { getAccessToken } from "@/lib/auth";
import {
  getFirebaseApp,
  getFirebaseVapidKey,
  getFirebaseWebConfig,
  getMissingFirebaseKeys,
  isWebPushConfigured,
} from "@/lib/firebase";
import { getWebClientContext } from "@/lib/webClient";

const STORAGE_KEY = "yajman_device_token";

const maskToken = (token: string): string =>
  token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;

const logPush = (message: string, extra?: Record<string, unknown>) => {
  if (extra) console.info(`[WEB_PUSH] ${message}`, extra);
  else console.info(`[WEB_PUSH] ${message}`);
};

export type WebPushInitResult = {
  configured: boolean;
  secureContext: boolean;
  permission: NotificationPermission | "unsupported";
  serviceWorker: "ready" | "missing" | "unsupported";
  tokenGenerated: boolean;
  registered: boolean;
};

export function getNotificationPermission(): NotificationPermission | "unsupported" {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}

export function getStoredDeviceToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem(STORAGE_KEY)?.trim();
  return token || null;
}

export function persistDeviceToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, token);
}

export function clearStoredDeviceToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

async function waitForActiveServiceWorker(
  registration: ServiceWorkerRegistration,
): Promise<void> {
  const worker = registration.installing || registration.waiting || registration.active;
  if (!worker || worker.state === "activated") {
    await navigator.serviceWorker.ready;
    return;
  }

  await new Promise<void>((resolve) => {
    const onChange = () => {
      if (worker.state === "activated" || worker.state === "redundant") {
        worker.removeEventListener("statechange", onChange);
        resolve();
      }
    };
    worker.addEventListener("statechange", onChange);
  });
  await navigator.serviceWorker.ready;
}

async function registerMessagingServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    logPush("Service worker API not available");
    return null;
  }

  const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
    scope: "/",
  });
  await waitForActiveServiceWorker(registration);

  const config = getFirebaseWebConfig();
  const target = registration.active;
  if (config && target) {
    target.postMessage({ type: "FIREBASE_CONFIG", config });
  }

  logPush("Service worker: ready", { scope: registration.scope });
  return registration;
}

async function fetchFcmWebToken(requestPermission: boolean): Promise<string | null> {
  if (typeof window === "undefined") return null;

  logPush("Starting token generation");
  logPush("Secure context", { isSecureContext: window.isSecureContext });

  if (!isWebPushConfigured()) {
    logPush("Firebase web config missing — token will not be generated", {
      missing: getMissingFirebaseKeys(),
    });
    return null;
  }
  logPush("VAPID configured: true");

  if (!("Notification" in window)) {
    logPush("Browser Notification API not available");
    return null;
  }

  logPush("Permission", { permission: Notification.permission });

  if (Notification.permission === "denied") {
    logPush("Permission denied — not generating a token");
    return null;
  }

  try {
    const { getMessaging, getToken, isSupported } = await import("firebase/messaging");
    if (!(await isSupported())) {
      logPush("Firebase Messaging is not supported in this browser");
      return null;
    }

    if (Notification.permission === "default") {
      if (!requestPermission) {
        logPush("Permission not requested yet (needs user gesture or existing grant)");
        return null;
      }
      const permission = await Notification.requestPermission();
      logPush("Permission after prompt", { permission });
      if (permission !== "granted") return null;
    }

    const app = await getFirebaseApp();
    const vapidKey = getFirebaseVapidKey();
    if (!app || !vapidKey) {
      logPush("Firebase app or VAPID key missing");
      return null;
    }

    const sw = await registerMessagingServiceWorker();
    if (!sw) {
      logPush("Service worker unavailable");
      return null;
    }

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: sw,
    });

    if (!token) {
      logPush("Token generated: false");
      return null;
    }

    persistDeviceToken(token);
    logPush("Token generated: true", { token: maskToken(token) });
    return token;
  } catch (err) {
    const error = err as { code?: string; message?: string };
    logPush("Token generation failed", {
      code: error.code,
      message: error.message,
    });
    return null;
  }
}

/**
 * Web push token for login. Missing token is OK — login must not be blocked.
 * Does not prompt for permission during OTP submit.
 */
export async function resolveDeviceToken(): Promise<string | null> {
  try {
    return await fetchFcmWebToken(false);
  } catch {
    return getStoredDeviceToken();
  }
}

async function registerTokenWithBackend(token: string): Promise<boolean> {
  if (!getAccessToken()) {
    logPush("Skip backend registration — user is not logged in");
    return false;
  }

  const web = getWebClientContext();
  logPush("Registering device");
  await registerDeviceToken({
    device_token: token,
    platform: web.platform,
    device_type: web.device_type,
    browser: web.browser,
    device_info: { device_source: web.device_source, channel: "web" },
  });
  persistDeviceToken(token);
  logPush("Device registered", {
    platform: web.platform,
    device_type: web.device_type,
    browser: web.browser,
    token: maskToken(token),
  });
  return true;
}

export async function initializeWebPush(
  options: { requestPermission?: boolean } = {},
): Promise<WebPushInitResult> {
  const permission =
    typeof window === "undefined" || !("Notification" in window)
      ? "unsupported"
      : Notification.permission;
  const result: WebPushInitResult = {
    configured: isWebPushConfigured(),
    secureContext: typeof window !== "undefined" && window.isSecureContext,
    permission,
    serviceWorker:
      typeof navigator !== "undefined" && "serviceWorker" in navigator
        ? "missing"
        : "unsupported",
    tokenGenerated: false,
    registered: false,
  };

  try {
    const token = await fetchFcmWebToken(Boolean(options.requestPermission));
    result.permission =
      typeof window === "undefined" || !("Notification" in window)
        ? "unsupported"
        : Notification.permission;
    result.tokenGenerated = Boolean(token);
    if (token) {
      result.serviceWorker = "ready";
      result.registered = await registerTokenWithBackend(token);
    }
  } catch (err) {
    logPush("initializeWebPush failed", {
      error: err instanceof Error ? err.message : "unknown",
    });
  }

  return result;
}

/** Register/refresh the current browser token while the user is already logged in. */
export async function syncDeviceTokenAfterLogin(): Promise<WebPushInitResult> {
  return initializeWebPush({ requestPermission: false });
}

export type ForegroundPushPayload = {
  title: string;
  body: string;
  deepLink?: string;
  notificationId?: string;
  type?: string;
  actionType?: string;
  actionValue?: string;
  campaignId?: string;
  url?: string;
  route?: string;
  data?: Record<string, string>;
};

/** Foreground FCM handler — in-app toast only. Native popups stay for background SW. */
export async function subscribeForegroundMessages(
  onPayload: (payload: ForegroundPushPayload) => void,
): Promise<() => void> {
  if (typeof window === "undefined" || !isWebPushConfigured()) return () => {};

  try {
    const { getMessaging, onMessage, isSupported } = await import("firebase/messaging");
    if (!(await isSupported())) return () => {};
    const app = await getFirebaseApp();
    if (!app) return () => {};

    logPush("Foreground handler registered");
    return onMessage(getMessaging(app), (payload) => {
      const data = payload.data ?? {};
      const next: ForegroundPushPayload = {
        title: payload.notification?.title || data.title || "New Notification",
        body:
          payload.notification?.body ||
          data.body ||
          data.message ||
          "",
        deepLink: data.deep_link || data.route || data.url,
        notificationId: data.notification_id,
        type: data.type,
        actionType: data.action_type,
        actionValue: data.action_value,
        campaignId: data.campaign_id,
        url: data.url,
        route: data.route,
        data,
      };
      logPush("Foreground message received", { title: next.title });
      onPayload(next);
    });
  } catch (err) {
    const error = err as { code?: string; message?: string };
    logPush("Foreground handler failed", {
      code: error.code,
      message: error.message,
    });
    return () => {};
  }
}

export function unregisterCurrentDeviceToken(): void {
  const token = getStoredDeviceToken();
  if (token) {
    deleteDeviceToken(token).catch(() => {});
  }
  clearStoredDeviceToken();
}
