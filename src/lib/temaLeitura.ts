/**
 * Aparência da tela de leitura: fundo (escuro, claro ou papel) e fonte.
 *
 * Existe só aqui porque é usado pelo leitor e pelo controle que o troca, e os
 * dois precisam concordar sobre a chave de preferência e o valor padrão.
 * Não afeta o resto do app: fora do leitor a interface continua sempre escura.
 */
export type TemaLeitura = "escuro" | "claro" | "papel";

export const CHAVE_TEMA_LEITURA = "temaLeitura";
export const TEMA_LEITURA_PADRAO: TemaLeitura = "escuro";

/** Claro e papel são fundos claros: texto escuro, halo mais fraco. */
export const temaEhClaro = (t: TemaLeitura) => t !== "escuro";

export type FonteLeitura = "lora" | "literata" | "atkinson" | "inter";

export const CHAVE_FONTE_LEITURA = "fonteLeitura";
export const FONTE_LEITURA_PADRAO: FonteLeitura = "lora";

export const FONTES_DE_LEITURA: { id: FonteLeitura; rotulo: string; familia: string }[] = [
  { id: "lora", rotulo: "Clássica", familia: "var(--font-lora), Georgia, serif" },
  { id: "literata", rotulo: "Livro", familia: "var(--font-literata), Georgia, serif" },
  { id: "atkinson", rotulo: "Legível", familia: "var(--font-atkinson), system-ui, sans-serif" },
  { id: "inter", rotulo: "Moderna", familia: "var(--font-inter), system-ui, sans-serif" },
];
