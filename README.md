# Genipse Bible

Uma Bíblia em formato de catálogo: prateleiras, capas, "continue lendo", com marcação de
versículos, comentários pessoais e estudo bíblico em grupo. Web app / PWA, instalável no
celular, funciona offline.

## Rodando

```bash
npm install
npm run bible   # baixa e gera os JSON das traduções (só na primeira vez)
npm run capas   # baixa as gravuras e gera as capas (só na primeira vez)
npm run dev     # http://localhost:3210
```

Para Grupos e conta, copie `.env.example` para `.env.local` e preencha as chaves do
Supabase. Veja a seção Grupos.

## Traduções

Seis, geradas por [scripts/build-bible.mjs](scripts/build-bible.mjs).

| Sigla | Tradução | Situação |
| --- | --- | --- |
| ARA | Almeida Revista e Atualizada | Domínio público |
| NVI | Nova Versão Internacional | © Biblica, uso pessoal |
| ACF | Almeida Corrigida Fiel | © Sociedade Bíblica Trinitariana, uso pessoal |
| BLIVRE | Bíblia Livre | CC BY 3.0 Brasil |
| KJV | King James Version | Domínio público |
| WEB | World English Bible | Domínio público |

A primeira da lista é a canônica: define a ordem dos livros, os nomes em português e a
quantidade de capítulos que as outras precisam respeitar. O script **falha** se alguma
divergir em capítulos, e só **avisa** quando a contagem de versículos difere, porque isso
é normal entre traduções.

Cada tradução declara a fonte de onde vem, e o script tem um adaptador por tipo de fonte
(`bodruk` para o JSON único do GitHub, `getbible` para a API do getbible.net). Acrescentar
uma tradução nova é acrescentar uma entrada em `VERSIONS`.

> **NVT, NTLH e NAA não entraram.** Não existe fonte pública legítima para elas: são
> traduções modernas sob direito autoral fechado (Mundo Cristão e Sociedade Bíblica do
> Brasil), sem API aberta nem dataset licenciado. O que circula em repositórios são cópias
> não autorizadas. Para incluí-las seria preciso licença junto às editoras.

## Grupos (estudo colaborativo)

A única parte do app que precisa de servidor. Um líder cria o grupo, o sistema gera um
código curto (`GENESIS-7K42`), os participantes entram com esse código, e o líder conduz o
estudo liberando uma etapa por vez enquanto as respostas aparecem ao vivo.

### Ligando o Supabase

1. Crie um projeto em supabase.com (plano free serve).
2. **SQL Editor** → rode [`supabase/schema.sql`](supabase/schema.sql), depois
   [`supabase/schema-conta.sql`](supabase/schema-conta.sql). Os dois são idempotentes.
3. **Authentication → Sign In / Providers** → ligue **Anonymous sign-ins**.
4. Copie `.env.example` para `.env.local` e preencha a URL e a chave pública
   (**Project Settings → API**).
5. Reinicie o `npm run dev`.

> Só as chaves públicas (`anon` / `sb_publishable_`) entram no `.env.local`. A
> `service_role` e a `sb_secret_` ignoram o RLS e nunca devem ficar em variável
> `NEXT_PUBLIC_`, porque tudo com esse prefixo é servido ao navegador.

## Login com Google

O código está pronto; falta credencial, que é feita fora do projeto.

**1. Google Cloud Console** → *APIs & Services* → *Credentials* → *Create
credentials* → *OAuth client ID* → tipo **Web application**.

Em **Authorized redirect URIs**, cole exatamente o callback do Supabase:

```
https://SEU-PROJETO.supabase.co/auth/v1/callback
```

**2. Supabase** → *Authentication* → *Sign In / Providers* → **Google** → ligue e
cole o *Client ID* e o *Client Secret* gerados acima.

**3. Supabase** → *Authentication* → *URL Configuration*:

- **Site URL**: o domínio de produção.
- **Redirect URLs**: acrescente `http://localhost:3210/**` e
  `https://SEU-DOMINIO/**`, senão o retorno do login é recusado.

**4. Opcional, mas recomendado:** ligue **Enable manual linking** em
*Authentication → Sign In / Providers*. É isso que permite transformar uma
sessão anônima em conta Google **sem perder** as marcações e os grupos criados
antes. Sem essa opção o app continua funcionando, mas o login cria um usuário
novo e o que estava no anônimo fica para trás.

### Como o vínculo funciona

[`entrarComGoogle`](src/lib/conta.ts) verifica se já existe sessão anônima. Se
existe, chama `linkIdentity` em vez de um login novo: o id do usuário continua o
mesmo, então marcações, notas e grupos vêm junto. Se o manual linking estiver
desligado, cai para `signInWithOAuth` e avisa no console.

O retorno cai em [`/auth/callback`](src/app/auth/callback/page.tsx), que espera a
sessão aparecer, cria o perfil com o nome que o Google mandou e sincroniza antes
de devolver a pessoa para onde ela estava.

### Criar grupo exige conta

Participar de um grupo continua exigindo só o código e um nome. **Criar** exige
conta (Google ou e-mail), porque o líder é dono do grupo: preso a um aparelho,
trocar de celular significaria perder o grupo sem nenhuma forma de recuperar.

## E-mails

Os modelos ficam em [`supabase/emails/`](supabase/emails/), gerados por
`npm run emails` a partir de [scripts/build-emails.mjs](scripts/build-emails.mjs).
São seis, um por modelo do painel, com a marca do app. Instruções de onde colar
cada um estão no [README da pasta](supabase/emails/README.md).

> O SMTP embutido do Supabase manda pouquíssimo e só para a equipe do projeto.
> Antes de abrir para usuários reais, configure um SMTP próprio, ou desligue
> *Confirm email* e use só o login com Google, que não depende de e-mail.

## Conta e sincronização

Marcações, notas, progresso e favoritos seguem a conta, não o aparelho.

O IndexedDB continua sendo onde o app escreve primeiro: é o que mantém tudo instantâneo e
funcionando offline. [`src/lib/sync.ts`](src/lib/sync.ts) empurra para o Supabase e puxa o
que mudou em outro dispositivo, resolvendo conflito pelo carimbo mais recente.

Três detalhes que essa camada resolve:

- **Apagar sincroniza.** Uma tabela de lápides (`removidos`) registra o que foi apagado.
  Sem isso, tirar uma marcação no celular não tiraria no computador, porque a
  sincronização só veria linhas que existem.
- **Anônimo vira conta sem perder nada.** Criar conta usa `updateUser` para vincular o
  e-mail à sessão anônima atual, em vez de criar um usuário novo. O id continua o mesmo,
  então marcações, notas e grupos vêm junto.
- **Trocar de conta não mistura dados.** A janela de sincronização reinicia quando o id do
  perfil muda neste navegador.

Progresso de leitura é o único campo que mescla em vez de sobrescrever: capítulo lido não
"desle" só porque outro aparelho estava desatualizado.

Sem as chaves, a aba mostra esse passo a passo em vez de quebrar, e o resto do app segue
funcionando offline.

### Por que login anônimo

O participante entra só com o código: sem e-mail, sem senha, sem fricção. Mesmo assim
existe um JWT de verdade por dispositivo, que é o que sustenta as policies de RLS. Sem
isso, qualquer pessoa com a chave `anon` poderia se passar por outra.

### O que o RLS garante

| Dado | Quem enxerga |
| --- | --- |
| Grupo, membros, estudos | Só quem é membro do grupo |
| Prévia por código (nome, líder, nº de participantes) | Qualquer um com o código, via RPC, sem expor o resto |
| Respostas | Todo o grupo, porque a discussão coletiva depende disso |
| **Reflexão individual** | **Só o autor**, salvo se marcar "compartilhar" |
| Liberar etapa, criar estudo, montar equipes | Só o líder |

### Estrutura

```
supabase/schema.sql              tabelas, funções, RLS e publicação de realtime
src/lib/grupos/metodos.ts        os métodos de estudo: etapas, perguntas e adaptação
src/lib/grupos/api.ts            acesso a dados e assinaturas de realtime
src/lib/grupos/supabase.ts       cliente (e a flag de "não configurado")
src/app/grupos/                  lista, grupo, assistente de criação e o estudo
src/components/grupos/           portão de entrada, painel do líder, texto bíblico
```

### Como as perguntas se adaptam sem IA

`montarEtapas()` em [metodos.ts](src/lib/grupos/metodos.ts) faz duas coisas: corta as
perguntas acima do nível escolhido e distribui o orçamento de perguntas da duração em
rodadas, pegando primeiro a pergunta mais importante de cada etapa. Assim 15 minutos não
viram três perguntas todas na mesma etapa. O público troca a formulação da pergunta, não a
profundidade.

**Métodos prontos:** Estudo Indutivo e Problema → Bíblia → Aplicação. Os outros nove
aparecem na escolha marcados como "em breve"; para implementar, basta acrescentar o
template em `METODOS` com `disponivel: true`. O runtime do estudo não sabe nada sobre
método, só executa o que o template descreve.

## Capas

**Os 66 livros têm arte.** Obras em domínio público baixadas do Wikimedia Commons por
[scripts/build-covers.mjs](scripts/build-covers.mjs) e tratadas com `sharp`.

```
public/capas/poster/<slug>.webp    440x660   cards das prateleiras
public/capas/wide/<slug>.webp     1600x700   capa grande da página do livro
public/capas/creditos.json                   artista, licença e link de cada imagem
src/lib/covers.generated.ts                  lista de quem tem capa (gerada, não edite)
sources/capas/                               originais em cache, para não rebaixar
```

Fontes, por bloco:

| Trecho | Acervo |
| --- | --- |
| Antigo Testamento | gravuras de Gustave Doré (Doré Bible Gallery) |
| Profetas menores | aquarelas de James Tissot, versão finalizada por Charles Hoffbauer |
| Evangelhos e Atos | Doré e Ticiano |
| Cartas de Paulo | Rembrandt, Caravaggio, El Greco, Rafael, Valentin de Boulogne, Batoni |
| Cartas gerais | El Greco, Domenichino, Georges de La Tour, ícone de Cristo Pantocrator do Sinai |

O mapa livro → obra é o objeto `COVERS` no script. **Cada livro tem uma lista de
candidatos**, não um arquivo só: se o primeiro falhar, por rename no Commons ou por limite
de taxa, o script cai para o próximo em vez de deixar o livro sem capa. Livro que esgotar
os candidatos volta para o gradiente, que continua no código como fallback.

### Como o enquadramento é decidido

O acervo mistura gravura clara em papel branco com óleo escuro do Rembrandt, e as
proporções vão de quase quadrado a muito alto. O script trata isso em três etapas:

1. **`trim`** remove a margem de papel e a moldura de museu, que jogavam o assunto para
   fora do centro no corte.
2. **Tom adaptativo**: mede o brilho médio da obra e corrige cada uma para a mesma
   luminância alvo, depois aplica o tom quente. Um ajuste fixo estourava a gravura ou
   apagava a pintura a óleo.
3. **Enquadramento por formato**:
   - *card* usa sangria cheia sempre, como capa de catálogo. Obra mais alta que o quadro
     corta pelo topo, para a figura em pé manter a cabeça; mais larga, corta pela região
     de maior interesse;
   - *capa grande* mostra a obra inteira, deslocada para a direita porque o título e os
     botões ocupam a esquerda, sobre uma cópia dela mesma borrada e escurecida. O formato
     é panorâmico e a arte guarda margem vertical, para o corte do `object-cover` no herói
     não comer o topo e a base da pintura.

Para trocar a obra de um livro, edite `COVERS`, apague o cache daquele slug em
`sources/capas/` e rode `npm run capas`. Sem apagar o cache o script reaproveita o
download antigo e só reprocessa.

### Atenção: a pasta está dentro do OneDrive

O projeto vive em `OneDrive\...\Área de Trabalho\NetBible`. O OneDrive tenta sincronizar
`.next/`, e quando o Next reescreve centenas de arquivos de build de uma vez o sync trava
os arquivos no meio do caminho — o servidor de dev quebra com `EBUSY: resource busy or
locked` ou `Cannot find module './921.js'`.

Isso não é bug do app. Quando acontecer:

```bash
rm -rf .next && npm run dev
```

Para não acontecer de novo, escolha um destes:

- **Não rode `npm run build` com o `npm run dev` aberto.** Foi isso que disparou o problema
  aqui; só o dev server, sozinho, roda sem incidente.
- Pause o OneDrive enquanto desenvolve (ícone na bandeja → Pausar sincronização).
- Ou mova o projeto para fora da pasta sincronizada, tipo `C:\dev\lumen`. É a solução
  definitiva. (Redirecionar só o `.next` com um junction **não** funciona: o Node deixa de
  achar o `node_modules` a partir do destino.)

## Como os dados estão organizados

Duas camadas, de propósito separadas.

**1. O texto bíblico** — estático, imutável, um arquivo por livro:

```
public/biblia/
  index.json            # 66 livros: nome, grupo, versículos por capítulo (~40 KB, carrega sempre)
  ara/gn.json           # Gênesis na Almeida Revista e Atualizada
  ara/...               # 66 arquivos
  nvi/gn.json           # o mesmo livro na NVI
  nvi/...
```

Formato de cada livro:

```json
{
  "slug": "gn",
  "name": "Gênesis",
  "version": "ara",
  "chapters": [["No princípio criou Deus...", "E a terra era..."], ["Assim os céus..."]]
}
```

`chapters[c][v]` = capítulo `c+1`, versículo `v+1`. O app baixa só o livro aberto
(20–150 KB) em vez dos 4 MB da Bíblia inteira, e o service worker guarda para sempre.

**2. Os seus dados** — IndexedDB, no dispositivo, nunca sai daqui
([src/lib/db.ts](src/lib/db.ts)). Marcações e notas são indexadas por referência canônica
`livro.capítulo.versículo`, então continuam válidas se você trocar de tradução. Cada uma
guarda uma cópia do texto, para a biblioteca abrir sem baixar nada.

Backup e restauração em `/ajustes` (JSON). É também o gancho pronto caso um dia você
queira sincronizar na nuvem.

### Trocando ou adicionando traduções

Edite a lista `VERSIONS` em [scripts/build-bible.mjs](scripts/build-bible.mjs) e rode
`npm run bible` de novo. O script confere que as versões estão alinhadas livro a livro
antes de gerar — se desalinharem, ele falha em vez de gerar leitura paralela errada.

> **NVI:** protegida por direitos autorais da Biblica. Uso pessoal, tudo bem. Se publicar
> o app, remova-a de `VERSIONS` ou obtenha licença. A ARA é domínio público.

## Estrutura do código

```
src/
  app/
    page.tsx                    home, as prateleiras
    livro/[slug]/page.tsx       capa do livro + grade de capítulos
    livro/[slug]/[cap]/page.tsx o leitor
    busca/, biblioteca/, ajustes/
  components/
    BookCard.tsx                capas geradas por código (sem imagem nenhuma)
    Shelf.tsx                   prateleira horizontal
    VerseActions.tsx            barra de ações do versículo selecionado
    NoteSheet.tsx               editor de comentário
  lib/
    bible.ts                    tipos e carregamento do texto
    about.ts                    ficha dos 66 livros: autor, data, público, contexto
    catalog.ts                  camada editorial: cores, sinopses, coleções
    db.ts                       IndexedDB (Dexie)
    store.tsx                   índice + tradução escolhida
```

As capas não usam imagem: são gradiente por grupo de livros + a sigla em marca d'água,
definidos em `GROUP_THEME` ([src/lib/catalog.ts](src/lib/catalog.ts)). Trocar a paleta
inteira é editar esse objeto.

As prateleiras temáticas ("Quando bate a ansiedade", "Parece série, mas está na Bíblia")
saem de `COLLECTIONS` no mesmo arquivo — é lá que se cria prateleira nova.

## O que dá para fazer no leitor

- Tocar num versículo seleciona; tocar em vários seleciona um trecho.
- Cinco cores de marcação, comentário por versículo, copiar e compartilhar.
- Comentários aparecem embaixo do versículo e ficam editáveis.
- ARA e NVI lado a lado no botão de leitura paralela.
- Tamanho da fonte em cinco passos, lembrado entre sessões.
- Capítulo lido é marcado automaticamente ao chegar no fim; a barra dourada no card é isso.
