"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NotificationToastContainer } from "@/components/notifications/NotificationToastContainer";

const AUTO_DISMISS_MS = 6000;
const MAX_VISIBLE = 5;
const LEAVE_MS = 200;

export type PushToastInput = {
  title: string;
  body?: string;
  deepLink?: string;
  notificationId?: string;
  type?: string;
  actionType?: string;
  actionValue?: string;
  campaignId?: string;
  url?: string;
  route?: string;
  data?: Record<string, string>;
};

export type PushToast = PushToastInput & {
  id: string;
  receivedAt: number;
  leaving?: boolean;
};

type NotificationToastContextValue = {
  notifications: PushToast[];
  addNotification: (input: PushToastInput) => void;
  removeNotification: (id: string) => void;
  clearNotification: (id: string) => void;
  clearNotifications: () => void;
};

const NotificationToastContext = createContext<NotificationToastContextValue | null>(null);

function nonempty(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function dedupeKey(input: PushToastInput): string | null {
  return (
    nonempty(input.notificationId) ||
    nonempty(input.campaignId) ||
    nonempty(input.title && input.body ? `${input.title}::${input.body}` : input.title) ||
    null
  );
}

export function NotificationToastProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<PushToast[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const current = prev.find((item) => item.id === id);
      if (!current || current.leaving) return prev;
      return prev.map((item) => (item.id === id ? { ...item, leaving: true } : item));
    });
    window.setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, LEAVE_MS);
  }, []);

  const addNotification = useCallback(
    (input: PushToastInput) => {
      const title = nonempty(input.title) || "New Notification";
      const key = dedupeKey({ ...input, title });
      const id = key || (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `toast-${Date.now()}`);

      setNotifications((prev) => {
        if (key && prev.some((item) => item.id === key && !item.leaving)) {
          return prev;
        }
        const next: PushToast = {
          ...input,
          id,
          title,
          body: input.body?.trim() ?? "",
          receivedAt: Date.now(),
        };
        return [next, ...prev.filter((item) => !item.leaving)].slice(0, MAX_VISIBLE);
      });
    },
    [],
  );

  const clearNotifications = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, leaving: true })));
    window.setTimeout(() => setNotifications([]), LEAVE_MS);
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
      clearNotification: removeNotification,
      clearNotifications,
    }),
    [notifications, addNotification, removeNotification, clearNotifications],
  );

  return (
    <NotificationToastContext.Provider value={value}>
      {children}
      <NotificationToastContainer
        notifications={notifications}
        autoDismissMs={AUTO_DISMISS_MS}
        onDismiss={removeNotification}
      />
    </NotificationToastContext.Provider>
  );
}

export function useNotificationToasts() {
  const context = useContext(NotificationToastContext);
  if (!context) {
    throw new Error("useNotificationToasts must be used within NotificationToastProvider");
  }
  return context;
}
