import faq from "@/data/faq.json";
import { CaretDown } from "./icons";
import { Reveal } from "./Reveal";

const perguntas = faq.perguntas;
const metade = Math.ceil(perguntas.length / 2);
const colunas = [perguntas.slice(0, metade), perguntas.slice(metade)];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-surface-gray px-4 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-on-surface md:text-4xl">Perguntas Frequentes</h2>
          <p className="text-lg text-on-surface-variant">Tudo o que você precisa saber antes de alugar sua moto com a A4.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
          {colunas.map((coluna, c) => (
            <div key={c} className="space-y-3">
              {coluna.map((item, i) => (
                <Reveal key={item.pergunta} delay={i * 50}>
                  {/* name="faq" faz o navegador manter só uma pergunta aberta */}
                  <details {...{ name: "faq" }} open={c === 0 && i === 0} className="group rounded-xl border border-border-subtle bg-surface p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md font-bold text-on-surface">
                      {item.pergunta}
                      <CaretDown size={20} weight="bold" className="shrink-0 text-primary transition-transform duration-500 ease-fluid group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="mt-3 text-on-surface-variant">{item.resposta}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
