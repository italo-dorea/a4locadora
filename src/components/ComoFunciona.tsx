import { Bolt, SlidersHorizontal, Wrench } from "./icons";
import { Reveal } from "./Reveal";
import { CONTAINER, SECAO } from "@/lib/ui";

export function ComoFunciona() {
  const itens = [
    {
      Icone: SlidersHorizontal,
      titulo: "Flexibilidade",
      texto: (
        <>
          Escolha entre os nossos planos <strong className="font-semibold text-white">Anual</strong> e <strong className="font-semibold text-white">Minha Moto</strong>.
        </>
      ),
    },
    { Icone: Bolt, titulo: "Praticidade", texto: <>Alugue de forma rápida e online.</> },
    {
      Icone: Wrench,
      titulo: "Manutenção dividida",
      texto: <>Nada de susto com manutenção. A responsabilidade é compartilhada e você sempre sabe com o que contar.</>,
    },
  ];

  return (
    <section id="como-funciona" className={`on-dark scroll-mt-24 bg-ink-900 text-white ${SECAO}`}>
      <div className={CONTAINER}>
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Como Funciona</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {itens.map(({ Icone, titulo, texto }, i) => (
            <Reveal key={titulo} delay={i * 100}>
              <article className="h-full rounded-2xl border border-ink-700 bg-ink-800 p-8 transition-all duration-500 ease-fluid hover:border-primary/50">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary-fixed">
                  <Icone size={28} aria-hidden />
                </div>
                <h3 className="mb-3 text-xl font-bold">{titulo}</h3>
                <p className="text-base text-white/70">{texto}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
