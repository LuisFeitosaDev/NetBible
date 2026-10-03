/**
 * Provérbios em 31 dias: um capítulo por dia, o plano clássico (o livro tem
 * 31 capítulos, um para cada dia do mês). A leitura é o capítulo inteiro; a
 * reflexão para em um versículo dele, citado pela ARA.
 */
import type { Devocional } from "./devocionais";

/** Versículos de cada capítulo de Provérbios, para a leitura ir de 1 ao fim. */
const VERSOS = [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31];
const cap = (n: number) => ({ slug: "pv", capitulo: n, de: 1, ate: VERSOS[n - 1] });

export const PROVERBIOS_31: Devocional = {
  id: "proverbios-31-dias",
  titulo: "Navegando em Provérbios",
  chamada: "31 dias, um capítulo por dia",
  descricao:
    "Provérbios tem 31 capítulos: um para cada dia do mês. É o livro da sabedoria prática da Bíblia — dinheiro, amizade, trabalho, palavras, família, orgulho. Cada dia você lê um capítulo inteiro e para em um versículo dele. Em um mês, o livro todo.",
  categoria: "jornada",
  // O rosto e o compasso ficam à direita do centro; sem o foco, o corte do
  // celular pegava só a túnica.
  capa: { slug: "pv", capitulo: 8, foco: "62% 30%" },
  cor: "#c9a646",
  selo: "Um mês",
  dias: [
    {
      titulo: "Onde a sabedoria começa",
      leitura: cap(1),
      reflexao: [
        "Logo no começo, o livro diz qual é a porta de entrada: \"O temor do Senhor é o princípio do conhecimento.\" Temor aqui não é pavor, é reverência: levar Deus a sério.",
        "Antes de qualquer conselho sobre dinheiro ou amizade, Provérbios coloca Deus no centro. A sabedoria bíblica não é só esperteza para a vida dar certo: é viver sabendo diante de quem a gente vive.",
      ],
      pergunta: "Em que área da sua vida você menos leva Deus a sério?",
      oracao: "Senhor, começo este mês aqui: ensina-me a te temer, porque é aí que a sabedoria começa.",
      pratica: "Escolha um horário fixo para ler um capítulo por dia neste mês.",
    },
    {
      titulo: "Procure como quem procura tesouro",
      leitura: cap(2),
      reflexao: [
        "O capítulo é cheio de verbos de esforço: inclinar o ouvido, clamar, buscar como prata, procurar como tesouro escondido. Sabedoria não cai no colo.",
        "Mas o versículo 6 equilibra tudo: \"o Senhor dá a sabedoria\". A gente busca com tudo, e no fim recebe como presente. Esforço e graça andam juntos.",
      ],
      pergunta: "Com que intensidade você tem buscado sabedoria?",
      oracao: "Deus, eu busco a tua sabedoria como quem procura um tesouro. Dá-me o que eu sozinho não acho.",
      pratica: "Anote hoje uma pergunta para a qual você precisa de sabedoria, e ore por ela durante a semana.",
    },
    {
      titulo: "A disciplina de quem ama",
      leitura: cap(3),
      reflexao: [
        "\"O Senhor repreende aquele a quem ama, assim como o pai ao filho a quem quer bem.\" A correção de Deus não é sinal de rejeição. É sinal de pertencimento.",
        "O mesmo capítulo traz o famoso \"confia no Senhor de todo o teu coração\". Quem confia aceita também ser corrigido, porque sabe que vem de quem quer o seu bem.",
      ],
      pergunta: "Há alguma correção recente que você recebeu com raiva em vez de gratidão?",
      oracao: "Pai, não quero rejeitar a tua disciplina. Obrigado por me corrigires porque me amas.",
      pratica: "Agradeça a alguém que já te corrigiu com amor.",
    },
    {
      titulo: "Como a luz da manhã",
      leitura: cap(4),
      reflexao: [
        "\"A vereda dos justos é como a luz da aurora que vai brilhando mais e mais até ser dia perfeito.\" A vida com Deus não é um clarão de uma vez: é um amanhecer.",
        "Isso tira o peso de querer estar pronto hoje. O que importa é a direção. Um passo de cada vez, a luz vai aumentando.",
      ],
      pergunta: "Você tem cobrado de si mesmo um dia perfeito quando ainda é madrugada?",
      oracao: "Senhor, faz a minha vida brilhar mais e mais, no teu ritmo.",
      pratica: "Escreva uma área em que você cresceu no último ano, mesmo que pouco.",
    },
    {
      titulo: "Fidelidade que alegra",
      leitura: cap(5),
      reflexao: [
        "O capítulo é um alerta sincero contra a traição e o desejo que engana. E termina num convite positivo: \"regozija-te na mulher da tua mocidade\".",
        "A Bíblia não trata a fidelidade só como proibição. Ela a apresenta como fonte de alegria. O que se cuida, floresce.",
      ],
      pergunta: "Que relação na sua vida precisa de mais cuidado e fidelidade?",
      oracao: "Deus, guarda o meu coração das coisas que enganam, e faz florescer as relações que me confiaste.",
      pratica: "Faça hoje um gesto concreto de cuidado com quem está mais perto de você.",
    },
    {
      titulo: "Vai ter com a formiga",
      leitura: cap(6),
      reflexao: [
        "\"Vai ter com a formiga, ó preguiçoso.\" Ninguém manda na formiga, e mesmo assim ela trabalha e se prepara para o tempo difícil.",
        "Provérbios leva o trabalho a sério. A preguiça não chega de uma vez: é \"um pouco para dormir, um pouco para toscanejar\". Os pequenos adiamentos é que pesam.",
      ],
      pergunta: "O que você tem adiado \"só mais um pouco\"?",
      oracao: "Senhor, livra-me da preguiça que se disfarça de descanso. Dá-me diligência.",
      pratica: "Faça hoje a tarefa que você mais tem adiado, antes de qualquer outra.",
    },
    {
      titulo: "Escrito no coração",
      leitura: cap(7),
      reflexao: [
        "\"Ata-os aos teus dedos, escreve-os na tábua do teu coração.\" O pai do texto não quer que o filho decore regras, quer que elas virem parte dele.",
        "O resto do capítulo mostra um jovem que vai, passo a passo, para onde não devia. Ninguém cai de repente. Quem tem a palavra escrita no coração percebe o caminho errado antes do fim.",
      ],
      pergunta: "Que passo pequeno tem te levado para onde você não quer ir?",
      oracao: "Deus, escreve a tua palavra no meu coração, para que eu reconheça o caminho errado logo no começo.",
      pratica: "Escolha um versículo e escreva-o à mão em algum lugar que você vê todo dia.",
    },
    {
      titulo: "A sabedoria estava lá",
      leitura: cap(8),
      reflexao: [
        "Aqui a sabedoria fala como uma pessoa, e diz que estava presente quando Deus criou o mundo: \"eu estava ao seu lado como arquiteto\". A capa deste devocional mostra exatamente isso.",
        "O mundo foi feito com sabedoria, por isso viver sabiamente é viver de acordo com o jeito que as coisas foram feitas. E a promessa é aberta: \"os que diligentemente me buscam me acharão\".",
      ],
      pergunta: "Você tem vivido a favor ou contra o jeito como Deus fez as coisas?",
      oracao: "Senhor, tu criaste o mundo com sabedoria. Quero buscá-la, porque prometeste que quem busca acha.",
      pratica: "Observe hoje algo da natureza com calma e agradeça pela sabedoria de quem o fez.",
    },
    {
      titulo: "Dois convites",
      leitura: cap(9),
      reflexao: [
        "O capítulo mostra duas mulheres convidando para um banquete: a Sabedoria e a Loucura. As duas chamam do mesmo lugar, as duas oferecem algo. Mas uma leva à vida e a outra, à morte.",
        "No meio, o versículo 10 repete o que o livro já disse no início: tudo começa no temor do Senhor. Todo dia a gente aceita um dos dois convites.",
      ],
      pergunta: "Qual convite tem sido mais atraente para você ultimamente?",
      oracao: "Deus, quero sentar à mesa da sabedoria. Ajuda-me a reconhecer os convites que parecem bons e não são.",
      pratica: "Diga não hoje a um convite (de conversa, de hábito, de consumo) que você sabe que não te faz bem.",
    },
    {
      titulo: "O amor cobre",
      leitura: cap(10),
      reflexao: [
        "A partir daqui, Provérbios vira uma coleção de frases curtas, cada uma completa. Uma das mais bonitas: \"O ódio excita contendas; mas o amor cobre todas as transgressões.\"",
        "Cobrir não é esconder pecado ou fingir que nada aconteceu. É não ficar expondo, lembrando e cobrando. O amor escolhe não manter a ferida aberta.",
      ],
      pergunta: "Que erro de alguém você ainda fica expondo ou relembrando?",
      oracao: "Senhor, ensina-me a amar de um jeito que cobre, e não que expõe.",
      pratica: "Não mencione hoje um erro antigo de alguém, nem em pensamento, nem em conversa.",
    },
    {
      titulo: "Quem rega é regado",
      leitura: cap(11),
      reflexao: [
        "\"A alma generosa prosperará, e o que regar também será regado.\" A lógica de Deus é contrária à do acúmulo: quem dá não fica mais pobre.",
        "O capítulo também fala de balança desonesta e de quem retém o trigo esperando o preço subir. A generosidade e a honestidade andam juntas.",
      ],
      pergunta: "Onde você tem segurado o que poderia regar outra pessoa?",
      oracao: "Deus, faz de mim uma pessoa generosa. Confio que tu cuidas de quem rega.",
      pratica: "Faça hoje uma generosidade concreta: tempo, dinheiro ou atenção.",
    },
    {
      titulo: "Uma boa palavra",
      leitura: cap(12),
      reflexao: [
        "\"A ansiedade no coração do homem o abate; mas uma boa palavra o alegra.\" Três mil anos atrás, Provérbios já sabia o que a ansiedade faz.",
        "E a resposta é simples: uma boa palavra. Às vezes Deus usa a frase certa de alguém para levantar quem está abatido. Você pode ser essa pessoa para alguém hoje.",
      ],
      pergunta: "Quem perto de você está abatido e precisa de uma boa palavra?",
      oracao: "Senhor, usa as minhas palavras para alegrar quem está abatido.",
      pratica: "Mande hoje uma mensagem de encorajamento para quem está passando por algo difícil.",
    },
    {
      titulo: "Diga com quem andas",
      leitura: cap(13),
      reflexao: [
        "\"Quem anda com os sábios será sábio; mas o companheiro dos tolos sofre aflição.\" A gente vai ficando parecido com quem anda junto.",
        "Isso não é um convite para desprezar ninguém, e sim para escolher com cuidado quem tem influência sobre você. As vozes que você mais ouve moldam quem você vira.",
      ],
      pergunta: "Quem são as três pessoas que mais te influenciam hoje?",
      oracao: "Deus, coloca pessoas sábias no meu caminho, e me dá humildade para aprender com elas.",
      pratica: "Marque um café ou uma conversa com alguém que você admira pela sabedoria.",
    },
    {
      titulo: "O caminho que parece certo",
      leitura: cap(14),
      reflexao: [
        "\"Há um caminho que ao homem parece direito, mas o fim dele conduz à morte.\" Nem tudo que parece certo é certo. A gente se engana com facilidade.",
        "Por isso a humildade é tão central em Provérbios. Quem acha que já sabe para de perguntar, e quem para de perguntar caminha confiante para o lugar errado.",
      ],
      pergunta: "Que decisão sua parece certa, mas você nunca colocou diante de Deus?",
      oracao: "Senhor, mostra-me os caminhos que parecem certos e não são. Não quero confiar só no que eu acho.",
      pratica: "Peça a opinião sincera de alguém de confiança sobre uma decisão que você está tomando.",
    },
    {
      titulo: "Muitos conselheiros",
      leitura: cap(15),
      reflexao: [
        "\"Onde não há conselho, frustram-se os projetos; mas com a multidão de conselheiros se estabelecem.\" Decidir sozinho é arriscado, mesmo para quem é inteligente.",
        "Pedir conselho não é fraqueza, é sabedoria. E o capítulo lembra que ouvir exige humildade: o tolo despreza a correção, o sábio a recebe.",
      ],
      pergunta: "Você tem pedido conselho antes de decidir, ou só depois que deu errado?",
      oracao: "Deus, dá-me humildade para ouvir conselhos, e sabedoria para reconhecer os bons.",
      pratica: "Antes da próxima decisão importante, consulte pelo menos duas pessoas.",
    },
    {
      titulo: "O orgulho vem antes da queda",
      leitura: cap(16),
      reflexao: [
        "\"A soberba precede a destruição, e a altivez do espírito precede a queda.\" O orgulho é perigoso porque cega: quem cai por orgulho geralmente não vê o tombo chegando.",
        "O mesmo capítulo diz que o Senhor pesa os espíritos. Deus olha a motivação, não só a ação. E entregar os planos a ele é o oposto do orgulho.",
      ],
      pergunta: "Em que área você tem se achado bom demais para precisar de ajuda?",
      oracao: "Senhor, tira de mim o orgulho que me cega. Eu entrego a ti as minhas obras.",
      pratica: "Admita hoje, para alguém, que você estava errado sobre algo.",
    },
    {
      titulo: "O amigo de todas as horas",
      leitura: cap(17),
      reflexao: [
        "\"O amigo ama em todo o tempo; e para a angústia nasce o irmão.\" Amigo de verdade aparece justamente quando a vida aperta.",
        "Esse provérbio é um retrato, mas também um desafio: não só ter amigos assim, e sim ser um amigo assim.",
      ],
      pergunta: "Você tem sido amigo em todo o tempo, ou só nos tempos bons?",
      oracao: "Deus, obrigado pelos amigos que me amam em todo o tempo. Faz de mim um amigo assim.",
      pratica: "Procure hoje um amigo que está passando por um momento difícil.",
    },
    {
      titulo: "A torre forte",
      leitura: cap(18),
      reflexao: [
        "\"Torre forte é o nome do Senhor; para ela corre o justo, e está seguro.\" Numa cidade antiga, a torre era o lugar para onde todos corriam quando o inimigo chegava.",
        "O versículo seguinte compara: o rico acha que a riqueza é a sua muralha. Cada um corre para alguma coisa quando tem medo. A pergunta é para onde.",
      ],
      pergunta: "Para onde você corre quando tem medo?",
      oracao: "Senhor, tu és a minha torre forte. Ensina-me a correr para ti primeiro.",
      pratica: "Na próxima vez que o medo aparecer hoje, ore antes de fazer qualquer outra coisa.",
    },
    {
      titulo: "Esquecer ofensas",
      leitura: cap(19),
      reflexao: [
        "\"A discrição do homem fá-lo tardio em irar-se; e sua glória está em esquecer ofensas.\" Provérbios chama de glória o que muitos chamariam de fraqueza.",
        "Não é fingir que não doeu. É escolher não fazer da ofensa o centro da relação. Quem demora a se irar tem mais espaço para pensar.",
      ],
      pergunta: "Que ofensa você ainda carrega e poderia deixar passar?",
      oracao: "Deus, faz-me tardio em irar-me e rápido em deixar passar.",
      pratica: "Quando algo te irritar hoje, conte até dez antes de reagir.",
    },
    {
      titulo: "Quem dirige os passos",
      leitura: cap(20),
      reflexao: [
        "\"Os passos do homem são dirigidos pelo Senhor; como, pois, poderá o homem entender o seu caminho?\" Nem sempre entendemos o caminho enquanto andamos nele.",
        "Isso não é motivo de angústia, e sim de descanso. Não precisamos entender tudo para seguir. Precisamos confiar em quem conduz.",
      ],
      pergunta: "Que parte do seu caminho você ainda não entende?",
      oracao: "Senhor, eu não entendo tudo, mas confio que és tu quem dirige os meus passos.",
      pratica: "Escreva uma situação do passado que só fez sentido depois, e agradeça.",
    },
    {
      titulo: "A vitória vem do Senhor",
      leitura: cap(21),
      reflexao: [
        "\"O cavalo prepara-se para o dia da batalha; mas do Senhor vem a vitória.\" Preparar o cavalo não é falta de fé: é responsabilidade.",
        "O provérbio equilibra as duas coisas: faça a sua parte com tudo, e saiba que o resultado está em outras mãos.",
      ],
      pergunta: "Você tende mais a não se preparar ou a confiar só na preparação?",
      oracao: "Deus, eu faço a minha parte, e entrego o resultado a ti.",
      pratica: "Prepare-se bem para um compromisso de amanhã, e entregue-o a Deus em oração.",
    },
    {
      titulo: "O caminho do menino",
      leitura: cap(22),
      reflexao: [
        "\"Instrui o menino no caminho em que deve andar, e até quando envelhecer não se desviará dele.\" Provérbios é um livro de pais para filhos, e este versículo resume essa intenção.",
        "Provérbio não é promessa garantida: é um princípio geral de como as coisas costumam funcionar. O que se planta cedo tende a durar.",
      ],
      pergunta: "Que sementes você está plantando nas pessoas mais novas ao seu redor?",
      oracao: "Senhor, ajuda-me a ensinar com palavras e com exemplo os que vêm depois de mim.",
      pratica: "Passe tempo de qualidade hoje com uma criança ou um jovem da sua família ou igreja.",
    },
    {
      titulo: "Sem inveja",
      leitura: cap(23),
      reflexao: [
        "\"Não tenhas inveja dos pecadores; antes conserva-te no temor do Senhor todo o dia.\" Às vezes parece que quem faz errado se dá melhor.",
        "O versículo seguinte responde: \"não será malograda a tua esperança\". A história ainda não acabou. Quem teme a Deus não perde por esperar.",
      ],
      pergunta: "De quem você tem sentido inveja ultimamente?",
      oracao: "Deus, tira a inveja do meu coração. A minha esperança está em ti, e ela não vai falhar.",
      pratica: "Agradeça hoje por três coisas que você tem, em vez de olhar o que os outros têm.",
    },
    {
      titulo: "Sete vezes cai",
      leitura: cap(24),
      reflexao: [
        "\"Sete vezes cai o justo, e se levanta.\" O justo não é quem nunca cai. É quem se levanta.",
        "Sete, na Bíblia, sugere completude: cair muitas vezes faz parte. O que define a vida não é o número de quedas, mas o que vem depois de cada uma.",
      ],
      pergunta: "Depois de qual queda você ainda não se levantou?",
      oracao: "Senhor, eu caí de novo. Levanta-me mais uma vez.",
      pratica: "Recomece hoje algo que você largou depois de uma falha.",
    },
    {
      titulo: "A palavra certa na hora certa",
      leitura: cap(25),
      reflexao: [
        "\"Como maçãs de ouro em salvas de prata, assim é a palavra dita a seu tempo.\" Não basta a palavra ser verdadeira: ela precisa vir na hora certa.",
        "A mesma frase pode ferir ou curar dependendo do momento. Sabedoria é também saber quando falar, e quando esperar.",
      ],
      pergunta: "Há algo que você precisa dizer a alguém e está esperando a hora certa?",
      oracao: "Deus, dá-me a palavra certa, e o momento certo de dizê-la.",
      pratica: "Antes de dar uma opinião hoje, pergunte-se: é a hora certa?",
    },
    {
      titulo: "Sem lenha, o fogo apaga",
      leitura: cap(26),
      reflexao: [
        "\"Faltando lenha, apaga-se o fogo; e não havendo difamador, cessa a contenda.\" Muitas brigas só continuam porque alguém continua alimentando.",
        "Fofoca é lenha. Às vezes, a coisa mais pacificadora que você pode fazer é simplesmente não repassar aquilo que ouviu.",
      ],
      pergunta: "Que conflito você tem alimentado com comentários?",
      oracao: "Senhor, que eu não seja lenha nas brigas dos outros.",
      pratica: "Quando ouvir uma fofoca hoje, não repasse. Deixe o fogo apagar.",
    },
    {
      titulo: "Ferro afia ferro",
      leitura: cap(27),
      reflexao: [
        "\"Afia-se o ferro com o ferro; assim o homem afia o rosto do seu amigo.\" Afiar envolve atrito. Amizade boa nem sempre é confortável.",
        "O capítulo também diz que \"fiéis são as feridas dum amigo\". Quem só ouve elogios não cresce.",
      ],
      pergunta: "Quem tem liberdade para te dizer o que você não quer ouvir?",
      oracao: "Deus, obrigado pelos amigos que me afiam. Dá-me coragem para afiar com amor também.",
      pratica: "Peça a um amigo de confiança uma opinião sincera sobre um ponto fraco seu.",
    },
    {
      titulo: "Encobrir ou confessar",
      leitura: cap(28),
      reflexao: [
        "\"O que encobre as suas transgressões nunca prosperará; mas o que as confessa e deixa, alcançará misericórdia.\" Esconder dá trabalho e cobra caro.",
        "Repare nos dois verbos: confessa e deixa. Confissão sem mudança vira desabafo. Mudança sem confissão vira esforço solitário. As duas juntas abrem a porta da misericórdia.",
      ],
      pergunta: "O que você tem escondido que precisa ser confessado e deixado?",
      oracao: "Senhor, eu confesso e quero deixar. Obrigado pela tua misericórdia.",
      pratica: "Confesse a Deus, especificamente, algo que você tem escondido.",
    },
    {
      titulo: "O laço do medo dos outros",
      leitura: cap(29),
      reflexao: [
        "\"O receio do homem lhe arma laços; mas o que confia no Senhor está seguro.\" O medo do que os outros vão pensar prende como uma armadilha.",
        "Quem vive para agradar a todos acaba sem liberdade nenhuma. Confiar em Deus é o que solta esse laço.",
      ],
      pergunta: "A opinião de quem tem te prendido?",
      oracao: "Deus, solta-me do medo do que os outros pensam. Em ti eu estou seguro.",
      pratica: "Faça hoje algo certo que você deixava de fazer por medo da opinião alheia.",
    },
    {
      titulo: "Só o pão necessário",
      leitura: cap(30),
      reflexao: [
        "Agur faz uma oração rara: \"não me dês nem a pobreza nem a riqueza: dá-me só o pão que me é necessário\". Ele tem medo dos dois extremos.",
        "Na fartura, a gente esquece Deus; na miséria, pode ser tentado a roubar. É a oração de quem conhece o próprio coração.",
      ],
      pergunta: "Você teria coragem de orar pedindo só o necessário?",
      oracao: "Senhor, dá-me o pão necessário. Que eu não te esqueça na fartura nem te desonre na falta.",
      pratica: "Revise seus gastos da semana e identifique um excesso que pode cortar.",
    },
    {
      titulo: "O que fica",
      leitura: cap(31),
      reflexao: [
        "O livro termina com o retrato de uma mulher sábia, forte, trabalhadora e generosa. E fecha com uma frase que vale para todos: \"Enganosa é a graça, e vã é a formosura; mas a mulher que teme ao Senhor, essa será louvada.\"",
        "Provérbios começou no temor do Senhor e termina nele. A beleza passa, a aparência engana. O que fica é uma vida inteira vivida diante de Deus. Parabéns: você leu o livro todo.",
      ],
      pergunta: "O que você quer que fique da sua vida quando a aparência passar?",
      oracao: "Deus, obrigado por este mês na tua sabedoria. Que o temor do Senhor marque toda a minha vida.",
      pratica: "Escolha o versículo de Provérbios que mais te marcou neste mês e compartilhe com alguém.",
    },
  ],
};
