/**
 * Visão geral de cada capítulo.
 *
 * Piloto: por enquanto só Rute, para medir se o formato vale antes de escrever
 * 1.189 deles. O app trata a ausência como normal: capítulo sem ficha
 * simplesmente não mostra o cabeçalho.
 *
 * Regra de escrita: o resumo diz do que o capítulo trata sem entregar o
 * desfecho de quem está lendo pela primeira vez. Os marcos são o esqueleto da
 * ação, não interpretação.
 */

export type Capitulo = {
  /** Uma linha. É o que aparece fechado. */
  resumo: string;
  /** Um parágrafo curto, com o contexto que o texto pressupõe e não explica. */
  detalhe: string;
  /** O esqueleto da ação, na ordem em que acontece. */
  marcos: string[];
  /** Versículo-âncora do capítulo. */
  chave: number;
};

export const CAPITULOS: Record<string, Record<number, Capitulo>> = {
  rt: {
    1: {
      resumo:
        "Uma família foge da fome, perde tudo em terra estrangeira, e uma nora se recusa a ir embora.",
      detalhe:
        "Belém quer dizer 'casa do pão', e é de lá que a família sai por falta de pão. Vão para Moabe, povo que Israel tinha ordens de manter à distância. Em dez anos morrem o marido e os dois filhos, e sobram três viúvas sem nenhum homem para sustentá-las, que naquela sociedade significava não ter meio de vida. Noemi manda as noras de volta, e é aí que Rute diz a frase que virou o livro.",
      marcos: [
        "A fome leva Elimeleque, Noemi e os dois filhos de Belém para Moabe",
        "Morrem o marido e os dois filhos; ficam três viúvas",
        "Noemi decide voltar e manda as noras para a casa delas",
        "Orfa volta; Rute se recusa e declara lealdade",
        "Noemi chega a Belém amarga e pede para ser chamada de Mara",
      ],
      chave: 16,
    },
    2: {
      resumo:
        "Rute sai para recolher o que sobra da colheita e, sem saber, entra no campo de um parente.",
      detalhe:
        "A lei de Israel obrigava o dono da terra a deixar para trás o que caísse, para o pobre, o órfão, a viúva e o estrangeiro recolherem. Rute se encaixa em três dessas quatro categorias. É trabalho pesado, exposto e perigoso para uma mulher sozinha, e ela assume por conta própria o sustento da sogra. O narrador diz que ela 'caiu' justamente no campo de Boaz, e conta isso como se fosse acaso.",
      marcos: [
        "Rute se oferece para respigar e sustentar a sogra",
        "Acaba no campo de Boaz, parente de Elimeleque",
        "Boaz pergunta quem ela é e já sabia da história dela",
        "Ele a protege do assédio dos trabalhadores e manda favorecê-la",
        "Noemi reconhece Boaz como um dos resgatadores da família",
      ],
      chave: 12,
    },
    3: {
      resumo:
        "Noemi arquiteta um plano arriscado, e Rute pede a Boaz que assuma a família.",
      detalhe:
        "A cena é de noite, na eira, e é deliberadamente ambígua para o leitor moderno. Para o leitor antigo, o gesto de Rute era um pedido formal: ela invoca o direito de resgate, a obrigação de um parente assumir a terra e a viúva do morto para que o nome dele não desaparecesse. Boaz entende exatamente assim, elogia a lealdade dela e aceita, mas aparece um obstáculo legal.",
      marcos: [
        "Noemi orienta Rute a procurar Boaz na eira, à noite",
        "Rute faz o pedido de resgate, em linguagem legal",
        "Boaz aceita e se preocupa em proteger a reputação dela",
        "Ele revela que existe um parente com direito anterior ao dele",
      ],
      chave: 11,
    },
    4: {
      resumo:
        "Na porta da cidade, uma negociação pública decide o futuro de duas viúvas, e de uma dinastia.",
      detalhe:
        "A porta da cidade era o tribunal. Boaz expõe o caso diante de dez anciãos, e o parente mais próximo se interessa pela terra até descobrir que ela vem junto com a obrigação de levantar herdeiro para o morto, o que comprometeria a própria herança. Ele abre mão. O livro termina com uma genealogia, e o que ela faz é colocar uma moabita, do povo errado, como bisavó do maior rei de Israel.",
      marcos: [
        "Boaz leva o caso aos anciãos, na porta da cidade",
        "O parente mais próximo quer a terra, mas desiste ao saber da obrigação",
        "Boaz resgata a propriedade e casa com Rute",
        "Nasce Obede, e as vizinhas dizem que ele é filho de Noemi",
        "A genealogia final chega a Davi",
      ],
      chave: 17,
    },
  },
};

CAPITULOS.jn = {
  1: {
    resumo:
      "Deus manda um profeta para a capital do inimigo, e ele compra passagem para o lado oposto do mapa.",
    detalhe:
      "Nínive era a capital da Assíria, o império que aterrorizava Israel e que acabaria por destruir o reino do norte. Társis ficava no extremo oeste conhecido: Jonas não escolhe outro destino, escolhe a direção contrária. O contraste do capítulo é constrangedor de propósito. Os marinheiros pagãos oram, jogam sortes e tentam de tudo para não matar ninguém; o profeta do Deus verdadeiro dorme no porão.",
    marcos: [
      "Deus manda Jonas pregar contra Nínive",
      "Jonas embarca para Társis, na direção oposta",
      "A tempestade põe em risco toda a tripulação",
      "Os marinheiros descobrem a causa e relutam em lançá-lo ao mar",
      "Jonas é lançado; o mar se aquieta; um grande peixe o engole",
    ],
    chave: 3,
  },
  2: {
    resumo: "Do fundo do mar, uma oração feita quase toda de frases emprestadas.",
    detalhe:
      "A oração de Jonas é uma colcha de retalhos de salmos: quem estava afogado recorre ao que já sabia de cor. Note o que ela não tem, e isso é o ponto do livro: não há uma palavra de arrependimento por ter fugido, nem menção a Nínive. Ele agradece o resgate e promete sacrifício, sem mudar de ideia sobre a missão.",
    marcos: [
      "Jonas ora de dentro do peixe",
      "A oração é montada com trechos de salmos",
      "Ele agradece o resgate e promete cumprir votos",
      "O peixe o vomita em terra seca",
    ],
    chave: 9,
  },
  3: {
    resumo: "O sermão mais curto da Bíblia produz o maior arrependimento registrado nela.",
    detalhe:
      "A mensagem de Jonas tem cinco palavras no hebraico, sem promessa de perdão e sem convite. Mesmo assim a cidade inteira se volta, do rei ao gado, e o rei usa exatamente a palavra certa: 'quem sabe'. Ninguém ali tinha garantia nenhuma. O capítulo termina com Deus mudando o que tinha dito que faria, o que o texto descreve sem nenhum constrangimento.",
    marcos: [
      "Deus chama Jonas pela segunda vez",
      "Ele prega uma frase de cinco palavras",
      "Nínive inteira se arrepende, do rei aos animais",
      "O rei decreta jejum sem ter certeza do resultado",
      "Deus desiste do mal que tinha dito",
    ],
    chave: 9,
  },
  4: {
    resumo:
      "O profeta fica furioso porque deu certo, e o livro termina com uma pergunta que ninguém responde.",
    detalhe:
      "Aqui Jonas finalmente explica a fuga do capítulo 1: ele sabia que Deus perdoaria, e é exatamente isso que ele não queria. A acusação dele é uma citação de Êxodo 34, a definição clássica do caráter de Deus, usada como reclamação. A planta cresce, morre, e Jonas se importa mais com ela do que com uma cidade. O livro acaba numa pergunta de Deus, sem resposta, endereçada tanto a ele quanto a quem lê.",
    marcos: [
      "Jonas se irrita com o perdão e pede para morrer",
      "Admite que fugiu por saber que Deus é misericordioso",
      "A planta cresce e o alegra; o verme a mata",
      "Deus compara a compaixão dele pela planta com a de Deus pela cidade",
      "O livro termina em pergunta, sem desfecho",
    ],
    chave: 11,
  },
};

CAPITULOS.et = {
  1: {
    resumo:
      "Um império inteiro em festa, e uma rainha deposta por dizer não na frente de todo mundo.",
    detalhe:
      "O banquete de Xerxes dura cento e oitenta dias e serve para exibir riqueza antes de uma campanha militar. No sétimo dia, embriagado, o rei manda buscar Vasti para ser exibida também. Ela recusa. O texto não explica o motivo, e a reação do império é desproporcional: conselheiros temem que o exemplo se espalhe, e transformam um caso doméstico em decreto. A comédia do capítulo esconde uma denúncia: este é um poder que se assusta com uma mulher dizendo não.",
    marcos: [
      "Xerxes exibe a riqueza do império em banquetes intermináveis",
      "Vasti recusa comparecer diante dos convidados",
      "Os conselheiros temem o efeito do exemplo",
      "Um decreto irrevogável depõe a rainha",
    ],
    chave: 12,
  },
  2: {
    resumo: "Uma órfã judia entra no harém do rei e recebe ordens de esconder quem é.",
    detalhe:
      "O capítulo é narrado com uma frieza que vale notar: as moças não são convidadas, são levadas. Ester é órfã, estrangeira e sem poder de recusa. Mardoqueu manda que ela esconda a origem, e ela obedece por anos. No fim do capítulo ele descobre uma conspiração e salva a vida do rei, fato que fica registrado nas crônicas e aparentemente esquecido. Não é esquecido.",
    marcos: [
      "Moças são reunidas para substituir Vasti",
      "Ester, criada pelo primo Mardoqueu, é levada ao palácio",
      "Por ordem dele, esconde a identidade judaica",
      "Ester se torna rainha",
      "Mardoqueu descobre uma conspiração e o fato é registrado",
    ],
    chave: 10,
  },
  3: {
    resumo:
      "Um homem não se curva, e a resposta é um decreto para exterminar um povo inteiro.",
    detalhe:
      "Hamã é chamado de agagita, o que liga a sua linhagem a Agague, rei amalequita poupado por Saul séculos antes. A ofensa começa pessoal e vira étnica em um parágrafo. O detalhe mais brutal é comercial: Hamã compra o decreto, e o rei assina sem perguntar de que povo se trata. O capítulo fecha com os dois sentando para beber enquanto a cidade fica perplexa.",
    marcos: [
      "Hamã é promovido acima de todos os príncipes",
      "Mardoqueu se recusa a se curvar",
      "Hamã decide eliminar não só ele, mas todo o povo dele",
      "Lança-se o 'pur', a sorte, para marcar a data",
      "O rei assina sem perguntar quem são",
    ],
    chave: 8,
  },
  4: {
    resumo:
      "A pressão chega à rainha, e ela hesita antes de aceitar arriscar a própria vida.",
    detalhe:
      "O texto registra a hesitação dela sem suavizar: aparecer sem ser chamada significava morte, e ela lembra isso ao primo. A resposta de Mardoqueu é dura e tem duas partes, e a segunda é a mais lembrada. Ele diz que o livramento virá de outro lugar se ela calar, e pergunta se não foi para um momento como aquele que ela chegou onde chegou. Ester aceita, pede jejum e diz a frase que define o livro.",
    marcos: [
      "Mardoqueu põe pano de saco e lamenta em público",
      "Ester descobre o decreto e hesita, citando o risco",
      "Mardoqueu responde que o silêncio dela não a salvaria",
      "'Quem sabe se para tal tempo como este chegaste ao reino'",
      "Ester convoca jejum e decide ir",
    ],
    chave: 14,
  },
  5: {
    resumo:
      "Ela aparece sem ser chamada, é recebida, e então faz algo inesperado: não pede nada.",
    detalhe:
      "Depois de três dias de jejum, Ester se veste de rainha e enfrenta o risco. O cetro é estendido, o rei oferece metade do reino, e ela convida para um jantar. No jantar, convida para outro. Não sabemos se é estratégia ou medo, e o texto não diz. Enquanto isso, Hamã sai eufórico, se irrita ao ver Mardoqueu de novo, e manda erguer uma forca de vinte e dois metros.",
    marcos: [
      "Ester aparece no pátio interno sem ter sido chamada",
      "O rei estende o cetro e oferece metade do reino",
      "Ela convida o rei e Hamã para um banquete",
      "No banquete, convida para um segundo",
      "Hamã, humilhado por Mardoqueu, manda construir a forca",
    ],
    chave: 2,
  },
  6: {
    resumo:
      "O rei não consegue dormir, manda ler documentos velhos, e tudo vira do avesso numa noite.",
    detalhe:
      "É o centro do livro e a sua peça mais bem construída. Uma insônia leva à leitura das crônicas, que registram o favor esquecido de Mardoqueu. Hamã chega de madrugada para pedir a execução dele e é perguntado o que se faz a quem o rei deseja honrar. Convencido de que fala de si mesmo, ele descreve a maior honra possível, e é obrigado a executá-la pessoalmente no inimigo. Deus não é mencionado em nenhuma linha.",
    marcos: [
      "O rei perde o sono e manda ler as crônicas",
      "Descobre que Mardoqueu nunca foi recompensado",
      "Hamã chega para pedir a execução dele",
      "Pensando em si, descreve a honra máxima",
      "É obrigado a conduzir Mardoqueu honrado pela cidade",
    ],
    chave: 1,
  },
  7: {
    resumo: "No segundo banquete, a rainha finalmente diz quem é, e quem quer matá-la.",
    detalhe:
      "Ester revela a própria identidade e a de seu povo na mesma frase em que denuncia. O rei sai furioso para o jardim e volta encontrando Hamã caído sobre o divã dela, o que ele interpreta como assédio. A queda é rápida e tem uma ironia final: Hamã morre na forca que tinha erguido para outro.",
    marcos: [
      "Ester revela que é judia e que o decreto a condena",
      "Aponta Hamã como o responsável",
      "O rei sai enfurecido; Hamã suplica à rainha",
      "A cena é lida como agressão",
      "Hamã é enforcado na forca que mandou construir",
    ],
    chave: 3,
  },
  8: {
    resumo:
      "O decreto não pode ser revogado, então escrevem outro que permite ao povo se defender.",
    detalhe:
      "Aqui aparece o limite do poder que parecia absoluto: uma lei persa assinada não volta atrás, nem pelo rei. A solução é jurídica, não milagrosa, e é Mardoqueu quem a redige. A cidade que antes ficou perplexa agora comemora, e o texto diz que muitos se declararam judeus, o que inverte exatamente a lógica do capítulo 2, onde era preciso esconder.",
    marcos: [
      "Mardoqueu recebe o anel que era de Hamã",
      "Ester pede a revogação, que é juridicamente impossível",
      "Um segundo decreto autoriza os judeus a se defenderem",
      "Mensageiros partem às pressas por todo o império",
      "Há alegria, e muitos passam a se declarar judeus",
    ],
    chave: 16,
  },
  9: {
    resumo: "Chega o dia marcado, e a festa de Purim nasce do que acontece nele.",
    detalhe:
      "É o capítulo mais desconfortável do livro, e vale lê-lo como ele é, sem suavizar: há combate e há mortos. O texto faz questão de repetir três vezes que os judeus não tocaram no despojo, o que os separa da lógica de saque da época e ecoa justamente o erro de Saul com Agague. A festa recebe o nome do 'pur', a sorte que Hamã lançou: a data escolhida para o extermínio vira data de celebração.",
    marcos: [
      "Chega o dia marcado pelo decreto",
      "Os judeus se defendem em todo o império",
      "O texto frisa que não tocaram no despojo",
      "Os dez filhos de Hamã são executados",
      "Institui-se Purim, com troca de presentes e ajuda aos pobres",
    ],
    chave: 22,
  },
  10: {
    resumo: "Três versículos de encerramento, no tom seco de um registro oficial.",
    detalhe:
      "O livro termina como um verbete de crônica imperial, falando de tributo e da grandeza de Mardoqueu, agora o segundo do rei. O detalhe que fecha o sentido é o último: ele é descrito como alguém que buscava o bem do seu povo e falava pela paz de toda a sua descendência. Um livro que começou com um poder ocupado consigo mesmo termina com poder usado para o outro.",
    marcos: [
      "Nota sobre o tributo imposto por Xerxes",
      "Mardoqueu é registrado como o segundo do império",
      "É descrito como alguém que buscava o bem do seu povo",
    ],
    chave: 3,
  },
};

export const fichaDoCapitulo = (slug: string, capitulo: number): Capitulo | null =>
  CAPITULOS[slug]?.[capitulo] ?? null;
