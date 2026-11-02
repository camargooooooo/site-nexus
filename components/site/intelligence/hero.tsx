"use client";

import { motion, useReducedMotion } from "motion/react";
import { classeAcao, Seta } from "@/components/site/acao";
import { Simbolo3D } from "@/components/site/intelligence/simbolo-3d";
import { EASE, MiniSimbolo } from "@/components/site/intelligence/comum";
import { LINK_DIAGNOSTICO } from "@/components/site/intelligence/contato";

const PILARES = [
  { id: "int-ia", rotulo: "Inteligência artificial", no: 0 as const },
  { id: "int-crm", rotulo: "CRM inteligente", no: 1 as const },
  { id: "int-automacoes", rotulo: "Automações", no: 2 as const },
];

export function IntelligenceHero() {
  const reduzir = useReducedMotion();
  const entrada = (atraso: number) =>
    reduzir
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, ease: EASE, delay: atraso },
        };

  return (
    <section
      id="int-inicio"
      aria-labelledby="int-titulo"
      className="secao-noite noite-topo relative isolate overflow-hidden"
    >
      <div className="mx-auto grid min-h-dvh max-w-[90rem] items-center gap-6 px-6 pb-16 pt-28 sm:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-4 lg:px-16 lg:pb-24">
        <div className="relative z-10">
          <motion.p {...entrada(0)} className="flex items-center gap-3 text-white">
            <MiniSimbolo className="h-9 w-9" />
            <span className="titulo text-2xl leading-none">
              Nexo <span className="text-white/70">Intelligence</span>
            </span>
          </motion.p>

          <motion.h1
            {...entrada(0.1)}
            id="int-titulo"
            className="titulo mt-8 max-w-[17ch] text-[clamp(2.6rem,4.9vw,4.9rem)] leading-[0.98] text-white"
          >
            <span className="text-menta">Inteligência</span> que transforma a forma como sua empresa{" "}
            <span className="relative inline-block whitespace-nowrap">
              opera.
              <svg
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.16em] left-0 h-[0.26em] w-[92%]"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 15 C 70 5, 140 21, 200 11 S 280 7, 296 13"
                  fill="none"
                  stroke="var(--sol)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={reduzir ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 1 }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            {...entrada(0.25)}
            className="mt-8 max-w-[48ch] text-lg leading-relaxed text-white/80 sm:text-xl"
          >
            Conectamos inteligência artificial, gestão comercial e automação em soluções desenvolvidas para a
            realidade da sua empresa.
          </motion.p>

          <motion.div {...entrada(0.4)} className="mt-10 flex flex-wrap items-center gap-3">
            <a href={LINK_DIAGNOSTICO} target="_blank" rel="noopener noreferrer" className={classeAcao("primaria", "lg")}>
              Solicite um diagnóstico
              <Seta />
            </a>
            <a href="#int-o-que-e" className={classeAcao("fantasma-escuro", "lg")}>
              Conheça a Intelligence
            </a>
          </motion.div>
        </div>

        <div className="relative -mx-6 h-[clamp(300px,52vw,420px)] sm:mx-0 lg:h-[min(680px,78vh)]">
          <Simbolo3D className="h-full w-full" />
          <p className="pointer-events-none absolute inset-x-0 bottom-0 hidden text-center text-xs font-medium text-white/55 [@media(hover:hover)]:lg:block" aria-hidden="true">
            Mova o cursor: o símbolo acompanha você
          </p>
        </div>
      </div>

      <nav aria-label="Frentes da Intelligence" className="border-t border-white/10 bg-noite-alta/60">
        <ul className="mx-auto flex max-w-[90rem] flex-col divide-y divide-white/10 px-6 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-10 lg:px-16">
          {PILARES.map((p) => (
            <li key={p.id} className="flex-1">
              <a
                href={`#${p.id}`}
                className="group flex items-center justify-between gap-4 py-4 text-sm font-semibold text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-6 sm:first:pl-0"
              >
                <span className="flex items-center gap-3">
                  <MiniSimbolo destaque={p.no} className="h-5 w-5" />
                  {p.rotulo}
                </span>
                <Seta className="text-white/50 group-hover:text-menta" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
