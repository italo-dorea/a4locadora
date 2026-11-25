"use client";

import Image from "next/image";
import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";
import { nomeVeiculo, veiculos } from "@/lib/data";
import { btnPrimary, CONTAINER, SECAO, selecionarNoFormulario } from "@/lib/ui";

export function Frota() {
  return (
    <section id="motos" className={`scroll-mt-24 bg-surface-gray ${SECAO}`}>
      <div className={CONTAINER}>
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-on-surface md:text-5xl">Nossa Frota</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {veiculos.map((v, i) => (
            <Reveal key={v.id} delay={i * 100}>
              <article className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-8 shadow-sm transition-all duration-500 ease-fluid hover:shadow-md">
                <div className="relative mb-6 aspect-[3/2] w-full overflow-hidden rounded-xl bg-surface-gray">
                  <Image
                    src={v.imagem}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 768px) 560px, 90vw"
                    className="object-contain p-4 transition-transform duration-700 ease-fluid group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-6 text-2xl font-bold text-on-surface">{nomeVeiculo(v)}</h3>
                <a
                  href="#contato"
                  onClick={() => selecionarNoFormulario({ veiculoId: v.id })}
                  className={`${btnPrimary} mt-auto self-start`}
                >
                  Alugue agora
                  <ArrowRight size={20} weight="bold" aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
