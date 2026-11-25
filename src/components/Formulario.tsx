"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ChatCircle, CheckCircle, CreditCard, IdentificationCard, PaperPlaneTilt, ShieldCheck, Warning, WhatsappLogo } from "./icons";
import { Reveal } from "./Reveal";
import { nomeVeiculo, planos, siteConfig, veiculos } from "@/lib/data";
import {
  arquivosSelecionados,
  cepValido,
  contemLink,
  dataNascimentoValida,
  dominioDeEmailExiste,
  enviarEmail,
  esperaParaEnviar,
  mascaraCEP,
  mascaraTelefone,
  montarMensagemWhatsApp,
  nomeValido,
  registrarEnvio,
  telefoneValido,
  TEMPO_MINIMO_MS,
  totalAcimaDoLimite,
  urlWhatsApp,
  validarArquivos,
  validarEmailLocal,
  type Lead,
} from "@/lib/lead";
import { btnPrimary, CONTAINER, EVENTO_SELECAO, SECAO, type SelecaoFormulario } from "@/lib/ui";

type Erros = Partial<Record<string, string>>;
type Status = "idle" | "enviando" | "enviado";

const campoBase =
  "w-full rounded-lg border border-border-subtle bg-white px-3 py-3 text-base text-on-surface transition-all duration-500 ease-fluid placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none aria-[invalid=true]:border-error aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-error/20";
const arquivoBase = `${campoBase} p-2 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white`;
const opcaoBase =
  "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border-subtle bg-white p-4 font-semibold transition-all duration-500 ease-fluid hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-primary";

function Campo({ id, rotulo, dica, erro, className = "", children }: { id: string; rotulo: string; dica?: ReactNode; erro?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-1 text-sm font-semibold text-on-surface-variant">
        {rotulo}
      </label>
      {children}
      {/* A dica fica ABAIXO do campo, para os campos lado a lado ficarem alinhados no topo */}
      {dica && <p className="mt-1 flex items-center gap-1 text-xs text-primary">{dica}</p>}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="mt-1 text-sm text-error">
          {erro}
        </p>
      )}
    </div>
  );
}

/**
 * Copy de segurança e confiança. Cada item responde a uma dúvida de quem vai enviar a CNH e dados pessoais online
 * e só afirma o que o formulário realmente faz (confirmar o item 1 e 2 com o dono do negócio antes de publicar).
 */
const garantias = [
  { Icone: ShieldCheck, titulo: "Conexão protegida", texto: "Seus dados seguem por uma conexão segura (HTTPS) até a nossa equipe." },
  { Icone: IdentificationCard, titulo: "Documentos para o seu contrato", texto: "A CNH e o comprovante de residência servem para analisar o seu cadastro e preparar a locação." },
  { Icone: CreditCard, titulo: "Nenhum pagamento agora", texto: "Neste formulário você não informa cartão nem dados bancários." },
  { Icone: ChatCircle, titulo: "Atendimento direto", texto: "Quem recebe é a equipe da A4, por email e WhatsApp. É ela que entra em contato com você." },
];

function Seguranca() {
  return (
    <section aria-labelledby="seguranca-titulo" className="rounded-2xl border border-border-subtle bg-surface p-6">
      <h3 id="seguranca-titulo" className="mb-4 flex items-center gap-2 text-base font-semibold text-on-surface">
        <ShieldCheck size={20} weight="fill" className="text-primary" aria-hidden />
        Como cuidamos dos seus dados
      </h3>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {garantias.map(({ Icone, titulo, texto }) => (
          <li key={titulo} className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icone size={20} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-on-surface">{titulo}</p>
              <p className="text-sm text-on-surface-variant">{texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Formulario() {
  const [plano, setPlano] = useState(planos[0].valorFormulario);
  const [moto, setMoto] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [status, setStatus] = useState<Status>("idle");
  const [falhaEmail, setFalhaEmail] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const [aviso, setAviso] = useState("");
  const montadoEm = useRef(0);
  useEffect(() => {
    montadoEm.current = Date.now();
  }, []);

  // Motos disponíveis (vem de veiculos.json)
  const motos = useMemo(() => veiculos.filter((v) => v.disponivel).map(nomeVeiculo), []);
  const motoAtual = motos.includes(moto) ? moto : (motos[0] ?? "");

  // Pré seleção vinda dos botões "Alugue agora" dos cards de moto e de plano
  useEffect(() => {
    const onSelecionar = (e: Event) => {
      const { veiculoId, planoId } = (e as CustomEvent<SelecaoFormulario>).detail ?? {};
      const v = veiculos.find((x) => x.id === veiculoId);
      if (v) setMoto(nomeVeiculo(v));
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
  });

  function validar(fd: FormData): Erros {
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const e: Erros = {};
    if (!nomeValido(v("nome_completo")) || contemLink(v("nome_completo"))) e.name = "Informe nome e sobrenome, só com letras";
    const erroEmail = validarEmailLocal(v("email"));
    if (erroEmail) e.email = erroEmail;
    if (!dataNascimentoValida(v("data_nascimento"))) e.birthdate = "Informe uma data de nascimento válida";
    if (!telefoneValido(v("whatsapp"))) e.phone = "Informe um WhatsApp válido com DDD";
    if (v("endereco").length < 5 || contemLink(v("endereco"))) e.address = "Informe o endereço completo";
    if (!cepValido(v("cep"))) e.cep = "CEP inválido";
    const cnh = arquivosSelecionados(fd, "cnh_digital");
    const comp = arquivosSelecionados(fd, "comprovante_residencia");
    const eCnh = validarArquivos(cnh, true);
    const eComp = validarArquivos(comp, false);
    if (eCnh) e["cnh-file"] = eCnh;
    if (eComp) e["address-proof-file"] = eComp;
    if (!eCnh && !eComp && totalAcimaDoLimite([...cnh, ...comp])) {
      e["address-proof-file"] = `Os arquivos juntos passam de ${siteConfig.formulario.tamanhoMaximoTotalMB}MB`;
    }
    return e;
  }

  async function aoEnviar(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "enviando") return;
    const form = ev.currentTarget;
    const fd = new FormData(form);
    setAviso("");

    // Robô: campo isca preenchido, ou formulário "preenchido" rápido demais. Finge sucesso e não envia nada.
    if (fd.get("_honey") || Date.now() - montadoEm.current < TEMPO_MINIMO_MS) {
      form.reset();
      setStatus("enviado");
      return;
    }

    const novosErros = validar(fd);
    setErros(novosErros);
    const primeiro = Object.keys(novosErros)[0];
    if (primeiro) {
      document.getElementById(primeiro)?.focus();
      return;
    }

    // Freio contra envios repetidos neste navegador
    const espera = esperaParaEnviar();
    if (espera) {
      setAviso(`Recebemos uma solicitação deste aparelho há pouco. Aguarde ${espera > 90 ? `${Math.ceil(espera / 60)} minutos` : `${espera} segundos`} para enviar outra.`);
      return;
    }

    setStatus("enviando");
    setFalhaEmail(false);

    // O domínio do email precisa existir (consulta DNS; falha de rede não barra)
    if (!(await dominioDeEmailExiste(String(fd.get("email") ?? "")))) {
      setErros({ email: "Não encontramos esse domínio de email. Confira se digitou corretamente." });
      setStatus("idle");
      document.getElementById("email")?.focus();
      return;
    }

    const g = (k: string) => String(fd.get(k) ?? "");
    const lead: Lead = {
      nome_completo: g("nome_completo"),
      email: g("email"),
      data_nascimento: g("data_nascimento"),
      whatsapp: g("whatsapp"),
      endereco: g("endereco"),
      cep: g("cep"),
      moto_preferencia: g("moto_preferencia"),
      plano_locacao: g("plano_locacao"),
      aceita_outro_modelo: g("aceita_outro_modelo"),
      comprovanteAnexado: arquivosSelecionados(fd, "comprovante_residencia").length > 0,
    };
    const url = urlWhatsApp(montarMensagemWhatsApp(lead));
    setWaUrl(url);

    // 1) Email em segundo plano, sem sair da página e sem backend
    const resultado = await enviarEmail(fd);

    // 2) WhatsApp com as informações preenchidas
    const janela = window.open(url, "_blank");
    if (janela) janela.opener = null;

    if (resultado.ok) {
      registrarEnvio();
      form.reset();
      setPlano(planos[0].valorFormulario);
      setMoto("");
      setStatus("enviado");
    } else {
      setFalhaEmail(true);
      setStatus("idle");
    }
  }

  if (status === "enviado") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-12 text-center">
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
    // Mobile first: 1 coluna; 2 colunas no md; grade de 6 no lg (campos de 2, 3 ou 6 colunas)
    <form onSubmit={aoEnviar} noValidate aria-busy={enviando} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
      <input className="hidden" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" type="text" aria-hidden />

      <div className="md:col-span-2 lg:col-span-6">
        <Seguranca />
      </div>

      <Campo id="name" rotulo="Nome Completo" erro={erros.name} className="lg:col-span-3">
        <input id="name" name="nome_completo" type="text" maxLength={100} autoComplete="name" placeholder="Nome completo" required className={campoBase} onChange={() => limpaErro("name")} {...aria("name")} />
      </Campo>
      <Campo id="email" rotulo="Email" erro={erros.email} className="lg:col-span-3">
        <input id="email" name="email" type="email" maxLength={120} autoComplete="email" placeholder="Email" required className={campoBase} onChange={() => limpaErro("email")} {...aria("email")} />
      </Campo>
      <Campo id="birthdate" rotulo="Data de Nascimento" erro={erros.birthdate} className="lg:col-span-2">
        <input id="birthdate" name="data_nascimento" type="date" autoComplete="bday" required className={campoBase} onChange={() => limpaErro("birthdate")} {...aria("birthdate")} />
      </Campo>
      <Campo id="phone" rotulo="WhatsApp" erro={erros.phone} className="lg:col-span-2">
        <input id="phone" name="whatsapp" type="tel" autoComplete="tel" placeholder="(00)00000-0000" required className={campoBase} onChange={comMascara("phone", mascaraTelefone)} {...aria("phone")} />
      </Campo>
      <Campo id="cep" rotulo="CEP" erro={erros.cep} className="lg:col-span-2">
        <input id="cep" name="cep" type="text" inputMode="numeric" maxLength={9} autoComplete="postal-code" placeholder="00.000-000" required className={campoBase} onChange={comMascara("cep", mascaraCEP)} {...aria("cep")} />
      </Campo>
      <Campo id="address" rotulo="Endereço" erro={erros.address} className="md:col-span-2 lg:col-span-6">
        <input id="address" name="endereco" type="text" maxLength={160} autoComplete="street-address" placeholder="Endereço completo" required className={campoBase} onChange={() => limpaErro("address")} {...aria("address")} />
      </Campo>

      <Campo id="moto" rotulo="Moto de preferência" className="lg:col-span-2">
        <select id="moto" name="moto_preferencia" required value={motoAtual} onChange={(e) => setMoto(e.target.value)} className={campoBase}>
          {motos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Campo>

      <fieldset className="lg:col-span-2">
        <legend className="mb-1 text-sm font-semibold text-on-surface-variant">Plano de Locação</legend>
        <div className="flex gap-4">
          {planos.map((p) => (
            <label key={p.id} className={opcaoBase}>
              <input type="radio" name="plano_locacao" value={p.valorFormulario} required checked={plano === p.valorFormulario} onChange={() => setPlano(p.valorFormulario)} className="sr-only" />
              {p.valorFormulario}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="md:col-span-2 lg:col-span-2">
        <legend className="mb-2 text-sm font-semibold text-on-surface-variant">Caso a moto escolhida não esteja disponível, aceita outro modelo?</legend>
        <div className="flex items-center gap-6">
          {["Sim", "Não"].map((op) => (
            <label key={op} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="aceita_outro_modelo" value={op} className="h-4 w-4 accent-primary" />
              <span className="text-on-surface">{op}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Campo
        id="cnh-file"
        className="lg:col-span-3"
        rotulo="Carregar CNH"
        dica={
          <>
            <Warning size={14} weight="fill" aria-hidden /> Exportar do App Carteira Digital de Trânsito
          </>
        }
        erro={erros["cnh-file"]}
      >
        <input id="cnh-file" name="cnh_digital" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" required className={arquivoBase} onChange={() => limpaErro("cnh-file")} {...aria("cnh-file")} />
      </Campo>
      <Campo id="address-proof-file" rotulo="Carregar Comprovante residência" erro={erros["address-proof-file"]} className="lg:col-span-3">
        <input id="address-proof-file" name="comprovante_residencia" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className={arquivoBase} onChange={() => limpaErro("address-proof-file")} {...aria("address-proof-file")} />
      </Campo>

      <div className="md:col-span-2 lg:col-span-6">
        {aviso && (
          <p role="alert" className="mb-4 rounded-xl border border-error/40 bg-error/5 p-4 text-sm text-on-surface">
            {aviso}
          </p>
        )}
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
              Alugar
              <PaperPlaneTilt size={20} aria-hidden />
            </>
          )}
        </button>
        <p className="mt-4 text-center text-xs text-on-surface-variant">
          Ao enviar, você autoriza a A4 a usar esses dados para analisar a sua locação e falar com você por email ou WhatsApp.
        </p>
      </div>
    </form>
  );
}

/** Seção completa do formulário (título e mensagem + formulário). */
export function SecaoContato() {
  return (
    // Mesmo padrão das demais seções: SECAO + CONTAINER, sem cartão interno mais estreito
    <section id="contato" className={`scroll-mt-24 bg-surface-gray ${SECAO}`}>
      <div className={CONTAINER}>
        <Reveal className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-on-surface md:text-5xl">{siteConfig.formulario.titulo}</h2>
          <p className="mx-auto max-w-[680px] text-lg text-on-surface-variant">{siteConfig.formulario.mensagem}</p>
        </Reveal>
        <Reveal delay={100}>
          <Formulario />
        </Reveal>
      </div>
    </section>
  );
}
