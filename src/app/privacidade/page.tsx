import type { Metadata } from "next";
import { Email, PaginaLegal, Secao } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Política de Privacidade · Genipse Bible",
  description: "Quais dados o Genipse Bible guarda, para quê, com quem compartilha e como apagar.",
};

export default function PrivacidadePage() {
  return (
    <PaginaLegal
      titulo="Política de Privacidade"
      resumo="O Genipse Bible é um app para ler, marcar e estudar a Bíblia, sozinho ou em grupo. Guardamos só o que o app precisa para funcionar, não vendemos dados, não mostramos anúncios e não usamos rastreamento de terceiros."
    >
      <Secao titulo="1. O que fica só no seu aparelho">
        <p>
          Sem criar conta, a leitura funciona inteira no seu aparelho: marcações, comentários,
          capítulos lidos, lista de favoritos e preferências (tradução, tema, fonte) ficam
          guardados no armazenamento do próprio navegador. Esses dados não saem do aparelho
          enquanto você não usar os recursos em nuvem descritos abaixo.
        </p>
      </Secao>

      <Secao titulo="2. O que guardamos na nuvem">
        <p>Quando você usa grupos, planos de leitura ou cria uma conta, guardamos:</p>
        <ul>
          <li>
            <strong>Conta:</strong> seu e-mail e senha (a senha é guardada cifrada pelo nosso
            provedor de autenticação, nunca em texto). Se você entrar com o Google, recebemos do
            Google seu nome, e-mail e foto de perfil; usamos o nome e o e-mail.
          </li>
          <li>
            <strong>Perfil:</strong> o nome que aparece para os outros membros dos seus grupos.
          </li>
          <li>
            <strong>Leitura:</strong> marcações, comentários, capítulos lidos e favoritos, para
            sincronizar entre os seus aparelhos.
          </li>
          <li>
            <strong>Planos de leitura:</strong> o plano escolhido, o progresso e os dias em que a
            meta foi cumprida.
          </li>
          <li>
            <strong>Grupos:</strong> os grupos de que você participa, suas respostas nos estudos,
            reações e o mural do grupo de leitura (versículos grifados que você compartilha, metas
            batidas, cutucadas e entradas no grupo).
          </li>
          <li>
            <strong>Notificações:</strong> se você permitir avisos, o endereço técnico que o seu
            navegador cria para receber notificações deste app.
          </li>
        </ul>
        <p>
          Para os recursos em nuvem funcionarem sem cadastro, o app cria uma sessão anônima,
          identificada só por um código aleatório. Ao criar uma conta, essa sessão vira a sua
          conta e os dados vêm junto.
        </p>
      </Secao>

      <Secao titulo="3. Quem vê o quê">
        <p>
          Os membros de um grupo veem o seu nome, o seu progresso no plano do grupo, os grifos que
          você compartilha no mural e as respostas que você dá nos estudos daquele grupo. Seus
          comentários pessoais e as marcações que você não compartilha não aparecem para ninguém.
          Nada disso é público fora dos seus grupos.
        </p>
      </Secao>

      <Secao titulo="4. Com quem compartilhamos">
        <p>Usamos serviços de terceiros que processam dados em nosso nome, apenas para o app funcionar:</p>
        <ul>
          <li>
            <strong>Supabase:</strong> banco de dados, autenticação e armazenamento de imagens.
          </li>
          <li>
            <strong>Vercel:</strong> hospedagem do site e do app.
          </li>
          <li>
            <strong>Google:</strong> login com a conta Google, quando você escolhe essa opção.
          </li>
          <li>
            <strong>Anthropic:</strong> quando o líder de um grupo pede um estudo gerado por
            inteligência artificial, enviamos o tema, o método e as preferências do estudo. Não
            enviamos seu nome, e-mail nem suas anotações.
          </li>
          <li>
            <strong>Serviços de notificação do seu navegador</strong> (Google, Apple ou Mozilla):
            entregam os avisos do grupo no seu aparelho.
          </li>
        </ul>
        <p>Não vendemos, alugamos nem cedemos seus dados para publicidade.</p>
      </Secao>

      <Secao titulo="5. Armazenamento local e cookies">
        <p>
          O app usa o armazenamento do navegador para guardar sua sessão, suas preferências e o
          conteúdo para leitura offline. Não usamos cookies de publicidade nem ferramentas de
          análise de comportamento.
        </p>
      </Secao>

      <Secao titulo="6. Segurança">
        <p>
          A comunicação é sempre criptografada (HTTPS). No banco de dados, cada pessoa só
          consegue ler e alterar os próprios dados e, dentro de um grupo, apenas o que foi
          compartilhado com o grupo.
        </p>
      </Secao>

      <Secao titulo="7. Por quanto tempo guardamos">
        <p>
          Guardamos seus dados enquanto sua conta existir. Quando um grupo é apagado, o mural dele
          é apagado junto. Os dados que ficam só no aparelho saem quando você limpa os dados do
          navegador ou desinstala o app.
        </p>
      </Secao>

      <Secao titulo="8. Seus direitos e como apagar seus dados">
        <p>
          Pela Lei Geral de Proteção de Dados (LGPD), você pode pedir acesso, correção, cópia ou
          exclusão dos seus dados a qualquer momento. Para apagar sua conta e tudo o que está
          ligado a ela, escreva para <Email /> a partir do e-mail da conta. Atendemos em até 15
          dias.
        </p>
        <p>
          Você também pode, direto no app, apagar marcações e comentários, sair de grupos, trocar o
          nome do perfil e desligar as notificações nas configurações do navegador ou do celular.
        </p>
      </Secao>

      <Secao titulo="9. Crianças">
        <p>
          O app pode ser usado por pessoas de qualquer idade, mas menores de 13 anos só devem criar
          conta ou entrar em grupos com autorização dos pais ou responsáveis.
        </p>
      </Secao>

      <Secao titulo="10. Mudanças e contato">
        <p>
          Se esta política mudar, a data no topo da página será atualizada. Dúvidas ou pedidos
          sobre seus dados: <Email />.
        </p>
      </Secao>
    </PaginaLegal>
  );
}
