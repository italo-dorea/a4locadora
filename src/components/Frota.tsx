"use client";

import Image from "next/image";
import { useState } from "react";
import { Car, CheckCircle, Motorcycle, SquaresFour } from "./icons";
import { Reveal } from "./Reveal";
import { nomeVeiculo, veiculos } from "@/lib/data";
import { selecionarNoFormulario } from "@/lib/ui";

type Filtro = "todos" | "carro" | "moto";

const filtros = [
  { id: "todos", rotulo: "Todos", Icone: SquaresFour },
  { id: "carro", rotulo: "Carros", Icone: Car },
  { id: "moto", rotulo: "Motos", Icone: Motorcycle },
] as const;

export function Frota() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const lista = veiculos.filter((v) => filtro === "todos" || v.tipo === filtro);

  return (
    <section id="frota" className="scroll-mt-24 bg-surface-gray px-4 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-on-surface md:text-4xl">Nossa Frota</h2>
            <p className="text-lg text-on-surface-variant">Carros e motos revisados e prontos para o seu dia a dia.</p>
          </div>
          <div role="group" aria-label="Filtrar frota" className="flex items-center gap-2 self-start rounded-full border border-border-subtle bg-surface p-1 md:self-auto">
            {filtros.map(({ id, rotulo, Icone }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filtro === id}
                onClick={() => setFiltro(id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-500 ease-fluid active:scale-[0.98] ${
                  filtro === id ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-gray"
                }`}
              >
                <Icone size={18} aria-hidden /> {rotulo}
              </button>
            ))}
          </div>
        </Reveal>

        {lista.length === 0 ? (
          <div className="rounded-2xl border border-border-subtle bg-surface p-8 text-center text-on-surface-variant">
            Nenhum veículo desta categoria no momento. Fale com a nossa equipe pelo formulário de contato.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {lista.map((v, i) => (
              <Reveal key={v.id} delay={(i % 2) * 100}>
                <article className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm transition-all duration-500 ease-fluid hover:shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-block rounded-md px-3 py-1 text-xs font-semibold tracking-wider ${
                        v.disponivel ? "bg-secondary-container text-on-secondary-container" : "bg-surface-variant text-on-surface-variant"
                      }`}
                    >
                      {v.disponivel ? "DISPONÍVEL" : "INDISPONÍVEL"}
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-on-surface-variant">{v.cor.toUpperCase()}</span>
                  </div>
                  <div className="relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-lg bg-surface-gray p-4">
                    <Image
                      src={v.imagem}
                      alt={v.alt}
                      fill
                      sizes="(min-width: 768px) 560px, 90vw"
                      className="object-contain p-4 transition-transform duration-700 ease-fluid group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-on-surface">{nomeVeiculo(v)}</h3>
                  <ul className="mb-6 space-y-2 text-sm text-on-surface-variant">
                    {v.caracteristicas.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <CheckCircle size={16} weight="fill" className="shrink-0 text-primary" aria-hidden /> {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <div className="mb-4 h-px w-full bg-border-subtle" />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-on-surface-variant">Consulte disponibilidade</p>
                      <a
                        href="#contato"
                        onClick={() => selecionarNoFormulario({ veiculoId: v.id })}
                        className="rounded-md text-sm font-semibold text-primary transition-all duration-500 ease-fluid hover:underline active:scale-[0.98]"
                      >
                        Reservar
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-on-surface-variant">
          Indique sua preferência de modelo no formulário de contato — faremos o possível com base na disponibilidade da frota.
        </p>
      </div>
    </section>
  );
}
