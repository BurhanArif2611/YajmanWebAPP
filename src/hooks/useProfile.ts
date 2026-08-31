"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/lib/api/profile";
import type { User } from "@/types/api";

/**
 * Live profile from the API, cached under ["profile"] and shared (deduped) with
 * every other consumer of that key — so an avatar upload or profile edit that
 * updates the cache is reflected everywhere at once.
 */
export function useProfile() {
  const { isLoggedIn, ready } = useAuth();

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: ready && isLoggedIn,
  });
}

/**
 * Best available current user: the live profile when loaded, otherwise the
 * user persisted at login. Use for header/sidebar chrome that must not flash
 * empty on navigation but should still track live updates.
 */
export function useCurrentUser(): User | null {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  return profile ?? user;
}
