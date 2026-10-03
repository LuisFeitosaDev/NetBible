/**
 * Gente da Bíblia (histórias de personagens) e Família e amizades.
 * Mesmos critérios de escrita de `devocionais.dados.ts`.
 */
import type { Devocional } from "./devocionais";

export const PERSONAGENS: Devocional[] = [
  {
    id: "davi",
    titulo: "Davi",
    chamada: "Do pasto ao trono, com quedas no caminho",
    descricao:
      "Pastor, músico, guerreiro, rei, adúltero, arrependido. Davi é chamado de homem segundo o coração de Deus, e mesmo assim errou feio. Seis dias com a vida de quem foi escolhido pelo coração e não pela aparência.",
    categoria: "personagens",
    capa: { slug: "1sm", capitulo: 16 },
    cor: "#c48a3f",
    dias: [
      {
        titulo: "Ainda falta o menor",
        leitura: { slug: "1sm", capitulo: 16, de: 6, ate: 13 },
        reflexao: [
          "Samuel olha os irmãos altos e fortes de Davi. Deus o corrige: \"o Senhor não vê como vê o homem\", \"o Senhor olha para o coração\".",
          "Davi nem foi chamado para a reunião. Estava com as ovelhas: \"Ainda falta o menor\". Deus escolhe quem os outros esquecem.",
        ],
        pergunta: "Você já se sentiu esquecido, o \"menor\" que ninguém chamou?",
        oracao: "Senhor, tu olhas o coração. Obrigado por me veres quando ninguém vê.",
        pratica: "Faça hoje com fidelidade uma tarefa pequena que ninguém valoriza.",
      },
      {
        titulo: "Em nome do Senhor",
        leitura: { slug: "1sm", capitulo: 17, de: 41, ate: 47 },
        reflexao: [
          "Golias vem armado até os dentes. Davi responde: \"eu venho a ti em nome do Senhor dos exércitos\".",
          "Davi não era ingênuo sobre o gigante. Ele só sabia que \"do Senhor é a batalha\". A coragem dele não vinha da funda, mas de quem ia com ele.",
        ],
        pergunta: "Qual é o gigante que você está enfrentando?",
        oracao: "Senhor dos exércitos, eu enfrento o meu gigante em teu nome. A batalha é tua.",
        pratica: "Dê hoje um passo concreto contra um \"gigante\" que você vem evitando.",
      },
      {
        titulo: "Doeu o coração",
        leitura: { slug: "1sm", capitulo: 24, de: 4, ate: 7 },
        reflexao: [
          "Saul queria matar Davi. Na caverna, Davi tem a chance perfeita de se vingar e só corta um pedaço do manto. Mesmo assim, \"doeu o coração de Davi\".",
          "\"O Senhor me guarde de que eu faça tal coisa.\" Davi deixou a justiça nas mãos de Deus, mesmo quando todo mundo dizia que era a hora certa.",
        ],
        pergunta: "Você tem uma \"chance de vingança\" esperando a sua decisão?",
        oracao: "Senhor, guarda-me de fazer justiça com as minhas mãos.",
        pratica: "Renuncie hoje a dar o troco em alguém.",
      },
      {
        titulo: "Dançando diante do Senhor",
        leitura: { slug: "2sm", capitulo: 6, de: 12, ate: 15 },
        reflexao: [
          "Quando a arca chega a Jerusalém, o rei não fica parado no trono: \"Davi dançava com todas as suas forças diante do Senhor\".",
          "Davi não ligou para o que iam pensar. A alegria da presença de Deus era maior que a imagem de rei.",
        ],
        pergunta: "Você tem medo de parecer exagerado na sua alegria com Deus?",
        oracao: "Senhor, que eu te adore com todas as minhas forças, sem vergonha.",
        pratica: "Coloque uma música de louvor e adore sem se preocupar com a aparência.",
      },
      {
        titulo: "Esse homem és tu",
        leitura: { slug: "2sm", capitulo: 12, de: 1, ate: 7 },
        reflexao: [
          "Depois do adultério com Bate-Seba e da morte de Urias, o profeta Natã conta uma história sobre injustiça. Davi se indigna, e Natã aponta: \"Esse homem és tu!\"",
          "Davi poderia ter se defendido. Mas reconheceu o pecado. Daí nasceu o Salmo 51. A grandeza dele não estava em nunca cair, mas em se arrepender.",
        ],
        pergunta: "Em que área você enxerga o erro dos outros e não o seu?",
        oracao: "Senhor, mostra-me onde eu sou \"esse homem\". Quero me arrepender.",
        pratica: "Leia o Salmo 51 como oração sua.",
      },
      {
        titulo: "Quem sou eu?",
        leitura: { slug: "2sm", capitulo: 7, de: 18, ate: 22 },
        reflexao: [
          "Depois de receber uma promessa enorme de Deus, Davi senta diante dele e pergunta: \"Quem sou eu, Senhor Jeová\".",
          "No fim da história, o pastor que virou rei continua admirado com a graça. Essa é a postura de quem conhece a Deus: espanto e gratidão.",
        ],
        pergunta: "Olhando para trás, o que Deus fez que te deixa sem palavras?",
        oracao: "Quem sou eu, Senhor, para me teres trazido até aqui? Obrigado.",
        pratica: "Escreva a sua própria lista de \"até aqui me trouxe o Senhor\".",
      },
    ],
  },

  {
    id: "rute",
    titulo: "Rute",
    chamada: "Lealdade, colheita e redenção",
    descricao:
      "Uma estrangeira viúva que decide ficar com a sogra, também viúva. Um livro curto, sem milagres espetaculares, onde Deus age por meio de lealdade, trabalho e bondade. Quatro dias, um capítulo por dia.",
    categoria: "personagens",
    capa: { slug: "rt", capitulo: 1 },
    cor: "#d6b36a",
    dias: [
      {
        titulo: "Aonde quer que fores",
        leitura: { slug: "rt", capitulo: 1, de: 15, ate: 18 },
        reflexao: [
          "Noemi perdeu marido e filhos e manda as noras voltarem para casa. Rute se recusa: \"o teu povo será o meu povo, o teu Deus será o meu Deus\".",
          "Rute escolhe ficar quando ir embora era o mais fácil. Lealdade é decidir permanecer quando a outra pessoa não tem mais nada a oferecer.",
        ],
        pergunta: "Com quem Deus está te chamando a ser leal, mesmo sem vantagem nenhuma?",
        oracao: "Senhor, dá-me um coração leal como o de Rute.",
        pratica: "Esteja presente hoje para alguém que está passando por um tempo difícil.",
      },
      {
        titulo: "Sob as asas de Deus",
        leitura: { slug: "rt", capitulo: 2, de: 8, ate: 12 },
        reflexao: [
          "Rute vai catar espigas no campo de Boaz, que a trata com bondade. Ela se surpreende: \"Por que achei eu graça aos teus olhos\".",
          "Boaz abençoa: ela veio se abrigar sob as asas do Deus de Israel, \"sob cujas asas te vieste abrigar\". Deus cuida de quem se refugia nele, às vezes por meio de gente bondosa.",
        ],
        pergunta: "Por meio de quem Deus tem cuidado de você?",
        oracao: "Deus, obrigado por me abrigares debaixo das tuas asas.",
        pratica: "Seja hoje a resposta de Deus para alguém, como Boaz foi para Rute.",
      },
      {
        titulo: "Tu és o remidor",
        leitura: { slug: "rt", capitulo: 3, de: 9, ate: 11 },
        reflexao: [
          "Rute pede a Boaz: \"estende a tua capa sobre a tua serva, porque tu és o remidor\". O remidor era o parente que resgatava a família da ruína.",
          "Boaz responde que toda a cidade sabe que ela \"és mulher virtuosa\". A história aponta para algo maior: um Redentor que resgata quem não pode se salvar.",
        ],
        pergunta: "Do que você precisa ser resgatado hoje?",
        oracao: "Jesus, meu Redentor, estende sobre mim a tua proteção.",
        pratica: "Agradeça hoje a Jesus pelo resgate que ele fez por você.",
      },
      {
        titulo: "Pai de Jessé, pai de Davi",
        leitura: { slug: "rt", capitulo: 4, de: 13, ate: 17 },
        reflexao: [
          "Rute e Boaz se casam e têm um filho. Noemi, que tinha perdido tudo, segura o neto no colo.",
          "E o livro termina com uma genealogia: \"Este é o pai de Jessé, pai de Davi\". Uma estrangeira entrou na linhagem do rei, e de Jesus. Deus escreve histórias grandes com fidelidades pequenas.",
        ],
        pergunta: "Que fidelidade pequena sua pode fazer parte de uma história maior?",
        oracao: "Senhor, usa a minha vida simples numa história maior que a minha.",
        pratica: "Continue hoje fiel em algo pequeno, confiando que Deus vê.",
      },
    ],
  },

  {
    id: "jose-do-egito",
    titulo: "José do Egito",
    chamada: "Do poço ao palácio",
    descricao:
      "Odiado pelos irmãos, vendido como escravo, preso injustamente, esquecido por quem ajudou. E, em cada fase, a mesma frase: o Senhor era com José. Seis dias com quem esperou anos sem desistir.",
    categoria: "personagens",
    capa: { slug: "gn", capitulo: 41 },
    cor: "#a8743f",
    dias: [
      {
        titulo: "O sonhador na cova",
        leitura: { slug: "gn", capitulo: 37, de: 18, ate: 24 },
        reflexao: [
          "Os irmãos o veem chegando e zombam: \"Eis que lá vem o sonhador!\". Tiram a túnica dele e o jogam numa cova onde \"a cova estava vazia, não havia água nela\".",
          "O sonho de José parecia morto no fundo do poço. Mas a história estava só começando.",
        ],
        pergunta: "Que sonho seu parece estar no fundo de uma cova?",
        oracao: "Senhor, mesmo no poço, eu confio que a história não terminou.",
        pratica: "Escreva um sonho que você entregou a Deus e ainda não viu se cumprir.",
      },
      {
        titulo: "O Senhor era com José",
        leitura: { slug: "gn", capitulo: 39, de: 2, ate: 5 },
        reflexao: [
          "Vendido como escravo, longe de casa, a Bíblia resume: \"o Senhor era com José\". E José trabalha tão bem que vira administrador da casa.",
          "Deus não tirou José da escravidão logo. Mas esteve com ele lá dentro. Às vezes a presença de Deus vem antes da saída.",
        ],
        pergunta: "Você consegue ver Deus com você mesmo num lugar que não escolheu?",
        oracao: "Senhor, sê comigo aqui, onde eu não queria estar.",
        pratica: "Faça hoje o seu trabalho com excelência, mesmo num lugar que você não escolheu.",
      },
      {
        titulo: "Preso injustamente",
        leitura: { slug: "gn", capitulo: 39, de: 20, ate: 23 },
        reflexao: [
          "Acusado falsamente, José vai para a prisão. Fez tudo certo e se deu mal. E de novo: \"O Senhor, porém, era com José\".",
          "Até na prisão ele se destaca. A injustiça não apagou o caráter dele. Deus não desperdiça nem os anos na cadeia.",
        ],
        pergunta: "Você já sofreu por fazer o certo?",
        oracao: "Deus, quando a injustiça me atingir, que eu continue fiel.",
        pratica: "Continue fazendo o certo hoje, mesmo sem reconhecimento.",
      },
      {
        titulo: "Esquecido",
        leitura: { slug: "gn", capitulo: 40, de: 20, ate: 23 },
        reflexao: [
          "José ajuda um companheiro de prisão e só pede para ser lembrado. Mas \"o copeiro-mor, porém, não se lembrou de José, antes se esqueceu dele\". Foram mais dois anos de espera.",
          "Às vezes a gente faz o bem e é esquecido. Mas Deus não esquece. Ele estava esperando a hora certa.",
        ],
        pergunta: "Quem te esqueceu depois de você ter ajudado?",
        oracao: "Senhor, mesmo quando as pessoas me esquecem, tu te lembras de mim.",
        pratica: "Faça hoje o bem a alguém sem esperar retorno.",
      },
      {
        titulo: "Não está em mim",
        leitura: { slug: "gn", capitulo: 41, de: 14, ate: 16 },
        reflexao: [
          "Finalmente, José é chamado diante do Faraó. Era a chance de se promover. Mas ele diz: \"Isso não está em mim, mas Deus é que dará\" a resposta.",
          "Depois de treze anos de sofrimento, José não ficou amargo nem arrogante. Deu a glória a Deus.",
        ],
        pergunta: "Quando chega a sua chance, você aponta para você ou para Deus?",
        oracao: "Senhor, que eu dê a ti a glória pelo que me capacitas a fazer.",
        pratica: "Ao receber um elogio hoje, agradeça e reconheça a ajuda de Deus.",
      },
      {
        titulo: "Do poço ao palácio",
        leitura: { slug: "gn", capitulo: 41, de: 37, ate: 41 },
        reflexao: [
          "O Faraó reconhece: um homem \"em quem haja o espírito de Deus\". E coloca José sobre todo o Egito. O escravo virou governador.",
          "Cada fase dolorosa preparou José para salvar muita gente na fome. Deus estava tecendo algo maior o tempo todo.",
        ],
        pergunta: "Que fase difícil sua pode estar te preparando para algo?",
        oracao: "Deus, confio que tu estás tecendo algo bom com todos os fios da minha história.",
        pratica: "Agradeça hoje por uma fase difícil que te formou.",
      },
    ],
  },

  {
    id: "ester",
    titulo: "Ester",
    chamada: "Para um momento como este",
    descricao:
      "Uma jovem órfã vira rainha no império persa e descobre que seu povo vai ser exterminado. Falar podia custar a vida. Cinco dias sobre coragem, propósito e um Deus que age nos bastidores.",
    categoria: "personagens",
    capa: { slug: "et", capitulo: 4 },
    cor: "#b0607e",
    dias: [
      {
        titulo: "Graça aos olhos de todos",
        leitura: { slug: "et", capitulo: 2, de: 15, ate: 17 },
        reflexao: [
          "Ester era órfã, criada pelo primo Mordecai, numa terra estrangeira. Mesmo assim, \"Ester alcançava graça aos olhos de todos quantos a viam\".",
          "O livro de Ester nunca cita o nome de Deus. Mas ele está em cada detalhe, colocando a pessoa certa no lugar certo.",
        ],
        pergunta: "Onde Deus pode estar agindo nos bastidores da sua vida?",
        oracao: "Senhor, mesmo quando eu não te vejo, sei que estás agindo.",
        pratica: "Anote algo que parecia acaso e que hoje você vê como cuidado de Deus.",
      },
      {
        titulo: "Para tal tempo como este",
        leitura: { slug: "et", capitulo: 4, de: 10, ate: 14 },
        reflexao: [
          "Ester tem medo: entrar sem ser chamada podia significar a morte. Mordecai responde com a pergunta mais famosa do livro: \"quem sabe se não foi para tal tempo como este que chegaste ao reino?\"",
          "Onde você está não é por acaso. Talvez Deus te colocou ali exatamente para este momento.",
        ],
        pergunta: "Para que \"tempo como este\" Deus pode ter te colocado onde você está?",
        oracao: "Deus, mostra-me por que me colocaste onde estou.",
        pratica: "Identifique uma situação em que você pode fazer diferença e aja.",
      },
      {
        titulo: "Se eu perecer, pereci",
        leitura: { slug: "et", capitulo: 4, de: 15, ate: 17 },
        reflexao: [
          "Ester decide: pede que todos jejuem com ela por três dias, e diz: \"e se eu perecer, pereci\".",
          "A coragem dela começa com jejum e oração em comunidade. Ela não foi sozinha, e não foi sem orar.",
        ],
        pergunta: "Que passo corajoso você precisa dar, e quem poderia orar com você?",
        oracao: "Senhor, dá-me coragem. Se custar caro, que eu ainda assim faça o certo.",
        pratica: "Peça a alguém que ore por você antes de uma decisão difícil.",
      },
      {
        titulo: "O cetro de ouro",
        leitura: { slug: "et", capitulo: 5, de: 1, ate: 3 },
        reflexao: [
          "No terceiro dia, Ester se apresenta ao rei. E \"o rei estendeu para Ester o cetro de ouro\". Ela foi recebida.",
          "O medo era real, mas a porta se abriu. Muitas vezes a parte mais difícil da coragem é atravessar a porta.",
        ],
        pergunta: "Que porta você tem medo de atravessar?",
        oracao: "Deus, eu entro. Abre a porta na hora certa.",
        pratica: "Faça hoje a conversa difícil que você vem adiando.",
      },
      {
        titulo: "Eu e o meu povo",
        leitura: { slug: "et", capitulo: 7, de: 3, ate: 6 },
        reflexao: [
          "No banquete, Ester se coloca ao lado do seu povo: \"seja-me concedida a minha vida, eis a minha petição, e o meu povo, eis o meu rogo\".",
          "Ela podia ter ficado em segurança no palácio. Mas usou a posição para defender os outros. Influência é para servir.",
        ],
        pergunta: "Como você pode usar a sua posição para defender quem não tem voz?",
        oracao: "Senhor, que eu use o que tenho para defender quem precisa.",
        pratica: "Fale hoje em favor de alguém que está sendo injustiçado.",
      },
    ],
  },

  {
    id: "daniel",
    titulo: "Daniel",
    chamada: "Fiel em terra estranha",
    descricao:
      "Levado como prisioneiro para a Babilônia ainda jovem, Daniel viveu a vida inteira num lugar que não era o dele, servindo reis pagãos sem perder a fé. Cinco dias sobre integridade quando tudo empurra para o outro lado.",
    categoria: "personagens",
    capa: { slug: "dn", capitulo: 6 },
    cor: "#b5874a",
    dias: [
      {
        titulo: "Propôs no coração",
        leitura: { slug: "dn", capitulo: 1, de: 8, ate: 15 },
        reflexao: [
          "Jovem, longe de casa, com tudo oferecido pelo rei, \"Daniel, porém, propôs no seu coração não se contaminar\".",
          "Ele não fez escândalo. Propôs um teste respeitoso. A integridade começa com uma decisão tomada antes da pressão chegar.",
        ],
        pergunta: "Que decisão você precisa tomar antes que a pressão chegue?",
        oracao: "Senhor, firma o meu coração em ti, como firmaste o de Daniel.",
        pratica: "Defina hoje um limite que você não vai cruzar.",
      },
      {
        titulo: "Dele são a sabedoria e a força",
        leitura: { slug: "dn", capitulo: 2, de: 19, ate: 23 },
        reflexao: [
          "Quando Deus revela o sonho do rei, a primeira coisa que Daniel faz é louvar: \"são dele a sabedoria e a força\".",
          "\"Ele muda os tempos e as estações.\" Mesmo num império poderoso, Daniel sabia quem realmente estava no controle.",
        ],
        pergunta: "Quem você acredita que está no controle dos \"impérios\" da sua vida?",
        oracao: "Deus, tu mudas os tempos. A sabedoria e a força são tuas.",
        pratica: "Antes de comemorar uma vitória hoje, agradeça a Deus.",
      },
      {
        titulo: "Nenhum erro nem falta",
        leitura: { slug: "dn", capitulo: 6, de: 3, ate: 5 },
        reflexao: [
          "Os inimigos de Daniel procuraram de tudo para acusá-lo, e não acharam nada, \"porque ele era fiel, e não se achava nele nenhum erro nem falta\".",
          "A única brecha que encontraram foi a fé dele. Que coisa boa ser acusado só por amar a Deus.",
        ],
        pergunta: "Se alguém procurasse falhas no seu trabalho, o que acharia?",
        oracao: "Senhor, faz-me fiel, para que a única acusação contra mim seja amar a ti.",
        pratica: "Corrija hoje uma pequena desonestidade no seu dia a dia.",
      },
      {
        titulo: "Como antes costumava fazer",
        leitura: { slug: "dn", capitulo: 6, de: 10, ate: 11 },
        reflexao: [
          "Uma lei proíbe orar a qualquer deus. Daniel vai para casa e \"três vezes no dia se punha de joelhos e orava\", \"como também antes costumava fazer\".",
          "Ele não começou a orar na crise. Já orava antes. O hábito construído nos dias comuns segurou Daniel no dia mais difícil.",
        ],
        pergunta: "Que hábito com Deus vai te sustentar quando a crise chegar?",
        oracao: "Senhor, que a minha vida de oração seja firme nos dias comuns.",
        pratica: "Escolha três momentos fixos do dia para orar, como Daniel.",
      },
      {
        titulo: "Fechou a boca dos leões",
        leitura: { slug: "dn", capitulo: 6, de: 19, ate: 23 },
        reflexao: [
          "O rei corre de madrugada até a cova, e Daniel responde: \"O meu Deus enviou o seu anjo, e fechou a boca dos leões\".",
          "O texto explica o porquê: \"porque ele havia confiado em seu Deus\". A cova não foi o fim. Foi o lugar onde Deus se mostrou.",
        ],
        pergunta: "Que \"cova de leões\" você está enfrentando?",
        oracao: "Deus, eu confio em ti. Fecha a boca dos leões que me ameaçam.",
        pratica: "Ore hoje por alguém que está sendo perseguido por causa da fé.",
      },
    ],
  },

  {
    id: "pedro",
    titulo: "Pedro",
    chamada: "O discípulo que caía e levantava",
    descricao:
      "Impulsivo, corajoso, medroso, apaixonado. Pedro andou sobre as águas e afundou, confessou Jesus e o negou. E foi ele que Jesus usou para pregar no Pentecostes. Seis dias com quem prova que dá para recomeçar.",
    categoria: "personagens",
    capa: { slug: "mt", capitulo: 14 },
    cor: "#3f7fa0",
    dias: [
      {
        titulo: "Sobre tua palavra",
        leitura: { slug: "lc", capitulo: 5, de: 4, ate: 11 },
        reflexao: [
          "Pedro era pescador profissional e não pegou nada a noite toda. Mesmo assim: \"trabalhamos a noite toda, e nada apanhamos; mas, sobre tua palavra, lançarei as redes\".",
          "Diante da pesca enorme, ele cai de joelhos: \"Retira-te de mim, Senhor, porque sou um homem pecador\". E Jesus o chama mesmo assim.",
        ],
        pergunta: "Em que área Jesus está te pedindo para lançar a rede de novo?",
        oracao: "Senhor, sobre a tua palavra, eu tento de novo.",
        pratica: "Tente hoje de novo algo em que você falhou, desta vez orando antes.",
      },
      {
        titulo: "Senhor, salva-me",
        leitura: { slug: "mt", capitulo: 14, de: 28, ate: 31 },
        reflexao: [
          "Pedro é o único que sai do barco. Anda sobre a água, olha para o vento, afunda e grita: \"Senhor, salva-me\".",
          "\"Imediatamente estendeu Jesus a mão.\" Jesus não esperou Pedro se afogar para aprender a lição. Salvou primeiro e conversou depois.",
        ],
        pergunta: "Em que área você está afundando e precisa gritar por socorro?",
        oracao: "Senhor, salva-me. Segura a minha mão.",
        pratica: "Peça ajuda hoje, a Deus e a alguém, em algo que está te afundando.",
      },
      {
        titulo: "Tu és o Cristo",
        leitura: { slug: "mt", capitulo: 16, de: 13, ate: 18 },
        reflexao: [
          "Jesus pergunta o que o povo diz sobre ele, e depois: \"quem dizeis que eu sou?\". Pedro responde: \"Tu és o Cristo, o Filho do Deus vivo\".",
          "A resposta mais importante da vida não é sobre o que os outros dizem de Jesus. É a sua.",
        ],
        pergunta: "Quem você diz que Jesus é?",
        oracao: "Jesus, tu és o Cristo, o Filho do Deus vivo.",
        pratica: "Responda por escrito: quem é Jesus para mim?",
      },
      {
        titulo: "Chorou amargamente",
        leitura: { slug: "mt", capitulo: 26, de: 69, ate: 75 },
        reflexao: [
          "O mesmo Pedro que jurou morrer por Jesus nega três vezes: \"Não conheço esse homem\". O galo canta, e ele \"chorou amargamente\".",
          "A Bíblia não esconde a queda do maior apóstolo. A diferença entre Pedro e Judas não foi o tamanho do erro, foi para onde cada um correu depois.",
        ],
        pergunta: "Depois de falhar, você corre para Jesus ou para longe dele?",
        oracao: "Senhor, eu também te neguei. Recebe as minhas lágrimas e me restaura.",
        pratica: "Se houver algo que você precisa confessar, faça isso hoje.",
      },
      {
        titulo: "Que faremos, irmãos?",
        leitura: { slug: "at", capitulo: 2, de: 36, ate: 41 },
        reflexao: [
          "Semanas depois de negar Jesus, Pedro prega em público, com coragem. O povo pergunta: \"Que faremos, irmãos?\". E quase três mil creem.",
          "Deus não descartou Pedro pela queda. Restaurou e usou. \"A promessa vos pertence a vós\", e a você também.",
        ],
        pergunta: "Você acredita que Deus ainda pode te usar depois dos seus erros?",
        oracao: "Senhor, como Pedro, quero ser restaurado e usado por ti.",
        pratica: "Fale hoje de Jesus a alguém, com as suas palavras.",
      },
      {
        titulo: "Uma viva esperança",
        leitura: { slug: "1pe", capitulo: 1, de: 3, ate: 7 },
        reflexao: [
          "Anos depois, Pedro escreve uma carta. O homem impulsivo virou pastor: Deus \"nos regenerou para uma viva esperança\".",
          "Ele fala das provações como fogo que prova a fé, \"mais preciosa do que o ouro que perece\". Pedro sabia por experiência própria.",
        ],
        pergunta: "Que provação sua pode estar provando e purificando a sua fé?",
        oracao: "Deus, obrigado pela viva esperança. Usa as provações para firmar a minha fé.",
        pratica: "Escreva uma carta de encorajamento a alguém que está passando por provação.",
      },
    ],
  },

  {
    id: "jonas",
    titulo: "Jonas",
    chamada: "Fugindo de Deus",
    descricao:
      "Um profeta que corre na direção contrária, um navio na tempestade, um peixe enorme e uma cidade inimiga que se arrepende. A história de Jonas é sobre segundas chances, inclusive para quem não queria que os outros tivessem uma. Cinco dias, um capítulo por vez.",
    categoria: "personagens",
    capa: { slug: "jn", capitulo: 1 },
    cor: "#2f8a8a",
    dias: [
      {
        titulo: "Na direção contrária",
        leitura: { slug: "jn", capitulo: 1, de: 1, ate: 3 },
        reflexao: [
          "Deus manda Jonas ir a Nínive, capital dos inimigos de Israel. \"Jonas, porém, levantou-se para fugir da presença do Senhor\", na direção oposta.",
          "Jonas até pagou a passagem. Fugir de Deus sempre tem um preço. E a gente nunca consegue sair da presença dele.",
        ],
        pergunta: "Do que Deus te pediu você tem fugido?",
        oracao: "Senhor, eu tenho fugido. Ajuda-me a parar de correr na direção contrária.",
        pratica: "Dê hoje um passo na direção do que Deus te pediu.",
      },
      {
        titulo: "Dormindo na tempestade",
        leitura: { slug: "jn", capitulo: 1, de: 4, ate: 17 },
        reflexao: [
          "Enquanto o navio quase afunda, Jonas dorme. O capitão o acorda: \"Que estás fazendo, ó tu que dormes?\"",
          "A desobediência de um afetou todo mundo no barco. Mas mesmo ali Deus age: os marinheiros pagãos acabam temendo ao Senhor.",
        ],
        pergunta: "Sua fuga tem afetado as pessoas ao seu redor?",
        oracao: "Deus, acorda-me. Não quero que a minha fuga machuque outros.",
        pratica: "Peça perdão a alguém que foi afetado por uma escolha errada sua.",
      },
      {
        titulo: "Das entranhas do peixe",
        leitura: { slug: "jn", capitulo: 2, de: 1, ate: 10 },
        reflexao: [
          "No lugar mais escuro, dentro do peixe, Jonas finalmente ora: \"Na minha angústia clamei ao senhor, e ele me respondeu\".",
          "E termina com uma frase que resume a Bíblia: \"Ao Senhor pertence a salvação\". O fundo do poço virou lugar de oração.",
        ],
        pergunta: "Precisou de um fundo do poço para você voltar a orar?",
        oracao: "Senhor, na minha angústia eu clamo a ti. A salvação vem de ti.",
        pratica: "Ore hoje a partir do lugar exato em que você está, sem esperar sair dele.",
      },
      {
        titulo: "Pela segunda vez",
        leitura: { slug: "jn", capitulo: 3, de: 1, ate: 10 },
        reflexao: [
          "\"Pela segunda vez veio a palavra do Senhor a Jonas.\" Deus não desistiu do profeta fujão. Deu outra chance.",
          "Jonas prega, e Nínive inteira se arrepende, do rei aos animais. Deus vê e não envia o castigo. Segundas chances para Jonas, e para Nínive.",
        ],
        pergunta: "Em que área Deus está te dando uma segunda chance?",
        oracao: "Obrigado, Senhor, porque a tua palavra vem pela segunda vez.",
        pratica: "Aproveite hoje uma segunda chance que Deus te deu.",
      },
      {
        titulo: "Não hei de ter compaixão?",
        leitura: { slug: "jn", capitulo: 4, de: 1, ate: 11 },
        reflexao: [
          "Jonas fica furioso porque Deus perdoou Nínive: \"eu sabia que és Deus compassivo e misericordioso\". Ele queria a misericórdia só para si.",
          "O livro termina com uma pergunta de Deus, sem resposta: \"E não hei de eu ter compaixão da grande cidade de Nínive\". A pergunta fica para nós.",
        ],
        pergunta: "Há alguém que você acha que não merece a misericórdia de Deus?",
        oracao: "Deus, dá-me um coração compassivo como o teu, até com quem eu não gosto.",
        pratica: "Ore hoje pelo bem de alguém que você considera \"inimigo\".",
      },
    ],
  },

  {
    id: "mulheres-de-fe",
    titulo: "Mulheres de fé",
    chamada: "Seis histórias que mudaram a história",
    descricao:
      "Juíza, mãe que orava, jovem que disse sim, discípulas que sustentavam o ministério de Jesus, uma mulher perdoada e uma empresária que abriu a casa. Seis mulheres da Bíblia e a fé de cada uma.",
    categoria: "personagens",
    capa: { slug: "jz", capitulo: 4 },
    cor: "#c46a8a",
    dias: [
      {
        titulo: "Débora",
        leitura: { slug: "jz", capitulo: 4, de: 4, ate: 9 },
        reflexao: [
          "Débora era profetisa e julgava Israel debaixo de uma palmeira. Quando chama Baraque para a batalha, ele responde: \"Se fores comigo, irei\".",
          "E ela: \"Certamente irei contigo\". Débora liderou com coragem e com fé em quem dava a vitória.",
        ],
        pergunta: "Onde Deus está te chamando a liderar com coragem?",
        oracao: "Senhor, dá-me a coragem e a sabedoria de Débora.",
        pratica: "Encoraje hoje alguém que tem medo de dar um passo.",
      },
      {
        titulo: "Ana",
        leitura: { slug: "1sm", capitulo: 1, de: 10, ate: 18 },
        reflexao: [
          "Ana não podia ter filhos e sofria. No templo, ora tão intensamente que o sacerdote acha que ela está bêbada. Ela explica: \"derramei a minha alma perante o Senhor\".",
          "E depois de orar, \"já não era triste o seu semblante\". Antes da resposta chegar, a oração já a tinha mudado.",
        ],
        pergunta: "Que dor você precisa derramar diante de Deus?",
        oracao: "Senhor, eu derramo a minha alma diante de ti.",
        pratica: "Faça hoje uma oração longa e honesta sobre o que mais te dói.",
      },
      {
        titulo: "Maria",
        leitura: { slug: "lc", capitulo: 1, de: 46, ate: 50 },
        reflexao: [
          "Grávida e jovem, Maria canta: \"A minha alma engrandece ao Senhor\". Ela louva porque Deus \"atentou na condição humilde de sua serva\".",
          "O cântico de Maria fala de um Deus que olha para os pequenos. A fé dela é humilde e corajosa ao mesmo tempo.",
        ],
        pergunta: "O que Deus fez na sua condição humilde?",
        oracao: "Minha alma engrandece ao Senhor, porque ele olhou para mim.",
        pratica: "Escreva o seu próprio cântico de louvor, com o que Deus fez por você.",
      },
      {
        titulo: "As que serviam",
        leitura: { slug: "lc", capitulo: 8, de: 1, ate: 3 },
        reflexao: [
          "Lucas registra que várias mulheres seguiam Jesus, curadas por ele, e \"os serviam com os seus bens\".",
          "Elas sustentavam o ministério de Jesus com o próprio dinheiro. Foram elas que ficaram na cruz e as primeiras a ver o túmulo vazio.",
        ],
        pergunta: "Como você pode sustentar a obra de Deus com o que tem?",
        oracao: "Senhor, que eu sirva a ti com tudo o que tenho.",
        pratica: "Apoie hoje um ministério ou missão que você admira.",
      },
      {
        titulo: "A mulher perdoada",
        leitura: { slug: "lc", capitulo: 7, de: 44, ate: 50 },
        reflexao: [
          "Uma mulher conhecida pelos pecados lava os pés de Jesus com lágrimas na casa de um fariseu. Jesus pergunta ao anfitrião: \"Vês tu esta mulher?\"",
          "Ninguém a via além do passado dela. Jesus a viu, e a despediu com: \"A tua fé te salvou; vai-te em paz\". Quem foi muito perdoado ama muito.",
        ],
        pergunta: "Como você tem visto as pessoas que carregam um passado pesado?",
        oracao: "Jesus, tu me vês além do meu passado. Obrigado pelo teu perdão.",
        pratica: "Trate hoje com dignidade alguém que costuma ser julgado.",
      },
      {
        titulo: "Lídia",
        leitura: { slug: "at", capitulo: 16, de: 13, ate: 15 },
        reflexao: [
          "Lídia era empresária, vendedora de púrpura. Ouvindo Paulo à beira do rio, \"o Senhor lhe abriu o coração\".",
          "E logo abre também a casa: \"entrai em minha casa, e ficai ali\". A casa de Lídia virou a primeira igreja da Europa.",
        ],
        pergunta: "Como a sua casa pode ser usada por Deus?",
        oracao: "Senhor, abre o meu coração, e que a minha casa seja tua.",
        pratica: "Convide alguém para uma refeição na sua casa nesta semana.",
      },
    ],
  },
];

export const RELACOES: Devocional[] = [
  {
    id: "amizade",
    titulo: "Amizade de verdade",
    chamada: "Seis dias sobre ter e ser amigo",
    descricao:
      "A Bíblia tem amizades lindas: Davi e Jônatas, quatro amigos carregando um paralítico, e Jesus chamando os discípulos de amigos. Seis dias sobre ter amigos e, mais ainda, ser um.",
    categoria: "relacoes",
    capa: { slug: "1sm", capitulo: 20 },
    cor: "#6f9a5a",
    dias: [
      {
        titulo: "Uma alma ligada",
        leitura: { slug: "1sm", capitulo: 18, de: 1, ate: 4 },
        reflexao: [
          "Depois da vitória sobre Golias, \"a alma de Jônatas ligou-se com a alma de Davi\". Jônatas era príncipe. Davi, um pastor.",
          "E Jônatas dá a Davi a capa, a espada e o arco. Amizade de verdade não compete. Ela entrega.",
        ],
        pergunta: "Quem é o seu Jônatas, alguém que torce por você sem competir?",
        oracao: "Senhor, obrigado pelos amigos verdadeiros. Faz de mim um amigo assim.",
        pratica: "Diga hoje a um amigo o quanto ele importa para você.",
      },
      {
        titulo: "Confortou-o em Deus",
        leitura: { slug: "1sm", capitulo: 23, de: 15, ate: 18 },
        reflexao: [
          "Davi está fugindo, escondido no deserto. Jônatas vai até ele e \"o confortou em Deus\".",
          "Um bom amigo não só consola: aponta para Deus. Jônatas lembrou Davi das promessas quando ele estava sem forças.",
        ],
        pergunta: "Quem precisa que você vá até o deserto dele?",
        oracao: "Deus, que eu saiba confortar meus amigos em ti.",
        pratica: "Visite ou ligue para um amigo que está num deserto.",
      },
      {
        titulo: "Os quatro amigos",
        leitura: { slug: "mc", capitulo: 2, de: 1, ate: 5 },
        reflexao: [
          "Um paralítico é \"carregado por quatro\". Com a casa lotada, os amigos abrem o telhado e descem o homem até Jesus.",
          "E Jesus, \"vendo-lhes a fé\", age. A fé dos amigos levou o homem a Jesus. Às vezes você será carregado. Às vezes, carregará.",
        ],
        pergunta: "Quem você poderia \"carregar\" até Jesus com a sua oração e ajuda?",
        oracao: "Senhor, usa-me para levar meus amigos até ti.",
        pratica: "Ore hoje, pelo nome, por quatro amigos.",
      },
      {
        titulo: "Mais chegado que um irmão",
        leitura: { slug: "pv", capitulo: 18, de: 24 },
        reflexao: [
          "Provérbios alerta que muitos amigos superficiais podem levar à ruína, \"mas há um amigo que é mais chegado do que um irmão\".",
          "Não é a quantidade de amigos que importa, é a profundidade. Melhor poucos verdadeiros do que muitos de fachada.",
        ],
        pergunta: "Suas amizades são mais largas ou mais profundas?",
        oracao: "Senhor, dá-me poucas amizades, mas verdadeiras.",
        pratica: "Invista hoje tempo de qualidade em uma amizade profunda.",
      },
      {
        titulo: "Chamei-vos amigos",
        leitura: { slug: "jo", capitulo: 15, de: 12, ate: 15 },
        reflexao: [
          "Jesus diz: \"Ninguém tem maior amor do que este, de dar alguém a sua vida pelos seus amigos\". E faria exatamente isso.",
          "E então: \"chamei-vos amigos\". Jesus não te vê só como servo. Ele te chama de amigo.",
        ],
        pergunta: "O que muda saber que Jesus te chama de amigo?",
        oracao: "Jesus, obrigado por seres meu amigo. Ensina-me a amar como tu.",
        pratica: "Converse hoje com Jesus como você conversaria com um amigo.",
      },
      {
        titulo: "Chorar com os que choram",
        leitura: { slug: "rm", capitulo: 12, de: 9, ate: 16 },
        reflexao: [
          "Paulo dá um retrato de amizade cristã: \"alegrai-vos com os que se alegram; chorai com os que choram\".",
          "Às vezes é mais fácil chorar com quem chora do que se alegrar sinceramente com o sucesso do outro. Amizade verdadeira faz as duas coisas.",
        ],
        pergunta: "É mais difícil para você chorar com quem chora ou se alegrar com quem se alegra?",
        oracao: "Senhor, dá-me um coração que se alegra e chora junto com meus amigos.",
        pratica: "Celebre hoje, de coração, uma conquista de um amigo.",
      },
    ],
  },

  {
    id: "casamento",
    titulo: "Casamento",
    chamada: "Amor que se escolhe todo dia",
    descricao:
      "Do jardim do Éden ao Cântico dos Cânticos, a Bíblia celebra o casamento e também mostra que ele exige entrega diária. Cinco dias para casais, noivos e para quem sonha com isso.",
    categoria: "relacoes",
    capa: { slug: "ct", capitulo: 2 },
    cor: "#d98aa0",
    dias: [
      {
        titulo: "Uma só carne",
        leitura: { slug: "gn", capitulo: 2, de: 21, ate: 24 },
        reflexao: [
          "Ao ver a mulher, o homem exclama: \"osso dos meus ossos, e carne da minha carne\". O primeiro poema da Bíblia é uma declaração de amor.",
          "E o propósito é claro: deixar pai e mãe, unir-se, e os dois \"serão uma só carne\". Casamento é aliança, não só sentimento.",
        ],
        pergunta: "O que significa, na prática, ser \"uma só carne\" na sua relação?",
        oracao: "Senhor, obrigado pelo casamento. Une-nos de verdade.",
        pratica: "Diga hoje ao seu cônjuge (ou escreva para o futuro) por que você o escolheu.",
      },
      {
        titulo: "Já passou o inverno",
        leitura: { slug: "ct", capitulo: 2, de: 10, ate: 13 },
        reflexao: [
          "Cânticos é um poema de amor sem vergonha: \"Levanta-te, amada minha, formosa minha, e vem\". A Bíblia celebra o romance.",
          "\"Já passou o inverno\", e as flores aparecem. Todo casamento tem invernos. E todo inverno pode dar lugar à primavera.",
        ],
        pergunta: "Seu relacionamento está em qual estação?",
        oracao: "Deus, faz florescer o amor que nos deste, depois de cada inverno.",
        pratica: "Planeje um momento especial a dois nesta semana.",
      },
      {
        titulo: "Como Cristo amou",
        leitura: { slug: "ef", capitulo: 5, de: 21, ate: 28 },
        reflexao: [
          "Paulo começa com algo para os dois: \"sujeitando-vos uns aos outros no temor de Cristo\". Cristãos leem de jeitos diferentes o que vem depois sobre papéis no casamento.",
          "Mas todos concordam sobre a medida do amor: \"como também Cristo amou a igreja, e a si mesmo se entregou por ela\". Amor que se entrega, não que domina.",
        ],
        pergunta: "Seu amor tem se parecido mais com entrega ou com controle?",
        oracao: "Jesus, que o meu amor se pareça com o teu: entrega, não domínio.",
        pratica: "Faça hoje algo que coloque o seu cônjuge em primeiro lugar.",
      },
      {
        titulo: "O vínculo da perfeição",
        leitura: { slug: "cl", capitulo: 3, de: 12, ate: 14 },
        reflexao: [
          "Paulo lista roupas para vestir: compaixão, bondade, humildade, mansidão, paciência, perdão. E por cima de tudo: \"revestí-vos do amor, que é o vínculo da perfeição\".",
          "Casamento é feito de pequenos perdões diários. O amor amarra tudo.",
        ],
        pergunta: "Que \"roupa\" está faltando no seu relacionamento?",
        oracao: "Senhor, veste-nos de perdão e de amor.",
        pratica: "Perdoe hoje uma pequena ofensa sem trazê-la de volta depois.",
      },
      {
        titulo: "Bendizendo",
        leitura: { slug: "1pe", capitulo: 3, de: 8, ate: 9 },
        reflexao: [
          "Pedro pede um mesmo sentimento, compaixão e humildade, \"não retribuindo mal por mal\".",
          "Num casamento, a tentação é devolver na mesma moeda. Pedro propõe outra coisa: bendizer. Quebrar o ciclo começa em quem decide abençoar.",
        ],
        pergunta: "Em que briga você costuma devolver na mesma moeda?",
        oracao: "Deus, ajuda-me a quebrar o ciclo, abençoando em vez de revidar.",
        pratica: "Na próxima tensão, responda com uma palavra boa.",
      },
    ],
  },

  {
    id: "familia",
    titulo: "Família",
    chamada: "Fé dentro de casa",
    descricao:
      "A fé que não chega em casa fica pela metade. Cinco dias sobre a família na Bíblia: escolher servir a Deus, criar filhos, honrar os pais, e a família de Jesus.",
    categoria: "relacoes",
    capa: { slug: "sl", capitulo: 128 },
    cor: "#b07a55",
    dias: [
      {
        titulo: "Eu e a minha casa",
        leitura: { slug: "js", capitulo: 24, de: 14, ate: 15 },
        reflexao: [
          "No fim da vida, Josué desafia o povo a escolher a quem vão servir. E declara: \"eu e a minha casa serviremos ao Senhor\".",
          "A fé de uma família começa com a decisão de alguém. Você pode ser essa pessoa na sua casa.",
        ],
        pergunta: "Que decisão sobre fé sua família precisa tomar?",
        oracao: "Senhor, eu e a minha casa serviremos a ti.",
        pratica: "Ore hoje por cada pessoa da sua casa, pelo nome.",
      },
      {
        titulo: "Flechas na mão",
        leitura: { slug: "sl", capitulo: 127, de: 3, ate: 5 },
        reflexao: [
          "\"Os filhos são herança da parte do Senhor.\" E o salmo compara: \"Como flechas na mão dum homem valente\".",
          "Flechas não ficam para sempre na aljava. São preparadas para serem lançadas. Criar filhos é preparar para a vida, não segurar para sempre.",
        ],
        pergunta: "Para onde você está apontando as \"flechas\" sob o seu cuidado?",
        oracao: "Senhor, os filhos são teus. Ajuda-nos a prepará-los bem.",
        pratica: "Passe tempo de qualidade com uma criança da sua família.",
      },
      {
        titulo: "Ao redor da mesa",
        leitura: { slug: "sl", capitulo: 128, de: 1, ate: 4 },
        reflexao: [
          "O salmo pinta uma cena simples: \"os teus filhos como plantas de oliveira, ao redor da tua mesa\".",
          "A bênção de Deus aparece na mesa comum da família. As refeições juntos são mais importantes do que parecem.",
        ],
        pergunta: "Quando foi a última refeição em família sem celular?",
        oracao: "Deus, abençoa a nossa mesa e as nossas conversas.",
        pratica: "Faça hoje uma refeição em família sem telas.",
      },
      {
        titulo: "Honra e cuidado",
        leitura: { slug: "ef", capitulo: 6, de: 1, ate: 4 },
        reflexao: [
          "Paulo fala aos filhos: \"Honra a teu pai e a tua mãe\". E logo depois aos pais: \"pais, não provoqueis à ira vossos filhos\".",
          "A família cristã é uma via de mão dupla: honra de um lado, cuidado do outro. Ninguém tem passe livre para ferir.",
        ],
        pergunta: "Na sua família, de que lado da mão você precisa melhorar?",
        oracao: "Senhor, ensina-me a honrar e a cuidar na minha família.",
        pratica: "Faça hoje um gesto de honra a seus pais, ou de carinho a seus filhos.",
      },
      {
        titulo: "Crescia Jesus",
        leitura: { slug: "lc", capitulo: 2, de: 46, ate: 52 },
        reflexao: [
          "Jesus, aos doze anos, se perde dos pais em Jerusalém. Maria diz: \"teu pai e eu ansiosos te procurávamos\". Até a família de Jesus teve seus sustos.",
          "E o texto termina: \"E crescia Jesus em sabedoria, em estatura e em graça\". A família é o lugar onde se cresce, com imperfeições.",
        ],
        pergunta: "Que crescimento Deus está fazendo na sua família, mesmo com os tropeços?",
        oracao: "Senhor, que a nossa casa seja lugar de crescer em sabedoria e graça.",
        pratica: "Converse hoje com alguém da família sobre algo que Deus tem ensinado a vocês.",
      },
    ],
  },
];
