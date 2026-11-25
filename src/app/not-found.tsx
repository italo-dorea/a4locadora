import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { btnPrimary } from "@/lib/ui";

export const metadata = { title: "Página não encontrada | A4 Locadora", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface px-4 text-center">
      <Image src="/assets/logo-a4.webp" alt="A4 Locadora" width={640} height={230} className="h-16 w-auto" />
      <p className="text-sm font-semibold tracking-wider text-primary">ERRO 404</p>
      <h1 className="max-w-[680px] text-4xl font-bold text-on-surface md:text-5xl">Página não encontrada</h1>
      <p className="max-w-[680px] text-lg text-on-surface-variant">O endereço que você acessou não existe ou foi movido. Volte ao início para ver a frota e os planos.</p>
      <Link href="/" className={btnPrimary}>
        Voltar ao início
        <ArrowRight size={20} weight="bold" aria-hidden />
      </Link>
    </main>
  );
}
