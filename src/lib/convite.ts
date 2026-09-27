/**
 * Convite para um grupo de leitura: um link que abre direto na tela de
 * entrar no grupo (`/entrar/CODIGO`) e o código, para quem preferir digitar.
 *
 * No Android, com o app instalado, o link abre dentro do app: o manifest
 * cobre o site inteiro, e o link é do mesmo endereço.
 */
export function linkDoConvite(codigo: string) {
  return `${window.location.origin}/entrar/${encodeURIComponent(codigo)}`;
}

export function textoDoConvite(codigo: string, nomeDoPlano?: string) {
  return [
    "Bora ler a Bíblia junto no Genipse Bible?",
    nomeDoPlano
      ? `Estou no plano "${nomeDoPlano}" e quero você comigo: a gente acompanha a meta um do outro todo dia.`
      : "A gente acompanha a meta um do outro todo dia.",
    "",
    "Toque para entrar no grupo:",
    linkDoConvite(codigo),
    "",
    `Ou use o código ${codigo} em Jornada > Entrar com um código.`,
  ].join("\n");
}

/** O nome do grupo é "Leitura: <plano>"; na tela de convite só o plano importa. */
export const planoDoNomeDoGrupo = (nome: string) => nome.replace(/^Leitura:\s*/, "");
