import type { Metadata } from "next";
import Link from "next/link";
import { Email, PaginaLegal, Secao } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Termos de Uso · Genipse Bible",
  description: "As regras de uso do Genipse Bible.",
};

export default function TermosPage() {
  return (
    <PaginaLegal
      titulo="Termos de Uso"
      resumo="Ao usar o Genipse Bible, você concorda com estes termos. Eles são curtos de propósito: o app é gratuito e feito para ajudar a ler e estudar a Bíblia."
    >
      <Secao titulo="1. O serviço">
        <p>
          O Genipse Bible oferece leitura da Bíblia em diferentes traduções, marcações,
          comentários, planos de leitura, grupos de leitura e grupos de estudo. O uso é gratuito e
          parte dele funciona sem conta e sem internet.
        </p>
      </Secao>

      <Secao titulo="2. Sua conta">
        <p>
          Você é responsável pela sua conta e pelo que é feito com ela. Use um nome que os membros
          dos seus grupos reconheçam e não se passe por outra pessoa. Se perceber uso indevido da
          sua conta, avise pelo contato abaixo.
        </p>
      </Secao>

      <Secao titulo="3. Convivência nos grupos">
        <p>Nos grupos, o que você publica é visto pelos outros membros. Não é permitido:</p>
        <ul>
          <li>ofender, ameaçar, assediar ou discriminar outras pessoas;</li>
          <li>publicar conteúdo ilegal, sexual, violento ou que viole direitos de terceiros;</li>
          <li>usar o app para spam, propaganda ou coleta de dados de outros membros.</li>
        </ul>
        <p>
          Podemos remover conteúdo e suspender contas que violem estas regras. Para denunciar um
          abuso, use o contato abaixo.
        </p>
      </Secao>

      <Secao titulo="4. Conteúdo do app">
        <ul>
          <li>
            As traduções da Bíblia pertencem aos seus respectivos detentores de direitos e são
            oferecidas para leitura pessoal. Não é permitido copiar o texto em massa a partir do app.
          </li>
          <li>
            As imagens dos capítulos são obras em domínio público ou sob licença livre, com o
            crédito de cada autor indicado no app.
          </li>
          <li>
            Resumos, fichas e estudos são material de apoio. Estudos gerados por inteligência
            artificial podem conter erros: confira sempre com o texto bíblico e, se precisar, com
            a sua liderança.
          </li>
        </ul>
      </Secao>

      <Secao titulo="5. O que é seu">
        <p>
          Suas marcações, comentários e respostas continuam sendo seus. Você nos autoriza a
          guardá-los e a mostrá-los aos membros dos grupos com quem você escolher compartilhar,
          apenas para o app funcionar.
        </p>
      </Secao>

      <Secao titulo="6. Disponibilidade e responsabilidade">
        <p>
          Fazemos o possível para o app funcionar bem, mas ele é oferecido como está, sem garantia
          de funcionamento contínuo ou livre de falhas. Recursos podem mudar ou sair do ar. Não nos
          responsabilizamos por perdas decorrentes de indisponibilidade ou de dados guardados só no
          aparelho e apagados pelo usuário ou pelo navegador.
        </p>
      </Secao>

      <Secao titulo="7. Privacidade">
        <p>
          O tratamento dos seus dados está descrito na{" "}
          <Link href="/privacidade" className="text-gold-400 hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </Secao>

      <Secao titulo="8. Encerramento">
        <p>
          Você pode parar de usar o app a qualquer momento e pedir a exclusão da sua conta pelo
          contato abaixo.
        </p>
      </Secao>

      <Secao titulo="9. Mudanças, lei e contato">
        <p>
          Estes termos podem ser atualizados; a data no topo mostra a versão em vigor. Eles seguem
          as leis do Brasil. Contato: <Email />.
        </p>
      </Secao>
    </PaginaLegal>
  );
}
