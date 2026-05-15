const CACHE_NAME = "temporun-v1";
const STATIC_ASSETS = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
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
  // Deixa passar requisições de API e mapbox
  const url = event.request.url;
  if (
    url.includes("supabase.co") ||
    url.includes("mapbox.com") ||
    url.includes("stripe.com") ||
    url.includes("anthropic.com") ||
    url.includes("strava.com") ||
    url.includes("googleapis.com")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match("/index.html"));
    })
  );
});
