import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import { descricaoSeo as descricao, tituloSeo as titulo } from "@/lib/seo";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: titulo, template: "%s | A4 Locadora de Motos" },
  description: descricao,
  applicationName: siteConfig.nome,
  authors: [{ name: siteConfig.nome, url: siteConfig.url }],
  creator: siteConfig.nome,
  publisher: siteConfig.nome,
  category: "Aluguel de motos",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.nome,
    title: titulo,
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
  // Sinais de localização para buscadores regionais
  other: { "geo.region": "BR-BA", "geo.placename": "Salvador", "format-detection": "telephone=no" },
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
