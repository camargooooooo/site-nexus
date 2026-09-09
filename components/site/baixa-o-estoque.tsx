"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { TelaEstoque, PRODUTOS } from "@/components/telas/tela-estoque";

const FLUXO = ["Venda", "Estoque", "Saldo"];

export function BaixaOEstoque() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [passoAtivo, setPassoAtivo] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPassoAtivo(Math.min(PRODUTOS.length - 1, Math.floor(v * PRODUTOS.length)));
  });

  const produtoAtivo = PRODUTOS[passoAtivo];

  return (
    <section id="sec-03" className="secao-escura">
      <div className="px-6 pt-24 sm:px-10 lg:px-16">
        <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-white/40">
          03
        </p>
        <h2 className="mt-2 max-w-[16ch] font-[family-name:var(--font-archivo)] text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1] tracking-[-0.03em] text-white">
          Baixa o estoque.
        </h2>
        <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/65">
          Cada venda desconta do estoque na hora — nas regras que fazem sentido para o seu negócio, não num modelo fechado.
        </p>

        <div className="mt-8 flex items-center gap-3 text-sm font-medium text-white/50">
          {FLUXO.map((etapa, i) => (
            <span key={etapa} className="flex items-center gap-3">
              <span className={i === 0 ? "text-white" : ""}>{etapa}</span>
              {i < FLUXO.length - 1 && <span aria-hidden="true">—›</span>}
            </span>
          ))}
        </div>
      </div>

      {!reduzirMovimento && (
        <div ref={ref} className="relative hidden lg:block" style={{ height: "300vh" }}>
          <div className="sticky top-0 flex h-dvh items-center px-16">
            <div className="grid w-full grid-cols-[16rem_1fr] items-center gap-16">
              <div>
                <p className="text-sm text-white/40">
                  {String(passoAtivo + 1).padStart(2, "0")} / {String(PRODUTOS.length).padStart(2, "0")}
                </p>
                <p className="mt-2 max-w-[20ch] text-lg leading-relaxed text-white/70">
                  Venda registrada de <span className="font-medium text-white">{produtoAtivo.nome}</span>.
                </p>
                <p className="mt-6 font-[family-name:var(--font-archivo)] text-6xl font-bold tabular-nums text-white">
                  {produtoAtivo.loja - 1}
                </p>
                <p className="mt-1 text-sm text-white/45">unidades na loja agora</p>
              </div>
              <TelaEstoque ativo={passoAtivo} />
            </div>
          </div>
        </div>
      )}

      <div className={`px-6 py-16 sm:px-10 lg:px-16 ${reduzirMovimento ? "" : "lg:hidden"}`}>
        <div className="mx-auto max-w-2xl">
          <TelaEstoque />
        </div>
      </div>
      <div className="h-16 lg:hidden" />
    </section>
  );
}
