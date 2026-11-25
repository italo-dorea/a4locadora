"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react/ssr";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/data";
import { CONTAINER, SECAO } from "@/lib/ui";

/** Vídeo do YouTube: nada é carregado do YouTube até o clique (privacidade e desempenho). */
export function Videos() {
  const [tocando, setTocando] = useState(false);
  const { id, titulo } = siteConfig.video;

  return (
    <section id="videos" className={`on-dark scroll-mt-24 bg-ink-900 text-white ${SECAO}`}>
      <div className={CONTAINER}>
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Vídeos</h2>
        </Reveal>
        <Reveal delay={100} className="mx-auto max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink-700 bg-ink-800">
            {tocando ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                title={titulo}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setTocando(true)}
                aria-label={`Assistir ao vídeo: ${titulo}`}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 transition-all duration-500 ease-fluid hover:bg-ink-700"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white transition-all duration-500 ease-fluid group-hover:scale-110 group-active:scale-[0.98]">
                  <Play size={28} weight="fill" aria-hidden />
                </span>
                <span className="max-w-[680px] text-center text-lg font-semibold">{titulo}</span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
