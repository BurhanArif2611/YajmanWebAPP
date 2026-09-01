"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { useNotificationToasts } from "@/components/notifications/NotificationToastProvider";
import { isWebPushConfigured } from "@/lib/firebase";
import {
  getNotificationPermission,
  initializeWebPush,
  subscribeForegroundMessages,
  syncDeviceTokenAfterLogin,
} from "@/lib/deviceToken";

/** Keep the web device token registered and show in-app push toasts. */
export function DeviceTokenSync() {
  const { isLoggedIn, ready } = useAuth();
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationToasts();
  const [showEnable, setShowEnable] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const [enableError, setEnableError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !isLoggedIn) {
      setShowEnable(false);
      return;
    }

    if (!isWebPushConfigured()) {
      void syncDeviceTokenAfterLogin();
      setShowEnable(false);
      return;
    }

    const permission = getNotificationPermission();
    if (permission === "granted") {
      void syncDeviceTokenAfterLogin();
      setShowEnable(false);
    } else if (permission === "default") {
      setShowEnable(true);
    } else {
      setShowEnable(false);
    }

    let unsubscribe: (() => void) | undefined;
    void subscribeForegroundMessages((payload) => {
      addNotification({
        title: payload.title,
        body: payload.body,
        deepLink: payload.deepLink,
        notificationId: payload.notificationId,
        type: payload.type,
        actionType: payload.actionType,
        actionValue: payload.actionValue,
        campaignId: payload.campaignId,
        url: payload.url,
        route: payload.route,
        data: payload.data,
      });
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }).then((fn) => {
      unsubscribe = fn;
    });

    const onVisible = () => {
      if (document.visibilityState === "visible" && getNotificationPermission() === "granted") {
        void syncDeviceTokenAfterLogin();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      unsubscribe?.();
    };
  }, [ready, isLoggedIn, queryClient, addNotification]);

  const handleEnable = async () => {
    setEnabling(true);
    setEnableError(null);
    try {
      const result = await initializeWebPush({ requestPermission: true });
      setShowEnable(result.permission !== "granted");
      if (result.permission === "granted" && !result.tokenGenerated) {
        setEnableError(
          "Notifications are allowed, but the browser token could not be created. Refresh and try Enable again.",
        );
        setShowEnable(true);
      }
    } finally {
      setEnabling(false);
    }
  };

  if (!showEnable) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[55] flex w-[min(28rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-2xl border border-border bg-white p-3 shadow-modal">
      <p className="min-w-0 flex-1 text-sm text-text-primary">
        {enableError || "Enable browser notifications for booking updates."}
      </p>
      <Button
        type="button"
        size="sm"
        className="shrink-0 rounded-full"
        disabled={enabling}
        onClick={() => void handleEnable()}
      >
        {enabling ? "Enabling..." : "Enable"}
      </Button>
    </div>
  );
}
