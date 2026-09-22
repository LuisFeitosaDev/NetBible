/**
 * Gera os modelos de e-mail do Supabase em supabase/emails/.
 *
 * Cada arquivo é colado em Authentication → Emails → Templates, no modelo
 * correspondente. As variáveis entre {{ }} são do Supabase e não devem ser
 * traduzidas nem renomeadas.
 *
 * O layout é table-based e com estilo inline de propósito: cliente de e-mail
 * não tem flexbox, grid, nem <style> confiável. A marca é desenhada em HTML
 * puro, sem imagem, porque imagem em e-mail exige URL pública absoluta e
 * costuma vir bloqueada por padrão.
 *
 * Rode com:  npm run emails
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "supabase", "emails");

const FUNDO = "#08080b";
const CARTAO = "#14141b";
const BORDA = "#272733";
const TEXTO = "#ececf2";
const SUAVE = "#8a8a9e";
const OURO = "#f5c45e";

const fonte =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/** Envelope comum: marca, cartão, rodapé. */
function layout({ preheader, titulo, corpo }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<title>${titulo}</title>
</head>
<body style="margin:0;padding:0;background:${FUNDO};">
<!-- Prévia que aparece na lista de e-mails, antes de abrir. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FUNDO};padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">

        <!-- marca -->
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:40px;height:40px;background:${OURO};border-radius:11px;text-align:center;vertical-align:middle;font-family:${fonte};font-size:24px;font-weight:800;color:#0a0a0c;line-height:40px;">G</td>
                <td style="padding-left:11px;font-family:${fonte};text-align:left;">
                  <div style="font-size:17px;font-weight:700;color:${TEXTO};line-height:1.1;">Genipse</div>
                  <div style="font-size:9px;font-weight:700;letter-spacing:2.6px;color:${OURO};line-height:1.4;">BIBLE</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- cartão -->
        <tr>
          <td style="background:${CARTAO};border:1px solid ${BORDA};border-radius:16px;padding:32px;font-family:${fonte};">
            ${corpo}
          </td>
        </tr>

        <!-- rodapé -->
        <tr>
          <td align="center" style="padding-top:22px;font-family:${fonte};font-size:12px;line-height:1.6;color:${SUAVE};">
            Você recebeu este e-mail porque alguém usou este endereço no Genipse Bible.<br>
            Se não foi você, pode ignorar: nada acontece sem clicar no botão acima.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

const h1 = (t) =>
  `<h1 style="margin:0 0 14px;font-size:23px;line-height:1.25;font-weight:800;color:${TEXTO};">${t}</h1>`;

const p = (t, cor = SUAVE) =>
  `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${cor};">${t}</p>`;

/** Botão em table: <a> com padding quebra no Outlook. */
const botao = (rotulo, url) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 20px;">
  <tr>
    <td align="center" style="background:${OURO};border-radius:11px;">
      <a href="${url}" style="display:inline-block;padding:14px 30px;font-family:${fonte};font-size:15px;font-weight:700;color:#0a0a0c;text-decoration:none;">${rotulo}</a>
    </td>
  </tr>
</table>`;

/** Link cru, para quem tem botão bloqueado pelo cliente de e-mail. */
const alternativa = (url) => `
<p style="margin:0;padding-top:18px;border-top:1px solid ${BORDA};font-size:12px;line-height:1.6;color:#6a6a7e;">
  Se o botão não funcionar, copie e cole este endereço no navegador:<br>
  <a href="${url}" style="color:${OURO};word-break:break-all;text-decoration:none;">${url}</a>
</p>`;

/** Código grande, para os fluxos que usam número em vez de link. */
const codigo = (valor) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0;">
  <tr>
    <td align="center" style="background:#0e0e13;border:1px solid ${BORDA};border-radius:12px;padding:20px;font-family:${fonte};font-size:31px;font-weight:800;letter-spacing:9px;color:${OURO};">${valor}</td>
  </tr>
</table>`;

const URL_CONF = "{{ .ConfirmationURL }}";

const MODELOS = [
  {
    arquivo: "confirmacao.html",
    modelo: "Confirm signup",
    preheader: "Confirme seu e-mail e comece a estudar.",
    titulo: "Bem-vindo ao Genipse Bible",
    corpo:
      h1("Bem-vindo ao Genipse&nbsp;Bible") +
      p(
        "Falta um passo. Confirme este endereço e a sua conta fica pronta: suas marcações, anotações e grupos passam a seguir você no celular e no computador.",
      ) +
      botao("Confirmar meu e-mail", URL_CONF) +
      p(
        "Depois disso, dá para criar um grupo, compartilhar o código com a galera e conduzir um estudo etapa por etapa.",
        "#b4b4c6",
      ) +
      alternativa(URL_CONF),
  },
  {
    arquivo: "convite.html",
    modelo: "Invite user",
    preheader: "Você foi convidado para o Genipse Bible.",
    titulo: "Você foi convidado",
    corpo:
      h1("Você foi convidado") +
      p(
        "Alguém convidou <strong style=\"color:#ececf2;\">{{ .Email }}</strong> para o Genipse Bible, onde dá para ler, marcar e estudar a Bíblia em grupo.",
      ) +
      botao("Aceitar o convite", URL_CONF) +
      p("O convite é pessoal e vale só para este endereço.", "#6a6a7e") +
      alternativa(URL_CONF),
  },
  {
    arquivo: "magic-link.html",
    modelo: "Magic Link",
    preheader: "Seu link de entrada no Genipse Bible.",
    titulo: "Seu link de entrada",
    corpo:
      h1("Seu link de entrada") +
      p("Clique para entrar. Não precisa de senha, e o link vale uma vez só.") +
      botao("Entrar no Genipse Bible", URL_CONF) +
      p("Por segurança, ele expira em pouco tempo.", "#6a6a7e") +
      alternativa(URL_CONF),
  },
  {
    arquivo: "troca-email.html",
    modelo: "Change Email Address",
    preheader: "Confirme o seu novo endereço de e-mail.",
    titulo: "Confirme o novo e-mail",
    corpo:
      h1("Confirme o novo e-mail") +
      p(
        "Você pediu para trocar o e-mail da conta de <strong style=\"color:#ececf2;\">{{ .Email }}</strong> para <strong style=\"color:#ececf2;\">{{ .NewEmail }}</strong>.",
      ) +
      botao("Confirmar a troca", URL_CONF) +
      p(
        "Enquanto não confirmar, o endereço antigo continua valendo. Se não foi você quem pediu, ignore este e-mail e troque a sua senha.",
        "#6a6a7e",
      ) +
      alternativa(URL_CONF),
  },
  {
    arquivo: "redefinir-senha.html",
    modelo: "Reset Password",
    preheader: "Crie uma nova senha para a sua conta.",
    titulo: "Redefinir a senha",
    corpo:
      h1("Vamos criar uma senha nova") +
      p("Clique no botão para escolher uma nova senha da sua conta.") +
      botao("Criar nova senha", URL_CONF) +
      p(
        "Se você não pediu isso, pode ignorar este e-mail. A sua senha atual continua valendo e ninguém consegue trocá-la sem este link.",
        "#6a6a7e",
      ) +
      alternativa(URL_CONF),
  },
  {
    arquivo: "reautenticacao.html",
    modelo: "Reauthentication",
    preheader: "Seu código de confirmação.",
    titulo: "Código de confirmação",
    corpo:
      h1("Confirme que é você") +
      p("Use o código abaixo para concluir a operação:") +
      codigo("{{ .Token }}") +
      p("Ele vale por poucos minutos e serve uma vez só.", "#6a6a7e"),
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const m of MODELOS) {
    await writeFile(join(OUT, m.arquivo), layout(m));
  }

  const indice = `# Modelos de e-mail

Gerados por \`npm run emails\`. Não edite estes arquivos à mão: mexa em
[scripts/build-emails.mjs](../../scripts/build-emails.mjs) e rode de novo.

Cole cada um em **Authentication → Emails → Templates**, no modelo indicado.
Ajuste também o **Subject** de cada mensagem:

| Arquivo | Modelo no painel | Assunto sugerido |
| --- | --- | --- |
${MODELOS.map((m) => `| \`${m.arquivo}\` | ${m.modelo} | ${m.titulo} |`).join("\n")}

## Antes de valer para valer

O SMTP embutido do Supabase entrega pouquíssimo, algo como 2 a 3 mensagens por
hora, e só para endereços da própria equipe do projeto. **Em produção ele não
serve.** Configure um SMTP próprio em **Project Settings → Authentication →
SMTP Settings**: Resend, Postmark, SendGrid e Amazon SES têm plano gratuito que
cobre bem um app começando.

Sem SMTP próprio, a confirmação de cadastro trava o usuário: ele cria a conta e
nunca recebe o e-mail. Enquanto não configurar, ou você desliga **Confirm
email**, ou usa só o login com Google, que não depende de e-mail nenhum.

## Sobre um e-mail de boas-vindas separado

O Supabase não manda um "bem-vindo" próprio: quem faz esse papel é o
\`Confirm signup\`, que já está escrito com esse tom. Um e-mail à parte, enviado
depois do cadastro, precisaria de um Database Webhook ou Edge Function na tabela
\`auth.users\`.
`;

  await writeFile(join(OUT, "README.md"), indice);

  console.log(`${MODELOS.length} modelos gerados em supabase/emails/`);
  MODELOS.forEach((m) => console.log(`  ${m.arquivo.padEnd(24)} ${m.modelo}`));
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
