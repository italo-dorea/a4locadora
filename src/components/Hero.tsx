import { ArrowRight } from "./icons";
import { HeroCarousel } from "./HeroCarousel";
import { Reveal } from "./Reveal";
import { btnPrimary, CONTAINER, SECAO } from "@/lib/ui";

export function Hero() {
  return (
    <section id="inicio" className={`on-dark relative overflow-hidden bg-ink-900 ${SECAO}`}>
      {/* mt-20 reserva o espaço do header flutuante (24px de margem + 56px da pílula), para o padding da seção ser igual ao das demais */}
      <div className={`${CONTAINER} mt-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2`}>
        <div className="z-10">
          <Reveal delay={100}>
            <h1 className="hero-heading mb-6 max-w-[680px] text-4xl font-bold tracking-tight md:text-6xl">
              <span className="block">ESTAMOS AQUI PARA</span>
              <span className="block">FACILITAR A SUA VIDA!</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mb-10 max-w-[680px] text-lg text-white/70">
              Nosso objetivo é facilitar a vida dos profissionais de entrega, ajudando-os a focar no que realmente importa: realizar suas entregas com tranquilidade e eficiência. Com uma frota moderna e diversificada oferecendo planos de locação que se ajustam ao seu dia a dia.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a href="#contato" className={btnPrimary}>
              Alugue agora
              <ArrowRight size={20} weight="bold" aria-hidden />
            </a>
          </Reveal>
        </div>

        <Reveal delay={200} className="flex items-center justify-center">
          <div className="relative flex aspect-square w-full max-w-lg flex-col items-center justify-center rounded-2xl border border-border-subtle bg-white/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <HeroCarousel />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
