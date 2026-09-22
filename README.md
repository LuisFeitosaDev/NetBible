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
