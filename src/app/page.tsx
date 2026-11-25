import { Autoridade } from "@/components/Autoridade";
import { Beneficios } from "@/components/Beneficios";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Frota } from "@/components/Frota";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SecaoContato } from "@/components/Formulario";
import { Planos } from "@/components/Planos";
import { Tagline } from "@/components/Tagline";
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
      areaServed: "Salvador e Região Metropolitana",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Tancredo Neves, 1189, Edif. Guimarães Trade, Sala 1603, Caminho das Árvores",
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
        <Beneficios />
        {/* Tagline: usa a frase de apoio que antes ficava abaixo do título "Por que escolher a A4?" */}
        <section aria-label="Resumo dos benefícios" className="on-dark bg-ink-0 px-4 py-24 md:px-16">
          <Tagline texto="Tudo que você precisa para focar no que importa: suas entregas e seus ganhos." />
        </section>
        <Frota />
        <Planos />
        <Autoridade />
        <Faq />
        <SecaoContato />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
