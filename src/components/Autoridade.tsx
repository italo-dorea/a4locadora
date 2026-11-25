import { ArrowRight, Quotes, ShieldCheck, ThumbsUp, User } from "./icons";
import { Reveal } from "./Reveal";
import { btnPrimary } from "@/lib/ui";

export function Autoridade() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-900 px-4 py-24 text-white md:px-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Segurança, economia e flexibilidade.</h2>
            <p className="mb-8 text-lg text-white/70">
              A A4 Locadora é especializada em aluguel de carros e motos em Salvador e Região Metropolitana, para quem trabalha com entregas, aplicativos de transporte ou só precisa de um veículo no dia a dia. Nossa missão é oferecer soluções práticas e acessíveis para você rodar sem dor de cabeça.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <ThumbsUp size={24} aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Aprovação Rápida</h3>
                  <p className="text-white/70">Processo simplificado e 100% online, direto pelo WhatsApp.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <ShieldCheck size={24} aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Seguro Incluso</h3>
                  <p className="text-white/70">Todas as motos contam com seguro contra roubo e furto. Proteções adicionais disponíveis.</p>
                </div>
              </div>
            </div>
            <a href="#contato" className={`${btnPrimary} mt-8`}>
              Alugue Agora
              <ArrowRight size={20} weight="bold" aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={150} className="mt-8 md:mt-0">
            <figure className="relative rounded-2xl bg-surface p-8 text-on-surface shadow-xl">
              <Quotes size={64} weight="fill" className="absolute -top-6 -left-4 text-surface-variant" aria-hidden />
              <blockquote className="relative z-10 mb-6 text-lg text-on-surface-variant">
                &quot;Aluguei um carro com a A4 pra rodar de aplicativo e depois troquei por uma moto quando mudei de rotina. Não precisei me preocupar com manutenção pesada nem com burocracia — foi tudo resolvido rápido, pelo WhatsApp.&quot;
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-white">
                  <User size={28} aria-hidden />
                </div>
                <div>
                  <p className="font-bold">Parceiro A4</p>
                  <p className="text-sm text-on-surface-variant">Cliente A4 Locadora</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
