import { DAILY } from "./catalog";

/**
 * Qual versículo é "o de hoje": estável durante as 24h e igual para todo
 * mundo. Fica fora de `Hero.tsx` (que é "use client") porque a rota do
 * aviso diário (`/api/avisos/versiculo`, rodando no servidor) precisa
 * escolher exatamente o mesmo versículo que a home está mostrando.
 */
export function versiculoDoDia(data = new Date()) {
  const inicioDoAno = Date.UTC(data.getFullYear(), 0, 0);
  const dia = Math.floor(
    (Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) - inicioDoAno) / 86_400_000,
  );
  return DAILY[dia % DAILY.length];
}
