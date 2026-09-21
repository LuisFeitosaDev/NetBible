# Lumen

Uma Bíblia em formato de catálogo — prateleiras, capas, "continue lendo" — com marcação
de versículos e comentários pessoais. Web app / PWA, instalável no celular, funciona offline.

## Rodando

```bash
npm install
npm run bible   # baixa e gera os JSON da Bíblia (só na primeira vez)
npm run capas   # baixa as gravuras e gera as capas (só na primeira vez)
npm run dev     # http://localhost:3210
```

## Capas

Gravuras de Gustave Doré (1832–1883), domínio público, baixadas do Wikimedia Commons por
[scripts/build-covers.mjs](scripts/build-covers.mjs) e tratadas com `sharp`: preto e branco,
faixa tonal rebaixada e tom quente, para a arte não estourar contra o tema escuro.

```
public/capas/poster/<slug>.webp   440x660   cards das prateleiras
public/capas/wide/<slug>.webp    1280x720   fundo da página do livro
public/capas/creditos.json                  autor, licença e link de cada imagem
src/lib/covers.generated.ts                 lista de quem tem capa (gerada, não edite)
```

**37 dos 66 livros têm gravura.** Os outros usam a capa em gradiente, que continua no
código e é o fallback automático. O mapa livro → gravura é o objeto `COVERS` no script.

Sete livros ficaram de fora por rate limit do Commons e valeria uma nova tentativa:
`jo`, `at`, `rm`, `1ts`, `2tm`, `hb`, `1jo`. Rode `npm run capas` de novo em outro momento;
os downloads já feitos ficam em cache em `sources/capas/`, então só os que faltam vão à rede.
Se algum nome de arquivo tiver mudado no Commons, o script avisa e segue.

### Atenção: a pasta está dentro do OneDrive

O projeto vive em `OneDrive\...\Área de Trabalho\Bíblia`. O OneDrive tenta sincronizar
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
