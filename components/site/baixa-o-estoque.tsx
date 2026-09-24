"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, useReducedMotion, useTransform } from "motion/react";
import { TituloRevelado } from "@/components/site/revelar";
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
  const opacidadeTitulo = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);

  return (
    <section id="sec-03" className="secao-profunda">
      <div className="px-6 pt-24 sm:px-10 lg:px-16">
        <TituloRevelado
          texto="Baixa o estoque."
          className="titulo max-w-[16ch] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-white"
        />
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/85">
          Cada venda desconta do estoque na hora — nas regras que fazem sentido para o seu negócio, não num modelo fechado.
        </p>

        <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold">
          {FLUXO.map((etapa, i) => (
            <li key={etapa} className="flex items-center gap-2">
              <span
                className={`rounded-full px-4 py-1.5 ${
                  i === 0 ? "bg-menta text-tinta" : i === 1 ? "bg-white/15 text-white" : "bg-sol text-tinta"
                }`}
              >
                {etapa}
              </span>
              {i < FLUXO.length - 1 && (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/70" fill="none" aria-hidden="true">
                  <path d="M4 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>

      {!reduzirMovimento && (
        <div ref={ref} className="relative hidden lg:block" style={{ height: "300vh" }}>
          <div className="sticky top-0 flex h-dvh items-center px-16">
            <div className="grid w-full grid-cols-[16rem_1fr] items-center gap-16">
              <div>
                <motion.p style={{ opacity: opacidadeTitulo }} className="titulo mb-6 text-3xl text-white" aria-hidden="true">
                  Baixa o estoque.
                </motion.p>
                <div className="flex gap-1.5" aria-hidden="true">
                  {PRODUTOS.map((p, i) => (
                    <span
                      key={p.nome}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === passoAtivo ? "w-8 bg-menta" : "w-3 bg-white/25"}`}
                    />
                  ))}
                </div>
                <p className="mt-5 max-w-[20ch] text-lg leading-relaxed text-white/85">
                  Venda registrada de <span className="font-semibold text-white">{produtoAtivo.nome}</span>.
                </p>
                <div className="relative mt-6 h-[4.5rem] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={passoAtivo}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="titulo text-7xl leading-none tabular-nums text-sol"
                    >
                      {produtoAtivo.loja - 1}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className="mt-2 text-sm font-medium text-white/80">unidades na loja agora</p>
              </div>
              <div className="rounded-xl sombra-tela-escura">
                <TelaEstoque ativo={passoAtivo} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`px-6 py-16 sm:px-10 lg:px-16 ${reduzirMovimento ? "" : "lg:hidden"}`}>
        <div className="mx-auto max-w-2xl rounded-xl sombra-tela-escura">
          <TelaEstoque />
        </div>
      </div>
      <div className="h-16 lg:hidden" />
    </section>
  );
}
