import Image from "next/image";
import { ChatCircle, Envelope, InstagramLogo, MapPin, YoutubeLogo } from "./icons";
import { siteConfig } from "@/lib/data";
import { CONTAINER, SECAO } from "@/lib/ui";

const linkClass =
  "rounded-md text-base text-white/70 underline-offset-4 transition-all duration-500 ease-fluid hover:text-primary-fixed-dim hover:underline";

export function Footer() {
  return (
    <footer className={`on-dark relative overflow-hidden aurora-bg aurora-alt w-full bg-ink-0 text-white ${SECAO}`}>
      <div className={`${CONTAINER} grid grid-cols-1 gap-16 md:grid-cols-2`}>
        <div className="flex flex-col gap-6">
          <div className="self-start rounded-lg bg-white p-2">
            <Image src="/assets/logo-a4.webp" alt="A4 Locadora de Motos" width={640} height={230} className="h-12 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <a aria-label="Instagram" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-md text-white/70 transition-all duration-500 ease-fluid hover:text-primary-fixed-dim">
              <InstagramLogo size={24} aria-hidden /> Instagram
            </a>
            <a aria-label="YouTube" href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-md text-white/70 transition-all duration-500 ease-fluid hover:text-primary-fixed-dim">
              <YoutubeLogo size={24} aria-hidden /> Youtube
            </a>
          </div>
        </div>

        <address className="flex flex-col gap-3 not-italic text-white/70">
          <div className="flex items-start gap-3">
            <Envelope size={20} className="mt-1 shrink-0" aria-hidden />
            <a className={linkClass} href={`mailto:${siteConfig.emailContato}`}>{siteConfig.emailContato}</a>
          </div>
          <div className="flex items-start gap-3">
            <ChatCircle size={20} className="mt-1 shrink-0" aria-hidden />
            <a className={linkClass} href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">{siteConfig.telefoneExibicao}</a>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="mt-1 shrink-0" aria-hidden />
            <span className="text-base">
              {siteConfig.endereco}
              <br />
              {siteConfig.cep}
            </span>
          </div>
        </address>
      </div>

      <div className={`${CONTAINER} mt-16`}>
        <div className="mb-6 h-px w-full bg-ink-700" />
        <p className="text-sm text-white/70">© A4 Locadora de Motos | Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
