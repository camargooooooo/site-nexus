"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { MockupNavegador } from "@/components/site/mockup-navegador";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export function SitesHero() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section className="secao-escura flex min-h-dvh flex-col justify-center gap-14 px-6 py-24 sm:px-10 lg:flex-row lg:items-center lg:gap-6 lg:px-16">
      <div className="order-2 lg:order-1 lg:flex-1">
        <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-white/40">
          SITES
        </p>
        <h1
          className="mt-2 font-[family-name:var(--font-archivo)] leading-[0.92] tracking-[-0.045em] text-white"
          style={{ fontSize: "clamp(2.5rem, 6.8vw, 6.25rem)" }}
        >
          <span className="block font-normal">Sites sob medida,</span>
          <span className="block font-bold">feitos para o seu negócio.</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/65">
          Nada de template pronto. Cada site é desenhado e construído do zero
          para o que o seu negócio precisa, do jeito que ele precisa.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/orcamento"
            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full bg-verde-forte px-8 text-base font-medium text-white transition-colors hover:bg-[#12694A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Pedir orçamento
          </Link>
          <a
            href="#incluido"
            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Ver o que está incluído
          </a>
        </div>
      </div>

      <motion.div
        className="order-1 w-full max-w-[380px] lg:order-2 lg:flex-1"
        initial={reduzirMovimento ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
      >
        <MockupNavegador url="seunegocio.com.br" cor="verde" />
      </motion.div>
    </section>
  );
}
