-- ============================================================================
-- Genipse Bible · Desativar RLS para testes (Planos e Leitura em Grupo)
--
-- Execute este script no SQL Editor do Supabase para desativar o Row Level
-- Security (RLS) das tabelas envolvidas no plano de leitura e grupos.
-- ============================================================================

-- 1. Desativa RLS na tabela de planos
alter table if exists public.planos disable row level security;

-- 2. Desativa RLS na tabela de leitura (progresso dos capítulos)
alter table if exists public.leitura disable row level security;

-- 3. Desativa RLS nas tabelas de grupos, membros e perfis
alter table if exists public.grupos disable row level security;
alter table if exists public.membros disable row level security;
alter table if exists public.profiles disable row level security;

-- Garantir permissões de leitura/escrita para papéis anon e authenticated
grant all on table public.planos to anon, authenticated, service_role;
grant all on table public.leitura to anon, authenticated, service_role;
grant all on table public.grupos to anon, authenticated, service_role;
grant all on table public.membros to anon, authenticated, service_role;
grant all on table public.profiles to anon, authenticated, service_role;
