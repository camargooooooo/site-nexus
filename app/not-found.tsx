import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Acao } from "@/components/site/acao";
import { CupomPDV } from "@/components/telas/cupom-pdv";

export const metadata: Metadata = {
  title: "Página não encontrada | Nexo Sistemas",
  robots: { index: false },
};

export default function NaoEncontrada() {
  return (
    <main className="secao-escura luz-topo flex min-h-dvh flex-col">
      <header className="mx-auto flex h-20 w-full max-w-6xl items-center px-6">
        <Link href="/" aria-label="Nexo Sistemas, voltar ao início" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
          <Logo grande invertido />
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-14 px-6 pb-20 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="titulo text-[clamp(5rem,16vw,11rem)] leading-none text-sol">404</p>
          <h1 className="titulo mt-4 max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-white">
            Esse produto não está no estoque.
          </h1>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-white/85">
            A página que você procurou não existe ou mudou de endereço.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Acao href="/" tamanho="lg" seta>
              Voltar ao início
            </Acao>
            <Acao href="/orcamento" variante="fantasma-escuro" tamanho="lg">
              Pedir orçamento
            </Acao>
          </div>
        </div>

        <div className="w-full max-w-[300px] rotate-3" aria-hidden="true">
          <CupomPDV itens={[{ nome: "Página procurada", preco: 0 }]} total={0} />
          <p className="mt-4 text-center text-sm font-semibold text-white/85">código não encontrado</p>
        </div>
      </div>
    </main>
  );
}
