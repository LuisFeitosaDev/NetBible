-- ============================================================================
-- Genipse Bible · dados pessoais na conta
--
-- Rode este arquivo no SQL Editor DEPOIS do schema.sql. Também é idempotente.
--
-- Marcações, notas, progresso e favoritos deixam de viver só no dispositivo e
-- passam a seguir a conta. O IndexedDB continua existindo como cache offline:
-- o app escreve local primeiro e sincroniza depois, então funciona sem rede.
-- ============================================================================

create table if not exists public.marcacoes (
  perfil_id     uuid not null references public.profiles (id) on delete cascade,
  ref           text not null,                 -- "sl.23.1"
  slug          text not null,
  capitulo      integer not null,
  versiculo     integer not null,
  cor           text not null,
  texto         text not null default '',
  versao        text not null default 'ara',
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  primary key (perfil_id, ref)
);

create table if not exists public.notas (
  perfil_id     uuid not null references public.profiles (id) on delete cascade,
  ref           text not null,
  slug          text not null,
  capitulo      integer not null,
  versiculo     integer not null,
  corpo         text not null,
  texto         text not null default '',
  versao        text not null default 'ara',
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  primary key (perfil_id, ref)
);

create table if not exists public.leitura (
  perfil_id      uuid not null references public.profiles (id) on delete cascade,
  slug           text not null,
  concluidos     integer[] not null default '{}',
  ultimo_capitulo integer not null default 1,
  atualizado_em  timestamptz not null default now(),
  primary key (perfil_id, slug)
);

create table if not exists public.favoritos (
  perfil_id     uuid not null references public.profiles (id) on delete cascade,
  slug          text not null,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  primary key (perfil_id, slug)
);

create index if not exists marcacoes_sync_idx on public.marcacoes (perfil_id, atualizado_em);
create index if not exists notas_sync_idx     on public.notas (perfil_id, atualizado_em);
create index if not exists leitura_sync_idx   on public.leitura (perfil_id, atualizado_em);
create index if not exists favoritos_sync_idx on public.favoritos (perfil_id, atualizado_em);

-- ----------------------------------------------------------------- RLS ----
-- Regra única e simples: cada pessoa só enxerga e escreve as próprias linhas.
-- Nada aqui é compartilhado com grupo nenhum.

alter table public.marcacoes enable row level security;
alter table public.notas     enable row level security;
alter table public.leitura   enable row level security;
alter table public.favoritos enable row level security;

do $$
declare t text;
begin
  foreach t in array array['marcacoes', 'notas', 'leitura', 'favoritos'] loop
    execute format('drop policy if exists %I_proprias on public.%I', t, t);
    execute format(
      'create policy %I_proprias on public.%I for all
         using (perfil_id = auth.uid())
         with check (perfil_id = auth.uid())',
      t, t
    );
  end loop;
end $$;
