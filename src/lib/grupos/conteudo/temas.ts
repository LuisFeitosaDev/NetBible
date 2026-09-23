import type { TextoApoio, Visao } from "./tipos";

/**
 * Temas curados.
 *
 * Cada texto carrega o seu contexto obrigatoriamente. A regra que guia esta
 * lista é a da própria especificação: não usar versículo fora de contexto. Por
 * isso alguns temas começam admitindo que a Bíblia não trata do assunto
 * diretamente, em vez de forçar um texto a dizer o que ele não diz.
 */
export type Tema = {
  nome: string;
  sinonimos: string[];
  resumo: string;
  categorias: { titulo: string; textos: TextoApoio[] }[];
  perguntas: string[];
  aplicacoes: string[];
  visoes?: Visao[];
  notas?: string[];
};

const t = (
  ref: string,
  slug: string,
  capitulo: number,
  versiculos: string,
  contexto: string,
): TextoApoio => ({ ref, slug, capitulo, versiculos, contexto });

export const TEMAS: Tema[] = [
  {
    nome: "Ansiedade",
    sinonimos: ["preocupação", "medo", "angústia", "estresse", "pânico", "aflição"],
    resumo:
      "A Bíblia não trata ansiedade como falta de fé nem manda simplesmente parar de sentir. Ela mostra pessoas ansiosas sendo cuidadas, e dá o que fazer com o que se sente.",
    categorias: [
      {
        titulo: "O que Jesus disse sobre preocupação",
        textos: [
          t("Mateus 6:25-34", "mt", 6, "25-34", "Parte do Sermão do Monte. O contraste não é entre preocupar-se e relaxar, mas entre o que se busca primeiro."),
          t("Lucas 12:22-31", "lc", 12, "22-31", "Dito logo depois da parábola do rico insensato, o que amarra ansiedade a acúmulo."),
        ],
      },
      {
        titulo: "O que fazer com ela",
        textos: [
          t("Filipenses 4:6-7", "fp", 4, "6-7", "Escrito por Paulo preso, a uma igreja que o sustentava. Não é conselho de quem está confortável."),
          t("1 Pedro 5:6-7", "1pe", 5, "6-7", "Carta a cristãos perseguidos. 'Lançar sobre ele' é linguagem de quem entrega peso, não de quem finge que não há peso."),
        ],
      },
      {
        titulo: "Quando o corpo também sente",
        textos: [
          t("1 Reis 19:1-9", "1rs", 19, "1-9", "Elias entra em colapso logo depois da maior vitória. A primeira resposta de Deus é comida e sono, não repreensão."),
          t("Salmos 42", "sl", 42, "", "Um lamento inteiro. O salmista fala com a própria alma e não recebe solução imediata."),
        ],
      },
    ],
    perguntas: [
      "Em Mateus 6, o que Jesus manda buscar no lugar da preocupação?",
      "Filipenses 4 promete que a situação melhora, ou promete outra coisa?",
      "O que a reação de Deus a Elias diz sobre corpo, cansaço e fé?",
      "Qual a diferença entre 'não se preocupe' e o que esses textos dizem de fato?",
    ],
    aplicacoes: [
      "Escreva a preocupação que mais volta e o que você faria com ela nesta semana.",
      "Combine com alguém do grupo um contato no dia da semana em que a ansiedade costuma bater.",
    ],
    notas: [
      "Ansiedade também é questão de saúde. Estes textos não substituem acompanhamento médico ou psicológico, e a própria Bíblia trata corpo e alma juntos.",
    ],
  },

  {
    nome: "Identidade",
    sinonimos: ["autoestima", "quem eu sou", "valor", "aceitação"],
    resumo:
      "A pergunta 'quem eu sou' aparece na Bíblia respondida de fora para dentro: pelo que Deus diz e faz, não pelo desempenho.",
    categorias: [
      {
        titulo: "O que Deus declara",
        textos: [
          t("Efésios 1:3-14", "ef", 1, "3-14", "Uma frase só no grego original, listando o que já é verdade sobre quem está em Cristo, antes de qualquer exigência."),
          t("1 João 3:1", "1jo", 3, "1", "Escrito a uma igreja que tinha acabado de rachar, para quem ficou e estava inseguro."),
        ],
      },
      {
        titulo: "O que Deus vê",
        textos: [
          t("1 Samuel 16:7", "1sm", 16, "7", "Dito na escolha de Davi, o filho que nem foi chamado para a fila. O contexto é alguém sendo subestimado pela própria família."),
          t("Salmos 139:13-16", "sl", 139, "13-16", "Parte de um salmo sobre ser inteiramente conhecido, inclusive no que não é bonito."),
        ],
      },
      {
        titulo: "O que muda na prática",
        textos: [
          t("Gálatas 2:20", "gl", 2, "20", "Argumento de Paulo contra quem exigia desempenho religioso para pertencer."),
          t("2 Coríntios 5:17", "2co", 5, "17", "Vem no meio de Paulo defendendo um ministério cheio de fracassos aparentes."),
        ],
      },
    ],
    perguntas: [
      "Em Efésios 1, quantas dessas afirmações dependem do que você faz?",
      "Onde você tem buscado resposta para 'quem eu sou'?",
      "Qual a diferença entre ser aceito e ser aprovado?",
    ],
    aplicacoes: [
      "Escolha uma frase de Efésios 1 e deixe onde você vai ver todo dia esta semana.",
      "Identifique um lugar onde você tenta provar o seu valor e o que mudaria se não precisasse.",
    ],
  },

  {
    nome: "Namoro",
    sinonimos: ["relacionamento", "paquera", "noivado", "casamento", "amor"],
    resumo:
      "A Bíblia não descreve namoro: é uma prática moderna. O que ela dá são princípios sobre amor, escolha, corpo e compromisso, que precisam ser aplicados com honestidade sobre essa distância.",
    categorias: [
      {
        titulo: "O que é amor, afinal",
        textos: [
          t("1 Coríntios 13:4-7", "1co", 13, "4-7", "Não foi escrito para casamento: é correção a uma igreja dividida e competitiva. Por isso descreve conduta, não sentimento."),
          t("Cânticos 8:6-7", "ct", 8, "6-7", "Poesia amorosa, sem moralismo. Aqui o desejo entre duas pessoas é tratado como coisa boa e séria."),
        ],
      },
      {
        titulo: "Sobre escolher",
        textos: [
          t("Provérbios 31:30", "pv", 31, "30", "Fecha um poema acróstico sobre uma mulher admirável. É elogio, não checklist de noiva."),
          t("2 Coríntios 6:14", "2co", 6, "14", "Paulo fala de sociedade e culto pagão, não de namoro. Aplicar a relacionamento é extensão razoável, mas é extensão."),
        ],
      },
      {
        titulo: "Sobre o corpo",
        textos: [
          t("1 Tessalonicenses 4:3-8", "1ts", 4, "3-8", "Instrução a cristãos novos numa cidade greco-romana, onde o padrão ao redor era outro."),
          t("1 Coríntios 6:18-20", "1co", 6, "18-20", "Responde a um slogan que circulava em Corinto: 'tudo me é lícito'."),
        ],
      },
    ],
    perguntas: [
      "1 Coríntios 13 foi escrito para casais. Muda algo saber que não foi?",
      "Onde está a fronteira entre o que o texto diz e o que a nossa cultura de igreja acrescentou?",
      "O que desses princípios você aplicaria também a uma amizade?",
    ],
    aplicacoes: [
      "Escreva o que você espera de um relacionamento e marque o que vem da Bíblia e o que vem de outro lugar.",
      "Escolha uma linha de 1 Coríntios 13 para praticar esta semana em qualquer relação.",
    ],
    notas: [
      "Igrejas divergem bastante sobre regras práticas de namoro. Os textos acima sustentam princípios; as regras específicas costumam ser aplicação cultural, e vale dizer isso ao grupo.",
    ],
  },

  {
    nome: "Amizade",
    sinonimos: ["amigos", "companheirismo", "comunidade"],
    resumo:
      "Amizade na Bíblia é aliança, não afinidade: aparece em compromisso, correção e lealdade que custa.",
    categorias: [
      {
        titulo: "O que sustenta",
        textos: [
          t("Provérbios 17:17", "pv", 17, "17", "Provérbio, ou seja, sabedoria geral e não promessa. Descreve tendência, não garantia."),
          t("Eclesiastes 4:9-12", "ec", 4, "9-12", "Vem num livro que passa a maior parte do tempo mostrando o vazio das coisas. Aqui, companhia é das poucas coisas que ele aprova."),
        ],
      },
      {
        titulo: "Amizade que corrige",
        textos: [
          t("Provérbios 27:5-6", "pv", 27, "5-6", "Contrapõe ferida de amigo a beijo de inimigo: a correção é sinal de amizade, não o contrário."),
          t("Provérbios 27:17", "pv", 27, "17", "A imagem do ferro afiando ferro pressupõe atrito, não conforto."),
        ],
      },
      {
        titulo: "Modelos",
        textos: [
          t("1 Samuel 18:1-4", "1sm", 18, "1-4", "Jônatas entrega manto e armas a Davi, abrindo mão do próprio direito ao trono. Amizade aqui custa poder."),
          t("João 15:13-15", "jo", 15, "13-15", "Jesus reclassifica os discípulos de servos para amigos, às vésperas da prisão."),
        ],
      },
    ],
    perguntas: [
      "Quem na sua vida tem permissão para te corrigir?",
      "O que Jônatas perdeu ao ser amigo de Davi?",
      "Amizade de verdade exige afinidade, ou outra coisa?",
    ],
    aplicacoes: [
      "Procure alguém de quem você se afastou sem motivo claro.",
      "Dê a uma pessoa a permissão explícita de te dizer o que você não quer ouvir.",
    ],
  },

  {
    nome: "Propósito",
    sinonimos: ["vocação", "chamado", "sentido da vida", "carreira", "missão"],
    resumo:
      "A Bíblia fala menos de descobrir um plano secreto e mais de viver bem o que já está revelado.",
    categorias: [
      {
        titulo: "O que já está dito",
        textos: [
          t("Miqueias 6:8", "mq", 6, "8", "Resposta profética a quem perguntava que sacrifício agradaria a Deus. A resposta é conduta, não ritual."),
          t("Efésios 2:10", "ef", 2, "10", "Vem logo depois de Paulo negar que salvação venha de obras: as obras são consequência, não preço."),
        ],
      },
      {
        titulo: "No trabalho comum",
        textos: [
          t("Colossenses 3:23-24", "cl", 3, "23-24", "Dirigido originalmente a escravos domésticos, o que torna a afirmação mais radical, não menos."),
          t("Eclesiastes 12:13", "ec", 12, "13", "Conclusão de um livro inteiro que testou prazer, saber e trabalho e achou tudo vapor."),
        ],
      },
      {
        titulo: "Como decidir",
        textos: [
          t("Romanos 12:1-2", "rm", 12, "1-2", "A transformação da mente é o meio de discernir, e é coletiva: o 'vós' aqui é plural."),
        ],
      },
    ],
    perguntas: [
      "Miqueias 6:8 responde 'o que Deus quer de mim'. Por que ainda procuramos outra resposta?",
      "O que muda em Colossenses 3 quando você lembra para quem foi escrito?",
      "Propósito é um lugar a achar, ou um jeito de andar?",
    ],
    aplicacoes: [
      "Escolha uma tarefa chata desta semana e faça como Colossenses 3 descreve.",
      "Liste três decisões que você adiou esperando um sinal.",
    ],
  },

  {
    nome: "Santidade",
    sinonimos: ["pureza", "consagração", "santificação", "viver bem"],
    resumo:
      "Santidade na Bíblia é separação para algo, não apenas afastamento de algo. Começa no que Deus é e desce para a conduta, incluindo a social.",
    categorias: [
      {
        titulo: "A raiz",
        textos: [
          t("Levítico 19:2", "lv", 19, "2", "Abre um capítulo em que santidade inclui pagar salário no prazo e não explorar estrangeiro."),
          t("1 Pedro 1:14-16", "1pe", 1, "14-16", "Pedro cita justamente Levítico 19, aplicando a cristãos dispersos e perseguidos."),
        ],
      },
      {
        titulo: "Na prática",
        textos: [
          t("1 Tessalonicenses 4:3-7", "1ts", 4, "3-7", "Instrução concreta a convertidos recentes, sobre corpo e sobre não passar por cima do outro."),
          t("Hebreus 12:14", "hb", 12, "14", "Aparece junto com 'segui a paz com todos', ligando santidade a relação, não a isolamento."),
        ],
      },
    ],
    perguntas: [
      "Levítico 19 mistura culto e salário. O que isso diz sobre santidade?",
      "Onde a nossa ideia de santidade é mais estreita do que a do texto?",
      "Santidade é o que eu evito ou o que eu sou separado para fazer?",
    ],
    aplicacoes: [
      "Escolha uma área concreta onde a sua conduta muda conforme quem está olhando.",
      "Identifique uma prática de justiça social que Levítico 19 chamaria de santidade.",
    ],
  },

  {
    nome: "Oração",
    sinonimos: ["orar", "conversar com Deus", "intercessão"],
    resumo:
      "A Bíblia ensina oração mais mostrando gente orando do que definindo o que é. E boa parte dessas orações é reclamação.",
    categorias: [
      {
        titulo: "Como Jesus ensinou",
        textos: [
          t("Mateus 6:5-13", "mt", 6, "5-13", "O contraste é com oração feita para ser vista. O modelo é curto justamente por isso."),
          t("Lucas 11:1-13", "lc", 11, "1-13", "Os discípulos pedem para aprender depois de ver Jesus orando, não depois de um sermão sobre oração."),
        ],
      },
      {
        titulo: "Quando não sai",
        textos: [
          t("Romanos 8:26-27", "rm", 8, "26-27", "Vem no meio de um capítulo sobre sofrimento presente, não sobre técnica de oração."),
          t("Salmos 13", "sl", 13, "", "Começa com 'até quando' repetido quatro vezes e termina em confiança, sem que nada tenha mudado."),
        ],
      },
      {
        titulo: "Junto com outros",
        textos: [
          t("Tiago 5:13-18", "tg", 5, "13-18", "Liga oração a confissão mútua e à comunidade, não a esforço individual."),
        ],
      },
    ],
    perguntas: [
      "O Pai Nosso é curto. O que isso diz sobre o que Jesus criticava?",
      "O Salmo 13 seria aceito como oração no seu grupo?",
      "O que Romanos 8 promete para quem não sabe o que dizer?",
    ],
    aplicacoes: [
      "Ore um salmo de lamento em voz alta, sem suavizar as palavras.",
      "Conte a alguém do grupo algo pelo qual você quer oração.",
    ],
  },

  {
    nome: "Dinheiro",
    sinonimos: ["finanças", "riqueza", "posses", "consumo", "dívida", "generosidade"],
    resumo:
      "É um dos assuntos mais frequentes da Bíblia, e quase sempre tratado como questão de coração e de justiça, não de técnica.",
    categorias: [
      {
        titulo: "Onde está o coração",
        textos: [
          t("Mateus 6:19-24", "mt", 6, "19-24", "No Sermão do Monte, entre ensino sobre oração e sobre ansiedade. Os três assuntos vêm juntos de propósito."),
          t("Lucas 12:13-21", "lc", 12, "13-21", "Contada em resposta a uma briga por herança. O homem da parábola não fez nada ilegal."),
        ],
      },
      {
        titulo: "O alerta",
        textos: [
          t("1 Timóteo 6:6-10", "1tm", 6, "6-10", "Frequentemente citado errado: o texto diz amor ao dinheiro, não dinheiro, e fala a líderes."),
          t("1 Timóteo 6:17-19", "1tm", 6, "17-19", "Logo depois, Paulo orienta os ricos sem mandar deixarem de ser ricos."),
        ],
      },
      {
        titulo: "Generosidade",
        textos: [
          t("2 Coríntios 9:6-8", "2co", 9, "6-8", "Parte de uma coleta concreta para cristãos pobres em Jerusalém, com prestação de contas."),
          t("Provérbios 22:7", "pv", 22, "7", "Observação sobre dívida como forma de servidão, em literatura de sabedoria prática."),
        ],
      },
    ],
    perguntas: [
      "O rico da parábola de Lucas 12 fez algo ilegal? Então qual foi o problema?",
      "Qual a diferença entre o que 1 Timóteo 6:10 diz e como ele é citado por aí?",
      "Seu extrato bancário contaria que história sobre o seu coração?",
    ],
    aplicacoes: [
      "Olhe os últimos trinta dias de gastos e identifique um padrão que te surpreende.",
      "Escolha um ato de generosidade concreto e com destinatário nesta semana.",
    ],
    visoes: [
      {
        nome: "Dízimo como obrigação",
        resumo: "Entende o décimo como padrão permanente, herdado da lei e reafirmado na prática cristã.",
        textos: ["Malaquias 3:10", "Mateus 23:23"],
      },
      {
        nome: "Generosidade proporcional",
        resumo:
          "Entende que o Novo Testamento substitui o percentual fixo por doação voluntária e proporcional.",
        textos: ["2 Coríntios 9:7", "1 Coríntios 16:2"],
      },
    ],
  },

  {
    nome: "Redes sociais",
    sinonimos: ["internet", "celular", "tecnologia", "exposição", "comparação", "vaidade"],
    resumo:
      "A Bíblia não conhece redes sociais. O que ela trata com profundidade é aquilo que as redes amplificam: palavra, aparência, comparação e busca por aprovação.",
    categorias: [
      {
        titulo: "O peso do que se fala",
        textos: [
          t("Tiago 3:1-12", "tg", 3, "1-12", "Escrito a uma comunidade espalhada, sobre dano feito por palavra. A imagem da fagulha cabe bem no que se publica."),
          t("Efésios 4:29", "ef", 4, "29", "Critério positivo, não só proibição: a fala deve servir a quem ouve."),
        ],
      },
      {
        titulo: "Fazer para ser visto",
        textos: [
          t("Mateus 6:1-4", "mt", 6, "1-4", "Jesus não condena a prática, condena a plateia. O problema é o motivo."),
          t("Gálatas 1:10", "gl", 1, "10", "Paulo se defende de acusação de agradar pessoas, e coloca isso como incompatível com o serviço a Cristo."),
        ],
      },
      {
        titulo: "Ser conhecido de verdade",
        textos: [
          t("Salmos 139:1-6", "sl", 139, "1-6", "Contrapõe ser inteiramente conhecido a ser apenas visto. É o oposto do perfil editado."),
        ],
      },
    ],
    perguntas: [
      "Tiago 3 fala de língua. O que muda quando a palavra fica gravada e alcança milhares?",
      "Mateus 6 condena a esmola ou a plateia?",
      "O que você publica que não publicaria se ninguém pudesse curtir?",
    ],
    aplicacoes: [
      "Passe um dia sem publicar nada e anote o que sentiu falta.",
      "Revise a última semana de postagens à luz de Efésios 4:29.",
    ],
    notas: [
      "Aqui o método é diferente: não existe texto sobre o assunto, então o estudo aplica princípios. Diga isso ao grupo, em vez de fingir que a Bíblia trata do tema.",
    ],
  },

  {
    nome: "Sexualidade",
    sinonimos: ["sexo", "pureza sexual", "desejo", "pornografia", "corpo"],
    resumo:
      "A Bíblia trata desejo como coisa criada e boa, e trata o corpo como lugar de compromisso. É também um dos assuntos em que as igrejas mais divergem na aplicação.",
    categorias: [
      {
        titulo: "Na criação",
        textos: [
          t("Gênesis 1:27-28", "gn", 1, "27-28", "Corpo e diferença aparecem antes de qualquer queda, e são chamados de bons."),
          t("Gênesis 2:24", "gn", 2, "24", "A união é descrita como formação de novo vínculo, com saída da casa anterior."),
        ],
      },
      {
        titulo: "Desejo sem culpa",
        textos: [
          t("Cânticos 4:9-16", "ct", 4, "9-16", "Poesia explicitamente erótica dentro do cânon, sem moralização ao redor."),
        ],
      },
      {
        titulo: "Limite e cuidado",
        textos: [
          t("1 Coríntios 6:12-20", "1co", 6, "12-20", "Responde a um slogan corintiano sobre liberdade absoluta, num porto com prostituição cultual."),
          t("Mateus 5:27-30", "mt", 5, "27-30", "Jesus move a questão do ato para o olhar, aumentando a exigência em vez de relaxá-la."),
        ],
      },
    ],
    perguntas: [
      "Cânticos está na Bíblia sem nenhuma moral anexada. O que isso sugere?",
      "1 Coríntios 6 responde a um slogan. Que slogans parecidos circulam hoje?",
      "Onde o seu grupo confunde vergonha com santidade?",
    ],
    aplicacoes: [
      "Nomeie, para você mesmo, um hábito que você esconde e o primeiro passo para tratá-lo.",
      "Combine com alguém de confiança uma conversa honesta e sem julgamento.",
    ],
    notas: [
      "Tema pastoralmente sensível: é provável que haja no grupo quem carregue abuso, vergonha ou vício. Conduza sem expor ninguém e não peça confissão pública.",
      "Igrejas cristãs divergem em pontos importantes de aplicação. Apresente o texto e as leituras, sem transformar o encontro em julgamento de pessoas.",
    ],
  },

  {
    nome: "Perdão",
    sinonimos: ["mágoa", "rancor", "reconciliação", "ressentimento"],
    resumo:
      "Perdão na Bíblia é decisão e processo, e está ligado ao perdão recebido. Não é o mesmo que restaurar confiança nem que aceitar dano continuado.",
    categorias: [
      {
        titulo: "Sem limite de conta",
        textos: [
          t("Mateus 18:21-35", "mt", 18, "21-35", "Resposta a Pedro perguntando quantas vezes. A parábola compara dívidas de tamanhos absurdamente diferentes."),
          t("Colossenses 3:13", "cl", 3, "13", "O critério não é o merecimento do outro, é o perdão já recebido."),
        ],
      },
      {
        titulo: "Quando custa caro",
        textos: [
          t("Gênesis 50:15-21", "gn", 50, "15-21", "José perdoa quem o vendeu como escravo, anos depois e com poder para se vingar."),
          t("Lucas 23:34", "lc", 23, "34", "Dito durante a execução, sobre quem estava executando."),
        ],
      },
      {
        titulo: "O que fazer com a raiva",
        textos: [
          t("Efésios 4:26-32", "ef", 4, "26-32", "Não proíbe a ira; regula o que se faz com ela e em quanto tempo."),
        ],
      },
    ],
    perguntas: [
      "Na parábola de Mateus 18, por que o tamanho das dívidas importa?",
      "José perdoa, mas leva anos e chora. O que isso diz sobre processo?",
      "Perdoar é obrigatoriamente voltar a confiar?",
    ],
    aplicacoes: [
      "Escreva o nome de quem você precisa perdoar e o primeiro passo possível, mesmo que pequeno.",
      "Se você é quem feriu, escolha um pedido de desculpa concreto e sem justificativa anexa.",
    ],
    notas: [
      "Perdoar não é aceitar abuso nem dispensar consequência. Em situação de violência, o cuidado pastoral é proteger primeiro. Não use estes textos para pressionar alguém a voltar para onde corre risco.",
    ],
  },

  {
    nome: "Sofrimento",
    sinonimos: ["dor", "luto", "doença", "perda", "provação", "tristeza"],
    resumo:
      "A Bíblia dedica livros inteiros ao sofrimento sem resolvê-lo, e recusa as explicações fáceis que costumam aparecer primeiro.",
    categorias: [
      {
        titulo: "Sem explicação",
        textos: [
          t("Jó 38:1-7", "job", 38, "1-7", "Quando Deus finalmente responde, não explica. Faz perguntas. E ainda assim Jó se dá por satisfeito."),
          t("Salmos 13", "sl", 13, "", "Lamento que reclama da demora de Deus sem ser repreendido por isso."),
        ],
      },
      {
        titulo: "Deus dentro da dor",
        textos: [
          t("João 11:33-35", "jo", 11, "33-35", "Jesus chora diante de um túmulo que ele mesmo vai abrir em minutos."),
          t("2 Coríntios 1:3-7", "2co", 1, "3-7", "Paulo fala de consolo recebido para ser repassado, a partir de sofrimento real dele."),
        ],
      },
      {
        titulo: "Esperança sem atalho",
        textos: [
          t("Romanos 8:18-28", "rm", 8, "18-28", "O verso 28 vem depois de gemido da criação inteira. Lido sozinho, vira frase de consolo barato."),
          t("1 Pedro 4:12-19", "1pe", 4, "12-19", "Trata de sofrimento por causa da fé, especificamente, e não de toda dor."),
        ],
      },
    ],
    perguntas: [
      "Os amigos de Jó falam muito e erram. O que eles fizeram de certo nos primeiros sete dias?",
      "Romanos 8:28 soa diferente lido depois do verso 18?",
      "O que você diria a alguém em luto, depois deste estudo?",
    ],
    aplicacoes: [
      "Procure alguém em sofrimento e ofereça presença, sem explicação.",
      "Escreva o seu próprio salmo de lamento, sem suavizar o final.",
    ],
    visoes: [
      {
        nome: "Sofrimento como algo que a fé remove",
        resumo:
          "Leituras de prosperidade entendem que fé suficiente afasta doença e escassez.",
        textos: ["Isaías 53:5", "3 João 1:2"],
      },
      {
        nome: "Sofrimento como parte do caminho",
        resumo:
          "Leitura majoritária histórica: o sofrimento não é sinal de falta de fé, e acompanha inclusive os mais fiéis.",
        textos: ["João 16:33", "Filipenses 1:29", "2 Coríntios 12:7-9"],
      },
    ],
  },

  {
    nome: "Espírito Santo",
    sinonimos: ["espirito santo", "consolador", "terceira pessoa"],
    resumo:
      "O Espírito aparece na Bíblia como pessoa que ensina, convence e capacita, e não como força impessoal ou experiência emocional isolada.",
    categorias: [
      {
        titulo: "Quem ele é",
        textos: [
          t("João 14:15-27", "jo", 14, "15-27", "Dito na última noite, para discípulos apavorados com a partida de Jesus. O Espírito é apresentado como substituição da presença física."),
          t("Romanos 8:9-17", "rm", 8, "9-17", "Liga a presença do Espírito a pertencimento e adoção, não a experiência extraordinária."),
        ],
      },
      {
        titulo: "O que ele produz",
        textos: [
          t("Gálatas 5:16-25", "gl", 5, "16-25", "A lista do fruto vem contrastada com outra lista, e é apresentada no singular: um fruto, várias faces."),
        ],
      },
      {
        titulo: "O que aconteceu em Pentecostes",
        textos: [
          t("Atos 2:1-21", "at", 2, "1-21", "Pedro interpreta o evento citando Joel, e o foco do discurso é Jesus, não a manifestação."),
        ],
      },
    ],
    perguntas: [
      "Em João 14, qual o papel que Jesus atribui ao Espírito?",
      "Gálatas 5 fala de fruto no singular. O que isso muda?",
      "Em Atos 2, sobre quem Pedro prega depois do fenômeno?",
    ],
    aplicacoes: [
      "Escolha uma face do fruto do Espírito que está visivelmente faltando em você.",
      "Peça ao grupo que aponte, com carinho, onde eles veem esse fruto crescendo em você.",
    ],
    visoes: [
      {
        nome: "Continuísmo",
        resumo:
          "Entende que todas as manifestações do Espírito descritas no Novo Testamento continuam disponíveis hoje.",
        textos: ["1 Coríntios 12:7-11", "Atos 2:17-18"],
      },
      {
        nome: "Cessacionismo",
        resumo:
          "Entende que os dons de sinal cumpriram papel de confirmação na era apostólica e cessaram com ela.",
        textos: ["1 Coríntios 13:8-10", "Hebreus 2:3-4"],
      },
    ],
  },

  {
    nome: "Dons espirituais",
    sinonimos: ["dons", "ministério", "talentos", "carismas"],
    resumo:
      "O Novo Testamento trata dons como ferramentas para servir a comunidade, e corrige logo quem os transforma em medida de status.",
    categorias: [
      {
        titulo: "Para que servem",
        textos: [
          t("1 Coríntios 12:4-27", "1co", 12, "4-27", "Escrito a uma igreja que usava dons para se hierarquizar. Por isso a imagem é corpo, com partes que não escolhem umas às outras."),
          t("1 Pedro 4:10-11", "1pe", 4, "10-11", "Chama o cristão de administrador, não dono, do que recebeu."),
        ],
      },
      {
        titulo: "O critério",
        textos: [
          t("1 Coríntios 14:1-12", "1co", 14, "1-12", "O critério que Paulo aplica é edificação de quem ouve, e não intensidade da experiência."),
          t("Efésios 4:11-16", "ef", 4, "11-16", "Funções existem para equipar a igreja toda, não para concentrar serviço em poucos."),
        ],
      },
    ],
    perguntas: [
      "Por que Paulo escolhe a imagem de corpo para falar de dons?",
      "Qual critério ele usa em 1 Coríntios 14 para avaliar o uso público de um dom?",
      "Onde a sua igreja mede valor pessoal pelo dom exercido?",
    ],
    aplicacoes: [
      "Identifique um dom que você exerce e pergunte a alguém se ele edifica de fato.",
      "Descubra e valorize um dom pouco visível de outra pessoa do grupo.",
    ],
    visoes: [
      {
        nome: "Continuísmo",
        resumo: "Todos os dons listados permanecem em operação e devem ser buscados e ordenados.",
        textos: ["1 Coríntios 14:1", "1 Coríntios 12:31"],
      },
      {
        nome: "Cessacionismo",
        resumo:
          "Dons revelatórios e de sinal cessaram; permanecem os dons de serviço, ensino e liderança.",
        textos: ["1 Coríntios 13:8-10", "Efésios 2:20"],
      },
    ],
  },

  {
    nome: "Trombetas do Apocalipse",
    sinonimos: [
      "trombetas",
      "sete trombetas",
      "apocalipse 8",
      "apocalipse 9",
      "as trombetas",
      "trombetas do fim",
    ],
    resumo:
      "As sete trombetas de Apocalipse 8 a 11. Um bloco com estrutura clara, eco deliberado das pragas do Egito, e um dos trechos em que as escolas de interpretação mais divergem.",
    categorias: [
      {
        titulo: "De onde elas saem",
        textos: [
          t("Apocalipse 8:1-6", "ap", 8, "1-6", "Antes de qualquer trombeta vem silêncio no céu e as orações dos santos subindo com o incenso. É desse altar que o fogo é lançado à terra: a sequência começa em oração, não em catástrofe."),
          t("Apocalipse 8:13", "ap", 8, "13", "Um anúncio no meio do bloco separa as quatro primeiras trombetas das três últimas, chamadas de 'ais'. A própria estrutura do texto é 4 + 3."),
        ],
      },
      {
        titulo: "As quatro primeiras: a criação atingida",
        textos: [
          t("Apocalipse 8:7-12", "ap", 8, "7-12", "Terra, mar, rios e luzeiros, um terço de cada. O padrão de 'um terço' é limite declarado: é juízo parcial, ainda com espaço para arrependimento."),
          t("Êxodo 9:22-26", "ex", 9, "22-26", "A praga de granizo e fogo no Egito. João escreve para leitores que conheciam Êxodo de cor, e a semelhança é proposital: é linguagem de libertação, não só de destruição."),
        ],
      },
      {
        titulo: "Os dois primeiros ais",
        textos: [
          t("Apocalipse 9:1-12", "ap", 9, "1-12", "Quinta trombeta: gafanhotos que não comem vegetação, e recebem ordem de não matar. O rei deles é nomeado em hebraico e grego, o que sugere alcance sobre os dois mundos."),
          t("Joel 2:1-11", "jl", 2, "1-11", "Joel já tinha unido trombeta, gafanhotos e Dia do Senhor. Apocalipse não inventa a imagem, ele a retoma."),
          t("Apocalipse 9:13-21", "ap", 9, "13-21", "Sexta trombeta, junto ao Eufrates, fronteira do império. O verso 20 é o ponto: apesar de tudo, os sobreviventes não se arrependem."),
        ],
      },
      {
        titulo: "O intervalo antes da sétima",
        textos: [
          t("Apocalipse 10:1-11", "ap", 10, "1-11", "João engole um livrinho doce na boca e amargo no estômago, como Ezequiel. A pausa interrompe a contagem de propósito."),
          t("Apocalipse 11:1-14", "ap", 11, "1-14", "As duas testemunhas, com sinais de Moisés e Elias. Morrem, ficam expostas e são levantadas: é o padrão do próprio evangelho, aplicado à igreja."),
        ],
      },
      {
        titulo: "A sétima: o desfecho antecipado",
        textos: [
          t("Apocalipse 11:15-19", "ap", 11, "15-19", "A sétima trombeta não traz praga: traz a declaração de que o reino do mundo passou a ser do Senhor. O clímax do bloco é louvor, não desastre."),
        ],
      },
    ],
    perguntas: [
      "O que muda ao ver que a sequência começa nas orações dos santos, em 8:3-5?",
      "Por que 'um terço' se repete tanto? O que esse limite comunica?",
      "Quantos ecos do Êxodo você reconhece nas quatro primeiras trombetas?",
      "Apocalipse 9:20-21 diz que não houve arrependimento. Qual é o propósito dos juízos, então?",
      "Por que o autor interrompe a contagem no capítulo 10, em vez de ir direto à sétima?",
      "A sétima trombeta é celebração, não catástrofe. Isso muda a sua leitura do bloco inteiro?",
    ],
    aplicacoes: [
      "Escreva o que este bloco diz sobre a oração de gente comum, à luz de 8:3-5.",
      "Identifique onde você lê Apocalipse buscando calendário em vez de buscando esperança.",
    ],
    visoes: [
      {
        nome: "Preterista",
        resumo:
          "As trombetas descrevem o juízo sobre Jerusalém e o Império Romano no primeiro século; o livro fala do tempo dos primeiros leitores.",
        textos: ["Apocalipse 1:1", "Apocalipse 1:3", "Apocalipse 22:10"],
      },
      {
        nome: "Historicista",
        resumo:
          "As trombetas são etapas sucessivas da história da igreja, da queda de Roma em diante.",
        textos: ["Daniel 2:31-45", "Apocalipse 9:13-16"],
      },
      {
        nome: "Futurista",
        resumo:
          "O bloco descreve uma tribulação ainda por vir, imediatamente anterior à volta de Cristo.",
        textos: ["Apocalipse 4:1", "Mateus 24:21", "1 Tessalonicenses 4:16"],
      },
      {
        nome: "Idealista",
        resumo:
          "As trombetas são símbolos de realidades que se repetem em toda a era da igreja, sem corresponder a eventos datáveis.",
        textos: ["Apocalipse 12:1-6", "Efésios 6:12"],
      },
    ],
    notas: [
      "Este é um dos trechos mais disputados da Bíblia. As quatro escolas acima são leituras cristãs históricas, e o estudo apresenta as quatro sem eleger vencedor.",
      "Apocalipse é literatura apocalíptica: números e imagens são simbólicos por convenção do gênero, não por fuga do sentido literal. Tratar '1/3' e 'gafanhotos' como estatística é ler o texto fora do gênero dele.",
      "Cuidado pastoral: fim dos tempos mexe com medo. Se houver no grupo quem chegue ansioso, note que o bloco termina em adoração e em reino estabelecido, não em terror.",
    ],
  },

  {
    nome: "Discipulado",
    sinonimos: ["seguir Jesus", "mentoria", "crescimento", "maturidade"],
    resumo:
      "Discipulado no Novo Testamento é aprendizado por convivência, com custo declarado de antemão e continuidade em cadeia.",
    categorias: [
      {
        titulo: "A ordem",
        textos: [
          t("Mateus 28:18-20", "mt", 28, "18-20", "O único verbo no imperativo é 'fazei discípulos'; ir, batizar e ensinar são particípios que o acompanham."),
          t("2 Timóteo 2:1-2", "2tm", 2, "1-2", "Descreve quatro gerações numa frase: Paulo, Timóteo, homens fiéis, outros. Discipulado é cadeia."),
        ],
      },
      {
        titulo: "O custo declarado",
        textos: [
          t("Lucas 14:25-33", "lc", 14, "25-33", "Jesus reduz uma multidão de propósito, mandando calcular o custo antes de seguir."),
          t("Marcos 8:34-38", "mc", 8, "34-38", "Dito logo depois de Pedro acertar quem Jesus é e errar o que isso implicava."),
        ],
      },
      {
        titulo: "A marca",
        textos: [
          t("João 13:34-35", "jo", 13, "34-35", "O sinal que Jesus dá para identificar discípulo é amor entre eles, não conhecimento nem número."),
        ],
      },
    ],
    perguntas: [
      "Em Mateus 28, qual é o verbo principal da ordem?",
      "Por que Jesus, em Lucas 14, parece querer diminuir a multidão?",
      "Quem discipulou você, e quem você está discipulando?",
    ],
    aplicacoes: [
      "Convide alguém para uma conversa regular pelos próximos dois meses.",
      "Escreva o que te custa seguir Jesus hoje, com nome e sobrenome.",
    ],
  },
];
