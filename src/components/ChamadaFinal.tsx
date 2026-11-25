import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";
import { Tagline } from "./Tagline";
import { btnPrimary, CONTAINER, SECAO } from "@/lib/ui";

/** Momento de tipografia grande ("Pronto para começar?") com revelação palavra por palavra. */
export function ChamadaFinal() {
  return (
    <section aria-label="Pronto para começar?" className={`on-dark bg-ink-0 ${SECAO}`}>
      <div className={CONTAINER}>
        <Tagline texto="Pronto para começar? Escolha seu plano e alugue sua moto agora!" />
        <Reveal className="mt-10">
          <a href="#contato" className={btnPrimary}>
            Alugue agora
            <ArrowRight size={20} weight="bold" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
