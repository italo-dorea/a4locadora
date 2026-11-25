import { ArrowRight, Bolt, Car, PiggyBank, ShieldCheck, Wrench } from "./icons";
import { HeroCarousel } from "./HeroCarousel";
import { Reveal } from "./Reveal";
import { btnGhostOnDark, btnPrimary } from "@/lib/ui";

export function Hero() {
  return (
    <section id="inicio" className="on-dark relative overflow-hidden bg-ink-900 px-4 pt-24 pb-24 md:px-16">
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="z-10">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-4 py-1 text-xs font-semibold tracking-wider text-primary-fixed-dim">
              <Car size={16} aria-hidden />
              <span className="text-balance">CARROS E MOTOS PRA QUEM PRECISA RODAR TODO DIA</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="hero-heading mb-6 max-w-[680px] text-5xl font-bold tracking-tight md:text-6xl">
              <span className="block">O carro ou a moto certa,</span>
              <span className="block">sem complicar sua vida.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mb-10 max-w-[680px] text-lg text-white/70">
              Alugamos carros e motos em Salvador e Região Metropolitana para quem trabalha com entregas, aplicativos de transporte ou só precisa de um veículo todos os dias. Você escolhe, a gente resolve — rápido, online e com planos que cabem no seu bolso.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#contato" className={btnPrimary}>
                Alugue Agora
                <ArrowRight size={20} weight="bold" aria-hidden />
              </a>
              <a href="#planos" className={btnGhostOnDark}>
                Ver Planos
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4" aria-hidden>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink-900 bg-primary-container text-white">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink-900 bg-primary-container text-white">
                  <Wrench size={24} />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink-900 bg-primary text-white">
                  <Bolt size={24} />
                </div>
              </div>
              <div className="text-sm text-white/70">
                <span className="font-bold text-white">Seguro incluso</span> em todos os veículos
                <br />
                <span className="mt-1 flex items-center">Aluguel 100% online, sem burocracia</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative z-10 flex items-center justify-center lg:h-[600px]">
          <div className="relative flex aspect-square w-full max-w-lg flex-col items-center justify-center rounded-2xl border border-border-subtle bg-white/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <HeroCarousel />
            <div className="absolute right-4 -bottom-6 flex items-center gap-3 rounded-xl border border-border-subtle bg-surface p-4 shadow-lg md:-right-6">
              <div className="rounded-lg bg-secondary-container/30 p-2 text-on-secondary-container">
                <PiggyBank size={24} aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider text-on-surface-variant">MANUTENÇÃO INCLUSA</p>
                <p className="font-bold text-on-surface">Menos gasto, mais lucro no fim do mês</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
