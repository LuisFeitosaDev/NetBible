/**
 * Correções sobre a fonte da tradução "ara" (sources/aa.json), aplicadas por
 * scripts/build-bible.mjs. Corrigir aqui, e não no JSON gerado, faz um novo
 * `npm run bible` manter tudo.
 *
 * Apesar do id, o README do repositório de origem (github.com/thiagobodruk/biblia)
 * diz que esse arquivo é a "Almeida Revisada Imprensa Bíblica (AA)", e não a
 * Almeida Revista e Atualizada. Ele foi montado coletando páginas web e chegou
 * com versículos perdidos, trechos colados de outros versículos e erros de
 * digitação. Por isso a forma certa vem de cópias da mesma AA, e não da ARA:
 * trocar por texto de outra tradução misturaria duas Bíblias no mesmo capítulo.
 *
 * Cada correção diz de onde veio:
 *   COPIAS    está nas outras cópias on-line da AA (biblestudytools.com/aa,
 *             bibliaportugues.com/jfa e bibliajfa.com.br), que não perderam o trecho
 *   JFA       a cópia revisada do bibliajfa.com.br traz a mesma correção
 *             (as outras duas cópias repetem o erro desta fonte)
 *   paralelo  a mesma expressão está, com essas palavras, em outro versículo da AA
 *   GRAFIA    só ortografia, acento, concordância ou pontuação; nenhuma palavra nova
 *   A_MAO     já tinha sido corrigida à mão no JSON gerado (commit 708bcde) e
 *             nenhuma cópia confirma; fica até alguém conferir numa Bíblia impressa
 *
 * Referências na numeração já corrigida (a mesma da NVI e da ACF). O trecho
 * errado é o texto depois de decodificar entidades, trocar as chaves e arrumar
 * os espaços (ver build-bible.mjs), e precisa aparecer exatamente uma vez no
 * versículo: se não aparecer, o build para, porque a fonte mudou e a correção
 * precisa ser revista.
 */

const COPIAS = "cópias";
const JFA = "jfa";
const GRAFIA = "grafia";
const A_MAO = "à mão";
const paralelo = (ref) => `paralelo: ${ref}`;

/**
 * A fonte marca com chaves tanto o que as cópias põem entre parênteses
 * (observações do narrador, como "que, traduzido, quer dizer Mestre" em Jo 1:38)
 * quanto o que põem entre colchetes (trechos ausentes dos manuscritos mais
 * antigos, como Mt 27:35). O build troca as chaves por parênteses, menos
 * nestes versículos, que levam colchetes como nas cópias.
 */
export const COLCHETES = [
  "mt 6:13", "mt 17:21", "mt 18:11", "mt 19:9", "mt 23:14", "mt 27:35",
  "mc 7:16", "mc 9:24", "mc 9:29", "mc 9:44", "mc 9:46", "mc 10:7", "mc 10:24", "mc 11:26", "mc 15:28",
  "lc 8:43", "lc 9:54", "lc 9:55", "lc 9:56", "lc 11:4", "lc 17:36", "lc 23:17", "lc 23:38",
  "jo 5:3", "jo 5:4", "jo 7:53",
  "at 8:37", "at 10:6", "at 15:34", "at 20:15", "at 28:16", "at 28:29",
  "rm 16:24", "ap 22:14",
];

/**
 * Versículos que vieram duas vezes seguidas: [livro, capítulo, versículo, fonte].
 * O versículo indicado (na numeração da fonte, antes de qualquer inserção) é
 * cópia do seguinte e sai. Nos dois casos o versículo de verdade se perdeu e
 * volta por FALTANDO; a contagem fica igual, por isso o aviso de contagem do
 * build não pegava.
 */
export const REPETIDOS = [
  ["ex", 29, 22, COPIAS],
  ["mt", 20, 6, COPIAS],
];

/** Versículos que a coleta perdeu: [livro, capítulo, versículo, texto, fonte]. */
export const FALTANDO = [
  ["ex", 29, 19, "Depois tomarás o outro carneiro, e Arão e seus filhos porão as mãos sobre a cabeça dele;", COPIAS],
  [
    "mt", 20, 6,
    "Igualmente, cerca da hora undécima, saiu e achou outros que lá estavam, e perguntou-lhes: Por que estais aqui ociosos o dia todo?",
    COPIAS,
  ],
  [
    "mt", 2, 16,
    "Então Herodes, vendo que fora iludido pelos magos, irou-se grandemente e mandou matar todos os meninos de dois anos para baixo que havia em Belém, e em todos os seus arredores, segundo o tempo que com precisão inquirira dos magos.",
    COPIAS,
  ],
  ["mt", 27, 26, "Então lhes soltou Barrabás; mas a Jesus mandou açoitar, e o entregou para ser crucificado.", COPIAS],
  ["lc", 22, 56, "Uma criada, vendo-o sentado ao lume, fixou os olhos nele e disse: Esse também estava com ele.", COPIAS],
];

/** [referência, trecho errado, trecho certo, fonte] */
export const CORRECOES = [
  // Texto perdido, colado de outro lugar ou com lixo da coleta.
  // As cópias trazem "sacerdocio" e "tambem" sem acento; os acentos são repostos.
  ["ne 13:29", "(falta este versículo)", "Lembra-te deles, Deus meu, pois contaminaram o sacerdócio, como também o pacto do sacerdócio e dos levitas.", COPIAS],
  ["gn 41:8", " Estavam no cárcere da casa de seu senhor, dizendo vossos semblantes tão tristes hoje?", "", COPIAS],
  ["jz 2:10", "(IB) foi", "E foi", COPIAS],
  ["js 13:16", "vale do _,", "vale do Amom,", COPIAS],
  ["2tm 4:22", "convosco. ^Z", "convosco.", COPIAS],
  ["1cr 9:38", "defronte d‰ seus", "defronte de seus", JFA],
  ["mc 6:11", "testemunho conta eles", "testemunho contra eles", COPIAS],
  ["ef 4:29", "mas ó a que", "mas só a que", COPIAS],
  ["sl 30:10", "O Senhor, sê", "Ó Senhor, sê", COPIAS],
  ["1sm 24:7", "conteve os seio chegando para se permitiu", "conteve os seus homens, e não lhes permitiu", A_MAO],
  ["jo 11:21", "Senhor, se meu irmão", "Senhor, se tu estiveras aqui, meu irmão", paralelo("Jo 11:32")],

  // Trechos repetidos.
  ["lc 16:13", "amar ao outro, o há de odiar a um e amar ao outro, o há de dedicar-se", "amar ao outro, ou há de dedicar-se", JFA],
  ["sl 68:27", "os chefes de Judá com o seu ajuntamento; os chefes de Judá com o seu ajuntamento;", "os chefes de Judá com o seu ajuntamento;", JFA],
  ["ap 5:11", "e o número deles era miríades de miríades; e o número deles era miríades de miríades e milhares", "e o número deles era miríades de miríades e milhares", GRAFIA],
  ["jo 21:15", "Simão Pedro: Simão Pedro: Simão,", "Simão Pedro: Simão,", GRAFIA],

  // Palavra trocada.
  ["rm 8:23", "a nossa adoração,", "a nossa adoção,", JFA],
  ["lc 6:35", "os integrantes e maus", "os ingratos e maus", JFA],
  ["lc 1:54", "Auxiliou a Isabel,", "Auxiliou a Israel,", JFA],
  ["mc 10:51", "Perguntou-lhe o cego:", "Perguntou-lhe Jesus:", JFA],
  ["ex 13:21", "numa coluna e os dois para", "numa coluna de nuvem para", JFA],
  ["2tm 3:15", "pela que há", "pela fé que há", JFA],
  ["gl 5:1", "um jogo de escravidão", "um jugo de escravidão", JFA],
  ["ex 3:14", "aos olhos de Israel", "aos filhos de Israel", paralelo("Êx 3:15")],
  ["1co 16:1", "igrejas da Galiléia", "igrejas da Galácia", paralelo("Gl 1:2")],
  ["dt 8:14", "da terra o Egito, da casa da servidão", "da terra do Egito, da casa da servidão", paralelo("Dt 5:6")],
  ["pv 9:10", "o princípio sabedoria", "o princípio da sabedoria", paralelo("Sl 111:10")],
  ["pv 10:8", "o insensato palra dor cairá", "o insensato palrador cairá", paralelo("Pv 10:10")],
  ["jo 2:4", "Respondeu-lhes Jesus: Mulher", "Respondeu-lhe Jesus: Mulher", GRAFIA],
  ["jo 2:7", "Ordenou-lhe Jesus: Enchei", "Ordenou-lhes Jesus: Enchei", GRAFIA],

  // Erros de digitação.
  ["mt 5:11", "e perseguiram e", "e perseguirem e", JFA],
  ["mt 11:28", "que estai cansados", "que estais cansados", JFA],
  ["mt 11:30", "fardo e leve", "fardo é leve", JFA],
  ["mt 18:32", "chamando-o á sua", "chamando-o à sua", JFA],
  ["mt 19:6", "um só carne", "uma só carne", JFA],
  ["mc 1:13", "dias sentado tentado", "dias sendo tentado", JFA],
  ["mc 2:2", "a ponta de", "a ponto de", JFA],
  ["mc 14:8", "fez o que pode;", "fez o que pôde;", GRAFIA],
  ["lc 15:21", "pequei conta o céu", "pequei contra o céu", JFA],
  ["lc 15:32", "e alegramo-nos", "e alegrarmo-nos", JFA],
  ["lc 22:46", "Lenvantai-vos", "Levantai-vos", GRAFIA],
  ["lc 24:20", "autoridades e entregaram", "autoridades o entregaram", JFA],
  ["jo 6:28", "Pergutaram-lhe", "Perguntaram-lhe", GRAFIA],
  ["jo 11:37", "não morreste?", "não morresse?", GRAFIA],
  ["jo 12:38", "e aquem foi", "e a quem foi", GRAFIA],
  ["jo 20:25", "pois, ou outros", "pois, os outros", JFA],
  ["1co 15:54", "que está escrito:", "que está escrita:", JFA],
  ["1co 15:57", "Mas graça a Deus", "Mas graças a Deus", JFA],
  ["1jo 4:12", "Deus; e nos amamos", "Deus; se nos amamos", JFA],
  ["cl 3:12", "Revestí-vos", "Revesti-vos", GRAFIA],
  ["cl 3:14", "revestí-vos", "revesti-vos", GRAFIA],
  ["gn 2:19", "os animais o campo", "os animais do campo", JFA],
  ["dt 8:6", "mandamentos de Senhor", "mandamentos do Senhor", JFA],
  ["dt 8:13", "e es teus rebanhos", "e os teus rebanhos", JFA],
  ["dt 8:14", "se exalte e teu coração", "se exalte o teu coração", JFA],
  ["dt 34:9", "assim se filhos", "assim os filhos", JFA],
  ["nm 13:31", "do que nos.", "do que nós.", JFA],
  ["rt 1:6", "que e Senhor", "que o Senhor", JFA],
  ["rt 1:7", "saiu de lugar", "saiu do lugar", JFA],
  ["rt 1:22", "no principio da", "no princípio da", GRAFIA],
  ["rt 2:23", "até e fim", "até o fim", JFA],
  ["rt 4:10", "que a nome dele", "que o nome dele", GRAFIA],
  ["rt 4:20", "Aminadabe gereu", "Aminadabe gerou", GRAFIA],
  ["1sm 1:8", "e porque não comes?", "e por que não comes?", GRAFIA],
  ["1sm 1:8", "melhor de que dez", "melhor do que dez", GRAFIA],
  ["1sm 1:12", "perante e Senhor", "perante o Senhor", JFA],
  ["2sm 12:13", "não morreras.", "não morrerás.", GRAFIA],
  ["ne 3:5", "pescoço os serviço", "pescoço ao serviço", JFA],
  ["ne 4:4", "suas cabaças", "suas cabeças", JFA],
  ["ne 4:7", "o amonitas", "os amonitas", GRAFIA],
  ["ne 6:16", "os nosso inimigos", "os nossos inimigos", JFA],
  ["et 2:9", "donzela gradou-lhe", "donzela agradou-lhe", JFA],
  ["et 2:17", "e afez rainha", "e a fez rainha", JFA],
  ["et 3:13", "Entiaram-se", "Enviaram-se", JFA],
  ["et 4:2", "entrar elas portas", "entrar pelas portas", JFA],
  ["et 5:8", "concerder-me", "conceder-me", GRAFIA],
  ["sl 25:7", "dos pecado da", "dos pecados da", JFA],
  ["sl 25:20", "me refúgio", "me refugio", JFA],
  ["sl 34:17", "Os justos clama,", "Os justos clamam,", JFA],
  ["sl 51:1", "tansgressões", "transgressões", JFA],
  ["sl 51:11", "não retire de mim", "não retires de mim", GRAFIA],
  ["sl 56:1", "me aflingem", "me afligem", GRAFIA],
  ["pv 12:8", "perverso decoração", "perverso de coração", JFA],
  ["pv 13:12", "árvore devida", "árvore de vida", JFA],
  ["pv 13:14", "fonte devida", "fonte de vida", JFA],
  ["pv 13:19", "do ma e abominação", "do mal é abominação", JFA],
  // Pv 31:10-31 é acróstico e a AA põe o nome da letra hebraica antes de cada versículo.
  ["pv 31:24", "Sâmerue.", "Sâmeque.", GRAFIA],
  ["ec 9:7", "pão .e bebe", "pão e bebe", JFA],
  ["is 40:28", "? E inescrutável", "? É inescrutável", GRAFIA],
  ["dn 3:14", "disse: E verdade", "disse: É verdade", GRAFIA],
  ["os 1:7", "casa se Judá", "casa de Judá", JFA],
  ["os 2:23", "e a e Lo-Ami", "e a Lo-Ami", GRAFIA],
  ["mq 6:5", "rei de Meabe", "rei de Moabe", JFA],
  ["1cr 28:8", "depois de, vos, para sempre", "depois de vós, para sempre", GRAFIA],

  // Achados comparando com a cópia revisada (bibliajfa.com.br): onde ela
  // corrige um erro que as outras duas cópias repetem. Só entrou o que é erro
  // claro; formas antigas que ela moderniza ("alumiar", "mos deste", "Corá")
  // ou troca por outra tradução ficaram como estão.
  ["gn 2:15", "jardim do Édem", "jardim do Éden", paralelo("Gn 2:8")],
  ["gn 3:12", "deu-me a árvore", "deu-me da árvore", JFA],
  ["gn 8:13", "a face a terra", "a face da terra", JFA],
  ["gn 17:15", "Sarai, tua, mulher", "Sarai, tua mulher", GRAFIA],
  ["gn 17:15", "porem Sara", "porém Sara", GRAFIA],
  ["gn 20:9", "sobre mim o sobre o meu reino", "sobre mim e sobre o meu reino", JFA],
  ["gn 25:23", "das tuas estranhas", "das tuas entranhas", JFA],
  ["gn 27:40", "serviras;", "servirás;", GRAFIA],
  ["gn 28:3", "multidão de povos; seu", "multidão de povos;", JFA],
  ["gn 31:24", "Guardate,", "Guarda-te,", GRAFIA],
  ["gn 31:37", "da tua casar.", "da tua casa.", JFA],
  ["gn 34:14", "fazer p isto", "fazer isto", JFA],
  ["gn 36:18", "nasceram a líbama", "nasceram a Aolíbama", JFA],
  ["gn 38:30", "fio encamado", "fio encarnado", JFA],
  ["gn 47:24", "vossos filhinho.", "vossos filhinhos.", JFA],
  ["gn 48:2", "José, teu olho,", "José, teu filho,", JFA],
  ["gn 48:16", "de meus pois", "de meus pais", JFA],
  ["gn 48:18", "Nãa assim", "Não assim", JFA],
  ["ex 1:9", "do que nos.", "do que nós.", JFA],
  ["ex 7:15", "se tomou em serpente", "se tornou em serpente", JFA],
  ["ex 9:18", "por este tempo, s farei", "por este tempo, farei", JFA],
  ["ex 22:12", "fará restituirão", "fará restituição", JFA],
  ["lv 17:2", "e a s todos", "e a todos", JFA],
  ["lv 20:3", "porquanto eu de seus filhos", "porquanto deu de seus filhos", JFA],
  ["nm 3:22", "foram c contados", "foram contados", JFA],
  ["nm 6:9", "a sua cabera", "a sua cabeça", JFA],
  ["nm 14:4", "por chefe o voltemos", "por chefe e voltemos", JFA],
  ["nm 15:3", "do gado eu do rebanho", "do gado ou do rebanho", JFA],
  ["nm 15:3", "nas vossos festas", "nas vossas festas", JFA],
  ["nm 26:9", "Nemuel, Dato e", "Nemuel, Datã e", JFA],
  ["nm 33:46", "Dibom-Fade", "Dibom-Gade", paralelo("Nm 33:45")],
  ["dt 2:12", "assim come Israel", "assim como Israel", JFA],
  ["dt 4:43", "para os paditas", "para os gaditas", JFA],
  ["dt 10:3", "fiz ume arca", "fiz uma arca", JFA],
  ["dt 11:6", "no meia de todo", "no meio de todo", JFA],
  ["dt 13:5", "do meio vós", "do meio de vós", JFA],
  ["dt 15:12", "na sétimo ano", "no sétimo ano", JFA],
  ["dt 19:7", "eu te deu esta", "eu te dei esta", JFA],
  ["dt 21:11", "entre os cativas", "entre os cativos", JFA],
  ["dt 28:24", "ate que", "até que", JFA],
  ["dt 32:21", "provocaram cem aquilo", "provocaram com aquilo", JFA],
  ["dt 32:42", "dos mortes e", "dos mortos e", JFA],
  ["js 6:17", "será danátema", "será anátema", JFA],
  ["jz 2:16", "os espojavam", "os despojavam", JFA],
  ["jz 6:25", "a Gidão:", "a Gideão:", paralelo("Jz 6:11")],
  ["jz 6:32", "a Gidão Jerubaal", "a Gideão Jerubaal", paralelo("Jz 6:11")],
  ["jz 9:7", "para que Deus: vos ouça a vos.", "para que Deus vos ouça a vós.", GRAFIA],
  ["jz 11:40", "gileadita. Isso não é", "gileadita.", JFA],
  ["jz 17:6", "Naquelas dias", "Naqueles dias", JFA],
  ["jz 20:28", "nosso irmão, eu desistiremos", "nosso irmão, ou desistiremos", JFA],
  ["jz 20:46", "naquele dia oram vinte", "naquele dia foram vinte", JFA],
  ["1sm 8:14", "vossos elivais", "vossos olivais", JFA],
  ["1sm 8:18", "não vos ouvira.", "não vos ouvirá.", JFA],
  ["1sm 9:17", "o Senhor e disse", "o Senhor lhe disse", JFA],
  ["1sm 14:39", "em meu filha Jônatas", "em meu filho Jônatas", JFA],
  ["1sm 17:17", "uma refa deste", "uma efa deste", JFA],
  ["1sm 19:6", "Davi não morrera.", "Davi não morrerá.", JFA],
  ["1sm 23:3", "quanta mais se", "quanto mais se", JFA],
  ["1sm 26:22", "venha cá um os mancebos", "venha cá um dos mancebos", JFA],
  ["1sm 31:9", "o despejaram das suas armas", "o despojaram das suas armas", JFA],
  ["2sm 5:12", "exaltara e reino dele", "exaltara o reino dele", GRAFIA],
  ["2sm 5:12", "por amar do", "por amor do", JFA],
  ["2sm 14:14", "serereos", "seremos", JFA],
  ["2sm 19:10", "pois, porque vos calais", "pois, por que vos calais", JFA],
  ["1rs 3:6", "teu servo Dai,", "teu servo Davi,", JFA],
  ["1rs 7:24", "havia betões", "havia botões", JFA],
  ["1rs 8:9", "fez u pacto", "fez o pacto", JFA],
  ["1rs 8:14", "ficou em pe.", "ficou em pé.", JFA],
  ["1rs 10:15", "todos as reis", "todos os reis", JFA],
  ["1rs 10:17", "minas de auro", "minas de ouro", JFA],
  ["1rs 10:17", "Então e rei", "Então o rei", GRAFIA],
  ["1rs 11:7", "sobre e monte", "sobre o monte", GRAFIA],
  ["1rs 11:7", "a Moleque,", "a Moloque,", paralelo("Lv 20:2")],
  ["1rs 11:15", "tendo Jeabe,", "tendo Joabe,", JFA],
  ["1rs 11:21", "e que Jeabe,", "e que Joabe,", JFA],
  ["1rs 11:21", "disse o Faraó:", "disse ao Faraó:", JFA],
  ["1rs 13:27", "Albardai-me e jumento", "Albardai-me o jumento", paralelo("1Rs 13:13")],
  ["1rs 14:29", "atos de Reboão", "atos de Roboão", JFA],
  ["2rs 10:23", "adoradores de Baal. dom; porém não puderam.", "adoradores de Baal.", JFA],
  ["2rs 17:7", "debaixo da mãe de Faraó", "debaixo da mão de Faraó", JFA],
  ["1cr 15:25", "Obede-Edem", "Obede-Edom", JFA],
  ["1cr 15:26", "do pacto dó Senhor", "do pacto do Senhor", JFA],
  ["1cr 17:17", "olhos, O Deus", "olhos, ó Deus", JFA],
  ["1cr 17:19", "O Senhor! por amor", "Ó Senhor! por amor", JFA],
  ["1cr 18:10", "de bronze. l", "de bronze.", JFA],
  ["1cr 18:14", "Dari, pois,", "Davi, pois,", JFA],
  ["1cr 21:2", "Ide, cantai a Israel", "Ide, contai a Israel", JFA],
  ["1cr 22:13", "tem bem ânimo", "tem bom ânimo", JFA],
  ["1cr 23:27", "as ultimas palavras", "as últimas palavras", JFA],
  ["1cr 29:19", "os teus testemunhes", "os teus testemunhos", JFA],
  ["1cr 29:19", "os teus estatuto,", "os teus estatutos,", GRAFIA],
  ["1cr 29:20", "perante a Senhor", "perante o Senhor", GRAFIA],
  ["2cr 2:3", "assim também fazem comigo", "assim também faze comigo", JFA],
  ["2cr 25:24", "voltou pura Samária", "voltou para Samária", JFA],
  ["2cr 34:21", "derramado sobre nos por", "derramado sobre nós por", JFA],
  ["ne 2:1", "ano vigésimos", "ano vigésimo", JFA],
  ["ne 3:13", "até a porto do", "até a porta do", JFA],
  ["ne 3:21", "deste a porta", "desde a porta", JFA],
  ["ne 3:24", "outra porte,", "outra parte,", JFA],
  ["ne 5:7", "contendi com do nobres", "contendi com os nobres", JFA],
  ["ne 5:14", "até o anos trinta", "até o ano trinta", JFA],
  ["ne 7:4", "as casa não", "as casas não", JFA],
  ["ne 9:6", "neles já,", "neles há,", JFA],
  ["ne 9:11", "Fendente o mar", "Fendeste o mar", JFA],
  ["ne 9:27", "no templo da sua angústia", "no tempo da sua angústia", JFA],
  ["ne 9:36", "hoje somo escravos", "hoje somos escravos", JFA],
  ["ne 10:37", "da nossa mas,", "da nossa massa,", JFA],
  ["ne 13:15", "pisavam lugares", "pisavam lagares", JFA],
  ["et 1:1", "cento e vinte e seis províncias", "cento e vinte e sete províncias", paralelo("Et 8:9")],
  ["et 1:6", "e a colunas de mármore", "e as colunas de mármore", JFA],
  ["et 8:11", "esterminarem", "exterminarem", JFA],
  ["job 12:3", "como, vos;", "como vós;", JFA],
  ["job 13:21", "mão rara longe", "mão para longe", JFA],
  ["job 20:26", "reservadas paro os", "reservadas para os", JFA],
  ["job 28:17", "se trocara por", "se trocará por", JFA],
  ["job 29:3", "sobre o minha cabeça", "sobre a minha cabeça", JFA],
  ["job 31:25", "a minha mão alcança o muito", "a minha mão alcançado o muito", JFA],
  ["job 35:12", "arrogância os maus", "arrogância dos maus", JFA],
  ["job 42:4", "tu me responderas.", "tu me responderás.", JFA],
  ["sl 19:4", "os consfins", "os confins", JFA],
  ["sl 32:6", "todo aquele é piedoso", "todo aquele que é piedoso", JFA],
  ["sl 32:6", "estas e ele não", "estas a ele não", JFA],
  ["sl 34:3", "Engrandeci ao Senhor", "Engrandecei ao Senhor", JFA],
  ["sl 35:27", "a minha justificação, e digam a minha justificação, e digam", "a minha justificação, e digam", JFA],
  ["sl 37:14", "derrubarem o poder e necessitado", "derrubarem o pobre e necessitado", JFA],
  ["sl 39:2", "qual um mundo;", "qual um mudo;", JFA],
  ["sl 51:5", "me concedeu minha mãe", "me concebeu minha mãe", JFA],
  ["sl 59:2", "Livra-me do que praticam", "Livra-me dos que praticam", JFA],
  ["sl 59:13", "não existem mais", "não existam mais", JFA],
  ["sl 63:10", "servidão de pasto", "servirão de pasto", JFA],
  ["sl 68:34", "força nos firmamento", "força no firmamento", JFA],
  ["sl 69:12", "se sentem à porta", "se sentam à porta", JFA],
  ["sl 83:14", "incedeia", "incendeia", JFA],
  ["sl 86:2", "o Deus meu, salva", "ó Deus meu, salva", JFA],
  ["sl 89:9", "dominas o ímpio do mar", "dominas o ímpeto do mar", JFA],
  ["sl 95:5", "a serra terra seca", "a terra seca", JFA],
  ["sl 97:5", "como cerca, se derretem", "como cera, se derretem", JFA],
  ["sl 101:3", "não se apagará a mim", "não se apegará a mim", JFA],
  ["sl 110:6", "os cabeças", "as cabeças", JFA],
  ["sl 118:29", "para sempre. a tua palavra.", "para sempre.", JFA],
  ["sl 119:102", "Não me aperto", "Não me aparto", JFA],
  ["sl 137:9", "nas pedra.", "nas pedras.", JFA],
  ["sl 138:4", "da terra de louvarão", "da terra te louvarão", JFA],
  ["sl 144:2", "e meu e meu libertador", "e meu libertador", JFA],
  ["pv 2:11", "o discernimento e guardará", "o discernimento te guardará", JFA],
  ["pv 2:19", "tornara a sair", "tornará a sair", JFA],
  ["pv 6:9", "o preguiçoso, até quando ficarás deitador?", "Ó preguiçoso, até quando ficarás deitado?", JFA],
  ["pv 21:17", "nunca enriquecera.", "nunca enriquecerá.", JFA],
  ["ec 1:10", "dizer: Voê,", "dizer: Vê,", JFA],
  ["ec 2:25", "gozar. melhor", "gozar, melhor", JFA],
  ["ec 10:20", "pensamento amaldições o rei", "pensamento amaldiçoes o rei", JFA],
  ["is 13:13", "se movera do seu lugar", "se moverá do seu lugar", JFA],
  ["is 33:23", "e ate os coxos", "e até os coxos", JFA],
  ["is 40:2", "a sua malícia é acabada", "a sua milícia é acabada", JFA],
  ["is 43:4", "e es povos", "e os povos", GRAFIA],
  ["is 44:21", "não te esquecerei de ti", "não me esquecerei de ti", JFA],
  ["is 44:22", "Apagai as tuas", "Apaguei as tuas", JFA],
  ["is 47:14", "o logo os queimará", "o fogo os queimará", JFA],
  ["jr 2:37", "com as mães sobre", "com as mãos sobre", JFA],
  ["jr 10:19", "suporta-la", "suportá-la", JFA],
  ["jr 12:9", "de varias cores", "de várias cores", JFA],
  ["jr 13:26", "a tua ignominia", "a tua ignomínia", JFA],
  ["jr 14:6", "não ha erva", "não há erva", JFA],
  ["jr 25:12", "desolação perpetua", "desolação perpétua", JFA],
  ["jr 28:9", "que profetuar de paz", "que profetizar de paz", JFA],
  ["jr 36:25", "Gema rias", "Gemarias", JFA],
  ["jr 37:11", "exército de Iearaó", "exército de Faraó", JFA],
  ["jr 42:21", "me enviou a vos.", "me enviou a vós.", JFA],
  ["jr 46:12", "juntos cairam", "juntos caíram", JFA],
  ["jr 46:18", "assim ele vira.", "assim ele virá.", JFA],
  ["ez 11:13", "caí com o resto em terra", "caí com o rosto em terra", JFA],
  ["ez 14:21", "peste, pura exterminar", "peste, para exterminar", JFA],
  ["ez 18:6", "os seus olhes", "os seus olhos", JFA],
  ["ez 21:16", "e espada, une", "Ó espada, une", JFA],
  ["ez 26:14", "descalvada; viras a ser", "descalvada; virás a ser", JFA],
  ["ez 28:12", "e dize-te:", "e dize-lhe:", JFA],
  ["jl 2:3", "jardim do Édem", "jardim do Éden", paralelo("Gn 2:8")],
  ["hc 1:8", "Os seis cavalos", "Os seus cavalos", JFA],
  ["hc 1:8", "leopardos, se mais ferozes", "leopardos, são mais ferozes", JFA],
  ["hc 1:13", "olhas pára os", "olhas para os", JFA],
  ["hc 2:8", "para com á terra", "para com a terra", JFA],
  ["hc 2:16", "um incurcunciso", "um incircunciso", JFA],
  ["zc 1:12", "disse: O Senhor dos exércitos", "disse: Ó Senhor dos exércitos", JFA],
  ["zc 10:5", "o Senhor esta com eles", "o Senhor está com eles", JFA],
  ["zc 14:4", "para o oriente; se o monte", "para o oriente; o monte", JFA],
  ["mt 3:10", "o machado á raiz", "o machado à raiz", JFA],
  ["mt 6:20", "os consumem", "os consomem", JFA],
  ["mt 12:26", "o seus reino", "o seu reino", JFA],
  ["mt 13:39", "e os celeiros são os anjos", "e os ceifeiros são os anjos", JFA],
  ["mt 15:22", "daquelas cercania,", "daquelas cercanias,", JFA],
  ["mc 2:16", "ele como com os publicanos", "ele come com os publicanos", JFA],
  ["mc 8:37", "que diria o homem", "que daria o homem", JFA],
  ["mc 10:1", "e do novo as multidões", "e de novo as multidões", JFA],
  ["mc 14:41", "descansai.-Basta;", "descansai. Basta;", GRAFIA],
  ["mc 15:43", "ânimo foi Pilatos", "ânimo foi a Pilatos", JFA],
  ["lc 1:3", "haver investido tudo", "haver investigado tudo", JFA],
  ["lc 6:8", "aqui no maio.", "aqui no meio.", JFA],
  ["lc 6:11", "outros conferenciam sobre", "outros conferenciavam sobre", JFA],
  ["lc 10:9", "e dizer-lhes:", "e dizei-lhes:", JFA],
  ["lc 13:17", "seus adversário ficavam", "seus adversários ficavam", JFA],
  ["lc 18:43", "gloficando", "glorificando", JFA],
  ["jo 5:26", "vida em si mesmos;", "vida em si mesmo;", JFA],
  ["jo 13:19", "Desde já no-lo digo", "Desde já vo-lo digo", JFA],
  ["at 20:29", "não pouparão rebanho", "não pouparão o rebanho", JFA],
  ["at 27:20", "por muitos dia", "por muitos dias", JFA],
  ["at 28:15", "os irmãos da lá", "os irmãos de lá", JFA],
  ["rm 1:30", "desobedientes ao pais", "desobedientes aos pais", JFA],
  ["rm 2:7", "em favor o bem", "em fazer o bem", JFA],
  ["rm 7:3", "será chamado adúltera", "será chamada adúltera", JFA],
  ["rm 10:9", "dentre os mortos, será salvo", "dentre os mortos, serás salvo", JFA],
  ["1co 1:26", "os poderosos. nem", "os poderosos, nem", JFA],
  ["1co 6:7", "o terdes demandadas", "o terdes demandas", JFA],
  ["1co 14:5", "também intercede para", "também interprete para", JFA],
  ["ef 4:17", "na verdade da sua mente", "na vaidade da sua mente", JFA],
  ["ef 6:12", "conta os príncipes", "contra os príncipes", JFA],
  ["fp 3:10", "e a e a participação", "e a participação", JFA],
  ["1ts 5:13", "da sua obras", "da sua obra", JFA],
  ["2ts 1:8", "dos que não conhecem a Deus e dos que não conhecem a Deus e", "dos que não conhecem a Deus e", JFA],
  ["2ts 2:8", "matará como o sopro", "matará com o sopro", JFA],
  ["tt 1:13", "sejam são na fé", "sejam sãos na fé", JFA],
  ["hb 9:17", "não tem torça", "não tem força", JFA],
  ["tg 1:3", "a aprovação da vossa fé", "a provação da vossa fé", JFA],
  ["1pe 4:11", "Cristo, ma quem", "Cristo, a quem", JFA],
  ["1pe 5:12", "considero, escravo abreviadamente", "considero, escrevo abreviadamente", JFA],
  ["2pe 3:16", "coisas, mas quais há", "coisas, nas quais há", JFA],
  ["ap 2:11", "o dado da segunda morte", "o dano da segunda morte", JFA],
  ["ap 7:14", "e levaram as suas vestes", "e lavaram as suas vestes", JFA],
  ["ap 16:20", "Todas ilhas fugiram", "Todas as ilhas fugiram", JFA],
  ["ap 18:4", "dos sete pecados", "dos seus pecados", JFA],
  ["ap 22:14", "à arvore da vida", "à árvore da vida", JFA],

  // Vírgula solta no meio da expressão.
  ["gn 29:12", "anunciá-lo a, seu pai", "anunciá-lo a seu pai", GRAFIA],
  ["ex 24:2", "os, outros", "os outros", GRAFIA],
  ["lv 11:19", "a sua, espécie", "a sua espécie", GRAFIA],
  ["lv 21:11", "de sua, mãe", "de sua mãe", GRAFIA],
  ["2sm 15:2", "para, vir ao rei", "para vir ao rei", GRAFIA],
  ["1rs 5:11", "vinte, coros", "vinte coros", GRAFIA],
  ["1cr 11:37", "carmelita;, Naarai", "carmelita; Naarai", GRAFIA],
  ["1cr 27:18", "Judá,, Eliu:, um", "Judá, Eliu, um", GRAFIA],
  ["1cr 29:7", "dez mil, dracmas", "dez mil dracmas", GRAFIA],
  ["2cr 30:6", "e dos, seus príncipes", "e dos seus príncipes", GRAFIA],
  ["ed 2:40", "filhos de, Hodavias", "filhos de Hodavias", GRAFIA],
  ["job 6:28", "para, mim", "para mim", GRAFIA],
  ["job 18:21", "do, ímpio", "do ímpio", GRAFIA],
  ["job 19:10", "como a, uma árvore", "como a uma árvore", GRAFIA],
  ["job 19:14", "de, mim", "de mim", GRAFIA],
  ["job 24:19", "as, águas", "as águas", GRAFIA],
  ["pv 4:3", "de meu, pai", "de meu pai", GRAFIA],
  ["pv 6:20", "de, teu pai", "de teu pai", GRAFIA],
  ["pv 11:6", "nas, suas", "nas suas", GRAFIA],
  ["pv 11:17", "à sua, própria", "à sua própria", GRAFIA],
  ["pv 17:25", "para seu, pai", "para seu pai", GRAFIA],
  ["pv 20:20", "nas, mais", "nas mais", GRAFIA],
  ["is 32:9", "estais, tão seguras", "estais tão seguras", GRAFIA],
  ["jr 28:14", "o, pescoço", "o pescoço", GRAFIA],
  ["ez 17:4", "seus, raminhos", "seus raminhos", GRAFIA],
  ["na 3:3", "a, multidão", "a multidão", GRAFIA],
  ["mt 14:13", "para um, lugar", "para um lugar", GRAFIA],

  // Dois sinais seguidos no meio do versículo: fica o que a frase pede.
  ["ex 8:20", "Faraó:; eis", "Faraó; eis", GRAFIA],
  ["ex 8:21", "povo., eis", "povo, eis", GRAFIA],
  ["ex 13:13", "cerviz:; e", "cerviz; e", GRAFIA],
  ["ex 34:9", "cerviz:; e", "cerviz; e", GRAFIA],
  ["jz 15:5", "filisteus:, e", "filisteus, e", GRAFIA],
  ["1cr 6:35", "Elcana:, filho", "Elcana, filho", GRAFIA],
  ["1cr 8:10", "filhos:, chefes", "filhos, chefes", GRAFIA],
  ["1cr 26:23", "izaritas:, dos", "izaritas, dos", GRAFIA],
  ["1cr 27:8", "mês:, Samute", "mês, Samute", GRAFIA],
  ["1cr 27:10", "mês:, Helez", "mês, Helez", GRAFIA],
  ["ne 9:28", "ti,; portanto", "ti; portanto", GRAFIA],

  // "senhor" com minúscula onde é Deus (conferido no contexto e na ACF, que
  // escreve SENHOR). Fica com minúscula o senhor humano: "meu senhor Abraão",
  // "Ai! senhor meu", "o senhor da vinha".
  ...[
    ["gn 2:22", "o senhor"], ["ex 35:29", "o senhor"], ["lv 8:34", "o senhor"],
    ["lv 19:10", "o senhor"], ["lv 21:1", "o senhor"], ["lv 21:6", "do senhor"],
    ["lv 27:26", "ao senhor"], ["lv 27:30", "ao senhor"], ["nm 3:11", "o senhor"],
    ["nm 15:41", "o senhor"], ["nm 16:20", "o senhor"], ["nm 20:9", "do senhor"],
    ["nm 22:32", "do senhor"], ["nm 23:5", "o senhor"], ["nm 23:21", "o senhor"],
    ["nm 25:4", "ao senhor"], ["nm 26:52", "o senhor"], ["nm 26:65", "o senhor"],
    ["nm 27:16", "o senhor"], ["nm 30:8", "o senhor"], ["nm 30:12", "o senhor"],
    ["nm 31:7", "o senhor"], ["nm 32:22", "o senhor"], ["nm 32:31", "o senhor"],
    ["nm 32:32", "o senhor"], ["nm 33:4", "o senhor"], ["nm 36:2", "do senhor"],
    ["nm 36:5", "do senhor"], ["nm 36:6", "o senhor"], ["dt 1:3", "o senhor"],
    ["dt 5:12", "o senhor"], ["dt 5:16", "o senhor"], ["dt 5:22", "o senhor"],
    ["dt 12:10", "o senhor"], ["dt 16:15", "o senhor"], ["dt 17:1", "ao senhor"],
    ["dt 26:2", "o senhor"], ["dt 26:3", "o senhor"], ["dt 26:14", "do senhor"],
    ["dt 30:3", "o senhor"], ["jz 20:1", "do senhor"], ["1sm 11:13", "o senhor"],
    ["2sm 6:16", "do senhor"], ["1rs 5:5", "o senhor"], ["1rs 7:51", "do senhor"],
    ["1rs 18:39", "O senhor"], ["1rs 22:28", "o senhor"], ["2rs 2:6", "o senhor"],
    ["2rs 4:30", "o senhor"], ["2rs 6:17", "Ó senhor"], ["2rs 10:10", "do senhor"],
    ["2rs 13:4", "o senhor"], ["2rs 18:12", "do senhor"], ["2rs 19:4", "o senhor"],
    ["2rs 25:13", "do senhor"], ["2cr 21:6", "do senhor"], ["2cr 28:3", "o senhor"],
    ["pv 22:19", "no senhor"], ["pv 28:25", "no senhor"], ["is 45:24", "no senhor"],
    ["jr 5:29", "o senhor"], ["jr 8:3", "o senhor"], ["jr 18:11", "o senhor"],
    ["jr 20:16", "o senhor"], ["jr 27:16", "do senhor"], ["jr 31:22", "o senhor"],
    ["jr 46:28", "o senhor"], ["jr 48:25", "o senhor"], ["jr 49:6", "o senhor"],
    ["jr 50:25", "o senhor"], ["jr 50:35", "o senhor"], ["lm 3:36", "do senhor"],
    ["ez 11:17", "o senhor"], ["ez 20:44", "o senhor"], ["jl 1:15", "do senhor"],
    ["am 1:3", "o senhor"], ["am 4:3", "o senhor"], ["am 7:7", "o senhor"],
    ["am 9:15", "o senhor"], ["jn 2:2", "ao senhor"], ["jn 4:4", "o senhor"],
    ["zc 8:17", "o senhor"], ["2ts 1:9", "do senhor"],
  ].map(([ref, de]) => [ref, de, de.replace("senhor", "Senhor"), GRAFIA]),
];

/*
 * PENDENTES: ainda errados, mas nenhuma cópia da AA traz o texto certo (as
 * três repetem o erro, ou só a do bibliajfa o corrige, às vezes com texto de
 * outra Almeida). Precisam de uma AA impressa, ou de decisão de usar outra fonte.
 *
 *   gn 17:10  termina em "todo varão dentre vugar para aquele que me"
 *   gn 39:15  "e ouvigiu-se para ela no caminho, e disse: Vem, deixa-me deixou, aqui a sua capa..."
 *             (o bibliajfa traz o texto da ACF)
 *   ex 30:28  "a altar do holocausto ..., o altar de incenso," repete o fim do v.27
 *             e não tem a pia com a sua base
 *   ex 36:3   "que os filhos de Israel tinham do para a obra"
 *   et 1:5    "E, acabado aqueles dias" (acabados?)
 *   sl 78:20  é cópia do v.21; o v.20 verdadeiro se perdeu (o bibliajfa traz o da ACF)
 *   sl 86:11  o v.11 se perdeu: o 11 do app é o 12, e o 12 e o 13 são o mesmo versículo.
 *             O bibliajfa traz um v.11 que não é da ACF, da NVI nem da Bíblia Livre:
 *             "Ensina-me, Senhor, o teu caminho, e andarei na tua verdade; dispõe o meu
 *             coração para temer o teu nome."
 *   is 41:8   falta "meu amigo" depois de "descendência de Abraão"
 *   ec 3:13   as cópias dizem igual; pode não estar truncado
 *   jr 49:2   "deserdará aos que e deserdaram a ele"
 *   ez 13:3   termina em "que seguem o seu próprio"
 *   mt 26:63  "o Filho do Deus." ("de Deus"? "do Deus vivo"?)
 *   jo 10:9   "se alguém entrar a casa; o filho fica entrará e sairá"; o bibliajfa traz
 *             "se alguém entrar por mim, salvar-se-á, e entrará e sairá"
 *   1co 1:19  "aniquilarei a sabedoria o entendimento dos entendidos"
 *   2co 3:13  termina em "para que os filhos de Isra desvanecia;"
 *   1pe 3:21  "por uma verdadeira figura-o batismo"
 *   1sm 24:7  a correção acima (A_MAO) não foi confirmada em cópia nenhuma
 */
