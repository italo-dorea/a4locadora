"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { btnPrimary, CONTAINER, SECAO_X } from "@/lib/ui";

const links = [
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#motos", rotulo: "Motos" },
  { href: "#planos", rotulo: "Planos" },
  { href: "#faq", rotulo: "FAQ" },
  { href: "#videos", rotulo: "Vídeos" },
];

// Atrasos escalonados da revelação dos links (classes literais para o Tailwind enxergar)
const atrasos = ["delay-100", "delay-150", "delay-200", "delay-300", "delay-500", "delay-700"];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState<string>("");

  // Indica a seção atual no menu
  useEffect(() => {
    const secoes = links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setAtivo("#" + e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Trava o scroll com o menu aberto e fecha com Esc
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const linkDesktop = (ativoAgora: boolean) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition-all duration-500 ease-fluid ${
      ativoAgora ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:text-primary"
    }`;

  return (
    <>
      {/* Mesmo padding lateral das seções (SECAO_X) e mesma largura máxima (CONTAINER): a pílula alinha com o conteúdo */}
      <header className={`pointer-events-none fixed inset-x-0 top-0 z-[70] ${SECAO_X}`}>
        <div
          className={`${CONTAINER} pointer-events-auto mt-6 flex items-center justify-between gap-6 rounded-full border border-border-subtle bg-white/80 py-2 pr-2 pl-4 shadow-sm backdrop-blur-xl transition-all duration-700 ease-fluid`}
        >
          <a href="#inicio" aria-label="A4 Locadora, ir para o início" className="shrink-0 rounded-full">
            <Image src="/assets/logo-a4.webp" alt="A4 Locadora" width={640} height={230} className="h-8 w-auto" priority />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} aria-current={ativo === l.href ? "location" : undefined} className={linkDesktop(ativo === l.href)}>
                {l.rotulo}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contato" className={`${btnPrimary} hidden text-sm sm:inline-flex`}>
              Alugue agora
              <ArrowRight size={16} weight="bold" aria-hidden />
            </a>

            {/* Hambúrguer que se transforma em X */}
            <button
              type="button"
              aria-controls="menu-mobile"
              aria-expanded={aberto}
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              onClick={() => setAberto((v) => !v)}
              className="relative h-10 w-10 shrink-0 rounded-full transition-all duration-500 ease-fluid hover:bg-primary/10 active:scale-[0.98] md:hidden"
            >
              <span
                className={`absolute inset-0 m-auto h-0.5 w-5 rounded-full bg-primary transition-all duration-700 ease-fluid ${
                  aberto ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"
                }`}
              />
              <span
                className={`absolute inset-0 m-auto h-0.5 w-5 rounded-full bg-primary transition-all duration-700 ease-fluid ${
                  aberto ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu em tela cheia com vidro pesado */}
      <div
        id="menu-mobile"
        inert={!aberto}
        aria-hidden={!aberto}
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-white/80 px-4 backdrop-blur-3xl transition-all duration-700 ease-fluid md:hidden ${
          aberto ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menu mobile" className="flex flex-col items-center gap-4">
          {links.map((l, i) => (
            <div key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={() => setAberto(false)}
                aria-current={ativo === l.href ? "location" : undefined}
                className={`block text-4xl font-semibold transition-all duration-700 ease-fluid ${
                  ativo === l.href ? "text-primary" : "text-on-surface"
                } ${aberto ? `translate-y-0 opacity-100 ${atrasos[i]}` : "translate-y-12 opacity-0"}`}
              >
                {l.rotulo}
              </a>
            </div>
          ))}
        </nav>
        <div className="overflow-hidden pt-4">
          <a
            href="#contato"
            onClick={() => setAberto(false)}
            className={`${btnPrimary} transition-all duration-700 ${aberto ? `translate-y-0 opacity-100 ${atrasos[5]}` : "translate-y-12 opacity-0"}`}
          >
            Alugue agora
            <ArrowRight size={20} weight="bold" aria-hidden />
          </a>
        </div>
      </div>
    </>
  );
}
