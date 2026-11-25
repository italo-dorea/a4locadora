import { siteConfig } from "@/lib/data";

/** Campos do formulário (mesmos nomes do formulário original, que chegam no email). */
export interface Lead {
  tipo_veiculo: string;
  plano: string;
  nome_completo: string;
  cpf: string;
  email: string;
  data_nascimento: string; // AAAA-MM-DD
  whatsapp: string;
  cep: string;
  endereco: string;
  modelo_preferencia: string;
  aceita_outro_modelo: string;
}

// ---------- máscaras ----------
export const soDigitos = (v: string) => v.replace(/\D/g, "");

export function mascaraCPF(v: string): string {
  const d = soDigitos(v).slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function mascaraCEP(v: string): string {
  return soDigitos(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

export function mascaraTelefone(v: string): string {
  const d = soDigitos(v).slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// ---------- validações ----------
export function cpfValido(valor: string): boolean {
  const d = soDigitos(valor);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const digito = (len: number) => {
    let soma = 0;
    for (let i = 0; i < len; i++) soma += Number(d[i]) * (len + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
}

export const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const telefoneValido = (v: string) => [10, 11].includes(soDigitos(v).length);
export const cepValido = (v: string) => soDigitos(v).length === 8;

export function dataNascimentoValida(v: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const data = new Date(v + "T00:00:00");
  return !Number.isNaN(data.getTime()) && data <= new Date() && data.getFullYear() >= 1900;
}

const EXTENSOES = ["pdf", "jpg", "jpeg", "png"];

export function validarArquivo(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return "Anexe o arquivo para continuar";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!EXTENSOES.includes(ext)) return "Formato aceito: PDF, JPG ou PNG";
  if (file.size > siteConfig.formulario.tamanhoMaximoArquivoMB * 1024 * 1024) {
    return `Arquivo acima de ${siteConfig.formulario.tamanhoMaximoArquivoMB}MB`;
  }
  return null;
}

// ---------- envio de email em segundo plano (FormSubmit via AJAX, sem backend) ----------
export interface ResultadoEmail {
  ok: boolean;
  mensagem?: string;
}

export async function enviarEmail(formData: FormData): Promise<ResultadoEmail> {
  // Campos de configuração do FormSubmit (iguais aos do formulário original)
  formData.set("_subject", siteConfig.formulario.assunto);
  formData.set("_template", "table");
  formData.set("_captcha", "false");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000); // anexos podem demorar
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${siteConfig.emailContato}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
      signal: controller.signal,
    });
    const json = await res.json().catch(() => ({}));
    const sucesso = res.ok && (json.success === true || json.success === "true");
    return { ok: sucesso, mensagem: json.message };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
}

// ---------- mensagem de WhatsApp com os dados preenchidos ----------
function dataBR(iso: string) {
  const [a, m, d] = iso.split("-");
  return a && m && d ? `${d}/${m}/${a}` : iso;
}

export function montarMensagemWhatsApp(lead: Lead): string {
  const linhas = [
    "Olá, A4 Locadora! Acabei de preencher o formulário no site.",
    "",
    `*Tipo de veículo:* ${lead.tipo_veiculo}`,
    `*Plano de interesse:* ${lead.plano}`,
    `*Nome completo:* ${lead.nome_completo}`,
    `*CPF:* ${lead.cpf}`,
    `*Email:* ${lead.email}`,
    `*Data de nascimento:* ${dataBR(lead.data_nascimento)}`,
    `*WhatsApp:* ${lead.whatsapp}`,
    `*CEP:* ${lead.cep}`,
    `*Endereço:* ${lead.endereco}`,
    `*Veículo de preferência:* ${lead.modelo_preferencia}`,
    `*Aceita outro modelo:* ${lead.aceita_outro_modelo}`,
    "",
    "A CNH digital e o comprovante de residência seguiram por email.",
  ];
  return linhas.join("\n");
}

export function urlWhatsApp(mensagem: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
