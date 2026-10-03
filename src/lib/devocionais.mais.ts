/**
 * Mais devocionais temáticos: coração, vida com Deus, Jesus e caráter.
 * Mesmos critérios de escrita de `devocionais.dados.ts`.
 */
import type { Devocional } from "./devocionais";

export const MAIS: Devocional[] = [
  /* =================================================== PARA O CORAÇÃO === */
  {
    id: "luto-e-saudade",
    titulo: "Luto e saudade",
    chamada: "Para quem perdeu alguém",
    descricao:
      "O luto não é falta de fé. Jesus chorou diante do túmulo de um amigo, e a Bíblia tem espaço para a saudade, a pergunta e a esperança ao mesmo tempo. Cinco dias para atravessar a perda sem pressa e sem fingir.",
    categoria: "coracao",
    capa: { slug: "jo", capitulo: 11 },
    cor: "#7d8aa3",
    dias: [
      {
        titulo: "Se tu estiveras aqui",
        leitura: { slug: "jo", capitulo: 11, de: 17, ate: 27 },
        reflexao: [
          "Marta corre ao encontro de Jesus e diz o que muita gente enlutada sente: \"Senhor, se tu estiveras aqui, meu irmão não teria morrido.\" É fé e queixa na mesma frase.",
          "Jesus não a repreende. Conversa com ela e oferece a si mesmo: \"Eu sou a ressurreição e a vida\". Ele não apaga a dor de Marta: entra nela.",
        ],
        pergunta: "Que \"se tu estiveras aqui\" você ainda carrega?",
        oracao: "Jesus, eu também pergunto por que tu não impediste. Mesmo assim, eu venho a ti, que és a ressurreição e a vida.",
        pratica: "Escreva o nome de quem você perdeu e uma lembrança boa dessa pessoa.",
      },
      {
        titulo: "Eu irei para ela",
        leitura: { slug: "2sm", capitulo: 12, de: 18, ate: 23 },
        reflexao: [
          "Davi jejuou e chorou enquanto o filho estava doente. Quando a criança morreu, ele \"lavou-se, ungiu-se, e mudou de vestes\" e foi adorar. Os servos não entenderam.",
          "A resposta dele mistura dor e esperança: \"Eu irei para ela, porém ela não voltará para mim.\" O luto aceita o que não pode mudar e se apoia no reencontro que Deus promete.",
        ],
        pergunta: "Você tem conseguido levantar do chão, ou ainda precisa de tempo lá?",
        oracao: "Senhor, eu não posso trazer de volta quem eu perdi. Mas confio que a morte não tem a última palavra.",
        pratica: "Faça hoje uma coisa simples de cuidado consigo: um banho calmo, uma refeição de verdade, uma caminhada.",
      },
      {
        titulo: "Ele sara os quebrantados",
        leitura: { slug: "sl", capitulo: 147, de: 1, ate: 6 },
        reflexao: [
          "O salmo junta duas imagens improváveis. Deus \"conta o número das estrelas, chamando-as a todas pelos seus nomes\". E o mesmo Deus \"sara os quebrantados de coração, e cura-lhes as feridas\".",
          "Quem conhece cada estrela pelo nome conhece também a sua ferida. A cura do luto é lenta, mas não acontece longe dos olhos dele.",
        ],
        pergunta: "Você acredita que Deus conhece a sua dor pelo nome?",
        oracao: "Deus, tu conheces as estrelas e conheces o meu coração partido. Cura as minhas feridas no teu tempo.",
        pratica: "Se puder, olhe o céu à noite e entregue a Deus a sua saudade.",
      },
      {
        titulo: "Consolados para consolar",
        leitura: { slug: "2co", capitulo: 1, de: 3, ate: 7 },
        reflexao: [
          "Paulo chama Deus de \"Deus de toda a consolação\". E diz que ele nos consola \"para que também possamos consolar os que estiverem em alguma tribulação\".",
          "A dor não é desperdiçada. Quem já foi consolado sabe sentar ao lado de quem chora, sem frases prontas.",
        ],
        pergunta: "Quem te consolou de verdade no seu luto? O que essa pessoa fez?",
        oracao: "Deus de toda consolação, consola-me hoje, e um dia faz de mim consolo para outros.",
        pratica: "Agradeça a alguém que esteve presente no seu tempo de perda.",
      },
      {
        titulo: "Não como os que não têm esperança",
        leitura: { slug: "1ts", capitulo: 4, de: 13, ate: 18 },
        reflexao: [
          "Paulo não proíbe a tristeza. Ele diz \"para que não vos entristeçais como os outros que não têm esperança\". O cristão chora, mas chora com esperança.",
          "A promessa é um reencontro: \"e assim estaremos para sempre com o Senhor\". E termina com um pedido prático: \"consolai-vos uns aos outros com estas palavras\".",
        ],
        pergunta: "Como seria chorar com esperança, e não sem ela?",
        oracao: "Senhor, eu choro, mas não sem esperança. Obrigado porque estaremos para sempre contigo.",
        pratica: "Leia estes versículos para alguém que também está de luto.",
      },
    ],
  },

  {
    id: "solidao",
    titulo: "Quando me sinto só",
    chamada: "Cinco dias para quem está sozinho",
    descricao:
      "Dá para se sentir só no meio de muita gente. A Bíblia não trata a solidão como frescura: ela diz que não é bom estar só, e mostra um Deus que vê, lembra e coloca o solitário em família.",
    categoria: "coracao",
    capa: { slug: "sl", capitulo: 102 },
    cor: "#7c9cb5",
    dias: [
      {
        titulo: "Olha para mim",
        leitura: { slug: "sl", capitulo: 25, de: 16, ate: 18 },
        reflexao: [
          "Davi ora sem enfeite: \"Olha para mim, e tem misericórdia de mim, porque estou desamparado e aflito.\" É a oração de quem só quer ser visto.",
          "Admitir a solidão para Deus já é o primeiro passo para sair dela. Ele não se cansa de ouvir esse pedido.",
        ],
        pergunta: "Você tem coragem de dizer a Deus que se sente só?",
        oracao: "Senhor, olha para mim. Eu me sinto sozinho. Tem misericórdia de mim.",
        pratica: "Escreva como tem sido a sua solidão, com sinceridade.",
      },
      {
        titulo: "Não é bom estar só",
        leitura: { slug: "gn", capitulo: 2, de: 18 },
        reflexao: [
          "Em toda a criação, Deus repetia que as coisas eram boas. A primeira vez que ele diz \"não é bom\" é aqui: \"Não é bom que o homem esteja só.\"",
          "Você foi feito para relacionamento. Sentir falta de companhia não é fraqueza. É sinal de como Deus te fez.",
        ],
        pergunta: "Você tem tratado a sua necessidade de pessoas como defeito?",
        oracao: "Deus, tu disseste que não é bom estar só. Coloca pessoas no meu caminho.",
        pratica: "Mande hoje uma mensagem para alguém com quem você perdeu contato.",
      },
      {
        titulo: "Gravado nas palmas das mãos",
        leitura: { slug: "is", capitulo: 49, de: 14, ate: 16 },
        reflexao: [
          "O povo diz: \"O Senhor me desamparou, o meu Senhor se esqueceu de mim.\" Deus responde com a imagem mais forte que existe: uma mãe esquecer o filho que amamenta.",
          "E vai além: \"eu, todavia, não me esquecerei de ti\". \"Nas palmas das minhas mãos eu te gravei.\" Você não sai da lembrança de Deus.",
        ],
        pergunta: "O que muda saber que o seu nome está nas mãos de Deus?",
        oracao: "Senhor, tu não te esqueces de mim. Obrigado por me teres gravado nas tuas mãos.",
        pratica: "Escreva \"não me esquecerei de ti\" na palma da mão ou num papel que fique com você.",
      },
      {
        titulo: "O solitário em família",
        leitura: { slug: "sl", capitulo: 68, de: 5, ate: 6 },
        reflexao: [
          "Deus é chamado de \"Pai de órfãos e juiz de viúvas\": ele se aproxima justamente de quem ficou sem família.",
          "E então: \"Deus faz que o solitário viva em família\". Muitas vezes essa família é a igreja, gente que não é do seu sangue mas passa a ser da sua casa.",
        ],
        pergunta: "Você tem deixado alguém se tornar família para você?",
        oracao: "Pai, coloca-me numa família. E faz de mim família para quem está sozinho.",
        pratica: "Aceite ou faça um convite para estar com pessoas nesta semana.",
      },
      {
        titulo: "Não te deixarei",
        leitura: { slug: "hb", capitulo: 13, de: 5, ate: 6 },
        reflexao: [
          "\"Não te deixarei, nem te desampararei.\" Esta promessa aparece várias vezes na Bíblia, dita a Josué, a Israel e agora a nós.",
          "Mesmo quando as pessoas faltam, Deus não falta. Por isso o texto termina com coragem: \"O Senhor é quem me ajuda, não temerei\".",
        ],
        pergunta: "Em que momento do dia a solidão pesa mais? Como seria lembrar dessa promessa ali?",
        oracao: "Senhor, tu não me deixas nem me desamparas. Tu és quem me ajuda.",
        pratica: "Nesse momento difícil do dia, repita a promessa em voz baixa.",
      },
    ],
  },

  {
    id: "cansaco-e-descanso",
    titulo: "Cansado demais",
    chamada: "Descanso para quem não aguenta mais",
    descricao:
      "Muita gente vive no limite: trabalho, casa, estudo, preocupação. A Bíblia leva o descanso tão a sério que o coloca nos mandamentos. Cinco dias para aprender a parar sem culpa.",
    categoria: "coracao",
    capa: { slug: "mc", capitulo: 6 },
    cor: "#5fa39c",
    dias: [
      {
        titulo: "Descansai um pouco",
        leitura: { slug: "mc", capitulo: 6, de: 30, ate: 32 },
        reflexao: [
          "Os discípulos voltam de uma missão cheios de histórias. Era tanta gente que \"não tinham tempo nem para comer\". E Jesus diz: \"Vinde vós, à parte, para um lugar deserto, e descansai um pouco.\"",
          "Jesus não manda trabalhar mais. Manda descansar. Às vezes o passo mais espiritual é parar.",
        ],
        pergunta: "Quando foi a última vez que você descansou de verdade?",
        oracao: "Jesus, eu ouço o teu convite. Ensina-me a parar.",
        pratica: "Marque na agenda um tempo de descanso real nesta semana.",
      },
      {
        titulo: "Até Deus descansou",
        leitura: { slug: "gn", capitulo: 2, de: 1, ate: 3 },
        reflexao: [
          "Depois de criar tudo, Deus \"descansou nesse dia de toda a obra que fizera\". Não porque estivesse cansado, mas para marcar um ritmo.",
          "Ele abençoou o dia do descanso. Descansar não é preguiça: é viver no ritmo que Deus mesmo estabeleceu.",
        ],
        pergunta: "Você sente culpa quando descansa?",
        oracao: "Deus, tu abençoaste o descanso. Tira de mim a culpa de parar.",
        pratica: "Faça hoje uma pausa de quinze minutos sem produzir nada.",
      },
      {
        titulo: "Em vão trabalham",
        leitura: { slug: "sl", capitulo: 127, de: 1, ate: 2 },
        reflexao: [
          "\"Se o Senhor não edificar a casa, em vão trabalham os que a edificam.\" O esforço importa, mas não é ele que segura tudo.",
          "O salmo fala de quem levanta de madrugada e dorme tarde, ansioso. E termina com ternura: \"ele supre aos seus amados enquanto dormem\".",
        ],
        pergunta: "Você tem trabalhado como se tudo dependesse só de você?",
        oracao: "Senhor, edifica tu a minha casa. Eu posso dormir, porque tu cuidas.",
        pratica: "Hoje, vá dormir num horário razoável, confiando o que ficou pendente a Deus.",
      },
      {
        titulo: "Força ao cansado",
        leitura: { slug: "is", capitulo: 40, de: 28, ate: 31 },
        reflexao: [
          "Deus \"não se cansa nem se fatiga\". E é exatamente por isso que pode dar força: \"Ele dá força ao cansado\".",
          "\"Os que esperam no Senhor renovarão as suas forças.\" Repare na ordem do fim: subir, correr, andar. Às vezes a vitória é simplesmente continuar andando.",
        ],
        pergunta: "Você está no ritmo de voar, de correr ou só de andar?",
        oracao: "Senhor, eu não tenho mais forças. Renova-me. Que eu consiga ao menos andar.",
        pratica: "Faça hoje só o essencial, e entregue a Deus o resto.",
      },
      {
        titulo: "O descanso que resta",
        leitura: { slug: "hb", capitulo: 4, de: 9, ate: 11 },
        reflexao: [
          "\"Resta ainda um repouso sabático para o povo de Deus.\" O descanso de um dia aponta para um descanso maior, que Deus promete.",
          "Quem entra nesse descanso para de tentar se salvar pelo próprio esforço. O descanso mais profundo é confiar que Jesus já fez o que era preciso.",
        ],
        pergunta: "Você tem descansado na graça, ou ainda tenta merecer o amor de Deus?",
        oracao: "Jesus, eu entro no teu descanso. Não preciso provar nada para ser amado.",
        pratica: "Escolha um dia por semana para ser seu dia de descanso.",
      },
    ],
  },

  {
    id: "quando-a-alma-pesa",
    titulo: "Quando a alma pesa",
    chamada: "Tristeza profunda e a fé que não desiste",
    descricao:
      "Há tristezas que não passam com um conselho. A Bíblia tem orações que terminam no escuro, apóstolos que desesperaram da vida e promessas para quem está no fundo. Cinco dias para quem está pesado. E, se o peso não sai, pedir ajuda também é fé.",
    categoria: "coracao",
    capa: { slug: "sl", capitulo: 88 },
    cor: "#5d68a8",
    dias: [
      {
        titulo: "Uma oração no escuro",
        leitura: { slug: "sl", capitulo: 88, de: 1, ate: 9 },
        reflexao: [
          "O Salmo 88 é o mais escuro da Bíblia. \"A minha alma está cheia de angústias.\" E ele termina sem final feliz, ainda no escuro.",
          "Mas começa assim: \"Ó Senhor, Deus da minha salvação\". Mesmo sem sentir nada, o salmista continua orando. Deus guardou esta oração na Bíblia para que ninguém pense que precisa estar bem para falar com ele.",
        ],
        pergunta: "Você acha que precisa estar melhor para orar?",
        oracao: "Senhor, Deus da minha salvação, eu não estou bem. Mas é para ti que eu clamo.",
        pratica: "Ore hoje do jeito que você está, mesmo que seja só uma frase.",
      },
      {
        titulo: "Recordarei",
        leitura: { slug: "sl", capitulo: 77, de: 1, ate: 11 },
        reflexao: [
          "Asafe não consegue dormir, e \"a minha alma recusa ser consolada\". Ele faz perguntas duras: \"Esqueceu-se Deus de ser compassivo?\"",
          "E então decide: \"Recordarei os feitos do Senhor\". Quando o sentimento falha, a memória ajuda. Lembrar o que Deus já fez é uma forma de segurar a fé.",
        ],
        pergunta: "Do que Deus já fez por você, o que você consegue lembrar hoje?",
        oracao: "Deus, minha alma recusa consolo. Ajuda-me a lembrar das tuas obras.",
        pratica: "Escreva três vezes em que Deus te ajudou no passado.",
      },
      {
        titulo: "Até da vida desesperamos",
        leitura: { slug: "2co", capitulo: 1, de: 8, ate: 10 },
        reflexao: [
          "O apóstolo Paulo admite: \"fomos sobremaneira oprimidos acima das nossas forças, de modo tal que até da vida desesperamos\". Gente de fé também chega a esse ponto.",
          "E ele não esconde. Conta para a igreja. O peso o levou a confiar não em si, \"mas em Deus, que ressuscita os mortos\". Falar do peso é o começo da saída.",
        ],
        pergunta: "Com quem você tem coragem de falar sobre o seu peso?",
        oracao: "Senhor, está acima das minhas forças. Eu confio em ti, que ressuscitas os mortos.",
        pratica: "Conte a alguém de confiança como você realmente está. Se pensar em tirar a própria vida, procure ajuda agora: no Brasil, o CVV atende 24 horas pelo 188.",
      },
      {
        titulo: "Vestidos de louvor",
        leitura: { slug: "is", capitulo: 61, de: 1, ate: 3 },
        reflexao: [
          "Esta é a missão que Jesus leu na sinagoga para apresentar a si mesmo: ele veio \"a restaurar os contritos de coração\".",
          "E a promessa é de troca: \"vestidos de louvor em vez de espírito angustiado\". Deus não ignora o espírito angustiado. Ele promete trocá-lo, no tempo dele.",
        ],
        pergunta: "Que \"cinzas\" você entregaria hoje a Jesus para receber outra coisa?",
        oracao: "Jesus, tu vieste para restaurar os quebrados. Troca o meu espírito angustiado.",
        pratica: "Procure ajuda: um pastor, um amigo maduro ou um profissional de saúde mental. Cuidar da mente também é fé.",
      },
      {
        titulo: "A manhã vem",
        leitura: { slug: "sl", capitulo: 30, de: 1, ate: 5 },
        reflexao: [
          "Davi olha para trás e diz: \"a ti clamei, e tu me curaste\". Ele conhece o fundo do poço, e conhece a saída.",
          "\"O choro pode durar uma noite; pela manhã, porém, vem o cântico de júbilo.\" A noite pode ser longa. Mas ela não é para sempre.",
        ],
        pergunta: "O que te ajuda a esperar a manhã?",
        oracao: "Senhor, o choro dura a noite. Eu espero a tua manhã.",
        pratica: "Amanhã cedo, ao ver a luz do dia, lembre: a manhã veio de novo.",
      },
    ],
  },

  /* ==================================================== VIDA COM DEUS === */
  {
    id: "a-palavra",
    titulo: "Amar a Palavra",
    chamada: "Por que ler a Bíblia, e como",
    descricao:
      "Ler a Bíblia pode parecer obrigação, ou algo difícil demais. Os próprios textos bíblicos falam de outra coisa: de uma palavra que alimenta, corrige, firma e muda a vida. Cinco dias sobre o livro que está nas suas mãos.",
    categoria: "vida-com-deus",
    capa: { slug: "sl", capitulo: 119 },
    cor: "#b98a4e",
    dias: [
      {
        titulo: "A árvore junto às águas",
        leitura: { slug: "sl", capitulo: 1, de: 1, ate: 3 },
        reflexao: [
          "O primeiro salmo descreve uma pessoa feliz: a que \"na sua lei medita de dia e noite\". Meditar é ruminar, voltar a uma frase até ela virar parte de você.",
          "E a imagem é linda: \"como a árvore plantada junto às correntes de águas\". A árvore não dá fruto à força. Ela só fica perto da água.",
        ],
        pergunta: "De que \"águas\" a sua vida tem se alimentado?",
        oracao: "Senhor, planta-me junto às tuas águas. Que eu tenha prazer na tua palavra.",
        pratica: "Escolha um versículo e volte a ele três vezes hoje.",
      },
      {
        titulo: "Escondida no coração",
        leitura: { slug: "sl", capitulo: 119, de: 9, ate: 16 },
        reflexao: [
          "O salmista pergunta como alguém pode viver com pureza, e responde: guardando a palavra. \"Escondi a tua palavra no meu coração, para não pecar contra ti.\"",
          "O que está no coração aparece na hora da decisão. Quem guarda a palavra tem onde se apoiar quando a tentação chega.",
        ],
        pergunta: "Que versículo você sabe de cor? Ele já te ajudou em alguma decisão?",
        oracao: "Deus, que a tua palavra fique escondida no meu coração.",
        pratica: "Decore hoje um versículo curto.",
      },
      {
        titulo: "Inspirada e útil",
        leitura: { slug: "2tm", capitulo: 3, de: 14, ate: 17 },
        reflexao: [
          "Paulo escreve que \"toda Escritura é divinamente inspirada e proveitosa para ensinar, para repreender, para corrigir, para instruir em justiça\".",
          "A Bíblia não é só para informar. Ela ensina, corrige e prepara. E Timóteo aprendeu \"desde a infância\": muitas vezes a fé passa de uma pessoa para outra através dela.",
        ],
        pergunta: "Em qual dessas funções a Bíblia mais tem agido em você?",
        oracao: "Senhor, usa a tua palavra para me ensinar e me corrigir.",
        pratica: "Pergunte a alguém mais velho na fé qual texto marcou a vida dele.",
      },
      {
        titulo: "Viva e eficaz",
        leitura: { slug: "hb", capitulo: 4, de: 12, ate: 13 },
        reflexao: [
          "\"A palavra de Deus é viva e eficaz.\" Ela não é um livro morto. Ela é \"apta para discernir os pensamentos e intenções do coração\".",
          "Às vezes a gente lê a Bíblia e é a Bíblia que nos lê. Ela mostra o que estava escondido, para que seja curado.",
        ],
        pergunta: "Algum texto já \"te leu\" por dentro?",
        oracao: "Deus, que a tua palavra viva me examine e me transforme.",
        pratica: "Ao ler hoje, pergunte: o que este texto mostra sobre mim?",
      },
      {
        titulo: "Ouvir e praticar",
        leitura: { slug: "mt", capitulo: 7, de: 24, ate: 27 },
        reflexao: [
          "As duas casas ouviram as mesmas palavras e enfrentaram a mesma chuva. A diferença: uma pessoa \"ouve estas minhas palavras e as põe em prática\".",
          "Ler a Bíblia sem praticar é construir na areia. O que faz a casa ficar de pé é obedecer, um pouco por dia.",
        ],
        pergunta: "Que palavra você já ouviu muitas vezes e ainda não colocou em prática?",
        oracao: "Jesus, quero edificar na rocha. Ajuda-me a praticar o que ouço.",
        pratica: "Escolha uma coisa que você leu nestes dias e coloque em prática hoje.",
      },
    ],
  },

  {
    id: "adoracao",
    titulo: "Adoração",
    chamada: "Olhar para Deus pelo que ele é",
    descricao:
      "Adoração é mais do que música. É olhar para Deus e responder com o coração, a boca e a vida. Cinco dias com textos que param tudo só para dizer quem Deus é.",
    categoria: "vida-com-deus",
    capa: { slug: "sl", capitulo: 148 },
    cor: "#e0b04a",
    dias: [
      {
        titulo: "Que é o homem?",
        leitura: { slug: "sl", capitulo: 8, de: 1, ate: 9 },
        reflexao: [
          "Davi olha o céu à noite e fica pequeno: \"que é o homem, para que te lembres dele?\" Diante da lua e das estrelas, a gente se sente minúsculo.",
          "Mas o salmo começa e termina com a mesma frase: \"quão admirável é o teu nome em toda a terra\". Adorar é perceber o tamanho de Deus e se espantar porque ele lembra de nós.",
        ],
        pergunta: "Quando foi a última vez que você se espantou com Deus?",
        oracao: "Senhor, quão admirável é o teu nome! E ainda assim tu te lembras de mim.",
        pratica: "Passe alguns minutos olhando o céu, de dia ou de noite, e louve.",
      },
      {
        titulo: "Toda a criação louva",
        leitura: { slug: "sl", capitulo: 148, de: 1, ate: 6 },
        reflexao: [
          "O salmo chama tudo para adorar: anjos, céus, \"Louvai-o, sol e lua; louvai-o, todas as estrelas luzentes!\"",
          "O motivo é simples: \"pois ele deu ordem, e logo foram criados\". Quando você adora, entra num coro que começou antes de você e inclui o universo inteiro.",
        ],
        pergunta: "O que na criação mais te faz louvar a Deus?",
        oracao: "Junto com o sol, a lua e as estrelas, eu te louvo, Senhor.",
        pratica: "Faça uma caminhada e agradeça por cada coisa da natureza que notar.",
      },
      {
        titulo: "Em espírito e em verdade",
        leitura: { slug: "jo", capitulo: 4, de: 19, ate: 24 },
        reflexao: [
          "A mulher samaritana quer discutir o lugar certo de adorar. Jesus muda o foco: \"os verdadeiros adoradores adorarão o Pai em espírito e em verdade\".",
          "E diz algo surpreendente: \"o Pai procura a tais que assim o adorem\". Deus não só aceita a adoração. Ele procura adoradores.",
        ],
        pergunta: "Sua adoração tem sido mais sobre o lugar e a forma ou sobre o coração?",
        oracao: "Pai, quero te adorar em espírito e em verdade, onde eu estiver.",
        pratica: "Adore hoje num lugar inesperado: no ônibus, na cozinha, no trabalho.",
      },
      {
        titulo: "Ó profundidade",
        leitura: { slug: "rm", capitulo: 11, de: 33, ate: 36 },
        reflexao: [
          "Depois de onze capítulos de teologia densa, Paulo não aguenta e explode em louvor: \"Ó profundidade das riquezas, tanto da sabedoria, como da ciência de Deus!\"",
          "Estudar sobre Deus deveria terminar assim: em adoração. \"Porque dele, e por ele, e para ele, são todas as coisas.\"",
        ],
        pergunta: "O que você sabe sobre Deus que deveria virar adoração?",
        oracao: "Ó Deus, quão profundas são as tuas riquezas! Tudo é teu, por ti e para ti.",
        pratica: "Transforme algo que você aprendeu sobre Deus em uma frase de louvor.",
      },
      {
        titulo: "Digno és",
        leitura: { slug: "ap", capitulo: 4, de: 8, ate: 11 },
        reflexao: [
          "No céu, os anciãos \"lançavam as suas coroas diante do trono\". Tudo o que eles tinham de honra, entregavam a Deus.",
          "E cantavam: \"Digno és, Senhor nosso e Deus nosso\". Adorar é colocar as nossas coroas no chão e reconhecer quem é o único digno.",
        ],
        pergunta: "Que \"coroa\" sua precisa ser colocada diante de Deus?",
        oracao: "Digno és, Senhor. Eu entrego a ti tudo o que me faz sentir importante.",
        pratica: "Ouça ou cante hoje uma música de adoração com atenção total.",
      },
    ],
  },

  {
    id: "espirito-santo",
    titulo: "O Espírito Santo",
    chamada: "Deus que mora em nós",
    descricao:
      "Muita gente conhece o Pai e o Filho, mas fica sem saber quem é o Espírito Santo. Jesus disse que era melhor ele ir embora para o Espírito vir. Cinco dias para conhecer quem guia, consola e capacita.",
    categoria: "vida-com-deus",
    capa: { slug: "at", capitulo: 2 },
    cor: "#d9573b",
    dias: [
      {
        titulo: "Convém que eu vá",
        leitura: { slug: "jo", capitulo: 16, de: 7, ate: 13 },
        reflexao: [
          "Jesus diz algo que parece impossível: \"convém-vos que eu vá\". Melhor do que ter Jesus ao lado é ter o Espírito dentro.",
          "E promete: \"ele vos guiará a toda a verdade\". O Espírito não traz uma mensagem nova e diferente. Ele nos ajuda a entender e viver o que Jesus ensinou.",
        ],
        pergunta: "Você conta com a ajuda do Espírito para entender a Bíblia?",
        oracao: "Espírito Santo, guia-me a toda a verdade.",
        pratica: "Antes de ler a Bíblia hoje, peça ao Espírito para te guiar.",
      },
      {
        titulo: "Vento e fogo",
        leitura: { slug: "at", capitulo: 2, de: 1, ate: 4 },
        reflexao: [
          "No Pentecostes, veio do céu um som \"como que de um vento impetuoso\" e apareceram \"línguas como que de fogo\" sobre cada um.",
          "Vento e fogo são imagens de força e presença. E repare: o fogo pousou sobre cada um. O Espírito não é privilégio de poucos.",
        ],
        pergunta: "Você vê o Espírito como presente em você, ou só em pessoas especiais?",
        oracao: "Espírito Santo, enche-me. Que o teu fogo esteja em mim também.",
        pratica: "Ore hoje pedindo para ser cheio do Espírito, com simplicidade.",
      },
      {
        titulo: "O mesmo poder",
        leitura: { slug: "rm", capitulo: 8, de: 9, ate: 11 },
        reflexao: [
          "Paulo faz uma afirmação impressionante: \"o Espírito daquele que dos mortos ressuscitou a Jesus habita em vós\".",
          "O mesmo poder que tirou Jesus do túmulo mora em quem crê. Nenhuma área da sua vida está morta demais para ele.",
        ],
        pergunta: "Que área da sua vida parece morta e precisa desse poder?",
        oracao: "Espírito que ressuscitou Jesus, traz vida onde há morte em mim.",
        pratica: "Entregue em oração uma área que parece sem saída.",
      },
      {
        titulo: "Dons para servir",
        leitura: { slug: "1co", capitulo: 12, de: 4, ate: 7 },
        reflexao: [
          "\"Há diversidade de dons, mas o Espírito é o mesmo.\" Cada pessoa recebe algo diferente.",
          "E o propósito é claro: \"para o proveito comum\". O dom que o Espírito te deu não é para você brilhar. É para servir os outros.",
        ],
        pergunta: "Que dom Deus te deu, e quem ele está servindo?",
        oracao: "Espírito Santo, mostra-me os dons que me deste, e usa-os para o bem de outros.",
        pratica: "Pergunte a duas pessoas que te conhecem bem em que elas veem Deus te usar.",
      },
      {
        titulo: "Selados",
        leitura: { slug: "ef", capitulo: 1, de: 13, ate: 14 },
        reflexao: [
          "Paulo escreve a quem creu: \"fostes selados com o Espírito Santo da promessa\". Um selo marca propriedade e garante autenticidade.",
          "E o Espírito é \"o penhor da nossa herança\", como um sinal pago adiantado. Ele é a garantia de que Deus vai cumprir tudo o que prometeu.",
        ],
        pergunta: "Você vive com a segurança de quem pertence a Deus?",
        oracao: "Deus, obrigado por me selares com o teu Espírito. Eu pertenço a ti.",
        pratica: "Agradeça hoje pela presença do Espírito em você.",
      },
    ],
  },

  {
    id: "dinheiro-e-generosidade",
    titulo: "Dinheiro e coração",
    chamada: "Onde está o seu tesouro?",
    descricao:
      "Jesus falou muito sobre dinheiro, não porque Deus precise dele, mas porque ele revela o coração. Cinco dias sobre cobiça, contentamento e a alegria de dar.",
    categoria: "vida-com-deus",
    capa: { slug: "lc", capitulo: 12 },
    cor: "#8aa04a",
    dias: [
      {
        titulo: "O rico insensato",
        leitura: { slug: "lc", capitulo: 12, de: 13, ate: 21 },
        reflexao: [
          "Um homem rico decide construir celeiros maiores e relaxar. Deus o chama de insensato: \"Insensato, esta noite te pedirão a tua alma\".",
          "Jesus resume: \"a vida do homem não consiste na abundância das coisas que possui\". O problema não era ter, era viver só para acumular.",
        ],
        pergunta: "Você tem construído \"celeiros maiores\" sem pensar em Deus?",
        oracao: "Senhor, livra-me da cobiça. Minha vida não é o que eu tenho.",
        pratica: "Doe hoje algo que você não usa mais.",
      },
      {
        titulo: "Onde está o seu tesouro",
        leitura: { slug: "mt", capitulo: 6, de: 19, ate: 24 },
        reflexao: [
          "\"Onde estiver o teu tesouro, aí estará também o teu coração.\" O jeito como você usa o dinheiro mostra o que você ama.",
          "E Jesus é direto: \"Não podeis servir a Deus e às riquezas\". O dinheiro pode ser servo. Nunca deve ser senhor.",
        ],
        pergunta: "Se alguém olhasse o seu extrato, o que diria que você ama?",
        oracao: "Deus, quero que o meu tesouro esteja em ti. Tira do trono o que não é tu.",
        pratica: "Revise os gastos do último mês e veja o que eles dizem sobre o seu coração.",
      },
      {
        titulo: "O segredo do contentamento",
        leitura: { slug: "1tm", capitulo: 6, de: 6, ate: 10 },
        reflexao: [
          "\"É grande fonte de lucro a piedade com o contentamento.\" O maior ganho não está em ter mais, mas em estar em paz com o que se tem.",
          "Repare: \"o amor ao dinheiro é raiz de todos os males\". O dinheiro em si não é o problema. O amor a ele é.",
        ],
        pergunta: "O que te faria realmente contente, se não fosse ter mais?",
        oracao: "Senhor, ensina-me o contentamento. Que eu não ame o dinheiro.",
        pratica: "Passe uma semana sem compras por impulso.",
      },
      {
        titulo: "Ricos em boas obras",
        leitura: { slug: "1tm", capitulo: 6, de: 17, ate: 19 },
        reflexao: [
          "Paulo não manda os ricos se sentirem culpados. Manda que não ponham \"a sua esperança na incerteza das riquezas\".",
          "E dá a alternativa: \"que sejam liberais e generosos\". A riqueza pode virar ferramenta de bem, quando a esperança está em Deus.",
        ],
        pergunta: "Onde está a sua esperança: no saldo ou em Deus?",
        oracao: "Deus, que a minha esperança esteja em ti, e que eu seja generoso.",
        pratica: "Separe uma quantia, por menor que seja, para ajudar alguém este mês.",
      },
      {
        titulo: "As duas moedas",
        leitura: { slug: "lc", capitulo: 21, de: 1, ate: 4 },
        reflexao: [
          "Os ricos dão muito. Uma viúva pobre dá duas moedinhas. E Jesus diz: \"esta pobre viúva deu mais do que todos\".",
          "Deus não mede o valor, mede o coração. Ela deu \"da sua pobreza\", confiando que Deus cuidaria dela.",
        ],
        pergunta: "Sua generosidade custa alguma coisa para você?",
        oracao: "Senhor, dá-me um coração como o dessa viúva, que confia em ti para dar.",
        pratica: "Faça hoje uma doação que realmente te custe algo.",
      },
    ],
  },

  /* ============================================= CAMINHANDO COM JESUS === */
  {
    id: "natal",
    titulo: "O Natal",
    chamada: "Sete dias até a manjedoura",
    descricao:
      "Antes das luzes e dos presentes, o Natal é a história de Deus vindo morar entre nós. Sete dias com as profecias, o anjo, os pastores e os magos, para chegar ao Natal com o coração preparado.",
    categoria: "jesus",
    capa: { slug: "lc", capitulo: 2 },
    cor: "#b5453f",
    selo: "Para o Natal",
    dias: [
      {
        titulo: "Uma grande luz",
        leitura: { slug: "is", capitulo: 9, de: 2, ate: 7 },
        reflexao: [
          "Séculos antes, Isaías anuncia: \"O povo que andava em trevas viu uma grande luz\". E diz como ela viria: \"um menino nos nasceu\".",
          "Os nomes desse menino dizem tudo: \"Maravilhoso Conselheiro, Deus Forte, Pai Eterno, Príncipe da Paz\". O Natal começa com uma promessa.",
        ],
        pergunta: "Qual desses nomes você mais precisa conhecer neste Natal?",
        oracao: "Jesus, Príncipe da Paz, brilha nas trevas da minha vida.",
        pratica: "Acenda uma luz ou uma vela e ore por quem está passando um Natal difícil.",
      },
      {
        titulo: "Belém, pequena",
        leitura: { slug: "mq", capitulo: 5, de: 2, ate: 4 },
        reflexao: [
          "\"Mas tu, Belém Efrata, posto que pequena\". O Rei prometido não viria da capital, mas de uma cidadezinha esquecida.",
          "Deus gosta de começar grandes histórias em lugares pequenos. Ninguém é pequeno demais para ele usar.",
        ],
        pergunta: "Em que você se sente pequeno ou esquecido?",
        oracao: "Senhor, tu escolheste Belém. Obrigado por usares o que é pequeno.",
        pratica: "Faça hoje algo pequeno e escondido por alguém.",
      },
      {
        titulo: "Não temas, Maria",
        leitura: { slug: "lc", capitulo: 1, de: 26, ate: 38 },
        reflexao: [
          "O anjo aparece a uma jovem simples de Nazaré: \"Não temas, Maria; pois achaste graça diante de Deus\". Ela fica perturbada, e pergunta: \"Como se fará isso\".",
          "Maria não entendia tudo. Mas confiou e disse sim. O Natal começou com uma pessoa disposta a ser usada por Deus.",
        ],
        pergunta: "Deus está te pedindo um \"sim\" que você ainda não entende?",
        oracao: "Senhor, como Maria, eu digo sim a ti, mesmo sem entender tudo.",
        pratica: "Diga sim hoje a algo que você sabe que Deus está pedindo.",
      },
      {
        titulo: "Deus conosco",
        leitura: { slug: "mt", capitulo: 1, de: 18, ate: 25 },
        reflexao: [
          "José descobre que Maria está grávida e, por ser justo, decide deixá-la sem expô-la: ele \"não a queria infamar\". Até que um anjo explica tudo em sonho.",
          "O nome do menino resume o Natal: \"EMANUEL, que traduzido é: Deus conosco\". E José \"fez como o anjo do Senhor lhe ordenara\". Obediência silenciosa também é fé.",
        ],
        pergunta: "Onde você precisa saber hoje que Deus está com você?",
        oracao: "Emanuel, Deus conosco, obrigado por vires estar comigo.",
        pratica: "Escreva \"Deus conosco\" e deixe num lugar visível neste período.",
      },
      {
        titulo: "Não havia lugar",
        leitura: { slug: "lc", capitulo: 2, de: 1, ate: 7 },
        reflexao: [
          "O Filho de Deus nasce longe de casa e Maria \"o deitou em uma manjedoura, porque não havia lugar para eles na estalagem\".",
          "O Rei do universo começou num cocho de animais. Deus entrou pela porta dos fundos da história, perto de quem também não tinha lugar.",
        ],
        pergunta: "Há lugar para Jesus no meio da correria do seu fim de ano?",
        oracao: "Jesus, que no meu coração haja lugar para ti.",
        pratica: "Separe um momento de silêncio só para Jesus no meio da agitação de hoje.",
      },
      {
        titulo: "Novas de grande alegria",
        leitura: { slug: "lc", capitulo: 2, de: 8, ate: 14 },
        reflexao: [
          "Os primeiros a saber foram pastores, gente simples no turno da noite. O anjo diz: \"vos trago novas de grande alegria\".",
          "E o céu inteiro canta: \"Glória a Deus nas maiores alturas\". O Natal é boa notícia, e foi entregue primeiro a quem ninguém dava atenção.",
        ],
        pergunta: "Para quem você poderia levar essa boa notícia neste Natal?",
        oracao: "Glória a Deus nas maiores alturas, e paz na terra!",
        pratica: "Convide alguém para celebrar o Natal com você.",
      },
      {
        titulo: "Viemos adorá-lo",
        leitura: { slug: "mt", capitulo: 2, de: 1, ate: 11 },
        reflexao: [
          "Magos vêm de longe seguindo uma estrela: \"do oriente vimos a sua estrela e viemos adorá-lo\". Estrangeiros, eles atravessam o mundo para encontrar Jesus.",
          "Herodes, perto, sentiu ameaça. Os magos, longe, sentiram alegria. A pergunta do Natal é a mesma: o que você faz com esse menino?",
        ],
        pergunta: "Que presente você quer entregar a Jesus neste Natal?",
        oracao: "Jesus, eu venho te adorar. Recebe o meu presente: a minha vida.",
        pratica: "Dê hoje um presente a alguém que não espera receber nada.",
      },
    ],
  },

  {
    id: "parabolas",
    titulo: "As parábolas de Jesus",
    chamada: "Histórias simples, verdades profundas",
    descricao:
      "Jesus ensinava contando histórias do dia a dia: sementes, ovelhas, moedas, festas. Seis parábolas para descobrir como é o Reino de Deus, e onde você está nele.",
    categoria: "jesus",
    capa: { slug: "mt", capitulo: 13 },
    cor: "#7aa0b8",
    dias: [
      {
        titulo: "O semeador",
        leitura: { slug: "mt", capitulo: 13, de: 3, ate: 9 },
        reflexao: [
          "\"Eis que o semeador saiu a semear.\" A mesma semente cai em quatro tipos de solo: o caminho, as pedras, os espinhos e a boa terra.",
          "A semente é sempre boa. O que muda é o solo. E Jesus termina com um convite: \"Quem tem ouvidos, ouça\".",
        ],
        pergunta: "Que tipo de solo o seu coração tem sido nesta fase?",
        oracao: "Senhor, faz do meu coração boa terra para a tua palavra.",
        pratica: "Identifique os \"espinhos\" que têm sufocado a sua fé e corte um deles.",
      },
      {
        titulo: "Mostarda e fermento",
        leitura: { slug: "mt", capitulo: 13, de: 31, ate: 33 },
        reflexao: [
          "O Reino começa como \"a menor de todas as sementes\" e vira árvore. Ou como fermento escondido na massa, \"até ficar tudo levedado\".",
          "Deus trabalha de forma pequena e escondida antes de ficar visível. Não despreze os começos pequenos.",
        ],
        pergunta: "Que começo pequeno Deus pode estar fazendo em você?",
        oracao: "Deus, eu confio no teu trabalho escondido, mesmo quando parece pequeno.",
        pratica: "Plante hoje uma \"semente\": uma conversa, uma oração, um gesto.",
      },
      {
        titulo: "O tesouro e a pérola",
        leitura: { slug: "mt", capitulo: 13, de: 44, ate: 46 },
        reflexao: [
          "Um homem acha um tesouro no campo e, \"movido de gozo, vai, vende tudo quanto tem\". Um comerciante faz o mesmo por uma pérola.",
          "Repare: não é sacrifício triste, é alegria. Quem descobre o valor de Jesus acha que vale a pena trocar todo o resto.",
        ],
        pergunta: "Jesus é para você um tesouro ou uma obrigação?",
        oracao: "Jesus, abre os meus olhos para ver o tesouro que tu és.",
        pratica: "Escreva por que Jesus vale mais do que qualquer outra coisa para você.",
      },
      {
        titulo: "A ovelha perdida",
        leitura: { slug: "lc", capitulo: 15, de: 3, ate: 7 },
        reflexao: [
          "Um pastor deixa noventa e nove ovelhas para buscar uma. Quando acha, \"põe-na sobre os ombros, cheio de júbilo\".",
          "Ele não dá bronca na ovelha. Carrega e faz festa: \"Alegrai-vos comigo, porque achei a minha ovelha\". É assim que Deus olha para quem volta.",
        ],
        pergunta: "Você se vê como ovelha carregada nos ombros, ou como ovelha que vai levar bronca?",
        oracao: "Pastor, obrigado por vires atrás de mim. Carrega-me.",
        pratica: "Procure alguém que se afastou da fé, só para mostrar que você se importa.",
      },
      {
        titulo: "Os talentos",
        leitura: { slug: "mt", capitulo: 25, de: 14, ate: 21 },
        reflexao: [
          "Um senhor entrega bens aos servos, \"a cada um segundo a sua capacidade\". Os que usaram ouviram: \"Muito bem, servo bom e fiel; sobre o pouco foste fiel\".",
          "O que Deus te deu não é para ficar enterrado por medo. É para ser usado, multiplicado, investido no Reino.",
        ],
        pergunta: "Que talento seu está \"enterrado\" por medo?",
        oracao: "Senhor, quero ser fiel no pouco. Ajuda-me a usar o que me deste.",
        pratica: "Use hoje um talento seu para abençoar alguém.",
      },
      {
        titulo: "O fariseu e o publicano",
        leitura: { slug: "lc", capitulo: 18, de: 9, ate: 14 },
        reflexao: [
          "O fariseu ora listando as próprias virtudes. O publicano nem levanta os olhos: \"ó Deus, sê propício a mim, o pecador!\"",
          "E Jesus conclui que foi o publicano que \"desceu justificado para sua casa\". Deus não ouve currículos. Ouve corações quebrantados.",
        ],
        pergunta: "Suas orações se parecem mais com as do fariseu ou com a do publicano?",
        oracao: "Ó Deus, sê propício a mim, pecador.",
        pratica: "Faça hoje uma oração curta e sincera, sem se justificar.",
      },
    ],
  },

  {
    id: "milagres-de-jesus",
    titulo: "Os milagres de Jesus",
    chamada: "Sinais de quem ele é",
    descricao:
      "Nos evangelhos, os milagres não são truques. São sinais de quem Jesus é e de como será o Reino: sem fome, sem doença, sem morte. Seis milagres e o que eles mostram sobre o coração de Jesus.",
    categoria: "jesus",
    capa: { slug: "mc", capitulo: 2 },
    cor: "#a07ab8",
    dias: [
      {
        titulo: "Água em vinho",
        leitura: { slug: "jo", capitulo: 2, de: 1, ate: 11 },
        reflexao: [
          "O primeiro sinal de Jesus acontece numa festa de casamento, quando o vinho acaba. Maria diz: \"Eles não têm vinho\". E orienta: \"Fazei tudo quanto ele vos disser\".",
          "Jesus transforma água em vinho, e do melhor: \"tu guardaste até agora o bom vinho\". Ele se importa até com a alegria de uma festa.",
        ],
        pergunta: "Onde a alegria \"acabou\" na sua vida?",
        oracao: "Jesus, tu transformas água em vinho. Restaura a minha alegria.",
        pratica: "Faça tudo o que Jesus disser hoje, em algo concreto.",
      },
      {
        titulo: "Queres ficar são?",
        leitura: { slug: "jo", capitulo: 5, de: 1, ate: 9 },
        reflexao: [
          "Um homem estava doente havia trinta e oito anos. Jesus pergunta algo estranho: \"Queres ficar são?\". E ele responde com a sua solidão: \"Senhor, não tenho ninguém\".",
          "Jesus não precisa de tanque nem de ajuda. Só diz: \"Levanta-te, toma o teu leito e anda\".",
        ],
        pergunta: "Você realmente quer mudar, ou se acostumou com a situação?",
        oracao: "Senhor, eu quero ficar são. Dá-me coragem para levantar.",
        pratica: "Dê hoje um passo concreto na direção da mudança que você precisa.",
      },
      {
        titulo: "Cinco pães e dois peixes",
        leitura: { slug: "mc", capitulo: 6, de: 34, ate: 44 },
        reflexao: [
          "Jesus vê a multidão e \"compadeceu-se deles, porque eram como ovelhas que não têm pastor\". E diz aos discípulos: \"Dai-lhes vós de comer\".",
          "Eles só tinham \"cinco pães e dois peixes\". Jesus usou o pouco que eles tinham. Ele não pede o que você não tem: pede o que você tem.",
        ],
        pergunta: "Que \"cinco pães\" você tem achado pequeno demais para oferecer?",
        oracao: "Jesus, aqui está o pouco que eu tenho. Multiplica.",
        pratica: "Ofereça hoje algo que você acha pequeno demais: tempo, comida, uma habilidade.",
      },
      {
        titulo: "Quem pecou?",
        leitura: { slug: "jo", capitulo: 9, de: 1, ate: 7 },
        reflexao: [
          "Os discípulos querem um culpado: \"quem pecou, este ou seus pais\". Jesus recusa essa lógica: \"foi para que nele se manifestem as obras de Deus\".",
          "Nem todo sofrimento é castigo. E o homem obedece, vai ao tanque e \"voltou vendo\".",
        ],
        pergunta: "Você já se culpou, ou culpou alguém, por um sofrimento que não era castigo?",
        oracao: "Senhor, livra-me de procurar culpados. Mostra as tuas obras em mim.",
        pratica: "Não julgue hoje ninguém pelo que está sofrendo.",
      },
      {
        titulo: "Talita cumi",
        leitura: { slug: "mc", capitulo: 5, de: 35, ate: 43 },
        reflexao: [
          "A notícia chega: a filha de Jairo morreu. Jesus diz ao pai: \"Não temas, crê somente\". Na casa, pega na mão da menina: \"Talita cumi\", menina, levanta-te.",
          "E um detalhe lindo: depois do milagre, Jesus \"mandou que lhe dessem de comer\". O Deus dos milagres também cuida do básico.",
        ],
        pergunta: "Em que situação você precisa ouvir \"não temas, crê somente\"?",
        oracao: "Jesus, eu não temo. Creio somente. Toma pela mão o que parece morto.",
        pratica: "Ore hoje por uma situação que todos já deram como perdida.",
      },
      {
        titulo: "Não chores",
        leitura: { slug: "lc", capitulo: 7, de: 11, ate: 17 },
        reflexao: [
          "Uma viúva enterra o filho único. Ninguém pediu nada a Jesus. Mas ele \"encheu-se de compaixão por ela, e disse-lhe: Não chores\".",
          "Jesus devolve o filho à mãe. E o povo entende: \"Deus visitou o seu povo\". Os milagres mostram que Deus não é indiferente à dor.",
        ],
        pergunta: "Você acredita que Jesus se compadece de você, mesmo sem você pedir?",
        oracao: "Jesus, obrigado pela tua compaixão. Visita a minha dor.",
        pratica: "Visite hoje alguém que está sofrendo.",
      },
    ],
  },

  {
    id: "sete-palavras-da-cruz",
    titulo: "As sete palavras da cruz",
    chamada: "O que Jesus disse antes de morrer",
    descricao:
      "Os evangelhos registram sete frases de Jesus na cruz. Juntas, elas mostram perdão, cuidado, abandono, sede e entrega. Uma frase por dia, para ficar perto da cruz sem pressa.",
    categoria: "jesus",
    capa: { slug: "mt", capitulo: 27 },
    cor: "#8e3b3b",
    dias: [
      {
        titulo: "Pai, perdoa-lhes",
        leitura: { slug: "lc", capitulo: 23, de: 33, ate: 34 },
        reflexao: [
          "A primeira palavra é uma oração pelos inimigos: \"Pai, perdoa-lhes; porque não sabem o que fazem\".",
          "Enquanto os pregos ainda doem, Jesus intercede. Se ele perdoou ali, não existe pecado grande demais para o perdão dele.",
        ],
        pergunta: "Quem você precisa incluir na oração \"Pai, perdoa-lhes\"?",
        oracao: "Jesus, tu perdoaste na cruz. Perdoa-me, e ajuda-me a perdoar.",
        pratica: "Ore hoje pelo bem de alguém que te machucou.",
      },
      {
        titulo: "Hoje estarás comigo",
        leitura: { slug: "lc", capitulo: 23, de: 39, ate: 43 },
        reflexao: [
          "Um criminoso crucificado ao lado pede: \"Jesus, lembra-te de mim, quando entrares no teu reino\". Ele não tinha mais tempo para mudar nada.",
          "E Jesus responde: \"hoje estarás comigo no paraíso\". A graça chega até o último minuto.",
        ],
        pergunta: "Você acredita que a graça alcança até quem não tem mais nada a oferecer?",
        oracao: "Jesus, lembra-te de mim. Eu não tenho nada além de confiança em ti.",
        pratica: "Ore por alguém que parece longe demais de Deus.",
      },
      {
        titulo: "Eis aí tua mãe",
        leitura: { slug: "jo", capitulo: 19, de: 25, ate: 27 },
        reflexao: [
          "Na dor extrema, Jesus vê a mãe e o discípulo amado e diz: \"Mulher, eis aí o teu filho\". E ao discípulo: \"Eis aí tua mãe\".",
          "Até na cruz Jesus cuida de quem fica. Ele cria uma nova família ali, aos pés da cruz.",
        ],
        pergunta: "De quem você foi chamado a cuidar?",
        oracao: "Jesus, tu cuidaste da tua mãe na cruz. Ensina-me a cuidar dos meus.",
        pratica: "Ligue hoje para sua mãe, seu pai ou alguém que cuidou de você.",
      },
      {
        titulo: "Por que me desamparaste?",
        leitura: { slug: "mt", capitulo: 27, de: 45, ate: 46 },
        reflexao: [
          "O grito mais escuro: \"Deus meu, Deus meu, por que me desamparaste?\" São as primeiras palavras do Salmo 22, que termina em confiança.",
          "Jesus experimentou o abandono para que nós nunca precisássemos viver sem Deus. Ele conhece a sensação de que Deus sumiu.",
        ],
        pergunta: "Você já se sentiu abandonado por Deus?",
        oracao: "Jesus, tu sentiste o abandono por mim. Quando eu me sentir assim, lembra-me de que tu estás comigo.",
        pratica: "Leia o Salmo 22 inteiro e veja como ele termina.",
      },
      {
        titulo: "Tenho sede",
        leitura: { slug: "jo", capitulo: 19, de: 28, ate: 29 },
        reflexao: [
          "\"Tenho sede.\" A frase mais humana da cruz. O mesmo Jesus que prometeu água viva à samaritana agora tem sede.",
          "Ele não fingiu que era só espírito. Sentiu o corpo, a dor, a sede. Deus sabe o que é ser humano.",
        ],
        pergunta: "Que necessidade sua você tem vergonha de admitir?",
        oracao: "Jesus, tu tiveste sede. Tu entendes as minhas necessidades.",
        pratica: "Dê hoje água, comida ou atenção a quem precisa.",
      },
      {
        titulo: "Está consumado",
        leitura: { slug: "jo", capitulo: 19, de: 30 },
        reflexao: [
          "\"Está consumado.\" Não é um suspiro de derrota. É a palavra de quem terminou a obra.",
          "Tudo o que era preciso para nos reconciliar com Deus foi feito. Não falta nada para você completar.",
        ],
        pergunta: "Você ainda tenta completar algo que Jesus já terminou?",
        oracao: "Jesus, está consumado. Eu descanso no que tu fizeste.",
        pratica: "Agradeça hoje, sem pedir nada, pela obra completa da cruz.",
      },
      {
        titulo: "Nas tuas mãos",
        leitura: { slug: "lc", capitulo: 23, de: 46, ate: 47 },
        reflexao: [
          "A última palavra é de entrega: \"Pai, nas tuas mãos entrego o meu espírito\". Jesus morre confiando.",
          "E um soldado romano, que viu tudo, diz: \"Na verdade, este homem era justo\". A cruz muda até quem a executou.",
        ],
        pergunta: "O que você precisa entregar nas mãos do Pai hoje?",
        oracao: "Pai, nas tuas mãos eu entrego a minha vida.",
        pratica: "Antes de dormir, entregue o dia e a vida nas mãos de Deus.",
      },
    ],
  },

  {
    id: "ele-ressuscitou",
    titulo: "Ele ressuscitou",
    chamada: "Os encontros depois do túmulo vazio",
    descricao:
      "A história não termina na cruz. Depois da ressurreição, Jesus aparece a uma mulher chorando, a dois amigos tristes na estrada, a pescadores que não pescaram nada. Seis dias com o Cristo vivo.",
    categoria: "jesus",
    capa: { slug: "lc", capitulo: 24 },
    cor: "#e3c27a",
    dias: [
      {
        titulo: "Maria!",
        leitura: { slug: "jo", capitulo: 20, de: 11, ate: 18 },
        reflexao: [
          "Maria Madalena chora no túmulo vazio. Jesus pergunta: \"Mulher, por que choras? A quem procuras?\" E ela, \"julgando que fosse o jardineiro\", não o reconhece.",
          "Até ele dizer o nome dela. Então ela entende, e corre a anunciar: \"Vi o Senhor!\". Jesus vivo te conhece pelo nome.",
        ],
        pergunta: "Como seria ouvir Jesus chamando o seu nome?",
        oracao: "Jesus vivo, chama-me pelo nome. Quero te reconhecer.",
        pratica: "Conte a alguém que Jesus está vivo, com as suas palavras.",
      },
      {
        titulo: "Na estrada para Emaús",
        leitura: { slug: "lc", capitulo: 24, de: 13, ate: 27 },
        reflexao: [
          "Dois discípulos voltam para casa derrotados: \"nós esperávamos que fosse ele\". E \"o próprio Jesus se aproximou, e ia com eles\", sem que o reconhecessem.",
          "Jesus caminha conosco até quando estamos decepcionados. E começa a explicar as Escrituras, uma por uma.",
        ],
        pergunta: "Que esperança sua foi frustrada, a ponto de você dizer \"nós esperávamos\"?",
        oracao: "Jesus, caminha comigo na minha decepção. Abre os meus olhos.",
        pratica: "Faça uma caminhada hoje conversando com Jesus.",
      },
      {
        titulo: "Fica conosco",
        leitura: { slug: "lc", capitulo: 24, de: 28, ate: 35 },
        reflexao: [
          "Os dois insistem: \"Fica conosco; porque é tarde\". E é no partir do pão que os olhos deles se abrem.",
          "Depois eles se perguntam: \"Porventura não se nos abrasava o coração\". Às vezes só percebemos depois que Jesus estava ali o tempo todo.",
        ],
        pergunta: "Em que momento, olhando para trás, você percebe que Jesus estava presente?",
        oracao: "Fica comigo, Senhor, porque é tarde. Abre os meus olhos.",
        pratica: "Faça uma refeição hoje com atenção, agradecendo pela presença de Jesus.",
      },
      {
        titulo: "Vinde, comei",
        leitura: { slug: "jo", capitulo: 21, de: 4, ate: 12 },
        reflexao: [
          "Os discípulos voltam a pescar e não pegam nada. Jesus pergunta da praia: \"Filhos, não tendes nada que comer?\"",
          "E prepara o café da manhã com peixe na brasa: \"Vinde, comei\". O ressuscitado cozinha para amigos cansados.",
        ],
        pergunta: "Você se surpreende com um Jesus que cuida do seu café da manhã?",
        oracao: "Jesus, obrigado por cuidares de mim até nas coisas simples.",
        pratica: "Prepare uma refeição para alguém hoje.",
      },
      {
        titulo: "Segundo as Escrituras",
        leitura: { slug: "1co", capitulo: 15, de: 3, ate: 8 },
        reflexao: [
          "Paulo resume o coração do evangelho: Cristo morreu, foi sepultado e ressuscitou, \"segundo as Escrituras\".",
          "E lista testemunhas: Pedro, os doze, e até \"mais de quinhentos irmãos duma vez\". A ressurreição não foi contada como lenda, mas como fato com testemunhas.",
        ],
        pergunta: "A ressurreição é para você um fato ou só uma ideia bonita?",
        oracao: "Senhor, eu creio que tu morreste e ressuscitaste. Firma a minha fé.",
        pratica: "Escreva em três frases por que a ressurreição importa para você.",
      },
      {
        titulo: "Onde está, ó morte?",
        leitura: { slug: "1co", capitulo: 15, de: 54, ate: 58 },
        reflexao: [
          "Paulo zomba da morte: \"Onde está, ó morte, a tua vitória?\" Por causa da ressurreição, a morte perdeu a última palavra.",
          "E a conclusão é prática: sede firmes, \"sabendo que o vosso trabalho não é vão no Senhor\". Nada do que você faz para Deus é desperdiçado.",
        ],
        pergunta: "Que trabalho seu parece em vão, mas não é?",
        oracao: "Graças a Deus que nos dá a vitória por Jesus! Que eu seja firme.",
        pratica: "Continue hoje, com firmeza, algo que você quase desistiu de fazer.",
      },
    ],
  },

  /* ============================================= CARÁTER E SABEDORIA === */
  {
    id: "humildade",
    titulo: "Humildade",
    chamada: "O caminho para baixo",
    descricao:
      "Num mundo que manda se promover, Jesus esvaziou-se a si mesmo. Cinco dias sobre a virtude que Deus mais honra e que menos aparece no currículo.",
    categoria: "carater",
    capa: { slug: "lc", capitulo: 14 },
    cor: "#7f9b8e",
    dias: [
      {
        titulo: "Os outros primeiro",
        leitura: { slug: "fp", capitulo: 2, de: 3, ate: 4 },
        reflexao: [
          "Paulo pede algo contra a nossa natureza: \"com humildade cada um considere os outros superiores a si mesmo\".",
          "Humildade não é se achar menos. É pensar menos em si e mais nos outros.",
        ],
        pergunta: "Em que conversa você costuma querer ser o centro?",
        oracao: "Senhor, ensina-me a olhar para os outros antes de mim.",
        pratica: "Em toda conversa de hoje, faça mais perguntas do que fale de você.",
      },
      {
        titulo: "Ele esvaziou-se",
        leitura: { slug: "fp", capitulo: 2, de: 5, ate: 11 },
        reflexao: [
          "Jesus, sendo Deus, \"esvaziou-se a si mesmo, tomando a forma de servo\". Desceu até a morte de cruz.",
          "E por isso Deus o exaltou. O caminho de Jesus é para baixo, e é lá que Deus levanta.",
        ],
        pergunta: "Que status você tem dificuldade de abrir mão?",
        oracao: "Jesus, tu te esvaziaste por mim. Dá-me o teu sentimento.",
        pratica: "Faça hoje um serviço que normalmente estaria \"abaixo\" de você.",
      },
      {
        titulo: "O último lugar",
        leitura: { slug: "lc", capitulo: 14, de: 7, ate: 11 },
        reflexao: [
          "Jesus observa convidados disputando os melhores lugares numa festa. E aconselha escolher o último, para ouvir: \"Amigo, sobe mais para cima\".",
          "Quem se exalta vai ser humilhado. Quem se humilha vai ser exaltado. Deus inverte a lógica da festa.",
        ],
        pergunta: "Onde você tem disputado o primeiro lugar?",
        oracao: "Senhor, não quero disputar lugares. Coloca-me onde tu quiseres.",
        pratica: "Ceda hoje o melhor lugar, literal ou não, a outra pessoa.",
      },
      {
        titulo: "Graça aos humildes",
        leitura: { slug: "tg", capitulo: 4, de: 6, ate: 10 },
        reflexao: [
          "\"Deus resiste aos soberbos; dá, porém, graça aos humildes.\" O orgulho fecha a porta da graça.",
          "E a promessa é próxima: \"Chegai-vos para Deus, e ele se chegará para vós\". A humildade é o caminho mais curto até Deus.",
        ],
        pergunta: "Em que área o orgulho tem te afastado de Deus?",
        oracao: "Deus, eu me chego a ti. Tira de mim o orgulho.",
        pratica: "Peça perdão hoje a alguém, sem justificativas.",
      },
      {
        titulo: "Cingidos de humildade",
        leitura: { slug: "1pe", capitulo: 5, de: 5, ate: 7 },
        reflexao: [
          "Pedro diz: \"cingi-vos todos de humildade uns para com os outros\". Cingir é vestir, como um avental de servo.",
          "Pedro, que um dia teve os pés lavados por Jesus, aprendeu: humildade é algo que a gente veste para servir.",
        ],
        pergunta: "Com quem você precisa vestir o avental da humildade?",
        oracao: "Senhor, veste-me de humildade para servir os outros.",
        pratica: "Ajude hoje alguém em casa sem esperar reconhecimento.",
      },
    ],
  },

  {
    id: "vencendo-a-tentacao",
    titulo: "Vencendo a tentação",
    chamada: "Força para dizer não",
    descricao:
      "Todo mundo é tentado, até Jesus foi. A Bíblia não promete uma vida sem tentação, mas mostra o caminho de saída. Cinco dias sobre como resistir, e o que fazer quando a gente cai.",
    categoria: "carater",
    capa: { slug: "mt", capitulo: 4 },
    cor: "#6a6f8c",
    dias: [
      {
        titulo: "Está escrito",
        leitura: { slug: "mt", capitulo: 4, de: 5, ate: 11 },
        reflexao: [
          "O Diabo oferece um atalho a Jesus: \"Tudo isto te darei, se, prostrado, me adorares\". A tentação sempre promete muito por um preço escondido.",
          "Jesus responde três vezes com a mesma arma: \"está escrito\". Ele venceu com a Palavra de Deus guardada no coração.",
        ],
        pergunta: "Que atalho tem te tentado ultimamente?",
        oracao: "Jesus, tu venceste a tentação. Dá-me a tua palavra para resistir.",
        pratica: "Escolha um versículo para usar contra a tentação que mais te ataca.",
      },
      {
        titulo: "O meio de saída",
        leitura: { slug: "1co", capitulo: 10, de: 12, ate: 13 },
        reflexao: [
          "\"Aquele, pois, que pensa estar em pé, olhe não caia.\" Ninguém está acima da tentação.",
          "Mas a promessa é firme: Deus \"com a tentação dará também o meio de saída\". Sempre existe uma porta. Às vezes ela é simplesmente ir embora.",
        ],
        pergunta: "Qual costuma ser a sua \"porta de saída\" quando é tentado?",
        oracao: "Deus fiel, mostra-me a saída na hora da tentação.",
        pratica: "Planeje hoje o que você vai fazer na próxima vez que a tentação vier.",
      },
      {
        titulo: "De onde vem",
        leitura: { slug: "tg", capitulo: 1, de: 12, ate: 15 },
        reflexao: [
          "Tiago tira a culpa de Deus: \"Cada um, porém, é tentado, quando atraído e engodado pela sua própria concupiscência\".",
          "E mostra o processo: o desejo concebe, gera o pecado, e o pecado gera morte. Cortar cedo é mais fácil do que lutar no fim.",
        ],
        pergunta: "Em que ponto do processo você costuma perceber a tentação?",
        oracao: "Senhor, dá-me olhos para perceber a tentação no começo.",
        pratica: "Identifique um gatilho que te leva à tentação e evite-o hoje.",
      },
      {
        titulo: "José fugiu",
        leitura: { slug: "gn", capitulo: 39, de: 6, ate: 12 },
        reflexao: [
          "José é assediado dia após dia. E responde com clareza: \"Como, pois, posso eu cometer este grande mal, e pecar contra Deus?\"",
          "Quando a situação aperta, ele não argumenta: \"deixando a capa na mão dela, fugiu\". Há tentações que se vencem correndo.",
        ],
        pergunta: "Que tentação você precisa simplesmente fugir, em vez de enfrentar?",
        oracao: "Deus, dá-me coragem para fugir do que me afasta de ti.",
        pratica: "Remova hoje do seu caminho algo que facilita uma tentação.",
      },
      {
        titulo: "Ele entende",
        leitura: { slug: "hb", capitulo: 4, de: 14, ate: 16 },
        reflexao: [
          "Jesus \"em tudo foi tentado, mas sem pecado\". Ele não olha a nossa luta de longe: ele conhece por dentro.",
          "Por isso o convite: \"Cheguemo-nos, pois, confiadamente ao trono da graça\". Até depois de cair, a porta da graça continua aberta.",
        ],
        pergunta: "Depois de cair, você corre para Deus ou se esconde dele?",
        oracao: "Jesus, tu entendes a minha fraqueza. Eu me chego ao trono da graça.",
        pratica: "Se você caiu, confesse a Deus hoje e recomece.",
      },
    ],
  },

  {
    id: "trabalho-com-proposito",
    titulo: "Trabalho com propósito",
    chamada: "Fé de segunda a sexta",
    descricao:
      "A maior parte da vida acontece no trabalho, no estudo e nas tarefas de casa. A Bíblia trata o trabalho como parte do chamado de Deus, não como castigo. Cinco dias para levar a fé para o expediente.",
    categoria: "carater",
    capa: { slug: "ne", capitulo: 4 },
    cor: "#b8a06a",
    dias: [
      {
        titulo: "Para lavrar e guardar",
        leitura: { slug: "gn", capitulo: 2, de: 15 },
        reflexao: [
          "Antes do pecado, já havia trabalho. Deus pôs o ser humano no jardim \"para o lavrar e guardar\".",
          "Trabalhar não é castigo: é parte do propósito. Cuidar, cultivar e fazer crescer é refletir o Deus criador.",
        ],
        pergunta: "Você vê o seu trabalho como castigo ou como chamado?",
        oracao: "Senhor, ajuda-me a ver o meu trabalho como parte do teu propósito.",
        pratica: "Faça hoje uma tarefa com capricho, como quem cuida do jardim de Deus.",
      },
      {
        titulo: "O coração para trabalhar",
        leitura: { slug: "ne", capitulo: 4, de: 6 },
        reflexao: [
          "Neemias reconstrói os muros de Jerusalém sob ameaça. E o muro chega à metade \"porque o coração do povo se inclinava a trabalhar\".",
          "Grandes obras se fazem com corações dispostos, um tijolo de cada vez.",
        ],
        pergunta: "Seu coração tem estado inclinado a trabalhar, ou desanimado?",
        oracao: "Deus, inclina o meu coração para fazer bem o que me confiaste.",
        pratica: "Avance hoje um tijolo em um projeto parado.",
      },
      {
        titulo: "Formoso em seu tempo",
        leitura: { slug: "ec", capitulo: 3, de: 9, ate: 13 },
        reflexao: [
          "O Pregador reconhece o cansaço do trabalho, mas diz que Deus \"tudo fez formoso em seu tempo\".",
          "E chega a uma conclusão simples: comer, beber e \"goze do bem de todo o seu trabalho\" é presente de Deus. Dá para encontrar alegria no ordinário.",
        ],
        pergunta: "Você tem conseguido desfrutar do fruto do seu trabalho?",
        oracao: "Senhor, obrigado pelo trabalho e pelo seu fruto. Ensina-me a desfrutar.",
        pratica: "Celebre hoje algo que você concluiu.",
      },
      {
        titulo: "Como ao Senhor",
        leitura: { slug: "cl", capitulo: 3, de: 23, ate: 24 },
        reflexao: [
          "\"Tudo quanto fizerdes, fazei-o de coração, como ao Senhor, e não aos homens.\" Paulo escreve isso pensando em escravos, gente sem reconhecimento.",
          "Mesmo o trabalho que ninguém valoriza pode ser feito para Deus. O chefe pode não ver. Deus vê.",
        ],
        pergunta: "Para quem você trabalha de verdade?",
        oracao: "Senhor, que eu faça o meu trabalho para ti, mesmo quando ninguém vê.",
        pratica: "Faça hoje uma tarefa invisível com excelência.",
      },
      {
        titulo: "Não vos canseis",
        leitura: { slug: "2ts", capitulo: 3, de: 10, ate: 13 },
        reflexao: [
          "Paulo corrige quem vivia à custa dos outros e se intrometia na vida alheia. Trabalhar com sossego é parte da fé.",
          "E encoraja: \"não vos canseis de fazer o bem\". O bem feito com constância, dia após dia, também é testemunho.",
        ],
        pergunta: "Onde você está cansado de fazer o bem?",
        oracao: "Deus, renova as minhas forças para continuar fazendo o bem.",
        pratica: "Agradeça hoje a um colega pelo trabalho dele.",
      },
    ],
  },
];
