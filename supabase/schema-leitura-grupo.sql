-- ============================================================================
-- Genipse Bible · leitura em dupla ou em grupo
--
-- Rode este arquivo no SQL Editor DEPOIS de schema.sql, schema-conta.sql e
-- schema-planos.sql. É idempotente.
--
-- Em vez de um sistema à parte para "duas pessoas ligadas por um código",
-- isto reaproveita `grupos`/`membros`, que já resolvem exatamente isso para
-- os grupos de estudo: código de convite, RLS de quem pode ver quem, líder
-- que criou. Uma dupla é só um grupo de leitura com dois membros; um grupo
-- maior é o mesmo grupo com mais gente. Sem tabela nova, sem RPC nova para
-- "entrar" — só uma coluna `tipo` separando os dois usos de `grupos`.
--
-- Se você rodou `schema-parceria.sql` numa versão anterior deste projeto,
-- este arquivo desfaz aquilo com segurança antes de seguir.
-- ============================================================================

drop table if exists public.parcerias_leitura cascade;
drop function if exists public.gerar_codigo_parceria();
drop function if exists public.entrar_com_codigo_parceria(text);
drop function if exists public.desfazer_parceria_leitura();
drop policy if exists profiles_leitura_parceria on public.profiles;

-- --------------------------------------------------------------- grupos ---
alter table public.grupos
  add column if not exists tipo text not null default 'estudo' check (tipo in ('estudo', 'leitura'));

-- `criar_grupo` ganha um terceiro parâmetro com valor padrão: quem já chama
-- com dois argumentos (a tela de Grupos) continua criando 'estudo' sem mudar
-- uma linha de código.
create or replace function public.criar_grupo(p_nome text, p_descricao text default null, p_tipo text default 'estudo')
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
  if p_tipo not in ('estudo', 'leitura') then
    raise exception 'tipo_invalido';
  end if;

  insert into grupos (codigo, nome, descricao, lider_id, tipo)
  values (gerar_codigo(), trim(p_nome), nullif(trim(coalesce(p_descricao, '')), ''), auth.uid(), p_tipo)
  returning * into novo;

  insert into membros (grupo_id, perfil_id, papel)
  values (novo.id, auth.uid(), 'lider');

  return novo;
end;
$$;

-- ------------------------------------------------- leitura, para o grupo ---
-- Mesma cirurgia feita em schema-planos.sql para `leitura` e `planos`: a
-- policy `for all` de dono vira quatro policies, porque alargar SELECT para
-- quem está no mesmo grupo de leitura e manter INSERT/UPDATE/DELETE travado
-- no dono não cabe numa `for all` só.

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

-- -------------------------------------------------- planos, para o grupo ---
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

-- RPC para recuperar planos de todos os membros de um grupo com segurança
create or replace function public.planos_do_grupo(p_grupo_id uuid)
returns setof public.planos language plpgsql security definer set search_path = public as $$
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

-- `profiles_leitura` (schema.sql) já libera ver o nome de quem está no mesmo
-- grupo, para qualquer `tipo` — não precisa de policy nova aqui.
