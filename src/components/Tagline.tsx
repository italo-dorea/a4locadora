"use client";

import { useEffect, useRef } from "react";

/**
 * Seção de tagline: cada palavra sai do tom apagado (30%) para o texto pleno,
 * em ordem de leitura, ao cruzar uma linha de gatilho na tela (IntersectionObserver por palavra).
 */
export function Tagline({ texto }: { texto: string }) {
  const palavras = texto.split(" ");
  const raiz = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s.setAttribute("data-on", "true"));
      return;
    }
    // Linha de gatilho a 60% da altura da tela: palavras que a cruzam (ou já ficaram acima dela) acendem.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const acima = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          (entry.target as HTMLElement).setAttribute("data-on", entry.isIntersecting || acima ? "true" : "false");
        }
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 },
    );
    spans.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <p ref={raiz} className="mx-auto max-w-[680px] text-4xl font-semibold text-white md:text-5xl">
      {palavras.map((p, i) => (
        <span key={i}>
          <span
            data-word
            className="inline-block opacity-30 transition-opacity duration-700 ease-fluid data-[on=true]:opacity-100 motion-reduce:transition-none"
          >
            {p}
          </span>
          {i < palavras.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
