import { AuroraPause } from "@/components/AuroraPause";
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
import { formatarReais, planos, siteConfig } from "@/lib/data";
import { descricaoSeo, tituloSeo } from "@/lib/seo";

const U = siteConfig.url;

// Dados estruturados (JSON-LD) ligados entre si por @id: empresa, site, página e FAQ
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutoRental", "LocalBusiness"],
      "@id": `${U}/#empresa`,
      name: siteConfig.nome,
      alternateName: "A4 Locadora",
      description: descricaoSeo,
      url: U,
      logo: `${U}/icon.png`,
      image: `${U}/opengraph-image.png`,
      email: siteConfig.emailContato,
      telephone: "+" + siteConfig.whatsapp,
      priceRange: `${formatarReais(Math.min(...planos.map((p) => p.valorDia)))} a ${formatarReais(Math.max(...planos.map((p) => p.valorDia)))} por dia`,
      currenciesAccepted: "BRL",
      areaServed: [
        { "@type": "City", name: "Salvador" },
        { "@type": "AdministrativeArea", name: "Região Metropolitana de Salvador" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Tancredo Neves, 1189, Edif. Guimarães Trade Sala 1603, Caminho das Árvores",
        addressLocality: "Salvador",
        addressRegion: "BA",
        postalCode: "41820-021",
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+" + siteConfig.whatsapp,
        email: siteConfig.emailContato,
        availableLanguage: "pt-BR",
      },
      sameAs: [siteConfig.instagram, siteConfig.youtube],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Planos de aluguel de moto",
        itemListElement: planos.map((p) => ({
          "@type": "Offer",
          name: p.nome + (p.subtitulo ? ` (${p.subtitulo})` : ""),
          description: `Diária a partir de ${formatarReais(p.valorDia)}, valor semanal ${formatarReais(p.valorSemana)}, caução de ${formatarReais(p.caucao)} em até ${p.parcelasCaucao}x.`,
          priceCurrency: "BRL",
          priceSpecification: { "@type": "UnitPriceSpecification", price: p.valorDia, priceCurrency: "BRL", unitCode: "DAY", unitText: "dia" },
          itemOffered: { "@type": "Service", name: "Aluguel de moto" },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${U}/#site`,
      url: U,
      name: siteConfig.nome,
      inLanguage: "pt-BR",
      publisher: { "@id": `${U}/#empresa` },
    },
    {
      "@type": "WebPage",
      "@id": `${U}/#pagina`,
      url: `${U}/`,
      name: tituloSeo,
      description: descricaoSeo,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${U}/#site` },
      about: { "@id": `${U}/#empresa` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${U}/opengraph-image.png` },
      // Trechos indicados para leitura por assistentes de voz
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#quem-somos p", "#faq summary"] },
    },
    {
      "@type": "FAQPage",
      "@id": `${U}/#faq`,
      isPartOf: { "@id": `${U}/#pagina` },
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
      <AuroraPause />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
