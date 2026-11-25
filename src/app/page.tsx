import { ChamadaFinal } from "@/components/ChamadaFinal";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Frota } from "@/components/Frota";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SecaoContato } from "@/components/Formulario";
import { Planos } from "@/components/Planos";
import { QuemSomos } from "@/components/QuemSomos";
import { Videos } from "@/components/Videos";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import faq from "@/data/faq.json";
import { siteConfig } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoRental",
      name: siteConfig.nome,
      url: siteConfig.url,
      email: siteConfig.emailContato,
      telephone: "+" + siteConfig.whatsapp,
      image: `${siteConfig.url}/opengraph-image.png`,
      areaServed: "Salvador e região Metropolitana",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Tancredo Neves, 1189, Edif. Guimarães Trade Sala 1603, Caminho das Árvores",
        addressLocality: "Salvador",
        addressRegion: "BA",
        postalCode: "41820-021",
        addressCountry: "BR",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.perguntas.map((p) => ({
        "@type": "Question",
        name: p.pergunta,
        acceptedAnswer: { "@type": "Answer", text: p.resposta },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-primary px-3 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100]"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <QuemSomos />
        <ComoFunciona />
        <ChamadaFinal />
        <Frota />
        <Planos />
        <Faq />
        <Videos />
        <SecaoContato />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
