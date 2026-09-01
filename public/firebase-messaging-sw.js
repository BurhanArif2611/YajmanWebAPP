/* Firebase Cloud Messaging service worker — must be served from the site origin. */
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAU6wKbq_vUcYwQrl7kNWYi7n1lmLdpDrw",
  authDomain: "yajman-81a78.firebaseapp.com",
  projectId: "yajman-81a78",
  storageBucket: "yajman-81a78.firebasestorage.app",
  messagingSenderId: "68853873791",
  appId: "1:68853873791:web:11e2763592a3395788134a",
};

let messagingReady = false;

function showPushNotification(payload) {
  const title =
    (payload && payload.notification && payload.notification.title) ||
    (payload && payload.data && payload.data.title) ||
    "Yajman";
  const body =
    (payload && payload.notification && payload.notification.body) ||
    (payload && payload.data && payload.data.body) ||
    (payload && payload.data && payload.data.message) ||
    "";
  const data = (payload && payload.data) || {};
  return self.registration.showNotification(title, {
    body: body,
    icon: "/images/logo/logo.svg",
    tag: data.notification_id || data.campaign_id || "yajman-web-push",
    renotify: true,
    data: data,
  });
}

function initFirebaseMessaging(config) {
  if (messagingReady || !config || !config.apiKey || !config.projectId) return;
  if (!firebase.apps.length) firebase.initializeApp(config);
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(function (payload) {
    return showPushNotification(payload);
  });
  messagingReady = true;
}

initFirebaseMessaging(firebaseConfig);

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    fetch("/api/firebase-config")
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (config) {
        initFirebaseMessaging(config);
      })
      .catch(function () {})
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    initFirebaseMessaging(event.data.config);
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const raw =
    (event.notification.data && event.notification.data.deep_link) ||
    "/profile/notifications";
  const origin = self.location.origin;
  const url = /^https?:\/\//i.test(raw)
    ? raw
    : raw.indexOf("/") === 0
      ? origin + raw
      : origin + "/profile/notifications";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (windowClients) {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.indexOf(origin) === 0 && "focus" in client) {
          client.focus();
          if ("navigate" in client) client.navigate(url);
          return;
        }
      }
      return clients.openWindow(url);
    })
  );
});
