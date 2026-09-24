-- ============================================================================
-- Genipse Bible · parceria de leitura
--
-- Rode este arquivo no SQL Editor DEPOIS de schema.sql, schema-conta.sql e
-- schema-planos.sql. É idempotente.
--
-- Duas pessoas, uma leitura. Um código de uso único liga duas contas; a partir
-- daí cada uma vê quantos capítulos a outra já leu e em que dia do plano ela
-- está — nunca o que ela marcou ou escreveu, isso continua só dela. Ninguém
-- edita a leitura de ninguém: a parceria abre uma janela, não um controle
-- remoto.
-- ============================================================================

create table if not exists public.parcerias_leitura (
  perfil_id        uuid primary key references public.profiles (id) on delete cascade,
  parceiro_id      uuid references public.profiles (id) on delete set null,
  -- Código aberto esperando alguém entrar. Fica nulo assim que alguém usa,
  -- porque é de uso único: não dá para a mesma linha ligar três pessoas.
  codigo           text unique,
  codigo_expira_em timestamptz,
  atualizado_em    timestamptz not null default now()
);

alter table public.parcerias_leitura enable row level security;

drop policy if exists parcerias_leitura_select on public.parcerias_leitura;
create policy parcerias_leitura_select on public.parcerias_leitura for select
  using (perfil_id = auth.uid() or parceiro_id = auth.uid());

-- Sem policy de insert/update/delete nesta tabela: só as funções abaixo
-- escrevem aqui. "As duas pontas mudam juntas ou nenhuma muda" é uma garantia
-- de transação, não de RLS de uma linha só, e por isso vira `security definer`
-- em vez de um `update` direto que o cliente pudesse chamar.

-- ----------------------------------------------------------------- RPCs ---

-- Abre um convite: gera um código de 7 dias e devolve. Se a pessoa já tem
-- parceiro, para aí — desfazer a parceria antiga é um passo explícito, não um
-- efeito colateral de pedir um código novo.
create or replace function public.gerar_codigo_parceria()
returns text language plpgsql security definer set search_path = public as $$
declare
  alfabeto  text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  tentativa text;
  sufixo    text;
  i         integer;
  atual     uuid;
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;

  select parceiro_id into atual from parcerias_leitura where perfil_id = auth.uid();
  if atual is not null then
    raise exception 'ja_pareado';
  end if;

  for _ in 1..40 loop
    sufixo := '';
    for i in 1..6 loop
      sufixo := sufixo || substr(alfabeto, 1 + floor(random() * length(alfabeto))::int, 1);
    end loop;
    tentativa := 'DUPLA-' || sufixo;
    if not exists (select 1 from parcerias_leitura where codigo = tentativa) then
      insert into parcerias_leitura (perfil_id, codigo, codigo_expira_em, atualizado_em)
      values (auth.uid(), tentativa, now() + interval '7 days', now())
      on conflict (perfil_id) do update
        set codigo = excluded.codigo,
            codigo_expira_em = excluded.codigo_expira_em,
            atualizado_em = now();
      return tentativa;
    end if;
  end loop;

  raise exception 'nao_consegui_gerar_codigo';
end;
$$;

-- Resgata um código: liga as duas contas nos dois sentidos, na mesma
-- transação. Fica no `security definer` porque a pessoa que digita o código
-- precisa escrever na linha de QUEM CRIOU o código, e a RLS normal nunca deixa
-- ninguém escrever na linha de outra pessoa.
create or replace function public.entrar_com_codigo_parceria(p_codigo text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  dono   uuid;
  expira timestamptz;
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;

  select perfil_id, codigo_expira_em into dono, expira
  from parcerias_leitura
  where codigo = upper(trim(p_codigo));

  if dono is null then
    raise exception 'codigo_invalido';
  end if;
  if dono = auth.uid() then
    raise exception 'codigo_proprio';
  end if;
  if expira is not null and expira < now() then
    raise exception 'codigo_expirado';
  end if;
  if exists (select 1 from parcerias_leitura where perfil_id = dono and parceiro_id is not null) then
    raise exception 'codigo_ja_usado';
  end if;
  if exists (select 1 from parcerias_leitura where perfil_id = auth.uid() and parceiro_id is not null) then
    raise exception 'voce_ja_pareado';
  end if;

  insert into parcerias_leitura (perfil_id, parceiro_id, atualizado_em)
  values (auth.uid(), dono, now())
  on conflict (perfil_id) do update
    set parceiro_id = dono, codigo = null, codigo_expira_em = null, atualizado_em = now();

  update parcerias_leitura
  set parceiro_id = auth.uid(), codigo = null, codigo_expira_em = null, atualizado_em = now()
  where perfil_id = dono;

  return dono;
end;
$$;

-- Desfaz nos dois sentidos. Cada um continua com a própria leitura, só para
-- de aparecer para o outro.
create or replace function public.desfazer_parceria_leitura()
returns void language plpgsql security definer set search_path = public as $$
declare
  outro uuid;
begin
  if auth.uid() is null then
    raise exception 'sem sessão';
  end if;

  select parceiro_id into outro from parcerias_leitura where perfil_id = auth.uid();

  update parcerias_leitura set parceiro_id = null, codigo = null, codigo_expira_em = null, atualizado_em = now()
  where perfil_id = auth.uid();

  if outro is not null then
    update parcerias_leitura set parceiro_id = null, atualizado_em = now() where perfil_id = outro;
  end if;
end;
$$;

-- ------------------------------------------------- leitura, para a dupla ---
-- Antes desta migração, `leitura` tinha uma policy `for all` só: dono lê e
-- escreve, mais ninguém. Vira quatro policies separadas porque alargar leitura
-- para o parceiro e manter escrita travada no dono não cabe numa `for all`:
-- o mesmo `using` vale para SELECT, UPDATE e DELETE, e um parceiro que passa a
-- enxergar a linha por `using` passaria a poder apagá-la também, não só ler.

drop policy if exists leitura_proprias on public.leitura;

create policy leitura_select on public.leitura for select
  using (
    perfil_id = auth.uid()
    or perfil_id = (select parceiro_id from public.parcerias_leitura where perfil_id = auth.uid())
  );
create policy leitura_insert on public.leitura for insert with check (perfil_id = auth.uid());
create policy leitura_update on public.leitura for update
  using (perfil_id = auth.uid()) with check (perfil_id = auth.uid());
create policy leitura_delete on public.leitura for delete using (perfil_id = auth.uid());

-- -------------------------------------------------- planos, para a dupla ---
-- Mesma cirurgia na policy de `planos`, criada em schema-planos.sql: o
-- parceiro precisa ver QUAL plano e em que dia, não só quantos capítulos.

drop policy if exists planos_proprias on public.planos;

create policy planos_select on public.planos for select
  using (
    perfil_id = auth.uid()
    or perfil_id = (select parceiro_id from public.parcerias_leitura where perfil_id = auth.uid())
  );
create policy planos_insert on public.planos for insert with check (perfil_id = auth.uid());
create policy planos_update on public.planos for update
  using (perfil_id = auth.uid()) with check (perfil_id = auth.uid());
create policy planos_delete on public.planos for delete using (perfil_id = auth.uid());

-- ------------------------------------------------- nome do parceiro ---
-- `profiles_leitura` (schema.sql) só libera quem está no mesmo grupo de
-- estudo. Sem esta policy a mais, dá para ver o progresso do parceiro mas não
-- o nome dele, porque duas pessoas em parceria de leitura não precisam
-- compartilhar grupo nenhum. Policies do mesmo comando se somam por OR, então
-- isto só adiciona um caso, sem tocar na regra existente.

drop policy if exists profiles_leitura_parceria on public.profiles;
create policy profiles_leitura_parceria on public.profiles for select
  using (id = (select parceiro_id from public.parcerias_leitura where perfil_id = auth.uid()));
