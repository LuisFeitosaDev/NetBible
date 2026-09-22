-- ============================================================================
-- Genipse Bible · métodos de estudo com assunto livre
--
-- Rode no SQL Editor depois de schema.sql e schema-conta.sql. É idempotente.
--
-- Os métodos novos (temático, personagem, comparação, doutrinário, debate)
-- dependem de algo que o líder escolhe ou digita, e que não cabe no campo
-- `referencia`, feito para passagem bíblica. `assunto` guarda isso, e é jsonb
-- porque a forma muda por método: um tema é um texto, uma comparação são dois
-- personagens, um estudo de livro é um slug com uma faixa de capítulos.
-- ============================================================================

alter table public.estudos
  add column if not exists assunto jsonb;

-- Quando a etapa é gerada a partir de conteúdo curado ou de IA, ela carrega
-- material de apoio (textos com contexto, visões divergentes, argumentos).
-- Fica na própria etapa para o runtime não precisar saber de onde veio.
alter table public.etapas
  add column if not exists material jsonb;

-- Registra como o estudo foi montado, para auditoria e para a interface poder
-- avisar quando o conteúdo veio de IA em vez de curadoria revisada.
alter table public.estudos
  add column if not exists origem text not null default 'curado'
    check (origem in ('curado', 'ia', 'misto'));
