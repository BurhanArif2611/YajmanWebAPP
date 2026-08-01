// Plain (non-httpOnly) cookie helpers. We store auth tokens in cookies rather
// than localStorage so Server Components can read them too (via
// `next/headers`) — needed for SSR-authenticated pages like /profile.
// Real httpOnly cookies would require the backend to set them directly;
// until then this is the pragmatic client-writable middle ground.

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function setClientCookie(name: string, value: string, maxAgeSeconds = DEFAULT_MAX_AGE) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function getClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function removeClientCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}
