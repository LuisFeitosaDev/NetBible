/**
 * Ficha de cada livro: quem escreveu, quando, para quem e por quê.
 * É o que aparece no "Sobre" da página do livro e no painel do leitor.
 *
 * Autoria e datas seguem o consenso tradicional; onde a crítica moderna diverge
 * de forma relevante, o texto diz isso em vez de fingir certeza.
 */

export type About = {
  /** Autor como a tradição atribui. */
  autor: string;
  /** Época da escrita, em linguagem de gente. */
  quando: string;
  /** Destinatário original. */
  publico: string;
  /** Dois ou três períodos de contexto histórico. */
  contexto: string;
  /** Gênero literário: ajuda a saber como ler. */
  genero: string;
  temas: string[];
  /** Versículo-âncora do livro. */
  chave: { c: number; v: number };
};

export const ABOUT: Record<string, About> = {
  gn: {
    autor: "Tradicionalmente Moisés; a crítica moderna vê a costura de fontes mais antigas",
    quando: "Século XV a.C. na tradição; compilado provavelmente até o século VI a.C.",
    publico: "Israel recém-saído do Egito, aprendendo quem é e de onde veio",
    genero: "Narrativa de origens e história patriarcal",
    contexto:
      "Um povo sem terra precisa saber por que existe. Gênesis responde indo ao começo de tudo: o mundo é criação boa de um Deus único, a humanidade estragou o arranjo, e mesmo assim esse Deus escolheu uma família improvável, Abraão e seus descendentes, para reparar a coisa. Os últimos capítulos explicam como essa família foi parar no Egito, preparando o Êxodo.",
    temas: ["Criação", "Aliança", "Promessa", "Família disfuncional"],
    chave: { c: 12, v: 2 },
  },
  ex: {
    autor: "Tradicionalmente Moisés",
    quando: "Século XV–XIII a.C.",
    publico: "A geração que saiu da escravidão no Egito",
    genero: "Narrativa de libertação e código legal",
    contexto:
      "Quatrocentos anos depois de Gênesis, os descendentes de Jacó viraram mão de obra escrava no Egito. Êxodo é o relato da saída: as pragas, a Páscoa, o mar aberto, e depois o Sinai, onde um bando de ex-escravos recebe uma lei e vira nação. A segunda metade, menos lembrada, é sobre construir o tabernáculo, onde Deus passa a morar no meio do povo.",
    temas: ["Libertação", "Lei", "Presença de Deus", "Idolatria"],
    chave: { c: 3, v: 14 },
  },
  lv: {
    autor: "Tradicionalmente Moisés",
    quando: "Período do deserto, século XV–XIII a.C.",
    publico: "Sacerdotes e o povo acampado no Sinai",
    genero: "Código sacerdotal e ritual",
    contexto:
      "O livro mais pulado da Bíblia, e o mais mal compreendido. Depois que Deus passa a habitar no meio do acampamento, surge um problema prático: como gente comum convive com o sagrado sem se destruir? Levítico é o manual: sacrifícios, pureza, festas, o Dia da Expiação. Por trás da aparente burocracia está uma ideia só: santidade é levada a sério.",
    temas: ["Santidade", "Sacrifício", "Expiação", "Justiça social"],
    chave: { c: 19, v: 18 },
  },
  nm: {
    autor: "Tradicionalmente Moisés",
    quando: "Os 40 anos entre o Sinai e a terra prometida",
    publico: "A geração que morreria no deserto e a que entraria",
    genero: "Narrativa itinerante com censos",
    contexto:
      "O nome vem dos dois censos, mas o assunto é outro: o que acontece quando um povo resgatado se recusa a confiar. Na fronteira de Canaã, os espias voltam com medo e Israel dá meia-volta. O resultado são quatro décadas de circuito no deserto até uma geração inteira morrer. Entre a murmuração, aparecem episódios inesquecíveis: a serpente de bronze, a jumenta que fala.",
    temas: ["Desconfiança", "Murmuração", "Disciplina", "Fidelidade de Deus"],
    chave: { c: 6, v: 24 },
  },
  dt: {
    autor: "Tradicionalmente Moisés",
    quando: "Às vésperas da entrada em Canaã, século XIII a.C.",
    publico: "A nova geração, nascida no deserto",
    genero: "Discurso de despedida em formato de tratado",
    contexto:
      "Moisés está velho, não vai entrar na terra, e faz três sermões na fronteira. Ele reconta a história para quem não viu o Egito, reapresenta a lei e coloca o povo diante de uma escolha explícita: vida ou morte, bênção ou maldição. É o livro mais citado por Jesus, e o formato imita os tratados de vassalagem do Oriente Médio antigo.",
    temas: ["Memória", "Escolha", "Amor a Deus", "Obediência"],
    chave: { c: 6, v: 5 },
  },
  js: {
    autor: "Tradicionalmente Josué, com acréscimos posteriores",
    quando: "Século XIII–XII a.C.",
    publico: "Israel se estabelecendo em Canaã",
    genero: "Narrativa de conquista e partilha de terras",
    contexto:
      "A promessa feita a Abraão finalmente se cumpre, e não é bonito. Josué narra a travessia do Jordão, a queda de Jericó, campanhas militares e a divisão do território entre as doze tribos. É um livro que incomoda leitores modernos pela violência, e o próprio texto está mais interessado na fidelidade de Deus à promessa do que nas batalhas.",
    temas: ["Promessa cumprida", "Coragem", "Herança", "Compromisso"],
    chave: { c: 1, v: 9 },
  },
  jz: {
    autor: "Anônimo; a tradição judaica sugere Samuel",
    quando: "Escrito durante a monarquia, sobre os séculos XII–XI a.C.",
    publico: "Israel já com rei, olhando para o caos anterior",
    genero: "Antologia de narrativas em ciclo",
    contexto:
      "Entre a conquista e a monarquia, Israel vive um padrão que se repete seis vezes: o povo abandona Deus, é oprimido por vizinhos, grita por socorro, e Deus levanta um libertador improvável. Os juízes não são santos: Sansão é um caso perdido, Jefté faz um voto trágico. O livro termina em barbárie, com a frase que explica tudo: cada um fazia o que achava certo.",
    temas: ["Ciclos de queda", "Liderança falha", "Misericórdia", "Anarquia"],
    chave: { c: 21, v: 25 },
  },
  rt: {
    autor: "Anônimo",
    quando: "Ambientado no tempo dos juízes; escrito depois",
    publico: "Israelitas em debate sobre quem pertence ao povo",
    genero: "Novela histórica",
    contexto:
      "Quatro capítulos que funcionam como um respiro no meio da violência dos Juízes. Uma viúva de Belém perde tudo em Moabe e volta para casa com uma nora estrangeira que se recusa a abandoná-la. Rute é moabita, inimiga étnica, e termina bisavó do rei Davi. É um livro silenciosamente subversivo sobre quem Deus inclui.",
    temas: ["Lealdade", "Estrangeiro", "Providência", "Resgate"],
    chave: { c: 1, v: 16 },
  },
  "1sm": {
    autor: "Anônimo; tradicionalmente Samuel, Natã e Gade",
    quando: "Séculos XI–X a.C.",
    publico: "Israel na transição para a monarquia",
    genero: "História narrativa",
    contexto:
      "Israel cansa de ser diferente e pede um rei, como as outras nações. Recebe Saul, bonito, alto e emocionalmente instável. Enquanto Saul desmorona, um pastor adolescente chamado Davi mata um gigante, vira herói nacional e depois fugitivo. Boa parte do livro é a perseguição de um homem que já foi ungido rei mas ainda não reina.",
    temas: ["Poder", "Ciúme", "Unção", "Paciência"],
    chave: { c: 16, v: 7 },
  },
  "2sm": {
    autor: "Anônimo",
    quando: "Século X a.C.",
    publico: "A corte de Jerusalém e seus herdeiros",
    genero: "Biografia real",
    contexto:
      "Davi finalmente reina, unifica as tribos, toma Jerusalém e recebe a promessa de uma dinastia eterna. Depois manda buscar a mulher de um soldado e manda matar o marido. A segunda metade do livro é a conta chegando: filhos que se violentam, um golpe de estado do próprio filho, e um pai chorando pelo herdeiro que tentou matá-lo.",
    temas: ["Grandeza e queda", "Consequência", "Arrependimento", "Aliança"],
    chave: { c: 7, v: 16 },
  },
  "1rs": {
    autor: "Anônimo; tradição judaica atribui a Jeremias",
    quando: "Compilado durante o exílio, sobre os séculos X–IX a.C.",
    publico: "Judeus no exílio perguntando o que deu errado",
    genero: "História teológica",
    contexto:
      "Salomão pede sabedoria, constrói o templo mais caro da história e depois acumula setecentas esposas e os deuses delas junto. Quando ele morre, o reino racha em dois, Israel ao norte, Judá ao sul, e a partir daí é uma lista de reis medidos por uma régua só: foram fiéis ou não. No meio disso entra Elias, enfrentando o rei Acabe e os profetas de Baal.",
    temas: ["Sabedoria", "Templo", "Divisão", "Profecia"],
    chave: { c: 3, v: 9 },
  },
  "2rs": {
    autor: "Anônimo",
    quando: "Compilado durante o exílio, sobre os séculos IX–VI a.C.",
    publico: "Judeus deportados para a Babilônia",
    genero: "História teológica",
    contexto:
      "A descida completa. Eliseu sucede Elias, os dois reinos vão acumulando reis piores, e as superpotências chegam: a Assíria engole o norte em 722 a.C., a Babilônia arrasa Jerusalém e queima o templo em 586 a.C. O livro termina com o povo deportado. É a resposta dura a uma pergunta de exilado: isso aconteceu porque Deus falhou, ou porque nós falhamos?",
    temas: ["Juízo", "Exílio", "Profetas", "Reforma tardia"],
    chave: { c: 17, v: 13 },
  },
  "1cr": {
    autor: "Tradicionalmente Esdras",
    quando: "Século V–IV a.C., depois do exílio",
    publico: "Judeus que voltaram e precisavam recomeçar",
    genero: "História genealógica",
    contexto:
      "A mesma história de Samuel e Reis, recontada séculos depois para quem voltou do exílio. Começa com nove capítulos de genealogias, a maneira antiga de dizer 'você ainda pertence a esse povo'. Depois se concentra em Davi, e principalmente na preparação do culto e do templo. Os pecados de Davi praticamente somem: o objetivo aqui é reconstruir identidade, não fazer denúncia.",
    temas: ["Identidade", "Continuidade", "Adoração", "Herança"],
    chave: { c: 29, v: 11 },
  },
  "2cr": {
    autor: "Tradicionalmente Esdras",
    quando: "Século V–IV a.C.",
    publico: "A comunidade restaurada em Jerusalém",
    genero: "História genealógica",
    contexto:
      "Continua de Salomão até o exílio, mas com os olhos fixos no templo e nos reis que promoveram reforma religiosa: Ezequias e Josias ganham destaque. Termina com o decreto de Ciro autorizando a volta, ou seja, com uma porta aberta. Para quem estava reconstruindo tudo do zero, a mensagem era: já houve reforma antes, pode haver de novo.",
    temas: ["Templo", "Reforma", "Oração", "Restauração"],
    chave: { c: 7, v: 14 },
  },
  ed: {
    autor: "Tradicionalmente Esdras",
    quando: "Século V a.C.",
    publico: "Os repatriados de Jerusalém",
    genero: "Memórias e documentos oficiais",
    contexto:
      "O império persa substitui o babilônico e libera os judeus para voltar. Esdras narra duas levas de retorno e a reconstrução do templo, com toda a oposição política que isso gerou. O próprio Esdras, escriba e sacerdote, chega na segunda leva com uma missão: reensinar a lei a um povo que quase esqueceu quem era.",
    temas: ["Retorno", "Reconstrução", "Lei", "Pureza da comunidade"],
    chave: { c: 7, v: 10 },
  },
  ne: {
    autor: "Neemias, com edição posterior",
    quando: "Século V a.C.",
    publico: "Jerusalém em reconstrução",
    genero: "Memória em primeira pessoa",
    contexto:
      "Neemias era copeiro do rei persa, cargo de confiança, vida confortável, e larga tudo ao saber que os muros de Jerusalém estão em ruínas. Consegue autorização, volta e reconstrói a muralha em 52 dias, sob ameaça constante. É o livro mais próximo de um manual de liderança que a Bíblia tem: planejamento, gestão de crise e oração no mesmo parágrafo.",
    temas: ["Liderança", "Oposição", "Oração", "Renovação da aliança"],
    chave: { c: 6, v: 15 },
  },
  et: {
    autor: "Anônimo",
    quando: "Século V a.C., corte persa de Xerxes I",
    publico: "Judeus vivendo dispersos no império",
    genero: "Novela de corte",
    contexto:
      "O único livro da Bíblia que nunca menciona Deus, e o assunto é justamente a providência invisível. Uma jovem judia esconde a origem, vira rainha da Pérsia e descobre um plano de extermínio do próprio povo. Arriscar a vida ou ficar calada? A festa de Purim celebra essa decisão até hoje.",
    temas: ["Coragem", "Identidade escondida", "Providência", "Reviravolta"],
    chave: { c: 4, v: 14 },
  },
  job: {
    autor: "Desconhecido; um dos textos mais antigos da Bíblia",
    quando: "Incerto, possivelmente era patriarcal",
    publico: "Qualquer pessoa que já sofreu sem explicação",
    genero: "Poesia sapiencial e drama filosófico",
    contexto:
      "Um homem justo perde filhos, bens e saúde em sequência. Três amigos vêm consolar, ficam sete dias em silêncio, a melhor parte do que fazem, e depois insistem que ele deve ter feito algo para merecer. Jó recusa a explicação fácil e exige uma audiência com Deus. Quando Deus enfim responde, não explica nada: faz perguntas. E isso, estranhamente, basta.",
    temas: ["Sofrimento", "Justiça", "Silêncio de Deus", "Mistério"],
    chave: { c: 19, v: 25 },
  },
  sl: {
    autor: "Davi (73 salmos), Asafe, filhos de Corá, Salomão, Moisés e anônimos",
    quando: "Cerca de mil anos de composição, do êxodo ao pós-exílio",
    publico: "Israel em culto, e todo mundo desde então",
    genero: "Hinário e poesia lírica",
    contexto:
      "Não é um livro, é uma coletânea de 150 orações reunidas em cinco coleções. Tem louvor, mas tem também raiva, depressão, sede de vingança e acusação direta contra Deus. É a parte da Bíblia onde ninguém finge estar bem, e talvez por isso seja a mais lida. Jesus cita os Salmos na cruz.",
    temas: ["Louvor", "Lamento", "Confiança", "Honestidade brutal"],
    chave: { c: 23, v: 1 },
  },
  pv: {
    autor: "Salomão, com coleções de Agur, Lemuel e dos 'sábios'",
    quando: "Século X–VI a.C.",
    publico: "Jovens sendo formados para a vida adulta",
    genero: "Literatura sapiencial",
    contexto:
      "Provérbios não promete milagre: promete que certas escolhas tendem a dar certo e outras tendem a dar errado. Fala de dinheiro, preguiça, bebida, amizade, sexo, fofoca e o poder da língua com uma franqueza que surpreende. São máximas, não garantias, e o livro de Jó existe em parte para lembrar disso.",
    temas: ["Sabedoria prática", "Caráter", "Trabalho", "Domínio da língua"],
    chave: { c: 3, v: 5 },
  },
  ec: {
    autor: "'O Pregador', tradicionalmente Salomão",
    quando: "Século X a.C. na tradição; linguagem sugere período posterior",
    publico: "Quem já tem tudo e não sabe para quê",
    genero: "Filosofia sapiencial",
    contexto:
      "Um homem com poder e dinheiro ilimitados testa cada forma de prazer, conhecimento e realização, e conclui que tudo é 'vaidade', literalmente vapor, fumaça, coisa que não se segura. É o livro mais niilista da Bíblia e, ao mesmo tempo, o mais honesto sobre a experiência humana. A saída que ele oferece é pequena e concreta: coma seu pão, faça seu trabalho, ame quem está do seu lado.",
    temas: ["Sentido da vida", "Morte", "Prazer", "Limite humano"],
    chave: { c: 3, v: 11 },
  },
  ct: {
    autor: "Salomão, ou a ele dedicado",
    quando: "Século X–III a.C.",
    publico: "Leitores adultos; lido em Israel na Páscoa",
    genero: "Poesia lírica amorosa",
    contexto:
      "Um diálogo apaixonado entre dois amantes, sem moralismo e sem pudor, descrevendo o corpo um do outro com metáforas de jardim, especiarias e vinho. Judeus e cristãos leram por séculos como alegoria do amor de Deus pelo povo; o texto em si não pede essa leitura. Está na Bíblia afirmando que desejo e beleza são coisa boa.",
    temas: ["Amor", "Desejo", "Beleza", "Exclusividade"],
    chave: { c: 8, v: 6 },
  },
  is: {
    autor: "Isaías; muitos estudiosos veem mais de uma mão nos capítulos 40–66",
    quando: "Século VIII a.C. em diante",
    publico: "Judá sob ameaça assíria, depois exilados e repatriados",
    genero: "Profecia em poesia",
    contexto:
      "O maior dos profetas escreve em duas chaves. A primeira parte é denúncia: religião de fachada, injustiça social, alianças políticas com quem não deveria. A segunda é consolo puro, dirigida a quem já perdeu tudo, e apresenta a figura do Servo Sofredor que carrega a dor dos outros. Nenhum livro do Antigo Testamento é mais citado no Novo.",
    temas: ["Juízo", "Consolo", "Servo sofredor", "Nova criação"],
    chave: { c: 53, v: 5 },
  },
  jr: {
    autor: "Jeremias, ditado ao escriba Baruque",
    quando: "Século VII–VI a.C.",
    publico: "Jerusalém nos anos anteriores à destruição",
    genero: "Profecia, biografia e lamento",
    contexto:
      "Chamado ainda jovem, Jeremias passa quarenta anos avisando que Jerusalém vai cair, e é odiado por isso. Preso, jogado numa cisterna, acusado de traição, ele vê a cidade queimar exatamente como disse. É o profeta mais humano da Bíblia: reclama do próprio chamado, acusa Deus de tê-lo enganado e mesmo assim não para de falar.",
    temas: ["Juízo iminente", "Nova aliança", "Solidão", "Fidelidade custosa"],
    chave: { c: 29, v: 11 },
  },
  lm: {
    autor: "Tradicionalmente Jeremias",
    quando: "Logo após 586 a.C.",
    publico: "Sobreviventes da destruição de Jerusalém",
    genero: "Lamento acróstico",
    contexto:
      "Cinco poemas escritos sobre escombros ainda quentes. Quatro deles são acrósticos, cada estrofe começando com uma letra do alfabeto hebraico, como se a dor precisasse de forma para não virar caos. No meio do terceiro poema, sem explicação e sem ter piorado nada, aparece a frase mais inesperada do livro: as misericórdias se renovam a cada manhã.",
    temas: ["Luto", "Ruína", "Esperança teimosa", "Memória"],
    chave: { c: 3, v: 22 },
  },
  ez: {
    autor: "Ezequiel, sacerdote deportado",
    quando: "Século VI a.C., durante o exílio",
    publico: "Judeus deportados na Babilônia",
    genero: "Profecia visionária",
    contexto:
      "Sacerdote levado para a Babilônia aos 25 anos, Ezequiel nunca chegou a servir no templo. Suas visões são as mais estranhas da Bíblia: criaturas com quatro faces, rodas cheias de olhos, um vale de ossos secos que se levantam. Ele também encena profecias com o próprio corpo, deitando meses de um lado só. A mensagem final é de reconstrução: um coração novo no lugar do coração de pedra.",
    temas: ["Glória de Deus", "Responsabilidade pessoal", "Restauração", "Coração novo"],
    chave: { c: 36, v: 26 },
  },
  dn: {
    autor: "Daniel; a datação é debatida entre os séculos VI e II a.C.",
    quando: "Ambientado no exílio babilônico e persa",
    publico: "Judeus vivendo sob império estrangeiro",
    genero: "Narrativa de corte e apocalipse",
    contexto:
      "Metade narrativa, metade visão. Na primeira parte, quatro jovens judeus servem na corte babilônica sem abrir mão da própria fé, daí a fornalha e a cova dos leões. Na segunda, Daniel recebe visões de impérios que se sucedem e caem. É o livro de cabeceira de quem precisa ser fiel numa cultura que não compartilha seus valores.",
    temas: ["Fidelidade sob pressão", "Soberania de Deus", "Impérios", "Fim dos tempos"],
    chave: { c: 3, v: 17 },
  },
  os: {
    autor: "Oséias",
    quando: "Século VIII a.C., reino do norte",
    publico: "Israel pouco antes da queda para a Assíria",
    genero: "Profecia com sinal encenado",
    contexto:
      "Deus manda o profeta se casar com uma mulher que vai traí-lo, e depois manda ele buscá-la de volta e pagar o resgate. O casamento é a mensagem: é assim que Israel trata Deus, e é assim que Deus responde. Um dos textos mais doloridos e mais ternos da Bíblia.",
    temas: ["Infidelidade", "Amor obstinado", "Arrependimento", "Conhecer a Deus"],
    chave: { c: 6, v: 6 },
  },
  jl: {
    autor: "Joel",
    quando: "Incerto; provavelmente pós-exílico",
    publico: "Judá após uma catástrofe agrícola",
    genero: "Profecia litúrgica",
    contexto:
      "Uma praga de gafanhotos devasta a lavoura, e Joel lê o desastre como um alerta: o Dia do Senhor está chegando. O chamado é para luto público e arrependimento coletivo. Termina com a promessa do Espírito derramado sobre todos, homens, mulheres, jovens, velhos, servos, o texto que Pedro cita em Pentecostes.",
    temas: ["Arrependimento", "Dia do Senhor", "Espírito Santo", "Restauração"],
    chave: { c: 2, v: 28 },
  },
  am: {
    autor: "Amós, pastor e cultivador de sicômoros",
    quando: "Século VIII a.C.",
    publico: "A elite próspera do reino do norte",
    genero: "Oráculo de juízo social",
    contexto:
      "Amós não era profeta de profissão: cuidava de ovelhas em Judá e foi mandado denunciar a prosperidade do reino vizinho. O alvo é específico: gente rica com casas de inverno e de verão, comprando os pobres por um par de sandálias, enquanto mantém o culto em dia. A frase mais conhecida do livro pede que a justiça corra como um rio.",
    temas: ["Justiça social", "Hipocrisia religiosa", "Riqueza", "Juízo"],
    chave: { c: 5, v: 24 },
  },
  ob: {
    autor: "Obadias",
    quando: "Provavelmente após 586 a.C.",
    publico: "Judeus traídos pelos vizinhos edomitas",
    genero: "Oráculo contra uma nação",
    contexto:
      "O livro mais curto do Antigo Testamento, 21 versículos, endereçado a Edom, nação descendente de Esaú, irmão de Jacó. Quando Jerusalém caiu, os edomitas assistiram, aproveitaram e saquearam. Obadias diz que o orgulho de quem mora nas alturas não protege ninguém.",
    temas: ["Orgulho", "Traição entre irmãos", "Justiça retributiva"],
    chave: { c: 1, v: 15 },
  },
  jn: {
    autor: "Anônimo; narra a história do profeta Jonas",
    quando: "Ambientado no século VIII a.C.",
    publico: "Israelitas convencidos de que Deus é só deles",
    genero: "Narrativa satírica",
    contexto:
      "Deus manda Jonas pregar em Nínive, capital do império que aterrorizava Israel. Ele pega um barco na direção oposta. Depois da tempestade e do peixe, Jonas finalmente prega, e a cidade inteira se arrepende, o que o deixa furioso. O livro termina com uma pergunta de Deus, sem resposta, dirigida tanto a Jonas quanto ao leitor.",
    temas: ["Fuga", "Misericórdia para o inimigo", "Preconceito", "Segunda chance"],
    chave: { c: 4, v: 11 },
  },
  mq: {
    autor: "Miquéias",
    quando: "Século VIII a.C.",
    publico: "Samaria e Jerusalém",
    genero: "Profecia alternando juízo e esperança",
    contexto:
      "Contemporâneo de Isaías, mas vindo do interior, Miquéias ataca os latifundiários que tomam a terra dos pequenos e os líderes religiosos que profetizam conforme quem paga. No meio da denúncia aparece a previsão de que o governante nasceria em Belém, e o resumo mais enxuto já feito da religião verdadeira.",
    temas: ["Justiça", "Misericórdia", "Humildade", "Belém"],
    chave: { c: 6, v: 8 },
  },
  na: {
    autor: "Naum",
    quando: "Século VII a.C., pouco antes de 612 a.C.",
    publico: "Judá sob domínio assírio",
    genero: "Poema de juízo",
    contexto:
      "Cento e cinquenta anos depois de Jonas, Nínive voltou a ser o que era: capital de um império brutal. Naum anuncia a queda dela, e o tom é de alívio para quem estava debaixo da bota. Lido junto com Jonas, o par forma uma tensão que a Bíblia não resolve: Deus perdoa a mesma cidade que depois destrói.",
    temas: ["Queda dos impérios", "Consolo aos oprimidos", "Ira de Deus"],
    chave: { c: 1, v: 7 },
  },
  hc: {
    autor: "Habacuque",
    quando: "Final do século VII a.C.",
    publico: "Judá vendo a Babilônia se aproximar",
    genero: "Diálogo profético e salmo",
    contexto:
      "Único profeta que passa o livro inteiro discutindo com Deus em vez de falar com o povo. A pergunta é direta: por que você não faz nada diante da injustiça? A resposta de Deus é pior que o silêncio: vou usar a Babilônia, que é ainda mais violenta. O livro termina com Habacuque cantando, sem que nada tenha melhorado.",
    temas: ["Dúvida", "Justiça de Deus", "Fé sem respostas", "Alegria teimosa"],
    chave: { c: 3, v: 17 },
  },
  sf: {
    autor: "Sofonias, de linhagem real",
    quando: "Século VII a.C., reinado de Josias",
    publico: "Jerusalém antes da reforma de Josias",
    genero: "Oráculo do Dia do Senhor",
    contexto:
      "Três capítulos intensos sobre o Dia do Senhor, endereçados a quem se acomodou achando que Deus não age, nem para o bem nem para o mal. Depois da varredura vem uma das imagens mais surpreendentes do Antigo Testamento: Deus cantando de alegria sobre o seu povo.",
    temas: ["Dia do Senhor", "Acomodação", "Humildade", "Alegria de Deus"],
    chave: { c: 3, v: 17 },
  },
  ag: {
    autor: "Ageu",
    quando: "520 a.C., datado com precisão no próprio texto",
    publico: "Repatriados que pararam a obra do templo",
    genero: "Sermões datados",
    contexto:
      "Os judeus voltaram do exílio, começaram a reconstruir o templo, desanimaram com a oposição e foram cuidar das próprias casas. Dezesseis anos depois, Ageu faz quatro discursos curtos em quatro meses. A pergunta que ele solta é incômoda: é hora de você morar em casa forrada enquanto a casa de Deus está em ruínas?",
    temas: ["Prioridades", "Desânimo", "Reconstrução", "Presença de Deus"],
    chave: { c: 1, v: 4 },
  },
  zc: {
    autor: "Zacarias",
    quando: "520–518 a.C., contemporâneo de Ageu",
    publico: "A comunidade que reconstruía o templo",
    genero: "Visões apocalípticas e oráculos",
    contexto:
      "Enquanto Ageu cobra ação prática, Zacarias oferece visão. São oito visões noturnas cheias de símbolos, cavalos, candelabro, rolo voador, e depois oráculos sobre o futuro. É o livro do Antigo Testamento mais citado nos relatos da Paixão: o rei que entra em Jerusalém montado num jumento, as trinta moedas de prata, o pastor ferido.",
    temas: ["Visões", "Messias", "Purificação", "Futuro de Jerusalém"],
    chave: { c: 9, v: 9 },
  },
  ml: {
    autor: "Malaquias",
    quando: "Século V a.C.",
    publico: "Uma comunidade religiosa desiludida",
    genero: "Disputa em perguntas e respostas",
    contexto:
      "O templo foi reconstruído, a vida seguiu, e nada de extraordinário aconteceu. O povo virou cínico: oferece animais defeituosos, os sacerdotes fazem o mínimo, os casamentos desmoronam. Malaquias responde em formato de debate, antecipando cada objeção. Depois dele vêm quatrocentos anos sem profeta.",
    temas: ["Cinismo religioso", "Dízimo", "Casamento", "Mensageiro que virá"],
    chave: { c: 3, v: 10 },
  },
  mt: {
    autor: "Mateus, cobrador de impostos e apóstolo",
    quando: "Entre 50 e 80 d.C.",
    publico: "Cristãos de origem judaica",
    genero: "Evangelho",
    contexto:
      "Escrito para quem conhecia as Escrituras hebraicas, Mateus prova o tempo todo que Jesus é o Messias prometido, e cita o Antigo Testamento mais de sessenta vezes. Organiza o ensino em cinco grandes blocos, ecoando os cinco livros de Moisés, e abre com o Sermão do Monte, o texto mais conhecido e menos praticado da história.",
    temas: ["Messias prometido", "Reino dos céus", "Justiça", "Discipulado"],
    chave: { c: 28, v: 19 },
  },
  mc: {
    autor: "João Marcos, provavelmente registrando a pregação de Pedro",
    quando: "Cerca de 65–70 d.C., o primeiro evangelho escrito",
    publico: "Cristãos em Roma, sob perseguição",
    genero: "Evangelho",
    contexto:
      "O mais curto e o mais rápido: a palavra 'imediatamente' aparece dezenas de vezes. Sem genealogia, sem infância, começa com Jesus adulto e já em movimento. Escrito provavelmente durante a perseguição de Nero, insiste num Messias que sofre e serve, o que era exatamente o que aqueles leitores precisavam ouvir.",
    temas: ["Ação", "Serviço", "Segredo messiânico", "Cruz"],
    chave: { c: 10, v: 45 },
  },
  lc: {
    autor: "Lucas, médico e companheiro de Paulo",
    quando: "Entre 60 e 85 d.C.",
    publico: "Teófilo e leitores de cultura grega",
    genero: "Evangelho com método historiográfico",
    contexto:
      "O único autor não judeu da Bíblia abre dizendo que investigou tudo com cuidado, como um historiador. É o evangelho dos que ficavam de fora: mulheres, samaritanos, leprosos, pobres, criminosos. As parábolas mais famosas, o bom samaritano, o filho pródigo, só existem aqui. Escreveu também Atos, como segundo volume.",
    temas: ["Compaixão", "Marginalizados", "Oração", "Alegria"],
    chave: { c: 19, v: 10 },
  },
  jo: {
    autor: "João, o discípulo amado",
    quando: "Entre 85 e 95 d.C., o último evangelho",
    publico: "Igrejas já maduras, em contexto greco-romano",
    genero: "Evangelho teológico",
    contexto:
      "Noventa por cento do conteúdo não aparece nos outros três. João não está contando o que aconteceu, está explicando quem Jesus é: começa antes da criação, organiza o livro em sete sinais e sete declarações de 'Eu sou', e diz no final exatamente por que escreveu. É o evangelho mais recomendado para quem nunca leu a Bíblia, e o mais profundo para quem já leu tudo.",
    temas: ["Encarnação", "Vida eterna", "Luz e trevas", "Amor"],
    chave: { c: 3, v: 16 },
  },
  at: {
    autor: "Lucas",
    quando: "Entre 62 e 85 d.C.",
    publico: "Teófilo e a igreja em expansão",
    genero: "História da igreja primitiva",
    contexto:
      "Segundo volume de Lucas, cobrindo trinta anos em que um grupo assustado de galileus vira um movimento espalhado por todo o Mediterrâneo. Pentecostes, a primeira perseguição, a conversão de Paulo, o conflito sobre aceitar não judeus sem exigir a lei, tudo está aqui. O livro termina sem conclusão, com Paulo preso em Roma, ainda pregando.",
    temas: ["Espírito Santo", "Missão", "Perseguição", "Igreja multiétnica"],
    chave: { c: 1, v: 8 },
  },
  rm: {
    autor: "Paulo",
    quando: "Cerca de 57 d.C., escrita de Corinto",
    publico: "A igreja de Roma, que ele ainda não conhecia",
    genero: "Carta doutrinária",
    contexto:
      "A carta mais sistemática de Paulo, escrita para uma igreja que ele nunca tinha visitado, apresentando o evangelho de ponta a ponta antes de pedir apoio para ir à Espanha. Argumenta que judeus e não judeus estão no mesmo barco: todos falharam, todos são aceitos pela mesma graça. Foi o texto que disparou a Reforma Protestante.",
    temas: ["Graça", "Fé", "Justificação", "Vida no Espírito"],
    chave: { c: 8, v: 28 },
  },
  "1co": {
    autor: "Paulo",
    quando: "Cerca de 55 d.C., escrita de Éfeso",
    publico: "A igreja de Corinto, cidade portuária e caótica",
    genero: "Carta pastoral de correção",
    contexto:
      "Corinto era rica, cosmopolita e moralmente solta, e a igreja de lá tinha absolutamente todos os problemas possíveis: divisão em facções, processos judiciais entre irmãos, imoralidade, bagunça na ceia e disputa por dons espirituais. Paulo responde ponto a ponto, e no meio da bronca escreve o capítulo 13, o texto sobre o amor mais lido em casamentos.",
    temas: ["Unidade", "Liberdade e limite", "Dons espirituais", "Amor"],
    chave: { c: 13, v: 4 },
  },
  "2co": {
    autor: "Paulo",
    quando: "Cerca de 56 d.C.",
    publico: "A mesma igreja, depois de um conflito duro",
    genero: "Carta pessoal e defesa ministerial",
    contexto:
      "A mais emocional das cartas de Paulo. Falsos mestres estavam minando a autoridade dele em Corinto, e ele responde fazendo o contrário do esperado: em vez de listar credenciais, lista fracassos, prisões, açoites e naufrágios. O argumento é que a força de Deus aparece justamente onde a pessoa é fraca.",
    temas: ["Fraqueza", "Consolo", "Generosidade", "Reconciliação"],
    chave: { c: 12, v: 9 },
  },
  gl: {
    autor: "Paulo",
    quando: "Entre 48 e 55 d.C., possivelmente sua carta mais antiga",
    publico: "Igrejas da região da Galácia",
    genero: "Carta de confronto",
    contexto:
      "A carta mais irritada de Paulo, é a única em que ele não agradece nada no começo. Mestres tinham convencido os gálatas de que, para ser cristão de verdade, era preciso adotar a lei judaica. Paulo responde que isso anula o evangelho inteiro. Se depende de mérito, não é graça; e se não é graça, Cristo morreu à toa.",
    temas: ["Liberdade", "Graça contra lei", "Fruto do Espírito", "Identidade"],
    chave: { c: 5, v: 1 },
  },
  ef: {
    autor: "Paulo, escrevendo da prisão",
    quando: "Cerca de 60–62 d.C.",
    publico: "Éfeso e igrejas vizinhas da Ásia Menor",
    genero: "Carta circular",
    contexto:
      "Dividida ao meio com precisão: três capítulos sobre quem você é em Cristo, três sobre como isso muda o dia a dia: casamento, trabalho, família, conflito. O tema que costura tudo é a reconciliação: judeus e gentios viram um povo só, com o muro de separação derrubado. Termina com a imagem da armadura de Deus.",
    temas: ["Identidade", "Unidade", "Igreja", "Batalha espiritual"],
    chave: { c: 2, v: 8 },
  },
  fp: {
    autor: "Paulo, preso",
    quando: "Cerca de 61 d.C.",
    publico: "A igreja de Filipos, sua parceira mais fiel",
    genero: "Carta de amizade e agradecimento",
    contexto:
      "Escrita acorrentado, é a carta mais alegre do Novo Testamento, a palavra 'alegria' aparece dezesseis vezes. Paulo agradece uma doação, conta que a prisão acabou ajudando o evangelho a circular, e inclui um hino antiquíssimo sobre Cristo que se esvaziou da própria glória. Também é onde ele diz ter aprendido a viver com muito e com pouco.",
    temas: ["Alegria", "Contentamento", "Humildade", "Parceria"],
    chave: { c: 4, v: 6 },
  },
  cl: {
    autor: "Paulo, preso",
    quando: "Cerca de 60–62 d.C.",
    publico: "A igreja de Colossos, que ele não fundou",
    genero: "Carta polêmica",
    contexto:
      "Uma mistura de misticismo, ascetismo e culto a anjos estava convencendo os colossenses de que Jesus era um bom começo, mas faltava algo a mais. Paulo responde com a declaração mais alta sobre Cristo em todo o Novo Testamento: nele habita toda a plenitude, ele criou tudo e sustenta tudo. Não falta nada.",
    temas: ["Supremacia de Cristo", "Suficiência", "Vida nova", "Falsos acréscimos"],
    chave: { c: 1, v: 17 },
  },
  "1ts": {
    autor: "Paulo",
    quando: "Cerca de 50 d.C., uma das cartas mais antigas",
    publico: "Cristãos novos em Tessalônica",
    genero: "Carta de encorajamento",
    contexto:
      "Paulo ficou poucas semanas em Tessalônica antes de ser expulso da cidade, e escreveu preocupado se aquela igreja recém-nascida teria sobrevivido. Descobriu que sim. A carta responde a uma angústia específica: o que acontece com os cristãos que morrem antes da volta de Jesus?",
    temas: ["Esperança", "Volta de Cristo", "Luto", "Vida simples"],
    chave: { c: 4, v: 13 },
  },
  "2ts": {
    autor: "Paulo",
    quando: "Cerca de 51 d.C.",
    publico: "A mesma igreja, meses depois",
    genero: "Carta corretiva",
    contexto:
      "A primeira carta gerou um efeito colateral: alguns concluíram que o fim já tinha chegado e largaram o emprego. Paulo corrige a cronologia e manda todo mundo voltar a trabalhar, com uma frase que virou provérbio: quem não quer trabalhar, também não coma.",
    temas: ["Fim dos tempos", "Perseverança", "Trabalho", "Disciplina"],
    chave: { c: 3, v: 13 },
  },
  "1tm": {
    autor: "Paulo",
    quando: "Cerca de 62–64 d.C.",
    publico: "Timóteo, jovem líder em Éfeso",
    genero: "Carta pastoral",
    contexto:
      "Paulo deixou Timóteo encarregado de uma igreja difícil e escreve orientando sobre falsos mestres, escolha de líderes, cuidado com viúvas e uso do dinheiro. Timóteo era novo e inseguro, e a carta tem o tom de um mentor que acredita mais no discípulo do que o discípulo em si mesmo.",
    temas: ["Liderança", "Doutrina sã", "Dinheiro", "Juventude"],
    chave: { c: 4, v: 12 },
  },
  "2tm": {
    autor: "Paulo",
    quando: "Cerca de 64–67 d.C.",
    publico: "Timóteo, novamente",
    genero: "Carta de despedida",
    contexto:
      "As últimas palavras conhecidas de Paulo, escritas de uma prisão romana sabendo que a execução vinha. Ele pede um casaco, alguns livros, e que Timóteo venha antes do inverno. Entre os pedidos pessoais está o encargo final: guarde o que te foi confiado e passe adiante. Morreu pouco depois.",
    temas: ["Fidelidade até o fim", "Escritura", "Sofrimento", "Legado"],
    chave: { c: 4, v: 7 },
  },
  tt: {
    autor: "Paulo",
    quando: "Cerca de 63–65 d.C.",
    publico: "Tito, encarregado das igrejas em Creta",
    genero: "Carta pastoral",
    contexto:
      "Creta tinha má fama até entre os cretenses, e Tito ficou com a missão de organizar igrejas do zero numa ilha inteira. A carta é um manual enxuto: escolha líderes por caráter, não por carisma, e ensine cada grupo etário a viver de um jeito que torne o evangelho crível para quem está de fora.",
    temas: ["Caráter", "Boas obras", "Ensino prático", "Credibilidade"],
    chave: { c: 2, v: 11 },
  },
  fm: {
    autor: "Paulo, preso",
    quando: "Cerca de 60–62 d.C.",
    publico: "Filemom, dono de escravos e líder de igreja",
    genero: "Bilhete pessoal",
    contexto:
      "Vinte e cinco versículos, o texto mais curto de Paulo. Onésimo era escravo de Filemom, fugiu, encontrou Paulo na prisão e se converteu. Paulo o manda de volta com um pedido delicadíssimo: receba-o não como escravo, mas como irmão. E se ele te deve algo, põe na minha conta.",
    temas: ["Perdão", "Reconciliação", "Dignidade", "Amizade"],
    chave: { c: 1, v: 16 },
  },
  hb: {
    autor: "Desconhecido; o mais debatido do Novo Testamento",
    quando: "Antes de 70 d.C.",
    publico: "Cristãos judeus tentados a voltar atrás",
    genero: "Sermão em forma de carta",
    contexto:
      "Escrito para gente que estava considerando abandonar a fé cristã e voltar ao judaísmo, provavelmente por causa da perseguição. O argumento é um só, repetido de todas as formas: Jesus é superior. Superior aos anjos, a Moisés, aos sacerdotes, aos sacrifícios. O capítulo 11 lista os que creram sem ver o cumprimento.",
    temas: ["Superioridade de Cristo", "Fé", "Perseverança", "Novo sacerdócio"],
    chave: { c: 11, v: 1 },
  },
  tg: {
    autor: "Tiago, irmão de Jesus e líder da igreja de Jerusalém",
    quando: "Entre 45 e 50 d.C., possivelmente o livro mais antigo do NT",
    publico: "Cristãos judeus dispersos pela perseguição",
    genero: "Literatura sapiencial cristã",
    contexto:
      "Parece Provérbios escrito por um cristão: frases curtas, diretas, sem rodeio teológico. Tiago cresceu com Jesus, não acreditou nele durante a vida dele, e depois virou líder da igreja em Jerusalém. Escreve sobre parcialidade com ricos, controle da língua e a fé que não muda nada na prática, a qual, segundo ele, está morta.",
    temas: ["Fé e obras", "Língua", "Pobres e ricos", "Provações"],
    chave: { c: 2, v: 17 },
  },
  "1pe": {
    autor: "Pedro",
    quando: "Cerca de 62–64 d.C.",
    publico: "Cristãos perseguidos na Ásia Menor",
    genero: "Carta circular de encorajamento",
    contexto:
      "Escrita às vésperas da perseguição de Nero, para cristãos que estavam perdendo emprego, família e segurança por causa da fé. Pedro os chama de estrangeiros e peregrinos, e o conselho não é revidar nem se esconder: é viver tão bem que a acusação não se sustente. Ele mesmo seria executado pouco depois.",
    temas: ["Sofrimento justo", "Esperança viva", "Identidade", "Submissão"],
    chave: { c: 5, v: 7 },
  },
  "2pe": {
    autor: "Pedro",
    quando: "Cerca de 65–68 d.C.",
    publico: "As mesmas igrejas, agora ameaçadas por dentro",
    genero: "Carta de alerta",
    contexto:
      "Se a primeira carta trata da ameaça de fora, esta trata da de dentro: mestres que ganham dinheiro com a fé alheia e zombam da promessa da volta de Cristo. Pedro escreve sabendo que vai morrer em breve e apela para o que viu com os próprios olhos no monte da Transfiguração.",
    temas: ["Falsos mestres", "Crescimento", "Volta de Cristo", "Testemunho ocular"],
    chave: { c: 3, v: 9 },
  },
  "1jo": {
    autor: "João, o discípulo amado",
    quando: "Entre 85 e 95 d.C.",
    publico: "Igrejas fraturadas por uma divisão recente",
    genero: "Carta pastoral",
    contexto:
      "Um grupo tinha saído da igreja alegando conhecimento espiritual superior e negando que Jesus tivesse vindo em carne de verdade. João escreve para quem ficou, e o assunto é segurança: como saber que você realmente conhece a Deus. Ele dá três testes: crer certo, viver certo e amar de verdade.",
    temas: ["Certeza da fé", "Amor concreto", "Luz e trevas", "Verdade"],
    chave: { c: 4, v: 19 },
  },
  "2jo": {
    autor: "João, que se apresenta como 'o ancião'",
    quando: "Entre 85 e 95 d.C.",
    publico: "'A senhora eleita', provavelmente uma igreja local",
    genero: "Bilhete",
    contexto:
      "Treze versículos sobre um dilema prático da época: mestres itinerantes dependiam da hospitalidade das igrejas, e alguns espalhavam erro. João pede que continuem amando, mas sem bancar a hospedagem de quem nega o essencial. Hospitalidade não é ingenuidade.",
    temas: ["Verdade e amor", "Hospitalidade", "Discernimento"],
    chave: { c: 1, v: 6 },
  },
  "3jo": {
    autor: "João, 'o ancião'",
    quando: "Entre 85 e 95 d.C.",
    publico: "Gaio, um cristão hospitaleiro",
    genero: "Bilhete pessoal",
    contexto:
      "O avesso da carta anterior. Três personagens: Gaio, que recebe bem os missionários; Diótrefes, que gosta de mandar e expulsa quem discorda; e Demétrio, bem falado por todos. É a prova de que conflito de ego em igreja não é invenção moderna.",
    temas: ["Hospitalidade", "Ambição por poder", "Bom testemunho"],
    chave: { c: 1, v: 11 },
  },
  jd: {
    autor: "Judas, irmão de Tiago e de Jesus",
    quando: "Entre 65 e 80 d.C.",
    publico: "Uma igreja infiltrada por falsos mestres",
    genero: "Alerta urgente",
    contexto:
      "Judas diz no começo que queria escrever sobre outra coisa, mas mudou de assunto por urgência: pessoas tinham se infiltrado na comunidade transformando a graça em licença para fazer o que quisessem. Vinte e cinco versículos de advertência dura que terminam numa das bênçãos mais bonitas da Bíblia.",
    temas: ["Contender pela fé", "Infiltração", "Graça barata", "Guarda de Deus"],
    chave: { c: 1, v: 24 },
  },
  ap: {
    autor: "João, exilado na ilha de Patmos",
    quando: "Cerca de 95 d.C., sob Domiciano",
    publico: "Sete igrejas reais da Ásia Menor, sob pressão imperial",
    genero: "Apocalipse, profecia e carta",
    contexto:
      "Escrito em código para cristãos perseguidos por um império que exigia culto ao imperador. O gênero apocalíptico usava imagens e números simbólicos justamente para falar do poder sem ser preso por isso: a besta é Roma antes de ser qualquer outra coisa. Começa com sete cartas bem concretas e termina com a única resposta que importa: um céu novo, uma terra nova e nenhuma lágrima.",
    temas: ["Perseverança", "Soberania de Deus", "Juízo", "Nova criação"],
    chave: { c: 21, v: 4 },
  },
};
