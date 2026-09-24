"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Valor em reais que conta a partir de zero quando aparece na tela. */
export function ContadorReal({ valor, atraso = 0 }: { valor: number; atraso?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true, amount: 0.6 });
  const reduzir = useReducedMotion();
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    if (!visivel || reduzir) return;
    const controle = animate(0, valor, {
      duration: 1.2,
      delay: atraso,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setAtual,
    });
    return () => controle.stop();
  }, [visivel, reduzir, valor, atraso]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatarReal(atual)}
    </span>
  );
}
