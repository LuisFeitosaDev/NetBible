-- ============================================================================
-- Genipse Bible · leitura em grupo, versão 2
--
-- Rode este arquivo no SQL Editor DEPOIS de todos os outros. É idempotente:
-- rodar de novo não estraga nada.
--
-- 1. Religa o RLS que `desativar-rls.sql` desligou. Com ele desligado, a chave
--    pública que vai dentro do app basta para qualquer pessoa ler, alterar ou
--    apagar os perfis, a leitura e os grupos de TODO mundo.
-- 2. O plano passa a guardar o próprio progresso (`lidos_no_plano`): um plano
--    novo sempre começa em 0%, sem mexer no histórico de leitura da Bíblia.
-- 3. O grupo guarda o plano dele (`grupos.plano`): quem entra pelo código
--    recebe o plano direto do grupo, sem depender do celular de quem criou já
--    ter sincronizado.
-- 4. `grupo_eventos`: o mural do grupo (grifos, metas batidas, cutucadas).
--    Apagar o grupo apaga o mural junto; as marcações de cada um na Bíblia
--    continuam intactas, porque moram em outra tabela.
-- ============================================================================

-- ------------------------------------------------------------ 1. RLS -------
alter table public.profiles enable row level security;
alter table public.grupos   enable row level security;
alter table public.membros  enable row level security;
alter table public.leitura  enable row level security;
alter table public.planos   enable row level security;

-- As políticas de leitura/planos, recriadas aqui para este arquivo bastar
-- sozinho: dono escreve, membros do mesmo grupo de leitura enxergam.
drop policy if exists leitura_proprias on public.leitura;
drop policy if exists leitura_select on public.leitura;
drop policy if exists leitura_insert on public.leitura;
drop policy if exists leitura_update on public.leitura;
drop policy if exists leitura_delete on public.leitura;

create policy leitura_select on public.leitura for select
  using (
    perfil_id = auth.uid()
    or exists (
      select 1 from membros meu
      join membros dele on dele.grupo_id = meu.grupo_id
      join grupos g on g.id = meu.grupo_id
      where meu.perfil_id = auth.uid() and dele.perfil_id = leitura.perfil_id and g.tipo = 'leitura'
    )
  );
create policy leitura_insert on public.leitura for insert with check (perfil_id = auth.uid());
create policy leitura_update on public.leitura for update
  using (perfil_id = auth.uid()) with check (perfil_id = auth.uid());
create policy leitura_delete on public.leitura for delete using (perfil_id = auth.uid());

drop policy if exists planos_proprias on public.planos;
drop policy if exists planos_select on public.planos;
drop policy if exists planos_insert on public.planos;
drop policy if exists planos_update on public.planos;
drop policy if exists planos_delete on public.planos;

create policy planos_select on public.planos for select
  using (
    perfil_id = auth.uid()
    or exists (
      select 1 from membros meu
      join membros dele on dele.grupo_id = meu.grupo_id
      join grupos g on g.id = meu.grupo_id
      where meu.perfil_id = auth.uid() and dele.perfil_id = planos.perfil_id and g.tipo = 'leitura'
    )
  );
create policy planos_insert on public.planos for insert with check (perfil_id = auth.uid());
create policy planos_update on public.planos for update
  using (perfil_id = auth.uid()) with check (perfil_id = auth.uid());
create policy planos_delete on public.planos for delete using (perfil_id = auth.uid());

-- ------------------------------------------------ 2. progresso do plano ----
alter table public.planos drop constraint if exists planos_ordem_check;
alter table public.planos add constraint planos_ordem_check
  check (ordem in ('canonica', 'cronologica', 'iniciante', 'proverbios', 'evangelhos', 'personalizado'));

alter table public.planos add column if not exists livros text[];
alter table public.planos add column if not exists grupo_id uuid;
-- Capítulos lidos DENTRO do plano, como "rm.1". Separado de `leitura` de
-- propósito: o histórico da Bíblia nunca é apagado para um plano zerar.
alter table public.planos add column if not exists lidos_no_plano text[] not null default '{}';
-- A leitura separada para o dia, para o grupo ver a meta de cada um.
alter table public.planos add column if not exists dia_atribuido integer;
alter table public.planos add column if not exists atribuicao text[];
-- Dias do plano em que a meta foi batida: é daqui que sai a sequência.
alter table public.planos add column if not exists dias_cumpridos integer[] not null default '{}';
-- Capítulos já lidos quando a pessoa recomeçou a contagem.
alter table public.planos add column if not exists reinicio_lidos text[];

-- Recriada porque devolve `planos.*`, e as colunas acima mudam essa linha.
create or replace function public.planos_do_grupo(p_grupo_id uuid)
returns setof public.planos language plpgsql security definer stable set search_path = public as $$
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;
  if not exists (select 1 from membros where grupo_id = p_grupo_id and perfil_id = auth.uid()) then
    raise exception 'não é membro do grupo';
  end if;

  return query
  select p.*
  from planos p
  join membros m on m.perfil_id = p.perfil_id
  where m.grupo_id = p_grupo_id;
end;
$$;

-- --------------------------------------------------- 3. plano no grupo -----
alter table public.grupos add column if not exists plano jsonb;

-- Cria o grupo JÁ com o plano dentro, numa operação só. Antes o grupo nascia
-- vazio e o plano chegava depois, via sincronização do celular de quem criou —
-- que no celular às vezes nunca acontecia (app em segundo plano mandando o
-- código no WhatsApp).
create or replace function public.criar_grupo_de_leitura(p_nome text, p_plano jsonb)
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

  insert into grupos (codigo, nome, lider_id, tipo, plano)
  values (gerar_codigo(), left(trim(p_nome), 60), auth.uid(), 'leitura', p_plano)
  returning * into novo;

  insert into membros (grupo_id, perfil_id, papel)
  values (novo.id, auth.uid(), 'lider');

  return novo;
end;
$$;

-- Recriada para devolver a linha com a coluna `plano` nova.
create or replace function public.entrar_no_grupo(p_codigo text, p_tipo text default 'estudo')
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
  if alvo.tipo <> p_tipo then
    raise exception 'tipo_incorreto';
  end if;

  insert into membros (grupo_id, perfil_id, papel)
  values (alvo.id, auth.uid(), 'participante')
  on conflict (grupo_id, perfil_id) do nothing;

  return alvo;
end;
$$;

-- ------------------------------------------------------- 4. mural ----------
create table if not exists public.grupo_eventos (
  id         uuid primary key default gen_random_uuid(),
  grupo_id   uuid not null references public.grupos (id) on delete cascade,
  perfil_id  uuid not null references public.profiles (id) on delete cascade,
  tipo       text not null check (tipo in ('grifo', 'meta', 'cutucada', 'entrou')),
  -- Só na cutucada: quem foi cutucado.
  alvo_id    uuid references public.profiles (id) on delete cascade,
  -- Só no grifo: "rm.1.16", para apagar o grifo do mural quando a marcação sai.
  ref        text,
  dados      jsonb not null default '{}',
  criado_em  timestamptz not null default now()
);

create index if not exists grupo_eventos_grupo_idx
  on public.grupo_eventos (grupo_id, criado_em desc);

alter table public.grupo_eventos enable row level security;

drop policy if exists grupo_eventos_select on public.grupo_eventos;
create policy grupo_eventos_select on public.grupo_eventos for select
  using (eh_membro(grupo_id));

drop policy if exists grupo_eventos_insert on public.grupo_eventos;
create policy grupo_eventos_insert on public.grupo_eventos for insert
  with check (perfil_id = auth.uid() and eh_membro(grupo_id));

drop policy if exists grupo_eventos_delete on public.grupo_eventos;
create policy grupo_eventos_delete on public.grupo_eventos for delete
  using (perfil_id = auth.uid());

-- Tempo real: o aviso de "fulano grifou" chega sem ninguém recarregar a tela.
do $$
begin
  alter publication supabase_realtime add table public.grupo_eventos;
exception
  when duplicate_object then null;
end;
$$;
