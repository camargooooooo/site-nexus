"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CupomPDV, type ItemCupom } from "@/components/telas/cupom-pdv";
import { TelaPDV } from "@/components/telas/tela-pdv";
import { Acao, classeAcao } from "@/components/site/acao";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITENS: ItemCupom[] = [
  { nome: "Arroz tipo 1 5kg", preco: 24.9 },
  { nome: "Detergente 500ml", preco: 2.49 },
];

const NOS = [
  { cx: 60, cy: 20, cor: "var(--menta)", atraso: 0 },
  { cx: 28, cy: 86, cor: "var(--menta)", atraso: 0.09 },
  { cx: 92, cy: 86, cor: "var(--sol)", atraso: 0.18 },
];

const ARESTAS = [
  { x1: 60, y1: 20, x2: 28, y2: 86, cor: "var(--menta)", atraso: 0.5 },
  { x1: 60, y1: 20, x2: 92, y2: 86, cor: "var(--sol)", atraso: 0.59 },
  { x1: 28, y1: 86, x2: 92, y2: 86, cor: "#FFFFFF", atraso: 0.68 },
];

function Simbolo({ reduzir, className }: { reduzir: boolean | null; className?: string }) {
  return (
    <svg viewBox="0 0 120 106" className={className} aria-hidden="true">
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
          initial={reduzir ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: a.atraso }}
        />
      ))}
      {NOS.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r="14"
          fill={n.cor}
          initial={reduzir ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          transition={{ type: "spring", stiffness: 320, damping: 18, delay: n.atraso }}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const reduzirMovimento = useReducedMotion();
  const [mostrarCupom, setMostrarCupom] = useState(false);
  const [itensVisiveis, setItensVisiveis] = useState(0);
  const [ciclo, setCiclo] = useState(0);

  const { scrollY } = useScroll();
  const inclinacao = useTransform(scrollY, [0, 600], [-16, -4]);
  const subida = useTransform(scrollY, [0, 600], [0, -60]);

  useEffect(() => {
    if (reduzirMovimento) return;
    const t = setTimeout(() => setMostrarCupom(true), 1150);
    return () => clearTimeout(t);
  }, [reduzirMovimento]);

  useEffect(() => {
    if (!mostrarCupom || reduzirMovimento) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    ITENS.forEach((_, i) => {
      timers.push(setTimeout(() => setItensVisiveis(i + 1), 550 + i * 700));
    });

    const duracaoCiclo = 550 + ITENS.length * 700 + 2400;
    timers.push(
      setTimeout(() => {
        setItensVisiveis(0);
        setCiclo((c) => c + 1);
      }, duracaoCiclo),
    );

    return () => timers.forEach(clearTimeout);
  }, [mostrarCupom, ciclo, reduzirMovimento]);

  const cupomVisivel = reduzirMovimento || mostrarCupom;
  const quantosItens = reduzirMovimento ? ITENS.length : itensVisiveis;
  const totalAtual = ITENS.slice(0, quantosItens).reduce((soma, item) => soma + item.preco, 0);
  const entrada = (atraso: number) =>
    reduzirMovimento
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, ease: EASE, delay: atraso },
        };

  return (
    <section
      id="sec-01"
      className="secao-escura luz-topo relative isolate overflow-hidden"
    >

      <div className="mx-auto flex min-h-dvh max-w-[90rem] flex-col justify-center gap-12 px-6 pb-20 pt-28 sm:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-16">
        <div className="order-1 lg:w-[52%]">
          <motion.h1
            {...entrada(0.1)}
            className="titulo text-[clamp(2.5rem,4.7vw,4.75rem)] leading-[0.98] text-white"
          >
            <span className="block font-normal text-white/80 [font-stretch:100%]">
              Cada negócio funciona diferente.
            </span>
            <span className="mt-2 block">
              O sistema{" "}
              <span className="relative inline-block">
                também
                <svg
                  viewBox="0 0 300 24"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.18em] left-0 h-[0.3em] w-full"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M4 16 C 60 4, 120 22, 180 12 S 270 6, 296 14"
                    fill="none"
                    stroke="var(--menta)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    initial={reduzirMovimento ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
                  />
                </svg>
              </span>{" "}
              deveria.
            </span>
          </motion.h1>

          <motion.p
            {...entrada(0.25)}
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            Não adaptamos o seu negócio a um sistema pronto. Desenvolvemos o
            sistema sob medida, do jeito que ele já funciona.
          </motion.p>

          <motion.div {...entrada(0.4)} className="mt-10 flex flex-wrap items-center gap-3">
            <Acao href="/orcamento" tamanho="lg" seta>
              Pedir orçamento
            </Acao>
            <a href="#sec-02" className={classeAcao("fantasma-escuro", "lg")}>
              Ver como funciona
            </a>
          </motion.div>
        </div>

        {/* Mobile: símbolo e cupom. Desktop: o balcão inteiro em perspectiva. */}
        <div className="order-2 flex flex-col items-center gap-2 lg:hidden">
          <Simbolo reduzir={reduzirMovimento} className="h-[96px] w-[108px]" />
          <motion.div
            initial={reduzirMovimento ? false : { opacity: 0, y: 16 }}
            animate={cupomVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="mt-4 w-full max-w-[300px]"
          >
            <CupomPDV itens={ITENS.slice(0, quantosItens)} total={totalAtual} />
          </motion.div>
        </div>

        <div className="relative order-2 hidden h-[700px] lg:block lg:w-[48%] [perspective:1800px]">
          <motion.div
            style={reduzirMovimento ? { rotateY: -8 } : { rotateY: inclinacao, y: subida }}
            className="absolute left-[6%] top-[4%] w-[640px] origin-left"
          >
            <motion.div
              initial={reduzirMovimento ? false : { opacity: 0, x: 80, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              className="origin-left rounded-xl sombra-tela-escura"
            >
              <TelaPDV destaque="total" />
            </motion.div>
          </motion.div>


          <Simbolo
            reduzir={reduzirMovimento}
            className="absolute -bottom-[2%] right-[4%] h-[96px] w-[108px] drop-shadow-[0_12px_24px_rgb(3_8_40/0.35)]"
          />

          <motion.div
            initial={reduzirMovimento ? false : { opacity: 0, y: 40, scale: 0.92 }}
            animate={cupomVisivel ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="absolute bottom-[15%] left-0 w-[290px] -rotate-2"
          >
            <CupomPDV itens={ITENS.slice(0, quantosItens)} total={totalAtual} />
          </motion.div>
        </div>
      </div>

      <FaixaNegocios />
    </section>
  );
}

const NEGOCIOS = ["Restaurante", "Lanchonete", "Mercadinho", "Loja", "Depósito", "Distribuidora"];

function FaixaNegocios() {
  const lista = [...NEGOCIOS, ...NEGOCIOS, ...NEGOCIOS, ...NEGOCIOS];
  return (
    <div className="border-t border-white/15 bg-cobalto-escuro/60">
      <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-10 lg:px-16">
        <p className="shrink-0 text-sm font-semibold text-white">Do pequeno restaurante à distribuidora</p>
        <div className="relative w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="faixa-rolando flex w-max items-center gap-8" aria-label="Tipos de negócio atendidos">
            {lista.map((n, i) => (
              <li
                key={i}
                aria-hidden={i >= NEGOCIOS.length ? "true" : undefined}
                className="flex items-center gap-8 whitespace-nowrap text-sm font-medium text-white/85"
              >
                {n}
                <span className="h-1.5 w-1.5 rounded-full bg-menta" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
