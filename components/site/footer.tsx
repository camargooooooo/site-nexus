"use client";

import { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";
import { Logo } from "@/components/site/logo";
import { SECOES } from "@/components/site/secoes";
import { useSecaoAtiva } from "@/components/site/use-secao-ativa";

export function Footer() {
  const { scrollY } = useScroll();
  const reduzirMovimento = useReducedMotion();
  const [distancia, setDistancia] = useState("0,0 m");
  const [progresso, setProgresso] = useState(0);
  const { indice } = useSecaoAtiva();

  useMotionValueEvent(scrollY, "change", (v) => {
    if (reduzirMovimento || typeof document === "undefined") return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setProgresso(max > 0 ? Math.round((v / max) * 100) : 0);
    setDistancia(`${(v / 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} m`);
  });

  return (
    <footer className="secao-escura px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <p className="max-w-[18ch] font-[family-name:var(--font-archivo)] text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            Quero controlar meu negócio
          </p>
          <Link
            href="/orcamento"
            className="relative z-10 mt-8 inline-flex h-14 items-center justify-center rounded-full bg-verde-forte px-10 text-lg font-medium text-white transition-colors hover:bg-[#12694A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Pedir orçamento
          </Link>
        </div>

        <dl className="grid gap-6 text-sm sm:grid-cols-2 lg:gap-10">
          <div>
            <dt className="text-white/45">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href="https://wa.me/5514991096832"
                className="text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                (14) 99109-6832
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-white/45">E-mail</dt>
            <dd className="mt-1">
              <a
                href="mailto:nnexosistemas@gmail.com"
                className="text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                nnexosistemas@gmail.com
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo invertido />
        <div className="flex gap-6 font-mono text-[11px] tabular-nums text-white/35">
          <span>distância rolada · {distancia}</span>
          <span>
            seção {SECOES[indice].numero} / {SECOES[SECOES.length - 1].numero}
          </span>
          <span>progresso · {progresso}%</span>
        </div>
      </div>
    </footer>
  );
}
