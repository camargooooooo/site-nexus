"use client";

import { useState } from "react";
import Link from "next/link";
import { TelaPDV, type ParteDestacada } from "@/components/telas/tela-pdv";

const HOTSPOTS: { id: Exclude<ParteDestacada, null>; x: number; y: number; titulo: string; texto: string }[] = [
  { id: "busca", x: 25, y: 14, titulo: "Busca rápida", texto: "Encontre qualquer produto sem perder tempo." },
  { id: "codigo", x: 75, y: 14, titulo: "Código de barras", texto: "Registre a venda diretamente pelo leitor." },
  { id: "carrinho", x: 50, y: 40, titulo: "Carrinho", texto: "Veja produtos, quantidades e valores antes de finalizar." },
  { id: "total", x: 85, y: 72, titulo: "Total", texto: "Saiba exatamente quanto entrou no caixa." },
  { id: "pagamento", x: 14, y: 85, titulo: "Pagamento", texto: "Registre como a venda foi paga." },
];

export function PassaOProduto() {
  const [ativo, setAtivo] = useState(0);
  const hotspot = HOTSPOTS[ativo];

  return (
    <section id="sec-02" className="secao-clara px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="inline-flex items-center gap-3 rounded-md border-2 border-verde-forte bg-verde-forte/5 px-5 py-3">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-verde-forte" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="0.9" fill="currentColor" />
        </svg>
        <span className="text-base font-semibold text-verde-forte">
          Atenção: isso é só um exemplo de sistema sob medida — o seu pode ser completamente diferente.
        </span>
      </div>
      <p className="mt-8 font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-marinho/40">
        02
      </p>
      <h2 className="mt-2 max-w-[14ch] font-[family-name:var(--font-archivo)] text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-marinho">
        Passa o produto.
      </h2>
      <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-marinho/65">
        Venda rápido, sem complicação, do jeito que o seu processo de venda já funciona.
      </p>

      <div className="relative mx-auto mt-16 w-full max-w-5xl">
        <TelaPDV destaque={hotspot.id} />
        {HOTSPOTS.map((h, i) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setAtivo(i)}
            onMouseEnter={() => setAtivo(i)}
            aria-pressed={ativo === i}
            aria-label={`${i + 1}. ${h.titulo}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            className={`absolute hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[13px] font-semibold ring-2 ring-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul lg:flex ${
              ativo === i ? "scale-125 bg-verde-forte text-white" : "bg-marinho text-white hover:scale-110"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {HOTSPOTS.map((h, i) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setAtivo(i)}
            onMouseEnter={() => setAtivo(i)}
            aria-pressed={ativo === i}
            className={`border-l-2 pl-4 text-left transition-colors ${
              ativo === i ? "border-verde-forte" : "border-marinho/10"
            }`}
          >
            <p className={`text-sm tabular-nums ${ativo === i ? "text-verde-forte" : "text-marinho/40"}`}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <p
              className={`mt-1 font-[family-name:var(--font-archivo)] text-base font-semibold ${
                ativo === i ? "text-marinho" : "text-marinho/55"
              }`}
            >
              {h.titulo}
            </p>
            <p className="mt-1 max-w-[26ch] text-[13px] leading-relaxed text-marinho/55">{h.texto}</p>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <Link
          href="/orcamento"
          className="inline-flex items-center gap-2 text-base font-medium text-verde-forte underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
        >
          Peça uma proposta para o seu negócio
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M4 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
