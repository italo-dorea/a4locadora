import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";
import { btnPrimary, CONTAINER, SECAO } from "@/lib/ui";

export function QuemSomos() {
  return (
    <section id="quem-somos" className={`scroll-mt-24 bg-surface ${SECAO}`}>
      <div className={`${CONTAINER} grid grid-cols-1 items-start gap-16 md:grid-cols-2`}>
        <Reveal>
          <h2 className="text-4xl font-bold text-on-surface md:text-5xl">Quem Somos</h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mb-8 text-lg text-on-surface-variant">
            A A4 Locadora é uma empresa especializada no aluguel de motos para motoboys e motoristas de aplicativos de entrega. Localizada em Salvador e região Metropolitana, nossa missão é oferecer soluções práticas e acessíveis para quem trabalha na linha de frente do delivery, proporcionando segurança, economia e flexibilidade.
          </p>
          <a href="#contato" className={btnPrimary}>
            Alugue agora
            <ArrowRight size={20} weight="bold" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
