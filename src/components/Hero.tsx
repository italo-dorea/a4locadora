import type { CSSProperties } from "react";
import { ArrowRight } from "./icons";
import { HeroCarousel } from "./HeroCarousel";
import { btnPrimary, CONTAINER, SECAO } from "@/lib/ui";

/**
 * O hero é o LCP da página. Por isso NÃO usa a revelação com opacidade 0 e JavaScript (que atrasaria
 * o primeiro desenho do título e da imagem): a entrada é só CSS e só move o bloco, sem esconder.
 */
const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="inicio" className={`on-dark aurora-bg relative overflow-hidden bg-ink-900 ${SECAO}`}>
      {/* mt-20 reserva o espaço do header flutuante (24px de margem + 56px da pílula), para o padding da seção ser igual ao das demais */}
      <div className={`${CONTAINER} mt-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2`}>
        <div className="z-10">
          <p className="entrada mb-6 inline-flex rounded-full border border-primary/40 bg-primary/20 px-4 py-1 text-xs font-semibold tracking-wider text-primary-fixed-dim uppercase" style={atraso(0)}>
            <span className="text-balance">Aluguel de motos em Salvador e região metropolitana</span>
          </p>
          <h1 className="hero-heading entrada mb-6 max-w-[680px] text-4xl font-bold tracking-tight md:text-6xl" style={atraso(100)}>
            <span className="block">ESTAMOS AQUI PARA</span>
            <span className="block">FACILITAR A SUA VIDA!</span>
          </h1>
          <p className="entrada mb-10 max-w-[680px] text-lg text-white/70" style={atraso(200)}>
            Nosso objetivo é facilitar a vida dos profissionais de entrega, ajudando-os a focar no que realmente importa: realizar suas entregas com tranquilidade e eficiência. Com uma frota moderna e diversificada oferecendo planos de locação que se ajustam ao seu dia a dia.
          </p>
          <div className="entrada" style={atraso(300)}>
            <a href="#contato" className={btnPrimary}>
              Alugue agora
              <ArrowRight size={20} weight="bold" aria-hidden />
            </a>
          </div>
        </div>

        <div className="entrada flex items-center justify-center" style={atraso(200)}>
          <div className="relative flex aspect-square w-full max-w-lg flex-col items-center justify-center rounded-2xl border border-border-subtle bg-white/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
