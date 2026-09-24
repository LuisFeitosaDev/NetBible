-- ============================================================================
-- Lumen · aba Grupos
-- Rode este arquivo inteiro no SQL Editor do Supabase (uma vez só).
-- Ele é idempotente: pode rodar de novo sem quebrar nada.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------- perfis --
-- Todo mundo entra com login anônimo do Supabase: sem e-mail, sem senha.
-- O perfil guarda só o nome que a pessoa digita ao entrar num grupo.
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nome       text not null check (length(trim(nome)) between 2 and 40),
  criado_em  timestamptz not null default now()
);

-- ----------------------------------------------------------------- grupos --
create table if not exists public.grupos (
  id         uuid primary key default gen_random_uuid(),
  codigo     text unique not null,
  nome       text not null check (length(trim(nome)) between 2 and 60),
  descricao  text,
  lider_id   uuid not null references public.profiles (id) on delete cascade,
  criado_em  timestamptz not null default now()
);

create table if not exists public.membros (
  grupo_id   uuid not null references public.grupos (id) on delete cascade,
  perfil_id  uuid not null references public.profiles (id) on delete cascade,
  papel      text not null default 'participante' check (papel in ('lider', 'participante')),
  entrou_em  timestamptz not null default now(),
  primary key (grupo_id, perfil_id)
);

create index if not exists membros_perfil_idx on public.membros (perfil_id);

-- ---------------------------------------------------------------- estudos --
create table if not exists public.estudos (
  id           uuid primary key default gen_random_uuid(),
  grupo_id     uuid not null references public.grupos (id) on delete cascade,
  metodo       text not null,
  titulo       text not null,
  -- { slug, nome, capitulo, versiculoInicio, versiculoFim }
  referencia   jsonb,
  tema         text,
  publico      text not null default 'jovens',
  nivel        text not null default 'intermediario',
  duracao_min  integer not null default 45,
  formato      text not null default 'individual'
               check (formato in ('individual', 'duplas', 'equipes')),
  etapa_atual  integer not null default 0,
  status       text not null default 'rascunho'
               check (status in ('rascunho', 'ativo', 'encerrado')),
  criado_por   uuid not null references public.profiles (id),
  iniciado_em  timestamptz,
  encerrado_em timestamptz,
  criado_em    timestamptz not null default now()
);

create index if not exists estudos_grupo_idx on public.estudos (grupo_id, criado_em desc);

-- As etapas nascem do template do método, no momento em que o estudo é criado.
create table if not exists public.etapas (
  id          uuid primary key default gen_random_uuid(),
  estudo_id   uuid not null references public.estudos (id) on delete cascade,
  ordem       integer not null,
  chave       text not null,
  titulo      text not null,
  icone       text,
  descricao   text,
  liberada    boolean not null default false,
  liberada_em timestamptz,
  unique (estudo_id, ordem)
);

create table if not exists public.equipes (
  id         uuid primary key default gen_random_uuid(),
  estudo_id  uuid not null references public.estudos (id) on delete cascade,
  nome       text not null,
  cor        text not null default '#f5c45e'
);

create table if not exists public.equipe_membros (
  equipe_id  uuid not null references public.equipes (id) on delete cascade,
  perfil_id  uuid not null references public.profiles (id) on delete cascade,
  primary key (equipe_id, perfil_id)
);

-- equipe_id nulo = pergunta para todo mundo.
create table if not exists public.perguntas (
  id         uuid primary key default gen_random_uuid(),
  estudo_id  uuid not null references public.estudos (id) on delete cascade,
  etapa_id   uuid not null references public.etapas (id) on delete cascade,
  ordem      integer not null default 0,
  texto      text not null,
  ajuda      text,
  equipe_id  uuid references public.equipes (id) on delete set null
);

create index if not exists perguntas_etapa_idx on public.perguntas (etapa_id, ordem);

create table if not exists public.respostas (
  id           uuid primary key default gen_random_uuid(),
  pergunta_id  uuid not null references public.perguntas (id) on delete cascade,
  perfil_id    uuid not null references public.profiles (id) on delete cascade,
  equipe_id    uuid references public.equipes (id) on delete set null,
  texto        text not null check (length(trim(texto)) > 0),
  criado_em    timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (pergunta_id, perfil_id)
);

create index if not exists respostas_pergunta_idx on public.respostas (pergunta_id);

create table if not exists public.reacoes (
  resposta_id uuid not null references public.respostas (id) on delete cascade,
  perfil_id   uuid not null references public.profiles (id) on delete cascade,
  tipo        text not null default 'amem',
  primary key (resposta_id, perfil_id)
);

-- Privada por padrão: o participante decide se compartilha.
create table if not exists public.reflexoes (
  estudo_id     uuid not null references public.estudos (id) on delete cascade,
  perfil_id     uuid not null references public.profiles (id) on delete cascade,
  texto         text not null,
  compartilhada boolean not null default false,
  atualizado_em timestamptz not null default now(),
  primary key (estudo_id, perfil_id)
);

create table if not exists public.resumos (
  estudo_id  uuid primary key references public.estudos (id) on delete cascade,
  texto      text not null,
  destaques  jsonb,
  criado_em  timestamptz not null default now()
);

-- ============================================================================
-- Funções auxiliares
--
-- SECURITY DEFINER de propósito: sem isso, uma policy de `membros` que consulta
-- `membros` entra em recursão infinita no Postgres.
-- ============================================================================

create or replace function public.eh_membro(p_grupo uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from membros
    where grupo_id = p_grupo and perfil_id = auth.uid()
  );
$$;

create or replace function public.eh_lider(p_grupo uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from membros
    where grupo_id = p_grupo and perfil_id = auth.uid() and papel = 'lider'
  );
$$;

create or replace function public.eh_membro_estudo(p_estudo uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from estudos e
    join membros m on m.grupo_id = e.grupo_id
    where e.id = p_estudo and m.perfil_id = auth.uid()
  );
$$;

create or replace function public.eh_lider_estudo(p_estudo uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from estudos e
    join membros m on m.grupo_id = e.grupo_id
    where e.id = p_estudo and m.perfil_id = auth.uid() and m.papel = 'lider'
  );
$$;

-- Código curto e legível, no estilo GENESIS-7K42R.
-- Sem 0/O/1/I na parte aleatória, para ninguém errar ao digitar.
-- Usa o epoch em milissegundos como semente do sufixo para reduzir colisões
-- sob criação concorrente (dois líderes ao mesmo tempo).
create or replace function public.gerar_codigo()
returns text language plpgsql volatile set search_path = public as $$
declare
  palavras text[] := array[
    'GENESIS','EXODO','SALMOS','PROVERBIOS','ISAIAS','EVANGELHO','ATOS','ROMANOS',
    'EFESIOS','FILIPOS','TIAGO','PEDRO','JOAO','APOCALIPSE','ALIANCA','GRACA',
    'LUZ','CAMINHO','VIDEIRA','PASTOR','SEMENTE','FAROL','ANCORA','RAIZ'
  ];
  alfabeto text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  tentativa text;
  sufixo text;
  i integer;
begin
  for _ in 1..80 loop
    sufixo := '';
    for i in 1..5 loop
      sufixo := sufixo || substr(alfabeto, 1 + floor(random() * length(alfabeto))::int, 1);
    end loop;
    tentativa := palavras[1 + floor(random() * array_length(palavras, 1))::int] || '-' || sufixo;
    if not exists (select 1 from grupos where codigo = tentativa) then
      return tentativa;
    end if;
  end loop;
  -- Improvável, mas não deixa o usuário na mão.
  return 'GRUPO-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
end;
$$;

-- ============================================================================
-- RPCs
-- ============================================================================

-- Garante que o perfil existe e atualiza o nome.
create or replace function public.salvar_perfil(p_nome text)
returns public.profiles language plpgsql security definer set search_path = public as $$
declare
  linha profiles;
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;

  insert into profiles (id, nome) values (auth.uid(), trim(p_nome))
  on conflict (id) do update set nome = excluded.nome
  returning * into linha;

  return linha;
end;
$$;

create or replace function public.criar_grupo(p_nome text, p_descricao text default null)
returns public.grupos language plpgsql security definer set search_path = public as $$
declare
  novo grupos;
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;
  if not exists (select 1 from profiles where id = auth.uid()) then
    raise exception 'perfil não encontrado';
  end if;

  insert into grupos (codigo, nome, descricao, lider_id)
  values (gerar_codigo(), trim(p_nome), nullif(trim(coalesce(p_descricao, '')), ''), auth.uid())
  returning * into novo;

  -- Quem cria vira líder. É a regra central do produto.
  insert into membros (grupo_id, perfil_id, papel)
  values (novo.id, auth.uid(), 'lider');

  return novo;
end;
$$;

-- Prévia pública do grupo, para a tela de "Entrar em um grupo".
-- Só devolve o necessário; não expõe a lista de membros nem as respostas.
create or replace function public.previa_grupo(p_codigo text)
returns table (
  id uuid,
  nome text,
  descricao text,
  lider text,
  participantes bigint,
  estudo_titulo text,
  estudo_status text,
  ja_sou_membro boolean
) language sql security definer stable set search_path = public as $$
  select
    g.id,
    g.nome,
    g.descricao,
    p.nome as lider,
    (select count(*) from membros m where m.grupo_id = g.id) as participantes,
    e.titulo as estudo_titulo,
    e.status as estudo_status,
    exists (select 1 from membros m2 where m2.grupo_id = g.id and m2.perfil_id = auth.uid())
  from grupos g
  join profiles p on p.id = g.lider_id
  left join lateral (
    select titulo, status from estudos
    where grupo_id = g.id and status <> 'rascunho'
    order by criado_em desc limit 1
  ) e on true
  where g.codigo = upper(trim(p_codigo));
$$;

create or replace function public.entrar_no_grupo(p_codigo text)
returns public.grupos language plpgsql security definer set search_path = public as $$
declare
  alvo grupos;
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;

  select * into alvo from grupos where codigo = upper(trim(p_codigo));
  if alvo.id is null then
    raise exception 'codigo_invalido';
  end if;

  insert into membros (grupo_id, perfil_id, papel)
  values (alvo.id, auth.uid(), 'participante')
  on conflict (grupo_id, perfil_id) do nothing;

  return alvo;
end;
$$;

-- ============================================================================
-- Row Level Security
-- ============================================================================

alter table public.profiles       enable row level security;
alter table public.grupos         enable row level security;
alter table public.membros        enable row level security;
alter table public.estudos        enable row level security;
alter table public.etapas         enable row level security;
alter table public.equipes        enable row level security;
alter table public.equipe_membros enable row level security;
alter table public.perguntas      enable row level security;
alter table public.respostas      enable row level security;
alter table public.reacoes        enable row level security;
alter table public.reflexoes      enable row level security;
alter table public.resumos        enable row level security;

drop policy if exists profiles_leitura on public.profiles;
create policy profiles_leitura on public.profiles for select
  using (
    id = auth.uid()
    or exists (
      select 1 from membros meu
      join membros dele on dele.grupo_id = meu.grupo_id
      where meu.perfil_id = auth.uid() and dele.perfil_id = profiles.id
    )
  );

drop policy if exists grupos_leitura on public.grupos;
create policy grupos_leitura on public.grupos for select using (eh_membro(id));

drop policy if exists grupos_edicao on public.grupos;
create policy grupos_edicao on public.grupos for update using (eh_lider(id));

drop policy if exists grupos_exclusao on public.grupos;
create policy grupos_exclusao on public.grupos for delete using (eh_lider(id));

drop policy if exists membros_leitura on public.membros;
create policy membros_leitura on public.membros for select using (eh_membro(grupo_id));

drop policy if exists membros_saida on public.membros;
create policy membros_saida on public.membros for delete
  using (perfil_id = auth.uid() or eh_lider(grupo_id));

drop policy if exists estudos_leitura on public.estudos;
create policy estudos_leitura on public.estudos for select using (eh_membro(grupo_id));

drop policy if exists estudos_escrita on public.estudos;
create policy estudos_escrita on public.estudos for insert with check (eh_lider(grupo_id));

drop policy if exists estudos_edicao on public.estudos;
create policy estudos_edicao on public.estudos for update using (eh_lider(grupo_id));

drop policy if exists estudos_exclusao on public.estudos;
create policy estudos_exclusao on public.estudos for delete using (eh_lider(grupo_id));

drop policy if exists etapas_leitura on public.etapas;
create policy etapas_leitura on public.etapas for select using (eh_membro_estudo(estudo_id));

drop policy if exists etapas_escrita on public.etapas;
create policy etapas_escrita on public.etapas for insert with check (eh_lider_estudo(estudo_id));

drop policy if exists etapas_edicao on public.etapas;
create policy etapas_edicao on public.etapas for update using (eh_lider_estudo(estudo_id));

drop policy if exists equipes_leitura on public.equipes;
create policy equipes_leitura on public.equipes for select using (eh_membro_estudo(estudo_id));

drop policy if exists equipes_escrita on public.equipes;
create policy equipes_escrita on public.equipes for all
  using (eh_lider_estudo(estudo_id)) with check (eh_lider_estudo(estudo_id));

drop policy if exists equipe_membros_leitura on public.equipe_membros;
create policy equipe_membros_leitura on public.equipe_membros for select
  using (exists (select 1 from equipes e where e.id = equipe_id and eh_membro_estudo(e.estudo_id)));

drop policy if exists equipe_membros_escrita on public.equipe_membros;
create policy equipe_membros_escrita on public.equipe_membros for all
  using (exists (select 1 from equipes e where e.id = equipe_id and eh_lider_estudo(e.estudo_id)))
  with check (exists (select 1 from equipes e where e.id = equipe_id and eh_lider_estudo(e.estudo_id)));

drop policy if exists perguntas_leitura on public.perguntas;
create policy perguntas_leitura on public.perguntas for select using (eh_membro_estudo(estudo_id));

drop policy if exists perguntas_escrita on public.perguntas;
create policy perguntas_escrita on public.perguntas for all
  using (eh_lider_estudo(estudo_id)) with check (eh_lider_estudo(estudo_id));

-- Resposta é visível para o grupo todo: a discussão coletiva depende disso.
-- O que fica privado é a reflexão individual, mais abaixo.
drop policy if exists respostas_leitura on public.respostas;
create policy respostas_leitura on public.respostas for select
  using (exists (select 1 from perguntas q where q.id = pergunta_id and eh_membro_estudo(q.estudo_id)));

drop policy if exists respostas_escrita on public.respostas;
create policy respostas_escrita on public.respostas for insert
  with check (
    perfil_id = auth.uid()
    and exists (select 1 from perguntas q where q.id = pergunta_id and eh_membro_estudo(q.estudo_id))
  );

drop policy if exists respostas_edicao on public.respostas;
create policy respostas_edicao on public.respostas for update using (perfil_id = auth.uid());

drop policy if exists respostas_exclusao on public.respostas;
create policy respostas_exclusao on public.respostas for delete
  using (
    perfil_id = auth.uid()
    or exists (select 1 from perguntas q where q.id = pergunta_id and eh_lider_estudo(q.estudo_id))
  );

drop policy if exists reacoes_leitura on public.reacoes;
create policy reacoes_leitura on public.reacoes for select
  using (exists (
    select 1 from respostas r join perguntas q on q.id = r.pergunta_id
    where r.id = resposta_id and eh_membro_estudo(q.estudo_id)
  ));

drop policy if exists reacoes_escrita on public.reacoes;
create policy reacoes_escrita on public.reacoes for all
  using (perfil_id = auth.uid()) with check (perfil_id = auth.uid());

-- A reflexão individual é do autor. O líder só enxerga se a pessoa compartilhar.
drop policy if exists reflexoes_leitura on public.reflexoes;
create policy reflexoes_leitura on public.reflexoes for select
  using (perfil_id = auth.uid() or (compartilhada and eh_membro_estudo(estudo_id)));

drop policy if exists reflexoes_escrita on public.reflexoes;
create policy reflexoes_escrita on public.reflexoes for all
  using (perfil_id = auth.uid()) with check (perfil_id = auth.uid());

drop policy if exists resumos_leitura on public.resumos;
create policy resumos_leitura on public.resumos for select using (eh_membro_estudo(estudo_id));

drop policy if exists resumos_escrita on public.resumos;
create policy resumos_escrita on public.resumos for all
  using (eh_lider_estudo(estudo_id)) with check (eh_lider_estudo(estudo_id));

-- ============================================================================
-- Realtime: é o que faz a resposta do participante aparecer na hora para o
-- líder, e a liberação de etapa aparecer na hora para o participante.
-- ============================================================================
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
end $$;

alter publication supabase_realtime add table public.etapas;
alter publication supabase_realtime add table public.respostas;
alter publication supabase_realtime add table public.membros;
alter publication supabase_realtime add table public.estudos;
alter publication supabase_realtime add table public.reacoes;
