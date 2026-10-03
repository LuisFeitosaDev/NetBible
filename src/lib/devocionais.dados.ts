/**
 * O conteúdo dos devocionais. Os tipos e as regras ficam em `devocionais.ts`.
 *
 * Critérios de escrita, os mesmos dos estudos do app: linguagem direta, sem
 * jargão de igreja; o texto bíblico lido no contexto dele; nada de vender
 * interpretação discutida como consenso; e a aplicação sempre separada do que
 * o texto diz. As referências são conferidas contra o índice da Bíblia por
 * `scripts/conferir-devocionais.mjs`.
 */
import type { Devocional } from "./devocionais";

export const DEVOCIONAIS: Devocional[] = [
  /* =================================================== PARA O CORAÇÃO === */
  {
    id: "paz-na-ansiedade",
    titulo: "Paz na ansiedade",
    chamada: "Sete dias para entregar o que pesa",
    descricao:
      "A Bíblia não trata a ansiedade como falta de fé, nem promete uma vida sem tempestade. Ela mostra um Deus que convida a gente a trazer o peso até ele. Em sete dias, textos curtos para aprender a soltar o controle, um pouco por vez.",
    categoria: "coracao",
    capa: { slug: "mc", capitulo: 4 },
    cor: "#4f86b8",
    dias: [
      {
        titulo: "Lance sobre ele",
        leitura: { slug: "1pe", capitulo: 5, de: 6, ate: 7 },
        reflexao: [
          "Pedro escreve para cristãos espalhados e pressionados, gente com motivo real para se preocupar. E o conselho dele não é \"pare de sentir\". É \"lance\": um verbo de quem tira um fardo das costas e o joga em outro lugar.",
          "O motivo vem no fim do versículo: ele tem cuidado de vós. A entrega não depende de você já estar em paz. Ela começa justamente quando você ainda não está, e decide confiar que alguém maior está olhando.",
        ],
        pergunta: "O que você está carregando hoje que não cabe nas suas mãos?",
        oracao:
          "Deus, eu entrego o que me tira o sono. Não sei resolver tudo, mas sei que tu cuidas de mim. Ajuda-me a não pegar de volta o que deixei contigo.",
        pratica:
          "Escreva num papel a preocupação que mais pesa hoje. Ore por ela uma vez e, quando ela voltar à mente, lembre-se: já está entregue.",
      },
      {
        titulo: "Os lírios do campo",
        leitura: { slug: "mt", capitulo: 6, de: 25, ate: 34 },
        reflexao: [
          "Jesus fala para gente simples, que se preocupava com comida e roupa de verdade. Ele não diz que essas coisas não importam: diz que o Pai sabe que precisamos delas. A ansiedade, aqui, é tentar carregar o amanhã inteiro hoje.",
          "\"Basta a cada dia o seu mal.\" Não é um convite à irresponsabilidade, é um limite saudável. Deus dá graça para o dia de hoje. A de amanhã chega amanhã.",
        ],
        pergunta: "Que parte do seu amanhã você tem tentado viver antes da hora?",
        oracao:
          "Pai, tu alimentas as aves e vestes os lírios. Ensina-me a buscar primeiro o teu Reino e a confiar que o resto tu conheces.",
        pratica:
          "Hoje, quando a cabeça correr para o futuro, traga-a de volta perguntando: o que eu preciso fazer só hoje?",
      },
      {
        titulo: "Orar em vez de remoer",
        leitura: { slug: "fp", capitulo: 4, de: 4, ate: 7 },
        reflexao: [
          "Paulo escreveu essas palavras preso, sem saber se sairia vivo. Mesmo assim fala de alegria e de não andar ansioso. O segredo não é a circunstância: é trocar o remoer pela oração, \"com ações de graças\".",
          "Repare que a promessa não é que tudo será resolvido como você quer. É que a paz de Deus vai guardar o seu coração e a sua mente, como um soldado guarda uma porta. A paz vem antes da resposta.",
        ],
        pergunta: "Você tem levado a Deus os seus pedidos ou só as suas preocupações?",
        oracao:
          "Senhor, aqui estão os meus pedidos, e também a minha gratidão pelo que já fizeste. Guarda o meu coração com a tua paz.",
        pratica:
          "Antes de dormir, faça uma oração com três agradecimentos e um pedido específico.",
      },
      {
        titulo: "Uma paz diferente",
        leitura: { slug: "jo", capitulo: 14, de: 25, ate: 27 },
        reflexao: [
          "Jesus diz isso na noite em que seria preso. Os discípulos estão assustados, e ele não muda a situação: deixa a sua paz. Não a paz que o mundo dá, que depende de tudo estar calmo, mas uma paz que convive com a tempestade.",
          "Ele também promete o Espírito Santo, que ensinaria e lembraria. Você não precisa lembrar de tudo sozinho nem segurar a fé na força do braço. Há alguém que te lembra de quem Deus é.",
        ],
        pergunta: "Em que área você espera o problema sumir para só então ter paz?",
        oracao:
          "Jesus, eu recebo a tua paz, mesmo sem entender tudo. Não deixe o meu coração se perturbar nem se acovardar.",
        pratica:
          "Repita o versículo 27 em voz baixa três vezes ao longo do dia, especialmente num momento de tensão.",
      },
      {
        titulo: "Jesus no barco",
        leitura: { slug: "mc", capitulo: 4, de: 35, ate: 41 },
        reflexao: [
          "Foi Jesus quem mandou atravessar o lago. Ou seja: a tempestade veio no meio da obediência, não por causa da desobediência. E ele dormia, o que para os discípulos pareceu descaso: \"não se te dá que pereçamos?\"",
          "A tempestade obedece à palavra dele. Mas a pergunta mais forte é a do final: \"Quem, porventura, é este?\" A paz não vem de entender a tempestade, e sim de saber quem está no barco com você.",
        ],
        pergunta: "Você já sentiu que Deus estava dormindo no meio da sua tempestade?",
        oracao:
          "Senhor, às vezes parece que tu não te importas. Mas tu estás no barco. Fala às minhas tempestades e acalma o meu medo.",
        pratica:
          "Conte a alguém de confiança uma tempestade pela qual você está passando, e peçam juntos que Deus traga calma.",
      },
      {
        titulo: "Uma mente firme",
        leitura: { slug: "is", capitulo: 26, de: 3, ate: 4 },
        reflexao: [
          "Isaías escreve um cântico para um povo que viveu invasão e exílio. No hebraico, a promessa é literalmente \"paz, paz\": uma paz completa, para quem tem a mente firme em Deus.",
          "A mente ansiosa pula de um medo para outro. A mente firme volta, de novo e de novo, para o mesmo apoio: Deus é a rocha eterna. Não é ter pensamentos perfeitos, é saber para onde voltar.",
        ],
        pergunta: "Para onde a sua mente costuma voltar quando você está com medo?",
        oracao:
          "Deus, tu és a rocha que não se move. Firma a minha mente em ti quando tudo em volta balança.",
        pratica:
          "Escolha uma frase curta sobre quem Deus é (\"Tu és a minha rocha\") e use-a como âncora sempre que a ansiedade subir.",
      },
      {
        titulo: "Aquietai-vos",
        leitura: { slug: "sl", capitulo: 46, de: 1, ate: 11 },
        reflexao: [
          "O salmo descreve o pior cenário possível: terra mudando, montes caindo no mar. E repete: \"não temeremos\". Não porque o caos é pequeno, mas porque Deus é \"socorro bem presente\", presente agora.",
          "\"Aquietai-vos e sabei que eu sou Deus\" é, no contexto, quase uma ordem: parem de lutar, larguem as armas. É o convite para encerrar estes sete dias: parar de tentar controlar e descansar em quem já está no controle.",
        ],
        pergunta: "Como seria parar de lutar por controle em uma área da sua vida?",
        oracao:
          "Deus, eu paro. Tu és o meu refúgio e a minha fortaleza. Ensina-me a ficar quieto e a saber que tu és Deus.",
        pratica:
          "Separe cinco minutos de silêncio hoje, sem celular. Só respire e lembre: Ele é Deus, e eu não preciso ser.",
      },
    ],
  },

  {
    id: "salmos-dias-dificeis",
    titulo: "Salmos para dias difíceis",
    chamada: "Dez orações honestas para quando dói",
    descricao:
      "Os Salmos são o livro de oração da Bíblia, e uma boa parte deles é queixa, choro e pergunta. Eles mostram que dá para levar a Deus a dor sem enfeite. Dez salmos para atravessar dias pesados, um por dia.",
    categoria: "coracao",
    capa: { slug: "sl", capitulo: 23 },
    cor: "#6f9a6b",
    dias: [
      {
        titulo: "Até quando?",
        leitura: { slug: "sl", capitulo: 13, de: 1, ate: 6 },
        reflexao: [
          "Davi pergunta \"até quando?\" quatro vezes seguidas. Ele se sente esquecido por Deus, e diz isso. A Bíblia não esconde esse tipo de oração: ela a guarda, para nós aprendermos que podemos fazer o mesmo.",
          "Repare na virada do versículo 5: \"Mas eu confio na tua benignidade\". A situação não mudou entre o começo e o fim. O que mudou foi para onde Davi olhou. A fé não nega a dor, ela fala com Deus no meio dela.",
        ],
        pergunta: "Que \"até quando\" você ainda não teve coragem de dizer a Deus?",
        oracao:
          "Senhor, às vezes parece que tu te esqueceste de mim. Mesmo assim, eu escolho confiar na tua bondade.",
        pratica: "Escreva sua própria oração de \"até quando\", e termine com uma frase de confiança.",
      },
      {
        titulo: "O Senhor é o meu pastor",
        leitura: { slug: "sl", capitulo: 23, de: 1, ate: 6 },
        reflexao: [
          "O salmo mais conhecido da Bíblia não fala de uma vida sem vale. Ele diz \"ainda que eu ande pelo vale da sombra da morte\". O vale está no caminho, e o pastor também.",
          "Repare que, no vale, Davi deixa de falar sobre Deus e passa a falar com ele: \"tu estás comigo\". Nos dias difíceis, a fé fica mais pessoal. Não é teoria, é presença.",
        ],
        pergunta: "Em qual vale você precisa lembrar que não está sozinho?",
        oracao: "Pastor, conduz-me pelo vale. Eu não temerei mal nenhum, porque tu estás comigo.",
        pratica: "Leia o salmo devagar, trocando \"meu\" e \"me\" pelo seu nome.",
      },
      {
        titulo: "A quem temerei?",
        leitura: { slug: "sl", capitulo: 27, de: 1, ate: 5 },
        reflexao: [
          "Davi tinha inimigos de verdade, gente que queria a vida dele. Mesmo assim, começa com duas perguntas: a quem temerei? de quem me recearei? O medo existe, mas não tem a última palavra.",
          "No meio do salmo, ele pede uma coisa só: estar perto de Deus. Quando tudo está em guerra, o maior desejo dele não é vencer, é morar na presença do Senhor.",
        ],
        pergunta: "Se você pudesse pedir uma única coisa a Deus hoje, qual seria?",
        oracao: "Senhor, tu és a minha luz e a minha salvação. Esconde-me no teu abrigo no dia mau.",
        pratica: "Faça hoje uma oração de um pedido só, como Davi no versículo 4.",
      },
      {
        titulo: "Perto do coração quebrado",
        leitura: { slug: "sl", capitulo: 34, de: 15, ate: 19 },
        reflexao: [
          "\"Perto está o Senhor dos que têm o coração quebrantado.\" Deus não se afasta de quem está despedaçado. Ele chega mais perto.",
          "O versículo 19 é honesto: \"muitas são as aflições do justo\". Seguir a Deus não blinda ninguém do sofrimento. A promessa é outra: ele livra, e não deixa que a aflição tenha a palavra final.",
        ],
        pergunta: "Você acredita que Deus está perto de você justamente agora?",
        oracao: "Deus, meu coração está quebrado. Chega perto, como prometeste, e salva o meu espírito abatido.",
        pratica: "Mande uma mensagem a alguém que está sofrendo, só para dizer que você lembrou dela.",
      },
      {
        titulo: "Por que estás abatida, ó minha alma?",
        leitura: { slug: "sl", capitulo: 42, de: 1, ate: 5 },
        reflexao: [
          "O salmista está longe de casa, chorando dia e noite, ouvindo gente perguntar \"onde está o teu Deus?\". É um retrato honesto do que hoje chamaríamos de tristeza profunda.",
          "E ele faz algo interessante: conversa com a própria alma. \"Por que estás abatida, ó minha alma?\" E responde: \"Espera em Deus.\" Às vezes, em vez de ouvir a tristeza, precisamos falar com ela e lembrá-la de quem Deus é.",
        ],
        pergunta: "O que você diria hoje à sua própria alma?",
        oracao: "Minha alma tem sede de ti, Deus vivo. Mesmo abatido, eu ainda vou te louvar.",
        pratica: "Escreva uma frase de esperança para você mesmo e deixe onde vai ver amanhã cedo.",
      },
      {
        titulo: "À sombra do Altíssimo",
        leitura: { slug: "sl", capitulo: 91, de: 1, ate: 4 },
        reflexao: [
          "O salmo usa imagens de abrigo: esconderijo, sombra, refúgio, fortaleza, as asas de uma ave cobrindo os filhotes. Não é uma promessa de que nada vai acontecer, e sim de que há um lugar seguro onde ficar.",
          "\"Habitar\" e \"descansar\" são verbos de permanência. Não é visitar Deus na crise e ir embora depois: é fazer dele o lugar onde a gente mora.",
        ],
        pergunta: "Onde você costuma se esconder quando tem medo?",
        oracao: "Senhor, tu és o meu refúgio. Cobre-me com as tuas asas e deixa-me descansar à tua sombra.",
        pratica: "Antes de dormir, ore o versículo 2 com as suas palavras.",
      },
      {
        titulo: "De onde vem o socorro",
        leitura: { slug: "sl", capitulo: 121, de: 1, ate: 8 },
        reflexao: [
          "Este é um cântico de peregrinos subindo para Jerusalém. Os montes podiam ser bonitos, mas também perigosos: esconderijo de ladrões. A pergunta \"de onde me vem o socorro?\" era bem prática.",
          "A resposta aponta para cima dos montes: para quem os fez. E o salmo repete a palavra \"guarda\" seis vezes. Deus não cochila, nem de dia nem de noite.",
        ],
        pergunta: "De onde você tem esperado o socorro ultimamente?",
        oracao: "O meu socorro vem de ti, Senhor. Guarda a minha entrada e a minha saída, hoje e sempre.",
        pratica: "Ao sair de casa hoje, ore o versículo 8.",
      },
      {
        titulo: "Não há para onde fugir",
        leitura: { slug: "sl", capitulo: 139, de: 1, ate: 12 },
        reflexao: [
          "Deus conhece cada passo, cada palavra antes de ser dita. Para quem está fugindo, isso assusta. Para quem está sozinho, isso consola.",
          "\"Nem ainda as trevas são escuras para ti.\" Não existe noite escura demais para Deus. O lugar mais escuro em que você estiver, ele já está lá.",
        ],
        pergunta: "Isso de ser plenamente conhecido por Deus te assusta ou te consola?",
        oracao: "Senhor, tu me conheces por inteiro. Obrigado por estares comigo até nas minhas trevas.",
        pratica: "Ore hoje sobre algo que você costuma esconder de todo mundo. Ele já sabe.",
      },
      {
        titulo: "Das profundezas",
        leitura: { slug: "sl", capitulo: 130, de: 1, ate: 6 },
        reflexao: [
          "\"Das profundezas clamo a ti.\" O salmista está no fundo do poço, e parte do peso é a culpa. Ele sabe que, se Deus contasse cada falha, ninguém ficaria de pé.",
          "Mas \"contigo está o perdão\". E então ele espera, como a sentinela espera a manhã: com a certeza de que ela vem, mesmo sem saber a hora.",
        ],
        pergunta: "Que parte do seu peso de hoje é culpa que você ainda não entregou?",
        oracao: "Senhor, das profundezas eu clamo. Contigo está o perdão. Eu espero em ti como quem espera o amanhecer.",
        pratica: "Acorde amanhã e, ao ver a luz do dia, lembre: a manhã sempre vem.",
      },
      {
        titulo: "Esperei com paciência",
        leitura: { slug: "sl", capitulo: 40, de: 1, ate: 3 },
        reflexao: [
          "Davi esperou, e Deus se inclinou para ouvir. A imagem é de alguém preso na lama de um poço, sem conseguir sair sozinho. Deus tirou, firmou os pés numa rocha e pôs um cântico novo na boca dele.",
          "Para fechar estes dez dias: a espera não é perdida. O salmista conta a história depois, para que outros vejam e confiem. A sua história de hoje ainda pode virar o cântico de amanhã.",
        ],
        pergunta: "De que lama Deus já te tirou, e para quem você poderia contar isso?",
        oracao: "Senhor, eu espero em ti. Tira-me da lama, firma os meus pés e põe na minha boca um cântico novo.",
        pratica: "Conte a alguém, hoje, uma vez em que Deus te ajudou num tempo difícil.",
      },
    ],
  },

  {
    id: "esperanca-no-sofrimento",
    titulo: "Esperança no sofrimento",
    chamada: "Quando a dor não tem resposta pronta",
    descricao:
      "A Bíblia não explica todo sofrimento, e também não pede que a gente finja que não dói. Ela mostra pessoas que choraram, perguntaram e continuaram crendo. Sete dias sobre como manter a esperança quando a vida machuca.",
    categoria: "coracao",
    capa: { slug: "ap", capitulo: 21 },
    cor: "#6e88a8",
    dias: [
      {
        titulo: "Mesmo assim, adorou",
        leitura: { slug: "job", capitulo: 1, de: 20, ate: 22 },
        reflexao: [
          "Jó perdeu bens, empregados e filhos num único dia. A reação dele mistura luto e fé: rasga a roupa, raspa a cabeça, cai no chão e adora. Uma coisa não anula a outra.",
          "O livro de Jó não dá uma explicação simples para a dor dele, e os amigos que tentaram explicar foram corrigidos por Deus no fim. Às vezes, a maior sabedoria diante do sofrimento é chorar e adorar ao mesmo tempo.",
        ],
        pergunta: "Você acha que pode adorar a Deus e chorar ao mesmo tempo?",
        oracao: "Senhor, eu não entendo tudo o que está acontecendo. Mas eu ainda escolho bendizer o teu nome.",
        pratica: "Se você está de luto por algo, dê nome a essa perda em oração, sem pressa de superar.",
      },
      {
        titulo: "Jesus chorou",
        leitura: { slug: "jo", capitulo: 11, de: 32, ate: 36 },
        reflexao: [
          "Jesus sabia que ia ressuscitar Lázaro poucos minutos depois. Mesmo assim, chorou. Ele não tratou a dor de Maria como exagero nem apressou o luto dela.",
          "Isso diz muito sobre Deus: ele não olha a nossa dor de longe. Ele se comove, se aproxima, chora junto. A esperança da ressurreição não apaga a lágrima de hoje.",
        ],
        pergunta: "O que muda saber que Jesus chora com você?",
        oracao: "Jesus, tu choraste com quem sofria. Obrigado por não desprezares a minha dor.",
        pratica: "Esteja presente hoje para alguém que está sofrendo, sem tentar consertar nada.",
      },
      {
        titulo: "A tribulação que forma",
        leitura: { slug: "rm", capitulo: 5, de: 1, ate: 5 },
        reflexao: [
          "Paulo fala em gloriar-se nas tribulações, o que soa estranho. Mas ele não está dizendo que a dor é boa. Está dizendo que Deus não desperdiça a dor: ela produz perseverança, que produz caráter, que produz esperança.",
          "E essa esperança \"não desaponta\", porque o amor de Deus já foi derramado no coração. A esperança cristã não é otimismo: é a certeza de um amor que já chegou.",
        ],
        pergunta: "O que o sofrimento já formou em você que talvez não existisse sem ele?",
        oracao: "Deus, não deixes que a minha dor seja em vão. Forma em mim perseverança, caráter e esperança.",
        pratica: "Escreva uma lição que um tempo difícil do passado te ensinou.",
      },
      {
        titulo: "A glória que vem",
        leitura: { slug: "rm", capitulo: 8, de: 18, ate: 25 },
        reflexao: [
          "Paulo compara o sofrimento de agora com a glória que vem, e diz que nem dá para comparar. Mas repare: ele não diminui o sofrimento. Ele fala de uma criação inteira que geme, e de nós que gememos junto.",
          "O gemido é a linguagem de quem espera algo que ainda não chegou. Não é falta de fé gemer. É reconhecer que o mundo ainda não é como deveria, e esperar com paciência pelo que Deus prometeu.",
        ],
        pergunta: "O que você está esperando que Deus ainda vai consertar?",
        oracao: "Senhor, nós gememos esperando a redenção. Dá-me paciência para esperar o que ainda não vejo.",
        pratica: "Ore hoje por uma situação no mundo que te causa dor, e não só pela sua.",
      },
      {
        titulo: "Leve e momentânea",
        leitura: { slug: "2co", capitulo: 4, de: 16, ate: 18 },
        reflexao: [
          "Quem chama a tribulação de \"leve e momentânea\" é alguém que foi açoitado, preso e naufragou. Paulo não fala de um sofrimento pequeno. Fala de um peso de glória tão grande que até ele parece leve.",
          "O segredo está no versículo 18: olhar para o que não se vê. O exterior se desgasta, mas o interior pode se renovar dia a dia.",
        ],
        pergunta: "Para onde você tem olhado mais: para o que se vê ou para o que não se vê?",
        oracao: "Deus, renova o meu interior dia após dia. Ensina-me a enxergar o eterno no meio do passageiro.",
        pratica: "Hoje, a cada coisa que te desgastar, diga baixinho: isto é passageiro.",
      },
      {
        titulo: "A minha graça te basta",
        leitura: { slug: "2co", capitulo: 12, de: 7, ate: 10 },
        reflexao: [
          "Paulo pediu três vezes que Deus tirasse um \"espinho\" da vida dele. Ninguém sabe exatamente o que era. A resposta de Deus foi não, mas um não com promessa: \"a minha graça te basta\".",
          "Às vezes a oração não é respondida como pedimos. E Deus não some nessa hora: ele se mostra de outro jeito, como força dentro da fraqueza.",
        ],
        pergunta: "Existe algum \"não\" de Deus que você ainda está tentando aceitar?",
        oracao: "Senhor, tua graça me basta. Mostra o teu poder justamente onde eu sou mais fraco.",
        pratica: "Anote uma fraqueza sua e ore pedindo que Deus seja forte nela, em vez de só pedir que ela suma.",
      },
      {
        titulo: "Todas as coisas novas",
        leitura: { slug: "ap", capitulo: 21, de: 1, ate: 5 },
        reflexao: [
          "O fim da Bíblia não é uma fuga do mundo, é um mundo restaurado. Deus vem morar com o seu povo, e ele mesmo enxuga cada lágrima. Não haverá mais morte, nem luto, nem choro, nem dor.",
          "Esta é a esperança que segura todas as outras: a história não termina na dor. \"Eis que faço novas todas as coisas.\" A lágrima de hoje tem prazo de validade.",
        ],
        pergunta: "Que lágrima sua você entrega hoje, sabendo que Deus vai enxugá-la?",
        oracao: "Deus, eu espero o dia em que tu farás novas todas as coisas. Até lá, ajuda-me a viver com esperança.",
        pratica: "Leia o versículo 4 em voz alta e guarde-o para os dias difíceis.",
      },
    ],
  },

  /* ==================================================== VIDA COM DEUS === */
  {
    id: "aprendendo-a-orar",
    titulo: "Aprendendo a orar",
    chamada: "Sete dias na escola de oração de Jesus",
    descricao:
      "Os discípulos viram Jesus orando e pediram: ensina-nos. Não pediram para ele ensinar a pregar ou a fazer milagres. Sete dias aprendendo a orar com os textos em que o próprio Jesus ensina, e com quem orou antes de nós.",
    categoria: "vida-com-deus",
    capa: { slug: "lc", capitulo: 22 },
    cor: "#8676b4",
    dias: [
      {
        titulo: "Senhor, ensina-nos",
        leitura: { slug: "lc", capitulo: 11, de: 1, ate: 4 },
        reflexao: [
          "Os discípulos já oravam: eram judeus, cresceram com orações. Mas algo na oração de Jesus era diferente, e eles quiseram aprender. Orar se aprende, e ninguém começa sabendo.",
          "A primeira palavra que Jesus ensina é \"Pai\". Antes de qualquer pedido, a oração começa lembrando com quem estamos falando.",
        ],
        pergunta: "Como você costuma se dirigir a Deus quando ora?",
        oracao: "Senhor, ensina-me a orar. Quero aprender a falar contigo como um filho fala com o pai.",
        pratica: "Comece cada oração de hoje chamando Deus de Pai, e note se algo muda.",
      },
      {
        titulo: "No secreto",
        leitura: { slug: "mt", capitulo: 6, de: 5, ate: 8 },
        reflexao: [
          "Jesus critica a oração feita para impressionar os outros e a oração cheia de palavras repetidas, como se Deus precisasse ser convencido. Os dois erros esquecem a mesma coisa: Deus já sabe.",
          "O quarto fechado não é uma regra de lugar, é uma atitude: oração é encontro, não espetáculo. E o Pai vê o que acontece em secreto.",
        ],
        pergunta: "Suas orações têm sido mais encontro ou mais desempenho?",
        oracao: "Pai, tu sabes do que eu preciso antes que eu peça. Quero estar contigo, não impressionar ninguém.",
        pratica: "Encontre hoje um lugar quieto, feche a porta e fique cinco minutos a sós com Deus.",
      },
      {
        titulo: "Pai nosso",
        leitura: { slug: "mt", capitulo: 6, de: 9, ate: 13 },
        reflexao: [
          "A oração que Jesus ensinou começa com Deus (o nome, o Reino, a vontade) e só depois chega em nós (o pão, o perdão, a proteção). Ela coloca as coisas na ordem certa.",
          "E é toda no plural: Pai nosso, pão nosso, nossas dívidas. Mesmo orando sozinho, ninguém ora sozinho. Ela nos lembra que fazemos parte de uma família.",
        ],
        pergunta: "Qual frase do Pai Nosso é mais difícil para você orar com sinceridade?",
        oracao: "Pai nosso, santificado seja o teu nome. Venha o teu Reino, seja feita a tua vontade, também na minha vida.",
        pratica: "Ore o Pai Nosso bem devagar, parando um pouco depois de cada frase.",
      },
      {
        titulo: "Pedir, buscar, bater",
        leitura: { slug: "lc", capitulo: 11, de: 5, ate: 13 },
        reflexao: [
          "Jesus conta a história de um amigo que bate à porta à meia-noite e insiste até ser atendido. Não é que Deus seja como o vizinho mal-humorado: o argumento é \"quanto mais\". Se até ele atende, quanto mais o Pai.",
          "Pedir, buscar e bater são verbos de quem continua. A oração persistente não muda a disposição de Deus em ouvir: muda a nossa.",
        ],
        pergunta: "Há algo pelo qual você parou de orar porque cansou de esperar?",
        oracao: "Pai, eu volto a bater à tua porta. Sei que és bom, e que dás coisas boas aos teus filhos.",
        pratica: "Retome hoje um pedido antigo que você tinha abandonado.",
      },
      {
        titulo: "Derramar o coração",
        leitura: { slug: "sl", capitulo: 62, de: 5, ate: 8 },
        reflexao: [
          "\"Derramai perante ele o vosso coração.\" A imagem é de um vaso virado de cabeça para baixo, sem guardar nada. A oração não precisa ser bonita. Precisa ser verdadeira.",
          "Davi começa falando com a própria alma (\"espera silenciosa somente em Deus\") e termina chamando o povo para fazer o mesmo. Oração honesta vira refúgio.",
        ],
        pergunta: "O que você tem guardado que nunca levou a Deus em oração?",
        oracao: "Deus, aqui está o meu coração, inteiro, sem enfeite. Tu és o meu refúgio.",
        pratica: "Faça uma oração por escrito, sem se preocupar com as palavras certas.",
      },
      {
        titulo: "Quando não sei orar",
        leitura: { slug: "rm", capitulo: 8, de: 26, ate: 28 },
        reflexao: [
          "Paulo admite: \"não sabemos o que havemos de pedir como convém\". Há momentos em que as palavras faltam, e a dor é grande demais para virar frase.",
          "Para esses momentos há uma promessa: o Espírito intercede por nós com gemidos que não se explicam em palavras. Quando você não sabe o que dizer, a oração continua.",
        ],
        pergunta: "Já houve um momento em que você não conseguiu orar? Como foi?",
        oracao: "Espírito Santo, ora por mim quando eu não sei o que dizer.",
        pratica: "Se faltarem palavras hoje, apenas fique em silêncio diante de Deus por alguns minutos.",
      },
      {
        titulo: "Seja feita a tua vontade",
        leitura: { slug: "lc", capitulo: 22, de: 39, ate: 46 },
        reflexao: [
          "No Getsêmani, Jesus ora com angústia tão grande que o suor cai como gotas de sangue. Ele pede que o cálice seja afastado. Não finge que não sente.",
          "Mas termina com a oração mais difícil de todas: \"não se faça a minha vontade, mas a tua\". A oração mais profunda não é a que convence Deus a fazer o que queremos. É a que nos leva a confiar no que ele quer.",
        ],
        pergunta: "Em que área você precisa orar \"seja feita a tua vontade\"?",
        oracao: "Pai, tu sabes o que eu quero. Mas que seja feita a tua vontade, e não a minha.",
        pratica: "Entregue em oração uma decisão que você está tentando controlar sozinho.",
      },
    ],
  },

  {
    id: "recomecar",
    titulo: "Recomeçar",
    chamada: "Graça para quem errou e quer voltar",
    descricao:
      "Todo mundo já errou de um jeito que pesa. A Bíblia está cheia de gente que falhou feio e foi recebida de volta. Sete dias sobre perdão, culpa e a chance de começar de novo.",
    categoria: "vida-com-deus",
    capa: { slug: "lc", capitulo: 15 },
    cor: "#c4864a",
    dias: [
      {
        titulo: "O pai que corre",
        leitura: { slug: "lc", capitulo: 15, de: 11, ate: 24 },
        reflexao: [
          "O filho pede a herança, o que na época era quase dizer ao pai \"para mim você já morreu\". Gasta tudo, passa fome e decide voltar, ensaiando um discurso de empregado.",
          "Mas o pai o vê de longe e corre, algo que um homem respeitado não fazia. Abraça antes do discurso terminar. A graça chega antes do pedido de desculpas ficar pronto.",
        ],
        pergunta: "Que discurso você tem ensaiado para voltar a Deus?",
        oracao: "Pai, eu volto para casa. Obrigado por correres ao meu encontro antes de eu acabar de falar.",
        pratica: "Dê hoje um passo concreto de volta: uma oração, uma conversa ou uma decisão.",
      },
      {
        titulo: "Novas a cada manhã",
        leitura: { slug: "lm", capitulo: 3, de: 19, ate: 26 },
        reflexao: [
          "Lamentações foi escrito depois que Jerusalém foi destruída. É um livro de luto. E bem no meio dele aparece esta frase: as misericórdias do Senhor não têm fim, renovam-se cada manhã.",
          "Ontem não precisa definir hoje. Cada manhã é uma nova porção de misericórdia, e a fidelidade de Deus não depende de como foi o seu dia anterior.",
        ],
        pergunta: "O que de ontem você precisa deixar para trás hoje?",
        oracao: "Senhor, grande é a tua fidelidade. Obrigado pela misericórdia nova desta manhã.",
        pratica: "Ao acordar amanhã, a primeira frase do dia será: \"tuas misericórdias se renovam hoje\".",
      },
      {
        titulo: "Um coração limpo",
        leitura: { slug: "sl", capitulo: 51, de: 1, ate: 12 },
        reflexao: [
          "Davi escreveu este salmo depois de adulterar com Bate-Seba e mandar matar o marido dela. É a oração de alguém que errou de forma grave e não tenta se justificar.",
          "Ele não pede só perdão: pede um coração novo. O arrependimento não é só sentir remorso pelo passado. É pedir a Deus que transforme quem a gente é.",
        ],
        pergunta: "Você tem pedido a Deus só perdão, ou também transformação?",
        oracao: "Cria em mim, ó Deus, um coração puro, e renova em mim um espírito estável.",
        pratica: "Identifique um padrão que você quer que Deus mude, não só um erro isolado.",
      },
      {
        titulo: "Fiel e justo para perdoar",
        leitura: { slug: "1jo", capitulo: 1, de: 5, ate: 10 },
        reflexao: [
          "João é direto: quem diz que não tem pecado engana a si mesmo. Fingir que está tudo bem não traz paz, traz distância.",
          "Mas a promessa é segura: se confessarmos, ele é fiel e justo para perdoar. Repare que o perdão não depende do tamanho do arrependimento, e sim da fidelidade de Deus.",
        ],
        pergunta: "Há algo que você está fingindo que não é pecado?",
        oracao: "Senhor, eu confesso o que fiz. Obrigado por seres fiel e justo para me perdoar e me purificar.",
        pratica: "Faça uma confissão sincera, específica e sem desculpas, só entre você e Deus.",
      },
      {
        titulo: "Uma nova criação",
        leitura: { slug: "2co", capitulo: 5, de: 17, ate: 21 },
        reflexao: [
          "\"Se alguém está em Cristo, nova criatura é.\" Não é uma versão melhorada da pessoa antiga: é algo novo. O passado não deixa de ter acontecido, mas deixa de ser a sua identidade.",
          "E o versículo 21 explica o porquê: Jesus tomou o nosso pecado para que recebêssemos a justiça de Deus. A troca é completamente desigual, e é graça exatamente por isso.",
        ],
        pergunta: "Que rótulo do passado você ainda usa para se definir?",
        oracao: "Jesus, obrigado por tomares o meu pecado. Ajuda-me a viver como nova criação.",
        pratica: "Troque hoje um pensamento do tipo \"eu sou assim\" por \"em Cristo, eu sou nova criatura\".",
      },
      {
        titulo: "Eis que faço uma coisa nova",
        leitura: { slug: "is", capitulo: 43, de: 18, ate: 21 },
        reflexao: [
          "Deus fala a um povo no exílio, que vivia olhando para trás, para a glória perdida. E diz: não fiquem presos às coisas antigas, estou fazendo algo novo.",
          "Ele promete caminho no deserto e rios no ermo, coisas que não fazem sentido humanamente. O recomeço que Deus oferece não depende de as condições serem boas.",
        ],
        pergunta: "Você está tão ocupado olhando para trás que não percebe o novo?",
        oracao: "Senhor, abre os meus olhos para o que estás fazendo de novo. Faz caminho no meu deserto.",
        pratica: "Anote uma coisa boa, mesmo pequena, que começou na sua vida nos últimos meses.",
      },
      {
        titulo: "Tu sabes que eu te amo",
        leitura: { slug: "jo", capitulo: 21, de: 15, ate: 19 },
        reflexao: [
          "Pedro negou Jesus três vezes, perto de uma fogueira. Agora, perto de outra fogueira, Jesus pergunta três vezes: \"amas-me?\". Cada pergunta desfaz uma negação.",
          "E Jesus não só perdoa: devolve a missão. \"Apascenta as minhas ovelhas.\" O seu erro não te desqualifica para ser usado por Deus. Recomeçar inclui voltar a servir.",
        ],
        pergunta: "Você acredita que Deus ainda quer te usar, mesmo depois do que você fez?",
        oracao: "Senhor, tu sabes todas as coisas, tu sabes que eu te amo. Obrigado por me chamares de novo.",
        pratica: "Volte a servir hoje em algo que você tinha largado por se sentir indigno.",
      },
    ],
  },

  {
    id: "quem-eu-sou-em-cristo",
    titulo: "Quem eu sou em Cristo",
    chamada: "Sete verdades sobre a sua identidade",
    descricao:
      "Muita coisa tenta dizer quem você é: o trabalho, o corpo, os erros, a opinião dos outros. A Bíblia tem outra palavra sobre isso. Sete dias para ouvir o que Deus diz sobre quem você é.",
    categoria: "vida-com-deus",
    capa: { slug: "ef", capitulo: 1 },
    cor: "#c49b45",
    dias: [
      {
        titulo: "Escolhido e amado",
        leitura: { slug: "ef", capitulo: 1, de: 3, ate: 8 },
        reflexao: [
          "Paulo enfileira bênçãos sem parar para respirar: escolhidos, adotados, redimidos, perdoados. Tudo isso \"em Cristo\", uma expressão que aparece várias vezes só nestes versículos.",
          "Antes de você fazer qualquer coisa para Deus, ele já fez tudo isso por você. A sua identidade começa com o que você recebeu, não com o que você conquistou.",
        ],
        pergunta: "Qual dessas palavras (escolhido, adotado, perdoado) você mais precisa ouvir hoje?",
        oracao: "Pai, obrigado por me escolheres e me amares em Cristo. Que eu viva a partir dessa verdade.",
        pratica: "Escreva a palavra que mais te tocou e deixe em algum lugar visível.",
      },
      {
        titulo: "Salvo pela graça",
        leitura: { slug: "ef", capitulo: 2, de: 4, ate: 10 },
        reflexao: [
          "\"Pela graça sois salvos, por meio da fé, e isto não vem de vós.\" Ninguém pode se gabar da salvação, porque ninguém a conquistou. É presente.",
          "Mas o texto continua: somos feitura de Deus, criados para boas obras. As obras não são o caminho para a salvação, são o fruto dela. Você é uma obra de arte de Deus, com propósito.",
        ],
        pergunta: "Você tem tentado merecer o amor de Deus?",
        oracao: "Deus, obrigado pela graça que eu não mereci. Que a minha vida seja fruto dela.",
        pratica: "Faça hoje uma boa ação discreta, como resposta à graça, não para ganhar nada.",
      },
      {
        titulo: "Nenhuma condenação",
        leitura: { slug: "rm", capitulo: 8, de: 1, ate: 4 },
        reflexao: [
          "Depois de falar no capítulo 7 da luta contra o pecado, Paulo abre o capítulo 8 com uma declaração: nenhuma condenação há para os que estão em Cristo Jesus.",
          "Isso não quer dizer que o erro não importa. Quer dizer que a sentença já foi cumprida. Você pode lutar contra o pecado como alguém já perdoado, não para conseguir o perdão.",
        ],
        pergunta: "Que voz de condenação você ainda escuta dentro de si?",
        oracao: "Senhor, em Cristo não há condenação para mim. Silencia as vozes que dizem o contrário.",
        pratica: "Quando a culpa voltar hoje por algo já confessado, responda com o versículo 1.",
      },
      {
        titulo: "Filho, não escravo",
        leitura: { slug: "rm", capitulo: 8, de: 14, ate: 17 },
        reflexao: [
          "Paulo contrasta dois tipos de relação com Deus: a do escravo, que vive com medo, e a do filho, que clama \"Aba, Pai\". Aba era como uma criança chamava o pai, com intimidade.",
          "Filhos também são herdeiros. Você não está na casa de Deus como empregado tentando não ser demitido. Está como filho, e o próprio Espírito confirma isso no seu coração.",
        ],
        pergunta: "Você se relaciona com Deus mais como filho ou como empregado?",
        oracao: "Aba, Pai. Obrigado por me adotares como filho. Tira de mim o medo do escravo.",
        pratica: "Ore hoje chamando Deus de Pai, com a confiança de quem está em casa.",
      },
      {
        titulo: "Feito com cuidado",
        leitura: { slug: "sl", capitulo: 139, de: 13, ate: 16 },
        reflexao: [
          "Davi fala de Deus formando o seu corpo no ventre, tecendo cada parte. \"De um modo tão admirável e maravilhoso fui formado.\"",
          "Isso vale também para as partes de você que você não gosta. Você não é um acidente, nem um rascunho. Foi visto e formado por Deus antes de existir.",
        ],
        pergunta: "Que parte de você é mais difícil chamar de \"maravilhosa\"?",
        oracao: "Deus, eu te louvo porque me fizeste de modo maravilhoso. Ensina-me a ver o que tu vês em mim.",
        pratica: "Agradeça hoje a Deus por uma característica sua que você costuma criticar.",
      },
      {
        titulo: "Povo de Deus",
        leitura: { slug: "1pe", capitulo: 2, de: 9, ate: 10 },
        reflexao: [
          "Pedro usa títulos que antes eram de Israel: geração eleita, sacerdócio real, nação santa, povo todo seu. E os aplica a pessoas que, em outro tempo, eram \"não povo\".",
          "A identidade em Cristo não é só individual. Você pertence a um povo, e existe com uma missão: anunciar quem tirou você das trevas para a luz.",
        ],
        pergunta: "Você se vê como parte de um povo, ou vive a fé sozinho?",
        oracao: "Senhor, obrigado por me fazeres parte do teu povo. Que a minha vida anuncie a tua luz.",
        pratica: "Procure hoje alguém da sua comunidade de fé que você não vê há tempo.",
      },
      {
        titulo: "Nada nos separa",
        leitura: { slug: "rm", capitulo: 8, de: 35, ate: 39 },
        reflexao: [
          "Paulo lista tudo o que poderia nos separar do amor de Deus: tribulação, fome, perigo, morte, vida, anjos, presente, futuro. E conclui: nada disso pode.",
          "A sua identidade em Cristo está segura não porque você a segura com força, mas porque o amor de Deus te segura. Esta é a verdade que sustenta todas as outras.",
        ],
        pergunta: "O que você tem medo que possa te separar do amor de Deus?",
        oracao: "Senhor, nada pode me separar do teu amor. Que eu descanse nessa certeza.",
        pratica: "Leia os versículos 38 e 39 em voz alta, e acrescente à lista o seu próprio medo.",
      },
    ],
  },

  {
    id: "gratidao",
    titulo: "Gratidão",
    chamada: "Cinco dias para enxergar o que já é presente",
    descricao:
      "A gratidão não é só uma boa educação com Deus. Ela muda como a gente vê a própria vida. Cinco dias curtos para treinar o olhar e voltar para agradecer.",
    categoria: "vida-com-deus",
    capa: { slug: "lc", capitulo: 17 },
    cor: "#cfa244",
    dias: [
      {
        titulo: "Só um voltou",
        leitura: { slug: "lc", capitulo: 17, de: 11, ate: 19 },
        reflexao: [
          "Dez leprosos foram curados. Nove seguiram com a vida, provavelmente felizes. Só um voltou para agradecer, e era um samaritano, o estrangeiro do grupo.",
          "Jesus pergunta: \"e os nove, onde estão?\". A gratidão não é automática. É uma decisão de voltar, de reconhecer quem fez antes de aproveitar o que foi feito.",
        ],
        pergunta: "Que bênção recente você recebeu e ainda não voltou para agradecer?",
        oracao: "Jesus, eu volto para te agradecer por coisas que eu recebi e esqueci de reconhecer.",
        pratica: "Agradeça hoje, pessoalmente ou por mensagem, alguém que te ajudou e nunca ouviu um obrigado.",
      },
      {
        titulo: "Não te esqueças",
        leitura: { slug: "sl", capitulo: 103, de: 1, ate: 5 },
        reflexao: [
          "Davi fala com a própria alma: bendiz ao Senhor, e não te esqueças de nenhum dos seus benefícios. Ele sabia que a memória é curta para o bem e longa para o mal.",
          "Em seguida faz uma lista: perdoa, sara, redime, coroa, supre. Gratidão também é exercício de memória.",
        ],
        pergunta: "Do que você costuma se esquecer rápido demais?",
        oracao: "Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum dos seus benefícios.",
        pratica: "Faça hoje a sua própria lista de cinco benefícios de Deus na sua vida.",
      },
      {
        titulo: "Em tudo, dai graças",
        leitura: { slug: "1ts", capitulo: 5, de: 16, ate: 18 },
        reflexao: [
          "Repare que Paulo diz \"em tudo\", não \"por tudo\". Não é agradecer pela doença ou pela perda. É encontrar motivo de gratidão mesmo dentro delas.",
          "Alegria, oração e gratidão aparecem juntas, como hábitos. E Paulo diz que isso é a vontade de Deus, uma das poucas vezes em que a Bíblia diz isso tão diretamente.",
        ],
        pergunta: "Em que situação difícil você consegue encontrar um motivo de gratidão?",
        oracao: "Deus, ensina-me a te agradecer em todas as circunstâncias, até nas que eu não escolheria.",
        pratica: "Em cada refeição de hoje, agradeça por algo além da comida.",
      },
      {
        titulo: "Aprendi a me contentar",
        leitura: { slug: "fp", capitulo: 4, de: 11, ate: 13 },
        reflexao: [
          "\"Posso todas as coisas naquele que me fortalece\" (\"tudo posso\", em outras traduções) é um dos versículos mais citados da Bíblia, e quase sempre fora do contexto. Paulo não está falando de conquistar qualquer coisa. Está falando de viver contente com fartura ou com fome.",
          "E ele diz que aprendeu. Contentamento não é temperamento, é aprendizado. A força de Cristo serve para viver bem tanto no muito quanto no pouco.",
        ],
        pergunta: "O seu contentamento depende de ter mais?",
        oracao: "Senhor, ensina-me o segredo do contentamento. Tu és a minha força no muito e no pouco.",
        pratica: "Passe o dia de hoje sem comprar nada que não seja necessário.",
      },
      {
        titulo: "Entrai com ações de graças",
        leitura: { slug: "sl", capitulo: 100, de: 1, ate: 5 },
        reflexao: [
          "Este é um salmo para entrar no templo cantando. Ele dá o motivo da gratidão: o Senhor é Deus, ele nos fez, somos dele. Somos ovelhas do seu pasto.",
          "A gratidão aqui não é sobre o que recebemos, mas sobre quem Deus é: bom, misericordioso, fiel de geração em geração. Isso não muda com o dia ruim.",
        ],
        pergunta: "Você agradece mais pelo que Deus dá ou por quem Deus é?",
        oracao: "Senhor, tu és bom, e a tua misericórdia dura para sempre. Eu entro na tua presença agradecendo.",
        pratica: "Comece a sua próxima oração só agradecendo, sem nenhum pedido.",
      },
    ],
  },

  /* ============================================= CAMINHANDO COM JESUS === */
  {
    id: "encontros-com-jesus",
    titulo: "Encontros com Jesus",
    chamada: "Sete pessoas que nunca mais foram as mesmas",
    descricao:
      "Um líder religioso à noite, uma mulher no poço ao meio-dia, um cobrador de impostos em cima de uma árvore. Jesus encontrava pessoas onde elas estavam. Sete encontros, e o que eles dizem sobre o seu.",
    categoria: "jesus",
    capa: { slug: "jo", capitulo: 4 },
    cor: "#b47e55",
    dias: [
      {
        titulo: "Nicodemos, à noite",
        leitura: { slug: "jo", capitulo: 3, de: 1, ate: 8 },
        reflexao: [
          "Nicodemos era mestre da Lei, respeitado, e veio de noite, talvez para não ser visto. Começa com elogios, e Jesus vai direto ao ponto: é preciso nascer de novo.",
          "Para um homem que tinha feito tudo certo a vida inteira, isso era chocante. O encontro com Jesus não é um ajuste na vida religiosa: é começar de novo, pelo Espírito.",
        ],
        pergunta: "Você tem tratado a fé como um acréscimo ou como um novo começo?",
        oracao: "Jesus, eu venho a ti com as minhas perguntas. Faz em mim o novo nascimento que só o teu Espírito faz.",
        pratica: "Leve a Jesus hoje uma pergunta honesta que você tem sobre a fé.",
      },
      {
        titulo: "A mulher no poço",
        leitura: { slug: "jo", capitulo: 4, de: 7, ate: 15 },
        reflexao: [
          "Ela vai buscar água ao meio-dia, a hora mais quente, provavelmente para não encontrar ninguém. Era samaritana e mulher, duas razões para um mestre judeu não falar com ela. Jesus fala, e pede água.",
          "Ele oferece água viva, que mata uma sede que nenhum poço resolve. Jesus encontra as pessoas exatamente no lugar em que elas se escondem.",
        ],
        pergunta: "De que sede você tem tentado matar em poços que não resolvem?",
        oracao: "Senhor, dá-me dessa água viva. Estou cansado de buscar em lugares que não matam a minha sede.",
        pratica: "Converse hoje com alguém que normalmente você evitaria.",
      },
      {
        titulo: "Zaqueu na árvore",
        leitura: { slug: "lc", capitulo: 19, de: 1, ate: 10 },
        reflexao: [
          "Zaqueu era chefe dos cobradores de impostos: rico, odiado, visto como traidor. Baixinho, sobe numa árvore só para ver Jesus passar. E Jesus para, olha para cima e o chama pelo nome.",
          "Antes de qualquer mudança de Zaqueu, Jesus se convida para a casa dele. A mudança (devolver quatro vezes mais) vem depois de ser aceito, não antes.",
        ],
        pergunta: "Você acha que precisa mudar primeiro para Jesus querer estar com você?",
        oracao: "Jesus, obrigado por me chamares pelo nome e quereres entrar na minha casa. Muda o que precisa mudar.",
        pratica: "Repare algo errado que você fez com alguém, como Zaqueu fez.",
      },
      {
        titulo: "Um toque no manto",
        leitura: { slug: "mc", capitulo: 5, de: 25, ate: 34 },
        reflexao: [
          "Doze anos de hemorragia: pela lei da época, ela era impura e não podia tocar em ninguém. Gastou tudo com médicos. Escondida na multidão, toca no manto de Jesus e é curada.",
          "Ela queria sair despercebida, mas Jesus para tudo para encontrá-la. Ele não queria só curar o corpo. Queria chamá-la de \"filha\" na frente de todo mundo e devolver a ela um lugar entre o povo.",
        ],
        pergunta: "Você tem tentado tocar Jesus escondido, sem ser visto?",
        oracao: "Jesus, eu me aproximo de ti com a minha necessidade. Obrigado por me chamares de filho.",
        pratica: "Conte a alguém algo que Deus já fez por você.",
      },
      {
        titulo: "Bartimeu grita",
        leitura: { slug: "mc", capitulo: 10, de: 46, ate: 52 },
        reflexao: [
          "Bartimeu é cego e mendigo, e grita. Mandam ele ficar quieto, e ele grita mais alto. Jesus para e pergunta algo que parece óbvio: \"Que queres que te faça?\".",
          "Jesus quer ouvir o pedido, dito com as palavras de quem pede. E, curado, Bartimeu não volta para a beira da estrada: segue Jesus pelo caminho.",
        ],
        pergunta: "Se Jesus te perguntasse hoje \"que queres que te faça?\", o que você responderia?",
        oracao: "Jesus, tem misericórdia de mim. Eu quero ver.",
        pratica: "Escreva com clareza o pedido que você faria a Jesus hoje.",
      },
      {
        titulo: "Marta e Maria",
        leitura: { slug: "lc", capitulo: 10, de: 38, ate: 42 },
        reflexao: [
          "Marta recebe Jesus em casa e se agita com o serviço. Maria senta aos pés dele para ouvir. Marta reclama, e Jesus responde com carinho: \"Marta, Marta, estás ansiosa e perturbada com muitas coisas\".",
          "Servir não é errado, e a hospitalidade de Marta era bonita. Mas nada substitui estar com Jesus. Às vezes o mais importante é sentar e ouvir.",
        ],
        pergunta: "Você tem servido tanto a Jesus que esqueceu de estar com ele?",
        oracao: "Senhor, acalma a minha agitação. Quero escolher a boa parte: estar aos teus pés.",
        pratica: "Separe hoje dez minutos só para ler e ouvir, sem tarefas.",
      },
      {
        titulo: "Tomé quer ver",
        leitura: { slug: "jo", capitulo: 20, de: 24, ate: 29 },
        reflexao: [
          "Tomé não estava lá quando Jesus apareceu, e disse que só acreditaria vendo as marcas dos pregos. Ficou conhecido pela dúvida, mas uma semana depois Jesus voltou por causa dele.",
          "Jesus não o despreza: oferece as mãos. E Tomé faz a declaração mais forte dos evangelhos: \"Senhor meu e Deus meu\". A dúvida honesta levada a Jesus pode acabar em adoração.",
        ],
        pergunta: "Que dúvida você tem medo de levar a Jesus?",
        oracao: "Senhor meu e Deus meu, eu trago a ti as minhas dúvidas. Ajuda-me a crer.",
        pratica: "Converse com alguém maduro na fé sobre uma dúvida sua.",
      },
    ],
  },

  {
    id: "bem-aventurancas",
    titulo: "As bem-aventuranças",
    chamada: "Oito dias com o começo do Sermão do Monte",
    descricao:
      "Jesus abre o seu sermão mais famoso chamando de felizes justamente quem o mundo chamaria de perdedor: os pobres de espírito, os que choram, os mansos. Uma bem-aventurança por dia, para ver a vida do jeito do Reino.",
    categoria: "jesus",
    capa: { slug: "mt", capitulo: 5 },
    cor: "#a2825a",
    dias: [
      {
        titulo: "Os humildes de espírito",
        leitura: { slug: "mt", capitulo: 5, de: 1, ate: 3 },
        reflexao: [
          "\"Bem-aventurados\" é mais do que \"felizes\": é uma declaração de que alguém está numa situação boa diante de Deus. E a primeira é para os humildes de espírito, quem sabe que não tem nada a oferecer.",
          "O Reino não começa com quem acha que merece. Começa com quem chega de mãos vazias. Reconhecer a própria pobreza diante de Deus é a porta de entrada.",
        ],
        pergunta: "Você chega diante de Deus de mãos vazias ou de mãos cheias?",
        oracao: "Senhor, eu não tenho nada a oferecer além de mim. Recebe-me no teu Reino.",
        pratica: "Peça ajuda hoje a alguém em algo que você normalmente faria sozinho.",
      },
      {
        titulo: "Os que choram",
        leitura: { slug: "mt", capitulo: 5, de: 4 },
        reflexao: [
          "Que estranho chamar de feliz quem chora. Mas Jesus não está elogiando a tristeza: está dizendo que quem chora não fica sem consolo. Deus mesmo vai consolá-los.",
          "Isso inclui chorar pelas próprias falhas e pelo que está quebrado no mundo. Quem chora ainda se importa, e quem se importa está perto do coração de Deus.",
        ],
        pergunta: "Por que coisas você tem chorado, ou deveria chorar?",
        oracao: "Deus, consola os que choram, e consola também a mim.",
        pratica: "Ore hoje por uma injustiça que te entristece.",
      },
      {
        titulo: "Os mansos",
        leitura: { slug: "mt", capitulo: 5, de: 5 },
        reflexao: [
          "Mansidão não é fraqueza. É força sob controle: alguém que poderia reagir com violência e escolhe não fazer isso. Moisés e o próprio Jesus são chamados de mansos.",
          "Jesus cita o Salmo 37: os mansos herdarão a terra. O mundo acha que a terra é de quem grita mais alto. O Reino diz o contrário.",
        ],
        pergunta: "Em que situação você precisa trocar a reação pela mansidão?",
        oracao: "Jesus, tu és manso e humilde de coração. Ensina-me a ter força sob controle.",
        pratica: "Na próxima discussão de hoje, espere três segundos antes de responder.",
      },
      {
        titulo: "Fome e sede de justiça",
        leitura: { slug: "mt", capitulo: 5, de: 6 },
        reflexao: [
          "Fome e sede não são desejos leves. São necessidades que doem. Jesus fala de quem deseja a justiça com essa intensidade: ser justo diante de Deus e ver a justiça no mundo.",
          "A promessa é ser farto. Quem deseja de verdade aquilo que Deus deseja não fica de mãos vazias.",
        ],
        pergunta: "O que você deseja com fome e sede?",
        oracao: "Senhor, dá-me fome e sede de justiça, e sacia-me contigo.",
        pratica: "Faça hoje uma escolha justa que vai te custar algo.",
      },
      {
        titulo: "Os misericordiosos",
        leitura: { slug: "mt", capitulo: 5, de: 7 },
        reflexao: [
          "Esta é a única bem-aventurança em que a recompensa é igual à atitude: misericordiosos alcançarão misericórdia. Quem sabe o quanto recebeu de Deus tende a dar também.",
          "Misericórdia é sentir a dor do outro e agir. Não é só ter pena, é estender a mão.",
        ],
        pergunta: "Com quem você precisa ser misericordioso hoje?",
        oracao: "Deus, tu foste misericordioso comigo. Faz-me misericordioso com os outros.",
        pratica: "Perdoe hoje uma pequena ofensa sem cobrar nada em troca.",
      },
      {
        titulo: "Os limpos de coração",
        leitura: { slug: "mt", capitulo: 5, de: 8 },
        reflexao: [
          "Limpo de coração não é perfeito, é inteiro: sem segundas intenções, sem fingimento. É o coração que quer uma coisa só.",
          "E a promessa é a maior de todas: verão a Deus. Quanto mais dividido o coração, mais embaçada a visão.",
        ],
        pergunta: "Que segunda intenção divide o seu coração?",
        oracao: "Cria em mim um coração puro, ó Deus, para que eu te veja.",
        pratica: "Faça hoje algo bom sem contar a ninguém.",
      },
      {
        titulo: "Os pacificadores",
        leitura: { slug: "mt", capitulo: 5, de: 9 },
        reflexao: [
          "Não são os que amam a paz de longe, mas os que a constroem. Pacificar dá trabalho: exige ouvir os dois lados, engolir o orgulho, dar o primeiro passo.",
          "Eles serão chamados filhos de Deus, porque fazem o que o Pai faz. Deus é o grande pacificador, que reconciliou o mundo consigo.",
        ],
        pergunta: "Há algum conflito em que você poderia dar o primeiro passo?",
        oracao: "Pai, faz de mim um instrumento da tua paz onde há conflito.",
        pratica: "Mande hoje uma mensagem de reconciliação para alguém com quem você brigou.",
      },
      {
        titulo: "Os perseguidos",
        leitura: { slug: "mt", capitulo: 5, de: 10, ate: 12 },
        reflexao: [
          "A última bem-aventurança é a mais difícil: felizes os perseguidos por causa da justiça. Jesus avisa que segui-lo pode custar caro, e que os profetas passaram pelo mesmo.",
          "Repare que ela termina como a primeira: \"deles é o Reino dos céus\". Do começo ao fim, o Reino pertence a quem o mundo despreza.",
        ],
        pergunta: "Você tem evitado fazer o certo por medo do que vão pensar?",
        oracao: "Senhor, dá-me coragem para seguir-te mesmo quando custar caro.",
        pratica: "Defenda hoje, com gentileza, algo que você acredita ser certo.",
      },
    ],
  },

  {
    id: "semana-santa",
    titulo: "A Semana Santa",
    chamada: "Os últimos dias de Jesus, dia a dia",
    descricao:
      "Do domingo de Ramos à manhã da ressurreição, os evangelhos contam com detalhe a última semana de Jesus. Nove dias para caminhar com ele até a cruz e o túmulo vazio. Ideal para a Páscoa, e bom em qualquer época.",
    categoria: "jesus",
    capa: { slug: "mt", capitulo: 21 },
    cor: "#a45f55",
    selo: "Para a Páscoa",
    dias: [
      {
        titulo: "Domingo: o rei num jumentinho",
        leitura: { slug: "mt", capitulo: 21, de: 1, ate: 11 },
        reflexao: [
          "Jesus entra em Jerusalém montado num jumentinho, cumprindo Zacarias. Reis conquistadores entravam a cavalo. Ele chega manso, como rei de paz.",
          "A multidão grita hosana e estende ramos. Poucos dias depois, parte dessa mesma cidade gritaria \"crucifica\". Aclamar Jesus é fácil quando ele parece o rei que a gente espera.",
        ],
        pergunta: "Você segue Jesus pelo rei que ele é, ou pelo que você espera dele?",
        oracao: "Hosana, Jesus. Bendito o que vem em nome do Senhor. Reina na minha vida do teu jeito.",
        pratica: "Durante esta semana, separe um tempo diário para estes textos.",
      },
      {
        titulo: "Segunda: o templo purificado",
        leitura: { slug: "mc", capitulo: 11, de: 15, ate: 18 },
        reflexao: [
          "Jesus vira as mesas dos cambistas. O pátio onde estrangeiros podiam orar tinha virado mercado. Ele cita Isaías: \"minha casa será chamada casa de oração para todas as nações\".",
          "A indignação de Jesus é contra o que impede as pessoas de chegarem a Deus. Isso vale para templos, e também para o nosso coração.",
        ],
        pergunta: "O que em você ocupa o lugar que deveria ser de oração?",
        oracao: "Senhor, purifica o meu coração. Tira o que impede que ele seja casa de oração.",
        pratica: "Identifique uma distração que tem ocupado o seu tempo com Deus e diminua-a hoje.",
      },
      {
        titulo: "Terça: o maior mandamento",
        leitura: { slug: "mt", capitulo: 22, de: 34, ate: 40 },
        reflexao: [
          "Na terça-feira, Jesus é testado com perguntas difíceis. Um especialista na Lei pergunta qual é o maior mandamento, e Jesus resume tudo em dois: amar a Deus por inteiro e amar o próximo como a si mesmo.",
          "Toda a Lei e os Profetas dependem disso. A fé não é uma lista de regras, é um jeito de amar.",
        ],
        pergunta: "Qual dos dois amores está mais fraco em você agora?",
        oracao: "Deus, ensina-me a te amar com todo o meu ser, e a amar o meu próximo como a mim mesmo.",
        pratica: "Faça hoje um gesto concreto de amor a alguém difícil.",
      },
      {
        titulo: "Quarta: o perfume derramado",
        leitura: { slug: "mc", capitulo: 14, de: 3, ate: 9 },
        reflexao: [
          "Uma mulher quebra um frasco de perfume caríssimo, equivalente a um ano de salário, e derrama na cabeça de Jesus. Alguns reclamam do desperdício. Jesus defende: ela fez uma boa obra, ungiu o corpo para o sepultamento.",
          "Ela entendeu o que os discípulos ainda não tinham entendido: que Jesus ia morrer. E respondeu com um amor que não fez cálculo.",
        ],
        pergunta: "O que você daria a Jesus sem calcular o custo?",
        oracao: "Jesus, quero te amar sem medida. Recebe o que eu tenho de mais precioso.",
        pratica: "Ofereça hoje algo valioso para você (tempo, dinheiro ou atenção) a quem precisa.",
      },
      {
        titulo: "Quinta: o lava-pés",
        leitura: { slug: "jo", capitulo: 13, de: 1, ate: 15 },
        reflexao: [
          "Lavar os pés era tarefa do servo mais baixo da casa. Na última ceia, Jesus tira a capa, pega a toalha e lava os pés dos discípulos, inclusive os de Judas.",
          "\"Eu vos dei exemplo.\" A grandeza no Reino de Deus se mede pelo serviço. E o amor de Jesus vai \"até o fim\".",
        ],
        pergunta: "De quem você teria dificuldade em lavar os pés?",
        oracao: "Senhor, tu te ajoelhaste para servir. Dá-me um coração de servo.",
        pratica: "Faça hoje uma tarefa humilde que normalmente você deixaria para outra pessoa.",
      },
      {
        titulo: "Quinta à noite: Getsêmani",
        leitura: { slug: "mc", capitulo: 14, de: 32, ate: 42 },
        reflexao: [
          "Jesus leva Pedro, Tiago e João e diz: \"a minha alma está triste até a morte\". Pede que vigiem com ele. Eles dormem três vezes.",
          "Jesus enfrentou a hora mais escura praticamente sozinho, orando \"Aba, Pai\". Ele sabe o que é angústia e solidão, e por isso nos entende.",
        ],
        pergunta: "Em que área você tem dormido quando deveria vigiar?",
        oracao: "Jesus, tu enfrentaste a angústia por mim. Ajuda-me a vigiar e orar contigo.",
        pratica: "Ore hoje por alguém que está passando pela sua própria noite escura.",
      },
      {
        titulo: "Sexta: a cruz",
        leitura: { slug: "lc", capitulo: 23, de: 33, ate: 46 },
        reflexao: [
          "Na cruz, Jesus ora pelos que o crucificam: \"Pai, perdoa-lhes\". Promete o paraíso a um criminoso arrependido. E entrega o espírito nas mãos do Pai.",
          "A cruz mostra ao mesmo tempo o pior da humanidade e o maior amor de Deus. Aqui está o centro de toda a fé cristã: ele morreu em nosso lugar.",
        ],
        pergunta: "Que palavra de Jesus na cruz mais fala com você hoje?",
        oracao: "Jesus, obrigado por morreres por mim. Lembra-te de mim no teu Reino.",
        pratica: "Passe alguns minutos em silêncio pensando no que a cruz significa para você.",
      },
      {
        titulo: "Sábado: o silêncio",
        leitura: { slug: "lc", capitulo: 23, de: 50, ate: 56 },
        reflexao: [
          "O corpo de Jesus é sepultado às pressas por José de Arimateia. As mulheres preparam os perfumes e descansam no sábado, conforme a Lei.",
          "O sábado é o dia do silêncio: para os discípulos, tudo tinha acabado. Muitas vezes a vida tem sábados assim, entre a perda e a resposta. Deus continua trabalhando mesmo quando parece que nada acontece.",
        ],
        pergunta: "Você está vivendo algum \"sábado\", esperando sem ver nada acontecer?",
        oracao: "Senhor, no meu silêncio, ajuda-me a esperar. Tu não terminaste ainda.",
        pratica: "Hoje, fique um pouco em silêncio e lembre: o domingo vem.",
      },
      {
        titulo: "Domingo: ele ressuscitou",
        leitura: { slug: "lc", capitulo: 24, de: 1, ate: 12 },
        reflexao: [
          "As mulheres vão ao túmulo cedo, com perfumes para um morto, e encontram a pedra removida. Os anjos perguntam: \"por que buscais entre os mortos aquele que vive?\".",
          "Os apóstolos acham que é delírio. Mas Pedro corre ao túmulo e vê os lençóis. A ressurreição muda tudo: a morte não tem a última palavra.",
        ],
        pergunta: "O que a ressurreição de Jesus muda na forma como você enfrenta a vida?",
        oracao: "Jesus, tu vives! Obrigado porque a morte não venceu. Que eu viva com essa esperança.",
        pratica: "Conte a alguém, hoje, por que a ressurreição importa para você.",
      },
    ],
  },

  /* ============================================= CARÁTER E SABEDORIA === */
  {
    id: "fruto-do-espirito",
    titulo: "O fruto do Espírito",
    chamada: "Dez dias sobre o que Deus faz crescer em nós",
    descricao:
      "Paulo fala de um fruto só, com nove sabores: amor, gozo (a alegria), paz, longanimidade, benignidade, bondade, fidelidade, mansidão e domínio próprio. Não é uma lista de metas, é o que cresce quando o Espírito tem espaço. Um dia de introdução e um para cada aspecto.",
    categoria: "carater",
    capa: { slug: "gl", capitulo: 5 },
    cor: "#d0933a",
    dias: [
      {
        titulo: "Andar no Espírito",
        leitura: { slug: "gl", capitulo: 5, de: 16, ate: 25 },
        reflexao: [
          "Paulo contrasta as obras da carne com o fruto do Espírito. Obras são várias, e fruto é um só. Obras a gente fabrica; fruto cresce.",
          "Ninguém força uma árvore a dar fruto puxando os galhos. O fruto vem de estar ligado à raiz. Nestes dias, o convite é menos esforço e mais relacionamento: andar no Espírito.",
        ],
        pergunta: "Você tem tentado fabricar o fruto ou cultivar a ligação com Deus?",
        oracao: "Espírito Santo, quero andar contigo. Faz crescer em mim o teu fruto.",
        pratica: "Leia a lista dos versículos 22 e 23 e marque o aspecto que você mais precisa.",
      },
      {
        titulo: "Amor",
        leitura: { slug: "1co", capitulo: 13, de: 4, ate: 7 },
        reflexao: [
          "O amor vem em primeiro lugar, e de certo modo os outros oito são formas dele. Paulo não define o amor como sentimento, mas como comportamento: paciente, bondoso, sem inveja, sem orgulho.",
          "Um exercício antigo: troque \"o amor\" pelo seu nome no texto. Fica claro onde o amor ainda precisa crescer.",
        ],
        pergunta: "Em qual destas características o seu amor está mais fraco?",
        oracao: "Deus, que és amor, ensina-me a amar como tu amas.",
        pratica: "Leia o texto trocando \"o amor\" pelo seu nome, com honestidade.",
      },
      {
        titulo: "Alegria",
        leitura: { slug: "jo", capitulo: 15, de: 9, ate: 11 },
        reflexao: [
          "Jesus diz isso na véspera da cruz: \"para que o meu gozo permaneça em vós, e o vosso gozo seja completo\". Gozo é a palavra antiga para alegria, e a alegria dele não dependia das circunstâncias.",
          "Ela vem de permanecer no amor de Deus. A alegria cristã não é euforia constante, é uma raiz mais funda, que se mantém até nos dias tristes.",
        ],
        pergunta: "A sua alegria depende de como foi o seu dia?",
        oracao: "Jesus, quero permanecer no teu amor. Que a tua alegria esteja em mim.",
        pratica: "Anote três motivos de alegria que não dependem das circunstâncias.",
      },
      {
        titulo: "Paz",
        leitura: { slug: "cl", capitulo: 3, de: 12, ate: 15 },
        reflexao: [
          "\"A paz de Cristo [...] domine em vossos corações.\" A palavra grega por trás de \"domine\" vem do esporte: é o árbitro, quem decide o que vale. Paulo fala de deixar a paz de Cristo decidir.",
          "E a paz aqui é também entre as pessoas: suportar, perdoar, revestir-se de amor. A paz de Cristo cresce em comunidade.",
        ],
        pergunta: "O que tem decidido as coisas no seu coração: a paz ou a pressa?",
        oracao: "Cristo, que a tua paz domine no meu coração e nas minhas relações.",
        pratica: "Antes de uma decisão hoje, pergunte: isso me traz paz diante de Deus?",
      },
      {
        titulo: "Longanimidade",
        leitura: { slug: "tg", capitulo: 5, de: 7, ate: 11 },
        reflexao: [
          "Longanimidade é paciência de longo prazo, ânimo comprido. Tiago usa a imagem do agricultor, que planta e espera a chuva sem conseguir apressá-la.",
          "Ele cita Jó como exemplo, alguém que perseverou sem entender. A paciência não é passividade: é confiar que Deus está trabalhando no tempo dele.",
        ],
        pergunta: "Com o que, ou com quem, você está perdendo a paciência?",
        oracao: "Senhor, dá-me ânimo comprido. Ensina-me a esperar como o agricultor espera a chuva.",
        pratica: "Hoje, quando algo te irritar pela demora, respire e ore em vez de reclamar.",
      },
      {
        titulo: "Benignidade",
        leitura: { slug: "ef", capitulo: 4, de: 29, ate: 32 },
        reflexao: [
          "Benignidade é a gentileza que se nota no trato: palavras que edificam, coração compassivo, disposição para perdoar.",
          "A medida é alta: perdoar \"como também Deus vos perdoou em Cristo\". Quem lembra o quanto foi perdoado tem mais facilidade para ser gentil.",
        ],
        pergunta: "Suas palavras têm edificado ou desgastado quem está perto de você?",
        oracao: "Deus, faz de mim uma pessoa benigna, que perdoa como fui perdoado.",
        pratica: "Diga hoje uma palavra de encorajamento sincera a alguém.",
      },
      {
        titulo: "Bondade",
        leitura: { slug: "lc", capitulo: 6, de: 32, ate: 36 },
        reflexao: [
          "Ser bom com quem é bom com a gente qualquer um consegue. Jesus fala de algo mais: fazer o bem aos inimigos, emprestar sem esperar de volta.",
          "O modelo é o próprio Deus, que é \"benigno até para com os ingratos e maus\". A bondade cristã não escolhe destinatário.",
        ],
        pergunta: "A quem você tem negado bondade porque essa pessoa não merece?",
        oracao: "Pai, tu és bom até com os ingratos. Faz-me misericordioso como tu és.",
        pratica: "Faça hoje um favor a alguém que não pode te retribuir.",
      },
      {
        titulo: "Fidelidade",
        leitura: { slug: "lc", capitulo: 16, de: 10, ate: 13 },
        reflexao: [
          "\"Quem é fiel no pouco também é fiel no muito.\" A fidelidade se constrói no que ninguém vê: pequenas promessas cumpridas, o trabalho feito direito mesmo sem fiscal.",
          "E Jesus conclui que ninguém pode servir a dois senhores. Fidelidade é também ter um coração inteiro para Deus.",
        ],
        pergunta: "Em que \"pouco\" você tem sido infiel?",
        oracao: "Senhor, tu és fiel. Faz-me fiel no pouco, no que ninguém vê.",
        pratica: "Cumpra hoje uma pequena promessa que você tinha deixado de lado.",
      },
      {
        titulo: "Mansidão",
        leitura: { slug: "mt", capitulo: 11, de: 28, ate: 30 },
        reflexao: [
          "Jesus se descreve com duas palavras: manso e humilde de coração. Num mundo que valoriza quem se impõe, ele convida os cansados a aprenderem com alguém manso.",
          "O jugo dele é suave. A mansidão não é só como tratamos os outros: é também a leveza de quem não precisa provar nada.",
        ],
        pergunta: "Onde você tem carregado um jugo pesado que Jesus não te deu?",
        oracao: "Jesus, eu venho a ti cansado. Ensina-me a tua mansidão, e dá-me descanso.",
        pratica: "Em um conflito hoje, abra mão de ter a última palavra.",
      },
      {
        titulo: "Domínio próprio",
        leitura: { slug: "1co", capitulo: 9, de: 24, ate: 27 },
        reflexao: [
          "Paulo usa a imagem do atleta, que treina e abre mão de coisas por um objetivo maior. Domínio próprio não é reprimir tudo, é escolher o que vale mais.",
          "E fecha a lista do fruto: quem tem domínio próprio consegue viver os outros oito. É o Espírito dando força para dizer não ao impulso e sim ao propósito.",
        ],
        pergunta: "Que impulso tem te dominado em vez de você dominá-lo?",
        oracao: "Espírito Santo, dá-me domínio próprio. Quero correr para ganhar o prêmio que não perece.",
        pratica: "Escolha um impulso (celular, comida, fala) e pratique hoje dizer não a ele uma vez.",
      },
    ],
  },

  {
    id: "sabedoria-para-a-vida",
    titulo: "Sabedoria para a vida",
    chamada: "Provérbios para decisões de todo dia",
    descricao:
      "Sabedoria na Bíblia não é saber muito, é saber viver: o que falar, com quem andar, como decidir. Sete dias com Provérbios, Eclesiastes e Tiago, para levar a fé para as coisas pequenas do dia a dia.",
    categoria: "carater",
    capa: { slug: "pv", capitulo: 3 },
    cor: "#94875a",
    dias: [
      {
        titulo: "Confie de todo o coração",
        leitura: { slug: "pv", capitulo: 3, de: 5, ate: 8 },
        reflexao: [
          "\"Não te estribes no teu próprio entendimento.\" Estribar é se apoiar com todo o peso. O texto não manda desligar o cérebro, manda não apoiar o peso todo nele.",
          "Reconhecer Deus \"em todos os teus caminhos\" inclui os caminhos pequenos: a escolha de hoje, a conversa de amanhã. E a promessa é que ele endireita as veredas.",
        ],
        pergunta: "Em que decisão você está se apoiando só no próprio entendimento?",
        oracao: "Senhor, eu confio em ti de todo o coração. Endireita os meus caminhos.",
        pratica: "Antes de uma decisão hoje, faça uma oração curta pedindo direção.",
      },
      {
        titulo: "Guarde o coração",
        leitura: { slug: "pv", capitulo: 4, de: 20, ate: 27 },
        reflexao: [
          "\"Guarda com toda a diligência o teu coração, porque dele procedem as fontes da vida.\" No pensamento bíblico, o coração é o centro das decisões, não só das emoções.",
          "O texto fala de boca, olhos e pés: o que entra e o que sai. Guardar o coração é cuidar do que você deixa entrar e de para onde você caminha.",
        ],
        pergunta: "O que você tem deixado entrar no seu coração ultimamente?",
        oracao: "Deus, ajuda-me a guardar o meu coração, porque dele vem a minha vida.",
        pratica: "Revise hoje o que você consome (redes, séries, conversas) e corte uma coisa que te faz mal.",
      },
      {
        titulo: "A resposta branda",
        leitura: { slug: "pv", capitulo: 15, de: 1, ate: 4 },
        reflexao: [
          "\"A resposta branda desvia o furor.\" Quase todo mundo já viu uma discussão crescer por causa de uma palavra dura, e também já viu uma conversa esfriar por uma resposta calma.",
          "O versículo 4 chama a língua suave de árvore de vida. As palavras têm o poder de curar ou de ferir.",
        ],
        pergunta: "Como você costuma responder quando alguém fala com raiva?",
        oracao: "Senhor, coloca guarda na minha boca. Que as minhas palavras sejam árvore de vida.",
        pratica: "Em toda conversa tensa de hoje, responda num tom mais baixo do que o do outro.",
      },
      {
        titulo: "Os planos e o Senhor",
        leitura: { slug: "pv", capitulo: 16, de: 1, ate: 9 },
        reflexao: [
          "\"O coração do homem propõe o seu caminho; mas o Senhor lhe dirige os passos.\" Provérbios não é contra planejar. É contra planejar como se Deus não existisse.",
          "\"Entrega ao Senhor as tuas obras, e teus desígnios serão estabelecidos.\" Planejar com sabedoria e entregar com humildade andam juntos.",
        ],
        pergunta: "Você tem incluído Deus nos seus planos, ou só pedido que ele aprove os seus?",
        oracao: "Senhor, eu entrego a ti os meus planos. Dirige os meus passos.",
        pratica: "Escreva um plano para esta semana e ore sobre ele com as mãos abertas.",
      },
      {
        titulo: "O poder da língua",
        leitura: { slug: "tg", capitulo: 3, de: 3, ate: 10 },
        reflexao: [
          "Tiago compara a língua ao freio de um cavalo, ao leme de um navio e a uma faísca que incendeia uma floresta. Uma parte pequena com um efeito enorme.",
          "\"Da mesma boca procede bênção e maldição.\" Ele não diz que é fácil controlar a língua, diz que é quase impossível. Por isso precisamos de ajuda.",
        ],
        pergunta: "Que faísca suas palavras acenderam recentemente?",
        oracao: "Deus, tu sabes como a minha língua me trai. Ajuda-me a abençoar, e não a ferir.",
        pratica: "Passe o dia sem falar mal de ninguém, nem de brincadeira.",
      },
      {
        titulo: "Melhor dois do que um",
        leitura: { slug: "ec", capitulo: 4, de: 9, ate: 12 },
        reflexao: [
          "Eclesiastes é um livro realista, às vezes até desanimado. Mas aqui ele é claro: melhor é serem dois do que um. Se um cair, o outro o levanta.",
          "\"O cordão de três dobras não se quebra tão depressa.\" A sabedoria inclui saber que ninguém foi feito para caminhar sozinho.",
        ],
        pergunta: "Quem é a pessoa que te levanta quando você cai? E a quem você levanta?",
        oracao: "Senhor, obrigado pelas pessoas que caminham comigo. Ajuda-me a ser apoio para elas também.",
        pratica: "Agradeça hoje a um amigo por estar ao seu lado.",
      },
      {
        titulo: "Peça sabedoria",
        leitura: { slug: "tg", capitulo: 1, de: 5, ate: 8 },
        reflexao: [
          "\"Se algum de vós tem falta de sabedoria, peça-a a Deus.\" É uma das promessas mais diretas da Bíblia: Deus dá a todos liberalmente e não censura, não humilha quem pede.",
          "A condição é pedir com fé, sem ficar dividido. Para fechar estes sete dias: a sabedoria começa reconhecendo que precisamos dela.",
        ],
        pergunta: "Em que situação você mais precisa de sabedoria agora?",
        oracao: "Deus, eu preciso de sabedoria. Peço com fé, sabendo que tu dás sem humilhar.",
        pratica: "Faça hoje um pedido específico de sabedoria sobre uma situação concreta.",
      },
    ],
  },
];
