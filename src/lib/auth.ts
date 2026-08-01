import { getClientCookie, removeClientCookie, setClientCookie } from "@/lib/cookies";
import type { AuthTokens, User } from "@/types/api";

// Client-side auth token store, backed by cookies so Server Components can
// also read the access token (via next/headers). Notifies listeners in the
// same tab via a custom event — storage events only fire in other tabs.

const ACCESS_TOKEN_COOKIE = "yajman_access_token";
const REFRESH_TOKEN_COOKIE = "yajman_refresh_token";
const USER_COOKIE = "yajman_user";
export const AUTH_EVENT = "yajman-auth-change";

export function getAccessToken(): string | null {
  return getClientCookie(ACCESS_TOKEN_COOKIE);
}

export function getRefreshToken(): string | null {
  return getClientCookie(REFRESH_TOKEN_COOKIE);
}

export function getStoredUser(): User | null {
  const raw = getClientCookie(USER_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setSession(tokens: AuthTokens, user: User) {
  setClientCookie(ACCESS_TOKEN_COOKIE, tokens.access_token, tokens.expires_in);
  setClientCookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token);
  setClientCookie(USER_COOKIE, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function updateStoredUser(user: User) {
  setClientCookie(USER_COOKIE, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

/** Access + refresh token rotation from a successful /auth/refresh-token call. */
export function setTokens(tokens: AuthTokens) {
  setClientCookie(ACCESS_TOKEN_COOKIE, tokens.access_token, tokens.expires_in);
  setClientCookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token);
}

export function clearSession() {
  removeClientCookie(ACCESS_TOKEN_COOKIE);
  removeClientCookie(REFRESH_TOKEN_COOKIE);
  removeClientCookie(USER_COOKIE);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
