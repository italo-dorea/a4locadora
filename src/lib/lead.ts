import { siteConfig } from "@/lib/data";

/** Campos do formulário (CPF removido a pedido do negócio). */
export interface Lead {
  nome_completo: string;
  email: string;
  data_nascimento: string; // AAAA-MM-DD
  whatsapp: string;
  endereco: string;
  cep: string;
  moto_preferencia: string;
  plano_locacao: string;
  aceita_outro_modelo: string; // "Sim", "Não" ou vazio
  comprovanteAnexado: boolean;
}

// ---------- máscaras ----------
export const soDigitos = (v: string) => v.replace(/\D/g, "");

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

// ---------- validações de campos ----------
const DDDS_VALIDOS = new Set(
  "11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99".split(" "),
);

/** Telefone brasileiro: DDD existente; celular tem 11 dígitos e começa com 9; fixo tem 10 e começa com 2 a 5. */
export function telefoneValido(v: string): boolean {
  const d = soDigitos(v);
  if (![10, 11].includes(d.length) || !DDDS_VALIDOS.has(d.slice(0, 2))) return false;
  if (/^(\d)\1+$/.test(d.slice(2))) return false; // 99999999999
  return d.length === 11 ? d[2] === "9" : /[2-5]/.test(d[2]);
}

export const cepValido = (v: string) => soDigitos(v).length === 8 && !/^(\d)\1{7}$/.test(soDigitos(v));

export function dataNascimentoValida(v: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const data = new Date(v + "T00:00:00");
  return !Number.isNaN(data.getTime()) && data <= new Date() && data.getFullYear() >= 1900;
}

/** Nome com pelo menos duas palavras, só letras (aceita acento, apóstrofo e ponto). */
export const nomeValido = (v: string) => /^[\p{L}][\p{L}'.\- ]+$/u.test(v.trim()) && v.trim().split(/\s+/).filter((p) => p.length > 1).length >= 2;

/** Texto com link ou código é típico de spam em formulário de contato. */
export const contemLink = (v: string) => /(https?:\/\/|www\.|<\/?[a-z]|\.(com|net|org|ru|xyz)\b\/)/i.test(v);

// ---------- email ----------
export const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const EMAILS_DESCARTAVEIS = new Set(
  ["mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org", "yopmail.com", "trashmail.com", "sharklasers.com", "getnada.com", "dispostable.com", "maildrop.cc", "fakeinbox.com", "throwawaymail.com", "mohmal.com", "emailondeck.com"],
);

const DOMINIOS_COMUNS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "yahoo.com.br", "icloud.com", "live.com", "msn.com", "bol.com.br", "uol.com.br", "terra.com.br", "globo.com", "hotmail.com.br", "outlook.com.br"];

function distancia(a: string, b: string): number {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
}

/** Validações de email que não dependem de rede. Retorna a mensagem de erro ou null. */
export function validarEmailLocal(v: string): string | null {
  const email = v.trim().toLowerCase();
  if (!emailValido(email)) return "Informe um email válido";
  const dominio = email.split("@")[1];
  if (EMAILS_DESCARTAVEIS.has(dominio)) return "Use um email pessoal, não um email temporário";
  if (!DOMINIOS_COMUNS.includes(dominio)) {
    const parecido = DOMINIOS_COMUNS.find((d) => distancia(dominio, d) <= 2 && Math.abs(dominio.length - d.length) <= 2);
    if (parecido) return `Você quis dizer ${email.split("@")[0]}@${parecido}?`;
  }
  return null;
}

/**
 * Confere se o domínio do email existe, via DNS sobre HTTPS (só o domínio é consultado, nunca o email inteiro).
 * Só reprova quando a resposta é definitiva (domínio inexistente ou sem servidor de email).
 * Falha de rede ou timeout aprovam, para não barrar cliente real.
 */
export async function dominioDeEmailExiste(email: string): Promise<boolean> {
  const dominio = email.trim().toLowerCase().split("@")[1];
  if (!dominio) return false;
  const consulta = async (tipo: "MX" | "A") => {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 4000);
    try {
      const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(dominio)}&type=${tipo}`, {
        headers: { Accept: "application/dns-json" },
        signal: c.signal,
      });
      return (await r.json()) as { Status: number; Answer?: unknown[] };
    } finally {
      clearTimeout(t);
    }
  };
  try {
    const mx = await consulta("MX");
    if (mx.Status === 3) return false; // NXDOMAIN
    if (mx.Answer?.length) return true;
    const a = await consulta("A"); // sem MX, o email ainda funciona se o domínio tiver endereço
    return a.Status !== 3 && !!a.Answer?.length;
  } catch {
    return true;
  }
}

// ---------- arquivos ----------
const EXTENSOES = ["pdf", "jpg", "jpeg", "png"];
const MB = 1024 * 1024;

/** Arquivos vazios (nenhum selecionado) são descartados. */
export function arquivosSelecionados(fd: FormData, campo: string): File[] {
  return fd.getAll(campo).filter((f): f is File => f instanceof File && f.size > 0);
}

export function validarArquivos(arquivos: File[], obrigatorio: boolean): string | null {
  if (!arquivos.length) return obrigatorio ? "Anexe o arquivo para continuar" : null;
  if (arquivos.length > 3) return "Envie no máximo 3 arquivos";
  for (const f of arquivos) {
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!EXTENSOES.includes(ext)) return "Formato aceito: PDF, JPG ou PNG";
    if (f.size > siteConfig.formulario.tamanhoMaximoArquivoMB * MB) {
      return `Arquivo acima de ${siteConfig.formulario.tamanhoMaximoArquivoMB}MB`;
    }
  }
  return null;
}

export const totalAcimaDoLimite = (arquivos: File[]) =>
  arquivos.reduce((s, f) => s + f.size, 0) > siteConfig.formulario.tamanhoMaximoTotalMB * MB;

// ---------- freio contra envios em massa (por navegador) ----------
// Camada de conforto: segura robôs simples e cliques repetidos. Não substitui proteção no servidor,
// porque quem chama o endpoint direto não passa por aqui.
export const TEMPO_MINIMO_MS = 5_000; // ninguém preenche o formulário inteiro em menos de 5 segundos
const INTERVALO_MIN_MS = 60_000; // 1 envio por minuto
const MAX_POR_HORA = 3;
const CHAVE = "a4:envios";

function lerEnvios(): number[] {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE) ?? "[]") as number[];
    return lista.filter((t) => Date.now() - t < 3_600_000);
  } catch {
    return [];
  }
}

/** Retorna null se pode enviar, ou quantos segundos faltam. */
export function esperaParaEnviar(): number | null {
  const envios = lerEnvios();
  const ultimo = envios[envios.length - 1];
  if (ultimo && Date.now() - ultimo < INTERVALO_MIN_MS) return Math.ceil((INTERVALO_MIN_MS - (Date.now() - ultimo)) / 1000);
  if (envios.length >= MAX_POR_HORA) return Math.ceil((3_600_000 - (Date.now() - envios[0])) / 1000);
  return null;
}

export function registrarEnvio() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify([...lerEnvios(), Date.now()]));
  } catch {
    /* navegador sem localStorage: segue sem o freio */
  }
}

// ---------- envio de email em segundo plano (FormSubmit via AJAX, sem backend) ----------
export interface ResultadoEmail {
  ok: boolean;
  mensagem?: string;
}

export async function enviarEmail(formData: FormData): Promise<ResultadoEmail> {
  const f = siteConfig.formulario;
  formData.set("_subject", f.assunto);
  formData.set("_template", "table");
  formData.set("_captcha", "false");
  // Mensagens que contêm estes termos são descartadas pelo FormSubmit sem aviso ao remetente
  formData.set("_blacklist", f.bloquearTermos.join(", "));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000); // anexos podem demorar
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${f.destino}`, {
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
    "Olá, A4 Locadora! Acabei de preencher o formulário de locação no site.",
    "",
    `*Nome completo:* ${lead.nome_completo}`,
    `*Email:* ${lead.email}`,
    `*Data de nascimento:* ${dataBR(lead.data_nascimento)}`,
    `*WhatsApp:* ${lead.whatsapp}`,
    `*Endereço:* ${lead.endereco}`,
    `*CEP:* ${lead.cep}`,
    `*Moto de preferência:* ${lead.moto_preferencia}`,
    `*Plano de locação:* ${lead.plano_locacao}`,
  ];
  if (lead.aceita_outro_modelo) linhas.push(`*Aceita outro modelo:* ${lead.aceita_outro_modelo}`);
  linhas.push("", lead.comprovanteAnexado ? "A CNH e o comprovante de residência seguiram por email." : "A CNH seguiu por email.");
  return linhas.join("\n");
}

export function urlWhatsApp(mensagem: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
