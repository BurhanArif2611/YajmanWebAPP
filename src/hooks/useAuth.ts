"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AUTH_EVENT,
  clearSession,
  getRefreshToken,
  getStoredUser,
} from "@/lib/auth";
import { logoutRequest } from "@/lib/api/auth";
import type { User } from "@/types/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setUser(getStoredUser());
      setReady(true);
    };

    queueMicrotask(sync);
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const logout = useCallback(() => {
    // Clear the local session immediately so the UI updates without
    // waiting on the network; fire the server-side revoke in the
    // background and ignore failures — the user is logged out locally
    // either way.
    const refreshToken = getRefreshToken();
    clearSession();
    if (refreshToken) {
      logoutRequest(refreshToken).catch(() => {});
    }
  }, []);

  return { user, phone: user?.phone ?? null, isLoggedIn: Boolean(user), ready, logout };
}
