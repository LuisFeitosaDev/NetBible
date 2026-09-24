-- ============================================================================
-- Genipse Bible · código de convite não atravessa tipo de grupo
--
-- Rode este arquivo no SQL Editor DEPOIS de schema-leitura-grupo.sql. É
-- idempotente.
--
-- `entrar_no_grupo` e `previa_grupo` não filtravam por `tipo`: um código de
-- leitura em dupla digitado na tela de Grupos de estudo era aceito igual, e
-- vice-versa. Os dois RPCs ganham um segundo parâmetro, com o padrão
-- 'estudo' para não quebrar quem já chama sem ele — só a tela de leitura
-- (Jornada) passa 'leitura' explicitamente.
-- ============================================================================

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

create or replace function public.previa_grupo(p_codigo text, p_tipo text default 'estudo')
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
  where g.codigo = upper(trim(p_codigo)) and g.tipo = p_tipo;
$$;
