"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nomeVeiculo, veiculos } from "@/lib/data";

/** Carrossel do topo: alterna entre as motos marcadas com destaqueHero em veiculos.json. */
export function HeroCarousel() {
  const itens = veiculos.filter((v) => v.disponivel && v.destaqueHero);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (itens.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndice((i) => (i + 1) % itens.length), 3500);
    return () => clearInterval(t);
  }, [itens.length]);

  if (!itens.length) return null;

  return (
    <>
      <span className="absolute top-6 left-6 z-10 rounded-full border border-border-subtle bg-surface px-4 py-1 text-xs font-semibold tracking-wider text-on-surface-variant shadow-sm">
        {nomeVeiculo(itens[indice]).toUpperCase()}
      </span>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        {itens.map((v, i) => (
          <Image
            key={v.id}
            src={v.imagem}
            alt={v.alt}
            fill
            sizes="(min-width: 1024px) 512px, 90vw"
            priority={i === 0}
            aria-hidden={i !== indice}
            className={`object-contain transition-opacity duration-700 ease-fluid ${i === indice ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </>
  );
}
