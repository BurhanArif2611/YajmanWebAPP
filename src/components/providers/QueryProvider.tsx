"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationToastProvider } from "@/components/notifications/NotificationToastProvider";
import { DeviceTokenSync } from "@/components/providers/DeviceTokenSync";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <NotificationToastProvider>
        <DeviceTokenSync />
        {children}
      </NotificationToastProvider>
    </QueryClientProvider>
  );
}
