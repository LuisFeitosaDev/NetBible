import type { TextoApoio, Visao } from "./tipos";

/**
 * Doutrinas curadas.
 *
 * A regra editorial aqui é a da especificação: não esconder divergência
 * teológica relevante. Onde cristãos leem diferente, as leituras aparecem lado
 * a lado, com os textos que cada uma usa, e sem eleger vencedor. Onde há
 * consenso histórico amplo, não inventamos controvérsia.
 */
export type Doutrina = {
  nome: string;
  sinonimos: string[];
  definicao: string;
  textos: TextoApoio[];
  visoes?: Visao[];
  perguntas: string[];
  aplicacao: string;
  /** Onde há acordo, para o grupo não achar que tudo é disputado. */
  consenso?: string;
};

const t = (
  ref: string,
  slug: string,
  capitulo: number,
  versiculos: string,
  contexto: string,
): TextoApoio => ({ ref, slug, capitulo, versiculos, contexto });

export const DOUTRINAS: Doutrina[] = [
  {
    nome: "Salvação",
    sinonimos: ["ser salvo", "redenção", "justificação"],
    definicao:
      "O resgate que Deus realiza em Cristo, tirando o ser humano da condenação e o colocando em relação restaurada com ele.",
    textos: [
      t("Efésios 2:1-10", "ef", 2, "1-10", "O trecho mais direto sobre graça e obras. As obras aparecem como resultado, nunca como preço."),
      t("Romanos 3:21-26", "rm", 3, "21-26", "Clímax do argumento de Paulo depois de mostrar que judeus e gentios falharam igualmente."),
      t("Tito 3:4-7", "tt", 3, "4-7", "Resumo enxuto: bondade de Deus, não obras de justiça praticadas por nós."),
    ],
    consenso:
      "Praticamente todas as tradições cristãs afirmam que a salvação é obra de Deus em Cristo e recebida pela fé. A divergência é sobre como graça e vontade humana se articulam.",
    visoes: [
      {
        nome: "Ênfase na soberania (reformada)",
        resumo:
          "Deus escolhe e capacita eficazmente; a fé é resultado dessa ação, e quem é salvo é preservado até o fim.",
        textos: ["Efésios 1:4-5", "João 6:44", "Romanos 8:29-30"],
      },
      {
        nome: "Ênfase na resposta livre (arminiana/wesleyana)",
        resumo:
          "A graça alcança a todos e capacita a resposta, que permanece genuinamente livre, inclusive para ser abandonada.",
        textos: ["Tito 2:11", "1 Timóteo 2:3-4", "Hebreus 6:4-6"],
      },
    ],
    perguntas: [
      "Em Efésios 2, o que exatamente é o dom: a graça, a fé, ou o conjunto?",
      "Onde essas duas leituras concordam?",
      "Como você explicaria salvação a alguém sem usar jargão religioso?",
    ],
    aplicacao: "Escreva como você contaria isso a um amigo de fora da igreja, em três frases.",
  },

  {
    nome: "Graça",
    sinonimos: ["favor imerecido"],
    definicao:
      "O favor de Deus dado a quem não tem como merecer nem retribuir, e que funda tanto a entrada quanto a permanência na fé.",
    textos: [
      t("Efésios 2:8-9", "ef", 2, "8-9", "Contrapõe graça a jactância: o alvo do argumento é tirar motivo de orgulho."),
      t("Romanos 5:6-11", "rm", 5, "6-11", "A ênfase está no momento: Cristo morre por 'ímpios' e 'inimigos', não por quem já melhorou."),
      t("Tito 2:11-14", "tt", 2, "11-14", "A mesma graça que salva é a que ensina a viver: graça não é permissão."),
    ],
    consenso: "A gratuidade da graça é ponto comum entre tradições cristãs.",
    perguntas: [
      "Se a graça é gratuita, por que Tito 2 diz que ela 'ensina'?",
      "Onde na sua vida você age como se precisasse pagar por ela?",
      "Qual a diferença entre graça e permissividade?",
    ],
    aplicacao: "Identifique uma área em que você tenta merecer o que já recebeu de graça.",
  },

  {
    nome: "Fé",
    sinonimos: ["crer", "confiança"],
    definicao:
      "Confiança que se apoia em alguém, e não sentimento de certeza nem ausência de dúvida.",
    textos: [
      t("Hebreus 11:1-3", "hb", 11, "1-3", "Abre uma lista de pessoas que creram sem ver o cumprimento. Fé aqui convive com espera longa."),
      t("Tiago 2:14-26", "tg", 2, "14-26", "Não contradiz Paulo: Tiago combate fé só declarada, Paulo combate obra usada como mérito."),
      t("Marcos 9:21-24", "mc", 9, "21-24", "'Creio, ajuda a minha incredulidade.' Jesus atende mesmo assim."),
    ],
    perguntas: [
      "Marcos 9 mostra fé misturada com dúvida sendo atendida. O que isso muda?",
      "Tiago e Paulo se contradizem, ou respondem a problemas diferentes?",
      "Fé é sentir certeza, ou outra coisa?",
    ],
    aplicacao: "Nomeie uma dúvida que você esconde e leve-a para a oração como está.",
  },

  {
    nome: "Santificação",
    sinonimos: ["crescimento", "maturidade", "transformação"],
    definicao:
      "O processo pelo qual quem foi aceito por Deus vai sendo de fato transformado, em cooperação com o Espírito.",
    textos: [
      t("Filipenses 2:12-13", "fp", 2, "12-13", "Une esforço humano e ação de Deus na mesma frase, sem escolher entre os dois."),
      t("Romanos 6:1-14", "rm", 6, "1-14", "Responde à objeção de que graça incentivaria pecar mais."),
      t("2 Coríntios 3:18", "2co", 3, "18", "Descreve transformação gradual, 'de glória em glória', não instantânea."),
    ],
    visoes: [
      {
        nome: "Progressiva",
        resumo: "Crescimento gradual e nunca concluído nesta vida; o pecado permanece em luta.",
        textos: ["Romanos 7:14-25", "Filipenses 3:12-14"],
      },
      {
        nome: "Segunda obra da graça",
        resumo:
          "Tradições wesleyanas e de santidade entendem uma experiência distinta e posterior à conversão.",
        textos: ["1 Tessalonicenses 5:23", "Hebreus 12:14"],
      },
    ],
    perguntas: [
      "Filipenses 2:12-13 coloca o esforço de quem?",
      "Romanos 6 responde a qual objeção?",
      "Onde você tem confundido santidade com aparência?",
    ],
    aplicacao: "Escolha um hábito concreto para trabalhar nos próximos trinta dias.",
  },

  {
    nome: "Espírito Santo",
    sinonimos: ["pneumatologia", "consolador"],
    definicao:
      "A terceira pessoa da Trindade, que habita o crente, convence, ensina, capacita e garante o pertencimento.",
    textos: [
      t("João 16:7-15", "jo", 16, "7-15", "Jesus descreve funções concretas: convencer, guiar à verdade, glorificar a Cristo."),
      t("Romanos 8:9-17", "rm", 8, "9-17", "Liga a presença do Espírito ao próprio pertencer a Cristo, e à adoção como filhos."),
      t("Atos 1:8", "at", 1, "8", "A promessa de poder está amarrada a testemunho, não a experiência privada."),
    ],
    consenso: "A divindade e a personalidade do Espírito são consenso desde os concílios antigos.",
    visoes: [
      {
        nome: "Continuísmo",
        resumo: "Todas as manifestações descritas no Novo Testamento seguem disponíveis.",
        textos: ["1 Coríntios 12:7-11", "Atos 2:17-18"],
      },
      {
        nome: "Cessacionismo",
        resumo: "Dons de sinal tinham função de confirmação na era apostólica e cessaram.",
        textos: ["1 Coríntios 13:8-10", "Hebreus 2:3-4"],
      },
    ],
    perguntas: [
      "Em João 16, que funções Jesus dá ao Espírito?",
      "Em Atos 1:8, poder está ligado a quê?",
      "O que as duas visões têm em comum?",
    ],
    aplicacao: "Identifique onde você tem pedido poder e onde tem pedido caráter.",
  },

  {
    nome: "Dons espirituais",
    sinonimos: ["carismas", "dons"],
    definicao:
      "Capacitações dadas pelo Espírito para o serviço da comunidade, distribuídas conforme ele quer.",
    textos: [
      t("1 Coríntios 12:4-11", "1co", 12, "4-11", "A distribuição é atribuída ao Espírito, o que remove base para comparação entre pessoas."),
      t("Romanos 12:3-8", "rm", 12, "3-8", "Lista mais cotidiana, incluindo contribuir, presidir e exercer misericórdia."),
      t("1 Coríntios 14:26-33", "1co", 14, "26-33", "Estabelece ordem no culto: o critério é edificação e clareza, não intensidade."),
    ],
    visoes: [
      {
        nome: "Continuísmo",
        resumo: "Todos os dons permanecem e devem ser buscados com ordem.",
        textos: ["1 Coríntios 14:1"],
      },
      {
        nome: "Cessacionismo",
        resumo: "Dons revelatórios cessaram; permanecem serviço, ensino e liderança.",
        textos: ["Efésios 2:20"],
      },
    ],
    perguntas: [
      "Quem distribui os dons, segundo 1 Coríntios 12?",
      "Qual critério de ordem Paulo estabelece no capítulo 14?",
      "Onde a sua comunidade mede espiritualidade pelo dom exercido?",
    ],
    aplicacao: "Pergunte a duas pessoas que dom elas enxergam em você.",
  },

  {
    nome: "Igreja",
    sinonimos: ["eclesiologia", "corpo de Cristo", "comunidade"],
    definicao:
      "O povo reunido por Cristo, descrito no Novo Testamento como corpo, família e templo, antes de ser instituição ou prédio.",
    textos: [
      t("Atos 2:42-47", "at", 2, "42-47", "Retrato da primeira comunidade: ensino, comunhão, partir do pão e oração, com partilha de bens."),
      t("Efésios 4:11-16", "ef", 4, "11-16", "Liderança existe para equipar todos, e a maturidade é coletiva."),
      t("1 Coríntios 12:12-27", "1co", 12, "12-27", "A imagem do corpo é usada para corrigir divisão, não para organizar hierarquia."),
    ],
    visoes: [
      {
        nome: "Episcopal",
        resumo: "Governo por bispos em sucessão histórica.",
        textos: ["1 Timóteo 3:1-7", "Tito 1:5"],
      },
      {
        nome: "Presbiteriana",
        resumo: "Governo por conselho de presbíteros, em cortes escalonadas.",
        textos: ["Atos 15:1-29", "1 Timóteo 4:14"],
      },
      {
        nome: "Congregacional",
        resumo: "Autonomia da comunidade local, com decisões da assembleia.",
        textos: ["Mateus 18:15-20", "Atos 6:1-6"],
      },
    ],
    perguntas: [
      "O que Atos 2 descreve que a sua igreja não pratica?",
      "Efésios 4 coloca o trabalho do ministério em quem?",
      "O que muda ao pensar igreja como corpo, e não como serviço que se consome?",
    ],
    aplicacao: "Escolha uma forma concreta de servir na sua comunidade neste mês.",
  },

  {
    nome: "Batismo",
    sinonimos: ["batizar"],
    definicao:
      "Rito de iniciação cristã, ligado a morte e ressurreição com Cristo e à entrada na comunidade.",
    textos: [
      t("Romanos 6:3-5", "rm", 6, "3-5", "Usa a imagem de sepultamento e ressurreição para explicar o que o batismo significa."),
      t("Mateus 28:19", "mt", 28, "19", "Faz parte da ordem de fazer discípulos, junto com ensinar."),
      t("Atos 2:38-41", "at", 2, "38-41", "Sequência apresentada: arrependimento, batismo, recepção do Espírito."),
    ],
    consenso: "Todas as tradições praticam o batismo e o entendem como ligado à entrada na fé cristã.",
    visoes: [
      {
        nome: "Batismo de crentes (credobatismo)",
        resumo:
          "Só se batiza quem professa fé pessoalmente; o rito pressupõe decisão consciente.",
        textos: ["Atos 2:38", "Atos 8:36-38", "Marcos 16:16"],
      },
      {
        nome: "Batismo infantil (pedobatismo)",
        resumo:
          "Filhos de crentes são batizados como sinal da aliança, em paralelo à circuncisão, com profissão posterior.",
        textos: ["Atos 16:15", "Atos 16:33", "Colossenses 2:11-12", "1 Coríntios 7:14"],
      },
    ],
    perguntas: [
      "Que imagem Romanos 6 usa, e o que ela sugere sobre o modo?",
      "Onde as duas visões concordam sobre o significado?",
      "O que o batismo significa para você hoje?",
    ],
    aplicacao: "Se você foi batizado, escreva o que aquilo significava então e o que significa agora.",
  },

  {
    nome: "Ceia do Senhor",
    sinonimos: ["santa ceia", "eucaristia", "comunhão", "partir do pão"],
    definicao:
      "Refeição instituída por Jesus na última noite, praticada pela igreja como memória, proclamação e participação.",
    textos: [
      t("1 Coríntios 11:17-34", "1co", 11, "17-34", "Paulo corrige uma ceia que humilhava os pobres. O 'indignamente' do verso 27 é sobre isso, não sobre sentir-se digno."),
      t("Lucas 22:14-20", "lc", 22, "14-20", "A instituição acontece dentro da Páscoa judaica, o que carrega o sentido de libertação."),
      t("João 6:53-58", "jo", 6, "53-58", "Discurso que precede em muito a instituição, e que as tradições leem de formas diferentes."),
    ],
    visoes: [
      {
        nome: "Presença real corporal",
        resumo: "Católicos e ortodoxos entendem a presença substancial de Cristo nos elementos.",
        textos: ["João 6:53-58", "1 Coríntios 10:16"],
      },
      {
        nome: "Presença espiritual",
        resumo: "Tradição reformada: Cristo está realmente presente pelo Espírito, não nos elementos.",
        textos: ["1 Coríntios 10:16-17"],
      },
      {
        nome: "Memorial",
        resumo: "Tradições batistas e zwinglianas: o rito é memória e proclamação da obra consumada.",
        textos: ["Lucas 22:19", "1 Coríntios 11:26"],
      },
    ],
    perguntas: [
      "Qual era o problema concreto na ceia de Corinto?",
      "O 'indignamente' de 11:27 se refere a quê, no contexto?",
      "O que muda na sua participação depois de ler o contexto?",
    ],
    aplicacao: "Antes da próxima ceia, resolva uma pendência com alguém da comunidade.",
  },

  {
    nome: "Escatologia",
    sinonimos: ["fim dos tempos", "milênio", "arrebatamento", "últimas coisas"],
    definicao:
      "O estudo do que a Bíblia afirma sobre o desfecho da história: volta de Cristo, juízo, ressurreição e nova criação.",
    textos: [
      t("1 Tessalonicenses 4:13-18", "1ts", 4, "13-18", "Escrito para consolar quem perdeu pessoas, não para montar cronograma."),
      t("Apocalipse 21:1-5", "ap", 21, "1-5", "O destino final descrito não é fuga do mundo, é mundo renovado com Deus habitando nele."),
      t("Mateus 24:36-44", "mt", 24, "36-44", "Jesus declara não saber o dia, e conclui com ordem de vigilância prática."),
    ],
    consenso:
      "Cristo voltará, haverá juízo e ressurreição, e Deus fará novas todas as coisas. A divergência está no arranjo e na cronologia.",
    visoes: [
      {
        nome: "Pré-milenismo",
        resumo: "Cristo volta antes de um reino milenar na terra.",
        textos: ["Apocalipse 20:1-6"],
      },
      {
        nome: "Amilenismo",
        resumo: "O milênio é simbólico e corresponde à era presente da igreja.",
        textos: ["Apocalipse 20:1-6", "Colossenses 1:13"],
      },
      {
        nome: "Pós-milenismo",
        resumo: "O evangelho avança até um período de florescimento, e então Cristo volta.",
        textos: ["Mateus 13:31-33"],
      },
    ],
    perguntas: [
      "1 Tessalonicenses 4 foi escrito para consolar ou para informar cronologia?",
      "Em Mateus 24, qual a aplicação que Jesus tira do fato de ninguém saber o dia?",
      "O que muda quando o fim é mundo renovado e não fuga do mundo?",
    ],
    aplicacao: "Escreva uma decisão concreta que muda se você levar a sério que Cristo volta.",
  },

  {
    nome: "Ressurreição",
    sinonimos: ["ressurreição dos mortos", "vida eterna", "corpo ressurreto"],
    definicao:
      "A afirmação de que Cristo ressuscitou corporalmente e de que os seus também ressuscitarão em corpo transformado.",
    textos: [
      t("1 Coríntios 15:1-8", "1co", 15, "1-8", "Paulo lista testemunhas vivas à época, colocando a afirmação sob verificação."),
      t("1 Coríntios 15:12-26", "1co", 15, "12-26", "Argumenta que sem ressurreição a fé cristã inteira desmorona."),
      t("1 Coríntios 15:35-49", "1co", 15, "35-49", "Descreve corpo ressurreto como contínuo e transformado, com a imagem da semente."),
    ],
    consenso:
      "A ressurreição corporal de Cristo é afirmação central e comum a todas as tradições cristãs históricas.",
    perguntas: [
      "Por que Paulo lista testemunhas nomeadas?",
      "O que ele diz que acontece à fé cristã sem ressurreição?",
      "Ressurreição do corpo e imortalidade da alma são a mesma coisa?",
    ],
    aplicacao: "Considere o que muda no seu jeito de tratar o próprio corpo e o dos outros.",
  },

  {
    nome: "Segunda vinda de Cristo",
    sinonimos: ["volta de Jesus", "parusia", "advento"],
    definicao:
      "A promessa de que Cristo voltará pessoal e visivelmente para consumar o Reino e julgar.",
    textos: [
      t("Atos 1:9-11", "at", 1, "9-11", "A promessa é dada no momento da ascensão e descreve volta 'do mesmo modo'."),
      t("Mateus 24:36-44", "mt", 24, "36-44", "Jesus recusa dar data e converte a espera em vigilância."),
      t("2 Pedro 3:8-13", "2pe", 3, "8-13", "Explica a demora como paciência, e conclui em conduta, não em cálculo."),
    ],
    consenso: "A volta pessoal de Cristo é confessada por todas as tradições históricas.",
    perguntas: [
      "Como os textos tratam quem tenta calcular datas?",
      "Que conduta 2 Pedro 3 tira da demora?",
      "A sua espera muda alguma decisão prática?",
    ],
    aplicacao: "Identifique uma área da sua vida que você organizaria diferente vivendo essa espera.",
  },
];
