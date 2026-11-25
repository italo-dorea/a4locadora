// Gera public/llms.txt a partir dos JSONs, para ficar sempre igual ao conteúdo do site.
// Roda automaticamente antes de `npm run build` (script "prebuild").
import { readFileSync, writeFileSync } from "node:fs";

const ler = (p) => JSON.parse(readFileSync(new URL(`../src/data/${p}`, import.meta.url), "utf-8"));
const site = ler("site.json");
const { planos } = ler("planos.json");
const { perguntas } = ler("faq.json");
const { veiculos } = ler("veiculos.json");

const reais = (v) => "R$ " + v.toFixed(2).replace(".", ",");
const U = site.url;
const frota = veiculos.map((v) => `${v.modelo} ${v.ano} ${v.cor}`).join(" e ");

const secoes = [
  ["Quem Somos", "#quem-somos", "Quem é a A4 Locadora e qual é a missão da empresa."],
  ["Como Funciona o Aluguel de Moto", "#como-funciona", "Flexibilidade de planos, aluguel online e manutenção dividida."],
  ["Nossa Frota de Motos", "#motos", `Motos da frota: ${frota}.`],
  ["Planos de Aluguel de Moto", "#planos", "Valores de diária, valor semanal e caução."],
  ["Perguntas Frequentes", "#faq", "Documentos, prazo, combustível, seguro, quilometragem e devolução."],
  ["Vídeos", "#videos", "Vídeo institucional no YouTube."],
  ["Formulário de Locação", "#contato", "Cadastro de reserva com envio por email e WhatsApp."],
];

const linhas = [
  `# ${site.nome}`,
  "",
  "> Locadora de motos em Salvador e região Metropolitana (BA), especializada em aluguel para motoboys e motoristas de aplicativos de entrega. Planos flexíveis, seguro contra roubo e furto incluído e manutenção dividida entre locador e locatário.",
  "",
  "O site é uma página única. Os links abaixo levam às seções dela.",
  "",
  "## Seções do site",
  "",
  ...secoes.map(([nome, ancora, desc]) => `- [${nome}](${U}/${ancora}): ${desc}`),
  "",
  "## Dados da empresa",
  "",
  `- Site: ${U}`,
  `- WhatsApp e telefone: ${site.telefoneExibicao}`,
  `- Email: ${site.emailContato}`,
  `- Endereço: ${site.endereco.replace(" - ", ", ").replace("Árvores Salvador", "Árvores, Salvador")}, ${site.cep.replace("CEP: ", "CEP ")}`,
  `- Instagram: ${site.instagram}`,
  `- YouTube: ${site.youtube}`,
  "",
  "## Planos de locação",
  "",
  ...planos.map(
    (p) =>
      `- ${p.nome}${p.subtitulo ? ` (${p.subtitulo})` : ""}: diária a partir de ${reais(p.valorDia)}, valor semanal ${reais(p.valorSemana)}, caução de ${reais(p.caucao)} em até ${p.parcelasCaucao}x. Consulte informações e disponibilidade.`,
  ),
  "",
  "## Perguntas frequentes",
  "",
  ...perguntas.flatMap((f) => [`### ${f.pergunta}`, f.resposta, ""]),
];

writeFileSync(new URL("../public/llms.txt", import.meta.url), linhas.join("\n"), { encoding: "utf-8" });
console.log(`llms.txt gerado (${perguntas.length} perguntas, ${planos.length} planos)`);
