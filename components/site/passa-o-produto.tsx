"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { TelaPDV, type ParteDestacada } from "@/components/telas/tela-pdv";
import { TituloRevelado, TelaErguida } from "@/components/site/revelar";
import { Seta } from "@/components/site/acao";

const HOTSPOTS: { id: Exclude<ParteDestacada, null>; x: number; y: number; titulo: string; texto: string }[] = [
  { id: "busca", x: 25, y: 14, titulo: "Busca rápida", texto: "Encontre qualquer produto sem perder tempo." },
  { id: "codigo", x: 75, y: 14, titulo: "Código de barras", texto: "Registre a venda diretamente pelo leitor." },
  { id: "carrinho", x: 50, y: 40, titulo: "Carrinho", texto: "Veja produtos, quantidades e valores antes de finalizar." },
  { id: "total", x: 62, y: 72, titulo: "Total", texto: "Saiba exatamente quanto entrou no caixa." },
  { id: "pagamento", x: 46, y: 85, titulo: "Pagamento", texto: "Registre como a venda foi paga." },
];

export function PassaOProduto() {
  const [ativo, setAtivo] = useState(0);
  const reduzir = useReducedMotion();
  const hotspot = HOTSPOTS[ativo];

  return (
    <section id="sec-02" className="secao-clara px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="inline-flex items-start gap-3 rounded-2xl bg-sol/25 px-5 py-3.5 ring-1 ring-inset ring-sol">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-tinta" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.9" fill="currentColor" />
          </svg>
          <span className="text-base font-semibold text-tinta">
            Atenção: isso é só um exemplo de sistema sob medida — o seu pode ser completamente diferente.
          </span>
        </div>

        <TituloRevelado
          texto="Passa o produto."
          className="titulo mt-10 max-w-[14ch] text-[clamp(3rem,7.5vw,6rem)] leading-[0.95] text-tinta"
        />
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-tinta/75">
          Venda rápido, sem complicação, do jeito que o seu processo de venda já funciona.
        </p>
      </div>

      <TelaErguida className="relative mx-auto mt-16 w-full max-w-5xl">
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
            className={`absolute hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[13px] font-bold ring-[3px] ring-white transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 lg:flex ${
              ativo === i
                ? "scale-125 bg-cobalto text-white shadow-[0_8px_20px_-6px_rgb(29_63_255/0.8)]"
                : "bg-tinta text-white hover:scale-110"
            }`}
          >
            {ativo === i && !reduzir && (
              <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-cobalto/40" />
            )}
            <span className="relative">{i + 1}</span>
          </button>
        ))}
      </TelaErguida>

      <ol className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {HOTSPOTS.map((h, i) => (
          <li key={h.id}>
            <button
              type="button"
              onClick={() => setAtivo(i)}
              onMouseEnter={() => setAtivo(i)}
              aria-pressed={ativo === i}
              className="relative h-full w-full rounded-2xl p-4 text-left transition-colors hover:bg-papel focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {ativo === i && (
                <motion.span
                  layoutId="hotspot-ativo"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-2xl bg-white ring-1 ring-cobalto/25 sombra-tela"
                  aria-hidden="true"
                />
              )}
              <span className="relative block">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-bold tabular-nums transition-colors ${
                    ativo === i ? "bg-cobalto text-white" : "bg-tinta/[0.07] text-tinta/70"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="titulo mt-3 block text-base text-tinta">{h.titulo}</span>
                <span className="mt-1 block max-w-[26ch] text-sm leading-relaxed text-tinta/70">{h.texto}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-14 max-w-5xl">
        <Link
          href="/orcamento"
          className="group/acao inline-flex items-center gap-2 text-base font-semibold text-cobalto underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Peça uma proposta para o seu negócio
          <Seta />
        </Link>
      </div>
    </section>
  );
}
