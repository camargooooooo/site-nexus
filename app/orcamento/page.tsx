import type { Metadata } from "next";
import Link from "next/link";
import { OrcamentoForm } from "@/components/orcamento-form";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Pedir orçamento | Nexo Sistemas",
  description:
    "Conte como funciona o seu negócio hoje e receba uma proposta da Nexo Sistemas.",
};

export default function OrcamentoPage() {
  return (
    <main className="min-h-screen bg-papel">
      <header className="mx-auto flex h-20 max-w-6xl items-center px-6">
        <Link href="/" aria-label="Nexo Sistemas, voltar ao início" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
          <Logo grande />
        </Link>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:pb-24 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-8">
        <aside className="secao-escura relative isolate overflow-hidden rounded-3xl p-8 md:p-10 lg:sticky lg:top-8 lg:self-start">
          <h1 className="titulo text-4xl leading-[1] text-white md:text-5xl">Pedir orçamento</h1>
          <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-white/85">
            Conte como o seu negócio funciona hoje. Respondo pelo WhatsApp com o
            valor e o prazo de instalação.
          </p>

          <dl className="mt-10 space-y-6 border-t border-white/20 pt-8">
            <div>
              <dt className="text-sm font-medium text-white/80">Resposta</dt>
              <dd className="titulo mt-1 text-xl text-white">Em até um dia útil</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-white/80">Prefere conversar?</dt>
              <dd className="mt-2">
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[15px] font-semibold text-tinta transition-colors hover:bg-menta focus-visible:outline-2 focus-visible:outline-offset-2"
                  href="https://wa.me/5514991096832"
                >
                  <span className="pulso-vivo h-2 w-2 rounded-full bg-menta-forte" aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <div className="rounded-3xl bg-white p-6 sombra-tela md:p-10">
          <OrcamentoForm />
        </div>
      </div>
    </main>
  );
}
