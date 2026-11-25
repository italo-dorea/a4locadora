import site from "@/data/site.json";
import veiculosJson from "@/data/veiculos.json";
import planosJson from "@/data/planos.json";

export type TipoVeiculo = "carro" | "moto";

export interface Veiculo {
  id: string;
  tipo: TipoVeiculo;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  imagem: string;
  alt: string;
  disponivel: boolean;
  destaqueHero: boolean;
  caracteristicas: string[];
}

export interface Plano {
  id: string;
  etiqueta: string;
  rotuloFormulario: string;
  valorFormulario: string;
  valorDia: number;
  valorSemana: number;
  caucao: number;
  parcelasCaucao: number;
  beneficios: string[];
}

export const siteConfig = site;
export const veiculos = veiculosJson.veiculos as Veiculo[];
export const planos = planosJson.planos as Plano[];
export const observacaoPlanos = planosJson.observacao;

/** "42" -> "R$ 42,00" */
export function formatarReais(valor: number): string {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

export function nomeVeiculo(v: Veiculo): string {
  return `${v.modelo} ${v.ano}`;
}

export const rotuloTipo: Record<TipoVeiculo, string> = { carro: "Carro", moto: "Moto" };
