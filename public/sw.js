/**
 * Cache offline do Lumen.
 * O texto bíblico é imutável, então vale cache-first e para sempre.
 * O resto usa network-first com fallback, para o app atualizar sozinho.
 */
const BIBLE_CACHE = "lumen-biblia-v1";
const SHELL_CACHE = "lumen-shell-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== BIBLE_CACHE && k !== SHELL_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // O índice lista as traduções disponíveis e muda quando alguma entra ou sai.
  // Cache-first aqui prenderia o app à lista antiga para sempre, então ele é o
  // único arquivo de /biblia/ que tenta a rede antes.
  if (url.pathname === "/biblia/index.json") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(BIBLE_CACHE);
        try {
          const response = await fetch(request, { cache: "no-store" });
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch {
          const hit = await cache.match(request);
          if (hit) return hit;
          throw new Error("offline sem índice em cache");
        }
      })(),
    );
    return;
  }

  if (url.pathname.startsWith("/biblia/")) {
    event.respondWith(
      caches.open(BIBLE_CACHE).then(async (cache) => {
        const hit = await cache.match(request);
        if (hit) return hit;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      }),
    );
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(SHELL_CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          const shell = await caches.match("/");
          if (shell) return shell;
        }
        throw new Error("offline");
      }
    })(),
  );
});
