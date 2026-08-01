"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getUnreadCount } from "@/lib/api/notifications";

export function useUnreadCount() {
  const { isLoggedIn, ready } = useAuth();

  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadCount,
    enabled: ready && isLoggedIn,
    refetchInterval: 60_000,
  });
}
