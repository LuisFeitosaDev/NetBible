-- ============================================================================
-- Genipse Bible · avisos do grupo com o app fechado (Web Push)
--
-- Rode este arquivo no SQL Editor DEPOIS de schema-leitura-grupo-v2.sql. É
-- idempotente: rodar de novo não estraga nada. O RLS continua ligado.
--
-- 1. `push_inscricoes`: onde cada aparelho deixa o endereço para receber push.
-- 2. `registrar_inscricao_push`: o app guarda a inscrição do aparelho.
-- 3. `destinos_do_aviso`: o servidor (/api/avisos), agindo como quem publicou,
--    descobre para quais aparelhos mandar o aviso de um evento do mural.
-- ============================================================================

-- --------------------------------------------------- 1. inscrições --------
create table if not exists public.push_inscricoes (
  -- O endereço do serviço de push do navegador; único por aparelho e navegador.
  endpoint      text primary key,
  perfil_id     uuid not null references public.profiles (id) on delete cascade,
  chave_p256dh  text not null,
  chave_auth    text not null,
  atualizado_em timestamptz not null default now()
);

create index if not exists push_inscricoes_perfil_idx on public.push_inscricoes (perfil_id);

alter table public.push_inscricoes enable row level security;

-- Cada um só enxerga e apaga as próprias. Gravar é só pela função abaixo.
drop policy if exists push_inscricoes_select on public.push_inscricoes;
create policy push_inscricoes_select on public.push_inscricoes for select
  using (perfil_id = auth.uid());

drop policy if exists push_inscricoes_delete on public.push_inscricoes;
create policy push_inscricoes_delete on public.push_inscricoes for delete
  using (perfil_id = auth.uid());

-- ------------------------------------------------ 2. registrar ------------
-- Pela função e não por insert direto: se outra conta já usou este aparelho, a
-- inscrição passa para quem está logado agora, em vez de continuar avisando a
-- conta antiga no celular de outra pessoa.
create or replace function public.registrar_inscricao_push(
  p_endpoint text, p_p256dh text, p_auth text
)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;
  if p_endpoint !~ '^https://' or length(p_endpoint) > 1000 then
    raise exception 'endpoint inválido';
  end if;

  insert into push_inscricoes (endpoint, perfil_id, chave_p256dh, chave_auth)
  values (p_endpoint, auth.uid(), p_p256dh, p_auth)
  on conflict (endpoint) do update
    set perfil_id = excluded.perfil_id,
        chave_p256dh = excluded.chave_p256dh,
        chave_auth = excluded.chave_auth,
        atualizado_em = now();
end;
$$;

revoke all on function public.registrar_inscricao_push(text, text, text) from public, anon;
grant execute on function public.registrar_inscricao_push(text, text, text) to authenticated;

-- ------------------------------------------------ 3. destinos -------------
-- Marca o evento como avisado na mesma operação: um evento só gera push uma
-- vez, e só o próprio autor, nos primeiros minutos, consegue pedir o aviso.
alter table public.grupo_eventos add column if not exists avisado_em timestamptz;

create or replace function public.destinos_do_aviso(p_eventos uuid[])
returns table (
  evento_id    uuid,
  perfil_id    uuid,
  tipo         text,
  dados        jsonb,
  autor        text,
  endpoint     text,
  chave_p256dh text,
  chave_auth   text
)
language sql security definer set search_path = public as $$
  with marcados as (
    update grupo_eventos e
       set avisado_em = now()
     where e.id = any(p_eventos)
       and e.perfil_id = auth.uid()
       and e.avisado_em is null
       and e.criado_em > now() - interval '10 minutes'
    returning e.id, e.grupo_id, e.perfil_id, e.tipo, e.alvo_id, e.dados
  )
  select m.id, m.perfil_id, m.tipo, m.dados, coalesce(p.nome, 'Alguém'),
         i.endpoint, i.chave_p256dh, i.chave_auth
    from marcados m
    left join profiles p on p.id = m.perfil_id
    join membros mb on mb.grupo_id = m.grupo_id and mb.perfil_id <> m.perfil_id
    join push_inscricoes i on i.perfil_id = mb.perfil_id
   -- Cutucada só avisa quem foi cutucado; o resto avisa o grupo todo.
   where m.tipo <> 'cutucada' or mb.perfil_id = m.alvo_id;
$$;

revoke all on function public.destinos_do_aviso(uuid[]) from public, anon;
grant execute on function public.destinos_do_aviso(uuid[]) to authenticated;
