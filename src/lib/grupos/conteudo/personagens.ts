import type { TextoApoio } from "./tipos";

/**
 * Personagens curados.
 *
 * Regra editorial da especificação: não reduzir ninguém a herói ou vilão. Por
 * isso `virtudes` e `erros` são campos obrigatórios para todo mundo, inclusive
 * para os que a pregação costuma tratar só de um jeito. Judas tem virtudes
 * listadas; Davi tem erros; e a narrativa bíblica sustenta os dois.
 */
export type Personagem = {
  nome: string;
  sinonimos: string[];
  epoca: string;
  contexto: string;
  familia: string;
  acontecimentos: string[];
  decisoes: string[];
  virtudes: string[];
  erros: string[];
  relacionamento: string;
  consequencias: string;
  desenvolvimento: string;
  textos: TextoApoio[];
  aplicacoes: string[];
};

const t = (
  ref: string,
  slug: string,
  capitulo: number,
  versiculos: string,
  contexto: string,
): TextoApoio => ({ ref, slug, capitulo, versiculos, contexto });

export const PERSONAGENS: Personagem[] = [
  {
    nome: "Abraão",
    sinonimos: ["abrao", "abram"],
    epoca: "Período patriarcal",
    contexto: "Chamado a sair de uma cidade próspera da Mesopotâmia para uma terra que não conhecia.",
    familia: "Casado com Sara. Pai de Ismael, com Agar, e de Isaque, com Sara. Sobrinho: Ló.",
    acontecimentos: [
      "Sai de Harã sem destino declarado",
      "Recebe promessa de descendência incontável estando sem filhos",
      "Mente duas vezes sobre Sara ser sua esposa",
      "Tem Ismael por iniciativa própria",
      "É chamado a oferecer Isaque",
    ],
    decisoes: [
      "Confiou na promessa antes de qualquer sinal",
      "Tentou resolver a falta de herdeiro por conta própria",
      "Intercedeu por Sodoma, discutindo com Deus",
    ],
    virtudes: ["Confiança que se sustentou décadas", "Hospitalidade", "Coragem de interceder"],
    erros: [
      "Colocou a esposa em risco para se proteger, duas vezes",
      "Impaciência com o prazo da promessa",
      "Omissão no conflito entre Sara e Agar",
    ],
    relacionamento:
      "Marcado por diálogo direto, inclusive com questionamento. Deus repete a promessa sempre que ele falha.",
    consequencias:
      "Torna-se referência de fé para judaísmo, cristianismo e islamismo. O atalho de Ismael gera conflito familiar duradouro.",
    desenvolvimento:
      "Sai como alguém que obedece sem entender e chega a alguém que confia tendo entendido o custo.",
    textos: [
      t("Gênesis 12:1-9", "gn", 12, "1-9", "O chamado, sem destino informado."),
      t("Gênesis 15:1-6", "gn", 15, "1-6", "A promessa é reafirmada e a fé dele é contada como justiça."),
      t("Gênesis 16:1-6", "gn", 16, "1-6", "O atalho de Ismael, e o custo humano dele."),
      t("Gênesis 22:1-19", "gn", 22, "1-19", "O teste mais duro, e o ponto onde tudo converge."),
    ],
    aplicacoes: [
      "Onde você tem tentado apressar algo que foi prometido?",
      "Que promessa você continua esperando sem ver sinal?",
    ],
  },

  {
    nome: "Moisés",
    sinonimos: ["moises"],
    epoca: "Êxodo, século XV a XIII a.C.",
    contexto: "Nascido hebreu, criado como egípcio, fugitivo por quarenta anos antes do chamado.",
    familia: "Irmãos: Arão e Miriã. Casado com Zípora, filha de Jetro.",
    acontecimentos: [
      "Mata um egípcio e foge",
      "É chamado na sarça ardente e resiste cinco vezes",
      "Conduz a saída do Egito",
      "Recebe a lei no Sinai",
      "Bate na rocha em vez de falar, e perde a entrada na terra",
    ],
    decisoes: [
      "Recusou o chamado alegando não saber falar",
      "Intercedeu pelo povo recusando ser feito uma nação melhor",
      "Perdeu a paciência diante da murmuração",
    ],
    virtudes: ["Intercessão custosa", "Mansidão registrada pelo próprio texto", "Persistência"],
    erros: ["Violência no início", "Relutância prolongada", "Explosão em Meribá"],
    relacionamento:
      "Descrito como falando com Deus face a face, e ainda assim argumentando e reclamando com frequência.",
    consequencias:
      "Liberta um povo e recebe a lei, mas morre olhando a terra de longe.",
    desenvolvimento:
      "Vai de príncipe impulsivo a fugitivo quebrado, e de fugitivo a líder que prefere o povo à própria promoção.",
    textos: [
      t("Êxodo 3:1-15", "ex", 3, "1-15", "O chamado e a primeira recusa."),
      t("Êxodo 32:7-14", "ex", 32, "7-14", "Intercede recusando a oferta de virar uma nação melhor."),
      t("Números 20:1-13", "nm", 20, "1-13", "O erro que lhe custa a entrada na terra."),
      t("Deuteronômio 34:1-12", "dt", 34, "1-12", "A morte, e o epitáfio que o texto lhe dá."),
    ],
    aplicacoes: [
      "Que chamado você tem recusado alegando incapacidade?",
      "Onde o cansaço tem virado explosão na sua liderança?",
    ],
  },

  {
    nome: "Davi",
    sinonimos: ["rei davi"],
    epoca: "Século XI a X a.C.",
    contexto: "Caçula de uma família comum em Belém, ungido rei anos antes de reinar de fato.",
    familia: "Filho de Jessé. Casado com Mical, Abigail, Bate-Seba e outras. Filhos: Absalão, Amnom, Salomão.",
    acontecimentos: [
      "Derruba Golias ainda adolescente",
      "É perseguido por Saul por anos",
      "Poupa Saul duas vezes tendo chance de matá-lo",
      "Toma Bate-Seba e manda matar Urias",
      "Enfrenta golpe do próprio filho",
    ],
    decisoes: [
      "Recusou tomar o trono pela força",
      "Usou o poder para encobrir o próprio crime",
      "Confessou quando confrontado, em vez de eliminar o profeta",
    ],
    virtudes: ["Coragem", "Respeito pela unção alheia", "Arrependimento sem justificativa"],
    erros: ["Abuso de poder", "Assassinato por encomenda", "Omissão grave como pai"],
    relacionamento:
      "Escreveu boa parte dos salmos, incluindo acusações diretas a Deus. A intimidade não o tornou melhor automaticamente.",
    consequencias:
      "Dinastia prometida e permanente, e ao mesmo tempo uma família destruída por violência que ele não conteve.",
    desenvolvimento:
      "De pastor corajoso a rei que abusa, e de rei que abusa a homem quebrado que não tenta se defender.",
    textos: [
      t("1 Samuel 16:1-13", "1sm", 16, "1-13", "A escolha do filho que nem foi chamado."),
      t("1 Samuel 24:1-22", "1sm", 24, "1-22", "Poupa Saul tendo a faca na mão."),
      t("2 Samuel 11:1-27", "2sm", 11, "1-27", "O crime, contado sem nenhuma suavização."),
      t("Salmos 51", "sl", 51, "", "A oração depois de ser confrontado."),
    ],
    aplicacoes: [
      "Onde o seu poder, por menor que seja, protege você de ser confrontado?",
      "Quem tem permissão de ser o Natã da sua vida?",
    ],
  },

  {
    nome: "Saul",
    sinonimos: ["rei saul"],
    epoca: "Século XI a.C.",
    contexto: "Primeiro rei de Israel, escolhido quando o povo exigiu ser como as outras nações.",
    familia: "Filho de Quis, da tribo de Benjamim. Filhos: Jônatas e Mical.",
    acontecimentos: [
      "É ungido depois de se esconder entre a bagagem",
      "Oferece sacrifício sem esperar Samuel",
      "Poupa o que deveria destruir e culpa o povo",
      "Persegue Davi por anos",
      "Consulta uma médium na véspera da morte",
    ],
    decisoes: [
      "Preferiu agradar o povo a obedecer",
      "Escolheu justificar em vez de admitir",
      "Perseguiu quem havia salvado o reino",
    ],
    virtudes: ["Humildade inicial genuína", "Coragem militar", "Capacidade de reconhecer, por instantes, que errava"],
    erros: ["Desobediência disfarçada de zelo", "Ciúme que virou obsessão", "Recusa de arrependimento real"],
    relacionamento:
      "Começa com o Espírito sobre ele e termina buscando resposta em uma médium. O afastamento é gradual.",
    consequencias: "Perde a dinastia, a razão e a vida, junto com três filhos.",
    desenvolvimento:
      "Começa tímido e termina paranoico. É um caso de deterioração, não de maldade de origem.",
    textos: [
      t("1 Samuel 10:17-24", "1sm", 10, "17-24", "Escondido na bagagem no dia da coroação."),
      t("1 Samuel 15:10-31", "1sm", 15, "10-31", "Justifica a desobediência como culto."),
      t("1 Samuel 18:6-16", "1sm", 18, "6-16", "O ciúme começa numa música."),
      t("1 Samuel 28:3-20", "1sm", 28, "3-20", "O fim, buscando resposta onde ele mesmo havia proibido."),
    ],
    aplicacoes: [
      "Onde você chama de zelo o que é desobediência conveniente?",
      "Que comparação tem alimentado ciúme em você?",
    ],
  },

  {
    nome: "José",
    sinonimos: ["jose do egito", "jose filho de jaco"],
    epoca: "Período patriarcal",
    contexto: "Filho preferido, vendido pelos irmãos, chega a administrador do Egito.",
    familia: "Filho de Jacó e Raquel. Onze irmãos. Casado com Asenate, pai de Manassés e Efraim.",
    acontecimentos: [
      "Conta sonhos que humilham os irmãos",
      "É vendido como escravo",
      "É preso por acusação falsa",
      "Interpreta sonhos e assume a administração da fome",
      "Se revela aos irmãos",
    ],
    decisoes: [
      "Recusou a proposta da esposa de Potifar mesmo sem testemunhas",
      "Serviu bem mesmo quando escravo e preso",
      "Escolheu não se vingar tendo todo o poder para isso",
    ],
    virtudes: ["Integridade sem plateia", "Competência", "Perdão que não nega o dano"],
    erros: ["Falta de tato ao contar os sonhos", "Testes prolongados com os irmãos"],
    relacionamento:
      "Atribui a Deus tanto a leitura dos sonhos quanto o desfecho, sem negar a maldade do que sofreu.",
    consequencias: "Salva a própria família e uma região inteira da fome.",
    desenvolvimento: "De adolescente sem filtro a homem que chora antes de perdoar.",
    textos: [
      t("Gênesis 37:1-11", "gn", 37, "1-11", "Os sonhos e o estrago que a forma de contar causa."),
      t("Gênesis 39:1-20", "gn", 39, "1-20", "Integridade sem ninguém vendo, e o preço dela."),
      t("Gênesis 45:1-15", "gn", 45, "1-15", "A revelação aos irmãos."),
      t("Gênesis 50:15-21", "gn", 50, "15-21", "Nomeia o mal e ainda assim perdoa."),
    ],
    aplicacoes: [
      "Onde você faz o certo só quando alguém vê?",
      "Que dano você precisa nomear antes de conseguir perdoar?",
    ],
  },

  {
    nome: "Rute",
    sinonimos: ["ruth"],
    epoca: "Tempo dos juízes",
    contexto: "Moabita, viúva, estrangeira num povo que tinha ordens explícitas de se separar de Moabe.",
    familia: "Casada com Malom. Nora de Noemi. Depois casada com Boaz, bisavó de Davi.",
    acontecimentos: [
      "Perde marido e escolhe ficar com a sogra",
      "Migra para Belém sem segurança",
      "Trabalha recolhendo restos na colheita",
      "Toma iniciativa arriscada com Boaz",
    ],
    decisoes: [
      "Recusou voltar para a própria terra e a própria religião",
      "Assumiu o sustento de alguém que não tinha obrigação de sustentar",
    ],
    virtudes: ["Lealdade que não tinha nada a ganhar", "Trabalho duro", "Coragem social"],
    erros: [],
    relacionamento:
      "A confissão dela é de adoção, não de conversão dramática: o Deus de Noemi passa a ser o dela.",
    consequencias: "Entra na genealogia de Davi e de Jesus, sendo estrangeira do povo errado.",
    desenvolvimento: "De estrangeira sem direitos a matriarca citada em Mateus 1.",
    textos: [
      t("Rute 1:14-18", "rt", 1, "14-18", "A declaração de lealdade, dita no pior momento possível."),
      t("Rute 2:1-13", "rt", 2, "1-13", "O trabalho, e a proteção que Boaz oferece."),
      t("Rute 4:13-17", "rt", 4, "13-17", "O desfecho, e a linhagem que se abre."),
    ],
    aplicacoes: [
      "Rute não tem erros listados aqui. Isso te incomoda? Por quê?",
      "Quem, no seu círculo, é o estrangeiro que ninguém inclui?",
    ],
  },

  {
    nome: "Ester",
    sinonimos: ["hadassa"],
    epoca: "Império persa, século V a.C.",
    contexto: "Judia órfã na diáspora, levada ao harém do rei e escolhida rainha escondendo a origem.",
    familia: "Criada pelo primo Mardoqueu.",
    acontecimentos: [
      "É levada ao palácio sem escolha real",
      "Esconde a identidade judaica por anos",
      "Descobre o plano de extermínio",
      "Arrisca a vida aparecendo sem ser chamada",
    ],
    decisoes: [
      "Hesitou antes de agir, e o texto registra a hesitação",
      "Escolheu se expor sabendo o risco",
      "Usou estratégia e tempo em vez de confronto direto",
    ],
    virtudes: ["Coragem calculada", "Inteligência política", "Solidariedade ao próprio povo"],
    erros: ["Ocultou a identidade enquanto foi conveniente", "Hesitou quando a vida de muitos dependia dela"],
    relacionamento:
      "O livro nunca menciona Deus. A providência aparece pelo arranjo dos acontecimentos, não por fala divina.",
    consequencias: "Impede um genocídio; a festa de Purim celebra isso até hoje.",
    desenvolvimento: "De quem esconde quem é a quem se declara sabendo o preço.",
    textos: [
      t("Ester 2:5-11", "et", 2, "5-11", "A entrada no palácio e a ordem de esconder a origem."),
      t("Ester 4:1-17", "et", 4, "1-17", "A hesitação, a pressão de Mardoqueu e a decisão."),
      t("Ester 7:1-10", "et", 7, "1-10", "A denúncia diante do rei."),
    ],
    aplicacoes: [
      "Onde você esconde quem é porque é conveniente?",
      "Que risco você evita assumir esperando que outro assuma?",
    ],
  },

  {
    nome: "Jonas",
    sinonimos: ["jonas profeta"],
    epoca: "Século VIII a.C.",
    contexto: "Profeta israelita enviado à capital do império que aterrorizava o seu povo.",
    familia: "Filho de Amitai.",
    acontecimentos: [
      "Foge na direção oposta",
      "Põe em risco a tripulação de um navio",
      "É engolido por um grande peixe",
      "Prega e vê a cidade inteira se arrepender",
      "Fica furioso com o perdão de Deus",
    ],
    decisoes: [
      "Desobedeceu explicitamente",
      "Pediu para ser lançado ao mar em vez de voltar atrás",
      "Pregou, mas torcendo para não dar certo",
    ],
    virtudes: ["Honestidade brutal sobre os próprios sentimentos", "Obediência tardia"],
    erros: ["Fuga", "Nacionalismo religioso", "Raiva da misericórdia de Deus"],
    relacionamento:
      "Fala com Deus sem filtro, inclusive para dizer que preferia morrer. Deus responde com pergunta, não com punição.",
    consequencias: "A cidade é poupada. O livro termina sem informar se Jonas mudou.",
    desenvolvimento:
      "Discutível de propósito: o texto encerra com uma pergunta em aberto, dirigida tanto a ele quanto ao leitor.",
    textos: [
      t("Jonas 1:1-16", "jn", 1, "1-16", "A fuga e o custo dela para terceiros."),
      t("Jonas 3:1-10", "jn", 3, "1-10", "A pregação mais curta e mais bem-sucedida da Bíblia."),
      t("Jonas 4:1-11", "jn", 4, "1-11", "A raiva pelo perdão, e a pergunta final sem resposta."),
    ],
    aplicacoes: [
      "Quem é a sua Nínive, aquele grupo que você não quer ver perdoado?",
      "O livro termina em pergunta. Como você responderia?",
    ],
  },

  {
    nome: "Elias",
    sinonimos: ["elias tesbita"],
    epoca: "Século IX a.C.",
    contexto: "Profeta no reino do norte, durante o reinado de Acabe e Jezabel.",
    familia: "Não informada. Sucessor: Eliseu.",
    acontecimentos: [
      "Anuncia seca e se esconde",
      "Enfrenta os profetas de Baal no Carmelo",
      "Foge de uma ameaça logo depois da vitória",
      "Encontra Deus não no vento ou no fogo, mas numa voz mansa",
    ],
    decisoes: [
      "Confrontou o poder sozinho",
      "Fugiu quando ameaçado por uma pessoa, depois de enfrentar centenas",
      "Pediu para morrer",
    ],
    virtudes: ["Coragem pública", "Oração ousada", "Honestidade no colapso"],
    erros: ["Autopiedade exagerada ao se dizer o único fiel", "Fuga desproporcional"],
    relacionamento:
      "Intimidade intensa e irregular. Depois do colapso, Deus cuida do corpo antes de falar qualquer coisa.",
    consequencias: "Reverte a idolatria oficial por um tempo e forma Eliseu como sucessor.",
    desenvolvimento: "De confronto espetacular a encontro silencioso; o texto trata o segundo como mais formativo.",
    textos: [
      t("1 Reis 18:20-40", "1rs", 18, "20-40", "O confronto no Carmelo."),
      t("1 Reis 19:1-18", "1rs", 19, "1-18", "O colapso, o cuidado com o corpo e a voz mansa."),
      t("2 Reis 2:1-14", "2rs", 2, "1-14", "A partida e a sucessão."),
    ],
    aplicacoes: [
      "Você já desabou logo depois de uma vitória?",
      "O que a primeira resposta de Deus em 1 Reis 19 diz sobre cuidado?",
    ],
  },

  {
    nome: "Pedro",
    sinonimos: ["simao pedro", "cefas"],
    epoca: "Século I",
    contexto: "Pescador da Galileia, primeiro a confessar quem Jesus é e o único a negá-lo três vezes.",
    familia: "Irmão de André. Casado; o texto menciona a sogra.",
    acontecimentos: [
      "Larga a rede ao ser chamado",
      "Confessa que Jesus é o Cristo e, em seguida, é repreendido",
      "Corta a orelha de um servo",
      "Nega Jesus três vezes",
      "É restaurado à beira do lago e prega em Pentecostes",
    ],
    decisoes: [
      "Falou antes de pensar, repetidamente",
      "Seguiu de longe na hora do risco",
      "Voltou para os outros discípulos em vez de sumir",
    ],
    virtudes: ["Coragem impulsiva", "Sinceridade", "Disposição de voltar depois de falhar"],
    erros: ["Presunção", "Negação sob pressão", "Depois, hipocrisia em Antioquia, corrigida por Paulo"],
    relacionamento:
      "Jesus o repreende com dureza e o restaura com ternura, usando três perguntas para três negações.",
    consequencias: "Torna-se líder da igreja em Jerusalém e abre a porta aos gentios.",
    desenvolvimento: "De impulsivo que promete demais a pastor que alimenta ovelhas. A queda é parte do caminho.",
    textos: [
      t("Mateus 16:13-23", "mt", 16, "13-23", "Acerta quem Jesus é e erra o que isso implica, no mesmo diálogo."),
      t("Lucas 22:54-62", "lc", 22, "54-62", "A negação, e o olhar de Jesus."),
      t("João 21:15-19", "jo", 21, "15-19", "A restauração, com três perguntas."),
      t("Gálatas 2:11-14", "gl", 2, "11-14", "Repreendido por Paulo anos depois: o crescimento não foi linear."),
    ],
    aplicacoes: [
      "Onde você promete mais do que sustenta?",
      "O que a restauração de Pedro diz sobre a sua própria queda?",
    ],
  },

  {
    nome: "Judas Iscariotes",
    sinonimos: ["judas"],
    epoca: "Século I",
    contexto: "Um dos doze, responsável pela bolsa do grupo, o que indica confiança dos demais.",
    familia: "Filho de Simão Iscariotes.",
    acontecimentos: [
      "É escolhido entre os doze e enviado a pregar e curar",
      "Critica o gasto do perfume",
      "Negocia a entrega por trinta moedas",
      "Identifica Jesus com um beijo",
      "Devolve o dinheiro e tira a própria vida",
    ],
    decisoes: [
      "Aceitou o chamado e conviveu três anos",
      "Escolheu entregar",
      "Depois, escolheu o desespero em vez de procurar os outros",
    ],
    virtudes: [
      "Foi chamado e enviado como os demais, e exerceu o mesmo ministério",
      "Recebeu confiança suficiente para administrar o dinheiro do grupo",
      "Reconheceu o próprio erro e tentou desfazer o negócio",
    ],
    erros: ["Furto contínuo, segundo João", "Traição", "Desespero sem procurar restauração"],
    relacionamento:
      "Conviveu de perto o tempo todo e ainda assim entregou. O texto não explica o motivo com clareza.",
    consequencias: "Morte por suicídio, e substituição no grupo dos doze.",
    desenvolvimento:
      "O texto não o apresenta como vilão de nascença: ele é chamado, enviado e confiado. A deterioração é gradual e mal explicada de propósito.",
    textos: [
      t("Mateus 10:1-4", "mt", 10, "1-4", "É listado entre os doze enviados com autoridade."),
      t("João 12:1-8", "jo", 12, "1-8", "A crítica ao perfume, e a nota do narrador sobre a bolsa."),
      t("Mateus 26:14-16", "mt", 26, "14-16", "A negociação."),
      t("Mateus 27:1-5", "mt", 27, "1-5", "O remorso, a devolução do dinheiro e o desfecho."),
    ],
    aplicacoes: [
      "Judas foi chamado e enviado como os outros. O que isso te faz pensar?",
      "Qual a diferença entre o remorso dele e o arrependimento de Pedro?",
    ],
  },

  {
    nome: "Paulo",
    sinonimos: ["saulo", "apostolo paulo"],
    epoca: "Século I",
    contexto: "Fariseu formado, cidadão romano, perseguidor da igreja antes de ser o seu maior missionário.",
    familia: "De Tarso, da tribo de Benjamim. Não menciona esposa.",
    acontecimentos: [
      "Aprova a morte de Estêvão",
      "É confrontado a caminho de Damasco",
      "Passa anos fora antes de ser aceito",
      "Faz viagens missionárias e escreve grande parte do Novo Testamento",
      "É preso e executado em Roma",
    ],
    decisoes: [
      "Perseguiu por convicção sincera e errada",
      "Trabalhou com as próprias mãos para não pesar às igrejas",
      "Rompeu com Barnabé por causa de Marcos",
    ],
    virtudes: ["Coragem", "Coerência", "Capacidade de admitir fraqueza publicamente"],
    erros: [
      "Violência religiosa antes da conversão",
      "Aspereza no conflito com Barnabé",
      "Linguagem dura em momentos de disputa",
    ],
    relacionamento:
      "Conversão abrupta seguida de longa formação. Fala de espinho na carne não removido apesar de pedidos.",
    consequencias:
      "O cristianismo se espalha para fora do judaísmo, e a teologia cristã ganha a sua formulação mais influente.",
    desenvolvimento:
      "De perseguidor convicto a alguém que se chama o menor dos apóstolos e se gloria na fraqueza.",
    textos: [
      t("Atos 9:1-19", "at", 9, "1-19", "O confronto e a cegueira temporária."),
      t("Atos 15:36-41", "at", 15, "36-41", "O conflito com Barnabé, contado sem suavizar."),
      t("2 Coríntios 12:7-10", "2co", 12, "7-10", "O espinho que não foi removido."),
      t("2 Timóteo 4:6-18", "2tm", 4, "6-18", "As últimas palavras, com mágoas e pedidos pessoais."),
    ],
    aplicacoes: [
      "Onde a sua convicção sincera pode estar errada?",
      "O que você faria com um espinho que não sai?",
    ],
  },

  {
    nome: "Maria",
    sinonimos: ["maria mae de jesus"],
    epoca: "Século I",
    contexto: "Jovem de Nazaré, noiva de José, escolhida para ser mãe de Jesus numa cultura que puniria o que parecia ter acontecido.",
    familia: "Casada com José. Parente de Isabel. Outros filhos, incluindo Tiago.",
    acontecimentos: [
      "Recebe o anúncio e questiona antes de aceitar",
      "Canta um cântico sobre inversão social",
      "Foge para o Egito",
      "Procura Jesus achando que ele enlouqueceu",
      "Acompanha a crucificação",
    ],
    decisoes: [
      "Aceitou sabendo o custo social",
      "Guardou coisas sem entender",
      "Em Caná, insistiu mesmo depois de uma resposta seca",
    ],
    virtudes: ["Coragem silenciosa", "Fé que convive com dúvida", "Permanência até o fim"],
    erros: ["Em certo momento tenta interromper o ministério do filho, junto com os irmãos"],
    relacionamento:
      "Responde com disposição e com perguntas. O cântico dela é um dos textos mais políticos do Novo Testamento.",
    consequencias: "Está presente do nascimento à cruz e depois no grupo que ora em Atos 1.",
    desenvolvimento: "De jovem que pergunta 'como será isso' a mulher que permanece quando quase todos fogem.",
    textos: [
      t("Lucas 1:26-38", "lc", 1, "26-38", "O anúncio, a pergunta e o consentimento."),
      t("Lucas 1:46-55", "lc", 1, "46-55", "O cântico, e a inversão social que ele anuncia."),
      t("Marcos 3:20-21", "mc", 3, "20-21", "A família tenta levá-lo embora achando que perdeu o juízo."),
      t("João 19:25-27", "jo", 19, "25-27", "Ao pé da cruz."),
    ],
    aplicacoes: [
      "O que você guardaria sem entender?",
      "O cântico de Maria soa político demais para a sua igreja? Por quê?",
    ],
  },

  {
    nome: "Tomé",
    sinonimos: ["tome", "didimo"],
    epoca: "Século I",
    contexto: "Um dos doze, lembrado por uma dúvida que ele expressou em voz alta e os outros não.",
    familia: "Não informada. Chamado Dídimo, o gêmeo.",
    acontecimentos: [
      "Propõe irem morrer com Jesus na Judeia",
      "Admite não saber o caminho",
      "Recusa acreditar sem ver",
      "Faz a confissão mais alta dos evangelhos",
    ],
    decisoes: [
      "Falou a dúvida em vez de fingir",
      "Continuou com o grupo durante a semana de incerteza",
    ],
    virtudes: ["Coragem de ir junto para morrer", "Honestidade intelectual", "Confissão sem meio-termo"],
    erros: ["Exigiu prova em termos próprios", "Não creu no testemunho dos amigos"],
    relacionamento:
      "Jesus não o repreende com dureza: oferece exatamente a prova pedida e depois amplia a bênção a quem crerá sem ver.",
    consequencias: "Fica marcado pela dúvida, embora o texto registre também a maior confissão.",
    desenvolvimento: "De quem exige evidência a quem declara 'Senhor meu e Deus meu'.",
    textos: [
      t("João 11:14-16", "jo", 11, "14-16", "Propõe irem morrer junto: coragem antes da dúvida famosa."),
      t("João 14:1-7", "jo", 14, "1-7", "Admite não saber o caminho, e a pergunta abre uma das maiores respostas."),
      t("João 20:24-29", "jo", 20, "24-29", "A dúvida, a prova oferecida e a confissão."),
    ],
    aplicacoes: [
      "A sua comunidade tem espaço para dúvida dita em voz alta?",
      "Que prova você tem exigido para confiar?",
    ],
  },
];

/** Pares que rendem comparação, com o eixo que os une. */
export const COMPARACOES_SUGERIDAS: { a: string; b: string; eixo: string }[] = [
  { a: "Pedro", b: "Judas Iscariotes", eixo: "Dois que falharam com Jesus, e dois destinos diferentes" },
  { a: "Saul", b: "Davi", eixo: "Dois reis confrontados, duas respostas ao confronto" },
  { a: "Jonas", b: "Paulo", eixo: "Dois enviados a quem eles não queriam alcançar" },
  { a: "Moisés", b: "Elias", eixo: "Dois líderes que pediram para morrer" },
  { a: "Rute", b: "Ester", eixo: "Duas estrangeiras que mudaram a história de um povo" },
  { a: "Abraão", b: "José", eixo: "Dois que esperaram anos por uma promessa" },
];
