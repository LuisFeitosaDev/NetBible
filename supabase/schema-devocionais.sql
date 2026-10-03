-- ============================================================================
-- Genipse Bible · devocionais na conta e lembrete diário
--
-- Rode este arquivo no SQL Editor DEPOIS de schema-avisos-versiculo.sql (ele
-- usa `push_inscricoes` e `push_config`). É idempotente.
--
-- 1. `devocional_progresso`: os dias feitos e as anotações de cada série,
--    uma linha por pessoa e série. O app escreve no aparelho primeiro e
--    `lib/sync.ts` traz para cá; vence a escrita mais recente da série.
-- 2. `lembretes`: se a pessoa quer o lembrete diário do devocional.
-- 3. `destinos_lembrete_devocional`: a rota /api/avisos/devocional (Vercel
--    Cron, 1x por dia) descobre quem ainda não fez o devocional hoje.
-- ============================================================================

-- -------------------------------------------------------- 1. progresso ----
create table if not exists public.devocional_progresso (
  perfil_id     uuid not null references public.profiles (id) on delete cascade,
  devocional_id text not null check (length(devocional_id) between 1 and 80),
  feitos        integer[] not null default '{}',
  -- { "3": "o que a pessoa escreveu no Meditar do dia 3" }
  anotacoes     jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now(),
  primary key (perfil_id, devocional_id)
);

alter table public.devocional_progresso enable row level security;

drop policy if exists devocional_progresso_proprias on public.devocional_progresso;
create policy devocional_progresso_proprias on public.devocional_progresso for all
  using (perfil_id = auth.uid())
  with check (perfil_id = auth.uid());

-- -------------------------------------------------------- 2. lembretes ----
-- Uma linha por pessoa, com uma coluna por tipo de lembrete: hoje só o do
-- devocional, mas o plano de leitura pode ganhar o seu sem tabela nova.
create table if not exists public.lembretes (
  perfil_id     uuid primary key references public.profiles (id) on delete cascade,
  devocional    boolean not null default false,
  atualizado_em timestamptz not null default now()
);

alter table public.lembretes enable row level security;

drop policy if exists lembretes_proprios on public.lembretes;
create policy lembretes_proprios on public.lembretes for all
  using (perfil_id = auth.uid())
  with check (perfil_id = auth.uid());

-- ---------------------------------------------------------- 3. destinos ---
-- Quem tem o lembrete ligado, uma série começada e não mexeu em devocional
-- nenhum desde a meia-noite de Brasília. Para cada aparelho dessa pessoa,
-- devolve as séries com algum dia feito, da mais recente para a mais
-- antiga; a rota escolhe a primeira não terminada (o número de dias de cada
-- série está no código, não aqui).
create or replace function public.destinos_lembrete_devocional(p_segredo text)
returns table (
  perfil_id    uuid,
  endpoint     text,
  chave_p256dh text,
  chave_auth   text,
  series       jsonb
)
language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
declare
  hoje timestamptz :=
    date_trunc('day', now() at time zone 'America/Sao_Paulo') at time zone 'America/Sao_Paulo';
begin
  if p_segredo is null or p_segredo <> (select cron_segredo from push_config where id) then
    raise exception 'segredo inválido';
  end if;

  return query
    with pendentes as (
      select dp.perfil_id,
             jsonb_agg(
               jsonb_build_object('id', dp.devocional_id, 'feitos', dp.feitos)
               order by dp.atualizado_em desc
             ) filter (where cardinality(dp.feitos) > 0) as series
        from devocional_progresso dp
        join lembretes l on l.perfil_id = dp.perfil_id and l.devocional
       group by dp.perfil_id
      -- Anotar ou recomeçar hoje também conta: a pessoa já passou por aqui.
      having max(dp.atualizado_em) < hoje
    )
    select p.perfil_id, i.endpoint, i.chave_p256dh, i.chave_auth, p.series
      from pendentes p
      join push_inscricoes i on i.perfil_id = p.perfil_id
     where p.series is not null;
end;
$$;

-- Chamável sem sessão: quem chama é a Vercel. Quem protege é a senha
-- conferida dentro da função, como em destinos_versiculo_diario.
revoke all on function public.destinos_lembrete_devocional(text) from public;
grant execute on function public.destinos_lembrete_devocional(text) to anon, authenticated;
