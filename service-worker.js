/* UMADC PWA Service Worker (cache + optional Firebase push)
   - Cache-first for static assets
   - Network fallback for others
   - If firebaseConfig is provided in push.js, enables background notifications (FCM)
*/
const CACHE_NAME = "umadc-pwa-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./regional.html",
  "./manifest.webmanifest",
  "./pwa.js",
  "./push.js",
  "./icon-192.png",
  "./icon-512.png",
  "./fundo.png",
  "./logo-ieadc.png",
  "./logo-umadc.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
    })
  );
});

/* OPTIONAL: Firebase background push
   - push.js can define self.__FIREBASE_CONFIG__ when you set firebaseConfig there.
*/
try {
  importScripts("./push.js"); // may define self.__FIREBASE_CONFIG__
  if (self.__FIREBASE_CONFIG__) {
    importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
    importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");
    firebase.initializeApp(self.__FIREBASE_CONFIG__);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      const title = (payload.notification && payload.notification.title) || "UMADC";
      const options = {
        body: (payload.notification && payload.notification.body) || "Novo aviso",
        icon: "./icon-192.png",
        badge: "./icon-192.png",
        data: payload.data || {}
      };
      self.registration.showNotification(title, options);
    });
  }
} catch (e) {
  // no-op
}
