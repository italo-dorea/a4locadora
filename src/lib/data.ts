import site from "@/data/site.json";
import veiculosJson from "@/data/veiculos.json";
import planosJson from "@/data/planos.json";

export interface Veiculo {
  id: string;
  tipo: "moto";
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  imagem: string;
  alt: string;
  disponivel: boolean;
  destaqueHero: boolean;
}

export interface Plano {
  id: string;
  nome: string;
  subtitulo: string;
  valorFormulario: string;
  valorDia: number;
  valorSemana: number;
  caucao: number;
  parcelasCaucao: number;
}

export const siteConfig = site;
export const veiculos = veiculosJson.veiculos as Veiculo[];
export const planos = planosJson.planos as Plano[];
export const notaPlanos = planosJson.nota;

/** 42 -> "R$ 42,00" */
export function formatarReais(valor: number): string {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

/** "Factor 2025 Branca" */
export function nomeVeiculo(v: Veiculo): string {
  return `${v.modelo} ${v.ano} ${v.cor}`;
}
