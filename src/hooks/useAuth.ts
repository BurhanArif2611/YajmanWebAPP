"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AUTH_EVENT,
  clearStoredPhone,
  getStoredPhone,
  setStoredPhone,
} from "@/lib/auth";

export function useAuth() {
  const [phone, setPhone] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setPhone(getStoredPhone());
      setReady(true);
    };

    queueMicrotask(onChange);
    window.addEventListener(AUTH_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(AUTH_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const login = useCallback((verifiedPhone: string) => {
    setStoredPhone(verifiedPhone);
  }, []);

  const logout = useCallback(() => {
    clearStoredPhone();
  }, []);

  return { phone, isLoggedIn: Boolean(phone), ready, login, logout };
}
