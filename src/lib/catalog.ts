/**
 * Camada editorial: o que transforma uma lista de 66 livros num catálogo.
 * Cores, sinopses e coleções temáticas ficam aqui, separadas do texto bíblico.
 */

export type GroupId =
  | "pentateuco"
  | "historicos"
  | "poeticos"
  | "profetas-maiores"
  | "profetas-menores"
  | "evangelhos"
  | "atos"
  | "cartas-paulinas"
  | "cartas-gerais"
  | "apocaliptico";

export type GroupTheme = { from: string; to: string; accent: string };

export const GROUP_THEME: Record<GroupId, GroupTheme> = {
  pentateuco: { from: "#f59e0b", to: "#7c2d12", accent: "#fbbf24" },
  historicos: { from: "#10b981", to: "#064e3b", accent: "#34d399" },
  poeticos: { from: "#8b5cf6", to: "#4c1d95", accent: "#a78bfa" },
  "profetas-maiores": { from: "#f43f5e", to: "#881337", accent: "#fb7185" },
  "profetas-menores": { from: "#ec4899", to: "#831843", accent: "#f472b6" },
  evangelhos: { from: "#38bdf8", to: "#075985", accent: "#7dd3fc" },
  atos: { from: "#14b8a6", to: "#134e4a", accent: "#2dd4bf" },
  "cartas-paulinas": { from: "#6366f1", to: "#312e81", accent: "#818cf8" },
  "cartas-gerais": { from: "#84cc16", to: "#365314", accent: "#a3e635" },
  apocaliptico: { from: "#ef4444", to: "#7f1d1d", accent: "#f87171" },
};

/**
 * Nome enxuto para a barra do leitor, onde a largura é disputada com os
 * controles. Só entra aqui o livro cujo nome completo não cabe num celular de
 * 375px: "Lamentações" é melhor que "Lamentações de ...". Em qualquer outro
 * lugar do app o nome completo continua valendo.
 */
export const NOME_NA_BARRA: Record<string, string> = {
  lm: "Lamentações",
};

/** Logline de cada livro, o "resumo do episódio". */
export const SYNOPSIS: Record<string, string> = {
  gn: "O começo de tudo: criação, queda, dilúvio e a promessa feita a Abraão.",
  ex: "Um povo escravizado, dez pragas e o mar que se abriu no meio.",
  lv: "O manual da santidade: como gente imperfeita se aproxima de Deus.",
  nm: "Quarenta anos de deserto, entre a murmuração e a fidelidade.",
  dt: "O último discurso de Moisés na fronteira da terra prometida.",
  js: "A conquista de Canaã, muralhas que caem e a terra repartida.",
  jz: "Ciclos de queda e resgate, com heróis improváveis como Gideão e Sansão.",
  rt: "Uma estrangeira, uma sogra viúva e a lealdade que virou linhagem real.",
  "1sm": "O último juiz, o primeiro rei e o pastor que derrubou um gigante.",
  "2sm": "O reinado de Davi: glória, adultério, luto e perdão.",
  "1rs": "Salomão, o templo mais caro da história e um reino que racha em dois.",
  "2rs": "Profetas de fogo, reis infiéis e o caminho até o exílio.",
  "1cr": "Israel recontado pelas genealogias e pelo trono de Davi.",
  "2cr": "Do esplendor do templo à queda de Jerusalém.",
  ed: "A volta do exílio e a reconstrução do templo, pedra por pedra.",
  ne: "Cinquenta e dois dias para reconstruir um muro, e um povo.",
  et: "Uma rainha judia arrisca a própria vida para impedir um genocídio.",
  job: "O homem que perdeu tudo e mesmo assim perguntou a Deus: por quê?",
  sl: "150 orações cruas: alegria, raiva, medo, gratidão e louvor.",
  pv: "Sabedoria prática sobre dinheiro, amizade, língua e caráter.",
  ec: "Tudo é vaidade? O rei que testou todos os prazeres e voltou vazio.",
  ct: "Poesia de amor sem pudor entre dois amantes.",
  is: "Juízo e consolo, e o Servo que carregaria a dor de muitos.",
  jr: "O profeta que chorou enquanto via a sua cidade cair.",
  lm: "Cinco poemas de luto escritos sobre as ruínas de Jerusalém.",
  ez: "Visões impossíveis, um vale de ossos secos e a promessa de um novo coração.",
  dn: "Cova dos leões, fornalha ardente e impérios que vêm e vão.",
  os: "Deus manda um profeta se casar com uma infiel, e ama exatamente assim.",
  jl: "Uma praga de gafanhotos e a promessa do Espírito sobre toda a carne.",
  am: "Um pastor de ovelhas confronta a injustiça social de uma nação rica.",
  ob: "Um único capítulo: o orgulho de Edom não ia sobreviver.",
  jn: "Ele fugiu de Deus, foi engolido por um peixe e ainda ficou com raiva.",
  mq: "Praticar a justiça, amar a misericórdia e andar humildemente.",
  na: "A queda de Nínive, a mesma cidade que um dia se arrependeu.",
  hc: "Um profeta discute com Deus de igual para igual, e termina cantando.",
  sf: "O Dia do Senhor chega. E depois dele, alegria.",
  ag: "Parem de decorar as suas casas: a casa de Deus está em ruínas.",
  zc: "Oito visões noturnas e um rei que entra na cidade montado num jumento.",
  ml: "As últimas palavras do Antigo Testamento, antes de 400 anos de silêncio.",
  mt: "O Messias prometido, do Sermão do Monte até a cruz.",
  mc: "O evangelho mais rápido: ação, urgência e um Jesus que serve.",
  lc: "A investigação de um médico sobre o Jesus dos marginalizados.",
  jo: "Não é biografia, é revelação: o Verbo que se fez carne.",
  at: "Doze homens assustados viram um movimento que atravessou o império.",
  rm: "A carta que explica o evangelho de ponta a ponta.",
  "1co": "Uma igreja bagunçada recebe correção, e o capítulo do amor.",
  "2co": "Paulo defende o seu ministério e escolhe se gloriar na fraqueza.",
  gl: "Liberdade: não existe salvação por mérito.",
  ef: "Quem você é em Cristo, e como isso muda todo o resto.",
  fp: "Alegria escrita de dentro de uma prisão.",
  cl: "Cristo é suficiente. Ponto final.",
  "1ts": "Como viver bem enquanto se espera a volta de Jesus.",
  "2ts": "Correção sobre o fim dos tempos e um chamado firme ao trabalho.",
  "1tm": "Um mentor orienta um jovem líder sob pressão.",
  "2tm": "As últimas palavras de Paulo antes de morrer.",
  tt: "Como plantar liderança saudável começando do zero.",
  fm: "Um bilhete pedindo perdão para um escravo fugitivo.",
  hb: "Jesus é superior a tudo que veio antes.",
  tg: "Fé sem obras é morta: cristianismo na prática.",
  "1pe": "Esperança para quem sofre justamente por fazer o certo.",
  "2pe": "Um alerta direto contra os falsos mestres.",
  "1jo": "Como saber, de verdade, se você conhece a Deus.",
  "2jo": "Um bilhete curto sobre verdade e hospitalidade.",
  "3jo": "Três nomes e um conflito de igreja.",
  jd: "Um alerta urgente contra a infiltração.",
  ap: "Visões do fim: a besta, o Cordeiro e um novo céu.",
};

/** Prateleiras temáticas, no espírito de "porque você assistiu...". */
export const COLLECTIONS: { title: string; subtitle: string; books: string[] }[] = [
  {
    title: "Se é o seu primeiro dia",
    subtitle: "Por onde quase todo mundo deveria começar",
    books: ["jo", "mc", "sl", "pv", "tg", "at"],
  },
  {
    title: "Quando bate a ansiedade",
    subtitle: "Para os dias em que a cabeça não desliga",
    books: ["fp", "sl", "mt", "1pe", "is", "hc"],
  },
  {
    title: "Parece série, mas está na Bíblia",
    subtitle: "Narrativa pura, do tipo que não dá pra largar",
    books: ["et", "rt", "jn", "dn", "1sm", "2sm", "gn", "js"],
  },
  {
    title: "Coragem em ambiente hostil",
    subtitle: "Fé quando ela custa caro",
    books: ["dn", "et", "ne", "2tm", "hb", "1pe"],
  },
  {
    title: "Sabedoria para a vida real",
    subtitle: "Dinheiro, trabalho, relações e o sentido de tudo",
    books: ["pv", "ec", "tg", "job", "ct"],
  },
  {
    title: "Curtos, para hoje",
    subtitle: "Cabe no intervalo do almoço",
    books: ["fm", "jd", "3jo", "2jo", "ob", "ag", "tt", "cl"],
  },
];

/** Versículos que giram no destaque da home, um por dia. */
export const DAILY: { slug: string; chapter: number; verse: number }[] = [
  { slug: "fp", chapter: 4, verse: 6 },
  { slug: "sl", chapter: 23, verse: 1 },
  { slug: "is", chapter: 41, verse: 10 },
  { slug: "jo", chapter: 1, verse: 14 },
  { slug: "rm", chapter: 8, verse: 28 },
  { slug: "pv", chapter: 3, verse: 5 },
  { slug: "mq", chapter: 6, verse: 8 },
  { slug: "hb", chapter: 11, verse: 1 },
  { slug: "sl", chapter: 46, verse: 1 },
  { slug: "mt", chapter: 11, verse: 28 },
  { slug: "js", chapter: 1, verse: 9 },
  { slug: "lm", chapter: 3, verse: 22 },
  { slug: "1co", chapter: 13, verse: 4 },
  { slug: "gl", chapter: 5, verse: 22 },
];

export const HIGHLIGHT_COLORS = [
  { id: "amarelo", label: "Amarelo", hex: "#facc15" },
  { id: "verde", label: "Verde", hex: "#4ade80" },
  { id: "azul", label: "Azul", hex: "#60a5fa" },
  { id: "rosa", label: "Rosa", hex: "#f472b6" },
  { id: "roxo", label: "Roxo", hex: "#a78bfa" },
] as const;

export type HighlightColor = (typeof HIGHLIGHT_COLORS)[number]["id"];
