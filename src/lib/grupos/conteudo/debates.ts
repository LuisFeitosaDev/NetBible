/**
 * Debates curados.
 *
 * O objetivo declarado na especificação é ensinar a interpretar com contexto e
 * respeito, não eleger vencedor. Por isso cada posição declara o seu melhor
 * argumento **e** o texto que mais lhe dá trabalho. Sem esse segundo campo, o
 * material vira espantalho: cada lado só apareceria na sua melhor versão e o
 * outro na pior.
 */
export type Posicao = {
  nome: string;
  resumo: string;
  textos: string[];
  /** O argumento mais forte dessa leitura. */
  forca: string;
  /** O texto ou problema que essa leitura tem mais dificuldade de explicar. */
  dificuldade: string;
};

export type Debate = {
  pergunta: string;
  sinonimos: string[];
  contexto: string;
  posicoes: Posicao[];
  investigacao: string[];
  sintese: string;
  notas?: string[];
};

export const DEBATES: Debate[] = [
  {
    pergunta: "Um cristão pode perder a salvação?",
    sinonimos: ["perder a salvacao", "seguranca da salvacao", "perseveranca dos santos", "apostasia"],
    contexto:
      "A disputa não é sobre se Deus é fiel, e sim sobre o que acontece quando alguém que professou fé abandona tudo depois. Os dois lados citam textos claros, e cada um precisa explicar os do outro.",
    posicoes: [
      {
        nome: "Segurança eterna",
        resumo:
          "Quem é genuinamente salvo é guardado por Deus até o fim; quem abandona demonstra que nunca foi de fato.",
        textos: ["João 10:27-29", "Romanos 8:38-39", "Filipenses 1:6", "1 João 2:19"],
        forca:
          "Textos que atribuem a guarda a Deus, e não à firmeza humana, são numerosos e diretos.",
        dificuldade:
          "Hebreus 6:4-6 descreve pessoas que participaram do Espírito e caíram, em linguagem difícil de reduzir a falsa conversão.",
      },
      {
        nome: "Possibilidade de apostasia",
        resumo:
          "A relação é real e livre dos dois lados; é possível abandonar o que foi genuinamente recebido.",
        textos: ["Hebreus 6:4-6", "Hebreus 10:26-31", "2 Pedro 2:20-22", "Gálatas 5:4"],
        forca:
          "Os avisos do Novo Testamento são sérios e endereçados a crentes, o que os torna vazios se a queda for impossível.",
        dificuldade:
          "João 10:28-29 afirma que ninguém as arrebata da mão do Pai, sem abrir exceção para a própria pessoa.",
      },
    ],
    investigacao: [
      "Em cada texto, a quem o autor está escrevendo?",
      "Os avisos são descrição do que acontece, ou meio pelo qual Deus guarda?",
      "O que 1 João 2:19 afirma sobre quem saiu?",
      "As duas leituras produzem que tipo de vida prática?",
    ],
    sintese:
      "Os dois lados afirmam que a salvação é obra de Deus, que os avisos precisam ser levados a sério e que fé genuína produz permanência. A diferença está em como explicar quem abandona.",
    notas: [
      "Se há no grupo alguém em crise de fé, conduza com cuidado: este debate pode ser ouvido como julgamento pessoal.",
    ],
  },

  {
    pergunta: "Batismo infantil ou batismo de crentes?",
    sinonimos: ["batismo de criancas", "pedobatismo", "credobatismo", "quem pode ser batizado"],
    contexto:
      "Nenhum texto descreve explicitamente o batismo de um bebê, e nenhum o proíbe. A disputa é sobre continuidade entre as alianças e sobre o que os batismos de 'casas' significam.",
    posicoes: [
      {
        nome: "Batismo de crentes",
        resumo: "O batismo segue a profissão pessoal de fé e pressupõe decisão consciente.",
        textos: ["Atos 2:38", "Atos 8:36-38", "Marcos 16:16", "Romanos 6:3-4"],
        forca:
          "Todo batismo narrado no Novo Testamento vem depois de fé declarada por quem é batizado.",
        dificuldade:
          "Os batismos de casas inteiras (Atos 16:15, 16:33) não dizem se havia crianças, e o silêncio corta para os dois lados.",
      },
      {
        nome: "Batismo infantil",
        resumo:
          "Filhos de crentes recebem o sinal da aliança, como na circuncisão, com profissão pessoal depois.",
        textos: ["Colossenses 2:11-12", "Atos 16:15", "Atos 16:33", "1 Coríntios 7:14"],
        forca:
          "A continuidade da aliança é o padrão bíblico, e nada no Novo Testamento anuncia a exclusão das crianças que antes recebiam o sinal.",
        dificuldade:
          "Romanos 6 liga batismo a morrer e ressuscitar com Cristo, linguagem que pressupõe participação consciente.",
      },
    ],
    investigacao: [
      "Que relação Colossenses 2 estabelece entre circuncisão e batismo?",
      "O que os textos de 'casa' dizem, e o que eles não dizem?",
      "Qual é a função do batismo, em cada leitura?",
      "Onde as duas concordam sobre o significado?",
    ],
    sintese:
      "As duas tradições afirmam que o batismo é ordenado por Cristo, ligado à entrada na fé e não é o que salva por si. Divergem sobre o momento e sobre o sujeito.",
  },

  {
    pergunta: "Os dons de sinal continuam hoje?",
    sinonimos: ["cessacionismo", "continuismo", "linguas", "profecia hoje", "curas hoje"],
    contexto:
      "A pergunta é se dons como línguas, profecia e cura tinham função específica na era apostólica ou permanecem disponíveis.",
    posicoes: [
      {
        nome: "Continuísmo",
        resumo: "Nada no texto anuncia o fim dos dons; eles continuam, sob a ordem de 1 Coríntios 14.",
        textos: ["1 Coríntios 12:7-11", "1 Coríntios 14:1", "Atos 2:17-18", "Efésios 4:11-13"],
        forca:
          "O ônus da prova está em quem afirma o fim: o Novo Testamento em nenhum lugar declara que cessariam.",
        dificuldade:
          "A raridade histórica dos fenômenos em vários séculos, e a frequência de abuso e falsificação hoje.",
      },
      {
        nome: "Cessacionismo",
        resumo:
          "Dons de sinal autenticavam a revelação apostólica e cessaram com ela, concluído o cânon.",
        textos: ["1 Coríntios 13:8-10", "Hebreus 2:3-4", "Efésios 2:20", "2 Coríntios 12:12"],
        forca:
          "Os dons aparecem ligados à confirmação de mensageiros; concluída a revelação, a função se encerra.",
        dificuldade:
          "1 Coríntios 13:10 fala do 'perfeito' sem definir, e ler isso como o cânon não é óbvio pelo contexto.",
      },
    ],
    investigacao: [
      "O que é o 'perfeito' de 1 Coríntios 13:10, dentro do próprio capítulo?",
      "Qual função Hebreus 2:3-4 atribui aos sinais?",
      "O critério de 1 Coríntios 14 vale para qual dos lados?",
      "Como cada posição lida com relatos contemporâneos?",
    ],
    sintese:
      "Os dois lados afirmam que Deus age hoje, que o cânon está fechado e que edificação é o critério do que acontece na igreja.",
  },

  {
    pergunta: "Soberania de Deus e livre-arbítrio se contradizem?",
    sinonimos: ["predestinacao", "eleicao", "calvinismo", "arminianismo", "livre arbitrio"],
    contexto:
      "A Bíblia afirma as duas coisas sem explicar como se articulam. As tradições diferem em qual delas organiza a leitura da outra.",
    posicoes: [
      {
        nome: "Ênfase na soberania",
        resumo:
          "Deus elege eficazmente; a vontade humana é real mas não decisiva na salvação.",
        textos: ["Romanos 9:14-24", "Efésios 1:4-5", "João 6:44", "Atos 13:48"],
        forca:
          "Romanos 9 enfrenta diretamente a objeção de injustiça e não a resolve apelando à escolha humana.",
        dificuldade:
          "Textos que expressam desejo universal de salvação, como 1 Timóteo 2:4 e 2 Pedro 3:9.",
      },
      {
        nome: "Ênfase na resposta livre",
        resumo:
          "A graça antecede e capacita, mas a resposta permanece genuinamente livre.",
        textos: ["1 Timóteo 2:3-4", "2 Pedro 3:9", "Tito 2:11", "Mateus 23:37"],
        forca:
          "As ofertas e lamentos de Deus sobre quem recusa soam vazios se a recusa já estivesse decidida.",
        dificuldade:
          "Romanos 9, especialmente a imagem do oleiro e a pergunta 'quem és tu que replicas?'.",
      },
    ],
    investigacao: [
      "Em Romanos 9, qual é a objeção que Paulo antecipa, e como ele responde?",
      "Mateus 23:37 descreve o quê sobre vontade?",
      "O que muda na prática pastoral em cada leitura?",
      "É possível afirmar as duas e admitir mistério?",
    ],
    sintese:
      "As duas tradições afirmam que ninguém se salva sem a iniciativa de Deus e que ninguém é salvo contra a própria vontade. O mistério fica na articulação.",
  },

  {
    pergunta: "O que a Bíblia diz sobre divórcio e novo casamento?",
    sinonimos: ["divorcio", "recasamento", "separacao"],
    contexto:
      "Jesus trata do tema respondendo a uma armadilha sobre um debate rabínico da época. Paulo acrescenta um caso que Jesus não tratou.",
    posicoes: [
      {
        nome: "Exceções limitadas",
        resumo:
          "Divórcio é permitido em caso de infidelidade e de abandono por descrente, com liberdade para novo casamento.",
        textos: ["Mateus 19:3-9", "1 Coríntios 7:12-15"],
        forca: "As duas exceções estão explícitas no texto, e não foram deduzidas.",
        dificuldade:
          "Marcos 10:11-12 e Lucas 16:18 registram a mesma fala sem cláusula de exceção.",
      },
      {
        nome: "Indissolubilidade",
        resumo:
          "O vínculo permanece; separação pode ser necessária, mas novo casamento não é contemplado.",
        textos: ["Marcos 10:2-12", "Lucas 16:18", "Romanos 7:2-3"],
        forca: "As versões sem exceção são as mais antigas e mais absolutas.",
        dificuldade:
          "A cláusula de Mateus 19:9 existe no texto e precisa de explicação que não a anule.",
      },
    ],
    investigacao: [
      "A quem Jesus responde em Mateus 19, e o que eles queriam?",
      "Por que Marcos e Lucas não trazem a cláusula?",
      "Que situação 1 Coríntios 7 acrescenta?",
      "Como cada leitura trata quem já está em segundo casamento?",
    ],
    sintese:
      "Há acordo de que o casamento é vínculo sério e que o divórcio é sempre fracasso, não solução neutra. A divergência é sobre exceções e sobre novo casamento.",
    notas: [
      "É muito provável que haja no grupo pessoas divorciadas ou filhas de divórcio. Conduza como estudo de texto, não como veredito sobre a vida de ninguém.",
    ],
  },

  {
    pergunta: "Gênesis 1 exige leitura literal de seis dias?",
    sinonimos: ["criacao", "criacionismo", "evolucao", "idade da terra", "seis dias"],
    contexto:
      "A disputa envolve gênero literário do texto, o significado da palavra 'dia' e a relação entre a Bíblia e a ciência.",
    posicoes: [
      {
        nome: "Leitura literal de seis dias",
        resumo: "Os dias são períodos de vinte e quatro horas, em sequência histórica.",
        textos: ["Gênesis 1:1-31", "Êxodo 20:11"],
        forca:
          "Êxodo 20:11 usa a semana da criação como base do sábado, o que sugere dias comuns.",
        dificuldade:
          "Sol e luas aparecem no quarto dia, embora haja luz e tarde e manhã desde o primeiro.",
      },
      {
        nome: "Leitura literária ou de estrutura",
        resumo:
          "O capítulo está organizado como poema de formação e preenchimento, respondendo a quem criou e por quê, não a como e em quanto tempo.",
        textos: ["Gênesis 1:1-31", "Salmos 104", "Jó 38:1-11"],
        forca:
          "A estrutura em dois blocos paralelos de três dias é evidente no próprio texto hebraico.",
        dificuldade:
          "Explicar o uso que Êxodo 20 faz da semana como fundamento literal do mandamento.",
      },
    ],
    investigacao: [
      "Compare os dias 1 a 3 com os dias 4 a 6. O que você nota?",
      "Que perguntas o capítulo responde de fato?",
      "Qual era a concepção de origem dos povos vizinhos, e o que Gênesis nega?",
      "O que está em jogo teologicamente em cada leitura?",
    ],
    sintese:
      "As duas leituras afirmam que Deus é o criador, que a criação é boa e que o ser humano é feito à imagem dele. Divergem sobre gênero literário e sobre o que o texto se propõe a informar.",
  },
];
