// Mock local auth store — swap for real session/API calls when the backend
// is ready. Persists the verified phone number in localStorage and notifies
// listeners in the same tab via a custom event (storage events only fire
// across tabs, not the one that made the change).

const STORAGE_KEY = "yajman_auth_phone";
export const AUTH_EVENT = "yajman-auth-change";

export function getStoredPhone(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

export function setStoredPhone(phone: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, phone);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearStoredPhone() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
