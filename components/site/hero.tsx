"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CupomPDV, type ItemCupom } from "@/components/telas/cupom-pdv";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const TEAL = "#178F82";

const ITENS: ItemCupom[] = [
  { nome: "Arroz tipo 1 5kg", preco: 24.9 },
  { nome: "Detergente 500ml", preco: 2.49 },
];
const TOTAL = ITENS.reduce((soma, item) => soma + item.preco, 0);

const NOS = [
  { cx: 60, cy: 20, cor: "var(--verde)", atraso: 0 },
  { cx: 28, cy: 86, cor: "var(--verde)", atraso: 0.09 },
  { cx: 92, cy: 86, cor: "var(--azul)", atraso: 0.18 },
];

const ARESTAS = [
  { x1: 60, y1: 20, x2: 28, y2: 86, cor: "var(--verde)", atraso: 0.5 },
  { x1: 60, y1: 20, x2: 92, y2: 86, cor: TEAL, atraso: 0.59 },
  { x1: 28, y1: 86, x2: 92, y2: 86, cor: "#FFFFFF", atraso: 0.68 },
];

export function Hero() {
  const reduzirMovimento = useReducedMotion();
  const [mostrarCupom, setMostrarCupom] = useState(false);
  const [itensVisiveis, setItensVisiveis] = useState(0);
  const [ciclo, setCiclo] = useState(0);

  useEffect(() => {
    if (reduzirMovimento) {
      setMostrarCupom(true);
      setItensVisiveis(ITENS.length);
      return;
    }
    const t = setTimeout(() => setMostrarCupom(true), 1150);
    return () => clearTimeout(t);
  }, [reduzirMovimento]);

  useEffect(() => {
    if (!mostrarCupom || reduzirMovimento) return;

    setItensVisiveis(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    ITENS.forEach((_, i) => {
      timers.push(setTimeout(() => setItensVisiveis(i + 1), 550 + i * 500));
    });

    const duracaoCiclo = 550 + ITENS.length * 500 + 1900;
    timers.push(setTimeout(() => setCiclo((c) => c + 1), duracaoCiclo));

    return () => timers.forEach(clearTimeout);
  }, [mostrarCupom, ciclo, reduzirMovimento]);

  const totalAtual = ITENS.slice(0, itensVisiveis).reduce((soma, item) => soma + item.preco, 0);

  return (
    <section
      id="sec-01"
      className="secao-escura flex min-h-dvh flex-col justify-center gap-14 px-6 py-24 sm:px-10 lg:flex-row lg:items-center lg:gap-6 lg:px-16"
    >
      <div className="order-2 lg:order-1 lg:flex-1">
        <h1
          className="font-[family-name:var(--font-archivo)] leading-[0.82] tracking-[-0.045em] text-white"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
        >
          <span className="block font-normal">Cada negócio funciona diferente.</span>
          <span className="block font-bold">O sistema também deveria.</span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/65">
          Não adaptamos o seu negócio a um sistema pronto. Desenvolvemos o
          sistema sob medida, do jeito que ele já funciona.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/orcamento"
            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full bg-verde-forte px-8 text-base font-medium text-white transition-colors hover:bg-[#12694A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Pedir orçamento
          </Link>
          <a
            href="#sec-02"
            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Ver como funciona
          </a>
        </div>
      </div>

      <div className="order-1 flex flex-col items-center lg:order-2 lg:flex-1 lg:flex-row lg:justify-end">
        <svg
          viewBox="0 0 120 106"
          className="h-[120px] w-[136px] shrink-0 lg:h-[150px] lg:w-[170px]"
          aria-hidden="true"
        >
          {ARESTAS.map((a, i) => (
            <motion.line
              key={i}
              x1={a.x1}
              y1={a.y1}
              x2={a.x2}
              y2={a.y2}
              stroke={a.cor}
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={reduzirMovimento ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: a.atraso }}
            />
          ))}
          {NOS.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r="14"
              fill={n.cor}
              initial={reduzirMovimento ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
              transition={{ duration: 0.4, ease: EASE, delay: n.atraso }}
            />
          ))}
        </svg>

        <motion.div
          aria-hidden="true"
          initial={reduzirMovimento ? false : { scaleX: 0, scaleY: 0 }}
          animate={mostrarCupom ? { scaleX: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ transformOrigin: "top center" }}
          className="h-8 w-[2px] bg-gradient-to-b from-[#178F82] to-transparent lg:h-[2px] lg:w-10 lg:origin-[left_center] lg:bg-gradient-to-r"
        />

        <motion.div
          initial={reduzirMovimento ? false : { opacity: 0, x: -14 }}
          animate={mostrarCupom ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="w-full max-w-[260px]"
        >
          <CupomPDV itens={ITENS.slice(0, itensVisiveis)} total={reduzirMovimento ? TOTAL : totalAtual} />
        </motion.div>
      </div>
    </section>
  );
}
