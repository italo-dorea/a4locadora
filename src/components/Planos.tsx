"use client";

import { CheckCircle } from "./icons";
import { Reveal } from "./Reveal";
import { formatarReais, observacaoPlanos, planos } from "@/lib/data";
import { btnPrimary, selecionarNoFormulario } from "@/lib/ui";

export function Planos() {
  return (
    <section id="planos" className="on-dark scroll-mt-24 bg-primary px-4 py-24 text-white md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Planos de Aluguel</h2>
          <p className="mx-auto max-w-2xl text-lg text-primary-fixed">
            Escolha o plano que melhor se encaixa na sua rotina, seja de carro ou de moto.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {planos.map((p, i) => {
            const [inteiro, centavos] = formatarReais(p.valorDia).split(",");
            return (
              <Reveal key={p.id} delay={i * 100}>
                <article className="h-full rounded-2xl bg-surface p-8 text-on-surface shadow-xl">
                  <span
                    className={`mb-4 inline-block rounded-md px-3 py-1 text-xs font-semibold tracking-wider ${
                      i === 0 ? "bg-primary/10 text-primary" : "bg-secondary-container/40 text-on-secondary-container"
                    }`}
                  >
                    {p.etiqueta}
                  </span>
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-primary">
                      {inteiro}
                      <span className="text-base font-normal text-on-surface-variant">,{centavos}/dia</span>
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant">ou {formatarReais(p.valorSemana)} por semana</p>
                  </div>
                  <ul className="mb-8 space-y-3 text-on-surface-variant">
                    {[`Caução de ${formatarReais(p.caucao)} em até ${p.parcelasCaucao}x`, ...p.beneficios].map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <CheckCircle size={20} weight="fill" className="shrink-0 text-primary" aria-hidden /> {b}
                      </li>
                    ))}
                  </ul>
                  <a href="#contato" onClick={() => selecionarNoFormulario({ planoId: p.id })} className={`${btnPrimary} w-full`}>
                    Quero este plano
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-primary-fixed">{observacaoPlanos}</p>
      </div>
    </section>
  );
}
