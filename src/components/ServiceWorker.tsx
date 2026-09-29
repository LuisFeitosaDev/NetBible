"use client";

import { useEffect } from "react";

/**
 * Registra o service worker só em produção — em dev ele atrapalha o hot reload.
 *
 * Também garante que o app rodando não fica preso numa versão velha. No
 * celular, "fechar" o app pelo trocador de apps costuma só congelar a aba, em
 * vez de recarregar de verdade — então uma pessoa pode ficar dias com o
 * código de antes de um deploy, silenciosamente sem os avisos por push da
 * versão nova (foi o caso do Filipe: o mural mostrava a meta batida, porque
 * isso nunca mudou, mas o aviso por push é código novo que o aparelho dele
 * não tinha baixado). Quando o app volta para o primeiro plano, ele confere
 * se saiu uma versão nova; se saiu, ela assume sozinha (`self.skipWaiting()`
 * em sw.js) e a página recarrega uma vez para rodar o código novo.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    // Só se a página já chegou com um service worker no controle: assim o
    // primeiríssimo acesso, que também dispara "controllerchange" ao ligar o
    // service worker pela primeira vez, não recarrega à toa.
    const jaTinhaControlador = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker
      .register("/sw.js")
      .then((registro) => {
        if (jaTinhaControlador) {
          let recarregou = false;
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (recarregou) return;
            recarregou = true;
            window.location.reload();
          });
        }

        // O navegador só confere se existe versão nova em alguns gatilhos
        // (navegação, ~24h); força a conferência sempre que o app volta a
        // ficar visível, que é exatamente o momento de reabrir o app.
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") void registro.update();
        });
      })
      .catch(() => {
        /* offline continua opcional */
      });
  }, []);

  return null;
}
