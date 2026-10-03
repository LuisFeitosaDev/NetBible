/**
 * Mais temas: amor, coragem diante do medo, perdão, deserto e fé. Mesmos
 * critérios de escrita de `devocionais.dados.ts`.
 */
import type { Devocional } from "./devocionais";

export const TEMAS: Devocional[] = [
  {
    id: "amor-que-transforma",
    titulo: "O amor que transforma",
    chamada: "Ser amado por Deus e amar de verdade",
    descricao:
      "Amor é a palavra mais gasta do mundo, e talvez a mais central da Bíblia. Sete dias para olhar o amor de Deus de perto e deixar que ele mude o jeito de amar quem está ao seu lado, inclusive quem é difícil de amar.",
    categoria: "vida-com-deus",
    capa: { slug: "lc", capitulo: 10 },
    cor: "#c96a6a",
    dias: [
      {
        titulo: "De tal maneira",
        leitura: { slug: "jo", capitulo: 3, de: 16, ate: 17 },
        reflexao: [
          "Talvez o versículo mais conhecido do mundo. \"Deus amou o mundo de tal maneira que deu o seu Filho unigênito.\" O amor de Deus não ficou no sentimento: ele deu.",
          "E o versículo 17 completa o que muita gente esquece: Deus não enviou o Filho \"para que julgasse o mundo, mas para que o mundo fosse salvo por ele\". O ponto de partida do amor é salvar, não condenar.",
        ],
        pergunta: "Você vê Deus mais como juiz pronto para condenar ou como pai que deu o Filho?",
        oracao: "Deus, obrigado por me amares de tal maneira. Que eu creia nesse amor de verdade.",
        pratica: "Leia João 3:16 trocando \"o mundo\" pelo seu nome.",
      },
      {
        titulo: "Ainda pecadores",
        leitura: { slug: "rm", capitulo: 5, de: 6, ate: 8 },
        reflexao: [
          "Paulo diz que dificilmente alguém morreria por um justo. Mas Deus fez algo diferente: \"quando éramos ainda pecadores, Cristo morreu por nós\".",
          "Deus não esperou a gente melhorar para amar. O amor dele veio no pior momento, e é por isso que ele não depende do seu melhor momento para continuar.",
        ],
        pergunta: "Você acredita que Deus te ama no seu pior dia?",
        oracao: "Senhor, tu me amaste quando eu ainda era pecador. Obrigado por um amor que não depende de mim.",
        pratica: "Lembre-se de um momento em que você falhou e agradeça porque o amor de Deus estava lá.",
      },
      {
        titulo: "Como eu vos amei",
        leitura: { slug: "jo", capitulo: 13, de: 34, ate: 35 },
        reflexao: [
          "\"Um novo mandamento vos dou: que vos ameis uns aos outros.\" Amar o próximo não era novidade. O novo está na medida: \"assim como eu vos amei\".",
          "Jesus diz isso logo depois de lavar os pés dos discípulos. E acrescenta: é assim que todos vão saber que vocês são meus. A marca do cristão não é a opinião certa, é o amor.",
        ],
        pergunta: "Se as pessoas te reconhecessem só pelo amor, saberiam que você segue Jesus?",
        oracao: "Jesus, ensina-me a amar como tu me amaste, inclusive quando custa.",
        pratica: "Faça hoje um gesto de amor concreto a alguém da sua comunidade.",
      },
      {
        titulo: "Quem é o meu próximo?",
        leitura: { slug: "lc", capitulo: 10, de: 29, ate: 37 },
        reflexao: [
          "Um especialista na Lei pergunta \"quem é o meu próximo?\", querendo um limite. Jesus conta a história de um samaritano, alguém que os judeus desprezavam, cuidando de um judeu ferido.",
          "No fim, Jesus vira a pergunta: qual dos três \"te parece ter sido o próximo\"? A questão não é quem merece o meu amor. É de quem eu vou me aproximar. \"Vai, e faze tu o mesmo.\"",
        ],
        pergunta: "Por quem você tem passado de largo?",
        oracao: "Senhor, dá-me olhos para ver quem está caído no caminho, e coragem para parar.",
        pratica: "Pare hoje para ajudar alguém que você normalmente ignoraria.",
      },
      {
        titulo: "Sem amor, nada",
        leitura: { slug: "1co", capitulo: 13, de: 1, ate: 3 },
        reflexao: [
          "Paulo lista coisas impressionantes: falar línguas, profetizar, ter toda a fé, dar tudo aos pobres. E conclui que, sem amor, \"nada seria\".",
          "Dá para fazer muita coisa certa pelo motivo errado. Deus olha a raiz. Sem amor, até o melhor serviço vira barulho, \"como o metal que soa\".",
        ],
        pergunta: "Há algo bom que você faz mais por imagem do que por amor?",
        oracao: "Deus, que tudo o que eu faço nasça do amor, e não da vontade de ser visto.",
        pratica: "Faça hoje um bem escondido, que ninguém vai saber que foi você.",
      },
      {
        titulo: "Por obras e em verdade",
        leitura: { slug: "1jo", capitulo: 3, de: 16, ate: 18 },
        reflexao: [
          "\"Nisto conhecemos o amor: que Cristo deu a sua vida por nós.\" E João tira uma conclusão bem prática: quem vê o irmão passando necessidade e fecha o coração, como pode dizer que ama?",
          "\"Não amemos de palavra, nem de língua, mas por obras e em verdade.\" Amor que não chega no bolso, no tempo e na agenda ainda é só intenção.",
        ],
        pergunta: "Seu amor tem chegado nas obras ou ficado nas palavras?",
        oracao: "Senhor, transforma o meu amor de palavras em ações.",
        pratica: "Supra hoje uma necessidade concreta de alguém: uma compra, uma carona, uma refeição.",
      },
      {
        titulo: "Forte como a morte",
        leitura: { slug: "ct", capitulo: 8, de: 6, ate: 7 },
        reflexao: [
          "Cânticos é um poema de amor entre um homem e uma mulher, e chega ao seu ponto alto aqui: \"o amor é forte como a morte\". \"As muitas águas não podem apagar o amor.\"",
          "Muitos cristãos, ao longo da história, leram nessas palavras também um eco do amor de Deus. Seja como for, a imagem fica: o amor verdadeiro não se compra e não se apaga.",
        ],
        pergunta: "Que amor na sua vida precisa ser regado para não se apagar?",
        oracao: "Deus, obrigado pelo teu amor que nenhuma água apaga. Guarda os amores que me deste.",
        pratica: "Escreva um bilhete ou uma mensagem de amor para alguém importante para você.",
      },
    ],
  },

  {
    id: "coragem-no-medo",
    titulo: "Coragem quando há medo",
    chamada: "Sete dias para enfrentar o que te assusta",
    descricao:
      "\"Não temas\" é uma das frases que Deus mais repete na Bíblia. Não porque o medo seja pecado, mas porque ele não precisa mandar. Sete dias com gente que teve medo e, mesmo assim, foi.",
    categoria: "coracao",
    capa: { slug: "dn", capitulo: 3 },
    cor: "#d9783f",
    dias: [
      {
        titulo: "Esforça-te e tem bom ânimo",
        leitura: { slug: "js", capitulo: 1, de: 6, ate: 9 },
        reflexao: [
          "Josué assume a liderança depois de Moisés, diante de uma terra cheia de inimigos. Deus repete três vezes: \"Esforça-te, e tem bom ânimo\". Se precisa repetir, é porque Josué estava com medo.",
          "E o motivo da coragem não é a força de Josué: \"o Senhor teu Deus está contigo, por onde quer que andares\". Coragem não é ausência de medo. É saber quem vai junto.",
        ],
        pergunta: "Que desafio novo está te deixando com medo?",
        oracao: "Senhor, eu tenho medo, mas tu estás comigo por onde eu andar. Dá-me bom ânimo.",
        pratica: "Escreva o versículo 9 e leve com você hoje.",
      },
      {
        titulo: "Eu te seguro pela mão",
        leitura: { slug: "is", capitulo: 41, de: 10, ate: 13 },
        reflexao: [
          "\"Não temas, porque eu sou contigo.\" Deus fala a um povo no exílio, pequeno e cercado. E a imagem do versículo 13 é muito próxima: \"te seguro pela tua mão direita\".",
          "É como um pai atravessando a rua com o filho. A criança ainda vê os carros, ainda sente o perigo. Mas a mão segura muda tudo.",
        ],
        pergunta: "Onde você precisa sentir a mão de Deus segurando a sua?",
        oracao: "Deus, segura a minha mão. Eu não temo, porque tu és comigo.",
        pratica: "Quando o medo vier hoje, feche a mão direita e lembre: ele me segura.",
      },
      {
        titulo: "No dia em que eu temer",
        leitura: { slug: "sl", capitulo: 56, de: 3, ate: 4 },
        reflexao: [
          "Davi não diz \"eu nunca temo\". Diz: \"No dia em que eu temer, hei de confiar em ti.\" O medo vai aparecer. A questão é o que fazer com ele.",
          "Confiar não apaga o medo na hora. Mas tira dele o controle. Davi decide antes, para quando o medo chegar ele já saber para onde correr.",
        ],
        pergunta: "O que você costuma fazer quando o medo chega?",
        oracao: "Senhor, no dia em que eu temer, eu vou confiar em ti.",
        pratica: "Decida agora uma frase curta para orar sempre que sentir medo.",
      },
      {
        titulo: "Andar sobre as águas",
        leitura: { slug: "mt", capitulo: 14, de: 25, ate: 33 },
        reflexao: [
          "Pedro é o único que sai do barco. Anda sobre as águas enquanto olha para Jesus. Quando presta atenção no vento, afunda.",
          "Mas repare: quando ele grita \"Senhor, salva-me\", Jesus \"imediatamente\" estende a mão. Até o afundar de Pedro termina nos braços de Jesus. Melhor afundar tentando do que nunca sair do barco.",
        ],
        pergunta: "Que \"barco\" seguro você tem medo de deixar?",
        oracao: "Jesus, quero sair do barco e ir até ti. Quando eu afundar, estende a tua mão.",
        pratica: "Dê hoje um passo de fé que você vem adiando por medo.",
      },
      {
        titulo: "Não um espírito de covardia",
        leitura: { slug: "2tm", capitulo: 1, de: 6, ate: 8 },
        reflexao: [
          "Paulo escreve a Timóteo, um jovem líder que parece tímido. E lembra: \"Deus não nos deu o espírito de covardia, mas de poder, de amor e de moderação.\"",
          "Repare nas três palavras: poder, amor e moderação. A coragem cristã não é agressiva nem descontrolada. É firme, cheia de amor e equilibrada.",
        ],
        pergunta: "Em que área a timidez tem te impedido de usar o que Deus te deu?",
        oracao: "Espírito Santo, desperta em mim o poder, o amor e a moderação que vêm de ti.",
        pratica: "Use hoje um dom seu que você costuma esconder por vergonha.",
      },
      {
        titulo: "O amor lança fora o medo",
        leitura: { slug: "1jo", capitulo: 4, de: 16, ate: 18 },
        reflexao: [
          "\"O perfeito amor lança fora o medo.\" João fala especificamente do medo do castigo, de não ser aceito por Deus. Muita gente vive a fé com esse medo de fundo.",
          "Mas quem conhece o amor de Deus não precisa viver com medo de ser rejeitado. O amor não deixa espaço para o medo morar.",
        ],
        pergunta: "Você tem algum medo de Deus que não combina com o amor dele?",
        oracao: "Pai, lança fora do meu coração todo medo de não ser amado por ti.",
        pratica: "Escreva um medo seu e, ao lado, uma verdade sobre o amor de Deus.",
      },
      {
        titulo: "E se não?",
        leitura: { slug: "dn", capitulo: 3, de: 16, ate: 18 },
        reflexao: [
          "Três jovens diante de uma fornalha. Eles dizem ao rei que Deus pode livrá-los. E depois uma das frases mais corajosas da Bíblia: \"Mas se não\", ainda assim não vamos adorar a estátua.",
          "A fé deles não dependia do resultado. Essa é a coragem mais profunda: confiar em Deus mesmo sem garantia de que tudo vai sair como queremos. A capa deste devocional mostra o que aconteceu: havia um quarto homem no fogo.",
        ],
        pergunta: "Sua fé depende de Deus fazer o que você quer?",
        oracao: "Senhor, eu sei que tu podes me livrar. E, se não, eu continuo confiando em ti.",
        pratica: "Ore por um medo seu terminando com: \"e, se não, ainda assim eu confio\".",
      },
    ],
  },

  {
    id: "perdoar",
    titulo: "Perdoar quem me feriu",
    chamada: "Sete dias para soltar o que machuca",
    descricao:
      "Perdoar não é dizer que não doeu, nem fingir que nada aconteceu, nem voltar a confiar de uma hora para outra. É soltar o direito de cobrar. Sete dias para olhar com honestidade uma das coisas mais difíceis que Jesus pede.",
    categoria: "carater",
    capa: { slug: "gn", capitulo: 45 },
    cor: "#8f9a5c",
    dias: [
      {
        titulo: "Até quantas vezes?",
        leitura: { slug: "mt", capitulo: 18, de: 21, ate: 22 },
        reflexao: [
          "Pedro acha que está sendo generoso ao propor perdoar sete vezes. Jesus responde: \"até setenta vezes sete\". Não é um número para contar, é para parar de contar.",
          "O perdão não é um saldo que acaba. É um jeito de viver. E isso começa reconhecendo que não é fácil: se fosse, Pedro nem teria perguntado.",
        ],
        pergunta: "Você tem contado quantas vezes já perdoou alguém?",
        oracao: "Senhor, ensina-me a parar de contar. Dá-me um coração que perdoa.",
        pratica: "Pense em uma pessoa com quem você está \"contando\" e ore por ela hoje.",
      },
      {
        titulo: "A dívida impagável",
        leitura: { slug: "mt", capitulo: 18, de: 23, ate: 35 },
        reflexao: [
          "Um servo deve dez mil talentos, uma fortuna impossível de pagar, e é perdoado. Logo depois, sufoca um colega que lhe devia cem denários, uma quantia pequena.",
          "A parábola mostra de onde vem a força para perdoar: lembrar o tamanho do que eu fui perdoado. Quem esquece a própria dívida fica duro com a dívida dos outros.",
        ],
        pergunta: "Você se lembra do tamanho do perdão que recebeu de Deus?",
        oracao: "Deus, tu perdoaste a minha dívida impagável. Ajuda-me a perdoar as dívidas pequenas.",
        pratica: "Liste três coisas pelas quais Deus já te perdoou.",
      },
      {
        titulo: "José chorou",
        leitura: { slug: "gn", capitulo: 45, de: 1, ate: 5 },
        reflexao: [
          "Os irmãos de José o venderam como escravo. Anos depois, ele está no poder e eles estão diante dele, sem reconhecê-lo. José chora tão alto que o Egito inteiro ouve.",
          "Perdoar não exige fingir que não doeu. José chorou, e depois disse: \"Chegai-vos a mim\". O perdão dele começou com lágrimas e terminou em aproximação.",
        ],
        pergunta: "Que dor você precisa chorar antes de conseguir perdoar?",
        oracao: "Senhor, a ferida ainda dói. Ajuda-me a chorar com honestidade e a perdoar com verdade.",
        pratica: "Escreva, só para Deus, o que te machucou e como você se sentiu.",
      },
      {
        titulo: "Deus o intentou para o bem",
        leitura: { slug: "gn", capitulo: 50, de: 15, ate: 21 },
        reflexao: [
          "Depois da morte do pai, os irmãos de José ainda têm medo da vingança. E ele responde: \"Vós, na verdade, intentastes o mal contra mim; Deus, porém, o intentou para o bem.\"",
          "José não chama o mal de bem. Ele nomeia o que fizeram. Mas enxerga Deus agindo por cima disso. E pergunta: \"acaso estou eu em lugar de Deus?\". Perdoar é tirar a vingança das próprias mãos.",
        ],
        pergunta: "Você consegue ver Deus agindo, mesmo naquilo que te fizeram de mal?",
        oracao: "Deus, eu não estou no teu lugar. Entrego a ti a justiça, e confio que tu transformas o mal em bem.",
        pratica: "Entregue em oração o desejo de vingança contra alguém.",
      },
      {
        titulo: "Vencer o mal com o bem",
        leitura: { slug: "rm", capitulo: 12, de: 17, ate: 21 },
        reflexao: [
          "\"Não vos vingueis a vós mesmos.\" Paulo não diz que a injustiça não importa. Diz que a vingança pertence a Deus, que é justo.",
          "E propõe algo mais ousado: dar comida ao inimigo com fome. \"Não te deixes vencer do mal, mas vence o mal com o bem.\" Responder ao mal com o mal é deixar o mal ganhar duas vezes.",
        ],
        pergunta: "Há alguém a quem você tem respondido com a mesma moeda?",
        oracao: "Senhor, não quero ser vencido pelo mal. Ensina-me a vencê-lo com o bem.",
        pratica: "Faça hoje um bem a alguém que te fez mal, mesmo pequeno.",
      },
      {
        titulo: "Primeiro, reconcilia-te",
        leitura: { slug: "mt", capitulo: 5, de: 23, ate: 24 },
        reflexao: [
          "Jesus diz que, se lembrarmos que alguém tem algo contra nós, devemos deixar a oferta no altar e ir primeiro fazer as pazes. A relação com Deus e a relação com os outros estão ligadas.",
          "Repare: aqui o problema é \"teu irmão tem alguma coisa contra ti\". Às vezes quem precisa pedir perdão somos nós.",
        ],
        pergunta: "Existe alguém que tem algo contra você, e você sabe por quê?",
        oracao: "Senhor, mostra-me onde eu feri alguém, e dá-me humildade para pedir perdão.",
        pratica: "Peça perdão hoje a alguém que você magoou.",
      },
      {
        titulo: "Pai, perdoa-lhes",
        leitura: { slug: "lc", capitulo: 23, de: 32, ate: 34 },
        reflexao: [
          "Pregado na cruz, enquanto os soldados sorteiam as roupas dele, Jesus ora: \"Pai, perdoa-lhes; porque não sabem o que fazem.\"",
          "Este é o modelo, e também a fonte. Ninguém perdoa só na força de vontade. A gente perdoa porque foi perdoado primeiro, e pede a Jesus o coração que ele teve na cruz.",
        ],
        pergunta: "Que nome você precisa colocar nessa oração: \"Pai, perdoa-lhes\"?",
        oracao: "Jesus, tu perdoaste na cruz. Dá-me o teu coração. Pai, eu perdoo, e peço que tu também perdoes.",
        pratica: "Ore pelo bem da pessoa que você decidiu perdoar.",
      },
    ],
  },

  {
    id: "no-deserto",
    titulo: "No deserto",
    chamada: "Quando Deus parece longe",
    descricao:
      "Na Bíblia, o deserto aparece muito: Israel, Elias, o próprio Jesus. É o lugar seco, solitário, onde parece que nada acontece. E também o lugar onde Deus forma, sustenta e fala ao coração. Sete dias para quem está atravessando um.",
    categoria: "coracao",
    capa: { slug: "1rs", capitulo: 19 },
    cor: "#b8935a",
    dias: [
      {
        titulo: "Já basta",
        leitura: { slug: "1rs", capitulo: 19, de: 1, ate: 8 },
        reflexao: [
          "Elias tinha acabado de viver uma vitória enorme. Agora foge, se senta debaixo de uma árvore e pede para morrer: \"Já basta, ó Senhor\". Esgotamento depois da vitória é real.",
          "E repare na resposta de Deus: nenhum sermão. Um anjo toca nele e diz \"Levanta-te e come\". Duas vezes. Às vezes o mais espiritual a fazer é comer e dormir.",
        ],
        pergunta: "Você está cansado a ponto de dizer \"já basta\"?",
        oracao: "Senhor, eu estou esgotado. Cuida de mim como cuidaste de Elias.",
        pratica: "Cuide hoje do corpo: coma bem, beba água e durma mais cedo.",
      },
      {
        titulo: "Uma voz mansa e delicada",
        leitura: { slug: "1rs", capitulo: 19, de: 9, ate: 13 },
        reflexao: [
          "Elias espera Deus no vento, no terremoto, no fogo. Deus não está em nenhum deles. Depois vem \"uma voz mansa e delicada\".",
          "Às vezes a gente espera Deus no espetacular e não percebe o sussurro. No deserto, Deus costuma falar baixo. É preciso silêncio para ouvir.",
        ],
        pergunta: "Você tem esperado Deus só no barulho?",
        oracao: "Senhor, ensina-me a ouvir a tua voz mansa e delicada.",
        pratica: "Faça dez minutos de silêncio hoje, sem música, sem tela, só ouvindo.",
      },
      {
        titulo: "Pão para hoje",
        leitura: { slug: "ex", capitulo: 16, de: 11, ate: 18 },
        reflexao: [
          "No deserto, Israel reclama de fome, e Deus manda o maná, um pão que aparece toda manhã. O nome vem da pergunta deles: \"Que é isto?\".",
          "Cada um colhia o suficiente para o dia: \"nada sobejava ao que colhera muito, nem faltava ao que colhera pouco\". No deserto, Deus não dá o estoque do mês. Dá o pão de hoje.",
        ],
        pergunta: "Você tem pedido a Deus o estoque do mês em vez do pão de hoje?",
        oracao: "Senhor, dá-me o pão de hoje. Eu confio que amanhã também haverá.",
        pratica: "Agradeça hoje por cada provisão do dia, uma por uma.",
      },
      {
        titulo: "Para saber o que havia no coração",
        leitura: { slug: "dt", capitulo: 8, de: 2, ate: 5 },
        reflexao: [
          "Moisés olha para trás, para os quarenta anos no deserto, e explica: Deus os levou ali \"para saber o que estava no teu coração\". O deserto revela.",
          "E também ensina: \"o homem não vive só de pão, mas de tudo o que sai da boca do Senhor\". Mesmo nos anos secos, as roupas não envelheceram. Deus sustentou o tempo todo.",
        ],
        pergunta: "O que o seu deserto tem revelado sobre o seu coração?",
        oracao: "Deus, sonda o meu coração no deserto. Ensina-me a viver da tua palavra.",
        pratica: "Escreva algo que você aprendeu sobre si mesmo num tempo difícil.",
      },
      {
        titulo: "Sede de Deus",
        leitura: { slug: "sl", capitulo: 63, de: 1, ate: 8 },
        reflexao: [
          "O título do salmo diz que Davi o escreveu no deserto de Judá. E ele transforma a sede física em oração: \"A minha alma tem sede de ti\" em \"uma terra seca e cansada, onde não há água\".",
          "O deserto pode aumentar a fome de Deus. \"A tua benignidade é melhor do que a vida.\" Quando tudo mais seca, fica mais claro o que realmente sacia.",
        ],
        pergunta: "O seu deserto tem aumentado ou diminuído a sua sede de Deus?",
        oracao: "Ó Deus, tu és o meu Deus. A minha alma tem sede de ti.",
        pratica: "Leia este salmo em voz alta, como oração sua.",
      },
      {
        titulo: "Jesus também foi",
        leitura: { slug: "mt", capitulo: 4, de: 1, ate: 4 },
        reflexao: [
          "Logo depois do batismo, quando o Pai acabara de dizer \"Este é o meu Filho amado\", o texto conta: \"foi conduzido Jesus pelo Espírito ao deserto\". O deserto não significa que Deus te abandonou.",
          "Com fome, Jesus é tentado a resolver tudo do jeito rápido. E responde com a mesma frase de Deuteronômio que lemos: \"Nem só de pão viverá o homem.\" Ele atravessou o deserto antes de nós.",
        ],
        pergunta: "Qual atalho você é tentado a pegar no seu deserto?",
        oracao: "Jesus, tu atravessaste o deserto. Caminha comigo no meu.",
        pratica: "Identifique um atalho que te tenta e diga não a ele hoje.",
      },
      {
        titulo: "Porta de esperança",
        leitura: { slug: "os", capitulo: 2, de: 14, ate: 15 },
        reflexao: [
          "Deus fala de um povo infiel e diz: \"eu a atrairei, e a levarei para o deserto, e lhe falarei ao coração\". O deserto aqui é lugar de reconquista amorosa.",
          "E faz uma promessa linda: o \"vale de Acor\", um nome que lembrava derrota e tristeza, vira \"porta de esperança\". O deserto não é o fim. É uma passagem.",
        ],
        pergunta: "Que lugar de tristeza na sua vida Deus pode transformar em porta de esperança?",
        oracao: "Senhor, fala ao meu coração aqui no deserto. Transforma o meu vale em porta de esperança.",
        pratica: "Escreva uma esperança concreta para depois do seu deserto.",
      },
    ],
  },

  {
    id: "gente-de-fe",
    titulo: "Gente de fé",
    chamada: "O que é crer, com quem creu antes",
    descricao:
      "Fé não é ter certeza de tudo, nem sentir sempre a mesma coisa. Na Bíblia, fé é confiar em Deus o suficiente para dar o próximo passo. Sete dias com Abraão, Moisés, um pai desesperado e outros que creram, às vezes tremendo.",
    categoria: "vida-com-deus",
    capa: { slug: "gn", capitulo: 15 },
    cor: "#5f7fb5",
    dias: [
      {
        titulo: "O que é fé",
        leitura: { slug: "hb", capitulo: 11, de: 1, ate: 6 },
        reflexao: [
          "\"A fé é o firme fundamento das coisas que se esperam, e a prova das coisas que não se vêem.\" Fé é apoiar o peso no que Deus prometeu, mesmo antes de ver.",
          "E o versículo 6 diz o mínimo da fé: crer \"que ele existe, e que é galardoador dos que o buscam\". Fé começa acreditando que vale a pena buscar a Deus.",
        ],
        pergunta: "Em que promessa de Deus você está apoiando o seu peso?",
        oracao: "Senhor, eu creio que tu existes e que recompensas quem te busca. Aumenta a minha fé.",
        pratica: "Escreva uma promessa de Deus em que você quer crer mais.",
      },
      {
        titulo: "Conta as estrelas",
        leitura: { slug: "gn", capitulo: 15, de: 1, ate: 6 },
        reflexao: [
          "Abrão está velho, sem filhos, e reclama com Deus. Deus o leva para fora e diz: \"Olha agora para o céu, e conta as estrelas\". Assim será a tua descendência.",
          "E então: \"creu Abrão no Senhor, e o Senhor imputou-lhe isto como justiça\". Não houve sinal visível naquela noite. Só uma promessa e um céu cheio de estrelas. A capa deste devocional é essa noite.",
        ],
        pergunta: "Que promessa de Deus parece impossível na sua situação?",
        oracao: "Senhor, como Abrão, eu olho para o céu e escolho crer na tua promessa.",
        pratica: "Se puder, olhe o céu à noite hoje e ore pela promessa que parece impossível.",
      },
      {
        titulo: "Sem saber para onde",
        leitura: { slug: "hb", capitulo: 11, de: 8, ate: 10 },
        reflexao: [
          "\"Pela fé Abraão, sendo chamado, obedeceu, saindo para um lugar que havia de receber por herança; e saiu, sem saber para onde ia.\"",
          "Fé às vezes é obedecer sem ter o mapa completo. Abraão viveu em tendas a vida toda, porque esperava \"a cidade que tem os fundamentos\". Ele sabia que a casa definitiva ainda não era aqui.",
        ],
        pergunta: "Deus tem te chamado para algo sem mostrar o destino final?",
        oracao: "Deus, eu não sei para onde, mas sei com quem. Dá-me fé para sair.",
        pratica: "Dê hoje um passo de obediência em algo que Deus tem colocado no seu coração.",
      },
      {
        titulo: "Estai quietos",
        leitura: { slug: "ex", capitulo: 14, de: 10, ate: 14 },
        reflexao: [
          "Mar na frente, exército egípcio atrás. O povo entra em pânico e começa a reclamar. Moisés responde: \"Não temais; estai quietos, e vede o livramento do Senhor\".",
          "\"O Senhor pelejará por vós; e vós vos calareis.\" Às vezes a fé é agir. Às vezes é parar de se agitar e deixar Deus agir.",
        ],
        pergunta: "Em que situação você precisa parar de se agitar e deixar Deus pelejar?",
        oracao: "Senhor, tu pelejas por mim. Eu me aquieto e espero o teu livramento.",
        pratica: "Entregue hoje uma situação que você não consegue resolver, e pare de remoê-la.",
      },
      {
        titulo: "Ajuda a minha incredulidade",
        leitura: { slug: "mc", capitulo: 9, de: 20, ate: 24 },
        reflexao: [
          "Um pai traz o filho doente e diz a Jesus: \"se podes fazer alguma coisa\". Jesus devolve: \"Se podes!\". E o pai responde com a oração mais honesta da Bíblia: \"Creio! Ajuda a minha incredulidade.\"",
          "Ele cria e duvidava ao mesmo tempo. E Jesus curou o menino. Fé imperfeita entregue a Jesus continua sendo fé.",
        ],
        pergunta: "Você tem medo de que a sua dúvida desqualifique a sua fé?",
        oracao: "Senhor, eu creio. Ajuda a minha incredulidade.",
        pratica: "Ore hoje sobre uma dúvida, com a honestidade daquele pai.",
      },
      {
        titulo: "Um grão de mostarda",
        leitura: { slug: "lc", capitulo: 17, de: 5, ate: 6 },
        reflexao: [
          "Os apóstolos pedem: \"Aumenta-nos a fé\". Jesus responde que fé do tamanho de um grão de mostarda, uma das menores sementes que eles conheciam, já bastaria.",
          "O poder não está no tamanho da fé, e sim em quem ela confia. Uma fé pequena apoiada num Deus grande move mais do que uma fé grande apoiada em si mesma.",
        ],
        pergunta: "Você tem medido a sua fé pelo tamanho ou por quem ela confia?",
        oracao: "Senhor, minha fé é pequena, mas tu és grande. Eu confio em ti.",
        pratica: "Ore hoje por algo grande, com a fé que você tem.",
      },
      {
        titulo: "Ainda que a figueira não floresça",
        leitura: { slug: "hc", capitulo: 3, de: 17, ate: 19 },
        reflexao: [
          "Habacuque lista tudo dando errado: nada de figo, nada de uva, nada de azeite, nada de gado. Para um povo agricultor, era o colapso completo.",
          "\"Todavia eu me alegrarei no Senhor.\" Esta é a fé mais madura: não depende de as coisas darem certo. Deus continua sendo a força, mesmo quando tudo falha.",
        ],
        pergunta: "Se tudo falhasse, Deus ainda seria suficiente para você?",
        oracao: "Senhor, ainda que tudo falhe, eu me alegrarei em ti. Tu és a minha força.",
        pratica: "Escreva o seu próprio \"ainda que\", com as coisas que você teme perder, e termine com \"todavia eu me alegrarei no Senhor\".",
      },
    ],
  },
];
