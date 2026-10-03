/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // O índice muda sempre que uma tradução entra ou sai, então precisa ser
        // revalidado. Marcá-lo como imutável prendia quem já tinha aberto o app
        // à lista antiga de traduções, por um ano.
        source: "/biblia/index.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        // Já o texto de cada livro é imutável dentro de uma revisão: o app pede
        // /biblia/<versao>/<livro>.json?v=<revisão>, e a revisão (no índice) muda
        // quando o texto é corrigido. Por isso pode cachear para sempre.
        // `+` e não `*`: com `*` este padrão também casava com /biblia/index.json
        // e, por vir depois, sobrescrevia a regra de revalidação acima.
        source: "/biblia/:versao/:livro+",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // As fichas de capítulo, ao contrário do texto bíblico, são reescritas
        // quando corrigimos ou melhoramos um resumo. Um dia de cache resolve o
        // custo de rede sem prender ninguém a uma versão antiga por um ano.
        source: "/capitulos/:livro.json",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
