const CACHE_NAME = "godlife-pwa-v13";
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/") && !url.pathname.startsWith("/api/icon/") && url.pathname !== "/api/manifest.webmanifest") {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/index.html"))),
  );
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { title: "갓생 알림", body: event.data?.text() || "" };
  }
  const title = payload.title || "갓생 알림";
  const options = {
    body: payload.body || "새로운 루틴 소식이 있어요.",
    tag: payload.tag || payload.type || "godlife",
    icon: "/api/icon/192.png",
    badge: "/api/icon/180.png",
    data: {
      url: payload.url || "/",
      type: payload.type || "godlife",
    },
  };
  event.waitUntil((async () => {
    await self.registration.showNotification(title, options);
    if (payload.badge && self.registration.setAppBadge) {
      try {
        await self.registration.setAppBadge(Math.max(1, Math.min(99, Number(payload.badge) || 1)));
      } catch {
        // Badging is only available for some installed web app contexts.
      }
    }
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/", self.location.origin).href;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of windows) {
      if ("focus" in client && new URL(client.url).origin === self.location.origin) {
        await client.focus();
        if ("navigate" in client) {
          await client.navigate(targetUrl);
        }
        return;
      }
    }
    await self.clients.openWindow(targetUrl);
  })());
});
