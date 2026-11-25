import { WhatsappLogo } from "./icons";
import { siteConfig } from "@/lib/data";

export function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMensagemInicial)}`;
  return (
    <a
      aria-label="Quero mais informações, contato via WhatsApp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-full bg-whatsapp p-2 text-white shadow-lg transition-all duration-500 ease-fluid hover:scale-105 active:scale-[0.98] md:pl-4"
    >
      <span className="hidden text-sm font-semibold md:inline">Quero mais informações</span>
      <span className="wa-pulse flex h-12 w-12 items-center justify-center rounded-full">
        <WhatsappLogo size={32} weight="fill" aria-hidden />
      </span>
    </a>
  );
}
