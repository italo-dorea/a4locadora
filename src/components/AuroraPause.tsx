"use client";

import { useEffect } from "react";

/** Pausa o gradiente animado das seções escuras quando elas saem da tela (poupa GPU e bateria no celular). */
export function AuroraPause() {
  useEffect(() => {
    const secoes = document.querySelectorAll<HTMLElement>(".aurora-bg");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("aurora-paused", !e.isIntersecting)),
      { rootMargin: "100px 0px" },
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}
