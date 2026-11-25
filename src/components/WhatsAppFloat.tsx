import { WhatsappLogo } from "./icons";
import { siteConfig } from "@/lib/data";

export function WhatsAppFloat() {
  return (
    <a
      aria-label="Contato via WhatsApp"
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-pulse fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-500 ease-fluid hover:scale-110 active:scale-[0.98]"
    >
      <WhatsappLogo size={32} weight="fill" aria-hidden />
    </a>
  );
}
