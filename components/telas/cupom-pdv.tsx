"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type ItemCupom = { nome: string; preco: number };

const EASE = [0.16, 1, 0.3, 1] as const;

function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function CupomPDV({
  itens,
  total,
}: {
  itens: ItemCupom[];
  total: number;
}) {
  const reduzir = useReducedMotion();

  return (
    <div className="w-full rounded-2xl bg-white p-5 font-corpo text-tinta sombra-tela-escura">
      <div className="flex items-center justify-between border-b border-dashed border-tinta/15 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 items-end gap-[2px]">
            {[3, 5, 2, 6, 3, 4, 2, 5].map((h, i) => (
              <span key={i} className="w-[2px] bg-tinta/75" style={{ height: `${h * 2.5}px` }} />
            ))}
          </div>
          <span className="text-[11px] font-medium tracking-wide text-tinta/60">código lido</span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-menta-escura">
          <span className="pulso-vivo h-1.5 w-1.5 rounded-full bg-menta-forte" />
          caixa aberto
        </span>
      </div>

      <ul className="mt-3 min-h-[62px] space-y-1.5">
        <AnimatePresence initial={false}>
          {itens.map((item) => (
            <motion.li
              key={item.nome}
              initial={reduzir ? false : { opacity: 0, x: -10, backgroundColor: "rgb(255 197 61 / 0.45)" }}
              animate={{ opacity: 1, x: 0, backgroundColor: "rgb(255 197 61 / 0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="-mx-2 flex items-center justify-between rounded-md px-2 py-0.5 text-[13px]"
            >
              <span>{item.nome}</span>
              <span className="tabular-nums">{formatarReal(item.preco)}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-3 flex items-baseline justify-between border-t border-dashed border-tinta/15 pt-3">
        <span className="text-[13px] font-medium text-tinta/65">Total</span>
        <motion.span
          key={total}
          initial={reduzir ? false : { y: -6, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="titulo text-2xl tabular-nums text-tinta"
        >
          {formatarReal(total)}
        </motion.span>
      </div>
    </div>
  );
}
