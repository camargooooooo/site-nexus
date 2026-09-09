"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const TIPOS = [
  {
    titulo: "Institucional",
    texto: "Apresenta a empresa, os serviços e os canais de contato.",
  },
  {
    titulo: "Landing page",
    texto: "Uma página única, focada em converter quem chega até ela.",
  },
  {
    titulo: "Catálogo online",
    texto: "Mostra os produtos com preço, sem precisar de carrinho complexo.",
  },
  {
    titulo: "Blog ou portal",
    texto: "Conteúdo organizado por categoria, fácil de publicar e manter.",
  },
];

export function SitesTipos() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section className="secao-clara px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-marinho/40">
        O que fazemos
      </p>
      <h2 className="mt-2 max-w-[18ch] font-[family-name:var(--font-archivo)] text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-marinho">
        Cada negócio precisa de um site diferente.
      </h2>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-marinho/65">
        Não trabalhamos com modelo fechado. O formato do site parte do que o
        seu negócio realmente precisa mostrar ou vender.
      </p>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        {TIPOS.map((tipo, i) => (
          <motion.div
            key={tipo.titulo}
            initial={reduzirMovimento ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
            className="border-l-2 border-verde-forte pl-4"
          >
            <p className="text-sm tabular-nums text-verde-forte">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 font-[family-name:var(--font-archivo)] text-base font-semibold text-marinho">
              {tipo.titulo}
            </p>
            <p className="mt-1 max-w-[24ch] text-[13px] leading-relaxed text-marinho/55">{tipo.texto}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
