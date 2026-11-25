"use client";

import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";
import { formatarReais, notaPlanos, planos } from "@/lib/data";
import { btnPrimary, CONTAINER, SECAO, selecionarNoFormulario } from "@/lib/ui";

export function Planos() {
  return (
    <section id="planos" className={`on-dark scroll-mt-24 bg-primary text-white ${SECAO}`}>
      <div className={CONTAINER}>
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Planos</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {planos.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <article className="flex h-full flex-col rounded-2xl bg-surface p-8 text-on-surface shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <h3 className="text-2xl font-bold">{p.nome}</h3>
                  {p.subtitulo && (
                    <span className="rounded-md bg-secondary-container/40 px-3 py-1 text-xs font-semibold tracking-wider text-on-secondary-container">
                      {p.subtitulo}
                    </span>
                  )}
                </div>
                <p className="text-sm text-on-surface-variant">Diária a partir de</p>
                <p className="mb-2 text-5xl font-bold text-primary">{formatarReais(p.valorDia)}</p>
                <p className="mb-6 text-base text-on-surface-variant">Valor semanal: {formatarReais(p.valorSemana)}</p>
                <p className="mb-8 text-base font-semibold">
                  Caução de {formatarReais(p.caucao)} em até {p.parcelasCaucao}x
                </p>
                <a
                  href="#contato"
                  onClick={() => selecionarNoFormulario({ planoId: p.id })}
                  className={`${btnPrimary} mt-auto w-full`}
                >
                  Alugue agora
                  <ArrowRight size={20} weight="bold" aria-hidden />
                </a>
                <p className="mt-4 text-xs text-on-surface-variant">{notaPlanos}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
