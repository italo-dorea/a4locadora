import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const titulo = "A4 Locadora de Motos";
const descricao =
  "Somos especializados no aluguel de motos para motoboys e entregadores. Aqui, você aluga rápido e fácil, com planos flexíveis que cabem no seu bolso!";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.nome,
    title: titulo,
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
};

export const viewport: Viewport = { themeColor: "#216849", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <head>
        {/* Sem JavaScript, os blocos de revelação ficam visíveis */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}[data-word]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
