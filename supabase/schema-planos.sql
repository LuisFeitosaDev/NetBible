-- ============================================================================
-- Genipse Bible · plano de leitura na conta
--
-- Rode este arquivo no SQL Editor DEPOIS do schema-conta.sql. É idempotente.
--
-- Guarda só a configuração do plano: qual ordem, quantos dias, quando começou.
-- O que já foi lido NÃO vem para cá, porque já mora em `public.leitura`, que é
-- a fonte única de progresso do app. Duplicar aqui criaria duas verdades sobre
-- o mesmo capítulo e, na primeira divergência, uma delas estaria errada.
--
-- Uma linha por pessoa, e é por isso que `perfil_id` é a chave primária
-- sozinha: o app mantém um plano de cada vez, e o banco passa a garantir isso
-- em vez de confiar que o cliente se comporte.
-- ============================================================================

create table if not exists public.planos (
  perfil_id        uuid primary key references public.profiles (id) on delete cascade,
  modelo           text not null,                 -- "cronologico-1a" ou "personalizado"
  nome             text not null,
  ordem            text not null check (ordem in ('canonica', 'cronologica')),
  dias             integer not null check (dias between 1 and 7300),
  inicio_em        timestamptz not null,
  -- Quantos capítulos do roteiro já estavam lidos no dia 1. Sem isso a
  -- previsão de ritmo divide a leitura de uma vida inteira pelos dias de plano.
  lidos_ao_comecar integer not null default 0 check (lidos_ao_comecar >= 0),
  criado_em        timestamptz not null default now(),
  atualizado_em    timestamptz not null default now()
);

-- Sem índice de sincronização aqui: as outras tabelas precisam de um sobre
-- (perfil_id, atualizado_em) porque têm muitas linhas por pessoa. Esta tem
-- uma, e a chave primária já resolve a busca.

-- ----------------------------------------------------------------- RLS ----
-- Mesma regra do resto: cada pessoa só enxerga e escreve a própria linha.

alter table public.planos enable row level security;

drop policy if exists planos_proprias on public.planos;
create policy planos_proprias on public.planos for all
  using (perfil_id = auth.uid())
  with check (perfil_id = auth.uid());
