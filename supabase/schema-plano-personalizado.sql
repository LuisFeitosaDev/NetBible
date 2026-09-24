-- ============================================================================
-- Genipse Bible · plano de leitura personalizado
--
-- Rode este arquivo no SQL Editor DEPOIS de schema-planos.sql. É idempotente.
--
-- "Crie seu próprio plano" deixa a pessoa escolher quais livros ler e em que
-- ordem. Isso não cabe nas ordens fixas (canônica, cronológica, iniciante,
-- os planos famosos) — precisa de uma coluna a mais guardando a lista.
-- ============================================================================

alter table public.planos
  add column if not exists livros text[];
