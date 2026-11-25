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

/** Pré seleciona veículo ou plano no formulário de contato (botões Reservar e Quero este plano). */
export function selecionarNoFormulario(detalhe: SelecaoFormulario) {
  window.dispatchEvent(new CustomEvent<SelecaoFormulario>(EVENTO_SELECAO, { detail: detalhe }));
}
