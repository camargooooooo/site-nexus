import type { Metadata } from "next";
import { OrcamentoForm } from "@/components/orcamento-form";

export const metadata: Metadata = {
  title: "Pedir orçamento | Nexo Sistemas",
  description:
    "Conte como funciona o seu negócio hoje e receba uma proposta da Nexo Sistemas.",
};

export default function OrcamentoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-24">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="font-[family-name:var(--font-archivo)] text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#17355E] md:text-5xl">
            Pedir orçamento
          </h1>
          <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-[#17355E]/75">
            Conte como o seu negócio funciona hoje. Respondo pelo WhatsApp com o
            valor e o prazo de instalação.
          </p>

          <dl className="mt-10 space-y-6 border-t border-[#17355E]/10 pt-8">
            <div>
              <dt className="text-sm text-[#17355E]/60">Resposta</dt>
              <dd className="mt-1 text-[#17355E]">Em até um dia útil</dd>
            </div>
            <div>
              <dt className="text-sm text-[#17355E]/60">Prefere conversar?</dt>
              <dd className="mt-1">
                <a
                  className="text-[#2E86D4] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E86D4]"
                  href="https://wa.me/5514991096832"
                >
                  Chamar no WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <div className="rounded-lg bg-[#F1F5F3] p-6 md:p-10">
          <OrcamentoForm />
        </div>
      </div>
    </main>
  );
}
