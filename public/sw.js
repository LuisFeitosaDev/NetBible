/**
 * Cache offline do Lumen.
 * O texto bíblico é imutável, então vale cache-first e para sempre.
 * O resto usa network-first com fallback, para o app atualizar sozinho.
 */
const BIBLE_CACHE = "lumen-biblia-v1";
const SHELL_CACHE = "lumen-shell-v1";
const ARTE_CACHE = "genipse-arte-v1";

/* A arte de capítulo mora no Supabase Storage, que é outra origem. Sem tratar
   isso aqui, o app perderia as imagens ao ficar offline, que é justamente o
   caso de uso de quem lê no ônibus. */
const ARTE_REMOTA = /\/storage\/v1\/object\/public\/arte\//;

/* Teto de arquivos guardados. Em 1189 capítulos, quem lê muito encheria o
   armazenamento do navegador; ao passar do teto os mais antigos saem. */
const ARTE_MAX = 300;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== BIBLE_CACHE && k !== SHELL_CACHE && k !== ARTE_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/** Corta o excesso pela ordem de entrada, que é a ordem em que o cache lista. */
async function podarArte(cache) {
  const chaves = await cache.keys();
  if (chaves.length <= ARTE_MAX) return;
  await Promise.all(chaves.slice(0, chaves.length - ARTE_MAX).map((k) => cache.delete(k)));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /*
   * Arte de capítulo: entrega do cache na hora e revalida por trás.
   *
   * Cache-first puro prenderia a imagem antiga para sempre, e o caminho é
   * reaproveitado quando uma arte é regerada com outro corte. Assim quem já
   * leu o capítulo vê na hora, e a versão nova chega na visita seguinte.
   */
  if (ARTE_REMOTA.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ARTE_CACHE);
        const hit = await cache.match(request);

        const rede = fetch(request)
          .then(async (response) => {
            if (response.ok) {
              await cache.put(request, response.clone());
              await podarArte(cache);
            }
            return response;
          })
          .catch(() => null);

        if (hit) {
          event.waitUntil(rede);
          return hit;
        }
        const response = await rede;
        if (response) return response;
        // Sem rede e sem cache: devolve vazio em vez de quebrar a página.
        return new Response("", { status: 504, statusText: "arte indisponível" });
      })(),
    );
    return;
  }

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

  /*
   * Fichas de capítulo: entrega do cache e revalida por trás.
   *
   * Cache-first puro prenderia o leitor a um resumo antigo depois de uma
   * correção; network-first tiraria a visão geral de quem lê offline. A
   * revalidação em segundo plano atende os dois casos.
   */
  if (url.pathname.startsWith("/capitulos/")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(SHELL_CACHE);
        const hit = await cache.match(request);
        const rede = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => null);

        if (hit) {
          event.waitUntil(rede);
          return hit;
        }
        const response = await rede;
        if (response) return response;
        // Sem ficha, o leitor mostra só o texto, que é o comportamento antigo.
        return new Response("{}", { headers: { "Content-Type": "application/json" } });
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
