import Image from "next/image";
import { ChatCircle, Envelope, InstagramLogo, MapPin, YoutubeLogo } from "./icons";
import { siteConfig } from "@/lib/data";

const linkClass =
  "rounded-md text-base text-white/70 underline-offset-4 transition-all duration-500 ease-fluid hover:text-primary-fixed-dim hover:underline";

export function Footer() {
  return (
    <footer className="on-dark w-full bg-ink-0 px-4 text-white md:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="self-start rounded-lg bg-white p-2">
            <Image src="/assets/logo-a4.webp" alt="A4 Locadora" width={640} height={230} className="h-8 w-auto" />
          </div>
          <p className="mt-2 text-base text-white/70">
            Aluguel de carros e motos em Salvador e Região Metropolitana, para quem trabalha ou precisa rodar todos os dias.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a aria-label="Instagram" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="rounded-md text-white/70 transition-all duration-500 ease-fluid hover:text-primary-fixed-dim">
              <InstagramLogo size={24} aria-hidden />
            </a>
            <a aria-label="YouTube" href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className="rounded-md text-white/70 transition-all duration-500 ease-fluid hover:text-primary-fixed-dim">
              <YoutubeLogo size={24} aria-hidden />
            </a>
          </div>
        </div>
        <nav aria-label="Links rápidos">
          <h2 className="mb-4 text-sm font-semibold text-white">Links Rápidos</h2>
          <ul className="flex flex-col gap-3">
            <li><a className={linkClass} href="#frota">Nossa Frota</a></li>
            <li><a className={linkClass} href="#planos">Planos de Aluguel</a></li>
            <li><a className={linkClass} href="#faq">Dúvidas Frequentes</a></li>
          </ul>
        </nav>
        <nav aria-label="Suporte">
          <h2 className="mb-4 text-sm font-semibold text-white">Suporte</h2>
          <ul className="flex flex-col gap-3">
            <li><a className={linkClass} href="#faq">Central de Ajuda</a></li>
            <li><a className={linkClass} href="#contato">Contato Suporte</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 text-sm font-semibold text-white">Atendimento</h2>
          <div className="mb-2 flex items-start gap-2 text-white/70">
            <ChatCircle size={16} className="mt-1 shrink-0" aria-hidden />
            <a className={linkClass} href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">{siteConfig.telefoneExibicao}</a>
          </div>
          <div className="mb-2 flex items-start gap-2 text-white/70">
            <Envelope size={16} className="mt-1 shrink-0" aria-hidden />
            <a className={linkClass} href={`mailto:${siteConfig.emailContato}`}>{siteConfig.emailContato}</a>
          </div>
          <div className="flex items-start gap-2 text-white/70">
            <MapPin size={16} className="mt-1 shrink-0" aria-hidden />
            <span className="text-base">{siteConfig.endereco}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-6 text-center">
        <div className="mb-6 h-px w-full bg-ink-700" />
        <p className="text-sm text-white/70">© 2026 A4 Locadora. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
