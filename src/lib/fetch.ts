import { ApiError, NetworkError } from "@/lib/apiError";
import { clearSession, getAccessToken, getRefreshToken, setTokens } from "@/lib/auth";
import type { ApiEnvelope, AuthTokens, Pagination } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

type QueryValue = string | number | boolean | undefined | null;

export type ApiFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, QueryValue>;
  auth?: boolean;
  /** Pass a FormData body as-is (skips JSON.stringify + Content-Type header). */
  isFormData?: boolean;
  signal?: AbortSignal;
};

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const url = new URL(`${API_BASE}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function resolveServerAccessToken(): Promise<string | null> {
  // Dynamic import so this file stays safe to use from Client Components too
  // — `next/headers` can only ever execute on the server.
  const { cookies } = await import("next/headers");
  const store = await cookies();
  return store.get("yajman_access_token")?.value ?? null;
}

let refreshPromise: Promise<AuthTokens | null> | null = null;

/** De-duplicates concurrent refresh attempts so parallel 401s don't each fire their own refresh call. */
async function refreshAccessToken(): Promise<AuthTokens | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return null;

      try {
        const res = await fetch(buildUrl("/auth/refresh-token"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
        const json = (await res.json()) as ApiEnvelope<AuthTokens>;
        if (!res.ok || !json.success) return null;
        setTokens(json.data);
        return json.data;
      } catch {
        return null;
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

type EnvelopeResult<T> = { data: T; pagination?: Pagination };

async function apiFetchEnvelope<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<EnvelopeResult<T>> {
  const { method = "GET", body, query, auth = false, isFormData = false, signal } = options;
  const isServer = typeof window === "undefined";

  const headers: Record<string, string> = {};
  if (!isFormData) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = isServer ? await resolveServerAccessToken() : getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const doFetch = () =>
    fetch(buildUrl(path, query), {
      method,
      headers,
      body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
      signal,
    });

  let res: Response;
  try {
    res = await doFetch();
  } catch {
    throw new NetworkError();
  }

  // Auth expired mid-session on the client — try one silent refresh + retry,
  // never on the server (a Server Component can't persist rotated cookies).
  if (res.status === 401 && auth && !isServer) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers["Authorization"] = `Bearer ${refreshed.access_token}`;
      try {
        res = await fetch(buildUrl(path, query), {
          method,
          headers,
          body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
          signal,
        });
      } catch {
        throw new NetworkError();
      }
    } else {
      clearSession();
      throw new ApiError("Your session has expired. Please log in again.", 401, "SESSION_EXPIRED");
    }
  }

  let json: ApiEnvelope<T>;
  try {
    json = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new ApiError(
      `Unexpected response from server (${res.status}).`,
      res.status,
      "INVALID_RESPONSE"
    );
  }

  if (!json.success) {
    throw new ApiError(
      json.error.message,
      json.error.status ?? res.status,
      json.error.code,
      json.error.details
    );
  }

  return { data: json.data, pagination: json.pagination ?? json.meta };
}

/** Standard call — just the payload. */
export async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<T> {
  const { data } = await apiFetchEnvelope<T>(path, options);
  return data;
}

/** For list endpoints that return a `pagination` block alongside `data`. */
export async function apiFetchPaginated<T>(
  path: string,
  options?: ApiFetchOptions
): Promise<EnvelopeResult<T>> {
  return apiFetchEnvelope<T>(path, options);
}

export function apiQueryString(query: Record<string, QueryValue>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) params.set(key, String(value));
  }
  return params.toString();
}
