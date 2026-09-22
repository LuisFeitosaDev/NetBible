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
        // Já o texto de cada livro é imutável: o conteúdo está amarrado ao id da
        // tradução, então pode cachear para sempre.
        // `+` e não `*`: com `*` este padrão também casava com /biblia/index.json
        // e, por vir depois, sobrescrevia a regra de revalidação acima.
        source: "/biblia/:versao/:livro+",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
