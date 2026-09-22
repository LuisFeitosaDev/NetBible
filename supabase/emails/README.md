# Modelos de e-mail

Gerados por `npm run emails`. Não edite estes arquivos à mão: mexa em
[scripts/build-emails.mjs](../../scripts/build-emails.mjs) e rode de novo.

Cole cada um em **Authentication → Emails → Templates**, no modelo indicado.
Ajuste também o **Subject** de cada mensagem:

| Arquivo | Modelo no painel | Assunto sugerido |
| --- | --- | --- |
| `confirmacao.html` | Confirm signup | Bem-vindo ao Genipse Bible |
| `convite.html` | Invite user | Você foi convidado |
| `magic-link.html` | Magic Link | Seu link de entrada |
| `troca-email.html` | Change Email Address | Confirme o novo e-mail |
| `redefinir-senha.html` | Reset Password | Redefinir a senha |
| `reautenticacao.html` | Reauthentication | Código de confirmação |

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
`Confirm signup`, que já está escrito com esse tom. Um e-mail à parte, enviado
depois do cadastro, precisaria de um Database Webhook ou Edge Function na tabela
`auth.users`.
