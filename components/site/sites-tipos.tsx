"use client";

import { motion, useReducedMotion } from "motion/react";
import { TituloRevelado } from "@/components/site/revelar";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Miniaturas desenhadas: cada tipo de site mostra a sua própria estrutura. */
function Miniatura({ tipo }: { tipo: number }) {
  if (tipo === 0)
    return (
      <div className="flex h-full flex-col gap-2">
        <div className="h-[45%] rounded-lg bg-cobalto" />
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className="rounded-md bg-white" />
          <div className="rounded-md bg-white" />
          <div className="rounded-md bg-white" />
        </div>
      </div>
    );
  if (tipo === 1)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg bg-sol">
        <div className="h-2.5 w-3/5 rounded-full bg-tinta" />
        <div className="h-2 w-2/5 rounded-full bg-tinta/40" />
        <div className="mt-2 h-6 w-1/3 rounded-full bg-tinta" />
      </div>
    );
  if (tipo === 2)
    return (
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
        {["bg-coral", "bg-menta", "bg-ceu", "bg-sol", "bg-cobalto", "bg-coral"].map((c, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-md bg-white p-1.5">
            <div className={`flex-1 rounded ${c}`} />
            <div className="h-1.5 w-2/3 rounded-full bg-tinta/30" />
          </div>
        ))}
      </div>
    );
  return (
    <div className="flex h-full gap-2">
      <div className="flex flex-1 flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-1 gap-2 rounded-md bg-white p-1.5">
            <div className="w-1/3 rounded bg-menta" />
            <div className="flex-1 space-y-1 pt-0.5">
              <div className="h-1.5 w-full rounded-full bg-tinta/40" />
              <div className="h-1.5 w-2/3 rounded-full bg-tinta/20" />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/4 space-y-1.5 rounded-md bg-white p-1.5">
        <div className="h-1.5 rounded-full bg-cobalto" />
        <div className="h-1.5 rounded-full bg-tinta/20" />
        <div className="h-1.5 rounded-full bg-tinta/20" />
      </div>
    </div>
  );
}

const TIPOS = [
  { titulo: "Institucional", texto: "Apresenta a empresa, os serviços e os canais de contato." },
  { titulo: "Landing page", texto: "Uma página única, focada em converter quem chega até ela." },
  { titulo: "Catálogo online", texto: "Mostra os produtos com preço, sem precisar de carrinho complexo." },
  { titulo: "Blog ou portal", texto: "Conteúdo organizado por categoria, fácil de publicar e manter." },
];

export function SitesTipos() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section className="secao-papel px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <TituloRevelado
          texto="Cada negócio precisa de um site diferente."
          className="titulo max-w-[18ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] text-tinta"
        />
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-tinta/75">
          Não trabalhamos com modelo fechado. O formato do site parte do que o
          seu negócio realmente precisa mostrar ou vender.
        </p>

        <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TIPOS.map((tipo, i) => (
            <motion.li
              key={tipo.titulo}
              initial={reduzirMovimento ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group"
            >
              <div className="aspect-[4/3] rounded-2xl bg-tinta/[0.06] p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
                <Miniatura tipo={i} />
              </div>
              <p className="titulo mt-5 text-xl text-tinta">{tipo.titulo}</p>
              <p className="mt-1.5 max-w-[30ch] text-[15px] leading-relaxed text-tinta/70">{tipo.texto}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
