"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Bloco que sobe e ganha foco ao entrar na tela. Visível por padrão sem movimento. */
export function Surgir({
  children,
  className,
  atraso = 0,
}: {
  children: ReactNode;
  className?: string;
  atraso?: number;
}) {
  const reduzir = useReducedMotion();
  if (reduzir) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay: atraso }}
    >
      {children}
    </motion.div>
  );
}

/** O símbolo da Nexo em miniatura, com um nó em destaque (ou nenhum). */
export function MiniSimbolo({
  destaque,
  className,
  base = "#ffffff",
}: {
  destaque?: 0 | 1 | 2;
  className?: string;
  base?: string;
}) {
  const nos = [
    { cx: 20, cy: 8, cor: "var(--menta)" },
    { cx: 9, cy: 30, cor: "var(--menta)" },
    { cx: 31, cy: 30, cor: "var(--sol)" },
  ];
  const apagado = (i: number) => destaque !== undefined && destaque !== i;
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <line x1="20" y1="8" x2="9" y2="30" stroke="var(--menta)" strokeWidth="2.5" strokeLinecap="round" opacity={destaque === undefined ? 1 : 0.35} />
      <line x1="20" y1="8" x2="31" y2="30" stroke="var(--sol)" strokeWidth="2.5" strokeLinecap="round" opacity={destaque === undefined ? 1 : 0.35} />
      <line x1="9" y1="30" x2="31" y2="30" stroke={base} strokeWidth="2.5" strokeLinecap="round" opacity={destaque === undefined ? 1 : 0.35} />
      {nos.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="5.5" fill={n.cor} opacity={apagado(i) ? 0.3 : 1} />
      ))}
    </svg>
  );
}

/** Selo que avisa que a demonstração é simulada e usa dados fictícios. */
export function SeloDemo({ children, escuro = false }: { children: ReactNode; escuro?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        escuro ? "bg-white/10 text-white/85 ring-1 ring-inset ring-white/20" : "bg-sol/25 text-tinta"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-sol" aria-hidden="true" />
      {children}
    </span>
  );
}
