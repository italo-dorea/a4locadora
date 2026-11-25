/**
 * Padrão de espaçamento ÚNICO do site. Header, todas as seções e o footer usam
 * exatamente estas classes, para que as bordas do conteúdo fiquem alinhadas.
 *   SECAO     = padding da seção (16px nas laterais no mobile, 64px no desktop, 96px em cima e embaixo)
 *   CONTAINER = largura máxima do conteúdo (1280px), centralizado
 */
export const SECAO = "px-4 py-24 md:px-16";
export const SECAO_X = "px-4 md:px-16";
export const CONTAINER = "mx-auto w-full max-w-7xl";

/** Classes compartilhadas. Curva de movimento: ease-fluid (cubic-bezier 0.32, 0.72, 0, 1). */
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-base font-semibold text-white transition-all duration-500 ease-fluid hover:bg-primary-container active:scale-[0.98]";

export const btnGhostOnDark =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-3 py-2 text-base font-semibold text-white transition-all duration-500 ease-fluid hover:bg-white/10 active:scale-[0.98]";

export const EVENTO_SELECAO = "a4:selecionar";

export interface SelecaoFormulario {
  veiculoId?: string;
  planoId?: string;
}

/** Pré seleciona moto ou plano no formulário (botões "Alugue agora" dos cards). */
export function selecionarNoFormulario(detalhe: SelecaoFormulario) {
  window.dispatchEvent(new CustomEvent<SelecaoFormulario>(EVENTO_SELECAO, { detail: detalhe }));
}
