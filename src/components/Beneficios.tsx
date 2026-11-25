import { Bolt, SlidersHorizontal, Wrench } from "./icons";
import { Reveal } from "./Reveal";

const beneficios = [
  {
    Icone: SlidersHorizontal,
    titulo: "Flexibilidade",
    texto: "Escolha entre o Plano Anual e o Plano Minha Moto, com condições que se encaixam na sua rotina.",
  },
  {
    Icone: Bolt,
    titulo: "Praticidade",
    texto: "Aluguel rápido e 100% online. Você resolve tudo sem sair de casa e já sai rodando.",
  },
  {
    Icone: Wrench,
    titulo: "Manutenção Compartilhada",
    texto: "Nada de susto com manutenção. A responsabilidade é compartilhada entre você e a A4.",
  },
];

export function Beneficios() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-900 px-4 py-24 text-white md:px-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Por que escolher a A4?</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {beneficios.map(({ Icone, titulo, texto }, i) => (
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
