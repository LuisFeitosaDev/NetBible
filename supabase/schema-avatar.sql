-- ============================================================================
-- Genipse Bible · foto do perfil (do Google)
--
-- Rode este arquivo no SQL Editor. É idempotente: rodar de novo não estraga
-- nada.
--
-- A foto é gravada uma vez, no primeiro login com Google depois deste
-- arquivo (`garantirPerfilDoProvedor` em src/lib/conta.ts). Fica separada de
-- `salvar_perfil` (o nome) de propósito: editar o nome nunca apaga a foto.
-- ============================================================================

alter table public.profiles add column if not exists avatar_url text;

create or replace function public.definir_avatar_url(p_avatar_url text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;
  if p_avatar_url is not null and length(p_avatar_url) > 600 then
    raise exception 'url grande demais';
  end if;
  update profiles set avatar_url = p_avatar_url where id = auth.uid();
end;
$$;

revoke all on function public.definir_avatar_url(text) from public, anon;
grant execute on function public.definir_avatar_url(text) to authenticated;
