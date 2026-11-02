"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TituloRevelado } from "@/components/site/revelar";
import { EASE, Surgir } from "@/components/site/intelligence/comum";

const PILARES = [
  {
    titulo: "Inteligência artificial",
    cor: "var(--menta)",
    resumo:
      "Agentes que leem mensagens, entendem o pedido, consultam as informações da empresa e encaminham cada caso para quem resolve.",
    faz: ["Atendimento e triagem", "Interpretação de pedidos", "Apoio à decisão"],
  },
  {
    titulo: "Relacionamento e processos",
    cor: "var(--menta)",
    resumo:
      "Um CRM desenhado em torno do seu funil: clientes, oportunidades, histórico e atividades no mesmo lugar, com as etapas que a sua equipe já usa.",
    faz: ["Clientes e leads", "Pipeline comercial", "Indicadores"],
  },
  {
    titulo: "Automação e integração",
    cor: "var(--sol)",
    resumo:
      "Os sistemas passam a conversar entre si. Registros se atualizam sozinhos, alertas chegam na hora certa e as tarefas repetitivas saem da mão da equipe.",
    faz: ["Integração entre sistemas", "Fluxos automáticos", "Alertas e notificações"],
  },
] as const;

// Posições do símbolo (viewBox 40×40) ampliadas para o diagrama.
const NOS = [
  { cx: 20, cy: 8 },
  { cx: 9, cy: 30 },
  { cx: 31, cy: 30 },
];
const ARESTAS = [
  { de: 0, para: 1, cor: "var(--menta)" },
  { de: 0, para: 2, cor: "var(--sol)" },
  { de: 1, para: 2, cor: "#ffffff" },
];

export function OQueE() {
  const [ativo, setAtivo] = useState(0);
  const reduzir = useReducedMotion();
  const pilar = PILARES[ativo];

  return (
    <section id="int-o-que-e" aria-label="O que é a Nexo Intelligence" className="secao-noite text-white">
      <div className="mx-auto max-w-[72rem] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <TituloRevelado
              texto="Mais inteligência. Menos complexidade."
              className="titulo max-w-[14ch] text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[0.96] text-white"
            />
          </div>
          <Surgir className="space-y-5 text-lg leading-relaxed text-white/75 lg:pt-3">
            <p className="text-white">
              A Nexo Intelligence é a frente de tecnologia inteligente da Nexo Sistemas. Desenvolvemos soluções
              personalizadas que conectam inteligência artificial, CRM e automações para transformar processos
              empresariais em operações mais eficientes, organizadas e inteligentes.
            </p>
            <p>
              Não se trata de instalar ferramentas. Primeiro entendemos como a sua operação funciona e onde ela
              trava. Depois desenhamos a arquitetura e implementamos peças que trabalham juntas, cada uma
              alimentando a outra.
            </p>
          </Surgir>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* O símbolo como diagrama: cada nó é um pilar, as arestas são as integrações entre eles. */}
          <Surgir className="relative mx-auto aspect-square w-full max-w-[420px]">
            <svg viewBox="-2 -2 44 40" className="h-full w-full overflow-visible" role="img" aria-label={`Diagrama do símbolo da Nexo com o pilar ${pilar.titulo} em destaque`}>
              {ARESTAS.map((a, i) => {
                const ligada = a.de === ativo || a.para === ativo;
                return (
                  <g key={i}>
                    <line
                      x1={NOS[a.de].cx}
                      y1={NOS[a.de].cy}
                      x2={NOS[a.para].cx}
                      y2={NOS[a.para].cy}
                      stroke={a.cor}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      opacity={ligada ? 1 : 0.22}
                      style={{ transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)" }}
                    />
                    {ligada && !reduzir && (
                      <circle r="0.9" fill="#ffffff">
                        <animateMotion
                          dur="1.8s"
                          repeatCount="indefinite"
                          path={
                            a.de === ativo
                              ? `M${NOS[a.de].cx},${NOS[a.de].cy} L${NOS[a.para].cx},${NOS[a.para].cy}`
                              : `M${NOS[a.para].cx},${NOS[a.para].cy} L${NOS[a.de].cx},${NOS[a.de].cy}`
                          }
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
              {NOS.map((n, i) => (
                <g key={i} style={{ transformOrigin: `${n.cx}px ${n.cy}px`, transform: `scale(${i === ativo ? 1.12 : 1})`, transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)" }}>
                  {i === ativo && (
                    <circle cx={n.cx} cy={n.cy} r="7.4" fill="none" stroke={PILARES[i].cor} strokeWidth="0.5" opacity="0.6" />
                  )}
                  <circle
                    cx={n.cx}
                    cy={n.cy}
                    r="5"
                    fill={i === ativo ? PILARES[i].cor : "var(--noite-alta)"}
                    stroke={PILARES[i].cor}
                    strokeWidth={i === ativo ? 0 : 0.7}
                    style={{ transition: "fill 500ms" }}
                  />
                </g>
              ))}
            </svg>
          </Surgir>

          <div>
            <div role="group" aria-label="Pilares da Nexo Intelligence" className="flex flex-col border-t border-white/12">
              {PILARES.map((p, i) => {
                const selecionado = i === ativo;
                return (
                  <button
                    key={p.titulo}
                    type="button"
                    aria-pressed={selecionado}
                    aria-controls="pilar-painel"
                    onClick={() => setAtivo(i)}
                    onMouseEnter={() => setAtivo(i)}
                    onFocus={() => setAtivo(i)}
                    className="group flex items-center gap-5 border-b border-white/12 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ background: p.cor, transform: selecionado ? "scale(1.3)" : "scale(1)", opacity: selecionado ? 1 : 0.45 }}
                      aria-hidden="true"
                    />
                    <span
                      className={`titulo text-[clamp(1.35rem,2.4vw,2rem)] leading-tight transition-colors ${
                        selecionado ? "text-white" : "text-white/55 group-hover:text-white/80"
                      }`}
                    >
                      {p.titulo}
                    </span>
                  </button>
                );
              })}
            </div>

            <div id="pilar-painel" aria-live="polite" className="mt-8 min-h-[11rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ativo}
                  initial={reduzir ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduzir ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="max-w-[52ch] text-lg leading-relaxed text-white/80">{pilar.resumo}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {pilar.faz.map((f) => (
                      <li key={f} className="rounded-full bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/15">
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
