"use client";

import { motion, useReducedMotion } from "motion/react";
import { FechamentoCaixa } from "@/components/telas/fechamento-caixa";
import { TituloRevelado, TelaErguida } from "@/components/site/revelar";

const ENTRADAS = [
  { nome: "Vendas", cor: "bg-white text-tinta ring-1 ring-inset ring-tinta/15" },
  { nome: "Pix", cor: "bg-menta text-tinta" },
  { nome: "Cartão", cor: "bg-ceu text-tinta" },
  { nome: "Dinheiro", cor: "bg-sol text-tinta" },
  { nome: "Fiado", cor: "bg-coral text-tinta" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function FechaOCaixa() {
  const reduzir = useReducedMotion();

  return (
    <section id="sec-04" className="secao-papel px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <TituloRevelado
            texto="Fecha o caixa."
            className="titulo max-w-[16ch] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-tinta"
          />
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-tinta/75">
            Dinheiro, Pix, cartão e fiado, tudo somado do jeito que o seu caixa já funciona hoje.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {ENTRADAS.map((etapa, i) => (
              <motion.span
                key={etapa.nome}
                initial={reduzir ? false : { opacity: 0, y: 14, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                className={`rounded-full px-4 py-2 text-base font-semibold ${etapa.cor}`}
              >
                {etapa.nome}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={reduzir ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            className="mt-4 flex flex-wrap items-center gap-3 text-lg"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-tinta/60" fill="none" aria-hidden="true">
              <path d="M12 4v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="titulo text-tinta">Caixa</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-tinta/60" fill="none" aria-hidden="true">
              <path d="M4 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="titulo rounded-full bg-cobalto px-4 py-1.5 text-white">Fechamento.</span>
          </motion.div>
        </div>

        <TelaErguida>
          <FechamentoCaixa />
        </TelaErguida>
      </div>
    </section>
  );
}
