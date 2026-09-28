-- ============================================================================
-- Genipse Bible · versículo do dia por notificação
--
-- Rode este arquivo no SQL Editor DEPOIS de schema-avisos-push.sql. É
-- idempotente: rodar de novo não estraga o que já tiver.
--
-- `push_config` guarda a senha que só a rota /api/avisos/versiculo (chamada
-- 1x por dia pela Vercel Cron, ver vercel.json) conhece. Sem ela, ninguém
-- mais consegue pedir o envio — nem quem tiver a chave anon do projeto, que
-- é pública por natureza.
-- ============================================================================

create table if not exists public.push_config (
  id           boolean primary key default true check (id),
  cron_segredo text not null
);
alter table public.push_config enable row level security;
-- Sem nenhuma policy de propósito: nem gente logada lê ou grava aqui pela
-- API. Só muda pelo SQL Editor, com a instrução abaixo.

-- Troque o texto abaixo por uma senha aleatória, e use a MESMA senha na
-- variável de ambiente CRON_SECRET, na Vercel.
insert into public.push_config (id, cron_segredo)
values (true, 'troque-por-uma-senha-aleatoria')
on conflict (id) do nothing;

-- Para trocar a senha depois, sem apagar a linha:
--   update public.push_config set cron_segredo = 'a-senha-nova' where id;

create or replace function public.destinos_versiculo_diario(p_segredo text)
returns table (endpoint text, chave_p256dh text, chave_auth text)
language plpgsql security definer set search_path = public as $$
begin
  if p_segredo is null or p_segredo <> (select cron_segredo from push_config where id) then
    raise exception 'segredo inválido';
  end if;

  return query select i.endpoint, i.chave_p256dh, i.chave_auth from push_inscricoes i;
end;
$$;

-- Precisa ser chamável sem sessão: é a Vercel quem chama, sem ninguém
-- logado. Quem protege é a senha checada dentro da função, não o RLS.
revoke all on function public.destinos_versiculo_diario(text) from public;
grant execute on function public.destinos_versiculo_diario(text) to anon, authenticated;
