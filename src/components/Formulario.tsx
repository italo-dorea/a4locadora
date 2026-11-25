"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { CalendarBlank, CalendarCheck, Car, CheckCircle, Motorcycle, PaperPlaneTilt, WhatsappLogo } from "./icons";
import { Reveal } from "./Reveal";
import { nomeVeiculo, planos, rotuloTipo, siteConfig, veiculos } from "@/lib/data";
import {
  cepValido,
  cpfValido,
  dataNascimentoValida,
  emailValido,
  enviarEmail,
  mascaraCEP,
  mascaraCPF,
  mascaraTelefone,
  montarMensagemWhatsApp,
  telefoneValido,
  urlWhatsApp,
  validarArquivo,
  type Lead,
} from "@/lib/lead";
import { btnPrimary, EVENTO_SELECAO, type SelecaoFormulario } from "@/lib/ui";

type Erros = Partial<Record<string, string>>;
type Status = "idle" | "enviando" | "enviado";

const campoBase =
  "w-full rounded-lg border border-border-subtle bg-white px-3 py-3 text-base text-on-surface transition-all duration-500 ease-fluid placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none aria-[invalid=true]:border-error aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-error/20";
const arquivoBase = `${campoBase} p-2 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white`;
const opcaoBase =
  "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border-subtle bg-white p-4 transition-all duration-500 ease-fluid hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-primary";

function Campo({ id, rotulo, dica, erro, className = "", children }: { id: string; rotulo: string; dica?: string; erro?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-1 text-sm font-semibold text-on-surface-variant">
        {rotulo}
      </label>
      {dica && <p className="mb-1 text-xs text-primary">{dica}</p>}
      {children}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="mt-1 text-sm text-error">
          {erro}
        </p>
      )}
    </div>
  );
}

export function Formulario() {
  const formRef = useRef<HTMLFormElement>(null);
  const [tipo, setTipo] = useState<"Carro" | "Moto">("Carro");
  const [plano, setPlano] = useState(planos[0].valorFormulario);
  const [modelo, setModelo] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [status, setStatus] = useState<Status>("idle");
  const [falhaEmail, setFalhaEmail] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  // Modelos disponíveis do tipo escolhido (vem de veiculos.json)
  const modelos = useMemo(
    () => veiculos.filter((v) => v.disponivel && rotuloTipo[v.tipo] === tipo).map(nomeVeiculo),
    [tipo],
  );
  const modeloAtual = modelos.includes(modelo) ? modelo : (modelos[0] ?? "");

  // Pré seleção vinda dos botões "Reservar" e "Quero este plano"
  useEffect(() => {
    const onSelecionar = (e: Event) => {
      const { veiculoId, planoId } = (e as CustomEvent<SelecaoFormulario>).detail ?? {};
      const v = veiculos.find((x) => x.id === veiculoId);
      if (v) {
        setTipo(rotuloTipo[v.tipo] as "Carro" | "Moto");
        setModelo(nomeVeiculo(v));
      }
      const p = planos.find((x) => x.id === planoId);
      if (p) setPlano(p.valorFormulario);
    };
    window.addEventListener(EVENTO_SELECAO, onSelecionar);
    return () => window.removeEventListener(EVENTO_SELECAO, onSelecionar);
  }, []);

  const limpaErro = (id: string) => erros[id] && setErros((e) => ({ ...e, [id]: undefined }));
  const comMascara = (id: string, fn: (v: string) => string) => (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = fn(e.target.value);
    limpaErro(id);
  };
  const aria = (id: string) => ({
    "aria-invalid": erros[id] ? (true as const) : undefined,
    "aria-describedby": erros[id] ? `${id}-erro` : undefined,
    onChange: () => limpaErro(id),
  });

  function validar(fd: FormData): Erros {
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const e: Erros = {};
    if (v("nome_completo").split(/\s+/).filter(Boolean).length < 2) e.name = "Informe nome e sobrenome";
    if (!cpfValido(v("cpf"))) e.cpf = "CPF inválido";
    if (!emailValido(v("email"))) e.email = "Informe um email válido";
    if (!dataNascimentoValida(v("data_nascimento"))) e.birthdate = "Informe uma data de nascimento válida";
    if (!telefoneValido(v("whatsapp"))) e.phone = "Informe o WhatsApp com DDD";
    if (!cepValido(v("cep"))) e.cep = "CEP inválido";
    if (v("endereco").length < 5) e.address = "Informe o endereço completo";
    const cnh = validarArquivo(fd.get("cnh_digital") as File | null);
    if (cnh) e["cnh-file"] = cnh;
    const comp = validarArquivo(fd.get("comprovante_residencia") as File | null);
    if (comp) e["address-proof-file"] = comp;
    if (!e["cnh-file"] && !e["address-proof-file"]) {
      const total = (fd.get("cnh_digital") as File).size + (fd.get("comprovante_residencia") as File).size;
      if (total > siteConfig.formulario.tamanhoMaximoTotalMB * 1024 * 1024) {
        e["address-proof-file"] = `Os dois arquivos juntos passam de ${siteConfig.formulario.tamanhoMaximoTotalMB}MB`;
      }
    }
    return e;
  }

  async function aoEnviar(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "enviando") return;
    const form = ev.currentTarget;
    const fd = new FormData(form);
    if (fd.get("_honey")) return; // robô: ignora em silêncio

    const novosErros = validar(fd);
    setErros(novosErros);
    const primeiro = Object.keys(novosErros)[0];
    if (primeiro) {
      document.getElementById(primeiro)?.focus();
      return;
    }

    setStatus("enviando");
    setFalhaEmail(false);

    const g = (k: string) => String(fd.get(k) ?? "");
    const lead: Lead = {
      tipo_veiculo: g("tipo_veiculo"),
      plano: g("plano"),
      nome_completo: g("nome_completo"),
      cpf: g("cpf"),
      email: g("email"),
      data_nascimento: g("data_nascimento"),
      whatsapp: g("whatsapp"),
      cep: g("cep"),
      endereco: g("endereco"),
      modelo_preferencia: g("modelo_preferencia"),
      aceita_outro_modelo: g("aceita_outro_modelo"),
    };
    const url = urlWhatsApp(montarMensagemWhatsApp(lead));
    setWaUrl(url);

    // 1) Email em segundo plano, sem sair da página e sem backend
    const resultado = await enviarEmail(fd);

    // 2) WhatsApp com as informações preenchidas
    const janela = window.open(url, "_blank");
    if (janela) janela.opener = null;

    if (resultado.ok) {
      form.reset();
      setTipo("Carro");
      setPlano(planos[0].valorFormulario);
      setModelo("");
      setStatus("enviado");
    } else {
      setFalhaEmail(true);
      setStatus("idle");
    }
  }

  if (status === "enviado") {
    return (
      <div role="status" className="relative z-10 flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle size={48} weight="fill" className="text-primary" aria-hidden />
        <h3 className="text-2xl font-bold text-on-surface">Solicitação enviada</h3>
        <p className="max-w-[680px] text-on-surface-variant">
          Enviamos seus dados e documentos por email e abrimos o WhatsApp com as informações preenchidas. Se a conversa não abriu, use o botão abaixo.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} bg-whatsapp hover:bg-whatsapp/90`}>
            <WhatsappLogo size={20} weight="fill" aria-hidden />
            Abrir conversa no WhatsApp
          </a>
          <button type="button" onClick={() => setStatus("idle")} className="rounded-full border border-primary px-3 py-2 text-base font-semibold text-primary transition-all duration-500 ease-fluid hover:bg-primary/5 active:scale-[0.98]">
            Enviar outra solicitação
          </button>
        </div>
      </div>
    );
  }

  const enviando = status === "enviando";

  return (
    <form ref={formRef} onSubmit={aoEnviar} noValidate aria-busy={enviando} className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      <input className="hidden" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" type="text" aria-hidden />

      {/* Tipo de veículo */}
      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-semibold text-on-surface-variant">Tipo de Veículo</legend>
        <div className="flex gap-4">
          {(["Carro", "Moto"] as const).map((t) => (
            <label key={t} className={opcaoBase}>
              <input type="radio" name="tipo_veiculo" value={t} required checked={tipo === t} onChange={() => setTipo(t)} className="sr-only" />
              {t === "Carro" ? <Car size={24} className="text-on-surface-variant" aria-hidden /> : <Motorcycle size={24} className="text-on-surface-variant" aria-hidden />}
              <span className="font-semibold">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Plano de interesse */}
      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-semibold text-on-surface-variant">Plano de Interesse</legend>
        <div className="flex flex-col gap-4 sm:flex-row">
          {planos.map((p, i) => (
            <label key={p.id} className={opcaoBase}>
              <input type="radio" name="plano" value={p.valorFormulario} required checked={plano === p.valorFormulario} onChange={() => setPlano(p.valorFormulario)} className="sr-only" />
              {i === 0 ? <CalendarBlank size={24} className="text-on-surface-variant" aria-hidden /> : <CalendarCheck size={24} className="text-on-surface-variant" aria-hidden />}
              <span className="font-semibold">{p.rotuloFormulario}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Campo id="name" rotulo="Nome Completo" erro={erros.name}>
        <input id="name" name="nome_completo" type="text" autoComplete="name" placeholder="João da Silva" required className={campoBase} {...aria("name")} />
      </Campo>
      <Campo id="cpf" rotulo="CPF" erro={erros.cpf}>
        <input id="cpf" name="cpf" type="text" inputMode="numeric" maxLength={14} placeholder="000.000.000-00" required className={campoBase} aria-invalid={erros.cpf ? true : undefined} aria-describedby={erros.cpf ? "cpf-erro" : undefined} onChange={comMascara("cpf", mascaraCPF)} />
      </Campo>
      <Campo id="email" rotulo="Email" erro={erros.email}>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="seuemail@exemplo.com" required className={campoBase} {...aria("email")} />
      </Campo>
      <Campo id="birthdate" rotulo="Data de Nascimento" erro={erros.birthdate}>
        <input id="birthdate" name="data_nascimento" type="date" autoComplete="bday" required className={campoBase} {...aria("birthdate")} />
      </Campo>
      <Campo id="phone" rotulo="WhatsApp" erro={erros.phone}>
        <input id="phone" name="whatsapp" type="tel" autoComplete="tel" placeholder="(71) 00000-0000" required className={campoBase} aria-invalid={erros.phone ? true : undefined} aria-describedby={erros.phone ? "phone-erro" : undefined} onChange={comMascara("phone", mascaraTelefone)} />
      </Campo>
      <Campo id="cep" rotulo="CEP" erro={erros.cep}>
        <input id="cep" name="cep" type="text" inputMode="numeric" maxLength={9} autoComplete="postal-code" placeholder="00.000-000" required className={campoBase} aria-invalid={erros.cep ? true : undefined} aria-describedby={erros.cep ? "cep-erro" : undefined} onChange={comMascara("cep", mascaraCEP)} />
      </Campo>
      <Campo id="address" rotulo="Endereço" erro={erros.address} className="md:col-span-2">
        <input id="address" name="endereco" type="text" autoComplete="street-address" placeholder="Endereço completo" required className={campoBase} {...aria("address")} />
      </Campo>

      <Campo id="vehicle-model" rotulo="Veículo de preferência">
        <select id="vehicle-model" name="modelo_preferencia" required value={modeloAtual} onChange={(e) => setModelo(e.target.value)} className={campoBase}>
          {modelos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Campo>
      <fieldset className="flex flex-col">
        <legend className="mb-1 text-sm font-semibold text-on-surface-variant">Caso o veículo escolhido não esteja disponível, aceita outro modelo?</legend>
        <div className="flex h-full items-center gap-6 pt-1">
          {["Sim", "Não"].map((op, i) => (
            <label key={op} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="aceita_outro_modelo" value={op} defaultChecked={i === 0} required className="h-4 w-4 accent-primary" />
              <span className="text-on-surface">{op}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Campo id="cnh-file" rotulo="Carregar CNH Digital" dica="Exporte pelo App Carteira Digital de Trânsito" erro={erros["cnh-file"]}>
        <input id="cnh-file" name="cnh_digital" type="file" accept=".pdf,.jpg,.jpeg,.png" required className={arquivoBase} {...aria("cnh-file")} />
      </Campo>
      <Campo id="address-proof-file" rotulo="Carregar Comprovante de Residência" erro={erros["address-proof-file"]}>
        <p className="mb-1 text-xs text-on-surface-variant">PDF ou imagem, até 5MB</p>
        <input id="address-proof-file" name="comprovante_residencia" type="file" accept=".pdf,.jpg,.jpeg,.png" required className={arquivoBase} {...aria("address-proof-file")} />
      </Campo>

      <div className="mt-4 md:col-span-2">
        {falhaEmail && (
          <div role="alert" className="mb-4 flex flex-col gap-3 rounded-xl border border-error/40 bg-error/5 p-4 text-sm text-on-surface sm:flex-row sm:items-center sm:justify-between">
            <p>Não foi possível enviar por email agora. Abrimos o WhatsApp com as informações preenchidas. Você também pode tentar novamente.</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-whatsapp px-3 py-2 text-sm font-semibold text-white transition-all duration-500 ease-fluid active:scale-[0.98]">
              <WhatsappLogo size={16} weight="fill" aria-hidden />
              Abrir WhatsApp
            </a>
          </div>
        )}
        <button type="submit" disabled={enviando} className={`${btnPrimary} w-full disabled:cursor-wait disabled:opacity-80`}>
          {enviando ? (
            <span className="flex items-center gap-3">
              Enviando solicitação
              <span aria-hidden className="h-2 w-16 animate-pulse rounded-full bg-white/50" />
            </span>
          ) : (
            <>
              Quero Alugar
              <PaperPlaneTilt size={20} aria-hidden />
            </>
          )}
        </button>
        <p className="mt-4 text-center text-xs text-on-surface-variant">Ao enviar, você concorda com nossos termos de privacidade.</p>
      </div>
    </form>
  );
}

/** Seção completa do formulário (cabeçalho + formulário). */
export function SecaoContato() {
  return (
    <section id="contato" className="scroll-mt-24 bg-surface px-4 py-24 md:px-16">
      <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border-subtle bg-surface-gray p-8 shadow-sm md:p-12">
        <div className="relative z-10 mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-on-surface md:text-4xl">Pronto para começar?</h2>
          <p className="text-lg text-on-surface-variant">
            Preencha o formulário abaixo e nossa equipe entrará em contato com as melhores condições para o seu perfil.
          </p>
        </div>
        <Formulario />
      </Reveal>
    </section>
  );
}
