/**
 * Tema visual da tela de leitura: escuro (padrão) ou claro.
 *
 * Existe só aqui porque é usado pelo leitor e pelo controle que o troca, e os
 * dois precisam concordar sobre a chave de preferência e o valor padrão.
 * Não afeta o resto do app: fora do leitor a interface continua sempre escura.
 */
export type TemaLeitura = "escuro" | "claro";

export const CHAVE_TEMA_LEITURA = "temaLeitura";
export const TEMA_LEITURA_PADRAO: TemaLeitura = "escuro";
