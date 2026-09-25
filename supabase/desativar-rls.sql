-- ============================================================================
-- Genipse Bible · Correção de Banco e Desativação de RLS
--
-- Execute este script no SQL Editor do Supabase para:
-- 1. Remover a restrição que bloqueava a inserção de planos ('iniciante', 'personalizado', etc.)
-- 2. Garantir a coluna 'livros'
-- 3. Desativar RLS para testes em todas as tabelas envolvidas
-- ============================================================================

-- 1. Corrige a restrição de ordem que causava o erro 23514 ("planos_ordem_check")
alter table if exists public.planos drop constraint if exists planos_ordem_check;
alter table if exists public.planos add constraint planos_ordem_check
  check (ordem in ('canonica', 'cronologica', 'iniciante', 'proverbios', 'evangelhos', 'personalizado'));

-- 2. Garante que a coluna de livros exista
alter table if exists public.planos add column if not exists livros text[];

-- 3. Desativa o RLS das tabelas de planos, leitura e grupos
alter table if exists public.planos disable row level security;
alter table if exists public.leitura disable row level security;
alter table if exists public.grupos disable row level security;
alter table if exists public.membros disable row level security;
alter table if exists public.profiles disable row level security;

-- 4. Concede acesso total aos papéis do Supabase (anon, authenticated, service_role)
grant all on table public.planos to anon, authenticated, service_role;
grant all on table public.leitura to anon, authenticated, service_role;
grant all on table public.grupos to anon, authenticated, service_role;
grant all on table public.membros to anon, authenticated, service_role;
grant all on table public.profiles to anon, authenticated, service_role;
