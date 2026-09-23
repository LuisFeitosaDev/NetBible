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

CAPITULOS.gn = {
  1: {
    resumo: "Deus fala, e o que não existia passa a existir, em sete dias de ordem.",
    detalhe:
      "O capítulo é construído como um poema com ritmo fixo: Deus diz, e é feito, e Deus vê que é bom. Os três primeiros dias separam espaços vazios, os três seguintes preenchem cada um deles, e o sétimo não tem fim declarado. Escrito num mundo onde sol, lua e mar eram deuses, o texto os trata como coisas criadas, sem nem lhes dar nome. O ser humano aparece no fim, homem e mulher, e é o único chamado de imagem de Deus.",
    marcos: [
      "No princípio Deus cria os céus e a terra",
      "A luz é separada das trevas",
      "Os espaços são separados e depois povoados",
      "Os astros são criados como coisas, não como deuses",
      "O ser humano é feito à imagem de Deus, homem e mulher",
    ],
    chave: 27,
  },
  2: {
    resumo: "A mesma criação vista de perto, do chão, com um jardim e um nome faltando.",
    detalhe:
      "Depois do panorama, a câmera desce. Aqui Deus não fala de longe, molda barro com as mãos e sopra. O homem recebe trabalho antes de qualquer queda, o que já diz que trabalhar não é castigo. E então vem a primeira coisa que o texto chama de não boa: estar sozinho. Ele nomeia os animais e não encontra semelhante em nenhum, até que a mulher aparece e ele reage em poesia, a primeira fala humana registrada.",
    marcos: [
      "Deus forma o homem do pó e sopra nele o fôlego",
      "O jardim é plantado, com a árvore no meio",
      "O homem recebe trabalho e um único limite",
      "Estar sozinho é declarado não bom",
      "A mulher é formada, e o homem responde em poesia",
    ],
    chave: 24,
  },
  3: {
    resumo:
      "Uma pergunta torta sobre o que Deus teria dito, e tudo se desfaz a partir dela.",
    detalhe:
      "A serpente não manda desobedecer, ela pergunta. E a pergunta distorce de leve o que Deus disse, o bastante para a ordem parecer mesquinha. Repare que a resposta da mulher também já vem aumentada, com uma proibição de tocar que Deus nunca deu. Depois da desobediência vem o que o pecado faz na prática: esconder, cobrir, culpar o outro. As consequências atingem exatamente os dois lugares onde havia bênção, o trabalho e a vida em comum.",
    marcos: [
      "A serpente questiona o que Deus teria dito",
      "A mulher e o homem comem do fruto",
      "Eles se escondem e começam a culpar um ao outro",
      "Deus anuncia as consequências, e promete um descendente",
      "São expulsos do jardim, e o caminho é guardado",
    ],
    chave: 15,
  },
  4: {
    resumo: "Duas ofertas, dois irmãos, e o primeiro sangue derramado por ciúme.",
    detalhe:
      "O texto não explica por que a oferta de Abel foi aceita e a de Caim não, e quem tenta explicar costuma dizer mais do que está escrito. O que o capítulo registra é o aviso de Deus antes do crime, com a imagem do pecado deitado à porta, esperando. Caim é avisado e escolhe mesmo assim. A resposta dele quando confrontado virou a pergunta que o resto da Bíblia responde. No fim, a violência já cresceu: Lameque mata por um arranhão e faz disso uma canção.",
    marcos: [
      "Caim e Abel trazem suas ofertas",
      "Deus adverte Caim antes do crime",
      "Caim mata Abel no campo",
      "'Sou eu guardador do meu irmão?'",
      "Lameque leva a vingança adiante e faz dela um poema",
    ],
    chave: 7,
  },
  5: {
    resumo: "Uma lista de nomes com uma frase repetindo no fim de cada um: e morreu.",
    detalhe:
      "É genealogia, e parece árida, mas tem um martelo batendo. Dez vezes o texto diz quanto alguém viveu e termina com 'e morreu'. É a sentença do capítulo 3 sendo cumprida geração após geração. No meio da lista, uma quebra: sobre Enoque não se diz que morreu, mas que andou com Deus e não foi mais achado. É a única exceção, e ela existe justamente para o leitor reparar no padrão.",
    marcos: [
      "A lista de Adão até Noé",
      "Dez vezes se repete 'e morreu'",
      "Enoque anda com Deus e não morre",
      "Noé nasce no fim da linha",
    ],
    chave: 24,
  },
  6: {
    resumo:
      "A violência toma conta da terra, e Deus reage com uma emoção que surpreende.",
    detalhe:
      "O texto diz que Deus se arrependeu de ter feito o homem, e que isso lhe doeu no coração. Não é uma divindade indiferente que julga de cima. O diagnóstico é preciso e vale reler: não são atos isolados, é que toda a imaginação do coração humano era má continuamente. A palavra que se repete no capítulo é violência. No meio disso, uma frase curta muda o rumo de tudo: Noé achou graça.",
    marcos: [
      "A terra se enche de violência",
      "Deus se entristece por ter feito o homem",
      "Noé acha graça aos olhos do Senhor",
      "As medidas da arca são dadas",
      "Deus anuncia uma aliança antes do dilúvio começar",
    ],
    chave: 8,
  },
  7: {
    resumo: "As águas vêm de cima e de baixo, e a porta é fechada por fora.",
    detalhe:
      "O dilúvio é descrito como a criação andando para trás: no capítulo 1 Deus separou as águas para abrir espaço, aqui as fontes do abismo e as janelas do céu se abrem e o espaço se fecha de novo. O detalhe mais comentado do capítulo é de uma linha só: quem fecha a porta da arca não é Noé, é o Senhor. Tanto a proteção quanto o limite do tempo de entrar vêm de fora.",
    marcos: [
      "Noé entra na arca com a família e os animais",
      "As fontes do abismo e as janelas do céu se abrem",
      "O Senhor fecha a porta",
      "As águas cobrem as montanhas",
      "Tudo o que respirava fora da arca morre",
    ],
    chave: 16,
  },
  8: {
    resumo: "Deus se lembra de Noé, e o mundo volta a aparecer devagar.",
    detalhe:
      "Lembrar, no hebraico, não é o contrário de esquecer, é agir em favor de alguém. E a ação começa com um vento passando sobre as águas, a mesma imagem do segundo versículo da Bíblia. A espera é longa e o texto marca cada etapa com datas. O corvo vai e volta, a pomba volta sem nada, depois com uma folha, e por fim não volta. No fim Noé constrói um altar, e a promessa que Deus faz é sobre a constância das estações.",
    marcos: [
      "Deus se lembra de Noé e faz passar um vento",
      "A arca repousa sobre os montes de Ararate",
      "O corvo e depois a pomba são soltos",
      "A pomba traz uma folha de oliveira",
      "Noé levanta um altar, e Deus promete as estações",
    ],
    chave: 22,
  },
  9: {
    resumo: "Uma aliança com toda a criação, e logo depois a primeira bebedeira.",
    detalhe:
      "A bênção do capítulo 1 é repetida quase palavra por palavra, mas agora com regras sobre sangue e sobre o valor da vida humana, porque o mundo recomeçado já sabe o que é assassinato. O arco no céu é a arma de guerra pendurada, apontada para cima. E aí o texto faz algo que só a Bíblia faz com seus heróis: mostra Noé bêbado e nu na própria tenda, poucos versículos depois de ser o homem justo da sua geração.",
    marcos: [
      "A bênção de frutificar é repetida",
      "A vida humana recebe proteção explícita",
      "O arco no céu é dado como sinal da aliança",
      "Noé planta vinha e se embriaga",
      "Cam vê, os irmãos cobrem, e vem a maldição sobre Canaã",
    ],
    chave: 13,
  },
  10: {
    resumo: "O mapa do mundo conhecido desenhado como uma árvore de família.",
    detalhe:
      "São setenta nomes, e setenta é número de totalidade: o capítulo está dizendo que todos os povos da terra saíram de um tronco só. Para quem lê hoje é uma lista, mas para o leitor antigo era polêmica. Egito, Assíria, Canaã e Babilônia aparecem como primos, não como criaturas de outra origem ou de outro deus. É a base para o que vem depois, porque a promessa feita a um homem em Gênesis 12 é para todas as famílias que estão listadas aqui.",
    marcos: [
      "Os descendentes de Jafé, Cam e Sem",
      "Ninrode e o começo de Babel e Nínive",
      "Os povos são distribuídos por terras e línguas",
      "Setenta nações de um único tronco",
    ],
    chave: 32,
  },
  11: {
    resumo:
      "Uma torre para fazer um nome, e o nome acaba sendo confusão.",
    detalhe:
      "O projeto tem um motivo declarado que vale ler com atenção: façamos um nome para nós, para não sermos espalhados. É exatamente o contrário da ordem de encher a terra. O texto brinca com a escala: eles constroem até o céu, e Deus precisa descer para ver. A dispersão que eles temiam acontece, e o capítulo emenda direto na genealogia que termina em Abrão, o homem a quem Deus vai dizer que fará dele um grande nome.",
    marcos: [
      "Toda a terra tinha uma só língua",
      "Constroem cidade e torre para fazer um nome",
      "O Senhor desce para ver",
      "As línguas são confundidas e o povo é espalhado",
      "A linhagem de Sem chega até Abrão",
    ],
    chave: 4,
  },
  12: {
    resumo: "Uma ordem de sair sem destino informado, e uma promessa grande demais.",
    detalhe:
      "Depois de onze capítulos sobre a humanidade inteira, a Bíblia estreita o foco para um homem de setenta e cinco anos, casado com uma mulher estéril. A promessa tem escala universal: por ele todas as famílias da terra serão abençoadas. E então, na mesma página, Abrão desce ao Egito com medo e mente sobre a esposa, entregando ao Faraó exatamente a mulher de quem depende a promessa. O texto não suaviza.",
    marcos: [
      "Deus manda Abrão sair da sua terra",
      "A promessa de nação, nome e bênção para todas as famílias",
      "Abrão parte sem saber o destino",
      "A fome o leva ao Egito",
      "Ele mente sobre Sarai, e o Faraó é quem o repreende",
    ],
    chave: 2,
  },
  13: {
    resumo: "Terra demais para dois rebanhos, e quem escolhe primeiro escolhe pelos olhos.",
    detalhe:
      "Abrão oferece a Ló a primeira escolha, o que inverte a hierarquia da época, já que o mais velho decidia. Ló olha e escolhe o que parece melhor, e o narrador insere um comentário que só faz sentido depois: aquela planície era como o jardim do Senhor, e os homens de Sodoma eram maus. Quando Ló sai de cena, Deus fala com Abrão de novo e manda que ele também olhe, mas para tudo, e ande pela terra que ainda não é dele.",
    marcos: [
      "Os rebanhos crescem e os pastores brigam",
      "Abrão oferece a Ló a primeira escolha",
      "Ló escolhe a planície do Jordão",
      "O narrador avisa como eram os homens de Sodoma",
      "Deus manda Abrão olhar e percorrer a terra",
    ],
    chave: 15,
  },
  14: {
    resumo:
      "Uma guerra entre reis, um resgate familiar, e um sacerdote que aparece do nada.",
    detalhe:
      "É o capítulo mais parecido com crônica militar do livro, e existe por causa de um detalhe: Ló é levado cativo. Abrão, que até aqui só recebeu promessas, monta uma operação de resgate com trezentos e dezoito homens. Depois da vitória aparece Melquisedeque, rei de Salém e sacerdote, sem genealogia e sem antes nem depois, abençoa Abrão e some. O Salmo 110 e a carta aos Hebreus vão voltar a essa figura séculos depois.",
    marcos: [
      "Quatro reis vencem cinco na guerra do vale",
      "Ló é levado cativo de Sodoma",
      "Abrão resgata o sobrinho com os seus homens",
      "Melquisedeque abençoa Abrão e recebe o dízimo",
      "Abrão recusa ficar com o despojo do rei de Sodoma",
    ],
    chave: 20,
  },
  15: {
    resumo: "Abrão reclama do atraso, e Deus responde com estrelas e com fogo.",
    detalhe:
      "Este é o capítulo em que Abrão questiona Deus de frente: de que adianta a recompensa se continuo sem filho. A resposta é levá-lo para fora e mandar contar estrelas. O versículo 6 é dos mais citados do Antigo Testamento, e Paulo constrói sobre ele boa parte de Romanos e Gálatas. Depois vem um rito antigo de aliança, em que as partes passavam entre animais cortados. Abrão dorme, e quem passa sozinho entre as partes é Deus, assumindo os dois lados do compromisso.",
    marcos: [
      "Abrão reclama de continuar sem herdeiro",
      "Deus o leva para fora e manda contar as estrelas",
      "Abrão crê, e isso lhe é imputado como justiça",
      "Os animais são cortados para o rito da aliança",
      "Só Deus passa entre as partes, em fogo e fumaça",
    ],
    chave: 6,
  },
  16: {
    resumo:
      "Cansados de esperar, resolvem por conta própria, e quem paga o preço é a escrava.",
    detalhe:
      "Sarai propõe, Abrão consente sem dizer nada, e Agar não é consultada em momento algum. A solução funciona e imediatamente azeda. O texto é honesto sobre todos: Agar despreza a senhora, Sarai a maltrata, Abrão lava as mãos. No deserto, o anjo encontra Agar e a chama pelo nome e pela condição, e ela faz algo que ninguém mais faz na Bíblia inteira: dá um nome a Deus. E o nome é sobre ser vista.",
    marcos: [
      "Sarai entrega Agar a Abrão",
      "Agar concebe e o clima entre as duas se rompe",
      "Sarai a maltrata e ela foge para o deserto",
      "O anjo a encontra e a chama pelo nome",
      "Agar chama a Deus de 'o Deus que me vê'",
    ],
    chave: 13,
  },
  17: {
    resumo: "Treze anos de silêncio, e então nomes novos e um sinal na carne.",
    detalhe:
      "Abrão tem noventa e nove anos quando Deus volta a falar. Os nomes mudam, e em hebraico a mudança é pequena no som e enorme no sentido: Abrão, pai exaltado, vira Abraão, pai de multidão, passando a carregar uma promessa que ainda não se cumpriu. O sinal da aliança é permanente e privado, marcado no corpo. A reação de Abraão à notícia de que Sara terá um filho é cair de rosto em terra e rir.",
    marcos: [
      "Deus aparece a Abrão aos noventa e nove anos",
      "Abrão vira Abraão e Sarai vira Sara",
      "A circuncisão é dada como sinal da aliança",
      "Abraão ri diante da notícia",
      "O filho é anunciado, e o nome dele será Riso",
    ],
    chave: 5,
  },
  18: {
    resumo:
      "Três visitantes ao meio-dia, um riso escondido, e uma barganha pelos justos.",
    detalhe:
      "A cena começa doméstica, com Abraão correndo atrás de pão e bezerro no calor do dia. Sara ri atrás da tenda e nega ter rido, e a pergunta que ela recebe é a do versículo 14. Na segunda metade, Abraão faz algo espantoso: discute com Deus sobre justiça, e vai baixando o número de cinquenta a dez. Deus não se irrita com a negociação, responde a cada rodada. O argumento de Abraão é que o Juiz de toda a terra deve fazer justiça.",
    marcos: [
      "Três visitantes chegam no calor do dia",
      "Abraão prepara comida às pressas",
      "Sara ri por trás da tenda e nega",
      "'Acaso, para o Senhor há coisa demasiadamente difícil?'",
      "Abraão intercede por Sodoma, de cinquenta a dez justos",
    ],
    chave: 14,
  },
  19: {
    resumo: "A noite em Sodoma, a fuga ao amanhecer, e uma ordem de não olhar para trás.",
    detalhe:
      "O capítulo é duro e o texto não protege ninguém. A cidade cerca a casa, Ló oferece as próprias filhas, os anjos precisam puxá-lo para dentro. Na saída, os mensageiros têm que pegar a família pela mão porque Ló demora. A mulher olha para trás e vira estátua de sal, e o detalhe importa: olhar para trás ali é não conseguir largar. O fim do capítulo, com as filhas e o pai embriagado, explica de onde vêm Moabe e Amom, povos que voltam depois.",
    marcos: [
      "Os anjos chegam a Sodoma e Ló insiste em hospedá-los",
      "A cidade cerca a casa",
      "Os anjos puxam a família pela mão para fora",
      "A mulher de Ló olha para trás",
      "Nasce, na caverna, a origem de Moabe e Amom",
    ],
    chave: 26,
  },
  20: {
    resumo: "Abraão repete a mesma mentira de vinte e cinco anos antes.",
    detalhe:
      "É desconfortável de propósito: logo depois da aliança e da visita, Abraão diz outra vez que Sara é sua irmã, e de novo entrega a mulher da promessa a um rei estrangeiro. Abimeleque aparece melhor do que ele na história inteira, alegando integridade de coração, e é Deus quem confirma isso. O rei pagão repreende o patriarca. E ainda assim é Abraão quem ora por Abimeleque, o que o texto chama de profeta, sem apagar nada do que ele acabou de fazer.",
    marcos: [
      "Abraão diz de novo que Sara é sua irmã",
      "Abimeleque a toma, sem tocá-la",
      "Deus o avisa em sonho e ele alega inocência",
      "O rei repreende Abraão",
      "Abraão ora por ele, e a casa é curada",
    ],
    chave: 6,
  },
  21: {
    resumo: "O filho prometido nasce, e o outro filho é mandado embora.",
    detalhe:
      "O riso muda de sentido: o que era descrença vira alegria, e Sara diz que todos vão rir com ela. Mas a felicidade de uma casa é a expulsão da outra. Agar e Ismael saem com pão e um odre de água, e o menino quase morre de sede. Sara pede, Abraão sofre, e Deus manda atender, mas então faz questão de dizer que também fará de Ismael uma nação. A criança chora, e o texto diz que Deus ouviu a voz do menino.",
    marcos: [
      "Isaque nasce no tempo anunciado",
      "Sara diz que Deus lhe deu riso",
      "Agar e Ismael são mandados embora",
      "A água acaba no deserto de Berseba",
      "Deus ouve o menino e promete fazer dele uma nação",
    ],
    chave: 6,
  },
  22: {
    resumo:
      "A ordem mais difícil da Bíblia, obedecida em silêncio por três dias de caminhada.",
    detalhe:
      "O texto avisa o leitor logo na primeira linha que é prova, e não avisa Abraão. O que trava a leitura é o silêncio: nenhuma discussão como houve por Sodoma, nenhuma pergunta. A única fala no caminho é a de Isaque perguntando pelo cordeiro, e a resposta do pai é que Deus proverá. No último instante a voz interrompe, e o carneiro está preso pelos chifres. Abraão dá nome ao lugar, e o nome é sobre ver e ser provido.",
    marcos: [
      "Deus manda oferecer Isaque em Moriá",
      "Três dias de caminhada em silêncio",
      "Isaque pergunta onde está o cordeiro",
      "A voz interrompe no último instante",
      "O carneiro preso pelos chifres, e o lugar recebe nome",
    ],
    chave: 8,
  },
  23: {
    resumo:
      "A primeira coisa que Abraão possui na terra prometida é uma sepultura.",
    detalhe:
      "Sara morre, e a negociação pela caverna é narrada com todos os detalhes de uma escritura antiga, com testemunhas e preço dito em voz alta. Abraão recusa receber o terreno de presente e paga quatrocentos siclos de prata, caro, porque terra dada pode ser tomada de volta e terra comprada tem documento. A ironia do capítulo é sóbria: depois de décadas de promessa de um país inteiro, o que ele de fato tem nas mãos é um túmulo.",
    marcos: [
      "Sara morre em Quiriate-Arba",
      "Abraão se declara estrangeiro e peregrino",
      "Efrom oferece o campo de graça",
      "Abraão insiste em pagar o preço cheio",
      "A caverna de Macpela é comprada com testemunhas",
    ],
    chave: 4,
  },
  24: {
    resumo:
      "Um servo sem nome atravessa o deserto e pede a Deus um sinal envolvendo camelos.",
    detalhe:
      "É o capítulo mais longo de Gênesis e o mais cuidadoso, contado quase todo duas vezes, porque o servo repete a história inteira para a família de Rebeca. O sinal que ele pede não é mágico, é um teste de caráter: dar água a dez camelos sedentos é trabalho pesado, e ele quer saber com quem está lidando. Rebeca oferece antes de ser pedida. No fim, a decisão fica com ela, e a resposta é de uma palavra só: irei.",
    marcos: [
      "Abraão faz o servo jurar sobre a escolha da esposa",
      "O servo pede um sinal junto ao poço",
      "Rebeca oferece água para ele e para os camelos",
      "A história é recontada inteira diante da família",
      "Perguntam a Rebeca se ela quer ir, e ela diz que sim",
    ],
    chave: 27,
  },
  25: {
    resumo:
      "Abraão morre, e dois irmãos já brigam antes de nascer, por um prato de comida.",
    detalhe:
      "O capítulo fecha uma geração e abre outra com uma oração de Isaque por Rebeca, que também era estéril, repetindo o padrão da família. Os gêmeos se empurram ainda no ventre, e o oráculo inverte a ordem esperada: o mais velho servirá ao mais novo. A cena do guisado é contada com pressa proposital, e o narrador dá o veredito na última linha, sem rodeio: Esaú desprezou o direito de primogenitura. Jacó é aproveitador, e o texto também não esconde isso.",
    marcos: [
      "Abraão morre, e Isaque e Ismael o sepultam juntos",
      "Isaque ora por Rebeca, que era estéril",
      "Os gêmeos lutam no ventre",
      "O oráculo diz que o mais velho servirá ao mais novo",
      "Esaú vende a primogenitura por um guisado",
    ],
    chave: 34,
  },
  26: {
    resumo:
      "Isaque repete os passos do pai, inclusive a mentira, e passa a vida cavando poços.",
    detalhe:
      "É o único capítulo em que Isaque é protagonista, e o que ele faz é repetir: mesma fome, mesma ida a um rei filisteu, mesma frase de que a esposa é sua irmã. A promessa também é repetida a ele, palavra por palavra. A parte mais dele é a dos poços: cava, tomam, cava de novo, tomam de novo, e ele muda de lugar em vez de brigar. Quando finalmente cava um que ninguém disputa, dá a ele o nome de Lugar Largo.",
    marcos: [
      "A fome vem, e Deus proíbe Isaque de descer ao Egito",
      "A promessa feita a Abraão é repetida a ele",
      "Ele diz que Rebeca é sua irmã",
      "Os poços do pai são cavados de novo e disputados",
      "Em Reobote há espaço, e Abimeleque vem fazer acordo",
    ],
    chave: 4,
  },
  27: {
    resumo:
      "Um pai cego, um prato de caça, pele de cabrito nos braços, e uma bênção roubada.",
    detalhe:
      "Todos os quatro personagens agem mal, e o texto distribui a culpa sem poupar ninguém: Isaque quer abençoar Esaú escondido, Rebeca arma o golpe, Jacó mente na cara do pai usando o nome de Deus, Esaú já tinha vendido o que agora chora. A frase que resume a cena é a do velho desconfiado: a voz é de Jacó, mas as mãos são de Esaú. O grito de Esaú pedindo uma bênção qualquer é das cenas mais amargas do livro.",
    marcos: [
      "Isaque, cego, pede a Esaú um prato de caça",
      "Rebeca arma a troca e cobre Jacó com peles",
      "'A voz é a voz de Jacó, mas as mãos são as de Esaú'",
      "Esaú volta e grita pedindo uma bênção",
      "Jacó foge para a casa de Labão",
    ],
    chave: 22,
  },
  28: {
    resumo:
      "Fugindo com uma pedra por travesseiro, ele sonha com uma escada e acorda com medo.",
    detalhe:
      "Jacó sai de casa sozinho, sem nada, correndo do irmão que quer matá-lo. No meio do nada ele dorme e vê uma escada com anjos subindo e descendo, e Deus em pé no alto repetindo a promessa feita ao avô, agora para ele. A reação ao acordar é a frase do capítulo: o Senhor está neste lugar e eu não sabia. O voto que ele faz em seguida ainda é negociado, com condições, o que mostra onde ele está nessa altura.",
    marcos: [
      "Jacó parte sozinho para Harã",
      "Dorme com uma pedra por travesseiro",
      "Sonha com a escada e os anjos",
      "Deus repete a promessa e garante estar com ele",
      "'Na verdade, o Senhor está neste lugar, e eu não sabia'",
    ],
    chave: 15,
  },
  29: {
    resumo: "O enganador é enganado, e descobre de manhã que casou com a irmã errada.",
    detalhe:
      "Jacó trabalha sete anos por Raquel, e o texto diz que pareceram poucos dias pelo muito que a amava. Na manhã seguinte à festa, a frase é curta e devastadora: era Lia. Quem escondeu o rosto sob um véu para se passar por outro agora sofre exatamente isso. Labão justifica com um costume sobre o mais velho vir primeiro, que é justamente a regra que Jacó violou com Esaú. E começa a tragédia de Lia, amando um homem que não a escolheu.",
    marcos: [
      "Jacó encontra Raquel no poço",
      "Sete anos de trabalho que pareceram poucos dias",
      "Pela manhã, era Lia",
      "Labão fala do costume do mais velho vir primeiro",
      "Lia dá à luz, buscando o amor do marido em cada nome",
    ],
    chave: 20,
  },
  30: {
    resumo:
      "Uma disputa de ventres entre duas irmãs, com escravas, mandrágoras e barganhas.",
    detalhe:
      "É um capítulo difícil de ler sem incômodo, e essa é a intenção. Duas irmãs brigam por filhos e por um marido, usando as escravas como instrumento, e os nomes das crianças são dardos trocados entre elas. No meio disso nascem onze das doze tribos de Israel, o que diz muito sobre de que material Deus constrói. A segunda metade é a briga por rebanhos, com Jacó aplicando em Labão o mesmo tipo de esperteza que sofreu.",
    marcos: [
      "Raquel exige filhos e Jacó se irrita",
      "Bila e Zilpa entram na disputa",
      "As mandrágoras são trocadas por uma noite",
      "Deus se lembra de Raquel, e José nasce",
      "Jacó combina o salário e prospera às custas de Labão",
    ],
    chave: 22,
  },
  31: {
    resumo: "Fuga de madrugada com rebanhos, esposas, e ídolos escondidos na sela.",
    detalhe:
      "Vinte anos de trabalho terminam com Jacó saindo escondido, e o capítulo é basicamente um acerto de contas em voz alta. Raquel rouba os ídolos do pai e os esconde sob a sela, sentando em cima e alegando estar indisposta. Labão revista tudo e não acha. A discussão final é acalorada dos dois lados, e termina num monte de pedras e numa frase que virou bênção de despedida, apesar de ter nascido como desconfiança mútua.",
    marcos: [
      "Jacó parte sem avisar, com tudo o que tem",
      "Raquel rouba os ídolos do pai",
      "Labão persegue e é avisado em sonho",
      "A revista não encontra nada",
      "Levantam um monte de pedras em Mispá como testemunha",
    ],
    chave: 49,
  },
  32: {
    resumo: "Na véspera de reencontrar o irmão, ele luta a noite inteira e sai mancando.",
    detalhe:
      "Jacó prepara tudo o que sabe fazer: divide o acampamento, manda presentes na frente, reza. E então fica sozinho, e alguém luta com ele até o amanhecer. A luta não é vencida por nenhum dos dois até o toque na coxa. Quando pedem que o solte, ele exige a bênção, e a pergunta que recebe é o nome dele, o mesmo que ele mentiu ao pai cego no capítulo 27. Desta vez ele diz a verdade, e o nome muda. Ele sai abençoado e coxo, as duas coisas juntas.",
    marcos: [
      "Jacó soube que Esaú vem com quatrocentos homens",
      "Divide o acampamento e manda presentes adiante",
      "Ora lembrando a Deus a própria promessa",
      "Luta a noite toda e tem a coxa deslocada",
      "Diz o próprio nome, e recebe o nome Israel",
    ],
    chave: 28,
  },
  33: {
    resumo:
      "O irmão que ele temia vem correndo, e o abraço desarma tudo o que estava preparado.",
    detalhe:
      "Depois de toda a estratégia, Esaú corre, abraça, chora, e nem quer os presentes. É o oposto de tudo o que Jacó calculou. Ele diz que ver o rosto do irmão foi como ver o rosto de Deus, ligando a cena diretamente ao Peniel da noite anterior. Mas o capítulo termina com uma sombra: Jacó promete seguir o irmão e toma outro caminho, e em vez de ir a Seir compra terra perto de Siquém, o que prepara o desastre do capítulo seguinte.",
    marcos: [
      "Jacó organiza a família por ordem de afeto",
      "Esaú corre, abraça e chora",
      "Recusa os presentes e depois cede",
      "'Vi o teu rosto como se tivesse visto o rosto de Deus'",
      "Jacó desvia o caminho e se instala perto de Siquém",
    ],
    chave: 4,
  },
  34: {
    resumo:
      "A violência contra uma filha, um acordo feito de má-fé, e uma cidade inteira morta.",
    detalhe:
      "Diná sai para ver as filhas da terra e é violentada. A partir daí ninguém no capítulo pergunta nada a ela, e ela não fala uma palavra. Jacó fica calado ao saber, os irmãos negociam um acordo religioso que nunca pretenderam cumprir, e Simeão e Levi matam os homens ao terceiro dia, quando estavam doloridos. A repreensão de Jacó no fim é só sobre reputação e segurança, e a resposta dos irmãos é a única frase que lembra o motivo de tudo.",
    marcos: [
      "Diná é violentada por Siquém",
      "Jacó se cala ao saber",
      "Os irmãos propõem a circuncisão como condição",
      "Simeão e Levi atacam ao terceiro dia",
      "Jacó reclama do risco, e eles respondem falando da irmã",
    ],
    chave: 31,
  },
  35: {
    resumo:
      "Ordem de voltar a Betel, enterrar os ídolos, e um caminho marcado por mortes.",
    detalhe:
      "Deus manda subir de volta ao lugar do sonho, e antes de subir Jacó manda a casa entregar os deuses estrangeiros, que ele enterra debaixo de um carvalho. Em Betel o nome Israel é confirmado. Daí em diante o capítulo é perda atrás de perda: morre a ama de Rebeca, morre Raquel dando à luz Benjamim, Rúben se deita com a concubina do pai, e morre Isaque. O livro fecha a geração limpando a casa e contando os túmulos.",
    marcos: [
      "Deus manda voltar a Betel",
      "Os deuses estrangeiros são enterrados",
      "O nome Israel é confirmado",
      "Raquel morre ao dar à luz Benjamim",
      "Rúben peca com Bila, e Isaque morre",
    ],
    chave: 10,
  },
  36: {
    resumo: "A descendência de Esaú, com uma observação incômoda no meio da lista.",
    detalhe:
      "É genealogia de Edom, e parece deslocada num livro sobre a linhagem da promessa. Tem uma razão: o texto está encerrando a conta do irmão antes de se dedicar só a José. Vale reparar numa linha que os leitores antigos notavam: houve reis em Edom antes de haver rei sobre os filhos de Israel. O irmão que perdeu a bênção prosperou primeiro, e o livro registra isso sem comentar, deixando a tensão de pé.",
    marcos: [
      "As mulheres e os filhos de Esaú",
      "Esaú se estabelece em Seir",
      "Os chefes de Edom são listados",
      "Houve reis em Edom antes de haver rei em Israel",
    ],
    chave: 31,
  },
  37: {
    resumo:
      "Um filho preferido, uma túnica, dois sonhos contados na hora errada, e um poço seco.",
    detalhe:
      "Jacó erra igual ao pai e à mãe, preferindo um filho na cara dos outros, e a túnica é a prova pública disso. José também não ajuda: leva más notícias dos irmãos e conta os sonhos que o colocam acima de todos, inclusive dos pais. O ódio cresce em etapas que o texto marca uma a uma. No poço, o detalhe cruel é que os irmãos sentam para comer enquanto ele está lá dentro. A túnica volta para o pai molhada de sangue de bode, o mesmo animal do engano do capítulo 27.",
    marcos: [
      "Jacó dá a José uma túnica distinta",
      "José conta os dois sonhos",
      "Os irmãos o lançam num poço seco e sentam para comer",
      "É vendido a mercadores por vinte moedas",
      "A túnica ensanguentada é levada ao pai",
    ],
    chave: 20,
  },
  38: {
    resumo:
      "A história de José para, e entra a de Judá, com uma nora que o vence no próprio jogo.",
    detalhe:
      "A interrupção é de propósito: enquanto José é vendido, o narrador mostra o irmão que sugeriu a venda afundando sozinho. Judá nega a Tamar o que a lei lhe devia, e ela arma um plano que depende de ele fazer exatamente o que fez. O momento de virada é ela mandar as garantias em vez de acusá-lo em público, dando a ele a chance de reconhecer. E ele reconhece, com a frase que muda o personagem: ela é mais justa do que eu.",
    marcos: [
      "Judá se afasta dos irmãos e casa em Canaã",
      "Er e Onã morrem, e Tamar fica sem o terceiro filho",
      "Ela se disfarça e cobra a promessa",
      "Judá deixa o selo, o cordão e o cajado",
      "'Ela é mais justa do que eu'",
    ],
    chave: 26,
  },
  39: {
    resumo:
      "Escravo numa casa estrangeira, ele prospera, é assediado, e a integridade o leva à prisão.",
    detalhe:
      "Quatro vezes o capítulo repete que o Senhor estava com José, e duas delas são dentro da cadeia, o que impede a leitura fácil de que estar com Deus significa dar tudo certo. A recusa dele tem um argumento que vale notar: ele fala do mal contra Potifar e depois do pecado contra Deus, nessa ordem. O manto aparece de novo como prova falsa, igual à túnica, e de novo alguém usa uma peça de roupa para contar uma mentira sobre ele.",
    marcos: [
      "José é comprado por Potifar e prospera",
      "A mulher de Potifar o assedia dia após dia",
      "'Como farei tamanha maldade e pecarei contra Deus?'",
      "Ela segura o manto e o usa como prova",
      "Na prisão, o Senhor continua com ele",
    ],
    chave: 9,
  },
  40: {
    resumo:
      "Dois sonhos na cadeia, duas leituras certas, e dois anos de esquecimento.",
    detalhe:
      "José repara que os dois estão abatidos, o que já diz alguma coisa de quem está preso e ainda olha para o rosto dos outros. Antes de interpretar, ele devolve o crédito: as interpretações pertencem a Deus. Uma leitura é boa, a outra é sentença de morte, e ele diz as duas. O único pedido que faz em troca é que se lembrem dele. O capítulo fecha com a frase mais seca do bloco: o copeiro não se lembrou, esqueceu-se dele.",
    marcos: [
      "O copeiro e o padeiro são presos",
      "José percebe que estão abatidos e pergunta",
      "'Porventura, não pertencem a Deus as interpretações?'",
      "Uma leitura é restauração, a outra é morte",
      "O copeiro esquece de José",
    ],
    chave: 8,
  },
  41: {
    resumo:
      "Dois anos depois, um sonho de faraó tira José da masmorra e o põe sobre o Egito.",
    detalhe:
      "A virada demora dois anos e acontece em uma manhã. Tiram José do calabouço às pressas, ele se barbeia e troca de roupa, e diante do homem mais poderoso do mundo a primeira coisa que diz é que não está nele responder. O plano que ele oferece não é só interpretação, é política pública: guardar um quinto durante a fartura. Aos trinta anos, o escravo estrangeiro vira o segundo do Egito, e dá aos filhos nomes que falam de esquecer a dor e frutificar na aflição.",
    marcos: [
      "Faraó sonha com vacas e espigas",
      "O copeiro finalmente se lembra",
      "'Não está em mim; Deus dará resposta'",
      "José propõe guardar um quinto durante os sete anos",
      "É posto sobre toda a terra do Egito",
    ],
    chave: 16,
  },
  42: {
    resumo:
      "Os irmãos se curvam diante de um egípcio sem saber quem ele é.",
    detalhe:
      "Os sonhos do capítulo 37 se cumprem na primeira cena, e o texto faz questão de dizer que José se lembrou deles. A dureza dele é estranha e o capítulo não explica de imediato: acusa de espionagem, prende todos, exige Benjamim. No meio do aperto, os irmãos começam a falar entre si em hebraico, achando que ele não entende, e dizem em voz alta o que carregam há vinte anos. É aí que José se afasta para chorar, e volta.",
    marcos: [
      "A fome leva dez irmãos ao Egito",
      "Eles se curvam sem reconhecê-lo",
      "São acusados de espionagem",
      "'Na verdade, somos culpados no tocante a nosso irmão'",
      "Simeão fica retido, e o dinheiro reaparece nos sacos",
    ],
    chave: 21,
  },
  43: {
    resumo:
      "A fome obriga a segunda viagem, e Judá se oferece como fiador do caçula.",
    detalhe:
      "Jacó resiste até não haver mais pão, e a discussão familiar é bem humana, com reclamação e cobrança. A diferença desta vez é Judá, o mesmo do capítulo 38, que se põe como fiador pessoal de Benjamim. Chegando lá, o medo deles é do dinheiro devolvido, e o mordomo responde com uma frase inesperada sobre o Deus do pai deles. O banquete tem um detalhe que os deixa perplexos: estão sentados na ordem exata de nascimento.",
    marcos: [
      "A fome aperta e o pão acaba",
      "Judá se oferece como fiador de Benjamim",
      "Jacó cede e manda presentes e dinheiro em dobro",
      "São sentados na ordem exata de nascimento",
      "José vê Benjamim e sai para chorar",
    ],
    chave: 14,
  },
  44: {
    resumo:
      "Um cálice escondido na bagagem do caçula, e o discurso mais longo do livro.",
    detalhe:
      "A última prova é montada para reproduzir a situação do capítulo 37: o filho preferido do pai está em risco, e os irmãos podem ir embora sem ele. Desta vez ninguém vai embora. Judá fala, e o discurso é o mais longo de Gênesis, todo construído sobre o pai e sobre o que a perda faria com ele. No fim, oferece a si mesmo como escravo no lugar do irmão. O homem que vendeu José agora se vende para não repetir o que fez.",
    marcos: [
      "O cálice de prata é posto no saco de Benjamim",
      "A caravana é alcançada e revistada",
      "Todos voltam, em vez de seguirem viagem",
      "Judá faz o discurso mais longo do livro",
      "Oferece-se como escravo no lugar do irmão",
    ],
    chave: 33,
  },
  45: {
    resumo: "Ele manda todos saírem, e então diz em voz alta quem é.",
    detalhe:
      "José não aguenta mais e esvazia a sala, o que é um cuidado com os irmãos e não com ele. O choro é tão alto que os egípcios ouvem de fora. A primeira pergunta dele é sobre o pai, e os irmãos ficam mudos de terror. A leitura que ele faz da própria história aparece três vezes em poucos versículos e não apaga o crime, mas o coloca dentro de um propósito maior. Ele mesmo diz para não se entristecerem nem se irarem consigo mesmos.",
    marcos: [
      "José manda todos saírem e se dá a conhecer",
      "Chora tão alto que os egípcios ouvem",
      "'Eu sou José; vive ainda meu pai?'",
      "'Deus me enviou adiante de vós para conservar a vida'",
      "Faraó manda buscar toda a família",
    ],
    chave: 5,
  },
  46: {
    resumo:
      "Antes de descer ao Egito, o velho para em Berseba e recebe permissão para ir.",
    detalhe:
      "A parada é significativa: Berseba é onde Abraão e Isaque adoraram, e descer ao Egito é exatamente o que Deus proibiu a Isaque. Jacó oferece sacrifícios e espera, e a resposta vem à noite com uma promessa em duas partes: eu descerei contigo, e eu certamente te farei tornar a subir. A segunda parte só se cumpre no Êxodo, quatro séculos depois. A lista de setenta pessoas que desce é o embrião do povo que vai sair de lá.",
    marcos: [
      "Jacó para em Berseba e oferece sacrifícios",
      "Deus o chama pelo nome de noite",
      "'Eu descerei contigo e certamente te farei tornar a subir'",
      "Setenta pessoas descem ao Egito",
      "José vai ao encontro do pai em Gósen",
    ],
    chave: 4,
  },
  47: {
    resumo:
      "O pastor idoso abençoa o homem mais poderoso da terra, e a fome muda o Egito para sempre.",
    detalhe:
      "A cena diante do trono tem uma inversão que o texto registra sem alarde: Jacó abençoa Faraó, duas vezes. Perguntado sobre a idade, ele responde com uma frase de um homem cansado, chamando os próprios dias de poucos e maus. A segunda metade do capítulo é econômica e desconfortável: para sobreviver, o povo vende dinheiro, gado, terra e por fim a si mesmo, e o Egito inteiro passa a pertencer ao Faraó. É a política de José, contada sem elogio e sem condenação.",
    marcos: [
      "Os irmãos são apresentados a Faraó",
      "Jacó abençoa Faraó",
      "'Poucos e maus foram os dias da minha vida'",
      "A fome leva o povo a vender terra e liberdade",
      "Jacó faz José jurar que não o sepultará no Egito",
    ],
    chave: 9,
  },
  48: {
    resumo: "O velho cruza os braços de propósito, e o mais novo fica na frente outra vez.",
    detalhe:
      "Jacó adota os dois netos como filhos, o que dá a José porção dobrada. Na hora de abençoar, ele cruza as mãos e põe a direita sobre Efraim, o caçula. José tenta corrigir, achando que o pai cego se enganou, e ouve que não foi engano. É o mesmo padrão de Isaque e Ismael, de Jacó e Esaú, de Perez e Zerá, e desta vez feito de olhos abertos. A bênção que ele pronuncia chama Deus de pastor e de anjo que o livrou de todo mal.",
    marcos: [
      "Jacó adota Efraim e Manassés como filhos",
      "Cruza as mãos ao abençoar",
      "José tenta corrigir e é impedido",
      "O mais novo recebe a bênção maior",
      "'O Anjo que me tem livrado de todo mal abençoe estes rapazes'",
    ],
    chave: 14,
  },
  49: {
    resumo:
      "No leito de morte, ele diz a verdade sobre cada um dos doze filhos.",
    detalhe:
      "Não são elogios de despedida, são veredictos em poesia. Rúben perde a primazia pelo que fez no capítulo 35, Simeão e Levi são amaldiçoados pela violência em Siquém, e o texto diz isso em cima da cama. Judá, que não era o mais velho nem o preferido, recebe o cetro e a imagem do leão, e o versículo 10 vira um dos textos mais discutidos do Antigo Testamento. José recebe a bênção mais longa. Depois de falar, Jacó recolhe os pés na cama e morre.",
    marcos: [
      "Jacó reúne os doze filhos",
      "Rúben perde a primazia; Simeão e Levi são repreendidos",
      "Judá recebe o cetro e a figura do leão",
      "José é chamado de ramo frutífero",
      "Jacó ordena o sepultamento em Macpela e morre",
    ],
    chave: 10,
  },
  50: {
    resumo:
      "Depois do enterro do pai, os irmãos têm medo, e a resposta fecha o livro inteiro.",
    detalhe:
      "O Egito chora Jacó setenta dias, e a caravana que sobe a Canaã é tão grande que os cananeus comentam. De volta, os irmãos inventam um recado do pai pedindo perdão, porque continuam sem acreditar. José chora com isso, e então diz a frase que resume Gênesis: vocês pensaram o mal contra mim, mas Deus o tornou em bem. O livro termina com um caixão no Egito e uma ordem sobre ossos, que é uma forma de dizer que a história não acabou ali.",
    marcos: [
      "Jacó é embalsamado e sepultado em Macpela",
      "Os irmãos temem vingança e inventam um recado",
      "'Vós, na verdade, intentastes o mal contra mim'",
      "'Porém Deus o tornou em bem'",
      "José morre, e manda levar seus ossos dali",
    ],
    chave: 20,
  },
};

CAPITULOS.ex = {
  1: {
    resumo:
      "Uma família vira povo, um rei novo tem medo disso, e a escravidão começa por decreto.",
    detalhe:
      "O livro abre repetindo os nomes de Gênesis 46, costurando as duas histórias, e então salta séculos numa frase: levantou-se um novo rei que não conhecera José. A lógica do opressor é declarada em voz alta e é sempre a mesma, medo de que o outro cresça demais. O trabalho pesado não funciona, o povo cresce mais ainda. E aí aparecem as duas primeiras pessoas a desobedecer um império na Bíblia, as parteiras, que mentem para o Faraó e são recompensadas por isso.",
    marcos: [
      "Os filhos de Israel se multiplicam no Egito",
      "Um rei que não conheceu José assume",
      "O trabalho forçado começa e o povo cresce mais",
      "As parteiras desobedecem à ordem de matar",
      "Faraó manda lançar os meninos no Nilo",
    ],
    chave: 12,
  },
  2: {
    resumo:
      "Um bebê no rio, uma princesa que o adota, e um homem que foge depois de matar.",
    detalhe:
      "A mãe cumpre a ordem do Faraó ao pé da letra e de forma subversiva: lança mesmo o menino no rio, dentro de uma cesta. A palavra hebraica para a cesta é a mesma usada para a arca de Noé, e só aparece nesses dois lugares. Moisés é criado na casa do inimigo, com o próprio nome egípcio. Adulto, tenta resolver a injustiça sozinho, mata, esconde o corpo e descobre no dia seguinte que ninguém o reconhece como líder. O capítulo fecha com Deus ouvindo.",
    marcos: [
      "O menino é escondido e posto numa cesta no rio",
      "A filha do Faraó o adota e a mãe o amamenta",
      "Moisés mata um egípcio e esconde o corpo",
      "Foge para Midiã e se casa com Zípora",
      "Deus ouve o gemido do povo e se lembra da aliança",
    ],
    chave: 24,
  },
  3: {
    resumo: "Uma sarça que queima sem se consumir, e um nome que é quase uma recusa.",
    detalhe:
      "Moisés está cuidando de ovelhas que nem são dele quando vira o rosto para ver por que o fogo não consome o arbusto. Deus fala a partir da curiosidade dele. O que Deus diz sobre si mesmo antes de tudo é que viu, ouviu e desceu. Quando Moisés pergunta pelo nome, a resposta é a frase mais discutida do Antigo Testamento, que tanto revela quanto recusa: Eu sou o que sou. É um nome que não cabe em fórmula mágica.",
    marcos: [
      "A sarça arde sem se consumir",
      "Moisés vira o rosto para ver, e Deus o chama",
      "'Tenho visto a aflição do meu povo'",
      "Moisés pergunta quem é ele para ir",
      "'EU SOU O QUE SOU'",
    ],
    chave: 14,
  },
  4: {
    resumo: "Ele inventa quatro desculpas, recebe quatro respostas, e ainda assim vai.",
    detalhe:
      "É uma negociação longa em que Moisés resiste com argumentos cada vez piores, até a última fala, que não é mais argumento: envia quem quiseres enviar. É aí que Deus se ira. A resposta às desculpas é sempre a mesma, desviando de Moisés para Deus: quem fez a boca do homem. No caminho de volta acontece a cena mais obscura do livro, com o Senhor procurando matá-lo e Zípora resolvendo com uma pedra afiada e uma frase enigmática.",
    marcos: [
      "O cajado vira serpente e a mão fica leprosa",
      "Moisés alega não saber falar",
      "'Quem fez a boca do homem?'",
      "Deus se ira e dá Arão como porta-voz",
      "Zípora circuncida o filho na estalagem",
    ],
    chave: 11,
  },
  5: {
    resumo:
      "Depois do primeiro pedido, a situação do povo piora, e culpam Moisés por isso.",
    detalhe:
      "A resposta do Faraó é a definição do problema do livro inteiro: quem é o Senhor para que eu ouça a sua voz, não conheço o Senhor. A partir daí o Êxodo vira uma demonstração de quem é esse Senhor. A retaliação é sofisticada e conhecida: aumenta a meta e tira o material, e ainda chama o povo de preguiçoso. Os capatazes israelitas então se voltam contra Moisés, e ele leva a reclamação a Deus quase como acusação.",
    marcos: [
      "Moisés e Arão pedem três dias no deserto",
      "'Quem é o Senhor para que eu ouça a sua voz?'",
      "Tiram a palha e mantêm a cota de tijolos",
      "Os capatazes israelitas culpam Moisés",
      "Moisés pergunta a Deus por que ele fez mal a este povo",
    ],
    chave: 2,
  },
  6: {
    resumo:
      "Deus responde à reclamação com sete promessas em primeira pessoa, e o povo não escuta.",
    detalhe:
      "A resposta é um bloco de verbos que começam todos com eu: eu vos tirarei, eu vos livrarei, eu vos resgatarei, eu vos tomarei por povo, eu serei vosso Deus. É a definição da aliança, e esse conjunto de frases volta na liturgia judaica até hoje. O detalhe mais triste do capítulo é a razão da recusa do povo: não por teimosia, mas por angústia de espírito e dura servidão. Quem está exausto não consegue ouvir promessa.",
    marcos: [
      "Deus se identifica pelo nome ao renovar a promessa",
      "Sete afirmações começando com 'eu'",
      "O povo não ouve, por angústia e servidão",
      "Moisés alega de novo ser incircunciso de lábios",
      "A genealogia situa Moisés e Arão na tribo de Levi",
    ],
    chave: 7,
  },
  7: {
    resumo: "O cajado vira serpente diante do trono, e o Nilo vira sangue.",
    detalhe:
      "Os magos do Egito reproduzem o sinal, e o texto não esconde isso. O que os distingue é o que acontece depois: a serpente de Arão engole as deles. As pragas não são desastres aleatórios, são ataques dirigidos aos deuses egípcios um a um, e a primeira acerta o Nilo, que era a vida e a divindade do país. Os magos conseguem repetir a praga, o que é uma ironia amarga: a habilidade deles só piora a situação de todos.",
    marcos: [
      "Moisés tem oitenta anos ao falar com o Faraó",
      "O cajado de Arão vira serpente e engole as outras",
      "O coração do Faraó se endurece",
      "O Nilo se transforma em sangue",
      "Os magos repetem o sinal e agravam a praga",
    ],
    chave: 5,
  },
  8: {
    resumo: "Rãs, piolhos e moscas, e a primeira vez que os magos desistem.",
    detalhe:
      "A cena das rãs tem um detalhe humano: Moisés deixa o Faraó escolher a hora de acabarem, e o Faraó responde amanhã, preferindo mais uma noite com elas a ceder naquele instante. Na terceira praga os magos não conseguem imitar e dizem que aquilo é dedo de Deus. Na quarta, o texto passa a distinguir Gósen do resto do Egito, e começam as propostas de acordo parcial do Faraó, sempre tentando manter algo como garantia.",
    marcos: [
      "As rãs cobrem o Egito e o Faraó pede que saiam amanhã",
      "Os piolhos vêm do pó e os magos falham",
      "'Isto é o dedo de Deus'",
      "As moscas não atingem a terra de Gósen",
      "O Faraó propõe acordos parciais e volta atrás",
    ],
    chave: 19,
  },
  9: {
    resumo: "Peste no gado, feridas na pele, e uma chuva de pedras com fogo dentro.",
    detalhe:
      "A sexta praga atinge os próprios magos, que não conseguem mais nem se apresentar diante de Moisés. Na sétima aparece algo novo: Deus avisa com antecedência e manda recolher o gado, e alguns oficiais do Faraó obedecem. É a primeira vez que egípcios comuns escolhem um lado. O Faraó chega a dizer que pecou e que o Senhor é justo, mas o arrependimento dura o tempo exato da chuva parar.",
    marcos: [
      "A peste mata o gado do Egito e poupa o de Israel",
      "As úlceras atingem também os magos",
      "Deus avisa antes da saraiva e manda recolher o gado",
      "Alguns oficiais do Faraó atendem ao aviso",
      "O Faraó confessa pecado e volta atrás quando para",
    ],
    chave: 27,
  },
  10: {
    resumo:
      "Gafanhotos comem o que a saraiva deixou, e vem uma escuridão que se podia apalpar.",
    detalhe:
      "Os próprios servos do Faraó perguntam quanto tempo mais ele vai levar o Egito à ruína, o que mostra que ele já perdeu a corte. Ele oferece deixar ir só os homens, depois todos menos os rebanhos, sempre tentando manter um refém. A nona praga é a mais simbólica de todas, porque atinge o sol, a maior divindade egípcia, e dura três dias em que ninguém se levanta do lugar. O capítulo termina com ameaça de morte.",
    marcos: [
      "Os servos do Faraó pedem que ele ceda",
      "Ele oferece deixar ir apenas os homens",
      "Os gafanhotos cobrem a terra",
      "Trevas que se podiam apalpar por três dias",
      "O Faraó ameaça matar Moisés se ele voltar",
    ],
    chave: 21,
  },
  11: {
    resumo: "O aviso final, dito na cara do rei, sobre a noite em que haverá grande clamor.",
    detalhe:
      "É um capítulo curto, quase todo anúncio. A décima praga é diferente das outras porque não distingue por mérito, e sim por sangue na porta, o que o capítulo seguinte vai explicar. O texto faz questão de dizer que Moisés era muito estimado no Egito, tanto pelos servos do Faraó quanto pelo povo, o que torna a cena mais complexa do que uma disputa entre nações. Moisés sai da presença do rei ardendo em ira.",
    marcos: [
      "Deus anuncia a última praga",
      "O povo pede objetos de prata e ouro aos vizinhos",
      "Moisés era estimado no Egito",
      "O anúncio da morte dos primogênitos",
      "Moisés se retira ardendo em ira",
    ],
    chave: 7,
  },
  12: {
    resumo:
      "Uma refeição comida de pé, sangue nas portas, e a saída no meio da noite.",
    detalhe:
      "O capítulo interrompe a narrativa para dar instruções litúrgicas, e isso é proposital: a festa é instituída antes do livramento acontecer, o que faz dela memória e antecipação ao mesmo tempo. Comem com os pés calçados e o cajado na mão, prontos para andar. A Páscoa vira o marco zero do calendário. E quando saem, não saem sozinhos: o texto diz que subiu com eles uma mistura de gente, o que já complica qualquer leitura puramente étnica do povo.",
    marcos: [
      "Este mês passa a ser o primeiro do ano",
      "O cordeiro e o sangue nos umbrais",
      "A refeição é comida às pressas, prontos para partir",
      "Há grande clamor no Egito à meia-noite",
      "Saem depois de 430 anos, com muita gente misturada",
    ],
    chave: 13,
  },
  13: {
    resumo:
      "Duas ordens para não esquecer, e uma coluna que vai na frente dia e noite.",
    detalhe:
      "O capítulo é sobre memória, e repete três vezes a cena do filho perguntando por que se faz aquilo. A resposta é sempre contar a história. Consagrar o primogênito e comer pão sem fermento são jeitos de manter o relato vivo no corpo e no calendário. Repare no desvio de rota: Deus não os leva pelo caminho curto, dos filisteus, por saber que a guerra os faria querer voltar. O caminho mais longo é escolhido por cuidado.",
    marcos: [
      "Todo primogênito é consagrado",
      "A festa dos pães asmos como memória",
      "'Quando teu filho te perguntar, responderás'",
      "Deus evita o caminho curto por causa da guerra",
      "A coluna de nuvem e de fogo não se afasta",
    ],
    chave: 21,
  },
  14: {
    resumo: "Encurralados entre o mar e o exército, e o mar se abre.",
    detalhe:
      "O povo reclama com uma ironia amarga sobre falta de sepulcros no Egito, e é a primeira de muitas reclamações. A resposta de Moisés é para ficarem quietos e verem, mas a resposta de Deus a Moisés é o oposto: por que clamas a mim, dize que marchem. Os dois lados da fé aparecem em dois versículos seguidos. O detalhe técnico que o texto dá é que um vento oriental forte soprou a noite toda, e que as rodas dos carros travaram.",
    marcos: [
      "O exército do Faraó alcança o povo junto ao mar",
      "O povo reclama que faltavam sepulcros no Egito",
      "'O Senhor pelejará por vós; e vós vos calareis'",
      "Um vento oriental abre o mar durante a noite",
      "As águas voltam sobre os carros egípcios",
    ],
    chave: 14,
  },
  15: {
    resumo: "O primeiro cântico da Bíblia, e três dias depois já não há água.",
    detalhe:
      "O poema é um dos textos mais antigos do Antigo Testamento e celebra Deus como guerreiro. Miriã é chamada de profetisa e conduz as mulheres com tambores, o que é raro e significativo no texto bíblico. E então o capítulo faz um corte brutal: três dias sem água, e quando acham, é amarga. A distância entre cantar a vitória e reclamar é de poucos versículos, e o livro vai insistir nisso o tempo todo.",
    marcos: [
      "O cântico de Moisés celebra a vitória",
      "Miriã, a profetisa, conduz as mulheres com tambores",
      "Três dias de deserto sem água",
      "As águas de Mara são amargas e se tornam doces",
      "Em Elim há doze fontes e setenta palmeiras",
    ],
    chave: 2,
  },
  16: {
    resumo:
      "Com fome, o povo lembra do Egito com saudade, e do céu cai comida todo dia.",
    detalhe:
      "A memória da escravidão vira nostalgia de panelas de carne, o que é psicologicamente exato: a fome reescreve o passado. O maná vem com uma regra que é um treino diário de confiança, porque guardar para o dia seguinte apodrece, exceto na véspera do sábado. O nome maná vem da pergunta deles mesmos, que significa mais ou menos o que é isso. O sábado aparece aqui, antes do Sinai, ligado a comida e a descanso.",
    marcos: [
      "O povo murmura lembrando as panelas de carne",
      "As codornizes cobrem o acampamento",
      "O maná cai todas as manhãs",
      "Quem guarda para o outro dia encontra vermes",
      "No sexto dia recolhem em dobro, e o sábado é instituído",
    ],
    chave: 4,
  },
  17: {
    resumo: "Água saindo de uma rocha, e uma batalha decidida por braços levantados.",
    detalhe:
      "A discussão em Massá e Meribá é registrada com os nomes dos lugares virando acusação permanente, porque significam provação e contenda. A pergunta que o povo faz é a do versículo 7 e é a pergunta do deserto inteiro: está o Senhor no meio de nós ou não. Na segunda metade, a batalha contra Amaleque tem uma imagem curiosa: o resultado depende das mãos erguidas de Moisés, e quando ele cansa, Arão e Hur seguram os braços dele.",
    marcos: [
      "O povo contende por água em Refidim",
      "Moisés fere a rocha em Horebe e sai água",
      "'Está o Senhor no meio de nós ou não?'",
      "Amaleque ataca e Josué comanda a peleja",
      "Arão e Hur sustentam as mãos de Moisés",
    ],
    chave: 7,
  },
  18: {
    resumo: "O sogro chega, observa um dia de trabalho, e diz que aquilo não vai dar certo.",
    detalhe:
      "Jetro é sacerdote midianita, de fora do povo, e é dele que vem o primeiro conselho administrativo da Bíblia. Ele vê Moisés julgando sozinho da manhã à noite e diz duas coisas diretas: não é bom o que fazes, e tu desfalecerás. A solução é delegar por escalas, reservando a Moisés só as causas difíceis. O critério de escolha dos chefes é de caráter, homens capazes, tementes a Deus, de verdade e que odeiem a avareza.",
    marcos: [
      "Jetro traz Zípora e os filhos de volta",
      "Ele ouve o relato e reconhece o Senhor",
      "Vê Moisés julgando sozinho o dia inteiro",
      "'Não é bom o que fazes'",
      "Chefes de mil, cem, cinquenta e dez são nomeados",
    ],
    chave: 18,
  },
  19: {
    resumo: "Três meses depois, uma montanha tremendo, e uma proposta antes de qualquer lei.",
    detalhe:
      "Antes de dar um mandamento sequer, Deus lembra o que já fez: vocês viram o que fiz aos egípcios e como vos trouxe sobre asas de águias. A obediência vem depois do resgate, não antes, e essa ordem organiza o livro inteiro. A proposta é de um reino de sacerdotes e nação santa. A preparação de três dias e os limites ao redor do monte deixam claro que aproximação de Deus não é banal, e o povo treme antes mesmo da primeira palavra.",
    marcos: [
      "Chegam ao Sinai no terceiro mês",
      "'Vos tomei sobre asas de águias'",
      "A proposta de reino de sacerdotes e nação santa",
      "O povo se consagra por três dias",
      "O monte treme, com fumaça, fogo e som de trombeta",
    ],
    chave: 5,
  },
  20: {
    resumo: "Dez palavras ditas em voz alta para todo o povo, e o povo pede que pare.",
    detalhe:
      "Começa com uma apresentação, não com uma ordem: eu sou o Senhor teu Deus que te tirei da casa da servidão. Tudo o que vem depois é consequência disso. As quatro primeiras tratam da relação com Deus e as seis últimas da relação entre pessoas, e a do sábado é a mais longa, com justificativa na criação. Depois de ouvir, o povo recua e pede que Moisés fale no lugar de Deus, porque ouvir diretamente é insuportável.",
    marcos: [
      "'Eu sou o Senhor teu Deus, que te tirei do Egito'",
      "Quatro palavras sobre Deus e seis sobre o próximo",
      "O mandamento do sábado é o mais extenso",
      "O povo recua e pede que Moisés fale por Deus",
      "A lei do altar de terra, sem pedra lavrada",
    ],
    chave: 2,
  },
  21: {
    resumo:
      "As dez palavras viram casos concretos, começando pelos direitos de quem é escravo.",
    detalhe:
      "É significativo que a primeira lei aplicada depois do Decálogo trate de escravidão, e no sentido de limitá-la: seis anos e sai livre, sem pagar nada. Para um povo recém-saído do cativeiro, era a primeira coisa a regular. As penas do capítulo chocam o leitor moderno, mas vale comparar com os códigos vizinhos da época: olho por olho é um teto, não um incentivo, e existe para impedir que a vingança cresça sem limite.",
    marcos: [
      "O escravo hebreu sai livre no sétimo ano",
      "Leis sobre violência, golpes e responsabilidade",
      "Quem fere pai ou mãe recebe pena capital",
      "O dano à mulher grávida e suas consequências",
      "Olho por olho como limite da retaliação",
    ],
    chave: 2,
  },
  22: {
    resumo:
      "Restituição, propriedade, e uma virada de tom quando o assunto vira o mais fraco.",
    detalhe:
      "A primeira metade é técnica, sobre furto, pastagem, incêndio e depósito, sempre com restituição proporcional em vez de mutilação. A segunda metade muda de registro e fica pessoal. Deus fala na primeira pessoa sobre a viúva, o órfão e o estrangeiro, e a razão dada para não oprimir o estrangeiro é a memória: vocês foram estrangeiros no Egito. Sobre a penhora do manto, a frase é direta, é a coberta dele, em que dormirá.",
    marcos: [
      "Restituição por furto e por dano",
      "Regras sobre depósito e guarda de bens",
      "Proibição de afligir a viúva e o órfão",
      "'Não oprimirás o estrangeiro, pois fostes estrangeiros'",
      "O manto penhorado deve voltar antes do pôr do sol",
    ],
    chave: 21,
  },
  23: {
    resumo:
      "Justiça que não se dobra nem para o rico nem para o pobre, e três festas no ano.",
    detalhe:
      "O capítulo proíbe o falso testemunho de forma prática, incluindo seguir a multidão para torcer o direito, e faz uma ressalva rara: nem favorecer o pobre na causa dele. A justiça não muda de lado por compaixão. Manda ajudar o animal do inimigo que está caído, o que é uma forma concreta de amar quem se detesta. O ano sabático da terra é justificado por quem come do que ela produz sozinha, os pobres e os animais.",
    marcos: [
      "Proibição do falso testemunho e do suborno",
      "Nem favorecer o pobre na sua demanda",
      "Ajudar o jumento do inimigo que está caído",
      "O sétimo ano de descanso da terra",
      "As três festas anuais e a promessa do Anjo",
    ],
    chave: 2,
  },
  24: {
    resumo: "A aliança é fechada com sangue, e setenta anciãos comem diante de Deus.",
    detalhe:
      "O povo responde duas vezes que fará tudo o que o Senhor falou, e o compromisso é selado com sangue aspergido sobre o altar e sobre o povo. Depois acontece a cena mais estranha do bloco: Moisés, Arão, dois filhos e setenta anciãos sobem, veem o Deus de Israel, e o texto descreve o que estava sob os pés dele. E então diz que eles comeram e beberam. Não houve destruição, houve refeição. Moisés fica quarenta dias no monte.",
    marcos: [
      "O povo diz que fará tudo o que o Senhor falou",
      "Doze colunas são erguidas, uma por tribo",
      "O sangue da aliança é aspergido sobre o povo",
      "Setenta anciãos veem a Deus e comem",
      "Moisés sobe e permanece quarenta dias e quarenta noites",
    ],
    chave: 7,
  },
  25: {
    resumo:
      "Começam as instruções da tenda, e a razão declarada é morar no meio deles.",
    detalhe:
      "Antes de qualquer medida, o motivo: para que eu habite no meio deles. Todo o projeto existe para isso. A oferta é voluntária, de quem o coração mover. As peças descritas aqui são as mais internas, a arca com a tampa e os querubins, a mesa dos pães e o candelabro de amêndoas batido de uma peça só. Se os capítulos de construção parecem longos, vale lembrar que ocupam mais espaço no livro do que a criação do mundo.",
    marcos: [
      "A oferta é voluntária, de coração movido",
      "'Para que eu habite no meio deles'",
      "A arca, a tampa e os dois querubins",
      "A mesa dos pães da proposição",
      "O candelabro de ouro batido, com flores de amêndoa",
    ],
    chave: 8,
  },
  26: {
    resumo: "As cortinas, as tábuas e o véu que separa o lugar santíssimo.",
    detalhe:
      "São quatro camadas de cobertura, da mais bela por dentro à mais rústica por fora, de forma que quem passasse do lado de fora veria apenas peles. O que vale reter é o véu, bordado com querubins, separando o lugar santo do santíssimo. Ele aparece aqui como barreira necessária, e é justamente esse objeto que os evangelhos dizem ter se rasgado de alto a baixo no momento da morte de Jesus.",
    marcos: [
      "Dez cortinas de linho fino com querubins",
      "Quatro camadas, da mais fina à mais rústica",
      "As tábuas de acácia e as bases de prata",
      "O véu separa o santo do santíssimo",
      "A arca é posta atrás do véu",
    ],
    chave: 33,
  },
  27: {
    resumo: "O altar do sacrifício, o pátio em volta, e uma lâmpada que não se apaga.",
    detalhe:
      "O movimento do capítulo é de fora para dentro, ao contrário do anterior: quem chega encontra primeiro o altar, e só depois o resto. A ordem física conta uma teologia. O pátio é cercado, mas a entrada é ampla, de vinte côvados. No fim vem a ordem sobre o azeite puro de oliveira batido, para a lâmpada arder continuamente diante do Senhor, cuidada de tarde até de manhã.",
    marcos: [
      "O altar de bronze com quatro chifres",
      "O pátio cercado de cortinas de linho",
      "A entrada larga na parte oriental",
      "Azeite puro de oliveira batido",
      "A lâmpada deve arder continuamente",
    ],
    chave: 20,
  },
  28: {
    resumo:
      "As vestes do sacerdote, feitas para glória e beleza, com doze nomes no peito.",
    detalhe:
      "A expressão usada é direta: para glória e ornamento. O detalhe que carrega o sentido é repetido duas vezes, nos ombros e no peitoral: o sacerdote entra levando os nomes das doze tribos consigo, sobre o coração, por memorial perpétuo. Ele não entra sozinho nem por si. As campainhas na barra da túnica existem para que se ouça o som quando ele entra e sai, o que era garantia de que continuava vivo lá dentro.",
    marcos: [
      "Arão e os filhos são separados para o sacerdócio",
      "As vestes são para glória e ornamento",
      "Os nomes das doze tribos nos ombros e no peitoral",
      "O Urim e o Tumim dentro do peitoral",
      "A lâmina de ouro na cabeça: Santidade ao Senhor",
    ],
    chave: 29,
  },
  29: {
    resumo: "Sete dias de consagração, com sangue na orelha, no polegar e no pé.",
    detalhe:
      "O rito é estranho ao olhar moderno e coerente na sua lógica: o sangue é posto na orelha direita, no polegar direito e no dedo do pé direito, marcando o que o sacerdote ouve, o que faz e por onde anda. A consagração dura sete dias e se repete a cada um deles. No fim do capítulo, a promessa volta ao que já havia sido dito no 25, e o motivo de tudo reaparece: habitarei no meio dos filhos de Israel e serei o seu Deus.",
    marcos: [
      "O novilho e os dois carneiros da consagração",
      "Sangue na orelha, no polegar e no pé direitos",
      "As vestes são ungidas junto com os sacerdotes",
      "O holocausto contínuo de manhã e à tarde",
      "'Habitarei no meio dos filhos de Israel'",
    ],
    chave: 45,
  },
  30: {
    resumo:
      "Altar do incenso, dinheiro do resgate, bacia para lavar, e receitas que não se copiam.",
    detalhe:
      "O preço do resgate é igual para todos, e o texto insiste: o rico não dará mais e o pobre não dará menos. Diante de Deus, o valor da vida não varia com a conta bancária. A bacia entre a tenda e o altar existe para os sacerdotes lavarem mãos e pés antes de entrar, todas as vezes. E tanto o óleo da unção quanto o incenso têm fórmula proibida para uso comum, o que separa o sagrado do perfume caseiro.",
    marcos: [
      "O altar do incenso diante do véu",
      "O resgate é igual para ricos e pobres",
      "A bacia de bronze para lavar mãos e pés",
      "O óleo santo da unção e sua receita",
      "O incenso não pode ser reproduzido para uso próprio",
    ],
    chave: 15,
  },
  31: {
    resumo:
      "Deus chama dois artesãos pelo nome, e fecha o bloco lembrando do sábado.",
    detalhe:
      "Bezalel é a primeira pessoa na Bíblia de quem se diz que foi cheia do Espírito de Deus, e não é profeta nem sacerdote, é artesão. A capacitação citada é sabedoria, entendimento e conhecimento em todo lavor, para trabalhar ouro, pedra e madeira. Logo depois vem o sábado, colocado ali de propósito: nem a obra mais sagrada justifica trabalhar sem parar. O capítulo termina com as tábuas escritas pelo dedo de Deus.",
    marcos: [
      "Bezalel é chamado pelo nome e cheio do Espírito",
      "Aoliabe é dado como companheiro de obra",
      "A habilidade artesanal é tratada como dom",
      "O sábado é reafirmado como sinal perpétuo",
      "As duas tábuas escritas pelo dedo de Deus",
    ],
    chave: 3,
  },
  32: {
    resumo:
      "Enquanto ele recebia as tábuas, embaixo fundiam um bezerro e chamavam de deus.",
    detalhe:
      "O pedido do povo começa com um dado honesto: Moisés demorou. E a resposta de Arão é fabricar um deus visível, chamando a festa de festa ao Senhor, o que é pior do que trocar de deus, é fabricar o verdadeiro à própria imagem. A desculpa dele depois é quase cômica, dizendo que jogou o ouro no fogo e saiu este bezerro. A intercessão de Moisés é o centro do capítulo, e ele argumenta pela reputação de Deus e pela promessa aos patriarcas.",
    marcos: [
      "O povo pede deuses porque Moisés demorou",
      "Arão funde o bezerro e proclama festa",
      "Moisés intercede e Deus desiste do mal",
      "Ao ver a cena, ele quebra as tábuas",
      "Os levitas se põem ao lado do Senhor",
    ],
    chave: 32,
  },
  33: {
    resumo:
      "Deus oferece a terra sem a própria presença, e Moisés diz que assim não vale.",
    detalhe:
      "A proposta é tentadora: anjo na frente, terra garantida, só que eu não subirei no meio de ti. Moisés recusa, e a frase dele define o livro: se a tua presença não for conosco, não nos faças subir daqui. O que distingue aquele povo não é a terra, é quem vai junto. Então ele pede mais, para ver a glória, e a resposta é um arranjo delicado, com a fenda da rocha e a mão que cobre, porque ninguém vê a face e vive.",
    marcos: [
      "Deus oferece a terra, mas sem subir no meio deles",
      "O povo lamenta e tira os enfeites",
      "Moisés fala com Deus como um homem fala ao amigo",
      "'Se a tua presença não for conosco, não nos faças subir'",
      "Moisés vê as costas de Deus da fenda da rocha",
    ],
    chave: 15,
  },
  34: {
    resumo:
      "Tábuas novas, e Deus se descreve a si mesmo numa frase que a Bíblia inteira vai citar.",
    detalhe:
      "Moisés talha as segundas tábuas, e o que acontece no monte é uma proclamação do nome. A fórmula do versículo 6 e 7, misericordioso, compassivo, tardio em irar-se e grande em benignidade, vira o texto mais reaproveitado do Antigo Testamento, aparecendo em Salmos, Joel, Jonas e Naum. É exatamente essa frase que Jonas usa para reclamar. Ao descer, o rosto de Moisés brilha sem que ele perceba, e o povo tem medo de chegar perto.",
    marcos: [
      "Moisés talha as segundas tábuas",
      "O Senhor passa e proclama o próprio nome",
      "'Misericordioso e compassivo, tardio em irar-se'",
      "A aliança é renovada com advertências sobre os povos da terra",
      "O rosto de Moisés resplandece ao descer",
    ],
    chave: 6,
  },
  35: {
    resumo: "O sábado primeiro, e então uma coleta que o povo atende com entusiasmo.",
    detalhe:
      "A ordem de execução espelha a ordem das instruções, e de novo o sábado vem antes. A coleta é notável pelo tipo de participação: o texto repete a expressão sobre quem tinha coração voluntário, e menciona nominalmente as mulheres hábeis que fiavam com as próprias mãos, e as que fiavam pelos de cabra. É trabalho especializado descrito com respeito, num livro em que raramente se nomeia quem produz.",
    marcos: [
      "O sábado é lembrado antes da obra começar",
      "A oferta é pedida a quem tiver coração voluntário",
      "Homens e mulheres trazem joias e tecidos",
      "As mulheres hábeis fiam com as próprias mãos",
      "Bezalel e Aoliabe são apresentados ao povo",
    ],
    chave: 21,
  },
  36: {
    resumo: "O povo traz tanta coisa que precisam mandar parar.",
    detalhe:
      "É o único lugar da Bíblia em que uma oferta precisa ser interrompida por excesso. Os artesãos vão até Moisés dizer que o povo traz muito mais do que basta, e sai uma proclamação proibindo novas ofertas. O contraste com o capítulo 32 é gritante e proposital: o mesmo povo que arrancou brincos para fundir um bezerro agora entrega de mais para a tenda. O resto do capítulo é a execução das cortinas e tábuas, ponto por ponto.",
    marcos: [
      "Os artesãos recebem o material e começam",
      "O povo continua trazendo ofertas todas as manhãs",
      "'O povo traz muito mais do que basta'",
      "Moisés proíbe novas ofertas",
      "As cortinas e as tábuas são feitas como ordenado",
    ],
    chave: 5,
  },
  37: {
    resumo: "Bezalel executa as peças de dentro, uma a uma, como estava escrito.",
    detalhe:
      "O capítulo repete o capítulo 25 em tempo passado, e a repetição é o recado: foi feito exatamente como foi mandado. Depois do bezerro, essa insistência tem peso, porque mostra um povo voltando a obedecer no detalhe. A arca, a mesa, o candelabro de um talento de ouro puro batido e o altar do incenso saem das mãos de um artesão nomeado, o que a Bíblia raramente faz com objeto nenhum.",
    marcos: [
      "Bezalel faz a arca e a tampa com os querubins",
      "A mesa dos pães e seus utensílios",
      "O candelabro batido de um talento de ouro puro",
      "O altar do incenso",
      "O óleo da unção e o incenso aromático",
    ],
    chave: 1,
  },
  38: {
    resumo: "As peças do pátio, e uma prestação de contas de todo o metal recebido.",
    detalhe:
      "O detalhe mais humano do capítulo está numa linha só: a bacia de bronze foi feita dos espelhos das mulheres que serviam à porta da tenda. Elas entregaram o objeto com que se viam. E o fim do capítulo é contabilidade, com o total de ouro, prata e bronze listado publicamente, por mão de Itamar. Quem recolhe oferta do povo presta contas do que entrou, e o texto registra isso como parte da obra.",
    marcos: [
      "O altar do holocausto e seus utensílios",
      "A bacia feita dos espelhos das mulheres que serviam",
      "As cortinas e colunas do pátio",
      "O total de ouro, prata e bronze é apurado",
      "A prestação de contas é feita por mão de Itamar",
    ],
    chave: 8,
  },
  39: {
    resumo: "As vestes ficam prontas, e Moisés confere tudo antes de abençoar.",
    detalhe:
      "A frase como o Senhor ordenara a Moisés aparece de novo e de novo, quase como refrão, e o capítulo fecha com Moisés inspecionando a obra inteira. A cena ecoa de propósito o fim da criação em Gênesis: ele viu toda a obra, e eis que a tinham feito como o Senhor ordenara, e Moisés os abençoou. Vendo, aprovando e abençoando, na mesma sequência.",
    marcos: [
      "As vestes sacerdotais são concluídas",
      "As pedras com os nomes das tribos são gravadas",
      "A lâmina de ouro recebe a inscrição de santidade",
      "Tudo é levado a Moisés para conferência",
      "Ele vê a obra pronta e abençoa o povo",
    ],
    chave: 43,
  },
  40: {
    resumo:
      "A tenda é levantada no primeiro dia do ano, e a glória desce a ponto de ninguém entrar.",
    detalhe:
      "A montagem segue uma ordem precisa e a data é simbólica: o primeiro dia do primeiro mês do segundo ano, um recomeço. Quando tudo está no lugar, a nuvem cobre a tenda e a glória a enche, e acontece algo inesperado: Moisés não consegue entrar. O homem que subia ao monte agora fica do lado de fora. O livro termina com a nuvem guiando as partidas, o que deixa o povo pronto para andar, mas ainda longe da terra.",
    marcos: [
      "A tenda é levantada no primeiro dia do primeiro mês",
      "Cada peça é posta no seu lugar",
      "Arão e os filhos são lavados e vestidos",
      "A nuvem cobre a tenda e a glória a enche",
      "Moisés não pode entrar, e a nuvem passa a guiar as jornadas",
    ],
    chave: 34,
  },
};

CAPITULOS.dn = {
  1: {
    resumo:
      "Quatro adolescentes deportados são treinados para servir ao império, e resistem pela comida.",
    detalhe:
      "O programa é de assimilação completa: língua nova, literatura nova, nomes novos que trocam referências ao Deus de Israel por referências a deuses babilônicos. Daniel aceita tudo isso e traça a linha exatamente na mesa. O texto não explica direito por que a comida era o problema, e o detalhe importante é o modo: ele propõe um teste de dez dias em vez de confrontar, e negocia com o encarregado preocupando-se com o risco que o outro corria.",
    marcos: [
      "Jerusalém é sitiada e jovens da nobreza são levados",
      "Recebem nomes babilônicos e três anos de formação",
      "Daniel resolve não se contaminar com a comida do rei",
      "Propõe um teste de dez dias com legumes e água",
      "Os quatro se mostram dez vezes melhores que os demais",
    ],
    chave: 8,
  },
  2: {
    resumo:
      "O rei exige que adivinhem o sonho antes de interpretá-lo, sob pena de morte.",
    detalhe:
      "A exigência é impossível de propósito, porque o rei desconfia dos próprios sábios. Quando a sentença sai, Daniel faz duas coisas notáveis: pede tempo e convoca os amigos para orar. A revelação vem de noite, e antes de correr ao palácio ele para para louvar. Diante do rei, ele nega crédito de forma explícita. A estátua de materiais decrescentes representa impérios sucessivos, e a pedra que a destrói não é cortada por mãos humanas.",
    marcos: [
      "Nabucodonosor exige que digam o sonho e a interpretação",
      "Os sábios declaram a tarefa impossível",
      "Daniel pede prazo e ora com os amigos",
      "A estátua de ouro, prata, bronze, ferro e barro",
      "A pedra cortada sem mãos desfaz tudo e enche a terra",
    ],
    chave: 44,
  },
  3: {
    resumo:
      "Uma estátua enorme, uma orquestra, e três homens que continuam de pé quando todos se ajoelham.",
    detalhe:
      "O capítulo é escrito com repetições propositais, listando os instrumentos e os cargos várias vezes, o que soa burocrático e ridículo, que é o efeito desejado sobre a máquina do império. O coração da história é a resposta dos três antes de saber o desfecho: o nosso Deus pode nos livrar, e se não livrar, ainda assim não serviremos. A fé declarada ali não depende do resultado. Dentro do forno aparece uma quarta figura.",
    marcos: [
      "A estátua de ouro é erguida e a música dá o sinal",
      "Os três se recusam a adorar",
      "'E, se não, fica sabendo, ó rei, que não serviremos'",
      "O forno é aquecido sete vezes mais",
      "Uma quarta figura anda com eles no fogo",
    ],
    chave: 18,
  },
  4: {
    resumo:
      "O próprio rei conta, em primeira pessoa, como enlouqueceu e voltou a si.",
    detalhe:
      "É o capítulo mais inusitado do livro porque tem a forma de um decreto assinado por Nabucodonosor contando a própria humilhação. O sonho da árvore cortada é interpretado por Daniel com relutância, e ele chega a aconselhar o rei a romper com os pecados e ter misericórdia dos pobres, o que talvez adiasse a sentença. A queda acontece no meio de uma frase de vaidade, enquanto ele passeia admirando a cidade que construiu.",
    marcos: [
      "O rei sonha com uma árvore imensa que é cortada",
      "Daniel interpreta com relutância e aconselha mudança",
      "Doze meses depois, o rei se gloria da própria obra",
      "Perde a razão e vive como animal do campo",
      "Levanta os olhos ao céu, recobra o juízo e louva",
    ],
    chave: 27,
  },
  5: {
    resumo: "Uma festa com os cálices do templo, e uma mão que escreve na parede.",
    detalhe:
      "Belsazar não repete o erro do antecessor, comete um pior: usa os utensílios sagrados de Jerusalém para brindar a deuses de metal. A acusação de Daniel é frontal e inclui uma frase que vale reter, sobre ele saber de tudo o que aconteceu com Nabucodonosor e não ter humilhado o coração. As palavras na parede são termos de peso e medida, e a leitura é que o reino foi pesado e achado em falta. Naquela mesma noite o rei é morto.",
    marcos: [
      "Belsazar bebe nos vasos do templo de Jerusalém",
      "Uma mão escreve na parede diante dos convidados",
      "A rainha lembra que existe Daniel",
      "'Foste pesado na balança e achado em falta'",
      "Naquela noite o rei é morto e o reino passa aos medos",
    ],
    chave: 27,
  },
  6: {
    resumo:
      "Um decreto feito sob medida para condená-lo, e ele abre a janela do mesmo jeito de sempre.",
    detalhe:
      "Os rivais procuram falha na administração e não acham nenhuma, então concluem que só poderão pegá-lo pela religião. A armadilha usa a vaidade do rei e a irrevogabilidade da lei persa. O detalhe mais importante está no versículo 10: Daniel soube do decreto e foi orar como costumava fazer antes. Não muda nada, nem para esconder nem para desafiar. O rei passa a noite em jejum, e é ele quem corre à cova de madrugada.",
    marcos: [
      "Os governadores não acham falha em Daniel",
      "O decreto proíbe petições a qualquer deus por trinta dias",
      "Daniel ora como já costumava fazer",
      "É lançado na cova dos leões e o rei passa a noite em claro",
      "Sai ileso, e o rei proclama o Deus vivo a todo o império",
    ],
    chave: 10,
  },
  7: {
    resumo:
      "Quatro feras saem do mar, e um como filho de homem recebe o domínio eterno.",
    detalhe:
      "Aqui o livro muda de gênero: sai a narrativa e entra a visão apocalíptica, com imagens que precisam ser lidas como imagens. As quatro feras cobrem o mesmo terreno da estátua do capítulo 2, agora vistas do ponto de vista de quem sofre, e por isso monstruosas em vez de metálicas. A cena do Ancião de Dias sentando para julgar é a virada. A expressão filho do homem, usada aqui, é a que os evangelhos colocam na boca de Jesus mais do que qualquer outra.",
    marcos: [
      "Quatro feras sobem do mar agitado",
      "O chifre pequeno fala com arrogância",
      "O Ancião de Dias se assenta e os livros se abrem",
      "Um como filho de homem vem com as nuvens",
      "O domínio é dado aos santos do Altíssimo",
    ],
    chave: 13,
  },
  8: {
    resumo:
      "Um carneiro e um bode se enfrentam, e desta vez a visão vem com nomes próprios.",
    detalhe:
      "É a visão mais explicitamente identificada do livro, porque o anjo nomeia os reinos: o carneiro é a Média e a Pérsia, o bode é a Grécia. O chifre pequeno que sai depois e profana o santuário aponta para Antíoco Epifânio, o que dá ao capítulo uma ancoragem histórica rara na literatura apocalíptica. Daniel termina adoecido por dias, sem entender, e o texto diz que ele ficou espantado com a visão e não havia quem a explicasse.",
    marcos: [
      "O carneiro de dois chifres domina em três direções",
      "O bode veloz vem do ocidente sem tocar o chão",
      "O chifre grande é quebrado e nascem quatro",
      "Um chifre pequeno profana o santuário",
      "Gabriel explica, e Daniel adoece de espanto",
    ],
    chave: 25,
  },
  9: {
    resumo:
      "Lendo Jeremias, ele descobre um prazo, e responde com uma oração de confissão coletiva.",
    detalhe:
      "Daniel está estudando a Escritura quando entende que os setenta anos do exílio estão acabando. A reação não é reivindicar a promessa, é confessar. E ele diz nós o tempo todo, incluindo a si mesmo numa culpa que o texto nunca lhe atribuiu pessoalmente. O argumento final não apela a mérito nenhum: não por causa das nossas justiças, mas por causa das tuas muitas misericórdias. A resposta vem com a profecia das setenta semanas, das mais debatidas da Bíblia.",
    marcos: [
      "Daniel entende pelos livros o prazo de setenta anos",
      "Ora confessando o pecado como se fosse seu",
      "'Não por causa das nossas justiças'",
      "Gabriel chega no tempo da oferta da tarde",
      "A profecia das setenta semanas é dada",
    ],
    chave: 18,
  },
  10: {
    resumo:
      "Três semanas de jejum, e a explicação de por que a resposta demorou a chegar.",
    detalhe:
      "É um dos poucos textos da Bíblia que levanta a cortina sobre o que acontece entre o pedido e a resposta. O mensageiro diz que foi ouvido desde o primeiro dia, e que ficou retido vinte e um dias. A cena tem um efeito físico forte: os companheiros fogem sem ver nada, e Daniel perde as forças e cai. Três vezes ele precisa ser tocado e fortalecido para conseguir ouvir, o que dá ao capítulo um tom de fragilidade humana diante do que é grande demais.",
    marcos: [
      "Daniel jejua três semanas junto ao Tigre",
      "Um homem vestido de linho aparece e só ele o vê",
      "'Desde o primeiro dia as tuas palavras foram ouvidas'",
      "O mensageiro relata ter sido retido vinte e um dias",
      "Daniel é tocado e fortalecido para poder ouvir",
    ],
    chave: 12,
  },
  11: {
    resumo:
      "Séculos de guerra entre o rei do norte e o rei do sul, contados em detalhe.",
    detalhe:
      "É o capítulo mais denso do livro e o mais difícil de ler seguido, porque acompanha alianças, casamentos políticos e campanhas sem citar nomes. A historiografia identifica nele a sucessão entre os herdeiros de Alexandre, e a parte final, sobre o rei que se engrandece contra todo deus e profana o santuário, é lida como Antíoco Epifânio. No meio da matança, uma nota discreta sobre os sábios do povo, que instruem muitos e caem, e são ajudados com pequeno socorro.",
    marcos: [
      "Reis da Pérsia e a ascensão da Grécia",
      "Guerras sucessivas entre o rei do norte e o do sul",
      "Alianças por casamento que não se sustentam",
      "O santuário é profanado e o sacrifício cessa",
      "Os sábios instruem muitos e caem pelo caminho",
    ],
    chave: 32,
  },
  12: {
    resumo:
      "O fim do livro fala de ressurreição, e manda selar o que não pode ser entendido ainda.",
    detalhe:
      "O versículo 2 é a declaração mais clara de ressurreição do Antigo Testamento, com os que dormem no pó despertando, uns para a vida eterna e outros para a vergonha. Daniel ouve os prazos e responde com honestidade rara para um profeta: eu ouvi, mas não entendi. A resposta que ele recebe não é uma explicação, é uma promessa pessoal: vai até o fim, descansa, e te levantarás na tua herança, no fim dos dias.",
    marcos: [
      "Miguel se levanta num tempo de angústia",
      "Muitos que dormem no pó despertarão",
      "Os sábios resplandecerão como o fulgor do firmamento",
      "'Eu ouvi, mas não entendi'",
      "'Tu irás até ao fim, e te levantarás na tua herança'",
    ],
    chave: 2,
  },
};

CAPITULOS.jz = {
  1: {
    resumo:
      "A conquista continua, mas o capítulo é uma lista do que cada tribo não conseguiu tomar.",
    detalhe:
      "Começa bem, com Judá vencendo, e vai piorando de parágrafo em parágrafo. A expressão que se repete é a chave do livro: não expulsou, não pôde expulsar, e por fim deixou ficar mediante trabalho forçado. É o retrato de uma obediência parcial que parece pragmática e sai cara depois. No meio da lista, a história de Acsa pedindo fontes de água ao pai é um respiro de iniciativa pessoal num capítulo de omissões.",
    marcos: [
      "Judá sobe primeiro e vence",
      "Acsa pede as fontes de água ao pai",
      "Benjamim não expulsa os jebuseus de Jerusalém",
      "Manassés, Efraim e as demais tribos deixam povos ficar",
      "Os cananeus são postos em trabalho forçado, não expulsos",
    ],
    chave: 28,
  },
  2: {
    resumo:
      "Um mensageiro faz a acusação, a geração que viu tudo morre, e o ciclo do livro se instala.",
    detalhe:
      "Este capítulo é a chave de leitura de tudo o que vem depois. O narrador descreve o padrão que vai se repetir sete vezes: o povo abandona, Deus entrega a opressores, o povo clama, Deus levanta um juiz, há paz, o juiz morre e tudo recomeça pior. A frase mais pesada é sobre a geração seguinte, que não conheceu o Senhor nem a obra que ele fizera. Não foi rebeldia, foi falha em transmitir.",
    marcos: [
      "O Anjo do Senhor sobe a Boquim e acusa o povo",
      "Josué morre e é sepultado",
      "Levanta-se uma geração que não conheceu o Senhor",
      "O ciclo se instala: abandono, opressão, clamor, livramento",
      "Nem com os juízes o povo deixa os ídolos",
    ],
    chave: 10,
  },
  3: {
    resumo:
      "Os três primeiros libertadores, incluindo um canhoto que engana a guarda de um rei gordo.",
    detalhe:
      "Otniel é o modelo limpo, contado em poucos versículos. Eúde é o oposto: a narrativa é longa, detalhada e propositalmente grotesca, com a espada entrando na barriga do rei Eglom e a gordura se fechando sobre o cabo. O texto brinca com o fato de Eúde ser canhoto, o que fazia a arma passar despercebida no lado direito. Sangar aparece em uma frase só, matando seiscentos com uma aguilhada de bois.",
    marcos: [
      "Povos são deixados na terra para provar Israel",
      "Otniel liberta o povo e há quarenta anos de paz",
      "Eúde, canhoto, esconde a espada no lado direito",
      "Eglom, rei de Moabe, é morto no quarto de verão",
      "Sangar mata seiscentos com uma aguilhada de bois",
    ],
    chave: 9,
  },
  4: {
    resumo:
      "Uma juíza manda um general para a guerra, ele exige que ela vá junto, e quem mata é outra mulher.",
    detalhe:
      "Débora já é profetisa e juíza antes de qualquer crise, e o povo subia até ela para ser julgado. Baraque condiciona a obediência à presença dela, e a resposta é uma profecia: a glória da vitória não será sua, porque o Senhor entregará Sísera na mão de uma mulher. O desfecho acontece numa tenda, com leite em vez de água e uma estaca. O texto registra tudo sem comentário moral, à maneira do livro.",
    marcos: [
      "Débora julga Israel debaixo da palmeira",
      "Baraque só vai se ela for junto",
      "A vitória será entregue na mão de uma mulher",
      "O exército de Sísera é desbaratado junto ao rio",
      "Jael o recebe na tenda e o mata com uma estaca",
    ],
    chave: 9,
  },
  5: {
    resumo: "A mesma batalha do capítulo anterior, agora cantada em poesia antiga.",
    detalhe:
      "É um dos textos hebraicos mais antigos que existem, e a linguagem é difícil justamente por isso. O cântico faz o que a prosa não fez: elogia as tribos que vieram e alfineta nominalmente as que ficaram em casa, perguntando por que Rúben ficou entre os apriscos ouvindo o balido dos rebanhos. O fim é uma cena cruel e humana, com a mãe de Sísera olhando pela janela e inventando explicações para a demora do filho.",
    marcos: [
      "Débora e Baraque cantam a vitória",
      "As tribos que vieram são louvadas",
      "Rúben, Dã e Aser são cobrados por terem ficado",
      "Jael é chamada bendita entre as mulheres",
      "A mãe de Sísera espera na janela por um filho que não volta",
    ],
    chave: 31,
  },
  6: {
    resumo:
      "Escondido num lagar para debulhar trigo, ele é chamado de valente herói.",
    detalhe:
      "A saudação do anjo é quase irônica dada a situação, e Gideão responde com a pergunta que o livro inteiro faz: se o Senhor está conosco, por que nos sobreveio tudo isto. Ele pede sinal atrás de sinal, e o texto nunca o repreende por isso. A primeira tarefa é doméstica e perigosa, derrubar o altar do próprio pai, e ele faz de noite por medo. A defesa que o pai faz dele é de uma lógica desconcertante: se Baal é deus, que ele se defenda sozinho.",
    marcos: [
      "Midiã oprime Israel e o povo se esconde em cavernas",
      "O Anjo o chama de valente herói no lagar",
      "'Se o Senhor está conosco, por que nos sobreveio tudo isto?'",
      "Gideão derruba o altar de Baal de noite",
      "Os dois sinais com a lã e o orvalho",
    ],
    chave: 13,
  },
  7: {
    resumo:
      "Trinta e dois mil viram trezentos, e a batalha é vencida com jarros e trombetas.",
    detalhe:
      "A redução é explicada em voz alta e é o ponto do capítulo: para que Israel não se glorie dizendo que a própria mão o salvou. Primeiro saem os medrosos, depois o critério bizarro da água, e restam trezentos. Antes do ataque, Deus manda Gideão descer ao acampamento inimigo para ouvir, porque sabe que ele ainda está com medo, e o que ele ouve é o sonho de um soldado sobre um pão de cevada. A arma final é barulho, luz e confusão.",
    marcos: [
      "Vinte e dois mil voltam por medo",
      "A prova da água reduz a trezentos",
      "'Para que Israel não se glorie contra mim'",
      "Gideão ouve o sonho do pão de cevada no acampamento",
      "Trombetas, cântaros quebrados e tochas na noite",
    ],
    chave: 2,
  },
  8: {
    resumo:
      "Depois da vitória, as brigas internas, a vingança pessoal, e um ídolo feito de brincos.",
    detalhe:
      "O tom muda: Gideão responde com diplomacia a Efraim e com brutalidade a Sucote e Penuel, que se recusaram a dar pão aos seus homens exaustos. A morte dos reis midianitas é confessadamente vingança de sangue por irmãos mortos. No fim, ele recusa a coroa com a frase certa, dizendo que o Senhor é quem domina, e então pede o ouro dos despojos e faz uma estola que vira armadilha para a casa dele. Acerta na palavra e erra no objeto.",
    marcos: [
      "Efraim reclama e Gideão responde com diplomacia",
      "Sucote e Penuel negam pão e são punidos",
      "Zeba e Zalmuna são mortos por vingança de sangue",
      "Gideão recusa ser rei sobre Israel",
      "Faz uma estola de ouro, e ela vira laço para sua casa",
    ],
    chave: 23,
  },
  9: {
    resumo:
      "Um filho mata setenta irmãos para reinar, e morre com uma pedra de moinho na cabeça.",
    detalhe:
      "Abimeleque é o anti-juiz: ninguém o levanta, ele se impõe. O único sobrevivente do massacre sobe ao monte Gerizim e conta a fábula das árvores que procuram um rei, em que só o espinheiro aceita, e é o espinheiro que promete sombra e entrega fogo. A parábola se cumpre letra por letra. O fim é sórdido e o texto não poupa: ferido por uma mulher anônima que joga uma pedra de moinho, ele pede ao escudeiro que o mate para não constar que morreu assim.",
    marcos: [
      "Abimeleque mata setenta irmãos sobre uma pedra",
      "Jotão escapa e conta a parábola das árvores",
      "Siquém se volta contra ele",
      "A torre de Tebes resiste",
      "Uma mulher lança uma pedra de moinho sobre a cabeça dele",
    ],
    chave: 56,
  },
  10: {
    resumo:
      "O povo clama de novo, e ouve a resposta mais dura do livro: vá clamar aos seus deuses.",
    detalhe:
      "Depois de listar dois juízes em poucas linhas, o capítulo mostra o ciclo se degradando. O povo agora serve a sete panteões diferentes, listados um a um. Quando clamam, Deus recusa, lembrando de sete livramentos anteriores e dizendo para clamarem aos deuses que escolheram. A virada não vem de palavras: eles tiram os deuses estrangeiros do meio de si, e aí o texto diz que a alma de Deus não pôde mais suportar o sofrimento deles.",
    marcos: [
      "Tola e Jair julgam Israel",
      "O povo serve a sete conjuntos de deuses",
      "'Ide e clamai aos deuses que escolhestes'",
      "Eles removem os deuses estrangeiros do meio de si",
      "A alma do Senhor não pôde mais suportar o sofrimento de Israel",
    ],
    chave: 16,
  },
  11: {
    resumo:
      "Um filho rejeitado vira chefe de bando, depois general, e faz um voto que destrói a própria casa.",
    detalhe:
      "Jefté é expulso pelos irmãos por ser filho de prostituta e volta quando precisam dele, o que ele faz questão de dizer na cara deles. A negociação diplomática com Amom ocupa boa parte do capítulo e mostra que ele conhecia a história do povo. O voto vem depois de o Espírito já ter vindo sobre ele, o que torna tudo mais amargo: era desnecessário. A filha sai com tambores, e ela é quem o segura na palavra dada.",
    marcos: [
      "Jefté é expulso por ser filho de outra mulher",
      "Os anciãos voltam para buscá-lo quando a guerra vem",
      "Ele argumenta com Amom recorrendo à história",
      "Faz um voto sobre quem sair da porta de sua casa",
      "Quem sai é a filha única, com tambores e danças",
    ],
    chave: 35,
  },
  12: {
    resumo:
      "Uma guerra civil por causa de orgulho ferido, decidida pela pronúncia de uma palavra.",
    detalhe:
      "Efraim faz com Jefté a mesma reclamação que fez com Gideão, mas ele não responde com diplomacia. O resultado é guerra entre irmãos, e o mecanismo de identificação é linguístico: quem não conseguia pronunciar o som inicial de shibolete era morto no vau do Jordão. Quarenta e dois mil morrem por causa de sotaque. O capítulo termina listando três juízes menores, com o número de filhos e jumentos de cada um.",
    marcos: [
      "Efraim ameaça queimar a casa de Jefté",
      "Gileade os derrota",
      "Os vaus do Jordão são tomados",
      "Shibolete separa quem vive de quem morre",
      "Ibsã, Elom e Abdom julgam Israel",
    ],
    chave: 6,
  },
  13: {
    resumo:
      "Um anúncio de nascimento feito à mãe, e um pai que insiste em falar com o mensageiro.",
    detalhe:
      "A mulher de Manoá não tem nome no texto, e mesmo assim é ela quem recebe a aparição, duas vezes, e é ela quem tem o raciocínio mais claro do casal no fim. Manoá pede que o anjo volte e depois entra em pânico achando que vão morrer, e ela responde com lógica prática sobre Deus não ter aceitado a oferta para depois matá-los. As regras do nazireado valem para ela também, antes do menino nascer.",
    marcos: [
      "Israel é entregue aos filisteus por quarenta anos",
      "O Anjo aparece à mulher estéril de Manoá",
      "As regras do nazireado valem já na gravidez",
      "Manoá pede que o Anjo volte e pergunta seu nome",
      "Sansão nasce e o Espírito começa a incitá-lo",
    ],
    chave: 18,
  },
  14: {
    resumo:
      "Ele vê uma mulher e exige casar, mata um leão no caminho, e aposta um enigma na festa.",
    detalhe:
      "A primeira fala de Sansão no livro é uma ordem aos pais para conseguirem a mulher que ele viu, e o texto registra a objeção deles. O leão é morto com as mãos e ninguém fica sabendo, e depois ele volta para comer mel da carcaça, o que para um nazireu significa tocar em algo morto. O enigma é injusto de propósito, porque ninguém poderia resolver sem ter visto o leão, e a solução vem por pressão sobre a noiva.",
    marcos: [
      "Sansão quer casar com uma filisteia de Timna",
      "Mata um leão com as próprias mãos",
      "Come mel da carcaça e não conta a ninguém",
      "Propõe o enigma aos trinta companheiros",
      "A noiva é pressionada e entrega a resposta",
    ],
    chave: 6,
  },
  15: {
    resumo:
      "Trezentas raposas com tochas, mil mortos com uma queixada, e sede depois da vitória.",
    detalhe:
      "A escalada de vingança é contada como uma corrente de revides, cada lado respondendo ao anterior, e ninguém consegue parar. Os próprios homens de Judá entregam Sansão amarrado aos filisteus, o que mostra o quanto o povo já havia se acomodado à dominação. Depois de matar mil com uma queixada, ele clama por água, e a frase dele é bem humana: livraste-me disso tudo e agora vou morrer de sede.",
    marcos: [
      "Sansão solta raposas com tochas nas plantações",
      "Os filisteus queimam a mulher e o pai dela",
      "Homens de Judá o entregam amarrado",
      "Mata mil homens com uma queixada de jumento",
      "Clama por água e Deus abre uma fonte",
    ],
    chave: 18,
  },
  16: {
    resumo:
      "Três mentiras e uma verdade fatal, e a última oração é um pedido de vingança.",
    detalhe:
      "Dalila pergunta quatro vezes, sem disfarce nenhum, e ele brinca três e entrega na quarta, depois de ela o importunar todos os dias. O versículo mais triste do capítulo é o 20: ele acordou e não sabia que o Senhor se tinha retirado dele. O cabelo era sinal, não fonte. No templo de Dagom, o pedido final é explicitamente por vingança dos dois olhos, e o texto conta que matou mais na morte do que em vida.",
    marcos: [
      "Sansão carrega as portas de Gaza para o alto do monte",
      "Dalila pergunta quatro vezes e ele cede",
      "'Não sabia que o Senhor se tinha retirado dele'",
      "Cego, é posto a moer no cárcere",
      "Derruba as colunas do templo de Dagom",
    ],
    chave: 20,
  },
  17: {
    resumo:
      "Um homem devolve prata roubada da mãe, e a família usa o dinheiro para fabricar um ídolo.",
    detalhe:
      "Começa o apêndice do livro, que não segue mais o ciclo dos juízes e serve para mostrar até onde tudo chegou. O absurdo é que todos se acham religiosos: a mãe consagra a prata ao Senhor e manda fazer uma imagem de escultura, e Mica monta um santuário caseiro e contrata um levita, concluindo que agora o Senhor lhe fará bem. A frase que fecha o capítulo aparece quatro vezes no fim do livro e é o diagnóstico final.",
    marcos: [
      "Mica confessa ter tomado a prata da mãe",
      "A prata é consagrada e vira imagem de escultura",
      "Ele monta um santuário e consagra um filho",
      "Um levita errante é contratado como sacerdote",
      "'Cada um fazia o que parecia reto aos seus olhos'",
    ],
    chave: 6,
  },
  18: {
    resumo: "Uma tribo inteira rouba o ídolo e o sacerdote, e o dono não pode fazer nada.",
    detalhe:
      "Os espias de Dã consultam o sacerdote de Mica sobre o caminho, recebem uma bênção fácil, e voltam com seiscentos homens armados. Levam a imagem e convidam o levita a trocar de patrão com um argumento puramente profissional, sobre ser melhor ser sacerdote de uma tribo do que da casa de um homem só. Ele aceita na hora. Mica corre atrás e é mandado calar a boca sob ameaça. A cidade de Laís é destruída por viver em paz e sem defesa.",
    marcos: [
      "Os espias de Dã passam pela casa de Mica",
      "Seiscentos homens levam a imagem e o éfode",
      "O levita troca de patrão por um posto maior",
      "Mica os persegue e é ameaçado",
      "Laís é destruída e a cidade recebe o nome de Dã",
    ],
    chave: 19,
  },
  19: {
    resumo:
      "O capítulo mais violento da Bíblia hebraica, e ninguém nele faz a coisa certa.",
    detalhe:
      "A história é construída para ecoar Sodoma, agora dentro de Israel, e o texto conta tudo sem julgar em voz alta, o que torna a leitura mais pesada. A hospitalidade excessiva do sogro atrasa a viagem, a escolha de Gibeá em vez de uma cidade estrangeira é justificada como mais segura, e o horror acontece lá. O levita entrega a concubina e no dia seguinte fala com ela como se nada tivesse acontecido. O que ele faz com o corpo é para forçar uma reação nacional.",
    marcos: [
      "Um levita vai buscar a concubina que o deixara",
      "Evitam pernoitar em Jebus por ser cidade estrangeira",
      "Um velho os acolhe em Gibeá",
      "A casa é cercada e a mulher é entregue",
      "O corpo é dividido e enviado a todo o território de Israel",
    ],
    chave: 30,
  },
  20: {
    resumo:
      "Todo o Israel se junta contra uma tribo só, e perde duas vezes antes de vencer.",
    detalhe:
      "É a única vez no livro em que o povo age unido, e é para uma guerra civil. Benjamim se recusa a entregar os culpados e prefere defender os próprios, o que transforma um crime local em extermínio de tribo. Israel consulta Deus e mesmo assim perde nos dois primeiros dias, com quarenta mil mortos, e o texto não explica. A vitória vem por emboscada, e no fim resta uma tribo quase inteiramente apagada.",
    marcos: [
      "O povo se reúne como um só homem em Mispá",
      "Benjamim se recusa a entregar os culpados",
      "Israel perde os dois primeiros dias de batalha",
      "A cidade de Gibeá é tomada por emboscada",
      "Restam seiscentos homens de Benjamim na rocha de Rimom",
    ],
    chave: 16,
  },
  21: {
    resumo:
      "Para consertar o que fizeram, cometem mais dois crimes, e o livro termina sem solução.",
    detalhe:
      "O problema é criado por um juramento precipitado de não dar filhas a Benjamim, e a solução encontrada é pior que o problema: destruir uma cidade que faltou à assembleia para tomar suas virgens, e depois orientar um rapto durante uma festa. Tudo é feito com aparência de legalidade e até com choro diante de Deus. A última frase do livro é a mesma do capítulo 17 e não oferece nenhuma esperança, apenas o diagnóstico.",
    marcos: [
      "O juramento de não dar filhas a Benjamim cria o impasse",
      "Jabes-Gileade é destruída por ter faltado à assembleia",
      "Quatrocentas jovens são poupadas e entregues",
      "O rapto durante a festa em Siló é orientado",
      "'Cada um fazia o que parecia reto aos seus olhos'",
    ],
    chave: 25,
  },
};

CAPITULOS["1sm"] = {
  1: {
    resumo:
      "Uma mulher reza mexendo os lábios sem som, e o sacerdote a confunde com bêbada.",
    detalhe:
      "Ana é amada pelo marido e provocada todos os anos pela outra esposa, e Elcana tenta consolar com uma frase bem masculina sobre valer mais que dez filhos. A oração dela é silenciosa, o que era incomum, e por isso Eli a julga errado. A resposta dela é firme sem ser agressiva, e o sacerdote muda de tom. O voto que ela faz entrega o filho de volta antes mesmo de tê-lo, e ela cumpre depois do desmame.",
    marcos: [
      "Ana é estéril e provocada por Penina",
      "Ela ora em silêncio, movendo apenas os lábios",
      "Eli a acusa de estar embriagada",
      "Ana faz o voto de entregar o filho ao Senhor",
      "Samuel nasce e é levado a Siló depois do desmame",
    ],
    chave: 27,
  },
  2: {
    resumo:
      "O cântico de Ana fala de tronos virados, e o capítulo mostra uma casa sacerdotal podre.",
    detalhe:
      "O poema dela não é sobre bebês, é sobre inversão de poder, com os fartos ficando sem pão e a estéril tendo sete filhos. Maria vai ecoar esse cântico séculos depois. O contraste com o resto do capítulo é brutal: os filhos de Eli tomam a carne à força antes da gordura ser queimada e abusam das mulheres que serviam à porta. Eli repreende fraco demais, e a sentença vem por um homem de Deus anônimo.",
    marcos: [
      "O cântico de Ana sobre a inversão dos poderosos",
      "Os filhos de Eli desprezam a oferta do Senhor",
      "Eli repreende sem tomar providência",
      "Samuel cresce servindo diante do Senhor",
      "Um homem de Deus anuncia o fim daquela casa",
    ],
    chave: 8,
  },
  3: {
    resumo:
      "Numa época em que a palavra era rara, um menino ouve o próprio nome três vezes de noite.",
    detalhe:
      "O texto diz que a palavra do Senhor era rara e não havia visão frequente, o que situa a cena. Samuel não reconhece a voz, e é Eli, já quase cego, quem percebe o que está acontecendo e o ensina a responder. A parte difícil vem depois: a primeira mensagem que o menino recebe é contra a casa de quem o criou. Ele tem medo de contar, e Eli o obriga, e então aceita a sentença com uma resignação que dá dó.",
    marcos: [
      "A palavra do Senhor era rara naqueles dias",
      "Samuel é chamado três vezes e corre até Eli",
      "'Fala, Senhor, porque o teu servo ouve'",
      "A mensagem é de juízo contra a casa de Eli",
      "Samuel é reconhecido como profeta em todo o Israel",
    ],
    chave: 10,
  },
  4: {
    resumo:
      "Levam a arca para a batalha como amuleto, perdem a arca, e a glória parte.",
    detalhe:
      "A ideia de buscar a arca depois de uma derrota é tratar o sagrado como ferramenta, e o texto mostra o resultado: gritaria, confiança e depois um massacre. Eli morre ao ouvir a notícia, e o narrador deixa claro que o que o derrubou não foi a morte dos filhos, foi a arca. A nora morre no parto e dá ao filho o nome que resume tudo, Icabode, que significa que a glória se foi. O capítulo inteiro é um desabamento.",
    marcos: [
      "Israel é derrotado e manda buscar a arca",
      "O acampamento grita e os filisteus se assustam",
      "A arca é tomada e os filhos de Eli morrem",
      "Eli cai para trás ao ouvir a notícia da arca",
      "A nora dá ao filho o nome Icabode",
    ],
    chave: 21,
  },
  5: {
    resumo:
      "A arca capturada é posta no templo de Dagom, e o deus dos vencedores cai de cara no chão.",
    detalhe:
      "É um capítulo de humor negro. Põem a arca como troféu ao lado do ídolo, e na manhã seguinte Dagom está prostrado diante dela. Levantam de novo, e no dia seguinte ele está quebrado, com cabeça e mãos decepadas na soleira. Nenhum israelita está presente para fazer nada: a disputa é entre Deus e o ídolo, sem intermediário. As cidades filisteias então passam a arca de mão em mão, cada uma querendo se livrar dela.",
    marcos: [
      "A arca é levada ao templo de Dagom em Asdode",
      "Dagom amanhece caído diante dela, duas vezes",
      "A segunda queda deixa cabeça e mãos quebradas",
      "Tumores atingem a população de Asdode",
      "As cidades filisteias tentam empurrar a arca umas às outras",
    ],
    chave: 4,
  },
  6: {
    resumo:
      "Um teste com duas vacas que nunca puxaram carro decide se aquilo foi coincidência.",
    detalhe:
      "Os sacerdotes filisteus montam um experimento honesto: atrelam duas vacas paridas, prendem os bezerros em casa, e soltam. Se forem contra o instinto e subirem rumo a Israel, é obra do Deus deles. As vacas vão mugindo, sem desviar. É um raciocínio cuidadoso vindo de fora do povo da aliança. O fim do capítulo é sombrio, com homens de Bete-Semes mortos por olharem dentro da arca, e a pergunta que fica é quem pode estar diante deste Deus.",
    marcos: [
      "A arca fica sete meses em território filisteu",
      "Os sacerdotes propõem o teste das duas vacas",
      "As vacas sobem mugindo, sem desviar",
      "Os de Bete-Semes se alegram e depois são feridos",
      "'Quem poderia estar em pé diante do Senhor?'",
    ],
    chave: 20,
  },
  7: {
    resumo:
      "Vinte anos depois, o povo se volta de verdade, e uma pedra é erguida com um nome.",
    detalhe:
      "Samuel não pede emoção, pede providência: se vocês voltam de todo o coração, tirem os deuses estrangeiros do meio de vocês. Só depois vem a reunião em Mispá, com jejum e confissão. Quando os filisteus atacam no meio da assembleia, quem peleja não é o exército. A pedra que Samuel levanta recebe o nome de Ebenézer, e o sentido da frase é sobre o passado: até aqui nos ajudou o Senhor.",
    marcos: [
      "Samuel exige que os deuses estrangeiros sejam removidos",
      "O povo se reúne em Mispá e confessa",
      "Os filisteus atacam durante a assembleia",
      "O Senhor troveja e os desbarata",
      "A pedra Ebenézer é erguida como memorial",
    ],
    chave: 12,
  },
  8: {
    resumo:
      "Os filhos de Samuel são corruptos, e o povo usa isso para pedir um rei como os outros.",
    detalhe:
      "O pedido tem uma justificativa verdadeira e um motivo verdadeiro, e eles não são o mesmo. A corrupção dos filhos é real, mas o que aparece duas vezes é a frase sobre ser como todas as nações. Samuel fica magoado, e Deus reenquadra: não é a ti que rejeitaram, é a mim. A descrição do que o rei fará é uma lista implacável de tomadas, com o verbo tomar repetido, e termina dizendo que um dia clamarão por causa dele.",
    marcos: [
      "Os filhos de Samuel se desviam atrás de suborno",
      "O povo pede um rei para ser como as outras nações",
      "'Não é a ti que rejeitaram, mas a mim'",
      "Samuel descreve tudo o que o rei tomará",
      "O povo insiste, e Deus manda atender",
    ],
    chave: 7,
  },
  9: {
    resumo: "Um rapaz sai atrás de jumentas perdidas e volta ungido rei.",
    detalhe:
      "A apresentação de Saul é toda física, sobre altura e aparência, o que já é um aviso depois do que o capítulo 16 vai dizer. A história é quase cômica: ele desiste da busca, é o criado quem lembra do vidente, e é a moça no caminho que dá as instruções completas. Deus havia revelado a Samuel no dia anterior. Quando Saul ouve que o desejo de Israel está sobre ele, responde falando da própria tribo pequena e da família insignificante.",
    marcos: [
      "As jumentas do pai de Saul se perdem",
      "O criado sugere consultar o vidente",
      "Deus avisa Samuel no dia anterior",
      "Saul é recebido com honra no banquete",
      "Ele alega ser da menor tribo e da menor família",
    ],
    chave: 21,
  },
  10: {
    resumo:
      "Ungido em particular, ele profetiza no caminho e depois se esconde na bagagem.",
    detalhe:
      "Os três sinais dados por Samuel se cumprem exatamente, e Saul tem o coração mudado e entra em êxtase profético, a ponto de surgir um ditado sobre ele estar entre os profetas. Mesmo assim, quando chega a hora da proclamação pública por sorteio, ele não está: encontram-no escondido entre a bagagem. Alguns filhos de Belial já duvidam dele no primeiro dia, e ele se cala, o que no começo é maturidade.",
    marcos: [
      "Samuel unge Saul em particular com um frasco de azeite",
      "Os três sinais do caminho se cumprem",
      "Saul profetiza e surge o ditado sobre ele",
      "No sorteio público, é achado escondido na bagagem",
      "Alguns o desprezam e ele se cala",
    ],
    chave: 22,
  },
  11: {
    resumo:
      "Uma ameaça de arrancar olhos faz o rei novo agir, e o reino é confirmado.",
    detalhe:
      "Naás propõe um tratado com a condição de furar o olho direito de todos, para humilhar Israel publicamente. Quando a notícia chega, Saul está arando, e o texto diz que o Espírito de Deus se apoderou dele e ele se irou muito. A convocação é feita com um gesto brutal e eficaz. Depois da vitória, alguns querem matar os que o desprezaram, e é Saul quem impede, dizendo que naquele dia ninguém morreria. É o melhor momento dele.",
    marcos: [
      "Naás exige furar o olho direito dos habitantes",
      "Saul está arando quando recebe a notícia",
      "O Espírito se apodera dele e ele convoca o povo",
      "Jabes-Gileade é libertada ao amanhecer",
      "Saul impede que matem os que o haviam desprezado",
    ],
    chave: 13,
  },
  12: {
    resumo:
      "Samuel se despede prestando contas, e pede uma trovoada no meio da colheita.",
    detalhe:
      "Antes de falar do povo, ele fala de si: de quem tomei boi, de quem tomei jumento, a quem oprimi. É uma auditoria pública voluntária, e o povo o absolve. Só então ele recapitula a história e chama o pedido de rei de maldade. A chuva fora de época serve de sinal, e o povo se apavora. O fecho é generoso, com a promessa de que ele continuará orando por eles, porque deixar de orar seria pecado seu.",
    marcos: [
      "Samuel presta contas da própria conduta",
      "Recapitula a história dos livramentos",
      "Pede trovões e chuva no tempo da sega do trigo",
      "O povo reconhece o pecado de ter pedido rei",
      "'Longe de mim que eu peque deixando de orar por vós'",
    ],
    chave: 23,
  },
  13: {
    resumo:
      "Sete dias de espera, o exército debandando, e um sacrifício que custa a dinastia.",
    detalhe:
      "A situação é de pânico: o povo se esconde em cavernas e poços, e os soldados vão sumindo. Saul espera os sete dias combinados e oferece o holocausto na última hora, e Samuel chega logo em seguida. A defesa dele é razoável e inteira feita de circunstâncias, e termina com a frase sobre se constranger. O fim do capítulo tem um detalhe militar devastador: não havia ferreiro em Israel, e só Saul e Jônatas tinham espada.",
    marcos: [
      "O povo se esconde em cavernas e cisternas",
      "Saul espera sete dias e oferece o holocausto",
      "Samuel chega e diz que o reino não permanecerá",
      "Não havia ferreiro em todo o Israel",
      "Só Saul e Jônatas tinham espada e lança",
    ],
    chave: 14,
  },
  14: {
    resumo:
      "Jônatas ataca uma guarnição com um escudeiro só, e o pai quase o mata por causa de mel.",
    detalhe:
      "A frase de Jônatas antes de subir é uma das mais bonitas do livro, sobre não haver limite para o Senhor salvar com muitos ou com poucos. O contraste com Saul é o tema do capítulo: enquanto o filho age, o pai consulta, conta tropas e hesita. O juramento que proíbe comer durante a batalha é vaidoso e atrapalha a perseguição, e o exausto povo acaba comendo carne com sangue. Quando a sorte aponta Jônatas, é o povo que o resgata da morte.",
    marcos: [
      "Jônatas sobe com o escudeiro contra a guarnição",
      "'Não é difícil ao Senhor salvar com muitos ou com poucos'",
      "Saul proíbe comer sob maldição durante a batalha",
      "Jônatas prova o mel sem saber do juramento",
      "O povo resgata Jônatas da morte",
    ],
    chave: 6,
  },
  15: {
    resumo:
      "Ordem de destruir tudo, ele poupa o melhor, e a desculpa é que era para sacrificar.",
    detalhe:
      "O capítulo é duro em dois sentidos: a ordem contra Amaleque é chocante, e vale ler lembrando de Êxodo 17 e do gênero de guerra santa do antigo Oriente; e a queda de Saul acontece não por crueldade, mas por obediência seletiva. Ele afirma três vezes ter cumprido, enquanto ovelhas balem ao fundo. A resposta de Samuel é uma das frases mais citadas do Antigo Testamento, colocando obedecer acima de sacrificar. Saul confessa, mas o pedido dele é para ser honrado diante do povo.",
    marcos: [
      "A ordem de destruir Amaleque por inteiro",
      "Saul poupa Agague e o melhor do gado",
      "Afirma ter cumprido a palavra do Senhor",
      "'O obedecer é melhor do que o sacrificar'",
      "Samuel mata Agague e não vê mais Saul até morrer",
    ],
    chave: 22,
  },
  16: {
    resumo:
      "Sete filhos passam diante do profeta e nenhum serve, porque o escolhido está com as ovelhas.",
    detalhe:
      "Samuel vai com medo e leva um disfarce, o que mostra o quanto Saul já era perigoso. Diante do irmão mais alto, ele se engana exatamente como o povo se enganou no capítulo 9, e ouve a correção que vira a frase do capítulo: o homem vê o exterior, o Senhor vê o coração. Davi nem é chamado para a cerimônia. A segunda metade do capítulo é cruel na ironia: o ungido entra no palácio para tocar harpa e acalmar o rei que ele vai substituir.",
    marcos: [
      "Samuel vai a Belém com medo de Saul",
      "Sete filhos de Jessé passam e nenhum é o escolhido",
      "'O homem vê o exterior, porém o Senhor vê o coração'",
      "Davi é buscado no pasto e ungido",
      "Ele entra no palácio para tocar harpa para Saul",
    ],
    chave: 7,
  },
  17: {
    resumo:
      "Quarenta dias de provocação, e quem responde é um menino que veio trazer queijos.",
    detalhe:
      "O texto gasta versículos descrevendo a armadura de Golias peça por peça, somando peso, e depois descreve Davi por negação: sem armadura, com um cajado e cinco pedras. A pergunta que Davi faz ao chegar é sobre a desonra, não sobre a recompensa, e o irmão mais velho o humilha na frente de todos. O discurso antes do combate é o centro: a batalha é do Senhor, e ele não salva com espada nem com lança.",
    marcos: [
      "Golias desafia Israel por quarenta dias",
      "Davi chega levando mantimento aos irmãos",
      "Eliabe o humilha diante dos soldados",
      "Ele recusa a armadura de Saul",
      "'A batalha é do Senhor, e ele vos entregará nas nossas mãos'",
    ],
    chave: 47,
  },
  18: {
    resumo:
      "Nasce a amizade mais forte da Bíblia, e junto com ela um ciúme que vira obsessão.",
    detalhe:
      "Jônatas tira o próprio manto, a espada e o arco e dá a Davi, e quem entende o simbolismo percebe que o herdeiro do trono está entregando os sinais dele. A música das mulheres, com mil para Saul e dez mil para Davi, é o estopim. O capítulo repete que Davi se conduzia com prudência em tudo, e que por isso Saul o temia ainda mais, o que é a lógica invertida da inveja: quanto melhor o outro age, pior fica.",
    marcos: [
      "A alma de Jônatas se liga à de Davi",
      "Jônatas lhe dá o manto, a espada e o arco",
      "As mulheres cantam mil e dez mil",
      "Saul arremessa a lança duas vezes",
      "O dote de Mical é cobrado em vidas filisteias",
    ],
    chave: 14,
  },
  19: {
    resumo:
      "Jônatas intercede e funciona por pouco tempo; depois é a esposa quem o desce pela janela.",
    detalhe:
      "Jônatas argumenta com o pai usando fatos, lembrando que Davi arriscou a vida e que Saul se alegrou com isso, e a reconciliação dura até a próxima vitória. A fuga pela janela e o boneco na cama são detalhes domésticos num capítulo de perseguição. O fim é quase cômico: os mensageiros enviados para prender Davi começam a profetizar, três levas seguidas, e por fim o próprio Saul vai e acaba caído o dia inteiro.",
    marcos: [
      "Jônatas convence o pai a não matar Davi",
      "Saul arremessa a lança de novo durante a harpa",
      "Mical desce Davi pela janela e põe um ídolo na cama",
      "Os mensageiros enviados começam a profetizar",
      "Saul vai pessoalmente e também profetiza",
    ],
    chave: 4,
  },
  20: {
    resumo:
      "Um plano com flechas para descobrir a verdade, e uma despedida chorada no campo.",
    detalhe:
      "Davi está incrédulo e Jônatas também, o que faz o teste ser proposto pelos dois. A cena da mesa vazia e da explosão de Saul contra o próprio filho mostra que o ódio já contamina tudo, inclusive o herdeiro. O sinal das flechas é executado com um menino que não entende nada, e é essa inocência que protege os dois. No fim eles se abraçam e choram, e o texto diz que Davi chorou mais.",
    marcos: [
      "Davi pergunta qual é o seu crime",
      "Combinam o teste da festa da lua nova",
      "Saul se enfurece contra Jônatas à mesa",
      "O sinal é dado com as flechas e o menino",
      "Os dois se despedem chorando no campo",
    ],
    chave: 42,
  },
  21: {
    resumo:
      "Fugindo com fome, ele mente a um sacerdote e depois finge loucura diante de um rei.",
    detalhe:
      "Davi chega a Nobe sem nada e inventa uma missão secreta do rei, e o sacerdote, sem saber, entrega os pães sagrados e a espada de Golias. Jesus vai citar esse episódio para discutir o sábado. A segunda parte é de uma humilhação total: o matador de Golias aparece na cidade de Golias, é reconhecido, e se salva babando na barba e riscando as portas. O Salmo 34 é tradicionalmente ligado a esse momento.",
    marcos: [
      "Davi chega a Nobe e mente sobre uma missão do rei",
      "Recebe os pães da proposição",
      "Doegue, o edomita, está ali e vê tudo",
      "Leva a espada de Golias",
      "Finge loucura diante de Aquis, em Gate",
    ],
    chave: 13,
  },
  22: {
    resumo:
      "Uma caverna vira quartel de endividados e descontentes, e uma cidade de sacerdotes é massacrada.",
    detalhe:
      "Os quatrocentos que se juntam a ele são descritos sem romantismo: angustiados, endividados, amargurados de espírito. É com isso que Davi começa. O outro lado do capítulo é o preço da mentira do capítulo anterior. Ninguém entre os servos de Saul aceita levantar a mão contra sacerdotes, e é Doegue quem executa oitenta e cinco deles e depois a cidade inteira. Davi assume a culpa diante de Abiatar, o único sobrevivente.",
    marcos: [
      "A caverna de Adulão reúne os angustiados e endividados",
      "Saul acusa os servos de conspirarem contra ele",
      "Doegue denuncia o que viu em Nobe",
      "Os guardas se recusam a matar sacerdotes",
      "Abiatar escapa, e Davi assume a responsabilidade",
    ],
    chave: 22,
  },
  23: {
    resumo:
      "Ele salva uma cidade que depois pretende entregá-lo, e escapa por muito pouco.",
    detalhe:
      "Davi consulta antes de agir, e os próprios homens dele discordam, o que o leva a consultar de novo. Depois de libertar Queila, ele pergunta diretamente se os moradores o entregarão, e a resposta é sim. Salvar alguém não garante lealdade. A perseguição termina num monte com Saul cercando de um lado e Davi do outro, e o que os separa é uma notícia de invasão filisteia. O lugar ganha o nome de Rocha das Divisões.",
    marcos: [
      "Davi consulta duas vezes antes de socorrer Queila",
      "Descobre que a cidade o entregaria",
      "Jônatas o encontra no deserto e fortalece sua mão",
      "Os zifeus avisam Saul do esconderijo",
      "Uma invasão filisteia interrompe o cerco",
    ],
    chave: 16,
  },
  24: {
    resumo:
      "Com o rei indefeso ao alcance da mão, ele corta apenas um pedaço do manto e se arrepende disso.",
    detalhe:
      "A ironia é que Saul entra justamente na caverna onde Davi está escondido. Os homens interpretam a oportunidade como a vontade de Deus, o que soa muito convincente, e Davi recusa. O detalhe que humaniza a cena é o coração dele bater forte depois de cortar a orla, por ter feito até isso. O diálogo do lado de fora tem Saul chorando e reconhecendo que Davi é mais justo, o que torna a perseguição seguinte ainda pior.",
    marcos: [
      "Saul entra sozinho na caverna onde Davi se esconde",
      "Os homens dizem que é a oportunidade dada por Deus",
      "Davi corta a orla do manto e se arrepende",
      "Mostra o pedaço de fora e chama Saul de pai",
      "Saul chora e reconhece que Davi é mais justo",
    ],
    chave: 6,
  },
  25: {
    resumo:
      "Um fazendeiro grosseiro quase provoca um massacre, e uma mulher impede tudo sozinha.",
    detalhe:
      "Nabal significa tolo, e o texto usa isso como personagem. Davi está a caminho de matar todo homem da casa quando Abigail o intercepta com comida e um discurso longo e cuidadoso, que basicamente o lembra de quem ele é e do que se arrependeria depois. Ele mesmo reconhece: bendita seja você, que me impediu de derramar sangue. É o único momento do livro em que Davi é salvo de si mesmo por outra pessoa.",
    marcos: [
      "Samuel morre e é pranteado por todo o Israel",
      "Nabal responde com desprezo ao pedido de Davi",
      "Davi manda cingir a espada para matar todos",
      "Abigail o intercepta e o faz mudar de ideia",
      "'Bendita seja a tua prudência, que hoje me impediu'",
    ],
    chave: 33,
  },
  26: {
    resumo:
      "A segunda chance de matar o rei, desta vez com a lança fincada ao lado da cabeça dele.",
    detalhe:
      "A cena repete a da caverna de propósito, para mostrar que a recusa de Davi não foi hesitação de momento. Abisai se oferece para resolver com um só golpe, e a resposta de Davi é a mesma sobre não estender a mão contra o ungido do Senhor. Ele prefere deixar o caso nas mãos de Deus ou do tempo. A conversa do alto do monte, com a cobrança a Abner por não ter guardado o rei, tem um tom de provocação quase esportiva.",
    marcos: [
      "Os zifeus denunciam Davi outra vez",
      "Davi e Abisai entram no acampamento adormecido",
      "Abisai pede para matar Saul com um só golpe",
      "Levam a lança e a bilha de água da cabeceira",
      "Davi cobra Abner do alto do monte",
    ],
    chave: 23,
  },
  27: {
    resumo:
      "Cansado de fugir, ele se refugia entre os inimigos e passa a mentir para sobreviver.",
    detalhe:
      "O capítulo começa com Davi pensando consigo mesmo, e não consultando, e a conclusão é de puro cansaço. Refugiado com os filisteus, ele recebe Ziclague e passa dezesseis meses fazendo incursões contra outros povos enquanto relata a Aquis que atacou Israel. Para a mentira não ser descoberta, não deixa sobreviventes. O texto conta isso sem nenhum comentário aprovador, e é um dos trechos mais sombrios da trajetória dele.",
    marcos: [
      "Davi conclui sozinho que um dia perecerá pela mão de Saul",
      "Refugia-se com Aquis, rei de Gate",
      "Recebe a cidade de Ziclague",
      "Ataca outros povos e relata ter atacado Israel",
      "Não deixa sobreviventes para a mentira não vazar",
    ],
    chave: 1,
  },
  28: {
    resumo:
      "Sem resposta do céu, o rei procura de noite a médium que ele mesmo havia expulsado.",
    detalhe:
      "O motivo é dito com clareza: Deus não lhe respondia nem por sonhos, nem por Urim, nem por profetas. Saul então recorre justamente ao que proibiu, disfarçado e de noite. A cena é incomum porque a médium se assusta de verdade com o que aparece, o que sugere que ela não esperava aquilo. A mensagem de Samuel não traz nada novo, apenas confirma e data. O detalhe mais humano vem no fim, quando a mulher insiste para o rei arrasado comer alguma coisa.",
    marcos: [
      "Deus não responde a Saul por nenhum meio",
      "Ele busca a médium de En-Dor disfarçado",
      "A mulher grita ao ver o que sobe",
      "A sentença é confirmada e datada para o dia seguinte",
      "A médium o obriga a comer antes de partir",
    ],
    chave: 6,
  },
  29: {
    resumo:
      "Os comandantes filisteus desconfiam de Davi e o mandam embora, e isso o salva.",
    detalhe:
      "Davi está prestes a marchar com os filisteus contra o próprio povo, e o texto deixa a ambiguidade no ar sem resolver o que ele faria. Quem o tira dessa é a desconfiança dos comandantes, que citam justamente a canção sobre os dez mil. Aquis defende Davi com elogios sinceros e sem saber de nada. A resposta de Davi soa como reclamação e é impossível saber se é alívio disfarçado, e o texto não ajuda.",
    marcos: [
      "Os exércitos se reúnem para a batalha",
      "Os príncipes filisteus desconfiam de Davi",
      "Citam a canção sobre os dez mil",
      "Aquis o defende sem saber de nada",
      "Davi é dispensado e volta antes do combate",
    ],
    chave: 6,
  },
  30: {
    resumo:
      "Voltando para casa, encontram tudo queimado, e os próprios homens falam em apedrejá-lo.",
    detalhe:
      "É o fundo do poço e a virada. Todos choram até não terem mais força, e Davi está em perigo dos próprios aliados, porque cada um está amargurado pelos filhos. A frase que muda tudo é curta: Davi se fortaleceu no Senhor seu Deus. Ele volta a consultar, coisa que não fazia desde o capítulo 23. No fim, define uma regra de repartição que vira estatuto: quem ficou com a bagagem recebe igual a quem desceu à batalha.",
    marcos: [
      "Ziclague é saqueada e queimada pelos amalequitas",
      "O povo fala em apedrejar Davi",
      "'Davi se fortaleceu no Senhor seu Deus'",
      "Um escravo egípcio abandonado indica o caminho",
      "Quem ficou com a bagagem recebe a mesma parte",
    ],
    chave: 6,
  },
  31: {
    resumo:
      "O rei ferido pede ao escudeiro que o mate, e termina caindo sobre a própria espada.",
    detalhe:
      "O fim é rápido e sem discurso. Os três filhos morrem, incluindo Jônatas, e o pedido de Saul ao escudeiro é para não ser escarnecido pelos incircuncisos. O corpo é pregado no muro de Bete-Seã, e quem o resgata são os homens de Jabes-Gileade, exatamente a cidade que ele salvou no capítulo 11, quarenta anos antes. Eles andam a noite toda para buscar os corpos. É o último gesto de gratidão que o livro registra.",
    marcos: [
      "Israel é derrotado no monte Gilboa",
      "Jônatas e os irmãos são mortos",
      "O escudeiro se recusa, e Saul cai sobre a espada",
      "Os corpos são pregados no muro de Bete-Seã",
      "Os homens de Jabes-Gileade andam a noite toda para resgatá-los",
    ],
    chave: 4,
  },
};

CAPITULOS["1rs"] = {
  1: {
    resumo:
      "Com o rei velho e sem reação, um filho se proclama sucessor e quase consegue.",
    detalhe:
      "O livro abre com Davi incapaz de se aquecer, uma imagem de fim. Adonias monta a própria coroação com carros, cavaleiros e um banquete, e o narrador dá a chave do personagem numa frase sobre o pai nunca o ter contrariado a vida inteira. A contra-ofensiva é articulada por Natã e executada por Bate-Seba, e o detalhe que decide tudo é o barulho: mandam tocar a trombeta, e a festa de Adonias ouve de longe e se desfaz.",
    marcos: [
      "Davi está velho e não se aquece",
      "Adonias se proclama rei com festa e convidados",
      "Natã e Bate-Seba articulam a reação",
      "Salomão é ungido em Giom, sobre a mula do rei",
      "A festa de Adonias se dispersa ao ouvir a trombeta",
    ],
    chave: 6,
  },
  2: {
    resumo:
      "As últimas palavras de Davi misturam conselho espiritual com uma lista de contas a acertar.",
    detalhe:
      "O contraste dentro do mesmo discurso é desconfortável e o texto não o resolve: primeiro anda nos caminhos do Senhor, guarda os estatutos, e logo depois instruções explícitas sobre Joabe e Simei. Salomão executa tudo, e o capítulo tem o tom de consolidação de poder que qualquer corte antiga reconheceria. Adonias cai por pedir Abisague, o que na lógica da época era reivindicar o trono, e Salomão entende exatamente assim.",
    marcos: [
      "Davi instrui Salomão a andar nos caminhos do Senhor",
      "Deixa pendências sobre Joabe e Simei",
      "Adonias pede Abisague e é executado",
      "Abiatar é destituído do sacerdócio",
      "Joabe é morto junto ao altar e Simei depois",
    ],
    chave: 3,
  },
  3: {
    resumo:
      "Podendo pedir qualquer coisa, ele pede discernimento, e logo precisa usá-lo.",
    detalhe:
      "O pedido é feito num sonho e o que o torna notável é o autorretrato: sou apenas um menino pequeno, não sei sair nem entrar. A expressão hebraica é literalmente coração que ouve. Deus aprova justamente pelo que ele não pediu, nem vida longa, nem riqueza, nem a morte dos inimigos. O caso das duas mães vem logo em seguida como demonstração prática, e o método é psicológico: a sentença absurda existe para revelar quem ama de verdade.",
    marcos: [
      "Salomão se casa com a filha do Faraó",
      "Deus aparece em sonho em Gibeão",
      "Ele pede um coração que ouça para julgar",
      "Deus concede também o que ele não pediu",
      "O caso das duas mulheres e da criança viva",
    ],
    chave: 9,
  },
  4: {
    resumo:
      "O organograma do reino, a fartura diária, e uma sabedoria que atravessa fronteiras.",
    detalhe:
      "É o retrato da época de ouro, com Judá e Israel descritos como areia do mar, comendo, bebendo e alegres. Cada um sentado debaixo da sua videira e da sua figueira vira uma imagem de paz que os profetas depois vão reaproveitar. O inventário diário da corte é enorme, e um leitor atento nota ali o custo que o capítulo 12 vai cobrar. A sabedoria de Salomão é descrita como conhecimento também de plantas e animais, não só de ditados.",
    marcos: [
      "Os oficiais e os doze intendentes do reino",
      "O provimento diário da casa do rei",
      "Judá e Israel vivem seguros, cada um sob sua videira",
      "Três mil provérbios e mil e cinco cânticos",
      "Vinham de todos os povos ouvir a sua sabedoria",
    ],
    chave: 25,
  },
  5: {
    resumo:
      "Um acordo comercial com Tiro troca trigo e azeite por cedro do Líbano.",
    detalhe:
      "Salomão explica a Hirão por que o pai não construiu: por causa das guerras em volta. Agora há descanso, e é isso que torna a obra possível. A logística é descrita com precisão, com as toras descendo amarradas em jangadas pela costa. O detalhe que o texto solta sem comentar é o tamanho da mão de obra convocada em Israel, trinta mil homens em turnos, e é dessa conta que nasce a revolta do capítulo 12.",
    marcos: [
      "Hirão de Tiro envia embaixadores a Salomão",
      "O acordo troca cedro por trigo e azeite",
      "As toras descem em jangadas pela costa",
      "Trinta mil homens são convocados em turnos",
      "Oitenta mil cortam pedra nas montanhas",
    ],
    chave: 4,
  },
  6: {
    resumo:
      "Sete anos de obra descritos pedra por pedra, com um recado no meio que muda a conversa.",
    detalhe:
      "A data de abertura é a única sincronia cronológica explícita do livro, ligando a construção ao êxodo. O detalhe mais bonito é técnico: as pedras eram lavradas na pedreira, de modo que não se ouvia martelo nem machado na casa durante a construção. E no meio das medidas o texto para e coloca a palavra do Senhor dizendo que o que importa não é o prédio, é andar nos estatutos, e que então ele habitaria no meio do povo.",
    marcos: [
      "A obra começa 480 anos depois do êxodo",
      "As pedras são preparadas na pedreira, sem ruído no lugar",
      "A palavra do Senhor interrompe as medidas",
      "O interior é revestido de cedro e ouro",
      "Dois querubins de oliveira no lugar santíssimo",
    ],
    chave: 12,
  },
  7: {
    resumo:
      "Treze anos para o próprio palácio, e um artesão de Tiro funde as peças de bronze.",
    detalhe:
      "O texto põe os números lado a lado sem comentar: sete anos para a casa do Senhor, treze para a casa do rei. Cabe ao leitor fazer a conta. A segunda metade descreve o trabalho de Hirão, filho de uma viúva israelita e de um pai de Tiro, cheio de sabedoria e entendimento para trabalhar o bronze. As duas colunas ganham nomes próprios, e o mar de bronze sobre doze bois é a peça mais impressionante do conjunto.",
    marcos: [
      "O palácio de Salomão leva treze anos",
      "Hirão de Tiro é trazido para o trabalho em bronze",
      "As colunas Jaquim e Boaz recebem nomes",
      "O mar de bronze é fundido sobre doze bois",
      "Os utensílios de ouro são postos no lugar",
    ],
    chave: 14,
  },
  8: {
    resumo:
      "A arca entra, a nuvem enche a casa, e a oração de dedicação prevê o exílio.",
    detalhe:
      "Quando a nuvem desce, os sacerdotes não conseguem ficar em pé para ministrar, repetindo o que aconteceu com Moisés em Êxodo 40. A oração de Salomão é longa e o seu eixo é uma pergunta desconcertante para quem acabou de gastar sete anos construindo: os céus não te podem conter, quanto menos esta casa. Ele lista situações de fracasso, incluindo derrota, seca e cativeiro, e em todas pede a mesma coisa, que Deus ouça e perdoe. Também pede pelo estrangeiro.",
    marcos: [
      "A arca é levada ao lugar santíssimo",
      "A nuvem impede os sacerdotes de ministrar",
      "'Os céus não te podem conter, quanto menos esta casa'",
      "A oração prevê derrota, seca e cativeiro",
      "Salomão pede que Deus ouça também o estrangeiro",
    ],
    chave: 27,
  },
  9: {
    resumo:
      "Deus responde à oração com uma condição, e o capítulo já mostra rachaduras no acordo.",
    detalhe:
      "A segunda aparição é uma resposta direta ao pedido, com uma promessa e um aviso simétricos: se andar como Davi andou, o trono permanece; se se desviarem, esta casa que eu santifiquei se tornará provérbio entre os povos. Logo depois o texto conta coisas menos nobres, com Salomão entregando vinte cidades a Hirão, que não gosta delas, e o trabalho forçado imposto aos povos restantes e, segundo a leitura mais direta, também a israelitas na prática.",
    marcos: [
      "O Senhor aparece a Salomão pela segunda vez",
      "A promessa vem com condição explícita",
      "Vinte cidades da Galileia são dadas a Hirão",
      "Hirão não gosta das cidades recebidas",
      "O trabalho forçado é organizado para as obras do rei",
    ],
    chave: 6,
  },
  10: {
    resumo: "A rainha de Sabá vem testar com enigmas e sai sem fôlego.",
    detalhe:
      "Ela chega com uma comitiva enorme e uma intenção declarada de provar, e o texto diz que Salomão respondeu a todas as suas perguntas. O que a impressiona não é só a sabedoria, é o conjunto, incluindo a mesa, os servidores e a escadaria. O fim do capítulo é uma enumeração de ouro, escudos e cavalos que soa gloriosa e é, na verdade, a lista exata das coisas que Deuteronômio 17 proibia a um rei de acumular.",
    marcos: [
      "A rainha de Sabá vem prová-lo com enigmas",
      "Salomão responde a todas as perguntas",
      "'Nem metade me foi dito'",
      "Seiscentos e sessenta e seis talentos de ouro por ano",
      "Carros e cavalos são importados do Egito",
    ],
    chave: 7,
  },
  11: {
    resumo:
      "O homem mais sábio do mundo termina construindo altares para os deuses das esposas.",
    detalhe:
      "O texto é direto sobre o mecanismo: quando já era velho, as mulheres lhe perverteram o coração. Não foi um ato, foi erosão. A frase mais triste é a comparação com o pai, dizendo que o coração dele não era de todo fiel como fora o de Davi. Os adversários aparecem um a um, e Aías rasga uma capa nova em doze pedaços diante de Jeroboão. Salomão tenta matá-lo, o que já é o comportamento do rei que ele nunca quis ser.",
    marcos: [
      "Salomão ama muitas mulheres estrangeiras",
      "Na velhice, elas desviam o seu coração",
      "Ele constrói altares a Quemos e a Moloque",
      "Adadeu, Rezom e Jeroboão se levantam",
      "Aías rasga a capa em doze pedaços diante de Jeroboão",
    ],
    chave: 4,
  },
  12: {
    resumo:
      "O novo rei ouve os jovens em vez dos velhos, e o reino se parte em duas nações.",
    detalhe:
      "O povo pede alívio da carga, o que é uma reclamação legítima construída ao longo de todos os capítulos anteriores. Roboão consulta os anciãos, que aconselham servir ao povo naquele dia para ser servido para sempre, e depois consulta os contemporâneos, que sugerem a resposta sobre o dedo mínimo. Ele escolhe a segunda, e o reino se parte. Jeroboão, do outro lado, comete um erro simétrico e funda um culto próprio com dois bezerros de ouro.",
    marcos: [
      "O povo pede alívio da carga imposta por Salomão",
      "Os anciãos aconselham servir ao povo",
      "Roboão responde com a ameaça do dedo mínimo",
      "Dez tribos se separam da casa de Davi",
      "Jeroboão ergue bezerros de ouro em Betel e Dã",
    ],
    chave: 7,
  },
  13: {
    resumo:
      "Um profeta entrega a mensagem certa e morre por acreditar numa mentira piedosa.",
    detalhe:
      "A primeira parte é impressionante: o altar se fende, a mão do rei seca e é restaurada. O homem de Deus recusa o convite do rei citando a ordem recebida. Mas aí um profeta velho mente dizendo que um anjo lhe falou, e ele volta atrás. A lição do capítulo é desconfortável e vale ler devagar: a instrução recebida de Deus não é revogada por uma alegação de revelação nova, ainda que venha de alguém religioso e mais velho.",
    marcos: [
      "Um homem de Deus profetiza contra o altar de Betel",
      "A mão de Jeroboão seca e é restaurada",
      "Ele recusa o convite do rei conforme a ordem recebida",
      "Um profeta velho mente sobre um anjo",
      "O leão o mata no caminho e fica ao lado do corpo",
    ],
    chave: 9,
  },
  14: {
    resumo:
      "Uma rainha se disfarça para consultar um profeta cego, e é reconhecida na porta.",
    detalhe:
      "Jeroboão manda a esposa disfarçada porque ainda acredita que aquele profeta funciona, mas não quer ser associado a ele. Aías está cego de velhice e a identifica antes de ela entrar, e a mensagem é a mais dura possível, incluindo a morte do menino assim que ela puser o pé na cidade. Do lado de Judá, Roboão também fracassa, e o Egito leva os escudos de ouro do templo, que são substituídos por escudos de bronze.",
    marcos: [
      "A mulher de Jeroboão se disfarça para consultar Aías",
      "O profeta cego a reconhece antes de ela entrar",
      "O menino morre quando ela chega à cidade",
      "Roboão faz o que é mau aos olhos do Senhor",
      "Sisaque leva os escudos de ouro, trocados por bronze",
    ],
    chave: 8,
  },
  15: {
    resumo:
      "Começa a alternância entre reis de Judá e de Israel, com um bom no meio de vários ruins.",
    detalhe:
      "O livro passa a costurar as duas linhagens, sempre comparando cada rei a Davi ou a Jeroboão. Asa é dos poucos elogiados, e o texto destaca dois gestos: tirar os ídolos e depor a própria avó da posição por causa de um ídolo abominável. A ressalva também é registrada, porque os altos não foram removidos. Do lado de Israel, a dinastia de Jeroboão é exterminada por Baasa, cumprindo a palavra de Aías.",
    marcos: [
      "Abias reina em Judá e segue os pecados do pai",
      "Asa faz o que é reto e remove os ídolos",
      "Depõe a própria avó por causa de um ídolo",
      "Os altos, porém, não são tirados",
      "Baasa extermina a casa de Jeroboão",
    ],
    chave: 11,
  },
  16: {
    resumo:
      "Golpes, incêndio de palácio e sete dias de reinado, até chegar o pior de todos.",
    detalhe:
      "É o capítulo mais instável do livro, com quatro dinastias em poucos anos. Zinri reina sete dias e, cercado, põe fogo no próprio palácio com ele dentro. Onri se estabelece e compra o monte de Samaria, fundando a capital. E então entra Acabe, de quem o texto diz que fez pior do que todos os que foram antes dele, e como se não bastasse casou com Jezabel e levantou um templo a Baal em Samaria.",
    marcos: [
      "Baasa é condenado pelo profeta Jeú",
      "Zinri reina sete dias e incendeia o palácio sobre si",
      "Onri compra o monte e funda Samaria",
      "Acabe faz pior do que todos os anteriores",
      "Casa com Jezabel e levanta um altar a Baal",
    ],
    chave: 33,
  },
  17: {
    resumo:
      "Um profeta aparece do nada, decreta seca, e sobrevive sendo alimentado por corvos e por uma viúva.",
    detalhe:
      "Elias entra em cena sem genealogia e sem chamado narrado, anunciando que não haveria chuva senão pela palavra dele. A seca é um ataque direto a Baal, que era exatamente o deus da chuva e da fertilidade. O sustento vem de formas humilhantes de propósito: aves impuras e uma viúva estrangeira em Sarepta, que é território de Jezabel. O fim do capítulo é a primeira ressurreição registrada na Bíblia, e a queixa de Elias a Deus é quase uma acusação.",
    marcos: [
      "Elias anuncia seca pela palavra do Senhor",
      "Os corvos o alimentam junto ao ribeiro de Querite",
      "A viúva de Sarepta divide o último punhado de farinha",
      "A farinha e o azeite não se acabam",
      "O filho da viúva morre e Elias o ressuscita",
    ],
    chave: 24,
  },
  18: {
    resumo:
      "Um duelo público no Carmelo entre Baal e o Senhor, decidido por qual deles responde com fogo.",
    detalhe:
      "A pergunta de Elias ao povo é a frase do capítulo, sobre ficar mancando entre dois pensamentos, e a reação deles é o silêncio. A zombaria durante a manhã dos profetas de Baal é ácida e proposital, sugerindo que o deus talvez esteja ocupado ou viajando. Elias ainda manda encharcar o altar três vezes. A oração dele é curta comparada às horas de gritaria do outro lado, e o pedido é que o povo saiba quem fez o coração deles voltar.",
    marcos: [
      "Obadias esconde cem profetas em cavernas",
      "'Até quando coxeareis entre dois pensamentos?'",
      "Os profetas de Baal clamam a manhã inteira",
      "Elias manda encharcar o altar três vezes",
      "O fogo cai, e depois vem a chuva",
    ],
    chave: 21,
  },
  19: {
    resumo:
      "Um dia depois da maior vitória, uma ameaça o faz fugir e pedir para morrer.",
    detalhe:
      "O capítulo é um dos retratos mais honestos de esgotamento na Bíblia. O que Deus faz primeiro não é corrigir teologia: manda dormir, e comer, duas vezes. Só depois vem a pergunta no Horebe. A sequência do vento, do terremoto e do fogo termina com a observação de que o Senhor não estava em nenhum deles, e o que vem é uma voz mansa e delicada. E a informação que corrige o sentimento de estar sozinho é numérica: sete mil.",
    marcos: [
      "Jezabel ameaça e Elias foge para o deserto",
      "Ele pede para morrer debaixo do zimbro",
      "O anjo o faz dormir e comer duas vezes",
      "Vento, terremoto e fogo, e o Senhor não estava neles",
      "Sete mil que não dobraram os joelhos a Baal",
    ],
    chave: 12,
  },
  20: {
    resumo:
      "Duas vitórias improváveis contra a Síria, e um rei que poupa quem não devia.",
    detalhe:
      "Ben-Hadade começa exigindo prata, ouro, mulheres e filhos, e Acabe cede, o que mostra o tipo de liderança em jogo. A vitória vem por profetas anônimos, e a segunda batalha responde a uma teologia dos sírios, que achavam que o Deus de Israel era deus dos montes e não dos vales. No fim, Acabe faz um pacto com o inimigo derrotado e chama de irmão, e é confrontado por um profeta disfarçado com uma parábola sobre um prisioneiro perdido.",
    marcos: [
      "Ben-Hadade cerca Samaria e faz exigências",
      "Um profeta anuncia vitória e ela acontece",
      "Os sírios concluem que é um deus dos montes",
      "Acabe poupa Ben-Hadade e faz pacto com ele",
      "Um profeta disfarçado o condena com uma parábola",
    ],
    chave: 28,
  },
  21: {
    resumo:
      "Um rei fica de mau humor por uma horta, e a esposa resolve com um processo forjado.",
    detalhe:
      "A recusa de Nabote não é teimosia, é lei: a herança da família não se vende, conforme Levítico. Acabe entende isso e apenas emburra, deitado com o rosto virado para a parede. Jezabel então usa o próprio sistema jurídico, com jejum, assembleia e duas testemunhas falsas, exatamente o número exigido pela lei. O crime é cometido em nome do direito. E quando Acabe se humilha ao ouvir a sentença, Deus adia o juízo, o que surpreende até Elias.",
    marcos: [
      "Nabote recusa vender a herança dos pais",
      "Acabe se deita com o rosto para a parede",
      "Jezabel convoca jejum e arranja falsas testemunhas",
      "Nabote é apedrejado e a vinha é tomada",
      "Acabe se humilha, e o juízo é adiado",
    ],
    chave: 3,
  },
  22: {
    resumo:
      "Quatrocentos profetas dizem sim, um diz não, e uma flecha atirada a esmo acerta o rei.",
    detalhe:
      "Josafá pede um profeta do Senhor porque desconfia do consenso, e Acabe responde que odeia Micaías porque ele nunca profetiza o bem. A primeira resposta de Micaías é irônica, repetindo o que todos disseram, e o rei percebe. A visão dos exércitos como ovelhas sem pastor é o veredito. Acabe tenta escapar do destino se disfarçando, e morre por uma flecha atirada sem pontaria, que entra entre as juntas da armadura.",
    marcos: [
      "Quatrocentos profetas garantem a vitória",
      "Josafá pede um profeta do Senhor",
      "Micaías é chamado e ironiza o consenso",
      "Acabe se disfarça para entrar na batalha",
      "Uma flecha atirada a esmo o fere entre as juntas",
    ],
    chave: 17,
  },
};

CAPITULOS["2rs"] = {
  1: {
    resumo:
      "Ferido numa queda, o rei manda consultar um deus estrangeiro, e a resposta vem de outro lugar.",
    detalhe:
      "A pergunta que Elias manda de volta é a do capítulo: acaso não há Deus em Israel, para irdes consultar Baal-Zebube. Os dois primeiros capitães chegam com ordem e são consumidos. O terceiro muda o tom completamente, ajoelha-se e pede pela própria vida e pela dos cinquenta, e é ele quem consegue. A diferença entre os três não está no cargo nem na missão, está em como se aproximam.",
    marcos: [
      "Acazias cai pela grade e manda consultar Baal-Zebube",
      "'Não há Deus em Israel?'",
      "Dois capitães de cinquenta são consumidos",
      "O terceiro se ajoelha e pede pela própria vida",
      "Elias desce com ele e repete a sentença ao rei",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "Elias sobe num redemoinho, e o discípulo recebe porção dobrada e um manto.",
    detalhe:
      "Três vezes Elias manda Eliseu ficar e três vezes ele recusa com juramento, o que faz da sucessão uma escolha insistente e não uma herança automática. O pedido de porção dobrada não é pedir o dobro de poder, é a linguagem da herança do primogênito. A cena final do capítulo, com os meninos zombando e os ursos, é das mais desconfortáveis da Bíblia, e vale lembrar que a zombaria era contra o profeta e contra o que acabara de acontecer.",
    marcos: [
      "Eliseu se recusa três vezes a deixar Elias",
      "As águas do Jordão se dividem com o manto",
      "Eliseu pede porção dobrada do espírito",
      "Um carro de fogo separa os dois e Elias sobe",
      "Eliseu recolhe o manto e volta sozinho",
    ],
    chave: 9,
  },
  3: {
    resumo:
      "Três exércitos ficam sem água no deserto, e a solução vem depois de um músico tocar.",
    detalhe:
      "Eliseu deixa claro que só atende por causa de Josafá, e antes de profetizar pede que tragam um tocador, e é enquanto o músico toca que a mão do Senhor vem sobre ele. A ordem é cavar valas num vale seco, sem vento e sem chuva, e a água chega de madrugada por outro caminho. O desfecho da batalha é sombrio e o texto o relata sem explicar, com o rei de Moabe sacrificando o próprio filho sobre o muro.",
    marcos: [
      "Moabe se rebela depois da morte de Acabe",
      "Os três exércitos ficam sem água",
      "Eliseu atende apenas por causa de Josafá",
      "Ele pede um músico antes de profetizar",
      "As valas se enchem de água ao amanhecer",
    ],
    chave: 15,
  },
  4: {
    resumo:
      "Quatro milagres domésticos: azeite, um filho prometido, veneno na panela e comida que rende.",
    detalhe:
      "O bloco mostra um profeta que age dentro de casas, não em cortes. A viúva vai perder os filhos para a escravidão por causa de dívida, e a solução usa o que ela já tem, uma botija de azeite, mais vasos emprestados. A sunamita é o caso mais desenvolvido, e o que chama atenção é a firmeza dela na crise, respondendo tudo vai bem enquanto carrega um filho morto no quarto de cima, e recusando soltar os pés do profeta.",
    marcos: [
      "O azeite da viúva enche todos os vasos emprestados",
      "A sunamita constrói um quarto para o profeta",
      "O filho prometido nasce e depois morre",
      "Ela vai buscar Eliseu e não aceita ser dispensada",
      "A panela envenenada é curada e cem homens são alimentados",
    ],
    chave: 26,
  },
  5: {
    resumo:
      "Um general poderoso é curado seguindo o conselho de uma escrava e de servos anônimos.",
    detalhe:
      "Tudo no capítulo acontece por gente sem nome. A menina israelita levada como escrava é quem sabe onde está a cura, e ela poderia ter se calado. Naamã se ofende com a simplicidade da ordem, porque esperava gesto e cerimônia, e são os servos dele que argumentam com bom senso. A recusa de Eliseu em aceitar presente é o oposto exato do que Geazi faz em seguida, e o capítulo fecha com a lepra mudando de dono.",
    marcos: [
      "Uma menina escrava indica o profeta de Israel",
      "Naamã se irrita com a ordem de lavar-se no Jordão",
      "Os servos o convencem a obedecer",
      "Eliseu recusa qualquer presente",
      "Geazi corre atrás do presente e contrai a lepra",
    ],
    chave: 13,
  },
  6: {
    resumo:
      "Um machado que flutua, um exército cegado, e um cerco que leva a cidade à fome extrema.",
    detalhe:
      "O episódio do ferro emprestado parece pequeno e é justamente o ponto, porque o profeta se importa com o prejuízo de um aprendiz. Depois vem a cena dos cavalos e carros de fogo, com a oração de Eliseu para que o servo tenha os olhos abertos, e a frase sobre serem mais os que estão conosco. O fim do capítulo despenca para o horror: durante o cerco de Samaria, uma mulher pede justiça ao rei num caso de canibalismo.",
    marcos: [
      "O ferro do machado emprestado flutua",
      "O rei da Síria descobre que o profeta ouve seus planos",
      "'Mais são os que estão conosco do que os que estão com eles'",
      "O exército é cegado e levado a Samaria, e depois alimentado",
      "O cerco leva a cidade à fome e ao canibalismo",
    ],
    chave: 16,
  },
  7: {
    resumo:
      "Quatro leprosos decidem que morrer tentando é melhor, e descobrem o acampamento vazio.",
    detalhe:
      "O raciocínio deles é puro cálculo de desesperados: se entrarmos na cidade, morremos de fome; se ficarmos aqui, morremos também. A descoberta é enorme, e o momento mais bonito é quando param no meio do saque e dizem que não estão fazendo o que é certo, porque é dia de boas novas e estão calados. O oficial que zombou da profecia morre pisado no portão, cumprindo exatamente a palavra de que veria com os olhos e não comeria.",
    marcos: [
      "Eliseu anuncia fartura para o dia seguinte",
      "Um oficial duvida e ouve a sentença",
      "Quatro leprosos decidem ir ao acampamento sírio",
      "Encontram tudo abandonado",
      "'Este dia é dia de boas novas, e nós nos calamos'",
    ],
    chave: 9,
  },
  8: {
    resumo:
      "A sunamita recupera as terras por coincidência, e um servo mata o próprio rei.",
    detalhe:
      "A primeira cena é quase um acaso costurado: ela chega ao rei exatamente enquanto Geazi contava a história dela, e recebe de volta tudo, inclusive as rendas dos anos ausentes. A segunda é sinistra. Eliseu encara Hazael até ele ficar constrangido, e então chora, porque sabe o que aquele homem fará. Hazael responde indignado sobre ser um cão para fazer algo assim, e no dia seguinte sufoca o rei com um pano molhado.",
    marcos: [
      "A sunamita volta da fome e recupera suas terras",
      "Eliseu vai a Damasco e encara Hazael",
      "O profeta chora prevendo o que ele fará",
      "Hazael sufoca Ben-Hadade e assume o trono",
      "Jorão e Acazias reinam em Judá, seguindo a casa de Acabe",
    ],
    chave: 13,
  },
  9: {
    resumo:
      "Um capitão é ungido às pressas e sai dirigindo furiosamente para derrubar uma dinastia.",
    detalhe:
      "A unção é feita num quarto, rápida, e o mensageiro sai correndo conforme a ordem. O detalhe que virou marca de Jeú está na fala do sentinela sobre o jeito de guiar, que parece o de um louco. A cena de Jezabel é construída com deliberação: ela se pinta, arruma a cabeça e o encara pela janela com uma provocação. O corpo cai e os cães fazem o resto, cumprindo a palavra de Elias no capítulo 21 de 1 Reis.",
    marcos: [
      "Um discípulo unge Jeú às pressas e foge",
      "O sentinela reconhece o modo furioso de guiar",
      "Jorão é morto e lançado no campo de Nabote",
      "Jezabel se pinta e o encara da janela",
      "É atirada pela janela e os cães a devoram",
    ],
    chave: 22,
  },
  10: {
    resumo:
      "A casa de Acabe é exterminada, o culto a Baal é destruído por uma armadilha, e nada muda de verdade.",
    detalhe:
      "Jeú é eficiente e implacável, e usa a política do medo com um monte de cabeças na porta da cidade. A emboscada no templo de Baal é montada com uma mentira religiosa, convocando uma grande festa e fechando as portas depois. O texto elogia a execução do encargo e imediatamente registra o limite: ele não se apartou dos bezerros de ouro de Betel e de Dã. Destruir o culto do vizinho foi mais fácil do que largar o próprio.",
    marcos: [
      "Os setenta filhos de Acabe são mortos",
      "Jeú convoca uma grande festa a Baal",
      "O templo é cercado e os adoradores mortos",
      "O templo vira latrina",
      "Ele não abandona os bezerros de Betel e de Dã",
    ],
    chave: 31,
  },
  11: {
    resumo:
      "Uma avó manda matar todos os herdeiros, e uma tia esconde um bebê por seis anos.",
    detalhe:
      "Atalia é a única mulher a reinar em Judá e chega ao trono eliminando a própria descendência. O que salva a linha de Davi é a ação de Jeoseba, que rouba o menino do meio dos condenados e o esconde no templo. Seis anos de silêncio, com uma criança crescendo escondida dentro da casa de Deus. A proclamação aos sete anos é organizada pelo sacerdote Joiada com guardas em posição, e Atalia grita traição quando já não há o que fazer.",
    marcos: [
      "Atalia manda matar toda a descendência real",
      "Jeoseba esconde Joás no templo",
      "O menino fica escondido seis anos",
      "Joiada o proclama rei aos sete anos",
      "Atalia grita traição e é executada fora do templo",
    ],
    chave: 2,
  },
  12: {
    resumo:
      "O rei manda consertar o templo, o dinheiro some no caminho, e ele muda o sistema.",
    detalhe:
      "É um capítulo sobre administração e sobre o que acontece quando um processo não funciona. Durante vinte e três anos os sacerdotes recebem o dinheiro e o templo continua sem reparo, e Joás os confronta diretamente. A solução é operacional e elegante: uma caixa com um furo na tampa ao lado do altar, e prestação de contas conjunta. O texto ainda registra que não se pedia conta aos homens que faziam a obra, porque procediam com fidelidade.",
    marcos: [
      "Joás faz o que é reto enquanto Joiada o instrui",
      "O templo segue sem reparo por vinte e três anos",
      "O rei confronta os sacerdotes",
      "Uma caixa com furo na tampa é posta ao lado do altar",
      "Os tesouros do templo são entregues a Hazael para evitar ataque",
    ],
    chave: 15,
  },
  13: {
    resumo:
      "Eliseu morre doente, e antes disso se irrita com um rei que bate poucas flechas no chão.",
    detalhe:
      "O capítulo mostra Israel reduzido a cinquenta cavaleiros e dez carros. A cena final de Eliseu é um teste que o rei não entende: ele manda atirar uma flecha pela janela e depois ferir o chão, e Joás bate três vezes e para. A irritação do profeta é por ele ter parado, não por ter errado. E há um epílogo curioso, com um morto lançado às pressas na sepultura de Eliseu e revivendo ao tocar os ossos dele.",
    marcos: [
      "Israel é reduzido a um exército mínimo",
      "Eliseu adoece da doença de que morreria",
      "A flecha do livramento é atirada pela janela",
      "Joás fere o chão três vezes e para",
      "Um morto revive ao tocar os ossos de Eliseu",
    ],
    chave: 19,
  },
  14: {
    resumo:
      "Uma vitória sobe à cabeça de um rei, que provoca o vizinho e leva um fora humilhante.",
    detalhe:
      "Amazias vence Edom e desafia Israel sem necessidade. A resposta vem em forma de fábula, com o cardo do Líbano pedindo a filha do cedro em casamento e sendo pisado por um animal que passa. O aviso é claro e ele não ouve. O resultado é derrota, muro de Jerusalém derrubado e templo saqueado. Do outro lado, Jeroboão II restaura fronteiras e dá a Israel uma prosperidade que os profetas Amós e Oseias vão denunciar por dentro.",
    marcos: [
      "Amazias executa os assassinos do pai, mas poupa os filhos deles",
      "Vence Edom e se enche de confiança",
      "Desafia Israel e recebe a fábula do cardo",
      "É derrotado e o muro de Jerusalém é derrubado",
      "Jeroboão II restaura as fronteiras de Israel",
    ],
    chave: 6,
  },
  15: {
    resumo:
      "Cinco reis em poucos anos no norte, quatro deles assassinados, e a Assíria aparece no horizonte.",
    detalhe:
      "O capítulo é uma sucessão de golpes: Zacarias, Salum, Menaém, Pecaías e Peca, com punhaladas dentro do palácio. Menaém compra a paz com Pul, rei da Assíria, taxando os ricos do reino, e é a primeira vez que o império entra no texto como potência a ser suborna. Em Judá, Azarias reina longamente e fica leproso, morando em casa separada. O norte já está em contagem regressiva e ainda não percebeu.",
    marcos: [
      "Azarias reina muito tempo e fica leproso",
      "Zacarias é morto em público depois de seis meses",
      "Menaém paga tributo a Pul, rei da Assíria",
      "A cobrança recai sobre os homens ricos",
      "Tiglate-Pileser começa a levar cativos do norte",
    ],
    chave: 19,
  },
  16: {
    resumo:
      "Um rei de Judá pede socorro à Assíria e volta de lá com a planta de um altar novo.",
    detalhe:
      "Acaz faz passar o próprio filho pelo fogo, prática que o texto liga explicitamente às abominações dos povos expulsos. Pressionado por Síria e Israel, ele compra a proteção assíria com a prata e o ouro do templo, o que resolve no curto prazo e submete Judá no longo. Em Damasco ele vê um altar de que gosta e manda copiar a planta, e o sacerdote Urias constrói antes de o rei voltar. O altar de bronze é deslocado para o lado.",
    marcos: [
      "Acaz faz passar o filho pelo fogo",
      "Síria e Israel o pressionam militarmente",
      "Ele paga a Tiglate-Pileser com o tesouro do templo",
      "Vê um altar em Damasco e manda copiar a planta",
      "O altar do Senhor é deslocado para o lado norte",
    ],
    chave: 3,
  },
  17: {
    resumo:
      "Samaria cai depois de três anos de cerco, e o narrador para tudo para explicar por quê.",
    detalhe:
      "A queda é contada em poucos versículos, e então o texto faz algo que não faz em nenhum outro lugar: interrompe a narrativa por dezenas de versículos para dar as razões. A lista é longa e o verbo mais usado é andar, andaram nos estatutos das nações, seguiram a vaidade e se tornaram vãos. Deus é descrito advertindo por profetas continuamente. O fim traz a repovoação com estrangeiros e um culto misturado, que é a origem da questão samaritana.",
    marcos: [
      "Oseias conspira com o Egito e para de pagar tributo",
      "Samaria é sitiada por três anos e cai",
      "Israel é levado para a Assíria",
      "O narrador interrompe tudo para explicar a causa",
      "Povos estrangeiros são trazidos e o culto vira mistura",
    ],
    chave: 13,
  },
  18: {
    resumo:
      "Um rei reformador faz tudo certo, e ainda assim o maior exército do mundo bate à porta.",
    detalhe:
      "Ezequias remove os altos, quebra as colunas e destrói até a serpente de bronze de Moisés, porque o povo a incensava. O texto diz que depois dele não houve outro igual entre os reis de Judá. Mesmo assim vem a invasão, o que impede qualquer leitura simples de causa e efeito. O discurso do Rabsaqué diante do muro é uma peça de guerra psicológica, feito de propósito em hebraico para o povo ouvir, e o povo obedece a ordem de não responder nada.",
    marcos: [
      "Ezequias remove os altos e quebra a serpente de bronze",
      "Ele paga tributo pesado a Senaqueribe",
      "O exército assírio sobe contra Jerusalém",
      "O Rabsaqué fala em hebraico para o povo do muro ouvir",
      "O povo se cala, conforme o mandado do rei",
    ],
    chave: 5,
  },
  19: {
    resumo:
      "O rei leva a carta ameaçadora ao templo e a estende diante de Deus, sem pedir nada primeiro.",
    detalhe:
      "O gesto de estender a carta é o centro do capítulo. A oração dele começa não pelo pedido, mas por quem Deus é, e reconhece com honestidade que os assírios de fato destruíram muitas nações, porque aqueles deuses eram obra de mãos. A resposta de Isaías é poética e contém a imagem do anzol no nariz. O desfecho é registrado em uma linha seca, com o exército encontrado morto ao amanhecer, e Senaqueribe é assassinado pelos próprios filhos.",
    marcos: [
      "Ezequias rasga as vestes e manda consultar Isaías",
      "A carta de ameaça é estendida diante do Senhor",
      "A oração começa reconhecendo quem Deus é",
      "Isaías responde com o sinal do que brotará sozinho",
      "O exército amanhece morto e Senaqueribe é assassinado em casa",
    ],
    chave: 15,
  },
  20: {
    resumo:
      "Ele ganha quinze anos de vida e usa parte deles para exibir o tesouro a visitantes de Babilônia.",
    detalhe:
      "O aviso de morte é direto, e a oração dele é chorada, virando o rosto para a parede. A resposta chega antes de Isaías sair do pátio do meio. O sinal da sombra voltando dez graus é dado a pedido dele, e ele escolhe o caminho mais difícil de propósito. A segunda parte é melancólica: ele mostra tudo aos babilônios e recebe a profecia do exílio, e a reação dele, sobre haver paz nos seus dias, é de um alívio que não olha para os filhos.",
    marcos: [
      "Ezequias adoece de morte e chora voltado para a parede",
      "Quinze anos lhe são acrescentados",
      "A sombra retrocede dez graus como sinal",
      "Ele mostra todo o tesouro aos enviados de Babilônia",
      "Isaías anuncia o exílio, e ele se conforta com a paz dos seus dias",
    ],
    chave: 5,
  },
  21: {
    resumo:
      "O filho do rei reformador desfaz tudo e vai muito além, com altares dentro do templo.",
    detalhe:
      "Manassés reina cinquenta e cinco anos, o mais longo de Judá, e o texto diz que ele fez os moradores errarem mais do que as nações que o Senhor destruíra. Ele reconstrói os altos, levanta altares a Baal dentro da casa do Senhor, faz passar o filho pelo fogo e pratica adivinhação. A frase mais grave é sobre encher Jerusalém de sangue inocente de um extremo a outro. É a partir dele que o livro passa a tratar o exílio como inevitável.",
    marcos: [
      "Manassés reconstrói os altos que o pai derrubou",
      "Levanta altares dentro do templo",
      "Faz passar o filho pelo fogo e pratica adivinhação",
      "Enche Jerusalém de sangue inocente",
      "Amom o sucede e é morto pelos próprios servos",
    ],
    chave: 16,
  },
  22: {
    resumo:
      "Durante uma reforma no templo, acham um livro esquecido, e o rei rasga as vestes ao ouvi-lo.",
    detalhe:
      "Josias tem oito anos ao assumir e dezesseis anos depois manda consertar o templo. O achado do livro é contado quase como nota administrativa, no meio da prestação de contas das obras. A reação dele é o que importa: ouve a leitura e rasga as vestes, porque entende de imediato a distância entre o que está escrito e o que o povo vive. A consulta é feita à profetisa Hulda, que responde com autoridade e sem rodeios, inclusive sobre o próprio rei.",
    marcos: [
      "Josias manda consertar o templo",
      "O livro da Lei é encontrado durante a obra",
      "Safã lê o livro diante do rei",
      "Josias rasga as vestes ao ouvir",
      "A profetisa Hulda é consultada e responde",
    ],
    chave: 13,
  },
  23: {
    resumo:
      "A reforma mais radical da Bíblia, e mesmo assim o rumo não muda.",
    detalhe:
      "Josias lê o livro em voz alta para todo o povo e então destrói metodicamente tudo, incluindo o altar de Betel, erguido no capítulo 12 de 1 Reis. A Páscoa que ele celebra é descrita como sem igual desde os dias dos juízes. E apesar de tudo isso, o texto diz que o Senhor não desistiu do ardor da sua ira por causa de Manassés. O rei morre de forma abrupta em Megido, e em poucos anos Judá cai.",
    marcos: [
      "O livro é lido diante de todo o povo",
      "Os objetos de Baal e Aserá são queimados no Cedrom",
      "O altar de Betel é destruído",
      "A Páscoa é celebrada como não havia desde os juízes",
      "Josias morre em Megido diante do Faraó Neco",
    ],
    chave: 25,
  },
  24: {
    resumo:
      "Babilônia cobra tributo, depois leva o rei, a elite e o tesouro, e deixa só os pobres.",
    detalhe:
      "A queda acontece em etapas, e cada rei tenta uma manobra que piora a situação. Joaquim se rebela e morre; Joaquin reina três meses e se entrega. A deportação é descrita por categorias sociais: príncipes, guerreiros, artífices e ferreiros, dez mil ao todo, e o texto encerra dizendo que não ficou ninguém senão o povo pobre da terra. Levar os ferreiros era estratégia militar, porque sem eles não se fabrica arma.",
    marcos: [
      "Joaquim se torna vassalo e depois se rebela",
      "Nabucodonosor sobe contra Jerusalém",
      "Joaquin se entrega depois de três meses",
      "Dez mil são levados, incluindo artífices e ferreiros",
      "Só o povo pobre da terra permanece",
    ],
    chave: 14,
  },
  25: {
    resumo:
      "Dois anos de cerco, o templo queimado, e um último parágrafo que deixa uma porta aberta.",
    detalhe:
      "O fim é contado com frieza de relatório: a fome, a brecha no muro, a fuga noturna, a captura na planície de Jericó. A cena de Zedequias é das mais cruéis do Antigo Testamento, com os filhos mortos diante dele e os olhos vazados em seguida, de modo que aquela é a última coisa que ele viu. O templo e as casas são queimados e as colunas de bronze são despedaçadas. E então, depois de tudo, o livro termina com Joaquin solto da prisão e comendo à mesa do rei, uma última linha de esperança mínima.",
    marcos: [
      "O cerco dura até não haver mais pão na cidade",
      "Zedequias foge e é capturado na planície de Jericó",
      "Os filhos são mortos diante dele e seus olhos vazados",
      "O templo, o palácio e as casas são queimados",
      "Joaquin é solto e come continuamente à mesa do rei",
    ],
    chave: 29,
  },
};

CAPITULOS.js = {
  1: {
    resumo:
      "Moisés morreu, e o sucessor recebe a mesma ordem três vezes: esforça-te e tem bom ânimo.",
    detalhe:
      "A repetição não é estilo, é diagnóstico: Josué estava com medo. Substituir Moisés era impossível, e Deus não promete que será fácil, promete presença, com a frase sobre não o deixar nem o desamparar. A instrução central não é militar, é sobre não deixar o livro da Lei se afastar da boca dele. E as duas tribos e meia que já tinham terra do outro lado do Jordão são cobradas a atravessar e lutar junto pelos irmãos.",
    marcos: [
      "Moisés morre e Josué recebe a incumbência",
      "'Esforça-te e tem bom ânimo' é dito três vezes",
      "A promessa é de presença, não de facilidade",
      "O livro da Lei deve ser meditado de dia e de noite",
      "As tribos do outro lado do Jordão se comprometem a atravessar",
    ],
    chave: 9,
  },
  2: {
    resumo:
      "Dois espias se escondem na casa de uma prostituta, e é ela quem faz a confissão de fé.",
    detalhe:
      "Raabe esconde os homens sob talos de linho e mente para as autoridades, e o texto não a repreende. O discurso dela é o mais teológico do capítulo: ela sabe do mar Vermelho, sabe dos reis amorreus, e conclui que o Senhor é Deus em cima no céu e embaixo na terra. Uma estrangeira, de profissão desprezada, enuncia o que Israel custa a crer. O cordão vermelho na janela é a garantia, e ela negocia pela família inteira.",
    marcos: [
      "Dois espias entram em Jericó e ficam na casa de Raabe",
      "Ela os esconde sob talos de linho",
      "Relata que o coração da cidade se derreteu de medo",
      "Confessa que o Senhor é Deus no céu e na terra",
      "O cordão vermelho na janela garante a família",
    ],
    chave: 11,
  },
  3: {
    resumo:
      "O rio está transbordando, e a ordem é os sacerdotes entrarem na água antes dela parar.",
    detalhe:
      "O detalhe que transforma a cena está no versículo 15: as águas só se separam depois que os pés dos sacerdotes tocam a beira. O texto ainda faz questão de dizer que era o tempo da colheita, quando o Jordão transbordava, ou seja, a pior época possível. A arca vai na frente, com distância marcada, porque o caminho era desconhecido. É a travessia que confirma Josué diante do povo, do mesmo modo que o mar confirmou Moisés.",
    marcos: [
      "A arca vai adiante, com dois mil côvados de distância",
      "Era o tempo da colheita e o rio transbordava",
      "As águas param quando os pés dos sacerdotes tocam a beira",
      "O povo atravessa em seco",
      "Josué é engrandecido aos olhos de todo o Israel",
    ],
    chave: 15,
  },
  4: {
    resumo:
      "Doze pedras tiradas do meio do rio viram um monumento para as perguntas dos filhos.",
    detalhe:
      "Um homem de cada tribo carrega uma pedra do leito seco até o acampamento. A razão é dita duas vezes e é pedagógica: quando os filhos perguntarem no futuro o que significam aquelas pedras, os pais contarão. A memória é construída de propósito, com objeto e com roteiro de resposta. Os sacerdotes são os últimos a sair da água, e o rio volta a transbordar assim que eles pisam na margem.",
    marcos: [
      "Doze homens tiram doze pedras do leito do rio",
      "As pedras são levantadas em Gilgal",
      "'Quando os vossos filhos perguntarem'",
      "Os sacerdotes saem por último e as águas voltam",
      "O povo teme a Josué como temera a Moisés",
    ],
    chave: 6,
  },
  5: {
    resumo:
      "Antes da primeira batalha, o exército é incapacitado de propósito, e o maná para.",
    detalhe:
      "A circuncisão de toda uma geração em território inimigo é uma decisão militarmente suicida, e o texto registra que ficaram no acampamento até sararem. A prioridade é a aliança, não a estratégia. Logo depois o maná cessa, porque passam a comer do produto da terra, e uma fase acaba. O fim do capítulo tem o encontro com o príncipe do exército do Senhor, cuja resposta à pergunta de Josué sobre estar de que lado é simplesmente não.",
    marcos: [
      "A geração nascida no deserto é circuncidada",
      "O opróbrio do Egito é removido em Gilgal",
      "A Páscoa é celebrada na terra",
      "O maná cessa no dia seguinte",
      "O príncipe do exército do Senhor responde 'não'",
    ],
    chave: 14,
  },
  6: {
    resumo:
      "Sete dias de marcha em silêncio ao redor da cidade, e então um grito derruba os muros.",
    detalhe:
      "A estratégia é humilhante para quem marcha e irritante para quem observa, e é exatamente o ponto: a cidade não cai por engenharia. A ordem de silêncio durante seis dias é a parte mais difícil. Jericó é posta sob anátema, com tudo destinado à destruição, e vale ler esse capítulo sabendo que a Bíblia trata essa prática como exceção ligada àquele momento, e não como regra. Raabe e sua casa são poupadas conforme o combinado.",
    marcos: [
      "Jericó está fechada e ninguém entra nem sai",
      "Seis dias de volta ao redor, em silêncio",
      "No sétimo dia, sete voltas e um grito",
      "Os muros caem e a cidade é destruída",
      "Raabe e sua família são poupadas",
    ],
    chave: 20,
  },
  7: {
    resumo:
      "Uma derrota inesperada revela que um homem escondeu despojo debaixo da própria tenda.",
    detalhe:
      "O capítulo começa dizendo que Israel prevaricou, no singular coletivo, e só depois nomeia Acã. A derrota em Ai é pequena em números e devastadora em moral. Josué se joga por terra e reclama, e a resposta de Deus é levantar-se, porque havia pecado a resolver. A confissão de Acã é uma sequência psicológica exata: vi, cobicei e tomei. O desfecho é severo e envolve a família inteira, no padrão de responsabilidade coletiva da época.",
    marcos: [
      "Israel é derrotado em Ai e o coração do povo se derrete",
      "Josué se prostra e reclama diante da arca",
      "'Levanta-te; por que estás prostrado?'",
      "A sorte aponta Acã",
      "Ele confessa: vi, cobicei e tomei",
    ],
    chave: 21,
  },
  8: {
    resumo:
      "Ai é tomada por emboscada, e logo depois a Lei inteira é lida diante do povo.",
    detalhe:
      "A segunda tentativa usa tática, com uma emboscada por trás da cidade e uma retirada fingida para atrair os defensores. Desta vez o despojo é permitido, o que faz o pecado de Acã parecer ainda mais desnecessário. O fim do capítulo é surpreendente para um relato militar: no meio da campanha, o exército para, constrói um altar de pedras não lavradas e ouve a leitura das bênçãos e maldições, com estrangeiros presentes junto do povo.",
    marcos: [
      "Uma emboscada é posta atrás da cidade",
      "A retirada fingida atrai os defensores para fora",
      "Ai é tomada e destruída",
      "Um altar de pedras brutas é erguido no monte Ebal",
      "A Lei é lida diante de todo o povo, inclusive os estrangeiros",
    ],
    chave: 35,
  },
  9: {
    resumo:
      "Um povo vizinho se disfarça de viajante distante, e Israel fecha acordo sem consultar.",
    detalhe:
      "A encenação é caprichada, com pão bolorento, odres rotos e sandálias gastas. A frase que condena tudo está no versículo 14: tomaram da provisão deles e não pediram conselho ao Senhor. Descobrem a fraude em três dias e ainda assim mantêm o juramento, o que diz muito sobre o peso da palavra dada. Os gibeonitas viram lenhadores e carregadores de água, e essa aliança vai gerar o capítulo seguinte inteiro.",
    marcos: [
      "Os gibeonitas se disfarçam de viajantes distantes",
      "Trazem pão bolorento e odres rotos como prova",
      "'Não pediram conselho ao Senhor'",
      "A fraude é descoberta três dias depois",
      "O juramento é mantido e eles se tornam servos",
    ],
    chave: 14,
  },
  10: {
    resumo:
      "Uma coalizão de cinco reis ataca Gibeom, e o dia é prolongado para a batalha terminar.",
    detalhe:
      "Israel marcha a noite inteira para socorrer um aliado conseguido por engano, o que já é um comentário sobre honrar compromissos. O texto diz que morreram mais pelas pedras de saraiva do que pela espada. O pedido de Josué para o sol parar é citado do Livro do Justo, um documento perdido, e o texto admite que não houve dia como aquele. O fim, com os cinco reis na caverna e os pés dos capitães sobre os pescoços, é um gesto de humilhação ritual da época.",
    marcos: [
      "Cinco reis atacam Gibeom pelo acordo com Israel",
      "Josué marcha a noite toda para socorrer",
      "Pedras de saraiva matam mais que a espada",
      "'Sol, detém-te em Gibeom'",
      "Os cinco reis são achados escondidos numa caverna",
    ],
    chave: 14,
  },
  11: {
    resumo:
      "A coalizão do norte é maior ainda, e a ordem inclui aleijar cavalos e queimar carros.",
    detalhe:
      "O inimigo é descrito como muito povo, em multidão como a areia da praia, com cavalos e carros em quantidade. A ordem sobre jarretar os cavalos e queimar os carros é estratégica e teológica: Israel não deveria incorporar a tecnologia militar do inimigo e passar a confiar nela. Hazor, a cabeça daqueles reinos, é a única cidade queimada. O capítulo fecha com um balanço de anos de guerra e a frase de que a terra repousou.",
    marcos: [
      "Jabim de Hazor reúne uma coalizão do norte",
      "O exército inimigo tem cavalos e carros em multidão",
      "Josué jarreta os cavalos e queima os carros",
      "Hazor é queimada por ser a cabeça daqueles reinos",
      "A terra repousa da guerra",
    ],
    chave: 6,
  },
  12: {
    resumo: "A lista dos reis derrotados, de um lado e do outro do Jordão.",
    detalhe:
      "É um inventário, e inventário tem função: encerra uma fase. Primeiro os dois reis vencidos ainda sob Moisés, depois os trinta e um vencidos sob Josué, listados um a um com o nome da cidade. Lido seguido, o capítulo soa monótono, e lido como registro de arquivo, é a prova documental de que a promessa feita a Abraão em Gênesis 12 saiu do papel. Cada nome ali era uma cidade fortificada.",
    marcos: [
      "Seom e Ogue, vencidos ainda no tempo de Moisés",
      "A herança dada a Rúben, Gade e meia tribo de Manassés",
      "A lista dos reis vencidos a oeste do Jordão",
      "Trinta e um reis ao todo",
    ],
    chave: 24,
  },
  13: {
    resumo:
      "Josué está velho, e o próprio Deus diz que ainda falta muitíssima terra a possuir.",
    detalhe:
      "É uma frase incômoda logo depois da lista de vitórias, e é honesta: a conquista não terminou. A partir daqui o livro muda de gênero e vira documento de repartição, com fronteiras descritas por acidentes geográficos. Uma nota se repete e importa: a Levi não se deu herança, porque as ofertas do Senhor são a sua herança. A tribo sacerdotal fica sem território de propósito, espalhada entre as outras.",
    marcos: [
      "'Já és velho e ainda fica muitíssima terra para possuir'",
      "As áreas ainda não tomadas são listadas",
      "A herança das tribos a leste do Jordão",
      "Balaão é lembrado entre os mortos",
      "A Levi não se dá herança de terra",
    ],
    chave: 1,
  },
  14: {
    resumo:
      "Aos oitenta e cinco anos, Calebe pede a montanha mais difícil em vez de terra fácil.",
    detalhe:
      "Ele cobra uma promessa feita quarenta e cinco anos antes, quando voltou da espionagem com um relatório minoritário. O texto repete três vezes que ele perseverou em seguir o Senhor. O detalhe que define o personagem está no pedido: ele sabe que ali estão os anaquins e as cidades grandes e fortificadas, e é justamente por isso que quer aquele lugar. A frase dele sobre estar tão forte quanto no dia em que foi enviado é de quem não se aposentou.",
    marcos: [
      "A terra é repartida por sorte entre as tribos",
      "Calebe cobra a promessa feita há quarenta e cinco anos",
      "Ele tem oitenta e cinco anos e se diz tão forte quanto antes",
      "Pede o monte onde estão os anaquins",
      "Hebrom lhe é dada por herança",
    ],
    chave: 12,
  },
  15: {
    resumo: "O território de Judá descrito em detalhe, e uma filha que pede mais.",
    detalhe:
      "O capítulo é fronteira e lista de cidades, e no meio dele entra uma cena curta e viva. Acsa, filha de Calebe, recebe terra no Neguebe, que é seca, e vai ao pai pedir também as fontes de água, argumentando que de que serve um campo do sul sem água. Ela recebe as fontes de cima e as de baixo. No fim há uma nota honesta sobre os jebuseus, que Judá não conseguiu expulsar de Jerusalém, e que ficaram morando ali.",
    marcos: [
      "As fronteiras de Judá são descritas",
      "Calebe expulsa os três filhos de Anaque",
      "Acsa pede e recebe as fontes de água",
      "A longa lista de cidades do território",
      "Os jebuseus permanecem em Jerusalém",
    ],
    chave: 19,
  },
  16: {
    resumo: "O território de Efraim, e uma frase de rodapé sobre quem não foi expulso.",
    detalhe:
      "É um capítulo curto de fronteiras, e o que vale reter está no último versículo, que diz que não expulsaram os cananeus que habitavam em Gezer, e que eles ficaram no meio de Efraim servindo sob tributo. A mesma nota aparece em outras tribos, e é ela que o livro de Juízes vai transformar em problema central. O acordo prático de hoje é a crise religiosa da geração seguinte.",
    marcos: [
      "O limite dos filhos de José é traçado",
      "A herança de Efraim por suas famílias",
      "Cidades separadas dentro do território de Manassés",
      "Os cananeus de Gezer não são expulsos",
    ],
    chave: 10,
  },
  17: {
    resumo:
      "Cinco irmãs cobram a herança que lhes foi prometida, e a tribo reclama do tamanho do lote.",
    detalhe:
      "As filhas de Zelofeade aparecem diante do sacerdote e de Josué lembrando o que o Senhor ordenara a Moisés, e recebem herança entre os irmãos do pai. É um precedente jurídico registrado no meio de um mapa. Logo depois, a tribo de José reclama de ter recebido pouco sendo povo numeroso, e a resposta de Josué é prática e um pouco irônica: se são tão numerosos, subam ao bosque e desmatem, e expulsem os cananeus com carros de ferro.",
    marcos: [
      "As filhas de Zelofeade cobram a herança prometida",
      "Recebem terra entre os irmãos do pai",
      "A tribo de José reclama do tamanho do lote",
      "Josué manda desmatar o bosque",
      "Os cananeus com carros de ferro não são expulsos",
    ],
    chave: 4,
  },
  18: {
    resumo:
      "Sete tribos ainda não tomaram posse, e Josué pergunta até quando vão adiar.",
    detalhe:
      "A pergunta do versículo 3 é o coração do capítulo: até quando sereis remissos em passardes para possuir a terra. A promessa está dada, o mapa está aberto, e o que falta é ir. A solução administrativa é enviar três homens de cada tribo para percorrer o território e descrevê-lo num livro, dividido em sete partes. A repartição é então feita por sorte diante do Senhor em Siló, onde a tenda da congregação foi armada.",
    marcos: [
      "A tenda da congregação é armada em Siló",
      "'Até quando sereis remissos em possuir a terra?'",
      "Vinte e um homens percorrem e descrevem a terra",
      "O território é dividido em sete partes num livro",
      "A sorte é lançada diante do Senhor",
    ],
    chave: 3,
  },
  19: {
    resumo:
      "As últimas tribos recebem seus limites, e o líder é o último a pegar a própria parte.",
    detalhe:
      "Simeão recebe dentro do território de Judá, porque a parte de Judá era grande demais para eles. Zebulom, Issacar, Aser, Naftali e Dã recebem os seus limites, e há uma nota sobre Dã perder terreno e ir tomar Lesém no norte, o que prepara o episódio de Juízes 18. O detalhe que fecha o capítulo é de caráter: Josué recebe a herança dele por último, depois de todo o povo, e é uma cidade que ele mesmo pede.",
    marcos: [
      "Simeão recebe dentro do território de Judá",
      "Zebulom, Issacar, Aser e Naftali recebem seus limites",
      "Dã perde terreno e sobe contra Lesém",
      "Josué recebe a sua herança por último",
      "Ele pede Timnate-Sera e a reedifica",
    ],
    chave: 49,
  },
  20: {
    resumo:
      "Seis cidades são separadas para proteger quem matou sem intenção de quem vem vingar.",
    detalhe:
      "O instituto é uma limitação à vingança de sangue, que era o costume da época: o parente próximo tinha o direito de perseguir. A cidade de refúgio interrompe isso com um processo, porque o acusado fica à porta e expõe a causa diante dos anciãos antes de ser acolhido. O critério é a intenção, com a expressão sobre ferir por engano e sem querer. Três cidades de cada lado do Jordão, distribuídas para ninguém ficar longe demais.",
    marcos: [
      "As cidades de refúgio são designadas",
      "O acusado expõe a causa aos anciãos na porta",
      "O critério é ter ferido por engano e sem intenção",
      "Ele fica protegido até o julgamento",
      "Seis cidades, três de cada lado do Jordão",
    ],
    chave: 3,
  },
  21: {
    resumo:
      "Os levitas recebem quarenta e oito cidades espalhadas, e o livro declara tudo cumprido.",
    detalhe:
      "A tribo sem território recebe cidades dentro das outras, o que a coloca em contato com todo o povo, que era exatamente a função dela. O capítulo termina com três frases de fechamento que soam como um carimbo: nenhuma boa palavra falhou de tudo o que o Senhor falara, tudo se cumpriu. Vale ler isso ao lado do capítulo 13, que dizia faltar muitíssima terra, e segurar as duas afirmações juntas sem escolher uma.",
    marcos: [
      "Os levitas pedem as cidades prometidas",
      "Quarenta e oito cidades com seus arredores",
      "Distribuídas dentro dos territórios das outras tribos",
      "O Senhor lhes dá descanso em redor",
      "'Nenhuma boa palavra falhou de tudo o que o Senhor falara'",
    ],
    chave: 45,
  },
  22: {
    resumo:
      "Um altar construído na fronteira quase causa guerra civil, até alguém perguntar o motivo.",
    detalhe:
      "As tribos do leste voltam para casa e levantam um altar imponente junto ao Jordão. As outras se armam para a guerra na hora. O que evita o desastre é uma delegação que vai perguntar antes de atacar, e a resposta muda tudo: o altar não é para sacrifício, é testemunho, para que no futuro os filhos do outro lado não digam que eles não têm parte no Senhor. O medo deles era de exclusão, não de idolatria.",
    marcos: [
      "As tribos do leste são dispensadas e voltam para casa",
      "Levantam um grande altar junto ao Jordão",
      "As demais tribos se reúnem para a guerra",
      "Uma delegação vai perguntar antes de atacar",
      "O altar era testemunho, não lugar de sacrifício",
    ],
    chave: 27,
  },
  23: {
    resumo:
      "Velho, ele reúne os líderes e avisa contra a mistura com os povos que ficaram.",
    detalhe:
      "O discurso alterna promessa e advertência com a mesma intensidade. Ele lembra que um só homem perseguiria mil, porque é o Senhor quem peleja, e imediatamente adverte sobre casamentos e alianças com os povos restantes, usando a imagem de laços, açoites nos lados e espinhos nos olhos. A frase mais dura é simétrica: assim como todas as boas palavras se cumpriram, também as más se cumprirão se abandonarem a aliança.",
    marcos: [
      "Josué, já velho, reúne os anciãos e juízes",
      "Lembra que um só perseguirá mil",
      "Adverte contra alianças e casamentos com os povos restantes",
      "A imagem dos espinhos nos olhos",
      "As más palavras se cumprirão como as boas se cumpriram",
    ],
    chave: 14,
  },
  24: {
    resumo:
      "Em Siquém, ele reconta a história desde Abraão e força uma escolha em voz alta.",
    detalhe:
      "O discurso é quase todo em primeira pessoa de Deus, e o verbo dominante é eu tomei, eu enviei, eu dei. Só depois vem o imperativo. Josué faz algo estranho quando o povo responde que servirá ao Senhor: ele diz que não poderão, porque Deus é santo e zeloso. A insistência é para que ninguém decida por impulso. Eles reafirmam, e uma pedra grande é posta debaixo do carvalho como testemunha, porque ela ouviu tudo.",
    marcos: [
      "Josué reconta a história desde o pai de Abraão",
      "'Escolhei hoje a quem sirvais'",
      "'Eu e a minha casa serviremos ao Senhor'",
      "Josué diz que eles não poderão servir a Deus",
      "Uma pedra é posta como testemunha sob o carvalho",
    ],
    chave: 15,
  },
};

CAPITULOS.jl = {
  1: {
    resumo:
      "Uma praga de gafanhotos devasta tudo, e o profeta manda todo mundo parar e lamentar.",
    detalhe:
      "O livro começa com uma pergunta aos anciãos sobre se já viram algo assim, e a resposta implícita é não. A descrição é em camadas, com quatro nomes de gafanhoto comendo o que o anterior deixou. Joel convoca grupo por grupo: os bêbados, porque o vinho acabou, os lavradores, os sacerdotes. A catástrofe agrícola vira crise de culto, porque sem cereal e sem vinho não há oferta, e a casa de Deus fica sem o que oferecer.",
    marcos: [
      "O que um gafanhoto deixou, outro comeu",
      "Os bêbados são chamados a chorar pelo vinho que acabou",
      "A oferta de cereais e a libação faltam na casa de Deus",
      "Os lavradores se envergonham e a alegria seca",
      "Convocação de jejum e assembleia solene",
    ],
    chave: 14,
  },
  2: {
    resumo:
      "O exército de gafanhotos vira imagem do dia do Senhor, e o pedido é rasgar o coração.",
    detalhe:
      "A descrição militar é aterradora e proposital, com fileiras que não se desviam do caminho. No meio do horror vem a virada do livro, com o convite para voltar de todo o coração, e a observação de que rasgar vestes é gesto fácil demais. O argumento é o caráter de Deus, citando a fórmula de Êxodo 34. A promessa do derramamento do Espírito sobre toda a carne, incluindo filhos, filhas, velhos, moços e servos, é a que Pedro cita em Pentecostes.",
    marcos: [
      "O dia do Senhor é descrito como exército invencível",
      "'Rasgai o vosso coração, e não as vossas vestes'",
      "Deus é lembrado como misericordioso e tardio em irar-se",
      "A promessa de restituir os anos que o gafanhoto comeu",
      "O Espírito derramado sobre toda a carne",
    ],
    chave: 13,
  },
  3: {
    resumo:
      "As nações são chamadas a juízo, e a imagem final é de um vale cheio de gente decidindo.",
    detalhe:
      "A acusação contra as nações é concreta, sobre dividir a terra e vender meninos e meninas por prostituta e por vinho. A ordem de forjar espadas de enxadas inverte de propósito a profecia de Isaías e Miqueias, como convocação de guerra. A expressão vale da decisão dá nome ao capítulo e é ambígua no hebraico, porque a decisão é a de Deus, não a da multidão. O fecho é de restauração, com montes destilando mosto e um Deus habitando em Sião.",
    marcos: [
      "As nações são reunidas no vale de Josafá",
      "A acusação por venderem meninos e meninas",
      "'Forjai espadas das vossas enxadas'",
      "Multidões no vale da decisão",
      "Os montes destilarão mosto e o Senhor habitará em Sião",
    ],
    chave: 14,
  },
};

CAPITULOS.ob = {
  1: {
    resumo:
      "Vinte e um versículos contra um povo irmão que assistiu de camarote à tragédia do outro.",
    detalhe:
      "É o livro mais curto do Antigo Testamento e tem um alvo só: Edom, descendente de Esaú, irmão de Jacó. A acusação não é de ter atacado, é de ter ficado olhando, e de ter entrado pela porta no dia da calamidade, e de ter se postado nas encruzilhadas para entregar os fugitivos. A soberba de quem mora nas fendas das rochas é o pecado nomeado. O princípio final vale para além de Edom: como fizeste, assim se fará contigo.",
    marcos: [
      "A soberba de quem habita nas fendas das rochas",
      "Edom assistiu no dia da desgraça do irmão",
      "Entrou pela porta e se postou nas encruzilhadas",
      "'Como fizeste, assim se fará contigo'",
      "O reino será do Senhor",
    ],
    chave: 15,
  },
};

CAPITULOS.na = {
  1: {
    resumo:
      "Antes de anunciar a queda de Nínive, o profeta descreve quem é o Deus que a derruba.",
    detalhe:
      "O capítulo abre com uma tensão que não se resolve: o Senhor é zeloso e vingador, e é tardio em irar-se, e de maneira alguma terá por inocente o culpado. As duas coisas ficam juntas. No meio das imagens de tempestade entra um versículo de abrigo, dizendo que o Senhor é bom e uma fortaleza no dia da angústia, e que conhece os que nele confiam. Cento e cinquenta anos antes, Jonas tinha visto a mesma cidade se arrepender.",
    marcos: [
      "O Senhor é zeloso, vingador e tardio em irar-se",
      "A natureza inteira treme diante dele",
      "'O Senhor é bom, e fortaleza no dia da angústia'",
      "Ele conhece os que nele confiam",
      "O jugo será quebrado de sobre Judá",
    ],
    chave: 7,
  },
  2: {
    resumo: "A queda da cidade narrada como se o profeta assistisse ao assalto em tempo real.",
    detalhe:
      "É poesia de câmera rápida, com escudos vermelhos, carros com tochas correndo pelas ruas e portas dos rios abertas. As frases são curtas e entrecortadas de propósito, imitando o pânico. A imagem final é a do covil dos leões, uma referência direta à propaganda assíria, que usava o leão como símbolo imperial e enchia os palácios de relevos de caçadas. O profeta pergunta onde foi parar o covil, e a resposta é o silêncio.",
    marcos: [
      "Os escudos vermelhos e os carros de fogo nas ruas",
      "As portas dos rios se abrem e o palácio se dissolve",
      "A cidade é saqueada, vazia e devastada",
      "'Onde está o covil dos leões?'",
      "A multidão de despojos não tem fim",
    ],
    chave: 11,
  },
  3: {
    resumo:
      "Ai da cidade de sangue, comparada a outra capital que também se julgava invencível.",
    detalhe:
      "A acusação inclui crueldade e comércio predatório, com a cidade descrita como prostituta que vendia nações por suas feitiçarias. O argumento mais forte é histórico: Nínive é comparada a Nô-Amom, a Tebas egípcia, que também tinha rios por muralha e caiu mesmo assim. O fim é uma pergunta retórica sobre quem não se alegraria com a notícia, que revela quanto sofrimento aquele império espalhou pela região.",
    marcos: [
      "Ai da cidade ensanguentada, cheia de mentira e rapina",
      "A comparação com Nô-Amom, que também caiu",
      "Os teus mercadores se multiplicaram como gafanhotos",
      "A ferida é incurável",
      "Todos que ouvirem a notícia baterão palmas",
    ],
    chave: 19,
  },
};

CAPITULOS.hc = {
  1: {
    resumo:
      "O profeta reclama da injustiça, recebe resposta, e a resposta o deixa pior do que antes.",
    detalhe:
      "É o único livro profético construído como diálogo, e a primeira fala é uma queixa sem meias palavras: até quando clamarei e não me ouvirás. A resposta de Deus é que ele está levantando os caldeus, e aí vem a segunda queixa, mais difícil, sobre usar um povo pior para punir um menos mau. A pergunta do versículo 13, sobre olhos que são puros demais para verem o mal, é uma das mais honestas da Bíblia.",
    marcos: [
      "'Até quando clamarei e não me ouvirás?'",
      "A lei se afrouxa e o juízo nunca sai",
      "Deus responde que levanta os caldeus",
      "'Por que toleras os que procedem perfidamente?'",
      "A imagem do pescador que adora a própria rede",
    ],
    chave: 13,
  },
  2: {
    resumo:
      "Ele decide subir à guarita e esperar a resposta, e recebe uma frase que atravessa a Bíblia.",
    detalhe:
      "O gesto de se pôr de atalaia e esperar é o coração do livro: ele não desiste da pergunta nem para de acreditar. A ordem é escrever a visão em tábuas e de forma legível, para quem a lê correr. O versículo 4, sobre o justo viver pela sua fé, é citado em Romanos, Gálatas e Hebreus, e foi um dos textos centrais da Reforma. Depois vêm cinco ais contra a ganância, a violência e a idolatria, e o capítulo fecha com um mandamento de silêncio.",
    marcos: [
      "O profeta sobe à guarita para esperar a resposta",
      "'Escreve a visão e torna-a bem legível'",
      "'O justo viverá pela sua fé'",
      "Cinco ais contra o que ajunta o que não é seu",
      "'Cale-se diante dele toda a terra'",
    ],
    chave: 4,
  },
  3: {
    resumo:
      "Uma oração em forma de salmo, que termina decidindo alegrar-se mesmo se nada der certo.",
    detalhe:
      "O capítulo tem anotações musicais e era cantado. O pedido é para que Deus renove a sua obra no meio dos anos, e no meio da ira se lembre da misericórdia. A descrição da teofania é violenta e cósmica, com montes se esfarelando. O fecho é a passagem mais conhecida do livro e não é otimismo: ele lista a figueira sem flor, a vinha sem fruto, o rebanho vazio, e então diz que ainda assim se alegrará. É alegria escolhida dentro da perda, não apesar de não haver perda.",
    marcos: [
      "'No meio dos anos, aviva a tua obra'",
      "'Na ira, lembra-te da misericórdia'",
      "A teofania sacode montes e rios",
      "Ainda que a figueira não floresça e falte o rebanho",
      "'Todavia, eu me alegrarei no Senhor'",
    ],
    chave: 18,
  },
};

CAPITULOS.sf = {
  1: {
    resumo:
      "O dia do Senhor é anunciado como uma varredura, e ninguém escapa alegando indiferença.",
    detalhe:
      "A linguagem de abertura ecoa a criação ao contrário, removendo homem, animal, ave e peixe. A acusação atinge tanto quem adora outros deuses quanto quem tenta os dois ao mesmo tempo, jurando pelo Senhor e por Malcã. O alvo mais incômodo é o do versículo 12, sobre os que estão assentados sobre as suas fezes, dizendo no coração que o Senhor não faz bem nem mal. É a descrição da apatia religiosa, e ela é tratada como pecado.",
    marcos: [
      "Anúncio de uma varredura completa sobre a terra",
      "Os que juram pelo Senhor e também por Malcã",
      "Deus esquadrinhará Jerusalém com lanternas",
      "'O Senhor não faz bem nem faz mal'",
      "O grande dia do Senhor está perto e se apressa",
    ],
    chave: 12,
  },
  2: {
    resumo:
      "Um convite a buscar antes que passe o tempo, e então os vizinhos entram na conta.",
    detalhe:
      "O apelo é dirigido aos mansos da terra, e o que ele pede é justiça e mansidão, com a frase condicional sobre talvez serem escondidos no dia da ira. Não há garantia automática, e o talvez é do texto. Depois vêm os oráculos contra Filístia, Moabe, Amom, Etiópia e Assíria, e a acusação contra Moabe e Amom é especificamente de terem ultrajado e se engrandecido contra o povo. A soberba de Nínive é citada na frase sobre não haver outra além dela.",
    marcos: [
      "'Buscai ao Senhor, vós todos os mansos da terra'",
      "'Porventura, sereis escondidos no dia da ira'",
      "Oráculos contra Filístia, Moabe e Amom",
      "A acusação é de ultraje e engrandecimento",
      "Nínive dizia no coração: eu sou, e não há outra",
    ],
    chave: 3,
  },
  3: {
    resumo:
      "A denúncia chega à própria cidade santa, e o livro termina com Deus cantando de alegria.",
    detalhe:
      "A crítica interna é a mais dura: príncipes como leões, juízes como lobos à tarde, profetas levianos e sacerdotes que profanam o santuário. E no meio deles, diz o texto, o Senhor é justo. A virada final é uma das mais surpreendentes do Antigo Testamento. Depois de tudo, Deus é descrito se alegrando sobre o povo com júbilo, silenciando por amor e exultando com cântico. É Deus cantando por causa de gente, e não o contrário.",
    marcos: [
      "Ai da cidade rebelde e opressora",
      "Príncipes como leões e juízes como lobos",
      "Um povo humilde e pobre será deixado no meio dela",
      "'O Senhor teu Deus está no meio de ti'",
      "'Ele se regozijará em ti com júbilo, exultará com cântico'",
    ],
    chave: 17,
  },
};

CAPITULOS.ag = {
  1: {
    resumo:
      "O povo diz que não é hora de reconstruir o templo, e ouve para olhar as próprias casas.",
    detalhe:
      "A desculpa é de cronograma, dizendo que ainda não chegou o tempo. A resposta é uma pergunta comparativa sobre eles morarem em casas apaineladas enquanto a casa de Deus está deserta. A expressão que se repete é considerai os vossos caminhos, e o diagnóstico é econômico: semeiam muito e colhem pouco, e quem recebe salário o põe num saco furado. Notável é o resultado, porque o povo de fato obedece, e em vinte e três dias a obra recomeça.",
    marcos: [
      "'Não veio o tempo de reedificar a casa do Senhor'",
      "'É tempo de habitardes em casas apaineladas?'",
      "'Considerai os vossos caminhos'",
      "O salário é posto num saco furado",
      "O povo obedece e a obra recomeça",
    ],
    chave: 7,
  },
  2: {
    resumo:
      "Os velhos choram lembrando do templo antigo, e a promessa é de uma glória maior.",
    detalhe:
      "A pergunta é direta aos que viram o primeiro templo, e reconhece que este parece nada aos olhos deles. A resposta não nega a comparação, apenas redireciona: esforçai-vos, porque eu sou convosco. A lição com os sacerdotes é sutil e prática, mostrando que a santidade não se transmite por contato, mas a impureza sim, o que é um recado sobre a ilusão de que o prédio pronto resolveria tudo. O fecho é a promessa pessoal a Zorobabel.",
    marcos: [
      "Os que viram o primeiro templo acham este como nada",
      "'Esforçai-vos, porque eu sou convosco'",
      "A pergunta aos sacerdotes sobre contágio e santidade",
      "A glória desta casa será maior que a da primeira",
      "Zorobabel é chamado de anel de selar",
    ],
    chave: 9,
  },
};

CAPITULOS.ml = {
  1: {
    resumo:
      "Deus diz que ama, o povo pergunta em quê, e a conversa segue nesse tom até o fim do livro.",
    detalhe:
      "O livro inteiro é construído como disputa, com Deus afirmando, o povo contestando com uma pergunta, e Deus respondendo com evidência. A primeira acusação concreta é sobre o culto: trazem animais cegos, coxos e doentes para o altar. O argumento é de uma praticidade constrangedora, mandando que ofereçam aquilo ao governador para ver se ele aceita. O cansaço aparece na frase deles sobre que canseira é isto.",
    marcos: [
      "'Eu vos tenho amado', e a resposta é 'em que nos amaste?'",
      "Oferecem animais cegos, coxos e doentes",
      "'Apresenta-o ao teu governador'",
      "'Que canseira é esta!'",
      "Entre as nações o nome do Senhor é grande",
    ],
    chave: 8,
  },
  2: {
    resumo:
      "Os sacerdotes falharam em ensinar, e o povo falhou em honrar o casamento.",
    detalhe:
      "A descrição do que um sacerdote deveria ser é uma das mais bonitas do Antigo Testamento, com a lei da verdade na boca e a função de mensageiro do Senhor dos Exércitos. Por isso a queixa dói: eles fizeram tropeçar a muitos. A segunda metade trata do divórcio por conveniência, e o argumento é que o Senhor foi testemunha entre o homem e a esposa da sua mocidade. A frase sobre aborrecer o repúdio é dita junto com a de guardar o espírito.",
    marcos: [
      "A aliança com Levi é lembrada",
      "'Os lábios do sacerdote guardam o conhecimento'",
      "Eles fizeram tropeçar a muitos na lei",
      "'O Senhor foi testemunha entre ti e a mulher da tua mocidade'",
      "'Guardai-vos, pois, no vosso espírito'",
    ],
    chave: 7,
  },
  3: {
    resumo:
      "Um mensageiro prepara o caminho, e a discussão desce para a parte financeira.",
    detalhe:
      "A imagem do refinador sentado é técnica e precisa, porque o ourives fica ao lado do metal observando até ver o próprio reflexo. A acusação de roubar a Deus nos dízimos vem com um desafio raro, porque é a única vez em que Deus convida a serem provados. O fim do capítulo tem uma imagem discreta e forte: um livro de memórias escrito diante dele para os que temiam ao Senhor e falavam uns com os outros.",
    marcos: [
      "O mensageiro prepara o caminho diante do Senhor",
      "Ele se assentará como refinador de prata",
      "'Roubará o homem a Deus?'",
      "'Provai-me nisto, diz o Senhor dos Exércitos'",
      "Um livro de memórias é escrito diante dele",
    ],
    chave: 10,
  },
  4: {
    resumo:
      "O Antigo Testamento se encerra com um dia que queima e um sol que traz cura nas asas.",
    detalhe:
      "As duas imagens do capítulo são opostas e simultâneas, o forno e o sol. Para quem teme o nome, a mesma luz que destrói é a que cura, e a cena dos bezerros soltos da estrebaria é de pura liberdade. A ordem final é lembrar da lei de Moisés, e a promessa é o envio de Elias antes do dia grande. O último versículo da Bíblia hebraica em ordem cristã fala de converter o coração dos pais aos filhos e dos filhos aos pais.",
    marcos: [
      "O dia que virá ardendo como forno",
      "'O sol da justiça, trazendo salvação nas suas asas'",
      "Sairão saltando como bezerros soltos da estrebaria",
      "Lembrai-vos da lei de Moisés",
      "Elias virá converter o coração dos pais aos filhos",
    ],
    chave: 2,
  },
};

CAPITULOS.am = {
  1: {
    resumo:
      "Um criador de gado começa denunciando os vizinhos, e a plateia aplaude sem desconfiar.",
    detalhe:
      "A estrutura é uma armadilha retórica. Amós abre com oráculos contra Damasco, Gaza, Tiro e Edom, todos inimigos, e cada um com a mesma fórmula sobre três transgressões e por causa da quarta. O público de Israel concordaria com cada palavra. As acusações são de crimes de guerra concretos, como levar povos inteiros ao cativeiro e romper o pacto de irmandade, e não de erro religioso, o que já mostra o critério pelo qual ele vai julgar depois.",
    marcos: [
      "O Senhor ruge desde Sião",
      "Damasco trilhou Gileade com trilhos de ferro",
      "Gaza levou todo um povo cativo",
      "Tiro rompeu o pacto de irmandade",
      "Edom perseguiu o irmão a fio de espada",
    ],
    chave: 2,
  },
  2: {
    resumo: "A volta se fecha sobre Judá e depois sobre Israel, e o oráculo fica longo.",
    detalhe:
      "Depois de rodear o mapa, ele chega em casa. O oráculo contra Israel é muito maior que os outros, e as acusações mudam de natureza: não são crimes de guerra, são vender o justo por dinheiro e o necessitado por um par de sapatos, e pisar a cabeça dos pobres. O detalhe mais ácido é o do manto penhorado servindo de tapete ao lado de qualquer altar, ou seja, a injustiça acontece dentro do culto, não fora dele.",
    marcos: [
      "Moabe queimou os ossos do rei de Edom",
      "Judá rejeitou a lei do Senhor",
      "Israel vende o justo por dinheiro",
      "O necessitado é vendido por um par de sapatos",
      "Deitam-se sobre roupas empenhadas junto ao altar",
    ],
    chave: 6,
  },
  3: {
    resumo:
      "Uma sequência de perguntas óbvias leva a uma conclusão nada óbvia sobre privilégio.",
    detalhe:
      "A frase mais dura do capítulo é sobre eleição: de todas as famílias da terra só a vocês conheci, por isso vos punirei. Ser escolhido aumenta a responsabilidade em vez de dar imunidade, e essa é a tese do livro. Em seguida vem a série de perguntas retóricas sobre causas e efeitos, terminando com a do leão que ruge porque tem presa. A imagem final é cruel e realista: o pastor resgata da boca do leão duas pernas ou um pedaço de orelha.",
    marcos: [
      "'Só a vós vos conheci, por isso vos punirei'",
      "'Andarão dois juntos, se não estiverem de acordo?'",
      "O leão ruge porque tem presa",
      "Deus revela o seu segredo aos profetas",
      "Do rebanho sobram duas pernas ou um pedaço de orelha",
    ],
    chave: 2,
  },
  4: {
    resumo:
      "Ele chama as senhoras da elite de vacas de Basã, e lista castigos que não adiantaram nada.",
    detalhe:
      "A provocação é direta e endereçada a quem oprime os pobres e pede bebida ao marido. Depois vem uma ironia amarga, convidando o povo a ir a Betel e transgredir, e a multiplicar as ofertas, porque é disso que eles gostam. A segunda metade do capítulo é uma lista de calamidades, cada uma terminando com o mesmo refrão sobre não terem voltado. Cinco vezes a mesma frase, batendo como um martelo, até o aviso final para se prepararem para o encontro.",
    marcos: [
      "As vacas de Basã que oprimem os pobres",
      "'Vinde a Betel e transgredi'",
      "Fome, seca, ferrugem, praga e espada",
      "Cinco vezes: 'e não vos convertestes a mim'",
      "'Prepara-te para te encontrares com o teu Deus'",
    ],
    chave: 12,
  },
  5: {
    resumo:
      "Uma lamentação pelo povo ainda vivo, com o convite mais simples do livro no meio.",
    detalhe:
      "Amós canta o funeral de Israel antes de ele morrer, o que é uma forma de choque. No centro do capítulo aparece três vezes o mesmo convite, buscai ao Senhor e vivei, e o que segue explica o que isso significa na prática: odiar o mal e amar o bem, e estabelecer o juízo na porta, que era onde se julgavam as causas. O fim contém a rejeição mais forte do culto em toda a Bíblia, com Deus dizendo que odeia as festas e não suporta a música.",
    marcos: [
      "Uma lamentação cantada sobre o povo ainda vivo",
      "'Buscai-me e vivei'",
      "Odiai o mal, amai o bem e estabelecei o juízo na porta",
      "'Aborreço, desprezo as vossas festas'",
      "'Corra o juízo como as águas, e a justiça como ribeiro perene'",
    ],
    chave: 24,
  },
  6: {
    resumo:
      "Ai dos que vivem confortáveis em camas de marfim e não se afligem com a ruína do povo.",
    detalhe:
      "O retrato da elite é detalhado e quase jornalístico: camas de marfim, cordeiros escolhidos, instrumentos inventados como Davi, vinho em taças e os melhores unguentos. O problema não é nenhuma dessas coisas isoladamente, e sim a frase que fecha a lista, sobre não se afligirem pela ruína de José. O pecado nomeado é a indiferença anestesiada pelo conforto. O fim usa uma imagem de absurdo, perguntando se cavalos correm sobre rochas.",
    marcos: [
      "Ai dos que vivem confiados em Sião",
      "Camas de marfim e cordeiros escolhidos",
      "Cantam ao som do saltério e inventam instrumentos",
      "Não se afligem pela ruína de José",
      "Transformam o juízo em fel e o fruto da justiça em alosna",
    ],
    chave: 6,
  },
  7: {
    resumo:
      "Três visões, duas interrompidas por intercessão, e um sacerdote mandando o profeta embora.",
    detalhe:
      "Nas duas primeiras visões, Amós intercede com um argumento de fragilidade, perguntando como Jacó subsistirá sendo pequeno, e Deus desiste. Na terceira, do prumo, não há intercessão possível, porque o prumo apenas mostra o que já está torto. O confronto com Amazias é político: ele acusa o profeta de conspiração e manda que vá ganhar o pão em Judá. A resposta de Amós é de alguém que não escolheu a profissão, dizendo que era boieiro e cultivador de sicômoros.",
    marcos: [
      "A visão dos gafanhotos e a intercessão",
      "A visão do fogo e a segunda intercessão",
      "O prumo no meio do povo",
      "Amazias acusa Amós de conspiração",
      "'Eu não era profeta, nem filho de profeta'",
    ],
    chave: 14,
  },
  8: {
    resumo:
      "Um cesto de frutas de verão vira trocadilho com o fim, e vem a fome de ouvir a palavra.",
    detalhe:
      "A visão funciona por som: a palavra hebraica para fruta madura é quase idêntica à palavra para fim. O retrato dos comerciantes é implacável e moderno, com gente contando os dias de festa religiosa para poder voltar a vender, diminuindo a medida, aumentando o preço e falsificando a balança. A ameaça final não é de guerra nem de seca, é de silêncio: uma fome de ouvir as palavras do Senhor, com gente correndo de mar a mar sem achar.",
    marcos: [
      "O cesto de frutas de verão anuncia o fim",
      "'Quando passará a Festa da Lua Nova, para vendermos?'",
      "Diminuem o efa e aumentam o siclo",
      "Compram o pobre por dinheiro e o necessitado por sapatos",
      "Fome de ouvir as palavras do Senhor",
    ],
    chave: 11,
  },
  9: {
    resumo:
      "Não há esconderijo possível, e depois do juízo o livro termina replantando o que derrubou.",
    detalhe:
      "A primeira metade é uma lista de fugas impossíveis, do inferno ao céu, do Carmelo ao fundo do mar. No meio há um versículo desconcertante, em que Deus compara Israel aos etíopes e lembra que também tirou os filisteus de Caftor e os sírios de Quir, relativizando o orgulho da eleição. E então o tom vira: a tenda caída de Davi é levantada, e a imagem final é agrícola, com o que ara alcançando o que ceifa, e montes destilando mosto.",
    marcos: [
      "Ninguém escapa, nem no inferno nem no céu",
      "'Não me sois como os filhos dos etíopes?'",
      "A casa de Israel é peneirada entre as nações",
      "A tenda caída de Davi é levantada",
      "O que ara alcançará o que ceifa",
    ],
    chave: 13,
  },
};

CAPITULOS.mq = {
  1: {
    resumo:
      "Deus desce e os montes se derretem, e o profeta anda descalço fazendo trocadilhos de luto.",
    detalhe:
      "A acusação é contra as duas capitais, e ela identifica o pecado com o próprio centro do poder, perguntando qual é a transgressão de Jacó, e respondendo que é Samaria. A parte final é intraduzível em português e vale saber: Miqueias faz uma série de jogos de palavras com nomes de cidades, cada um soando como o desastre que a espera. Ele mesmo diz que andará despojado e nu, uivando como chacais, o que é performance de luto.",
    marcos: [
      "O Senhor desce e os montes se derretem",
      "A transgressão de Jacó é Samaria",
      "O profeta anda despojado e nu, uivando",
      "A ferida chega até Judá e a porta de Jerusalém",
      "Trocadilhos de luto com os nomes das cidades",
    ],
    chave: 5,
  },
  2: {
    resumo:
      "Gente que planeja o mal na cama e executa de manhã, porque tem poder para isso.",
    detalhe:
      "A descrição é psicologicamente precisa: eles não agem por impulso, planejam de noite e executam ao amanhecer porque está no poder da mão deles. O crime é fundiário, cobiçando campos e roubando casas, tirando a herança das famílias. A resposta é simétrica, com Deus planejando um mal contra aquela família. E aparece a figura do pregador conveniente, o que profetiza de vinho e bebida forte, que seria aceito com gosto por aquele povo.",
    marcos: [
      "Planejam o mal na cama e executam de manhã",
      "Cobiçam campos e os roubam",
      "As mulheres são lançadas fora de suas casas",
      "'Não profetizeis', dizem aos profetas",
      "Um pregador de vinho e bebida forte seria bem recebido",
    ],
    chave: 1,
  },
  3: {
    resumo:
      "Líderes, profetas e sacerdotes vendidos, e o anúncio de que Sião será arada como campo.",
    detalhe:
      "A metáfora usada contra os governantes é canibal, falando em comer a carne do povo e quebrar os ossos. A acusação contra os profetas é comercial: quem lhes dá o que morder, eles anunciam paz. O versículo 11 resume o sistema, com chefes julgando por suborno, sacerdotes ensinando por interesse e profetas adivinhando por dinheiro, e todos eles dizendo que o Senhor está no meio deles. O contraste é o próprio Miqueias, cheio do Espírito e de juízo.",
    marcos: [
      "Os que aborrecem o bem e amam o mal",
      "Comem a carne do povo e quebram os ossos",
      "Profetas anunciam paz a quem lhes dá o que comer",
      "Julgam por suborno e ensinam por interesse",
      "'Sião será lavrada como um campo'",
    ],
    chave: 8,
  },
  4: {
    resumo:
      "Depois da destruição anunciada, a imagem de nações subindo e de armas virando ferramenta.",
    detalhe:
      "O oráculo é quase idêntico a Isaías 2, e os dois profetas eram contemporâneos. A visão é de povos que vêm por vontade própria dizendo vinde e subamos, e o aprendizado é sobre os caminhos de Deus. A parte mais concreta é a conversão de armamento em equipamento agrícola, com espadas virando relhas e lanças virando podadeiras. Miqueias acrescenta a Isaías a imagem doméstica de cada um debaixo da sua videira e da sua figueira, sem ninguém para os espantar.",
    marcos: [
      "O monte da casa do Senhor será firmado no cume",
      "Muitas nações dirão: vinde e subamos",
      "Converterão as suas espadas em relhas de arado",
      "Não aprenderão mais a guerra",
      "Cada um debaixo da sua videira e da sua figueira",
    ],
    chave: 3,
  },
  5: {
    resumo:
      "De uma vila pequena demais para entrar na lista das famílias de Judá sairá o governante.",
    detalhe:
      "A ênfase do texto é no tamanho: Belém Efrata é descrita como pequena demais para figurar entre os milhares de Judá, e é dali que sai quem dominará. A origem dele é dita como desde os dias da eternidade. A imagem do governo é pastoril, com alguém que apascenta com a força do Senhor, e o resultado é que eles habitarão seguros porque ele será a paz. O capítulo também fala de eliminar cavalos, carros e feitiçarias, tirando as seguranças falsas.",
    marcos: [
      "Belém Efrata, pequena entre os milhares de Judá",
      "Dali sairá quem há de reinar em Israel",
      "As suas origens são desde os dias da eternidade",
      "Ele apascentará com a força do Senhor",
      "Cavalos, carros e feitiçarias serão eliminados",
    ],
    chave: 2,
  },
  6: {
    resumo:
      "Deus abre um processo contra o próprio povo, com os montes servindo de júri.",
    detalhe:
      "A forma é de tribunal, e a primeira fala de Deus é uma pergunta quase magoada sobre em que ele cansou o povo. Do outro lado, a resposta escala o absurdo, oferecendo holocaustos, milhares de carneiros, rios de azeite e por fim o primogênito, como se o problema fosse de preço. A resposta do versículo 8 desmonta tudo e é a frase mais citada do livro, resumindo em três verbos o que já havia sido dito.",
    marcos: [
      "Deus apresenta a sua demanda diante dos montes",
      "'Povo meu, em que te enfadei?'",
      "Dou o meu primogênito pela minha transgressão?",
      "'Praticar a justiça, amar a misericórdia e andar humildemente'",
      "A balança enganosa e o saco de pesos falsos",
    ],
    chave: 8,
  },
  7: {
    resumo:
      "O profeta se sente sozinho num mundo sem gente confiável, e ainda assim espera.",
    detalhe:
      "O lamento inicial é de isolamento social completo, com desconfiança até do amigo e da esposa, e inimigos dentro da própria casa. A virada é na primeira pessoa e é uma decisão: eu, porém, olharei para o Senhor, esperarei. A fala seguinte é de quem está caído e avisa o inimigo para não se alegrar, porque levantará. O livro termina com um trocadilho com o próprio nome do profeta, que significa quem é como o Senhor, aplicado a quem perdoa a iniquidade.",
    marcos: [
      "Não há homem reto, e o melhor deles é como um espinho",
      "Os inimigos são os da própria casa",
      "'Eu, porém, olharei para o Senhor'",
      "'Ainda que eu caia, levantar-me-ei'",
      "'Quem é Deus semelhante a ti, que perdoa a iniquidade?'",
    ],
    chave: 18,
  },
};

CAPITULOS.os = {
  1: {
    resumo:
      "O primeiro mandamento que o profeta recebe é sobre a própria vida amorosa.",
    detalhe:
      "Deus manda Oséias casar com uma mulher de prostituições, e a razão é dita na mesma frase: porque a terra se prostitui. A vida dele vira a mensagem. Os nomes dos três filhos são sentenças ambulantes, e a criança teria que conviver com isso: Jezreel lembra um massacre, Lo-Ruama significa não amada, e Lo-Ami significa não meu povo. O capítulo termina invertendo tudo, com a promessa de que ali lhes será dito que são filhos do Deus vivo.",
    marcos: [
      "Deus manda Oséias casar com Gômer",
      "Jezreel recebe o nome de um massacre",
      "A filha é chamada Não Amada",
      "O filho é chamado Não Meu Povo",
      "A promessa de que serão chamados filhos do Deus vivo",
    ],
    chave: 10,
  },
  2: {
    resumo:
      "Um processo de divórcio vira proposta de namoro, com Deus levando a esposa ao deserto.",
    detalhe:
      "O capítulo começa como litígio, com a acusação de ela ter ido atrás dos amantes achando que eram eles que davam o pão, a água, a lã e o linho. A resposta é tirar essas coisas para revelar quem as dava. E então vem a virada que dá o tom do livro: eu a atrairei, e a levarei para o deserto, e lhe falarei ao coração. Ela passará a chamá-lo de meu marido e não mais de meu senhor, e o nome de Baal será tirado da boca dela.",
    marcos: [
      "A acusação de ir atrás dos amantes pelo sustento",
      "Deus retira o trigo, o vinho, a lã e o linho",
      "'Eu a atrairei, e a levarei para o deserto'",
      "'Falar-lhe-ei ao coração'",
      "Os nomes Não Amada e Não Meu Povo são revertidos",
    ],
    chave: 14,
  },
  3: {
    resumo: "Ele compra de volta a própria esposa, e o preço é de escrava.",
    detalhe:
      "É o capítulo mais curto e talvez o mais difícil do livro. A ordem é para amar de novo uma mulher amada de outro e adúltera, e a comparação é explícita com o amor de Deus por um povo que se volta para outros deuses. O valor pago, quinze peças de prata e um homer e meio de cevada, é baixo e humilhante, o que faz da compra um resgate de alguém já degradada. Depois vem um tempo de espera sem intimidade, que o texto aplica a Israel ficar muitos dias sem rei e sem sacrifício.",
    marcos: [
      "'Vai outra vez, ama uma mulher amada de outro'",
      "A comparação com o amor do Senhor por Israel",
      "Ela é comprada por quinze peças de prata e cevada",
      "Um período de espera sem intimidade",
      "Israel ficará muitos dias sem rei e sem sacrifício",
    ],
    chave: 1,
  },
  4: {
    resumo:
      "A denúncia sai da metáfora conjugal e vira lista de crimes, e a culpa recai sobre os sacerdotes.",
    detalhe:
      "A acusação inicial é de não haver verdade, misericórdia nem conhecimento de Deus na terra, e o que há é perjúrio, mentira, homicídio, furto e adultério, tanto que sangue toca sangue. O diagnóstico do versículo 6 é sobre falta de conhecimento, e a culpa é atribuída a quem deveria ensinar. O fim é resignado e assustador, com Deus dizendo para deixarem Efraim entregue aos ídolos, o que é uma forma de juízo por abandono.",
    marcos: [
      "Não há verdade, nem misericórdia, nem conhecimento na terra",
      "'O meu povo está sendo destruído por falta de conhecimento'",
      "Os sacerdotes se alimentam do pecado do povo",
      "O espírito de prostituição os engana",
      "'Efraim está entregue aos ídolos; deixa-o'",
    ],
    chave: 6,
  },
  5: {
    resumo:
      "Sacerdotes, povo e casa do rei são intimados juntos, e Deus se retira para esperar.",
    detalhe:
      "A acusação é de terem armado laço e rede, e a imagem central é a do espírito de prostituição no meio deles, que impede que conheçam o Senhor. Quando buscam com rebanhos, não o encontram, porque ele se retirou. As imagens que Deus usa para si mesmo aqui são violentas, de traça e de leão que despedaça e leva. O fim explica a estratégia: ele volta ao seu lugar até que se reconheçam culpados e busquem a sua face na angústia.",
    marcos: [
      "Sacerdotes, casa de Israel e casa do rei são intimados",
      "O espírito de prostituição impede o conhecimento de Deus",
      "Efraim recorre à Assíria e ela não pode curar",
      "Deus é como a traça e como o leão",
      "Ele se retira até que reconheçam a sua culpa",
    ],
    chave: 15,
  },
  6: {
    resumo:
      "O povo ensaia um arrependimento bonito, e Deus responde que aquilo dura como orvalho.",
    detalhe:
      "Os três primeiros versículos são um dos textos mais citados do livro, com o convite a voltar e o vamos conhecer, e prosseguir em conhecer. Mas a resposta desmonta a cena: o que fazer contigo, Efraim, se a tua benignidade é como a nuvem da manhã e como o orvalho que cedo se vai. O critério é enunciado logo depois e Jesus o cita duas vezes nos evangelhos: misericórdia quero e não sacrifício, e conhecimento de Deus mais do que holocaustos.",
    marcos: [
      "'Vinde, e tornemos para o Senhor'",
      "'Conheçamos e prossigamos em conhecer ao Senhor'",
      "A benignidade deles é como orvalho que cedo se vai",
      "'Misericórdia quero, e não sacrifício'",
      "Como salteadores, os sacerdotes cometem crimes no caminho",
    ],
    chave: 6,
  },
  7: {
    resumo:
      "Uma sequência de imagens domésticas e ridículas para descrever um povo sem juízo.",
    detalhe:
      "As metáforas são desconcertantes e ficam na memória. O forno aceso a noite toda pelo padeiro que dorme descreve uma paixão que se autoalimenta. O bolo que não foi virado é queimado de um lado e cru do outro, retrato de uma fé pela metade. E a pomba enganada e sem entendimento, que voa para o Egito e para a Assíria, descreve a política externa errática do reino. O mais grave é o diagnóstico sobre cabelos brancos que aparecem sem ele perceber.",
    marcos: [
      "O forno aceso pelo padeiro que dorme",
      "'Efraim é um bolo que não foi virado'",
      "Estranhos lhe consomem a força e ele não percebe",
      "Cabelos brancos aparecem e ele não nota",
      "Efraim é como pomba enganada, sem entendimento",
    ],
    chave: 8,
  },
  8: {
    resumo:
      "Semearam vento e colherão redemoinho, e o bezerro de Samaria será feito em pedaços.",
    detalhe:
      "A acusação inclui política, porque estabeleceram reis sem consultar, e religião, com o bezerro fabricado por um artífice, que o texto diz não ser Deus. A frase sobre semear vento e colher redemoinho virou provérbio em várias línguas. Há também uma denúncia sobre multiplicar altares para pecar, e sobre as leis escritas serem consideradas coisa estranha. O sacrifício é aceito como carne que comem, mas não pelo que deveria ser.",
    marcos: [
      "'Porquanto semeiam ventos, segarão tormentas'",
      "Estabeleceram reis sem consultar a Deus",
      "O bezerro de Samaria foi feito por um artífice",
      "Multiplicaram altares para pecar",
      "As leis escritas foram tidas como coisa estranha",
    ],
    chave: 7,
  },
  9: {
    resumo:
      "Ele manda parar a festa da colheita, porque aquela alegria está fundada em mentira.",
    detalhe:
      "A eira e o lagar não os sustentarão, e a imagem do exílio aparece como não permanecer na terra do Senhor, com a comida sendo impura em terra estrangeira. O profeta relata ser chamado de louco e insensato, o que mostra a recepção que tinha. Há uma referência dolorida a Efraim gerar filhos que não verão a maturidade, e uma comparação nostálgica que só piora o contraste: Deus achou Israel como uvas no deserto e como o primeiro fruto da figueira.",
    marcos: [
      "'Não te alegres, ó Israel, até saltar como os povos'",
      "Não permanecerão na terra do Senhor",
      "O profeta é chamado de louco e insensato",
      "'Achei Israel como uvas no deserto'",
      "Eles se consagraram à vergonha e se tornaram abomináveis",
    ],
    chave: 10,
  },
  10: {
    resumo:
      "Quanto mais frutificaram, mais altares construíram, e a colheita vem conforme a semeadura.",
    detalhe:
      "A observação inicial é sobre prosperidade que produz mais idolatria, porque conforme a abundância do fruto multiplicaram os altares. O coração é chamado de dividido. A imagem do rei que não pode salvar e da espuma sobre as águas descreve a instabilidade política do norte. O apelo final é agrícola e vale reter inteiro: semeai para vós em justiça e ceifai segundo a misericórdia, e lavrai o campo de pousio, porque é tempo de buscar o Senhor.",
    marcos: [
      "Quanto mais fruto, mais altares",
      "O coração deles está dividido",
      "O rei de Samaria será como espuma sobre as águas",
      "'Semeai para vós em justiça, ceifai segundo a misericórdia'",
      "'É tempo de buscar o Senhor'",
    ],
    chave: 12,
  },
  11: {
    resumo:
      "A metáfora muda de esposa para filho, e Deus fala como um pai que ensinou a andar.",
    detalhe:
      "É o capítulo mais comovente do livro. Deus lembra de ter chamado o filho do Egito, de tê-lo ensinado a andar tomando-o pelos braços, e de ter sido como quem levanta o jugo das queixadas para dar de comer. O centro é a pergunta do versículo 8, em que Deus se interrompe e pergunta como poderia entregá-lo, dizendo que o seu coração está comovido dentro dele. A razão dada para não executar a ira é simplesmente que ele é Deus e não homem.",
    marcos: [
      "'Quando Israel era menino, eu o amei'",
      "Deus o ensinou a andar, tomando-o pelos braços",
      "'Como te entregaria, ó Efraim?'",
      "'O meu coração está comovido dentro de mim'",
      "'Porque eu sou Deus e não homem'",
    ],
    chave: 8,
  },
  12: {
    resumo:
      "O passado de Jacó é usado como espelho, e o comerciante da balança falsa é chamado pelo nome.",
    detalhe:
      "O profeta recorre à história do patriarca, lembrando que ele pegou o calcanhar do irmão no ventre e depois lutou com o anjo e chorou pedindo graça. A lição é que houve um momento em que Jacó parou de trapacear. O contraste é com Efraim, descrito como mercador com balança enganosa na mão, que se diz rico e acha que ninguém achará nele iniquidade. Deus lembra ter falado pelos profetas e multiplicado visões.",
    marcos: [
      "Efraim se apascenta de vento e persegue o vento oriental",
      "Jacó lutou com o anjo e chorou pedindo graça",
      "'Torna-te, pois, a teu Deus'",
      "O mercador tem balança enganosa na mão",
      "Deus falou pelos profetas e multiplicou visões",
    ],
    chave: 6,
  },
  13: {
    resumo:
      "As imagens de juízo ficam mais duras, e mesmo assim entra uma promessa contra a morte.",
    detalhe:
      "A fragilidade do povo é comparada à nuvem da manhã e à palha que o vento leva da eira. A acusação mais funda é de esquecimento por saciedade: conforme o seu pasto, se fartaram, e o coração se exaltou e se esqueceram de mim. As imagens de Deus como leão, leopardo e ursa roubada dos filhotes são as mais ferozes do livro. E no meio disso aparece a frase que Paulo cita em 1 Coríntios 15 falando da ressurreição, sobre ser a praga da morte.",
    marcos: [
      "Serão como nuvem da manhã e como palha da eira",
      "Fartaram-se e o coração se exaltou",
      "Deus como leão, leopardo e ursa roubada",
      "'Ó morte, eu serei as tuas pragas'",
      "'Ó sepultura, eu serei a tua destruição'",
    ],
    chave: 14,
  },
  14: {
    resumo:
      "O livro termina ensinando as palavras exatas do pedido de perdão, e promete cura.",
    detalhe:
      "É o único lugar da Bíblia em que Deus dita o texto do arrependimento: tomai convosco palavras e dizei a ele. E o que se pede não é castigo suspenso, é que ele receba o que é bom e que a Assíria não os salve mais. A resposta é toda em imagens de vegetação e de perfume, com o orvalho, o lírio, as raízes do Líbano e a oliveira. A última linha do livro é um aviso ao leitor sobre quem é sábio para entender essas coisas.",
    marcos: [
      "'Tomai convosco palavras e convertei-vos ao Senhor'",
      "'Sararei a sua infidelidade, eu de mim mesmo os amarei'",
      "Deus será como o orvalho para Israel",
      "Ele florescerá como o lírio e lançará raízes",
      "'Quem é sábio, para que entenda estas coisas?'",
    ],
    chave: 4,
  },
};

CAPITULOS.ec = {
  1: {
    resumo:
      "Tudo é fôlego, diz o Pregador, e passa a mostrar a natureza andando em círculos.",
    detalhe:
      "A palavra traduzida por vaidade é hével, que significa literalmente vapor ou fôlego, algo que existe e não se segura. Não é dizer que nada vale nada, é dizer que nada se fixa. As imagens do sol, do vento e dos rios descrevem movimento sem chegada. A frase sobre não haver nada novo debaixo do sol é de quem viu muita coisa. E ele termina confessando que buscar entendimento aumentou a dor, o que é raro num livro de sabedoria.",
    marcos: [
      "'Vaidade de vaidades, tudo é vaidade'",
      "Uma geração vai e outra vem, e a terra permanece",
      "Os rios correm e o mar não se enche",
      "'Não há nada novo debaixo do sol'",
      "'Quem aumenta o conhecimento aumenta a dor'",
    ],
    chave: 9,
  },
  2: {
    resumo:
      "Ele testa prazer, obra e sabedoria com recursos ilimitados, e conclui que nada segura.",
    detalhe:
      "É um experimento narrado em primeira pessoa e com orçamento de rei: casas, vinhas, jardins, tanques, servos, cantores, prata e ouro. Ele diz que não negou aos olhos nada do que pediram. O resultado não é que tudo foi ruim, é que o resultado não permanece, porque deixará tudo a alguém que não sabe se será sábio ou tolo. No meio da amargura aparece a primeira das conclusões positivas do livro, sobre comer, beber e achar bem no trabalho.",
    marcos: [
      "Ele constrói casas, vinhas, jardins e tanques",
      "Não nega aos olhos coisa alguma que desejem",
      "A sabedoria é melhor que a loucura, mas o fim é o mesmo",
      "Aborrece o trabalho por ter que deixá-lo a outro",
      "'Nada há melhor do que comer, beber e fazer bem ao seu trabalho'",
    ],
    chave: 24,
  },
  3: {
    resumo:
      "Há tempo para tudo, e o problema é que ninguém enxerga o desenho inteiro.",
    detalhe:
      "O poema dos catorze pares é o texto mais conhecido do livro, e ele não é sobre planejamento e sim sobre limite: os tempos acontecem, e não se escolhe. A chave está no versículo 11, que diz que Deus pôs a eternidade no coração do homem, e justamente por isso ele não consegue se contentar com o fragmento que alcança. O capítulo termina olhando para a morte e igualando homem e animal no fôlego, sem nenhuma consolação fácil.",
    marcos: [
      "Tempo de nascer e tempo de morrer",
      "Tempo de chorar e tempo de rir",
      "Tudo é formoso no seu devido tempo",
      "'Ele pôs a eternidade no coração do homem'",
      "Homem e animal têm o mesmo fôlego",
    ],
    chave: 11,
  },
  4: {
    resumo:
      "Ele olha para a opressão e para a solidão do bem-sucedido, e conclui que ninguém vive só.",
    detalhe:
      "A primeira cena é dura: ele vê as lágrimas dos oprimidos e observa que não havia quem os consolasse, e a frase se repete duas vezes, porque a falta de consolo o impressiona mais do que a opressão. Depois vem a descrição de quem trabalha sozinho sem ter para quem, e a partir dali a conclusão prática do capítulo. A imagem do cordão de três dobras é sobre resistência, e aparece justamente num livro que fala o tempo todo de fragilidade.",
    marcos: [
      "As lágrimas dos oprimidos sem consolador",
      "O trabalho movido por inveja do próximo",
      "'Para quem trabalho eu, e privo a minha alma do bem?'",
      "'Melhor é serem dois do que um'",
      "'O cordão de três dobras não se quebra tão depressa'",
    ],
    chave: 12,
  },
  5: {
    resumo:
      "Cuidado com promessas feitas de boca cheia, e com achar que dinheiro sacia.",
    detalhe:
      "O conselho sobre culto é de uma sobriedade rara: guarda o teu pé ao entrar na casa de Deus, e chega mais para ouvir do que para oferecer sacrifício de tolos. A razão dada é quase geográfica, sobre Deus estar no céu e o homem na terra, e por isso as palavras devem ser poucas. A segunda metade é sobre dinheiro, com a observação de que quem ama a prata nunca se farta dela, e de que o sono do trabalhador é doce, coma pouco ou muito.",
    marcos: [
      "'Guarda o teu pé quando entrares na Casa de Deus'",
      "Sejam poucas as tuas palavras",
      "É melhor não votar do que votar e não cumprir",
      "'O que amar o dinheiro jamais dele se fartará'",
      "'Doce é o sono do trabalhador'",
    ],
    chave: 10,
  },
  6: {
    resumo:
      "O pior cenário não é a falta de bens, é ter tudo e não conseguir desfrutar.",
    detalhe:
      "O mal descrito é específico e o autor o chama de comum entre os homens: alguém a quem Deus deu riquezas, bens e honra, e não lhe dá poder para comer disso, e um estranho o come. Ele leva o argumento ao extremo com o caso de quem gera cem filhos e vive muitos anos e não se farta do bem, dizendo que um aborto seria melhor. É um dos trechos mais sombrios da Bíblia, e existe para nomear uma dor real.",
    marcos: [
      "Ter riqueza e não ter poder de desfrutá-la",
      "Um estranho é quem a come",
      "Todo o trabalho do homem é para a boca",
      "'O que os olhos veem é melhor que o vaguear da cobiça'",
      "Ninguém sabe o que é bom para o homem nesta vida",
    ],
    chave: 2,
  },
  7: {
    resumo:
      "Uma série de ditos que preferem o funeral à festa, e advertem contra a nostalgia.",
    detalhe:
      "A preferência pela casa do luto não é mórbida, é pedagógica, porque ali se lembra do fim e o vivo toma isso a peito. O capítulo tem um conselho que costuma passar despercebido e é bem atual, contra perguntar por que os dias passados foram melhores do que estes, dizendo que essa pergunta não vem de sabedoria. E há o alerta contra o excesso em qualquer direção, inclusive contra ser demasiadamente justo e sábio.",
    marcos: [
      "'Melhor é ir à casa onde há luto do que à casa do banquete'",
      "O riso do insensato é como espinhos crepitando",
      "'Não digas: por que foram os dias passados melhores?'",
      "Não sejas demasiadamente justo nem demasiadamente sábio",
      "'Deus fez o homem reto, mas ele buscou muitas astúcias'",
    ],
    chave: 10,
  },
  8: {
    resumo:
      "Ele observa como funciona o poder, e admite que não consegue explicar a injustiça.",
    detalhe:
      "A primeira parte é conselho prático sobre servir a um rei sem se meter em encrenca, reconhecendo que a palavra dele tem poder e que ninguém lhe pergunta o que faz. O problema aparece no versículo 11, com uma observação de psicologia social: como a sentença não se executa logo, o coração dos homens se enche para fazer o mal. E ele encerra confessando o limite, dizendo que por mais que o sábio diga que sabe, não pode achar.",
    marcos: [
      "A sabedoria faz brilhar o rosto do homem",
      "A palavra do rei tem poder e ninguém lhe pergunta",
      "A sentença que não se executa logo encoraja o mal",
      "Há justos a quem sucede como se fossem ímpios",
      "O homem não pode compreender a obra feita debaixo do sol",
    ],
    chave: 11,
  },
  9: {
    resumo:
      "O mesmo fim alcança todos, e por isso ele manda comer o pão com alegria agora.",
    detalhe:
      "A observação de que o mesmo acontece ao justo e ao ímpio é a mais indigesta do livro, e ele não a resolve. O que faz é tirar dela uma conclusão inesperada: já que o tempo é curto, coma, beba, vista roupa branca, aproveite a vida com a pessoa que ama e faça o que a mão encontrar para fazer, com toda a força. O capítulo fecha com a história do pobre sábio que salvou a cidade e de quem ninguém se lembrou.",
    marcos: [
      "O mesmo sucede ao justo e ao ímpio",
      "'Melhor é o cão vivo do que o leão morto'",
      "Come o teu pão com alegria e sejam brancas as tuas vestes",
      "'Tudo quanto te vier à mão para fazer, faze-o com toda a tua força'",
      "O pobre sábio que livrou a cidade e foi esquecido",
    ],
    chave: 10,
  },
  10: {
    resumo:
      "Provérbios sobre como uma coisa pequena estraga o conjunto, e sobre cavar a própria cova.",
    detalhe:
      "A imagem de abertura é precisa, com moscas mortas fazendo apodrecer o perfume do perfumista, e ela serve para dizer que um pouco de estultícia pesa mais que honra e sabedoria. Há observações práticas sobre esforço mal dirigido, como o ferro embotado que exige mais força, e sobre o encantador mordido antes de encantar. E há um comentário político sobre a terra em que os príncipes comem pela manhã, em vez de governar.",
    marcos: [
      "Moscas mortas estragam o perfume do perfumista",
      "Quem cava uma cova nela cairá",
      "Se o ferro está embotado, é preciso mais força",
      "As palavras do sábio são agradáveis, as do tolo o devoram",
      "As aves do céu levarão a voz e o que tem asas contará",
    ],
    chave: 1,
  },
  11: {
    resumo:
      "Já que não se controla o resultado, ele manda semear de manhã e à tarde.",
    detalhe:
      "O conselho sobre lançar o pão sobre as águas é sobre generosidade e risco, porque você não sabe o mal que virá. A lógica do capítulo é que a incerteza não é motivo para paralisia: quem observa demais o vento nunca semeia, e quem olha demais as nuvens nunca ceifa. A última parte se dirige ao jovem e é de uma alegria autorizada, mandando andar pelos caminhos do coração, e ao mesmo tempo lembrando que haverá prestação de contas.",
    marcos: [
      "'Lança o teu pão sobre as águas'",
      "Quem observa o vento nunca semeará",
      "Semeia pela manhã e à tarde não retires a mão",
      "'Alegra-te, jovem, na tua adolescência'",
      "Sabe que de todas estas coisas Deus te pedirá conta",
    ],
    chave: 6,
  },
  12: {
    resumo:
      "O corpo envelhecendo descrito como uma casa que se fecha, e a conclusão de tudo.",
    detalhe:
      "O poema final é uma alegoria do envelhecimento, e cada imagem tem um corpo por trás: os guardas que tremem são as mãos, os moedores que diminuem são os dentes, as que olham pelas janelas escurecem são os olhos, e a amendoeira que floresce é o cabelo branco. A ordem é lembrar do Criador antes disso tudo. O fecho do livro é abrupto e direto, resumindo tudo em temer a Deus e guardar os mandamentos.",
    marcos: [
      "'Lembra-te do teu Criador nos dias da tua mocidade'",
      "Os guardas tremem e os moedores diminuem",
      "A amendoeira floresce e o desejo se acaba",
      "O pó volta à terra e o espírito volta a Deus",
      "'Teme a Deus e guarda os seus mandamentos'",
    ],
    chave: 13,
  },
};

CAPITULOS.zc = {
  1: {
    resumo:
      "O primeiro recado é sobre os pais que não ouviram, e depois vêm cavaleiros entre as murtas.",
    detalhe:
      "Antes de qualquer visão, um argumento histórico: os pais morreram e os profetas também, mas as palavras alcançaram os pais assim mesmo. Quem ficou de fora foi quem não ouviu. A primeira visão tem cavaleiros que patrulharam a terra e voltam relatando que tudo está em repouso, e o problema é justamente esse, porque as nações estão confortáveis enquanto Jerusalém está em ruínas. O anjo pergunta até quando, e a resposta é de zelo e consolação.",
    marcos: [
      "'Tornai-vos para mim e eu me tornarei para vós'",
      "Os pais morreram, mas as palavras os alcançaram",
      "Cavaleiros entre as murtas relatam que a terra está em repouso",
      "'Até quando não terás compaixão de Jerusalém?'",
      "Quatro chifres e quatro ferreiros",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "Um homem sai para medir Jerusalém e é mandado parar, porque ela não vai caber em muros.",
    detalhe:
      "A cena é simples e o recado é grande: a cidade será habitada como as aldeias sem muros, pela multidão de gente e de animais. E a proteção não virá de pedra, porque Deus promete ser muro de fogo ao redor e a glória no meio dela. Dois detalhes merecem nota: a expressão sobre quem toca no povo tocar na menina do olho de Deus, e a promessa de que muitas nações se ajuntarão ao Senhor naquele dia e serão povo dele.",
    marcos: [
      "Um homem sai com um cordel de medir",
      "Jerusalém será habitada como aldeias sem muros",
      "'Eu lhe serei um muro de fogo em redor'",
      "Quem toca no povo toca na menina do olho de Deus",
      "Muitas nações se ajuntarão ao Senhor",
    ],
    chave: 5,
  },
  3: {
    resumo:
      "O sumo sacerdote aparece com vestes sujas, e o acusador é repreendido antes de falar.",
    detalhe:
      "A cena é de tribunal, com Josué de pé diante do anjo e Satanás à direita para o acusar. A defesa não é um argumento, é uma repreensão e uma imagem: ele é um tição tirado do fogo. As vestes sujas são retiradas por ordem, e a frase que acompanha explica o gesto, dizendo que a iniquidade foi removida. O detalhe mais humano é que Josué pede o turbante limpo na cabeça, e é atendido. No fim vem o anúncio do Renovo e da pedra com sete olhos.",
    marcos: [
      "Josué está diante do anjo, e Satanás à direita",
      "'Não é este um tição tirado do fogo?'",
      "As vestes sujas são retiradas",
      "Um turbante limpo é posto sobre a cabeça",
      "O anúncio do Renovo e da pedra de sete olhos",
    ],
    chave: 4,
  },
  4: {
    resumo:
      "Um candelabro alimentado direto por duas oliveiras, e a frase sobre não ser por força.",
    detalhe:
      "A visão mostra um candelabro que não depende de ninguém para ser abastecido, porque os tubos ligam direto às árvores. O profeta pergunta o que é e recebe primeiro a mensagem para Zorobabel, que estava reconstruindo o templo com recursos mínimos: não por força nem por violência, mas pelo Espírito. E há uma frase que consola qualquer obra que começa pequena, perguntando quem despreza o dia das coisas pequenas.",
    marcos: [
      "Um candelabro de ouro com sete lâmpadas",
      "Duas oliveiras alimentam o candelabro diretamente",
      "'Não por força nem por violência, mas pelo meu Espírito'",
      "O grande monte se tornará planície diante de Zorobabel",
      "'Quem despreza o dia das coisas pequenas?'",
    ],
    chave: 6,
  },
  5: {
    resumo:
      "Um rolo voando sobre a terra e uma mulher dentro de um cesto levada para longe.",
    detalhe:
      "As duas visões tratam de remoção do mal, e são estranhas de propósito. O rolo é enorme e carrega maldição contra quem furta e contra quem jura falso, e ele entra na casa do culpado e a consome. A segunda visão personifica a impiedade como uma mulher dentro de um cesto, tampada com chumbo, e duas figuras aladas a levam para Sinar, que é a Babilônia. O mal não é apenas punido, é transportado para fora do território.",
    marcos: [
      "Um rolo voador de vinte côvados",
      "A maldição contra o que furta e o que jura falso",
      "Uma mulher dentro de um cesto de medir",
      "Uma tampa de chumbo é lançada sobre ela",
      "Duas mulheres aladas a levam para a terra de Sinar",
    ],
    chave: 4,
  },
  6: {
    resumo:
      "Quatro carros saem entre montes de bronze, e uma coroa é posta na cabeça do sacerdote.",
    detalhe:
      "Os carros com cavalos de cores diferentes são espíritos enviados aos quatro ventos, e o relato dos que foram para o norte é que fizeram repousar o espírito de Deus naquela terra. A segunda parte é mais significativa: a coroa é feita com prata e ouro trazidos pelos exilados, e é posta em Josué, o sacerdote, com o anúncio de que o Renovo edificará o templo e será sacerdote no seu trono, unindo os dois ofícios.",
    marcos: [
      "Quatro carros saem entre dois montes de bronze",
      "Os espíritos são enviados aos quatro ventos",
      "Uma coroa é feita com prata e ouro dos exilados",
      "É posta na cabeça de Josué, o sacerdote",
      "O Renovo será sacerdote no seu trono",
    ],
    chave: 13,
  },
  7: {
    resumo:
      "Perguntam se devem continuar jejuando, e a resposta questiona para quem eles jejuavam.",
    detalhe:
      "A pergunta é prática e burocrática, sobre manter ou não um jejum de setenta anos de luto. A resposta vem em forma de pergunta devolvida, se era para Deus que jejuavam, e se quando comiam e bebiam não era para si mesmos. E então o texto redireciona para o que os profetas antigos já diziam e ninguém ouvia: julgar com verdade, usar de misericórdia, não oprimir a viúva, o órfão, o estrangeiro e o pobre.",
    marcos: [
      "Perguntam se devem manter o jejum do quinto mês",
      "'Porventura, jejuastes para mim?'",
      "Julgai segundo a verdade e usai de misericórdia",
      "Não oprimais a viúva, o órfão, o estrangeiro e o pobre",
      "Endureceram o coração como diamante",
    ],
    chave: 9,
  },
  8: {
    resumo:
      "Dez promessas seguidas, e a imagem mais bonita é de velhos e crianças nas praças.",
    detalhe:
      "A expressão assim diz o Senhor dos Exércitos se repete como refrão, e cada uma traz uma promessa. A cena do versículo 4 é doméstica e desarmada: velhos e velhas com bordão na mão pela idade avançada, e as ruas cheias de meninos e meninas brincando. É a definição de paz por quem já viu cidade sitiada. O capítulo termina com dez homens de nações estrangeiras pegando na aba da veste de um judeu, querendo ir junto.",
    marcos: [
      "Jerusalém será chamada cidade de verdade",
      "Velhos com bordão e crianças brincando nas praças",
      "'Se isto é maravilhoso aos olhos do povo, será também aos meus?'",
      "Falai a verdade cada um com o seu próximo",
      "Dez homens de nações pegarão na aba de um judeu",
    ],
    chave: 4,
  },
  9: {
    resumo:
      "Depois de oráculos contra cidades vizinhas, entra um rei humilde montado num jumento.",
    detalhe:
      "O contraste é deliberado: acabaram de passar exércitos e cidades caindo, e o rei anunciado é justo e salvador, e vem pobre, montado num jumentinho. O mesmo texto diz que os carros e os cavalos de guerra serão eliminados e que ele anunciará paz às nações. Os quatro evangelhos ligam esse versículo à entrada em Jerusalém. A imagem seguinte, sobre soltar prisioneiros da cova sem água por causa do sangue da aliança, é igualmente forte.",
    marcos: [
      "Oráculos contra Hadraque, Tiro, Sidom e as cidades filisteias",
      "'Eis que o teu Rei virá a ti, justo e salvador'",
      "Ele vem humilde, montado num jumentinho",
      "O carro e o cavalo de guerra serão eliminados",
      "Os presos são soltos da cova sem água",
    ],
    chave: 9,
  },
  10: {
    resumo:
      "A culpa recai sobre os pastores, e o rebanho disperso é recolhido de longe.",
    detalhe:
      "A abertura critica quem consulta ídolos domésticos e adivinhos, e diz que o povo anda como ovelhas aflitas porque não há pastor. A ira é declarada contra os pastores, e o cuidado, contra o rebanho. As promessas usam verbos de resgate e de retorno, com o povo sendo assobiado e recolhido do Egito e da Assíria, e a terra ficando pequena para tantos. A imagem final é de gente que anda no nome do Senhor.",
    marcos: [
      "Consultam ídolos domésticos e adivinhos",
      "O povo anda aflito por não haver pastor",
      "A ira se acende contra os pastores",
      "Deus assobia e os recolhe de longe",
      "Serão fortalecidos e andarão no nome do Senhor",
    ],
    chave: 2,
  },
  11: {
    resumo:
      "O profeta faz o papel de pastor, quebra dois cajados, e recebe trinta moedas de prata.",
    detalhe:
      "É o capítulo mais sombrio do livro e é encenado. Ele assume o rebanho destinado à matança, e os dois cajados chamados Graça e União são quebrados, o que representa a quebra da aliança e da unidade entre Judá e Israel. Ao pedir o salário, recebe trinta moedas de prata, o preço de um escravo ferido segundo Êxodo 21, e a ordem é lançá-las ao oleiro na casa do Senhor. Mateus retoma esse texto na cena de Judas.",
    marcos: [
      "O profeta apascenta o rebanho destinado à matança",
      "Toma dois cajados: Graça e União",
      "Quebra Graça, anulando o concerto",
      "Recebe trinta moedas de prata como salário",
      "A ordem de lançá-las ao oleiro na casa do Senhor",
    ],
    chave: 12,
  },
  12: {
    resumo:
      "Jerusalém vira taça de tontear para os povos, e o capítulo termina num luto profundo.",
    detalhe:
      "As imagens militares são de cerco e de resistência sobrenatural, com a cidade virando pedra pesada para todos os povos. A virada acontece no versículo 10, com o derramamento do espírito de graça e de súplicas, e a frase sobre olharem para aquele a quem traspassaram. O luto descrito é familiar e detalhado, família por família, com os homens e as mulheres à parte, e é comparado ao pranto por um filho único.",
    marcos: [
      "Jerusalém como taça de tontear para os povos",
      "Uma pedra pesada para todas as nações",
      "O espírito de graça e de súplicas é derramado",
      "'Olharão para mim, a quem traspassaram'",
      "O pranto é comparado ao de um filho único",
    ],
    chave: 10,
  },
  13: {
    resumo:
      "Uma fonte é aberta para purificação, e o pastor é ferido e as ovelhas se dispersam.",
    detalhe:
      "A fonte aberta à casa de Davi é para o pecado e para a impureza, e vem acompanhada da remoção dos ídolos e dos falsos profetas, a ponto de ninguém mais querer assumir a profissão. O versículo 7, sobre ferir o pastor e as ovelhas se dispersarem, é citado por Jesus na noite da prisão. O fim do capítulo fala de uma terça parte que passa pelo fogo e é refinada como prata, e que então chama pelo nome de Deus.",
    marcos: [
      "Uma fonte é aberta contra o pecado e a impureza",
      "Os nomes dos ídolos são eliminados da terra",
      "Os falsos profetas se envergonham do próprio ofício",
      "'Fere o pastor, e as ovelhas se dispersarão'",
      "A terça parte é refinada como prata",
    ],
    chave: 7,
  },
  14: {
    resumo:
      "O dia do Senhor chega, o monte das Oliveiras se parte ao meio, e tudo vira santo.",
    detalhe:
      "É apocalipse em estado puro, com a cidade tomada e depois o Senhor saindo a pelejar. O monte se fende de leste a oeste formando um vale de fuga. O dia é descrito como único, nem dia nem noite, e ao entardecer haverá luz. Águas vivas saem de Jerusalém para os dois mares, no verão e no inverno. O fecho tem uma imagem doméstica e surpreendente: até as panelas comuns e os sinos dos cavalos serão consagrados.",
    marcos: [
      "O monte das Oliveiras se fende ao meio",
      "Um dia único, nem dia nem noite",
      "Águas vivas saem de Jerusalém para os dois mares",
      "O Senhor será rei sobre toda a terra",
      "Até os sinos dos cavalos trarão inscrição de santidade",
    ],
    chave: 9,
  },
};

CAPITULOS.lm = {
  1: {
    resumo:
      "A cidade é descrita como uma viúva sentada sozinha, chorando sem ninguém para consolar.",
    detalhe:
      "O livro é um conjunto de cinco poemas de luto, e os quatro primeiros são acrósticos, com cada estrofe começando por uma letra do alfabeto hebraico em ordem. A forma é rígida de propósito: é dor organizada, para poder ser dita sem desabar. A frase sobre não haver quem a console se repete cinco vezes neste capítulo. E a cidade toma a palavra no meio do poema, dirigindo-se a quem passa e perguntando se existe dor como a sua.",
    marcos: [
      "A cidade que era cheia de povo agora está solitária",
      "Chora de noite e não há quem a console",
      "Os caminhos de Sião estão de luto",
      "A própria cidade toma a palavra",
      "'Não vos comove isto, a todos vós que passais?'",
    ],
    chave: 12,
  },
  2: {
    resumo:
      "O poema encara o mais difícil: quem destruiu a cidade foi o próprio Deus.",
    detalhe:
      "É o capítulo que não permite desviar o olhar. Os verbos são todos de Deus, que derribou, cortou, entesou o arco como inimigo. A imagem mais insuportável é a das crianças desfalecendo nas ruas e perguntando às mães onde há trigo e vinho, enquanto derramam a alma no colo delas. E há uma crítica aos profetas que viram visões falsas e não manifestaram a iniquidade do povo, o que teria evitado o desastre.",
    marcos: [
      "O Senhor cobriu de nuvens a filha de Sião",
      "Ele entesou o arco como inimigo",
      "Os profetas não manifestaram a iniquidade",
      "Crianças desfalecem nas ruas pedindo pão",
      "'Derrama o teu coração como águas diante do Senhor'",
    ],
    chave: 19,
  },
  3: {
    resumo:
      "No centro exato do livro, no fundo do poço, aparecem as misericórdias que se renovam.",
    detalhe:
      "Este capítulo é o mais elaborado, com três versos para cada letra do alfabeto. Começa em primeira pessoa e é o mais amargo de todos, com o homem que viu a aflição, cercado de fel e trabalho. A virada está no versículo 21 e é uma decisão de memória: isto trago à mente, por isso tenho esperança. O que ele traz à mente é que as misericórdias não têm fim e se renovam cada manhã. A esperança não nega a dor, ela é afirmada dentro dela.",
    marcos: [
      "'Eu sou o homem que viu a aflição'",
      "'Isto trago à memória, por isso tenho esperança'",
      "As misericórdias do Senhor não têm fim",
      "'Novas são cada manhã; grande é a tua fidelidade'",
      "'Bom é ter esperança e aguardar em silêncio a salvação'",
    ],
    chave: 23,
  },
  4: {
    resumo:
      "O ouro se escureceu, e o poema compara o que a cidade era com o que ela virou.",
    detalhe:
      "A estrutura é toda de contrastes entre antes e agora: os filhos preciosos como ouro fino são tratados como vasos de barro, os que comiam iguarias estão desolados nas ruas, os nazireus mais alvos que a neve ficaram mais escuros que o carvão. A observação mais chocante é comparativa e amarga, dizendo que os mortos à espada tiveram melhor sorte que os mortos de fome. E há a referência a mães cozinhando os próprios filhos durante o cerco.",
    marcos: [
      "O ouro se escureceu e o ouro fino se mudou",
      "Os filhos preciosos são tidos como vasos de barro",
      "Melhores foram os mortos à espada que os mortos de fome",
      "Ninguém acreditava que o inimigo entraria pelas portas",
      "A iniquidade dos profetas e sacerdotes é apontada",
    ],
    chave: 22,
  },
  5: {
    resumo:
      "O último poema é uma oração coletiva que termina sem garantia, só com um pedido.",
    detalhe:
      "É o único dos cinco que não é acróstico, como se no fim a forma também não se sustentasse. A lista de perdas é concreta e social: órfãos sem pai, água comprada, lenha paga, servos dominando, moças violadas, príncipes pendurados, jovens carregando moinho. A frase sobre os pais terem pecado e não existirem mais enquanto os filhos levam as iniquidades é de uma geração que herda o custo. O fim é uma súplica seguida de uma pergunta em aberto.",
    marcos: [
      "A herança passou a estranhos e as casas a estrangeiros",
      "Compram a própria água e pagam pela lenha",
      "Os pais pecaram e já não existem, e os filhos levam o peso",
      "'Converte-nos a ti, Senhor, e seremos convertidos'",
      "O livro termina em pergunta, sem resposta garantida",
    ],
    chave: 21,
  },
};

CAPITULOS.ct = {
  1: {
    resumo:
      "Uma mulher abre o livro falando de desejo, e defende a própria pele do julgamento alheio.",
    detalhe:
      "A primeira voz do livro é feminina, e a primeira frase é um pedido de beijo. Isso já diz muito sobre um livro que ficou séculos sendo lido apenas como alegoria. O detalhe social aparece rápido: ela é morena porque o sol a queimou, já que os irmãos a puseram para guardar as vinhas, e ela pede para não a olharem por isso. É uma trabalhadora rural, não uma princesa, e ela não se desculpa por isso.",
    marcos: [
      "'Beije-me ele com os beijos da sua boca'",
      "'Eu sou morena e formosa'",
      "Os irmãos a puseram para guardar as vinhas",
      "Ela pergunta onde ele apascenta o rebanho ao meio-dia",
      "A troca de elogios começa",
    ],
    chave: 6,
  },
  2: {
    resumo:
      "A primavera é usada como convite, e aparece o pedido para não despertar o amor antes da hora.",
    detalhe:
      "A imagem dele saltando sobre os montes e olhando pelas janelas é de pura expectativa. O convite de primavera é o trecho mais citado do livro, com o inverno passado, as flores aparecendo e a voz da rola se ouvindo. Há também a imagem das raposinhas que estragam as vinhas, lida como aquilo que corrói um relacionamento pelos detalhes. E aparece pela primeira vez o refrão que se repete três vezes no livro, sobre não despertar o amor antes que queira.",
    marcos: [
      "'Como o lírio entre os espinhos'",
      "A bandeira sobre ela é o amor",
      "'O inverno já passou, a chuva cessou e se foi'",
      "'Apanhai-nos as raposas, as raposinhas'",
      "'Não acordeis o amor até que este o queira'",
    ],
    chave: 7,
  },
  3: {
    resumo:
      "Ela o procura pelas ruas de noite, e depois passa o cortejo de Salomão.",
    detalhe:
      "A busca noturna é contada como sonho ou quase sonho, com ela levantando, percorrendo a cidade e perguntando aos guardas se viram aquele a quem ama. A insistência é o ponto: procurei e não achei, e ela continua. A segunda parte muda completamente de registro e descreve uma liteira real cercada de sessenta valentes com espadas, o que muitos leem como cena de casamento e outros como contraponto luxuoso ao amor simples do restante.",
    marcos: [
      "Ela o busca de noite pela cidade",
      "Pergunta aos guardas se o viram",
      "'Achei aquele a quem ama a minha alma'",
      "A liteira de Salomão com sessenta valentes",
      "O dia do desposório e da alegria do coração",
    ],
    chave: 4,
  },
  4: {
    resumo:
      "Um elogio detalhado do corpo dela, feito com imagens de rebanhos, torres e jardins.",
    detalhe:
      "As comparações soam estranhas ao ouvido moderno, com cabelos como rebanho de cabras e dentes como ovelhas tosquiadas, mas todas evocam abundância, ordem e vitalidade. A frase central é a do versículo 7, dizendo que ela é toda formosa e que nela não há defeito. A segunda parte usa a imagem do jardim fechado e da fonte selada, e termina com ela convidando o vento a soprar para que o jardim exale perfume, o que é convite dela e não dele.",
    marcos: [
      "O elogio começa pelos olhos e desce",
      "'Tu és toda formosa, amiga minha'",
      "Ela é chamada de jardim fechado e fonte selada",
      "A lista de especiarias e frutos do jardim",
      "Ela convida o vento a soprar sobre o seu jardim",
    ],
    chave: 7,
  },
  5: {
    resumo:
      "Ela demora a abrir a porta, ele se vai, e a busca desta vez termina em agressão.",
    detalhe:
      "A cena é a mais dolorosa do livro. Ele bate de noite com a cabeça molhada de orvalho, e ela hesita alegando que já tirou a roupa e lavou os pés. Quando se levanta, ele já foi. A busca pelas ruas termina com os guardas a ferindo e tirando o manto dela, o que é violência registrada sem nenhum comentário. O capítulo se recompõe com ela descrevendo o amado às outras mulheres, e é a descrição mais detalhada de um corpo masculino na Bíblia.",
    marcos: [
      "Ele bate à porta com a cabeça molhada de orvalho",
      "Ela hesita e ele se vai",
      "Os guardas a ferem e tiram o seu manto",
      "Ela pede às filhas de Jerusalém que o procurem",
      "A descrição detalhada do amado",
    ],
    chave: 16,
  },
  6: {
    resumo:
      "Elas perguntam para onde ele foi, e ela responde sabendo exatamente onde procurar.",
    detalhe:
      "A resposta dela é interessante porque contrasta com o desespero do capítulo anterior: o meu amado desceu ao seu jardim. Ela não perdeu o rumo. A frase que abre o reencontro é a declaração de pertencimento mútuo, eu sou do meu amado e o meu amado é meu. O elogio dele retoma imagens do capítulo 4 e acrescenta a comparação com a aurora e com um exército com bandeiras, misturando beleza e poder de um jeito incomum.",
    marcos: [
      "'Para onde foi o teu amado?'",
      "'O meu amado desceu ao seu jardim'",
      "'Eu sou do meu amado, e o meu amado é meu'",
      "Formosa como a lua e clara como o sol",
      "Terrível como um exército com bandeiras",
    ],
    chave: 3,
  },
  7: {
    resumo: "Outro elogio do corpo dela, e um convite para irem juntos para o campo.",
    detalhe:
      "Desta vez a descrição começa pelos pés e sobe, invertendo a ordem do capítulo 4. As imagens são arquitetônicas e agrícolas, com torres, tanques e montes de trigo cercados de lírios. O que muda o tom é o fim: ela é quem convida, propondo saírem ao campo, passarem a noite nas aldeias e madrugarem para ver se as vinhas floresceram. O desejo é declarado por ela com a frase sobre o desejo dele ser por ela.",
    marcos: [
      "O elogio começa pelos pés e sobe",
      "O pescoço como torre de marfim",
      "'Eu sou do meu amado, e ele tem desejo de mim'",
      "'Vem, ó amado meu, saiamos ao campo'",
      "As mandrágoras exalam perfume às portas",
    ],
    chave: 10,
  },
  8: {
    resumo:
      "O livro termina com a definição mais forte de amor do Antigo Testamento.",
    detalhe:
      "Os versículos 6 e 7 são o clímax e costumam ser lidos em casamentos: o amor é forte como a morte, e o ciúme é duro como a sepultura. As brasas dele são de fogo, e as muitas águas não o podem apagar, nem os rios afogá-lo. E vem a frase que descarta qualquer transação, dizendo que se alguém desse todos os bens da sua casa pelo amor, seria de todo desprezado. Amor não se compra, e o livro fecha com essa afirmação.",
    marcos: [
      "'Põe-me como selo sobre o teu coração'",
      "'O amor é forte como a morte'",
      "As muitas águas não podem apagar o amor",
      "Quem desse todos os bens pelo amor seria desprezado",
      "A vinha dela é sua, e ela a administra",
    ],
    chave: 7,
  },
};

CAPITULOS.ed = {
  1: {
    resumo:
      "Um rei persa assina um decreto mandando reconstruir um templo que não é o dele.",
    detalhe:
      "O livro abre dizendo que o Senhor despertou o espírito de Ciro, o que enquadra a política internacional dentro de outra leitura. O decreto é generoso e inclui apoio material dos vizinhos a quem for. O detalhe mais concreto é o inventário: os utensílios que Nabucodonosor havia levado são contados um a um e devolvidos, cinco mil e quatrocentas peças. Objetos saqueados voltando para casa é a primeira prova física de que o exílio acabou.",
    marcos: [
      "O Senhor desperta o espírito de Ciro",
      "O decreto autoriza a reconstrução do templo",
      "Os vizinhos devem ajudar quem subir",
      "Os utensílios levados por Nabucodonosor são devolvidos",
      "Cinco mil e quatrocentas peças são contadas",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "A lista de quem voltou, família por família, incluindo quem não conseguiu provar a origem.",
    detalhe:
      "É um censo e tem função de identidade: depois de setenta anos fora, era preciso dizer quem era quem. O total passa de quarenta e dois mil, mais servos e cantores. O detalhe humano está nos que buscaram o seu registro e não o acharam, e por isso foram excluídos do sacerdócio até que se levantasse um sacerdote com Urim e Tumim. A lista também conta cavalos, mulas, camelos e jumentos, o que dá a escala da mudança.",
    marcos: [
      "A lista das famílias que voltaram",
      "Mais de quarenta e dois mil pessoas ao todo",
      "Cantores, porteiros e servos do templo são contados",
      "Alguns não acham o próprio registro genealógico",
      "As ofertas voluntárias para a casa de Deus",
    ],
    chave: 68,
  },
  3: {
    resumo:
      "O altar é levantado antes do templo, e no dia dos alicerces choro e grito se misturam.",
    detalhe:
      "Eles começam pelo altar mesmo com medo dos povos em volta, o que mostra a prioridade: o culto antes da estrutura. Quando os alicerces são postos, há música e aclamação, mas os sacerdotes e velhos que tinham visto o primeiro templo choram em voz alta. O texto diz que o povo não conseguia distinguir o som da alegria do som do choro, e que o barulho se ouvia de longe. É uma das imagens mais honestas da Bíblia sobre recomeços.",
    marcos: [
      "O altar é levantado apesar do medo dos povos",
      "A Festa dos Tabernáculos é celebrada",
      "Os alicerces do templo são postos",
      "Os velhos que viram o primeiro templo choram alto",
      "Não se distinguia o júbilo do pranto",
    ],
    chave: 13,
  },
  4: {
    resumo:
      "Primeiro oferecem ajuda, depois desanimam, e por fim escrevem uma carta que para a obra.",
    detalhe:
      "A oposição vem em três formatos, e o primeiro é o mais sutil: uma oferta de parceria. A recusa é firme e cria inimigos. Então vem o desânimo contratado, com gente paga para frustrar o propósito, e por fim a via burocrática. A carta ao rei é uma peça de retórica eficiente, lembrando que aquela cidade tinha histórico de rebelião e alertando para a perda de tributos. Funciona, e a obra fica parada por anos.",
    marcos: [
      "Os adversários oferecem ajuda e são recusados",
      "Contratam conselheiros para frustrar o propósito",
      "Escrevem uma carta ao rei da Pérsia",
      "Alegam risco de rebelião e perda de tributos",
      "A obra é interrompida por ordem real",
    ],
    chave: 4,
  },
  5: {
    resumo:
      "Dois profetas falam, a obra recomeça sem autorização, e a fiscalização aparece.",
    detalhe:
      "Ageu e Zacarias profetizam, e os líderes voltam a construir antes de ter permissão, o que é uma decisão de risco. Quando Tatenai chega perguntando quem os autorizou, o texto registra algo notável: os olhos de Deus estavam sobre os anciãos, e por isso não os fizeram parar enquanto a consulta ia e voltava. A resposta deles é uma aula de defesa, recontando a história desde Nabucodonosor e citando o decreto de Ciro.",
    marcos: [
      "Ageu e Zacarias profetizam ao povo",
      "A obra recomeça sem nova autorização",
      "Tatenai pergunta quem os autorizou",
      "Os olhos de Deus estavam sobre os anciãos",
      "Pedem que se busque o decreto de Ciro nos arquivos",
    ],
    chave: 5,
  },
  6: {
    resumo:
      "O decreto antigo é achado num arquivo, e o rei manda pagar a obra com os impostos.",
    detalhe:
      "O documento aparece em Ecbátana, guardado num rolo, e o efeito é imediato. Dario não só confirma como amplia: manda que as despesas saiam da fazenda real, que forneçam animais para os sacrifícios, e impõe penalidade a quem atrapalhar. A obra termina em pouco tempo, e a dedicação é celebrada com alegria. A Páscoa é celebrada por quem voltou e também por quem se separou da imundícia dos povos da terra para buscar o Senhor.",
    marcos: [
      "O rolo com o decreto de Ciro é achado em Ecbátana",
      "Dario confirma e manda pagar a obra com os impostos",
      "A casa é terminada no sexto ano de Dario",
      "A dedicação é celebrada com alegria",
      "A Páscoa é celebrada pelos que voltaram e pelos que se juntaram",
    ],
    chave: 22,
  },
  7: {
    resumo:
      "Esdras aparece no meio do livro, e o que o define é uma decisão de coração.",
    detalhe:
      "Ele é apresentado como escriba hábil na lei de Moisés, e a frase que resume a vida dele é a do versículo 10: preparou o coração para buscar a lei, cumpri-la e ensinar. A ordem é significativa, porque ensinar vem depois de praticar. A carta de Artaxerxes lhe dá autoridade ampla, incluindo prata e ouro, isenção de impostos para os que servem no templo, e permissão para nomear juízes. O capítulo termina com ele reconhecendo a mão de Deus nisso.",
    marcos: [
      "Esdras é apresentado como escriba hábil na lei",
      "'Preparou o coração para buscar a lei, cumpri-la e ensinar'",
      "A carta de Artaxerxes lhe dá autoridade e recursos",
      "Os que servem no templo ficam isentos de tributo",
      "Ele reconhece a boa mão de Deus sobre ele",
    ],
    chave: 10,
  },
  8: {
    resumo:
      "Ele tem vergonha de pedir escolta ao rei depois do que disse sobre Deus, e jejua.",
    detalhe:
      "O dilema é honesto e raro: ele havia dito ao rei que a mão de Deus é sobre os que o buscam, e agora pedir soldados pareceria contradizer isso. Então jejua e pede o caminho seguro. O detalhe administrativo importa: ele pesa a prata, o ouro e os utensílios diante de testemunhas na saída e os pesa de novo na chegada, entregando tudo conferido. Transparência não é falta de fé, e o texto trata as duas coisas como compatíveis.",
    marcos: [
      "A caravana é reunida e faltam levitas",
      "Ele se envergonha de pedir escolta ao rei",
      "Proclama jejum junto ao rio Aava",
      "A prata e o ouro são pesados diante de testemunhas",
      "Tudo é conferido de novo na chegada",
    ],
    chave: 22,
  },
  9: {
    resumo:
      "Ao saber dos casamentos mistos, ele arranca os próprios cabelos e fica sentado, atônito.",
    detalhe:
      "A reação é física e demorada, com ele rasgando as vestes e ficando assentado até a oferta da tarde. A oração que faz é toda na primeira pessoa do plural, incluindo-se na culpa de algo que ele não cometeu. O argumento central é de escala: depois de tudo o que nos sobreveio, e depois de Deus nos ter dado um restante, tornaríamos a quebrar os mandamentos. Ele termina sem pedir nada, apenas constatando que não é possível estar de pé ali.",
    marcos: [
      "A denúncia dos casamentos com os povos da terra",
      "Esdras rasga as vestes e arranca cabelos",
      "Fica assentado e atônito até a oferta da tarde",
      "Ora incluindo-se na culpa do povo",
      "'Não podemos subsistir diante de ti por causa disto'",
    ],
    chave: 6,
  },
  10: {
    resumo:
      "O povo decide desfazer os casamentos, e o capítulo termina com uma lista de nomes.",
    detalhe:
      "É um dos finais mais desconfortáveis do Antigo Testamento, e o texto não suaviza nem celebra. A proposta parte de Secanias, e o povo concorda chorando debaixo de chuva forte, pedindo prazo porque não era trabalho de um dia. Uma comissão trabalha três meses. A lista final de nomes inclui sacerdotes, e o último versículo menciona sem nenhum comentário que algumas dessas mulheres tinham filhos. O livro acaba aí, sem epílogo.",
    marcos: [
      "Secanias propõe um pacto para desfazer os casamentos",
      "O povo concorda chorando debaixo de chuva forte",
      "Pedem prazo, porque não é trabalho de um ou dois dias",
      "Uma comissão examina os casos por três meses",
      "A lista de nomes encerra o livro",
    ],
    chave: 4,
  },
};

CAPITULOS.ne = {
  1: {
    resumo:
      "Um copeiro do rei ouve notícias ruins de casa e chora por dias antes de fazer qualquer coisa.",
    detalhe:
      "Ele pergunta e recebe a resposta que teme: o muro está derrubado e as portas queimadas. A reação é sentar, chorar, jejuar e orar por dias, o que é notável para um livro conhecido por gestão e execução. A oração recita as promessas de Deus de volta a ele, e termina com um pedido específico e um detalhe revelador na última linha, quando ele informa ao leitor que era copeiro do rei, ou seja, tinha acesso.",
    marcos: [
      "A notícia chega de que o muro está derrubado",
      "Neemias senta, chora e jejua por dias",
      "A oração recita as promessas feitas a Moisés",
      "Ele pede misericórdia diante daquele homem",
      "'Eu era copeiro do rei'",
    ],
    chave: 4,
  },
  2: {
    resumo:
      "Com medo, ele pede ao rei o que quer, e chega em Jerusalém para inspecionar de noite.",
    detalhe:
      "O rei nota a tristeza no rosto dele, o que era perigoso na corte, e ele mesmo diz que temeu muito. A resposta que dá é calculada e o texto registra que entre a pergunta do rei e a sua fala ele orou ao Deus dos céus, uma oração de segundos. Já em Jerusalém, ele não anuncia nada por três dias e faz a inspeção de madrugada, sozinho, sem contar a ninguém. Só depois de ver com os próprios olhos é que convoca o povo.",
    marcos: [
      "O rei percebe a tristeza no seu rosto",
      "Ele ora antes de responder",
      "Pede cartas de trânsito e madeira",
      "Inspeciona o muro de noite, sem contar a ninguém",
      "'Vinde, reedifiquemos o muro de Jerusalém'",
    ],
    chave: 18,
  },
  3: {
    resumo:
      "A obra é dividida por portões, e cada família conserta o trecho em frente à própria casa.",
    detalhe:
      "O capítulo parece uma lista e é, na verdade, um projeto de gestão. O princípio é repetido dezenas de vezes: cada um edificou defronte da sua casa. O trabalho é distribuído por proximidade e por interesse direto. Há detalhes que valem reparar: perfumistas e ourives entre os construtores, e as filhas de Salum trabalhando ao lado do pai. E uma nota irônica sobre os nobres de Tecoa, que não se sujeitaram ao serviço do seu Senhor.",
    marcos: [
      "A obra é dividida por portões e trechos",
      "Cada um edifica defronte da própria casa",
      "Ourives e perfumistas entre os construtores",
      "As filhas de Salum trabalham na obra",
      "Os nobres de Tecoa se recusam a ajudar",
    ],
    chave: 28,
  },
  4: {
    resumo:
      "Zombaria, ameaça e cansaço ao mesmo tempo, e a solução é trabalhar armado.",
    detalhe:
      "A oposição começa com deboche, dizendo que uma raposa subindo derrubaria aquele muro, e escala para conspiração armada. O momento mais difícil é interno, com Judá dizendo que as forças acabaram e que há muito entulho. A reorganização é prática: metade trabalha e metade fica armada, cada um com a espada à cintura, e quem toca a trombeta fica ao lado de Neemias. A frase que ele usa para motivar é sobre a obra ser grande e extensa e estarem separados uns dos outros.",
    marcos: [
      "Sambalate zomba dizendo que uma raposa derrubaria o muro",
      "Conspiram para atacar de surpresa",
      "'As forças dos carregadores desfalecem'",
      "Metade trabalha e metade fica armada",
      "Cada um com a espada à cintura, edificando",
    ],
    chave: 14,
  },
  5: {
    resumo:
      "No meio da obra, descobre-se que os ricos estão cobrando juros dos próprios irmãos.",
    detalhe:
      "A crise é interna e econômica: famílias empenham campos e vinhas e vendem filhos para comer. Neemias diz que se irou muito ao ouvir o clamor, e confronta os nobres em assembleia pública, usando um argumento que não tem resposta, sobre resgatarem irmãos vendidos e agora venderem os próprios. Ele também abre mão do que lhe cabia como governador, e o capítulo detalha o custo diário da mesa dele, pago do próprio bolso.",
    marcos: [
      "O povo clama por causa da fome e dos juros",
      "Filhos e filhas são vendidos como servos",
      "Neemias confronta os nobres em assembleia",
      "Os campos e as casas são devolvidos",
      "Ele recusa o sustento devido ao governador",
    ],
    chave: 11,
  },
  6: {
    resumo:
      "Quatro convites suspeitos, uma carta aberta e um falso profeta, e o muro fica pronto.",
    detalhe:
      "As táticas mudam de forma e mantêm o objetivo. Os convites para uma reunião na planície de Ono recebem quatro vezes a mesma resposta, que virou a frase do livro: faço uma grande obra, não posso descer. Depois vem a carta aberta com boato de rebelião, e por fim um profeta pago para induzi-lo a se esconder no templo e assim se desacreditar. O muro termina em cinquenta e dois dias, e os inimigos reconhecem a origem daquilo.",
    marcos: [
      "Quatro convites para a planície de Ono",
      "'Faço uma grande obra, de modo que não poderei descer'",
      "A carta aberta com boato de rebelião",
      "Um profeta é pago para induzi-lo ao erro",
      "O muro é concluído em cinquenta e dois dias",
    ],
    chave: 3,
  },
  7: {
    resumo:
      "Com o muro pronto, ele organiza a guarda e resolve registrar quem é quem na cidade.",
    detalhe:
      "O critério de nomeação é dito em voz alta e vale reter: ele escolhe Hananias porque era homem fiel e temia a Deus mais do que muitos. O problema seguinte é demográfico, porque a cidade é grande e o povo dentro dela é pouco, e as casas não estavam edificadas. A solução começa por um registro, e o capítulo reproduz a lista de Esdras 2. Organizar quem está presente é o passo antes de repovoar.",
    marcos: [
      "As portas recebem porteiros e horários",
      "Hananias é nomeado por ser fiel e temente a Deus",
      "A cidade é grande e há pouca gente dentro",
      "O registro das famílias é retomado",
      "As ofertas para a obra são listadas",
    ],
    chave: 2,
  },
  8: {
    resumo:
      "O povo pede a leitura da Lei, fica de pé da manhã ao meio-dia, e chora ao entender.",
    detalhe:
      "A iniciativa parte do povo, que pede a Esdras que traga o livro. A leitura dura horas e é acompanhada de explicação, porque os levitas faziam entender o sentido, o que sugere tradução ou paráfrase para quem voltou falando aramaico. O choro é espontâneo, e a orientação é inesperada: não chorem, comam do que é gordo, bebam do doce e mandem porções a quem não tem nada preparado, porque a alegria do Senhor é a força de vocês.",
    marcos: [
      "O povo pede que Esdras traga o livro da Lei",
      "A leitura vai da manhã até o meio-dia",
      "Os levitas explicam o sentido do que é lido",
      "O povo chora ao ouvir",
      "'A alegria do Senhor é a vossa força'",
    ],
    chave: 10,
  },
  9: {
    resumo:
      "A oração mais longa da Bíblia recita a história inteira do povo, com honestidade brutal.",
    detalhe:
      "Depois da festa vem o jejum, e os levitas conduzem uma confissão que percorre desde a criação até o exílio. O padrão que a oração descreve é sempre o mesmo, com Deus dando e o povo se rebelando, e a expressão que se repete é sobre ele ser Deus perdoador, clemente e misericordioso. A parte mais dura é a autoavaliação do presente, reconhecendo que são servos na própria terra e que o produto dela vai para reis estrangeiros.",
    marcos: [
      "O povo se reúne em jejum, com pano de saco",
      "A oração percorre a história desde a criação",
      "'Tu, porém, és Deus perdoador, clemente e misericordioso'",
      "Reconhecem que a culpa foi sempre deles",
      "'Somos hoje servos na terra que deste a nossos pais'",
    ],
    chave: 17,
  },
  10: {
    resumo:
      "O compromisso é escrito, selado e assinado, com obrigações bem específicas.",
    detalhe:
      "Depois da confissão vem o documento, e o que chama atenção é o nível de detalhe. Não é uma declaração genérica de fidelidade: eles se comprometem sobre casamentos, sobre não comprar no sábado de quem trouxer mercadoria, sobre o ano de remissão de dívidas, sobre o imposto para o serviço do templo, sobre a lenha por sorteio e sobre os primeiros frutos. A última linha é a promessa de não abandonar a casa do seu Deus.",
    marcos: [
      "O pacto é escrito, selado e assinado",
      "Compromisso sobre casamentos com os povos da terra",
      "Não comprar no sábado de quem trouxer mercadoria",
      "O imposto anual para o serviço do templo",
      "'Não desampararemos a casa do nosso Deus'",
    ],
    chave: 39,
  },
  11: {
    resumo:
      "Sorteiam quem vai morar na cidade vazia, e abençoam quem se oferece sem sorteio.",
    detalhe:
      "O problema é que Jerusalém estava reconstruída e vazia, e morar ali significava deixar terra e vida montada em outro lugar. A solução é uma cota de um em cada dez, definida por sorte. O detalhe humano está no versículo 2, que diz que o povo abençoou todos os homens que voluntariamente se ofereceram para habitar em Jerusalém. O resto do capítulo lista quem ficou, por família e por função.",
    marcos: [
      "Um em cada dez é sorteado para morar em Jerusalém",
      "O povo abençoa os que se oferecem voluntariamente",
      "A lista dos que ficaram, por família",
      "Os encarregados do serviço do templo",
      "As aldeias onde os demais se estabeleceram",
    ],
    chave: 2,
  },
  12: {
    resumo:
      "A dedicação do muro é feita com dois coros andando em direções opostas pelo alto dele.",
    detalhe:
      "A ideia é visual e sonora: duas grandes companhias de ação de graças sobem ao muro e caminham em sentidos contrários, cada uma com músicos, até se encontrarem do outro lado, na casa de Deus. O texto diz que a alegria se ouviu de longe, e registra que as mulheres e as crianças também se alegraram. Depois de meses de ameaça e trabalho armado, a cidade celebra em cima da própria defesa.",
    marcos: [
      "Os sacerdotes e levitas são listados",
      "Dois grandes coros sobem ao muro",
      "Andam em direções opostas, com música",
      "Encontram-se na casa de Deus",
      "A alegria se ouvia de longe",
    ],
    chave: 43,
  },
  13: {
    resumo:
      "Ele volta de viagem e encontra quase tudo o que foi combinado desfeito.",
    detalhe:
      "O final do livro é realista e um pouco amargo. Na ausência dele, um inimigo ganhou uma sala dentro do templo, os levitas ficaram sem sustento e voltaram para o campo, e o comércio no sábado virou rotina. As reações são físicas e ele as conta sem editar, incluindo ter contendido, amaldiçoado e arrancado cabelos. Entre as providências, ele repete várias vezes um pedido curto para Deus se lembrar dele, que é o modo como o livro se encerra.",
    marcos: [
      "Tobias havia ganhado uma sala dentro do templo",
      "Os levitas voltaram ao campo por falta de sustento",
      "As portas são fechadas antes do sábado",
      "Ele confronta os que casaram com estrangeiras",
      "'Lembra-te de mim, meu Deus, para bem'",
    ],
    chave: 14,
  },
};

CAPITULOS["2sm"] = {
  1: {
    resumo:
      "Um mensageiro traz a coroa achando que traz boa notícia, e é executado por isso.",
    detalhe:
      "O amalequita conta uma versão em que ele mesmo teria matado Saul, provavelmente mentindo para conseguir recompensa. Ele leu mal a situação inteira. A reação de Davi é rasgar as vestes e jejuar, e depois compor um lamento que manda ensinar aos filhos de Judá. O poema não diz uma palavra contra Saul, e a parte sobre Jônatas é a mais conhecida, com o amor descrito como mais maravilhoso que o amor de mulheres.",
    marcos: [
      "Um amalequita traz a coroa e o bracelete de Saul",
      "Ele mente dizendo ter matado o rei",
      "Davi rasga as vestes e jejua até a tarde",
      "'Como caíram os valentes!'",
      "O lamento por Jônatas é ensinado ao povo",
    ],
    chave: 19,
  },
  2: {
    resumo:
      "Davi é ungido sobre Judá, e o resto do país segue outro rei, com guerra entre os dois.",
    detalhe:
      "O primeiro ato dele é consultar antes de subir, e o segundo é agradecer aos homens de Jabes-Gileade pelo que fizeram com o corpo de Saul. Do outro lado, Abner faz de Is-Bosete rei do norte. O episódio no tanque de Gibeom começa com uma proposta que soa esportiva, doze contra doze, e termina com todos mortos e uma guerra longa. Asael persegue Abner sem desviar e morre pela própria teimosia, o que vai custar caro depois.",
    marcos: [
      "Davi consulta antes de subir a Hebrom",
      "É ungido rei sobre a casa de Judá",
      "Abner faz Is-Bosete rei do norte",
      "Doze contra doze no tanque de Gibeom",
      "Asael persegue Abner e é morto",
    ],
    chave: 1,
  },
  3: {
    resumo:
      "O general do norte muda de lado, fecha acordo, e é assassinado por vingança pessoal.",
    detalhe:
      "Abner rompe com Is-Bosete por causa de uma acusação sobre uma concubina, e a resposta dele mostra que era ele quem sustentava aquele trono. A negociação com Davi avança e inclui a devolução de Mical, com uma cena dolorosa do marido chorando atrás dela até ser mandado voltar. Joabe mata Abner no portão, em vingança por Asael, e Davi se declara publicamente inocente e faz luto, o que é também um ato político necessário.",
    marcos: [
      "Abner rompe com Is-Bosete",
      "Negocia a entrega do reino a Davi",
      "Mical é devolvida e o marido a segue chorando",
      "Joabe mata Abner no portão de Hebrom",
      "Davi faz luto público e se declara inocente",
    ],
    chave: 39,
  },
  4: {
    resumo:
      "Dois capitães matam o próprio rei na cama e levam a cabeça esperando recompensa.",
    detalhe:
      "É a segunda vez no livro em que alguém aposta que Davi celebraria a morte de um rival, e a segunda vez em que a aposta sai errada. A resposta dele cita o caso do amalequita como precedente. O detalhe que o narrador insere no meio do capítulo tem função: apresenta Mefibosete, filho de Jônatas, aleijado desde os cinco anos por uma queda na fuga, e essa informação volta no capítulo 9.",
    marcos: [
      "Is-Bosete perde a coragem com a morte de Abner",
      "Mefibosete é apresentado, aleijado dos pés",
      "Dois capitães matam Is-Bosete enquanto dormia",
      "Levam a cabeça a Davi esperando recompensa",
      "Davi manda executá-los, citando o caso do amalequita",
    ],
    chave: 9,
  },
  5: {
    resumo:
      "Aos trinta anos ele se torna rei de todo o povo, e toma uma cidade tida como inexpugnável.",
    detalhe:
      "As tribos do norte vêm a Hebrom com três argumentos: parentesco, histórico militar e a palavra do Senhor. Jerusalém era jebuseia e considerada tão segura que os defensores provocam dizendo que até cegos e coxos a defenderiam. A escolha da cidade é politicamente brilhante, porque não pertencia nem a Judá nem às tribos do norte. O capítulo termina com duas batalhas em que ele consulta antes de cada uma, e na segunda recebe uma tática diferente.",
    marcos: [
      "As tribos do norte o ungem em Hebrom",
      "Jerusalém é tomada dos jebuseus",
      "A cidade passa a ser chamada Cidade de Davi",
      "Hirão de Tiro envia cedro e artesãos",
      "Ele consulta antes de cada batalha e recebe táticas diferentes",
    ],
    chave: 10,
  },
  6: {
    resumo:
      "A arca é trazida numa festa, um homem morre ao tocá-la, e o rei dança em público.",
    detalhe:
      "O carro novo era o método filisteu, não o prescrito, e a morte de Uzá interrompe tudo. Davi fica com medo e com raiva, e deixa a arca na casa de Obede-Edom por três meses. Na segunda tentativa, feita como devia, ele dança com todas as suas forças vestindo uma estola de linho. O confronto final com Mical é de classes e de gerações: ela fala em dignidade real, ele responde falando em se envilecer ainda mais diante do Senhor.",
    marcos: [
      "A arca é posta num carro novo",
      "Uzá toca nela e morre",
      "A arca fica três meses na casa de Obede-Edom",
      "Davi dança com todas as suas forças",
      "Mical o despreza e o confronta",
    ],
    chave: 22,
  },
  7: {
    resumo:
      "Ele quer construir uma casa para Deus, e ouve que Deus é quem vai construir a casa dele.",
    detalhe:
      "A intenção é boa e Natã até aprova de imediato, antes de receber palavra nenhuma, e precisa voltar atrás na mesma noite. O jogo de palavras é o centro do capítulo, porque casa significa templo e também dinastia. A promessa de um trono firmado para sempre é a base da esperança messiânica que atravessa o resto da Bíblia. A oração de Davi em resposta é de alguém atordoado, repetindo a pergunta sobre quem é ele para receber aquilo.",
    marcos: [
      "Davi quer construir uma casa para a arca",
      "Natã aprova e depois é corrigido de noite",
      "'O Senhor te anuncia que ele te fará casa'",
      "A promessa de um trono firmado para sempre",
      "'Quem sou eu, Senhor Deus, e qual é a minha casa?'",
    ],
    chave: 16,
  },
  8: {
    resumo: "Um resumo de campanhas e conquistas, com uma nota sobre como ele governava.",
    detalhe:
      "O capítulo é de arquivo militar, listando vitórias sobre filisteus, moabitas, sírios e edomitas, e o bronze e a prata recolhidos, que ele consagra. O que vale destacar é o versículo 15, que diz que ele reinava sobre todo o Israel administrando juízo e justiça a todo o seu povo. Depois da lista de guerras, o resumo do governo é sobre justiça, e o texto ainda registra o organograma da administração.",
    marcos: [
      "Vitórias sobre filisteus, moabitas e sírios",
      "O bronze e a prata são consagrados ao Senhor",
      "Guarnições são postas em Edom",
      "'Reinava sobre todo o Israel, administrando juízo e justiça'",
      "Os oficiais da administração são listados",
    ],
    chave: 15,
  },
  9: {
    resumo:
      "Ele procura alguém da família do antecessor para fazer o bem, e acha um homem aleijado.",
    detalhe:
      "A pergunta que abre o capítulo é incomum para um rei recém-consolidado, porque normalmente se procuram herdeiros do rival para eliminá-los. Ele procura para mostrar benevolência por amor de Jônatas. Mefibosete chega com medo e se autodescreve como cão morto. A decisão é devolver todas as terras de Saul e sentá-lo à mesa do rei como um dos filhos. A última linha do capítulo repete, sem alarde, que ele era coxo de ambos os pés.",
    marcos: [
      "'Há ainda alguém da casa de Saul?'",
      "Ziba indica Mefibosete, filho de Jônatas",
      "Ele chega com medo e se chama de cão morto",
      "As terras de Saul lhe são devolvidas",
      "Come continuamente à mesa do rei",
    ],
    chave: 7,
  },
  10: {
    resumo:
      "Um gesto de condolências é interpretado como espionagem, e os enviados são humilhados.",
    detalhe:
      "Davi manda consolar o novo rei amonita pela morte do pai, e os conselheiros dele convencem o rapaz de que aquilo é reconhecimento de terreno. O que fazem com os embaixadores é humilhação calculada: raspam metade da barba e cortam as vestes pela metade. O detalhe de cuidado de Davi é mandar que fiquem em Jericó até a barba crescer. A guerra que se segue é grande, e a fala de Joabe antes da batalha é de comando sóbrio.",
    marcos: [
      "Davi manda consolar Hanum pela morte do pai",
      "Os conselheiros o convencem de que são espiões",
      "Metade da barba dos enviados é raspada",
      "Davi manda que fiquem em Jericó até a barba crescer",
      "Joabe enfrenta cerco por dois lados",
    ],
    chave: 12,
  },
  11: {
    resumo:
      "No tempo em que os reis saíam para a guerra, ele ficou, e o resto veio disso.",
    detalhe:
      "O primeiro versículo já diz tudo com uma economia devastadora. A partir daí a sequência é de verbos: viu, mandou perguntar, mandou buscar, tomou. Urias, o estrangeiro, é quem age com integridade, recusando ir para casa enquanto a arca e o exército estão em campo, e o rei tenta embebedá-lo para conseguir. A carta que o condena é levada pela própria vítima. O último versículo é uma frase curta que muda o tom do livro inteiro.",
    marcos: [
      "No tempo em que os reis saem para a guerra, Davi fica",
      "Ele vê Bate-Seba do terraço e manda buscá-la",
      "Urias se recusa a ir para casa",
      "A carta que ordena a morte é levada pelo próprio Urias",
      "'Esta coisa que Davi fizera foi má aos olhos do Senhor'",
    ],
    chave: 27,
  },
  12: {
    resumo:
      "Uma história sobre uma ovelhinha faz o rei se condenar antes de perceber que é sobre ele.",
    detalhe:
      "A parábola de Natã é uma obra-prima de estratégia, porque ativa o senso de justiça de Davi contra um caso alheio antes de revelar o alvo. A sentença que ele mesmo pronuncia volta contra si. A confissão é curta, de quatro palavras no hebraico, e o perdão é imediato, mas as consequências não são canceladas. A morte da criança é narrada com um comportamento que espanta os servos, porque ele jejua enquanto há esperança e come quando acaba.",
    marcos: [
      "A parábola do rico que toma a ovelha do pobre",
      "'Tu és o homem!'",
      "'Pequei contra o Senhor'",
      "A criança adoece e morre no sétimo dia",
      "Salomão nasce e é amado pelo Senhor",
    ],
    chave: 7,
  },
  13: {
    resumo:
      "O crime contra Tamar é planejado por um conselheiro, e ninguém na família faz o que devia.",
    detalhe:
      "O capítulo mostra as consequências anunciadas por Natã chegando pela porta de dentro. Jonadabe é descrito como muito sagaz, e usa isso para armar o plano. A fala de Tamar antes do crime é lúcida e desesperada, e depois dele o texto diz que o ódio de Amnom passou a ser maior que o amor que sentira. Davi se ira e não faz nada, e é esse vácuo que Absalão preenche dois anos depois, com vingança planejada.",
    marcos: [
      "Jonadabe arma o plano do fingimento de doença",
      "Tamar argumenta e é violentada",
      "Amnom a expulsa e o ódio supera o desejo",
      "Davi se ira muito e não toma providência",
      "Absalão manda matar Amnom dois anos depois",
    ],
    chave: 21,
  },
  14: {
    resumo:
      "Joabe contrata uma atriz para contar uma história falsa e convencer o rei a perdoar.",
    detalhe:
      "A técnica é a mesma de Natã, e desta vez a serviço da política. A mulher de Tecoa se apresenta como viúva cujo filho sobrevivente será executado pela família, e conduz o rei até uma decisão que se aplica ao caso dele. O argumento mais bonito é o dela sobre Deus não tirar a vida, mas cogitar meios para que o banido não continue banido. Davi permite a volta de Absalão, mas se recusa a vê-lo por dois anos, o que resolve pela metade e piora tudo.",
    marcos: [
      "Joabe manda buscar uma mulher sábia de Tecoa",
      "Ela conta a história dos dois filhos que brigaram",
      "'Deus cogita meios para que o banido não permaneça banido'",
      "Davi reconhece a mão de Joabe no plano",
      "Absalão volta, mas não vê o rosto do rei por dois anos",
    ],
    chave: 14,
  },
  15: {
    resumo:
      "Quatro anos ouvindo reclamações no portão, e ele rouba o coração do povo.",
    detalhe:
      "A estratégia de Absalão é de campanha política moderna: ele levanta cedo, fica à beira do caminho, escuta quem vem com causa, diz que a causa é boa e lamenta que não haja quem ouça, e beija quem se aproxima. A frase que o narrador usa é que ele roubava o coração dos homens de Israel. A fuga de Davi é humilde, descalço e chorando, e ele manda a arca de volta para a cidade, dizendo que se achar graça voltará a vê-la.",
    marcos: [
      "Absalão se posta no caminho da porta e ouve as causas",
      "'Rouba o coração dos homens de Israel'",
      "A conspiração é declarada em Hebrom",
      "Davi foge a pé, subindo o monte das Oliveiras chorando",
      "Manda a arca de volta e deixa Husai como infiltrado",
    ],
    chave: 6,
  },
  16: {
    resumo:
      "No caminho da fuga, um servo mente por interesse e um parente amaldiçoa em público.",
    detalhe:
      "Ziba aparece com provisões e uma acusação contra Mefibosete que o rei aceita sem verificar, o que se mostrará precipitado. Simei atira pedras e chama Davi de homem de sangue, e Abisai pede permissão para matá-lo. A resposta de Davi é a parte mais notável do capítulo, dizendo que talvez o Senhor tenha mandado amaldiçoar, e que talvez ele atente para a aflição dele. Ele recebe a humilhação sem revidar.",
    marcos: [
      "Ziba acusa Mefibosete e recebe as terras",
      "Simei amaldiçoa e atira pedras",
      "Abisai pede para cortar a cabeça dele",
      "'Deixai-o amaldiçoar, porque o Senhor lhe ordenou'",
      "Aitofel aconselha Absalão publicamente",
    ],
    chave: 12,
  },
  17: {
    resumo:
      "O melhor conselheiro do reino dá o conselho certo, é ignorado, e vai se enforcar.",
    detalhe:
      "Aitofel propõe perseguir imediatamente com doze mil homens, atacando o rei cansado, o que teria funcionado. Husai propõe o oposto, com uma linguagem muito mais épica sobre reunir todo o Israel, e vence pela retórica. O texto diz explicitamente que o Senhor ordenara que o bom conselho fosse dissipado. Aitofel percebe na hora o que aquilo significa, vai para casa, põe a casa em ordem e se enforca, o que é um suicídio calculado.",
    marcos: [
      "Aitofel propõe perseguição imediata",
      "Husai propõe reunir todo o Israel",
      "O conselho de Husai prevalece",
      "Dois mensageiros escapam escondidos num poço",
      "Aitofel põe a casa em ordem e se enforca",
    ],
    chave: 14,
  },
  18: {
    resumo:
      "A batalha é vencida, o filho morre preso pelos cabelos, e o pai só pergunta por ele.",
    detalhe:
      "Davi pede em voz alta diante de todo o exército que tratem o jovem com brandura, o que coloca os comandantes num dilema impossível. Absalão fica preso num carvalho e Joabe o mata contra a ordem expressa, argumentando de forma fria com o soldado que se recusou. A corrida dos mensageiros é narrada com suspense, e o rei interrompe as duas notícias de vitória com a mesma pergunta sobre o rapaz. O grito final é uma das falas mais conhecidas da Bíblia.",
    marcos: [
      "Davi pede que tratem Absalão com brandura",
      "Absalão fica preso pela cabeça num carvalho",
      "Joabe o mata contra a ordem do rei",
      "Dois mensageiros correm com a notícia",
      "'Meu filho Absalão, quem me dera eu morrera por ti'",
    ],
    chave: 33,
  },
  19: {
    resumo:
      "O luto do rei desmoraliza o exército, e Joabe o confronta com uma dureza necessária.",
    detalhe:
      "A vitória vira funeral e os soldados entram na cidade às escondidas, como quem foge. Joabe fala o que ninguém falaria, acusando o rei de amar os que o odeiam e odiar os que o amam, e o obriga a sentar-se à porta. A volta é cheia de acertos políticos: Simei é perdoado, Mefibosete explica a versão dele e o rei divide as terras sem apurar, e Barzilai recusa a recompensa com uma fala bonita sobre a idade.",
    marcos: [
      "O exército volta envergonhado por causa do luto",
      "Joabe confronta o rei com dureza",
      "Simei pede perdão e é poupado",
      "Mefibosete apresenta a sua versão",
      "Barzilai recusa a recompensa por causa da idade",
    ],
    chave: 6,
  },
  20: {
    resumo:
      "Mal acaba uma revolta e começa outra, e uma cidade inteira é salva por uma mulher.",
    detalhe:
      "Seba levanta o grito de separação, e o norte se retira. Joabe mata Amasa com um golpe traiçoeiro enquanto o cumprimenta, repetindo o método usado com Abner. O cerco a Abel-Bete-Maaca é interrompido por uma mulher sábia que chama pelo comandante e negocia, lembrando que sua cidade é mãe em Israel e que eles buscam destruir uma herança do Senhor. O acordo é feito e a cidade é poupada.",
    marcos: [
      "Seba proclama a separação do norte",
      "As concubinas deixadas no palácio são postas em reclusão",
      "Joabe mata Amasa enquanto o cumprimenta",
      "Uma mulher sábia negocia do alto do muro de Abel",
      "A cidade é poupada e a revolta termina",
    ],
    chave: 19,
  },
  21: {
    resumo:
      "Uma fome de três anos leva a um acerto antigo, e uma mãe vela os corpos dos filhos.",
    detalhe:
      "O capítulo trata de uma dívida deixada por Saul contra os gibeonitas, e a reparação exigida é dura. O que transforma a cena é Rispa, que estende um pano de saco sobre a rocha e fica ali desde o início da colheita até cair água do céu, espantando as aves de dia e os animais de noite. O gesto dela chega aos ouvidos de Davi, e é por causa dele que os ossos de Saul e Jônatas recebem sepultura digna.",
    marcos: [
      "Três anos de fome por causa dos gibeonitas",
      "Sete descendentes de Saul são entregues",
      "Rispa vela os corpos sobre a rocha",
      "Espanta as aves de dia e os animais de noite",
      "Davi manda sepultar os ossos de Saul e Jônatas",
    ],
    chave: 10,
  },
  22: {
    resumo: "Um cântico longo de vitória, quase idêntico ao Salmo 18.",
    detalhe:
      "O poema é antigo e provavelmente o mais antigo texto do livro. A abertura é uma sequência de metáforas de solidez, com rocha, fortaleza, escudo e alto refúgio. A parte central descreve uma teofania em que Deus desce e inclina os céus, e tira o salmista de águias profundas. O verso mais delicado está no meio da linguagem militar, dizendo que a benignidade de Deus é o que o engrandeceu, e que ele alargou os passos debaixo dele.",
    marcos: [
      "'O Senhor é o meu rochedo e o meu lugar forte'",
      "Na angústia invoquei o Senhor, e ele ouviu do seu templo",
      "Deus inclina os céus e desce",
      "'Tirou-me das muitas águas'",
      "'Alargaste os meus passos debaixo de mim'",
    ],
    chave: 36,
  },
  23: {
    resumo:
      "As últimas palavras, e depois a lista dos valentes, com a história da água de Belém.",
    detalhe:
      "A imagem que ele usa para o governo justo é de luz da manhã e de erva verde brotando da terra depois da chuva. A segunda metade lista os guerreiros, com feitos específicos que parecem impossíveis. A cena mais memorável é a dos três que rompem o acampamento inimigo para buscar água do poço de Belém porque ouviram o rei dizer que tinha vontade. Ele recusa beber e derrama a água diante do Senhor, porque aquilo era o sangue deles.",
    marcos: [
      "As últimas palavras de Davi, em poesia",
      "O governante justo é como luz da manhã",
      "A lista dos trinta e dos três valentes",
      "Três rompem o acampamento para buscar água de Belém",
      "Davi derrama a água em vez de bebê-la",
    ],
    chave: 4,
  },
  24: {
    resumo:
      "Um recenseamento vira pecado, e o lugar da praga se torna o terreno do futuro templo.",
    detalhe:
      "Até Joabe, que não era escrupuloso, questiona a ordem e pergunta por que o rei deseja aquilo. O problema não é contar, é o que o número representa em confiança na própria força. Davi escolhe cair nas mãos de Deus e não dos homens, argumentando que as misericórdias dele são muitas. No fim, ele se recusa a receber de graça a eira de Araúna, com a frase sobre não oferecer ao Senhor aquilo que não lhe custa nada.",
    marcos: [
      "Davi ordena o recenseamento do povo",
      "Joabe questiona a ordem e obedece",
      "O coração dele o acusa depois",
      "Ele escolhe cair nas mãos do Senhor",
      "'Não oferecerei holocaustos que não me custem nada'",
    ],
    chave: 24,
  },
};

CAPITULOS.pv = {
  1: {
    resumo:
      "O livro declara para que serve, e então a Sabedoria sai gritando na rua atrás de quem a ouça.",
    detalhe:
      "O prólogo é uma declaração de objetivo pedagógico, e inclui tanto o jovem sem experiência quanto o sábio que quer ouvir mais. A frase que organiza o livro inteiro é a do versículo 7, colocando o temor do Senhor como o princípio, ou seja, o ponto de partida do conhecimento. Depois vem o primeiro aviso, contra o convite do bando que promete ganho fácil. E a Sabedoria aparece como mulher que clama em praça pública, e não como segredo escondido.",
    marcos: [
      "O propósito declarado dos provérbios",
      "'O temor do Senhor é o princípio do saber'",
      "O convite do bando: lancemos a nossa sorte juntos",
      "A Sabedoria clama na rua e nas praças",
      "Quem a ouve habitará seguro",
    ],
    chave: 7,
  },
  2: {
    resumo:
      "Se você procurar sabedoria como quem procura prata enterrada, vai achar.",
    detalhe:
      "O capítulo é uma frase longa construída com se e então. A condição é ativa e escalonada: receber, guardar, inclinar o ouvido, clamar, buscar como prata e procurar como tesouro escondido. Só depois vem a promessa de entender o temor do Senhor. O argumento é que a sabedoria vem de Deus e ao mesmo tempo exige esforço de quem a busca, sem contradição entre as duas coisas. O resultado prático é livrar do caminho mau e da mulher estranha.",
    marcos: [
      "Se buscares como prata e como tesouro escondido",
      "'Então entenderás o temor do Senhor'",
      "O Senhor é quem dá a sabedoria",
      "Ela guarda o caminho dos seus santos",
      "Livra do caminho do mau e da mulher estranha",
    ],
    chave: 4,
  },
  3: {
    resumo:
      "Confie de coração e não se apoie no próprio entendimento, e ele endireitará as veredas.",
    detalhe:
      "É o capítulo mais citado do livro e a chave dele é o contraste entre confiar e apoiar-se. Não manda desligar a razão, manda não a tomar como fundamento. Vem acompanhado de instruções bem concretas: honrar o Senhor com os bens, não reter o bem de quem tem direito a ele quando está no seu poder fazê-lo, não tramar contra o vizinho que mora seguro ao seu lado. E há uma nota delicada sobre a disciplina ser sinal de amor, e não de rejeição.",
    marcos: [
      "'Confia no Senhor de todo o teu coração'",
      "'Não te estribes no teu próprio entendimento'",
      "Honra ao Senhor com os teus bens",
      "A disciplina do Senhor é sinal de amor",
      "Não retenhas o bem de quem tem direito a ele",
    ],
    chave: 5,
  },
  4: {
    resumo:
      "Um pai conta o que o próprio pai lhe ensinou, e manda guardar o coração acima de tudo.",
    detalhe:
      "A instrução vem em cadeia de três gerações, o que dá peso ao conselho. A imagem central é de dois caminhos, com o dos justos comparado à luz da aurora que vai clareando até ser dia perfeito, e o dos perversos à escuridão em que se tropeça sem saber no quê. O versículo 23 é o eixo: guardar o coração acima de tudo, porque dele procedem as saídas da vida. Depois disso ele fala da boca, dos olhos e dos pés, nessa ordem.",
    marcos: [
      "A instrução recebida do próprio pai",
      "'Adquire a sabedoria, adquire o entendimento'",
      "A vereda dos justos é como a luz da aurora",
      "'Sobre tudo o que se deve guardar, guarda o teu coração'",
      "Cuidado com a boca, os olhos e os pés",
    ],
    chave: 23,
  },
  5: {
    resumo:
      "Um alerta franco sobre adultério, que termina elogiando o prazer dentro do casamento.",
    detalhe:
      "A descrição começa pelo que atrai, com lábios que destilam mel, e segue mostrando o amargor do fim. O argumento não é moralista abstrato, é de consequência concreta, incluindo perda de honra, de anos e de patrimônio para estranhos. O que surpreende muito leitor é a segunda metade, que fala da cisterna própria e do prazer com a mulher da mocidade em linguagem explicitamente sensual, terminando com o pedido de andar sempre embriagado desse amor.",
    marcos: [
      "Os lábios da mulher estranha destilam mel",
      "O fim dela é amargoso como o absinto",
      "'Bebe a água da tua própria cisterna'",
      "'Alegra-te com a mulher da tua mocidade'",
      "Os caminhos do homem estão perante os olhos do Senhor",
    ],
    chave: 18,
  },
  6: {
    resumo:
      "Três alertas práticos, uma visita à formiga, e uma lista de sete coisas detestadas.",
    detalhe:
      "O capítulo começa com um conselho financeiro direto sobre fiança, mandando ir e livrar-se com urgência, como gazela da mão do caçador. Depois vem a formiga, que não tem chefe nem supervisor e mesmo assim prepara o pão no verão, e a descrição do sono do preguiçoso é quase cômica. A lista das sete coisas é uma síntese dos vícios sociais, e vale notar que três delas são sobre a boca e uma é sobre semear contendas entre irmãos.",
    marcos: [
      "O alerta sobre ficar por fiador do próximo",
      "'Vai ter com a formiga, ó preguiçoso'",
      "Um pouco de sono, um pouco de dormir",
      "Seis coisas o Senhor odeia, e sete abomina",
      "O adúltero destrói a própria alma",
    ],
    chave: 6,
  },
  7: {
    resumo:
      "Da janela, o mestre observa um jovem sem juízo indo direto para a armadilha.",
    detalhe:
      "A cena é narrada como reportagem, com o professor olhando pela treliça e acompanhando o rapaz que atravessa a rua ao anoitecer. O discurso da mulher é reproduzido inteiro, e é competente: fala de sacrifício pago, de perfumes no leito, de marido viajando e de data marcada para voltar. O fecho usa três imagens de animais que não entendem o perigo, o boi que vai ao matadouro, o tolo que vai ao castigo e a ave que corre para o laço.",
    marcos: [
      "O mestre observa da janela, pela treliça",
      "Um jovem sem juízo atravessa a rua ao anoitecer",
      "O discurso preparado da mulher",
      "'Como o boi que vai ao matadouro'",
      "A casa dela é caminho para a sepultura",
    ],
    chave: 23,
  },
  8: {
    resumo:
      "A Sabedoria fala em primeira pessoa e diz que estava lá antes da criação do mundo.",
    detalhe:
      "Ela se posiciona no alto, nos cruzamentos e nas portas da cidade, ou seja, onde as decisões são tomadas. O discurso vai crescendo até a parte mais famosa, em que ela descreve a própria antiguidade, antes dos montes, das fontes e do abismo. A imagem final é a mais alegre do livro: ela estava ao lado dele como artífice, era o seu deleite dia após dia, e se regozijava no mundo habitável e com os filhos dos homens.",
    marcos: [
      "A Sabedoria clama nas alturas e nas encruzilhadas",
      "'Comigo está o conselho e o verdadeiro saber'",
      "'O Senhor me possuiu no início da sua carreira'",
      "Antes dos montes e das fontes, ela já existia",
      "Era o deleite dele dia após dia, regozijando-se sempre",
    ],
    chave: 30,
  },
  9: {
    resumo:
      "Duas mulheres oferecem banquete na mesma rua, e a diferença está no que servem.",
    detalhe:
      "A Sabedoria construiu casa de sete colunas, abateu a carne, preparou o vinho e mandou as criadas convidarem. A Loucura não cozinha nada, só senta à porta e chama os que passam, oferecendo água furtada e pão comido às escondidas, e o apelo dela é justamente o do segredo. No meio das duas cenas há uma observação prática sobre repreensão: corrija o sábio e ele o amará; corrija o escarnecedor e ele o odiará.",
    marcos: [
      "A Sabedoria edificou a sua casa de sete colunas",
      "Manda as criadas convidarem nos altos da cidade",
      "'Repreende o sábio, e ele te amará'",
      "A Loucura senta à porta e chama os que passam",
      "'As águas furtadas são doces'",
    ],
    chave: 10,
  },
  10: {
    resumo:
      "Começam os ditos soltos, quase todos construídos como oposição entre duas condutas.",
    detalhe:
      "Daqui até o capítulo 22 o livro muda de forma: saem os discursos longos e entram provérbios de dois versos, em que a segunda linha contradiz a primeira. Não se lê seguido como narrativa, se lê pausando. Os temas que dominam este capítulo são a boca, o trabalho e o dinheiro. Há um alerta sobre falar demais, dizendo que na multidão de palavras não falta transgressão, e a observação de que o ódio suscita contendas e o amor cobre todos os pecados.",
    marcos: [
      "O filho sábio alegra o pai; o insensato entristece a mãe",
      "A mão dos diligentes enriquece",
      "'Na multidão de palavras não falta transgressão'",
      "O amor cobre todos os pecados",
      "A bênção do Senhor é que enriquece",
    ],
    chave: 12,
  },
  11: {
    resumo:
      "Balança falsa, generosidade que aumenta o que se tem, e o peso de uma cidade inteira.",
    detalhe:
      "Abre com um princípio comercial simples: balança enganosa é abominação e peso justo é o agrado dele. O tema forte do capítulo é a relação entre o indivíduo e a cidade, porque quando os justos prosperam a cidade se alegra. E há um dos paradoxos mais bonitos do livro, sobre alguém que espalha e ainda assim aumenta, enquanto outro retém mais do que é justo e empobrece. A alma generosa é comparada a quem rega e por isso é regado.",
    marcos: [
      "Balança enganosa é abominação ao Senhor",
      "A integridade guia os retos",
      "'Um dá liberalmente e ainda lhe é acrescentado'",
      "A alma generosa prosperará",
      "A cidade se exalta pela bênção dos retos",
    ],
    chave: 25,
  },
  12: {
    resumo:
      "Palavras que ferem como espada e outras que curam, e um justo que cuida do próprio animal.",
    detalhe:
      "O capítulo mistura conselhos sobre trabalho e sobre fala, e o verso mais lembrado é o 18, contrapondo quem fala levianamente como quem dá golpes de espada e a língua dos sábios que é medicina. Há também uma observação incomum e muito citada em discussões sobre ética animal, dizendo que o justo atende à vida dos seus animais. E aparece um conselho de ouvir conselho, reconhecendo que o caminho do tolo parece certo aos olhos dele.",
    marcos: [
      "A mulher virtuosa é a coroa do seu marido",
      "'Há quem fale como se dera golpes de espada'",
      "A língua dos sábios é medicina",
      "'O justo atende à vida dos seus animais'",
      "O caminho do tolo é reto aos seus próprios olhos",
    ],
    chave: 18,
  },
  13: {
    resumo:
      "Esperança que demora adoece o coração, e dinheiro que vem depressa vai embora depressa.",
    detalhe:
      "O tema econômico é forte: riqueza adquirida às pressas diminui, e quem ajunta pouco a pouco aumenta. Mas o versículo que mais marca é o 12, sobre a esperança adiada que enfraquece o coração e o desejo cumprido que é árvore de vida, porque ele nomeia uma experiência que todo mundo reconhece. Há também um conselho sobre companhia, dizendo que quem anda com sábios será sábio e o companheiro dos tolos se destrói.",
    marcos: [
      "Quem guarda a boca conserva a alma",
      "'A esperança adiada faz adoecer o coração'",
      "A riqueza adquirida às pressas diminui",
      "'Quem anda com os sábios será sábio'",
      "A luz dos justos alegra",
    ],
    chave: 12,
  },
  14: {
    resumo:
      "A mulher sábia edifica a casa, e há um caminho que parece certo e termina em morte.",
    detalhe:
      "O capítulo é o mais social do bloco, com vários ditos sobre como se trata o pobre. A afirmação mais direta é que quem oprime o pobre insulta o Criador dele, e quem tem misericórdia do necessitado o honra. O versículo 12 é dos mais citados da Bíblia e é sóbrio, dizendo que há caminho que ao homem parece direito e cujo fim são os caminhos da morte. Há ainda uma nota realista sobre o boi sujar a manjedoura e produzir.",
    marcos: [
      "A mulher sábia edifica a sua casa",
      "'Há caminho que ao homem parece direito'",
      "Quem oprime o pobre insulta o seu Criador",
      "O coração conhece a sua própria amargura",
      "A justiça exalta uma nação",
    ],
    chave: 12,
  },
  15: {
    resumo:
      "A resposta branda desvia o furor, e os olhos do Senhor estão em todo lugar.",
    detalhe:
      "Este é o capítulo da fala e do humor. Começa com o contraste entre resposta branda e palavra dura, e traz várias observações sobre o efeito do estado de espírito, com o coração alegre que é banquete contínuo. O mais desconfortável é o realismo econômico dos versos que preferem pouco com temor do Senhor a muito tesouro com inquietação, e um prato de hortaliças onde há amor a um boi cevado onde há ódio.",
    marcos: [
      "'A resposta branda desvia o furor'",
      "Os olhos do Senhor estão em todo lugar",
      "'O coração alegre é um banquete contínuo'",
      "Melhor é o pouco com o temor do Senhor",
      "Melhor um prato de hortaliças onde há amor",
    ],
    chave: 1,
  },
  16: {
    resumo:
      "O homem planeja e o Senhor dirige os passos, e a soberba vai antes da queda.",
    detalhe:
      "O capítulo abre um bloco em que a soberania de Deus sobre os planos humanos aparece repetidas vezes, sem cancelar o planejamento, apenas relativizando a certeza. O versículo 18 virou provérbio popular em muitas línguas. Há um dito sobre autocontrole que costuma passar despercebido e é dos mais fortes, dizendo que quem domina o seu espírito vale mais do que quem toma uma cidade. E há o elogio das cãs como coroa de honra.",
    marcos: [
      "'Ao homem pertencem os planos, mas do Senhor vem a resposta'",
      "Entrega ao Senhor as tuas obras",
      "'A soberba precede a ruína'",
      "Melhor é o longânimo do que o valente",
      "As cãs são coroa de honra",
    ],
    chave: 9,
  },
  17: {
    resumo:
      "Melhor um pedaço seco em paz, e o amigo que ama em todo tempo.",
    detalhe:
      "O tema do capítulo é relação, e ele começa preferindo um bocado seco com tranquilidade a uma casa cheia de banquetes com contendas. O verso 17 define amizade e parentesco em duas linhas complementares, com o amigo que ama em todo tempo e o irmão que nasce para a hora da angústia. Há também uma observação prática sobre início de briga, comparada a soltar águas, com o conselho de deixar a contenda antes que ela se espalhe.",
    marcos: [
      "Melhor um bocado seco com tranquilidade",
      "'O amigo ama em todo o tempo'",
      "O começo da contenda é como soltar as águas",
      "'O coração alegre serve de bom remédio'",
      "Até o tolo, quando se cala, é tido por sábio",
    ],
    chave: 17,
  },
  18: {
    resumo:
      "O nome do Senhor é torre forte, e a língua tem poder sobre a vida e sobre a morte.",
    detalhe:
      "Dois versos deste capítulo são dos mais citados do livro. O 10 usa a imagem da torre em que o justo entra e fica em alto refúgio, e o 21 diz que a morte e a vida estão no poder da língua. Há também um conselho de método intelectual raro na Bíblia e muito atual: quem responde antes de ouvir comete estultícia e vergonha, e o primeiro a expor a causa parece justo até o outro vir e o examinar.",
    marcos: [
      "'Torre forte é o nome do Senhor'",
      "'A morte e a vida estão no poder da língua'",
      "Quem responde antes de ouvir comete estultícia",
      "O primeiro a defender a causa parece justo até vir o outro",
      "Há amigo mais chegado do que um irmão",
    ],
    chave: 21,
  },
  19: {
    resumo:
      "Vale mais o pobre íntegro do que o rico perverso, e a própria tolice arruína a vida.",
    detalhe:
      "O capítulo volta ao tema social com força, e traz uma frase que altera a lógica da caridade: quem se compadece do pobre empresta ao Senhor, e ele lhe pagará o bem que fez. Há uma observação psicológica precisa no versículo 3, sobre o homem que arruína o próprio caminho pela sua estultícia e depois se ira contra o Senhor. E há o reconhecimento de que existem muitos planos no coração do homem, mas o que permanece é o conselho do Senhor.",
    marcos: [
      "Melhor o pobre que anda na sua integridade",
      "'A estultícia do homem perverte o seu caminho'",
      "Quem se compadece do pobre empresta ao Senhor",
      "Muitos planos há no coração do homem",
      "O que se deseja no homem é a sua benignidade",
    ],
    chave: 17,
  },
  20: {
    resumo:
      "O vinho é escarnecedor, os pesos falsos são abomináveis, e poucos acham um homem fiel.",
    detalhe:
      "O capítulo reúne avisos sobre autoengano em várias formas. O primeiro é sobre bebida, com a observação de que quem por ela erra nunca será sábio. A questão dos pesos e medidas diferentes aparece duas vezes, o que sugere que era prática comum. E há um verso melancólico e honesto: muitos proclamam a própria benignidade, mas um homem fiel, quem o achará. A imagem sobre a lâmpada do Senhor esquadrinhando o interior é das mais fortes.",
    marcos: [
      "'O vinho é escarnecedor'",
      "Deixar a contenda é honra para o homem",
      "Peso diverso e medida diversa são abomináveis",
      "'Quem achará um homem fiel?'",
      "A lâmpada do Senhor esquadrinha o interior",
    ],
    chave: 6,
  },
  21: {
    resumo:
      "O coração do rei é como ribeiro nas mãos de Deus, e justiça vale mais que sacrifício.",
    detalhe:
      "O capítulo insiste que Deus pesa os corações, e que o homem acha reto todo caminho seu. Dois versos aparecem duas vezes no livro e ambos estão aqui, sobre ser melhor morar num canto do terraço do que em casa espaçosa com mulher rixosa, o que diz mais sobre convivência do que sobre gênero. E há o princípio ético que o Antigo Testamento repete pelos profetas, colocando praticar justiça acima de oferecer sacrifício.",
    marcos: [
      "O coração do rei é como ribeiro na mão do Senhor",
      "'Fazer justiça é mais aceitável ao Senhor do que sacrifício'",
      "Quem fecha o ouvido ao clamor do pobre também clamará e não será ouvido",
      "Melhor morar num canto do eirado",
      "O cavalo se prepara para o dia da batalha, mas a vitória vem do Senhor",
    ],
    chave: 3,
  },
  22: {
    resumo:
      "Boa fama vale mais que riqueza, e começa uma nova coleção com trinta ditos.",
    detalhe:
      "Os primeiros versos ainda são provérbios de Salomão, e trazem o famoso conselho sobre instruir o menino no caminho em que deve andar. A partir do versículo 17 começa outra coleção, explicitamente chamada de palavras dos sábios, e há trinta ditos mais longos. Há um alerta que costuma ser lido de forma apressada, mandando não roubar o pobre por ser pobre nem oprimir o aflito na porta, porque o Senhor defenderá a causa deles.",
    marcos: [
      "Melhor é a boa fama do que as muitas riquezas",
      "O rico e o pobre se encontram, e o Senhor fez a ambos",
      "'Instrui o menino no caminho em que deve andar'",
      "O que toma emprestado é servo do que empresta",
      "Não roubes o pobre por ser pobre",
    ],
    chave: 1,
  },
  23: {
    resumo:
      "Conselhos sobre mesa de poderoso, dinheiro que voa, e uma descrição crua da bebedeira.",
    detalhe:
      "O capítulo abre com uma cena de etiqueta política, mandando considerar com atenção quem está à frente quando se come com um governador, e não cobiçar as iguarias dele, porque são pão de mentiras. A imagem sobre riqueza que cria asas e voa como águia é das mais visuais do livro. E o fecho é um retrato realista de quem bebe demais, com olhos vermelhos, feridas sem causa e a frase final de quem acorda e já procura de novo.",
    marcos: [
      "Ao comer com um governador, considera bem quem está diante de ti",
      "'Não te fatigues para enriqueceres'",
      "As riquezas criam asas e voam como águia",
      "Não mudes os limites antigos nem entres nos campos dos órfãos",
      "O retrato de quem se demora junto ao vinho",
    ],
    chave: 5,
  },
  24: {
    resumo:
      "Sabedoria como material de construção, e o campo do preguiçoso visto de perto.",
    detalhe:
      "A imagem do começo é doméstica e ampla ao mesmo tempo, com a casa edificada pela sabedoria e os aposentos cheios de bens preciosos pelo conhecimento. Há um verso muito citado sobre o justo cair sete vezes e se levantar. E há um alerta contra a alegria com a queda do inimigo. O fim tem uma pequena reportagem: o sábio passa pelo campo do preguiçoso, vê os espinhos e o muro derrubado, observa e tira lição.",
    marcos: [
      "'Com a sabedoria se edifica a casa'",
      "Se enfraqueces no dia da angústia, a tua força é pequena",
      "Livra os que são levados para a morte",
      "'Sete vezes cairá o justo e se levantará'",
      "O campo do preguiçoso coberto de espinhos",
    ],
    chave: 16,
  },
  25: {
    resumo:
      "Uma coleção copiada pelos homens de Ezequias, cheia de comparações visuais.",
    detalhe:
      "O título informa que estes provérbios foram transcritos séculos depois, o que mostra como o livro foi montado. O estilo aqui é mais imagético: a palavra dita a tempo é como maçã de ouro em salvas de prata, a boa notícia de terra distante é como água fresca para alma cansada, e quem se gaba de dádivas que não deu é como nuvens sem chuva. Há também o conselho sobre visitar o vizinho com moderação para não se tornar enfadonho.",
    marcos: [
      "Coleção transcrita pelos homens de Ezequias",
      "'Como maçãs de ouro em salvas de prata'",
      "Como água fresca para a alma cansada",
      "Põe raramente o pé na casa do teu próximo",
      "Se o teu inimigo tiver fome, dá-lhe pão",
    ],
    chave: 11,
  },
  26: {
    resumo:
      "Um capítulo quase inteiro sobre tolos, preguiçosos e caluniadores, com humor ácido.",
    detalhe:
      "O bloco sobre o tolo traz um par de versos que parecem se contradizer de propósito, mandando não responder ao tolo segundo a sua estultícia e logo depois mandando responder, o que ensina que não há fórmula automática. O preguiçoso vira piada, dizendo que há um leão na rua e rolando na cama como porta nos gonzos. E há uma frase precisa sobre fofoca, dizendo que sem lenha o fogo se apaga e sem intrigante a contenda cessa.",
    marcos: [
      "Não responder e responder ao tolo, lado a lado",
      "'Há um leão no caminho', diz o preguiçoso",
      "O preguiçoso se revolve na cama como a porta nos gonzos",
      "Sem lenha o fogo se apaga",
      "Quem cava uma cova nela cairá",
    ],
    chave: 20,
  },
  27: {
    resumo:
      "Não se gabe do amanhã, e prefira a repreensão do amigo ao beijo do inimigo.",
    detalhe:
      "O capítulo é sobre relações próximas e sobre honestidade nelas. O verso 6 define amizade de um jeito incômodo, dizendo que fiéis são as feridas feitas pelo que ama e enganosos os beijos do que odeia. E o verso 17 virou imagem corrente: como o ferro afia o ferro, assim o homem afia o rosto do seu amigo. O fim traz um conselho agropecuário que vale como princípio de administração, mandando conhecer bem o estado das ovelhas.",
    marcos: [
      "'Não te glories do dia de amanhã'",
      "'Fiéis são as feridas feitas pelo que ama'",
      "Melhor o vizinho perto do que o irmão longe",
      "'Como o ferro com o ferro se afia'",
      "Procura conhecer o estado das tuas ovelhas",
    ],
    chave: 17,
  },
  28: {
    resumo:
      "Os ímpios fogem sem ninguém perseguir, e quem esconde as transgressões não prospera.",
    detalhe:
      "O tema dominante é governo e consciência. Há vários ditos sobre governantes, com o príncipe falto de entendimento que multiplica opressões, e sobre o povo que se esconde quando os ímpios se levantam. O verso 13 é o mais citado do capítulo e vale reter inteiro, porque contrapõe encobrir as transgressões a confessá-las e deixá-las, e é a segunda parte que costuma ser esquecida: confessar sem largar não muda nada.",
    marcos: [
      "Os ímpios fogem sem que ninguém os persiga",
      "'O que encobre as suas transgressões nunca prosperará'",
      "Quem confessa e as deixa alcança misericórdia",
      "O que se apressa a enriquecer não fica sem culpa",
      "Quem dá ao pobre não terá falta",
    ],
    chave: 13,
  },
  29: {
    resumo:
      "O último capítulo da coleção fala de correção, de ira e de povo sem visão.",
    detalhe:
      "Abre com uma advertência dura sobre quem endurece a cerviz depois de muitas repreensões. Há uma série sobre educação de filhos e sobre autocontrole, incluindo o contraste entre o tolo que dá vazão a toda a sua ira e o sábio que a contém. O versículo 18, sobre não haver profecia e o povo se corromper, é traduzido de várias formas e costuma ser lido como um alerta sobre viver sem direção. E há o alerta sobre a armadilha do medo do homem.",
    marcos: [
      "Quem endurece a cerviz depois de muitas repreensões",
      "O rei que julga os pobres com verdade firma o trono",
      "O tolo dá vazão à sua ira, o sábio a contém",
      "'Não havendo profecia, o povo se corrompe'",
      "'O temor do homem armará laços'",
    ],
    chave: 25,
  },
  30: {
    resumo:
      "Agur começa admitindo que não sabe nada, e organiza o mundo em listas de quatro.",
    detalhe:
      "A abertura é de humildade radical, com ele dizendo ser o mais estúpido dos homens e não ter aprendido sabedoria. O pedido dele é o mais equilibrado da Bíblia sobre dinheiro: nem pobreza nem riqueza, para não roubar por necessidade nem negar a Deus por fartura. Depois vêm as listas numéricas, com as quatro coisas que nunca se fartam, as quatro que não deixam rastro, as quatro pequenas e sábias e as quatro de andar elegante.",
    marcos: [
      "'Eu sou o mais estúpido dos homens'",
      "'Não me dês nem a pobreza nem a riqueza'",
      "Três coisas que nunca se fartam, e quatro",
      "As formigas, os coelhos, os gafanhotos e a lagartixa",
      "Quatro que são formosos no andar",
    ],
    chave: 8,
  },
  31: {
    resumo:
      "Uma mãe ensina o filho rei a governar, e o livro fecha com um poema sobre uma mulher.",
    detalhe:
      "A primeira parte são conselhos de Lemuel recebidos da mãe, e incluem uma instrução de justiça social que costuma ficar esquecida, mandando abrir a boca a favor do mudo e defender a causa do aflito e do necessitado. O poema final é um acróstico alfabético e descreve alguém que compra terra, planta vinha, negocia, estende a mão ao pobre e cujo marido é conhecido nas portas da cidade. O elogio final não é à beleza, é ao temor do Senhor.",
    marcos: [
      "Os conselhos que a mãe deu ao rei Lemuel",
      "'Abre a boca a favor do mudo'",
      "'Mulher virtuosa, quem a achará?'",
      "Ela considera um campo e o compra",
      "'Enganosa é a graça, e vã, a formosura'",
    ],
    chave: 30,
  },
};

CAPITULOS.lv = {
  1: {
    resumo:
      "O holocausto, a única oferta queimada por inteiro, sem nada reservado a ninguém.",
    detalhe:
      "O livro começa com Deus chamando de dentro da tenda que acabou de ser construída no fim de Êxodo, e a primeira instrução é sobre como se aproximar. O holocausto é integralmente queimado, o que o distingue de todas as outras ofertas, e por isso representa entrega sem retorno. O detalhe que costuma passar despercebido é a escala social: quem pode traz boi, quem pode menos traz ovelha, e quem é pobre traz aves. Ninguém fica de fora por preço.",
    marcos: [
      "O Senhor chama Moisés de dentro da tenda",
      "O holocausto é queimado por inteiro",
      "Quem oferece põe a mão sobre a cabeça do animal",
      "Boi, ovelha ou ave, conforme as posses",
      "Aroma agradável ao Senhor",
    ],
    chave: 4,
  },
  2: {
    resumo:
      "A oferta de cereais, feita de farinha e azeite, e a única sem sangue nenhum.",
    detalhe:
      "É a oferta mais acessível de todas, e por isso importa. Uma parte é queimada como porção memorial e o restante fica para os sacerdotes, o que a torna também um mecanismo de sustento. Duas proibições chamam atenção: nada de fermento e nada de mel, ambos associados à fermentação e ao apodrecimento. E uma exigência: toda oferta leva sal, chamado de sal da aliança, que conserva e não deixa estragar.",
    marcos: [
      "Farinha fina com azeite e incenso",
      "Uma porção memorial é queimada",
      "O restante fica para os sacerdotes",
      "Sem fermento e sem mel",
      "Toda oferta leva o sal da aliança",
    ],
    chave: 13,
  },
  3: {
    resumo:
      "A oferta pacífica é a única em que quem oferece também come da carne.",
    detalhe:
      "Aqui o sacrifício vira refeição partilhada, e é por isso que ela acompanha votos cumpridos e ações de graças. A gordura e os rins são queimados, e a explicação dada é que a gordura pertence ao Senhor, sendo a parte mais rica. A proibição sobre gordura e sangue é declarada como estatuto perpétuo, e o motivo do sangue aparece só no capítulo 17. É a oferta da celebração, e não da culpa.",
    marcos: [
      "A oferta pacífica pode ser boi, cordeiro ou cabra",
      "A gordura e os rins são queimados",
      "'Toda a gordura é do Senhor'",
      "Quem oferece participa da refeição",
      "Proibição perpétua de comer gordura e sangue",
    ],
    chave: 16,
  },
  4: {
    resumo:
      "A oferta pelo pecado cometido sem intenção, com regras diferentes por posição social.",
    detalhe:
      "O capítulo trata do erro involuntário, o que já é uma ideia importante: existe dano mesmo sem má vontade, e ele precisa ser reparado. As gradações são reveladoras. Quando o sacerdote ungido peca, a culpa recai sobre o povo e o sacrifício exigido é o maior, o mesmo da congregação inteira. Quanto maior a responsabilidade, maior o preço. O líder oferece menos, e a pessoa comum, menos ainda.",
    marcos: [
      "Pecado cometido por ignorância",
      "O sacerdote ungido traz a mesma oferta da congregação",
      "A culpa do sacerdote recai sobre o povo",
      "O príncipe traz um bode",
      "A pessoa comum traz uma cabra ou cordeiro",
    ],
    chave: 3,
  },
  5: {
    resumo:
      "Casos concretos de culpa, incluindo silêncio diante de um juramento e fraude ao próximo.",
    detalhe:
      "Os exemplos são cotidianos: testemunhar e não falar, tocar algo impuro sem perceber, jurar de forma precipitada. A oferta é escalonada conforme as posses, e quem é muito pobre traz farinha em vez de animal, sem que isso reduza o efeito. A parte mais interessante começa no fim do capítulo: quando o erro envolve prejuízo a outra pessoa, não basta o sacrifício, é preciso restituir o valor com um quinto a mais.",
    marcos: [
      "Quem ouve e não testemunha carrega a culpa",
      "O juramento feito sem pensar",
      "A oferta escalona conforme as posses",
      "Quem é pobre traz farinha fina",
      "A restituição com um quinto a mais",
    ],
    chave: 16,
  },
  6: {
    resumo:
      "A reparação ao próximo vem antes do altar, e o fogo do altar nunca pode apagar.",
    detalhe:
      "A primeira parte trata de fraude, roubo, extorsão e achado negado, e a ordem é clara: primeiro restitui integralmente e acrescenta o quinto, e só então traz a oferta. O pecado contra o vizinho é tratado como infidelidade contra o Senhor. A segunda parte são instruções aos sacerdotes, com o detalhe do fogo contínuo, repetido três vezes, e a rotina humilde de retirar a cinza todas as manhãs antes de qualquer coisa.",
    marcos: [
      "Fraude, roubo e achado negado ao próximo",
      "A restituição acontece no dia da oferta pela culpa",
      "'O fogo arderá continuamente sobre o altar'",
      "A cinza é retirada todas as manhãs",
      "Cada holocausto é reposto sobre o fogo que não se apaga",
    ],
    chave: 13,
  },
  7: {
    resumo:
      "O fechamento do manual das ofertas, incluindo quem come o quê e por quanto tempo.",
    detalhe:
      "É um capítulo administrativo, e os detalhes têm lógica prática. A carne da ação de graças deve ser comida no mesmo dia, o que obriga a convidar gente, porque ninguém come um animal inteiro sozinho. A oferta votiva pode durar dois dias, e o que sobrar para o terceiro é queimado. A parte do peito e da coxa fica para os sacerdotes como estatuto perpétuo, o que define o sustento de uma tribo que não tem terra.",
    marcos: [
      "As regras da oferta pela culpa",
      "A carne da ação de graças é comida no mesmo dia",
      "O que sobra até o terceiro dia é queimado",
      "Quem estiver impuro não pode comer",
      "O peito e a coxa ficam para os sacerdotes",
    ],
    chave: 15,
  },
  8: {
    resumo:
      "Arão e os filhos são consagrados diante de toda a congregação, por sete dias.",
    detalhe:
      "O que Êxodo 29 ordenou, aqui é executado, e a frase como o Senhor ordenara a Moisés se repete como carimbo. O rito é público, com o povo reunido à porta. O sangue posto na orelha, no polegar e no dedo do pé marca o que se ouve, o que se faz e por onde se anda. E os consagrados ficam sete dias sem sair da porta da tenda, o que é uma espécie de retiro obrigatório antes de assumir a função.",
    marcos: [
      "A congregação é reunida à porta da tenda",
      "Arão é lavado, vestido e ungido",
      "O sangue é posto na orelha, no polegar e no pé",
      "Sete dias sem sair da porta da tenda",
      "Tudo é feito como o Senhor ordenara",
    ],
    chave: 35,
  },
  9: {
    resumo:
      "No oitavo dia o culto começa de verdade, e fogo sai de diante do Senhor.",
    detalhe:
      "É o dia de estreia, e a primeira oferta que Arão apresenta é por ele mesmo, antes de qualquer coisa pelo povo. Depois de tudo pronto, ele levanta as mãos e abençoa, e a glória aparece. O fogo que consome a oferta vem de diante do Senhor, e não da mão de ninguém, o que é exatamente o contraste que o capítulo seguinte vai explorar. A reação do povo é gritar de júbilo e cair sobre o rosto.",
    marcos: [
      "Arão oferece primeiro por si mesmo",
      "Depois oferece pelo povo",
      "Ele levanta as mãos e abençoa o povo",
      "A glória do Senhor aparece a todo o povo",
      "Fogo sai de diante do Senhor e consome a oferta",
    ],
    chave: 24,
  },
  10: {
    resumo:
      "Dois filhos de Arão oferecem fogo que ninguém mandou, e morrem na hora.",
    detalhe:
      "A expressão usada é fogo estranho, que o Senhor não lhes ordenara, e é o único detalhe que o texto dá. A proibição de bebida forte que vem logo depois sugere uma leitura, sem afirmar. A reação de Arão é uma linha inteira de silêncio, e Moisés proíbe a família de fazer luto público. O fim do capítulo tem um desentendimento sobre um sacrifício não comido, e Moisés aceita a explicação de Arão, o que humaniza toda a cena.",
    marcos: [
      "Nadabe e Abiú oferecem fogo estranho",
      "Fogo sai e os consome",
      "'E Arão calou-se'",
      "Proibição de vinho e bebida forte ao entrar na tenda",
      "Moisés aceita a explicação de Arão",
    ],
    chave: 3,
  },
  11: {
    resumo:
      "A lista do que se come e do que não se come, no ar, na água e na terra.",
    detalhe:
      "Os critérios são de categoria: entre os animais terrestres, rumina e tem casco fendido; na água, barbatana e escama. O texto não dá razões de higiene, e as explicações modernas nesse sentido são leitura posterior. A razão declarada é outra e aparece no fim: sede santos, porque eu sou santo. A alimentação vira lembrete diário de pertencimento, três vezes por dia, e é isso que separa aquele povo dos vizinhos na prática.",
    marcos: [
      "Rumina e tem unhas fendidas: pode",
      "Barbatana e escama nas águas: pode",
      "A lista das aves proibidas",
      "Regras sobre contato com carcaças",
      "'Sereis santos, porque eu sou santo'",
    ],
    chave: 45,
  },
  12: {
    resumo:
      "O tempo de purificação depois do parto, com uma concessão para quem é pobre.",
    detalhe:
      "O capítulo é curto e desconcertante para o leitor moderno, e vale ler sabendo que impureza ritual aqui não significa pecado nem sujeira moral, e sim estar temporariamente fora do contato com o santuário. Perda de sangue e contato com a morte produzem esse estado. O detalhe importante está no fim: quem não pode trazer cordeiro traz duas rolas ou dois pombinhos, e é exatamente essa oferta que Maria e José apresentam em Lucas 2.",
    marcos: [
      "O tempo de purificação depois do nascimento",
      "A criança é circuncidada ao oitavo dia",
      "A oferta é um cordeiro e uma ave",
      "Quem não pode traz duas rolas ou dois pombinhos",
      "O sacerdote faz expiação e ela fica limpa",
    ],
    chave: 8,
  },
  13: {
    resumo:
      "Um protocolo detalhado de diagnóstico de doenças de pele, com quarentena e reexame.",
    detalhe:
      "É o capítulo mais longo do livro e funciona como manual clínico. O sacerdote atua como inspetor sanitário, com critérios objetivos sobre profundidade, cor do pelo e se a lesão se espalha, e com prazos de sete dias para reavaliação. A palavra traduzida por lepra cobre várias condições, não apenas a doença de Hansen. O custo social é alto e o texto o descreve sem suavizar, com a pessoa morando fora do arraial e anunciando a própria condição.",
    marcos: [
      "O sacerdote examina segundo critérios objetivos",
      "Sete dias de isolamento e reexame",
      "A lesão que se espalha é declarada impura",
      "Regras também para roupas e couros",
      "O isolado mora fora do arraial",
    ],
    chave: 46,
  },
  14: {
    resumo:
      "O rito de quem sarou, com duas aves, e um capítulo sobre mofo em paredes de casa.",
    detalhe:
      "A cerimônia tem um gesto raro e bonito: duas aves vivas, uma imolada e outra molhada no sangue da primeira e depois solta no campo aberto. O restaurado é reintegrado por etapas, com oito dias e várias ofertas, e de novo há a versão para quem é pobre. A segunda metade trata de manchas nas paredes da casa, com o mesmo protocolo de inspeção, isolamento e, se necessário, remoção de pedras ou demolição.",
    marcos: [
      "Duas aves vivas: uma imolada e outra solta",
      "O restaurado lava as roupas e rapa os pelos",
      "A reintegração acontece por etapas, em oito dias",
      "Há versão da oferta para quem é pobre",
      "Regras para mofo nas paredes da casa",
    ],
    chave: 7,
  },
  15: {
    resumo:
      "Regras sobre fluxos corporais, tratando homens e mulheres com simetria de critério.",
    detalhe:
      "O capítulo cobre secreções normais e anormais, e a lógica é a mesma dos anteriores: estados temporários que afastam do santuário e se resolvem com tempo, lavagem e oferta. O que chama atenção é a estrutura simétrica entre os casos masculinos e femininos. O fim explica o propósito de tudo: separar os filhos de Israel das suas impurezas para que não morram por contaminarem a morada que está no meio deles.",
    marcos: [
      "Fluxos anormais e sua purificação",
      "O que a pessoa toca também fica impuro",
      "A purificação envolve tempo, água e oferta",
      "Tratamento simétrico para homens e mulheres",
      "O propósito é proteger a morada que está no meio deles",
    ],
    chave: 31,
  },
  16: {
    resumo:
      "Um dia por ano, e só um homem entra atrás do véu, com dois bodes na porta.",
    detalhe:
      "É o capítulo central do livro e o mais importante. O sumo sacerdote entra despido de toda pompa, vestindo linho simples, e primeiro oferece por si mesmo e pela própria casa. Os dois bodes representam dois movimentos do mesmo perdão: um morre, e sobre o outro se confessam as iniquidades antes de ele ser solto no deserto, levando-as embora. O povo não faz nada além de afligir a alma e descansar, porque nesse dia a iniciativa é toda de fora.",
    marcos: [
      "Arão só entra no santuário uma vez por ano",
      "Veste linho simples, sem ornamentos",
      "Primeiro oferece por si mesmo e por sua casa",
      "Dois bodes: um imolado, outro solto no deserto",
      "O povo afligirá a alma e não fará obra alguma",
    ],
    chave: 30,
  },
  17: {
    resumo:
      "Todo abate passa a ser feito num único lugar, e o motivo é o sangue.",
    detalhe:
      "A centralização impede sacrifícios clandestinos aos bodes do campo, mas o argumento de fundo é outro e está no versículo 11, que dá a explicação mais clara do sacrifício no Antigo Testamento: a vida da carne está no sangue, e foi ele que Deus deu sobre o altar para fazer expiação. Por isso o sangue não é comido, é devolvido. Quem caça derrama o sangue e o cobre com terra, num gesto de respeito pela vida tirada.",
    marcos: [
      "O abate passa a ser feito na porta da tenda",
      "Proibição de sacrificar aos bodes do campo",
      "'A vida da carne está no sangue'",
      "O sangue foi dado sobre o altar para a expiação",
      "Quem caça cobre o sangue com terra",
    ],
    chave: 11,
  },
  18: {
    resumo:
      "Uma lista de relações sexuais proibidas, com uma justificativa geográfica no começo.",
    detalhe:
      "O enquadramento aparece antes e depois da lista: não façam como se faz no Egito de onde saíram nem como em Canaã para onde vão. A ética sexual é apresentada como parte da identidade de um povo em transição. As proibições são quase todas sobre parentesco, e o texto usa a expressão descobrir a nudez. O fim é uma advertência com a imagem da terra que vomita os seus habitantes, aplicada tanto aos povos anteriores quanto a eles.",
    marcos: [
      "Não façam como no Egito nem como em Canaã",
      "A lista das relações de parentesco proibidas",
      "Proibição de passar filhos pelo fogo a Moloque",
      "A terra vomita os que a contaminam",
      "'Guardareis os meus estatutos e os meus juízos'",
    ],
    chave: 5,
  },
  19: {
    resumo:
      "O capítulo mais famoso do livro, onde santidade vira salário pago no mesmo dia.",
    detalhe:
      "Abre com sede santos porque eu sou santo, e em seguida mostra o que isso significa na prática, misturando culto e convivência sem separar as duas coisas. Deixar o canto do campo e os restos da colheita para o pobre e o estrangeiro é lei agrícola com nome de justiça. Não reter o salário do trabalhador até de manhã, não amaldiçoar o surdo nem pôr tropeço diante do cego, e no meio de tudo isso a frase que Jesus chama de segundo maior mandamento.",
    marcos: [
      "'Santos sereis, porque eu, o Senhor, sou santo'",
      "Deixar as bordas do campo para o pobre e o estrangeiro",
      "O salário do diarista não passa a noite contigo",
      "Não amaldiçoar o surdo nem pôr tropeço diante do cego",
      "'Amarás o teu próximo como a ti mesmo'",
    ],
    chave: 18,
  },
  20: {
    resumo:
      "As penas para o que foi proibido no capítulo 18, e o motivo de tudo repetido no fim.",
    detalhe:
      "O capítulo é duro e as penas são severas, e vale lê-lo dentro do seu mundo jurídico, o antigo Oriente Próximo, onde esses códigos eram comuns e em muitos pontos menos protetivos do que este. O texto volta repetidamente à questão do sacrifício de crianças a Moloque e à consulta a médiuns. O fecho retoma o argumento de identidade, dizendo que Deus os separou dos povos para que fossem seus, e ligando isso de novo ao que se come.",
    marcos: [
      "Pena para quem der filhos a Moloque",
      "Proibição de recorrer a médiuns e adivinhos",
      "As penas para as relações proibidas",
      "'Eu vos separei dos povos'",
      "A distinção entre animais limpos e imundos é lembrada",
    ],
    chave: 26,
  },
  21: {
    resumo:
      "Regras mais estritas para os sacerdotes, inclusive sobre luto e sobre casamento.",
    detalhe:
      "Quem serve no santuário tem restrições que o povo não tem, o que inverte a ideia de privilégio: mais acesso significa mais limite. Eles não se contaminam com mortos, exceto pelos parentes mais próximos, e o sumo sacerdote nem por esses. A parte sobre defeito físico impedir o serviço no altar incomoda o leitor moderno, e o texto faz questão de dizer que essa pessoa continua comendo do pão sagrado, ou seja, não é excluída da comunidade.",
    marcos: [
      "Os sacerdotes não se contaminam com mortos",
      "O sumo sacerdote não sai do santuário nem por pai ou mãe",
      "Regras sobre com quem podem casar",
      "Defeito físico impede servir ao altar",
      "Mesmo assim, ele come do pão do seu Deus",
    ],
    chave: 8,
  },
  22: {
    resumo:
      "O que pode e o que não pode ser oferecido, e quem pode comer das coisas sagradas.",
    detalhe:
      "A primeira metade regula o acesso à porção sagrada, incluindo quem da casa do sacerdote pode comer e o que acontece se alguém comer por engano. A segunda trata da qualidade do que se oferece, e o princípio é simples: nada cego, quebrado, ferido ou com verrugas. Há também uma regra de humanidade animal pouco lembrada, proibindo sacrificar um filhote no mesmo dia em que a mãe, e exigindo que ele fique sete dias com ela.",
    marcos: [
      "Quem da casa do sacerdote pode comer do sagrado",
      "Quem come por engano restitui com um quinto a mais",
      "Nada cego, quebrado ou ferido pode ser oferecido",
      "O filhote fica sete dias com a mãe",
      "Não sacrificar a mãe e o filho no mesmo dia",
    ],
    chave: 28,
  },
  23: {
    resumo:
      "O calendário do ano inteiro, começando pelo sábado, que é semanal e não anual.",
    detalhe:
      "Sete festas organizam o ano, e o texto as chama de santas convocações. O sábado vem primeiro e não é festa anual, o que o coloca como base de tudo. A Páscoa e os pães asmos lembram a saída do Egito, as primícias e as semanas marcam a colheita, e no sétimo mês vêm as trombetas, o Dia da Expiação e os Tabernáculos. Nessa última o povo mora em cabanas por sete dias para lembrar que já morou assim.",
    marcos: [
      "O sábado encabeça a lista das convocações",
      "Páscoa e Pães Asmos",
      "As primícias e a Festa das Semanas",
      "As trombetas e o Dia da Expiação",
      "Sete dias morando em cabanas nos Tabernáculos",
    ],
    chave: 43,
  },
  24: {
    resumo:
      "O azeite, os doze pães, e um caso de blasfêmia que interrompe as instruções.",
    detalhe:
      "As primeiras instruções são rotineiras, sobre manter a lâmpada acesa e dispor doze pães a cada sábado. E então a narrativa irrompe: um homem filho de mãe israelita e pai egípcio briga no arraial e blasfema o Nome. Eles o prendem sem saber o que fazer, porque não havia precedente, e esperam a decisão. É aí que aparece a regra do olho por olho, e junto dela uma frase de igualdade jurídica sobre haver um mesmo estatuto para o estrangeiro e o natural.",
    marcos: [
      "A lâmpada arde continuamente com azeite puro",
      "Doze pães dispostos a cada sábado",
      "Um homem blasfema o Nome no meio de uma briga",
      "É preso até que se saiba a decisão",
      "'Um mesmo estatuto tereis, para o estrangeiro e o natural'",
    ],
    chave: 22,
  },
  25: {
    resumo:
      "A terra também descansa, e a cada cinquenta anos tudo volta para quem era.",
    detalhe:
      "O ano sabático dá descanso ao solo e ao mesmo tempo abre a colheita espontânea para os pobres e os animais. O Jubileu vai além e é uma das ideias sociais mais radicais da Bíblia: as terras vendidas voltam às famílias e os escravizados por dívida são libertados. A justificativa é de propriedade, dizendo que a terra é de Deus e que eles são estrangeiros e peregrinos nela. Na prática, o preço da terra passa a ser calculado pelas colheitas restantes até o Jubileu.",
    marcos: [
      "O sétimo ano é de descanso para a terra",
      "A cada cinquenta anos, o Jubileu",
      "As propriedades voltam às famílias originais",
      "'A terra é minha; vós sois estrangeiros e peregrinos comigo'",
      "Proibição de cobrar juros do irmão empobrecido",
    ],
    chave: 23,
  },
  26: {
    resumo:
      "As bênçãos da obediência e as maldições da rejeição, e uma porta que fica aberta no fim.",
    detalhe:
      "O capítulo funciona como cláusula final de um tratado antigo. As bênçãos são concretas: chuva no tempo certo, colheita que dura até a semeadura seguinte, dormir sem medo. As maldições vêm em cinco ondas, cada uma introduzida por se ainda assim não me ouvirdes, e vão piorando até o exílio e a terra descansando os sábados que não teve. Mas o fim não fecha a porta: se confessarem, ele se lembrará da aliança e não os rejeitará de todo.",
    marcos: [
      "Bênçãos de chuva, colheita e segurança",
      "'Andarei entre vós e serei o vosso Deus'",
      "Cinco ondas de advertência, cada uma mais grave",
      "A terra descansará os sábados que não teve",
      "'Lembrar-me-ei da minha aliança'",
    ],
    chave: 12,
  },
  27: {
    resumo:
      "O livro fecha com tabelas de valores para votos, e com a regra do dízimo.",
    detalhe:
      "Parece um apêndice contábil e tem uma função: um voto feito no impulso gera obrigação real, e o capítulo estabelece como convertê-la em dinheiro. As tabelas variam por idade e sexo conforme a capacidade de trabalho da época, e há, de novo, a previsão para quem é pobre demais, com o sacerdote avaliando conforme as posses. O dízimo da terra e do rebanho é declarado santo, e quem quiser resgatá-lo acrescenta um quinto.",
    marcos: [
      "As tabelas de valor para votos de pessoas",
      "Quem é pobre é avaliado conforme as posses",
      "Casas e campos podem ser resgatados",
      "O dízimo da terra e do rebanho é do Senhor",
      "Quem resgata acrescenta a quinta parte",
    ],
    chave: 30,
  },
};

CAPITULOS.nm = {
  1: {
    resumo:
      "Um censo militar no deserto, contando homens de vinte anos para cima, tribo por tribo.",
    detalhe:
      "O nome do livro vem daqui, e o propósito do recenseamento é organizacional: saber quem pode sair à guerra, e com isso formar acampamento e ordem de marcha. O total passa de seiscentos mil. Levi fica de fora da conta, com uma justificativa dada no próprio capítulo, porque a função deles é com a tenda e não com a guerra. A insistência em contar por casas paternas mostra que a identidade se organiza por família, e não por indivíduo.",
    marcos: [
      "O censo acontece no segundo ano depois da saída do Egito",
      "Contam-se os homens de vinte anos para cima",
      "Um chefe de cada tribo ajuda na contagem",
      "O total passa de seiscentos mil",
      "Levi não é contado, por causa do serviço da tenda",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "O acampamento é organizado em quatro blocos ao redor da tenda, com ordem de marcha.",
    detalhe:
      "O desenho é geométrico e tem significado: a tenda no centro, os levitas em volta dela, e as doze tribos em quatro grupos de três, um por ponto cardeal. Nada nesse arranjo é acidental, porque diz onde está o centro da vida daquele povo enquanto ele anda. A ordem de partida também é fixa, com Judá saindo primeiro. É logística e teologia ao mesmo tempo, e funciona para um acampamento que se monta e desmonta repetidas vezes.",
    marcos: [
      "Cada tribo acampa junto ao seu estandarte",
      "Três tribos em cada ponto cardeal",
      "A tenda fica no centro do arraial",
      "Judá parte primeiro na ordem de marcha",
      "Tudo é feito conforme o Senhor ordenou",
    ],
    chave: 2,
  },
  3: {
    resumo:
      "Os levitas são tomados no lugar dos primogênitos, e a conta não fecha por 273.",
    detalhe:
      "A lógica vem do Egito: quando os primogênitos do Egito morreram, os de Israel foram poupados, e por isso pertencem a Deus. Os levitas são aceitos como substitutos. O detalhe que torna o capítulo curioso é aritmético, porque os primogênitos são 22.273 e os levitas 22.000, e os 273 excedentes são resgatados por cinco siclos cada. O capítulo também distribui as famílias levíticas ao redor da tenda, cada uma com o seu lado e a sua carga.",
    marcos: [
      "Os filhos de Arão e a morte de Nadabe e Abiú",
      "Os levitas são dados a Arão para o serviço",
      "Tomados no lugar dos primogênitos de Israel",
      "As famílias levíticas acampam em volta da tenda",
      "Os 273 excedentes são resgatados por cinco siclos",
    ],
    chave: 12,
  },
  4: {
    resumo:
      "Quem carrega o quê na hora de desmontar, com instruções detalhadas de embalagem.",
    detalhe:
      "O capítulo descreve o trabalho de mudança de um santuário inteiro. Arão e os filhos cobrem cada objeto antes de qualquer levita tocar, e o texto avisa que eles não devem ver as coisas santas nem por um instante, sob risco de morte. Os coatitas carregam nos ombros os objetos mais sagrados, os gersonitas levam as cortinas e os meraritas as estruturas pesadas. A faixa de idade para o serviço é de trinta a cinquenta anos.",
    marcos: [
      "Arão e os filhos cobrem os objetos antes da mudança",
      "Os coatitas carregam nos ombros",
      "Os gersonitas levam as cortinas e coberturas",
      "Os meraritas levam as tábuas e as bases",
      "O serviço vai dos trinta aos cinquenta anos",
    ],
    chave: 15,
  },
  5: {
    resumo:
      "Restituição com acréscimo, e um rito estranho para o caso de suspeita de adultério.",
    detalhe:
      "A primeira parte retoma a restituição e acrescenta um ponto importante: quando não há a quem restituir, o valor vai para o sacerdote. A segunda parte é o ritual das águas amargas, difícil de ler hoje. Vale notar o que ele faz no seu contexto: transfere um caso de ciúme sem prova das mãos do marido, que poderia agir por conta própria, para um procedimento público diante do sacerdote, com resultado que não depende dele.",
    marcos: [
      "Os impuros são postos fora do arraial",
      "Quem prejudica confessa e restitui com um quinto",
      "O caso de ciúme sem testemunha",
      "A oferta e as águas amargas diante do sacerdote",
      "O resultado não fica nas mãos do marido",
    ],
    chave: 7,
  },
  6: {
    resumo:
      "O voto de nazireu, aberto a qualquer pessoa, e a bênção sacerdotal mais conhecida.",
    detalhe:
      "O nazireado é uma consagração temporária e voluntária, e o texto deixa claro que vale para homem ou mulher. As três marcas são não beber nada de videira, não cortar o cabelo e não se aproximar de morto, nem de pai ou mãe. O fim do capítulo traz a bênção de três linhas que passou a ser usada até hoje em sinagogas e igrejas, e ela termina com uma explicação: assim porão o meu nome sobre os filhos de Israel.",
    marcos: [
      "O voto de nazireu vale para homem ou mulher",
      "Nada de videira, cabelo sem corte, sem contato com morto",
      "O rito de encerramento do voto",
      "'O Senhor te abençoe e te guarde'",
      "'Porão o meu nome sobre os filhos de Israel'",
    ],
    chave: 24,
  },
  7: {
    resumo:
      "O capítulo mais longo da Bíblia, e ele repete doze vezes a mesma lista de presentes.",
    detalhe:
      "Cada chefe de tribo traz exatamente a mesma oferta na dedicação do altar, e o texto escreve os doze itens doze vezes, sem abreviar. A repetição é deliberada: ninguém é resumido, e cada tribo recebe o mesmo espaço no registro, no mesmo detalhe. Os carros e bois oferecidos são distribuídos conforme a necessidade de transporte de cada família levítica, e os coatitas não recebem nenhum, porque carregam no ombro.",
    marcos: [
      "Os chefes oferecem carros e bois para o transporte",
      "Os coatitas não recebem carros, pois carregam no ombro",
      "Doze chefes trazem ofertas idênticas",
      "Cada oferta é registrada por extenso",
      "Moisés ouve a voz que lhe fala de sobre o propiciatório",
    ],
    chave: 89,
  },
  8: {
    resumo:
      "As lâmpadas são acesas voltadas para a frente, e os levitas são apresentados como oferta.",
    detalhe:
      "A instrução sobre o candelabro tem um detalhe de direção, com as lâmpadas iluminando para a frente dele. A consagração dos levitas é diferente da dos sacerdotes: eles são aspergidos, rapam o corpo inteiro e são apresentados como oferta movida diante do Senhor, com o povo pondo as mãos sobre eles. O limite de idade aparece no fim, com entrada aos vinte e cinco e saída aos cinquenta, quando passam a auxiliar sem executar o serviço.",
    marcos: [
      "As lâmpadas iluminam para a frente do candelabro",
      "Os levitas são purificados e rapam o corpo",
      "O povo põe as mãos sobre eles",
      "São apresentados como oferta movida",
      "Servem dos vinte e cinco aos cinquenta anos",
    ],
    chave: 16,
  },
  9: {
    resumo:
      "Quem estava impuro pede para não ficar de fora da Páscoa, e uma segunda data é criada.",
    detalhe:
      "O caso é apresentado por gente que tinha tocado em um cadáver e por isso não podia participar. A reação deles é a frase do capítulo: por que seremos privados de oferecer. Moisés não improvisa e espera resposta, e o resultado é uma segunda Páscoa no mês seguinte, que passa a valer também para quem estava em viagem. A segunda metade descreve a nuvem, e o ritmo da vida passa a ser dela: quando ela para, ficam; quando sobe, andam.",
    marcos: [
      "A Páscoa é celebrada no deserto",
      "Impuros pedem para não ser privados de oferecer",
      "Uma segunda data é instituída no mês seguinte",
      "A nuvem cobre a tenda de dia e há fogo de noite",
      "Enquanto a nuvem fica, eles ficam",
    ],
    chave: 7,
  },
  10: {
    resumo:
      "Duas trombetas de prata organizam a marcha, e o povo finalmente se põe a caminho.",
    detalhe:
      "As trombetas têm códigos distintos para convocação, alarme e partida, o que mostra o grau de organização. Depois de quase um ano acampados no Sinai, eles partem. O trecho mais humano é o convite de Moisés ao cunhado Hobabe, que quer voltar para a própria terra, e a insistência com o argumento de que ele conhece o deserto e serviria de olhos para eles. E há as duas frases ditas quando a arca partia e quando pousava.",
    marcos: [
      "Duas trombetas de prata batidas",
      "Sinais diferentes para convocar, alarmar e partir",
      "A nuvem se levanta e a marcha começa",
      "Moisés insiste com Hobabe para ir junto",
      "'Levanta-te, Senhor, e dissipem-se os teus inimigos'",
    ],
    chave: 29,
  },
  11: {
    resumo:
      "Reclamam da comida, e o líder pede para morrer antes de ter que ouvir mais um dia.",
    detalhe:
      "A queixa é por carne, e vem embrulhada em nostalgia do Egito, lembrando pepinos, melões, alho e cebola de graça, o que esquece convenientemente o preço. A parte mais forte é a fala de Moisés, que acusa Deus de ter posto sobre ele o peso de todo o povo e pergunta se foi ele quem o concebeu. A solução é dupla: setenta anciãos recebem do mesmo espírito, e vem carne até sair pelas narinas. Dois profetizam fora da tenda e Moisés se recusa a impedi-los.",
    marcos: [
      "O povo se lembra dos pepinos e melões do Egito",
      "'De onde teria eu carne para dar a todo este povo?'",
      "Setenta anciãos recebem do espírito que estava sobre Moisés",
      "Eldade e Medade profetizam no arraial",
      "'Quem dera todo o povo do Senhor fosse profeta'",
    ],
    chave: 29,
  },
  12: {
    resumo:
      "Os próprios irmãos o contestam, usando a esposa como pretexto, e um deles adoece.",
    detalhe:
      "Miriã e Arão reclamam do casamento com a cuxita e logo revelam o motivo real, perguntando se Deus falou somente por Moisés. O narrador insere ali a observação de que Moisés era manso mais do que todos os homens da terra, o que explica por que ele não se defende. A resposta divina distingue o modo de falar com ele, boca a boca e não por enigmas. Miriã fica leprosa, e é Moisés quem ora a oração mais curta do livro pedindo a cura dela.",
    marcos: [
      "Miriã e Arão falam contra Moisés por causa da esposa",
      "'Porventura, falou o Senhor somente por Moisés?'",
      "Moisés era manso mais do que todos os homens",
      "Deus fala com ele boca a boca",
      "Miriã fica leprosa e Moisés ora por ela",
    ],
    chave: 3,
  },
  13: {
    resumo:
      "Doze espias voltam com o mesmo relatório e duas conclusões opostas.",
    detalhe:
      "Todos viram a mesma coisa: terra boa, com um cacho de uvas que dois homens carregam numa vara, e cidades fortificadas com gente grande. A divergência não é sobre os fatos, é sobre o que fazer com eles. Calebe propõe subir de imediato, e os outros dez usam a expressão que condena tudo, dizendo que eram como gafanhotos aos próprios olhos e assim também aos olhos deles. A autoimagem entra no relatório como se fosse dado.",
    marcos: [
      "Doze homens são enviados a Canaã, um por tribo",
      "Voltam com um cacho carregado numa vara por dois",
      "A terra mana leite e mel, e o povo é forte",
      "Calebe propõe subir imediatamente",
      "'Éramos como gafanhotos aos nossos próprios olhos'",
    ],
    chave: 30,
  },
  14: {
    resumo:
      "O povo chora a noite toda, quer voltar ao Egito, e recebe quarenta anos de deserto.",
    detalhe:
      "A rejeição é total, a ponto de falarem em escolher um chefe e voltar. Josué e Calebe rasgam as vestes e são ameaçados de apedrejamento. A intercessão de Moisés usa dois argumentos: a reputação de Deus diante das nações e a citação da fórmula de Êxodo 34 sobre ser tardio em irar-se. O perdão vem, e as consequências também, com uma geração inteira sem entrar. Quando tentam subir no dia seguinte, sem a arca, são derrotados.",
    marcos: [
      "O povo chora e fala em voltar ao Egito",
      "Josué e Calebe rasgam as vestes",
      "Moisés intercede citando a longanimidade de Deus",
      "Quarenta anos, um por dia de espionagem",
      "Eles tentam subir sozinhos e são derrotados",
    ],
    chave: 18,
  },
  15: {
    resumo:
      "Leis para quando entrarem na terra, e a distinção entre erro e desafio deliberado.",
    detalhe:
      "Logo depois da sentença de quarenta anos, o capítulo fala de quando entrardes na terra, o que é em si uma afirmação de que a promessa não morreu. A distinção entre pecado por ignorância, que tem remédio, e pecado de mão levantada, que não tem, organiza tudo. O caso do homem que junta lenha no sábado ilustra o segundo. E no fim vêm as franjas nas bordas das roupas, feitas para serem vistas e lembrarem os mandamentos.",
    marcos: [
      "As leis valem para quando entrarem na terra",
      "O mesmo estatuto vale para o estrangeiro",
      "Diferença entre erro por ignorância e mão levantada",
      "O caso do homem que ajunta lenha no sábado",
      "As franjas nas bordas das vestes, como memorial",
    ],
    chave: 39,
  },
  16: {
    resumo:
      "Uma rebelião com duzentos e cinquenta líderes, e a terra se abre debaixo deles.",
    detalhe:
      "O argumento de Corá tem aparência democrática e é citado até hoje: toda a congregação é santa, por que vos levantais sobre o povo. Moisés não discute no calor e propõe um teste com incensários no dia seguinte. A acusação de Datã e Abirão inverte os fatos e chama o Egito de terra que mana leite e mel. O desfecho é violento, e no dia seguinte o povo culpa Moisés pelas mortes, o que mostra o quanto a situação estava perdida.",
    marcos: [
      "Corá reúne duzentos e cinquenta príncipes",
      "'Toda a congregação é santa'",
      "Datã e Abirão chamam o Egito de terra que mana leite e mel",
      "A terra se abre e os engole",
      "No dia seguinte o povo culpa Moisés pelas mortes",
    ],
    chave: 3,
  },
  17: {
    resumo:
      "Doze varas secas passam a noite diante da arca, e só uma amanhece florida.",
    detalhe:
      "Depois da rebelião, Deus resolve a disputa de autoridade com um sinal que não deixa margem: cada tribo entrega uma vara com o nome escrito, e todas ficam juntas no mesmo lugar. A de Arão brota, floresce e produz amêndoas maduras da noite para o dia. A vara é guardada como sinal contra os murmuradores. A reação do povo é de pânico, perguntando se vão todos perecer, o que o capítulo seguinte responde organizando funções.",
    marcos: [
      "Doze varas com o nome de cada tribo",
      "Ficam uma noite diante do testemunho",
      "A vara de Arão brota, floresce e dá amêndoas",
      "É guardada como sinal contra os rebeldes",
      "O povo pergunta com medo se todos perecerão",
    ],
    chave: 8,
  },
  18: {
    resumo:
      "A responsabilidade é definida, e junto dela o sustento de quem não tem terra.",
    detalhe:
      "A resposta ao pânico do capítulo anterior é organização: Arão e os filhos respondem pelo santuário, e os levitas servem junto deles sem tocar nos objetos sagrados. O sustento é a outra metade. Como Levi não recebe herança de terra, recebe os dízimos de Israel, e paga ele mesmo um dízimo do dízimo aos sacerdotes. A frase que resume a situação da tribo é dita por Deus: eu sou a tua parte e a tua herança.",
    marcos: [
      "Arão e os filhos respondem pelo santuário",
      "Os levitas servem sem tocar nos objetos sagrados",
      "Levi não recebe herança de terra",
      "'Eu sou a tua parte e a tua herança'",
      "Os levitas também entregam o dízimo do dízimo",
    ],
    chave: 20,
  },
  19: {
    resumo:
      "Uma novilha vermelha é queimada inteira para produzir a água que purifica os mortos.",
    detalhe:
      "É o rito mais enigmático da Torá e os próprios rabinos o classificavam como um decreto sem explicação. A cinza é misturada com água e aspergida sobre quem tocou em cadáver, sepultura ou esteve numa tenda onde alguém morreu. O paradoxo que intriga há séculos está no texto: quem manuseia a novilha e prepara a mistura fica impuro, enquanto quem é aspergido com ela fica puro. O que purifica contamina quem o prepara.",
    marcos: [
      "Uma novilha vermelha sem defeito, que nunca puxou jugo",
      "É queimada inteira, com cedro, hissopo e escarlate",
      "A cinza é misturada com água corrente",
      "Aspergida ao terceiro e ao sétimo dia",
      "Quem prepara a mistura fica impuro",
    ],
    chave: 2,
  },
  20: {
    resumo:
      "Miriã morre, falta água outra vez, e o líder perde a entrada na terra por um golpe a mais.",
    detalhe:
      "Quase quarenta anos se passam entre o capítulo anterior e este, em silêncio narrativo. A ordem é falar à rocha, e Moisés fala ao povo, chamando-os de rebeldes, pergunta se ele e Arão farão sair água, e fere a rocha duas vezes. A água vem assim mesmo. A sentença é dada com a palavra santificar, e é uma das passagens mais discutidas do Antigo Testamento pela desproporção aparente. O capítulo fecha com a morte de Arão no monte Hor.",
    marcos: [
      "Miriã morre e é sepultada em Cades",
      "O povo contende de novo por água",
      "A ordem é falar à rocha",
      "Moisés a fere duas vezes com o cajado",
      "Arão morre no monte Hor e Eleazar o sucede",
    ],
    chave: 12,
  },
  21: {
    resumo:
      "Reclamam do maná, vêm serpentes, e a cura é olhar para uma serpente de bronze.",
    detalhe:
      "A queixa desta vez é contra o próprio sustento, chamado de pão vil, e vem acompanhada da frase de que não há pão nem água, dita enquanto comiam. O remédio é estranho de propósito: a imagem do que os mata é levantada num poste e quem olha vive. Jesus usa essa cena em João 3 para falar de si mesmo. O restante do capítulo é militar, com as vitórias sobre Seom e Ogue, e traz citações de um poema antigo sobre um poço.",
    marcos: [
      "O povo se enfada do maná e o chama de pão vil",
      "Serpentes abrasadoras mordem o povo",
      "A serpente de bronze é levantada num poste",
      "Quem olha para ela vive",
      "Vitórias sobre Seom e sobre Ogue de Basã",
    ],
    chave: 9,
  },
  22: {
    resumo:
      "Um rei contrata um adivinho para amaldiçoar Israel, e a jumenta enxerga antes do profeta.",
    detalhe:
      "Balaão é um personagem ambíguo do começo ao fim: ele fala corretamente sobre não poder ultrapassar a palavra do Senhor e mesmo assim negocia duas vezes. A cena da jumenta é deliberadamente cômica e crítica, com o animal vendo o anjo três vezes e o vidente famoso não vendo nada, até discutir com ela sem estranhar que ela fale. A pergunta do anjo sobre por que ele bateu no animal três vezes inverte quem é o irracional.",
    marcos: [
      "Balaque manda buscar Balaão para amaldiçoar Israel",
      "Balaão diz não poder ultrapassar a palavra do Senhor",
      "A jumenta vê o anjo e desvia três vezes",
      "Ela fala, e ele discute com ela",
      "Os olhos de Balaão são abertos",
    ],
    chave: 18,
  },
  23: {
    resumo:
      "Duas tentativas de amaldiçoar, e nas duas sai bênção da boca do contratado.",
    detalhe:
      "O procedimento é sempre o mesmo, com sete altares, sete novilhos e sete carneiros, e a esperança de que mudar de lugar mude o resultado. O primeiro oráculo diz que ele não pode amaldiçoar quem Deus não amaldiçoou, e descreve um povo que habita só. O segundo contém uma das declarações mais fortes do Antigo Testamento sobre o caráter de Deus, dizendo que ele não é homem para que minta nem filho do homem para que se arrependa.",
    marcos: [
      "Sete altares são levantados",
      "'Como amaldiçoarei o que Deus não amaldiçoa?'",
      "Balaque tenta outro lugar de observação",
      "'Deus não é homem para que minta'",
      "'Não há encantamento contra Jacó'",
    ],
    chave: 19,
  },
  24: {
    resumo:
      "Na terceira tentativa o Espírito vem sobre ele, e sai um elogio que vira profecia.",
    detalhe:
      "Balaão deixa de procurar encantamentos e simplesmente olha para o acampamento, e o oráculo começa com a frase sobre as tendas serem formosas. Balaque explode de raiva e bate as mãos, demitindo-o sem pagamento. O quarto oráculo, dado espontaneamente, fala de uma estrela que procederá de Jacó e de um cetro de Israel, e é um dos textos que a tradição posterior leu em chave messiânica.",
    marcos: [
      "Balaão desiste dos encantamentos e olha para o arraial",
      "'Quão boas são as tuas tendas, ó Jacó!'",
      "Balaque bate as mãos de raiva",
      "'Uma estrela procederá de Jacó'",
      "Cada um volta para o seu lugar",
    ],
    chave: 17,
  },
  25: {
    resumo:
      "O que a maldição não conseguiu, um convite para festa religiosa conseguiu.",
    detalhe:
      "Depois de três capítulos em que nenhuma maldição pega, o povo cai por dentro, através de relações com moabitas e da participação nos sacrifícios de Baal-Peor. Textos posteriores atribuem a estratégia ao próprio Balaão. A ação de Fineias é violenta e o texto a trata como zelo que faz expiação, encerrando a praga. É um capítulo desconfortável e é honesto ler a violência dele como registro do seu mundo, e não como receita.",
    marcos: [
      "O povo se envolve com as filhas de Moabe",
      "Participam dos sacrifícios de Baal-Peor",
      "Uma praga se alastra pelo arraial",
      "Fineias intervém e a praga cessa",
      "Um pacto de paz é dado a Fineias",
    ],
    chave: 11,
  },
  26: {
    resumo:
      "Um segundo censo, quarenta anos depois, e entre os contados não há quase ninguém do primeiro.",
    detalhe:
      "O capítulo parece repetir o capítulo 1 e tem uma função diferente: este censo é para a repartição da terra, e não para a guerra. O total é quase igual, o que é notável depois de quarenta anos de deserto. A observação que fecha o sentido está no fim, dizendo que entre esses não havia nenhum dos contados antes, exceto Calebe e Josué. Uma geração inteira passou, e a promessa continua de pé.",
    marcos: [
      "O segundo censo é feito nas campinas de Moabe",
      "A contagem serve para repartir a terra",
      "A repartição será por sorte e por tamanho",
      "As filhas de Zelofeade são mencionadas",
      "Nenhum dos contados antes restou, exceto Calebe e Josué",
    ],
    chave: 65,
  },
  27: {
    resumo:
      "Cinco irmãs mudam a lei de herança, e o sucessor de Moisés é escolhido.",
    detalhe:
      "As filhas de Zelofeade se apresentam diante de Moisés, do sacerdote e de toda a congregação, e argumentam que o nome do pai não deve desaparecer por ele não ter tido filho homem. Moisés leva o caso a Deus, e a resposta começa com uma frase direta: elas falam o que é justo. A lei é alterada. A segunda parte é a nomeação de Josué, pedida pelo próprio Moisés para que a congregação não fique como ovelhas sem pastor.",
    marcos: [
      "As filhas de Zelofeade apresentam o caso publicamente",
      "'As filhas de Zelofeade falam o que é justo'",
      "A lei de herança é alterada",
      "Moisés vê a terra do alto do monte",
      "Josué é apresentado e recebe autoridade",
    ],
    chave: 7,
  },
  28: {
    resumo:
      "O calendário das ofertas, do sacrifício diário às festas anuais.",
    detalhe:
      "É um capítulo de agenda litúrgica e seu ponto é o ritmo. Há o que se oferece todo dia, de manhã e à tarde, o que se acrescenta no sábado, o que se acrescenta a cada início de mês, e o que cabe a cada festa. O efeito prático é que o calendário inteiro fica marcado por pontos fixos. Para quem lê seguido, é repetitivo; para quem vivia aquilo, era a estrutura do tempo, semelhante ao que um calendário de feriados faz hoje.",
    marcos: [
      "O holocausto contínuo, de manhã e à tarde",
      "O acréscimo do sábado",
      "As ofertas do princípio de cada mês",
      "Páscoa e Pães Asmos",
      "A Festa das Semanas",
    ],
    chave: 2,
  },
  29: {
    resumo:
      "As festas do sétimo mês, com uma contagem de novilhos que diminui a cada dia.",
    detalhe:
      "O sétimo mês concentra três celebrações: as trombetas, o Dia da Expiação e os Tabernáculos. O detalhe curioso está nos sete dias da última festa, em que o número de novilhos começa em treze e cai um por dia até sete, somando setenta. A tradição judaica associou esse número às setenta nações da tabela de Gênesis 10, lendo a festa como oferta pelo mundo inteiro, e não apenas por Israel.",
    marcos: [
      "O primeiro dia do sétimo mês, com trombetas",
      "O décimo dia, de afligir a alma",
      "Sete dias de Tabernáculos",
      "Os novilhos diminuem de treze para sete",
      "Setenta novilhos ao todo",
    ],
    chave: 1,
  },
  30: {
    resumo:
      "Regras sobre votos, incluindo os casos em que outra pessoa pode anulá-los.",
    detalhe:
      "O princípio geral é severo: quem faz voto não profanará a sua palavra, e fará conforme tudo o que saiu da sua boca. As exceções tratam da mulher solteira sob a casa do pai e da casada, e concedem ao pai ou ao marido o direito de anular no dia em que ouvirem. Se calarem, o voto se confirma. Lido no seu contexto, é um mecanismo de proteção patrimonial de uma sociedade em que a responsabilidade por dívidas era coletiva.",
    marcos: [
      "Quem faz voto não profanará a sua palavra",
      "O voto da solteira pode ser anulado pelo pai",
      "O voto da casada pode ser anulado pelo marido",
      "Se calarem no dia em que ouvirem, o voto se confirma",
      "A viúva e a divorciada respondem pelos próprios votos",
    ],
    chave: 2,
  },
  31: {
    resumo:
      "A campanha contra Midiã, e um dos capítulos mais duros de ler da Torá.",
    detalhe:
      "A guerra é apresentada como resposta ao episódio de Baal-Peor, e o relato inclui ordens que chocam qualquer leitor moderno, inclusive sobre prisioneiros. Não há como suavizar isso, e o texto não tenta. Vale ler sabendo que se trata de literatura de guerra do segundo milênio antes de Cristo, e que a própria Bíblia depois submete essa prática a crítica. A parte final é administrativa, com a divisão do despojo e um tributo.",
    marcos: [
      "A campanha é apresentada como resposta a Peor",
      "Balaão morre entre os mortos de Midiã",
      "Os combatentes ficam sete dias fora do arraial",
      "O despojo é dividido entre quem lutou e a congregação",
      "Os oficiais oferecem o ouro tomado",
    ],
    chave: 27,
  },
  32: {
    resumo:
      "Duas tribos pedem para ficar antes do rio, e Moisés reage lembrando dos espias.",
    detalhe:
      "Rúben e Gade têm muito gado e a terra de Jazer é boa para pasto, e a proposta soa sensata. A reação de Moisés é dura porque ele já viu aquele filme: acusa-os de desanimar o coração dos irmãos, exatamente como fizeram os dez espias. O acordo que se fecha é uma das melhores negociações da Bíblia: eles ficam com a terra e vão na frente na guerra, e só voltam quando os irmãos tiverem herdado.",
    marcos: [
      "Rúben e Gade pedem a terra do outro lado do Jordão",
      "Moisés os compara aos espias que desanimaram o povo",
      "Eles se oferecem para ir armados à frente",
      "Só voltam quando os irmãos herdarem",
      "'Sabei que o vosso pecado vos há de achar'",
    ],
    chave: 23,
  },
  33: {
    resumo:
      "O itinerário completo, acampamento por acampamento, da saída do Egito até o Jordão.",
    detalhe:
      "O texto diz que Moisés escreveu as partidas conforme o mandado do Senhor, e são mais de quarenta etapas listadas. Lido seguido parece um roteiro seco, e o efeito é o oposto do esquecimento: cada nome é um lugar onde algo aconteceu, e a lista transforma quarenta anos em documento. O fim do capítulo é uma instrução clara sobre a entrada na terra, com o aviso de que o que ficar se tornará espinhos nos olhos.",
    marcos: [
      "Moisés escreve as partidas por ordem do Senhor",
      "Mais de quarenta acampamentos listados",
      "A morte de Arão é datada dentro da lista",
      "Instrução de expulsar os moradores e destruir os ídolos",
      "O que ficar será espinho nos olhos",
    ],
    chave: 55,
  },
  34: {
    resumo: "As fronteiras da terra prometida, e quem vai supervisionar a repartição.",
    detalhe:
      "O capítulo desenha o mapa antes de haver posse, o que por si só é um ato de confiança. Os limites são descritos por acidentes geográficos, com o mar Grande a oeste e o Jordão a leste. A repartição será feita por sorte, e são nomeados os responsáveis por tribo, com Eleazar e Josué à frente. Nomear quem vai dividir antes de conquistar é uma decisão administrativa que evita disputa depois.",
    marcos: [
      "Os limites sul, oeste, norte e leste são descritos",
      "A terra será repartida por sorte",
      "Eleazar e Josué supervisionam a divisão",
      "Um príncipe de cada tribo é nomeado",
      "As tribos do outro lado já receberam a sua parte",
    ],
    chave: 2,
  },
  35: {
    resumo:
      "Quarenta e oito cidades para os levitas, e seis delas servem de refúgio.",
    detalhe:
      "Os levitas recebem cidades com arredores para o gado, distribuídas conforme o tamanho de cada tribo. As cidades de refúgio existem para separar homicídio de acidente, e o texto detalha os critérios com exemplos concretos sobre instrumento usado e existência de inimizade prévia. A exigência de pelo menos duas testemunhas para pena capital e a proibição de aceitar resgate pela vida de um homicida são princípios que atravessam toda a tradição jurídica posterior.",
    marcos: [
      "Quarenta e oito cidades para os levitas",
      "Seis delas são cidades de refúgio",
      "O critério é a intenção e a inimizade prévia",
      "Ninguém é condenado por uma só testemunha",
      "Não se aceita resgate pela vida de um homicida",
    ],
    chave: 30,
  },
  36: {
    resumo:
      "O livro termina com um ajuste fino na decisão do capítulo 27, feito sem desfazê-la.",
    detalhe:
      "Os chefes da tribo de Manassés levantam um problema real: se as herdeiras casarem fora da tribo, a terra migra e a divisão original se desfaz no Jubileu. A solução não revoga o direito delas, apenas acrescenta uma condição sobre casar dentro da tribo do pai. O livro que começou com um censo militar termina com mulheres casando conforme lhes agrada dentro da própria tribo, e com a terra preservada.",
    marcos: [
      "Os chefes de Manassés levantam a questão da herança",
      "O risco de a terra migrar entre tribos",
      "A decisão anterior é mantida e ajustada",
      "Elas casam com quem quiserem dentro da tribo do pai",
      "As filhas de Zelofeade cumprem a ordem",
    ],
    chave: 6,
  },
};

CAPITULOS.dt = {
  1: {
    resumo:
      "Na véspera da travessia, ele recomeça a história, e a frase de abertura é sobre onze dias.",
    detalhe:
      "O livro inteiro é um discurso de despedida, e o primeiro dado que Moisés solta é demolidor: de Horebe a Cades são onze dias de caminho, e eles levaram quarenta anos. Ele recorda a nomeação de chefes para dividir o julgamento, com a instrução de ouvir o pequeno como o grande e não ter medo de ninguém. E recorda a recusa de subir, citando as palavras do povo naquele dia, incluindo a acusação de que Deus os odiava.",
    marcos: [
      "De Horebe a Cades são onze dias de caminho",
      "A nomeação de chefes para julgar o povo",
      "'Não discrimineis no juízo; ouvireis o pequeno como o grande'",
      "A recusa de subir depois do relatório dos espias",
      "'O Senhor vosso Deus irá adiante de vós'",
    ],
    chave: 17,
  },
  2: {
    resumo:
      "A travessia por territórios vizinhos, com ordens explícitas de não os atacar.",
    detalhe:
      "É um capítulo que costuma passar batido e diz algo relevante: Deus proíbe tocar em Edom, Moabe e Amom, lembrando que também deu terra a eles, por serem descendentes de Esaú e de Ló. A conquista de Canaã não é apresentada como licença geral para tomar o que se quiser. Eles chegam a comprar comida e água com dinheiro. A guerra contra Seom começa por recusa de passagem, e o capítulo marca o fim da geração antiga.",
    marcos: [
      "Ordem de não provocar os filhos de Esaú",
      "Moabe e Amom também não devem ser atacados",
      "Compram comida e água com dinheiro",
      "A geração dos homens de guerra se consome",
      "A vitória sobre Seom, rei de Hesbom",
    ],
    chave: 7,
  },
  3: {
    resumo:
      "A vitória sobre Ogue, a repartição do lado leste, e um pedido pessoal recusado.",
    detalhe:
      "O relato militar inclui o detalhe da cama de ferro de Ogue, guardada como curiosidade. A terra a leste é entregue a Rúben, Gade e meia tribo de Manassés, com a mesma condição de irem armados à frente dos irmãos. O trecho mais humano é o fim: Moisés conta que suplicou para atravessar e ver a terra boa, e que Deus lhe disse que bastava, que não falasse mais nisso, e que subisse o monte e olhasse com os olhos.",
    marcos: [
      "A vitória sobre Ogue, rei de Basã",
      "A cama de ferro de Ogue é descrita",
      "A terra a leste é repartida entre duas tribos e meia",
      "Josué é encorajado a não temer os reinos",
      "'Basta; não me fales mais nisto'",
    ],
    chave: 26,
  },
  4: {
    resumo:
      "O argumento central: nenhuma outra nação tem um Deus tão perto quando o invoca.",
    detalhe:
      "Moisés insiste em duas coisas ao mesmo tempo, guardar os mandamentos e lembrar que eles não viram figura nenhuma no dia em que Deus falou do meio do fogo. Daí a proibição de imagens, apresentada não como arbitrariedade, mas como consequência do que aconteceu. O capítulo prevê o exílio e já promete que, se buscarem de todo o coração, acharão. E há o pedido de ensinar aos filhos e aos filhos dos filhos.",
    marcos: [
      "Nada acrescentar nem diminuir da palavra",
      "'Que grande nação há que tenha deuses tão chegados?'",
      "Não viram figura alguma no dia de Horebe",
      "A proibição de fazer imagem de escultura",
      "'Se de lá buscares ao Senhor teu Deus, o acharás'",
    ],
    chave: 7,
  },
  5: {
    resumo:
      "Os Dez Mandamentos repetidos, com uma diferença na justificativa do sábado.",
    detalhe:
      "Moisés faz questão de dizer que a aliança não foi feita só com os pais, e sim com os que estão ali vivos naquele dia. O texto é quase idêntico ao de Êxodo 20, com uma alteração significativa: aqui o sábado é fundamentado na libertação do Egito, e não na criação, com a ordem explícita de que o servo e a serva descansem como você. A memória da escravidão vira argumento para dar folga a quem trabalha para você.",
    marcos: [
      "'Não com nossos pais fez o Senhor esta aliança'",
      "Os Dez Mandamentos são repetidos",
      "O sábado é fundamentado na saída do Egito",
      "'Para que o teu servo e a tua serva descansem como tu'",
      "O povo pede que Moisés fale no lugar de Deus",
    ],
    chave: 15,
  },
  6: {
    resumo:
      "A confissão central do judaísmo, e a instrução de falar dela o dia inteiro em casa.",
    detalhe:
      "O Shemá é a oração que judeus recitam de manhã e à noite até hoje, e Jesus a cita como o maior mandamento. O que vem depois é pedagogia doméstica: essas palavras estarão no coração, e você as ensinará aos filhos falando delas assentado em casa, andando pelo caminho, ao deitar e ao levantar. O capítulo também alerta para o risco da prosperidade, sobre esquecer quem deu as casas cheias que você não encheu.",
    marcos: [
      "'Ouve, ó Israel, o Senhor nosso Deus é o único Senhor'",
      "Amar com todo o coração, alma e força",
      "'Falarás delas assentado em tua casa e andando pelo caminho'",
      "Cuidado ao comer de casas cheias que não encheste",
      "A resposta a dar quando o filho perguntar",
    ],
    chave: 5,
  },
  7: {
    resumo:
      "A escolha não foi por mérito nem por tamanho, e sim porque ele amou.",
    detalhe:
      "O capítulo tem instruções de guerra duras sobre os povos de Canaã, e tem no meio delas a frase que desmonta qualquer superioridade: o Senhor não pôs o coração em vós porque fôsseis mais numerosos, pois éreis o menor de todos. A razão dada é circular de propósito, porque ele vos amou. A proibição de casamentos mistos é justificada de forma prática, pelo risco de desviar o coração dos filhos.",
    marcos: [
      "Ordem de não fazer aliança com os povos da terra",
      "'Porque tu és povo santo ao Senhor teu Deus'",
      "'Não porque fôsseis mais numerosos, pois éreis o menor'",
      "'Mas porque o Senhor vos amava'",
      "Deus é fiel e guarda a aliança até mil gerações",
    ],
    chave: 7,
  },
  8: {
    resumo:
      "Quarenta anos de deserto tiveram um propósito, e a fartura traz um risco maior.",
    detalhe:
      "A explicação do deserto é dada em duas palavras, humilhar e provar, para saber o que havia no coração. A frase sobre não viver só de pão está aqui e é a que Jesus cita na tentação. A segunda metade é o alerta mais atual do livro: quando comeres e te fartares, e edificares boas casas, e o teu gado se multiplicar, cuidado para não dizer no coração que a tua força e o poder do teu braço adquiriram isso.",
    marcos: [
      "O deserto serviu para humilhar e provar",
      "'Nem só de pão viverá o homem'",
      "As vestes não envelheceram em quarenta anos",
      "Cuidado quando comeres e te fartares",
      "'A minha força adquiriu este poder'",
    ],
    chave: 3,
  },
  9: {
    resumo:
      "Antes de entrarem, ele avisa: não pensem que é por serem justos.",
    detalhe:
      "Moisés repete três vezes que não é pela justiça deles, e para provar recita a lista de rebeliões, começando pelo bezerro de ouro. O relato é em primeira pessoa e tem detalhes que Êxodo não dá, como os quarenta dias prostrado sem comer nem beber, duas vezes seguidas. Ele conta que intercedeu também por Arão, que estava prestes a ser destruído. O capítulo é um exercício de memória honesta feito por quem está prestes a morrer.",
    marcos: [
      "'Não é por tua justiça que possuis esta terra'",
      "O bezerro de ouro é recontado em detalhe",
      "Moisés quebra as tábuas diante dos olhos deles",
      "Quarenta dias prostrado, sem comer nem beber",
      "Ele intercede também por Arão",
    ],
    chave: 6,
  },
  10: {
    resumo:
      "O que Deus pede é resumido em cinco verbos, e um deles é amar o estrangeiro.",
    detalhe:
      "Depois das segundas tábuas, vem a pergunta sobre o que o Senhor requer, e a resposta é uma lista curta: temer, andar nos caminhos, amar, servir de todo o coração e guardar os mandamentos. O que segue é o argumento mais desarmante do capítulo: Deus é descrito como quem não aceita suborno e faz justiça ao órfão e à viúva, e ama o estrangeiro dando-lhe pão e roupa, e por isso eles devem amar o estrangeiro, porque também foram estrangeiros.",
    marcos: [
      "As segundas tábuas e a arca",
      "'Que é que o Senhor teu Deus pede de ti?'",
      "Circuncidai o prepúcio do vosso coração",
      "Ele faz justiça ao órfão e à viúva",
      "'Amai o estrangeiro, pois fostes estrangeiros no Egito'",
    ],
    chave: 19,
  },
  11: {
    resumo:
      "A terra nova depende de chuva, e essa dependência é apresentada como vantagem.",
    detalhe:
      "A comparação com o Egito é precisa e agrícola: lá se regava com o pé, por irrigação do Nilo, e aqui a terra bebe água da chuva do céu. Em outras palavras, eles vão viver numa terra em que não há como garantir a colheita por engenharia. O capítulo enquadra isso como cuidado contínuo de Deus, e não como insegurança. E termina com a imagem da bênção e da maldição postas diante deles, nos montes Gerizim e Ebal.",
    marcos: [
      "Eles viram com os próprios olhos o que foi feito no Egito",
      "A terra bebe água da chuva do céu",
      "Os olhos do Senhor estão sobre ela o ano inteiro",
      "As palavras atadas na mão e por frontal entre os olhos",
      "A bênção e a maldição diante deles",
    ],
    chave: 11,
  },
  12: {
    resumo:
      "O culto passa a ter um lugar só, e cada um deixa de fazer o que acha certo.",
    detalhe:
      "A centralização tem duas razões. A primeira é impedir que adotem os lugares altos dos povos da terra. A segunda aparece no versículo 8 e é sociológica, encerrando o período em que cada um fazia o que era reto aos próprios olhos, que é exatamente a frase que Juízes vai repetir. O capítulo também permite o abate comum para alimentação, desde que o sangue seja derramado na terra, separando refeição de sacrifício.",
    marcos: [
      "Destruir os lugares de culto dos povos da terra",
      "Um único lugar escolhido para as ofertas",
      "Cada um fazia o que era reto aos seus olhos",
      "O abate comum é permitido, sem o sangue",
      "Não perguntar como aqueles povos serviam aos seus deuses",
    ],
    chave: 8,
  },
  13: {
    resumo:
      "Se o sinal se cumprir e a mensagem levar a outros deuses, o sinal não vale nada.",
    detalhe:
      "O critério é notável porque não é pragmático: mesmo que o profeta acerte a previsão, se ele chamar para seguir outros deuses, não deve ser ouvido. O sucesso não valida a mensagem. O capítulo estende o alerta a quem está mais próximo, incluindo irmão, filho e a esposa do teu coração, e depois à cidade inteira. As penas são severas, e vale notar a exigência de investigação diligente antes de qualquer ação.",
    marcos: [
      "Mesmo que o sinal se cumpra, não ouvirás",
      "O teste é sobre a quem a mensagem conduz",
      "O alerta alcança o irmão, o filho e a esposa",
      "A cidade desviada deve ser investigada com diligência",
      "'Inquirirás e investigarás bem'",
    ],
    chave: 3,
  },
  14: {
    resumo:
      "Regras de alimentação e um dízimo que às vezes é para gastar com o que der vontade.",
    detalhe:
      "A lista de animais retoma Levítico 11. A parte surpreendente é o dízimo: além do uso ritual, há a instrução de trocá-lo por dinheiro quando o caminho for longo, ir ao lugar escolhido e comprar tudo o que a alma desejar, bois, ovelhas, vinho ou bebida forte, e comer ali com alegria com a família. E a cada três anos o dízimo fica na cidade, para o levita, o estrangeiro, o órfão e a viúva.",
    marcos: [
      "A distinção entre animais limpos e imundos",
      "O dízimo pode ser convertido em dinheiro",
      "'Compra tudo o que desejar a tua alma'",
      "Comer diante do Senhor com alegria",
      "A cada três anos o dízimo fica para os necessitados",
    ],
    chave: 26,
  },
  15: {
    resumo:
      "A cada sete anos as dívidas são perdoadas, e o texto antecipa a objeção óbvia.",
    detalhe:
      "A remissão é a cada sete anos, e o legislador sabe o que vai acontecer: as pessoas deixam de emprestar quando o ano se aproxima. Por isso o texto adverte contra o pensamento perverso de olhar com maus olhos para o irmão pobre por causa da data. A frase mais realista do capítulo reconhece que nunca deixará de haver pobre na terra, e justamente por isso manda abrir a mão liberalmente. O escravo libertado sai com presentes, e não de mãos vazias.",
    marcos: [
      "A cada sete anos há remissão das dívidas",
      "Cuidado com o pensamento perverso na véspera do sétimo ano",
      "'Não deixará de haver pobre no meio da terra'",
      "'Livremente lhe abrirás a mão'",
      "O escravo que sai livre é abastecido com presentes",
    ],
    chave: 11,
  },
  16: {
    resumo:
      "As três festas de peregrinação, e um lembrete de que ninguém aparece de mãos vazias.",
    detalhe:
      "Páscoa, Semanas e Tabernáculos exigem subir ao lugar escolhido, e todas incluem expressamente o levita, o estrangeiro, o órfão e a viúva na celebração. A alegria é ordenada, com a expressão sobre estar totalmente alegre. O fim do capítulo muda de assunto e trata de justiça, com a proibição de torcer o direito e de aceitar suborno, porque o presente cega os olhos dos sábios, e a ordem repetida sobre seguir a justiça.",
    marcos: [
      "As três festas de subida ao lugar escolhido",
      "O levita, o estrangeiro, o órfão e a viúva se alegram junto",
      "'Ninguém apareça de mãos vazias'",
      "Juízes e oficiais em todas as cidades",
      "'A justiça, somente a justiça seguirás'",
    ],
    chave: 20,
  },
  17: {
    resumo:
      "Regras de tribunal, e depois um estatuto para o rei que o proíbe de acumular.",
    detalhe:
      "A parte judicial exige duas ou três testemunhas e manda que quem testemunha lance a primeira pedra, o que é um freio contra denúncia leviana. A parte sobre o rei é a mais notável e antecipa o que acontece em 1 Reis: ele não multiplicará cavalos nem fará o povo voltar ao Egito, não multiplicará mulheres para que o coração não se desvie, nem prata e ouro em excesso. E deve escrever para si uma cópia da lei e lê-la todos os dias.",
    marcos: [
      "Nenhum caso se decide por uma só testemunha",
      "A mão das testemunhas será a primeira",
      "O rei não multiplicará cavalos nem mulheres",
      "Nem prata e ouro em demasia",
      "Ele escreverá uma cópia da lei e a lerá todos os dias",
    ],
    chave: 18,
  },
  18: {
    resumo:
      "Proibição de toda adivinhação, e a promessa de um profeta como Moisés.",
    detalhe:
      "A lista de práticas proibidas é longa e cobre todas as formas de tentar arrancar o futuro, incluindo passar filhos pelo fogo. O contraste é a figura do profeta, que não busca informação e sim recebe palavra. O teste dado é objetivo e severo: se o que ele disser não acontecer, não foi o Senhor quem falou. E há a instrução de não ter medo desse profeta falso, o que protege quem precisa discernir.",
    marcos: [
      "Os levitas vivem das ofertas, pois não têm herança",
      "Proibição de adivinhação, agouro e consulta aos mortos",
      "'Serás perfeito para com o Senhor teu Deus'",
      "Um profeta como Moisés será levantado",
      "O teste: se não acontecer, não foi o Senhor quem falou",
    ],
    chave: 15,
  },
  19: {
    resumo:
      "Cidades de refúgio com estradas preparadas, e pena para quem testemunha falso.",
    detalhe:
      "O detalhe prático mais interessante é a ordem de preparar o caminho e dividir o território em três, para que o refúgio seja alcançável. De nada adianta o direito existir se a pessoa não chega a tempo. O exemplo dado é o do machado cuja cabeça se solta e mata o companheiro. A segunda parte trata de testemunha falsa, e a pena é fazer com ela o que ela pretendia fazer com o outro, o que desestimula a acusação inventada.",
    marcos: [
      "Três cidades de refúgio, com caminhos preparados",
      "O exemplo do machado que escapa da mão",
      "Não mudar os limites antigos do vizinho",
      "Duas ou três testemunhas para qualquer acusação",
      "Ao falso testemunho se faz o que ele pretendia",
    ],
    chave: 15,
  },
  20: {
    resumo:
      "Antes da batalha, mandam para casa quem construiu, plantou, noivou ou está com medo.",
    detalhe:
      "As dispensas são notáveis por serem quatro e por incluírem a do medo, dita sem vergonha e justificada para não desanimar os outros. Casa nova, vinha nova e noivado valem como motivo legítimo de licença, o que subordina a guerra à vida comum. Há também a ordem de propor paz antes de sitiar uma cidade distante, e uma regra ecológica pouco lembrada, proibindo derrubar as árvores frutíferas do lugar sitiado.",
    marcos: [
      "Quem edificou casa nova e não a estreou volta",
      "Quem plantou vinha e ainda não colheu volta",
      "Quem está noivo volta",
      "Quem está com medo volta, para não desanimar os irmãos",
      "Não destruir as árvores frutíferas da cidade sitiada",
    ],
    chave: 8,
  },
  21: {
    resumo:
      "Leis variadas, começando por um homicídio sem autor e a responsabilidade da cidade mais próxima.",
    detalhe:
      "O rito do corpo achado no campo é uma solução para o que hoje chamaríamos de crime sem solução: os anciãos da cidade mais próxima declaram publicamente que as mãos deles não derramaram aquele sangue. A responsabilidade é territorial, e não pode ser simplesmente ignorada. O capítulo também protege a cativa de guerra com um período de luto obrigatório, e proíbe preterir o primogênito por preferir outra esposa.",
    marcos: [
      "O rito para o corpo achado no campo sem autor",
      "A cidade mais próxima assume a responsabilidade",
      "A cativa recebe um mês de luto antes de qualquer coisa",
      "O primogênito não pode ser preterido por preferência",
      "O filho rebelde é levado aos anciãos da cidade",
    ],
    chave: 7,
  },
  22: {
    resumo:
      "Devolver o que se acha, ajudar o animal caído, e uma série de casos sobre honra.",
    detalhe:
      "A primeira parte é de solidariedade obrigatória: se você vê o boi do irmão desgarrado, não pode se esconder, e se não sabe de quem é, guarda até ele procurar. A ordem é a mesma para o animal caído no caminho. Há também a exigência de parapeito no terraço da casa nova, uma lei de segurança construtiva. A parte final trata de casos sexuais, e traz distinções sobre consentimento e sobre onde o fato ocorreu.",
    marcos: [
      "Devolver o animal perdido do irmão",
      "'Não te poderás esconder'",
      "Ajudar a levantar o jumento caído no caminho",
      "Parapeito obrigatório no terraço da casa nova",
      "A distinção entre o que acontece na cidade e no campo",
    ],
    chave: 3,
  },
  23: {
    resumo:
      "Regras sobre a assembleia, higiene do acampamento, juros, e o escravo que fugiu.",
    detalhe:
      "Duas leis se destacam pela generosidade. A primeira manda não entregar ao dono o escravo que se refugiou, deixando que ele escolha onde morar, o que é o oposto do direito da época na região. A segunda permite que quem passa por uma vinha coma uvas até se fartar, sem poder levar num cesto, e o mesmo na seara com as espigas. O direito do faminto de se alimentar caminhando é reconhecido, sem virar licença para colher.",
    marcos: [
      "Quem entra e quem não entra na assembleia",
      "Regras de higiene do acampamento",
      "Não cobrar juros do irmão",
      "O escravo fugido não é entregue ao seu senhor",
      "Comer uvas ou espigas ao passar, sem levar no cesto",
    ],
    chave: 15,
  },
  24: {
    resumo:
      "Penhor, salário e respigo, e a ordem de deixar de propósito parte da colheita no campo.",
    detalhe:
      "A regra sobre o penhor é delicada: não se entra na casa para pegar a garantia, espera-se do lado de fora, e se for a capa do pobre, ela volta antes do pôr do sol. O salário do diarista é pago no mesmo dia, porque ele conta com aquilo. E o respigo é instituído com uma frase que muda tudo: se esqueceres um feixe no campo, não voltes para buscá-lo, será para o estrangeiro, o órfão e a viúva. O esquecimento vira política social.",
    marcos: [
      "Não entrar na casa para tomar o penhor",
      "O salário do pobre é pago no mesmo dia",
      "Cada um morre pelo seu próprio pecado",
      "O feixe esquecido não se volta para buscar",
      "As azeitonas e uvas restantes ficam para o estrangeiro e a viúva",
    ],
    chave: 15,
  },
  25: {
    resumo:
      "Limite para a punição, boi que trilha sem focinheira, e pesos honestos na sacola.",
    detalhe:
      "A limitação dos açoites a quarenta existe para que o irmão não fique envilecido aos olhos de todos, ou seja, a pena tem um teto para preservar a dignidade de quem a cumpre. A regra sobre não atar a boca do boi que debulha é citada por Paulo duas vezes ao falar de sustento de quem trabalha. E o capítulo termina com a exigência de peso inteiro e justo na bolsa, ligando fraude comercial à abominação.",
    marcos: [
      "O limite de quarenta açoites, para não envilecer o irmão",
      "'Não atarás a boca ao boi quando debulhar'",
      "A lei do levirato para a viúva sem filhos",
      "Peso inteiro e justo na sacola",
      "A lembrança do que Amaleque fez no caminho",
    ],
    chave: 15,
  },
  26: {
    resumo:
      "Ao entregar os primeiros frutos, cada um recita em voz alta a história da própria família.",
    detalhe:
      "A confissão é curta e começa com uma frase que resume a identidade do povo: um arameu prestes a perecer foi meu pai. Depois vem a descida ao Egito, a escravidão, o clamor e a saída. Quem entrega a cesta não está apenas pagando um tributo, está se lembrando de que já foi migrante e escravo. A segunda declaração, do terceiro ano, é uma prestação de contas sobre ter dado ao levita, ao estrangeiro, ao órfão e à viúva.",
    marcos: [
      "As primícias são levadas numa cesta",
      "'Arameu prestes a perecer foi meu pai'",
      "A história é recitada em voz alta",
      "A declaração do dízimo do terceiro ano",
      "Alegrar-se com o levita e o estrangeiro pelo bem recebido",
    ],
    chave: 5,
  },
  27: {
    resumo:
      "Pedras caiadas com a lei escrita, um altar sem ferramenta, e doze maldições respondidas.",
    detalhe:
      "A instrução é escrever a lei em pedras caiadas de forma bem distinta, ou seja, legível para quem passa. O altar é de pedras inteiras, sem ferro, o que retoma Êxodo 20. Depois seis tribos ficam no Gerizim e seis no Ebal, e os levitas proclamam doze maldições, todas respondidas pelo povo com amém. Vale reparar no conteúdo delas: muitas tratam de coisas feitas em oculto, como mover o limite do vizinho e desviar o cego do caminho.",
    marcos: [
      "A lei escrita em pedras caiadas, bem legível",
      "Altar de pedras inteiras, sem ferramenta de ferro",
      "Seis tribos no Gerizim e seis no Ebal",
      "Doze maldições proclamadas pelos levitas",
      "Várias tratam do que se faz em oculto",
    ],
    chave: 8,
  },
  28: {
    resumo:
      "Catorze versículos de bênção e mais de cinquenta de maldição, em detalhe cruel.",
    detalhe:
      "A assimetria é proposital e desconfortável. As bênçãos são concretas e cobrem cidade, campo, ventre, celeiro, entrada e saída. As maldições usam a mesma estrutura e vão muito além, descrevendo cerco, fome, doença, exílio e loucura, com frases sobre não haver descanso para a planta do pé e sobre o coração tremer pela manhã desejando que fosse noite. Muitos leem esse capítulo como escrito ou finalizado já sob o impacto do exílio.",
    marcos: [
      "Bênçãos na cidade e no campo, ao entrar e ao sair",
      "Serás cabeça e não cauda",
      "As maldições ocupam quase quatro vezes mais espaço",
      "Cerco, fome e exílio são descritos em detalhe",
      "'Pela manhã dirás: quem dera fosse noite'",
    ],
    chave: 6,
  },
  29: {
    resumo:
      "A aliança é feita também com quem não está ali, e há um aviso contra a autoconfiança.",
    detalhe:
      "Moisés reúne todos, inclusive crianças, estrangeiros, rachadores de lenha e tiradores de água, o que é uma lista deliberadamente ampla. E diz que o pacto vale também com os que não estão ali naquele dia. O alerta central é contra quem ouve as maldições e se abençoa no coração dizendo que terá paz ainda que ande na dureza do próprio coração. O capítulo fecha com uma frase sobre as coisas encobertas pertencerem a Deus.",
    marcos: [
      "Todos são reunidos, do chefe ao tirador de água",
      "A aliança vale também com quem não está presente",
      "Alerta contra quem se abençoa no próprio coração",
      "A geração futura perguntará por que a terra foi assolada",
      "'As coisas encobertas pertencem ao Senhor'",
    ],
    chave: 29,
  },
  30: {
    resumo:
      "Mesmo depois do pior cenário, há retorno, e a palavra não está longe nem no céu.",
    detalhe:
      "O capítulo começa admitindo o exílio como hipótese real e prometendo restauração para quem voltar de todo o coração. A parte mais citada é a afirmação de que o mandamento não é encoberto nem está longe: não está no céu para alguém subir e buscá-lo, nem além do mar, mas muito perto, na boca e no coração. Paulo retoma essa passagem em Romanos 10. O fecho é a escolha posta de forma explícita, com a ordem de escolher a vida.",
    marcos: [
      "A promessa de restauração depois da dispersão",
      "A circuncisão do coração",
      "'Não está no céu, nem além do mar'",
      "'Está muito perto de ti, na tua boca e no teu coração'",
      "'Escolhe, pois, a vida, para que vivas'",
    ],
    chave: 19,
  },
  31: {
    resumo:
      "Ele entrega o cargo a Josué, escreve a lei, e recebe um aviso pessimista sobre o futuro.",
    detalhe:
      "Moisés tem cento e vinte anos e diz que não pode mais sair nem entrar. A transição é pública, com a frase repetida sobre esforçar-se e ter bom ânimo. A lei escrita deve ser lida de sete em sete anos diante de todo o povo, inclusive das crianças e do estrangeiro, para que ouçam e aprendam. E então vem a parte dura, em que Deus avisa que o povo se corromperá, e por isso manda escrever um cântico que servirá de testemunha contra eles.",
    marcos: [
      "Moisés tem cento e vinte anos",
      "Josué é encorajado publicamente",
      "A lei deve ser lida a cada sete anos diante de todos",
      "Deus avisa que o povo se corromperá",
      "Um cântico é escrito para servir de testemunha",
    ],
    chave: 6,
  },
  32: {
    resumo:
      "O cântico chama céu e terra como testemunhas, e usa imagens maternas para Deus.",
    detalhe:
      "É um poema antigo e duro, construído como processo judicial. A imagem de abertura compara a doutrina à chuva e ao orvalho sobre a erva. Deus aparece como Rocha, palavra repetida várias vezes, e também como águia que desperta os filhotes e os carrega sobre as asas, e como quem deu à luz, numa linguagem explicitamente materna. A acusação central é de esquecimento na fartura, com a frase sobre Jesurum engordar e escoicear.",
    marcos: [
      "Céus e terra são chamados como testemunhas",
      "'Ele é a Rocha, a sua obra é perfeita'",
      "Como a águia que desperta os filhotes e os carrega",
      "'Engordou Jesurum e escoiceou'",
      "Moisés é mandado subir o monte Nebo",
    ],
    chave: 4,
  },
  33: {
    resumo:
      "A bênção final, tribo por tribo, com uma imagem de braços eternos por baixo.",
    detalhe:
      "Diferente do capítulo 49 de Gênesis, aqui quase não há repreensão, e o tom é de despedida generosa. Cada tribo recebe uma palavra ligada ao seu caráter ou território. O verso mais lembrado está perto do fim e é de abrigo: o Deus eterno é a tua habitação, e por baixo estão os braços eternos. O fecho pergunta quem é como aquele povo, salvo pelo Senhor, e usa a imagem do escudo e da espada da sua alteza.",
    marcos: [
      "A bênção é dada tribo por tribo",
      "Levi recebe o Urim e o Tumim",
      "José recebe as melhores coisas dos montes antigos",
      "'O Deus eterno é a tua habitação'",
      "'Por baixo de ti estão os braços eternos'",
    ],
    chave: 27,
  },
  34: {
    resumo:
      "Ele vê a terra inteira do alto e morre ali, e ninguém soube onde foi sepultado.",
    detalhe:
      "A descrição do que ele vê do Nebo é panorâmica e detalhada, como se o texto quisesse que o leitor olhasse junto. A morte é registrada com sobriedade, dizendo que ele tinha cento e vinte anos e que os olhos nunca se escureceram nem o vigor fugiu. O detalhe sobre ninguém saber a sepultura até hoje evita qualquer culto ao túmulo. O epitáfio final é único na Bíblia hebraica: nunca mais se levantou profeta como Moisés, a quem o Senhor conhecesse face a face.",
    marcos: [
      "Moisés sobe o Nebo e vê toda a terra",
      "Morre ali, na terra de Moabe",
      "Ninguém soube da sua sepultura até hoje",
      "Cento e vinte anos, sem escurecer os olhos",
      "'Nunca mais se levantou profeta como Moisés'",
    ],
    chave: 10,
  },
};

CAPITULOS.job = {
  1: {
    resumo:
      "Um homem íntegro perde tudo em um único dia, em quatro notícias seguidas.",
    detalhe:
      "O livro faz questão de dizer, antes de tudo, que Jó era íntegro e reto, e repete isso pela boca do próprio Deus. Isso desmonta de saída qualquer leitura de castigo merecido. A pergunta do adversário é a pergunta do livro inteiro: porventura teme Jó a Deus debalde. Ou seja, existe fé desinteressada. As quatro notícias chegam sem intervalo, com cada mensageiro interrompendo o anterior, e a reação dele é adorar em vez de amaldiçoar.",
    marcos: [
      "Jó é apresentado como íntegro e reto",
      "'Porventura, teme Jó a Deus debalde?'",
      "Quatro mensageiros, um interrompendo o outro",
      "Ele rasga o manto, rapa a cabeça e adora",
      "'O Senhor o deu e o Senhor o tomou'",
    ],
    chave: 21,
  },
  2: {
    resumo:
      "A segunda rodada atinge o corpo, e três amigos ficam sete dias em silêncio.",
    detalhe:
      "O argumento agora é sobre a pele, com a ideia de que ninguém mantém a integridade quando a dor é na carne. Jó fica coberto de chagas e se senta na cinza, raspando-se com um caco. A fala da esposa é curta e costuma ser lida com dureza, e vale lembrar que ela também perdeu dez filhos. O melhor que os amigos fazem no livro inteiro está no fim deste capítulo: choram, rasgam as vestes e ficam sete dias e sete noites sem falar nada.",
    marcos: [
      "O adversário pede para atingir a pele e os ossos",
      "Jó fica coberto de chagas e se senta na cinza",
      "A esposa diz para amaldiçoar a Deus e morrer",
      "'Receberemos o bem e não receberemos o mal?'",
      "Os amigos ficam sete dias em silêncio ao lado dele",
    ],
    chave: 10,
  },
  3: {
    resumo:
      "Depois do silêncio, ele abre a boca e amaldiçoa o dia em que nasceu.",
    detalhe:
      "É aqui que o Jó paciente da tradição popular desaparece e começa o Jó real. Ele não amaldiçoa Deus, amaldiçoa o próprio nascimento, e o faz com uma inversão poética da criação, pedindo que aquele dia vire trevas. Depois vem a pergunta que ele vai repetir de muitas formas: por que se dá luz ao infeliz e vida ao amargurado de ânimo. O capítulo termina dizendo que o que ele temia lhe sobreveio, e que ele não tem sossego.",
    marcos: [
      "Ele amaldiçoa o dia do seu nascimento",
      "Pede que aquele dia se torne trevas",
      "'Por que não morri eu na madre?'",
      "Lá os cansados repousam",
      "'O que eu temia me sobreveio'",
    ],
    chave: 25,
  },
  4: {
    resumo:
      "Elifaz começa com elogios e chega, com jeito, à tese de que sofrimento vem de culpa.",
    detalhe:
      "A abordagem é educada e por isso mais difícil de recusar: ele lembra que Jó já ensinou muita gente e agora não aguenta o que vem sobre si. A tese aparece em forma de pergunta retórica sobre quem, sendo inocente, jamais pereceu. E ele a fundamenta numa experiência pessoal de revelação noturna, com um espírito passando diante do rosto e os pelos se arrepiando, o que dá à sua opinião a aparência de autoridade sobrenatural.",
    marcos: [
      "Elifaz lembra que Jó ensinou a muitos",
      "'Quem jamais pereceu sendo inocente?'",
      "Os que lavram iniquidade colhem o mesmo",
      "A visão noturna e o arrepio nos pelos",
      "'Seria o homem mais justo do que Deus?'",
    ],
    chave: 7,
  },
  5: {
    resumo:
      "Ele conclui aconselhando Jó a se entregar a Deus, que fere e enfaixa.",
    detalhe:
      "Boa parte do que Elifaz diz é verdadeiro isoladamente, e é justamente isso que torna o livro difícil: frases corretas aplicadas à pessoa errada. Ele descreve Deus como quem faz coisas grandes e insondáveis e frustra os astutos, e chama de bem-aventurado o homem a quem Deus corrige. O problema é o diagnóstico que está por trás, porque Jó não está sendo corrigido. Paulo cita um verso deste capítulo em 1 Coríntios.",
    marcos: [
      "'O homem nasce para o trabalho, como as faíscas voam'",
      "Deus faz coisas grandes e insondáveis",
      "Ele apanha os sábios na própria astúcia",
      "'Bem-aventurado o homem a quem Deus corrige'",
      "Ele fere e ele mesmo enfaixa a ferida",
    ],
    chave: 17,
  },
  6: {
    resumo:
      "Jó responde que o peso da dor explica as palavras dele, e cobra lealdade dos amigos.",
    detalhe:
      "A imagem de abertura é de balança, com ele dizendo que se pesassem a sua mágoa ela seria mais pesada que a areia do mar. Ele defende a própria queixa com uma pergunta doméstica e certeira: o jumento zurra junto à erva verde, ou o boi muge junto ao seu pasto. Ninguém reclama à toa. A parte mais dura é a comparação dos amigos com um riacho que seca no verão, justamente quando a caravana precisa dele.",
    marcos: [
      "'A minha mágoa seria mais pesada que a areia dos mares'",
      "'Zurra o jumento montês junto à erva verde?'",
      "Os amigos são como riacho que seca no verão",
      "As caravanas se desviam e perecem",
      "'Ensinai-me, e eu me calarei'",
    ],
    chave: 15,
  },
  7: {
    resumo:
      "Ele descreve as noites que não acabam e passa a falar diretamente com Deus.",
    detalhe:
      "A descrição do insone é precisa em qualquer época: deita e pergunta quando se levantará, e a noite se estende e ele se farta de inquietações até a alva. A partir daí ele muda de interlocutor e fala com Deus, com uma ironia amarga sobre o Salmo 8, perguntando o que é o homem para Deus o engrandecer e visitar todas as manhãs, e pedindo que ele desvie o olhar por um instante, o tempo de engolir a saliva.",
    marcos: [
      "A vida é como a de um jornaleiro que espera o salário",
      "'Quando me levantarei? A noite se estende'",
      "Os dias passam mais velozes que a lançadeira",
      "'Que é o homem, para que tanto o engrandeças?'",
      "'Até quando não desviarás de mim a vista?'",
    ],
    chave: 11,
  },
  8: {
    resumo:
      "Bildade é mais direto e sugere que os filhos morreram por causa do próprio pecado.",
    detalhe:
      "Onde Elifaz foi diplomático, Bildade é brutal logo na segunda fala, dizendo que Deus não perverte o juízo e que, se os filhos pecaram, ele os entregou ao poder da transgressão. O argumento dele é de tradição, mandando perguntar às gerações passadas. As imagens são vegetais e boas: o junco que não cresce sem lodo, e a planta viçosa cujas raízes se enredam num monte de pedras e que é arrancada sem deixar rastro.",
    marcos: [
      "'Perverteria Deus o direito?'",
      "A sugestão de que os filhos pecaram",
      "Consulta a tradição das gerações passadas",
      "O junco não cresce sem lodo",
      "Deus não rejeita o íntegro nem toma pela mão os malfeitores",
    ],
    chave: 3,
  },
  9: {
    resumo:
      "Jó concorda que Deus é justo e diz que esse é justamente o problema dele.",
    detalhe:
      "A pergunta que ele faz é jurídica: como se justificaria o homem para com Deus. Se quisesse contender, não poderia responder uma entre mil. Ele descreve um adversário que não pode ser intimado nem contestado, que passa e ninguém o vê. A imagem mais desesperada do capítulo é a de que, mesmo se ele se lavasse com água de neve, Deus o mergulharia no lodo. E aí aparece pela primeira vez o desejo de um árbitro que ponha a mão sobre ambos.",
    marcos: [
      "'Como se justificaria o homem para com Deus?'",
      "Não poderia responder uma entre mil",
      "Ele passa por mim e não o vejo",
      "'Ainda que eu me lave com água de neve'",
      "'Não há entre nós árbitro que ponha a mão sobre nós ambos'",
    ],
    chave: 33,
  },
  10: {
    resumo:
      "Ele decide falar com amargura de alma e pergunta a Deus por que o formou assim.",
    detalhe:
      "É a fala mais íntima do bloco. Ele usa imagens de artesanato e de fisiologia para lembrar a Deus de que foi ele quem o fez: lembra-te de que me formaste como barro, derramaste-me como leite, coalhaste-me como queijo, revestiste-me de pele e carne. O argumento é de autoria: você me fez com cuidado, por que me destrói agora. E ele pede apenas um pouco de alívio antes de ir para a terra da escuridão.",
    marcos: [
      "'Direi a Deus: não me condenes'",
      "'Lembra-te de que me formaste como o barro'",
      "'Derramaste-me como leite, coalhaste-me como queijo'",
      "Vida e misericórdia me concedeste",
      "'Desiste de mim, para que eu tome um pouco de alento'",
    ],
    chave: 9,
  },
  11: {
    resumo:
      "Zofar é o mais agressivo dos três e diz que Jó está recebendo menos do que merece.",
    detalhe:
      "Ele abre acusando Jó de falar muito e chama as palavras dele de zombaria. A frase mais cruel do capítulo é a sugestão de que Deus esqueceu parte da iniquidade dele, ou seja, o castigo ainda está abaixo do devido. O argumento teológico é correto e mal usado, sobre as coisas de Deus serem mais altas que os céus e mais profundas que o abismo. E ele fecha com a receita padrão: endireita o coração, afasta a iniquidade e tudo melhora.",
    marcos: [
      "Zofar acusa Jó de falar demais",
      "'Deus exige de ti menos do que merece a tua iniquidade'",
      "As coisas de Deus são mais altas que os céus",
      "'Se tu preparares o coração'",
      "A promessa de esquecer a miséria como águas que passaram",
    ],
    chave: 7,
  },
  12: {
    resumo:
      "Jó responde com ironia pesada e diz que até os animais sabem o que eles estão dizendo.",
    detalhe:
      "A abertura é sarcástica: convosco morrerá a sabedoria. Ele afirma ter o mesmo conhecimento que eles e acrescenta que quem está em paz despreza facilmente a desgraça alheia. Então manda que perguntem aos animais, às aves, à terra e aos peixes, porque todos sabem que a mão do Senhor fez isso. A segunda metade descreve um Deus que derruba conselheiros, tira o entendimento de chefes e faz as nações crescerem e se perderem.",
    marcos: [
      "'Convosco morrerá a sabedoria'",
      "Quem está em paz despreza a desgraça alheia",
      "'Pergunta agora às alimárias, e elas te ensinarão'",
      "Ele faz andar os conselheiros despojados",
      "Descobre as profundezas das trevas",
    ],
    chave: 7,
  },
  13: {
    resumo:
      "Ele chama os amigos de médicos que não valem nada e diz que quer falar com Deus direto.",
    detalhe:
      "A crítica mais devastadora do livro está aqui: vocês são forjadores de mentiras e médicos que não valem nada. E ele faz uma pergunta que atinge qualquer defesa apressada de Deus: vocês falarão perversidade por amor dele e usarão de engano em favor dele. A parte mais corajosa vem em seguida, quando ele diz que, mesmo que Deus o mate, nele esperará, e pede duas coisas apenas, distância da mão pesada e ausência de terror.",
    marcos: [
      "'Sois todos médicos que não valem nada'",
      "'Falareis perversidade por amor de Deus?'",
      "'Quem dera vos calásseis de todo'",
      "'Ainda que ele me mate, nele esperarei'",
      "Dois pedidos: afasta a mão e não me assombres",
    ],
    chave: 15,
  },
  14: {
    resumo:
      "Uma meditação sobre a brevidade da vida, com uma pergunta que fica sem resposta.",
    detalhe:
      "O capítulo é o mais melancólico e o mais bonito das falas de Jó. A imagem de abertura compara o homem à flor que sai e se murcha e à sombra que foge. Depois vem uma comparação dolorida: a árvore cortada tem esperança de rebrotar ao sentir água, mas o homem morre e não se levanta. E então a pergunta central do livro sobre a morte, perguntando se o homem, uma vez morto, tornará a viver, junto com o desejo de ser escondido e lembrado depois.",
    marcos: [
      "'O homem nascido de mulher é de poucos dias'",
      "Ele sai como a flor e se murcha",
      "A árvore cortada ainda tem esperança de rebrotar",
      "'Morrendo o homem, porventura, tornará a viver?'",
      "'Todos os dias da minha luta esperaria'",
    ],
    chave: 14,
  },
  15: {
    resumo:
      "Segunda rodada, e Elifaz perde a educação, acusando Jó de acabar com a devoção.",
    detalhe:
      "O tom muda completamente em relação ao capítulo 4. Ele acusa Jó de encher o ventre de vento oriental e de anular o temor de Deus. Apela para a idade, perguntando se Jó nasceu antes dos montes, e diz que entre eles há homens muito mais velhos que o pai dele. A tese de que nem os santos nem os céus são puros diante de Deus é usada para provar que ninguém pode reclamar. O resto é uma descrição do terror que persegue o ímpio.",
    marcos: [
      "'Encherá o sábio o ventre de vento oriental?'",
      "'Tu tens feito vão o temor de Deus'",
      "'És tu o primeiro homem que nasceu?'",
      "Nem os céus são puros aos olhos dele",
      "O ímpio vive angustiado todos os seus dias",
    ],
    chave: 4,
  },
  16: {
    resumo:
      "Jó chama todos de consoladores molestos e descreve Deus como um agressor.",
    detalhe:
      "Ele imagina a situação invertida e diz que, se fosse ele no lugar deles, fortaleceria com a boca e o movimento dos lábios mitigaria a dor. A parte mais chocante é a linguagem física com que descreve o próprio sofrimento, falando de ser despedaçado, ter o pescoço agarrado e ser posto como alvo. E mesmo em meio a isso, ele afirma que a sua oração é pura e que já tem uma testemunha nos céus.",
    marcos: [
      "'Consoladores molestos sois todos vós'",
      "Se fosse ao contrário, ele os fortaleceria",
      "Descreve-se como alvo que foi posto",
      "'A minha oração é pura'",
      "'Está no céu a minha testemunha'",
    ],
    chave: 19,
  },
  17: {
    resumo:
      "Sem forças e sem quem o defenda, ele pede a Deus que seja o seu próprio fiador.",
    detalhe:
      "O pedido do versículo 3 é de vocabulário jurídico: dá-me um penhor, sê tu mesmo o meu fiador, porque quem mais se comprometeria por mim. Jó está cercado por acusadores e pede ao juiz que aja como avalista. Ele descreve a própria condição de forma crua, dizendo que virou provérbio entre os povos e que os olhos se escureceram de mágoa. E chama a sepultura de pai e o verme de mãe e irmã, o que é o limite da solidão.",
    marcos: [
      "'O meu espírito se vai consumindo'",
      "'Sê tu mesmo o meu fiador'",
      "Ele virou provérbio entre os povos",
      "Os olhos se escureceram de mágoa",
      "'À corrupção clamo: tu és meu pai'",
    ],
    chave: 3,
  },
  18: {
    resumo:
      "Bildade responde com um retrato detalhado do fim do ímpio, dirigido claramente a Jó.",
    detalhe:
      "Ele começa ofendido, perguntando por que são considerados como animais. O resto é um poema sobre armadilhas: laço, rede, cilada e cordas escondidas na terra, tudo esperando aquele que não conhece a Deus. A descrição inclui a memória apagada da terra e nenhum filho ou sobrinho entre o povo. Como Jó acabou de perder todos os filhos, é impossível não ler a fala como acusação pessoal, ainda que nenhum nome seja dito.",
    marcos: [
      "'Por que somos tratados como animais?'",
      "A luz do ímpio se apagará",
      "Laços e redes escondidos no caminho",
      "A memória dele perece da terra",
      "Não terá filho nem sobrinho entre o seu povo",
    ],
    chave: 5,
  },
  19: {
    resumo:
      "Depois de descrever abandono total, ele diz que sabe que o seu Redentor vive.",
    detalhe:
      "O capítulo lista o isolamento em detalhe: os parentes falharam, os conhecidos o esqueceram, os servos não respondem ao chamado, o hálito repugna à esposa e até as crianças zombam. É desse fundo que sai a declaração mais conhecida do livro. Ele quer que as palavras sejam gravadas com estilete de ferro na rocha para sempre, e afirma que o seu Redentor vive e que, em sua carne, verá a Deus com os próprios olhos.",
    marcos: [
      "'Até quando afligireis a minha alma?'",
      "Os parentes e conhecidos se afastaram",
      "'Quem me dera que as minhas palavras fossem gravadas na rocha'",
      "'Eu sei que o meu Redentor vive'",
      "'Eu mesmo o verei, e os meus olhos o contemplarão'",
    ],
    chave: 25,
  },
  20: {
    resumo:
      "Zofar insiste que a alegria do ímpio dura um instante, com imagens de comida.",
    detalhe:
      "Ele admite estar agitado e diz que responde por causa do sentimento que o obriga. O argumento é o mesmo dos outros, com a diferença de usar metáforas digestivas: o mal é doce na boca, escondido debaixo da língua, e depois vira veneno de áspide no ventre, e a riqueza engolida é vomitada. A frase sobre restituir o que roubou e não desfrutar é boa teologia e péssimo conselho pastoral naquele momento.",
    marcos: [
      "'O júbilo dos ímpios é breve'",
      "O mal é doce na boca e escondido sob a língua",
      "Vira veneno no ventre",
      "As riquezas engolidas são vomitadas",
      "Esta é a porção do homem ímpio",
    ],
    chave: 5,
  },
  21: {
    resumo:
      "Jó desmonta a tese dos três com um argumento simples: olhem em volta.",
    detalhe:
      "Ele pede como única consolação que o deixem falar e depois zombem à vontade. E então apresenta a evidência empírica que contradiz tudo o que disseram: os ímpios envelhecem, ficam poderosos, têm casas seguras, os filhos dançam, e eles morrem em paz sem doença prolongada. A pergunta seguinte é devastadora para os amigos, sobre quantas vezes a lâmpada dos ímpios de fato se apaga. E ele observa que ricos e pobres se deitam igualmente no pó.",
    marcos: [
      "'Ouvi atentamente as minhas razões, e isso vos sirva de consolação'",
      "Os ímpios envelhecem e crescem em poder",
      "As casas deles estão em paz, sem temor",
      "'Quantas vezes se apaga a lâmpada dos ímpios?'",
      "Juntamente se deitam no pó, e os vermes os cobrem",
    ],
    chave: 7,
  },
  22: {
    resumo:
      "Sem provas, Elifaz inventa crimes específicos para sustentar a própria teoria.",
    detalhe:
      "Este é o ponto em que a discussão desce de nível. Como a teoria exige culpa e não há culpa visível, ele simplesmente a fabrica, acusando Jó de tomar penhor dos irmãos sem motivo, negar água ao cansado e pão ao faminto, e mandar viúvas embora vazias. Nada disso aconteceu, e o leitor sabe desde o capítulo 1. No meio da injustiça ele diz frases bonitas, como o convite a apegar-se a Deus e ter paz, o que torna tudo mais amargo.",
    marcos: [
      "'Porventura, o homem é de algum proveito a Deus?'",
      "Acusações inventadas sobre penhor e viúvas",
      "'Não é grande a tua malícia?'",
      "'Apega-te a ele e tem paz'",
      "A promessa de que a oração será ouvida",
    ],
    chave: 21,
  },
  23: {
    resumo:
      "Ele só queria achar o endereço de Deus para apresentar a causa e ser ouvido.",
    detalhe:
      "A fala é de alguém que quer um tribunal e não encontra a porta. Ele diz que, se soubesse onde achá-lo, iria até o trono dele, exporia a causa e encheria a boca de argumentos, e acrescenta algo esperançoso, que Deus não contenderia com ele com grande poder e sim lhe daria atenção. Mas segue à frente e não o vê, à esquerda e não o acha. A frase de confiança do versículo 10 é dita em plena ausência, e não depois do desfecho.",
    marcos: [
      "'Quem dera eu soubesse onde o poderia achar!'",
      "Exporia a causa e encheria a boca de argumentos",
      "Vai adiante e para trás, e não o percebe",
      "'Ele conhece o meu caminho'",
      "'Provando-me, sairei como o ouro'",
    ],
    chave: 10,
  },
  24: {
    resumo:
      "Ele muda o foco de si para os pobres do mundo e pergunta por que Deus não marca os dias.",
    detalhe:
      "É o capítulo mais social do livro e o mais incômodo para qualquer teologia rápida. Jó descreve gente que muda marcos, rouba rebanhos, leva o jumento do órfão e o boi da viúva como penhor, e descreve os pobres andando nus, molhados pelas chuvas da montanha, abraçando a rocha por falta de abrigo. E então observa que, do meio da cidade, os moribundos gemem e Deus não atribui isso a ninguém como loucura.",
    marcos: [
      "'Por que o Todo-Poderoso não designa tempos de juízo?'",
      "Mudam os marcos e roubam os rebanhos",
      "Levam o jumento do órfão e o boi da viúva",
      "Os pobres dormem nus, abraçados à rocha",
      "Do meio da cidade gemem os moribundos",
    ],
    chave: 12,
  },
  25: {
    resumo:
      "Bildade fala pela última vez, e são apenas seis versículos.",
    detalhe:
      "O discurso mais curto do livro é também o sinal de que os amigos ficaram sem argumento. Ele repete o que Elifaz já disse duas vezes, sobre nem a lua ser clara nem as estrelas serem puras aos olhos de Deus, e conclui com a comparação do homem com o verme. Não há nada de novo, nenhuma resposta às perguntas do capítulo 24, e o terceiro ciclo de debate morre aqui, com Zofar nem chegando a falar.",
    marcos: [
      "O domínio e o temor estão com Deus",
      "Há número para os seus exércitos?",
      "Nem a lua é clara aos olhos dele",
      "'Como seria justo o homem para com Deus?'",
      "O homem é um verme, o filho do homem, um vermezinho",
    ],
    chave: 4,
  },
  26: {
    resumo:
      "Jó devolve a ironia e depois faz ele mesmo a melhor descrição da grandeza de Deus.",
    detalhe:
      "A abertura é sarcástica, perguntando como ele ajudou quem não tem força e a quem ele anunciou tudo aquilo. Em seguida, Jó supera os amigos no próprio terreno, descrevendo um Deus que estende o norte sobre o vazio e pendura a terra sobre o nada, que amarra as águas nas nuvens e põe limite entre a luz e as trevas. E fecha com humildade genuína, dizendo que tudo isso são apenas as orlas dos caminhos dele, e que só ouvimos um leve sussurro.",
    marcos: [
      "'Como ajudaste o que não tem força!'",
      "Ele estende o norte sobre o vazio",
      "Pendura a terra sobre o nada",
      "Amarra as águas nas suas nuvens",
      "'Isto são apenas as orlas dos seus caminhos'",
    ],
    chave: 14,
  },
  27: {
    resumo:
      "Ele jura pela própria integridade e se recusa a admitir uma culpa que não tem.",
    detalhe:
      "O juramento é solene e o conteúdo é uma recusa: até que eu expire, não afastarei de mim a minha sinceridade. A frase sobre o coração não o repreender por nenhum dos seus dias é a chave da resistência dele. Ele não afirma ser perfeito, afirma não ter cometido o que lhe atribuem. A segunda parte do capítulo descreve o destino do ímpio em termos parecidos com os dos amigos, o que mostra que a discordância não era sobre isso.",
    marcos: [
      "'Enquanto em mim houver alento, não falarão os meus lábios iniquidade'",
      "'Não afastarei de mim a minha sinceridade'",
      "'O meu coração não me repreende por nenhum dos meus dias'",
      "A porção do ímpio é descrita",
      "O vento oriental o leva e ele se vai",
    ],
    chave: 5,
  },
  28: {
    resumo:
      "Um poema sobre mineração que pergunta onde se acha a sabedoria, já que ela não se extrai.",
    detalhe:
      "O capítulo se destaca do resto e funciona sozinho. Começa admirando a engenhosidade humana, que fura a rocha, corta canais e traz à luz o que estava escondido, e diz que o olho do falcão nunca viu aqueles caminhos. E então faz a pergunta: mas a sabedoria, onde se achará. O abismo diz que não está nele, o mar diz que não está consigo, e não se compra com ouro de Ofir. A resposta final é curta e desarmante.",
    marcos: [
      "O homem fura a rocha e busca o que está escondido",
      "'Mas onde se achará a sabedoria?'",
      "O abismo diz: não está em mim",
      "Não se compra com ouro nem com safira",
      "'O temor do Senhor é a sabedoria'",
    ],
    chave: 28,
  },
  29: {
    resumo:
      "Ele lembra de como era antes, e a saudade maior não é dos bens.",
    detalhe:
      "A lista do que ele perdeu é reveladora porque começa pela intimidade, dizendo quem dera fosse como nos meses passados, quando a amizade de Deus estava sobre a sua tenda. Depois vem o respeito público, com os jovens se escondendo e os anciãos se levantando. Mas o que ele mais reivindica é o que fazia: livrava o pobre que clamava, era olhos para o cego e pés para o coxo, e quebrava os queixos do perverso.",
    marcos: [
      "'Quem me dera ser como fui nos meses passados'",
      "Quando a amizade de Deus estava sobre a minha tenda",
      "Os moços se escondiam e os anciãos se levantavam",
      "'Eu era olhos para o cego e pés para o coxo'",
      "Livrava o pobre que clamava e o órfão sem ajuda",
    ],
    chave: 15,
  },
  30: {
    resumo:
      "Agora ele é objeto de zombaria de gente que ele próprio jamais teria contratado.",
    detalhe:
      "O contraste com o capítulo anterior é o ponto: quem se levantava diante dele agora faz dele canção e provérbio, e são filhos de homens que ele não poria nem com os cães do seu rebanho. A descrição física do sofrimento é detalhada, com ossos que ardem e pele que enegrece e cai. E há a acusação direta contra Deus, de ter se tornado cruel, e a confissão de que ele esperava o bem e veio o mal, esperava a luz e veio a escuridão.",
    marcos: [
      "Os mais jovens fazem dele canção e provérbio",
      "'Tornaste-te cruel para comigo'",
      "Os ossos ardem e a pele enegrece",
      "'Esperando eu o bem, veio o mal'",
      "'A minha harpa se me tornou em pranto'",
    ],
    chave: 26,
  },
  31: {
    resumo:
      "O juramento final, em que ele lista tudo o que não fez, e assina embaixo.",
    detalhe:
      "É a defesa mais completa do livro, construída como uma série de condicionais que se autocondenam: se olhei para uma virgem, se andei com falsidade, se neguei o desejo dos pobres, se comi o meu bocado sozinho, que aconteça isso comigo. A ética que aparece é surpreendentemente interior e moderna, incluindo o pacto com os olhos e o cuidado com a causa do escravo, argumentando que o mesmo Deus os formou no ventre.",
    marcos: [
      "'Fiz aliança com os meus olhos'",
      "'Pese-me Deus em balanças fiéis'",
      "Não desprezou a causa do servo nem da serva",
      "'Não comi sozinho o meu bocado'",
      "'Eis aqui a minha assinatura; responda-me o Todo-Poderoso'",
    ],
    chave: 35,
  },
  32: {
    resumo:
      "Um quarto personagem aparece do nada, irritado com os três e com Jó.",
    detalhe:
      "Eliú estava calado por ser mais jovem e explode quando os três desistem de responder. A justificativa dele é interessante: a idade não garante entendimento, porque há um espírito no homem e é a inspiração do Todo-Poderoso que o faz entender. Ele fala longamente sobre estar cheio de palavras e prestes a arrebentar como odre novo, e leva um capítulo inteiro apenas se apresentando, o que é o primeiro sinal do seu estilo.",
    marcos: [
      "Os três amigos desistem de responder",
      "Eliú se irrita com os quatro",
      "Esperou por ser mais jovem em dias",
      "'Não são os muitos anos que fazem sábio'",
      "'Sinto-me como odre que não tem respiradouro'",
    ],
    chave: 8,
  },
  33: {
    resumo:
      "Eliú propõe algo novo: o sofrimento pode ser aviso, e não apenas castigo.",
    detalhe:
      "Ele começa oferecendo o que Jó pediu, um interlocutor que não amedronta, dizendo que também foi formado do barro. A contribuição dele ao debate é real: Deus fala de vários modos, em sonho, em visão e também pela dor na cama, para apartar o homem do seu propósito e livrá-lo da cova. Não é retribuição, é advertência. E ele menciona a figura de um mensageiro intérprete, um entre mil, que mostre ao homem o que é reto.",
    marcos: [
      "'Eis que também eu fui formado do barro'",
      "'Deus fala de um modo e de outro, mas ninguém atenta'",
      "Em sonho e em visão da noite",
      "Também na dor sobre a cama",
      "Um mensageiro intérprete, um entre mil",
    ],
    chave: 14,
  },
  34: {
    resumo:
      "Ele defende a justiça de Deus e acusa Jó de andar em companhia dos que praticam maldade.",
    detalhe:
      "Eliú é mais rigoroso no argumento e mais duro na acusação. Ele cita as falas de Jó, o que é honesto, e sustenta que é impensável que Deus cometa injustiça, usando um argumento de soberania: quem lhe entregou o mundo para que ele precise agradar alguém. A frase mais forte é a de que, se Deus recolhesse o seu espírito e o seu fôlego, toda a carne pereceria junta e o homem voltaria ao pó.",
    marcos: [
      "'Longe de Deus o praticar maldade'",
      "'Quem lhe entregou o governo do mundo?'",
      "Se ele recolhesse o seu espírito e o seu fôlego",
      "Toda a carne juntamente expiraria",
      "A acusação de Jó andar com os que praticam maldade",
    ],
    chave: 14,
  },
  35: {
    resumo:
      "Ele argumenta que a conduta humana não acrescenta nem tira nada de Deus.",
    detalhe:
      "O ponto de Eliú é que a justiça ou a maldade de alguém afetam outros seres humanos, e não Deus, que está acima disso. Ele também explica por que muitos clamores não recebem resposta: as pessoas gritam por causa da opressão, mas ninguém pergunta onde está Deus, o meu Criador, que dá canções durante a noite. A distinção entre gritar de dor e buscar de fato é válida, embora, aplicada a Jó, seja mais uma injustiça.",
    marcos: [
      "Olha para os céus e vê as nuvens mais altas que tu",
      "Se pecas, que fazes contra ele?",
      "A tua justiça aproveita ao filho do homem",
      "Clamam por causa da opressão, e não perguntam por Deus",
      "'Deus, que dá cânticos durante a noite'",
    ],
    chave: 10,
  },
  36: {
    resumo:
      "Ele descreve um Deus que instrui pela aflição e começa a falar da tempestade.",
    detalhe:
      "Eliú diz que ainda tem um pouco a falar em favor de Deus, e desenvolve a ideia de que a aflição abre os ouvidos. A frase mais bonita da fala dele é sobre Deus tirar o aflito para um lugar espaçoso, onde não há aperto, e a mesa posta com gordura. A parte final é uma descrição do poder de Deus na natureza, falando das gotas de água que se destilam em chuva, e já anuncia a trovoada que vai chegar no capítulo 38.",
    marcos: [
      "'Ainda tenho o que dizer a favor de Deus'",
      "Ele não tira os olhos do justo",
      "Abre-lhes os ouvidos para a instrução",
      "'Também te desviaria da angústia para um lugar espaçoso'",
      "As gotas de água se destilam em chuva",
    ],
    chave: 16,
  },
  37: {
    resumo:
      "A tempestade se aproxima, e ele termina dizendo que ninguém consegue olhar para a luz.",
    detalhe:
      "É o capítulo mais descritivo de Eliú, e funciona como cortina antes da entrada de Deus. Ele fala do trovão como voz, da neve que manda a terra parar de trabalhar, do gelo que vem do sopro, e das nuvens que giram conforme a direção dada. As perguntas que ele faz a Jó antecipam o estilo do capítulo seguinte, sobre saber como Deus dispõe as nuvens e como é possível estender o firmamento como espelho fundido.",
    marcos: [
      "O trovão é descrito como a voz de Deus",
      "Ele diz à neve: cai sobre a terra",
      "Pelo sopro dele se dá o gelo",
      "'Sabes tu como Deus as dispõe?'",
      "Agora não se pode olhar para a luz resplandecente nas nuvens",
    ],
    chave: 5,
  },
  38: {
    resumo:
      "Deus responde do meio da tempestade, e não responde nenhuma das perguntas feitas.",
    detalhe:
      "A entrada é uma pergunta devolvida sobre quem é esse que escurece o conselho com palavras sem conhecimento, e a ordem para cingir os lombos como homem, porque agora quem pergunta é Deus. O que vem é um passeio pela criação em forma de interrogatório: onde estavas quando lancei os fundamentos da terra, quem pôs portas ao mar, já ordenaste alguma vez à manhã. Não há explicação sobre o sofrimento, há ampliação do mundo.",
    marcos: [
      "O Senhor responde do meio de um redemoinho",
      "'Onde estavas tu quando eu lançava os fundamentos da terra?'",
      "As estrelas da alva cantavam juntas",
      "Quem pôs portas ao mar quando ele rompeu",
      "'Já ordenaste alguma vez à manhã?'",
    ],
    chave: 4,
  },
  39: {
    resumo:
      "O interrogatório continua pelos animais selvagens, todos inúteis para a economia humana.",
    detalhe:
      "A escolha dos bichos é significativa: cabras monteses que parem sozinhas nos montes, o jumento selvagem que ri do alvoroço da cidade, o boi selvagem que não vai arar o teu vale, a avestruz que trata mal os filhotes e mesmo assim corre mais que o cavalo. Nenhum deles serve para nada de útil, e existem do mesmo jeito. É um argumento silencioso contra a ideia de que o mundo gira em torno da utilidade humana.",
    marcos: [
      "As cabras monteses parem sem ninguém ver",
      "O jumento selvagem ri do alvoroço da cidade",
      "O boi selvagem não vai arar o teu vale",
      "A avestruz esquece os ovos no chão",
      "O cavalo escarva no vale e ri do medo",
    ],
    chave: 19,
  },
  40: {
    resumo:
      "Jó põe a mão na boca, e Deus continua, apresentando o Beemote.",
    detalhe:
      "Chamado a responder, Jó diz que é vil e que porá a mão sobre a boca, e que falou uma vez e não responderá mais. Deus não aceita esse encerramento e continua, com uma provocação: se és capaz, enfeita-te de majestade e derruba os soberbos com o teu olhar. Então apresenta o Beemote, um animal enorme que come capim como boi e não se assusta com o rio transbordando, descrito com admiração e nenhuma utilidade prática.",
    marcos: [
      "'Eis que sou vil; que te responderia eu?'",
      "'Ponho a mão sobre a minha boca'",
      "'Porventura, anularás tu o meu juízo?'",
      "O Beemote come capim como o boi",
      "Ele confia, ainda que o Jordão lhe chegue à boca",
    ],
    chave: 4,
  },
  41: {
    resumo:
      "Um capítulo inteiro sobre o Leviatã, o animal que ninguém domestica.",
    detalhe:
      "A descrição é a mais longa dedicada a uma criatura na Bíblia, e ela é quase afetuosa. As perguntas são todas sobre controle: consegues pescá-lo com anzol, fará ele acordo contigo para ser teu servo para sempre, brincarás com ele como com um passarinho. A resposta é não em todas. O sentido dentro do livro é que existe no mundo criado o que é incontrolável e magnífico ao mesmo tempo, e Jó está pedindo justamente controle e explicação.",
    marcos: [
      "'Poderás tirar com anzol o Leviatã?'",
      "Fará ele acordo contigo para ser teu servo?",
      "Brincarás com ele como com um passarinho?",
      "As escamas são o seu orgulho, fechadas como selo",
      "Sobre a terra não há quem lhe possa ser comparado",
    ],
    chave: 33,
  },
  42: {
    resumo:
      "Jó se retrata, os amigos são repreendidos, e a restauração vem depois de ele orar por eles.",
    detalhe:
      "A resposta dele é curta e a frase central distingue ouvir de ver: com o ouvido eu ouvia falar de ti, mas agora te veem os meus olhos. Ele não recebeu explicação nenhuma, e mesmo assim se aquieta. O desfecho tem uma inversão importante: Deus diz aos amigos que a ira está acesa contra eles porque não falaram o que era reto, como o seu servo Jó, e manda que Jó ore por eles. A restauração acontece depois dessa oração.",
    marcos: [
      "'Bem sei que tudo podes'",
      "'Com o ouvido eu ouvia falar de ti, mas agora te veem os meus olhos'",
      "Deus repreende os três amigos",
      "'Não falastes o que era reto, como o meu servo Jó'",
      "A restauração vem depois de Jó orar pelos amigos",
    ],
    chave: 5,
  },
};

CAPITULOS.is = {
  1: {
    resumo:
      "Deus abre um processo contra o próprio povo, e o primeiro alvo é a religião deles.",
    detalhe:
      "A acusação começa com uma comparação humilhante: o boi conhece o seu possuidor e o jumento a manjedoura do seu dono, mas Israel não entende. O que choca é o alvo, porque eles estavam cumprindo o culto direitinho, e é exatamente disso que Deus diz estar farto. A razão é dada em seguida, sobre as mãos cheias de sangue. E então vem a ordem que resolve o impasse: lavai-vos, aprendei a fazer o bem, e fazei justiça ao órfão e à viúva.",
    marcos: [
      "O boi conhece o seu dono, mas Israel não entende",
      "'Para que me serve a multidão de vossos sacrifícios?'",
      "'As vossas mãos estão cheias de sangue'",
      "'Aprendei a fazer o bem; fazei justiça ao órfão'",
      "'Ainda que os vossos pecados sejam como a escarlata'",
    ],
    chave: 18,
  },
  2: {
    resumo:
      "Nações subindo por vontade própria, espadas virando arado, e a soberba derrubada.",
    detalhe:
      "O oráculo dos últimos dias é quase idêntico a Miqueias 4, e a sequência importa: primeiro aprendem os caminhos, depois o julgamento entre as nações, e só então o desarmamento. A segunda metade do capítulo é o oposto, um poema sobre o dia em que tudo que é alto será abatido, incluindo cedros, torres e navios. E há uma frase repetida sobre gente jogando fora os ídolos de prata e ouro para as toupeiras e os morcegos.",
    marcos: [
      "Muitos povos dirão: vinde, subamos ao monte do Senhor",
      "'Converterão as suas espadas em relhas de arados'",
      "'Não aprenderão mais a guerra'",
      "O dia do Senhor será contra tudo o que é alto",
      "Lançarão os ídolos às toupeiras e aos morcegos",
    ],
    chave: 4,
  },
  3: {
    resumo:
      "A liderança é removida, e o capítulo lista peça por peça os enfeites da elite.",
    detalhe:
      "O juízo começa retirando o que sustenta a sociedade, incluindo o juiz, o profeta, o ancião e o conselheiro, e o resultado é o caos com crianças dominando. A acusação contra os líderes é direta e econômica, sobre terem devorado a vinha e guardado o despojo do pobre nas próprias casas. A pergunta que fecha a acusação é uma das mais duras dos profetas, sobre o que eles pretendem ao esmagar o povo e moer o rosto dos pobres.",
    marcos: [
      "O sustento e a liderança são removidos",
      "'Meninos são os seus príncipes'",
      "'A rapina do pobre está em vossas casas'",
      "'Que tendes vós, que esmagais o meu povo?'",
      "A lista dos enfeites das filhas de Sião",
    ],
    chave: 15,
  },
  4: {
    resumo:
      "Depois da destruição, um renovo, e uma cobertura sobre o monte como no deserto.",
    detalhe:
      "É um capítulo curto e de transição. O primeiro versículo ainda pertence à cena anterior, com sete mulheres disputando um homem por causa da guerra. E então o tom muda para o renovo do Senhor, que será formoso e glorioso. A imagem final retoma o Êxodo, com uma nuvem de dia e o resplendor de fogo à noite sobre toda a habitação do monte Sião, e um dossel sobre toda a glória, servindo de sombra e refúgio.",
    marcos: [
      "Sete mulheres disputarão um homem",
      "O renovo do Senhor será formoso e glorioso",
      "Os que restarem serão chamados santos",
      "Nuvem de dia e resplendor de fogo à noite",
      "Um dossel sobre toda a glória, como sombra e refúgio",
    ],
    chave: 2,
  },
  5: {
    resumo:
      "Uma canção de amor sobre uma vinha que vira acusação no meio da música.",
    detalhe:
      "O profeta canta como se fosse um amigo cantando por outro, descrevendo tudo o que foi feito pela vinha: terra fértil, cerca, torre, lagar. Quando pergunta o que mais poderia ter sido feito, a plateia já está do lado dele. Aí ele revela que a vinha é a casa de Israel, e o trocadilho hebraico é devastador, porque ele esperava juízo e veio derramamento de sangue, esperava justiça e veio clamor. Depois vêm seis ais, incluindo contra os que juntam casa a casa.",
    marcos: [
      "A canção da vinha em terra fértil",
      "'Que mais se podia fazer à minha vinha?'",
      "Esperava juízo e eis aqui derramamento de sangue",
      "Ai dos que ajuntam casa a casa e campo a campo",
      "Ai dos que ao mal chamam bem e ao bem, mal",
    ],
    chave: 20,
  },
  6: {
    resumo:
      "No ano em que o rei morreu, ele vê o trono, e o primeiro efeito é perceber a própria boca.",
    detalhe:
      "A data é dada com cuidado porque marca a queda de um rei terreno e a visão do trono que não cai. Os serafins cobrem o rosto e os pés, e o que eles cantam repete três vezes a palavra santo, algo que o hebraico faz para indicar superlativo. A reação de Isaías não é êxtase, é ruína: ai de mim, porque sou homem de lábios impuros. A limpeza vem por uma brasa, e só depois vem a pergunta a quem enviarei.",
    marcos: [
      "No ano da morte do rei Uzias",
      "'Santo, Santo, Santo é o Senhor dos Exércitos'",
      "'Ai de mim, pois estou perdido'",
      "A brasa viva tocada nos lábios",
      "'Eis-me aqui, envia-me a mim'",
    ],
    chave: 8,
  },
  7: {
    resumo:
      "Um rei apavorado recusa pedir um sinal, e recebe um mesmo assim.",
    detalhe:
      "Acaz está diante de uma coalizão e o texto diz que o coração dele se moveu como as árvores ao vento. A mensagem é para se aquietar e não temer dois tocos de tição fumegante. Deus oferece um sinal à escolha, e Acaz recusa com uma desculpa religiosa, quando na verdade já tinha decidido chamar a Assíria. O sinal é dado à força, e a palavra hebraica traduzida por virgem gerou séculos de debate. O nome da criança é o ponto: Deus conosco.",
    marcos: [
      "O coração de Acaz se move como as árvores ao vento",
      "Dois tocos de tição fumegante",
      "'Se não crerdes, certamente não permanecereis'",
      "Acaz recusa pedir um sinal",
      "'A virgem conceberá e dará à luz um filho: Emanuel'",
    ],
    chave: 14,
  },
  8: {
    resumo:
      "Um filho recebe um nome de quatro palavras, e o profeta é avisado a não temer o que todos temem.",
    detalhe:
      "O nome escrito em tábua grande significa algo como depressa ao despojo, rápido à presa, e serve de relógio para a queda de Damasco. O aviso ao profeta é sobre não chamar conjuração a tudo o que aquele povo chama, nem temer o que eles temem, o que descreve bem o clima de pânico coletivo. A imagem do santuário que também é pedra de tropeço aparece aqui, e o capítulo condena a consulta aos mortos em favor dos vivos.",
    marcos: [
      "O nome escrito numa tábua grande",
      "'Não chameis conjuração a tudo quanto este povo chama'",
      "'Nem temais o que eles temem'",
      "Ele será santuário e também pedra de tropeço",
      "'Perguntariam os vivos aos mortos?'",
    ],
    chave: 12,
  },
  9: {
    resumo:
      "O povo que andava em trevas vê uma grande luz, e nasce uma criança com nomes de rei.",
    detalhe:
      "A profecia é dirigida às regiões que mais sofreram com as invasões, Zebulom e Naftali, e Mateus a cita ao situar o ministério de Jesus na Galileia. Os verbos estão no passado, como se já tivesse acontecido, o que é comum na profecia hebraica. Os quatro títulos dados à criança misturam sabedoria, divindade, paternidade e paz. A segunda metade do capítulo é sombria, com um refrão repetido sobre a ira não se ter desviado.",
    marcos: [
      "'O povo que andava em trevas viu uma grande luz'",
      "'Um menino nos nasceu, um filho se nos deu'",
      "Maravilhoso Conselheiro, Deus Forte, Pai da Eternidade",
      "Do aumento do seu governo não haverá fim",
      "O refrão: 'nem por isso se apartou a sua ira'",
    ],
    chave: 6,
  },
  10: {
    resumo:
      "A Assíria é o bastão na mão de Deus, e o bastão começa a achar que age sozinho.",
    detalhe:
      "O capítulo abre com um ai contra quem decreta leis injustas e escreve prescrições opressivas para desviar a causa dos pobres. Depois vem a ideia mais sofisticada do texto: o império que invade é instrumento de juízo e será julgado por isso, porque a intenção dele não era essa. A pergunta retórica é excelente, sobre se o machado se glorifica contra quem corta com ele. E o capítulo introduz o tema do resto que voltará.",
    marcos: [
      "Ai dos que decretam leis injustas",
      "A Assíria é a vara da ira de Deus",
      "'Gloriar-se-á o machado contra o que corta com ele?'",
      "O restante de Jacó voltará",
      "O jugo será quebrado por causa da unção",
    ],
    chave: 15,
  },
  11: {
    resumo:
      "Do toco cortado sai um rebento, e com ele um mundo onde o lobo mora com o cordeiro.",
    detalhe:
      "A imagem inicial pressupõe uma dinastia já derrubada, porque fala de tronco e não de árvore viva. O que caracteriza o governante não é força militar, e sim o Espírito repousando sobre ele com sabedoria, conselho e temor. O critério de julgamento é notável: ele não julgará segundo a vista dos olhos nem repreenderá segundo o ouvir dos ouvidos, e sim com justiça para os pobres. E então vem a paz descrita entre animais que se comem.",
    marcos: [
      "'Do tronco de Jessé sairá um rebento'",
      "O Espírito de sabedoria, conselho e temor",
      "'Não julgará segundo a vista dos seus olhos'",
      "O lobo habitará com o cordeiro",
      "A terra se encherá do conhecimento do Senhor",
    ],
    chave: 9,
  },
  12: {
    resumo:
      "Um cântico curto de agradecimento, que muda o tom depois de doze capítulos pesados.",
    detalhe:
      "São apenas seis versículos e eles funcionam como respiro e fecho da primeira parte do livro. A primeira frase reconhece a ira e a consolação na mesma linha, dizendo que a ira se retirou. A imagem central é a de tirar água das fontes da salvação com alegria, que virou canção em muitas tradições. O fim é comunitário e missionário, mandando anunciar entre os povos os feitos e fazer saber que o nome dele é exaltado.",
    marcos: [
      "'Louvar-te-ei, ó Senhor, ainda que te iraste contra mim'",
      "'Deus é a minha salvação; confiarei e não temerei'",
      "'Tirareis águas das fontes da salvação'",
      "Anunciai entre os povos os seus feitos",
      "'Grande é o Santo de Israel no meio de ti'",
    ],
    chave: 3,
  },
  13: {
    resumo:
      "Começa a série de oráculos contra as nações, e o primeiro é contra Babilônia.",
    detalhe:
      "Chama atenção que Babilônia apareça primeiro, sendo que na época de Isaías quem ameaçava era a Assíria, o que sugere um horizonte mais longo. A linguagem é cósmica, com sol escurecido e estrelas sem brilho, e é típica da descrição do dia do Senhor. O fim é o mais lembrado: a cidade mais gloriosa dos reinos virará como Sodoma, sem que o árabe arme tenda ali, e será habitada por animais do deserto.",
    marcos: [
      "O dia do Senhor vem como assolação",
      "O sol se escurece e a lua não resplandece",
      "'Farei que o homem seja mais precioso do que o ouro puro'",
      "Babilônia, a glória dos reinos, será como Sodoma",
      "Só animais do deserto habitarão ali",
    ],
    chave: 11,
  },
  14: {
    resumo:
      "Um poema de escárnio sobre a queda do rei da Babilônia, com a estrela da manhã caindo.",
    detalhe:
      "O texto é apresentado como sátira, um provérbio contra o rei, e imagina o mundo dos mortos se agitando para recebê-lo, com os reis das nações levantando-se dos tronos para ver. A parte mais famosa fala de quem dizia no coração subirei ao céu e serei semelhante ao Altíssimo, e a tradução latina desse trecho deu origem ao nome Lúcifer. O contexto imediato é político, e a leitura posterior o ampliou.",
    marcos: [
      "Um provérbio de escárnio contra o rei da Babilônia",
      "O mundo dos mortos se agita para recebê-lo",
      "'Como caíste do céu, ó estrela da manhã!'",
      "'Subirei acima das mais altas nuvens'",
      "Serás lançado na cova, como cadáver pisado",
    ],
    chave: 12,
  },
  15: {
    resumo:
      "O oráculo contra Moabe é escrito como lamento, e o profeta chora junto.",
    detalhe:
      "O tom surpreende porque não há triunfo. O texto descreve gente subindo aos altos para chorar, cabeças rapadas, barbas cortadas e pano de saco nas ruas, e fala de um choro que se ouve de longe. O detalhe que humaniza tudo é o profeta dizendo que o seu coração clama por Moabe, ou seja, ele sofre com a desgraça do inimigo. É o oposto da alegria pela queda alheia que o livro de Obadias condena em Edom.",
    marcos: [
      "Moabe é destruída numa noite",
      "Sobem aos altos para chorar",
      "Cabeças rapadas e barbas cortadas",
      "'O meu coração clama por causa de Moabe'",
      "As águas de Dimom estão cheias de sangue",
    ],
    chave: 5,
  },
  16: {
    resumo:
      "Um pedido de abrigo para refugiados, e um lamento que o profeta diz ser dele mesmo.",
    detalhe:
      "Os moabitas fugitivos são comparados a aves espantadas do ninho, e o pedido é direto: dá conselho, executa juízo, esconde os desterrados e não descubras os fugitivos. A razão dada é que o opressor acabará e o trono se firmará em benignidade. Isaías depois assume a dor na primeira pessoa, dizendo que as suas entranhas soam como harpa por Moabe, e o capítulo fecha com um prazo de três anos.",
    marcos: [
      "Os fugitivos são como aves espantadas do ninho",
      "'Esconde os desterrados, não descubras os fugitivos'",
      "O trono se firmará em benignidade",
      "A soberba de Moabe é lembrada",
      "'As minhas entranhas soam como harpa por causa de Moabe'",
    ],
    chave: 3,
  },
  17: {
    resumo:
      "Damasco vira um monte de ruínas, e no meio do oráculo aparece uma frase sobre olhar.",
    detalhe:
      "A profecia inclui também Efraim, porque os dois estavam aliados. As imagens são agrícolas e tristes, com a colheita que sobra sendo comparada às poucas azeitonas que ficam no alto da oliveira depois da vara. O centro teológico está no meio: naquele dia o homem atentará para o seu Criador e os seus olhos olharão para o Santo de Israel, e não olhará para os altares, obra das suas mãos.",
    marcos: [
      "Damasco deixará de ser cidade",
      "A glória de Jacó será enfraquecida",
      "Sobrarão rebuscos como no alto da oliveira",
      "'Naquele dia, atentará o homem para o seu Criador'",
      "Não olhará para os altares, obra das suas mãos",
    ],
    chave: 7,
  },
  18: {
    resumo:
      "Uma mensagem para uma terra distante, com uma imagem de Deus observando em silêncio.",
    detalhe:
      "O capítulo é curto e curioso, dirigido a um povo além dos rios da Etiópia, descrito como alto e de pele lisa. A imagem central é de uma quietude impressionante: Deus diz que estará quieto, olhando da sua morada, como o ardor do sol resplandecente e como a nuvem de orvalho no calor da sega. A espera tem hora certa, e quando ela chega ele poda os ramos antes da colheita. O fim fala de presentes trazidos ao monte Sião.",
    marcos: [
      "Mensagem a um povo além dos rios da Etiópia",
      "'Estarei quieto, olhando desde a minha morada'",
      "Como o ardor do sol e a nuvem de orvalho na sega",
      "Os ramos são podados antes da colheita",
      "Presentes serão trazidos ao monte Sião",
    ],
    chave: 4,
  },
  19: {
    resumo:
      "O oráculo contra o Egito termina com Egito, Assíria e Israel sendo bênção juntos.",
    detalhe:
      "A primeira parte é de colapso total, com guerra civil, o Nilo secando, pescadores desempregados e conselheiros virando tolos. E então o capítulo faz uma virada que quase não tem paralelo nos profetas: fala de um altar ao Senhor no meio do Egito, de uma estrada ligando Egito e Assíria, e da frase final em que Deus chama o Egito de meu povo e a Assíria de obra das minhas mãos, ao lado de Israel como herança.",
    marcos: [
      "O Egito é sacudido e os conselheiros enlouquecem",
      "O Nilo seca e os pescadores lamentam",
      "Um altar ao Senhor no meio da terra do Egito",
      "Uma estrada ligando Egito e Assíria",
      "'Bendito seja o Egito, meu povo, e a Assíria, obra das minhas mãos'",
    ],
    chave: 25,
  },
  20: {
    resumo:
      "O profeta anda descalço e sem roupa por três anos, como sinal vivo.",
    detalhe:
      "É um dos atos proféticos mais extremos da Bíblia. A mensagem é política e urgente: Judá estava tentado a se aliar ao Egito contra a Assíria, e o sinal mostra o que aconteceria com egípcios e etíopes levados cativos, nus e descalços. A pergunta que o povo deveria fazer está no fim, sobre onde está a esperança deles se aqueles em quem confiavam terminam assim. O custo pessoal do profeta não é comentado pelo texto.",
    marcos: [
      "Isaías anda descalço e despido por três anos",
      "O sinal é sobre o Egito e a Etiópia",
      "Serão levados cativos, nus e descalços",
      "A confiança na aliança egípcia se mostra vã",
      "'Como escaparemos nós?'",
    ],
    chave: 6,
  },
  21: {
    resumo:
      "Uma sentinela é posta no muro e finalmente grita que Babilônia caiu.",
    detalhe:
      "A visão deixa o profeta fisicamente abalado, com lombos cheios de dor e o coração palpitando, a ponto de a noite que ele desejava virar espanto. A cena da sentinela é quase teatral, com a ordem de vigiar com toda a atenção e o aviso de que vem um carro com um par de cavaleiros. O segundo oráculo tem uma frase que virou expressão, quando alguém pergunta de Seir sobre o que resta da noite, e a resposta é que vem a manhã e também a noite.",
    marcos: [
      "A visão enche o profeta de dor",
      "'Põe uma sentinela e que ela diga o que vir'",
      "'Caiu, caiu Babilônia!'",
      "'Guarda, que houve de noite?'",
      "'Vem a manhã, e também a noite'",
    ],
    chave: 11,
  },
  22: {
    resumo:
      "Jerusalém faz festa em cima dos telhados enquanto deveria estar de luto.",
    detalhe:
      "O profeta vê a cidade cheia de gritos alegres e não entende, porque o cerco está vindo. Ele descreve a competência com que eles se prepararam, contando casas, reforçando muros e fazendo reservatório, e aponta exatamente o que faltou, que foi olhar para quem fez aquilo. A frase que resume a atitude deles é a do versículo 13, sobre comer e beber porque amanhã morreremos, que Paulo cita em 1 Coríntios 15.",
    marcos: [
      "A cidade sobe aos telhados em festa",
      "Contaram casas e reforçaram o muro",
      "'Não olhastes para aquele que fez isto'",
      "'Comamos e bebamos, porque amanhã morreremos'",
      "Sebna é destituído e Eliaquim recebe a chave",
    ],
    chave: 13,
  },
  23: {
    resumo:
      "Tiro, a potência comercial do mar, é humilhada, e depois volta ao comércio.",
    detalhe:
      "A cidade é descrita pelo que ela era, com mercadores que eram príncipes e negociantes que eram os nobres da terra, e o profeta pergunta quem formou esse plano contra a cidade coroadora. O fecho é econômico e irônico: depois de setenta anos ela volta ao ofício, e o lucro dela será consagrado ao Senhor, servindo para comer bem e vestir-se finamente os que habitam diante dele, e não para entesourar.",
    marcos: [
      "Tiro é devastada e os navios uivam",
      "Os mercadores eram príncipes da terra",
      "'Quem formou este desígnio contra Tiro?'",
      "Setenta anos esquecida",
      "O lucro será consagrado ao Senhor",
    ],
    chave: 9,
  },
  24: {
    resumo:
      "O juízo deixa de ser sobre nações específicas e passa a ser sobre a terra inteira.",
    detalhe:
      "Este bloco é chamado de apocalipse de Isaías e muda de escala. A devastação atinge todos igualmente, e o texto lista pares sociais para mostrar isso, com o povo e o sacerdote, o servo e o senhor, o comprador e o vendedor. A razão é dada com clareza no versículo 5, sobre a terra ter sido profanada pelos habitantes, que traspassaram as leis e quebraram a aliança eterna. O silêncio da alegria é descrito pela ausência de música.",
    marcos: [
      "A terra é devastada sem distinção de classe",
      "'A terra está contaminada por causa dos seus moradores'",
      "Quebraram a aliança eterna",
      "Cessa o folguedo dos tamborins e a alegria da harpa",
      "A terra cambaleia como o ébrio",
    ],
    chave: 5,
  },
  25: {
    resumo:
      "Um banquete no monte para todos os povos, e a morte é engolida para sempre.",
    detalhe:
      "Depois do capítulo mais sombrio vem o mais luminoso. A imagem é de um banquete de coisas gordurosas e vinhos puros, preparado para todos os povos, e não apenas para um. O véu que cobre todas as nações é destruído, e então vem a frase que Paulo retoma: ele devorará a morte para sempre. E o gesto mais íntimo de toda a Bíblia profética, com o Senhor enxugando as lágrimas de todos os rostos, que reaparece no Apocalipse.",
    marcos: [
      "'Tu tens sido a fortaleza do pobre na angústia'",
      "Um banquete para todos os povos neste monte",
      "O véu que cobre todos os povos é destruído",
      "'Devorará a morte para sempre'",
      "'Enxugará as lágrimas de todos os rostos'",
    ],
    chave: 8,
  },
  26: {
    resumo:
      "Um cântico sobre a cidade forte, com a promessa de paz para quem mantém o pensamento firme.",
    detalhe:
      "O versículo 3 é dos mais citados do livro e a construção hebraica é interessante, porque a palavra paz aparece duplicada, indicando plenitude, e a condição é o pensamento firme e a confiança. O capítulo também traz uma das afirmações mais claras de ressurreição do Antigo Testamento, com os mortos vivendo e os corpos se levantando. E termina com um conselho de quem conhece tempos difíceis, mandando entrar nos quartos e esperar um momento.",
    marcos: [
      "Uma cidade forte, cujos muros são a salvação",
      "'Tu conservarás em perfeita paz aquele cujo propósito é firme'",
      "'Confiai no Senhor perpetuamente'",
      "'Os teus mortos viverão, os seus corpos ressuscitarão'",
      "'Entra nos teus quartos e esconde-te por um momento'",
    ],
    chave: 3,
  },
  27: {
    resumo:
      "O Leviatã é derrotado, e a vinha do capítulo 5 reaparece, agora bem cuidada.",
    detalhe:
      "A criatura marinha representa o caos e as potências hostis, e o texto a descreve como serpente veloz e tortuosa. A parte mais bonita é a retomada da vinha: onde antes Deus tirou a cerca e deixou o terreno ser pisado, aqui ele diz que a guarda a cada momento e a rega, e que não há indignação nele, e ainda oferece que quem se apegue à sua força faça as pazes com ele. O fim fala dos dispersos voltando ao som da trombeta.",
    marcos: [
      "O Leviatã, serpente veloz e tortuosa, é castigado",
      "'Eu, o Senhor, a guardo e a cada momento a regarei'",
      "'Ira não há em mim'",
      "'Que se apegue à minha força e faça as pazes comigo'",
      "Os dispersos voltam ao som da grande trombeta",
    ],
    chave: 5,
  },
  28: {
    resumo:
      "Sacerdotes e profetas bêbados zombam do profeta, e ele devolve a zombaria deles.",
    detalhe:
      "A acusação atinge quem deveria ensinar, descrevendo mesas cheias de vômito. Eles caçoam de Isaías imitando um professor com criancinhas, repetindo sílabas, e ele responde que então será assim mesmo que Deus falará com eles, por lábios estrangeiros. No meio disso está a imagem da pedra angular posta em Sião, com a frase sobre quem crê não se apressar. E o capítulo termina com uma parábola agrícola sobre Deus saber a hora de arar e a de semear.",
    marcos: [
      "Ai da coroa de soberba dos bêbados de Efraim",
      "As mesas estão cheias de vômito",
      "'Mandamento sobre mandamento, um pouco aqui, um pouco ali'",
      "'Eis que eu assentei em Sião uma pedra angular'",
      "O lavrador sabe quando arar e quando semear",
    ],
    chave: 16,
  },
  29: {
    resumo:
      "O povo cumpre o culto com a boca enquanto o coração está longe.",
    detalhe:
      "A cidade é chamada de Ariel, e o oráculo mistura cerco e sonho, com inimigos que serão como pó fino e como sonho de quem tem fome e acorda vazio. A acusação central é citada por Jesus nos evangelhos: este povo se aproxima com a boca e me honra com os lábios, mas o seu coração está longe. E há a denúncia dos que tramam no escuro achando que ninguém vê, comparados ao barro que quer dizer ao oleiro que ele não entende.",
    marcos: [
      "Ariel é cercada e depois liberta",
      "Os inimigos serão como sonho de quem acorda com fome",
      "'Este povo se aproxima de mim com a sua boca'",
      "'O seu coração está longe de mim'",
      "'Dirá a obra ao que a fez: não me fizeste?'",
    ],
    chave: 13,
  },
  30: {
    resumo:
      "Ai dos que descem ao Egito atrás de cavalos, e uma promessa de voz atrás de você.",
    detalhe:
      "A crítica é a mesma do capítulo 20 e agora em forma de ai: descem ao Egito sem consultar, para se fortalecerem com Faraó. O que mais dói é o retrato do público, que pede aos videntes para não verem e aos profetas para não falarem coisas certas, mas coisas suaves. A resposta contém uma das frases mais serenas do livro, dizendo que em voltar e descansar está a salvação, e a imagem da voz que diz por trás qual é o caminho.",
    marcos: [
      "Ai dos filhos rebeldes que descem ao Egito",
      "'Dizei-nos coisas aprazíveis, profetizai-nos ilusões'",
      "'Na volta e no descanso está a vossa salvação'",
      "'Os teus ouvidos ouvirão uma palavra atrás de ti'",
      "'Este é o caminho, andai por ele'",
    ],
    chave: 15,
  },
  31: {
    resumo:
      "Os egípcios são homens e não Deus, e os cavalos deles são carne e não espírito.",
    detalhe:
      "O argumento é curto e definitivo, e o versículo 3 é a frase mais direta do bloco. O profeta não diz que a aliança é militarmente fraca, diz que ela é da natureza errada. Em seguida usa duas imagens para Deus: o leão que não se assusta com a gritaria dos pastores, e as aves voando para proteger o ninho. O apelo final é para voltarem àquele contra quem se rebelaram profundamente, e a promessa é que a Assíria cairá por espada que não é de homem.",
    marcos: [
      "Ai dos que descem ao Egito por socorro",
      "'Os egípcios são homens e não Deus'",
      "'Os seus cavalos são carne e não espírito'",
      "Como o leão que não teme a gritaria dos pastores",
      "Como aves voando, o Senhor amparará Jerusalém",
    ],
    chave: 3,
  },
  32: {
    resumo:
      "Um rei governará com justiça, e o resultado prático é chamar as coisas pelo nome certo.",
    detalhe:
      "A imagem dos governantes é de abrigo, como esconderijo contra o vento e como sombra de rocha em terra sedenta. O detalhe mais interessante é linguístico: naquele tempo o tolo não será mais chamado de nobre nem o avarento de generoso, ou seja, a corrupção da linguagem acaba. Há um trecho dirigido às mulheres confiadas, e a mudança só acontece quando o Espírito é derramado do alto, quando o deserto vira campo fértil.",
    marcos: [
      "Um rei reinará com justiça",
      "Serão como esconderijo contra o vento",
      "O tolo não será mais chamado de nobre",
      "'Até que se derrame sobre nós o Espírito lá do alto'",
      "'O efeito da justiça será paz'",
    ],
    chave: 17,
  },
  33: {
    resumo:
      "Ai do destruidor, e uma pergunta sobre quem consegue morar junto de um fogo devorador.",
    detalhe:
      "O capítulo descreve uma terra em colapso, com estradas desertas e tratados rompidos, e então lança a pergunta que dá a chave: quem dentre nós habitará com o fogo consumidor. A resposta não é ritual e sim ética, listando quem anda em justiça, fala com retidão, rejeita o ganho de opressão, sacode as mãos para não receber suborno, tapa os ouvidos para não ouvir falar de sangue e fecha os olhos para não ver o mal.",
    marcos: [
      "Ai de ti, destruidor que não foste destruído",
      "As estradas estão desertas e os tratados rompidos",
      "'Quem dentre nós habitará com o fogo consumidor?'",
      "O que anda em justiça e rejeita o ganho de opressão",
      "'Os teus olhos verão o rei na sua formosura'",
    ],
    chave: 15,
  },
  34: {
    resumo:
      "Um juízo cósmico sobre as nações, com Edom servindo de exemplo.",
    detalhe:
      "É o capítulo mais sombrio do bloco, e a linguagem é de desfazimento, com os céus sendo enrolados como um livro. Edom é escolhido como caso, e a descrição da terra depois é de desolação total, com espinheiros nos palácios e animais do deserto ocupando o lugar. O detalhe curioso está no fim, com a instrução de buscar no livro do Senhor e ler, afirmando que nenhuma dessas criaturas faltará, cada uma com a sua companheira.",
    marcos: [
      "Chegai-vos, nações, para ouvir",
      "Os céus se enrolarão como um livro",
      "A espada do Senhor está cheia de sangue",
      "Os palácios de Edom viram espinheiros",
      "'Buscai no livro do Senhor e lede'",
    ],
    chave: 16,
  },
  35: {
    resumo:
      "O deserto floresce, os cegos veem, e há uma estrada onde até o tolo não se perde.",
    detalhe:
      "Depois do capítulo mais escuro vem o mais alegre, e o contraste é intencional. O deserto se alegra e floresce como a rosa, e a instrução aos que estão exaustos é para fortalecerem as mãos frouxas e os joelhos trêmulos. Os milagres listados são os que Jesus cita quando responde a João Batista. A estrada é chamada de Caminho Santo, e o detalhe mais gentil do capítulo é que nem os loucos errarão nela.",
    marcos: [
      "O deserto se alegrará e florescerá como a rosa",
      "'Fortalecei as mãos frouxas e os joelhos trêmulos'",
      "Os olhos dos cegos se abrirão e os coxos saltarão",
      "Haverá ali uma estrada, o Caminho Santo",
      "Os resgatados voltarão com alegria perpétua",
    ],
    chave: 4,
  },
  36: {
    resumo:
      "O porta-voz assírio fala em hebraico do lado de fora do muro, para todos ouvirem.",
    detalhe:
      "O capítulo repete quase palavra por palavra o relato de 2 Reis 18. A estratégia do Rabsaqué é de guerra psicológica: ridiculariza a aliança egípcia chamando-a de cana quebrada que fura a mão, alega estar ali por ordem do próprio Senhor, e faz uma oferta tentadora de terra e pão. Quando os oficiais pedem que ele fale em aramaico, ele aumenta a voz de propósito. E o povo do muro obedece a ordem do rei e não responde nada.",
    marcos: [
      "Senaqueribe toma as cidades fortificadas de Judá",
      "O Egito é chamado de cana quebrada",
      "O Rabsaqué alega ter vindo por ordem do Senhor",
      "Pedem que fale aramaico, e ele fala mais alto em hebraico",
      "O povo se cala, conforme o mandado do rei",
    ],
    chave: 6,
  },
  37: {
    resumo:
      "A carta é estendida diante de Deus, e o exército amanhece morto.",
    detalhe:
      "Ezequias vai ao templo e estende a carta, num gesto que vale mais que qualquer discurso. A oração dele reconhece que os assírios de fato destruíram muitas nações, e explica por quê, porque aqueles deuses eram obra de mãos humanas. A resposta de Isaías é poética e usa a imagem do anzol no nariz e do freio nos lábios. O sinal dado é agrícola, sobre comer o que nasce por si nos dois primeiros anos e semear no terceiro.",
    marcos: [
      "Ezequias estende a carta diante do Senhor",
      "'Eram deuses, mas obra de mãos de homens'",
      "Isaías responde com a imagem do anzol no nariz",
      "O sinal do que brota por si mesmo",
      "O exército amanhece morto e Senaqueribe é assassinado",
    ],
    chave: 16,
  },
  38: {
    resumo:
      "Doente de morte, ele chora voltado para a parede, e escreve um poema depois de sarar.",
    detalhe:
      "O que este capítulo tem a mais que 2 Reis 20 é o cântico escrito depois, e ele é um dos textos mais honestos da Bíblia sobre adoecer. Ele fala de ter sido cortado como tecido do tear, de gemer como pomba e de os olhos se cansarem de olhar para cima. A conclusão a que chega é que foi bom ter passado por aquilo, e a frase sobre o vivente louvar a Deus enquanto vive é dita por quem quase não voltou.",
    marcos: [
      "'Põe em ordem a tua casa, porque morrerás'",
      "Ele chora voltado para a parede",
      "Quinze anos são acrescentados e a sombra retrocede",
      "'Como a pomba, eu gemia'",
      "'O vivente, só o vivente é que te louvará'",
    ],
    chave: 19,
  },
  39: {
    resumo:
      "Ele mostra tudo aos visitantes da Babilônia, e o profeta anuncia o exílio.",
    detalhe:
      "O gesto é de vaidade simples: chegaram cartas e presentes, e ele exibiu tudo o que havia nos tesouros. Isaías pergunta o que eles viram, e a resposta dele é reveladora, porque admite não ter deixado nada de fora. A profecia é sobre tudo aquilo ser levado para a Babilônia, e a reação de Ezequias é a frase que fecha o bloco histórico, contentando-se com haver paz e verdade nos seus dias. O livro então muda completamente de tom.",
    marcos: [
      "Embaixadores da Babilônia trazem cartas e presentes",
      "Ezequias mostra todos os seus tesouros",
      "'Nada houve que eu não lhes mostrasse'",
      "Tudo será levado para a Babilônia",
      "'Haverá paz e segurança nos meus dias'",
    ],
    chave: 8,
  },
  40: {
    resumo:
      "O livro muda de tom e começa com uma ordem de consolar, dita duas vezes.",
    detalhe:
      "Depois de trinta e nove capítulos de juízo, a primeira palavra é consolai. A voz que clama no deserto é citada pelos quatro evangelhos. A segunda metade responde a quem já desistiu, com uma série de perguntas sobre quem mediu as águas com o côncavo da mão, e a observação de que as nações são como pó da balança. E termina com a promessa mais conhecida do livro, sobre esperar no Senhor e renovar as forças, subindo com asas como águias.",
    marcos: [
      "'Consolai, consolai o meu povo'",
      "'Voz do que clama no deserto'",
      "Toda a carne é erva, e a palavra permanece para sempre",
      "Quem mediu as águas com o côncavo da mão",
      "'Os que esperam no Senhor renovarão as suas forças'",
    ],
    chave: 31,
  },
  41: {
    resumo:
      "As nações são chamadas a julgamento, e a frase mais repetida é não temas.",
    detalhe:
      "O capítulo é construído como tribunal, e Deus desafia os ídolos a anunciarem o que vai acontecer, porque prever é o teste. A parte que consola está no meio, com a promessa de segurar pela destra e a imagem de ser chamado de bichinho de Jacó, um diminutivo afetuoso e humilhante ao mesmo tempo, transformado em instrumento cortante. E há a promessa de abrir rios nos lugares altos e fontes no meio dos vales.",
    marcos: [
      "As nações são chamadas a julgamento",
      "'Não temas, porque eu sou contigo'",
      "'Eu te ajudarei com a destra da minha justiça'",
      "'Não temas, bichinho de Jacó'",
      "Abrirei rios nos lugares altos e fontes nos vales",
    ],
    chave: 10,
  },
  42: {
    resumo:
      "O primeiro canto do Servo, que não grita e não quebra a cana rachada.",
    detalhe:
      "O método do Servo é descrito por negação, e é isso que o distingue: não clamará, não levantará a voz nem a fará ouvir na rua. A imagem seguinte é das mais delicadas da Bíblia, com a cana trilhada que ele não quebra e o pavio que fumega que ele não apaga. Ou seja, ele não elimina o que já está quase acabado. Mateus cita esse trecho inteiro. O capítulo termina com uma crítica ao povo que é chamado de cego e surdo.",
    marcos: [
      "'Eis aqui o meu servo, a quem sustenho'",
      "Não clamará nem levantará a voz na rua",
      "'A cana trilhada não quebrará'",
      "'Nem apagará o pavio que fumega'",
      "Ele estabelecerá o juízo na terra",
    ],
    chave: 3,
  },
  43: {
    resumo:
      "Não é promessa de evitar a água e o fogo, é promessa de companhia dentro deles.",
    detalhe:
      "O versículo 2 é dos mais citados e costuma ser lido rápido demais: ele não diz que não haverá águas nem fogo, diz quando passares e quando caminhares. A promessa é de presença, não de isenção. O capítulo também traz a frase sobre Deus fazer coisa nova, perguntando se eles não a percebem, e a imagem de caminho no deserto e rios no ermo. E há a afirmação impressionante de que ele apaga as transgressões por amor de si mesmo.",
    marcos: [
      "'Chamei-te pelo teu nome; tu és meu'",
      "'Quando passares pelas águas, eu serei contigo'",
      "'Quando passares pelo fogo, não te queimarás'",
      "'Eis que faço uma coisa nova'",
      "'Eu, eu mesmo, sou o que apago as tuas transgressões'",
    ],
    chave: 2,
  },
  44: {
    resumo:
      "Uma sátira sobre fabricação de ídolos, com o mesmo pedaço de pau virando fogo e deus.",
    detalhe:
      "A crítica é feita com humor cruel e em detalhe artesanal: o homem planta o cedro, a chuva o faz crescer, ele usa metade para assar pão e se aquecer, e com o resto faz um deus e se prostra dizendo livra-me, pois tu és o meu deus. O profeta comenta que ele não percebe e que se alimenta de cinza. Em contraste, Deus se descreve como quem apaga as transgressões como a névoa e nomeia Ciro décadas antes.",
    marcos: [
      "'Derramarei o meu Espírito sobre a tua posteridade'",
      "O ferreiro e o carpinteiro fabricam um deus",
      "Metade da madeira vira fogo, metade vira ídolo",
      "'Apago as tuas transgressões como a névoa'",
      "Ciro é chamado pelo nome",
    ],
    chave: 22,
  },
  45: {
    resumo:
      "Um rei pagão é chamado de ungido, e Deus assume também a criação das trevas.",
    detalhe:
      "Chamar Ciro de ungido é chocante, e o texto explica que ele não conhecia a Deus e mesmo assim foi cingido por ele. A declaração do versículo 7 é das mais amplas do Antigo Testamento, com Deus dizendo formar a luz e criar as trevas, fazer a paz e criar o mal, sem repartir o governo do mundo com ninguém. E há o alerta contra o barro que discute com o oleiro, e o convite final a todos os confins da terra para olharem e serem salvos.",
    marcos: [
      "Ciro é chamado de ungido do Senhor",
      "'Cingi-te, ainda que não me conheças'",
      "'Eu formo a luz e crio as trevas'",
      "'Ai daquele que contende com o seu Criador'",
      "'Olhai para mim e sereis salvos, vós, todos os limites da terra'",
    ],
    chave: 22,
  },
  46: {
    resumo:
      "Os deuses da Babilônia precisam ser carregados, e Deus diz que é ele quem carrega.",
    detalhe:
      "O contraste é o ponto inteiro do capítulo, e é visual: Bel e Nebo são postos sobre animais, viram carga pesada e não conseguem livrar nem a si mesmos. Do outro lado, Deus diz que carregou o povo desde o ventre e que continuará até a velhice e as cãs. A frase sobre ele ter feito e ainda levar, sustentar e livrar, é uma das definições mais afetuosas de cuidado em toda a Bíblia hebraica.",
    marcos: [
      "Bel e Nebo são postos sobre animais como carga",
      "Os próprios deuses vão ao cativeiro",
      "'Vós fostes por mim carregados desde o ventre'",
      "'Até a vossa velhice eu serei o mesmo'",
      "'Eu vos criei, eu vos levarei, eu vos sustentarei'",
    ],
    chave: 4,
  },
  47: {
    resumo:
      "A senhora dos reinos é mandada descer do trono e sentar no pó.",
    detalhe:
      "O poema de escárnio manda Babilônia pegar as mós e moer farinha, trabalho de escrava. A acusação principal não é o poder e sim a falta de compaixão, dizendo que ela não usou de misericórdia com os velhos. A frase que a define é a do coração que diz eu sou, e não há outra além de mim, e o capítulo debocha dos astrólogos e prognosticadores perguntando se eles podem salvá-la, e observando que viram palha diante do fogo.",
    marcos: [
      "'Desce e assenta-te no pó'",
      "Toma as mós e mói a farinha",
      "'Não usaste de misericórdia com os velhos'",
      "'Eu sou, e não há outra além de mim'",
      "Os astrólogos não podem livrar nem a si mesmos",
    ],
    chave: 10,
  },
  48: {
    resumo:
      "Deus explica por que avisou antes, e diz onde refinou aquele povo.",
    detalhe:
      "O argumento é sobre credibilidade: ele anunciou as coisas com antecedência justamente porque sabia que eles atribuiriam tudo aos ídolos. A imagem do refino é diferente da usual, porque não é em fornalha de prata e sim na fornalha da aflição. E o capítulo termina com um lamento sobre o que poderia ter sido, dizendo que se tivessem atendido aos mandamentos a paz seria como um rio e a justiça como as ondas do mar.",
    marcos: [
      "As coisas foram anunciadas antes de acontecerem",
      "'Eis que te purifiquei, mas não como a prata'",
      "'Escolhi-te na fornalha da aflição'",
      "'Ah, se tivesses dado ouvidos aos meus mandamentos!'",
      "'A tua paz seria como um rio'",
    ],
    chave: 18,
  },
  49: {
    resumo:
      "O Servo diz que trabalhou em vão, e a resposta amplia a missão em vez de reduzi-la.",
    detalhe:
      "É o segundo canto do Servo, e o mais psicológico. Ele foi chamado desde o ventre e sua boca foi feita como espada aguda, e no entanto ele diz ter trabalhado em vão e gasto as forças inutilmente. A resposta não consola diminuindo, e sim aumentando: pouco é que sejas o meu servo para restaurar Israel, também te dei para luz dos gentios. E há a imagem materna do versículo 15, com Deus dizendo que, mesmo se a mãe esquecer, ele não esquece.",
    marcos: [
      "Chamado desde o ventre materno",
      "'Debalde tenho trabalhado'",
      "'Pouco é que sejas o meu servo'",
      "'Também te dei para luz dos gentios'",
      "'Ainda que ela se esquecesse, eu não me esquecerei de ti'",
    ],
    chave: 15,
  },
  50: {
    resumo:
      "O terceiro canto do Servo, que aprende de manhã a ouvir e não recua diante da agressão.",
    detalhe:
      "O começo é uma defesa jurídica, perguntando onde está a carta de divórcio da mãe deles, sugerindo que Deus não os repudiou. A parte central descreve um discípulo que recebe língua de sábios para sustentar com palavra o cansado, e que tem o ouvido despertado cada manhã. E então vem a linha que os evangelhos ecoam na paixão, sobre dar as costas aos que feriam e as faces aos que arrancavam a barba, sem esconder o rosto.",
    marcos: [
      "'Onde está a carta de divórcio de vossa mãe?'",
      "'Para que eu saiba sustentar com uma palavra o que está cansado'",
      "'Cada manhã ele desperta o meu ouvido'",
      "'Ofereci as minhas costas aos que me feriam'",
      "Quem anda em trevas confie no nome do Senhor",
    ],
    chave: 4,
  },
  51: {
    resumo:
      "Olhem para a rocha de onde foram cortados, e para o copo que já foi bebido.",
    detalhe:
      "O convite a olhar para trás é uma estratégia de encorajamento: lembrem de Abraão e Sara, que eram um só e foram multiplicados. Depois vem a ordem repetida de despertar, dirigida três vezes, ora ao braço do Senhor, ora a Jerusalém. A imagem central é do cálice do furor que ela bebeu até o fim e que agora é tirado da mão dela e posto na mão dos que a afligiram. E há o lembrete de não temer homem que é como erva.",
    marcos: [
      "'Olhai para a rocha de onde fostes cortados'",
      "Abraão era um só, e foi multiplicado",
      "'Desperta, desperta, braço do Senhor'",
      "'Quem és tu, para que temas o homem, que é mortal?'",
      "O cálice do furor é tirado da mão dela",
    ],
    chave: 1,
  },
  52: {
    resumo:
      "Os pés de quem traz boa notícia são chamados de formosos sobre os montes.",
    detalhe:
      "A ordem de despertar e vestir a força vem acompanhada de um detalhe curioso: fostes vendidos por nada, e sem dinheiro sereis resgatados. A imagem do mensageiro correndo sobre os montes é citada por Paulo em Romanos 10. O capítulo termina abrindo o quarto canto do Servo, com uma descrição chocante sobre o seu aspecto estar desfigurado mais do que o de qualquer homem, e reis fechando a boca diante dele.",
    marcos: [
      "'Desperta, desperta, veste-te da tua fortaleza'",
      "'Sem dinheiro sereis resgatados'",
      "'Quão formosos são os pés do que anuncia as boas-novas'",
      "'Eis que o meu servo procederá com prudência'",
      "O aspecto dele estava desfigurado mais que o de outro qualquer",
    ],
    chave: 7,
  },
  53: {
    resumo:
      "O capítulo mais comentado do Antigo Testamento, sobre alguém que sofre no lugar de outros.",
    detalhe:
      "O texto abre reconhecendo que aquilo é difícil de crer, perguntando quem deu crédito à pregação. A descrição nega qualquer atrativo, dizendo que ele não tinha beleza nem formosura para atrair o olhar. A virada está no versículo 4, com a palavra nós e a admissão de que pensavam que ele era castigado por Deus, quando na verdade carregava o que era deles. A imagem do cordeiro mudo diante dos tosquiadores é a mais citada de todas.",
    marcos: [
      "'Quem deu crédito à nossa pregação?'",
      "'Não tinha aparência nem formosura'",
      "'Ele tomou sobre si as nossas enfermidades'",
      "'Foi ferido pelas nossas transgressões'",
      "'Como cordeiro foi levado ao matadouro, e não abriu a boca'",
    ],
    chave: 5,
  },
  54: {
    resumo:
      "A ordem à mulher estéril é aumentar a tenda, antes de haver qualquer filho.",
    detalhe:
      "O capítulo fala com quem se sente descartada, e a imagem é a de alguém abandonada na juventude. A instrução é prática e absurda ao mesmo tempo: alargar o espaço da tenda, estender as cortinas e alongar as cordas antes de precisar. Deus admite ter escondido o rosto por um momento e chama isso de pequeno instante diante da benignidade eterna. E compara a promessa às águas de Noé, com o juramento de nunca mais.",
    marcos: [
      "'Canta alegremente, ó estéril'",
      "'Alarga o espaço da tua tenda'",
      "'Por um pequeno momento te deixei'",
      "Como as águas de Noé, com juramento de nunca mais",
      "'Nenhuma arma forjada contra ti prosperará'",
    ],
    chave: 2,
  },
  55: {
    resumo:
      "Um convite a comprar sem dinheiro, e o aviso de que os pensamentos de Deus não são os nossos.",
    detalhe:
      "O chamado é de vendedor de rua, gritando ó vós todos os que tendes sede. A pergunta seguinte é de economia doméstica e é certeira: por que gastais dinheiro naquilo que não é pão, e o trabalho no que não satisfaz. A parte mais citada fala da distância entre os caminhos, e o capítulo fecha com a imagem da chuva e da neve que não voltam vazias, aplicada à palavra, e com montes e árvores batendo palmas.",
    marcos: [
      "'Todos vós, os que tendes sede, vinde às águas'",
      "'Por que gastais o dinheiro naquilo que não é pão?'",
      "'Buscai o Senhor enquanto se pode achar'",
      "'Os meus pensamentos não são os vossos pensamentos'",
      "A palavra não voltará vazia",
    ],
    chave: 8,
  },
  56: {
    resumo:
      "Estrangeiros e eunucos, que a lei excluía, recebem nome dentro da casa.",
    detalhe:
      "É um dos capítulos mais generosos do Antigo Testamento e ele desfaz uma exclusão explícita de Deuteronômio 23. Ao eunuco, que não podia ter descendência, é prometido um memorial e um nome melhor que o de filhos e filhas. Ao estrangeiro que se une ao Senhor é prometido acesso ao monte santo e alegria na casa de oração. A frase sobre a casa ser chamada casa de oração para todos os povos é a que Jesus cita ao expulsar os cambistas.",
    marcos: [
      "'Guardai o juízo e praticai a justiça'",
      "Ao eunuco é dado nome melhor que filhos e filhas",
      "O estrangeiro é levado ao monte santo",
      "'A minha casa será chamada casa de oração para todos os povos'",
      "Crítica aos vigias cegos e aos cães mudos",
    ],
    chave: 7,
  },
  57: {
    resumo:
      "O justo morre e ninguém repara, e Deus diz onde mora além do lugar alto.",
    detalhe:
      "A observação inicial é melancólica e atual, sobre o justo perecer e ninguém considerar isso no coração, quando na verdade ele foi recolhido do mal que vem. O meio do capítulo denuncia cultos e alianças políticas, com uma frase ácida sobre cansar-se na extensão do caminho e não dizer que é inútil. E o fim traz uma das declarações mais surpreendentes da Bíblia, com o Alto e Sublime dizendo habitar também com o contrito e abatido de espírito.",
    marcos: [
      "'Perece o justo, e não há quem considere isso'",
      "Ele é recolhido antes do mal",
      "'Cansaste-te na extensão do teu caminho'",
      "'Habito no alto e santo lugar'",
      "'Mas também com o contrito e abatido de espírito'",
    ],
    chave: 15,
  },
  58: {
    resumo:
      "Eles jejuam e reclamam que Deus não vê, e a resposta redefine o que é jejum.",
    detalhe:
      "A queixa deles é registrada com honestidade: por que jejuamos e não olhas para isso. A resposta aponta o que acontecia no mesmo dia, com negócios tocados e empregados cobrados. Então vem a redefinição, e ela é toda social: soltar as ligaduras da impiedade, repartir o pão com o faminto, recolher em casa os pobres desabrigados e vestir o nu. A promessa que segue usa imagens de amanhecer, cura, jardim regado e nascente cujas águas não faltam.",
    marcos: [
      "'Por que jejuamos nós, e tu não atentas?'",
      "No dia do jejum tratavam dos próprios negócios",
      "'Porventura, não é este o jejum que escolhi?'",
      "Repartir o pão e recolher o pobre desabrigado",
      "'Serás como um jardim regado'",
    ],
    chave: 6,
  },
  59: {
    resumo:
      "A mão de Deus não encolheu, e o problema é descrito com detalhes de tribunal.",
    detalhe:
      "A abertura desmonta a suspeita de impotência divina e localiza o obstáculo nas iniquidades que fazem separação. O retrato social é duro, com ninguém clamando pela justiça e ninguém pleiteando pela verdade, e com a frase sobre a verdade andar tropeçando pelas praças e a equidade não poder entrar. E há a imagem do próprio Deus se admirando de não haver intercessor, e por isso agindo com o próprio braço.",
    marcos: [
      "'A mão do Senhor não está encolhida'",
      "'As vossas iniquidades fazem separação'",
      "'A verdade anda tropeçando pelas praças'",
      "Ele se admirou de não haver intercessor",
      "O seu próprio braço lhe trouxe a salvação",
    ],
    chave: 2,
  },
  60: {
    resumo:
      "Levanta-te e resplandece, enquanto a escuridão ainda cobre a terra.",
    detalhe:
      "A ordem é dada no meio do escuro, e não depois que ele passa, o que é justamente o ponto. A cidade é descrita recebendo caravanas de camelos, ouro e incenso, com navios chegando de longe, e as portas ficando abertas continuamente, de dia e de noite, o que num mundo antigo é o máximo sinal de segurança. O fim descreve uma cidade que não precisa mais de sol nem de lua, porque o Senhor é a luz perpétua dela.",
    marcos: [
      "'Levanta-te, resplandece, porque vem a tua luz'",
      "As trevas cobrem a terra e a escuridão, os povos",
      "Nações caminharão para a tua luz",
      "As portas estarão abertas continuamente",
      "'O Senhor será a tua luz perpétua'",
    ],
    chave: 1,
  },
  61: {
    resumo:
      "O texto que Jesus lê na sinagoga de Nazaré e diz estar se cumprindo naquele dia.",
    detalhe:
      "A missão descrita tem destinatários concretos: os quebrantados de coração, os cativos, os presos e os que choram. A troca proposta é de objetos, com ornamento no lugar de cinzas, óleo de alegria no lugar de pranto e manto de louvor no lugar de espírito angustiado. E há a promessa sobre reedificar lugares antigamente assolados, o que dá ao capítulo um tom de restauração concreta, e não apenas emocional.",
    marcos: [
      "'O Espírito do Senhor Deus está sobre mim'",
      "Para pregar boas-novas aos quebrantados de coração",
      "Proclamar liberdade aos cativos",
      "Ornamento em vez de cinzas, óleo de alegria em vez de pranto",
      "Reedificarão os lugares antigamente assolados",
    ],
    chave: 1,
  },
  62: {
    resumo:
      "Nomes velhos são trocados, e há sentinelas com a função de não deixar Deus em paz.",
    detalhe:
      "O profeta diz que não se calará nem descansará até que a justiça da cidade saia como um resplendor. A troca de nomes é o centro: em vez de Desamparada e Desolada, ela é chamada de O meu prazer está nela e Casada. A imagem seguinte é conjugal, com a alegria do noivo pela noiva. E há uma instrução curiosa aos que vigiam sobre os muros, mandando que não se calem nem deem descanso a Deus até ele estabelecer Jerusalém.",
    marcos: [
      "'Por amor de Sião não me calarei'",
      "Serás chamada por um nome novo",
      "Não mais Desamparada, nem Desolada",
      "'Como o noivo se alegra da noiva'",
      "'Nem deis a ele descanso até que estabeleça Jerusalém'",
    ],
    chave: 4,
  },
  63: {
    resumo:
      "Uma figura vem de Edom com as roupas manchadas, e o capítulo vira oração de queixa.",
    detalhe:
      "A abertura é dramática, com alguém chegando com vestes tintas e a explicação de que pisou sozinho o lagar. A segunda metade muda completamente e vira lembrança, com a frase mais terna do trecho, dizendo que em toda a angústia deles ele foi angustiado. O fim é uma oração corajosa que chega a perguntar por que Deus os fez desviar dos seus caminhos, e termina pedindo que ele olhe do céu, lembrando que Abraão não os conhece.",
    marcos: [
      "'Quem é este que vem de Edom, com vestes tintas?'",
      "Pisou o lagar sozinho",
      "'Em toda a angústia deles foi ele angustiado'",
      "Eles se rebelaram e contristaram o Espírito Santo dele",
      "'Tu, ó Senhor, és nosso Pai'",
    ],
    chave: 9,
  },
  64: {
    resumo:
      "O pedido de rasgar os céus e descer, e a imagem do oleiro no meio da confissão.",
    detalhe:
      "É a oração mais intensa do livro, começando com um desejo violento de intervenção, com montes escorrendo diante da presença. A confissão é sem defesa, comparando as justiças a trapo da imundícia e a própria condição a folha que cai. A frase que muda o tom é a do versículo 8, com a admissão de que somos o barro e ele o oleiro, obra das suas mãos, usada para pedir que ele não se lembre perpetuamente da iniquidade.",
    marcos: [
      "'Oh, se fendesses os céus e descesses!'",
      "Coisas que olhos não viram, que Deus prepara para quem nele espera",
      "As nossas justiças são como trapo da imundícia",
      "'Nós somos o barro e tu, o nosso oleiro'",
      "'Não te lembres perpetuamente da iniquidade'",
    ],
    chave: 8,
  },
  65: {
    resumo:
      "Deus diz ter se oferecido a quem não perguntava, e anuncia céus novos e terra nova.",
    detalhe:
      "A abertura é magoada, com Deus estendendo as mãos todo o dia a um povo rebelde e sendo achado por quem nem o buscava, texto que Paulo aplica aos gentios. A segunda metade descreve o mundo novo com imagens do cotidiano, e elas são muito concretas: não haverá mais criança de poucos dias, as pessoas construirão casas e habitarão nelas, plantarão vinhas e comerão o fruto, sem que outro tome. É promessa de trabalho que não é roubado.",
    marcos: [
      "'Fui achado dos que não me buscavam'",
      "'Estendi as minhas mãos todo o dia a um povo rebelde'",
      "'Eis que eu crio novos céus e nova terra'",
      "Edificarão casas e habitarão nelas",
      "Não plantarão para que outro coma",
    ],
    chave: 24,
  },
  66: {
    resumo:
      "O céu é o trono e a terra o estrado, então que casa alguém construiria para ele.",
    detalhe:
      "A pergunta final sobre o templo desmonta qualquer tentativa de conter Deus num prédio, e a resposta sobre para quem ele olha é surpreendentemente pequena: o pobre e abatido de espírito que treme diante da sua palavra. A imagem mais terna do livro inteiro está no versículo 13, com Deus dizendo consolar como uma mãe consola o filho. O fecho junta nações e línguas vindo ver a glória, e uma última nota severa sobre o juízo.",
    marcos: [
      "'O céu é o meu trono, e a terra, o estrado dos meus pés'",
      "'Para o pobre e abatido de espírito eu olharei'",
      "'Como alguém a quem sua mãe consola, assim eu vos consolarei'",
      "Nações e línguas virão ver a minha glória",
      "Toda a carne virá adorar perante mim",
    ],
    chave: 13,
  },
};

CAPITULOS.sl = {
  1: {
    resumo:
      "A porta de entrada do livro: dois caminhos, uma árvore plantada e palha ao vento.",
    detalhe:
      "O salmo abre o saltério inteiro e é construído como um portão de escolha. A progressão dos verbos no primeiro versículo é descendente e proposital, de andar para parar e de parar para sentar-se. O contraste final é entre uma árvore com raiz junto ao ribeiro e palha que o vento leva, ou seja, entre o que está ligado a uma fonte e o que não tem peso nenhum.",
    marcos: [
      "Bem-aventurado quem não anda, não para nem se assenta com os ímpios",
      "O prazer está na lei do Senhor, meditada de dia e de noite",
      "Como árvore plantada junto a ribeiros de águas",
      "Os ímpios são como palha que o vento dispersa",
      "O Senhor conhece o caminho dos justos",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "Reis conspiram contra Deus, e a reação no céu é rir.",
    detalhe:
      "O salmo é de entronização e tem quatro vozes: as nações, Deus, o rei ungido e o poeta. A imagem mais forte é a do riso divino diante de uma conspiração humana que se julga capaz. Junto com o Salmo 1, forma a dupla de abertura do saltério, e é o salmo mais citado no Novo Testamento, especialmente o versículo sobre o Filho gerado.",
    marcos: [
      "Por que se enfurecem as nações?",
      "Rompamos os seus laços, dizem os reis",
      "Aquele que habita nos céus se ri",
      "'Tu és meu Filho; eu, hoje, te gerei'",
      "Bem-aventurados todos os que nele se refugiam",
    ],
    chave: 12,
  },
  3: {
    resumo: "Uma oração da manhã escrita enquanto fugia do próprio filho.",
    detalhe:
      "O título liga o salmo à fuga diante de Absalão, o que dá peso a cada linha. O que mais impressiona é o versículo 5, porque dormir é o gesto de quem confia, e ele o faz no meio de uma guerra civil movida pelo filho. A mudança de tom acontece na palavra porém, que aparece logo depois da descrição do cerco.",
    marcos: [
      "Muitos dizem que não há salvação para ele em Deus",
      "'Tu, porém, Senhor, és o escudo que me protege'",
      "'Eu me deito e durmo; acordo'",
      "Não temerei dez milhares do povo",
      "Do Senhor é a salvação",
    ],
    chave: 5,
  },
  4: {
    resumo: "O salmo da noite, com um conselho sobre irar-se sem pecar.",
    detalhe:
      "É par do salmo anterior, agora ao deitar. O versículo 4 é citado por Paulo em Efésios e contém um conselho de autocontrole que envelheceu bem: irai-vos e não pequeis, meditai no coração sobre a cama e aquietai-vos. O contraste final é econômico, porque muitos pedem prosperidade e ele diz ter recebido mais alegria do que eles quando o trigo e o vinho se multiplicaram.",
    marcos: [
      "'Na angústia me deste alívio'",
      "'Irai-vos e não pequeis'",
      "Meditai no coração sobre a cama e aquietai-vos",
      "Mais alegria do que a deles na fartura de trigo e vinho",
      "'Em paz me deito e logo pego no sono'",
    ],
    chave: 8,
  },
  5: {
    resumo: "Oração feita de manhã cedo, com a imagem de esperar em posição de sentinela.",
    detalhe:
      "O verbo do versículo 3 descreve alguém que apresenta o pedido e depois fica de atalaia, esperando a resposta. Boa parte do salmo trata do dano que a fala causa, com a garganta descrita como sepulcro aberto, imagem que Paulo retoma em Romanos 3. O fecho pede direção num caminho plano por causa dos que espreitam.",
    marcos: [
      "Pela manhã ele apresenta a oração e fica esperando",
      "Deus não se compraz na iniquidade",
      "A garganta deles é sepulcro aberto",
      "Alegrem-se todos os que confiam em ti",
      "Tu, Senhor, cercas o justo de benevolência como de um escudo",
    ],
    chave: 3,
  },
  6: {
    resumo: "O primeiro dos salmos penitenciais, escrito por alguém exausto de chorar.",
    detalhe:
      "É o salmo do esgotamento físico e emocional, com ossos perturbados e a cama encharcada de lágrimas todas as noites. A pergunta central é um até quando dirigido à própria alma e a Deus. A virada é abrupta no versículo 8, onde o tom muda sem explicação, como se a oração tivesse sido ouvida no meio do caminho.",
    marcos: [
      "'Senhor, não me repreendas na tua ira'",
      "'Os meus ossos estão perturbados'",
      "'Até quando, Senhor?'",
      "A cama é inundada de lágrimas",
      "'O Senhor já ouviu a minha súplica'",
    ],
    chave: 9,
  },
  7: {
    resumo:
      "Um pedido de julgamento feito por quem está sendo acusado injustamente.",
    detalhe:
      "O salmista faz algo arriscado: pede para ser examinado e aceita a condenação se a acusação for verdadeira. A imagem mais conhecida é a do versículo 15, com quem cava uma cova caindo nela mesma, descrita como uma gravidez que gera mentira. É o mecanismo do mal que se volta contra quem o produz.",
    marcos: [
      "'Se fiz isto, que o inimigo me persiga'",
      "Deus é justo juiz, e um Deus que se indigna todos os dias",
      "Concebe a malícia e dá à luz a mentira",
      "Abre uma cova e cai nela",
      "O mal volta sobre a própria cabeça",
    ],
    chave: 15,
  },
  8: {
    resumo:
      "Olhando para o céu de noite, ele pergunta por que Deus se importaria com gente.",
    detalhe:
      "O salmo é uma moldura, começando e terminando com a mesma frase sobre a grandeza do nome. A pergunta do meio nasce da desproporção entre o céu observado e o tamanho humano, e a resposta não diminui o homem e sim o coroa. Hebreus 2 aplica o texto a Cristo. E há a observação curiosa sobre a força vir da boca das crianças.",
    marcos: [
      "'Ó Senhor, Senhor nosso, quão magnífico é o teu nome'",
      "Da boca dos pequeninos tiraste força",
      "'Que é o homem, que dele te lembres?'",
      "Fizeste-o pouco menor do que os seres celestiais",
      "Tudo puseste debaixo dos seus pés",
    ],
    chave: 4,
  },
  9: {
    resumo: "Agradecimento pela justiça de Deus, com atenção especial aos oprimidos.",
    detalhe:
      "Este salmo e o seguinte formam juntos um acróstico, o que sugere que originalmente eram um só. O tema é o juízo justo, e a frase que sustenta todo o resto é a do versículo 18, garantindo que o necessitado não será esquecido para sempre. O contraste é com as nações que se afundam na cova que fizeram.",
    marcos: [
      "'Louvarei ao Senhor de todo o meu coração'",
      "O Senhor é refúgio para o oprimido nos tempos de angústia",
      "Os que conhecem o teu nome confiam em ti",
      "Não será esquecido para sempre o necessitado",
      "As nações caem na cova que abriram",
    ],
    chave: 18,
  },
  10: {
    resumo: "A pergunta mais direta do saltério: por que ficas longe quando eu preciso?",
    detalhe:
      "O salmo descreve o opressor em detalhe e reproduz o raciocínio dele, incluindo a frase de que Deus se esqueceu e escondeu o rosto. A tensão não é resolvida rapidamente. A virada vem no fim, com a afirmação de que Deus ouve o desejo dos humildes e faz justiça ao órfão e ao oprimido, para que o homem da terra não mais inspire terror.",
    marcos: [
      "'Por que te conservas longe, Senhor?'",
      "O ímpio diz no coração que Deus esqueceu",
      "Ele espreita o pobre como leão na cova",
      "'Tu vês o trabalho e a dor'",
      "Fazes justiça ao órfão e ao oprimido",
    ],
    chave: 1,
  },
  11: {
    resumo:
      "Aconselham-no a fugir para o monte, e ele recusa dizendo onde está o seu refúgio.",
    detalhe:
      "O salmo começa citando o conselho dos amigos, que é razoável do ponto de vista prático, já que os fundamentos estão sendo destruídos. A resposta dele não nega o perigo e muda o ponto de observação, lembrando que o Senhor está no seu santo templo e que os olhos dele examinam os filhos dos homens.",
    marcos: [
      "'Como dizeis à minha alma: foge para o monte?'",
      "Os ímpios já armaram o arco no escuro",
      "Se os fundamentos são destruídos, que poderá fazer o justo?",
      "O Senhor está no seu santo templo",
      "Os seus olhos observam, as suas pálpebras provam",
    ],
    chave: 4,
  },
  12: {
    resumo: "Um lamento sobre a linguagem corrompida e a promessa de palavras puras.",
    detalhe:
      "O salmo é sobre inflação verbal: as pessoas falam com falsidade, lisonjeiam com lábio dobre e dizem que a língua delas prevalecerá. O contraste está no versículo 6, com as palavras de Deus comparadas a prata refinada em forno de barro, purificada sete vezes. E a razão do levantar de Deus é dita por ele mesmo, por causa da opressão dos pobres.",
    marcos: [
      "'Salva-nos, Senhor, porque faltam os benignos'",
      "Falam com falsidade e lábio dobre",
      "'Por causa da opressão dos pobres, levantar-me-ei'",
      "As palavras do Senhor são palavras puras",
      "Prata refinada sete vezes",
    ],
    chave: 6,
  },
  13: {
    resumo:
      "Quatro vezes até quando, e o salmo mais curto sobre a sensação de abandono.",
    detalhe:
      "A repetição da pergunta no começo é a estrutura inteira: até quando te esquecerás, até quando esconderás o rosto, até quando terei ansiedades, até quando o inimigo prevalecerá. Em seis versículos o salmo vai do desespero ao canto, e o que muda não é a circunstância, e sim a lembrança da benignidade.",
    marcos: [
      "'Até quando, Senhor, te esquecerás de mim?'",
      "Até quando esconderás de mim o rosto?",
      "'Alumia os meus olhos para que eu não durma o sono da morte'",
      "'Eu confio na tua benignidade'",
      "Cantarei ao Senhor, porque me fez bem",
    ],
    chave: 1,
  },
  14: {
    resumo: "O tolo diz no coração que não há Deus, e a consequência é prática.",
    detalhe:
      "A negação descrita não é filosófica e sim de conduta, porque a frase seguinte trata de corrupção e de obras abomináveis. O salmo é quase idêntico ao 53 e Paulo cita partes dele em Romanos 3. A acusação mais concreta é sobre devorarem o povo como quem come pão, e há a nota de que eles envergonham o plano do pobre.",
    marcos: [
      "'Diz o insensato no seu coração: não há Deus'",
      "O Senhor olha do céu para ver se há quem entenda",
      "Comem o meu povo como se comessem pão",
      "Envergonham o plano do pobre",
      "Deus está com a geração dos justos",
    ],
    chave: 1,
  },
  15: {
    resumo:
      "Quem pode morar na tenda de Deus, respondido com uma lista de condutas comuns.",
    detalhe:
      "A pergunta é litúrgica e a resposta é ética, sem nada sobre sacrifício. Ela trata de andar com integridade, não caluniar, não fazer mal ao próximo e não acolher afronta contra o vizinho. Dois itens se destacam pela dureza: jurar com dano próprio e não mudar, e emprestar sem cobrar juros.",
    marcos: [
      "'Senhor, quem habitará no teu tabernáculo?'",
      "O que anda com integridade e fala verdade no coração",
      "Não calunia com a língua nem faz mal ao próximo",
      "Jura com dano próprio e não muda",
      "Não empresta o dinheiro com usura",
    ],
    chave: 4,
  },
  16: {
    resumo:
      "Um salmo de confiança que termina falando de vida na presença e de alegrias perpétuas.",
    detalhe:
      "A imagem central é de herança e de terreno medido, com a frase sobre as divisas caírem em lugares deliciosos. O texto é citado por Pedro em Atos 2 como profecia da ressurreição, por causa do versículo sobre não deixar a alma na morte nem permitir que o santo veja corrupção. E há a observação de que até de noite os rins o ensinam.",
    marcos: [
      "'Guarda-me, ó Deus, porque em ti me refugio'",
      "As divisas caíram-me em lugares deliciosos",
      "De noite os meus rins me ensinam",
      "'Não deixarás a minha alma na morte'",
      "Delícias perpétuas na tua destra",
    ],
    chave: 11,
  },
  17: {
    resumo:
      "Um pedido de audiência justa, com duas imagens famosas de proteção.",
    detalhe:
      "O salmista convida Deus a sondá-lo de noite e prová-lo, e afirma ter determinado que a sua boca não transgrida. A parte mais lembrada está no versículo 8, com dois pedidos colados: guarda-me como à menina do olho e esconde-me à sombra das tuas asas. As duas imagens misturam o mais delicado do corpo com o cuidado de ave pelos filhotes.",
    marcos: [
      "'Provaste o meu coração, visitaste-me de noite'",
      "'Inclina para mim os ouvidos e escuta as minhas palavras'",
      "'Guarda-me como à menina do olho'",
      "'Esconde-me à sombra das tuas asas'",
      "Satisfeito ao despertar com a tua semelhança",
    ],
    chave: 8,
  },
  18: {
    resumo:
      "Um cântico longo de livramento, quase idêntico ao capítulo 22 de 2 Samuel.",
    detalhe:
      "É o segundo salmo mais longo e começa com uma declaração de amor rara no Antigo Testamento, usando um verbo de afeto íntimo. A teofania central é violenta, com Deus inclinando os céus e descendo com trevas debaixo dos pés. No meio da linguagem militar aparece a linha mais delicada, dizendo que a benignidade dele é o que o engrandeceu.",
    marcos: [
      "'Eu te amo, ó Senhor, força minha'",
      "Na angústia invoquei o Senhor e ele ouviu do seu templo",
      "Inclinou os céus e desceu",
      "'Tirou-me das muitas águas'",
      "'A tua benignidade me engrandeceu'",
    ],
    chave: 2,
  },
  19: {
    resumo:
      "Duas formas de Deus falar: o céu sem palavras e a lei com palavras.",
    detalhe:
      "A primeira metade descreve uma pregação sem som, em que não há linguagem nem palavras e ainda assim a voz se estende por toda a terra. A segunda metade muda de assunto e de estilo, descrevendo a lei com seis adjetivos e comparando-a ao ouro e ao mel. O fecho é uma oração sobre erros que a própria pessoa não percebe.",
    marcos: [
      "Os céus proclamam a glória de Deus",
      "Não há linguagem nem palavras, e a voz se ouve",
      "A lei do Senhor é perfeita e restaura a alma",
      "Mais desejável que ouro e mais doce que o mel",
      "'Quem há que possa discernir os próprios erros?'",
    ],
    chave: 1,
  },
  20: {
    resumo:
      "Uma oração do povo pelo rei antes da batalha, com um contraste sobre em que se confia.",
    detalhe:
      "O salmo é uma bênção coletiva pronunciada em favor de quem vai enfrentar algo difícil, e pede que Deus se lembre das ofertas e atenda aos desejos do coração. O versículo 7 é o eixo e continua atual, contrapondo os que confiam em carros e cavalos aos que se lembram do nome do Senhor.",
    marcos: [
      "'O Senhor te ouça no dia da angústia'",
      "Envie socorro desde o santuário",
      "Que ele te conceda conforme o teu coração",
      "'Uns confiam em carros e outros, em cavalos'",
      "Nós nos lembraremos do nome do Senhor",
    ],
    chave: 7,
  },
  21: {
    resumo: "O par do salmo anterior, agora depois da vitória, em tom de agradecimento.",
    detalhe:
      "O que se pediu no Salmo 20 é dado aqui, e o texto faz questão de dizer que ele recebeu mais do que pediu, porque foi antecipado com bênçãos de bondade. O centro de gravidade é declarado no versículo 7, atribuindo a estabilidade não à força do rei e sim à confiança e à benignidade do Altíssimo.",
    marcos: [
      "O rei se alegra na força do Senhor",
      "Satisfizeste o desejo do seu coração",
      "Foi antecipado com bênçãos de bondade",
      "Pediu vida e lhe deste longura de dias",
      "'Porque o rei confia no Senhor'",
    ],
    chave: 7,
  },
  22: {
    resumo:
      "O grito de abandono que Jesus cita na cruz, seguido de uma virada de louvor.",
    detalhe:
      "O salmo é dividido em duas metades quase opostas. A primeira descreve zombaria, ossos desconjuntados, língua pegada ao céu da boca, mãos e pés traspassados e roupas repartidas por sorte, detalhes que os evangelhos retomam na crucificação. A segunda metade, a partir do versículo 22, vira proclamação, e termina falando de gerações futuras e de um povo que ainda vai nascer.",
    marcos: [
      "'Deus meu, Deus meu, por que me desamparaste?'",
      "Zombam dele e meneiam a cabeça",
      "Traspassaram-me as mãos e os pés",
      "Repartem entre si as minhas vestes",
      "Anunciarão a sua justiça ao povo que há de nascer",
    ],
    chave: 1,
  },
  23: {
    resumo:
      "Seis versículos sobre um pastor, uma mesa posta na frente dos inimigos e uma casa.",
    detalhe:
      "É o salmo mais conhecido do mundo e a estrutura passa despercebida: começa falando de Deus na terceira pessoa e, exatamente no meio, no vale da sombra da morte, passa a falar com ele na segunda pessoa. A intimidade aumenta justamente no pior trecho. As duas imagens são complementares, a do pastor no campo e a do anfitrião à mesa.",
    marcos: [
      "'O Senhor é o meu pastor; nada me faltará'",
      "Guia-me mansamente a águas tranquilas",
      "'Ainda que eu ande pelo vale da sombra da morte'",
      "'Preparas-me uma mesa na presença dos meus adversários'",
      "Habitarei na Casa do Senhor para todo o sempre",
    ],
    chave: 4,
  },
  24: {
    resumo:
      "A terra é do Senhor, e as portas são mandadas se levantar para o Rei da glória entrar.",
    detalhe:
      "O salmo tem cara de procissão e provavelmente era cantado em duas vozes, com pergunta e resposta. A primeira parte repete a pergunta do Salmo 15 sobre quem pode subir, e a resposta fala de mãos limpas e coração puro. A segunda é uma cena de portão, com a ordem repetida às portas e a pergunta feita duas vezes sobre quem é o Rei da glória.",
    marcos: [
      "'Do Senhor é a terra e a sua plenitude'",
      "'Quem subirá ao monte do Senhor?'",
      "O de mãos limpas e coração puro",
      "'Levantai, ó portas, as vossas cabeças'",
      "'Quem é esse Rei da Glória?'",
    ],
    chave: 1,
  },
  25: {
    resumo:
      "Um pedido de direção em forma de acróstico, misturado com pedido de perdão.",
    detalhe:
      "Cada estrofe começa por uma letra do alfabeto hebraico, o que dá ao salmo um tom de inventário. O pedido principal é por instrução de caminho, repetido de várias formas. O que chama atenção é ele pedir que Deus não se lembre dos pecados da mocidade e, na mesma oração, pedir que se lembre das misericórdias, que são desde a eternidade.",
    marcos: [
      "'Faze-me saber os teus caminhos'",
      "Não te lembres dos pecados da minha mocidade",
      "'Lembra-te das tuas misericórdias'",
      "O Senhor confia os seus segredos aos que o temem",
      "Guarda a minha alma, porque em ti confio",
    ],
    chave: 4,
  },
  26: {
    resumo: "Um pedido para ser examinado, feito por quem escolheu com quem anda.",
    detalhe:
      "O salmo é uma declaração de integridade e boa parte dele é sobre companhia, listando com quem ele não se assenta. A imagem do lavar as mãos em inocência e rodear o altar descreve um gesto litúrgico. O pedido final é para não ser arrastado junto com quem fala de paz enquanto trama o mal.",
    marcos: [
      "'Julga-me, Senhor, pois tenho andado na minha integridade'",
      "'Sonda-me, Senhor, e prova-me'",
      "Não se assenta com homens falsos nem com hipócritas",
      "Lavo as mãos na inocência e rodeio o teu altar",
      "'Amo a habitação da tua casa'",
    ],
    chave: 2,
  },
  27: {
    resumo:
      "Começa destemido, termina pedindo socorro, e no meio há um único pedido.",
    detalhe:
      "A primeira metade é de confiança total, com a pergunta sobre a quem temer. A segunda muda para súplica, e o salmo não esconde essa oscilação, que é a experiência real de quem crê. No centro está o versículo 4, em que ele reduz tudo a um pedido só, que é habitar na casa do Senhor e contemplar a sua beleza.",
    marcos: [
      "'O Senhor é a minha luz e a minha salvação'",
      "'Uma coisa peço ao Senhor'",
      "Habitar na casa do Senhor todos os dias da minha vida",
      "'Se meu pai e minha mãe me desampararem'",
      "'Espera pelo Senhor, anima-te'",
    ],
    chave: 4,
  },
  28: {
    resumo: "Um pedido para não ser tratado com silêncio, e o alívio quando a resposta vem.",
    detalhe:
      "O temor expresso no começo não é de castigo, é de silêncio, com a frase sobre não se calar para que ele não se torne semelhante aos que descem à cova. A mudança de tom acontece no versículo 6, e o que ele diz é simplesmente que Deus ouviu a voz das suas súplicas. O fim amplia o pedido para todo o povo.",
    marcos: [
      "'Não te emudeças para comigo'",
      "Levanto as mãos para o teu santuário",
      "'Bendito seja o Senhor, que ouviu as minhas súplicas'",
      "O Senhor é a minha força e o meu escudo",
      "Salva o teu povo e apascenta-o para sempre",
    ],
    chave: 7,
  },
  29: {
    resumo: "Sete vezes a voz do Senhor, descrita como uma tempestade atravessando o país.",
    detalhe:
      "O salmo acompanha uma trovoada que vem do mar, quebra os cedros do Líbano, sacode o deserto e termina no templo. A repetição da expressão voz do Senhor sete vezes é o esqueleto do poema. O fecho é inesperado depois de tanta força: o Senhor dará força ao seu povo e o abençoará com paz.",
    marcos: [
      "Dai ao Senhor a glória devida ao seu nome",
      "A voz do Senhor está sobre as águas",
      "A voz do Senhor quebra os cedros do Líbano",
      "A voz do Senhor faz tremer o deserto",
      "'O Senhor abençoará o seu povo com paz'",
    ],
    chave: 11,
  },
  30: {
    resumo:
      "O choro dura uma noite, e a alegria vem pela manhã.",
    detalhe:
      "O salmo é de alguém que já esteve perto da morte e voltou, e ele admite com franqueza ter dito na prosperidade que jamais vacilaria. A frase do versículo 5 é a mais citada e a imagem final é de troca de roupas, com o pranto convertido em dança e o pano de saco substituído por alegria.",
    marcos: [
      "'Tu me tiraste do abismo'",
      "'O choro pode durar uma noite, mas a alegria vem pela manhã'",
      "'Na minha prosperidade, disse eu: jamais vacilarei'",
      "'Tornaste o meu pranto em folguedo'",
      "Tiraste o meu pano de saco e me cingiste de alegria",
    ],
    chave: 5,
  },
  31: {
    resumo:
      "A frase que Jesus diz na cruz está aqui, e o resto é um retrato de quem foi esquecido.",
    detalhe:
      "O salmo alterna confiança e desespero várias vezes. A descrição do isolamento é dura, com ele dizendo ter sido esquecido no coração dos outros como um morto e comparado a um vaso quebrado. A entrega do espírito nas mãos de Deus é citada por Jesus como última palavra, e o fecho é um encorajamento aos que esperam.",
    marcos: [
      "'Nas tuas mãos entrego o meu espírito'",
      "Fui esquecido no coração como um morto",
      "'Sou como um vaso quebrado'",
      "'Os meus tempos estão nas tuas mãos'",
      "'Sede fortes, e revigore-se o vosso coração'",
    ],
    chave: 5,
  },
  32: {
    resumo:
      "O alívio de quem parou de esconder, com uma descrição física do que o silêncio causava.",
    detalhe:
      "É o segundo salmo penitencial e o mais psicológico. Ele descreve o que sentia enquanto calava, com ossos envelhecendo e o vigor secando como no calor do verão. A virada é o momento em que ele decide confessar, e o perdão aparece como imediato. O fim traz um conselho e um alerta sobre não ser como cavalo ou mula que precisam de freio.",
    marcos: [
      "'Bem-aventurado aquele cuja transgressão é perdoada'",
      "'Enquanto calei, envelheceram os meus ossos'",
      "'Confessarei as minhas transgressões ao Senhor'",
      "Tu és o meu esconderijo",
      "'Não sejais como o cavalo ou a mula, sem entendimento'",
    ],
    chave: 5,
  },
  33: {
    resumo:
      "Um convite a cantar um cântico novo, com uma lista do que não salva ninguém.",
    detalhe:
      "O salmo louva a criação pela palavra, dizendo que pelo falar do Senhor foram feitos os céus. A parte mais interessante é uma sequência de negações realistas: o rei não se salva pela multidão do exército, o valente não se livra pela muita força, e o cavalo é vão para a vitória. O contraste é o olhar de Deus sobre os que esperam.",
    marcos: [
      "Cantai-lhe um cântico novo",
      "Pela palavra do Senhor foram feitos os céus",
      "O Senhor frustra os planos das nações",
      "'O rei não se salva pela multidão do exército'",
      "Os olhos do Senhor estão sobre os que nele esperam",
    ],
    chave: 16,
  },
  34: {
    resumo:
      "Escrito depois de escapar fingindo loucura, e convida a experimentar antes de julgar.",
    detalhe:
      "O título liga o salmo ao episódio em que Davi se fingiu de louco diante de Aquis. É acróstico e cheio de conselhos práticos, incluindo guardar a língua do mal e buscar a paz seguindo-a. O convite do versículo 8 é de degustação, mandando provar e ver, e há a promessa de que Deus está perto dos quebrantados de coração.",
    marcos: [
      "'Bendirei o Senhor em todo o tempo'",
      "'Provai e vede que o Senhor é bom'",
      "Guarda a língua do mal e busca a paz",
      "Os olhos do Senhor estão sobre os justos",
      "'Perto está o Senhor dos que têm o coração quebrantado'",
    ],
    chave: 8,
  },
  35: {
    resumo:
      "Pedido de defesa contra quem retribui mal por bem, feito por quem já orou por eles.",
    detalhe:
      "O salmo é um dos mais agressivos do saltério e vale ler notando o detalhe do versículo 13: quando eles adoeceram, ele vestiu pano de saco e jejuou, e a oração voltava para o próprio peito. A indignação nasce de uma traição concreta e não de rivalidade genérica. A imagem militar de abertura pede que Deus pegue escudo e lança.",
    marcos: [
      "'Toma o escudo e o pavês e levanta-te em meu socorro'",
      "Sem causa me armaram laço",
      "'Quando estavam enfermos, vesti-me de pano de saco'",
      "Retribuem-me mal por bem",
      "Que se alegrem os que desejam a minha justiça",
    ],
    chave: 13,
  },
  36: {
    resumo:
      "Começa descrevendo o autoengano do ímpio e termina numa das imagens mais bonitas do livro.",
    detalhe:
      "O contraste é o ponto: a primeira parte fala de quem se lisonjeia a si mesmo a ponto de não detectar a própria iniquidade, e até na cama planeja o mal. A segunda muda de escala e fala da benignidade que chega aos céus, do juízo comparado ao abismo, e do rio de delícias. O verso final é o mais conhecido, dizendo que na luz dele vemos a luz.",
    marcos: [
      "O ímpio se lisonjeia a ponto de não detectar a iniquidade",
      "'A tua benignidade, Senhor, chega até os céus'",
      "À sombra das tuas asas se abrigam os filhos dos homens",
      "Dás-lhes a beber da corrente das tuas delícias",
      "'Na tua luz, vemos a luz'",
    ],
    chave: 9,
  },
  37: {
    resumo:
      "Um acróstico inteiro sobre não se irritar com a prosperidade de quem age mal.",
    detalhe:
      "O salmo repete três vezes a instrução de não se inquietar, e o argumento é de prazo, dizendo que em pouco tempo o ímpio não existirá e que você olhará o lugar dele e ele não estará lá. Os verbos do versículo 5 formam uma sequência prática: entrega o caminho, confia e ele agirá. O fim traz o testemunho de alguém velho que nunca viu o justo desamparado.",
    marcos: [
      "'Não te indignes por causa dos malfeitores'",
      "'Entrega o teu caminho ao Senhor'",
      "'Descansa no Senhor e espera nele'",
      "Os mansos herdarão a terra",
      "'Fui moço e agora sou velho, mas nunca vi o justo desamparado'",
    ],
    chave: 5,
  },
  38: {
    resumo:
      "O terceiro salmo penitencial, escrito por alguém doente, sozinho e sem argumentos.",
    detalhe:
      "É o mais físico dos penitenciais, descrevendo chagas, lombos cheios de ardor e o coração palpitando, com a força e a luz dos olhos indo embora. Os amigos se afastam e os parentes ficam de longe. A estratégia dele diante das acusações é o silêncio, dizendo que se tornou como um homem que não ouve e em cuja boca não há réplica.",
    marcos: [
      "'Não me repreendas na tua ira'",
      "As minhas iniquidades ultrapassam a minha cabeça",
      "Os amigos e companheiros se afastam da minha chaga",
      "'Sou como homem que não ouve'",
      "'Não me desampares, Senhor'",
    ],
    chave: 15,
  },
  39: {
    resumo:
      "Ele tenta ficar calado para não pecar, e o silêncio acaba piorando tudo.",
    detalhe:
      "A abertura descreve uma tentativa de autocontrole que falha: ele põe mordaça na boca diante do ímpio, o coração se inflama e o fogo acende, e aí ele fala. O que sai é uma meditação sobre brevidade, pedindo que Deus lhe faça saber o fim e a medida dos dias. O pedido final é quase incômodo, para que Deus desvie dele o olhar para que possa recobrar o ânimo.",
    marcos: [
      "'Porei mordaça à minha boca'",
      "Calei-me e o meu sofrimento se agravou",
      "'Faze-me saber o meu fim e qual a medida dos meus dias'",
      "Cada homem, por mais firme que esteja, é pura vaidade",
      "'Sou forasteiro, como o foram todos os meus pais'",
    ],
    chave: 4,
  },
  40: {
    resumo:
      "Tirado do lodo e posto sobre rocha, ele diz que Deus não quer sacrifício, e sim ouvidos abertos.",
    detalhe:
      "A primeira metade é de gratidão, com a espera paciente e a sequência de resgate: tirou do poço, pôs sobre rocha e colocou cântico novo na boca. A frase do versículo 6 é surpreendente porque relativiza o sistema sacrificial, e Hebreus 10 a cita. A segunda metade vira súplica, o que mostra que o salmo foi escrito de dentro de outra dificuldade.",
    marcos: [
      "'Esperei confiantemente pelo Senhor, e ele se inclinou'",
      "Tirou-me do lago horrível e do lodo",
      "Pôs um cântico novo na minha boca",
      "'Sacrifício e oferta não quiseste; abriste-me os ouvidos'",
      "'Eis aqui venho, no rolo do livro está escrito a meu respeito'",
    ],
    chave: 2,
  },
  41: {
    resumo:
      "Fecha o primeiro livro dos salmos, e fala da traição de quem comia à mesma mesa.",
    detalhe:
      "A abertura é uma bem-aventurança sobre quem atende ao pobre, com a promessa de ser sustentado no leito da enfermidade. A parte central descreve visitas que falam vaidade e saem para espalhar o que viram. O versículo 9, sobre o amigo íntimo que comia do seu pão levantar contra ele o calcanhar, é citado por Jesus a respeito de Judas.",
    marcos: [
      "'Bem-aventurado o que acode ao necessitado'",
      "O Senhor o sustentará no leito da enfermidade",
      "Os que me visitam falam vaidade",
      "'Até o meu amigo íntimo levantou contra mim o calcanhar'",
      "A doxologia que encerra o primeiro livro",
    ],
    chave: 1,
  },
  42: {
    resumo:
      "A sede de um cervo vira imagem de saudade, e ele conversa com a própria alma.",
    detalhe:
      "O salmo é de alguém longe do templo, e a dor tem endereço geográfico, com menção à terra do Jordão e ao monte Mizar. A pergunta que os outros fazem, sobre onde está o seu Deus, é repetida e machuca. A estratégia dele é falar consigo mesmo em voz alta, perguntando à própria alma por que está abatida, e esse refrão se repete três vezes entre este salmo e o seguinte.",
    marcos: [
      "'Como o cervo brama pelas correntes das águas'",
      "As lágrimas têm sido o meu alimento de dia e de noite",
      "'Onde está o teu Deus?'",
      "'Por que estás abatida, ó minha alma?'",
      "'Espera em Deus, pois ainda o louvarei'",
    ],
    chave: 1,
  },
  43: {
    resumo:
      "A continuação do anterior, com o mesmo refrão e um pedido de luz e verdade como guias.",
    detalhe:
      "Muitos manuscritos antigos trazem os dois salmos juntos, e o refrão idêntico confirma a ligação. A novidade aqui é o pedido do versículo 3, para que Deus envie a sua luz e a sua verdade como guias que o levem ao monte santo. O destino declarado é o altar, e o resultado esperado é alegria e harpa.",
    marcos: [
      "'Faze-me justiça, ó Deus, e pleiteia a minha causa'",
      "'Envia a tua luz e a tua verdade'",
      "Que elas me guiem ao teu santo monte",
      "Irei ao altar de Deus, a Deus, que é a minha alegria",
      "'Espera em Deus, pois ainda o louvarei'",
    ],
    chave: 3,
  },
  44: {
    resumo:
      "Um lamento coletivo que acusa Deus de ter abandonado sem que eles tenham errado.",
    detalhe:
      "O salmo começa recitando o que os pais contaram sobre as vitórias antigas e então confronta o presente, dizendo que agora foram rejeitados e entregues como ovelhas para o corte. O que o torna incomum é a alegação de inocência: eles afirmam não ter esquecido a aliança. Paulo cita o versículo 22 em Romanos 8. O fim é um grito para que Deus desperte.",
    marcos: [
      "Os nossos pais nos contaram o que fizeste nos dias antigos",
      "'Tu nos rejeitaste e nos humilhaste'",
      "Fomos entregues como ovelhas para o corte",
      "'Tudo isto nos sobreveio, e não nos esquecemos de ti'",
      "'Desperta! Por que dormes, Senhor?'",
    ],
    chave: 22,
  },
  45: {
    resumo: "Um poema de casamento real, com elogios ao rei e conselhos à noiva.",
    detalhe:
      "O salmo se apresenta como obra de um escriba de pena veloz e é o único claramente nupcial do saltério. A primeira parte descreve o rei, e Hebreus 1 aplica dois versículos dele a Cristo. A segunda se dirige à noiva, pedindo que ela ouça, esqueça o povo e a casa paterna, e descreve a entrada dela com vestes bordadas diante do rei.",
    marcos: [
      "'A minha língua é como a pena de habilidoso escritor'",
      "'O teu trono, ó Deus, é para todo o sempre'",
      "'Ouve, filha, e vê; inclina os ouvidos'",
      "Toda gloriosa é a filha do rei no seu palácio",
      "Será conduzida ao rei com alegria e regozijo",
    ],
    chave: 6,
  },
  46: {
    resumo:
      "Ainda que a terra se mude e os montes caiam no mar, há um rio que alegra a cidade.",
    detalhe:
      "O salmo contrapõe duas águas: o mar que ruge e se agita, símbolo do caos, e o rio cujas correntes alegram a cidade de Deus. A frase mais conhecida está no versículo 10 e o verbo hebraico significa algo como soltar as mãos, parar de agitar. É uma ordem dada no meio da guerra, e não em ambiente tranquilo, dirigida às nações.",
    marcos: [
      "'Deus é o nosso refúgio e fortaleza, socorro bem presente'",
      "Não temeremos ainda que a terra se mude",
      "Há um rio cujas correntes alegram a cidade de Deus",
      "Ele faz cessar as guerras e queima os carros no fogo",
      "'Aquietai-vos e sabei que eu sou Deus'",
    ],
    chave: 10,
  },
  47: {
    resumo: "Um salmo de aclamação com palmas, celebrando Deus como rei de toda a terra.",
    detalhe:
      "É curto e barulhento, começando com a ordem de bater palmas e aclamar com voz de triunfo. O detalhe que o distingue é o alcance: não fala de um Deus nacional e sim de um rei sobre toda a terra, com os príncipes dos povos reunidos como povo do Deus de Abraão. A imagem de Deus subindo entre aclamação e som de trombeta dá o tom de coroação.",
    marcos: [
      "'Batei palmas, todos os povos'",
      "O Senhor Altíssimo é tremendo, rei sobre toda a terra",
      "Deus subiu entre aclamações",
      "Cantai louvores com entendimento",
      "Os príncipes dos povos se reúnem",
    ],
    chave: 1,
  },
  48: {
    resumo:
      "Um elogio à cidade, com a instrução de andar em volta dela e contar as torres.",
    detalhe:
      "O salmo descreve reis que se reuniram, viram e ficaram pasmados, e o texto compara o medo deles a dores de parto. A parte final é pedagógica e concreta: rodeiem Sião, contem as torres, reparem nos baluartes e percorram os palácios, para poderem contar tudo isso à geração seguinte. A memória é construída caminhando.",
    marcos: [
      "Grande é o Senhor e mui digno de ser louvado",
      "O monte Sião é a alegria de toda a terra",
      "Os reis viram e ficaram pasmados",
      "'Rodeai Sião e percorrei-a; contai as suas torres'",
      "Para que o conteis à geração vindoura",
    ],
    chave: 12,
  },
  49: {
    resumo:
      "Um enigma sobre dinheiro, dirigido a ricos e pobres igualmente, com a morte no centro.",
    detalhe:
      "O autor se apresenta como quem vai propor um enigma ao som da harpa, e o público convocado é o mundo inteiro. O argumento é simples e implacável: ninguém consegue pagar o resgate da própria vida, e o sábio morre como o tolo, deixando os bens para outros. O detalhe irônico é sobre darem o próprio nome às terras, tentando permanecer assim.",
    marcos: [
      "'Ouvi isto, todos os povos'",
      "Ninguém pode remir o irmão nem dar a Deus o seu resgate",
      "O sábio morre, e igualmente perecem o estulto e o néscio",
      "Dão às terras os próprios nomes",
      "'O homem, honrado como é, não permanece'",
    ],
    chave: 7,
  },
  50: {
    resumo:
      "Deus abre um processo e diz que não tem fome, e por isso não precisa dos bois deles.",
    detalhe:
      "O salmo é uma cena de tribunal em que Deus convoca céus e terra como testemunhas. O argumento contra o formalismo religioso é irônico e certeiro: se ele tivesse fome, não diria a eles, porque o mundo e tudo o que ele contém é dele. O que ele pede é ação de graças e cumprimento dos votos. A segunda metade acusa quem recita a aliança de boca e convive com ladrão e adúltero.",
    marcos: [
      "Deus convoca a terra desde o nascente do sol",
      "'Se eu tivesse fome, não to diria'",
      "'Porventura, como eu carne de touros?'",
      "'Oferece a Deus sacrifício de ações de graças'",
      "'Invoca-me no dia da angústia'",
    ],
    chave: 15,
  },
  51: {
    resumo:
      "A oração escrita depois do caso com Bate-Seba, e o pedido é por um coração novo.",
    detalhe:
      "É o mais conhecido dos salmos penitenciais. O que o distingue é não haver nenhuma desculpa nem menção a circunstância atenuante. Ele pede apagamento, lavagem e purificação, três verbos diferentes. A frase mais discutida é a do versículo 4, dizendo ter pecado contra Deus somente, o que não nega o dano a outros e sim reconhece contra quem a aliança foi rompida. O pedido central é por criação, não por conserto.",
    marcos: [
      "'Compadece-te de mim, ó Deus, segundo a tua benignidade'",
      "'Contra ti, contra ti somente, pequei'",
      "'Cria em mim, ó Deus, um coração puro'",
      "'Não me repulses da tua presença'",
      "'Sacrifícios agradáveis a Deus são o espírito quebrantado'",
    ],
    chave: 10,
  },
  52: {
    resumo:
      "Contra quem usa a língua como navalha afiada, com a imagem de uma oliveira verde.",
    detalhe:
      "O título liga o salmo à denúncia de Doegue, que levou à morte dos sacerdotes de Nobe. A acusação é sobre gostar mais do mal que do bem e amar as palavras devoradoras. O contraste final é vegetal e vale reter: enquanto o poderoso é arrancado da terra dos viventes, o salmista se descreve como oliveira verde na casa de Deus.",
    marcos: [
      "'Por que te glorias na maldade, ó homem poderoso?'",
      "A tua língua é como navalha afiada",
      "Amas mais o mal do que o bem",
      "Deus te desarraigará da terra dos viventes",
      "'Sou como a oliveira verde na Casa de Deus'",
    ],
    chave: 8,
  },
  53: {
    resumo: "Quase idêntico ao Salmo 14, com pequenas variações no fim.",
    detalhe:
      "A repetição de um salmo inteiro em outro lugar do saltério é incomum e provavelmente reflete duas coleções distintas reunidas depois. A diferença mais visível é o uso do nome de Deus e uma alteração na parte final sobre o espalhamento dos ossos. O tema é o mesmo: a negação prática de Deus produz corrupção social, e não apenas erro de opinião.",
    marcos: [
      "'Diz o insensato no seu coração: não há Deus'",
      "Não há quem faça o bem, nem um sequer",
      "Devoram o meu povo como se comessem pão",
      "Tomam-se de grande pavor onde não havia motivo",
      "'Quem dera de Sião viesse já o livramento'",
    ],
    chave: 1,
  },
  54: {
    resumo:
      "Um pedido curto de socorro feito quando alguém entregou o esconderijo dele.",
    detalhe:
      "O título liga o salmo à traição dos zifeus, que avisaram Saul onde Davi estava. O pedido é para ser salvo pelo nome e julgado pelo poder, e a acusação é contra estranhos que se levantaram sem terem Deus diante dos olhos. O salmo termina em promessa de oferta voluntária, num tom que já mudou do pedido para o agradecimento antecipado.",
    marcos: [
      "'Salva-me, ó Deus, pelo teu nome'",
      "Estranhos se levantam contra mim",
      "'Eis que Deus é o meu ajudador'",
      "Com ânimo voluntário te oferecerei sacrifícios",
      "'A minha vista se enche com a derrota dos meus inimigos'",
    ],
    chave: 4,
  },
  55: {
    resumo:
      "Ele queria asas de pomba para fugir, e a pior dor é que quem o traiu era amigo.",
    detalhe:
      "A descrição do pânico é física, com o coração em angústia e tremor tomando conta. O desejo de fugir para o deserto é dito sem vergonha. A virada vem quando ele identifica o traidor: não é inimigo declarado, é o seu igual, o companheiro com quem andava em concórdia à casa de Deus. O conselho final é entregar o peso, com a promessa de que ele sustenta.",
    marcos: [
      "'Quem me dera asas como de pomba!'",
      "Fugiria para longe e ficaria no deserto",
      "'Mas eras tu, homem meu igual, meu companheiro'",
      "Juntos andávamos à casa de Deus",
      "'Lança o teu cuidado sobre o Senhor, e ele te susterá'",
    ],
    chave: 22,
  },
  56: {
    resumo:
      "Escrito quando os filisteus o prenderam em Gate, com a imagem das lágrimas guardadas.",
    detalhe:
      "O refrão do salmo é uma frase de coragem honesta, que admite o medo antes de declarar a confiança. A imagem mais surpreendente está no versículo 8, com Deus contando os passos da fuga dele e guardando as lágrimas num odre, e a pergunta sobre se elas não estão no seu livro. É a afirmação de que o sofrimento é registrado e não esquecido.",
    marcos: [
      "'Em qualquer tempo que eu temer, hei de confiar em ti'",
      "Em Deus louvarei a sua palavra",
      "Tu contaste os meus passos vacilantes",
      "'Põe as minhas lágrimas no teu odre'",
      "'Não estão elas no teu livro?'",
    ],
    chave: 3,
  },
  57: {
    resumo:
      "Escondido numa caverna, ele fala em despertar a alvorada com música.",
    detalhe:
      "O título situa o salmo na fuga diante de Saul. A primeira metade descreve o perigo com imagens de leões e dentes como lanças e flechas, e no meio disso está a imagem do abrigo à sombra das asas até que passem as calamidades. A segunda metade vira louvor, e a frase mais bonita é a decisão de despertar a alva, e não esperar que ela chegue.",
    marcos: [
      "'À sombra das tuas asas me abrigo'",
      "Até que passem as calamidades",
      "A minha alma está entre leões",
      "'Disposto está o meu coração, ó Deus'",
      "'Despertarei a alva'",
    ],
    chave: 1,
  },
  58: {
    resumo:
      "Um ataque direto a juízes corruptos, com imagens de veneno e de surdez voluntária.",
    detalhe:
      "O salmo abre perguntando se os poderosos de fato falam justiça, e responde que no coração eles maquinam iniquidade e pesam a violência das próprias mãos. A imagem central é da víbora surda que tapa o ouvido para não ouvir a voz do encantador, ou seja, uma surdez escolhida. O tom é de imprecação e o fim afirma que há um Deus que julga na terra.",
    marcos: [
      "'Falais, na verdade, o que é justo?'",
      "No coração maquinais iniquidade",
      "Têm peçonha semelhante à da serpente",
      "Como a víbora surda que tapa os ouvidos",
      "'Há um Deus que julga na terra'",
    ],
    chave: 11,
  },
  59: {
    resumo:
      "Cercado em casa por homens que voltam à noite, ele chama Deus de alto refúgio.",
    detalhe:
      "O título situa a cena quando Saul mandou vigiar a casa para matá-lo. A imagem que se repete é dos inimigos que voltam à tarde e rodeiam a cidade uivando como cães. O contraste é a atitude dele, que se propõe a cantar de manhã, e o refrão final define Deus como força e alto refúgio, o que dá ao salmo uma estrutura de noite atravessada.",
    marcos: [
      "'Livra-me dos meus inimigos, ó meu Deus'",
      "Voltam à tarde, uivam como cães",
      "'Tu, porém, Senhor, te rirás deles'",
      "'Ó força minha, a ti darei atenção'",
      "'De manhã cantarei a tua benignidade'",
    ],
    chave: 16,
  },
  60: {
    resumo:
      "Depois de uma derrota, o povo diz que Deus os fez beber vinho de aturdimento.",
    detalhe:
      "É um lamento nacional que começa com acusação franca, dizendo que Deus os rejeitou e rompeu, e pedindo que restaure as brechas. A parte central é um oráculo em que Deus fala de repartir territórios com linguagem de desprezo pelos vizinhos, chamando Moabe de bacia de lavar. O fecho é realista sobre o valor do socorro humano, considerado vão.",
    marcos: [
      "'Tu nos rejeitaste, ó Deus, e nos dispersaste'",
      "Fizeste-nos beber vinho de aturdimento",
      "Deste um estandarte aos que te temem",
      "'Moabe é a minha bacia de lavar'",
      "'Vão é o socorro do homem'",
    ],
    chave: 11,
  },
  61: {
    resumo:
      "Clamando desde a extremidade da terra, ele pede para ser levado a uma rocha mais alta.",
    detalhe:
      "É um salmo curto e de imagens verticais. O pedido do versículo 2 admite um limite pessoal, porque ele reconhece que a rocha está acima do seu alcance e precisa ser conduzido até lá. As imagens seguintes são de torre forte e de abrigo debaixo das asas, e o fim contém votos a cumprir dia após dia.",
    marcos: [
      "'Desde a extremidade da terra clamo a ti'",
      "'Leva-me para a rocha que é mais alta do que eu'",
      "Tu és o meu refúgio e torre forte",
      "Habitarei no teu tabernáculo para sempre",
      "Assim cantarei louvores ao teu nome perpetuamente",
    ],
    chave: 2,
  },
  62: {
    resumo:
      "A palavra somente aparece várias vezes, e a balança pesa o homem contra o sopro.",
    detalhe:
      "O salmo é de espera silenciosa, e o advérbio traduzido por somente organiza o texto inteiro. A imagem mais forte é da balança, em que os homens de classe alta e baixa juntos pesam menos que um sopro. O conselho prático do fim é sobre dinheiro, dizendo que se as riquezas aumentarem não se deve pôr nelas o coração.",
    marcos: [
      "'Só em Deus, ó minha alma, espera silenciosa'",
      "Só ele é a minha rocha e a minha salvação",
      "Na balança subiriam mais leves que um sopro",
      "'Se as vossas riquezas aumentarem, não ponhais nelas o coração'",
      "'O poder pertence a Deus'",
    ],
    chave: 1,
  },
  63: {
    resumo:
      "Uma sede descrita em terra seca, e a lembrança de Deus nas vigílias da noite.",
    detalhe:
      "O título situa o salmo no deserto de Judá, o que torna a metáfora da terra sedenta bem literal. A comparação mais inesperada é a do versículo 3, em que a benignidade de Deus é declarada melhor do que a própria vida. O restante descreve a alma satisfeita como com tutano e gordura, e a prática de lembrar dele no leito durante as vigílias.",
    marcos: [
      "'A minha alma tem sede de ti'",
      "Em terra seca, exausta, sem água",
      "'A tua graça é melhor do que a vida'",
      "Como de banha e gordura farta-se a minha alma",
      "Lembro-me de ti no meu leito, nas vigílias da noite",
    ],
    chave: 3,
  },
  64: {
    resumo:
      "Sobre planos tramados em segredo, com flechas de palavras amargas.",
    detalhe:
      "O retrato é de conspiração organizada, com gente que aguça a língua como espada e dispara em oculto contra o íntegro, perguntando entre si quem os verá. O salmo responde com uma inversão: as flechas deles voltam contra eles mesmos, e a própria língua os faz tropeçar. O efeito descrito é público, com todos os que veem meneando a cabeça.",
    marcos: [
      "'Esconde-me do secreto conselho dos malfeitores'",
      "Afiam a língua como espada",
      "'Quem os verá?', dizem entre si",
      "As flechas se voltam contra eles próprios",
      "A própria língua os faz tropeçar",
    ],
    chave: 2,
  },
  65: {
    resumo:
      "Um salmo de colheita, com a imagem do ano coroado e das colinas cingidas de alegria.",
    detalhe:
      "A primeira parte trata de perdão e do privilégio de ser escolhido para habitar nos átrios. A segunda vira agricultura pura e é uma das descrições mais bonitas da chuva na Bíblia, com Deus visitando a terra, regando os sulcos, amolecendo os torrões e abençoando a germinação. A imagem final personifica os campos, com os vales se cobrindo de cereais e cantando.",
    marcos: [
      "'A ti, ó Deus, é devido o louvor em Sião'",
      "Tu visitas a terra e a regas",
      "'Coroas o ano da tua bondade'",
      "As veredas destilam abundância",
      "Os vales se cobrem de cereais e cantam de júbilo",
    ],
    chave: 11,
  },
  66: {
    resumo:
      "Um convite a vir e ver o que Deus fez, incluindo a passagem pelo fogo e pela água.",
    detalhe:
      "A primeira metade é coletiva e recorda o mar transformado em terra seca. No meio aparece a parte mais honesta, admitindo que Deus os provou e os refinou como prata, e que fizeram passar sobre as suas cabeças homens e fogo e água, antes de chegarem a um lugar espaçoso. A segunda metade muda para o singular e descreve alguém pagando votos pessoais.",
    marcos: [
      "'Vinde e vede as obras de Deus'",
      "Converteu o mar em terra seca",
      "'Provaste-nos, ó Deus; acrisolaste-nos como se acrisola a prata'",
      "Fizeste passar sobre as nossas cabeças o fogo e a água",
      "'Vinde, ouvi, e eu vos contarei'",
    ],
    chave: 12,
  },
  67: {
    resumo:
      "A bênção pedida não termina em quem pede, ela é para chegar às nações.",
    detalhe:
      "O salmo ecoa a bênção sacerdotal de Números 6, mas acrescenta uma finalidade: para que se conheça na terra o teu caminho. A lógica é missionária e vale reter, porque a bênção é pedida para ser repassada. A imagem final é agrícola, com a terra dando o seu fruto, e o refrão sobre os povos louvarem aparece duas vezes.",
    marcos: [
      "'Seja Deus gracioso para conosco e nos abençoe'",
      "'Para que se conheça na terra o teu caminho'",
      "Louvem-te os povos, ó Deus, louvem-te os povos todos",
      "A terra deu o seu fruto",
      "Todos os confins da terra o temerão",
    ],
    chave: 2,
  },
  68: {
    resumo:
      "Uma procissão triunfal, com Deus descrito como pai de órfãos e juiz de viúvas.",
    detalhe:
      "O salmo é longo e difícil, com imagens de marcha pelo deserto e de reis fugindo. O trecho mais lembrado está no começo, descrevendo um Deus que faz o solitário morar em família e liberta os cativos. Paulo cita o versículo 18 em Efésios 4. E há a observação de que quem anuncia a boa nova é uma grande multidão de mulheres.",
    marcos: [
      "'Levanta-se Deus, e os seus inimigos se dispersam'",
      "Pai de órfãos e juiz de viúvas",
      "'Deus faz que o solitário more em família'",
      "Subiste ao alto, levando cativo o cativeiro",
      "'Bendito seja o Senhor, que dia a dia leva a nossa carga'",
    ],
    chave: 6,
  },
  69: {
    resumo:
      "As águas chegaram ao pescoço, e o zelo pela casa de Deus é o que o consome.",
    detalhe:
      "É o segundo salmo mais citado no Novo Testamento, depois do 22. As imagens são de afogamento, com lodo profundo e sem onde firmar os pés, e de cansaço de gritar a ponto de a garganta secar. O versículo 9 é aplicado a Jesus na limpeza do templo, e o versículo 21, sobre fel na comida e vinagre na sede, é retomado na crucificação.",
    marcos: [
      "'As águas me sobem até o pescoço'",
      "Estou cansado de clamar, seca-se-me a garganta",
      "'O zelo da tua casa me consome'",
      "Deram-me fel por alimento e vinagre para a sede",
      "'Responde-me, Senhor, pois compassiva é a tua graça'",
    ],
    chave: 9,
  },
  70: {
    resumo: "Um pedido de urgência, praticamente idêntico ao fim do Salmo 40.",
    detalhe:
      "São cinco versículos e a palavra que os domina é pressa. Ele pede que Deus se apresse em livrá-lo e, no último versículo, repete o pedido dizendo que é pobre e necessitado. A repetição de um trecho já usado no saltério sugere que este salmo funcionava como oração curta de emergência, para quando não há tempo nem palavras.",
    marcos: [
      "'Apressa-te, ó Deus, em me livrar'",
      "Envergonhem-se os que procuram a minha vida",
      "Alegrem-se os que te buscam",
      "'Eu, porém, estou aflito e necessitado'",
      "'Não te detenhas'",
    ],
    chave: 1,
  },
  71: {
    resumo:
      "A oração de uma pessoa idosa, pedindo para não ser descartada quando as forças acabarem.",
    detalhe:
      "É o salmo da velhice e o pedido central aparece duas vezes, sobre não ser rejeitado no tempo da velhice nem desamparado quando se for a força. O argumento dele é biográfico: desde o ventre ele foi sustentado, e desde a mocidade Deus o ensinou. E há um propósito declarado para continuar vivendo, que é anunciar o poder de Deus à geração seguinte.",
    marcos: [
      "'Desde o ventre materno tu és o meu amparo'",
      "'Não me rejeites no tempo da velhice'",
      "Não me desampares quando se for a minha força",
      "'Desde a minha mocidade tu me tens ensinado'",
      "Até que eu anuncie o teu poder à geração vindoura",
    ],
    chave: 9,
  },
  72: {
    resumo:
      "Uma oração pelo rei, em que o critério de sucesso é o cuidado com os pobres.",
    detalhe:
      "O salmo fecha o segundo livro do saltério e é dedicado a Salomão. O pedido não é por expansão territorial, e sim por juízo e justiça, e o detalhamento é revelador: julgar os aflitos, salvar os filhos do necessitado e esmagar o opressor. A razão é dada no versículo 12, porque ele livra o necessitado que clama e aquele que não tem quem o ajude.",
    marcos: [
      "'Dá ao rei os teus juízos, ó Deus'",
      "Julgue ele com justiça os aflitos do povo",
      "Descerá como chuva sobre a erva ceifada",
      "'Livrará ele o necessitado que clama'",
      "Preciosa é aos olhos dele a vida dos necessitados",
    ],
    chave: 12,
  },
  73: {
    resumo:
      "Ele quase perdeu a fé invejando quem prospera errando, até entrar no santuário.",
    detalhe:
      "É um dos salmos mais honestos do livro. Ele descreve com detalhe a prosperidade dos soberbos, sem dores na morte, com corpo sadio e sem trabalho como os outros, e admite que os pés quase lhe resvalaram. A virada acontece num lugar específico, e não com um argumento: até que entrei no santuário. O fecho é uma das declarações mais íntimas do saltério, sobre não haver nada na terra que ele deseje além de Deus.",
    marcos: [
      "'Quanto a mim, quase me resvalaram os pés'",
      "Invejei os arrogantes, vendo a prosperidade dos ímpios",
      "'Até que entrei no santuário de Deus'",
      "'Todavia, estou sempre contigo; tu me seguras pela mão'",
      "'A quem tenho eu no céu senão a ti?'",
    ],
    chave: 17,
  },
  74: {
    resumo:
      "Um lamento diante do santuário queimado, com a queixa de não haver mais profeta.",
    detalhe:
      "O salmo descreve a destruição em detalhe arquitetônico, com machados e martelos quebrando as obras entalhadas. A parte mais dolorida é a constatação de que não há mais sinais e de que ninguém sabe até quando. No meio do lamento, ele recita a criação e a divisão do mar como argumento, lembrando a Deus que o dia e a noite são dele.",
    marcos: [
      "'Por que nos rejeitaste para sempre, ó Deus?'",
      "Com machados quebram as obras entalhadas",
      "'Já não vemos os nossos sinais'",
      "'Não há mais profeta, nem quem saiba até quando'",
      "'Teu é o dia, e tua é a noite'",
    ],
    chave: 9,
  },
  75: {
    resumo:
      "Um salmo sobre quem realmente promove alguém, com um cálice na mão de Deus.",
    detalhe:
      "A mensagem central é que a exaltação não vem do oriente, nem do ocidente, nem do deserto, e sim de Deus, que abate um e exalta outro. A imagem do cálice com vinho espumante e misturado, servido por Deus, é de juízo. E há o aviso aos arrogantes para não levantarem o chifre nem falarem com dura cerviz, expressões de soberba.",
    marcos: [
      "'Graças te damos, ó Deus, graças te damos'",
      "'Quando chegar o tempo determinado, julgarei retamente'",
      "'Não vem do oriente, nem do ocidente a exaltação'",
      "Deus é o Juiz: a um abate e a outro exalta",
      "Na mão do Senhor há um cálice de vinho espumante",
    ],
    chave: 7,
  },
  76: {
    resumo:
      "Depois da batalha, as armas são quebradas e a terra fica em silêncio.",
    detalhe:
      "O salmo celebra uma vitória defensiva e a imagem central é de desarmamento, com flechas, escudo e espada quebrados ali mesmo. A descrição dos valentes que dormiram o seu sono e não acharam as próprias mãos é de um torpor súbito. O fecho tem a observação de que Deus abate o ânimo dos príncipes e é tremendo para os reis da terra.",
    marcos: [
      "Deus é conhecido em Judá",
      "Ali quebrou as flechas, o escudo e a espada",
      "Os valentes dormiram o seu sono",
      "A terra temeu e se aquietou",
      "Ele abate o ânimo dos príncipes",
    ],
    chave: 3,
  },
  77: {
    resumo:
      "Ele não consegue dormir e faz perguntas difíceis, até decidir lembrar do passado.",
    detalhe:
      "A primeira metade é uma insônia com perguntas duras, sobre Deus rejeitar para sempre, ter cessado a misericórdia e ter esquecido de ser compassivo. O salmo não responde essas perguntas, e o que ele faz é mudar o foco de forma deliberada, decidindo recordar os feitos antigos. O final descreve a travessia do mar com a observação de que as pegadas de Deus não foram conhecidas.",
    marcos: [
      "'Recuso-me a ser consolado'",
      "'Rejeitará o Senhor para sempre?'",
      "'Esqueceu-se Deus de ser compassivo?'",
      "'Recordarei os feitos do Senhor'",
      "'As tuas pegadas não se conheceram'",
    ],
    chave: 11,
  },
  78: {
    resumo:
      "A história do povo contada aos filhos, com todos os erros incluídos.",
    detalhe:
      "É o segundo salmo mais longo e tem função pedagógica declarada: contar à geração vindoura o que ouviram dos pais, para que eles ponham em Deus a esperança e não sejam como os antepassados. O relato não poupa nada, incluindo o esquecimento das obras vistas com os próprios olhos e a frase incômoda sobre tentarem a Deus pedindo comida conforme o desejo.",
    marcos: [
      "'Não os encobriremos a seus filhos'",
      "Para que a geração vindoura os conheça",
      "Esqueceram-se das obras que ele fizera",
      "'Poderá Deus preparar-nos mesa no deserto?'",
      "Apascentou-os com integridade de coração",
    ],
    chave: 4,
  },
  79: {
    resumo:
      "Um lamento sobre o templo profanado e sobre corpos insepultos nas ruas.",
    detalhe:
      "A descrição é de cidade tomada, com os cadáveres dos servos servindo de pasto às aves e o sangue derramado como água ao redor de Jerusalém, sem ninguém para sepultar. A pergunta sobre até quando é acompanhada de um argumento que aparece várias vezes nos salmos comunitários, sobre as nações perguntarem onde está o Deus deles, o que transforma a desgraça do povo em questão de reputação divina.",
    marcos: [
      "As nações invadiram a tua herança",
      "O sangue foi derramado como água",
      "'Até quando, Senhor?'",
      "'Por que hão de dizer as nações: onde está o seu Deus?'",
      "'Não te lembres das nossas iniquidades passadas'",
    ],
    chave: 8,
  },
  80: {
    resumo:
      "Uma videira trazida do Egito foi plantada e agora está com a cerca derrubada.",
    detalhe:
      "O refrão do salmo se repete três vezes, pedindo restauração e que o rosto de Deus resplandeça. A metáfora central é agrícola e desenvolvida com cuidado: a videira foi trazida, o terreno preparado, as raízes se aprofundaram e os ramos chegaram ao rio. A pergunta é por que agora as cercas foram derrubadas, deixando qualquer um que passa colher dela.",
    marcos: [
      "'Ó Pastor de Israel, dá ouvidos'",
      "'Restaura-nos, ó Deus, e faze resplandecer o teu rosto'",
      "Trouxeste do Egito uma videira",
      "'Por que lhe derribaste as cercas?'",
      "Volta-te, ó Deus dos Exércitos, e olha para esta videira",
    ],
    chave: 19,
  },
  81: {
    resumo:
      "Um convite de festa que vira queixa, com a imagem da boca que se abre para ser enchida.",
    detalhe:
      "Começa com ordem de música e trombeta na festa, e no meio muda para a voz de Deus lembrando que tirou o ombro deles da carga. A frase mais generosa é a do versículo 10, mandando abrir bem a boca para que ele a encha. E logo depois vem a tristeza, porque o povo não quis ouvir, e Deus os entregou à dureza do próprio coração, para andarem nos seus conselhos.",
    marcos: [
      "Tocai a trombeta na Festa da Lua Nova",
      "'Tirei-lhe dos ombros a carga'",
      "'Abre bem a tua boca, e ta encherei'",
      "'O meu povo, porém, não me ouviu'",
      "'Entreguei-os à dureza do seu coração'",
    ],
    chave: 10,
  },
  82: {
    resumo:
      "Deus julga os juízes e pergunta até quando vão favorecer os culpados.",
    detalhe:
      "O salmo é uma cena de tribunal em que os poderosos são os réus. A acusação é específica: julgar injustamente e favorecer os perversos. A instrução dada é de uma clareza rara, mandando fazer justiça ao fraco e ao órfão, defender o aflito e o desamparado, e livrar o necessitado da mão dos perversos. O comentário final é que eles nada sabem e andam em trevas, enquanto os fundamentos da terra vacilam.",
    marcos: [
      "Deus assiste na congregação divina",
      "'Até quando julgareis injustamente?'",
      "'Fazei justiça ao fraco e ao órfão'",
      "'Socorrei o necessitado e o pobre'",
      "Todos os fundamentos da terra vacilam",
    ],
    chave: 3,
  },
  83: {
    resumo:
      "Uma lista de dez povos aliados, e o pedido para que Deus não fique calado.",
    detalhe:
      "O salmo nomeia uma coalizão de vizinhos que combinaram apagar Israel da memória. O pedido usa precedentes históricos, citando o que aconteceu com Sísera e com os príncipes de Midiã. As imagens são de instabilidade, com o pedido de que sejam como a palha diante do vento e como o pó que roda. E o objetivo final declarado é que saibam que só ele é o Altíssimo.",
    marcos: [
      "'Ó Deus, não te cales'",
      "Fizeram planos contra o teu povo",
      "'Vinde, apaguemos a nação'",
      "Faze-os como o pó que roda e como a palha diante do vento",
      "Para que saibam que só tu és o Altíssimo",
    ],
    chave: 1,
  },
  84: {
    resumo:
      "Até o pardal acha lugar perto do altar, e um dia lá vale mais que mil fora.",
    detalhe:
      "O salmo é de quem está longe do templo e tem saudade. As imagens são domésticas e delicadas, com a ave que encontrou casa e a andorinha que fez ninho para os filhotes junto aos altares. A parte mais bonita é a do vale de Baca, o vale do choro, que os peregrinos transformam em lugar de fontes ao atravessá-lo, e eles vão indo de força em força.",
    marcos: [
      "'Quão amáveis são os teus tabernáculos'",
      "Até o pardal encontrou casa e a andorinha, ninho",
      "Atravessando o vale de Baca, fazem dele um lugar de fontes",
      "Vão indo de força em força",
      "'Vale mais um dia nos teus átrios do que mil'",
    ],
    chave: 10,
  },
  85: {
    resumo:
      "Quatro qualidades se encontram e se beijam, como pessoas reconciliadas.",
    detalhe:
      "O salmo começa lembrando que Deus já perdoou antes, e por isso pede que faça de novo. A imagem central é do versículo 10 e é uma cena: a misericórdia e a verdade se encontram, e a justiça e a paz se beijam. Em seguida vem uma imagem de movimento vertical, com a verdade brotando da terra e a justiça olhando desde os céus.",
    marcos: [
      "'Foste favorável, Senhor, à tua terra'",
      "'Restaura-nos, ó Deus da nossa salvação'",
      "'Misericórdia e verdade se encontraram'",
      "'Justiça e paz se beijaram'",
      "A verdade brota da terra e a justiça olha desde os céus",
    ],
    chave: 10,
  },
  86: {
    resumo:
      "Um pedido de coração unido, feito por alguém que se declara pobre e necessitado.",
    detalhe:
      "O salmo é costurado com frases de outros salmos e da fórmula de Êxodo 34 sobre Deus ser compassivo e tardio em irar-se. O pedido mais original é o do versículo 11, que não pede alívio e sim integração: unir o coração para temer o nome, porque um coração dividido é o problema de fundo. E há a esperança de que todas as nações virão adorar.",
    marcos: [
      "'Inclina, Senhor, os ouvidos, porque estou aflito'",
      "'Tu és bom e compassivo'",
      "'Ensina-me, Senhor, o teu caminho'",
      "'Une o meu coração ao temor do teu nome'",
      "Todas as nações virão e adorarão diante de ti",
    ],
    chave: 11,
  },
  87: {
    resumo:
      "Uma cidade onde povos inimigos são registrados como nascidos lá.",
    detalhe:
      "É um salmo curto e surpreendente pela lista: Raabe, que é o Egito, Babilônia, Filístia, Tiro e Etiópia aparecem no registro de nascimento de Sião. São justamente os adversários históricos, e o texto diz que o Altíssimo mesmo a estabelecerá e que o Senhor conta ao registrar os povos que aquele nasceu ali. A imagem final é de cantores e flautistas dizendo que todas as fontes estão nela.",
    marcos: [
      "O Senhor ama as portas de Sião",
      "Farei menção de Raabe e de Babilônia",
      "'Este nasceu ali'",
      "O Altíssimo mesmo a estabelecerá",
      "'Todas as minhas fontes estão em ti'",
    ],
    chave: 5,
  },
  88: {
    resumo:
      "O único salmo que termina sem nenhuma luz, e a última palavra é escuridão.",
    detalhe:
      "É o mais escuro do saltério e não tem virada. Ele clama de dia e de noite, se descreve como quem já está contado entre os que descem à cova e sem forças, e diz que Deus o pôs na cova mais profunda. As perguntas sobre se os mortos louvam ficam sem resposta. O valor do salmo está exatamente em existir, porque ele dá lugar litúrgico à depressão que não passou.",
    marcos: [
      "'De dia e de noite clamo diante de ti'",
      "Sou contado entre os que descem à cova",
      "'Puseste-me na mais profunda cova'",
      "'Senhor, por que rejeitas a minha alma?'",
      "'Os meus amigos, dos quais me afastaste, são as trevas'",
    ],
    chave: 13,
  },
  89: {
    resumo:
      "Cinquenta versículos celebrando a promessa a Davi, e então a pergunta do que sobrou dela.",
    detalhe:
      "A primeira parte é um dos textos mais exuberantes sobre fidelidade divina, com a promessa de estabelecer a descendência para sempre. E então, na segunda metade, vem o confronto com a realidade, dizendo que o trono foi derribado por terra e a coroa profanada no pó. O salmo termina perguntando onde estão as antigas misericórdias juradas, sem resolver a tensão.",
    marcos: [
      "'Cantarei para sempre as misericórdias do Senhor'",
      "'Fiz aliança com o meu escolhido'",
      "'Tu, porém, o rejeitaste e desprezaste'",
      "Profanaste no pó a sua coroa",
      "'Onde estão, Senhor, as tuas antigas misericórdias?'",
    ],
    chave: 1,
  },
  90: {
    resumo:
      "Atribuído a Moisés, ele pede que aprendamos a contar os dias que temos.",
    detalhe:
      "É o salmo mais antigo por atribuição e abre o quarto livro. A comparação de escala é a imagem central, com mil anos sendo como o dia de ontem que passou e como a vigília da noite. A vida é comparada à erva que floresce de manhã e à tarde murcha. O pedido do versículo 12 não é por mais tempo e sim por sabedoria diante do tempo que há, e o fim pede que a obra das mãos seja confirmada.",
    marcos: [
      "'Senhor, tu tens sido o nosso refúgio de geração em geração'",
      "Mil anos são como o dia de ontem que passou",
      "Os dias da nossa vida são setenta anos",
      "'Ensina-nos a contar os nossos dias'",
      "'Confirma sobre nós as obras das nossas mãos'",
    ],
    chave: 12,
  },
  91: {
    resumo:
      "O salmo do abrigo, com asas, escudo e anjos, e uma promessa de resposta na angústia.",
    detalhe:
      "As imagens de proteção se acumulam, com refúgio, fortaleza, penas, asas, escudo e broquel. O salmo é citado pelo tentador no deserto, na parte sobre os anjos, o que mostra que um texto de conforto pode ser usado de forma errada. O fecho muda de voz e é Deus quem fala, e a promessa não é ausência de angústia e sim companhia dentro dela.",
    marcos: [
      "'O que habita no esconderijo do Altíssimo'",
      "'Ele te cobrirá com as suas penas'",
      "Não temerás os terrores da noite",
      "Aos seus anjos ordenará a teu respeito",
      "'Na angústia estarei com ele'",
    ],
    chave: 1,
  },
  92: {
    resumo:
      "Um cântico para o sábado, com a promessa de dar fruto ainda na velhice.",
    detalhe:
      "O salmo abre dizendo ser bom anunciar a benignidade de manhã e a fidelidade à noite, e traz uma observação sobre o homem néscio que não entende o que está diante dele. A imagem final é botânica e generosa: os justos florescem como a palmeira e crescem como o cedro, e mesmo na velhice ainda dão frutos, sendo cheios de seiva e verdor.",
    marcos: [
      "'Bom é render graças ao Senhor'",
      "Anunciar de manhã a benignidade e à noite a fidelidade",
      "O homem néscio não entende isso",
      "O justo florescerá como a palmeira",
      "'Na velhice darão ainda frutos'",
    ],
    chave: 14,
  },
  93: {
    resumo:
      "Cinco versículos sobre o trono que é mais firme do que o barulho das águas.",
    detalhe:
      "O salmo abre a série dos que proclamam que o Senhor reina. A estrutura é de contraste: os rios levantam a voz e as ondas se elevam, e mais poderoso que o fragor das muitas águas é o Senhor nas alturas. O mar é símbolo de caos, e a afirmação é de estabilidade em meio a ele. O fecho liga trono a testemunhos, dizendo que eles são muito fiéis.",
    marcos: [
      "'O Senhor reina, revestido de majestade'",
      "O mundo está firmado e não vacila",
      "Os rios levantam a voz e o seu fragor",
      "Mais poderoso é o Senhor nas alturas",
      "'Os teus testemunhos são muito fiéis'",
    ],
    chave: 4,
  },
  94: {
    resumo:
      "Contra quem oprime achando que Deus não vê, com um argumento sobre ouvidos e olhos.",
    detalhe:
      "A acusação é sobre matar viúvas e estrangeiros e assassinar órfãos dizendo que o Senhor não vê. O argumento de resposta é lógico e certeiro: quem fez o ouvido, acaso não ouvirá, quem formou o olho, acaso não verá. No meio do salmo há uma confissão pessoal delicada, dizendo que quando o pé lhe resvalava a benignidade de Deus o amparava, e que no meio das muitas inquietações as consolações o alegravam.",
    marcos: [
      "'Até quando os ímpios exultarão?'",
      "Matam a viúva e o estrangeiro",
      "'Acaso, não ouvirá aquele que fez o ouvido?'",
      "'Quando eu dizia: resvala-me o pé'",
      "'As tuas consolações me alegram a alma'",
    ],
    chave: 9,
  },
  95: {
    resumo:
      "Um convite alegre a cantar que termina em advertência sobre não endurecer o coração.",
    detalhe:
      "A primeira parte é entusiasmada, com ordens de cantar e de vir adorar de joelhos. A virada acontece no meio, quando a voz de Deus entra citando Meribá e Massá, e a frase que Hebreus retoma três vezes é a do hoje, sobre não endurecer o coração como naquele dia. O salmo une adoração e obediência na mesma respiração, sem separar as duas.",
    marcos: [
      "'Vinde, cantemos ao Senhor'",
      "'Ele é o nosso Deus, e nós, povo do seu pasto'",
      "'Hoje, se ouvirdes a sua voz'",
      "'Não endureçais o coração como em Meribá'",
      "Quarenta anos estive desgostado com aquela geração",
    ],
    chave: 7,
  },
  96: {
    resumo:
      "Um cântico novo, com a ordem de anunciar entre as nações e uma natureza que aplaude.",
    detalhe:
      "O salmo tem alcance internacional declarado, mandando anunciar a salvação de dia em dia e proclamar a glória entre as nações. A crítica aos deuses dos povos é direta, chamando-os de nada, enquanto o Senhor fez os céus. O fim personifica a criação, com os céus se alegrando, o mar bramindo, o campo exultando e as árvores do bosque cantando de júbilo diante de quem vem julgar.",
    marcos: [
      "'Cantai ao Senhor um cântico novo'",
      "Anunciai entre as nações a sua glória",
      "Todos os deuses dos povos não passam de ídolos",
      "Adorai o Senhor na beleza da sua santidade",
      "Então, todas as árvores do bosque cantarão de júbilo",
    ],
    chave: 1,
  },
  97: {
    resumo:
      "O Senhor reina, e o cenário é de nuvens, fogo e montes derretendo como cera.",
    detalhe:
      "A teofania é grandiosa, com nuvens e escuridão ao redor e relâmpagos alumiando o mundo. No meio da linguagem cósmica há um conselho ético simples, mandando que os que amam o Senhor odeiem o mal, com a promessa de que ele guarda a alma dos seus santos. A imagem final é agrícola e delicada, com a luz semeada para o justo e a alegria para os retos de coração.",
    marcos: [
      "'O Senhor reina, regozije-se a terra'",
      "Nuvens e escuridão o rodeiam",
      "Os montes derretem-se como cera",
      "'Vós que amais o Senhor, detestai o mal'",
      "'A luz difunde-se para o justo'",
    ],
    chave: 10,
  },
  98: {
    resumo:
      "Outro cântico novo, com rios batendo palmas e montes cantando juntos.",
    detalhe:
      "O salmo celebra uma salvação que foi vista por todos os confins da terra, e por isso a convocação é universal. A parte final é a mais visual do grupo, com o mar e tudo o que ele contém bramindo, os rios batendo palmas e os montes cantando juntos. O motivo do entusiasmo é declarado no último versículo, porque ele vem julgar a terra com justiça e equidade.",
    marcos: [
      "'Cantai ao Senhor um cântico novo'",
      "Todos os confins da terra viram a salvação",
      "Celebrai com harpa e com a voz de canto",
      "'Os rios batam palmas'",
      "Ele julgará o mundo com justiça",
    ],
    chave: 8,
  },
  99: {
    resumo:
      "Três vezes a palavra santo, e a lembrança de que ele perdoou e também castigou.",
    detalhe:
      "O salmo fecha a série dos que proclamam o reinado e é o mais solene deles. O refrão sobre a santidade aparece três vezes, marcando as divisões. A parte mais interessante é a lembrança de Moisés, Arão e Samuel como pessoas que clamaram e foram atendidas, e a frase que segue reconhece que Deus os perdoou e ao mesmo tempo tomou vingança dos seus feitos.",
    marcos: [
      "'O Senhor reina; tremam os povos'",
      "Louvem o teu nome grande e tremendo, pois é santo",
      "Moisés, Arão e Samuel invocavam o seu nome",
      "'Tu os perdoaste, ainda que punindo os seus feitos'",
      "Exaltai o Senhor, nosso Deus",
    ],
    chave: 9,
  },
  100: {
    resumo:
      "Cinco versículos de convite, com portas, átrios e uma razão declarada no fim.",
    detalhe:
      "É o salmo de entrada por excelência e provavelmente acompanhava a procissão ao templo. Os verbos são todos de movimento e de voz: celebrai, servi, entrai, rendei graças e bendizei. O detalhe teológico está no meio, na afirmação de que foi ele quem nos fez e não nós a nós mesmos, e a razão final é a bondade e a fidelidade que dura de geração em geração.",
    marcos: [
      "'Celebrai com júbilo ao Senhor, todas as terras'",
      "'Ele nos fez, e dele somos'",
      "Somos o seu povo e ovelhas do seu pasto",
      "'Entrai por suas portas com ações de graças'",
      "A sua fidelidade dura de geração em geração",
    ],
    chave: 3,
  },
  101: {
    resumo:
      "Um compromisso de governo que começa dentro de casa e trata de quem entra nela.",
    detalhe:
      "O salmo é uma declaração de política pessoal e administrativa, e o detalhe que o distingue é o alcance doméstico, com a frase sobre andar em integridade dentro da própria casa. As decisões listadas são sobre com quem conviver: não se assentar com falsos, afastar o coração perverso e cortar quem calunia o próximo às escondidas. Os olhos ficam sobre os fiéis da terra, para que habitem com ele.",
    marcos: [
      "'Andarei com integridade de coração dentro da minha casa'",
      "Não porei coisa injusta diante dos olhos",
      "Destruirei quem calunia o próximo às escondidas",
      "'Os meus olhos procurarão os fiéis da terra'",
      "Quem anda em caminho reto me servirá",
    ],
    chave: 2,
  },
  102: {
    resumo:
      "Escrito por um aflito que desfalece, e compara a própria vida à sombra do entardecer.",
    detalhe:
      "O título é incomum e diz que é uma oração do aflito quando desfalece e derrama a sua queixa. As imagens de solidão são precisas, com o pássaro solitário no telhado e o pelicano no deserto. A virada não elimina a dor e muda a escala, contrapondo dias que se desvanecem como fumaça à permanência de Deus. O fim é citado em Hebreus 1 sobre os céus envelhecerem como roupa.",
    marcos: [
      "'Os meus dias se desvanecem como fumaça'",
      "Sou como o pelicano no deserto",
      "'Velo e sou como o pássaro solitário no telhado'",
      "'Tu, porém, Senhor, permaneces para sempre'",
      "Eles perecerão, mas tu permaneces",
    ],
    chave: 12,
  },
  103: {
    resumo:
      "Ele manda a própria alma lembrar dos benefícios, e mede o perdão em distância.",
    detalhe:
      "O salmo começa e termina com a ordem dirigida a si mesmo, o que sugere que agradecer também é disciplina. A lista de benefícios é concreta, incluindo perdão, cura, resgate, coroa e saciedade. As duas comparações mais lembradas são geográficas e familiares: a distância entre o oriente e o ocidente para as transgressões, e a compaixão de um pai pelos filhos. E há o lembrete de que ele conhece a nossa estrutura e se lembra de que somos pó.",
    marcos: [
      "'Bendize, ó minha alma, ao Senhor'",
      "'Não te esqueças de nem um só de seus benefícios'",
      "'Quanto dista o Oriente do Ocidente'",
      "'Como um pai se compadece de seus filhos'",
      "'Ele conhece a nossa estrutura e sabe que somos pó'",
    ],
    chave: 12,
  },
  104: {
    resumo:
      "Um hino à criação que acompanha o dia inteiro, incluindo o turno da noite.",
    detalhe:
      "O salmo segue mais ou menos a ordem de Gênesis 1 e é cheio de detalhe naturalista: as fontes que correm entre os montes, as aves que cantam entre a ramagem, as cabras monteses nos montes altos e os leões que rugem à noite buscando comida. O versículo 23 fecha o ciclo com o homem saindo para o trabalho até a tarde. A dependência de tudo é dita sem rodeio, porque quando ele esconde o rosto eles se perturbam.",
    marcos: [
      "Cobre-se de luz como de um manto",
      "Fizeste a lua para marcar o tempo",
      "Os leões rugem pela presa durante a noite",
      "'Sai o homem para o seu trabalho até à tarde'",
      "'Quão variadas são as tuas obras, Senhor!'",
    ],
    chave: 24,
  },
  105: {
    resumo:
      "A história contada pelo lado do que Deus fez, desde Abraão até a entrada na terra.",
    detalhe:
      "É o par positivo do salmo seguinte. O relato percorre a aliança com Abraão, a história de José vendido como escravo com os pés apertados por grilhões, a permanência no Egito, as pragas e a saída com prata e ouro. O detalhe que costuma passar despercebido é o motivo declarado no fim, sobre eles receberem a terra para que guardassem os estatutos e observassem as leis.",
    marcos: [
      "'Lembrou-se da sua aliança para sempre'",
      "José foi vendido como escravo",
      "Apertaram-lhe os pés com grilhões",
      "Tirou-os com prata e ouro",
      "Deu-lhes as terras para que guardassem os seus preceitos",
    ],
    chave: 8,
  },
  106: {
    resumo:
      "A mesma história, agora pelo lado dos erros, e o refrão é que eles se esqueceram.",
    detalhe:
      "O salmo abre o fecho do quarto livro e é uma confissão nacional. A lista de falhas é longa e inclui o esquecimento das maravilhas no Egito, a impaciência no deserto, o bezerro em Horebe e os sacrifícios de crianças. A frase mais dura é a do versículo 15, dizendo que Deus atendeu ao pedido deles e enviou magreza às suas almas. E mesmo assim o salmo termina pedindo que ele os ajunte de entre as nações.",
    marcos: [
      "'Pecamos como os nossos pais'",
      "Esqueceram-se das maravilhas no Egito",
      "'Deu-lhes o que pediram, mas enviou magreza às suas almas'",
      "Trocaram a sua glória pela figura de um boi",
      "'Ajunta-nos dentre as nações'",
    ],
    chave: 15,
  },
  107: {
    resumo:
      "Quatro histórias de gente em apuros, todas com o mesmo refrão de clamor e resgate.",
    detalhe:
      "O salmo abre o quinto livro e é construído com repetição: perdidos no deserto, presos na escuridão, doentes por causa dos próprios caminhos e marinheiros numa tempestade. Em todos os casos a estrutura é idêntica, com o clamor na angústia e o livramento. A cena da tempestade é a mais descritiva, com gente subindo aos céus e descendo aos abismos, e cambaleando como ébrio.",
    marcos: [
      "'Digam-no os remidos do Senhor'",
      "Andavam errantes no deserto e não achavam cidade",
      "Assentados nas trevas e à sombra da morte",
      "Descem ao mar em navios e veem as maravilhas nas águas",
      "'Ele fez cessar a tormenta, e acalmaram-se as ondas'",
    ],
    chave: 9,
  },
  108: {
    resumo:
      "Um salmo montado com trechos de dois outros, e ainda assim com propósito próprio.",
    detalhe:
      "A primeira metade vem do Salmo 57 e a segunda do 60. O interessante é o critério da montagem: ele pega a parte de louvor de um e a parte de pedido do outro, e o resultado é uma oração que começa com o coração firme e termina reconhecendo que o socorro do homem é vão. A repetição mostra que os salmos eram material vivo, reaproveitado conforme a necessidade.",
    marcos: [
      "'Preparado está o meu coração, ó Deus'",
      "'Despertarei a alva'",
      "A tua misericórdia é grande acima dos céus",
      "'Dá-nos auxílio na angústia'",
      "'Vão é o socorro do homem'",
    ],
    chave: 1,
  },
  109: {
    resumo:
      "O mais duro dos salmos de imprecação, escrito por quem pagou amor com acusação.",
    detalhe:
      "O salmo incomoda e é importante justamente por isso, porque coloca a vingança em forma de oração em vez de ação. A motivação aparece no versículo 4, dizendo que em troca do amor dele eles se tornaram adversários, e que lhe pagaram mal por bem. Pedro cita parte dele em Atos 1 sobre Judas. O fim muda de tom e pede socorro, com a afirmação de que Deus está à direita do necessitado.",
    marcos: [
      "'Ó Deus do meu louvor, não te cales'",
      "'Em paga do meu amor me hostilizam'",
      "Retribuem-me mal por bem",
      "'Sou pobre e necessitado, e o meu coração está ferido'",
      "'Ele se põe à direita do pobre'",
    ],
    chave: 4,
  },
  110: {
    resumo:
      "O salmo mais citado no Novo Testamento, com um sacerdote segundo a ordem de Melquisedeque.",
    detalhe:
      "São sete versículos e eles reaparecem dezenas de vezes no Novo Testamento. O primeiro é usado por Jesus numa discussão sobre a identidade do Messias, porque Davi chama de Senhor alguém que seria seu descendente. O versículo 4 é a base de toda a argumentação de Hebreus, ligando realeza e sacerdócio numa figura só, referindo-se ao personagem misterioso de Gênesis 14.",
    marcos: [
      "'Disse o Senhor ao meu Senhor: assenta-te à minha direita'",
      "O teu povo será voluntário no dia do teu poder",
      "'Tu és sacerdote para sempre'",
      "'Segundo a ordem de Melquisedeque'",
      "O Senhor à tua direita esmagará os reis",
    ],
    chave: 4,
  },
  111: {
    resumo:
      "Um acróstico sobre as obras de Deus, que termina onde Provérbios começa.",
    detalhe:
      "Cada meia linha começa por uma letra do alfabeto hebraico em ordem. O tema são as obras, descritas como grandes e investigadas por todos os que nelas se comprazem. Há uma observação sobre Deus dar mantimento aos que o temem e lembrar-se da aliança. O último versículo é a frase que também abre Provérbios, sobre o temor do Senhor ser o princípio da sabedoria.",
    marcos: [
      "'Render-te-ei graças de todo o coração'",
      "Grandes são as obras do Senhor",
      "Ele faz memoráveis as suas maravilhas",
      "Dá mantimento aos que o temem",
      "'O temor do Senhor é o princípio da sabedoria'",
    ],
    chave: 10,
  },
  112: {
    resumo:
      "O par do anterior, agora descrevendo a pessoa que teme a Deus.",
    detalhe:
      "Os dois salmos são gêmeos na forma acróstica e complementares no conteúdo, porque o 111 fala das obras de Deus e este das obras de quem o teme. O retrato é concreto: ele se compadece e empresta, dispõe as suas coisas com justiça, e reparte com os necessitados. A frase mais lembrada é a do versículo 7, sobre não temer más notícias, porque o coração está firme e confiante.",
    marcos: [
      "'Bem-aventurado o homem que teme ao Senhor'",
      "Nasce luz nas trevas para os retos",
      "Ele se compadece, empresta e dispõe as coisas com justiça",
      "'Não se atemoriza de más notícias'",
      "Distribui, dá aos necessitados",
    ],
    chave: 7,
  },
  113: {
    resumo:
      "Deus se abaixa para ver, e o que ele faz é levantar o pobre do pó.",
    detalhe:
      "O salmo abre a série cantada na Páscoa judaica. A construção é de altura e descida: ele está elevado acima de todas as nações e mesmo assim se inclina para ver o que está nos céus e na terra. E o resultado dessa inclinação é social, levantando o necessitado do pó e o pobre do monturo, para assentá-lo com os príncipes. O fecho fala da mulher estéril que passa a ser mãe alegre de filhos.",
    marcos: [
      "'Louvado seja o nome do Senhor, desde agora e para sempre'",
      "Quem há semelhante ao Senhor nosso Deus?",
      "Ele se inclina para ver o que se passa",
      "'Levanta o necessitado do pó'",
      "Faz a mulher estéril viver em família, mãe alegre de filhos",
    ],
    chave: 7,
  },
  114: {
    resumo:
      "O mar viu e fugiu, e os montes saltaram como carneiros.",
    detalhe:
      "São oito versículos e o salmo é quase todo em imagens de natureza que reage. O mar foge, o Jordão volta atrás, os montes saltam. E então o poema faz algo divertido, interpelando diretamente cada elemento e perguntando o que houve com eles. A resposta é dada no fim, mandando a terra tremer diante do Senhor, que converte a rocha em manancial de águas.",
    marcos: [
      "Quando Israel saiu do Egito",
      "'O mar viu isto e fugiu'",
      "Os montes saltaram como carneiros",
      "'Que tens, ó mar, que assim foges?'",
      "Ele converte a rocha em manancial de águas",
    ],
    chave: 7,
  },
  115: {
    resumo:
      "Não a nós, e uma crítica aos ídolos que têm boca, olhos e ouvidos sem uso.",
    detalhe:
      "A abertura é um pedido de que a glória não fique com quem ora. A resposta à pergunta das nações sobre onde está o Deus deles é que ele está nos céus e faz o que lhe agrada. A sátira aos ídolos é anatômica e termina com a observação mais afiada do salmo, dizendo que aqueles que os fazem se tornam como eles, ou seja, a gente vira o que adora.",
    marcos: [
      "'Não a nós, Senhor, mas ao teu nome dá glória'",
      "'Onde está o seu Deus?', dizem as nações",
      "Os ídolos têm boca e não falam, olhos e não veem",
      "'Tornem-se como eles os que os fazem'",
      "'Os céus são os céus do Senhor, mas a terra deu-a aos filhos dos homens'",
    ],
    chave: 1,
  },
  116: {
    resumo:
      "Amo o Senhor porque ele ouviu, e a pergunta é o que retribuir por tudo isso.",
    detalhe:
      "O salmo é uma ação de graças pessoal por ter escapado da morte, com os laços da morte cercando e as angústias do inferno apertando. A resposta à pergunta sobre o que retribuir é curiosa, porque ele diz que tomará o cálice da salvação, ou seja, recebe mais em vez de dar. E há a frase sobre ser preciosa aos olhos do Senhor a morte dos seus santos.",
    marcos: [
      "'Amo o Senhor, porque ele ouve a minha voz'",
      "Os laços da morte me cercaram",
      "'Volta, minha alma, ao teu repouso'",
      "'Que darei eu ao Senhor por todos os seus benefícios?'",
      "'Preciosa é aos olhos do Senhor a morte dos seus santos'",
    ],
    chave: 12,
  },
  117: {
    resumo: "O capítulo mais curto da Bíblia, com dois versículos e alcance universal.",
    detalhe:
      "São duas linhas e mesmo assim o salmo tem estrutura completa, com convocação e motivo. O detalhe que importa é para quem ele é dirigido: todas as nações e todos os povos, e não apenas Israel. Paulo o cita em Romanos 15 exatamente por causa disso, ao argumentar que os gentios também glorificam a Deus. A razão dada é a benignidade e a fidelidade que dura para sempre.",
    marcos: [
      "'Louvai ao Senhor, vós todas as nações'",
      "Exaltai-o, todos os povos",
      "Poderosa é a sua misericórdia para conosco",
      "A fidelidade do Senhor subsiste para sempre",
      "Aleluia",
    ],
    chave: 1,
  },
  118: {
    resumo:
      "Da angústia para um lugar espaçoso, com a pedra rejeitada virando pedra angular.",
    detalhe:
      "O salmo tem refrão de multidão e provavelmente era cantado em procissão, com pedidos para abrirem as portas da justiça. O versículo 22 é citado por Jesus e pelos apóstolos com frequência, aplicando a imagem da pedra descartada pelos construtores. E há duas frases que atravessaram a história: a que prefere confiar no Senhor a confiar em príncipes, e a sobre este ser o dia que o Senhor fez.",
    marcos: [
      "'Melhor é buscar refúgio no Senhor do que confiar em príncipes'",
      "'Da angústia invoquei o Senhor, e ele me pôs em lugar espaçoso'",
      "'A pedra que os construtores rejeitaram'",
      "Essa veio a ser a principal pedra angular",
      "'Este é o dia que o Senhor fez'",
    ],
    chave: 22,
  },
  119: {
    resumo:
      "O capítulo mais longo da Bíblia, com vinte e duas estrofes sobre a palavra de Deus.",
    detalhe:
      "Cada uma das vinte e duas estrofes tem oito versículos que começam pela mesma letra do alfabeto hebraico, em ordem. Quase todos os versículos usam um sinônimo para a palavra, como lei, testemunhos, preceitos, estatutos, mandamentos e juízos. O salmo não é abstrato: ele fala de aflição, de perseguição, de noites em claro e de lágrimas, e a lei aparece como companhia dentro disso, e não como teoria.",
    marcos: [
      "'Como purificará o jovem o seu caminho?'",
      "'Escondi no coração a tua palavra'",
      "'Foi-me bom ter eu passado pela aflição'",
      "'Lâmpada para os meus pés é a tua palavra'",
      "'Desviei-me como ovelha perdida; busca o teu servo'",
    ],
    chave: 105,
  },
  120: {
    resumo:
      "O primeiro cântico de subida, escrito por quem está cansado de viver entre brigas.",
    detalhe:
      "Começa a série dos quinze cânticos de romaria, cantados por quem subia a Jerusalém. Este é o mais desconfortável deles, porque o peregrino ainda está longe e cercado de conflito. A queixa é sobre lábios mentirosos e língua enganadora, e ele descreve o próprio lugar de morada com nomes de povos distantes, para dizer que se sente estrangeiro. A última linha é um resumo amargo de convivência difícil.",
    marcos: [
      "'Na minha angústia clamei ao Senhor'",
      "'Livra-me, Senhor, dos lábios mentirosos'",
      "Ai de mim, que peregrino em Meseque",
      "'Eu sou pela paz'",
      "'Mas, quando falo, eles são pela guerra'",
    ],
    chave: 7,
  },
  121: {
    resumo:
      "Levantando os olhos para os montes, a pergunta é de onde virá o socorro.",
    detalhe:
      "É o cântico de subida mais conhecido e a primeira frase costuma ser mal lida, porque ela é pergunta e não resposta: os montes eram justamente onde ficavam os santuários de outros deuses, e o salmista pergunta antes de responder. O tema é guarda, e a palavra se repete seis vezes. A promessa mais tocante está no fim, cobrindo saída e entrada, desde agora e para sempre.",
    marcos: [
      "'Elevo os olhos para os montes: de onde me virá o socorro?'",
      "'O meu socorro vem do Senhor'",
      "Não deixará vacilar o teu pé",
      "'Aquele que te guarda não dormirá'",
      "'O Senhor guardará a tua saída e a tua entrada'",
    ],
    chave: 2,
  },
  122: {
    resumo:
      "A alegria de quem foi convidado a ir, e uma oração pela paz da cidade.",
    detalhe:
      "O salmo é de chegada, com os pés já parados dentro das portas. A descrição de Jerusalém como cidade bem unida sugere tanto arquitetura quanto convivência. O fecho é uma oração pela paz, e o jogo de palavras com o nome da cidade é intencional no hebraico. O motivo final que ele dá para desejar o bem dali não é religioso e sim afetivo, por amor dos irmãos e amigos.",
    marcos: [
      "'Alegrei-me quando me disseram: vamos à Casa do Senhor'",
      "Os nossos pés estão dentro das tuas portas",
      "Jerusalém está edificada como cidade bem unida",
      "'Orai pela paz de Jerusalém'",
      "'Por amor dos meus irmãos e amigos, direi: paz esteja em ti'",
    ],
    chave: 6,
  },
  123: {
    resumo:
      "Os olhos de um servo na mão do senhor, com um pedido curto contra o desprezo.",
    detalhe:
      "A imagem é de dependência e de leitura de gestos, porque o servo observa a mão para saber o que fazer. O salmo tem apenas quatro versículos e a motivação está no fim, com a queixa de estarem fartos do escárnio dos que estão à vontade e do desprezo dos soberbos. É uma oração curta de quem está cansado de ser humilhado.",
    marcos: [
      "'Para ti levanto os olhos, ó tu que habitas nos céus'",
      "Como os olhos dos servos na mão dos seus senhores",
      "'Assim os nossos olhos estão no Senhor'",
      "Estamos fartos do escárnio",
      "'Compadece-te de nós, Senhor'",
    ],
    chave: 2,
  },
  124: {
    resumo:
      "Se não fosse o Senhor, e o salmo descreve o que teria acontecido.",
    detalhe:
      "A construção é toda condicional e retrospectiva, imaginando o desfecho alternativo com as águas cobrindo e a torrente passando por cima da alma. As imagens de resgate são duas e muito boas: a presa arrancada dos dentes e o pássaro que escapa do laço do passarinheiro, com o laço quebrado. O fecho atribui o socorro ao nome de quem fez o céu e a terra.",
    marcos: [
      "'Se não fora o Senhor, que esteve do nosso lado'",
      "As águas teriam nos submergido",
      "Bendito o Senhor, que não nos deu por presa aos seus dentes",
      "'Salvou-se a nossa alma como um pássaro do laço'",
      "O laço se quebrou, e nós nos vimos livres",
    ],
    chave: 8,
  },
  125: {
    resumo:
      "Quem confia é como um monte que não se abala, e a cidade é cercada de montanhas.",
    detalhe:
      "A comparação é geográfica e observável, porque Jerusalém é de fato rodeada de montes. O argumento é analógico: assim como os montes cercam a cidade, o Senhor cerca o seu povo. Há também uma observação realista sobre o cetro da impiedade não repousar para sempre sobre a herança dos justos, com a razão declarada, para que eles não estendam as mãos à iniquidade.",
    marcos: [
      "Os que confiam no Senhor são como o monte Sião",
      "Jerusalém está rodeada de montanhas",
      "'Assim o Senhor está em volta do seu povo'",
      "O cetro da impiedade não repousará para sempre",
      "'Paz sobre Israel'",
    ],
    chave: 2,
  },
  126: {
    resumo:
      "A volta do cativeiro pareceu sonho, e quem semeia com lágrimas colhe com alegria.",
    detalhe:
      "A primeira metade é memória de uma alegria tão grande que eles mesmos duvidavam, com a boca cheia de riso e as nações comentando o que tinha sido feito. A segunda metade pede que a restauração se complete, comparando-a às torrentes do Neguebe, que enchem de repente um leito seco. A imagem final é agrícola e paciente, com o semeador chorando ao sair e voltando com cânticos.",
    marcos: [
      "'Parecíamos como os que sonham'",
      "A boca se encheu de riso e a língua, de júbilo",
      "'Muda a nossa sorte, como as torrentes no Neguebe'",
      "'Os que com lágrimas semeiam, com júbilo ceifarão'",
      "Voltará com júbilo, trazendo os seus feixes",
    ],
    chave: 5,
  },
  127: {
    resumo:
      "Sem o Senhor a construção é inútil, e ele dá o sono aos seus amados.",
    detalhe:
      "O salmo é atribuído a Salomão e trata de esforço. A crítica não é ao trabalho e sim ao excesso ansioso, descrito como levantar de madrugada, deitar tarde e comer o pão que custa a obter. A frase sobre o sono dado aos amados é o contraponto, porque dormir é justamente o que a ansiedade impede. A segunda metade trata de filhos com a imagem de flechas na mão do guerreiro.",
    marcos: [
      "'Se o Senhor não edificar a casa, em vão trabalham os que a edificam'",
      "Inútil vos será levantar de madrugada",
      "'Aos seus amados ele o dá enquanto dormem'",
      "Os filhos são herança do Senhor",
      "Como flechas na mão do guerreiro",
    ],
    chave: 1,
  },
  128: {
    resumo:
      "Uma bênção doméstica, com videira, oliveiras novas e netos.",
    detalhe:
      "O salmo descreve a vida boa em termos bem concretos: comer do trabalho das próprias mãos, a esposa como videira frutífera no interior da casa e os filhos como plantas de oliveira ao redor da mesa. Não há nada grandioso, e é esse o ponto. O fecho amplia da casa para a cidade, desejando que a pessoa veja o bem de Jerusalém e viva para ver os filhos dos seus filhos.",
    marcos: [
      "'Bem-aventurado aquele que teme ao Senhor'",
      "Do trabalho das tuas mãos comerás",
      "A tua mulher será como videira frutífera",
      "Os filhos, como plantas de oliveira ao redor da mesa",
      "'Vejas os filhos de teus filhos'",
    ],
    chave: 2,
  },
  129: {
    resumo:
      "Afligiram-me muito desde a mocidade, mas não prevaleceram contra mim.",
    detalhe:
      "A imagem de abertura é agrícola e violenta, com lavradores arando sobre as costas e abrindo sulcos compridos. O salmo repete a frase sobre a aflição duas vezes, como quem conta algo que precisa ser dito em voz alta. A segunda metade deseja que os adversários sejam como a erva dos telhados, que seca antes de crescer, e que o ceifeiro não consegue encher a mão com ela.",
    marcos: [
      "'Muito me angustiaram desde a minha mocidade'",
      "'Porém não prevaleceram contra mim'",
      "Lavradores araram sobre as minhas costas",
      "Sejam como a erva dos telhados",
      "Com ela o segador não enche a mão",
    ],
    chave: 2,
  },
  130: {
    resumo:
      "Das profundezas, um clamor que espera mais que os guardas esperam a manhã.",
    detalhe:
      "É o sexto salmo penitencial. A pergunta do versículo 3 é sóbria, reconhecendo que se Deus marcasse as iniquidades ninguém subsistiria. A resposta é que nele há perdão, e a razão dada é para que ele seja temido, o que inverte a lógica comum. A imagem da espera é de quem faz plantão noturno, repetida duas vezes para reforçar o cansaço de quem aguarda a luz.",
    marcos: [
      "'Das profundezas clamo a ti, Senhor'",
      "'Se observares as iniquidades, quem subsistirá?'",
      "'Contigo, porém, está o perdão'",
      "A minha alma espera mais do que os guardas pela manhã",
      "Com ele há copiosa redenção",
    ],
    chave: 3,
  },
  131: {
    resumo:
      "Três versículos sobre aquietar a alma, com a imagem de uma criança desmamada.",
    detalhe:
      "O salmo é uma renúncia declarada à ambição e à onisciência, dizendo que ele não trata de grandezas nem de coisas maravilhosas demais. A comparação central é precisa e vale reparar: não é um bebê mamando, que está satisfeito porque recebeu, e sim uma criança já desmamada, que está quieta no colo da mãe sem esperar nada. É confiança sem barganha.",
    marcos: [
      "'Senhor, não se eleva o meu coração'",
      "Não trato de grandezas nem de coisas maravilhosas demais",
      "'Pelo contrário, fiz calar e sossegar a minha alma'",
      "Como a criança desmamada se aquieta no colo da mãe",
      "'Espera, ó Israel, no Senhor'",
    ],
    chave: 2,
  },
  132: {
    resumo:
      "O juramento de Davi de não dormir enquanto não achasse lugar para a arca.",
    detalhe:
      "O salmo recorda um voto radical, em que ele promete não entrar na tenda da sua casa nem dar sono aos olhos até achar um lugar para o Senhor. A segunda metade traz o juramento de Deus em resposta, prometendo firmar o trono. O fecho tem uma imagem doméstica surpreendente aplicada a Deus, dizendo que Sião é o lugar do seu repouso e que ele habitará ali porque a desejou.",
    marcos: [
      "'Não darei sono aos meus olhos'",
      "Até que ache lugar para o Senhor",
      "'Levanta-te, Senhor, e entra no teu repouso'",
      "O Senhor jurou a Davi com verdade",
      "'Este é para sempre o lugar do meu repouso'",
    ],
    chave: 4,
  },
  133: {
    resumo:
      "Três versículos sobre irmãos convivendo em união, com óleo escorrendo e orvalho.",
    detalhe:
      "As duas imagens escolhidas para descrever a união são generosas e um pouco exageradas de propósito. O óleo é tanto que escorre da cabeça pela barba de Arão até a gola das vestes, e o orvalho do Hermom, que é a montanha mais alta e úmida da região, desce sobre os montes de Sião. As duas falam de abundância que transborda para além do ponto onde foi aplicada.",
    marcos: [
      "'Oh! Como é bom e agradável viverem unidos os irmãos!'",
      "É como o óleo precioso sobre a cabeça",
      "Desce pela barba de Arão até à gola das vestes",
      "Como o orvalho do Hermom sobre os montes de Sião",
      "Ali ordena o Senhor a sua bênção e a vida para sempre",
    ],
    chave: 1,
  },
  134: {
    resumo:
      "O último cântico de subida, dirigido a quem trabalha no templo durante a noite.",
    detalhe:
      "São três versículos e eles formam uma troca de bênçãos. A primeira parte é uma saudação aos servos que assistem de noite na casa do Senhor, mandando que levantem as mãos e bendigam. A segunda é a resposta deles, abençoando quem falou. É um encerramento simples para a série dos peregrinos, entregando a cidade aos que ficam trabalhando enquanto os outros dormem.",
    marcos: [
      "'Bendizei ao Senhor, todos vós, servos do Senhor'",
      "Vós que assistis na Casa do Senhor durante as noites",
      "Levantai as mãos para o santuário",
      "'O Senhor te abençoe desde Sião'",
      "Aquele que fez os céus e a terra",
    ],
    chave: 1,
  },
  135: {
    resumo:
      "Um louvor que recita a história e repete a crítica aos ídolos.",
    detalhe:
      "O salmo é montado com material de outros textos, o que era comum na liturgia. Ele recorda as pragas do Egito e as vitórias sobre Seom e Ogue. A parte sobre os ídolos repete quase palavra por palavra o Salmo 115, incluindo a conclusão de que quem os faz se torna semelhante a eles. O fecho convoca as diferentes casas do povo a bendizerem.",
    marcos: [
      "'Louvai o nome do Senhor'",
      "Tudo quanto lhe apraz, o Senhor o faz",
      "Ele faz subir as nuvens da extremidade da terra",
      "Os ídolos das nações são prata e ouro",
      "'Tornem-se como eles os que os fazem'",
    ],
    chave: 6,
  },
  136: {
    resumo:
      "Vinte e seis versículos, e cada um termina com a mesma frase sobre a misericórdia.",
    detalhe:
      "O salmo era cantado em resposta, com um lado dizendo a primeira metade do versículo e o povo respondendo o refrão. A lista percorre criação, êxodo e conquista, e o refrão nunca muda. No meio da história grandiosa entra um versículo doméstico e discreto, sobre ele se lembrar de nós quando estávamos abatidos, e outro sobre dar alimento a todo ser vivente.",
    marcos: [
      "'Rendei graças ao Senhor, porque ele é bom'",
      "'Porque a sua misericórdia dura para sempre'",
      "Àquele que fez os céus com entendimento",
      "'Que se lembrou de nós quando abatidos'",
      "Que dá alimento a todo ser vivente",
    ],
    chave: 1,
  },
  137: {
    resumo:
      "Sentados junto aos rios da Babilônia, eles choram e penduram as harpas.",
    detalhe:
      "É o salmo do exílio e começa com uma cena visual forte, com harpas penduradas nos salgueiros. O que torna tudo mais cruel é o pedido dos captores, que querem ouvir uma canção alegre de Sião como entretenimento. A pergunta que eles fazem é a chave do salmo, sobre como cantar um cântico do Senhor em terra estranha. O fim é violento e é honesto ao registrar o desejo de vingança de quem foi arrasado.",
    marcos: [
      "'Junto aos rios da Babilônia, assentávamo-nos e chorávamos'",
      "Nos salgueiros penduramos as nossas harpas",
      "Os que nos levaram pediam canções alegres",
      "'Como entoar um cântico do Senhor em terra estranha?'",
      "'Se eu me esquecer de ti, ó Jerusalém'",
    ],
    chave: 4,
  },
  138: {
    resumo:
      "Uma gratidão pública, com a observação de que Deus olha para o humilde de longe.",
    detalhe:
      "O salmista promete louvar diante dos poderosos, e a resposta que ele recebeu é descrita como fortalecimento com vigor na alma. A frase mais interessante está no versículo 6, dizendo que o Senhor, apesar de excelso, atende ao humilde e conhece o soberbo de longe. O fecho é uma oração de confiança sobre Deus completar o que diz respeito a ele, e um pedido para que não abandone a obra das suas mãos.",
    marcos: [
      "'De todo o coração te darei graças'",
      "'No dia em que eu clamei, tu me acudiste'",
      "'Embora excelso, atenta para o humilde'",
      "'O Senhor completará o que me concerne'",
      "'Não desampares as obras das tuas mãos'",
    ],
    chave: 6,
  },
  139: {
    resumo:
      "Uma meditação sobre ser conhecido por inteiro, e o pedido final de ser sondado.",
    detalhe:
      "O salmo percorre três formas de proximidade: Deus conhece os pensamentos de longe, está em todo lugar para onde se possa fugir, e formou a pessoa no ventre. A imagem sobre fazer a cama no inferno e ainda assim encontrá-lo é a mais radical. O detalhe mais tocante é sobre os dias terem sido escritos no livro antes de existir um deles. E o fim é um convite voluntário ao exame.",
    marcos: [
      "'Senhor, tu me sondas e me conheces'",
      "'Para onde me ausentarei do teu Espírito?'",
      "Se eu fizer a minha cama no inferno, lá estás",
      "'Formaste o meu interior'",
      "'Sonda-me, ó Deus, e conhece o meu coração'",
    ],
    chave: 23,
  },
  140: {
    resumo:
      "Contra quem afia a língua como serpente e arma laços pelo caminho.",
    detalhe:
      "O salmo alterna descrição do perigo e pedido de proteção. As imagens são de caça, com armadilhas, cordas, redes e laços postos à beira do caminho. O pedido de proteção usa a imagem da cabeça coberta no dia da batalha. O fecho é a afirmação que dá sentido a tudo, dizendo que ele sabe que o Senhor defende a causa do aflito e o direito do necessitado.",
    marcos: [
      "'Livra-me, Senhor, do homem mau'",
      "Aguçam a língua como serpente",
      "Armaram-me laços e estenderam a rede",
      "'Tu cobriste a minha cabeça no dia da batalha'",
      "'O Senhor defende a causa do oprimido'",
    ],
    chave: 12,
  },
  141: {
    resumo:
      "Um pedido de guarda para a boca, e a disposição de aceitar repreensão do justo.",
    detalhe:
      "A oração de abertura pede que a oração suba como incenso e que as mãos levantadas valham como oferta da tarde. Os dois pedidos seguintes são de autocontrole, para que Deus ponha guarda à boca e sentinela à porta dos lábios, e para que o coração não se incline ao mal. O versículo 5 é raro e corajoso, aceitando ser ferido pelo justo e considerando isso um favor e um óleo na cabeça.",
    marcos: [
      "'Suba à tua presença a minha oração como incenso'",
      "'Põe guarda, Senhor, à minha boca'",
      "'Vigia a porta dos meus lábios'",
      "'Fira-me o justo, será isso mercê'",
      "'Em ti, Senhor Deus, estão os meus olhos'",
    ],
    chave: 3,
  },
  142: {
    resumo:
      "Escrito numa caverna, por alguém que diz não haver quem cuide da sua alma.",
    detalhe:
      "O título liga o salmo à fuga na caverna. A solidão é declarada sem rodeio, com ele olhando para a direita e vendo que não há quem o reconheça, sem refúgio e sem ninguém que se importe. O pedido é para ser tirado da prisão, e o motivo dado para querer sair é social, para poder render graças e estar de novo entre os justos.",
    marcos: [
      "'Com a minha voz clamo ao Senhor'",
      "'Olho para a direita e vejo, mas não há quem me reconheça'",
      "'Ninguém há que cuide da minha alma'",
      "'Tu és o meu refúgio'",
      "'Tira-me da prisão, para que eu renda graças'",
    ],
    chave: 4,
  },
  143: {
    resumo:
      "O último salmo penitencial, escrito por alguém com o espírito desfalecido.",
    detalhe:
      "A abertura reconhece que ninguém pode ser justificado diante de Deus, frase que Paulo retoma em Romanos e Gálatas. A descrição do estado é de quem foi derrubado e está sentado no escuro como os mortos de há muito. A estratégia dele é a mesma do Salmo 77, lembrando dos dias antigos. E o pedido do versículo 8 é o mais prático, pedindo ouvir pela manhã a benignidade e saber qual caminho seguir.",
    marcos: [
      "'Não entres em juízo com o teu servo'",
      "O inimigo fez-me habitar em lugares tenebrosos",
      "'Lembro-me dos dias antigos'",
      "'Faze-me ouvir pela manhã a tua benignidade'",
      "'Ensina-me a fazer a tua vontade'",
    ],
    chave: 8,
  },
  144: {
    resumo:
      "Uma oração de guerra que termina descrevendo prosperidade doméstica.",
    detalhe:
      "O começo é militar, agradecendo por mãos adestradas para a peleja, e logo emenda com a pergunta do Salmo 8 sobre o que é o homem. A segunda metade é surpreendente porque o que ele pede é cotidiano: filhos como plantas crescidas, filhas como pedras angulares, celeiros cheios, rebanhos que se multiplicam e nenhum grito de aflição nas ruas. A paz é descrita por ausência de notícia ruim.",
    marcos: [
      "'Bendito seja o Senhor, rocha minha'",
      "'Que é o homem, para que dele tomes conhecimento?'",
      "Cantarei um cântico novo",
      "Os nossos filhos como plantas bem desenvolvidas",
      "'Não haja gritos de aflição em nossas ruas'",
    ],
    chave: 15,
  },
  145: {
    resumo:
      "Um acróstico de louvor, com a promessa de uma geração contar à outra.",
    detalhe:
      "É o último salmo atribuído a Davi e o único chamado de louvor no título. A cadeia de transmissão é declarada, com uma geração louvando as obras à outra. A parte mais conhecida cita a fórmula de Êxodo 34 sobre ser compassivo e tardio em irar-se, e acrescenta que as misericórdias estão sobre todas as suas obras. E há a frase sobre ele abrir a mão e satisfazer o desejo de todo vivente.",
    marcos: [
      "'Uma geração louvará as tuas obras à outra'",
      "'O Senhor é compassivo e tardio em irar-se'",
      "'As suas misericórdias estão sobre todas as suas obras'",
      "'Abres a mão e satisfazes o desejo de todo vivente'",
      "'Perto está o Senhor de todos os que o invocam'",
    ],
    chave: 18,
  },
  146: {
    resumo:
      "Não confie em príncipes, porque o fôlego deles sai e os planos acabam.",
    detalhe:
      "Abre a série final de cinco salmos que começam e terminam com aleluia. O argumento contra confiar em poderosos é físico e direto, porque eles voltam ao pó e naquele mesmo dia perecem os seus planos. O contraste é uma lista de ações bem concretas: faz justiça aos oprimidos, dá pão aos famintos, solta os encarcerados, abre os olhos dos cegos e ampara o órfão e a viúva.",
    marcos: [
      "'Não confieis em príncipes'",
      "Volta ao pó, e nesse mesmo dia perecem os seus planos",
      "Faz justiça aos oprimidos e dá pão aos famintos",
      "O Senhor abre os olhos aos cegos",
      "Ampara o órfão e a viúva",
    ],
    chave: 3,
  },
  147: {
    resumo:
      "Ele conta as estrelas e dá nome a cada uma, e também cura os de coração quebrantado.",
    detalhe:
      "A força do salmo está na justaposição de escalas. No mesmo fôlego ele fala de contar o número das estrelas e chamá-las pelo nome, e de sarar os quebrantados de coração e ligar-lhes as feridas. Depois vem a observação sobre em que ele não se compraz, que não é a força do cavalo nem as pernas do homem, e sim os que o temem e esperam na sua misericórdia.",
    marcos: [
      "'Sara os quebrantados de coração e lhes trata as feridas'",
      "'Conta o número das estrelas, chamando-as todas pelos seus nomes'",
      "Dá aos animais o seu alimento",
      "'Não se compraz na força do cavalo'",
      "Agrada-se dos que o temem e esperam na sua misericórdia",
    ],
    chave: 3,
  },
  148: {
    resumo:
      "Tudo é convocado a louvar, dos anjos aos répteis, e a lista sobe e desce.",
    detalhe:
      "O salmo é uma convocação em duas partes, primeiro do alto e depois da terra. A lista é deliberadamente exaustiva e inclui sol, lua, estrelas, monstros marinhos, granizo, neve, vapor, vento tempestuoso, montes, árvores frutíferas, feras, animais domésticos, répteis e aves, e só então reis, príncipes, moços, moças, velhos e crianças. Ninguém e nada fica de fora.",
    marcos: [
      "'Louvai ao Senhor nos céus'",
      "Louvai-o, sol e lua, estrelas luzentes",
      "Louvai ao Senhor da terra, monstros marinhos e abismos",
      "Feras e todos os gados, répteis e aves",
      "Reis e povos, moços e donzelas, velhos e crianças",
    ],
    chave: 13,
  },
  149: {
    resumo:
      "Um cântico novo com dança e tamborins, e uma espada de dois gumes na mão.",
    detalhe:
      "O salmo começa festivo, com a congregação cantando, dançando e tocando. A frase mais bonita é a do versículo 4, dizendo que o Senhor se agrada do seu povo e adorna os humildes com a salvação. E há a imagem incomum do louvor na boca e a espada nas mãos, que ao longo da história foi lida de formas muito diferentes e pede leitura cuidadosa dentro do gênero poético.",
    marcos: [
      "'Cantai ao Senhor um cântico novo'",
      "Louvem o seu nome com danças",
      "'O Senhor se agrada do seu povo'",
      "Adorna os humildes com a salvação",
      "Nos seus lábios estejam os altos louvores de Deus",
    ],
    chave: 4,
  },
  150: {
    resumo:
      "O último salmo é uma lista de instrumentos, e termina com tudo o que respira.",
    detalhe:
      "Seis versículos e treze vezes a palavra louvai. O salmo responde a quatro perguntas implícitas: onde, por quê, como e quem. O onde é o santuário e o firmamento, o porquê são os feitos e a grandeza, o como é a orquestra inteira com trombeta, saltério, harpa, tamborim, cordas, flauta e címbalos, e o quem é o último versículo, que não exclui ninguém e nada que respire.",
    marcos: [
      "'Louvai a Deus no seu santuário'",
      "Louvai-o pelos seus poderosos feitos",
      "Louvai-o com o som da trombeta e com harpa",
      "Louvai-o com adufes e danças",
      "'Todo ser que respira louve ao Senhor'",
    ],
    chave: 6,
  },
};

CAPITULOS.jr = {
  1: {
    resumo:
      "Ele alega ser criança demais, e a resposta é que já era conhecido antes de nascer.",
    detalhe:
      "O chamado tem três verbos anteriores ao nascimento dele: conheci, santifiquei e constituí. A objeção é de idade e a resposta desmonta a desculpa mandando que não diga isso. As duas visões são jogos de palavras no hebraico: o ramo de amendoeira soa como a palavra vigiar, e a panela fervente inclinada do norte indica de onde virá o desastre. O encargo é duplo, com quatro verbos de destruição e dois de construção.",
    marcos: [
      "'Antes que eu te formasse no ventre materno, eu te conheci'",
      "'Ah! Senhor Deus! Eis que não sei falar, porque não passo de uma criança'",
      "Ele toca a boca dele e põe ali as palavras",
      "A vara de amendoeira e a panela fervente",
      "'Para arrancar e para plantar'",
    ],
    chave: 5,
  },
  2: {
    resumo:
      "Dois males numa frase só: deixaram a fonte e cavaram cisternas que não seguram água.",
    detalhe:
      "O capítulo começa com uma lembrança afetuosa do começo, falando da dedicação da juventude e do amor de noivado no deserto. A acusação central é a do versículo 13 e a imagem é hidráulica: trocar água corrente por poços rachados. O restante do capítulo usa metáforas incômodas de infidelidade e uma observação ácida sobre nenhuma nação ter trocado os seus deuses, e essa ter trocado a sua glória.",
    marcos: [
      "'Lembro-me de ti, da tua afeição de juventude'",
      "'Acaso, trocou alguma nação os seus deuses?'",
      "'Dois males cometeu o meu povo'",
      "Deixaram a mim, a fonte de águas vivas",
      "Cavaram cisternas rotas que não retêm águas",
    ],
    chave: 13,
  },
  3: {
    resumo:
      "A lei não permitiria a volta, e mesmo assim o convite é para voltar.",
    detalhe:
      "O capítulo usa o caso jurídico do divórcio em Deuteronômio 24, em que a mulher repudiada não pode voltar ao primeiro marido, e então quebra a própria lógica com um convite. A comparação entre Israel e Judá é dura, chamando a segunda de mais desleal por ter visto o que aconteceu com a irmã e não ter aprendido. O apelo que se repete é simplesmente voltai, com a promessa de pastores segundo o coração de Deus.",
    marcos: [
      "O caso da mulher repudiada que não pode voltar",
      "'Ainda assim, torna para mim'",
      "Israel é chamada de infiel e Judá, de desleal",
      "'Voltai, ó filhos infiéis'",
      "'Dar-vos-ei pastores segundo o meu coração'",
    ],
    chave: 15,
  },
  4: {
    resumo:
      "A ordem é lavrar o campo que está em pousio, e a visão é do mundo desfeito.",
    detalhe:
      "A imagem agrícola do começo pede que rompam o solo endurecido e não semeiem entre espinhos, o que é sobre preparo e não sobre esforço maior. A segunda metade traz a visão mais aterradora do livro: ele olha para a terra e ela está sem forma e vazia, exatamente as palavras de Gênesis 1, e os céus estão sem luz. É a criação sendo desfeita passo a passo, com montes tremendo e nenhum homem à vista.",
    marcos: [
      "'Lavrai para vós outros campo novo'",
      "Não semeeis entre espinhos",
      "'Estou angustiado, ó paredes do meu coração'",
      "'Olhei para a terra, e eis que era sem forma e vazia'",
      "Olhei para os céus, e não tinham luz",
    ],
    chave: 3,
  },
  5: {
    resumo:
      "Percorram a cidade e procurem uma pessoa que faça o que é certo, diz o texto.",
    detalhe:
      "O desafio de abertura ecoa a barganha de Abraão por Sodoma, mas reduzido a um único homem. Jeremias tenta defender o povo dizendo que talvez sejam apenas os pobres que não conhecem o caminho, e vai falar com os grandes, e descobre que eles quebraram o jugo igualmente. A imagem final é do mar com a areia por limite, que não a ultrapassa, usada para dizer que o povo não respeita nem esse tipo de fronteira.",
    marcos: [
      "'Dai voltas às ruas de Jerusalém e vede'",
      "'Se achardes um homem que pratique a justiça'",
      "Ele procura entre os pobres e depois entre os grandes",
      "'Pus a areia por limite ao mar'",
      "'Os profetas profetizam falsamente'",
    ],
    chave: 1,
  },
  6: {
    resumo:
      "Parem nos caminhos e perguntem pelas veredas antigas, e eles dizem que não querem.",
    detalhe:
      "A instrução do versículo 16 é de método, mandando parar, ver, perguntar e só então andar, com a promessa de descanso para a alma. A resposta registrada é seca e honesta: não andaremos. O capítulo também traz a crítica mais citada sobre banalizar sofrimento, com profetas e sacerdotes curando superficialmente a ferida do povo e dizendo paz, paz, quando não há paz.",
    marcos: [
      "'Ponde-vos nos caminhos e vede'",
      "Perguntai pelas veredas antigas",
      "'Mas eles dizem: não andaremos'",
      "Curam a ferida do meu povo levianamente",
      "'Dizendo: paz, paz, quando não há paz'",
    ],
    chave: 16,
  },
  7: {
    resumo:
      "O sermão na porta do templo, contra a confiança em ter um templo.",
    detalhe:
      "Ele fica na porta e diz para não confiarem em palavras enganosas, e a palavra enganosa citada é a repetição do próprio nome do templo três vezes. O argumento é prático: se de fato emendarem os caminhos e não oprimirem o estrangeiro, o órfão e a viúva, então ficarão. A pergunta mais dura compara o templo a um covil de salteadores, expressão que Jesus retoma, e ele manda que vão ver o que sobrou de Siló.",
    marcos: [
      "'Não vos fieis em palavras falsas'",
      "'Templo do Senhor, templo do Senhor, templo do Senhor'",
      "Se não oprimirdes o estrangeiro, o órfão e a viúva",
      "'É esta casa um covil de salteadores?'",
      "'Ide ao meu lugar, em Siló, e vede'",
    ],
    chave: 4,
  },
  8: {
    resumo:
      "Passou a colheita, acabou o verão, e a pergunta é se não há bálsamo em Gileade.",
    detalhe:
      "A observação sobre as aves é irônica e certeira: a cegonha, a rola e a andorinha conhecem os seus tempos, e o povo não conhece o juízo do Senhor. O verso sobre a colheita passada é uma das frases mais melancólicas da Bíblia, porque descreve a janela que se fechou. O capítulo termina com o profeta chorando e perguntando pelo bálsamo e pelo médico, o que na prática é perguntar por que a cura não aconteceu.",
    marcos: [
      "A cegonha conhece os seus tempos determinados",
      "'O meu povo não conhece o juízo do Senhor'",
      "Curam superficialmente a ferida",
      "'Passou a ceifa, acabou o verão, e nós não estamos salvos'",
      "'Acaso, não há bálsamo em Gileade?'",
    ],
    chave: 20,
  },
  9: {
    resumo:
      "Ele queria que a cabeça virasse água para chorar dia e noite.",
    detalhe:
      "O desejo de abertura é o que deu a Jeremias o apelido de profeta chorão, e ele chega a dizer que preferia estar num alojamento no deserto para poder se afastar. O diagnóstico é sobre a fala, com línguas comparadas a arcos que atiram mentira e com gente que ensina a própria língua a mentir. O fecho redireciona o orgulho, dizendo que quem se gloria se glorie em conhecer a Deus, que exercita misericórdia, juízo e justiça.",
    marcos: [
      "'Quem dera a minha cabeça se tornasse em águas'",
      "'Prouvera tivesse eu no deserto uma estalagem'",
      "Ensinam a língua a proferir mentiras",
      "'Não se glorie o sábio na sua sabedoria'",
      "'Glorie-se em me conhecer'",
    ],
    chave: 24,
  },
  10: {
    resumo:
      "Os ídolos são comparados a espantalhos num pepinal, que não falam nem andam.",
    detalhe:
      "A sátira é curta e eficiente: cortam a árvore, o artífice trabalha, enfeitam com prata e ouro e pregam com martelo para não cair. A imagem do espantalho é a mais engraçada e a mais triste, porque descreve algo que assusta sem ter poder nenhum. O contraste é com o Deus vivo, diante de quem a terra treme. E há um pedido pessoal no fim, para ser corrigido com medida e não com ira.",
    marcos: [
      "'Não aprendais o caminho das nações'",
      "São como um espantalho num pepinal",
      "'Não podem fazer mal, nem tampouco fazer bem'",
      "'O Senhor é verdadeiramente Deus'",
      "'Corrige-me, ó Senhor, mas em justa medida'",
    ],
    chave: 5,
  },
  11: {
    resumo:
      "A aliança é relembrada, e ele descobre que a própria cidade natal quer matá-lo.",
    detalhe:
      "A primeira parte é jurídica, lembrando os termos do acordo feito na saída do Egito. A segunda vira pessoal e é o primeiro dos textos chamados de confissões de Jeremias. Ele conta que era como cordeiro manso levado ao matadouro e que não sabia dos planos contra si. O detalhe mais doloroso é a origem da conspiração, porque são os homens de Anatote, a sua própria terra, dizendo para ele parar de profetizar.",
    marcos: [
      "As palavras desta aliança são relembradas",
      "'Maldito o homem que não ouvir'",
      "'Eu era como manso cordeiro que é levado ao matadouro'",
      "Os homens de Anatote conspiram contra ele",
      "'Não profetizes em nome do Senhor, para que não morras'",
    ],
    chave: 19,
  },
  12: {
    resumo:
      "Ele pergunta por que os maus prosperam, e recebe uma resposta que aumenta a exigência.",
    detalhe:
      "A pergunta é feita com educação e sem rodeios, reconhecendo que Deus é justo e mesmo assim querendo discutir a questão. A resposta não explica nada e vem em forma de pergunta: se correndo com homens de pé ele já se cansa, como competirá com cavalos, e se cai em terra de paz, o que fará na mata do Jordão. É um aviso de que vem coisa pior, dado a alguém que já estava no limite.",
    marcos: [
      "'Por que prospera o caminho dos perversos?'",
      "'Tu estás perto na sua boca, mas longe do seu coração'",
      "'Se te fatigas correndo com homens que vão a pé'",
      "'Como competirás com os que vão a cavalo?'",
      "Os próprios irmãos agiram traiçoeiramente",
    ],
    chave: 5,
  },
  13: {
    resumo:
      "Um cinto de linho é enterrado, apodrece, e vira mensagem sobre orgulho.",
    detalhe:
      "O gesto é longo e estranho, com ele comprando o cinto, usando, escondendo numa fenda junto ao rio e voltando muito tempo depois para achá-lo estragado. O sentido é dito em seguida: assim como o cinto se apega aos lombos, Deus fez o povo se apegar a ele, e o orgulho estragou isso. O capítulo também traz a pergunta sobre o etíope mudar a pele e o leopardo, as manchas.",
    marcos: [
      "O cinto de linho é comprado e escondido junto ao rio",
      "Quando volta, está apodrecido e sem serventia",
      "Assim eu farei apodrecer a soberba de Judá",
      "'Porventura, pode o etíope mudar a sua pele?'",
      "'Ou o leopardo, as suas manchas?'",
    ],
    chave: 23,
  },
  14: {
    resumo:
      "Uma seca severa, e Deus proíbe o profeta de orar pelo povo.",
    detalhe:
      "A descrição da seca é concreta, com cisternas vazias, lavradores envergonhados e até a corça abandonando a cria por falta de erva. A ordem para não interceder é chocante e aparece três vezes no livro. Jeremias tenta defender o povo culpando os profetas que dizem que não haverá espada nem fome, e a resposta é que eles profetizam mentira em nome de Deus e que também serão consumidos.",
    marcos: [
      "As cisternas estão vazias e os lavradores, envergonhados",
      "A corça abandona a cria por não haver erva",
      "'Não ores por este povo para o bem dele'",
      "Os profetas dizem que não vereis espada nem fome",
      "'Profetizam mentira em meu nome'",
    ],
    chave: 11,
  },
  15: {
    resumo:
      "Nem Moisés nem Samuel adiantariam, e o profeta diz que a sua ferida é incurável.",
    detalhe:
      "A recusa da intercessão é absoluta e cita os dois maiores intercessores da história do povo. A segunda metade é a confissão mais amarga de Jeremias: ele se queixa de ter nascido, diz que não se assentou com os que se alegram e acusa Deus de ser como ribeiro ilusório e águas inconstantes. A resposta é um chamado de volta, com a promessa de torná-lo um muro de bronze, e o aviso de que ele precisa separar o precioso do vil.",
    marcos: [
      "'Ainda que Moisés e Samuel se pusessem diante de mim'",
      "'Achadas as tuas palavras, logo as comi'",
      "'Por que é perpétua a minha dor?'",
      "'Serás tu para mim como ribeiro ilusório?'",
      "'Se separares o precioso do vil, serás a minha boca'",
    ],
    chave: 16,
  },
  16: {
    resumo:
      "Ele é proibido de casar, de ir a enterro e de ir a festa, e a vida dele vira o sinal.",
    detalhe:
      "As três proibições transformam a biografia do profeta em mensagem. Não casar e não ter filhos antecipa a morte das famílias, não ir ao luto indica que não haverá quem console, e não ir à festa indica o fim da alegria. É um dos custos pessoais mais altos pagos por um profeta na Bíblia. No meio da sentença aparece uma promessa de retorno tão grande que ofuscaria até a memória do êxodo.",
    marcos: [
      "'Não tomarás para ti mulher'",
      "Não entres na casa onde há luto",
      "Não entres na casa do banquete",
      "'Não se dirá mais: vive o Senhor que fez subir do Egito'",
      "Mandarei muitos pescadores e muitos caçadores",
    ],
    chave: 2,
  },
  17: {
    resumo:
      "O coração é chamado de enganoso, e a árvore plantada junto às águas reaparece.",
    detalhe:
      "O capítulo contrapõe duas imagens vegetais: o arbusto solitário na terra salgada, para quem confia no homem, e a árvore junto às águas que não teme quando vem o calor e não deixa de dar fruto no ano da seca. Entre as duas está a frase famosa sobre o coração ser enganoso mais que todas as coisas, seguida da pergunta sobre quem o conhecerá, e da resposta de que Deus sonda.",
    marcos: [
      "'Maldito o homem que confia no homem'",
      "Será como o arbusto solitário no deserto",
      "'Bendito o homem que confia no Senhor'",
      "Como a árvore plantada junto às águas",
      "'Enganoso é o coração, mais do que todas as coisas'",
    ],
    chave: 9,
  },
  18: {
    resumo:
      "Na casa do oleiro, o vaso se estraga na mão e ele faz outro com o mesmo barro.",
    detalhe:
      "A lição da oficina não é sobre determinismo e sim sobre resposta, porque o texto diz que se a nação se converter, Deus se arrepende do mal que pensara fazer, e se fizer o mal, ele se arrepende do bem que dissera. A soberania é apresentada como flexibilidade, e não como roteiro fixo. A reação do povo é dizer que continuarão nos próprios planos, e depois vem outra conspiração contra o profeta.",
    marcos: [
      "'Desce à casa do oleiro'",
      "O vaso se estraga e ele torna a fazer outro",
      "'Não poderei eu fazer de vós como fez este oleiro?'",
      "Se aquela nação se converter, eu me arrependerei do mal",
      "'Vinde, e forjemos projetos contra Jeremias'",
    ],
    chave: 6,
  },
  19: {
    resumo:
      "Ele quebra uma botija de barro diante dos anciãos, e ela não pode ser refeita.",
    detalhe:
      "É o contraponto do capítulo anterior: lá o barro ainda estava mole e podia ser refeito, aqui a peça já está cozida e a quebra é definitiva. O lugar escolhido é o vale de Ben-Hinom, onde aconteciam os sacrifícios de crianças, e é ali que ele faz o gesto. A mensagem é sobre um ponto em que a mudança deixa de ser possível, e o capítulo termina com Jeremias repetindo tudo no pátio do templo.",
    marcos: [
      "Compra uma botija de oleiro e leva os anciãos",
      "Vai ao vale de Ben-Hinom",
      "Ali queimaram os filhos no fogo, coisa que nunca ordenei",
      "'Assim quebrarei eu este povo'",
      "Como se quebra um vaso que não pode refazer-se",
    ],
    chave: 11,
  },
  20: {
    resumo:
      "Preso no tronco, ele acusa Deus de tê-lo enganado e diz que não aguenta parar.",
    detalhe:
      "É a confissão mais violenta do livro e provavelmente do Antigo Testamento. O verbo que ele usa contra Deus é forte e tem sentido de seduzir ou enganar. Ele decide parar de falar e descobre que a palavra vira fogo ardente nos ossos e ele não consegue conter. O capítulo alterna louvor e maldição em poucos versículos, e termina amaldiçoando o dia em que nasceu, sem nenhuma resolução.",
    marcos: [
      "Pasur o fere e o põe no tronco",
      "'Persuadiste-me, ó Senhor, e eu deixei-me persuadir'",
      "'Não falarei mais no seu nome'",
      "'Tornou-se no meu coração como fogo ardente'",
      "'Maldito o dia em que nasci'",
    ],
    chave: 9,
  },
  21: {
    resumo:
      "O rei manda consultar esperando um milagre, e recebe a instrução de se render.",
    detalhe:
      "Zedequias pede que Jeremias consulte na esperança de outro livramento como o da Assíria. A resposta é o oposto, dizendo que Deus mesmo pelejará contra a cidade com mão estendida. O que vem depois é politicamente escandaloso: ele põe diante do povo o caminho da vida e o da morte, e o caminho da vida é sair e render-se aos caldeus, o que lhe rende depois a acusação de traidor.",
    marcos: [
      "Zedequias manda consultar o Senhor",
      "'Eu mesmo pelejarei contra vós'",
      "'Ponho diante de vós o caminho da vida e o caminho da morte'",
      "Quem sair e render-se viverá",
      "'Executai o juízo pela manhã'",
    ],
    chave: 8,
  },
  22: {
    resumo:
      "Uma mensagem aos reis, com a comparação entre um pai justo e um filho que constrói palácios.",
    detalhe:
      "O critério de avaliação é enunciado logo no começo: executar juízo e justiça, livrar o espoliado, não oprimir o estrangeiro, o órfão e a viúva. A comparação entre Josias e Jeoaquim é a parte mais afiada, porque diz que o pai comeu e bebeu e fez juízo e justiça, e então pergunta se isso não é conhecê-lo. Fazer justiça é apresentado como forma de conhecimento de Deus, e não como consequência dele.",
    marcos: [
      "'Executai o juízo e a justiça'",
      "Não oprimais o estrangeiro, o órfão e a viúva",
      "Ai daquele que edifica a casa com injustiça",
      "'Porventura, reinas tu, porque rivalizas em cedro?'",
      "'Não foi isso conhecer-me?'",
    ],
    chave: 16,
  },
  23: {
    resumo:
      "Ai dos pastores que dispersam, e uma longa denúncia de quem profetiza sonhos.",
    detalhe:
      "A primeira parte promete reunir o rebanho e levantar um Renovo justo, com um nome que significa o Senhor é a nossa justiça. A segunda é a crítica mais detalhada a profetas falsos em toda a Bíblia. Eles contam sonhos e dizem que é palavra, e Deus pergunta o que tem a palha com o trigo. A imagem mais forte é sobre eles não terem estado no conselho de Deus, porque se tivessem, teriam feito o povo voltar.",
    marcos: [
      "'Ai dos pastores que destroem e dispersam as ovelhas'",
      "Levantarei a Davi um Renovo justo",
      "'Estes profetizam o engano do seu coração'",
      "'Que tem a palha com o trigo?'",
      "'Se eles tivessem estado no meu conselho'",
    ],
    chave: 22,
  },
  24: {
    resumo:
      "Dois cestos de figos, e os bons são justamente os que já foram levados cativos.",
    detalhe:
      "A visão inverte a expectativa. Quem ficou em Jerusalém achava que tinha sido poupado por mérito, e quem foi deportado achava que tinha sido rejeitado. O texto diz o contrário: os figos bons são os exilados, e Deus promete pôr os olhos sobre eles para o bem e dar-lhes um coração para o conhecerem. Os que ficaram são os figos ruins, que não se podem comer de tão maus.",
    marcos: [
      "Dois cestos de figos diante do templo",
      "Uns muito bons e outros muito ruins",
      "Os figos bons são os levados cativos para a Caldeia",
      "'Porei sobre eles os olhos para o bem'",
      "'Dar-lhes-ei coração para que me conheçam'",
    ],
    chave: 7,
  },
  25: {
    resumo:
      "Vinte e três anos falando sem ser ouvido, e o prazo de setenta anos é dado.",
    detalhe:
      "Jeremias faz um balanço da própria carreira e a expressão que se repete é sobre Deus se levantar de madrugada para falar, sem ser ouvido. O prazo de setenta anos é o que Daniel vai ler depois. A segunda metade é uma visão em que ele serve um cálice de vinho de ira a todas as nações, começando por Jerusalém, o que deixa claro que o juízo não é um favoritismo às avessas.",
    marcos: [
      "Vinte e três anos falando sem ser ouvido",
      "'Levantei-me de madrugada para vos falar'",
      "Estas nações servirão o rei da Babilônia setenta anos",
      "O cálice do vinho do furor é servido às nações",
      "O juízo começa pela cidade que leva o nome de Deus",
    ],
    chave: 11,
  },
  26: {
    resumo:
      "O sermão do templo é repetido e ele quase é morto, salvo por um precedente jurídico.",
    detalhe:
      "É o relato em prosa do que o capítulo 7 traz em discurso. Sacerdotes e profetas o prendem pedindo a morte, e os príncipes vêm julgar o caso. A defesa de Jeremias é simples e corajosa, dizendo que foi enviado e que eles façam o que quiserem, mas saibam que derramarão sangue inocente. Quem o salva são anciãos citando o precedente de Miqueias. E o capítulo registra outro profeta, Urias, que não teve a mesma sorte.",
    marcos: [
      "Ele fala no átrio da Casa do Senhor",
      "Sacerdotes e profetas pedem a morte dele",
      "'Fazei de mim o que vos parecer bom'",
      "Os anciãos citam o caso de Miqueias",
      "Urias profetizou o mesmo e foi morto",
    ],
    chave: 14,
  },
  27: {
    resumo:
      "Ele anda com um jugo de madeira no pescoço para dizer aos reis que se submetam.",
    detalhe:
      "O gesto é público e humilhante, e a mensagem é impopular: submeter-se ao rei da Babilônia é o caminho da vida. Ele envia o recado também aos embaixadores dos reinos vizinhos que estavam ali negociando uma coalizão. O argumento central é sobre não ouvirem os adivinhos e sonhadores que dizem que não servirão, porque profetizam mentira. É política externa dita em linguagem profética.",
    marcos: [
      "Jeremias põe um jugo sobre o pescoço",
      "A mensagem é enviada aos reis vizinhos",
      "'Metei o pescoço no jugo do rei da Babilônia e vivei'",
      "'Não ouçais os vossos profetas e adivinhos'",
      "Eles profetizam mentira para vos afastarem da vossa terra",
    ],
    chave: 12,
  },
  28: {
    resumo:
      "Outro profeta quebra o jugo em público e anuncia o fim do exílio em dois anos.",
    detalhe:
      "Hananias é um profeta popular e diz exatamente o que todos queriam ouvir. A primeira reação de Jeremias é surpreendente e generosa, dizendo amém e que assim faça o Senhor. Só depois ele levanta o critério, lembrando que o profeta de paz só é reconhecido quando a palavra se cumpre. O jugo de madeira quebrado é substituído por um de ferro, e Hananias morre no mesmo ano.",
    marcos: [
      "Hananias anuncia o fim do exílio em dois anos",
      "Jeremias responde amém, assim faça o Senhor",
      "'O profeta que profetiza paz será conhecido quando se cumprir'",
      "Hananias quebra o jugo do pescoço de Jeremias",
      "O jugo de madeira é substituído por um de ferro",
    ],
    chave: 9,
  },
  29: {
    resumo:
      "Uma carta aos que já estão no exílio, mandando construir casas e buscar a paz da cidade.",
    detalhe:
      "A instrução é de longo prazo e contraria a esperança de volta rápida: edificai casas, plantai jardins, casai e casai os filhos, multiplicai. O pedido mais surpreendente é para orarem pela paz da cidade que os levou cativos, porque na paz dela eles terão paz. O versículo 11, muito citado, está dentro desse contexto de setenta anos, e a promessa de ser achado vem acompanhada de buscar de todo o coração.",
    marcos: [
      "'Edificai casas e habitai'",
      "'Procurai a paz da cidade para onde vos desterrei'",
      "'Cumpridos setenta anos, eu vos visitarei'",
      "'Eu é que sei que pensamentos tenho a vosso respeito'",
      "'Buscar-me-eis e me achareis, quando me buscardes de todo o coração'",
    ],
    chave: 11,
  },
  30: {
    resumo:
      "Começa o livro de consolação, com a ordem de escrever tudo num livro.",
    detalhe:
      "Depois de dezenas de capítulos de juízo, o tom muda e Deus manda registrar as palavras por escrito, porque elas valerão para depois. A imagem de abertura é dura, com gritos de pavor e homens com as mãos sobre os lombos como parturiente. A virada está no fim, com a promessa de restaurar a saúde e sarar as feridas de quem foi chamado de repudiada e de quem ninguém procurava.",
    marcos: [
      "'Escreve num livro todas as palavras que te falei'",
      "'Angustioso é aquele dia, e não há outro semelhante'",
      "'Serdes-me-eis por povo, e eu vos serei por Deus'",
      "'Não há quem defenda a tua causa'",
      "'Restaurarei a saúde e sararei as tuas feridas'",
    ],
    chave: 17,
  },
  31: {
    resumo:
      "A promessa de uma aliança nova, escrita no coração e não em tábuas.",
    detalhe:
      "O capítulo é o mais esperançoso do livro e traz várias imagens de consolo: Raquel chorando pelos filhos e recebendo a ordem de parar, o retorno com cegos e coxos e grávidas no meio, e a virgem de Israel voltando a dançar. A parte mais citada é a dos versículos 31 a 34, com a lei posta no interior e escrita no coração, e a promessa de que ninguém precisará ensinar o próximo a conhecer a Deus, porque todos o conhecerão.",
    marcos: [
      "'Com amor eterno eu te amei'",
      "Raquel chora por seus filhos e recusa ser consolada",
      "'Eis aí vêm dias em que firmarei nova aliança'",
      "'Porei a minha lei no seu interior'",
      "'Não se lembrará mais dos seus pecados'",
    ],
    chave: 33,
  },
  32: {
    resumo:
      "Com a cidade cercada e ele preso, Jeremias compra um terreno e guarda a escritura.",
    detalhe:
      "O gesto é um investimento absurdo do ponto de vista econômico e é justamente isso que o torna mensagem. Ele pesa a prata, assina a escritura diante de testemunhas e manda guardar os documentos num vaso de barro para durarem muito tempo. A oração que ele faz em seguida é honesta, admitindo não entender. E a resposta contém a pergunta que resume o capítulo, sobre haver algo difícil demais para Deus.",
    marcos: [
      "A cidade está cercada e ele está preso no pátio da guarda",
      "Compra o campo em Anatote e pesa a prata",
      "Os documentos são guardados num vaso de barro",
      "'Haverá alguma coisa difícil demais para mim?'",
      "'Ainda se comprarão casas, campos e vinhas nesta terra'",
    ],
    chave: 27,
  },
  33: {
    resumo:
      "Ainda preso, ele recebe a ordem de clamar e a promessa de coisas que não sabe.",
    detalhe:
      "O capítulo começa lembrando que ele continuava detido, o que dá peso ao convite do versículo 3. A promessa é de cura e de abundância de paz e verdade, e inclui a volta do som de alegria e da voz do noivo e da noiva nas ruas que estavam desoladas. O argumento final usa a regularidade do dia e da noite como garantia da aliança, dizendo que se ela puder ser quebrada, então a promessa também poderá.",
    marcos: [
      "'Clama a mim, e responder-te-ei'",
      "Anunciar-te-ei coisas grandes e ocultas que não sabes",
      "Voltará a ouvir-se a voz do noivo e da noiva",
      "Farei brotar a Davi um Renovo de justiça",
      "A aliança com o dia e com a noite como garantia",
    ],
    chave: 3,
  },
  34: {
    resumo:
      "Libertam os escravos durante o cerco e voltam atrás quando o exército se afasta.",
    detalhe:
      "É um dos episódios mais reveladores do livro. Sob pressão, todos fazem um pacto solene e libertam os escravos hebreus conforme a lei. Quando o exército babilônico recua temporariamente, eles os pegam de volta. A acusação é sobre profanar o nome e o texto usa um trocadilho amargo, dizendo que como não proclamaram liberdade ao irmão, Deus proclama liberdade a eles para a espada, a peste e a fome.",
    marcos: [
      "O pacto de libertar os escravos hebreus",
      "O exército se afasta e eles os tomam de volta",
      "'Profanastes o meu nome'",
      "O rito antigo do bezerro partido em dois",
      "'Eis que vos proclamo liberdade para a espada e a fome'",
    ],
    chave: 17,
  },
  35: {
    resumo:
      "Ele oferece vinho a uma família que não bebe, e usa a recusa deles como exemplo.",
    detalhe:
      "Os recabitas seguiam a orientação de um antepassado sobre não beber vinho, não construir casas e viver em tendas. Jeremias põe taças cheias diante deles dentro do templo e eles recusam educadamente. O ponto não é abstinência e sim obediência: se eles guardaram por séculos a palavra de um homem, por que o povo não guarda a de Deus, que falou sem parar e não foi ouvido.",
    marcos: [
      "Os recabitas são levados ao templo",
      "Taças de vinho são postas diante deles",
      "'Não beberemos vinho'",
      "Guardaram o mandamento do seu antepassado",
      "'Eu vos falei, madrugando, e não me ouvistes'",
    ],
    chave: 14,
  },
  36: {
    resumo:
      "O rei corta o rolo com um canivete e o queima pedaço por pedaço na lareira.",
    detalhe:
      "É um dos capítulos mais importantes sobre como a Bíblia foi formada. Baruque escreve o ditado de Jeremias, lê no templo, depois diante dos príncipes, e por fim o rolo chega ao rei. A reação dele é fria e metódica, cortando três ou quatro colunas por vez e lançando ao braseiro, e o texto observa que nem ele nem os seus servos se atemorizaram nem rasgaram as vestes. A resposta é escrever tudo de novo, com acréscimos.",
    marcos: [
      "Baruque escreve o ditado de Jeremias num rolo",
      "O rolo é lido no templo e diante dos príncipes",
      "O rei corta com o canivete e queima no braseiro",
      "Ninguém se atemorizou nem rasgou as vestes",
      "Outro rolo é escrito, com muitas palavras semelhantes",
    ],
    chave: 24,
  },
  37: {
    resumo:
      "Acusado de deserção ao sair da cidade, ele é espancado e jogado numa masmorra.",
    detalhe:
      "O rei consulta às escondidas e recebe sempre a mesma resposta, o que mostra que a questão nunca foi falta de informação. O episódio da prisão é quase banal na sua injustiça: ele tenta sair da cidade para tratar de um assunto de herança e é acusado de estar se passando para os caldeus. O pedido que ele faz ao rei no fim é simples e humano, para não ser devolvido à casa onde morreria.",
    marcos: [
      "Zedequias manda consultar às escondidas",
      "Jeremias é acusado de desertar para os caldeus",
      "É espancado e posto em masmorra",
      "'Há alguma palavra do Senhor?'",
      "'Não me faças tornar à casa de Jônatas'",
    ],
    chave: 17,
  },
  38: {
    resumo:
      "Lançado numa cisterna de lama, ele é salvo por um estrangeiro com trapos velhos.",
    detalhe:
      "Os príncipes o acusam de enfraquecer as mãos dos homens de guerra, o que do ponto de vista militar era verdade, já que ele mandava se render. O rei se mostra incapaz de contrariá-los. Quem age é Ebede-Meleque, um etíope da casa do rei, que fala diretamente com Zedequias e organiza o resgate. O detalhe que humaniza a cena é ele mandar pôr trapos velhos debaixo das axilas do profeta para as cordas não machucarem.",
    marcos: [
      "É acusado de enfraquecer as mãos dos homens de guerra",
      "Lançado na cisterna, afunda na lama",
      "Ebede-Meleque, o etíope, intercede junto ao rei",
      "Trapos velhos são postos sob as axilas para as cordas não ferirem",
      "O rei o consulta em segredo, com medo dos judeus",
    ],
    chave: 12,
  },
  39: {
    resumo:
      "A cidade cai, o rei é capturado, e o profeta é solto por ordem do inimigo.",
    detalhe:
      "O relato é seco e segue o que já estava anunciado, com a brecha no muro, a fuga noturna e a captura na planície de Jericó. A ironia mais dura é que Jeremias, preso pelos seus, é libertado pelos babilônios por ordem expressa de Nabucodonosor, com instrução de tratá-lo bem. E Ebede-Meleque recebe uma promessa pessoal de livramento, com a razão declarada, porque confiou.",
    marcos: [
      "A brecha é aberta no muro da cidade",
      "Zedequias foge e é capturado perto de Jericó",
      "Os filhos são mortos diante dele e os olhos, vazados",
      "Jeremias é solto por ordem do rei da Babilônia",
      "Ebede-Meleque é poupado porque confiou",
    ],
    chave: 18,
  },
  40: {
    resumo:
      "Ele recebe escolha de ir para a Babilônia com regalias ou ficar, e escolhe ficar.",
    detalhe:
      "O capitão da guarda faz um discurso teológico surpreendente para um oficial estrangeiro, dizendo que aquilo aconteceu porque pecaram contra o Senhor. A oferta é generosa e Jeremias fica com os pobres que restaram, sob o governo de Gedalias. O fim do capítulo instala a tensão seguinte, com um aviso sobre uma conspiração que Gedalias se recusa a acreditar.",
    marcos: [
      "O capitão da guarda solta Jeremias das cadeias",
      "'O Senhor trouxe isso porque pecastes contra ele'",
      "Jeremias escolhe ficar com o povo que restou",
      "Gedalias é posto como governador em Mispá",
      "Ele se recusa a acreditar no aviso da conspiração",
    ],
    chave: 4,
  },
  41: {
    resumo:
      "Gedalias é assassinado durante uma refeição, e o pouco que restava se desfaz.",
    detalhe:
      "O crime acontece à mesa, o que era violação grave da hospitalidade. Ismael mata também os que estavam ali e depois setenta peregrinos que vinham com ofertas, jogando os corpos numa cisterna. A cena é de caos total num território que já tinha perdido tudo. Joanã persegue e resgata os reféns, e o grupo decide descer ao Egito por medo da represália babilônica.",
    marcos: [
      "Ismael mata Gedalias durante a refeição",
      "Setenta peregrinos são mortos no caminho",
      "Os corpos são lançados numa cisterna",
      "Joanã persegue e resgata os cativos",
      "O grupo decide ir para o Egito com medo dos caldeus",
    ],
    chave: 2,
  },
  42: {
    resumo:
      "Pedem que ele consulte e juram obedecer, dez dias antes de fazerem o contrário.",
    detalhe:
      "O pedido deles é enfático, prometendo obedecer seja bom ou mau. A resposta demora dez dias, o que já é significativo, porque o profeta não improvisa. E a resposta é ficar na terra, com a promessa de edificar e plantar, e o aviso de que ir ao Egito por medo da espada resultaria em encontrar exatamente a espada. O capítulo termina com Jeremias dizendo que eles se enganaram a si mesmos.",
    marcos: [
      "'Ora por nós ao Senhor teu Deus'",
      "'Seja bom, seja mau, obedeceremos'",
      "A resposta demora dez dias",
      "'Se permanecerdes nesta terra, eu vos edificarei'",
      "'Vós vos enganastes a vós mesmos'",
    ],
    chave: 6,
  },
  43: {
    resumo:
      "Eles acusam o profeta de mentir e descem ao Egito, levando-o à força.",
    detalhe:
      "A acusação é direta, dizendo que Baruque estava incitando Jeremias contra eles. O que acontece em seguida é a desobediência mais explícita do livro, porque eles vão exatamente para onde foram proibidos, e levam junto o profeta e o escriba. Já no Egito, Jeremias esconde pedras grandes no barro diante do palácio e anuncia que o trono do rei da Babilônia será posto sobre elas.",
    marcos: [
      "'Tu dizes mentiras'",
      "Acusam Baruque de incitar Jeremias",
      "Descem ao Egito levando todo o povo",
      "Jeremias esconde pedras grandes no barro",
      "Sobre elas Nabucodonosor porá o seu trono",
    ],
    chave: 2,
  },
  44: {
    resumo:
      "No Egito, as mulheres dizem que a vida piorou quando pararam de adorar a rainha do céu.",
    detalhe:
      "É o último confronto de Jeremias e o mais desanimador. A resposta do povo é uma leitura histórica invertida: enquanto queimavam incenso à rainha do céu, tinham fartura e não viam mal nenhum, e desde que pararam, passaram fome. Elas fazem questão de dizer que os maridos sabiam. O profeta responde que exatamente aquela prática foi a causa da ruína, e ninguém muda de ideia.",
    marcos: [
      "O grupo se estabelece no Egito e retoma o incenso",
      "'Não te daremos ouvidos'",
      "'Desde que cessamos, temos tido falta de tudo'",
      "As mulheres dizem que os maridos sabiam",
      "Um sinal é dado sobre o faraó Hofra",
    ],
    chave: 16,
  },
  45: {
    resumo:
      "Cinco versículos dirigidos ao escriba, que estava exausto de escrever aquilo tudo.",
    detalhe:
      "Baruque desabafa dizendo que Deus acrescentou tristeza à sua dor e que está cansado do seu gemido, sem achar descanso. A resposta é dura e honesta, sem consolo fácil: Deus está derrubando o que edificou, e por isso Baruque não deve buscar grandezas para si naquele momento. O que ele recebe é a promessa mínima e concreta de sair com a vida, em todo lugar para onde for.",
    marcos: [
      "'Ai de mim agora, porque me acrescentou tristeza'",
      "'Estou cansado do meu gemido'",
      "'Eis que o que edifiquei eu derribo'",
      "'Procuras grandezas para ti? Não as procures'",
      "'Dar-te-ei a tua vida por despojo'",
    ],
    chave: 5,
  },
  46: {
    resumo:
      "Começam os oráculos contra as nações, e o primeiro é sobre a derrota do Egito.",
    detalhe:
      "O oráculo descreve a batalha de Carquemis com linguagem de reportagem militar, com ordens de preparar escudo e pavês e depois a imagem dos valentes fugindo sem olhar para trás. A ironia sobre o Egito subir como o Nilo e depois recuar é bem construída. No fim há uma palavra separada para Israel, dizendo que ele não deve temer, porque Deus o salvará de longe, e que o corrigirá com justa medida.",
    marcos: [
      "O oráculo sobre a derrota do Egito em Carquemis",
      "'Quem é este que se levanta como o Nilo?'",
      "Sobe, ó cavalos, e estrondeai, ó carros",
      "Nabucodonosor virá ferir a terra do Egito",
      "'Não temas, servo meu, Jacó'",
    ],
    chave: 27,
  },
  47: {
    resumo: "Um oráculo curto contra os filisteus, com a imagem de águas subindo do norte.",
    detalhe:
      "O poema descreve uma inundação vinda do norte que cobre a terra e a cidade, e o barulho dos cascos e das rodas é tão grande que os pais não olham para trás por causa dos filhos, de tão fracas que ficam as mãos. A parte final é uma pergunta dirigida à espada do Senhor, questionando até quando não descansará, e a resposta é que ela recebeu ordem.",
    marcos: [
      "Águas sobem do norte e se tornam torrente",
      "O estrondo dos cascos e das rodas",
      "Os pais não olham para trás por causa dos filhos",
      "'Ah! Espada do Senhor, até quando não descansarás?'",
      "Ali lhe deu ele ordem",
    ],
    chave: 6,
  },
  48: {
    resumo:
      "O longo oráculo contra Moabe, que repousava sobre as suas fezes e nunca foi mexido.",
    detalhe:
      "A imagem mais famosa é vinícola: Moabe é comparado a um vinho deixado sobre a borra, que nunca foi trasfegado de vasilha em vasilha, e por isso manteve o gosto e o cheiro. É o retrato de um povo confortável demais. O tom, porém, não é de festa, porque o texto diz que o coração de Deus geme por Moabe como flautas, e há promessa de restauração no fim.",
    marcos: [
      "Moabe confiou nas suas obras e nos seus tesouros",
      "'Esteve sossegado desde a sua mocidade'",
      "Repousou sobre as suas fezes e não foi mudado de vasilha",
      "'O meu coração geme por Moabe como flautas'",
      "'Mudarei a sorte de Moabe nos últimos dias'",
    ],
    chave: 11,
  },
  49: {
    resumo:
      "Oráculos sobre Amom, Edom, Damasco, Quedar, Hazor e Elão, um depois do outro.",
    detalhe:
      "O capítulo agrupa várias nações vizinhas. O oráculo contra Edom tem a imagem mais forte, com a pergunta sobre o que os vindimadores deixariam, e a afirmação de que Deus desnudou Esaú e descobriu os esconderijos dele. E há uma frase de consolo inesperada no meio da destruição, dizendo para deixarem os órfãos, que ele os guardará em vida, e que as viúvas confiem nele.",
    marcos: [
      "Oráculo contra os filhos de Amom",
      "'A soberba do teu coração te enganou', dito a Edom",
      "'Deixa os teus órfãos, e eu os guardarei em vida'",
      "Damasco enfraqueceu e se voltou para fugir",
      "Quedar, Hazor e Elão também recebem oráculo",
    ],
    chave: 11,
  },
  50: {
    resumo:
      "Começa o longo oráculo contra a Babilônia, que era o instrumento e agora é o alvo.",
    detalhe:
      "O capítulo mostra que ser usado por Deus não é o mesmo que ter aprovação. A acusação é de terem se alegrado e saltado como bezerra na relva ao destruir a herança dele. A imagem do povo como ovelhas desgarradas cujos pastores as fizeram errar é retomada. E há a promessa de que naqueles dias buscarão a iniquidade de Israel e ela não existirá, porque Deus perdoará aos que deixar de resto.",
    marcos: [
      "'Tomada é a Babilônia'",
      "Ovelhas desgarradas foram o meu povo",
      "Os pastores as fizeram errar pelos montes",
      "'Vos alegrastes e saltastes como bezerra na relva'",
      "Buscar-se-á a iniquidade de Israel, e não haverá",
    ],
    chave: 20,
  },
  51: {
    resumo:
      "O oráculo continua, e o rolo é amarrado numa pedra e jogado no rio Eufrates.",
    detalhe:
      "A Babilônia é descrita como cálice de ouro na mão do Senhor que embriagou toda a terra, o que resume bem a ambiguidade do papel dela. O capítulo termina com um ato profético à distância: Jeremias escreve tudo num livro, manda Seraías lê-lo em Babilônia, amarrar-lhe uma pedra e lançá-lo no Eufrates, dizendo que assim ela submergirá e não se levantará.",
    marcos: [
      "'Babilônia era um copo de ouro na mão do Senhor'",
      "'Fugi do meio da Babilônia'",
      "'Curamos a Babilônia, mas não sarou'",
      "Seraías leva o livro e o lê em Babilônia",
      "O rolo é amarrado a uma pedra e lançado no Eufrates",
    ],
    chave: 7,
  },
  52: {
    resumo:
      "Um apêndice histórico, repetindo a queda da cidade e terminando com um rei solto.",
    detalhe:
      "O capítulo repete o fim de 2 Reis e não traz palavras de Jeremias, o que sugere que foi acrescentado por outra mão como documentação. O relato é minucioso, com o inventário dos objetos do templo e até o número exato de deportados em três levas. E o livro termina exatamente como 2 Reis, com Joaquim solto da prisão, comendo à mesa do rei todos os dias, o que é a nota mínima de esperança possível.",
    marcos: [
      "O cerco, a fome e a brecha no muro",
      "Zedequias é capturado e cegado",
      "O templo, o palácio e as casas são queimados",
      "O inventário dos objetos levados",
      "Joaquim é solto e come à mesa do rei",
    ],
    chave: 31,
  },
};

CAPITULOS.ez = {
  1: {
    resumo:
      "Junto a um canal na Babilônia, ele vê rodas dentro de rodas e um trono acima delas.",
    detalhe:
      "A visão é descrita por aproximação, com o profeta usando o tempo todo palavras como semelhança e aparência, porque falta vocabulário. Os quatro seres têm quatro rostos e vão diretamente para onde o espírito os impele, sem se voltarem. As rodas cheias de olhos e o firmamento como cristal levam ao trono. O detalhe teológico decisivo é o lugar: isso acontece no exílio, longe do templo, mostrando que Deus não ficou preso em Jerusalém.",
    marcos: [
      "A visão acontece junto ao rio Quebar, no exílio",
      "Quatro seres viventes com quatro rostos cada",
      "Rodas dentro de rodas, cheias de olhos",
      "Um firmamento como cristal, e acima dele um trono",
      "'Esta era a aparência da glória do Senhor'",
    ],
    chave: 28,
  },
  2: {
    resumo:
      "Caído de rosto em terra, ele é mandado ficar de pé e é chamado de filho do homem.",
    detalhe:
      "A expressão filho do homem aparece aqui pela primeira vez das mais de noventa vezes no livro, e significa simplesmente ser humano, marcando a distância entre ele e a visão que acabou de ver. O envio é sem ilusões, porque Deus avisa de antemão que eles são de dura cerviz e que podem não ouvir. A ordem é falar de todo jeito, e a medida do sucesso é a fidelidade e não a resposta.",
    marcos: [
      "'Filho do homem, põe-te em pé'",
      "O Espírito entra nele e o põe de pé",
      "'Eu te envio a uma nação rebelde'",
      "'Quer ouçam, quer deixem de ouvir'",
      "Um rolo escrito por dentro e por fora, com lamentações",
    ],
    chave: 5,
  },
  3: {
    resumo:
      "Ele come o rolo e acha doce, e depois fica sete dias sentado sem dizer nada.",
    detalhe:
      "A ordem de comer o livro é literal no relato e significa internalizar antes de falar. Ele o acha doce como mel, apesar do conteúdo ser de lamentação. Depois vem a nomeação como atalaia, com uma responsabilidade pesada, porque o sangue de quem não for avisado será cobrado da mão dele. E o capítulo tem um detalhe humano forte: antes de tudo, ele fica sete dias entre os exilados, atônito, sem falar.",
    marcos: [
      "'Come este rolo e vai, fala à casa de Israel'",
      "Era na sua boca doce como o mel",
      "Ficou sete dias atônito no meio deles",
      "'Eu te dei por atalaia sobre a casa de Israel'",
      "Se não o avisares, o sangue dele será da tua mão",
    ],
    chave: 17,
  },
  4: {
    resumo:
      "Ele desenha a cidade num tijolo e fica deitado de lado por mais de um ano.",
    detalhe:
      "O gesto é uma maquete de cerco feita com tijolo, aríetes e uma assadeira de ferro representando o muro. O tempo deitado corresponde aos anos de iniquidade, e o custo físico é enorme. A parte mais dura é a ração diária, com pão medido e água racionada, e a instrução original sobre o combustível, que ele contesta e é atendido em parte, o que mostra um profeta que negocia.",
    marcos: [
      "Uma cidade é desenhada num tijolo",
      "Uma assadeira de ferro representa o muro",
      "Ele se deita sobre o lado esquerdo por muitos dias",
      "O pão e a água são racionados por peso e medida",
      "Ele contesta a instrução sobre o combustível e é atendido",
    ],
    chave: 3,
  },
  5: {
    resumo:
      "Ele corta o próprio cabelo e a barba, pesa e divide em três partes.",
    detalhe:
      "O gesto é público e humilhante, porque raspar a cabeça e a barba era sinal de desgraça. As três partes representam três destinos: queimadas na cidade, feridas à espada em volta e espalhadas ao vento. Uma pequena porção é guardada nas abas da roupa, e mesmo dessa parte algumas são jogadas no fogo. O capítulo é difícil de ler pela dureza do juízo descrito.",
    marcos: [
      "Uma navalha afiada sobre a cabeça e a barba",
      "O cabelo é pesado em balança e dividido em três",
      "Uma parte queimada, outra ferida, outra espalhada ao vento",
      "Um pouco é guardado nas abas da veste",
      "'Esta é Jerusalém, no meio das nações a pus'",
    ],
    chave: 5,
  },
  6: {
    resumo:
      "Uma mensagem dirigida aos montes, onde ficavam os altares dos lugares altos.",
    detalhe:
      "Falar com montanhas é um recurso retórico que atinge exatamente o endereço dos cultos que ele denuncia. O juízo é sobre os altos, os altares e os ídolos. No meio da devastação aparece uma cláusula que se repete dezenas de vezes no livro e é a sua assinatura: para que saibam que eu sou o Senhor. E há a promessa de um restante que escapará e se lembrará dele entre as nações.",
    marcos: [
      "'Montes de Israel, ouvi a palavra do Senhor'",
      "Os altares serão assolados e os ídolos, quebrados",
      "'Sabereis que eu sou o Senhor'",
      "Deixarei um restante que escapará da espada",
      "Lembrar-se-ão de mim entre as nações",
    ],
    chave: 7,
  },
  7: {
    resumo:
      "A palavra que se repete é fim, e o dinheiro é jogado nas ruas por não servir para nada.",
    detalhe:
      "O capítulo é construído sobre a repetição da palavra fim, anunciando que ele chegou sobre os quatro cantos da terra. A imagem econômica é das mais atuais do livro: eles lançam a prata nas ruas e o ouro vira coisa impura, porque não pode livrar no dia da ira nem saciar a alma nem encher o estômago. Quando falta o essencial, o que parecia valor se revela inútil.",
    marcos: [
      "'Vem o fim, o fim vem sobre os quatro cantos da terra'",
      "'Chegou o dia, aproxima-se o dia'",
      "Lançarão a prata nas ruas",
      "'A sua prata e o seu ouro não os poderão livrar'",
      "Buscarão visão do profeta, mas a lei perecerá",
    ],
    chave: 19,
  },
  8: {
    resumo:
      "Levado em visão a Jerusalém, ele cava um buraco na parede e vê o que há dentro.",
    detalhe:
      "A visita guiada tem quatro estações, cada uma com algo pior. Ele é mandado cavar a parede e entrar por uma porta escondida, onde encontra setenta anciãos incensando figuras pintadas no escuro, cada um na sua câmara, dizendo que o Senhor não os vê. As outras cenas incluem mulheres chorando por Tamuz e homens de costas para o santuário adorando o sol.",
    marcos: [
      "O Espírito o leva em visão a Jerusalém",
      "'Cava, agora, na parede'",
      "Setenta anciãos incensam figuras no escuro",
      "'O Senhor não nos vê'",
      "Mulheres choram por Tamuz e homens adoram o sol",
    ],
    chave: 12,
  },
  9: {
    resumo:
      "Um escrivão marca a testa dos que gemem pelas abominações antes do juízo começar.",
    detalhe:
      "O homem vestido de linho tem um tinteiro na cintura e recebe a ordem de percorrer a cidade marcando quem suspira e geme por causa do que acontece ali. A marca é uma letra do alfabeto hebraico antigo, com forma de cruz. O critério de preservação é notável: não são os que fizeram algo grandioso, e sim os que ainda se incomodam. O juízo começa pelo santuário e pelos anciãos.",
    marcos: [
      "Um homem vestido de linho, com tinteiro de escrivão",
      "'Marca com um sinal a testa dos homens que suspiram e gemem'",
      "O juízo começa pelo santuário",
      "Ezequiel cai de rosto e intercede",
      "'Farei recair sobre a cabeça deles o seu caminho'",
    ],
    chave: 4,
  },
  10: {
    resumo:
      "A glória se move do lugar santíssimo para a entrada, em câmera lenta.",
    detalhe:
      "O capítulo é a continuação da visão do capítulo 1, agora dentro do templo, e o movimento é o que importa. A glória sai de sobre o querubim e vai para a entrada da casa, e a nuvem enche o átrio. É uma partida descrita com relutância, quase passo a passo, e é o coração da mensagem de Ezequiel: a destruição só vem depois que a presença sai, e ela sai porque foi expulsa pelo que acontecia ali dentro.",
    marcos: [
      "Brasas de fogo são tomadas do meio dos querubins",
      "A glória se ergue de sobre o querubim",
      "A nuvem enche o átrio interior",
      "As rodas são chamadas de galgal",
      "'Esses eram os mesmos seres que eu vira junto ao rio Quebar'",
    ],
    chave: 4,
  },
  11: {
    resumo:
      "Os líderes dizem que a cidade é a panela e eles são a carne, e ouvem o contrário.",
    detalhe:
      "O ditado deles é de segurança falsa, sugerindo que estão protegidos dentro dos muros. A resposta inverte a imagem. No meio do juízo aparece a promessa mais importante do livro até aqui, com a retirada do coração de pedra e a doação de um coração de carne e um espírito novo. E o capítulo registra a segunda etapa da partida, com a glória parando sobre o monte a oriente da cidade.",
    marcos: [
      "'Esta cidade é a panela, e nós, a carne'",
      "Um dos príncipes morre enquanto ele profetiza",
      "'Tenho sido para eles um santuário por pouco tempo'",
      "'Tirarei da sua carne o coração de pedra'",
      "A glória se detém sobre o monte a oriente da cidade",
    ],
    chave: 19,
  },
  12: {
    resumo:
      "Ele arruma a bagagem de refugiado em plena luz do dia e sai cavando a parede à noite.",
    detalhe:
      "O gesto imita o que o povo faria em breve, e o detalhe de cobrir o rosto para não ver a terra é uma referência ao que aconteceria com Zedequias, cegado antes de chegar à Babilônia. O capítulo também responde a dois ditados populares da época, um dizendo que os dias se prolongam e toda visão perece, e outro que a profecia é para tempos distantes.",
    marcos: [
      "Ele prepara a bagagem de mudança de dia",
      "À noite sai cavando a parede, com o rosto coberto",
      "'Eu sou por sinal para vós outros'",
      "'Prolongar-se-ão os dias, e perecerá toda visão'",
      "'Não será mais adiada nenhuma das minhas palavras'",
    ],
    chave: 22,
  },
  13: {
    resumo:
      "Profetas que rebocam um muro mal construído com cal, e ele desaba na chuva.",
    detalhe:
      "A imagem é de construção civil: alguém levanta um muro frouxo e outros o pintam para parecer firme. A chuva impetuosa, o granizo e o vento derrubam tudo, e a pergunta é onde está o reboco. O alvo são os que dizem paz quando não há paz. A segunda metade denuncia mulheres que costuravam almofadas e véus para caçar almas, cobrando por punhados de cevada e pedaços de pão.",
    marcos: [
      "Profetas que seguem o próprio espírito e nada viram",
      "São como raposas nos desertos",
      "'Levanta o povo um muro, e eis que outros o rebocam com cal'",
      "'Onde está o reboco de que o rebocastes?'",
      "Entristecem o coração do justo com falsidade",
    ],
    chave: 10,
  },
  14: {
    resumo:
      "Anciãos vêm consultar com ídolos no coração, e nem três justos famosos salvariam a cidade.",
    detalhe:
      "A primeira observação é psicológica e certeira: eles levantaram os ídolos no coração e mesmo assim vêm consultar o profeta, e Deus diz que responderia conforme a multidão dos ídolos deles. A segunda parte cita Noé, Daniel e Jó como exemplos máximos de justiça e diz que, se estivessem ali, salvariam apenas as próprias almas. É o fim da esperança de salvação por mérito alheio.",
    marcos: [
      "Os anciãos levantaram os seus ídolos no coração",
      "'Virá o homem à casa do Senhor com os seus ídolos?'",
      "Ainda que Noé, Daniel e Jó estivessem no meio dela",
      "Salvariam apenas a própria alma pela sua justiça",
      "Restará um remanescente que sairá",
    ],
    chave: 14,
  },
  15: {
    resumo:
      "A videira é comparada a outras árvores e perde, porque a madeira dela não serve para nada.",
    detalhe:
      "O argumento é de carpintaria: ninguém faz viga nem cavilha de madeira de videira, e se ela já foi queimada nas duas pontas e chamuscada no meio, serve menos ainda. A videira era símbolo tradicional de Israel, sempre usado com orgulho, e aqui é usado ao contrário. O valor da planta está no fruto, e sem ele não sobra nada que justifique mantê-la.",
    marcos: [
      "'Que é o pau da videira mais do que qualquer outro?'",
      "Toma-se dele madeira para fazer alguma obra?",
      "É lançado no fogo para ser consumido",
      "Se já foi queimado nas pontas, serve ainda menos",
      "'Porei o meu rosto contra eles'",
    ],
    chave: 2,
  },
  16: {
    resumo:
      "A história da cidade contada como a de uma criança abandonada que foi recolhida.",
    detalhe:
      "É um dos capítulos mais longos e mais chocantes do livro. Começa com uma recém-nascida jogada no campo, com o cordão ainda não cortado, e alguém que passa e diz vive. O crescimento e o cuidado são descritos com detalhe, e a traição também, em linguagem de infidelidade explícita. O fecho é inesperado depois de tanta dureza, com a promessa de lembrar da aliança da juventude e estabelecer uma aliança eterna.",
    marcos: [
      "Foste lançada ao campo no dia em que nasceste",
      "'Passando eu por ti, disse: vive'",
      "Tornaste-te formosa e a tua fama saiu entre as nações",
      "Confiaste na tua formosura",
      "'Estabelecerei contigo uma aliança eterna'",
    ],
    chave: 6,
  },
  17: {
    resumo:
      "Uma fábula com duas águias e uma videira, sobre um rei que quebrou um juramento.",
    detalhe:
      "O enigma descreve a política externa da época, com a primeira águia sendo Babilônia e a segunda, o Egito. A acusação é jurídica e não religiosa: Zedequias fez um juramento e o rompeu ao buscar ajuda egípcia. O texto trata a quebra de palavra dada a um rei pagão como ofensa contra Deus. No fim, uma imagem de ternura, com um tenro raminho plantado no alto de um monte, virando cedro que abriga aves.",
    marcos: [
      "Uma grande águia leva o topo do cedro",
      "A videira se volta para a segunda águia",
      "'Desprezou o juramento, quebrando a aliança'",
      "Deus mesmo tomará um tenro raminho do cedro",
      "Debaixo dele habitarão aves de toda sorte",
    ],
    chave: 19,
  },
  18: {
    resumo:
      "O ditado sobre uvas verdes e dentes embotados é proibido, e cada um responde por si.",
    detalhe:
      "O provérbio popular dizia que os pais comeram uvas verdes e os dentes dos filhos se embotaram, ou seja, a culpa era herdada. O capítulo desmonta isso com casos concretos de três gerações. E vai além, dizendo que nem a própria história da pessoa a prende, porque quem se converte vive e quem abandona a justiça morre. A frase final é um convite, com a declaração de que Deus não tem prazer na morte de ninguém.",
    marcos: [
      "'Os pais comeram uvas verdes, e os dentes dos filhos se embotaram'",
      "'A alma que pecar, essa morrerá'",
      "O filho não levará a iniquidade do pai",
      "'Não tenho prazer na morte do que morre'",
      "'Fazei-vos um coração novo e um espírito novo'",
    ],
    chave: 32,
  },
  19: {
    resumo:
      "Um lamento pelos príncipes, com uma leoa e seus filhotes levados com ganchos.",
    detalhe:
      "O gênero é declarado no começo e no fim, porque o texto se apresenta como lamentação. A primeira imagem é de uma leoa que cria filhotes e os vê capturados e levados um ao Egito e outro à Babilônia. A segunda é da videira plantada junto às águas, arrancada e lançada na terra seca, com o fogo saindo de um dos seus ramos. O fecho diz que não há mais nela vara forte para cetro de domínio.",
    marcos: [
      "'Levanta uma lamentação sobre os príncipes de Israel'",
      "A leoa criou os seus filhotes entre os leões",
      "Foi levado com ganchos à terra do Egito",
      "A videira foi arrancada e lançada por terra",
      "'Não há nela vara forte para cetro de quem domine'",
    ],
    chave: 14,
  },
  20: {
    resumo:
      "Anciãos vêm consultar e recebem uma releitura da história desde o Egito.",
    detalhe:
      "A recusa em responder é dita de forma seca: vivo eu que não me deixarei consultar por vós. O que vem em seguida é um balanço histórico em que o motivo declarado para Deus não ter destruído o povo antes aparece várias vezes e não é o mérito deles, e sim o próprio nome, para que não fosse profanado diante das nações. O capítulo termina com a promessa de um recomeço, com o povo passando debaixo do cajado.",
    marcos: [
      "'Vivo eu, que não me deixarei consultar por vós'",
      "Agi por amor do meu nome, para que não fosse profanado",
      "'Santificai os meus sábados'",
      "Fá-los-ei passar debaixo do cajado",
      "'Sabereis que eu sou o Senhor'",
    ],
    chave: 9,
  },
  21: {
    resumo:
      "O cântico da espada, afiada e polida, e um rei parado na encruzilhada decidindo.",
    detalhe:
      "O poema da espada é repetitivo de propósito, imitando o som e o gesto do golpe. A cena mais interessante é a do rei da Babilônia parado na bifurcação da estrada, consultando a sorte com flechas, com terafins e observando o fígado, para decidir se ataca Jerusalém ou Rabá. O texto apresenta a adivinhação pagã e mesmo assim afirma quem está por trás do resultado.",
    marcos: [
      "'Espada, espada, está afiada e polida'",
      "Bate as mãos e geme, filho do homem",
      "O rei da Babilônia para na encruzilhada",
      "Consulta com flechas, terafins e o fígado",
      "'Ao contrário, ao contrário, ao contrário eu a porei'",
    ],
    chave: 27,
  },
  22: {
    resumo:
      "A cidade de sangue, e Deus diz que procurou um homem para ficar na brecha e não achou.",
    detalhe:
      "A lista de crimes é detalhada e cobre todas as camadas: príncipes que derramam sangue, sacerdotes que não distinguem o santo do profano, profetas que rebocam com cal, e o povo da terra que oprime o pobre e o estrangeiro. A frase mais lembrada está no versículo 30, com Deus procurando alguém que reparasse o muro e ficasse na brecha, e a conclusão de que não achou ninguém.",
    marcos: [
      "Ai da cidade que derrama sangue no meio de si",
      "Os sacerdotes não fazem diferença entre o santo e o profano",
      "O povo da terra oprime o pobre e o estrangeiro",
      "'Busquei entre eles um homem que fizesse um muro'",
      "'E que se pusesse na brecha perante mim, mas a ninguém achei'",
    ],
    chave: 30,
  },
  23: {
    resumo:
      "Duas irmãs representam as duas capitais, e a linguagem é a mais crua do livro.",
    detalhe:
      "Oolá é Samaria e Oolibá é Jerusalém, e a alegoria é de infidelidade descrita em termos explicitamente sexuais, o que torna o capítulo difícil de ler em público. A dureza é proposital e o alvo é político, porque as alianças com Assíria, Babilônia e Egito são tratadas como traição. O ponto mais incômodo é a acusação de que a irmã mais nova viu o que aconteceu com a mais velha e fez pior.",
    marcos: [
      "Duas irmãs, filhas da mesma mãe",
      "Oolá é Samaria e Oolibá é Jerusalém",
      "A mais nova viu e corrompeu-se mais do que a outra",
      "As alianças políticas descritas como infidelidade",
      "'Sabereis que eu sou o Senhor Deus'",
    ],
    chave: 11,
  },
  24: {
    resumo:
      "A panela que ferve com a ferrugem dentro, e a esposa do profeta morre sem que ele possa chorar.",
    detalhe:
      "A data é registrada com precisão porque é o dia em que o cerco começa. A parábola da panela descreve uma cidade cuja impureza está impregnada e não sai nem no fogo. E então vem o episódio mais pesado da vida do profeta: Deus avisa que levará a delícia dos seus olhos com um golpe e proíbe o luto público. Ele fala ao povo de manhã, a esposa morre à tarde, e no dia seguinte ele faz como lhe foi ordenado.",
    marcos: [
      "A data exata do começo do cerco é registrada",
      "A panela cuja ferrugem não sai",
      "'Eu te vou tirar o desejo dos teus olhos'",
      "'Não lamentes, nem chores'",
      "'Falei ao povo pela manhã, e à tarde morreu minha mulher'",
    ],
    chave: 18,
  },
  25: {
    resumo:
      "Quatro vizinhos são cobrados, e a acusação principal é terem batido palmas.",
    detalhe:
      "Amom, Moabe, Edom e Filístia recebem oráculos curtos. O que os condena não é o poder militar e sim a reação diante da desgraça alheia: Amom bateu palmas e se alegrou com o santuário profanado, Moabe disse que Judá era como todas as nações, e Edom agiu por vingança. A alegria com o sofrimento do outro é tratada como crime em si.",
    marcos: [
      "Amom bateu palmas e se alegrou com a profanação do santuário",
      "Moabe disse que a casa de Judá é como todas as nações",
      "Edom se vingou e se tornou culpado",
      "Os filisteus agiram com desprezo de alma",
      "'Sabereis que eu sou o Senhor'",
    ],
    chave: 6,
  },
  26: {
    resumo:
      "Tiro se alegra com a queda de Jerusalém pensando em lucro, e recebe a resposta.",
    detalhe:
      "O motivo da alegria de Tiro é dito com todas as letras e é comercial: com Jerusalém destruída, as rotas de comércio se voltariam para ela. O oráculo descreve a cidade sendo raspada até a rocha nua, virando lugar de secar redes de pescadores. A imagem dos príncipes do mar descendo dos tronos, tirando os mantos bordados e sentando na terra tremendo é de luto entre concorrentes.",
    marcos: [
      "'Ah! Ah! Quebrada está a porta dos povos'",
      "Tiro esperava lucrar com a queda de Jerusalém",
      "Rasparão o pó dela e a deixarão como uma penha descalvada",
      "Virá a ser lugar de secar redes",
      "Os príncipes do mar descem dos tronos e tremem",
    ],
    chave: 2,
  },
  27: {
    resumo:
      "Um lamento por Tiro descrita como um navio de luxo, com a lista dos seus fornecedores.",
    detalhe:
      "O capítulo é uma peça rara de informação econômica antiga, listando dezenas de parceiros comerciais e as mercadorias de cada um: prata, ferro, estanho, escravos, cavalos, marfim, ébano, esmeraldas, púrpura, trigo, mel, azeite, vinho e lã. A cidade é imaginada como um navio construído com o melhor de cada lugar, e o naufrágio no coração dos mares é descrito com o espanto dos que assistem da costa.",
    marcos: [
      "Tiro é descrita como navio de perfeita formosura",
      "A longa lista de parceiros comerciais",
      "'Enriqueceste e te glorificaste no coração dos mares'",
      "Os remadores te conduziram sobre grandes águas",
      "Os mercadores assobiam de espanto",
    ],
    chave: 33,
  },
  28: {
    resumo:
      "O príncipe de Tiro se diz deus, e o lamento seguinte fala de alguém no Éden.",
    detalhe:
      "A primeira parte é uma crítica ao orgulho de um governante concreto, que diz no coração ser um deus assentado no trono dos deuses, e a resposta lembra que ele é homem e não Deus. A segunda parte muda de tom e descreve uma figura que estava no Éden, coberta de pedras preciosas, perfeita nos seus caminhos até se achar iniquidade nela, e por isso a tradição cristã leu esse trecho também em chave sobre a origem do mal.",
    marcos: [
      "'Eu sou deus, sento-me no trono de Deus'",
      "'Tu és homem e não Deus'",
      "'Estiveste no Éden, jardim de Deus'",
      "'Perfeito eras nos teus caminhos, desde o dia em que foste criado'",
      "'Até que se achou iniquidade em ti'",
    ],
    chave: 15,
  },
  29: {
    resumo:
      "O Egito é comparado a um crocodilo que se diz dono do Nilo, e a um bordão que se quebra.",
    detalhe:
      "A acusação central é a frase atribuída ao faraó sobre o Nilo ser dele e ele o ter feito para si. A segunda imagem é diplomática e certeira: o Egito foi um bordão de cana para a casa de Israel, que rachava na mão de quem se apoiava e feria o ombro. O capítulo termina com uma nota econômica incomum, dizendo que o Egito seria dado como paga a Nabucodonosor pelo trabalho gasto em Tiro.",
    marcos: [
      "O grande dragão que jaz no meio dos seus rios",
      "'O meu rio é meu, eu o fiz para mim'",
      "Foste um bordão de cana para a casa de Israel",
      "Quando te pegaram, rachaste e feriste o ombro",
      "O Egito é dado como paga pelo trabalho em Tiro",
    ],
    chave: 3,
  },
  30: {
    resumo:
      "O dia do Senhor contra o Egito, com os braços do faraó sendo quebrados.",
    detalhe:
      "O oráculo lista as cidades egípcias uma a uma e anuncia fogo, tremor e dispersão. A imagem central é anatômica e militar: Deus quebra o braço do faraó e ele não é enfaixado nem tratado para recuperar força, enquanto fortalece os braços do rei da Babilônia e põe a espada na mão dele. O contraste entre braços quebrados e braços fortalecidos organiza o capítulo.",
    marcos: [
      "'Uivai: ah! Aquele dia!'",
      "Perto está o dia do Senhor",
      "As cidades do Egito são nomeadas uma a uma",
      "'Quebrei o braço de Faraó'",
      "Fortalecerei os braços do rei da Babilônia",
    ],
    chave: 21,
  },
  31: {
    resumo:
      "O Egito é comparado a um cedro do Líbano tão alto que todas as aves faziam ninho nele.",
    detalhe:
      "A alegoria descreve uma árvore magnífica, regada pelas águas profundas, com ramos que davam sombra a todas as nações e que era invejada por todas as árvores do Éden. A queda é atribuída a uma única causa, dita com clareza, que é o coração se ter elevado por causa da altura. O fim descreve o barulho da queda fazendo tremer as nações e a árvore descendo à cova como os demais.",
    marcos: [
      "'A quem és semelhante na tua grandeza?'",
      "Um cedro do Líbano, de ramos formosos",
      "Todas as aves faziam ninho nos seus ramos",
      "'Elevou-se o seu coração na sua altura'",
      "Fiz tremer as nações com o estrondo da sua queda",
    ],
    chave: 10,
  },
  32: {
    resumo:
      "Uma lamentação pelo faraó e um passeio pelo mundo dos mortos, onde todos estão iguais.",
    detalhe:
      "O capítulo fecha os oráculos contra as nações com uma visita ao lugar dos mortos, onde estão a Assíria, Elão, Meseque, Tubal, Edom e os príncipes do norte, cada um com a sua multidão e as suas sepulturas em volta. A repetição é proposital e o efeito é de nivelamento: todos os impérios que aterrorizaram a terra dos viventes acabam deitados no mesmo lugar, e o faraó é levado a ver isso.",
    marcos: [
      "'Eras como um leão entre as nações'",
      "Cobrirei os céus e escurecerei as suas estrelas",
      "Desce ao mundo dos mortos e vê quem já está lá",
      "Assíria, Elão, Meseque e Tubal, cada um com sua multidão",
      "'Faraó os verá e se consolará'",
    ],
    chave: 31,
  },
  33: {
    resumo:
      "O atalaia é reafirmado, e chega a notícia de que a cidade caiu.",
    detalhe:
      "A função de sentinela é explicada com um caso hipotético: se ele toca a trombeta e a pessoa não se acautela, o sangue é dela; se ele não toca, o sangue é dele. O capítulo também repete que Deus não se agrada da morte do perverso. O momento mais importante é a chegada do fugitivo com a notícia da queda, o que encerra a fase de advertência. E há uma observação amarga sobre o povo que o ouve como quem ouve música bonita e não faz nada.",
    marcos: [
      "O atalaia e o som da trombeta",
      "'Não tenho prazer na morte do perverso'",
      "'Convertei-vos, convertei-vos dos vossos maus caminhos'",
      "Chega o fugitivo com a notícia de que a cidade caiu",
      "'És para eles como cantor de amores'",
    ],
    chave: 11,
  },
  34: {
    resumo:
      "Ai dos pastores que se apascentam a si mesmos, e Deus diz que ele mesmo será o pastor.",
    detalhe:
      "A acusação é detalhada e prática: comem a gordura, vestem-se da lã, matam o cevado, e não fortalecem a fraca, não curam a doente, não enfaixam a quebrada, não trazem a desgarrada nem buscam a perdida. Em seguida vem a declaração que dá o nome ao capítulo, com Deus assumindo pessoalmente a função. E há um detalhe sobre justiça interna no rebanho, com ovelhas gordas que empurram as fracas com o ombro.",
    marcos: [
      "'Ai dos pastores que se apascentam a si mesmos!'",
      "Não curastes a enferma nem buscastes a perdida",
      "'Eis que eu mesmo procurarei as minhas ovelhas'",
      "'A perdida buscarei, e a desgarrada tornarei a trazer'",
      "Julgarei entre ovelha e ovelha",
    ],
    chave: 16,
  },
  35: {
    resumo:
      "Um oráculo contra Edom, cobrando o que ela fez no dia da calamidade do irmão.",
    detalhe:
      "É o contraponto do capítulo seguinte, porque este trata do monte de Seir e o outro dos montes de Israel. A acusação é de inimizade perpétua e de ter entregado os filhos de Israel ao poder da espada no tempo da calamidade. O detalhe mais grave é a frase que eles disseram, reivindicando as duas nações para si, sem levarem em conta que o Senhor estava ali.",
    marcos: [
      "'Põe o rosto contra o monte Seir'",
      "Guardaste inimizade perpétua",
      "Entregaste os filhos de Israel ao poder da espada",
      "'Estas duas nações serão minhas'",
      "'Ainda que o Senhor estivesse ali'",
    ],
    chave: 10,
  },
  36: {
    resumo:
      "A promessa do coração novo, feita por causa do nome de Deus e não do mérito deles.",
    detalhe:
      "O capítulo é dirigido aos montes de Israel e promete que eles voltarão a produzir. A razão da restauração é repetida várias vezes e é desconcertante: não é por amor deles, e sim por causa do nome santo que foi profanado entre as nações. A promessa central é de limpeza com água pura, de troca do coração de pedra pelo de carne e de um espírito novo dentro deles, para que andem nos estatutos.",
    marcos: [
      "'Montes de Israel, ouvi a palavra do Senhor'",
      "'Não é por amor de vós que eu faço isto'",
      "'Espalharei sobre vós água pura'",
      "'Dar-vos-ei coração novo e porei dentro de vós espírito novo'",
      "'Tirarei de vós o coração de pedra'",
    ],
    chave: 26,
  },
  37: {
    resumo:
      "Um vale cheio de ossos secos, e a pergunta se eles podem tornar a viver.",
    detalhe:
      "A visão é a mais conhecida do livro. A pergunta de Deus é aberta e a resposta de Ezequiel é prudente, dizendo que só ele sabe. A restauração acontece em duas etapas, primeiro os ossos se juntando com nervos, carne e pele, e depois o espírito entrando neles. O sentido é explicado logo em seguida pelo próprio texto, porque os ossos representam o povo que dizia que a esperança tinha acabado. A segunda parte usa dois pedaços de madeira unidos.",
    marcos: [
      "Um vale cheio de ossos, e eles estavam muito secos",
      "'Filho do homem, porventura, viverão estes ossos?'",
      "Houve um ruído, e os ossos se aproximaram",
      "'Vem dos quatro ventos, ó espírito'",
      "Dois pedaços de madeira se tornam um só na mão dele",
    ],
    chave: 3,
  },
  38: {
    resumo:
      "Gogue, da terra de Magogue, sobe contra um povo que vivia em segurança.",
    detalhe:
      "O capítulo é apocalíptico e descreve uma coalizão vinda das extremidades do norte. O detalhe que organiza tudo é o estado do povo atacado, descrito como vivendo sem muros, sem ferrolhos e sem portas, ou seja, em plena confiança. O texto usa a linguagem de anzóis nas queixadas para descrever quem conduz os acontecimentos, e o resultado declarado é que as nações saberão quem ele é.",
    marcos: [
      "'Põe o rosto contra Gogue, da terra de Magogue'",
      "'Porei anzóis nas tuas queixadas'",
      "Subirás contra um povo que vive em segurança",
      "Terra de aldeias sem muros, ferrolhos ou portas",
      "'Serei magnificado e santificado aos olhos de muitas nações'",
    ],
    chave: 23,
  },
  39: {
    resumo:
      "A derrota de Gogue é descrita com sete anos de lenha e sete meses de sepultamento.",
    detalhe:
      "Os números são simbólicos e indicam totalidade: as armas servem de combustível por sete anos e o enterro leva sete meses, com uma equipe contratada permanentemente para percorrer a terra procurando ossos. O fim do capítulo muda de assunto e explica retroativamente o exílio, dizendo que as nações não devem pensar que o povo foi levado por fraqueza de Deus, e promete não esconder mais o rosto.",
    marcos: [
      "As armas servem de lenha por sete anos",
      "O sepultamento leva sete meses",
      "Homens percorrem a terra procurando ossos",
      "As nações saberão por que Israel foi levado cativo",
      "'Não esconderei mais deles o rosto'",
    ],
    chave: 29,
  },
  40: {
    resumo:
      "Vinte e cinco anos depois da deportação, ele é levado a ver um templo sendo medido.",
    detalhe:
      "Começa o último bloco do livro, com nove capítulos de arquitetura. Um homem com aparência de bronze e uma cana de medir conduz a visita, e tudo é medido com precisão. O leitor moderno costuma achar árido, e vale lembrar o contexto: aquele povo tinha visto o templo queimado, e receber a planta detalhada de outro era a prova mais concreta possível de que haveria futuro.",
    marcos: [
      "A visão acontece no vigésimo quinto ano do cativeiro",
      "Um homem com aparência de bronze e cana de medir",
      "'Atenta com os teus olhos, ouve com os teus ouvidos'",
      "As portas, os átrios e as câmaras são medidos",
      "Tudo é registrado com medidas exatas",
    ],
    chave: 4,
  },
  41: {
    resumo:
      "A medição continua pelo santuário e pelo lugar santíssimo, com palmeiras entalhadas.",
    detalhe:
      "O guia entra e mede as paredes, as câmaras laterais e o interior. O detalhe decorativo que mais chama atenção é a alternância de querubins e palmeiras ao longo de toda a casa, com cada querubim tendo dois rostos, um de homem e outro de leão jovem, cada um voltado para a palmeira de um lado. É um desenho de jardim, o que liga o templo à imagem do Éden.",
    marcos: [
      "O santuário é medido por dentro",
      "O lugar santíssimo é chamado de santo dos santos",
      "Querubins e palmeiras alternados por toda a casa",
      "Cada querubim com dois rostos",
      "O altar de madeira diante do Senhor",
    ],
    chave: 22,
  },
  42: {
    resumo:
      "As câmaras onde os sacerdotes comem e deixam as vestes, e um muro que separa.",
    detalhe:
      "O capítulo parece o mais técnico de todos e tem uma função clara no fim: as câmaras servem para que os sacerdotes deixem ali as vestes com que ministram antes de sair para o átrio exterior, ou seja, o sagrado não é levado para fora por descuido. O muro ao redor é descrito com a finalidade declarada de fazer separação entre o santo e o profano.",
    marcos: [
      "As câmaras do átrio exterior são medidas",
      "Ali os sacerdotes comem as coisas santíssimas",
      "Ali deixam as vestes com que ministram",
      "Vestem outras roupas antes de ir ao átrio do povo",
      "O muro faz separação entre o santo e o profano",
    ],
    chave: 20,
  },
  43: {
    resumo:
      "A glória volta pela mesma porta oriental por onde tinha saído.",
    detalhe:
      "É o clímax do livro inteiro. A glória que saiu nos capítulos 10 e 11 volta agora, e o texto faz questão de dizer que a visão era como a que ele tinha visto quando veio destruir a cidade e como a do rio Quebar. A voz que fala de dentro chama aquele lugar de lugar do seu trono e das plantas dos seus pés, e diz que habitará ali para sempre.",
    marcos: [
      "A glória vem do caminho do oriente",
      "A terra resplandece com a sua glória",
      "A glória entra pela porta oriental",
      "'Este é o lugar do meu trono'",
      "'Habitarei no meio dos filhos de Israel para sempre'",
    ],
    chave: 7,
  },
  44: {
    resumo:
      "A porta por onde a glória entrou é fechada, e ninguém mais passa por ela.",
    detalhe:
      "O fechamento é permanente e a razão é dita com clareza: porque o Senhor entrou por ela. Em seguida vêm regras sobre quem pode servir, com uma crítica aos que admitiram estrangeiros incircuncisos de coração no santuário. E há detalhes práticos sobre as vestes de linho, com a proibição de cingir-se com nada que faça transpirar, e a proibição de beber vinho antes de entrar no átrio interior.",
    marcos: [
      "A porta oriental permanece fechada",
      "'O Senhor Deus de Israel entrou por ela'",
      "Os levitas que se desviaram levam a sua iniquidade",
      "As vestes de linho e a proibição do que faz suar",
      "Ensinarão o povo a discernir entre o santo e o profano",
    ],
    chave: 2,
  },
  45: {
    resumo:
      "A terra é repartida com uma porção reservada, e os líderes são cobrados por pesos justos.",
    detalhe:
      "A divisão reserva uma faixa santa para o santuário, uma para os sacerdotes e levitas, uma para a cidade e uma para o príncipe. O trecho mais incisivo é dirigido aos governantes, mandando que tirem a violência e a opressão, executem juízo e justiça, e tenham balanças justas e medidas exatas. Justiça de peso e medida aparece dentro de um capítulo litúrgico, sem separação entre culto e comércio.",
    marcos: [
      "Uma porção da terra é reservada como santa",
      "Uma parte para a cidade e outra para o príncipe",
      "'Baste-vos, ó príncipes de Israel'",
      "'Tende balanças justas'",
      "As ofertas das festas são estabelecidas",
    ],
    chave: 9,
  },
  46: {
    resumo:
      "Regras de circulação no templo, incluindo a de não sair pela porta por onde se entrou.",
    detalhe:
      "O detalhe mais curioso do capítulo é de fluxo: quem entra pela porta do norte sai pela do sul e quem entra pela do sul sai pela do norte, sem voltar pelo mesmo caminho. É uma regra prática de multidão e também uma imagem de não sair igual a como se entrou. Há também uma proteção patrimonial, impedindo que o príncipe tome a herança do povo e expulse alguém da sua propriedade.",
    marcos: [
      "A porta interior do oriente fica fechada nos dias de trabalho",
      "Abre-se no sábado e na lua nova",
      "Quem entra pelo norte sai pelo sul",
      "'Não tornará pelo caminho da porta por onde entrou'",
      "O príncipe não tomará a herança do povo",
    ],
    chave: 9,
  },
  47: {
    resumo:
      "Um fio de água sai debaixo da porta e vira um rio que não se pode atravessar.",
    detalhe:
      "A visão é medida em etapas de mil côvados, e a água sobe do tornozelo ao joelho, do joelho à cintura, até virar um rio de nadar. Ela corre para o mar Morto e sara as águas, e passa a haver peixes em abundância onde nada vivia. Nas margens crescem árvores que dão fruto todo mês e cujas folhas servem de remédio. A água nasce do santuário e cura tudo por onde passa.",
    marcos: [
      "As águas saíam de debaixo do limiar da casa",
      "Mil côvados, e as águas chegavam aos tornozelos",
      "Depois aos joelhos, à cintura, e enfim um rio de nadar",
      "As águas do mar Morto são saradas",
      "As folhas das árvores servem de remédio",
    ],
    chave: 9,
  },
  48: {
    resumo:
      "A repartição final entre as tribos, e a cidade ganha um nome na última linha.",
    detalhe:
      "As faixas de terra são distribuídas em ordem, de norte a sul, cada tribo com a sua porção, incluindo uma instrução notável do capítulo anterior sobre os estrangeiros residentes receberem herança entre as tribos. A cidade tem doze portas com os nomes das tribos, imagem que o Apocalipse retoma. E o livro que começou com a glória partindo termina com o nome da cidade, que significa o Senhor está ali.",
    marcos: [
      "As porções das tribos são distribuídas de norte a sul",
      "A porção santa fica no meio",
      "A cidade tem doze portas, uma para cada tribo",
      "Três portas de cada lado",
      "'O nome da cidade será: o Senhor está ali'",
    ],
    chave: 35,
  },
};

CAPITULOS["1cr"] = {
  1: {
    resumo:
      "O livro começa com uma única palavra, Adão, e vai encadeando nomes até Abraão.",
    detalhe:
      "Escrito para quem voltou do exílio, o livro precisa responder quem é aquele povo depois de tudo ter sido destruído, e a resposta começa do começo absoluto. A lista percorre Gênesis inteiro em ritmo acelerado, passando por Noé, pelas nações, por Abraão, Ismael e Esaú. O efeito é de reinserção, mostrando que aquela comunidade pequena e sem rei continua dentro de uma história que vem desde o primeiro homem.",
    marcos: [
      "A lista começa simplesmente com Adão",
      "Os filhos de Noé e as nações",
      "A linhagem que leva a Abraão",
      "Os descendentes de Ismael e de Quetura",
      "Os filhos de Esaú e os reis de Edom",
    ],
    chave: 1,
  },
  2: {
    resumo:
      "As tribos são listadas, e Judá recebe muito mais espaço que as outras.",
    detalhe:
      "A desproporção é intencional e revela a agenda do livro: Judá é a tribo de Davi e ganha capítulos inteiros, enquanto outras aparecem em poucas linhas. No meio dos nomes há pequenos comentários narrativos, como o de Er sendo mau aos olhos do Senhor, e a história de Tamar. A genealogia não é neutra, ela argumenta sobre onde está a continuidade da promessa.",
    marcos: [
      "Os doze filhos de Israel são listados",
      "Judá recebe tratamento muito mais extenso",
      "Er foi mau aos olhos do Senhor",
      "A descendência de Perez e de Hezrom",
      "A linhagem que chega até Jessé e Davi",
    ],
    chave: 3,
  },
  3: {
    resumo:
      "A casa de Davi, dos filhos nascidos em Hebrom até depois do exílio.",
    detalhe:
      "O capítulo é a lista dinástica e vai além do fim do reino, seguindo a linha por Jeconias até a geração dos que voltaram, incluindo Zorobabel. Isso importa porque o livro está dizendo aos leitores que a linhagem não se extinguiu com a queda de Jerusalém. Os evangelhos de Mateus e Lucas dialogam com essa lista ao apresentarem a genealogia de Jesus.",
    marcos: [
      "Os filhos nascidos a Davi em Hebrom",
      "Os nascidos em Jerusalém, incluindo Salomão",
      "A sucessão dos reis de Judá",
      "A linha continua depois do cativeiro",
      "Zorobabel aparece entre os descendentes",
    ],
    chave: 5,
  },
  4: {
    resumo:
      "No meio de uma lista de nomes, aparece uma oração curta de alguém chamado Jabes.",
    detalhe:
      "O capítulo é genealogia de Judá e de Simeão, e a maior parte é feita de nomes sem história. O detalhe que ficou famoso são dois versículos sobre Jabes, cujo nome tinha a ver com dor, e que pede a Deus bênção, território ampliado, presença e livramento do mal. O texto diz que Deus lhe concedeu o que pediu e segue em frente, sem mais comentário.",
    marcos: [
      "As famílias de Judá e os ofícios de cada uma",
      "Oleiros, tecelões de linho e trabalhadores do campo",
      "Jabes foi mais ilustre que os seus irmãos",
      "'Se me abençoares e alargares as minhas fronteiras'",
      "Os descendentes de Simeão e suas cidades",
    ],
    chave: 10,
  },
  5: {
    resumo:
      "As tribos do leste do Jordão, com uma explicação sobre por que Rúben perdeu a primazia.",
    detalhe:
      "O texto explica em voz alta o que Gênesis só insinuou, dizendo que Rúben profanou o leito do pai e por isso a primogenitura passou aos filhos de José. Há também um relato militar curto e interessante, em que as tribos vencem os hagarenos, e o motivo declarado da vitória é que clamaram a Deus na peleja e confiaram nele.",
    marcos: [
      "Rúben era o primogênito e perdeu a primazia",
      "As famílias de Rúben, Gade e meia tribo de Manassés",
      "A guerra contra os hagarenos",
      "'Foram ajudados, porque clamaram a Deus na peleja'",
      "Depois se corromperam e foram levados cativos",
    ],
    chave: 20,
  },
  6: {
    resumo:
      "A tribo de Levi em detalhe, incluindo os cantores postos para ministrar com música.",
    detalhe:
      "É o capítulo genealógico mais longo e trata do sacerdócio e do serviço do templo, o que faz sentido num livro escrito para uma comunidade organizada em torno do templo reconstruído. O detalhe mais interessante é a menção explícita aos cantores designados para o ministério do canto, entre eles Hemã e Asafe, cujos nomes aparecem nos títulos de vários salmos.",
    marcos: [
      "A linhagem sacerdotal de Arão",
      "As famílias de Gérson, Coate e Merari",
      "Os cantores postos para o ministério do canto",
      "Hemã, Asafe e Etã entre eles",
      "As cidades dadas aos levitas",
    ],
    chave: 31,
  },
  7: {
    resumo:
      "As demais tribos do norte, listadas com números de homens aptos para a guerra.",
    detalhe:
      "Issacar, Benjamim, Naftali, Manassés, Efraim e Aser aparecem aqui, muitas vezes com contagem militar. No meio da lista de Efraim há um episódio narrativo triste e inesperado, sobre filhos mortos ao descerem para roubar gado, e o pai chorando muitos dias enquanto os irmãos vinham consolá-lo. Ele nomeia o filho seguinte com uma palavra ligada à desgraça.",
    marcos: [
      "As famílias de Issacar e de Benjamim",
      "Naftali, Manassés e Efraim",
      "Filhos de Efraim mortos ao descerem tomar o gado",
      "O pai chorou muitos dias e os irmãos vieram consolá-lo",
      "As famílias de Aser, homens valentes",
    ],
    chave: 22,
  },
  8: {
    resumo: "A genealogia de Benjamim, terminando na família de Saul.",
    detalhe:
      "O capítulo se dedica a Benjamim com mais cuidado do que às outras tribos do norte, e a razão aparece no fim: ele desemboca na casa de Quis e de Saul, e segue com Jônatas e os descendentes dele por várias gerações. Num livro que enfatiza Davi, dedicar um capítulo à linhagem do rei anterior é um gesto de registro, preservando o que o outro relato deixaria de lado.",
    marcos: [
      "As famílias de Benjamim por chefes de casas",
      "Os que habitavam em Jerusalém",
      "Ner gerou a Quis, e Quis gerou a Saul",
      "Os filhos de Saul e a descendência de Jônatas",
      "A linha segue por várias gerações",
    ],
    chave: 33,
  },
  9: {
    resumo:
      "A lista dos que voltaram e se estabeleceram, com os porteiros do templo em destaque.",
    detalhe:
      "O capítulo fecha o bloco genealógico trazendo o presente do leitor: quem voltou do exílio e onde se instalou. O foco recai sobre os que trabalhavam no templo, incluindo porteiros que faziam turnos de guarda, responsáveis pelos utensílios, pela farinha, pelo vinho e pelo azeite, e os cantores que ficavam nas câmaras e estavam ocupados dia e noite. Depois disso, a narrativa pode começar.",
    marcos: [
      "Judá foi levado ao cativeiro por causa das suas transgressões",
      "Os primeiros que voltaram às suas possessões",
      "Os porteiros e seus turnos de guarda",
      "Os encarregados dos utensílios e dos ingredientes",
      "Os cantores estavam ocupados dia e noite",
    ],
    chave: 1,
  },
  10: {
    resumo:
      "A narrativa começa na morte de Saul, com uma explicação teológica acrescentada.",
    detalhe:
      "O relato do monte Gilboa segue de perto o de 1 Samuel 31, e o que Crônicas acrescenta são os últimos versículos, que explicam a queda: Saul morreu pela transgressão que cometeu, por não ter guardado a palavra e por ter consultado uma médium em vez de buscar ao Senhor. O livro começa a narrativa pelo fim de um rei, para explicar por que o outro veio.",
    marcos: [
      "Israel é derrotado no monte Gilboa",
      "Saul cai sobre a própria espada",
      "Os homens de Jabes resgatam os corpos",
      "'Morreu Saul pela sua transgressão'",
      "Consultou uma médium e não buscou ao Senhor",
    ],
    chave: 13,
  },
  11: {
    resumo:
      "Todo o Israel vem a Hebrom, Jerusalém é tomada, e a lista dos valentes é dada.",
    detalhe:
      "Crônicas pula toda a guerra civil de 2 Samuel e apresenta uma unção imediata e unânime, o que reflete o interesse do livro em mostrar unidade. A tomada da fortaleza inclui o detalhe de Joabe subir primeiro e por isso virar chefe. A lista dos valentes traz o episódio da água de Belém, com os três atravessando o acampamento inimigo e Davi derramando a água diante do Senhor.",
    marcos: [
      "Todo o Israel se ajunta a Davi em Hebrom",
      "A fortaleza de Sião é tomada",
      "Joabe sobe primeiro e se torna chefe",
      "Três valentes rompem o arraial para buscar água de Belém",
      "Davi derrama a água diante do Senhor",
    ],
    chave: 19,
  },
  12: {
    resumo:
      "Quem se juntou a Davi enquanto ele ainda estava foragido, tribo por tribo.",
    detalhe:
      "O capítulo lista guerreiros que aderiram antes da vitória, o que tem peso diferente de aderir depois. Há descrições vívidas, como homens de rostos de leão e velozes como gazelas, e os que atravessaram o Jordão quando ele transbordava. O detalhe mais citado é sobre os filhos de Issacar, entendidos nos tempos, que sabiam o que Israel devia fazer.",
    marcos: [
      "Homens que vieram a Davi quando ainda se escondia",
      "Ambidestros com funda e arco",
      "Rostos como de leões, velozes como gazelas nos montes",
      "Atravessaram o Jordão quando transbordava",
      "Os de Issacar, entendidos nos tempos",
    ],
    chave: 32,
  },
  13: {
    resumo:
      "A primeira tentativa de trazer a arca, feita com consulta ampla e método errado.",
    detalhe:
      "Crônicas acrescenta um detalhe ausente em 2 Samuel: Davi consulta os capitães e toda a congregação antes de agir, o que mostra um rei que decide em conjunto. O problema não foi a intenção nem o processo político, foi o transporte, feito num carro novo em vez de nos ombros dos levitas. A morte de Uzá interrompe tudo e o rei fica com medo e com raiva, deixando a arca em outra casa.",
    marcos: [
      "Davi consulta os capitães e toda a congregação",
      "A arca é posta num carro novo",
      "Uzá estende a mão e morre",
      "Davi se irou e teve medo naquele dia",
      "A arca fica três meses na casa de Obede-Edom",
    ],
    chave: 3,
  },
  14: {
    resumo:
      "A casa é construída, a família cresce, e duas batalhas são decididas com consulta.",
    detalhe:
      "O capítulo mostra o padrão que o livro quer destacar: antes de cada batalha, Davi consulta. E o detalhe mais interessante é que na segunda vez a resposta é diferente da primeira, mandando dar a volta e atacar defronte das amoreiras ao ouvir o ruído de marcha nas copas. O que funcionou uma vez não é repetido automaticamente, e é preciso perguntar de novo.",
    marcos: [
      "Hirão de Tiro envia cedro e artesãos",
      "Os filhos nascidos em Jerusalém",
      "Davi consulta antes da primeira batalha",
      "Consulta de novo, e a resposta é outra",
      "O ruído de marcha nas copas das amoreiras",
    ],
    chave: 10,
  },
  15: {
    resumo:
      "A segunda tentativa dá certo, porque desta vez eles procuram saber como se faz.",
    detalhe:
      "A frase que resume o capítulo é dita por Davi, reconhecendo que da primeira vez não o buscaram segundo a ordenança. Os levitas se santificam e carregam a arca nos ombros com varas. Há organização musical detalhada, com instrumentos e regentes nomeados. O capítulo termina com Mical olhando pela janela e desprezando o rei que dançava, sem o diálogo que 2 Samuel traz.",
    marcos: [
      "'Ninguém deve levar a arca senão os levitas'",
      "'Não a buscamos segundo a ordenança'",
      "A arca é carregada aos ombros com varas",
      "Cantores e instrumentos são organizados",
      "Mical olha pela janela e o despreza no coração",
    ],
    chave: 13,
  },
  16: {
    resumo:
      "Depois da festa, um salmo é entregue a Asafe para ser cantado regularmente.",
    detalhe:
      "O cântico é montado com trechos que aparecem nos Salmos 105, 96 e 106, o que mostra como esses textos circulavam. A abertura manda render graças, invocar o nome e fazer conhecidos os feitos entre os povos. O capítulo termina organizando o serviço permanente diante da arca, com gente designada para ministrar continuamente, conforme a necessidade de cada dia.",
    marcos: [
      "A arca é posta na tenda e há ofertas e distribuição de pão",
      "O cântico é entregue a Asafe e aos seus irmãos",
      "'Buscai ao Senhor e a sua força'",
      "'Cantai ao Senhor, toda a terra'",
      "O serviço diante da arca passa a ser contínuo",
    ],
    chave: 11,
  },
  17: {
    resumo:
      "Ele quer construir a casa e ouve que Deus fará dele uma casa.",
    detalhe:
      "O episódio segue 2 Samuel 7 com pequenas diferenças de redação. O jogo de palavras entre templo e dinastia é o centro, e a promessa de firmar o trono para sempre é o texto que sustenta toda a esperança messiânica posterior. A oração de Davi em resposta é de alguém atordoado, repetindo a pergunta sobre quem é ele e qual é a sua casa para ter chegado até ali.",
    marcos: [
      "'Eu moro em casa de cedro, e a arca está debaixo de cortinas'",
      "Natã aprova e é corrigido naquela mesma noite",
      "'O Senhor te edificará uma casa'",
      "'Firmarei o trono dele para sempre'",
      "'Quem sou eu, ó Senhor Deus?'",
    ],
    chave: 12,
  },
  18: {
    resumo:
      "Um resumo das conquistas, com a nota de que ele administrava juízo e justiça.",
    detalhe:
      "O capítulo lista vitórias sobre filisteus, moabitas, sírios e edomitas, e registra o bronze recolhido, que Salomão usaria depois no templo. No meio do relatório militar aparece a frase que o livro faz questão de repetir sobre os bons reis, dizendo que Davi reinava sobre todo o Israel administrando juízo e justiça a todo o seu povo. A lista de oficiais fecha o capítulo.",
    marcos: [
      "Vitórias sobre filisteus, moabitas e sírios",
      "O bronze recolhido seria usado no templo",
      "Reis vizinhos enviam presentes",
      "'Reinava sobre todo o Israel, administrando juízo e justiça'",
      "Os oficiais do reino são listados",
    ],
    chave: 14,
  },
  19: {
    resumo:
      "Uma missão de condolências é tratada como espionagem, e os enviados voltam humilhados.",
    detalhe:
      "Davi manda consolar o novo rei amonita pela morte do pai, num gesto de reciprocidade. Os conselheiros do rapaz o convencem de que são espiões, e a humilhação escolhida é raspar as barbas e cortar as vestes pela metade. O cuidado de Davi ao mandar que fiquem em Jericó até as barbas crescerem é um detalhe humano. A guerra que se segue é grande e a fala de Joabe antes dela é sóbria.",
    marcos: [
      "Davi envia consoladores pela morte de Naás",
      "Os príncipes os acusam de espionagem",
      "Raspam as barbas e cortam as vestes ao meio",
      "'Ficai em Jericó até que vos cresça a barba'",
      "Joabe enfrenta o cerco por dois lados",
    ],
    chave: 13,
  },
  20: {
    resumo:
      "A tomada de Rabá e episódios contra gigantes, sem o caso de Bate-Seba.",
    detalhe:
      "Este capítulo é célebre pelo que omite. O primeiro versículo diz que Davi ficou em Jerusalém enquanto Joabe saía para a guerra, exatamente o gancho de 2 Samuel 11, e então salta direto para a conquista da cidade. Crônicas escreve para uma comunidade que precisa de modelo, e trata do assunto pelo silêncio. O resto do capítulo lista combates contra homens de estatura extraordinária.",
    marcos: [
      "Joabe sai para a guerra e Davi fica em Jerusalém",
      "Rabá é tomada e a coroa é posta sobre a cabeça de Davi",
      "Combates contra os filisteus em Gezer",
      "Um homem de estatura enorme, com seis dedos em cada mão",
      "Os gigantes caem pela mão de Davi e dos seus servos",
    ],
    chave: 1,
  },
  21: {
    resumo:
      "O recenseamento, a praga, e a compra da eira que viraria o lugar do templo.",
    detalhe:
      "Joabe questiona a ordem e pergunta por que aquilo traria culpa sobre Israel, e o texto diz que a palavra do rei prevaleceu. Depois da praga, o anjo é visto com a espada estendida sobre Jerusalém, e Davi diz a frase que assume toda a responsabilidade, sobre ele ter ordenado e as ovelhas não terem feito nada. A recusa em aceitar o terreno de graça encerra o capítulo com o princípio sobre não oferecer o que não custa.",
    marcos: [
      "Joabe questiona a ordem do recenseamento",
      "A praga e o anjo com a espada estendida",
      "'Eu é que pequei; estas ovelhas, que fizeram?'",
      "Davi compra a eira de Ornã pelo preço cheio",
      "'Não tomarei o que é teu para o Senhor'",
    ],
    chave: 24,
  },
  22: {
    resumo:
      "Sem poder construir, ele passa a vida juntando material para quem vai construir.",
    detalhe:
      "A razão dada para ele não construir é dita com franqueza, sobre ter derramado muito sangue. A reação dele é o que o capítulo quer mostrar: em vez de desistir, prepara tudo, com ferro, bronze, cedro e pedras lavradas em abundância, e contrata canteiros. A instrução a Salomão junta duas coisas, o encorajamento para agir e o pedido de discernimento para guardar a lei.",
    marcos: [
      "'Esta é a Casa do Senhor Deus'",
      "'Tu derramaste muito sangue'",
      "Prepara ferro, bronze, cedro e pedras em abundância",
      "'Meu filho, seja contigo o Senhor'",
      "'Esforça-te e tem bom ânimo; não temas'",
    ],
    chave: 13,
  },
  23: {
    resumo:
      "Os levitas são reorganizados, e a mudança de função é explicada em voz alta.",
    detalhe:
      "O capítulo registra uma reforma administrativa importante: como a arca já tem lugar fixo, os levitas não precisam mais carregar o tabernáculo, e passam a assistir os sacerdotes, cuidar dos átrios, dos utensílios e da farinha, e a louvar todas as manhãs e todas as tardes. A idade mínima também é ajustada. É um retrato de instituição que muda a função quando a necessidade muda.",
    marcos: [
      "Davi, já velho, faz Salomão rei",
      "Os levitas são contados e divididos por turnos",
      "'O tabernáculo não precisa mais ser carregado'",
      "Cuidam dos átrios, das câmaras e da purificação",
      "Louvam todas as manhãs e todas as tardes",
    ],
    chave: 30,
  },
  24: {
    resumo:
      "As vinte e quatro turmas de sacerdotes são definidas por sorteio.",
    detalhe:
      "A divisão em turnos resolve um problema prático de escala, porque não havia lugar para todos servirem ao mesmo tempo. O método escolhido é o sorteio, feito diante do rei e dos chefes, o que evita disputa por influência. O nome de Abias aparece na oitava sorte, e é a essa turma que pertence Zacarias, o pai de João Batista, no primeiro capítulo de Lucas.",
    marcos: [
      "As famílias sacerdotais são divididas",
      "A distribuição é feita por sorte",
      "Vinte e quatro turmas de serviço",
      "A oitava sorte coube a Abias",
      "O sorteio é feito diante do rei e dos chefes",
    ],
    chave: 5,
  },
  25: {
    resumo:
      "Os músicos são organizados, e a música do templo é descrita como profecia.",
    detalhe:
      "O vocabulário do capítulo é o detalhe importante: os filhos de Asafe, Hemã e Jedutum são separados para profetizar com harpas, alaúdes e címbalos. Tocar não é tratado como acompanhamento e sim como ministério. O número é dado com precisão, com duzentos e oitenta e oito instruídos, e o critério de escalonamento é por sorte, sem distinção entre o mestre e o discípulo.",
    marcos: [
      "Separados para profetizar com harpas e címbalos",
      "Sob a direção do pai e do rei",
      "Duzentos e oitenta e oito instruídos no canto",
      "Lançaram sortes, assim o pequeno como o grande",
      "Assim como o mestre, também o discípulo",
    ],
    chave: 1,
  },
  26: {
    resumo:
      "Porteiros, tesoureiros e oficiais, com os turnos distribuídos por sorteio nos quatro lados.",
    detalhe:
      "Guardar as portas do templo era função de responsabilidade e o capítulo a trata com seriedade, descrevendo homens valentes e capazes. Os postos são sorteados para cada lado, e há menção a guardas em turnos regulares. Também aparecem os encarregados dos tesouros das coisas dedicadas, e oficiais destacados para assuntos externos, incluindo juízes, o que mostra a amplitude da função levítica.",
    marcos: [
      "As turmas dos porteiros são estabelecidas",
      "Homens valentes e capazes para o serviço",
      "As sortes distribuem os postos pelos quatro lados",
      "Os encarregados dos tesouros das coisas dedicadas",
      "Levitas destinados a obras externas, como oficiais e juízes",
    ],
    chave: 8,
  },
  27: {
    resumo:
      "As divisões militares por mês e a lista dos administradores dos bens do rei.",
    detalhe:
      "O exército é organizado em doze turmas de serviço mensal, o que permite manter a força permanente sem retirar todos os homens do trabalho ao mesmo tempo. A segunda parte é quase um organograma rural, com responsáveis pelos tesouros, pelos lavradores, pelas vinhas, pelas adegas, pelas oliveiras, pelo gado nos vales e pelos camelos e jumentas, cada função com um nome.",
    marcos: [
      "Doze divisões de serviço, uma por mês",
      "Os chefes das tribos são listados",
      "Encarregados dos tesouros e dos campos",
      "Responsáveis pelas vinhas, adegas e oliveiras",
      "Conselheiros e o amigo do rei",
    ],
    chave: 1,
  },
  28: {
    resumo:
      "Diante de toda a assembleia, ele entrega a Salomão a planta detalhada do templo.",
    detalhe:
      "O capítulo é a transmissão pública do projeto, com plantas dos átrios, das câmaras, dos tesouros e até o peso de cada utensílio de ouro e prata. A instrução pessoal é a parte mais citada, mandando o filho conhecer o Deus do pai e servi-lo com coração perfeito e ânimo voluntário, porque o Senhor esquadrinha todos os corações. E termina encorajando a não temer, porque Deus não o desampararia.",
    marcos: [
      "Davi reúne todos os chefes em Jerusalém",
      "'Conhece o Deus de teu pai e serve-o de coração perfeito'",
      "'O Senhor esquadrinha todos os corações'",
      "A planta e os pesos são entregues por escrito",
      "'Esforça-te e faze a obra; não temas'",
    ],
    chave: 9,
  },
  29: {
    resumo:
      "A oferta para o templo é enorme, e a oração de Davi diz que tudo veio de Deus.",
    detalhe:
      "O rei dá do próprio tesouro particular e então convida os outros, e a resposta é voluntária e generosa, com o povo se alegrando por terem dado de coração íntegro. A oração é a parte mais bonita do livro e contém a frase que resume a relação com posse: tudo vem de ti, e das tuas mãos to damos. Ele também se descreve como estrangeiro e peregrino, como todos os seus pais.",
    marcos: [
      "Davi dá do seu tesouro particular",
      "O povo oferece voluntariamente e com alegria",
      "'Tudo vem de ti, e das tuas mãos to damos'",
      "'Somos estrangeiros e peregrinos como todos os nossos pais'",
      "Salomão é proclamado rei e Davi morre em boa velhice",
    ],
    chave: 14,
  },
};

CAPITULOS["2cr"] = {
  1: {
    resumo:
      "Podendo pedir o que quisesse, ele pede sabedoria para governar tanta gente.",
    detalhe:
      "Crônicas situa a cena em Gibeão, onde ainda estava o tabernáculo do deserto, o que liga a nova era à antiga. O pedido é justificado pelo tamanho da responsabilidade, com ele dizendo que o povo é numeroso como o pó da terra e perguntando quem poderia julgá-lo. Deus aprova exatamente pelo que não foi pedido, e acrescenta riquezas e honra por consequência, e não como objetivo.",
    marcos: [
      "Salomão vai a Gibeão, onde estava a tenda da congregação",
      "'Pede o que queres que eu te dê'",
      "'Dá-me agora sabedoria e conhecimento'",
      "'Porque, quem poderia julgar este teu grande povo?'",
      "Riqueza e honra são acrescentadas",
    ],
    chave: 10,
  },
  2: {
    resumo:
      "O acordo com Tiro é fechado, e Salomão explica que nenhuma casa pode conter Deus.",
    detalhe:
      "A carta a Hirão é uma peça diplomática bem escrita e contém uma admissão teológica importante: os céus e os céus dos céus não podem contê-lo, então quem é ele para lhe edificar casa. A resposta define o propósito do prédio, que é ser lugar de queimar incenso diante dele, e não moradia. O restante trata de logística, com contagem de trabalhadores e transporte de madeira em jangadas.",
    marcos: [
      "A carta enviada a Hirão, rei de Tiro",
      "'Os céus dos céus não o podem conter'",
      "'Quem sou eu, para lhe edificar casa?'",
      "O artífice hábil é enviado de Tiro",
      "A madeira desce em jangadas pelo mar",
    ],
    chave: 6,
  },
  3: {
    resumo:
      "A construção começa no monte Moriá, no mesmo lugar da eira comprada por Davi.",
    detalhe:
      "Crônicas é o único livro que nomeia o local com essa precisão, ligando o templo tanto ao monte de Gênesis 22 quanto à eira de Ornã. O capítulo descreve o revestimento de ouro, as pedras preciosas e as palmeiras e correntes. Os dois querubins do lugar santíssimo têm asas que se tocam no meio e alcançam as duas paredes. As colunas recebem nomes próprios.",
    marcos: [
      "A obra começa no monte Moriá",
      "No lugar da eira de Ornã, o jebuseu",
      "As paredes são cobertas de ouro fino",
      "Dois querubins com asas que se tocam",
      "As colunas Jaquim e Boaz",
    ],
    chave: 1,
  },
  4: {
    resumo:
      "O mobiliário do templo, com o mar de bronze sobre doze bois e dez bacias.",
    detalhe:
      "O capítulo lista o altar de bronze, o grande reservatório chamado mar, dez bacias para lavar o que se oferecia, dez candeeiros e dez mesas. A distinção de uso é registrada com precisão: as bacias servem para lavar as peças do holocausto e o mar é para os sacerdotes se lavarem. O detalhe sobre não se apurar o peso do bronze, por ser muito, dá a escala da obra.",
    marcos: [
      "O altar de bronze e o mar fundido",
      "O mar assenta sobre doze bois",
      "Dez bacias para lavar o que se oferece",
      "O mar é para os sacerdotes se lavarem",
      "O peso do bronze não foi apurado, de tanto que era",
    ],
    chave: 6,
  },
  5: {
    resumo:
      "A arca é levada, e quando os músicos tocam em uníssono a nuvem enche a casa.",
    detalhe:
      "O detalhe que Crônicas acrescenta é musical e importa: os cantores e trombeteiros soam como se fossem um só, para fazer ouvir uma só voz, louvando e dizendo que Deus é bom e que a sua misericórdia dura para sempre. É nesse momento que a nuvem enche a casa, a ponto de os sacerdotes não poderem continuar ministrando. O texto também registra que na arca só havia as duas tábuas.",
    marcos: [
      "A arca é trazida ao lugar santíssimo",
      "Na arca nada havia senão as duas tábuas",
      "Os músicos tocam como se fossem um só",
      "'Porque ele é bom, e a sua misericórdia dura para sempre'",
      "A nuvem enche a casa e os sacerdotes não podem ministrar",
    ],
    chave: 13,
  },
  6: {
    resumo:
      "A oração de dedicação, longa e antecipando tudo o que poderia dar errado.",
    detalhe:
      "Salomão se ajoelha sobre um estrado diante de toda a congregação e faz uma oração que é basicamente uma lista de cenários futuros: derrota, seca, fome, praga, peste e cativeiro, e em todos o pedido é o mesmo, que Deus ouça e perdoe. Ele também inclui explicitamente o estrangeiro que vem de terra distante por causa do nome, pedindo que seja atendido para que todos os povos conheçam.",
    marcos: [
      "Salomão se ajoelha sobre um estrado diante da assembleia",
      "'Os céus dos céus não te podem conter'",
      "Pede que os olhos estejam abertos para aquele lugar",
      "Prevê derrota, seca, fome, praga e cativeiro",
      "Inclui o estrangeiro que vem de terra distante",
    ],
    chave: 18,
  },
  7: {
    resumo:
      "O fogo desce, a glória enche a casa, e vem a promessa sobre se humilhar e orar.",
    detalhe:
      "Crônicas acrescenta o fogo descendo do céu e consumindo o holocausto, cena ausente em 1 Reis. O povo se prostra sobre o pavimento repetindo o refrão da misericórdia. A resposta noturna a Salomão contém o versículo 14, um dos mais citados do Antigo Testamento, com quatro verbos condicionais e três promessas, e o texto é dirigido ao povo que é chamado pelo nome de Deus.",
    marcos: [
      "O fogo desce e consome o holocausto",
      "A glória enche a casa",
      "O povo se prostra sobre o pavimento",
      "'Se o meu povo se humilhar, orar, buscar e se converter'",
      "'Então eu ouvirei, perdoarei e sararei a terra'",
    ],
    chave: 14,
  },
  8: {
    resumo:
      "Vinte anos de obras, cidades reconstruídas e uma frota no mar Vermelho.",
    detalhe:
      "O capítulo é um balanço administrativo do reinado, com cidades de armazenagem, cidades para os carros e para os cavaleiros, e trabalho organizado entre os povos remanescentes e os israelitas. Há um detalhe de cuidado religioso, quando ele muda a filha do faraó de residência por considerar santos os lugares onde a arca entrou. E há a parceria naval com Hirão, com marinheiros conhecedores do mar.",
    marcos: [
      "Vinte anos de obras são resumidos",
      "Cidades de armazenagem e cidades para os carros",
      "A filha do faraó é mudada de residência",
      "Os turnos dos sacerdotes seguem a ordem de Davi",
      "Navios e marinheiros conhecedores do mar",
    ],
    chave: 14,
  },
  9: {
    resumo:
      "A rainha de Sabá vem testar com enigmas e sai dizendo que não lhe contaram nem metade.",
    detalhe:
      "Ela chega com uma comitiva grande e uma intenção declarada de provar, e o texto diz que ele respondeu a tudo sem que nada ficasse encoberto. O que a deixa sem fôlego é o conjunto, incluindo a mesa, os servidores, os trajes e a escadaria. O capítulo termina com um inventário de ouro, escudos e cavalos que é glorioso na aparência e, lido ao lado de Deuteronômio 17, é também um aviso.",
    marcos: [
      "A rainha de Sabá vem prová-lo com enigmas",
      "Nenhuma coisa lhe ficou encoberta",
      "'Nem metade da grandeza da tua sabedoria me disseram'",
      "Seiscentos e sessenta e seis talentos de ouro por ano",
      "Cavalos e carros são importados",
    ],
    chave: 6,
  },
  10: {
    resumo:
      "O novo rei escolhe o conselho errado, e dez tribos vão embora.",
    detalhe:
      "O pedido do povo é por alívio de carga e é legítimo. Os anciãos aconselham ser bom para o povo naquele dia e falar boas palavras, com a promessa de que assim seriam servos para sempre. Os jovens sugerem a resposta sobre o dedo mínimo ser mais grosso que os lombos do pai. Roboão escolhe a segunda, e o reino se parte. O capítulo é um estudo de caso sobre escutar quem tem experiência.",
    marcos: [
      "O povo pede alívio do jugo pesado",
      "Os anciãos aconselham falar boas palavras",
      "Os jovens sugerem a resposta do dedo mínimo",
      "Roboão responde com aspereza",
      "Israel se separa da casa de Davi",
    ],
    chave: 7,
  },
  11: {
    resumo:
      "A guerra civil é evitada por uma palavra profética, e sacerdotes migram para o sul.",
    detalhe:
      "Roboão reúne cento e oitenta mil homens para retomar o reino e desiste ao ouvir Semaías dizer que aquilo vinha de Deus, o que o livro registra como obediência. O detalhe mais interessante é a migração dos levitas do norte, que deixam os seus arredores e possessões porque Jeroboão os rejeitou e instituiu sacerdotes próprios para os bezerros. Eles fortalecem Judá por três anos.",
    marcos: [
      "O exército é reunido e depois dispensado",
      "'Não subais nem pelejeis contra vossos irmãos'",
      "Cidades de Judá são fortificadas",
      "Os levitas deixam o norte e vão para Jerusalém",
      "Fortaleceram o reino de Judá por três anos",
    ],
    chave: 4,
  },
  12: {
    resumo:
      "Quando o reino se firma, ele abandona a lei, e o Egito leva os escudos de ouro.",
    detalhe:
      "A observação do começo é psicológica e recorrente no livro: foi justamente quando o reino se estabeleceu e ele se tornou forte que deixou a lei. Sisaque invade e o profeta explica o motivo. Quando os príncipes e o rei se humilham, a destruição é reduzida, e a frase de Deus é que eles serviriam a reinos estrangeiros para conhecerem a diferença entre servir a ele e servir a outros.",
    marcos: [
      "'Quando se fortaleceu, deixou a lei do Senhor'",
      "Sisaque, rei do Egito, sobe contra Jerusalém",
      "Os príncipes e o rei se humilham",
      "'Conhecerão a diferença entre o meu serviço e o dos reinos'",
      "Os escudos de ouro são trocados por escudos de bronze",
    ],
    chave: 8,
  },
  13: {
    resumo:
      "Abias faz um discurso do alto de um monte no meio da batalha, e Judá vence cercado.",
    detalhe:
      "O discurso é curioso porque é teológico e proferido em campo de batalha, argumentando sobre quem mantém o culto legítimo e quem fabricou sacerdotes. A situação militar é desfavorável, com Judá cercado por frente e por trás, e a virada acontece quando eles clamam e os sacerdotes tocam as trombetas. O livro registra que prevaleceram porque confiaram no Senhor.",
    marcos: [
      "Abias fala do alto do monte Zemaraim",
      "Acusa o norte de fabricar sacerdotes",
      "Judá é cercado pela frente e por trás",
      "Os sacerdotes tocam as trombetas e o povo clama",
      "'Prevaleceram, porque confiaram no Senhor'",
    ],
    chave: 18,
  },
  14: {
    resumo:
      "Asa remove os ídolos e depois enfrenta um exército de um milhão com uma oração.",
    detalhe:
      "O reinado começa com dez anos de paz usados para fortificar cidades, e o texto atribui o sossego à busca do Senhor. Quando vem a invasão etíope, com números muito superiores, a oração de Asa é o ponto alto do capítulo: ele diz que para Deus não há diferença entre ajudar o poderoso e o que não tem força, e pede socorro afirmando que não é o homem que prevalece contra ele.",
    marcos: [
      "Asa tira os altares estranhos e as imagens",
      "Dez anos de paz usados para fortificar",
      "Zerá, o etíope, vem com um exército imenso",
      "'Nada é para ti ajudar, quer o poderoso, quer o de nenhuma força'",
      "'Não prevaleça contra ti o homem'",
    ],
    chave: 11,
  },
  15: {
    resumo:
      "Um profeta encoraja a reforma, e o povo faz um juramento público com grande alegria.",
    detalhe:
      "A mensagem de Azarias é condicional e clara, dizendo que o Senhor está com eles enquanto estiverem com ele. O que Asa faz em seguida é uma reforma ampla, incluindo depor a própria avó da posição por causa de um ídolo. A assembleia jura buscar ao Senhor de todo o coração, e o texto observa que se alegraram por causa do juramento, porque o tinham jurado de todo o coração.",
    marcos: [
      "'O Senhor está convosco, enquanto vós estais com ele'",
      "Asa toma ânimo e renova o altar",
      "O povo se reúne e faz um juramento em voz alta",
      "'Juraram de todo o coração'",
      "Maaca é deposta por causa de um ídolo",
    ],
    chave: 2,
  },
  16: {
    resumo:
      "O mesmo rei que confiou no exército enorme agora contrata a Síria, e é repreendido.",
    detalhe:
      "O contraste com o capítulo 14 é o ponto do texto. Diante de uma ameaça menor, Asa usa o tesouro do templo para comprar uma aliança. O vidente Hanani o lembra do etíope e enuncia a frase mais citada do livro, sobre os olhos de Deus percorrerem toda a terra para mostrar-se forte por aqueles cujo coração é perfeito. Asa se ira, prende o vidente e, doente dos pés, busca médicos e não o Senhor.",
    marcos: [
      "Asa compra aliança com a Síria usando o tesouro do templo",
      "Hanani o repreende lembrando dos etíopes",
      "'Os olhos do Senhor passam por toda a terra'",
      "Asa se ira e põe o vidente no cárcere",
      "Doente dos pés, buscou os médicos e não ao Senhor",
    ],
    chave: 9,
  },
  17: {
    resumo:
      "Josafá manda uma comissão percorrer as cidades ensinando a lei ao povo.",
    detalhe:
      "É um detalhe de governo que só Crônicas registra: no terceiro ano ele envia príncipes, levitas e sacerdotes com o livro da lei, e eles percorrem todas as cidades de Judá ensinando. O resultado descrito é político e inesperado, porque o temor do Senhor cai sobre os reinos vizinhos e eles não guerreiam. Educação pública é apresentada como política de segurança.",
    marcos: [
      "Josafá se fortalece e anda nos primeiros caminhos de Davi",
      "Envia príncipes e levitas para ensinar nas cidades",
      "Levam consigo o livro da Lei do Senhor",
      "O temor do Senhor cai sobre os reinos vizinhos",
      "Recebe presentes e se torna muito grande",
    ],
    chave: 9,
  },
  18: {
    resumo:
      "Ele se alia a Acabe pelo casamento e vai à guerra ouvindo quatrocentos sins e um não.",
    detalhe:
      "O capítulo é quase idêntico a 1 Reis 22 e o que Crônicas destaca é o erro da aliança. Josafá pede um profeta do Senhor porque desconfia do consenso, e Acabe admite odiar Micaías porque ele nunca profetiza o bem. A visão do povo espalhado como ovelhas sem pastor é o veredito. Acabe se disfarça e morre por uma flecha atirada sem pontaria, que entra entre as juntas da armadura.",
    marcos: [
      "A aliança com Acabe é selada por casamento",
      "Quatrocentos profetas garantem a vitória",
      "'Não há aqui ainda algum profeta do Senhor?'",
      "Micaías vê o povo como ovelhas sem pastor",
      "Uma flecha atirada a esmo fere o rei entre as juntas",
    ],
    chave: 6,
  },
  19: {
    resumo:
      "Repreendido pela aliança, ele volta e organiza um sistema de justiça com instruções escritas.",
    detalhe:
      "A repreensão é direta, perguntando se ele devia ajudar o perverso e amar os que odeiam o Senhor, e mesmo assim reconhece que havia boas coisas nele. A reação de Josafá é reformar o judiciário, nomeando juízes em cada cidade com uma instrução memorável, mandando que vejam o que fazem porque não julgam da parte do homem e sim do Senhor, que está com eles no julgar.",
    marcos: [
      "'Devias tu ajudar o perverso?'",
      "Josafá percorre o povo e o faz voltar ao Senhor",
      "Nomeia juízes em cada cidade fortificada",
      "'Não julgais da parte do homem, senão da parte do Senhor'",
      "'Não há no Senhor iniquidade, nem acepção de pessoas'",
    ],
    chave: 6,
  },
  20: {
    resumo:
      "Diante de três exércitos, ele proclama jejum e manda os cantores na frente da tropa.",
    detalhe:
      "A oração dele termina com a frase que define o capítulo, admitindo não haver força nem saber o que fazer, e dizendo que os olhos estão postos em Deus. A resposta vem por um levita e diz que a peleja não é deles. O detalhe militar mais inusitado da Bíblia acontece em seguida, com Josafá pondo cantores à frente do exército louvando pela beleza da santidade, e o inimigo se desfazendo sozinho.",
    marcos: [
      "Josafá teme e proclama jejum em todo o Judá",
      "'Não sabemos o que fazer, porém os nossos olhos estão em ti'",
      "'A peleja não é vossa, senão de Deus'",
      "Os cantores vão à frente do exército",
      "Três dias para recolher o despojo",
    ],
    chave: 12,
  },
  21: {
    resumo:
      "Jeorão mata os próprios irmãos e recebe uma carta escrita por Elias.",
    detalhe:
      "O reinado é o mais sombrio de Judá até então, começando com o assassinato dos seis irmãos. A carta de Elias é um detalhe exclusivo de Crônicas e anuncia a doença que o mataria. O fim é descrito com uma frase desoladora, dizendo que ele partiu sem deixar de si saudades, e que não foi sepultado nos sepulcros dos reis.",
    marcos: [
      "Jeorão mata os seus irmãos com a espada",
      "Anda no caminho dos reis de Israel",
      "Edom e Libna se rebelam",
      "Chega uma carta escrita por Elias",
      "'Partiu sem deixar de si saudades'",
    ],
    chave: 20,
  },
  22: {
    resumo:
      "Um rei aconselhado pela mãe reina um ano, e depois ela toma o trono matando os netos.",
    detalhe:
      "O texto é explícito sobre a influência de Atalia, dizendo que a mãe era a sua conselheira para proceder impiamente. Depois da morte do filho, ela manda destruir toda a descendência real, e a linha de Davi quase se extingue ali. Quem impede é Jeosabeate, filha do rei e esposa do sacerdote, que rouba o bebê Joás e o esconde por seis anos dentro da casa de Deus.",
    marcos: [
      "A mãe era a sua conselheira para proceder impiamente",
      "Acazias reina apenas um ano",
      "Atalia destrói toda a descendência real",
      "Jeosabeate esconde o menino Joás",
      "Ele fica escondido seis anos na Casa de Deus",
    ],
    chave: 3,
  },
  23: {
    resumo:
      "O sacerdote articula a restauração com um plano de segurança bem detalhado.",
    detalhe:
      "Joiada age como estrategista, fazendo alianças com os capitães, chamando os levitas de todas as cidades e organizando turnos e postos de guarda antes de qualquer proclamação. A criança é coroada e recebe o testemunho nas mãos. Atalia grita traição quando já não há o que fazer, e é retirada do templo antes de ser executada, porque não queriam que morresse ali dentro.",
    marcos: [
      "Joiada faz aliança com os capitães",
      "Os levitas são reunidos de todas as cidades",
      "Os postos de guarda são distribuídos antes do anúncio",
      "O menino é coroado e recebe o testemunho",
      "Atalia grita traição e é levada para fora",
    ],
    chave: 11,
  },
  24: {
    resumo:
      "Joás restaura o templo enquanto o sacerdote vive, e manda matar o filho dele depois.",
    detalhe:
      "A primeira metade é positiva, com a caixa posta à porta para as ofertas e o povo trazendo com alegria até sobrar. A virada é explicada em uma frase: depois da morte de Joiada, os príncipes vieram lisonjear o rei e ele lhes deu ouvidos. Quando Zacarias, filho do seu protetor, o repreende, ele manda apedrejá-lo no átrio, e o texto observa que ele não se lembrou da benevolência recebida.",
    marcos: [
      "Uma caixa é posta à porta para as ofertas do templo",
      "O povo traz com alegria até haver de sobra",
      "Depois da morte de Joiada, os príncipes o lisonjeiam",
      "Zacarias é apedrejado no átrio da Casa do Senhor",
      "'Não se lembrou o rei da benevolência que lhe fizera o pai dele'",
    ],
    chave: 22,
  },
  25: {
    resumo:
      "Ele faz o que é reto, mas não de coração íntegro, e traz de volta os deuses que venceu.",
    detalhe:
      "A avaliação do começo é a chave do capítulo, com a ressalva sobre não ser de coração íntegro. Ele contrata mercenários de Israel e depois os dispensa por ordem profética, perdendo o dinheiro pago, e a resposta que recebe é que Deus tem com que lhe dar muito mais. O absurdo maior vem depois, quando ele traz os deuses de Edom, que acabou de derrotar, e se prostra diante deles.",
    marcos: [
      "Fez o que era reto, porém não de coração íntegro",
      "Contrata mercenários de Israel e depois os dispensa",
      "'O Senhor tem com que te dar muito mais do que isso'",
      "Traz os deuses de Edom e se prostra diante deles",
      "Desafia Israel e é derrotado",
    ],
    chave: 2,
  },
  26: {
    resumo:
      "Uzias inventa máquinas de guerra e prospera, até entrar no templo para queimar incenso.",
    detalhe:
      "O reinado é tecnicamente impressionante, com torres, cisternas, agricultura e engenhos inventados para atirar flechas e pedras grandes. A frase que anuncia a queda é a mais citada do capítulo, dizendo que, havendo-se ele já fortificado, exaltou-se o seu coração até se corromper. Quando entra para queimar incenso, oitenta sacerdotes o enfrentam, e a lepra aparece na testa enquanto ele está com raiva.",
    marcos: [
      "Amava a agricultura e construiu torres e cisternas",
      "Inventou engenhos para atirar flechas e pedras grandes",
      "'Havendo-se já fortificado, exaltou-se o seu coração'",
      "Entra no templo para queimar incenso",
      "A lepra aparece na testa e ele mora em casa separada",
    ],
    chave: 16,
  },
  27: {
    resumo:
      "Um reinado curto e bom, resumido numa frase sobre preparar os próprios caminhos.",
    detalhe:
      "Jotão é um dos poucos reis avaliados sem ressalva séria, e o texto registra o detalhe de que ele não entrou no templo, aprendendo com o erro do pai. A explicação do sucesso é dada numa frase que vale reter, dizendo que ele se fortificou porque preparou os seus caminhos perante o Senhor. A única nota negativa não é sobre ele, e sim sobre o povo, que continuava corrompendo-se.",
    marcos: [
      "Jotão fez o que era reto perante o Senhor",
      "Não entrou no templo, diferente do pai",
      "Construiu a porta alta e cidades nos montes",
      "Venceu os amonitas e recebeu tributo",
      "'Fortificou-se, porque preparou os seus caminhos'",
    ],
    chave: 6,
  },
  28: {
    resumo:
      "Acaz faz sacrifícios de crianças, e os inimigos do norte agem melhor do que ele.",
    detalhe:
      "O capítulo tem uma inversão moral notável. Depois de Israel levar duzentos mil cativos de Judá, o profeta Odede os repreende, e os próprios chefes do norte devolvem os prisioneiros, vestem os nus, alimentam, ungem e levam os fracos em jumentos até Jericó. Enquanto isso, o rei de Judá fecha as portas do templo e monta altares em cada esquina de Jerusalém.",
    marcos: [
      "Acaz faz passar os filhos pelo fogo",
      "Israel leva duzentos mil cativos de Judá",
      "O profeta Odede repreende os vencedores",
      "Os cativos são vestidos, alimentados e devolvidos",
      "Acaz fecha as portas da Casa do Senhor",
    ],
    chave: 15,
  },
  29: {
    resumo:
      "Ezequias abre as portas do templo no primeiro mês do seu primeiro ano.",
    detalhe:
      "A pressa é o detalhe que mais chama atenção, porque ele começa a reforma imediatamente. Os levitas são convocados com um discurso que reconhece a infidelidade dos pais e a vergonha das portas fechadas, e a limpeza leva dezesseis dias. Quando o culto é restabelecido, tudo acontece de repente, e o texto observa que o povo se alegrou por causa do que Deus preparara, porque sucedeu inesperadamente.",
    marcos: [
      "No primeiro mês, abre as portas da Casa do Senhor",
      "'Nossos pais fecharam as portas do pórtico'",
      "A limpeza do templo leva dezesseis dias",
      "O culto e a música são restabelecidos",
      "'Fora feito subitamente'",
    ],
    chave: 3,
  },
  30: {
    resumo:
      "A Páscoa é adiada um mês para dar tempo, e convites são enviados também ao norte.",
    detalhe:
      "A decisão de celebrar no segundo mês é prática, tomada em conselho porque não havia sacerdotes santificados em número suficiente. Os correios que vão ao norte são escarnecidos na maior parte das cidades, mas alguns se humilham e vêm. O detalhe mais bonito é a oração de Ezequisas pelos que comeram sem a purificação devida, pedindo perdão para quem preparou o coração, e o texto diz que Deus atendeu.",
    marcos: [
      "A Páscoa é transferida para o segundo mês",
      "Correios levam cartas até Efraim e Manassés",
      "Muitos escarnecem, e alguns se humilham e vêm",
      "'O Senhor, que é bom, perdoe a todo aquele que preparou o coração'",
      "A festa é prolongada por mais sete dias",
    ],
    chave: 18,
  },
  31: {
    resumo:
      "As ofertas se acumulam em montões, e é preciso organizar câmaras e uma distribuição justa.",
    detalhe:
      "O capítulo é sobre administração de abundância, um problema bom de ter. Quando a ordem é dada, o povo traz tanto que os montões ficam na Casa do Senhor por meses. Ezequias pergunta sobre eles e recebe a explicação de que desde que começaram a trazer, tem havido de comer e sobrado muito. Então são preparadas câmaras e nomeados responsáveis pela distribuição por turnos, inclusive aos pequenos.",
    marcos: [
      "As colunas e os altares estranhos são quebrados",
      "O povo traz as primícias em abundância",
      "Os montões ficam do terceiro ao sétimo mês",
      "'Desde que se começou a trazer, temos comido e sobrado muito'",
      "Câmaras são preparadas e a distribuição é organizada",
    ],
    chave: 21,
  },
  32: {
    resumo:
      "Senaqueribe invade, e a preparação de Ezequias inclui obra de engenharia e discurso.",
    detalhe:
      "Crônicas detalha o que os outros livros resumem: ele tapa as fontes de água fora da cidade para não dar de beber ao invasor, reforça o muro e faz armas. O discurso aos capitães é uma das falas mais citadas, contrapondo o braço de carne do inimigo ao Senhor que está com eles para pelejar. A propaganda assíria é descrita com detalhe, inclusive por escrito, e o desfecho é registrado em uma linha.",
    marcos: [
      "As fontes de água fora da cidade são tapadas",
      "'Com ele está o braço de carne, mas conosco, o Senhor'",
      "A propaganda assíria é feita em voz alta e por carta",
      "O rei e o profeta oram e clamam ao céu",
      "Ezequias se ensoberbece e depois se humilha",
    ],
    chave: 8,
  },
  33: {
    resumo:
      "O pior rei de Judá é levado com ganchos para a Babilônia, e lá se arrepende.",
    detalhe:
      "A primeira metade descreve um reinado de cinquenta e cinco anos com altares dentro do templo, sacrifício de filhos e adivinhação, enchendo Jerusalém de sangue inocente. A segunda metade é exclusiva de Crônicas e é surpreendente: preso com ganchos e cadeias, ele se humilha muito, ora, e é ouvido e trazido de volta. E o texto diz que então soube que o Senhor era Deus. A conversão vem no fim e é tardia.",
    marcos: [
      "Manassés reconstrói os altos e levanta altares no templo",
      "Enche Jerusalém de sangue inocente",
      "É levado com ganchos e cadeias para a Babilônia",
      "'Na sua angústia, humilhou-se muito'",
      "'Então, conheceu Manassés que o Senhor era Deus'",
    ],
    chave: 12,
  },
  34: {
    resumo:
      "Josias começa a buscar com dezesseis anos, e o livro é achado durante a obra.",
    detalhe:
      "Crônicas dá as datas e mostra que a reforma começou antes do achado do livro, com ele buscando desde os dezesseis anos e purificando a terra a partir dos vinte. O livro aparece no meio da prestação de contas da obra, e a reação do rei é rasgar as vestes. A consulta é feita à profetisa Hulda, que responde com autoridade, e ele reúne todo o povo para ler as palavras em voz alta.",
    marcos: [
      "Aos dezesseis anos começou a buscar o Deus de Davi",
      "Aos vinte começou a purificar Judá e Jerusalém",
      "O livro da Lei é achado durante a reforma do templo",
      "Josias rasga as vestes ao ouvir",
      "A profetisa Hulda é consultada",
    ],
    chave: 3,
  },
  35: {
    resumo:
      "A maior Páscoa registrada, e uma morte evitável numa batalha que não era dele.",
    detalhe:
      "A celebração é descrita com números enormes de animais doados pelo rei e pelos príncipes, e o texto diz que não se celebrou Páscoa como aquela desde os dias de Samuel. O fim é abrupto e triste: Neco, rei do Egito, avisa que não vai contra ele e pede que não interfira, e Josias se disfarça e entra na batalha mesmo assim. Jeremias compõe lamentações por ele.",
    marcos: [
      "A Páscoa é celebrada com doações do rei e dos príncipes",
      "Os levitas ficam nos seus postos conforme a ordem",
      "'Não se celebrou Páscoa como esta desde os dias de Samuel'",
      "Neco avisa que não veio contra ele",
      "Josias se disfarça e é ferido em Megido",
    ],
    chave: 18,
  },
  36: {
    resumo:
      "Quatro reis em poucos anos, o templo queimado, e o livro termina com uma permissão de voltar.",
    detalhe:
      "O fim é acelerado, com reis depostos por potências estrangeiras e deportações sucessivas. A explicação dada é que Deus enviou mensageiros continuamente, porque se compadecia, e eles zombavam e escarneciam até não haver mais remédio. A terra descansa os sábados que não teve durante setenta anos. E então o último parágrafo muda tudo, com o decreto de Ciro autorizando a volta, e o livro termina com a palavra suba.",
    marcos: [
      "Quatro reis em rápida sucessão",
      "'O Senhor enviava mensageiros, porque se compadecia'",
      "'Zombavam até não haver mais remédio'",
      "A terra descansa os sábados durante setenta anos",
      "O decreto de Ciro autoriza a volta",
    ],
    chave: 16,
  },
};

CAPITULOS.mt = {
  1: {
    resumo:
      "Uma genealogia com quatro mulheres que ninguém esperaria encontrar numa lista real.",
    detalhe:
      "A lista parece formal e traz um detalhe que quebra a formalidade da época: Tamar, Raabe, Rute e a mulher de Urias aparecem no meio dos nomes masculinos, e todas carregam histórias complicadas ou origem estrangeira. Mateus está dizendo desde o primeiro capítulo de quem essa história é feita. A segunda parte mostra José decidindo agir com discrição antes de receber o sonho, o que já revela o caráter dele.",
    marcos: [
      "A genealogia em três blocos de catorze gerações",
      "Tamar, Raabe, Rute e a mulher de Urias na lista",
      "José resolve deixá-la secretamente",
      "'Não temas receber Maria, tua mulher'",
      "'Ele salvará o seu povo dos pecados deles'",
    ],
    chave: 23,
  },
  2: {
    resumo:
      "Estrangeiros vêm de longe seguindo uma estrela, e a capital se perturba com a notícia.",
    detalhe:
      "Os magos são do oriente e não conhecem as Escrituras, e mesmo assim chegam mais perto do que a corte, que sabia onde consultar. O texto diz que Herodes se perturbou e toda Jerusalém com ele, o que é um detalhe político. O capítulo é marcado por sonhos que salvam, e termina com a família refugiada no Egito, o que faz do Messias alguém que começou a vida fugindo de um decreto.",
    marcos: [
      "Magos do oriente perguntam pelo rei que nasceu",
      "Herodes se perturbou, e toda Jerusalém com ele",
      "Os sacerdotes indicam Belém pelas Escrituras",
      "A fuga para o Egito durante a noite",
      "A matança das crianças em Belém",
    ],
    chave: 11,
  },
  3: {
    resumo:
      "João prega no deserto, cobra fruto e não aceita genealogia como argumento.",
    detalhe:
      "A pregação é direta e desconfortável, chamando fariseus e saduceus de raça de víboras e derrubando o argumento de ascendência, dizendo que Deus pode fazer filhos de Abraão das pedras. O encontro com Jesus tem uma inversão interessante, porque João tenta impedir e recebe a explicação sobre cumprir toda a justiça. O capítulo termina com a voz do céu e a pomba.",
    marcos: [
      "'Arrependei-vos, porque está próximo o reino'",
      "'Produzi frutos dignos de arrependimento'",
      "Deus pode suscitar filhos a Abraão destas pedras",
      "João tenta impedir o batismo de Jesus",
      "'Este é o meu Filho amado'",
    ],
    chave: 8,
  },
  4: {
    resumo:
      "Três tentações no deserto respondidas com três citações do mesmo livro.",
    detalhe:
      "As respostas vêm todas de Deuteronômio, e a terceira desmonta o uso de Escritura fora de contexto, porque o tentador também cita um salmo. As tentações são sobre necessidade, espetáculo e poder, e nenhuma delas é obviamente pecaminosa à primeira vista, o que as torna mais sutis. O capítulo termina com o chamado dos primeiros discípulos, que deixam rede e barco imediatamente.",
    marcos: [
      "Jejua quarenta dias e quarenta noites",
      "'Nem só de pão viverá o homem'",
      "O tentador também cita a Escritura",
      "'Ao Senhor teu Deus adorarás'",
      "'Vinde após mim e eu vos farei pescadores de homens'",
    ],
    chave: 4,
  },
  5: {
    resumo:
      "O Sermão do Monte começa com bem-aventuranças que elogiam quem ninguém elogia.",
    detalhe:
      "As bem-aventuranças invertem a tabela de valores habitual, chamando de felizes os pobres de espírito, os que choram, os mansos e os perseguidos. Depois vêm as imagens do sal e da luz, e então seis blocos que aprofundam a lei em vez de afrouxá-la, levando o mandamento do ato para a intenção. A exigência sobre amar os inimigos e orar pelos perseguidores é a mais difícil de todo o sermão.",
    marcos: [
      "'Bem-aventurados os pobres de espírito'",
      "'Vós sois o sal da terra e a luz do mundo'",
      "'Não vim revogar, vim cumprir'",
      "'Qualquer que olhar para uma mulher com intenção impura'",
      "'Amai os vossos inimigos e orai pelos que vos perseguem'",
    ],
    chave: 44,
  },
  6: {
    resumo:
      "Esmola, oração e jejum são tratados como coisas de porta fechada.",
    detalhe:
      "O princípio que organiza o capítulo é sobre não praticar a justiça diante dos homens para ser visto, e ele se aplica às três práticas principais da religião judaica. A oração modelo é curta e comunitária, com todos os pedidos no plural. A segunda metade trata de dinheiro e ansiedade, com a observação de que ninguém pode servir a dois senhores e o convite a observar as aves e os lírios.",
    marcos: [
      "'Guardai-vos de exercer a vossa justiça diante dos homens'",
      "'Entra no teu quarto e fecha a porta'",
      "'Pai nosso, que estás nos céus'",
      "'Não podeis servir a Deus e às riquezas'",
      "'Basta ao dia o seu próprio mal'",
    ],
    chave: 33,
  },
  7: {
    resumo:
      "A trave no próprio olho, a porta estreita, e duas casas construídas em terrenos diferentes.",
    detalhe:
      "O capítulo não proíbe discernimento e sim a hipocrisia do julgamento, porque a instrução termina mandando tirar primeiro a trave para então enxergar bem e ajudar o outro. A regra de ouro é enunciada na forma positiva. O fecho é uma parábola construtiva: as duas casas enfrentam exatamente a mesma chuva, o mesmo rio e o mesmo vento, e o que as distingue é apenas o alicerce.",
    marcos: [
      "'Por que vês o argueiro no olho do teu irmão?'",
      "'Tudo quanto quereis que os homens vos façam, fazei-o vós a eles'",
      "'Entrai pela porta estreita'",
      "'Pelos seus frutos os conhecereis'",
      "As duas casas e a mesma tempestade",
    ],
    chave: 12,
  },
  8: {
    resumo:
      "Uma sequência de curas, incluindo a de um oficial romano que não quis que ele fosse até lá.",
    detalhe:
      "O leproso é tocado, o que era impensável, e a ordem das palavras importa, porque Jesus estende a mão antes de falar. O centurião argumenta com lógica militar sobre autoridade e ordens, e recebe o elogio mais forte do capítulo. A tempestade acalmada termina com uma pergunta dos discípulos sobre quem é aquele homem, que é a pergunta que o evangelho inteiro responde.",
    marcos: [
      "O leproso é tocado antes de ser curado",
      "O centurião diz que basta uma palavra",
      "'Nem mesmo em Israel achei fé como esta'",
      "'As raposas têm covis, mas o Filho do Homem não tem onde reclinar a cabeça'",
      "'Quem é este, que até os ventos e o mar lhe obedecem?'",
    ],
    chave: 10,
  },
  9: {
    resumo:
      "Um paralítico descido por amigos, um cobrador de impostos chamado, e críticas às companhias.",
    detalhe:
      "A primeira cena mistura perdão e cura e provoca acusação de blasfêmia. A segunda é o chamado de Mateus no posto de cobrança, seguida do jantar que escandaliza os fariseus. A resposta de Jesus usa a imagem do médico e cita Oseias sobre misericórdia e não sacrifício. O capítulo termina com a observação de que ele viu as multidões cansadas e abatidas como ovelhas sem pastor.",
    marcos: [
      "O paralítico ouve primeiro que os pecados estão perdoados",
      "Mateus é chamado na coletoria",
      "'Não necessitam de médico os sãos'",
      "'Misericórdia quero e não sacrifício'",
      "'A seara é grande, mas os trabalhadores são poucos'",
    ],
    chave: 13,
  },
  10: {
    resumo:
      "Os doze são enviados com instruções práticas e avisos que não escondem o custo.",
    detalhe:
      "As instruções são concretas, sobre o que levar, onde ficar e como sair de onde não forem recebidos. O tom muda depois, com avisos sobre tribunais, açoites e divisão dentro da própria família. A frase sobre serem prudentes como as serpentes e símplices como as pombas resume a postura pedida. E há o consolo sobre os cabelos da cabeça estarem todos contados.",
    marcos: [
      "Os doze apóstolos são nomeados",
      "'De graça recebestes, de graça dai'",
      "'Sede prudentes como as serpentes e símplices como as pombas'",
      "'Até os vossos cabelos estão todos contados'",
      "'Quem não toma a sua cruz e vem após mim'",
    ],
    chave: 16,
  },
  11: {
    resumo:
      "João manda perguntar da cadeia se é ele mesmo, e Jesus responde listando fatos.",
    detalhe:
      "A dúvida de João é registrada sem constrangimento, e a resposta não é uma afirmação e sim uma lista do que estava acontecendo, ecoando Isaías 35. Logo depois Jesus faz o maior elogio possível a João, dizendo que entre os nascidos de mulher não surgiu maior. O capítulo termina com o convite mais suave do evangelho, dirigido aos cansados e sobrecarregados.",
    marcos: [
      "'És tu aquele que havia de vir ou esperamos outro?'",
      "'Ide e anunciai a João o que ouvis e vedes'",
      "'Entre os nascidos de mulher, ninguém apareceu maior do que João'",
      "'Vinde a mim, todos os que estais cansados e sobrecarregados'",
      "'O meu jugo é suave e o meu fardo é leve'",
    ],
    chave: 28,
  },
  12: {
    resumo:
      "Duas discussões sobre o sábado e uma acusação grave feita pelos fariseus.",
    detalhe:
      "A primeira discussão é sobre discípulos colhendo espigas, e Jesus argumenta com o caso de Davi e com o trabalho dos sacerdotes no templo. A segunda é sobre curar num sábado, e ele usa o exemplo da ovelha caída no poço. Quando é acusado de expulsar demônios pelo príncipe deles, a resposta expõe a incoerência do argumento. O capítulo também redefine família pelos que fazem a vontade do Pai.",
    marcos: [
      "Os discípulos colhem espigas no sábado",
      "'É lícito fazer o bem no sábado'",
      "'Todo reino dividido contra si mesmo é devastado'",
      "'O homem bom tira coisas boas do bom tesouro'",
      "'Quem é minha mãe e quem são meus irmãos?'",
    ],
    chave: 7,
  },
  13: {
    resumo:
      "Sete parábolas sobre o reino, começando com a do semeador e quatro tipos de terreno.",
    detalhe:
      "A explicação sobre por que ele fala por parábolas é dada no meio do capítulo e não é simples, porque envolve tanto revelar quanto velar. As imagens escolhidas são todas pequenas e domésticas: sementes, fermento, tesouro escondido, pérola e rede. A parábola do joio traz um princípio incômodo sobre não arrancar antes do tempo para não arrancar o trigo junto.",
    marcos: [
      "A parábola do semeador e os quatro terrenos",
      "O joio e a ordem de deixar crescer junto",
      "O grão de mostarda e o fermento",
      "O tesouro escondido e a pérola de grande valor",
      "'Um profeta não fica sem honra, senão na sua terra'",
    ],
    chave: 23,
  },
  14: {
    resumo:
      "Ele busca um lugar deserto depois de uma notícia ruim, e a multidão chega antes.",
    detalhe:
      "O capítulo começa com a morte de João, contada em retrospecto, e o detalhe humano mais forte é que Jesus se retira para um lugar deserto ao saber. A multidão o segue, e ele se compadece em vez de reclamar. A multiplicação acontece com o que já havia, cinco pães e dois peixes. Depois vem a caminhada sobre o mar, com Pedro afundando no momento exato em que repara no vento.",
    marcos: [
      "A morte de João Batista é contada",
      "Jesus se retira para um lugar deserto",
      "Cinco pães e dois peixes para cinco mil homens",
      "Ele anda sobre o mar na quarta vigília",
      "'Homem de pequena fé, por que duvidaste?'",
    ],
    chave: 14,
  },
  15: {
    resumo:
      "Uma discussão sobre lavar as mãos vira uma aula sobre o que realmente contamina.",
    detalhe:
      "A crítica de Jesus é sobre usar tradição religiosa para escapar de obrigação familiar, com o exemplo de declarar oferta o que seria sustento dos pais. A frase central desloca o problema do que entra pela boca para o que sai do coração. A segunda parte é o encontro com a mulher cananeia, cuja insistência e resposta sobre as migalhas quebram a barreira e recebem o elogio de grande fé.",
    marcos: [
      "'Por que transgredis o mandamento de Deus por causa da vossa tradição?'",
      "'Este povo honra-me com os lábios'",
      "'O que sai da boca é que contamina o homem'",
      "A mulher cananeia responde sobre as migalhas",
      "'Ó mulher, grande é a tua fé!'",
    ],
    chave: 11,
  },
  16: {
    resumo:
      "Pedro acerta quem ele é e erra o que isso significa, em poucos versículos.",
    detalhe:
      "A confissão em Cesareia de Filipe é o divisor do evangelho, e Jesus a atribui a revelação e não a dedução. Logo em seguida, quando o assunto vira sofrimento e morte, o mesmo Pedro tenta corrigi-lo e recebe a repreensão mais dura registrada. O contraste mostra que reconhecer o título não é o mesmo que aceitar o caminho. O capítulo termina com o convite sobre negar-se e tomar a cruz.",
    marcos: [
      "'Quem dizem os homens ser o Filho do Homem?'",
      "'Tu és o Cristo, o Filho do Deus vivo'",
      "'Não foi carne e sangue que to revelaram'",
      "'Para trás de mim, Satanás!'",
      "'Que aproveitará o homem se ganhar o mundo inteiro?'",
    ],
    chave: 16,
  },
  17: {
    resumo:
      "Três discípulos veem algo no monte e descem para encontrar um problema que não resolveram.",
    detalhe:
      "A transfiguração tem Moisés e Elias conversando com ele, e a proposta de Pedro de fazer três tendas é interrompida pela nuvem. A descida é abrupta e encontra um pai desesperado e discípulos que falharam. A explicação sobre o tamanho da fé usa a imagem do grão de mostarda. O capítulo fecha com o episódio da moeda na boca do peixe, resolvendo uma questão de imposto sem criar escândalo.",
    marcos: [
      "O rosto resplandece como o sol no alto do monte",
      "Moisés e Elias aparecem falando com ele",
      "'Este é o meu Filho amado; a ele ouvi'",
      "'Se tiverdes fé como um grão de mostarda'",
      "A moeda encontrada na boca do peixe",
    ],
    chave: 20,
  },
  18: {
    resumo:
      "Eles perguntam quem é o maior, e ele põe uma criança no meio da roda.",
    detalhe:
      "A resposta é um gesto antes de ser uma frase, e a exigência é de conversão e não apenas de humildade. O capítulo trata de relações dentro da comunidade, com o cuidado extremo para não escandalizar os pequenos, a busca da ovelha que se perdeu, e um procedimento em etapas para resolver conflitos, começando sempre entre as duas pessoas a sós. A parábola final é sobre proporção no perdão.",
    marcos: [
      "Uma criança é posta no meio deles",
      "'Se não vos converterdes e não vos tornardes como crianças'",
      "As noventa e nove e a que se perdeu",
      "'Vai e repreende-o entre ti e ele só'",
      "A parábola do servo que devia dez mil talentos",
    ],
    chave: 20,
  },
  19: {
    resumo:
      "Perguntas sobre divórcio, crianças e dinheiro, todas respondidas voltando ao princípio.",
    detalhe:
      "Na questão do divórcio, ele não discute a jurisprudência da época e sim remete ao desenho original de Gênesis, e explica a concessão de Moisés pela dureza do coração. Quando trazem crianças, os discípulos as repreendem e ele os corrige. O jovem rico sai triste, e a conversa seguinte sobre camelo e agulha leva os discípulos a perguntarem quem então pode ser salvo.",
    marcos: [
      "'Não tendes lido que no princípio os fez homem e mulher?'",
      "'Deixai os pequeninos e não os embaraceis'",
      "'Se queres ser perfeito, vai, vende os teus bens'",
      "'É mais fácil passar um camelo pelo fundo de uma agulha'",
      "'Para Deus tudo é possível'",
    ],
    chave: 26,
  },
  20: {
    resumo:
      "Uma parábola sobre salário igual para horas diferentes, e um pedido de lugares de honra.",
    detalhe:
      "A parábola dos trabalhadores da vinha incomoda porque contraria a lógica de mérito, e a defesa do dono é sobre generosidade e não sobre injustiça, já que ninguém recebeu menos do que combinou. Logo depois, a mãe de dois discípulos pede os melhores lugares, e a resposta redefine grandeza por serviço, com a frase sobre o Filho do Homem ter vindo para servir e dar a vida em resgate.",
    marcos: [
      "Trabalhadores contratados em horas diferentes recebem o mesmo",
      "'Não me é lícito fazer o que quero do que é meu?'",
      "A mãe de Tiago e João pede os dois lugares",
      "'Quem quiser tornar-se grande entre vós será vosso servo'",
      "'Não veio para ser servido, mas para servir'",
    ],
    chave: 28,
  },
  21: {
    resumo:
      "A entrada em Jerusalém num jumentinho, e a limpeza do templo no dia seguinte.",
    detalhe:
      "A escolha do animal é deliberada e cita Zacarias 9, porque um rei que entra em jumento não vem em campanha militar. A ação no templo é direta, derrubando mesas de cambistas e citando Isaías sobre casa de oração e Jeremias sobre covil de salteadores. A figueira sem figos e as duas parábolas seguintes formam um bloco sobre fruto e sobre quem de fato faz a vontade do pai.",
    marcos: [
      "A entrada montado num jumentinho",
      "As mesas dos cambistas são derrubadas",
      "'A minha casa será chamada casa de oração'",
      "A figueira sem fruto é amaldiçoada",
      "A parábola dos dois filhos e a dos lavradores maus",
    ],
    chave: 13,
  },
  22: {
    resumo:
      "Quatro perguntas armadas em sequência, e no fim ninguém ousa perguntar mais nada.",
    detalhe:
      "A parábola do banquete abre o capítulo com convidados que não querem ir. Depois vêm as ciladas: o imposto a César, com a resposta sobre a imagem da moeda; a ressurreição, com o caso hipotético dos sete maridos; e o maior mandamento, respondido com dois textos unidos, de Deuteronômio e de Levítico. A última pergunta é dele para eles, e ninguém consegue responder.",
    marcos: [
      "A parábola das bodas e os convidados que não vêm",
      "'De quem é esta efígie?'",
      "'Dai a César o que é de César'",
      "'Errais, não conhecendo as Escrituras nem o poder de Deus'",
      "'Amarás o Senhor teu Deus de todo o teu coração'",
    ],
    chave: 37,
  },
  23: {
    resumo:
      "Sete ais contra hipocrisia religiosa, terminando num lamento sobre a cidade.",
    detalhe:
      "O capítulo é o discurso mais duro de Jesus e o alvo não é a lei e sim a distância entre falar e fazer. As imagens são visuais e cruéis, com filtro de mosquito e engolida de camelo, copos limpos por fora e sujos por dentro, e sepulcros caiados. A crítica mais séria é sobre negligenciar o mais importante da lei, que ele nomeia como justiça, misericórdia e fé. O fim é de ternura inesperada, com a imagem da galinha e dos pintinhos.",
    marcos: [
      "'Dizem e não fazem'",
      "'Coai o mosquito e engolis o camelo'",
      "'Negligenciais a justiça, a misericórdia e a fé'",
      "Sepulcros caiados, belos por fora",
      "'Quantas vezes quis reunir os teus filhos, como a galinha'",
    ],
    chave: 23,
  },
  24: {
    resumo:
      "Sobre o fim, com muitos avisos para não se assustar e nenhuma data.",
    detalhe:
      "A conversa começa com os discípulos admirando as pedras do templo. As respostas misturam a destruição próxima e o fim, e o que se repete é a ordem de não se deixarem enganar. Há uma advertência explícita contra quem anuncia data ou lugar. A frase sobre ninguém saber o dia nem a hora, nem os anjos, é o limite declarado, e a conclusão prática é vigilância e não cálculo.",
    marcos: [
      "'Não ficará aqui pedra sobre pedra'",
      "'Vede, não vos deixeis enganar'",
      "'Ainda não é o fim'",
      "'Daquele dia e hora ninguém sabe'",
      "'Vigiai, porque não sabeis em que dia vem o vosso Senhor'",
    ],
    chave: 36,
  },
  25: {
    resumo:
      "Três parábolas sobre espera, uso do que se recebeu, e o critério final do julgamento.",
    detalhe:
      "As dez virgens tratam de preparo que não se empresta na última hora. Os talentos tratam de risco, e o servo condenado é justamente o que não perdeu nada, apenas não fez nada. A cena final separa por um critério que surpreende os dois lados, porque nenhum dos grupos sabia o que estava fazendo: o que foi feito ao faminto, ao sedento, ao estrangeiro, ao nu, ao doente e ao preso.",
    marcos: [
      "As cinco prudentes e as cinco néscias",
      "'Não vos conheço'",
      "O servo que escondeu o talento na terra",
      "'Tive fome e me destes de comer'",
      "'Sempre que o fizestes a um destes meus pequeninos, a mim o fizestes'",
    ],
    chave: 40,
  },
  26: {
    resumo:
      "Uma unção cara, uma ceia, um jardim e uma negação, tudo na mesma noite.",
    detalhe:
      "A mulher que quebra o vaso de perfume é criticada pelo desperdício e defendida por ele. A ceia reinterpreta a Páscoa com pão e cálice. No Getsêmani o texto registra tristeza até a morte e a oração repetida três vezes, com o pedido de passar o cálice e a entrega à vontade do Pai. A prisão acontece com um beijo, e Pedro nega três vezes antes do galo cantar.",
    marcos: [
      "O perfume derramado e a crítica ao desperdício",
      "'Isto é o meu corpo' e 'isto é o meu sangue'",
      "'A minha alma está profundamente triste até a morte'",
      "'Não seja como eu quero, e sim como tu queres'",
      "Pedro nega três vezes e chora amargamente",
    ],
    chave: 39,
  },
  27: {
    resumo:
      "Um julgamento político, uma execução pública, e o véu do templo rasgado.",
    detalhe:
      "Judas devolve o dinheiro e ninguém quer, e a soma acaba comprando um campo. Pilatos lava as mãos num gesto que não o exime. A zombaria é detalhada, com coroa de espinhos, manto e caniço. O grito na cruz é a primeira linha do Salmo 22. O véu rasgado de alto a baixo é a imagem que Mateus escolhe para dizer o que aconteceu, e quem faz a confissão final é o centurião.",
    marcos: [
      "Judas devolve as trinta moedas e se enforca",
      "Pilatos lava as mãos diante da multidão",
      "A coroa de espinhos e o manto escarlate",
      "'Deus meu, Deus meu, por que me desamparaste?'",
      "O véu do santuário se rasga de alto a baixo",
    ],
    chave: 51,
  },
  28: {
    resumo:
      "As primeiras testemunhas são mulheres, e o evangelho termina com uma ordem e uma promessa.",
    detalhe:
      "Num contexto em que o testemunho feminino não valia em tribunal, o texto registra que foram elas as primeiras a ver e a ser enviadas com a notícia. O capítulo também registra, sem esconder, que alguns duvidaram mesmo ao vê-lo. A comissão final tem um verbo principal, que é fazer discípulos, e termina com a promessa de estar junto todos os dias até a consumação do século.",
    marcos: [
      "As mulheres chegam ao sepulcro no primeiro dia",
      "'Não está aqui; ressuscitou'",
      "Os guardas são subornados para contar outra versão",
      "'Adoraram-no; alguns, porém, duvidaram'",
      "'Eis que estou convosco todos os dias'",
    ],
    chave: 20,
  },
};

CAPITULOS.mc = {
  1: {
    resumo:
      "Sem genealogia e sem infância, o evangelho começa correndo e não para mais.",
    detalhe:
      "Marcos é o mais curto e o mais veloz dos quatro, e a palavra logo aparece dezenas de vezes no livro. As tentações no deserto, que Mateus narra em detalhe, aqui ocupam dois versículos. O capítulo cobre um dia inteiro em Cafarnaum, com ensino na sinagoga, cura da sogra de Pedro e a cidade toda à porta ao anoitecer, e termina com ele se levantando de madrugada para orar num lugar deserto.",
    marcos: [
      "'Princípio do evangelho de Jesus Cristo'",
      "O batismo e os céus rasgando-se",
      "'Vinde após mim, e eu vos farei pescadores de homens'",
      "Toda a cidade se ajunta à porta ao anoitecer",
      "De madrugada, retira-se para orar num lugar deserto",
    ],
    chave: 35,
  },
  2: {
    resumo:
      "Um telhado é aberto, um cobrador é chamado, e começam os conflitos com os religiosos.",
    detalhe:
      "O capítulo reúne cinco controvérsias em sequência, e o padrão é sempre o mesmo, com uma ação seguida de crítica e de uma resposta que amplia a questão. A cena do paralítico tem o detalhe da cobertura removida por amigos determinados. As respostas incluem a imagem do médico, do vinho novo em odres velhos, e a afirmação de que o sábado foi feito por causa do homem.",
    marcos: [
      "O teto é aberto e o paralítico é descido",
      "'Filho, os teus pecados estão perdoados'",
      "Levi é chamado na coletoria",
      "Vinho novo em odres novos",
      "'O sábado foi estabelecido por causa do homem'",
    ],
    chave: 27,
  },
  3: {
    resumo:
      "Ele cura num sábado com raiva e tristeza, e a própria família vem buscá-lo.",
    detalhe:
      "Marcos é o único que registra a emoção de Jesus antes da cura da mão ressequida, dizendo que ele olhou ao redor com indignação e condoído da dureza do coração deles. Logo depois os adversários começam a conspirar. O capítulo tem dois detalhes que só este evangelho traz: os parentes dizendo que ele estava fora de si, e a acusação dos escribas vinda de Jerusalém.",
    marcos: [
      "A cura da mão ressequida no sábado",
      "Ele olha com indignação, condoído da dureza deles",
      "Os doze são designados para estarem com ele",
      "Os parentes dizem que está fora de si",
      "'Quem é minha mãe e meus irmãos?'",
    ],
    chave: 5,
  },
  4: {
    resumo:
      "Parábolas de semente, e uma tempestade em que ele dorme sobre um travesseiro.",
    detalhe:
      "A parábola do semeador vem com explicação detalhada, e Marcos acrescenta a da semente que cresce sozinha enquanto o lavrador dorme, sem que ele saiba como. A imagem da medida com que medimos aparece aqui. A tempestade traz um detalhe doméstico que só este evangelho dá, sobre ele estar dormindo na popa sobre um travesseiro, e a pergunta dos discípulos é quase uma acusação.",
    marcos: [
      "A parábola do semeador e os quatro terrenos",
      "'Com a medida com que tiverdes medido vos medirão'",
      "A semente que brota sem que o lavrador saiba como",
      "Ele dormia na popa, sobre um travesseiro",
      "'Não te importa que pereçamos?'",
    ],
    chave: 38,
  },
  5: {
    resumo:
      "Três histórias de resgate, com um homem entre os sepulcros e duas filhas.",
    detalhe:
      "O endemoninhado é descrito com detalhe clínico, ninguém conseguia prendê-lo nem com correntes, e ele se feria com pedras. Depois da cura, ele pede para ir junto e é mandado voltar para casa e contar. A história de Jairo é interrompida pela mulher com hemorragia de doze anos, que tinha gastado tudo com médicos e piorado, e a menina tem justamente doze anos.",
    marcos: [
      "O homem que vivia entre os sepulcros",
      "'Vai para tua casa, para os teus, e anuncia-lhes'",
      "A mulher gastara tudo com médicos e piorara",
      "'Filha, a tua fé te salvou'",
      "'Talita cumi', que quer dizer: menina, levanta-te",
    ],
    chave: 34,
  },
  6: {
    resumo:
      "Rejeitado na própria cidade, ele envia os doze e alimenta uma multidão.",
    detalhe:
      "Marcos é o único que diz que ele não pôde fazer ali nenhum milagre notável e que se admirou da incredulidade deles. O envio dos doze é com instruções mínimas, sem pão, sem alforje e sem dinheiro. A morte de João é contada em detalhe, com o rei entristecido e preso ao juramento. Antes da multiplicação, Marcos registra que ele se compadeceu porque eram como ovelhas sem pastor.",
    marcos: [
      "'Não há profeta sem honra, senão na sua terra'",
      "Admirou-se da incredulidade deles",
      "Os doze são enviados dois a dois",
      "A morte de João Batista na festa de Herodes",
      "Compadeceu-se, porque eram como ovelhas sem pastor",
    ],
    chave: 34,
  },
  7: {
    resumo:
      "Sobre tradição e coração, com uma mulher estrangeira que vence o argumento.",
    detalhe:
      "Marcos explica os costumes judaicos para leitores que não os conheciam, o que indica um público não judeu. A crítica é sobre invalidar o mandamento de honrar pai e mãe por meio de uma regra religiosa. A siro-fenícia responde com inteligência sobre os cachorrinhos e as migalhas e é atendida. A cura do surdo tem detalhes físicos e a palavra aramaica preservada.",
    marcos: [
      "'Invalidais a palavra de Deus pela vossa tradição'",
      "'O que sai do homem é que o contamina'",
      "A mulher siro-fenícia e a resposta sobre as migalhas",
      "'Por causa desta palavra, podes ir'",
      "'Efatá', que quer dizer: abre-te",
    ],
    chave: 15,
  },
  8: {
    resumo:
      "Um cego é curado em duas etapas, bem no meio de um evangelho sobre enxergar aos poucos.",
    detalhe:
      "A cura em Betsaida é única e estranha: depois do primeiro toque o homem vê homens como árvores que andam, e só depois do segundo enxerga claramente. A posição dela no livro não é acidental, porque vem logo antes de Pedro confessar corretamente quem ele é e em seguida errar completamente sobre o que isso implica. É a imagem de uma visão que se forma por etapas.",
    marcos: [
      "A segunda multiplicação, agora para quatro mil",
      "'Tendes olhos e não vedes?'",
      "O cego vê homens como árvores que andam",
      "'Tu és o Cristo'",
      "'Se alguém quer vir após mim, negue-se a si mesmo'",
    ],
    chave: 24,
  },
  9: {
    resumo:
      "Depois do monte, um pai desesperado diz a frase mais honesta dos evangelhos.",
    detalhe:
      "A transfiguração é seguida de uma cena caótica, com discípulos que falharam e uma multidão discutindo. O pai descreve os sintomas do filho em detalhe e faz um pedido com um se condicional, que Jesus devolve. A resposta dele é a frase sobre crer e ao mesmo tempo pedir ajuda para a incredulidade. O capítulo também registra a discussão sobre quem era o maior, que eles tiveram no caminho e não quiseram admitir.",
    marcos: [
      "As vestes tornam-se resplandecentes no monte",
      "'Se podes? Tudo é possível ao que crê'",
      "'Eu creio! Ajuda-me na minha falta de fé'",
      "Discutiram no caminho sobre qual seria o maior",
      "'Se alguém quer ser o primeiro, será o último de todos'",
    ],
    chave: 24,
  },
  10: {
    resumo:
      "Um homem rico sai triste, e um mendigo cego joga a capa fora para correr.",
    detalhe:
      "Marcos é o único que diz que Jesus fitou o jovem rico e o amou antes de responder. O contraste com Bartimeu fecha o capítulo: um tinha muito e não largou, o outro tinha só a capa e a jogou fora. Entre os dois estão o pedido de Tiago e João por lugares de honra e a resposta sobre grandeza por serviço, com a frase sobre dar a vida em resgate de muitos.",
    marcos: [
      "'Deixai vir a mim os pequeninos'",
      "Jesus, fitando-o, o amou",
      "'É mais fácil passar um camelo pelo fundo de uma agulha'",
      "'Quem quiser tornar-se grande será o que vos sirva'",
      "Bartimeu lança fora a capa e corre",
    ],
    chave: 45,
  },
  11: {
    resumo:
      "A entrada, a figueira e o templo, com as três cenas entrelaçadas de propósito.",
    detalhe:
      "Marcos intercala a maldição da figueira com a ação no templo, e a montagem é o argumento: as duas cenas falam de aparência sem fruto. Ele também registra que Jesus entrou no templo no primeiro dia, olhou tudo em volta e saiu, porque já era tarde, o que mostra uma ação pensada e não impulsiva. A conversa sobre a figueira seca vira ensino sobre fé, oração e perdão.",
    marcos: [
      "O jumentinho é buscado conforme a instrução",
      "Ele entra no templo, olha tudo em redor e sai",
      "A figueira com folhas e sem figos",
      "'A minha casa será chamada casa de oração para todas as nações'",
      "'Quando estiverdes orando, perdoai'",
    ],
    chave: 17,
  },
  12: {
    resumo:
      "Perguntas armadas, respostas certeiras, e uma viúva que dá duas moedinhas.",
    detalhe:
      "A parábola dos lavradores é entendida na hora pelos ouvintes, que percebem que foi dita contra eles. As três perguntas seguintes, sobre imposto, ressurreição e o maior mandamento, terminam com um escriba concordando sinceramente e sendo elogiado. A cena final é observacional: ele senta em frente ao gazofilácio e fica olhando como as pessoas depositavam, e comenta que ela deu tudo o que tinha.",
    marcos: [
      "A parábola dos lavradores maus",
      "'Dai a César o que é de César'",
      "'Não é Deus de mortos, mas de vivos'",
      "'Não estás longe do reino de Deus'",
      "A viúva lançou tudo o que tinha para viver",
    ],
    chave: 44,
  },
  13: {
    resumo:
      "Sobre o fim, começando com um discípulo admirando as pedras do templo.",
    detalhe:
      "O capítulo é o discurso mais longo de Marcos e o verbo que domina é vigiar. As instruções são práticas, incluindo a de não voltar para pegar as roupas e a preocupação com grávidas e lactantes. O aviso contra quem anuncia lugar ou data é explícito. E o fecho é uma parábola curta sobre um porteiro encarregado de vigiar, com a ordem repetida a todos.",
    marcos: [
      "'Vês estas grandes construções?'",
      "'Vede que ninguém vos engane'",
      "'Nem os anjos, nem o Filho, senão o Pai'",
      "A parábola do porteiro que vigia",
      "'O que vos digo, digo a todos: vigiai!'",
    ],
    chave: 37,
  },
  14: {
    resumo:
      "O perfume, a ceia, o jardim e a prisão, com um jovem fugindo nu no escuro.",
    detalhe:
      "A mulher que quebra o vaso recebe a promessa de que o que ela fez seria contado onde o evangelho fosse pregado. No Getsêmani, Marcos preserva a palavra aramaica Aba na oração. O detalhe mais curioso do evangelho está aqui, com um jovem que seguia envolto num lençol e que foge nu ao ser agarrado, cena que só este livro registra e que muitos leem como assinatura do autor.",
    marcos: [
      "O vaso de nardo é quebrado sobre a cabeça dele",
      "'Isto é o meu corpo'",
      "'Aba, Pai, tudo te é possível'",
      "Um jovem foge nu, deixando o lençol",
      "Pedro nega três vezes antes do galo cantar duas",
    ],
    chave: 36,
  },
  15: {
    resumo:
      "O julgamento, a zombaria e a cruz, com o centurião fazendo a confissão final.",
    detalhe:
      "Marcos marca as horas com precisão, a terceira, a sexta e a nona, dando ao relato um ritmo de cronologia. Simão Cirineu é identificado pelos nomes dos filhos, o que sugere que eram conhecidos da comunidade que lia. O grito na cruz é preservado em aramaico. E quem diz a frase que resume o evangelho inteiro não é um discípulo, e sim o oficial romano que estava em frente e viu como ele expirou.",
    marcos: [
      "Pilatos entrega Jesus depois de perceber a inveja",
      "Simão Cirineu é obrigado a carregar a cruz",
      "'Eloí, Eloí, lamá sabactâni?'",
      "O véu do santuário se rasga de alto a baixo",
      "'Verdadeiramente este homem era Filho de Deus'",
    ],
    chave: 39,
  },
  16: {
    resumo:
      "Elas vão ao sepulcro preocupadas com a pedra, e encontram tudo diferente.",
    detalhe:
      "A pergunta delas no caminho é bem prática, sobre quem removeria a pedra, e é o tipo de detalhe que faz o relato soar vivido. O anúncio inclui um recado específico a Pedro, que tinha negado. Os manuscritos mais antigos terminam no versículo 8, com as mulheres fugindo tremendo e com medo, e o trecho seguinte aparece em outras cópias, fato que as boas edições registram em nota.",
    marcos: [
      "'Quem nos removerá a pedra?'",
      "A pedra já estava removida, e era muito grande",
      "'Ide, dizei a seus discípulos e a Pedro'",
      "As mulheres fogem tremendo e atônitas",
      "A comissão de pregar o evangelho a toda criatura",
    ],
    chave: 6,
  },
};

CAPITULOS.jo = {
  1: {
    resumo:
      "Começa antes de tudo, com a Palavra, e desce até armar tenda entre as pessoas.",
    detalhe:
      "O prólogo ecoa Gênesis 1 de propósito e vai recuando até antes do princípio. O verbo do versículo 14 é literalmente armar tenda, o que liga a encarnação ao tabernáculo do deserto. O capítulo também registra a honestidade de João Batista, que responde três vezes dizendo o que não é antes de dizer o que é. E termina com discípulos sendo chamados um a um, incluindo o cético Natanael.",
    marcos: [
      "'No princípio era o Verbo'",
      "'O Verbo se fez carne e habitou entre nós'",
      "'Eis o Cordeiro de Deus'",
      "'Que buscais?', a primeira pergunta de Jesus",
      "'Pode vir alguma coisa boa de Nazaré?'",
    ],
    chave: 14,
  },
  2: {
    resumo:
      "O primeiro sinal acontece numa festa de casamento, resolvendo um problema social.",
    detalhe:
      "O milagre é discreto e ninguém além dos serventes percebe de onde veio o vinho. Os jarros eram de purificação ritual, o que dá ao gesto um sentido além da bebida. O mestre-sala comenta que o melhor foi deixado para o fim. A segunda metade do capítulo é o oposto em tom, com a ação enérgica no templo, feita com um azorrague de cordas, e a frase sobre destruir o santuário e levantá-lo em três dias.",
    marcos: [
      "As bodas em Caná e o vinho que acabou",
      "Seis talhas de pedra para a purificação",
      "'Guardaste o bom vinho até agora'",
      "O azorrague de cordas no templo",
      "'Destruí este santuário, e em três dias o reconstruirei'",
    ],
    chave: 11,
  },
  3: {
    resumo:
      "Uma conversa noturna com um mestre que não entende a ideia de nascer de novo.",
    detalhe:
      "Nicodemos chega de noite, detalhe que João registra e retoma depois. A expressão usada por Jesus pode significar tanto de novo quanto do alto, e o mal-entendido de Nicodemos é literal. O versículo 16 é o mais citado da Bíblia e vem logo depois da imagem da serpente levantada no deserto. O capítulo termina com João Batista dizendo que precisa diminuir, o que é raro em qualquer época.",
    marcos: [
      "Nicodemos vem de noite",
      "'Quem não nascer de novo não pode ver o reino'",
      "'O vento sopra onde quer'",
      "'Deus amou ao mundo de tal maneira'",
      "'Convém que ele cresça e que eu diminua'",
    ],
    chave: 16,
  },
  4: {
    resumo:
      "Ao meio-dia, junto a um poço, ele pede água a uma mulher que todos evitavam.",
    detalhe:
      "Tudo na cena é improvável para a época: um judeu falando com uma samaritana, um homem com uma mulher sozinha, e um rabino com alguém de vida complicada. Ela chega ao poço no horário mais quente, provavelmente para evitar as outras mulheres. A conversa vai de água para adoração, e ela sai deixando o cântaro, detalhe pequeno e eloquente. A cidade inteira vem por causa do testemunho dela.",
    marcos: [
      "Ele pede água a uma mulher samaritana",
      "'Se conhecesses o dom de Deus'",
      "'Os verdadeiros adoradores adorarão em espírito e em verdade'",
      "Ela deixa o cântaro e corre para a cidade",
      "'Sabemos que este é o Salvador do mundo'",
    ],
    chave: 24,
  },
  5: {
    resumo:
      "Um homem espera há trinta e oito anos, e recebe uma pergunta antes de ser curado.",
    detalhe:
      "A pergunta sobre querer ficar são parece estranha e é psicologicamente precisa, porque o homem responde com uma queixa e não com um sim. A cura acontece num sábado e gera o conflito que domina o resto do capítulo. A defesa de Jesus é longa e cita testemunhas, incluindo João, as obras, o Pai e as próprias Escrituras, com a observação de que eles as examinam e não vão a ele.",
    marcos: [
      "Trinta e oito anos junto ao tanque",
      "'Queres ser curado?'",
      "'Meu Pai trabalha até agora, e eu trabalho também'",
      "'Examinais as Escrituras'",
      "'E não quereis vir a mim para terdes vida'",
    ],
    chave: 6,
  },
  6: {
    resumo:
      "Depois de alimentar cinco mil, ele diz algo tão duro que quase todos vão embora.",
    detalhe:
      "João é o único que menciona o menino com os cinco pães e os dois peixes. A multidão volta no dia seguinte e ele diz na cara deles que o buscam por causa do pão que comeram. O discurso sobre ser o pão da vida fica cada vez mais difícil, e o capítulo registra que muitos discípulos se retiraram. A pergunta feita aos doze e a resposta de Pedro sobre para quem iriam fecham o bloco.",
    marcos: [
      "Um menino com cinco pães e dois peixinhos",
      "'Buscais-me porque comestes do pão e vos saciastes'",
      "'Eu sou o pão da vida'",
      "'Muitos dos seus discípulos voltaram atrás'",
      "'Senhor, para quem iremos?'",
    ],
    chave: 35,
  },
  7: {
    resumo:
      "Durante a festa, a opinião pública se divide e os guardas voltam sem prendê-lo.",
    detalhe:
      "O capítulo mostra bastidores: os próprios irmãos dele não criam e o provocavam a aparecer mais. A multidão discute em voz baixa por medo. No último dia da festa, quando havia o rito da água, ele fica de pé e grita o convite sobre a sede. Os guardas voltam de mãos vazias com uma justificativa que vira elogio, e Nicodemos levanta uma questão processual e é ridicularizado.",
    marcos: [
      "Nem os seus irmãos criam nele",
      "'Se alguém tem sede, venha a mim e beba'",
      "'Jamais alguém falou como este homem'",
      "Nicodemos pergunta se a lei julga sem ouvir",
      "A multidão se divide por causa dele",
    ],
    chave: 37,
  },
  8: {
    resumo:
      "Uma mulher é trazida como isca para uma armadilha jurídica, e ele escreve no chão.",
    detalhe:
      "O episódio falta nos manuscritos mais antigos e as boas edições registram isso em nota, ainda que a cena seja das mais conhecidas. O detalhe que desarma a armadilha é o silêncio e o gesto de escrever no chão, e depois a frase que devolve a decisão a cada acusador. A saída dos mais velhos primeiro é uma observação fina sobre consciência. O resto do capítulo é uma discussão tensa sobre filiação e liberdade.",
    marcos: [
      "'Aquele que dentre vós estiver sem pecado seja o primeiro'",
      "Saíram um por um, a começar pelos mais velhos",
      "'Nem eu tampouco te condeno'",
      "'Conhecereis a verdade, e a verdade vos libertará'",
      "'Antes que Abraão existisse, eu sou'",
    ],
    chave: 32,
  },
  9: {
    resumo:
      "Um cego de nascença é curado e interrogado, e fica mais lúcido a cada pergunta.",
    detalhe:
      "A pergunta inicial dos discípulos assume culpa como causa, e a resposta recusa essa lógica. O interrogatório que se segue é longo e o homem vai ficando mais corajoso, terminando com ironia ao perguntar se eles também querem ser discípulos. Os pais se esquivam por medo. O capítulo fecha com uma inversão, porque quem não via passa a ver e quem dizia ver fica cego.",
    marcos: [
      "'Quem pecou, este ou seus pais?'",
      "Lodo feito com saliva e a ordem de lavar-se",
      "'Uma coisa sei: eu era cego e agora vejo'",
      "Os pais se esquivam por medo",
      "'Para juízo vim eu a este mundo'",
    ],
    chave: 25,
  },
  10: {
    resumo:
      "A imagem do pastor, com a diferença entre quem é dono e quem é assalariado.",
    detalhe:
      "O critério que distingue os dois é comportamental e aparece na hora do perigo, porque o assalariado foge quando vê o lobo, já que as ovelhas não são dele. A imagem da porta e a das ovelhas que reconhecem a voz são as centrais. Há também a menção às outras ovelhas que não são daquele aprisco. O capítulo termina com uma tentativa de apedrejamento durante a festa da dedicação.",
    marcos: [
      "As ovelhas conhecem a voz do pastor",
      "'Eu sou a porta'",
      "'O bom pastor dá a vida pelas ovelhas'",
      "O assalariado foge porque as ovelhas não são dele",
      "'Tenho ainda outras ovelhas, não deste aprisco'",
    ],
    chave: 11,
  },
  11: {
    resumo:
      "Ele demora de propósito, chega tarde, e chora mesmo sabendo o que vai fazer.",
    detalhe:
      "O texto diz que ele amava aquela família e que por isso mesmo ficou mais dois dias onde estava, o que é desconcertante. As duas irmãs dizem exatamente a mesma frase ao encontrá-lo. O versículo mais curto da Bíblia está aqui e é significativo justamente porque ele já sabia o desfecho e chorou assim mesmo. O capítulo termina com a decisão oficial de matá-lo.",
    marcos: [
      "'Aquele a quem amas está enfermo'",
      "Ficou ainda dois dias no lugar onde estava",
      "'Eu sou a ressurreição e a vida'",
      "'Jesus chorou'",
      "'Lázaro, vem para fora'",
    ],
    chave: 25,
  },
  12: {
    resumo:
      "Um perfume caríssimo é derramado, e a casa inteira se enche do cheiro.",
    detalhe:
      "João dá nomes onde os outros evangelhos não dão, identificando Maria e Judas, e acrescenta a observação sobre o caixa. O detalhe do perfume que impregna a casa é dele. A entrada em Jerusalém e a chegada de gregos pedindo para vê-lo marcam a virada, com a frase sobre o grão de trigo. E o capítulo registra que muitos dos principais creram e não confessavam, por amarem mais a glória dos homens.",
    marcos: [
      "A casa se encheu do perfume do bálsamo",
      "'Deixa-a; para o dia do meu sepultamento'",
      "Uns gregos pedem para ver Jesus",
      "'Se o grão de trigo não morrer, fica só'",
      "Amavam mais a glória dos homens do que a de Deus",
    ],
    chave: 24,
  },
  13: {
    resumo:
      "Ele tira a roupa de cima, pega uma toalha e lava os pés de todos, inclusive de Judas.",
    detalhe:
      "João não narra a instituição da ceia e coloca no lugar dela este gesto. A introdução é solene, dizendo que ele sabia que tudo estava nas suas mãos e que viera de Deus e para Deus voltava, e é justamente por saber disso que ele se ajoelha. A resistência de Pedro e a reviravolta dele são bem humanas. O mandamento novo é dado depois que Judas sai, na noite mais escura.",
    marcos: [
      "'Tendo amado os seus, amou-os até o fim'",
      "Cingiu-se com uma toalha e lavou os pés",
      "'Nunca me lavarás os pés'",
      "'Novo mandamento vos dou: que vos ameis uns aos outros'",
      "'Nisto conhecerão todos que sois meus discípulos'",
    ],
    chave: 34,
  },
  14: {
    resumo:
      "Ele consola os discípulos na véspera, com a promessa de lugar preparado e de outro Consolador.",
    detalhe:
      "O capítulo abre com uma ordem que é quase impossível de cumprir por conta própria, sobre não se turbar o coração. A resposta a Tomé traz a frase sobre caminho, verdade e vida. O pedido de Filipe para ver o Pai recebe uma resposta quase magoada. A paz prometida é qualificada como diferente da que o mundo dá, e a frase sobre ir e voltar encerra o conforto.",
    marcos: [
      "'Não se turbe o vosso coração'",
      "'Na casa de meu Pai há muitas moradas'",
      "'Eu sou o caminho, a verdade e a vida'",
      "'Há tanto tempo estou convosco, e não me conheces, Filipe?'",
      "'Deixo-vos a paz, a minha paz vos dou'",
    ],
    chave: 6,
  },
  15: {
    resumo:
      "A imagem da videira e dos ramos, com a poda incluída como cuidado e não castigo.",
    detalhe:
      "O verbo permanecer aparece dezenas de vezes neste capítulo e é a chave dele. O detalhe agrícola importa, porque o ramo que dá fruto é limpo justamente para dar mais, ou seja, a poda não é punição. A amizade é declarada explicitamente, com a mudança de servos para amigos justificada pelo compartilhamento do que ele ouviu do Pai. O capítulo termina avisando que o mundo vai odiá-los.",
    marcos: [
      "'Eu sou a videira verdadeira'",
      "Todo ramo que dá fruto, ele o limpa para que dê mais",
      "'Sem mim nada podeis fazer'",
      "'Ninguém tem maior amor do que este'",
      "'Já não vos chamo servos; chamo-vos amigos'",
    ],
    chave: 5,
  },
  16: {
    resumo:
      "Ele avisa que a tristeza deles vai virar alegria, usando a imagem do parto.",
    detalhe:
      "A explicação de por que convém que ele vá é a parte mais contraintuitiva do discurso, e está ligada à vinda do Consolador. A comparação com a mulher que está dando à luz é escolhida com cuidado, porque a dor não é negada nem minimizada, e o que muda é o que vem depois. A última frase do capítulo junta as duas coisas, aflição no mundo e bom ânimo, sem escolher entre elas.",
    marcos: [
      "'Convém-vos que eu vá'",
      "O Espírito da verdade vos guiará a toda a verdade",
      "'A vossa tristeza se converterá em alegria'",
      "Como a mulher que está para dar à luz",
      "'No mundo passais por aflições; tende bom ânimo'",
    ],
    chave: 33,
  },
  17: {
    resumo:
      "A oração mais longa registrada, e boa parte dela é por quem ainda nem existia.",
    detalhe:
      "A oração tem três círculos: por si mesmo, pelos discípulos e por todos os que haveriam de crer pela palavra deles, o que inclui o leitor. O pedido que mais se repete é por unidade, com a razão declarada de que o mundo creia. E há uma definição de vida eterna que é relacional e não cronológica, ligada a conhecer o Pai e aquele que ele enviou.",
    marcos: [
      "'Pai, é chegada a hora'",
      "'A vida eterna é esta: que te conheçam'",
      "'Não peço que os tires do mundo'",
      "'Santifica-os na verdade; a tua palavra é a verdade'",
      "'Para que todos sejam um'",
    ],
    chave: 3,
  },
  18: {
    resumo:
      "A prisão no jardim, com um detalhe que só este evangelho registra sobre quem recua.",
    detalhe:
      "João conta que, quando ele se identifica, os que vieram prendê-lo recuam e caem por terra. O nome do servo cuja orelha Pedro corta é dado, o que sugere fonte próxima. O interrogatório diante de Pilatos é o mais desenvolvido dos quatro evangelhos e inclui a conversa sobre reino que não é deste mundo e a pergunta sobre o que é a verdade, feita e deixada sem resposta.",
    marcos: [
      "'A quem buscais?' e eles recuam e caem por terra",
      "Pedro corta a orelha de Malco",
      "As três negações junto ao fogo",
      "'O meu reino não é deste mundo'",
      "'Que é a verdade?'",
    ],
    chave: 37,
  },
  19: {
    resumo:
      "A crucificação contada por uma testemunha que repara em detalhes pequenos.",
    detalhe:
      "João registra a inscrição em três línguas e a discussão sobre a redação dela, a túnica sem costura que não foi rasgada, e o cuidado de Jesus com a mãe entregue ao discípulo. As últimas palavras aqui são uma declaração de conclusão e não um grito de abandono. O detalhe do sangue e da água e a insistência do autor sobre ter visto e dado testemunho fecham o capítulo.",
    marcos: [
      "'Eis o homem!'",
      "A inscrição em hebraico, latim e grego",
      "A túnica sem costura, tecida de alto a baixo",
      "'Mulher, eis aí teu filho'",
      "'Está consumado'",
    ],
    chave: 30,
  },
  20: {
    resumo:
      "Ela o confunde com o jardineiro até ouvir o próprio nome.",
    detalhe:
      "O capítulo é feito de reconhecimentos individuais. Maria Madalena só entende quando ele a chama pelo nome. Tomé, que não estava presente, exige prova e recebe exatamente o que pediu, e a resposta dele é a confissão mais direta do evangelho. O propósito do livro é declarado no fim, dizendo que essas coisas foram escritas para que creiam e para que, crendo, tenham vida.",
    marcos: [
      "'Mulher, por que choras? A quem buscas?'",
      "'Maria!' e ela se volta",
      "'Recebei o Espírito Santo'",
      "'Senhor meu e Deus meu!'",
      "'Estas foram escritas para que creiais'",
    ],
    chave: 31,
  },
  21: {
    resumo:
      "Uma pescaria, um café da manhã na praia, e três perguntas feitas a quem negou três vezes.",
    detalhe:
      "Eles voltaram a pescar e não pegaram nada, e o detalhe do número exato de peixes sugere alguém que contou. A restauração de Pedro é feita em público e com o mesmo número de vezes da negação, junto de um fogo de brasas, a mesma imagem da noite do pátio. Cada pergunta vem com uma incumbência. O capítulo termina com Pedro perguntando do outro discípulo e sendo mandado cuidar do próprio seguir.",
    marcos: [
      "'Filhos, tendes aí alguma coisa de comer?'",
      "Cento e cinquenta e três peixes grandes",
      "Um fogo de brasas na praia",
      "'Simão, filho de João, tu me amas?'",
      "'E tu, segue-me'",
    ],
    chave: 17,
  },
};

CAPITULOS.lc = {
  1: {
    resumo:
      "Um prefácio de historiador, e duas gravidezes anunciadas com reações opostas.",
    detalhe:
      "Lucas abre explicando o método, dizendo que investigou tudo desde a origem para escrever em ordem. As duas anunciações são propositalmente paralelas e as respostas diferem: Zacarias pede prova e fica mudo, Maria pergunta como e recebe explicação. O cântico dela é o texto mais revolucionário do capítulo, falando de tronos derrubados e famintos saciados, e está na boca de uma adolescente do interior.",
    marcos: [
      "O prefácio dirigido a Teófilo",
      "Zacarias fica mudo por pedir sinal",
      "'Eis aqui a serva do Senhor'",
      "O cântico de Maria sobre derrubar poderosos",
      "'Encheu de bens os famintos e despediu vazios os ricos'",
    ],
    chave: 38,
  },
  2: {
    resumo:
      "Um decreto imperial move uma família, e os primeiros avisados são trabalhadores da noite.",
    detalhe:
      "Lucas situa o nascimento dentro da história do império, com nomes e censo, e então põe a cena numa manjedoura por falta de lugar. Os pastores eram gente de baixa reputação social na época, e são eles quem recebe o anúncio. O sinal dado é desconcertante, porque é um bebê enfaixado. Simeão e Ana aparecem no templo, e o capítulo fecha com o menino de doze anos fazendo perguntas aos mestres.",
    marcos: [
      "O decreto de César Augusto e o recenseamento",
      "Não havia lugar para eles na hospedaria",
      "Os pastores recebem o anúncio à noite",
      "'Maria guardava todas estas palavras no coração'",
      "Aos doze anos, no templo, entre os doutores",
    ],
    chave: 14,
  },
  3: {
    resumo:
      "A pregação de João vem com perguntas práticas, e as respostas são bem concretas.",
    detalhe:
      "Lucas data o início do ministério com precisão política, citando imperador, governador e tetrarcas. O detalhe que distingue este evangelho é o que vem depois da pregação: três grupos perguntam o que devem fazer, e as respostas são repartir a roupa, não cobrar além do estipulado e não extorquir. A genealogia no fim do capítulo vai ao contrário e termina em Adão, e não em Abraão.",
    marcos: [
      "A datação com Tibério, Pilatos e os tetrarcas",
      "'Que devemos fazer?', perguntam as multidões",
      "'Quem tem duas túnicas, reparta com quem não tem'",
      "Aos soldados: não pratiqueis extorsão",
      "A genealogia recua até Adão",
    ],
    chave: 11,
  },
  4: {
    resumo:
      "Ele lê Isaías na sinagoga da própria cidade e quase é jogado de um penhasco.",
    detalhe:
      "O texto lido define o programa inteiro do evangelho de Lucas, com boas novas aos pobres, liberdade aos cativos e vista aos cegos. Ele para a leitura no meio de uma frase, deixando de fora a parte sobre vingança. A reação começa admirada e vira fúria quando ele cita dois casos do Antigo Testamento em que Deus atendeu estrangeiros, uma viúva de Sarepta e um sírio leproso.",
    marcos: [
      "As três tentações no deserto",
      "'O Espírito do Senhor está sobre mim'",
      "'Hoje se cumpriu a Escritura que acabais de ouvir'",
      "Ele cita a viúva de Sarepta e Naamã, o sírio",
      "Tentam precipitá-lo do despenhadeiro",
    ],
    chave: 18,
  },
  5: {
    resumo:
      "Depois de uma noite sem peixe, a rede quase rompe, e o pescador pede que ele se afaste.",
    detalhe:
      "A reação de Pedro é psicologicamente precisa, pedindo que Jesus se retire dele por ser pecador, o que é o oposto do que se espera de alguém que acabou de lucrar. O capítulo reúne ainda a cura do leproso, com o detalhe de Lucas sobre ele se retirar para orar, e a do paralítico. A resposta sobre o vinho novo termina com uma observação só deste evangelho, sobre preferirem o velho.",
    marcos: [
      "'Faze-te ao largo e lançai as redes'",
      "'Retira-te de mim, Senhor, porque sou pecador'",
      "'Serás pescador de homens'",
      "Retirava-se para lugares solitários e orava",
      "'Ninguém, tendo bebido o velho, quer o novo'",
    ],
    chave: 16,
  },
  6: {
    resumo:
      "O sermão da planície, com bem-aventuranças que vêm acompanhadas de quatro ais.",
    detalhe:
      "Diferente de Mateus, aqui ele desce e fala num lugar plano, e as bem-aventuranças são mais diretas, falando de pobres e famintos sem qualificação. A novidade são os quatro ais correspondentes, dirigidos aos ricos, aos fartos, aos que riem e aos bem falados. O ensino sobre amar inimigos é o mais desenvolvido, e termina com a imagem das duas casas e dos alicerces.",
    marcos: [
      "Passa a noite toda em oração antes de escolher os doze",
      "'Bem-aventurados vós, os pobres'",
      "'Ai de vós, os ricos!'",
      "'Amai os vossos inimigos, fazei o bem aos que vos odeiam'",
      "'Sede misericordiosos, como também é misericordioso vosso Pai'",
    ],
    chave: 36,
  },
  7: {
    resumo:
      "Um funeral é interrompido, e uma mulher da cidade lava os pés dele com lágrimas.",
    detalhe:
      "O caso do centurião tem um detalhe só de Lucas, com anciãos judeus intercedendo e dizendo que ele construiu a sinagoga. A viúva de Naim é única deste evangelho, e o motivo declarado da ação é compaixão, porque ele viu a mãe. A cena final na casa do fariseu é construída sobre uma parábola curta de dívidas, e termina com a observação sobre quem ama mais por ter sido perdoado mais.",
    marcos: [
      "O centurião manda dizer que basta uma palavra",
      "O filho único da viúva de Naim",
      "A pergunta de João Batista feita da prisão",
      "A mulher lava os pés dele com lágrimas",
      "'Perdoados lhe são os muitos pecados, porque muito amou'",
    ],
    chave: 47,
  },
  8: {
    resumo:
      "Mulheres financiam o grupo, e uma delas é nomeada com o cargo do marido.",
    detalhe:
      "Lucas registra no começo do capítulo que várias mulheres serviam ao grupo com os seus bens, inclusive a esposa do procurador de Herodes, o que é uma informação sociológica importante. O restante reúne a parábola do semeador, a tempestade, o endemoninhado de Gerasa e as duas curas entrelaçadas de Jairo e da mulher com fluxo de sangue, que durava exatamente doze anos.",
    marcos: [
      "Mulheres o serviam com os seus bens",
      "Joana, mulher de Cuza, procurador de Herodes",
      "'Onde está a vossa fé?'",
      "O homem de Gerasa, vestido e em perfeito juízo",
      "'Filha, a tua fé te salvou; vai-te em paz'",
    ],
    chave: 3,
  },
  9: {
    resumo:
      "No meio do evangelho, ele volta o rosto para Jerusalém e começa a longa subida.",
    detalhe:
      "O capítulo concentra envio, multiplicação, confissão e transfiguração, e depois vem a virada estrutural do livro, com a frase sobre ele manifestar o firme propósito de ir a Jerusalém. A partir daí, tudo caminha para lá. Os pedidos dos que queriam seguir depois de resolver pendências recebem respostas duras, e a última imagem é sobre olhar para trás com a mão no arado.",
    marcos: [
      "Os doze são enviados sem nada para o caminho",
      "'Quem dizeis que eu sou?'",
      "A transfiguração e a conversa sobre a sua partida",
      "'Manifestou o firme propósito de ir para Jerusalém'",
      "'Ninguém que olha para trás é apto para o reino'",
    ],
    chave: 51,
  },
  10: {
    resumo:
      "Setenta são enviados, e a pergunta de um perito em lei recebe uma história como resposta.",
    detalhe:
      "A parábola do samaritano é contada para responder quem é o próximo, e o desfecho inverte a pergunta, mandando dizer quem se fez próximo. Os dois religiosos passam do outro lado da rua, e quem para é justamente o de etnia desprezada. O capítulo termina com Marta e Maria, numa cena doméstica que trata de prioridade sem desqualificar o trabalho.",
    marcos: [
      "Setenta são designados e enviados dois a dois",
      "'A seara é grande, mas os trabalhadores são poucos'",
      "Um samaritano teve compaixão e se aproximou",
      "'Vai e procede tu de igual modo'",
      "'Marta, Marta, andas inquieta com muitas coisas'",
    ],
    chave: 33,
  },
  11: {
    resumo:
      "Eles pedem para aprender a orar, e a resposta vem com uma história sobre insistência.",
    detalhe:
      "O pedido surge depois de o verem orando, e não de uma dúvida teórica. A versão do pai-nosso aqui é mais curta. O que vem depois é a parábola do amigo que bate à meia-noite, e o argumento é sobre importunação e não sobre merecimento. A segunda metade do capítulo tem os ais contra fariseus e intérpretes da lei, incluindo a crítica sobre dízimo de hortelã e negligência da justiça.",
    marcos: [
      "'Senhor, ensina-nos a orar'",
      "O amigo que bate à porta à meia-noite",
      "'Pedi, e dar-se-vos-á'",
      "'Dais o dízimo da hortelã e desprezais a justiça'",
      "'Tirastes a chave do conhecimento'",
    ],
    chave: 9,
  },
  12: {
    resumo:
      "Alguém pede ajuda numa briga por herança, e recebe uma parábola sobre celeiros.",
    detalhe:
      "A resposta é recusar o papel de árbitro e alertar contra toda espécie de cobiça, com a frase sobre a vida não consistir na abundância dos bens. A parábola do rico que planeja celeiros maiores tem um detalhe notável, porque ele conversa sozinho o tempo todo, usando eu e meu em cada frase. O restante do capítulo trata de ansiedade, com os corvos e os lírios, e de prontidão.",
    marcos: [
      "'Não temais os que matam o corpo'",
      "'Guardai-vos de toda e qualquer avareza'",
      "O rico que planeja construir celeiros maiores",
      "'Considerai os corvos e os lírios'",
      "'A quem muito foi dado, muito lhe será exigido'",
    ],
    chave: 15,
  },
  13: {
    resumo:
      "Ele recusa a ideia de que a tragédia mede culpa, e cura uma mulher curvada há dezoito anos.",
    detalhe:
      "Comentam duas tragédias da época, um massacre e a queda de uma torre, e a resposta nega que as vítimas fossem piores que os outros. A parábola da figueira sem fruto pede mais um ano e adubo. A cura da mulher encurvada gera protesto pelo sábado, e a resposta compara com desamarrar um boi para dar água, chamando-a de filha de Abraão, o que lhe devolve o lugar.",
    marcos: [
      "'Pensais que aqueles galileus eram mais pecadores?'",
      "A figueira sem fruto e o pedido de mais um ano",
      "A mulher encurvada havia dezoito anos",
      "'Não devia ser desligada deste laço no sábado?'",
      "'Esforçai-vos por entrar pela porta estreita'",
    ],
    chave: 16,
  },
  14: {
    resumo:
      "Num jantar, ele repara em quem escolhe os melhores lugares e sugere outra lista de convidados.",
    detalhe:
      "O conselho sobre sentar no último lugar é dado como observação prática de etiqueta e vira ensino sobre humildade. O que vem depois é mais incômodo: convidar quem não pode retribuir, listando pobres, aleijados, coxos e cegos. A parábola do banquete mostra desculpas educadas que escondem recusa. O fim é sobre calcular o custo, com o construtor da torre e o rei que avalia ir à guerra.",
    marcos: [
      "Ele repara em quem escolhia os primeiros lugares",
      "'Quando deres um banquete, convida os pobres'",
      "As desculpas: um campo, cinco juntas de bois, um casamento",
      "'Compele-os a entrar, para que fique cheia a minha casa'",
      "O que constrói a torre primeiro calcula as despesas",
    ],
    chave: 13,
  },
  15: {
    resumo:
      "Três parábolas sobre coisas perdidas, contadas para quem reclamava das companhias dele.",
    detalhe:
      "O motivo é dado no primeiro versículo, com fariseus murmurando que ele recebia pecadores e comia com eles. As três histórias escalam em valor e em envolvimento: uma de cem ovelhas, uma de dez moedas, um de dois filhos. A terceira é a mais longa e não termina no abraço, porque o irmão mais velho fica do lado de fora, e a última fala do pai é um convite a ele, sem resposta registrada.",
    marcos: [
      "'Este recebe pecadores e come com eles'",
      "A ovelha perdida é trazida sobre os ombros",
      "A mulher varre a casa procurando a dracma",
      "'Estando ele ainda longe, o pai o viu e se compadeceu'",
      "O irmão mais velho se recusa a entrar",
    ],
    chave: 20,
  },
  16: {
    resumo:
      "Um administrador desonesto é elogiado pela esperteza, e um rico ignora um mendigo à porta.",
    detalhe:
      "A primeira parábola é a mais difícil dos evangelhos, e o elogio é à sagacidade e não à fraude, com o comentário de que os filhos deste mundo são mais hábeis nos seus negócios. A segunda história é a única em que um personagem recebe nome próprio, e é justamente o mendigo. A conversa final sobre Moisés e os profetas encerra dizendo que nem quem ressuscitasse convenceria.",
    marcos: [
      "O administrador reduz as dívidas dos devedores",
      "'Não podeis servir a Deus e às riquezas'",
      "Lázaro, coberto de úlceras, à porta do rico",
      "Um grande abismo está posto entre nós e vós",
      "'Nem ainda que ressuscite alguém dentre os mortos'",
    ],
    chave: 31,
  },
  17: {
    resumo:
      "Dez leprosos são curados a caminho, e só um volta para agradecer.",
    detalhe:
      "O detalhe que Lucas destaca é que o único que volta é samaritano, e ele repara nisso em voz alta. O capítulo começa com ensino sobre perdão repetido e sobre fé do tamanho de um grão de mostarda, e traz a parábola curta do servo que faz o que devia. O fecho trata da vinda do reino, com a observação de que ele não vem com aparência exterior e está no meio deles.",
    marcos: [
      "'Se pecar sete vezes no dia e sete vezes voltar'",
      "'Se tivésseis fé como um grão de mostarda'",
      "Dez leprosos são curados no caminho",
      "'Não foram dez os limpos? Onde estão os nove?'",
      "'O reino de Deus está dentro de vós'",
    ],
    chave: 17,
  },
  18: {
    resumo:
      "Uma viúva insiste com um juiz que não liga, e dois homens oram de formas opostas.",
    detalhe:
      "A parábola da viúva é declaradamente sobre orar sempre e não desanimar, e o juiz cede por cansaço e não por virtude, o que é o argumento do contraste. A segunda parábola mostra dois homens no mesmo lugar, e o que sai justificado é o que não levantou os olhos. O capítulo também traz o jovem rico e Bartimeu, que grita ainda mais alto quando mandam calar.",
    marcos: [
      "A viúva importuna o juiz iníquo",
      "O fariseu e o publicano no templo",
      "'Ó Deus, sê propício a mim, pecador!'",
      "'Deixai vir a mim os pequeninos'",
      "O cego grita mais alto quando o mandam calar",
    ],
    chave: 14,
  },
  19: {
    resumo:
      "Um homem baixo sobe numa árvore para enxergar, e desce com a casa comprometida.",
    detalhe:
      "Zaqueu é chefe dos publicanos e rico, e a multidão murmura quando Jesus se autoconvida. A resposta dele é prática e cara, devolvendo quatro vezes o que tomou indevidamente. A parábola das minas trata de responsabilidade com o que foi confiado. E o capítulo tem um momento que só Lucas registra, com Jesus chorando sobre a cidade ao se aproximar e vê-la.",
    marcos: [
      "Zaqueu sobe num sicômoro para poder vê-lo",
      "'Hoje devo ficar em tua casa'",
      "'Dou aos pobres metade dos meus bens'",
      "A parábola das dez minas",
      "Ao ver a cidade, chorou sobre ela",
    ],
    chave: 10,
  },
  20: {
    resumo:
      "Perguntam com que autoridade ele age, e ele devolve uma pergunta que ninguém quer responder.",
    detalhe:
      "A devolução sobre o batismo de João expõe o cálculo político deles, que discutem entre si o que é mais conveniente responder e terminam dizendo que não sabem. A parábola dos lavradores é entendida na hora. As perguntas seguintes sobre imposto e ressurreição são armadilhas, e o capítulo termina com um alerta sobre escribas que devoram as casas das viúvas e fazem longas orações.",
    marcos: [
      "'Com que autoridade fazes estas coisas?'",
      "A parábola dos lavradores e do filho enviado",
      "'A pedra que os construtores rejeitaram'",
      "'Dai a César o que é de César'",
      "'Devoram as casas das viúvas e fazem longas orações'",
    ],
    chave: 25,
  },
  21: {
    resumo:
      "Ele observa as ofertas e repara numa viúva com duas moedinhas.",
    detalhe:
      "O critério que ele usa não é o valor absoluto e sim o que sobrou, dizendo que os outros deram do que lhes sobejava e ela deu tudo o que tinha para o sustento. Em seguida vem o discurso sobre o templo e sobre os sinais, com a instrução de não se apavorarem e de não prepararem defesa com antecedência. O capítulo termina com a advertência sobre corações sobrecarregados.",
    marcos: [
      "A viúva pobre lança duas pequenas moedas",
      "'Deu tudo o que tinha para o seu sustento'",
      "'Não ficará pedra sobre pedra'",
      "'Não vos aterrorizeis'",
      "'Acautelai-vos para que não fiquem sobrecarregados os vossos corações'",
    ],
    chave: 4,
  },
  22: {
    resumo:
      "Durante a ceia eles discutem quem é o maior, e ele avisa Pedro antes da queda.",
    detalhe:
      "A discussão sobre precedência acontece justamente naquela noite, o que Lucas registra sem suavizar, e a resposta é sobre quem serve à mesa. O aviso a Pedro inclui a informação de que Jesus já orou por ele e a instrução de fortalecer os irmãos depois de voltar. No Getsêmani, só Lucas menciona o suor como gotas de sangue. E é ele quem registra o olhar de Jesus para Pedro após o galo.",
    marcos: [
      "'Isto é o meu corpo, oferecido por vós'",
      "Houve entre eles contenda sobre quem seria o maior",
      "'Eu roguei por ti, para que a tua fé não desfaleça'",
      "O suor como grandes gotas de sangue",
      "'O Senhor, voltando-se, fitou Pedro'",
    ],
    chave: 32,
  },
  23: {
    resumo:
      "Ele é enviado a Herodes, e da cruz responde a um condenado que pede para ser lembrado.",
    detalhe:
      "Lucas é o único que narra o envio a Herodes e a reconciliação entre ele e Pilatos naquele dia. O caminho da cruz inclui a fala às mulheres que choravam, redirecionando o choro para elas e os filhos. As três frases da cruz aqui são de perdão, de promessa e de entrega, e a última é uma citação do Salmo 31. O centurião conclui que ele era justo.",
    marcos: [
      "Pilatos o envia a Herodes e eles se tornam amigos",
      "'Não choreis por mim; chorai por vós mesmas'",
      "'Pai, perdoa-lhes, porque não sabem o que fazem'",
      "'Hoje estarás comigo no paraíso'",
      "'Pai, nas tuas mãos entrego o meu espírito'",
    ],
    chave: 34,
  },
  24: {
    resumo:
      "Dois caminham desanimados e só reconhecem quem os acompanhava na hora de partir o pão.",
    detalhe:
      "A caminhada de Emaús é a cena mais bem construída do evangelho: eles contam a história inteira para o próprio protagonista sem perceber. A frase deles sobre esperar que fosse ele quem redimiria Israel está no passado, o que revela desistência. O reconhecimento acontece num gesto doméstico. O capítulo termina com a explicação das Escrituras e com a ascensão, e eles voltam com grande alegria.",
    marcos: [
      "'Por que buscais entre os mortos ao que vive?'",
      "Dois caminhavam conversando, com os olhos impedidos",
      "'Nós esperávamos que fosse ele quem remisse Israel'",
      "Reconheceram-no ao partir do pão",
      "'Porventura, não nos ardia o coração?'",
    ],
    chave: 32,
  },
};

CAPITULOS.at = {
  1: {
    resumo:
      "Eles perguntam sobre datas e recebem uma resposta sobre geografia.",
    detalhe:
      "A última pergunta dos discípulos é sobre restaurar o reino a Israel, e a resposta desvia do calendário para a missão, listando Jerusalém, Judeia, Samaria e os confins da terra, que é exatamente o roteiro do livro. Os dois homens de vestes brancas perguntam por que ficam olhando para cima. O capítulo termina com a escolha de Matias e com a observação de que perseveravam em oração junto com as mulheres e com Maria.",
    marcos: [
      "'Não vos compete conhecer tempos ou épocas'",
      "'Recebereis poder e sereis minhas testemunhas'",
      "'Por que estais olhando para as alturas?'",
      "Perseveravam unânimes em oração, com as mulheres",
      "Matias é escolhido por sorte",
    ],
    chave: 8,
  },
  2: {
    resumo:
      "Cada um ouve na própria língua, e o primeiro sermão termina com três mil batizados.",
    detalhe:
      "O milagre não é de fala e sim de compreensão, e Lucas lista quinze regiões para mostrar o alcance. A acusação de embriaguez recebe uma resposta quase divertida sobre a hora do dia. O sermão de Pedro é todo construído sobre Joel e sobre os salmos. O retrato da comunidade no fim é sóbrio e concreto, com ensino, comunhão, partir do pão e orações, e a partilha de bens conforme a necessidade.",
    marcos: [
      "Línguas como de fogo repartidas sobre cada um",
      "'Como os ouvimos na nossa própria língua?'",
      "'Não estão estes embriagados, é apenas a terceira hora'",
      "Naquele dia acrescentaram-se quase três mil",
      "Perseveravam na doutrina, na comunhão, no partir do pão",
    ],
    chave: 42,
  },
  3: {
    resumo:
      "Um homem que pedia esmola há anos recebe algo que não estava pedindo.",
    detalhe:
      "A frase de Pedro sobre não ter prata nem ouro é uma das mais lembradas do livro, e o detalhe físico é que ele o toma pela mão direita e o levanta. O homem entra no templo andando, saltando e louvando, e é essa cena pública que reúne a multidão. O sermão que se segue é mais duro que o anterior e ao mesmo tempo reconhece que eles agiram por ignorância.",
    marcos: [
      "O coxo de nascença à porta Formosa",
      "'Não possuo prata nem ouro'",
      "'O que tenho, isso te dou'",
      "Entrou andando, saltando e louvando a Deus",
      "'Sei que o fizestes por ignorância'",
    ],
    chave: 6,
  },
  4: {
    resumo:
      "Presos e proibidos de falar, eles respondem que não podem deixar de contar o que viram.",
    detalhe:
      "O que impressiona o tribunal é a ousadia de homens sem instrução formal, e o texto diz que reconheceram que haviam estado com Jesus. A dificuldade deles é prática, porque o curado estava ali em pé ao lado. A resposta dos dois é sobre julgarem diante de Deus se é justo obedecer a homens. A oração da comunidade depois não pede proteção, e sim mais coragem.",
    marcos: [
      "Reconheciam que eles haviam estado com Jesus",
      "Viam o homem curado ali em pé com eles",
      "'Não podemos deixar de falar do que vimos e ouvimos'",
      "'Concede aos teus servos que anunciem com intrepidez'",
      "Nenhum necessitado havia entre eles",
    ],
    chave: 20,
  },
  5: {
    resumo:
      "Um casal mente sobre o valor de uma doação e morre, e os apóstolos são presos de novo.",
    detalhe:
      "O problema não foi reter parte do dinheiro, e Pedro deixa isso claro perguntando se o campo não era deles antes e se o valor não estava em seu poder depois de vendido. O problema foi a encenação. O restante do capítulo tem a prisão, a soltura noturna e o conselho de Gamaliel, que sugere deixar o tempo decidir, com o argumento de que se for de homens se desfará.",
    marcos: [
      "Ananias e Safira mentem sobre o preço do campo",
      "'Não era teu antes de o venderes?'",
      "Os apóstolos são presos e soltos durante a noite",
      "'Antes importa obedecer a Deus do que aos homens'",
      "O conselho de Gamaliel sobre deixar o tempo provar",
    ],
    chave: 29,
  },
  6: {
    resumo:
      "Uma reclamação sobre distribuição desigual gera a primeira reorganização da igreja.",
    detalhe:
      "O conflito é étnico e prático, com viúvas de fala grega sendo esquecidas na assistência diária. A solução não ignora a queixa nem sobrecarrega os apóstolos, criando uma função específica com critérios altos de caráter. Os sete escolhidos têm todos nomes gregos, o que sugere que confiaram a tarefa justamente ao grupo que reclamou. Estêvão aparece no fim, fazendo bem mais do que servir mesas.",
    marcos: [
      "As viúvas dos gregos eram esquecidas na distribuição",
      "'Escolhei sete homens de boa reputação'",
      "Os sete têm nomes gregos",
      "Os apóstolos se dedicam à oração e ao ministério da palavra",
      "Estêvão faz prodígios e ninguém resiste à sua sabedoria",
    ],
    chave: 4,
  },
  7: {
    resumo:
      "O discurso mais longo do livro é uma releitura da história, e termina em apedrejamento.",
    detalhe:
      "Estêvão recita a história de Abraão até Salomão, destacando que Deus apareceu fora da terra prometida e que o templo não o contém. A acusação final é a mais dura, chamando-os de duros de cerviz e de resistentes ao Espírito. A morte dele ecoa a de Jesus, com o pedido de perdão pelos executores, e o texto menciona um jovem chamado Saulo guardando as capas.",
    marcos: [
      "A história de Abraão, José e Moisés recontada",
      "'O Altíssimo não habita em casas feitas por mãos humanas'",
      "'Vós sempre resistis ao Espírito Santo'",
      "'Vejo os céus abertos'",
      "'Senhor, não lhes imputes este pecado'",
    ],
    chave: 60,
  },
  8: {
    resumo:
      "A perseguição espalha a igreja, e é assim que o evangelho sai de Jerusalém.",
    detalhe:
      "Lucas registra a ironia estrutural do livro: a dispersão forçada é o que cumpre a missão anunciada no capítulo 1. Filipe vai a Samaria, território de rixa histórica. O episódio de Simão trata de alguém que quis comprar o dom. E a cena com o etíope acontece numa estrada deserta, com um homem lendo Isaías em voz alta e a pergunta sobre se ele entende o que lê.",
    marcos: [
      "Todos foram dispersos, exceto os apóstolos",
      "Os que foram dispersos iam pregando por onde passavam",
      "Simão quer comprar o poder com dinheiro",
      "'Entendes o que vens lendo?'",
      "'Que impede que eu seja batizado?'",
    ],
    chave: 4,
  },
  9: {
    resumo:
      "O perseguidor é derrubado no caminho e passa três dias cego, sem comer.",
    detalhe:
      "A pergunta que ele ouve identifica a igreja com Jesus, perguntando por que o persegue, e não por que persegue os discípulos. A parte mais humana do capítulo é Ananias, que argumenta com Deus citando o que ouviu falar daquele homem, e é enviado assim mesmo. A desconfiança dos discípulos em Jerusalém é registrada sem constrangimento, e quem intercede por ele é Barnabé.",
    marcos: [
      "'Saulo, Saulo, por que me persegues?'",
      "Três dias sem ver, sem comer nem beber",
      "Ananias argumenta antes de obedecer",
      "'Este é para mim um instrumento escolhido'",
      "Barnabé o apresenta aos apóstolos",
    ],
    chave: 4,
  },
  10: {
    resumo:
      "Duas visões acontecem em cidades diferentes para resolver o mesmo problema.",
    detalhe:
      "Cornélio é romano, centurião e temente a Deus, e Pedro é um judeu observante que nunca comeu nada impuro. A visão do lençol se repete três vezes e a conclusão que Pedro tira não é sobre comida, e sim sobre pessoas, como ele mesmo explica ao entrar na casa. A frase sobre Deus não fazer acepção de pessoas é a virada do livro, e o Espírito desce antes de qualquer procedimento.",
    marcos: [
      "Cornélio, centurião piedoso e temente a Deus",
      "O lençol com animais desce três vezes",
      "'Ao que Deus purificou não consideres comum'",
      "'Reconheço que Deus não faz acepção de pessoas'",
      "O Espírito desce enquanto Pedro ainda falava",
    ],
    chave: 34,
  },
  11: {
    resumo:
      "Pedro é cobrado por ter comido com gentios e responde contando tudo de novo.",
    detalhe:
      "A crítica é interna e direta. A defesa dele é narrativa, recontando a visão ponto por ponto, e o argumento final é uma pergunta sobre quem era ele para resistir a Deus. O capítulo também registra o surgimento da igreja de Antioquia, onde pela primeira vez pregaram também a gregos, e onde os discípulos foram chamados de cristãos pela primeira vez.",
    marcos: [
      "'Entraste na casa de incircuncisos e comeste com eles'",
      "Pedro reconta a visão desde o princípio",
      "'Quem era eu para que pudesse opor-me a Deus?'",
      "Em Antioquia pregaram também aos gregos",
      "'Em Antioquia foram os discípulos, pela primeira vez, chamados cristãos'",
    ],
    chave: 26,
  },
  12: {
    resumo:
      "A igreja ora por Pedro preso, e quando ele bate à porta ninguém acredita.",
    detalhe:
      "A cena é narrada com humor. Pedro é solto por um anjo e acha que está tendo uma visão. Ao chegar à casa onde oravam por ele, a moça que atende fica tão contente que esquece de abrir a porta, e os que estavam orando dizem que ela está louca. O contraste do capítulo é com a morte de Herodes, que aceitou a aclamação como se fosse deus.",
    marcos: [
      "Tiago é morto à espada e Pedro é preso",
      "A igreja orava insistentemente por ele",
      "Rode fica tão alegre que não abre a porta",
      "'Estás louca', disseram os que oravam",
      "Herodes é ferido por não dar glória a Deus",
    ],
    chave: 5,
  },
  13: {
    resumo:
      "A primeira viagem começa numa reunião em que o Espírito nomeia dois nomes.",
    detalhe:
      "O envio parte da igreja de Antioquia, que era diversa, incluindo um africano e alguém criado com Herodes. Em Chipre há o confronto com um mago, e é a partir desse ponto que Lucas passa a chamar Saulo de Paulo. O sermão em Antioquia da Pisídia é o primeiro registrado dele e termina com a virada para os gentios, depois da rejeição na sinagoga.",
    marcos: [
      "A igreja de Antioquia é diversa em origem",
      "'Separai-me Barnabé e Saulo'",
      "Saulo, que também é Paulo",
      "O sermão na sinagoga de Antioquia da Pisídia",
      "'Eis que nos volvemos para os gentios'",
    ],
    chave: 2,
  },
  14: {
    resumo:
      "Querem sacrificar a eles como deuses e pouco depois apedrejam um deles.",
    detalhe:
      "Em Listra a reação é de adoração, e os dois rasgam as vestes horrorizados, dizendo que são homens como eles. O discurso aos pagãos é diferente dos da sinagoga, porque começa pela chuva, pelas estações e pela fartura, e não pelas Escrituras. A virada da multidão é rápida e Paulo é apedrejado. O capítulo termina com a organização das igrejas e a nomeação de presbíteros.",
    marcos: [
      "Em Listra, querem oferecer sacrifício a eles",
      "'Também nós somos homens como vós'",
      "Paulo é apedrejado e arrastado para fora da cidade",
      "'É necessário passar por muitas tribulações'",
      "Nomeiam presbíteros em cada igreja",
    ],
    chave: 15,
  },
  15: {
    resumo:
      "A questão mais séria da igreja primitiva é resolvida numa reunião com debate longo.",
    detalhe:
      "A pergunta é se gentios precisavam virar judeus para serem cristãos, e o texto registra que houve grande debate antes de qualquer conclusão. Pedro argumenta pela experiência, Barnabé e Paulo pelos fatos, e Tiago pela Escritura. A carta final é curta e pede apenas quatro coisas, com uma frase que reconhece o processo, dizendo que pareceu bem ao Espírito Santo e a eles. O capítulo termina com uma briga entre Paulo e Barnabé por causa de João Marcos.",
    marcos: [
      "'Se não vos circuncidardes, não podeis ser salvos'",
      "Houve grande debate antes da decisão",
      "'Por que tentais a Deus pondo sobre a cerviz um jugo?'",
      "'Pareceu bem ao Espírito Santo e a nós'",
      "Paulo e Barnabé se separam por causa de João Marcos",
    ],
    chave: 28,
  },
  16: {
    resumo:
      "Uma porta fechada leva a outro continente, e a primeira convertida é uma comerciante.",
    detalhe:
      "O capítulo mostra direção por portas fechadas, com o Espírito impedindo dois caminhos antes da visão do homem macedônio. Em Filipos, o grupo vai ao rio onde mulheres se reuniam, e Lídia, negociante de púrpura, abre a casa. A prisão e o terremoto levam a uma cena noturna com o carcereiro. E Paulo faz questão de cobrar publicamente a ilegalidade cometida contra cidadãos romanos.",
    marcos: [
      "O Espírito os impede de pregar na Ásia e na Bitínia",
      "A visão do homem macedônio pedindo socorro",
      "Lídia, vendedora de púrpura, abre a sua casa",
      "Oravam e cantavam louvores por volta da meia-noite",
      "'Que devo fazer para ser salvo?'",
    ],
    chave: 31,
  },
  17: {
    resumo:
      "Em Bereia eles examinam as Escrituras todo dia, e em Atenas ele cita poetas locais.",
    detalhe:
      "O elogio aos bereanos é sobre método, porque receberam a palavra com toda a avidez e examinavam para ver se era assim. Em Atenas, Paulo percorre a cidade primeiro e usa como ponte um altar ao deus desconhecido. Ele cita poetas gregos em vez de profetas hebreus, adaptando o argumento ao público. O resultado é misto, com zombaria de uns e adesão de poucos, o que o texto registra sem disfarçar.",
    marcos: [
      "Os de Bereia examinavam as Escrituras todos os dias",
      "Paulo se comove ao ver a cidade entregue a ídolos",
      "'Ao Deus Desconhecido'",
      "'Nele vivemos, nos movemos e existimos'",
      "Uns zombavam, outros diziam que ouviriam depois",
    ],
    chave: 11,
  },
  18: {
    resumo:
      "Em Corinto ele trabalha fazendo tendas e fica um ano e meio ensinando.",
    detalhe:
      "O detalhe do ofício importa, porque mostra alguém que se sustentava com trabalho manual. A parceria com Áquila e Priscila começa pela profissão em comum. O processo diante de Gálio é arquivado como questão interna, o que na prática protegeu a pregação. E o fim do capítulo tem uma cena de correção generosa, com o casal levando Apolo à parte para expor o caminho com mais exatidão.",
    marcos: [
      "Áquila e Priscila eram do mesmo ofício, fabricantes de tendas",
      "'Não temas, mas fala e não te cales'",
      "Ficou ali um ano e seis meses",
      "Gálio considera a questão interna e não julga",
      "Priscila e Áquila instruem Apolo com mais exatidão",
    ],
    chave: 9,
  },
  19: {
    resumo:
      "Três anos em Éfeso, livros de magia queimados, e um tumulto motivado por prejuízo.",
    detalhe:
      "O episódio dos exorcistas ambulantes que tentam usar o nome como fórmula termina mal para eles e leva muitos a confessarem as próprias práticas e a queimarem livros caríssimos. O motim é organizado por um ourives que diz com todas as letras que o problema é o lucro. Lucas registra que boa parte da multidão nem sabia por que estava ali, e quem acalma tudo é um funcionário público.",
    marcos: [
      "'Nem mesmo ouvimos que exista o Espírito Santo'",
      "Os sete filhos de Ceva e o espírito que os reconhece",
      "Livros de magia são queimados publicamente",
      "'Deste negócio vem a nossa prosperidade'",
      "A maior parte nem sabia por que se tinham reunido",
    ],
    chave: 20,
  },
  20: {
    resumo:
      "Um rapaz cai da janela durante um sermão longo, e há uma despedida na praia.",
    detalhe:
      "Lucas não suaviza o episódio de Êutico, deixando claro que Paulo prolongou muito o discurso até a meia-noite. O rapaz cai do terceiro andar e é levantado. A segunda metade do capítulo é a despedida em Mileto, e o discurso aos presbíteros é o mais pessoal de Paulo em todo o livro, com a citação de uma frase de Jesus que não aparece nos evangelhos, sobre a felicidade de dar.",
    marcos: [
      "Êutico cai da janela durante o sermão prolongado",
      "'Não vos perturbeis, que a vida nele está'",
      "'Não me esquivei de vos anunciar todo o desígnio de Deus'",
      "'Mais bem-aventurado é dar que receber'",
      "Choraram muito e o acompanharam até o navio",
    ],
    chave: 35,
  },
  21: {
    resumo:
      "Todos pedem que ele não suba, e ele responde que está pronto até para morrer.",
    detalhe:
      "O capítulo tem uma tensão interessante, porque discípulos avisam pelo Espírito para não ir, e ele vai assim mesmo, o que mostra que discernimento comunitário e decisão pessoal nem sempre coincidem com facilidade. O gesto profético de Ágabo com o cinto é dramático. A conclusão do grupo é uma frase de rendição sobre fazer-se a vontade do Senhor. Em Jerusalém, o conflito estoura no templo.",
    marcos: [
      "As filhas de Filipe, que profetizavam",
      "Ágabo amarra os próprios pés e mãos com o cinto",
      "'Estou pronto não só a ser preso, mas até a morrer'",
      "'Faça-se a vontade do Senhor'",
      "A multidão o arrasta para fora do templo",
    ],
    chave: 13,
  },
  22: {
    resumo:
      "Ele fala à multidão em hebraico, e a palavra que os enfurece é gentios.",
    detalhe:
      "A escolha do idioma faz a multidão silenciar, e ele conta a própria história de forma estratégica, começando pela formação aos pés de Gamaliel. Eles ouvem até a frase sobre ser enviado para longe, aos gentios, e a partir dali gritam. Quando vão açoitá-lo, ele menciona a cidadania romana, e a conversa seguinte com o comandante tem um detalhe de classe social.",
    marcos: [
      "Fala em hebraico e a multidão faz silêncio",
      "'Sou judeu, educado aos pés de Gamaliel'",
      "Reconta a experiência no caminho de Damasco",
      "'Eu te enviarei para longe, aos gentios'",
      "'Eu, porém, o sou por nascimento'",
    ],
    chave: 21,
  },
  23: {
    resumo:
      "Ele divide o tribunal com uma frase, e um sobrinho descobre um plano de emboscada.",
    detalhe:
      "Ao perceber que o conselho tinha saduceus e fariseus, Paulo levanta o tema da ressurreição e a sessão vira discussão entre eles. Mais de quarenta homens juram não comer nem beber até matá-lo, e quem descobre e avisa é um sobrinho, detalhe que dá um vislumbre raro da família dele. A transferência noturna para Cesareia é feita com uma escolta desproporcional.",
    marcos: [
      "'Deus há de ferir-te, parede branqueada!'",
      "'Sou fariseu, e é por causa da ressurreição que sou julgado'",
      "Mais de quarenta juram não comer até matá-lo",
      "O filho da irmã de Paulo ouve e avisa",
      "É levado a Cesareia com escolta de centenas de soldados",
    ],
    chave: 11,
  },
  24: {
    resumo:
      "Dois anos preso porque o governador esperava suborno e queria agradar os acusadores.",
    detalhe:
      "A acusação é feita por um orador profissional contratado, e a defesa de Paulo é pontual e calma. O detalhe mais revelador do capítulo é o motivo da demora: Félix esperava receber dinheiro e por isso mandava chamá-lo com frequência. E quando Paulo fala de justiça, domínio próprio e juízo vindouro, o texto diz que ele ficou atemorizado e adiou a conversa para outra oportunidade.",
    marcos: [
      "Tértulo apresenta a acusação com elogios ao governador",
      "'Segundo o Caminho que eles chamam seita, assim eu sirvo'",
      "'Espero em Deus que haverá ressurreição'",
      "Félix se atemoriza ao ouvir sobre juízo vindouro",
      "Esperava receber dinheiro e o deixou preso dois anos",
    ],
    chave: 16,
  },
  25: {
    resumo:
      "Para não ser levado de volta a Jerusalém, ele usa o último recurso de um cidadão romano.",
    detalhe:
      "Festo quer agradar os judeus e propõe transferir o julgamento, o que na prática seria sentença de morte no caminho. A resposta de Paulo é jurídica e definitiva, apelando para César. A partir dali ninguém mais pode decidir o caso localmente. O capítulo termina com Festo admitindo a Agripa que não sabe o que escrever no relatório, porque não achou nada digno de morte.",
    marcos: [
      "Festo propõe levar o julgamento a Jerusalém",
      "'Apelo para César'",
      "'Para César apelaste, para César irás'",
      "Agripa quer ouvir o homem pessoalmente",
      "'Não tenho nada de certo que escrever ao soberano'",
    ],
    chave: 11,
  },
  26: {
    resumo:
      "Diante de um rei, ele conta a própria história e termina quase convencendo o ouvinte.",
    detalhe:
      "É a terceira vez que Lucas narra a conversão, e cada versão tem detalhes próprios. Aqui aparece a frase sobre ser duro dar coices contra os aguilhões. Festo o interrompe dizendo que tanto estudo o levou à loucura, e a resposta de Paulo é serena. O diálogo final com Agripa é o mais humano, com a resposta de Paulo desejando que todos fossem como ele, exceto as algemas.",
    marcos: [
      "'Dura coisa é recalcitrares contra os aguilhões'",
      "'Não fui desobediente à visão celestial'",
      "'Estás louco, Paulo! As muitas letras te fazem delirar'",
      "'Por pouco me persuades a me fazer cristão'",
      "'Prouvera a Deus que todos fossem tais qual eu sou, menos estas cadeias'",
    ],
    chave: 29,
  },
  27: {
    resumo:
      "Duas semanas de tempestade sem ver sol nem estrelas, e ninguém se perde.",
    detalhe:
      "O relato é técnico e detalhado, com manobras náuticas, sondagens de profundidade e decisões de tripulação, o que sugere testemunha presente. O conselho de Paulo é ignorado no começo e ouvido no fim. O detalhe mais prático do capítulo é ele insistir para que todos comam depois de catorze dias em jejum, e o mais humano é o centurião impedindo a execução dos presos para salvá-lo.",
    marcos: [
      "O conselho de Paulo é ignorado no começo",
      "O vento euroaquilão arrasta o navio por dias",
      "Catorze dias sem ver sol nem estrelas",
      "'Rogo-vos que comais alguma coisa'",
      "O centurião impede a morte dos presos",
    ],
    chave: 25,
  },
  28: {
    resumo:
      "Náufrago numa ilha, ele é mordido por uma víbora, e o livro termina sem desfecho.",
    detalhe:
      "Os habitantes de Malta são chamados de bárbaros e tratam os náufragos com humanidade incomum, acendendo fogueira por causa da chuva e do frio. A reação deles à víbora vai de assassino a deus em poucos minutos. Em Roma, Paulo fica dois anos em prisão domiciliar recebendo a todos. O livro acaba sem contar o desfecho do processo, e a última palavra no grego é sobre pregar sem impedimento.",
    marcos: [
      "Os habitantes acendem fogueira por causa da chuva e do frio",
      "A víbora se prende à mão dele e ele a sacode no fogo",
      "O pai de Públio é curado",
      "Dois anos inteiros numa casa alugada",
      "Pregava sem impedimento algum",
    ],
    chave: 31,
  },
};

CAPITULOS.rm = {
  1: {
    resumo:
      "Ele se apresenta a uma igreja que nunca visitou e diz que não se envergonha.",
    detalhe:
      "A carta é a mais estruturada de Paulo e começa estabelecendo credenciais para leitores que não o conheciam. O versículo 16 anuncia o tema do livro inteiro, com o evangelho descrito como poder de Deus para salvação. A partir do versículo 18 começa a argumentação, e ela parte do universal, falando de gente que conhece Deus pela criação e escolhe não reconhecer, e a expressão que se repete é entregou-os.",
    marcos: [
      "'Sou devedor tanto a gregos como a bárbaros'",
      "'Não me envergonho do evangelho'",
      "'O justo viverá por fé'",
      "Os atributos invisíveis se percebem pelas coisas criadas",
      "'Deus os entregou' se repete três vezes",
    ],
    chave: 16,
  },
  2: {
    resumo:
      "Quem julga faz as mesmas coisas, e a bondade de Deus é que conduz ao arrependimento.",
    detalhe:
      "Depois de descrever a corrupção humana no capítulo anterior, Paulo vira a acusação contra quem estava concordando e aplaudindo. O argumento é que condenar o outro pelo que você mesmo faz é condenar a si próprio. A observação sobre a bondade de Deus conduzir ao arrependimento inverte a expectativa. E ele afirma que gentios sem a lei podem fazer o que a lei manda, tendo-a escrita no coração.",
    marcos: [
      "'Praticas as próprias coisas que condenas'",
      "'A bondade de Deus te leva ao arrependimento'",
      "Deus retribuirá a cada um segundo as suas obras",
      "Gentios mostram a lei escrita no coração",
      "'É judeu quem o é interiormente'",
    ],
    chave: 4,
  },
  3: {
    resumo:
      "A conclusão do diagnóstico é que ninguém escapa, e então vem a virada.",
    detalhe:
      "Paulo empilha citações dos salmos para sustentar que não há justo nem um. A função da lei é dita com precisão, porque por ela vem o conhecimento do pecado e não a solução. A partir do versículo 21 o texto muda de tom com a expressão mas agora, e apresenta a justiça de Deus manifestada à parte da lei, recebida por fé e dada gratuitamente, o que elimina qualquer base para se gabar.",
    marcos: [
      "'Não há justo, nem um sequer'",
      "'Pela lei vem o pleno conhecimento do pecado'",
      "'Mas, agora, se manifestou sem lei a justiça de Deus'",
      "'Todos pecaram e carecem da glória de Deus'",
      "'Onde está, pois, a jactância?'",
    ],
    chave: 23,
  },
  4: {
    resumo:
      "O exemplo é Abraão, e o argumento é cronológico: ele creu antes de ser circuncidado.",
    detalhe:
      "Paulo usa a ordem dos acontecimentos em Gênesis como prova, porque a declaração de justiça em Gênesis 15 vem antes da circuncisão em Gênesis 17. A fé é descrita de forma concreta, com Abraão considerando o próprio corpo já amortecido e o de Sara, e ainda assim não vacilando. A conclusão é que aquilo não foi escrito só por causa dele.",
    marcos: [
      "'Abraão creu a Deus, e isso lhe foi imputado para justiça'",
      "Ao que trabalha, o salário não é considerado graça",
      "A fé veio antes da circuncisão",
      "Considerou o próprio corpo amortecido e não vacilou",
      "'Não foi somente por causa dele que está escrito'",
    ],
    chave: 3,
  },
  5: {
    resumo:
      "Justificados, há paz, e a tribulação entra numa cadeia que termina em esperança.",
    detalhe:
      "A sequência do versículo 3 é contraintuitiva e é o coração do capítulo, com tribulação produzindo perseverança, perseverança experiência e experiência esperança. A demonstração do amor é datada, porque aconteceu quando ainda éramos fracos e inimigos, e não depois de qualquer melhora. A segunda metade compara Adão e Cristo, e a palavra que domina é muito mais.",
    marcos: [
      "'Justificados, pois, mediante a fé, temos paz com Deus'",
      "A tribulação produz perseverança e esperança",
      "'Sendo nós ainda fracos, Cristo morreu pelos ímpios'",
      "'Sendo nós ainda pecadores, Cristo morreu por nós'",
      "'Onde abundou o pecado, superabundou a graça'",
    ],
    chave: 8,
  },
  6: {
    resumo:
      "Se a graça abunda onde há pecado, então vale pecar mais, e a resposta é de modo nenhum.",
    detalhe:
      "Paulo levanta a objeção óbvia à própria argumentação e a responde com a imagem do batismo como sepultamento e ressurreição. O argumento não é de regra e sim de identidade, porque quem morreu está livre da escravidão anterior. A imagem final é de dois senhores e de dois salários, com a observação de que o salário do pecado é a morte e o dom gratuito de Deus é a vida eterna.",
    marcos: [
      "'Permaneceremos no pecado para que seja a graça mais abundante?'",
      "Fomos sepultados com ele na morte pelo batismo",
      "'Andemos nós também em novidade de vida'",
      "'Não reine o pecado no vosso corpo mortal'",
      "'O salário do pecado é a morte, mas o dom gratuito é a vida eterna'",
    ],
    chave: 23,
  },
  7: {
    resumo:
      "O capítulo mais angustiado de Paulo, sobre querer o bem e fazer o contrário.",
    detalhe:
      "A primeira parte é um argumento jurídico sobre a lei perder jurisdição com a morte. A segunda é uma descrição em primeira pessoa de conflito interno que gerou séculos de debate sobre a quem se refere. O que ele deixa claro é que a lei não é o problema, chamando-a de santa, justa e boa, e o problema está no que habita nele. O grito final é sobre libertação e a resposta é uma pessoa.",
    marcos: [
      "'Eu não conheceria o pecado, senão por intermédio da lei'",
      "'A lei é santa, e o mandamento, santo, justo e bom'",
      "'Não faço o bem que prefiro, e sim o mal que não quero'",
      "'Desventurado homem que sou!'",
      "'Graças a Deus por Jesus Cristo, nosso Senhor'",
    ],
    chave: 19,
  },
  8: {
    resumo:
      "Começa dizendo que não há condenação e termina afirmando que nada pode separar.",
    detalhe:
      "É o capítulo mais citado da carta. Ele passa do conflito interno do capítulo anterior para a vida no Espírito, com a filiação expressa na palavra aramaica Aba. O versículo 28 é lido com frequência fora de contexto, e vale notar que vem logo depois da menção à criação que geme e ao Espírito que intercede com gemidos inexprimíveis. A lista final de coisas que não separam é enorme e proposital.",
    marcos: [
      "'Nenhuma condenação há para os que estão em Cristo Jesus'",
      "'Recebestes o espírito de adoção, pelo qual clamamos: Aba, Pai'",
      "A criação geme e nós também gememos",
      "'Todas as coisas cooperam para o bem'",
      "'Nem a morte, nem a vida, nem coisa alguma poderá separar-nos'",
    ],
    chave: 28,
  },
  9: {
    resumo:
      "Ele diz que preferiria ser amaldiçoado se isso salvasse o próprio povo.",
    detalhe:
      "A abertura é de angústia pessoal e vale ler antes de qualquer discussão teórica sobre eleição. O capítulo trata da soberania divina usando Jacó e Esaú, Faraó e a imagem do oleiro com o barro. A objeção sobre injustiça é levantada por ele mesmo e respondida sem suavização. O fecho é irônico, porque gentios que não buscavam a justiça a alcançaram, e quem corria atrás dela tropeçou.",
    marcos: [
      "'Desejaria ser anátema, separado de Cristo, por amor dos meus irmãos'",
      "'Não depende de quem quer, nem de quem corre'",
      "'Quem és tu, ó homem, para pedires contas a Deus?'",
      "O oleiro e a massa de barro",
      "Os gentios alcançaram a justiça que vem da fé",
    ],
    chave: 3,
  },
  10: {
    resumo:
      "Ele reconhece o zelo deles e diz que o problema não é falta de vontade.",
    detalhe:
      "O diagnóstico é delicado, falando de zelo sem entendimento e de gente que procura estabelecer a própria justiça. A citação de Deuteronômio 30 sobre a palavra estar perto é usada para mostrar que não é preciso subir ao céu nem descer ao abismo. A cadeia de perguntas no fim é lógica e termina com a citação de Isaías sobre a beleza dos pés de quem anuncia boas novas.",
    marcos: [
      "'Têm zelo por Deus, porém não com entendimento'",
      "'A palavra está perto de ti, na tua boca e no teu coração'",
      "'Todo aquele que invocar o nome do Senhor será salvo'",
      "'Como ouvirão, se não há quem pregue?'",
      "'A fé vem pela pregação'",
    ],
    chave: 17,
  },
  11: {
    resumo:
      "Ele nega que Deus tenha rejeitado o próprio povo, usando a imagem da oliveira.",
    detalhe:
      "O exemplo dos sete mil no tempo de Elias serve para mostrar que sempre houve remanescente. A alegoria da oliveira é uma advertência aos gentios, lembrando que eles foram enxertados contra a natureza e que a raiz é que os sustenta. A conclusão é um alerta explícito contra arrogância. O capítulo termina em doxologia, com uma exclamação sobre a profundidade das riquezas e dos juízos.",
    marcos: [
      "'Porventura, rejeitou Deus o seu povo?'",
      "Reservei para mim sete mil homens",
      "'Não és tu que sustentas a raiz, mas a raiz a ti'",
      "'Não te ensoberbeças; antes, teme'",
      "'Ó profundidade da riqueza, da sabedoria e do conhecimento de Deus!'",
    ],
    chave: 33,
  },
  12: {
    resumo:
      "A virada prática da carta começa pedindo o corpo como culto racional.",
    detalhe:
      "Depois de onze capítulos de argumentação, ele diz portanto e passa à vida cotidiana. O culto pedido é o corpo inteiro e a transformação começa pela renovação da mente. A imagem do corpo com muitos membros trata de dons diferentes sem hierarquia. A lista final é de instruções curtas e diretas, incluindo chorar com os que choram e não se importar com coisas altas, e a ordem de vencer o mal com o bem.",
    marcos: [
      "'Apresenteis o vosso corpo por sacrifício vivo'",
      "'Transformai-vos pela renovação da vossa mente'",
      "'Não pensar de si mesmo além do que convém'",
      "'Alegrai-vos com os que se alegram e chorai com os que choram'",
      "'Não te deixes vencer do mal, mas vence o mal com o bem'",
    ],
    chave: 2,
  },
  13: {
    resumo:
      "Sobre autoridades e impostos, e a conclusão de que o amor cumpre a lei.",
    detalhe:
      "A orientação sobre submissão é direta e precisa ser lida sabendo que quem escreve vivia sob o império que o executaria. A instrução sobre pagar tributo e honra é prática. A segunda metade resume a lei numa dívida que nunca se paga por completo, que é o amor mútuo, e Paulo mostra que os mandamentos sobre o próximo se resumem no amor, que não pratica o mal contra ele.",
    marcos: [
      "'Toda alma esteja sujeita às autoridades superiores'",
      "'Pagai a todos o que lhes é devido'",
      "'A ninguém fiqueis devendo coisa alguma, exceto o amor'",
      "'O amor é o pleno cumprimento da lei'",
      "'A noite vem adiantada, e o dia vem chegando'",
    ],
    chave: 8,
  },
  14: {
    resumo:
      "Sobre comida e dias sagrados, e a instrução principal é não desprezar nem julgar.",
    detalhe:
      "O conflito é real e cotidiano, entre quem come de tudo e quem não come, e Paulo não decide quem tem razão no detalhe, e sim como conviver. As duas advertências são simétricas, porque um não deve desprezar e o outro não deve julgar. O critério final é não pôr tropeço no caminho do irmão, e a frase sobre o reino não ser comida e bebida resume a prioridade.",
    marcos: [
      "'Não o recebais para dúvidas'",
      "'Quem és tu que julgas o servo alheio?'",
      "'Cada um esteja inteiramente convicto em sua própria mente'",
      "'O reino de Deus não é comida nem bebida'",
      "'Não destruas, por causa da comida, a obra de Deus'",
    ],
    chave: 13,
  },
  15: {
    resumo:
      "Os fortes carregam a fraqueza dos outros, e Paulo fala dos próprios planos de viagem.",
    detalhe:
      "O princípio é de responsabilidade assimétrica, porque quem tem mais liberdade é quem cede. A razão dada para o registro das Escrituras é o ensino e a perseverança. A segunda metade é pessoal e mostra a estratégia missionária dele, com o cuidado de não construir sobre fundamento alheio, e o projeto de chegar à Espanha. Também menciona a coleta para os pobres de Jerusalém.",
    marcos: [
      "'Nós, que somos fortes, devemos suportar as fraquezas dos fracos'",
      "'Tudo quanto, outrora, foi escrito, para o nosso ensino foi escrito'",
      "'Acolhei-vos uns aos outros'",
      "'Esforçando-me por pregar onde Cristo não havia sido nomeado'",
      "A coleta para os pobres de Jerusalém",
    ],
    chave: 4,
  },
  16: {
    resumo:
      "Uma lista de saudações que é também o registro de quem sustentava aquelas igrejas.",
    detalhe:
      "O capítulo parece protocolar e é uma fonte histórica valiosa, porque nomeia vinte e seis pessoas, sendo muitas delas mulheres com funções descritas. Febe é apresentada como diaconisa e provavelmente levou a carta. Priscila é citada antes do marido. Júnia é chamada de notável entre os apóstolos. A carta também revela que foi escrita por um escriba chamado Tércio, que se apresenta pelo nome.",
    marcos: [
      "Febe é recomendada como serva da igreja de Cencreia",
      "Priscila e Áquila arriscaram a própria vida",
      "Andrônico e Júnia, notáveis entre os apóstolos",
      "'Eu, Tércio, que escrevi esta carta'",
      "Uma advertência contra os que causam divisões",
    ],
    chave: 1,
  },
};

CAPITULOS["1co"] = {
  1: {
    resumo:
      "A igreja está dividida em torcidas, e ele responde falando de uma cruz que parece loucura.",
    detalhe:
      "O problema chega por relato de gente da casa de Cloe, e as facções usam nomes de líderes como bandeira. Paulo desmonta isso perguntando se Cristo está dividido. A argumentação seguinte é sobre um critério invertido, porque Deus escolheu o que é louco, fraco e desprezado para envergonhar o que é forte e sábio, e a razão declarada é que ninguém se glorie diante dele.",
    marcos: [
      "Cada um dizia ser de Paulo, de Apolo, de Cefas ou de Cristo",
      "'Está Cristo dividido?'",
      "A palavra da cruz é loucura para os que se perdem",
      "Deus escolheu as coisas loucas para envergonhar os sábios",
      "'Aquele que se gloria, glorie-se no Senhor'",
    ],
    chave: 27,
  },
  2: {
    resumo:
      "Ele admite ter chegado ali com fraqueza, temor e muito tremor.",
    detalhe:
      "A confissão é incomum para quem escreve com autoridade, e é deliberada, porque ele quer que a fé deles não se apoie em habilidade retórica. O contraste é entre a sabedoria de palavras e a demonstração do Espírito. O capítulo fala de uma sabedoria que os poderosos daquele século não conheceram, e termina afirmando que o homem natural não aceita as coisas do Espírito por lhe parecerem loucura.",
    marcos: [
      "'Não fui com sublimidade de palavras'",
      "'Estive convosco em fraqueza, temor e grande tremor'",
      "'Para que a vossa fé não se apoiasse em sabedoria humana'",
      "'Nem olhos viram, nem ouvidos ouviram'",
      "'Nós temos a mente de Cristo'",
    ],
    chave: 3,
  },
  3: {
    resumo:
      "Ele os trata como bebês e usa duas imagens, a da lavoura e a da construção.",
    detalhe:
      "A prova de imaturidade que ele apresenta são justamente as divisões, e não erros doutrinários. Na imagem agrícola, ele planta, Apolo rega e Deus dá o crescimento. Na de construção, o fundamento é único e cada um escolhe o material, com a advertência de que a obra será provada pelo fogo. O fecho lembra que eles são templo e que tudo é deles, incluindo o mundo, a vida e a morte.",
    marcos: [
      "'Dei-vos leite e não alimento sólido'",
      "'Eu plantei, Apolo regou, mas o crescimento veio de Deus'",
      "Ouro, prata, pedras preciosas, madeira, feno, palha",
      "'A obra de cada um será manifesta'",
      "'Não sabeis que sois santuário de Deus?'",
    ],
    chave: 6,
  },
  4: {
    resumo:
      "Sobre ser avaliado pelos outros, ele diz que nem a si mesmo se julga.",
    detalhe:
      "O critério para um administrador é ser achado fiel, e ele considera de mínima importância ser julgado por tribunal humano. A ironia da segunda metade é pesada, contrapondo a autoimagem deles, ricos e reinando, com a realidade dos apóstolos, descritos como espetáculo, loucos, fracos, desprezados, famintos, mal vestidos e tratados como lixo do mundo. E termina lembrando que é pai deles pelo evangelho.",
    marcos: [
      "'Requer-se que o administrador seja encontrado fiel'",
      "'Nem eu a mim mesmo me julgo'",
      "'Já estais ricos, já chegastes a reinar sem nós'",
      "'Somos feitos como lixo do mundo'",
      "'Em Cristo Jesus eu vos gerei por meio do evangelho'",
    ],
    chave: 2,
  },
  5: {
    resumo:
      "Um caso grave está sendo tolerado com orgulho, e ele manda agir.",
    detalhe:
      "O escândalo é de um tipo que nem entre os pagãos era aceito, e o que mais o incomoda é a reação da comunidade, que estava inchada em vez de lamentar. A imagem do fermento explica por que uma coisa pequena afeta toda a massa. E há uma distinção importante no fim, esclarecendo que a instrução de não se misturar era sobre quem se diz irmão, e não sobre as pessoas de fora.",
    marcos: [
      "Um caso que nem entre os gentios se tolera",
      "'E andais vós ensoberbecidos?'",
      "'Um pouco de fermento leveda a massa toda'",
      "A distinção entre os de dentro e os de fora",
      "'A esses que estão de fora, Deus os julgará'",
    ],
    chave: 6,
  },
  6: {
    resumo:
      "Processar o irmão diante de juízes pagãos já é derrota, mesmo ganhando a causa.",
    detalhe:
      "O argumento é de coerência interna, perguntando se não há entre eles nenhum sábio capaz de julgar. A frase mais forte é que já é falta completa haver demandas entre eles, e a pergunta seguinte sugere que seria melhor sofrer a injustiça. A segunda metade trata do corpo, com a repetição de que todas as coisas lhe são lícitas e nem todas convêm, e a afirmação de que o corpo é santuário.",
    marcos: [
      "'Ousa algum de vós pleitear perante os injustos?'",
      "'Por que não sofreis, antes, a injustiça?'",
      "'Todas as coisas me são lícitas, mas nem todas convêm'",
      "'O vosso corpo é santuário do Espírito Santo'",
      "'Fostes comprados por preço'",
    ],
    chave: 12,
  },
  7: {
    resumo:
      "Respostas a perguntas sobre casamento, solteirice e separação, com bastante nuance.",
    detalhe:
      "O capítulo é notável pela simetria, porque quase todas as instruções aparecem em pares dirigidos ao marido e à esposa nas mesmas condições. Paulo distingue com honestidade o que é mandamento do Senhor e o que é opinião dele. O conselho de permanecer como está é motivado pela instabilidade do tempo presente, e não por desprezo ao casamento, e ele reconhece que cada um tem o seu próprio dom.",
    marcos: [
      "As instruções são dadas em pares, ao marido e à esposa",
      "'Cada um tem de Deus o seu próprio dom'",
      "'Quanto às virgens, não tenho mandamento do Senhor'",
      "'Cada um permaneça na vocação em que foi chamado'",
      "'Quero que estejais livres de preocupações'",
    ],
    chave: 17,
  },
  8: {
    resumo:
      "Sobre carne de ídolos, ele diz que o conhecimento infla e o amor edifica.",
    detalhe:
      "Os corintos que tinham razão no argumento teórico, porque o ídolo não é nada, estavam errados no uso da liberdade. Paulo concorda com a teologia deles e desloca o critério, dizendo que nem todos têm esse conhecimento e que a consciência do outro precisa ser levada em conta. A conclusão pessoal é extrema, com ele afirmando que nunca mais comeria carne se isso fizesse o irmão tropeçar.",
    marcos: [
      "'O conhecimento ensoberbece, mas o amor edifica'",
      "'Nem em todos há esse conhecimento'",
      "'A comida não nos recomendará a Deus'",
      "'Vede que essa liberdade não venha a ser tropeço'",
      "'Nunca mais comerei carne, para não escandalizar meu irmão'",
    ],
    chave: 1,
  },
  9: {
    resumo:
      "Ele lista todos os direitos que tem e explica por que abre mão deles.",
    detalhe:
      "A argumentação usa exemplos do cotidiano, com soldado, plantador e pastor, e depois a lei sobre não atar a boca do boi que debulha. Depois de provar que teria direito ao sustento, ele diz que não usou desse direito. A explicação está na frase sobre fazer-se tudo para todos, e as imagens finais são atléticas, de corrida e de luta, com a preocupação de não ser desqualificado.",
    marcos: [
      "'Não somos nós livres?'",
      "'Não atarás a boca ao boi que debulha'",
      "'Não temos usado desse direito'",
      "'Fiz-me tudo para com todos'",
      "'Esmurro o meu corpo e o reduzo à escravidão'",
    ],
    chave: 22,
  },
  10: {
    resumo:
      "A história de Israel no deserto é usada como aviso, e o critério final é a glória de Deus.",
    detalhe:
      "Paulo lembra que todos passaram pelo mar e comeram o mesmo alimento espiritual, e mesmo assim muitos caíram. A conclusão é um alerta para quem pensa estar em pé. A promessa sobre a tentação vem acompanhada de uma nota realista de que nenhuma delas é incomum ao homem. O capítulo termina com uma regra prática ampla, incluindo comer e beber, e com o cuidado de não escandalizar ninguém.",
    marcos: [
      "'Estas coisas aconteceram como exemplos para nós'",
      "'Aquele que pensa estar em pé veja que não caia'",
      "'Não vos sobreveio tentação que não fosse humana'",
      "'Deus é fiel e não permitirá que sejais tentados além'",
      "'Fazei tudo para a glória de Deus'",
    ],
    chave: 13,
  },
  11: {
    resumo:
      "Na ceia, uns comem tudo e outros passam fome, e ele diz que aquilo não é ceia do Senhor.",
    detalhe:
      "A primeira parte trata de costumes de cobertura da cabeça no culto, ligados à cultura local. A segunda é mais grave e social: as reuniões estavam piorando em vez de melhorar, porque cada um tomava a própria refeição antes, e enquanto um tinha fome outro se embriagava. A repreensão é sobre humilhar os que nada têm, e o exame de consciência pedido tem a ver diretamente com isso.",
    marcos: [
      "As instruções sobre a cobertura da cabeça",
      "'As vossas reuniões não são para melhor, e sim para pior'",
      "'Um tem fome, e outro se embriaga'",
      "'Isto é o meu corpo, que é dado por vós'",
      "'Examine-se, pois, o homem a si mesmo'",
    ],
    chave: 26,
  },
  12: {
    resumo:
      "Dons diferentes, um só Espírito, e os membros aparentemente mais fracos são necessários.",
    detalhe:
      "A lista de dons é variada e cada um é dado para proveito comum, e não para status. A imagem do corpo é desenvolvida com humor, imaginando o pé dizendo que não é mão e a orelha dizendo que não é olho. O ponto mais forte é a inversão de valor, porque os membros que parecem mais fracos são indispensáveis e os menos honrosos recebem mais honra, para que não haja divisão.",
    marcos: [
      "Diversidade de dons, o mesmo Espírito",
      "'A manifestação do Espírito é concedida para o que for útil'",
      "'Se o pé disser: porque não sou mão'",
      "'Os membros que parecem mais fracos são necessários'",
      "'Se um membro sofre, todos sofrem com ele'",
    ],
    chave: 26,
  },
  13: {
    resumo:
      "No meio de uma discussão sobre dons, ele para tudo e escreve sobre amor.",
    detalhe:
      "O capítulo não é um poema isolado, e o contexto importa, porque ele está tratando de gente que valorizava certos dons acima de outros. A primeira parte reduz a nada os dons mais impressionantes sem amor, incluindo dar os bens aos pobres e entregar o próprio corpo. A definição do meio é feita de verbos e não de sentimentos. E o fim é sobre provisoriedade, com a imagem do espelho embaçado.",
    marcos: [
      "'Ainda que eu fale as línguas dos homens e dos anjos'",
      "'O amor é paciente, é benigno'",
      "'Não se ufana, não se ensoberbece'",
      "'Vemos como em espelho, obscuramente'",
      "'Agora, pois, permanecem a fé, a esperança e o amor'",
    ],
    chave: 13,
  },
  14: {
    resumo:
      "O critério para o culto é simples: serve para edificar quem está ouvindo?",
    detalhe:
      "Paulo compara línguas e profecia e prefere a segunda no culto público, não por desprezo e sim por proveito comum. Ele usa imagens musicais, dizendo que se a flauta ou a harpa não derem sons distintos ninguém saberá o que se toca. A preocupação com o visitante é explícita, perguntando o que o não instruído diria. E a instrução final é que tudo seja feito com decência e ordem.",
    marcos: [
      "'Quem fala em outra língua edifica-se a si mesmo'",
      "'Se a trombeta der sonido incerto, quem se preparará?'",
      "'Prefiro falar cinco palavras com o meu entendimento'",
      "'Não sejais meninos no entendimento'",
      "'Tudo, porém, seja feito com decência e ordem'",
    ],
    chave: 40,
  },
  15: {
    resumo:
      "O capítulo mais longo da carta trata da ressurreição, e ele diz o que está em jogo.",
    detalhe:
      "Paulo começa citando uma fórmula que recebeu, o que a torna material muito antigo, e lista testemunhas, incluindo mais de quinhentas pessoas de uma vez. O argumento central é condicional e franco: se não há ressurreição, a pregação é vã e a fé é inútil. A metáfora agrícola da semente responde à pergunta sobre o corpo. E o fim é prático, ligando doutrina a trabalho que não é vão.",
    marcos: [
      "'Transmiti-vos, antes de tudo, o que também recebi'",
      "Apareceu a mais de quinhentos irmãos de uma só vez",
      "'Se Cristo não ressuscitou, é vã a nossa pregação'",
      "'Onde está, ó morte, a tua vitória?'",
      "'O vosso trabalho não é vão no Senhor'",
    ],
    chave: 58,
  },
  16: {
    resumo:
      "Instruções sobre a coleta, planos de viagem e recados finais escritos à mão.",
    detalhe:
      "A orientação sobre a coleta é administrativamente sensata, pedindo que cada um separe algo no primeiro dia da semana conforme a prosperidade, para não haver coletas de última hora quando ele chegar. Ele também menciona uma porta larga e eficaz aberta, e logo em seguida diz que há muitos adversários, sem ver contradição entre as duas coisas.",
    marcos: [
      "'No primeiro dia da semana, cada um ponha de parte'",
      "'Abriu-se-me uma porta grande e eficaz'",
      "'E há muitos adversários'",
      "'Vigiai, sede firmes na fé'",
      "'Todas as vossas coisas sejam feitas com amor'",
    ],
    chave: 14,
  },
};

CAPITULOS["2co"] = {
  1: {
    resumo:
      "Ele começa falando de consolo e admite ter chegado ao ponto de desesperar da própria vida.",
    detalhe:
      "A palavra consolo aparece dez vezes nos primeiros versículos, e a lógica é de transmissão, porque somos consolados para podermos consolar. A honestidade sobre o que passou na Ásia é rara, com a expressão sobre ficarem sobrecarregados além das forças e perderem a esperança de sobreviver. A razão que ele dá para isso é aprender a confiar em quem ressuscita os mortos.",
    marcos: [
      "'Pai das misericórdias e Deus de toda consolação'",
      "'Para podermos consolar os que estiverem em qualquer angústia'",
      "'Chegamos a perder a esperança de sobreviver'",
      "'Para que não confiemos em nós mesmos'",
      "'Quantas são as promessas de Deus, nele, está o sim'",
    ],
    chave: 4,
  },
  2: {
    resumo:
      "Ele explica por que não foi visitá-los e pede que perdoem e confortem o ofensor.",
    detalhe:
      "A mudança de planos tinha sido interpretada como leviandade, e ele explica que foi para poupá-los. Confessa ter escrito a carta anterior com muita angústia e lágrimas. O pedido sobre o disciplinado é sobre reintegração, com a preocupação de que ele não seja consumido por tristeza excessiva. A imagem final é de procissão triunfal e de perfume que é aroma de vida para uns e de morte para outros.",
    marcos: [
      "'Escrevi-vos no meio de muita tribulação e angústia'",
      "'Deveis, antes, perdoar-lhe e confortá-lo'",
      "'Para que não seja devorado por excessiva tristeza'",
      "'Não ignoramos os seus desígnios'",
      "'Somos para Deus o bom perfume de Cristo'",
    ],
    chave: 7,
  },
  3: {
    resumo:
      "Ele diz que a carta de recomendação dele são as próprias pessoas.",
    detalhe:
      "A imagem é de tinta e de pedra contra Espírito e coração. O capítulo compara os dois ministérios, o da letra que mata e o do Espírito que vivifica, usando o rosto de Moisés como referência. O detalhe que ele acrescenta ao relato do Êxodo é que o véu servia também para não verem o desvanecer do brilho. E termina com a imagem do rosto descoberto que reflete e é transformado de glória em glória.",
    marcos: [
      "'Vós sois a nossa carta, escrita em nosso coração'",
      "'Não em tábuas de pedra, mas em tábuas de carne'",
      "'A letra mata, mas o espírito vivifica'",
      "'Onde está o Espírito do Senhor, aí há liberdade'",
      "'Somos transformados de glória em glória'",
    ],
    chave: 17,
  },
  4: {
    resumo:
      "Um tesouro guardado em vasilha de barro, e o motivo da escolha é dito em voz alta.",
    detalhe:
      "A imagem do vaso de barro é de utensílio comum e quebrável, e a razão declarada é que a excelência do poder seja de Deus e não deles. A lista seguinte é construída em pares que quase se anulam, com atribulados mas não angustiados e abatidos mas não destruídos. E o contraste final é entre o que se vê e o que não se vê, com a afirmação de que a aflição é leve e momentânea.",
    marcos: [
      "'Temos, porém, este tesouro em vasos de barro'",
      "'Em tudo somos atribulados, porém não angustiados'",
      "'O nosso homem interior se renova de dia em dia'",
      "'A nossa leve e momentânea tribulação'",
      "'Não atentamos nas coisas que se veem'",
    ],
    chave: 7,
  },
  5: {
    resumo:
      "A tenda que pode ser desfeita, e o ministério descrito como embaixada.",
    detalhe:
      "A imagem de abertura é de acampamento provisório comparado a um edifício permanente. O capítulo trata de viver por fé e não por vista, e de um tribunal em que cada um receberá segundo o que fez. A segunda metade é a mais citada, com a nova criatura e o ministério da reconciliação, e com a definição do papel como embaixadores, o que implica falar em nome de outro.",
    marcos: [
      "'Se a nossa casa terrestre deste tabernáculo se desfizer'",
      "'Porque andamos por fé e não pelo que vemos'",
      "'Se alguém está em Cristo, é nova criatura'",
      "'Deus nos confiou a palavra da reconciliação'",
      "'De sorte que somos embaixadores em nome de Cristo'",
    ],
    chave: 17,
  },
  6: {
    resumo:
      "Uma lista longa do que ele passou, e um apelo para que abram o coração.",
    detalhe:
      "O catálogo de provações é um dos mais detalhados do Novo Testamento, incluindo açoites, prisões, tumultos, trabalhos, vigílias e jejuns. Depois vem uma série de paradoxos sobre parecer uma coisa e ser outra, como tidos por enganadores sendo verdadeiros, e como nada tendo e possuindo tudo. O apelo final é afetivo, dizendo que a boca está aberta e o coração dilatado para eles.",
    marcos: [
      "'Eis agora o tempo sobremodo oportuno'",
      "Em tribulações, necessidades, angústias e vigílias",
      "'Como entristecidos, mas sempre alegres'",
      "'Como nada tendo, mas possuindo tudo'",
      "'A nossa boca está aberta para vós, o nosso coração, dilatado'",
    ],
    chave: 10,
  },
  7: {
    resumo:
      "Ele conta o alívio que sentiu quando Tito chegou com notícias boas.",
    detalhe:
      "A confissão do versículo 5 é crua, dizendo que nem mesmo repouso teve, com lutas por fora e temores por dentro. O consolo veio pela chegada de uma pessoa. A distinção mais útil do capítulo é entre dois tipos de tristeza, a segundo Deus, que produz arrependimento e não traz pesar, e a do mundo, que produz morte. E ele descreve com detalhe a reação saudável que aquela carta dura provocou.",
    marcos: [
      "'De fora, lutas; de dentro, temores'",
      "'Deus consolou-nos com a chegada de Tito'",
      "'A tristeza segundo Deus produz arrependimento'",
      "'Mas a tristeza do mundo produz morte'",
      "Ele se alegra por poder confiar neles em tudo",
    ],
    chave: 10,
  },
  8: {
    resumo:
      "Sobre a coleta, ele usa como exemplo igrejas pobres que pediram para participar.",
    detalhe:
      "O caso macedônio é apresentado como paradoxo, porque em muita prova de tribulação e profunda pobreza eles superabundaram em generosidade e insistiram para serem incluídos. Paulo evita coagir e prefere provar a sinceridade. O princípio que ele propõe é de igualdade, citando o maná, em que quem recolheu muito não teve demais e quem recolheu pouco não teve falta.",
    marcos: [
      "A profunda pobreza deles superabundou em riqueza de generosidade",
      "'Deram-se a si mesmos, primeiro, ao Senhor'",
      "'Não digo isto como quem manda'",
      "'Para que haja igualdade'",
      "'Ao que muito colheu, não sobrou; e ao que pouco, não faltou'",
    ],
    chave: 9,
  },
  9: {
    resumo:
      "Sobre dar com alegria, e a promessa é sobre semear e colher na mesma medida.",
    detalhe:
      "Ele evita constrangimento explicando que mandou os irmãos antes justamente para que a oferta estivesse pronta e não parecesse extorquida. A imagem agrícola é clara, porque quem semeia com mesquinhez colhe do mesmo jeito. A instrução central é sobre decidir no coração, sem tristeza nem constrangimento, com a frase sobre Deus amar quem dá com alegria.",
    marcos: [
      "'Aquele que semeia pouco, pouco também ceifará'",
      "'Cada um contribua segundo tiver proposto no coração'",
      "'Não com tristeza ou por necessidade'",
      "'Deus ama a quem dá com alegria'",
      "'Graças a Deus pelo seu dom inefável'",
    ],
    chave: 7,
  },
  10: {
    resumo:
      "Começa a defesa pessoal, e ele cita o que diziam dele pelas costas.",
    detalhe:
      "A crítica reproduzida é que as cartas dele eram fortes e a presença fraca, com fala desprezível. A resposta usa linguagem militar sobre armas que não são carnais e sobre destruir fortalezas e levar cativo todo pensamento. A segunda metade estabelece um princípio de trabalho, sobre não se gloriar em trabalho alheio nem ultrapassar a medida, e termina citando que quem se gloria deve gloriar-se no Senhor.",
    marcos: [
      "'As suas cartas são graves, mas a sua presença é fraca'",
      "'As armas da nossa milícia não são carnais'",
      "'Levando cativo todo pensamento à obediência de Cristo'",
      "'Não nos gloriamos em trabalhos alheios'",
      "'Aquele que se gloria, glorie-se no Senhor'",
    ],
    chave: 5,
  },
  11: {
    resumo:
      "Ele se diz obrigado a fazer papel de tolo, e lista sofrimentos em vez de conquistas.",
    detalhe:
      "O tom é irônico do começo ao fim, com ele pedindo desculpas por falar como louco e explicando que só faz isso porque foi forçado. A lista é impressionante e nada gloriosa: açoites, naufrágios, perigos de toda espécie, fome, sede e frio. E a conclusão do catálogo é que, se tem de gloriar-se, glorie-se naquilo que é da sua fraqueza, terminando com a fuga humilhante dentro de um cesto pela janela.",
    marcos: [
      "'Tolerai-me um pouco na minha insensatez'",
      "'Cinco vezes recebi dos judeus quarenta açoites menos um'",
      "'Três vezes sofri naufrágio'",
      "'Além das coisas exteriores, a preocupação de todas as igrejas'",
      "Descido num cesto por uma janela da muralha",
    ],
    chave: 30,
  },
  12: {
    resumo:
      "Ele conta uma experiência extraordinária e logo fala do espinho que veio junto.",
    detalhe:
      "A visão é narrada na terceira pessoa e com reserva deliberada. O espinho não é identificado e a insistência dele foi em oração, três vezes. A resposta não é a remoção e sim a suficiência da graça, com a frase sobre o poder se aperfeiçoar na fraqueza. A conclusão dele é paradoxal, dizendo que quando é fraco é que é forte. O capítulo também mostra preocupação pastoral com o que encontrará ao chegar.",
    marcos: [
      "Arrebatado ao terceiro céu, ouviu palavras inefáveis",
      "'Foi-me dado um espinho na carne'",
      "'Três vezes pedi ao Senhor que o afastasse'",
      "'A minha graça te basta'",
      "'Quando sou fraco, então, é que sou forte'",
    ],
    chave: 9,
  },
  13: {
    resumo:
      "Ele avisa que vai pela terceira vez e pede que examinem a si mesmos.",
    detalhe:
      "O tom é firme e ele anuncia que não vai poupar, citando a regra das duas ou três testemunhas. O convite ao autoexame inverte a situação, porque eles é que estavam examinando a legitimidade dele. A frase que mais surpreende é o desejo dele de parecer reprovado desde que eles façam o bem, o que mostra prioridade. E a carta fecha com uma bênção trinitária que virou fórmula litúrgica.",
    marcos: [
      "'Pela boca de duas ou três testemunhas'",
      "'Examinai-vos a vós mesmos'",
      "'Rogamos a Deus que não pratiqueis mal algum'",
      "'Nada podemos contra a verdade'",
      "'A graça do Senhor Jesus, o amor de Deus e a comunhão do Espírito'",
    ],
    chave: 5,
  },
};

CAPITULOS.gl = {
  1: {
    resumo:
      "Ele pula os elogios de costume e vai direto ao espanto com a mudança deles.",
    detalhe:
      "Todas as outras cartas de Paulo começam com agradecimento, e esta não, o que já indica a gravidade. O anátema pronunciado duas vezes vale inclusive contra ele mesmo ou contra um anjo, se anunciarem outro evangelho. A segunda metade é autobiográfica e serve de argumento, mostrando que a mensagem dele não veio por instrução humana, com o detalhe dos três anos na Arábia.",
    marcos: [
      "'Estou admirado de que estejais passando tão depressa'",
      "'Ainda que nós ou um anjo do céu vos pregue outro evangelho'",
      "'Busco eu, agora, o favor dos homens?'",
      "'Não a recebi de homem algum'",
      "Passou três anos antes de subir a Jerusalém",
    ],
    chave: 10,
  },
  2: {
    resumo:
      "Ele conta que confrontou Pedro publicamente por causa de com quem ele comia.",
    detalhe:
      "O episódio de Antioquia é registrado com nomes e lugar, e o motivo foi que Pedro comia com gentios e se afastou quando chegaram pessoas de Jerusalém. A acusação é de dissimulação, e Paulo diz que resistiu na cara dele porque estava errado. O argumento central da carta aparece em seguida, com a justificação pela fé e não pelas obras da lei, e a frase pessoal sobre já não ser ele quem vive.",
    marcos: [
      "Tito, sendo grego, não foi constrangido a circuncidar-se",
      "'Resisti-lhe face a face, porque se tornara repreensível'",
      "Pedro se afastava com medo dos da circuncisão",
      "'O homem não é justificado por obras da lei'",
      "'Logo, não sou mais eu quem vive, mas Cristo vive em mim'",
    ],
    chave: 20,
  },
  3: {
    resumo:
      "Ele chama os leitores de insensatos e faz uma pergunta que responde tudo.",
    detalhe:
      "A pergunta do versículo 2 é o argumento central: eles receberam o Espírito por obras da lei ou pela pregação da fé. O exemplo de Abraão é usado de novo, e Paulo observa que a promessa veio antes da lei, o que a lei posterior não pode anular. A função da lei é descrita como aio, o escravo que conduzia a criança à escola, função importante e temporária. O fecho derruba barreiras de etnia, condição social e gênero.",
    marcos: [
      "'Ó gálatas insensatos! Quem vos fascinou?'",
      "'Recebestes o Espírito por obras da lei ou pela pregação da fé?'",
      "'A lei foi o nosso aio para nos conduzir a Cristo'",
      "'Todos sois filhos de Deus mediante a fé'",
      "'Nem judeu nem grego, nem escravo nem liberto, nem homem nem mulher'",
    ],
    chave: 28,
  },
  4: {
    resumo:
      "Herdeiros que se comportam como escravos, e uma alegoria com as duas mulheres de Abraão.",
    detalhe:
      "A imagem de abertura é jurídica, sobre o herdeiro menor de idade que não difere de escravo enquanto não chega o tempo. A filiação é expressa com a palavra Aba no coração. Paulo então se torna pessoal, lembrando que pregou a eles por causa de uma enfermidade e que eles teriam arrancado os próprios olhos para dar-lhe. E a alegoria de Agar e Sara é usada para falar de escravidão e liberdade.",
    marcos: [
      "'Vindo a plenitude do tempo, Deus enviou seu Filho'",
      "'O Espírito de seu Filho, que clama: Aba, Pai'",
      "'Guardais dias, meses, tempos e anos'",
      "'Se possível, teríeis arrancado os próprios olhos'",
      "A alegoria das duas alianças",
    ],
    chave: 4,
  },
  5: {
    resumo:
      "Chamados para a liberdade, com o aviso de que ela não é desculpa para qualquer coisa.",
    detalhe:
      "O capítulo equilibra duas quedas possíveis, a de voltar ao jugo e a de usar a liberdade como pretexto. O resumo da lei numa frase sobre amar o próximo aparece aqui também. A comparação entre as obras da carne e o fruto do Espírito é notável na forma, porque as primeiras estão no plural e o segundo está no singular, sugerindo um conjunto que cresce junto e não uma lista de itens separados.",
    marcos: [
      "'Para a liberdade foi que Cristo nos libertou'",
      "'Não useis da liberdade para dar ocasião à carne'",
      "'Toda a lei se cumpre em um só preceito'",
      "As obras da carne são manifestas",
      "'O fruto do Espírito é amor, alegria, paz'",
    ],
    chave: 22,
  },
  6: {
    resumo:
      "Sobre carregar fardos uns dos outros e também o próprio, sem contradição.",
    detalhe:
      "Os dois versículos que parecem se contradizer usam palavras gregas diferentes, uma para peso esmagador que precisa de ajuda e outra para a carga pessoal que cada um deve levar. A instrução sobre restaurar quem caiu vem com a recomendação de brandura e com um alerta de autoexame. E o fecho tem uma nota física, com ele apontando as letras grandes que escreveu de próprio punho.",
    marcos: [
      "'Corrigi-o com espírito de brandura'",
      "'Levai as cargas uns dos outros'",
      "'Cada um levará o seu próprio fardo'",
      "'O que o homem semear, isso também ceifará'",
      "'Vede com que letras grandes vos escrevi'",
    ],
    chave: 2,
  },
};

CAPITULOS.ef = {
  1: {
    resumo:
      "Um único fôlego de louvor que no grego é uma só frase enorme.",
    detalhe:
      "Os versículos 3 a 14 formam uma sentença contínua, acumulando bênçãos sem parar para respirar. A expressão em Cristo se repete dezenas de vezes na carta. A segunda metade é uma oração, e o pedido não é por circunstâncias e sim por olhos iluminados do coração, para conhecerem a esperança, a riqueza da herança e a grandeza do poder disponível.",
    marcos: [
      "'Bendito o Deus e Pai de nosso Senhor Jesus Cristo'",
      "'Nos escolheu, nele, antes da fundação do mundo'",
      "'Selados com o Santo Espírito da promessa'",
      "'Iluminados os olhos do vosso coração'",
      "'Qual a suprema grandeza do seu poder'",
    ],
    chave: 18,
  },
  2: {
    resumo:
      "Estávamos mortos, e a frase que muda tudo começa com um mas Deus.",
    detalhe:
      "A descrição do antes é dura, com morte em delitos e pecados. A virada acontece no versículo 4 e a razão dada é a riqueza da misericórdia e o grande amor. A salvação é descrita como dom, sem obras, para que ninguém se glorie, e logo depois vem a afirmação de que somos feitura dele para boas obras. A segunda metade trata do muro derrubado entre judeus e gentios.",
    marcos: [
      "'Estando nós mortos em nossos delitos'",
      "'Mas Deus, sendo rico em misericórdia'",
      "'Pela graça sois salvos, mediante a fé'",
      "'Somos feitura dele, criados para boas obras'",
      "'Ele é a nossa paz, e derribou a parede da separação'",
    ],
    chave: 8,
  },
  3: {
    resumo:
      "O mistério revelado é que os gentios são coerdeiros, e ele ora por força interior.",
    detalhe:
      "O mistério em Paulo não é algo obscuro e sim algo antes escondido e agora anunciado, e o conteúdo dele é a inclusão dos gentios no mesmo corpo. Ele se descreve como o menor de todos os santos. A oração do fim pede fortalecimento no homem interior e a capacidade de compreender dimensões que ele lista em quatro direções, terminando num paradoxo sobre conhecer o amor que excede o conhecimento.",
    marcos: [
      "'Foi-me dado conhecer o mistério'",
      "'Os gentios são coerdeiros e membros do mesmo corpo'",
      "'A mim, o menor de todos os santos'",
      "'Qual seja a largura, o comprimento, a altura e a profundidade'",
      "'Àquele que é poderoso para fazer infinitamente mais'",
    ],
    chave: 20,
  },
  4: {
    resumo:
      "A parte prática começa com paciência e termina falando de como se fala.",
    detalhe:
      "O apelo é por um andar digno, e as qualidades listadas são humildade, mansidão e longanimidade, com a expressão sobre suportar-se uns aos outros em amor. Os dons são dados para o aperfeiçoamento dos santos, que fazem a obra, e não para substituí-los. A segunda metade é bem concreta, tratando de mentira, raiva, furto e conversa, com a instrução de não deixar o sol se pôr sobre a ira.",
    marcos: [
      "'Suportando-vos uns aos outros em amor'",
      "'Um só corpo e um só Espírito'",
      "'Para o aperfeiçoamento dos santos'",
      "'Irai-vos e não pequeis; não se ponha o sol sobre a vossa ira'",
      "'Não saia da vossa boca nenhuma palavra torpe'",
    ],
    chave: 29,
  },
  5: {
    resumo:
      "Andar em amor e em luz, e uma instrução sobre casamento que começa por submissão mútua.",
    detalhe:
      "O capítulo trata de conduta pública e privada, com o alerta contra conversas torpes e a instrução de aproveitar bem o tempo. A seção sobre casamento é frequentemente citada pela metade, e vale notar que ela começa no versículo 21 com a ordem de sujeição mútua, e que a instrução ao marido é morrer por ela, o que é a exigência mais pesada do trecho.",
    marcos: [
      "'Sede, pois, imitadores de Deus'",
      "'Outrora, éreis trevas, porém, agora, sois luz'",
      "'Remindo o tempo, porque os dias são maus'",
      "'Sujeitando-vos uns aos outros no temor de Cristo'",
      "'Maridos, amai vossa mulher, como também Cristo amou a igreja'",
    ],
    chave: 21,
  },
  6: {
    resumo:
      "Instruções de casa e de trabalho, e a armadura descrita peça por peça.",
    detalhe:
      "As instruções a filhos, pais, servos e senhores incluem uma observação que era radical na época, lembrando aos senhores que o Senhor deles está nos céus e que não há acepção de pessoas. A armadura é apresentada como defesa e não como conquista, e quase todas as peças são defensivas. E a última instrução é sobre oração, com o pedido pessoal para que ele fale com intrepidez, estando preso.",
    marcos: [
      "'Pais, não provoqueis vossos filhos à ira'",
      "'Senhores, sabendo que o Senhor deles e vosso está nos céus'",
      "'Revesti-vos de toda a armadura de Deus'",
      "'A nossa luta não é contra o sangue e a carne'",
      "'Orai em todo tempo no Espírito'",
    ],
    chave: 12,
  },
};

CAPITULOS.fp = {
  1: {
    resumo:
      "Escrevendo da prisão, ele diz que aquilo acabou servindo para o evangelho avançar.",
    detalhe:
      "A releitura que ele faz do próprio encarceramento é a chave do capítulo, porque ele vê progresso onde qualquer um veria interrupção. Inclusive menciona que alguns pregam por inveja e rivalidade, e conclui que o importante é Cristo ser anunciado de qualquer modo. O dilema pessoal entre partir e ficar é resolvido pela utilidade para os outros, e não pela própria preferência.",
    marcos: [
      "'Aquele que começou boa obra em vós há de completá-la'",
      "'As minhas circunstâncias antes contribuíram para o progresso'",
      "'Contanto que Cristo seja anunciado'",
      "'Para mim, o viver é Cristo e o morrer é lucro'",
      "'Ficar na carne é mais necessário por causa de vós'",
    ],
    chave: 21,
  },
  2: {
    resumo:
      "Um hino antigo sobre esvaziar-se, usado como argumento para resolver uma briga.",
    detalhe:
      "O contexto é uma desavença entre pessoas da igreja, e o remédio proposto é considerar os outros superiores a si mesmo e olhar para o interesse alheio. O hino dos versículos 6 a 11 é provavelmente mais antigo que a carta e descreve uma descida em etapas até a morte de cruz, seguida de exaltação. Depois vêm dois exemplos vivos, Timóteo e Epafrodito, que quase morreu.",
    marcos: [
      "'Nada façais por partidarismo ou vanglória'",
      "'A si mesmo se esvaziou, assumindo a forma de servo'",
      "'Tornando-se obediente até à morte e morte de cruz'",
      "'Deus o exaltou sobremaneira'",
      "'Brilhais como luzeiros no mundo'",
    ],
    chave: 7,
  },
  3: {
    resumo:
      "Ele lista o próprio currículo religioso e diz que passou tudo para a coluna de prejuízo.",
    detalhe:
      "A lista inclui linhagem, tribo, observância e zelo, e era um currículo impecável para os critérios da época. A palavra que ele usa para o que fez com isso é forte e significa refugo. A imagem final é atlética, de quem esquece o que fica para trás e avança para o alvo, e ele faz questão de dizer que ainda não alcançou nem é perfeito, o que é raro para quem escreve como mestre.",
    marcos: [
      "'Circuncidado ao oitavo dia, da linhagem de Israel'",
      "'O que para mim era lucro, isso considerei perda'",
      "'Tudo considero como refugo'",
      "'Não que eu o tenha já recebido ou tenha já obtido a perfeição'",
      "'Esquecendo-me das coisas que para trás ficam'",
    ],
    chave: 13,
  },
  4: {
    resumo:
      "Duas mulheres em desacordo são citadas pelo nome, e ele fala de ter aprendido a viver com pouco.",
    detalhe:
      "A menção a Evódia e Síntique mostra que o problema era conhecido. A instrução sobre ansiedade é prática, trocando preocupação por oração com ações de graças, e a promessa é de uma paz que guarda como sentinela. O segredo que ele diz ter aprendido é de contentamento em qualquer situação, e ele deixa claro que foi aprendizado e não temperamento. E agradece a ajuda financeira recebida.",
    marcos: [
      "'Rogo a Evódia e rogo a Síntique'",
      "'Alegrai-vos sempre no Senhor'",
      "'Não andeis ansiosos de coisa alguma'",
      "'Aprendi a viver contente em toda e qualquer situação'",
      "'Tudo posso naquele que me fortalece'",
    ],
    chave: 6,
  },
};

CAPITULOS.cl = {
  1: {
    resumo:
      "Outro hino antigo, agora sobre a primazia de Cristo em todas as coisas.",
    detalhe:
      "A carta enfrenta um ensino que rebaixava Cristo dentro de uma hierarquia de poderes espirituais, e a resposta é o hino dos versículos 15 a 20, que afirma que tudo foi criado por meio dele e para ele, e que nele tudo subsiste. A oração inicial pede conhecimento da vontade e frutificação em boa obra. E há uma frase difícil e bonita sobre completar o que resta das aflições.",
    marcos: [
      "'Ele é a imagem do Deus invisível'",
      "'Tudo foi criado por meio dele e para ele'",
      "'Tudo subsiste nele'",
      "'Ele é a cabeça do corpo, da igreja'",
      "'Cristo em vós, a esperança da glória'",
    ],
    chave: 17,
  },
  2: {
    resumo:
      "Ele alerta contra quem quer prender por meio de filosofia e regras alimentares.",
    detalhe:
      "O aviso é contra ser enganado com palavras persuasivas e contra filosofias que seguem tradições humanas. A afirmação central é que nele habita corporalmente toda a plenitude, o que torna desnecessário buscar intermediários. A crítica às regras sobre comida, bebida e dias é acompanhada de uma observação lúcida, dizendo que elas têm aparência de sabedoria e nenhum valor contra a sensualidade.",
    marcos: [
      "'Para que ninguém vos engane com raciocínios falazes'",
      "'Cuidado para que ninguém vos venha a enredar com filosofias'",
      "'Nele habita corporalmente toda a plenitude'",
      "'Ninguém vos julgue por causa de comida e bebida'",
      "'Não têm valor algum contra a sensualidade'",
    ],
    chave: 8,
  },
  3: {
    resumo:
      "Duas listas, uma do que se despe e outra do que se veste, com o amor por cima.",
    detalhe:
      "A imagem é de roupa, com verbos de despir e vestir. O que se tira inclui ira, malícia, maledicência e mentira, e o que se põe inclui compaixão, bondade, humildade, mansidão e longanimidade. Sobre todas elas vai o amor, descrito como vínculo da perfeição. E há uma regra ampla no fim, mandando fazer tudo em nome do Senhor Jesus, inclusive o trabalho comum.",
    marcos: [
      "'Buscai as coisas lá do alto'",
      "'Despistes o velho homem e vos revestistes do novo'",
      "'Revesti-vos de ternos afetos de misericórdia'",
      "'Acima de tudo isto, porém, esteja o amor'",
      "'Tudo o que fizerdes, fazei-o de todo o coração'",
    ],
    chave: 14,
  },
  4: {
    resumo:
      "Instruções sobre oração, conversa e sal, e uma lista de nomes com detalhes pessoais.",
    detalhe:
      "A orientação sobre a fala é sobre ser agradável e temperada com sal, com a finalidade de saber responder a cada um. O pedido de oração dele é por uma porta aberta para a palavra, e não por soltura, apesar de estar preso. A lista final tem detalhes humanos, incluindo Lucas chamado de médico amado, Epafras descrito lutando em orações, e uma instrução de troca de cartas entre igrejas.",
    marcos: [
      "'Perseverai na oração, vigiando'",
      "'A vossa palavra seja sempre agradável, temperada com sal'",
      "'Para saberdes como deveis responder a cada um'",
      "'Lucas, o médico amado'",
      "Epafras, batalhando por vós em suas orações",
    ],
    chave: 6,
  },
};

CAPITULOS["1ts"] = {
  1: {
    resumo:
      "Uma carta escrita pouco depois da fundação da igreja, provavelmente a mais antiga dele.",
    detalhe:
      "O agradecimento é articulado em três pares que se tornaram clássicos, com obra da fé, trabalho do amor e firmeza da esperança. Paulo elogia a repercussão, dizendo que não precisou falar nada porque a notícia já tinha se espalhado. E descreve a conversão deles em duas direções, com um verbo de afastar-se dos ídolos e outro de voltar-se para servir ao Deus vivo.",
    marcos: [
      "'A operosidade da vossa fé, o esforço do vosso amor'",
      "'A firmeza da vossa esperança'",
      "'Não temos necessidade de acrescentar coisa alguma'",
      "'Vos convertestes dos ídolos para Deus'",
      "'Para servirdes ao Deus vivo e verdadeiro'",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "Ele lembra como se comportou entre eles, usando imagens de mãe e de pai.",
    detalhe:
      "A defesa é sobre motivação, negando engano, impureza e ganância, e afirmando que não buscou glória de homens. As duas metáforas domésticas são notáveis, porque ele se compara primeiro a uma ama que cuida dos próprios filhos e depois a um pai que exorta. O detalhe sobre trabalhar de noite e de dia para não ser pesado a ninguém aparece aqui.",
    marcos: [
      "'Nunca usamos de palavras lisonjeiras'",
      "'Fomos carinhosos entre vós, qual ama que acalenta os filhos'",
      "'Trabalhando noite e dia para a ninguém sermos pesados'",
      "'Como um pai a seus filhos'",
      "'Vós sois a nossa glória e alegria'",
    ],
    chave: 7,
  },
  3: {
    resumo:
      "Sem aguentar mais a falta de notícias, ele manda Timóteo e depois respira aliviado.",
    detalhe:
      "A expressão sobre não poder suportar mais aparece duas vezes e revela ansiedade pastoral real. A preocupação declarada é que o tentador os tivesse abalado e o trabalho tivesse sido em vão. O alívio quando Timóteo volta é descrito quase fisicamente, com a frase sobre agora viverem se eles estiverem firmes. E a oração final pede abundância de amor uns para com os outros e para com todos.",
    marcos: [
      "'Não podendo suportar mais, enviamos Timóteo'",
      "'Para que ninguém seja abalado por estas tribulações'",
      "'Agora vivemos, se estais firmes no Senhor'",
      "'De noite e de dia, suplicando ver o vosso rosto'",
      "'O Senhor vos faça crescer e aumentar no amor'",
    ],
    chave: 12,
  },
  4: {
    resumo:
      "Instruções sobre trabalho tranquilo e uma resposta sobre os que já morreram.",
    detalhe:
      "A orientação social é discreta e prática, sobre viver tranquilamente, cuidar dos próprios negócios e trabalhar com as mãos, para andar dignamente diante dos de fora. A parte final responde a uma dúvida específica da comunidade sobre o destino de quem já tinha morrido, e o objetivo declarado do trecho não é fornecer cronograma, e sim consolo, com a instrução de usarem aquelas palavras para se confortarem.",
    marcos: [
      "'Esta é a vontade de Deus: a vossa santificação'",
      "'Viver tranquilamente e tratar dos vossos próprios negócios'",
      "'Não quero que sejais ignorantes quanto aos que dormem'",
      "'Para não vos entristecerdes como os que não têm esperança'",
      "'Consolai-vos uns aos outros com estas palavras'",
    ],
    chave: 13,
  },
  5: {
    resumo:
      "Sobre o dia que vem como ladrão, e uma série de instruções curtas no fim.",
    detalhe:
      "O aviso é para não serem surpreendidos, usando a imagem do ladrão de noite e a das dores de parto. As instruções finais são rápidas e vêm em sequência, e incluem coisas difíceis de fazer juntas, como alegrar-se sempre e dar graças em tudo. Há também a orientação sobre não apagar o Espírito e ao mesmo tempo julgar todas as coisas, retendo o que é bom.",
    marcos: [
      "'O Dia do Senhor vem como ladrão de noite'",
      "'Consolai-vos e edificai-vos uns aos outros'",
      "'Regozijai-vos sempre. Orai sem cessar'",
      "'Em tudo dai graças'",
      "'Não extingais o Espírito; julgai todas as coisas'",
    ],
    chave: 16,
  },
};

CAPITULOS["2ts"] = {
  1: {
    resumo:
      "Ele agradece pelo crescimento deles em meio à perseguição que ainda não passou.",
    detalhe:
      "O elogio é sobre fé que cresce sobremaneira e amor que se multiplica, e o contexto é de perseguições e tribulações que eles estavam suportando. A carta trata do alívio prometido e da justiça futura, com linguagem forte sobre retribuição. A oração do fim pede que Deus os torne dignos da vocação e cumpra todo propósito de bondade e obra de fé com poder.",
    marcos: [
      "'A vossa fé cresce sobremaneira'",
      "'Nas perseguições e tribulações que suportais'",
      "'É justo, da parte de Deus, dar tribulação aos que vos atribulam'",
      "'E a vós, que sois atribulados, alívio'",
      "'Para que o nosso Deus vos faça dignos da sua vocação'",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "Alguém andava dizendo em nome dele que o dia já tinha chegado, e ele corrige.",
    detalhe:
      "O problema é de desinformação com aparência de autoridade, porque circulavam mensagens e até cartas como se fossem dele. A instrução é para não se deixarem abalar nem perturbar. O restante do capítulo descreve o que deve acontecer antes, com linguagem apocalíptica densa. E o fecho é pastoral, pedindo que guardem as tradições ensinadas e recebam consolação eterna.",
    marcos: [
      "'Não vos deixeis perturbar por carta como se fosse nossa'",
      "'Ninguém, de nenhum modo, vos engane'",
      "'É necessário que, primeiro, venha a apostasia'",
      "'Guardai as tradições que vos foram ensinadas'",
      "'Vos conforte o coração e vos confirme em toda boa obra'",
    ],
    chave: 15,
  },
  3: {
    resumo:
      "Alguns pararam de trabalhar esperando o fim, e ele manda comer o próprio pão.",
    detalhe:
      "A regra que ele cita é dura e prática, dizendo que quem não quer trabalhar também não coma, e vale notar o verbo querer. Ele usa o próprio exemplo, lembrando que trabalhou de noite e de dia para não pesar a ninguém, embora tivesse direito. A crítica é a quem anda desordenadamente e se intromete na vida alheia, e a instrução final é sobre não tratar essa pessoa como inimiga.",
    marcos: [
      "'Não comemos de graça o pão de ninguém'",
      "'Se alguém não quer trabalhar, também não coma'",
      "'Não trabalham, antes, se intrometem na vida alheia'",
      "'Não vos canseis de fazer o bem'",
      "'Não o considereis por inimigo, mas admoestai-o como irmão'",
    ],
    chave: 10,
  },
};

CAPITULOS["1tm"] = {
  1: {
    resumo:
      "Ele deixa Timóteo para conter ensinos estranhos, e se chama de principal dos pecadores.",
    detalhe:
      "A tarefa é conter quem ensinava doutrina diferente e se ocupava com fábulas e genealogias intermináveis, que produziam discussões em vez de edificação. O alvo declarado da instrução é o amor que procede de coração puro. A parte mais pessoal é o reconhecimento do passado dele como perseguidor, com a observação de que alcançou misericórdia por ter agido por ignorância.",
    marcos: [
      "'Que não ensinem outra doutrina'",
      "'Nem se preocupem com fábulas e genealogias intermináveis'",
      "'O intuito da presente admoestação visa ao amor'",
      "'Cristo Jesus veio salvar os pecadores, dos quais eu sou o principal'",
      "'Milita a boa milícia'",
    ],
    chave: 15,
  },
  2: {
    resumo:
      "Orar pelos governantes é a primeira instrução, com um motivo bem simples.",
    detalhe:
      "A razão dada para orar por reis e autoridades é prática, para que se viva vida tranquila e serena, e vale lembrar que o imperador da época não era amigo. Seguem instruções sobre postura no culto e sobre vestuário, com a preferência declarada por boas obras em lugar de ostentação. O trecho sobre ensino e autoridade é dos mais debatidos do Novo Testamento e pede leitura atenta ao contexto local.",
    marcos: [
      "'Que se façam súplicas por todos os homens'",
      "'Pelos reis e por todos os que se acham investidos de autoridade'",
      "'Para que vivamos vida tranquila e mansa'",
      "'Há um só Deus e um só mediador'",
      "'Adornem-se com boas obras'",
    ],
    chave: 2,
  },
  3: {
    resumo:
      "Os requisitos para liderança são quase todos de caráter e de vida doméstica.",
    detalhe:
      "A lista é reveladora pelo que não pede, porque não fala de carisma nem de resultados. Fala de ser irrepreensível, sóbrio, hospitaleiro, não dado ao vinho, não violento, não avarento e apto para ensinar. Inclui ainda o critério de ter bom testemunho dos de fora. A mesma lógica vale para os diáconos, e o capítulo fecha com um fragmento de hino sobre o mistério da piedade.",
    marcos: [
      "'É necessário que o bispo seja irrepreensível'",
      "'Não dado ao vinho, nem violento, mas cordato'",
      "'Que governe bem a própria casa'",
      "'Tenha bom testemunho dos de fora'",
      "'Grande é o mistério da piedade'",
    ],
    chave: 2,
  },
  4: {
    resumo:
      "Contra quem proíbe casamento e alimentos, e um conselho sobre idade.",
    detalhe:
      "A crítica é a um ascetismo que rejeita coisas criadas por Deus para serem recebidas com ações de graças. A recomendação a Timóteo é de exercitar-se na piedade, usando linguagem de treino físico como comparação. E há a instrução mais citada da carta, para que ninguém despreze a sua pouca idade, com a resposta sendo tornar-se padrão no modo de falar, no procedimento e no amor.",
    marcos: [
      "'Proibindo o casamento e exigindo abstinência de alimentos'",
      "'Tudo o que Deus criou é bom'",
      "'Exercita-te pessoalmente na piedade'",
      "'Ninguém despreze a tua pouca idade'",
      "'Torna-te padrão dos fiéis na palavra e no procedimento'",
    ],
    chave: 12,
  },
  5: {
    resumo:
      "Sobre como tratar pessoas por faixa de idade e sobre o cuidado com viúvas.",
    detalhe:
      "A primeira instrução é sobre linguagem, mandando tratar os mais velhos como pais e os mais jovens como irmãos, com toda a pureza. O bloco sobre viúvas é administrativo e detalhado, porque distingue quem tem família que possa sustentar de quem está realmente desamparada. E há um conselho pessoal e doméstico no meio, sobre usar um pouco de vinho por causa do estômago.",
    marcos: [
      "'Trata as jovens como irmãs, com toda a pureza'",
      "'Honra as viúvas verdadeiramente viúvas'",
      "'Se alguém não tem cuidado dos seus'",
      "'Usa um pouco de vinho, por causa do teu estômago'",
      "'Os pecados de alguns homens são notórios'",
    ],
    chave: 8,
  },
  6: {
    resumo:
      "Sobre dinheiro, com uma frase muito citada e frequentemente citada errado.",
    detalhe:
      "A crítica inicial é a quem usa a religião como fonte de lucro. A frase do versículo 10 não diz que o dinheiro é a raiz de todos os males, e sim o amor ao dinheiro, o que muda tudo. O contentamento é apresentado como grande fonte de lucro quando unido à piedade. E a instrução aos ricos não manda largar tudo, e sim não confiar na incerteza das riquezas e ser generoso.",
    marcos: [
      "'A piedade com contentamento é grande fonte de lucro'",
      "'Nada trouxemos para o mundo, nem coisa alguma podemos levar'",
      "'O amor ao dinheiro é raiz de todos os males'",
      "'Foge destas coisas e segue a justiça'",
      "'Manda aos ricos que não sejam orgulhosos'",
    ],
    chave: 10,
  },
};

CAPITULOS["2tm"] = {
  1: {
    resumo:
      "Escrevendo perto do fim, ele lembra a fé que veio pela avó e pela mãe.",
    detalhe:
      "A menção a Loide e Eunice é um dos detalhes mais afetuosos das cartas, mostrando transmissão doméstica de fé por duas gerações de mulheres. A exortação é para reavivar o dom, com a imagem de atiçar brasas. O versículo sobre o espírito que não é de covardia e sim de poder, amor e moderação é a resposta ao medo. E ele registra tanto quem o abandonou quanto quem o procurou com diligência.",
    marcos: [
      "'A fé que habitou em tua avó Loide e em tua mãe Eunice'",
      "'Reavives o dom de Deus que há em ti'",
      "'Deus não nos tem dado espírito de covardia'",
      "'Mas de poder, de amor e de moderação'",
      "Onesíforo o procurou solicitamente e o achou",
    ],
    chave: 7,
  },
  2: {
    resumo:
      "Três imagens de disciplina, o soldado, o atleta e o lavrador, e uma casa com vasos variados.",
    detalhe:
      "As comparações são todas sobre esforço com regra, e o lavrador é lembrado como quem deve ser o primeiro a participar dos frutos. A instrução sobre transmitir a homens fiéis e idôneos para instruir outros descreve uma cadeia de quatro gerações. A parte final alerta contra contendas de palavras que não trazem proveito, e a imagem da casa grande com vasos de usos diferentes fala de utilidade.",
    marcos: [
      "'O que de mim ouviste, isso mesmo transmite a homens fiéis'",
      "'Nenhum soldado se envolve em negócios da vida civil'",
      "'Procura apresentar-te a Deus aprovado'",
      "'Evita, igualmente, as paixões da mocidade'",
      "'O servo do Senhor não deve viver a contender'",
    ],
    chave: 2,
  },
  3: {
    resumo:
      "Uma descrição sombria dos últimos tempos, e a lembrança das Escrituras da infância.",
    detalhe:
      "A lista de características é longa e curiosamente toda relacional, começando com amor de si mesmo e amor ao dinheiro, e terminando com gente que tem forma de piedade e nega o poder dela. O contraste é com a formação recebida desde a infância. O versículo 16 descreve a utilidade da Escritura em quatro verbos, ensinar, repreender, corrigir e educar na justiça.",
    marcos: [
      "'Nos últimos dias surgirão tempos difíceis'",
      "'Tendo forma de piedade, negam-lhe, entretanto, o poder'",
      "'Desde a infância, sabes as sagradas letras'",
      "'Toda a Escritura é inspirada por Deus'",
      "'A fim de que o homem de Deus seja perfeito'",
    ],
    chave: 16,
  },
  4: {
    resumo:
      "As últimas linhas, com um balanço de vida e um pedido para trazerem a capa.",
    detalhe:
      "O encargo é urgente, pregar a palavra a tempo e fora de tempo. A previsão é de gente que não suportará a sã doutrina e juntará mestres conforme os próprios desejos. O balanço pessoal é sereno, com a corrida terminada e a fé guardada. E o que torna o capítulo comovente são os detalhes miúdos: ele pede a capa que ficou em Trôade, os livros e sobretudo os pergaminhos, e registra que ficou sozinho na primeira defesa.",
    marcos: [
      "'Prega a palavra, insta a tempo e fora de tempo'",
      "'Não suportarão a sã doutrina'",
      "'Combati o bom combate, completei a carreira'",
      "'Traze a capa que deixei em Trôade, e os livros'",
      "'Ninguém foi a meu favor na minha primeira defesa'",
    ],
    chave: 7,
  },
};

CAPITULOS.tt = {
  1: {
    resumo:
      "Ele deixa Tito em Creta para organizar o que faltava e nomear presbíteros.",
    detalhe:
      "A missão é descrita com dois verbos, pôr em ordem e constituir, o que é trabalho de estrutura. A lista de requisitos repete a de Timóteo, com ênfase em vida familiar e em capacidade de ensinar e refutar. O detalhe mais comentado é a citação de um poeta cretense sobre os próprios conterrâneos, usada como argumento, e a frase final sobre negarem a Deus com as obras.",
    marcos: [
      "'Ponhas em ordem as coisas restantes'",
      "'Constituas presbíteros em cada cidade'",
      "'Apegado à palavra fiel, para exortar e convencer'",
      "A citação de um profeta dos próprios cretenses",
      "'Professam conhecer a Deus, mas o negam por suas obras'",
    ],
    chave: 5,
  },
  2: {
    resumo:
      "Instruções por faixa etária, com as mulheres mais velhas ensinando as mais novas.",
    detalhe:
      "O capítulo organiza o ensino por grupos e a mecânica de transmissão é interna, com as idosas instruindo as jovens no que é bom. Há orientação específica aos escravos, com a observação de que o objetivo é adornar a doutrina. O fecho é doutrinário e prático ao mesmo tempo, dizendo que a graça educa para renunciar à impiedade e viver com sobriedade no presente século.",
    marcos: [
      "Instruções aos idosos, às idosas, às jovens e aos jovens",
      "'Que as idosas sejam mestras do bem'",
      "'Em ti mesmo dá exemplo de boas obras'",
      "'Para que adornem em todas as coisas a doutrina'",
      "'A graça nos educa para que vivamos neste mundo'",
    ],
    chave: 11,
  },
  3: {
    resumo:
      "Lembrar como éramos antes é o argumento para tratar bem quem ainda está lá.",
    detalhe:
      "A instrução é para não difamar ninguém e ser cordato para com todos, e a justificativa é autobiográfica no plural, lembrando que também nós fomos insensatos e desobedientes. A salvação é atribuída à misericórdia e não a obras de justiça. E a orientação final é prática sobre evitar discussões inúteis, com o conselho de evitar a pessoa divisiva depois de uma primeira e segunda admoestação.",
    marcos: [
      "'Que a ninguém difamem'",
      "'Porque também nós, outrora, éramos insensatos'",
      "'Não por obras de justiça praticadas por nós'",
      "'Evita questões insensatas e genealogias'",
      "'Aprendam a aplicar-se às boas obras'",
    ],
    chave: 5,
  },
};

CAPITULOS.fm = {
  1: {
    resumo:
      "Uma carta pessoal de vinte e cinco versículos sobre um escravo fugido.",
    detalhe:
      "Paulo não dá ordem, e diz isso explicitamente, preferindo apelar por amor, apesar de reconhecer que teria autoridade. O trocadilho com o nome Onésimo, que significa útil, é intencional. O pedido é para recebê-lo não mais como escravo e sim como irmão amado, e Paulo se oferece para pagar qualquer prejuízo de próprio punho, lembrando de passagem que Filemom lhe deve a própria vida.",
    marcos: [
      "'Prefiro fazer-te um apelo, baseado no amor'",
      "Onésimo, que já te foi inútil e agora é útil",
      "'Recebe-o como se fora eu mesmo'",
      "'Não mais como escravo, antes como irmão amado'",
      "'Eu, Paulo, de próprio punho, o pagarei'",
    ],
    chave: 16,
  },
};

CAPITULOS.hb = {
  1: {
    resumo:
      "Sem saudação e sem nome de autor, o texto começa comparando dois modos de Deus falar.",
    detalhe:
      "A carta não se apresenta como carta e o autor é desconhecido, o que a tradição sempre registrou. A abertura contrapõe muitas vezes e muitas maneiras no passado a uma palavra final no Filho. O restante do capítulo é uma cadeia de citações do Antigo Testamento para mostrar superioridade em relação aos anjos, e o método de argumentar por acúmulo de textos atravessa o livro inteiro.",
    marcos: [
      "'Havendo Deus falado, outrora, muitas vezes'",
      "'Nestes últimos dias, nos falou pelo Filho'",
      "'Resplendor da glória e expressão exata do seu Ser'",
      "'Sustentando todas as coisas pela palavra do seu poder'",
      "'Não são todos eles espíritos ministradores?'",
    ],
    chave: 3,
  },
  2: {
    resumo:
      "O argumento faz uma pausa para um aviso, e depois fala de alguém que não se envergonha.",
    detalhe:
      "A carta alterna exposição e advertência, e aqui vem o primeiro alerta, sobre a negligência ser o perigo, e não a rejeição explícita. A parte mais tocante é a afirmação de que ele não se envergonha de chamá-los irmãos, e que participou da mesma carne e sangue. E há a frase sobre ele poder socorrer os que são tentados justamente por ter sofrido sendo tentado.",
    marcos: [
      "'Como escaparemos nós, se negligenciarmos tão grande salvação?'",
      "'Não se envergonha de lhes chamar irmãos'",
      "'Também ele, igualmente, participou das mesmas coisas'",
      "'Para libertar todos os que, pelo pavor da morte'",
      "'É poderoso para socorrer os que são tentados'",
    ],
    chave: 18,
  },
  3: {
    resumo:
      "Comparado a Moisés, com a diferença entre quem serve na casa e quem a construiu.",
    detalhe:
      "O argumento é de proporção, porque Moisés foi fiel como servo na casa e este é fiel como Filho sobre ela. A segunda metade cita o Salmo 95 e o transforma em advertência, com a palavra hoje repetida. A instrução prática que se tira dali é comunitária, pedindo que se exortem mutuamente cada dia, enquanto se diz hoje, para que ninguém se endureça pelo engano do pecado.",
    marcos: [
      "'Moisés foi fiel como servo; Cristo, como Filho'",
      "'Hoje, se ouvirdes a sua voz'",
      "'Não endureçais o coração'",
      "'Exortai-vos mutuamente cada dia'",
      "'Enquanto se diz: hoje'",
    ],
    chave: 13,
  },
  4: {
    resumo:
      "Sobre um descanso que continua disponível, e a palavra descrita como espada.",
    detalhe:
      "O argumento usa o descanso do sétimo dia e a entrada na terra para falar de algo ainda pendente. A imagem do versículo 12 é cirúrgica, com a palavra penetrando até a divisão de alma e espírito e discernindo pensamentos e intenções. E o fecho é o mais consolador, apresentando um sumo sacerdote que pode compadecer-se das fraquezas e o convite para chegar com confiança ao trono da graça.",
    marcos: [
      "'Resta um repouso para o povo de Deus'",
      "'A palavra de Deus é viva e eficaz'",
      "'Mais cortante do que qualquer espada de dois gumes'",
      "'Não temos sumo sacerdote incapaz de compadecer-se'",
      "'Acheguemo-nos, portanto, confiadamente, junto ao trono da graça'",
    ],
    chave: 16,
  },
  5: {
    resumo:
      "O sumo sacerdote é tirado dentre os homens, e há uma repreensão sobre imaturidade.",
    detalhe:
      "A qualificação descrita é a capacidade de ser condescendente com ignorantes e desviados, justamente porque ele mesmo está rodeado de fraqueza. O detalhe mais humano do livro está no versículo 7, sobre orações com forte clamor e lágrimas. A repreensão final é sobre eles já deverem ser mestres e ainda precisarem de leite, com a observação de que o alimento sólido é para quem exercitou os sentidos.",
    marcos: [
      "'Pode condoer-se dos ignorantes e dos que erram'",
      "'Ofereceu orações com forte clamor e lágrimas'",
      "'Aprendeu a obediência pelas coisas que sofreu'",
      "'Devendo ser mestres, precisais de quem vos ensine'",
      "'O alimento sólido é para os adultos'",
    ],
    chave: 8,
  },
  6: {
    resumo:
      "Um dos avisos mais duros do Novo Testamento, seguido de uma âncora.",
    detalhe:
      "A ordem é deixar os rudimentos e avançar para a maturidade, em vez de ficar repetindo o básico. O trecho sobre impossibilidade de restaurar é objeto de debate há séculos e pede leitura com cuidado e humildade. Logo depois o tom muda, com a afirmação de que Deus não é injusto para esquecer o trabalho deles, e a imagem da esperança como âncora firme e segura da alma.",
    marcos: [
      "'Deixando os rudimentos, aspiremos ao que é perfeito'",
      "'Deus não é injusto para se esquecer da vossa obra'",
      "'Para que não vos torneis indolentes'",
      "'Duas coisas imutáveis, nas quais é impossível que Deus minta'",
      "'A qual temos por âncora da alma, segura e firme'",
    ],
    chave: 19,
  },
  7: {
    resumo:
      "O capítulo desenvolve a figura de Melquisedeque a partir de poucos versículos do Gênesis.",
    detalhe:
      "O argumento é curioso porque se apoia também no silêncio do texto antigo, já que não há genealogia nem registro de morte daquele personagem. Abraão dando o dízimo a ele é usado para argumentar sobre ordens sacerdotais. A conclusão prática é que existe um sacerdócio permanente, que não passa de um para outro por morte, e por isso pode salvar totalmente quem por ele se chega a Deus.",
    marcos: [
      "Melquisedeque, rei de justiça e rei de paz",
      "Abraão lhe deu o dízimo de tudo",
      "'Feito não conforme a lei de mandamento carnal'",
      "'Ele permanece para sempre'",
      "'Vive sempre para interceder por eles'",
    ],
    chave: 25,
  },
  8: {
    resumo:
      "O ponto principal é dito em voz alta, e a nova aliança é citada por inteiro.",
    detalhe:
      "O autor faz um resumo declarado, dizendo que o essencial é ter tal sumo sacerdote. A ideia de que o santuário terreno era sombra e figura aparece com a citação da ordem dada a Moisés para fazer tudo conforme o modelo mostrado no monte. E então ele cita a passagem mais longa do Antigo Testamento em todo o Novo Testamento, que é o trecho de Jeremias 31 sobre a lei escrita no coração.",
    marcos: [
      "'O ponto principal é este: temos tal sumo sacerdote'",
      "'Servem de sombra e figura das realidades celestiais'",
      "'Faze tudo conforme o modelo que te foi mostrado'",
      "A citação de Jeremias sobre a nova aliança",
      "'De maneira nenhuma me lembrarei dos seus pecados'",
    ],
    chave: 1,
  },
  9: {
    resumo:
      "A descrição do tabernáculo serve de argumento sobre acesso limitado e definitivo.",
    detalhe:
      "O autor descreve o mobiliário e comenta que não é hora de entrar em detalhes, porque o que importa é a estrutura de acesso. O detalhe central é que só o sumo sacerdote entrava, uma vez por ano, e com sangue. A comparação é com uma entrada única e definitiva. E o capítulo contém uma das frases mais citadas sobre mortalidade, ligando morrer uma vez e o juízo depois.",
    marcos: [
      "O primeiro tabernáculo e a arca descritos",
      "'Só o sumo sacerdote, uma vez por ano'",
      "'Sem derramamento de sangue não há remissão'",
      "'Aos homens está ordenado morrerem uma só vez'",
      "'Vindo depois disto o juízo'",
    ],
    chave: 27,
  },
  10: {
    resumo:
      "Sacrifícios repetidos não resolvem, e a conclusão prática é sobre não faltar às reuniões.",
    detalhe:
      "O argumento é de repetição, porque aquilo que precisa ser refeito todo ano não aperfeiçoa. A aplicação começa no versículo 19 com três convites, cheguemos, conservemos e consideremos. O terceiro é sobre estimular-se mutuamente ao amor e às boas obras, e vem acompanhado da instrução de não abandonar a congregação, com o detalhe de que alguns já tinham esse costume.",
    marcos: [
      "'A lei tem sombra dos bens vindouros'",
      "'Cheguemo-nos com sincero coração'",
      "'Guardemos firme a confissão da esperança'",
      "'Não deixemos de congregar-nos, como é costume de alguns'",
      "'Considere-nos uns aos outros para nos estimularmos ao amor'",
    ],
    chave: 24,
  },
  11: {
    resumo:
      "Uma galeria de pessoas que morreram sem ver a promessa e mesmo assim continuaram.",
    detalhe:
      "A definição de fé no primeiro versículo é sobre certeza e convicção do que não se vê. A lista é longa e inclui gente improvável, como Raabe. Duas observações mudam o tom da leitura: várias delas morreram sem receber o prometido, e a segunda metade do capítulo lista sofrimentos sem livramento, com pessoas serradas, apedrejadas e errantes por desertos, chamadas de gente de quem o mundo não era digno.",
    marcos: [
      "'Ora, a fé é a certeza de coisas que se esperam'",
      "'Sem fé é impossível agradar a Deus'",
      "'Todos esses morreram na fé, sem ter obtido as promessas'",
      "'Homens de quem o mundo não era digno'",
      "'Não obtiveram, contudo, a concretização da promessa'",
    ],
    chave: 1,
  },
  12: {
    resumo:
      "A corrida, o peso que se larga, e a disciplina lida como sinal de filiação.",
    detalhe:
      "A imagem é de estádio com arquibancada cheia de testemunhas. A instrução é largar todo peso e o pecado que facilmente envolve, olhando firmemente para o autor e consumador da fé. A seção sobre disciplina é honesta ao admitir que nenhuma correção parece agradável no momento, e que o fruto vem depois. E o fecho pede que busquem a paz com todos e cuidem da raiz de amargura.",
    marcos: [
      "'Tão grande nuvem de testemunhas'",
      "'Corramos, com perseverança, a carreira que nos está proposta'",
      "'Olhando firmemente para Jesus'",
      "'Nenhuma disciplina parece, no momento, ser motivo de alegria'",
      "'Segui a paz com todos e a santificação'",
    ],
    chave: 2,
  },
  13: {
    resumo:
      "Instruções finais bem práticas, incluindo hospitalidade e presos.",
    detalhe:
      "A lista começa com amor fraternal e hospitalidade, com a observação sobre anjos hospedados sem que se soubesse. A instrução sobre lembrar dos presos tem um detalhe de empatia física, pedindo que se lembrem como se estivessem presos com eles. Há a frase sobre ele ser o mesmo ontem, hoje e para sempre, e o pedido final é simples, para que orem por ele.",
    marcos: [
      "'Não vos esqueçais da hospitalidade'",
      "'Sem o saber, alguns acolheram anjos'",
      "'Lembrai-vos dos encarcerados, como se presos com eles'",
      "'Jesus Cristo é o mesmo, ontem, hoje e eternamente'",
      "'Orai por nós'",
    ],
    chave: 8,
  },
};

CAPITULOS.tg = {
  1: {
    resumo:
      "Ele manda considerar alegria as provações, e explica o mecanismo antes de qualquer conselho.",
    detalhe:
      "A instrução é sobre como enquadrar a dificuldade, e não sobre gostar dela, porque a prova produz perseverança. A promessa sobre pedir sabedoria vem com uma observação sobre Deus dar generosamente e sem censura. A imagem do espelho é a mais visual da carta, descrevendo quem olha, sai e esquece como era. E a definição de religião pura é social, com órfãos, viúvas e autocontrole.",
    marcos: [
      "'Tende por motivo de toda alegria o passardes por várias provações'",
      "'Se algum de vós tem falta de sabedoria, peça-a a Deus'",
      "'Todo homem seja pronto para ouvir, tardio para falar'",
      "'Tornai-vos praticantes da palavra e não somente ouvintes'",
      "'A religião pura é visitar os órfãos e as viúvas'",
    ],
    chave: 22,
  },
  2: {
    resumo:
      "Um exemplo concreto sobre quem ganha o melhor lugar quando entra na reunião.",
    detalhe:
      "A cena descrita é de alguém com anel de ouro e roupa fina recebendo assento e um pobre mandado ficar em pé. A crítica é direta e chama isso de fazer distinção. A segunda metade trata de fé e obras, com o exemplo prático de dizer ide em paz a quem precisa de roupa e comida sem dar nada. A tensão com Paulo é aparente, porque os dois usam a palavra obras em sentidos diferentes.",
    marcos: [
      "Um com anel de ouro e outro com roupa andrajosa",
      "'Não vos tornastes juízes possuídos de maus pensamentos?'",
      "'Se cumprirdes a lei régia: amarás o teu próximo'",
      "'Ide em paz, aquecei-vos e fartai-vos'",
      "'A fé sem obras é morta'",
    ],
    chave: 17,
  },
  3: {
    resumo:
      "Um capítulo inteiro sobre a língua, com quatro imagens de coisas pequenas.",
    detalhe:
      "As comparações são o freio do cavalo, o leme do navio, a fagulha que incendeia a floresta e a fonte que não pode dar água doce e amarga. O aviso inicial é para que poucos se tornem mestres, por causa do juízo mais severo. A parte final distingue duas sabedorias, uma terrena, marcada por inveja e sentimento faccioso, e outra do alto, que é pacífica, indulgente e tratável.",
    marcos: [
      "'Meus irmãos, não vos torneis, muitos de vós, mestres'",
      "O freio na boca do cavalo e o leme do navio",
      "'Que grande floresta um pequeno fogo incendeia!'",
      "'Da mesma boca procede bênção e maldição'",
      "'A sabedoria lá do alto é, primeiramente, pura'",
    ],
    chave: 17,
  },
  4: {
    resumo:
      "De onde vêm as guerras, e uma advertência sobre planejar sem contar com o amanhã.",
    detalhe:
      "A resposta que ele dá para a origem dos conflitos é interna, localizando nos prazeres que guerreiam dentro de cada um. A observação sobre pedir e não receber por pedir mal é incômoda e útil. A segunda parte é sobre planejamento, e a crítica não é ao plano e sim à presunção de controle, com a instrução de dizer se o Senhor quiser. E há uma definição curta de pecado por omissão.",
    marcos: [
      "'De onde procedem guerras e contendas?'",
      "'Pedis e não recebeis, porque pedis mal'",
      "'Chegai-vos a Deus, e ele se chegará a vós'",
      "'Hoje ou amanhã, iremos para tal cidade'",
      "'Aquele que sabe que deve fazer o bem e não o faz'",
    ],
    chave: 14,
  },
  5: {
    resumo:
      "Um ataque aos ricos que retêm salários, e instruções sobre paciência e oração.",
    detalhe:
      "A denúncia é específica e trabalhista, sobre o salário retido dos ceifeiros clamando. A imagem da paciência é agrícola, com o lavrador que espera as chuvas. A instrução sobre juramentos pede que o sim seja sim. E o fim é prático sobre oração, com orientação para o doente, o sofredor e o alegre, e a observação sobre Elias ser homem semelhante a nós, o que aproxima o exemplo.",
    marcos: [
      "'O salário dos trabalhadores clama'",
      "'Sede pacientes como o lavrador que aguarda a chuva'",
      "'Seja o vosso sim, sim, e o vosso não, não'",
      "'Confessai, pois, os vossos pecados uns aos outros'",
      "'Elias era homem semelhante a nós'",
    ],
    chave: 16,
  },
};

CAPITULOS["1pe"] = {
  1: {
    resumo:
      "Escrita a gente dispersa, a carta chama o sofrimento de provação que refina.",
    detalhe:
      "Os destinatários são chamados de peregrinos da dispersão, o que define o tom de toda a carta. A herança é descrita com três adjetivos sobre não se corromper, não se contaminar e não se desvanecer. A comparação do refino do ouro é usada para a fé. E o capítulo tem uma observação curiosa sobre profetas que investigaram o que anunciaram sem entender o tempo, e sobre anjos que desejam ver essas coisas.",
    marcos: [
      "'Aos eleitos que são forasteiros da dispersão'",
      "'Uma herança incorruptível, incontaminável e imarcescível'",
      "'A fim de que a prova da vossa fé, mais preciosa do que o ouro'",
      "'A quem, não havendo visto, amais'",
      "'Sede santos, porque eu sou santo'",
    ],
    chave: 7,
  },
  2: {
    resumo:
      "Pedras vivas formando uma casa, e instruções sobre viver bem diante de quem observa.",
    detalhe:
      "A imagem é de construção com pedras que são pessoas, e o sacerdócio é descrito como algo de todos. A orientação sobre conduta é estratégica, pedindo procedimento exemplar entre os gentios para que, no que falam contra, vejam as boas obras. A segunda metade trata de sujeição em contextos difíceis, incluindo servos com senhores injustos, e apresenta o exemplo de quem, ultrajado, não revidava.",
    marcos: [
      "'Também vós mesmos, como pedras vivas'",
      "'Vós, porém, sois raça eleita, sacerdócio real'",
      "'Mantendo exemplar o vosso procedimento'",
      "'Quando ultrajado, não revidava com ultraje'",
      "'Pelas suas chagas, fostes sarados'",
    ],
    chave: 9,
  },
  3: {
    resumo:
      "Sobre casamento e sobre estar sempre pronto para explicar a própria esperança.",
    detalhe:
      "A instrução às esposas inclui a possibilidade de ganhar o marido sem palavra, pela conduta, e a ênfase no adorno do coração. A instrução aos maridos é curta e séria, mandando tratá-las com honra e avisando que as orações podem ser prejudicadas. O versículo 15 é o mais citado da carta e ele especifica o modo, com mansidão e temor, o que é tão importante quanto o conteúdo.",
    marcos: [
      "'O adorno seja o do íntimo do coração'",
      "'Vós, maridos, vivei a vida comum do lar com discernimento'",
      "'Estai sempre preparados para responder'",
      "'A todo aquele que vos pedir razão da esperança'",
      "'Fazendo-o, todavia, com mansidão e temor'",
    ],
    chave: 15,
  },
  4: {
    resumo:
      "Sobre sofrer sem ser por culpa própria, e sobre hospedar sem reclamar.",
    detalhe:
      "A instrução é para não estranhar o fogo ardente que vem para provar, como se fosse coisa estranha. A distinção que ele faz importa: sofrer como cristão é uma coisa, sofrer como malfeitor ou intrometido em negócios alheios é outra. E há uma nota doméstica e engraçada sobre exercer hospitalidade sem murmuração, o que revela que hospedar gente cansa em qualquer época.",
    marcos: [
      "'O amor cobre multidão de pecados'",
      "'Sede, mutuamente, hospitaleiros, sem murmuração'",
      "'Não estranheis o fogo ardente'",
      "'Se sofre como cristão, não se envergonhe'",
      "'Ninguém sofra como homem intruso em negócios alheios'",
    ],
    chave: 9,
  },
  5: {
    resumo:
      "Aos presbíteros, ele pede que pastoreiem de boa vontade e sem dominação.",
    detalhe:
      "Ele se apresenta como presbítero também, o que suaviza o tom. As instruções são sobre motivação, pedindo que não seja por constrangimento nem por sórdida ganância, e sobre método, dizendo que não se domine sobre os que foram confiados. A imagem do adversário como leão que ruge vem acompanhada da instrução de resistir firmes. E o convite a lançar toda ansiedade sobre ele tem uma razão afetiva declarada.",
    marcos: [
      "'Pastoreai o rebanho de Deus que há entre vós'",
      "'Nem como dominadores dos que vos foram confiados'",
      "'Deus resiste aos soberbos, mas concede graça aos humildes'",
      "'Lançando sobre ele toda a vossa ansiedade'",
      "'O diabo, vosso adversário, anda em derredor como leão que ruge'",
    ],
    chave: 7,
  },
};

CAPITULOS["2pe"] = {
  1: {
    resumo:
      "Uma escada de qualidades a acrescentar, e o testemunho de quem esteve no monte.",
    detalhe:
      "A sequência começa na fé e vai acrescentando virtude, conhecimento, domínio próprio, perseverança, piedade, fraternidade e amor, e a observação é que quem não tem isso é míope. A segunda metade é autobiográfica, com ele afirmando que não seguiram fábulas engenhosas e que ouviram a voz no monte santo. E há uma afirmação importante sobre a profecia não ter vindo por vontade humana.",
    marcos: [
      "'Empregai todo esforço para acrescentar à vossa fé'",
      "'Aquele em quem não existem estas coisas é cego'",
      "'Não seguimos fábulas engenhosamente inventadas'",
      "'Ouvimos esta voz vinda do céu, estando com ele no monte santo'",
      "'Nenhuma profecia jamais foi dada por vontade humana'",
    ],
    chave: 21,
  },
  2: {
    resumo:
      "Uma denúncia dura contra falsos mestres, com imagens de fontes secas e nuvens.",
    detalhe:
      "O alerta é sobre gente que introduz ensinos destrutivos disfarçadamente e explora por avareza com palavras fingidas. As imagens são de vazio, com fontes sem água e nuvens levadas pela tempestade, prometendo liberdade e sendo escravas da corrupção. O capítulo usa exemplos do Antigo Testamento e termina com dois provérbios crus sobre o cão e a porca.",
    marcos: [
      "'Introduzirão, dissimuladamente, heresias destruidoras'",
      "'Por avareza, farão comércio de vós'",
      "'São fontes sem água, névoas impelidas por temporal'",
      "'Prometendo-lhes liberdade, quando eles mesmos são escravos'",
      "'O cão voltou ao seu próprio vômito'",
    ],
    chave: 19,
  },
  3: {
    resumo:
      "Respondendo a quem zomba da demora, ele fala de tempo em outra escala.",
    detalhe:
      "A zombaria citada é sobre tudo continuar como desde o princípio. A resposta tem duas partes: uma sobre a percepção do tempo, com mil anos como um dia, e outra sobre o motivo da demora, que é paciência e não lentidão, porque ele não quer que alguém pereça. E há uma observação simpática sobre as cartas de Paulo conterem pontos difíceis de entender.",
    marcos: [
      "'Onde está a promessa da sua vinda?'",
      "'Para o Senhor, um dia é como mil anos'",
      "'Não retarda o Senhor a sua promessa'",
      "'Não querendo que nenhum pereça'",
      "'Nas quais há certas coisas difíceis de entender'",
    ],
    chave: 9,
  },
};

CAPITULOS["1jo"] = {
  1: {
    resumo:
      "Ele começa apelando para os sentidos, dizendo que ouviu, viu e tocou.",
    detalhe:
      "A abertura acumula verbos de percepção de propósito, provavelmente respondendo a quem negava a realidade física da encarnação. A imagem central é de luz e trevas, e o teste proposto é de coerência entre o que se diz e como se anda. A honestidade do capítulo é notável, porque ele inclui a possibilidade de o crente pecar e trata a confissão como caminho, e não como fracasso.",
    marcos: [
      "'O que ouvimos, o que vimos, o que as nossas mãos apalparam'",
      "'Deus é luz, e não há nele treva nenhuma'",
      "'Se andarmos na luz, temos comunhão uns com os outros'",
      "'Se dissermos que não temos pecado nenhum, a nós mesmos nos enganamos'",
      "'Se confessarmos os nossos pecados, ele é fiel e justo'",
    ],
    chave: 9,
  },
  2: {
    resumo:
      "Testes práticos de autenticidade, com o mais concreto sendo como se trata o irmão.",
    detalhe:
      "Ele escreve para que não pequem e imediatamente diz o que fazer se pecarem, o que evita tanto o laxismo quanto o desespero. O critério do conhecimento é a obediência, e o critério da luz é o amor ao irmão, com a observação de que quem odeia anda nas trevas e não sabe para onde vai. A segunda metade fala do mundo e das três formas de desejo, e alerta sobre os que saíram do meio deles.",
    marcos: [
      "'Se alguém pecar, temos Advogado junto ao Pai'",
      "'Aquele que diz que conhece a Deus e não guarda os mandamentos'",
      "'Aquele que odeia a seu irmão está nas trevas'",
      "'Não ameis o mundo nem as coisas que há no mundo'",
      "'Eles saíram de nosso meio'",
    ],
    chave: 15,
  },
  3: {
    resumo:
      "Somos chamados filhos, e a instrução sobre amor é para não amar de palavra.",
    detalhe:
      "A exclamação do primeiro versículo é sobre a qualidade do amor recebido, e vem com a observação de que ainda não se manifestou o que havemos de ser. O critério de amor é ilustrado com um caso concreto, sobre quem tem recursos e vê o irmão necessitado e fecha o coração. A frase do versículo 18 resume o argumento inteiro da carta, contrapondo palavra e língua a obra e verdade.",
    marcos: [
      "'Vede que grande amor nos tem concedido o Pai'",
      "'Ainda não se manifestou o que havemos de ser'",
      "'Nisto conhecemos o amor: ele deu a sua vida por nós'",
      "'Aquele que possuir recursos deste mundo e vir o seu irmão padecer'",
      "'Não amemos de palavra, nem de língua, mas de fato e de verdade'",
    ],
    chave: 18,
  },
  4: {
    resumo:
      "Provar os espíritos, e a afirmação mais direta possível sobre quem Deus é.",
    detalhe:
      "A instrução de provar tem um critério cristológico. O capítulo diz duas vezes que Deus é amor, e a lógica que segue é de origem, porque o amor procede dele e quem ama nasceu dele. O argumento final é de coerência, dizendo que quem não ama o irmão a quem vê não pode amar a Deus a quem não vê. E há a afirmação de que o perfeito amor lança fora o medo.",
    marcos: [
      "'Não deis crédito a qualquer espírito'",
      "'Deus é amor'",
      "'Nisto consiste o amor: não em que nós tenhamos amado a Deus'",
      "'No amor não existe medo'",
      "'Quem não ama seu irmão, a quem vê, não pode amar a Deus'",
    ],
    chave: 8,
  },
  5: {
    resumo:
      "A fé que vence o mundo, e a afirmação de que os mandamentos não são pesados.",
    detalhe:
      "A observação sobre os mandamentos não serem pesados aparece no contexto de amor, e não de esforço. A carta trata de certeza, com a expressão sabemos repetida várias vezes no fim. O propósito declarado do livro é dito perto do encerramento, dizendo que escreveu para que soubessem que têm a vida eterna. E há uma orientação sobre confiança na oração ligada a pedir segundo a vontade.",
    marcos: [
      "'Os seus mandamentos não são penosos'",
      "'Esta é a vitória que vence o mundo: a nossa fé'",
      "'Estas coisas vos escrevi para que saibais que tendes a vida eterna'",
      "'Se pedirmos alguma coisa segundo a sua vontade, ele nos ouve'",
      "'Filhinhos, guardai-vos dos ídolos'",
    ],
    chave: 13,
  },
};

CAPITULOS["2jo"] = {
  1: {
    resumo:
      "Treze versículos para uma senhora e seus filhos, sobre andar na verdade e no amor.",
    detalhe:
      "A carta é curta e mantém as duas ênfases do autor lado a lado, porque amor sem verdade e verdade sem amor não funcionam para ele. A alegria dele é ter achado alguns dos filhos dela andando na verdade. O alerta é sobre enganadores que não confessam a vinda em carne, e a orientação sobre não receber em casa precisa ser lida no contexto de hospedagem de mestres itinerantes.",
    marcos: [
      "'Amo-vos na verdade'",
      "'Alegrei-me muito por ter achado dos teus filhos'",
      "'Este é o amor: que andemos segundo os seus mandamentos'",
      "'Muitos enganadores têm saído pelo mundo fora'",
      "'Não desejei fazê-lo com papel e tinta'",
    ],
    chave: 6,
  },
};

CAPITULOS["3jo"] = {
  1: {
    resumo:
      "Uma carta com três personagens, um bom anfitrião, um mandão e um bem falado.",
    detalhe:
      "Gaio é elogiado por hospedar irmãos e até desconhecidos, o que era essencial para a missão itinerante. Diótrefes é descrito com franqueza rara, como alguém que gosta de ter o primeiro lugar, não recebe os irmãos e ainda expulsa quem quer recebê-los. Demétrio recebe boa referência. O conselho geral é curto e prático, mandando não imitar o mal e sim o bem.",
    marcos: [
      "'Não tenho maior alegria do que esta: a de ouvir que meus filhos andam na verdade'",
      "'Procedes fielmente no que fazes aos irmãos, mesmo forasteiros'",
      "'Diótrefes, que gosta de exercer a primazia'",
      "'Não imites o que é mau, e sim o que é bom'",
      "'Demétrio tem bom testemunho de todos'",
    ],
    chave: 4,
  },
};

CAPITULOS.jd = {
  1: {
    resumo:
      "Ele queria escrever sobre outra coisa e mudou de assunto por urgência.",
    detalhe:
      "A explicação sobre a mudança de tema é dada logo no começo, o que mostra uma carta escrita por necessidade e não por plano. As imagens contra os falsos mestres são acumuladas e visuais, com nuvens sem água, árvores sem fruto duas vezes mortas, ondas furiosas e estrelas errantes. E o fim é uma das doxologias mais bonitas do Novo Testamento, sobre quem é poderoso para guardar de tropeços.",
    marcos: [
      "'Senti a necessidade de vos escrever'",
      "'Batalheis, diligentemente, pela fé'",
      "'Nuvens sem água, árvores tardias, sem fruto'",
      "'Compadecei-vos de alguns que estão vacilantes'",
      "'Àquele que é poderoso para vos guardar de tropeços'",
    ],
    chave: 3,
  },
};

CAPITULOS.ap = {
  1: {
    resumo:
      "Uma visão numa ilha, e a primeira reação de quem vê é cair como morto.",
    detalhe:
      "O autor se identifica como companheiro na tribulação e diz onde estava e por quê. O livro promete bem-aventurança a quem lê e a quem ouve, o que indica leitura em voz alta na assembleia. A descrição da figura é feita de imagens acumuladas do Antigo Testamento. E o gesto que segue o terror é de consolo, com a mão direita pousada sobre ele e a ordem de não temer.",
    marcos: [
      "'Bem-aventurado aquele que lê e os que ouvem'",
      "'Eu, João, irmão vosso e companheiro na tribulação'",
      "'Achei-me na ilha chamada Patmos'",
      "'Caí a seus pés como morto'",
      "'Não temas; eu sou o primeiro e o último'",
    ],
    chave: 17,
  },
  2: {
    resumo:
      "Cartas a quatro igrejas, cada uma com elogio, crítica e uma promessa.",
    detalhe:
      "O padrão é constante e revela cuidado com cada comunidade específica. Éfeso trabalha bem e perdeu o primeiro amor. Esmirna é pobre e é chamada de rica. Pérgamo vive onde há muita pressão. Tiatira tolera o que não devia. As críticas são específicas e as promessas também, o que mostra que o livro fala primeiro a comunidades reais antes de qualquer leitura mais ampla.",
    marcos: [
      "'Conheço as tuas obras, o teu labor e a tua perseverança'",
      "'Deixaste o teu primeiro amor'",
      "'Conheço a tua tribulação e a tua pobreza, mas tu és rico'",
      "'Sê fiel até à morte'",
      "'Ao vencedor darei uma pedrinha branca'",
    ],
    chave: 4,
  },
  3: {
    resumo:
      "Mais três igrejas, incluindo uma que tem fama de viva e uma que se acha rica.",
    detalhe:
      "Sardes tem nome de que vive e está morta, o que é uma crítica sobre reputação. Filadélfia tem pouca força e recebe uma porta aberta. Laodiceia é a mais dura, descrita como morna, e a crítica é sobre autoavaliação, porque ela se diz rica e não sabe que é miserável. A imagem final é doméstica e cortês, com alguém do lado de fora batendo e esperando ser convidado a entrar para cear.",
    marcos: [
      "'Tens nome de que vives e estás morto'",
      "'Tens pouca força, mas guardaste a minha palavra'",
      "'Porque és morno, estou para vomitar-te'",
      "'Dizes: estou rico, e não sabes que és infeliz'",
      "'Eis que estou à porta e bato'",
    ],
    chave: 20,
  },
  4: {
    resumo:
      "Uma porta aberta no céu, um trono e uma sala cheia de adoração.",
    detalhe:
      "A descrição é feita por comparação com pedras preciosas, porque não há vocabulário direto. O arco-íris ao redor do trono é um detalhe que liga a cena à aliança com Noé. Os vinte e quatro anciãos lançam as coroas diante do trono, gesto de devolução. E o capítulo fecha com a razão do louvor sendo a criação, e não ainda a redenção, que aparece no capítulo seguinte.",
    marcos: [
      "'Eis uma porta aberta no céu'",
      "Um arco celeste ao redor do trono, semelhante à esmeralda",
      "Vinte e quatro anciãos com coroas de ouro",
      "'Santo, Santo, Santo é o Senhor Deus, o Todo-Poderoso'",
      "'Tu criaste todas as coisas'",
    ],
    chave: 11,
  },
  5: {
    resumo:
      "Ninguém é digno de abrir o livro, e ele chora muito até alguém lhe dizer para parar.",
    detalhe:
      "O choro registrado é uma das notas mais humanas do livro, e a consolação vem com o anúncio do Leão da tribo de Judá. A virada acontece quando ele olha e vê, em vez de um leão, um cordeiro como havia sido morto. A troca de imagem é o centro teológico do capítulo. E o louvor vai crescendo em círculos até incluir toda criatura no céu, na terra, debaixo da terra e no mar.",
    marcos: [
      "'Quem é digno de abrir o livro?'",
      "'Eu chorava muito, porque ninguém foi achado digno'",
      "'Eis que o Leão da tribo de Judá venceu'",
      "'Vi um Cordeiro em pé, como tendo sido morto'",
      "'Toda criatura que há no céu e sobre a terra'",
    ],
    chave: 6,
  },
  6: {
    resumo:
      "Seis selos abertos, quatro cavaleiros, e uma pergunta feita debaixo do altar.",
    detalhe:
      "Os cavaleiros representam conquista, guerra, escassez e morte, e o detalhe econômico do terceiro é preciso, com preços de trigo e cevada em nível de fome enquanto azeite e vinho, produtos de luxo, são poupados. O quinto selo traz a pergunta até quando, feita pelas almas dos mortos, e a resposta é um pedido de espera. O sexto é cósmico e termina com a pergunta sobre quem poderá suster-se.",
    marcos: [
      "Os quatro cavaleiros e os seus cavalos",
      "'Uma medida de trigo por um denário'",
      "'Não danifiques o azeite e o vinho'",
      "'Até quando, ó Soberano Senhor?'",
      "'Quem é que pode suster-se?'",
    ],
    chave: 10,
  },
  7: {
    resumo:
      "Uma pausa entre os selos, com uma multidão que ninguém consegue contar.",
    detalhe:
      "O capítulo interrompe a sequência de propósito, com a ordem de segurar os ventos até que os servos sejam selados. O contraste é entre um número ouvido, cento e quarenta e quatro mil, e uma multidão vista que ninguém pode enumerar, de todas as nações, tribos, povos e línguas. A cena final é de consolo físico, com fontes de água e o enxugar de lágrimas.",
    marcos: [
      "Quatro anjos seguram os quatro ventos",
      "'Não danifiqueis a terra até selarmos os servos'",
      "Uma multidão que ninguém podia enumerar",
      "'De todas as nações, tribos, povos e línguas'",
      "'Deus lhes enxugará dos olhos toda lágrima'",
    ],
    chave: 9,
  },
  8: {
    resumo:
      "Meia hora de silêncio no céu, e depois começam as trombetas.",
    detalhe:
      "O silêncio é um detalhe surpreendente num livro tão barulhento, e ele vem logo antes da ação. O gesto do anjo com o incensário liga as orações dos santos ao que acontece em seguida, porque o fogo do altar é lançado à terra. As quatro primeiras trombetas atingem terra, mar, rios e astros, sempre em terços, e o capítulo termina com um aviso sobre os três ais que ainda vêm.",
    marcos: [
      "'Fez-se silêncio no céu por quase meia hora'",
      "O incenso com as orações dos santos",
      "O fogo do altar é lançado sobre a terra",
      "As quatro primeiras trombetas atingem terços",
      "'Ai, ai, ai dos que habitam sobre a terra!'",
    ],
    chave: 1,
  },
  9: {
    resumo:
      "Gafanhotos que não comem plantas e cavalaria em número impossível de imaginar.",
    detalhe:
      "A quinta trombeta abre o poço do abismo e o que sai é descrito com detalhe grotesco e inversão de função, porque gafanhotos atacam pessoas e não vegetação. Há um limite explícito de cinco meses e a observação de que os homens buscarão a morte e não a acharão. A sexta trombeta traz um exército enorme. O comentário mais pesado do capítulo é que os sobreviventes não se arrependeram.",
    marcos: [
      "A chave do poço do abismo",
      "Gafanhotos com ordem de não danificar a erva",
      "'Os homens buscarão a morte e não a encontrarão'",
      "Um exército de cavalaria em número incontável",
      "'Não se arrependeram das obras das suas mãos'",
    ],
    chave: 20,
  },
  10: {
    resumo:
      "Um livrinho aberto que é doce na boca e amargo no estômago.",
    detalhe:
      "O capítulo interrompe de novo a sequência. O gesto de comer o rolo retoma Ezequiel 3, e o acréscimo aqui é o amargor posterior, o que dá uma nota realista sobre carregar uma mensagem difícil. Há também uma proibição curiosa de escrever o que os sete trovões falaram, o que mostra que nem tudo o que foi visto foi registrado. E ele recebe a incumbência de profetizar de novo.",
    marcos: [
      "Um anjo forte com um livrinho aberto na mão",
      "'Sela o que falaram os sete trovões e não o escrevas'",
      "'Não haverá mais demora'",
      "'Toma o livro e come-o'",
      "'Na boca era doce como mel; depois, amargoso'",
    ],
    chave: 9,
  },
  11: {
    resumo:
      "Duas testemunhas profetizam vestidas de saco, morrem e ficam três dias na rua.",
    detalhe:
      "O capítulo mistura medição do templo com a história das duas testemunhas, que têm poder por um tempo determinado. O detalhe mais mordaz é a reação do mundo à morte delas, com gente se alegrando e trocando presentes. A virada acontece depois de três dias e meio. A sétima trombeta finalmente soa e o que se ouve não é catástrofe, e sim vozes dizendo que o reino passou a ser do Senhor.",
    marcos: [
      "As duas testemunhas profetizam vestidas de pano de saco",
      "Os corpos ficam na praça e ninguém permite sepultá-los",
      "Enviam presentes uns aos outros de alegria",
      "Depois de três dias e meio, elas se levantam",
      "'O reino do mundo se tornou de nosso Senhor'",
    ],
    chave: 15,
  },
  12: {
    resumo:
      "Uma mulher grávida, um dragão esperando, e uma fuga para o deserto.",
    detalhe:
      "A cena é de perigo máximo, com o dragão posicionado diante da mulher para devorar o filho no instante do nascimento. O capítulo tem uma guerra no céu e uma queda. A frase sobre como venceram é notável por listar três coisas e nenhuma delas é força: o sangue do Cordeiro, a palavra do testemunho e não terem amado a própria vida até a morte. O deserto aparece como lugar de sustento.",
    marcos: [
      "Uma mulher vestida do sol, com a lua debaixo dos pés",
      "O dragão se põe diante dela para devorar o filho",
      "Houve peleja no céu",
      "'Eles, pois, o venceram por causa do sangue do Cordeiro'",
      "A mulher foge para o deserto, onde é sustentada",
    ],
    chave: 11,
  },
  13: {
    resumo:
      "Duas bestas, uma que vem do mar e outra da terra, e um número famoso.",
    detalhe:
      "A primeira besta recebe autoridade e adoração, com a pergunta retórica sobre quem é semelhante a ela e quem pode pelejar contra ela. A segunda tem aparência inofensiva, com chifres de cordeiro, e fala como dragão, exercendo função de propaganda. O controle econômico descrito, impedindo comprar e vender, é o detalhe mais concreto. E o número é apresentado como enigma que pede sabedoria para calcular.",
    marcos: [
      "Uma besta que emerge do mar",
      "'Quem é semelhante à besta? Quem pode pelejar contra ela?'",
      "A segunda besta tem dois chifres como cordeiro e fala como dragão",
      "Ninguém pode comprar ou vender sem a marca",
      "'Aqui está a sabedoria: calcule o número da besta'",
    ],
    chave: 18,
  },
  14: {
    resumo:
      "Um cântico que só alguns podem aprender, e três anjos com anúncios diferentes.",
    detalhe:
      "A cena começa com o Cordeiro em pé no monte Sião e um cântico novo que ninguém mais podia aprender. Os três anjos trazem mensagens distintas, sendo a primeira um evangelho eterno a toda nação, tribo, língua e povo. A imagem final é de colheita, com foice e ceifa, e há no meio uma bem-aventurança sobre os que morrem no Senhor, com a observação de que as obras deles os acompanham.",
    marcos: [
      "O Cordeiro em pé sobre o monte Sião",
      "Cantavam um cântico novo que ninguém podia aprender",
      "'Um evangelho eterno para pregar a toda nação'",
      "'Bem-aventurados os mortos que, desde agora, morrem no Senhor'",
      "'As suas obras os acompanham'",
    ],
    chave: 13,
  },
  15: {
    resumo:
      "Um mar de vidro misturado com fogo, e o cântico de Moisés e do Cordeiro.",
    detalhe:
      "É o capítulo mais curto do livro e funciona como antessala das últimas pragas. Os que venceram estão de pé sobre o mar de vidro com harpas. O cântico junta dois nomes, Moisés e o Cordeiro, ligando êxodo e redenção. O conteúdo do canto é sobre as obras serem grandes e os caminhos justos, e o santuário se enche de fumaça de modo que ninguém pode entrar.",
    marcos: [
      "Um mar de vidro misturado com fogo",
      "O cântico de Moisés e o cântico do Cordeiro",
      "'Grandes e admiráveis são as tuas obras'",
      "Sete anjos com as sete últimas pragas",
      "O santuário se enche de fumaça",
    ],
    chave: 3,
  },
  16: {
    resumo:
      "As sete taças são derramadas, e no meio delas alguém diz que vem como ladrão.",
    detalhe:
      "A sequência é rápida e atinge terra, mar, rios, sol, o trono da besta, o Eufrates e o ar. O comentário que se repete é que os atingidos blasfemaram e não se arrependeram, o que reforça o tema da obstinação. No meio do bloco entra uma frase inesperada em primeira pessoa sobre vir como ladrão, com uma bem-aventurança sobre vigiar. E a sétima taça termina com uma voz dizendo que está feito.",
    marcos: [
      "As taças são derramadas sobre a terra e o mar",
      "'Justo és tu, que és e que eras, o Santo'",
      "Blasfemaram e não se arrependeram",
      "'Eis que venho como ladrão'",
      "'Feito está!'",
    ],
    chave: 15,
  },
  17: {
    resumo:
      "Uma mulher sentada sobre uma besta, e o anjo explica os símbolos um a um.",
    detalhe:
      "A cena é de luxo e de violência ao mesmo tempo, com púrpura, ouro e pedras preciosas, e um cálice cheio de abominações. O autor registra que ficou maravilhado, e o anjo se dispõe a explicar. Boa parte do capítulo é interpretação interna, dizendo o que as cabeças e os chifres representam. E há a afirmação de que o Cordeiro os vencerá porque é Senhor dos senhores e Rei dos reis.",
    marcos: [
      "Uma mulher sentada sobre uma besta escarlate",
      "Tinha um cálice de ouro cheio de abominações",
      "'Vi a mulher embriagada com o sangue dos santos'",
      "'Vendo-a, admirei-me com grande espanto'",
      "'O Cordeiro os vencerá, pois é Senhor dos senhores'",
    ],
    chave: 14,
  },
  18: {
    resumo:
      "A queda de uma cidade comercial, chorada por quem perdeu clientes.",
    detalhe:
      "O capítulo é construído como lamento, e quem lamenta são reis, mercadores e marinheiros, cada grupo pelos próprios motivos. A lista de mercadorias é longa e termina com um item que muda tudo, porque depois de ouro, seda, mármore e especiarias aparecem corpos e almas humanas. O convite dirigido ao povo é para sair dela, e o silêncio final é descrito pela ausência de música e de moinho.",
    marcos: [
      "'Caiu! Caiu a grande Babilônia'",
      "'Retirai-vos dela, povo meu'",
      "Os mercadores choram porque ninguém mais compra",
      "A lista termina com corpos e almas de homens",
      "Nunca mais se ouvirá em ti voz de harpistas nem som de moinho",
    ],
    chave: 4,
  },
  19: {
    resumo:
      "Um casamento anunciado, e um cavaleiro cujo manto já está tinto antes da batalha.",
    detalhe:
      "O capítulo começa com aleluias e com o anúncio das bodas do Cordeiro, e há uma nota sobre a veste de linho ser os atos de justiça dos santos. Há também um momento em que João se prostra diante do anjo e é repreendido. A figura do cavaleiro tem um detalhe significativo, porque as vestes já estão tintas em sangue antes do combate, e a arma é uma espada que sai da boca.",
    marcos: [
      "'Aleluia! A salvação, a glória e o poder são do nosso Deus'",
      "'Chegaram as bodas do Cordeiro'",
      "'Adora a Deus', diz o anjo ao ser reverenciado",
      "Um cavalo branco, e o que o monta se chama Fiel e Verdadeiro",
      "Da sua boca sai uma espada afiada",
    ],
    chave: 9,
  },
  20: {
    resumo:
      "Mil anos, uma soltura, um julgamento diante de um grande trono branco.",
    detalhe:
      "É o capítulo mais debatido do livro e as principais escolas de interpretação divergem justamente sobre como ler os mil anos. O texto descreve prisão, reinado, soltura e derrota final. A cena do juízo é sóbria, com livros abertos e mais um livro, e com o critério declarado sendo as obras. O detalhe mais marcante é a descrição do mar, da morte e do além entregando os que neles estavam.",
    marcos: [
      "Um anjo com a chave do abismo e uma grande corrente",
      "Reinaram com Cristo durante mil anos",
      "Satanás é solto por um pouco de tempo",
      "'Vi um grande trono branco'",
      "Livros foram abertos, e outro livro, o da vida",
    ],
    chave: 12,
  },
  21: {
    resumo:
      "Céu novo e terra nova, e a promessa mais concreta do livro é sobre lágrimas.",
    detalhe:
      "A novidade não é apenas espiritual, porque o texto fala de cidade que desce e de habitação de Deus com os homens. O gesto descrito é doméstico e íntimo, com ele enxugando dos olhos toda lágrima. A lista do que não haverá mais é de coisas concretas, morte, luto, pranto e dor. A cidade é medida e descrita com pedras preciosas, e o detalhe mais notável é que nela não há templo.",
    marcos: [
      "'Vi novo céu e nova terra'",
      "'O tabernáculo de Deus está com os homens'",
      "'Enxugará dos seus olhos toda lágrima'",
      "'Eis que faço novas todas as coisas'",
      "'Nela, não vi santuário'",
    ],
    chave: 4,
  },
  22: {
    resumo:
      "Um rio no meio da rua, árvores que dão fruto todo mês, e um convite final.",
    detalhe:
      "A imagem final do livro retoma o jardim do começo da Bíblia, com árvore da vida e rio, agora dentro de uma cidade. As folhas servem para a cura das nações. A cena não tem noite nem necessidade de lâmpada. O fecho alterna avisos e convites, e a última palavra não é de ameaça, e sim um convite repetido para quem tem sede vir e tomar de graça da água da vida.",
    marcos: [
      "Um rio da água da vida, no meio da rua",
      "A árvore da vida, que produz fruto cada mês",
      "'As folhas da árvore são para a cura dos povos'",
      "'Não haverá mais noite'",
      "'Aquele que tem sede venha, e quem quiser receba de graça'",
    ],
    chave: 17,
  },
};

export const fichaDoCapitulo = (slug: string, capitulo: number): Capitulo | null =>
  CAPITULOS[slug]?.[capitulo] ?? null;
