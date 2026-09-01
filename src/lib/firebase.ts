import type { FirebaseApp } from "firebase/app";

export type FirebaseWebConfig = {
  apiKey: string;
  authDomain?: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId: string;
  appId: string;
};

/** Firebase Console web app for project yajman-81a78. Env vars override when set. */
const DEFAULT_FIREBASE_WEB_CONFIG: FirebaseWebConfig = {
  apiKey: "AIzaSyAU6wKbq_vUcYwQrl7kNWYi7n1lmLdpDrw",
  authDomain: "yajman-81a78.firebaseapp.com",
  projectId: "yajman-81a78",
  storageBucket: "yajman-81a78.firebasestorage.app",
  messagingSenderId: "68853873791",
  appId: "1:68853873791:web:11e2763592a3395788134a",
};

export function getFirebaseWebConfig(): FirebaseWebConfig {
  return {
    apiKey:
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim() || DEFAULT_FIREBASE_WEB_CONFIG.apiKey,
    authDomain:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() ||
      DEFAULT_FIREBASE_WEB_CONFIG.authDomain,
    projectId:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() || DEFAULT_FIREBASE_WEB_CONFIG.projectId,
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() ||
      DEFAULT_FIREBASE_WEB_CONFIG.storageBucket,
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim() ||
      DEFAULT_FIREBASE_WEB_CONFIG.messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim() || DEFAULT_FIREBASE_WEB_CONFIG.appId,
  };
}

/** Web Push certificate key pair from Firebase Console → Cloud Messaging. */
const DEFAULT_VAPID_KEY =
  "BKZXhV-12syh8nSv2s_4cp9yWAoMcpk8lc1IMwPC2mjDjmvU6QxRarsOKwMgCXjKyscraJYeWl4FxugVrPP7jGM";

export function getFirebaseVapidKey(): string | null {
  return process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY?.trim() || DEFAULT_VAPID_KEY;
}

export function getMissingFirebaseKeys(): string[] {
  return getFirebaseVapidKey() ? [] : ["NEXT_PUBLIC_FIREBASE_VAPID_KEY"];
}

export function isWebPushConfigured(): boolean {
  const config = getFirebaseWebConfig();
  return Boolean(
    config.apiKey &&
      config.projectId &&
      config.messagingSenderId &&
      config.appId &&
      getFirebaseVapidKey(),
  );
}

let appPromise: Promise<FirebaseApp | null> | null = null;

export async function getFirebaseApp(): Promise<FirebaseApp | null> {
  if (typeof window === "undefined") return null;
  const config = getFirebaseWebConfig();

  if (!appPromise) {
    appPromise = (async () => {
      const { getApp, getApps, initializeApp } = await import("firebase/app");
      return getApps().length ? getApp() : initializeApp(config);
    })();
  }

  return appPromise;
}
