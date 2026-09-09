"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { FichaFiado } from "@/components/telas/ficha-fiado";

const CAMADAS = [
  { titulo: "Produto", texto: "Cada produto cadastrado, com preço e código de barras." },
  { titulo: "Estoque", texto: "Loja e depósito, sempre atualizados a cada venda." },
  { titulo: "Caixa", texto: "Dinheiro, Pix, cartão e fiado, fechando no fim do dia." },
  { titulo: "Fiado", texto: "Quem levou, quanto levou, quanto falta pagar e quando foi registrado." },
  { titulo: "Relatórios", texto: "Tudo isso vira relatório em PDF ou Excel." },
];

function Camada({
  titulo,
  progresso,
  indice,
  total,
}: {
  titulo: string;
  progresso: MotionValue<number>;
  indice: number;
  total: number;
}) {
  const inicio = indice / total;
  const opacidade = useTransform(progresso, [inicio, inicio + 0.06], [0.25, 1]);
  const x = useTransform(progresso, [inicio, inicio + 0.06], [-8, 0]);

  return (
    <motion.li
      style={{ opacity: opacidade, x }}
      className="flex items-center gap-5 border-b border-white/10 py-5"
    >
      <span className="font-[family-name:var(--font-archivo)] text-base tabular-nums text-white/35">
        {String(indice + 1).padStart(2, "0")}
      </span>
      <span className="font-[family-name:var(--font-archivo)] text-3xl font-semibold text-white lg:text-4xl">
        {titulo}
      </span>
    </motion.li>
  );
}

function PainelFiado() {
  return (
    <div>
      <ul className="space-y-1.5 text-[15px] text-white/70">
        <li>
          <span className="font-medium text-white">Quem levou?</span> Fernando Batista.
        </li>
        <li>
          <span className="font-medium text-white">Quanto levou?</span> R$ 46,80 em produtos.
        </li>
        <li>
          <span className="font-medium text-white">Quanto falta pagar?</span> R$ 46,80.
        </li>
        <li>
          <span className="font-medium text-white">Quando foi registrado?</span> 02/09, na hora da venda.
        </li>
      </ul>
      <div className="mt-5 max-w-sm">
        <FichaFiado />
      </div>
    </div>
  );
}

export function Camadas() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [passoAtivo, setPassoAtivo] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPassoAtivo(Math.min(CAMADAS.length - 1, Math.floor(v * CAMADAS.length)));
  });

  const atual = CAMADAS[passoAtivo];

  return (
    <section id="sec-05" className="secao-escura">
      <div className="px-6 pt-24 sm:px-10 lg:px-16">
        <motion.svg
          viewBox="0 0 120 106"
          className="h-14 w-16"
          initial={reduzirMovimento ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          aria-hidden="true"
        >
          {[
            { x1: 60, y1: 20, x2: 28, y2: 86, cor: "var(--verde)", atraso: 0.3 },
            { x1: 60, y1: 20, x2: 92, y2: 86, cor: "#178F82", atraso: 0.39 },
            { x1: 28, y1: 86, x2: 92, y2: 86, cor: "#FFFFFF", atraso: 0.48 },
          ].map((a, i) => (
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
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1], delay: a.atraso }}
            />
          ))}
          {[
            { cx: 60, cy: 20, cor: "var(--verde)", atraso: 0 },
            { cx: 28, cy: 86, cor: "var(--verde)", atraso: 0.09 },
            { cx: 92, cy: 86, cor: "var(--azul)", atraso: 0.18 },
          ].map((n, i) => (
            <motion.circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r="14"
              fill={n.cor}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
              initial={reduzirMovimento ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1], delay: n.atraso }}
            />
          ))}
        </motion.svg>
        <p className="mt-6 font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-white/40">
          05
        </p>
        <h2 className="mt-2 max-w-[18ch] font-[family-name:var(--font-archivo)] text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
          Camadas do Nexo
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-white/65">
          Um sistema construído sob medida, em cima do que já existe no seu negócio.
        </p>
      </div>

      {!reduzirMovimento && (
        <div ref={ref} className="relative hidden lg:block" style={{ height: "350vh" }}>
          <div className="sticky top-0 flex h-dvh items-center px-16">
            <div className="grid w-full grid-cols-2 gap-16">
              <ol>
                {CAMADAS.map((c, i) => (
                  <Camada key={c.titulo} titulo={c.titulo} progresso={scrollYProgress} indice={i} total={CAMADAS.length} />
                ))}
              </ol>
              <div className="border-l border-white/10 pl-12">
                <p className="text-sm text-white/40">
                  {String(passoAtivo + 1).padStart(2, "0")} / {String(CAMADAS.length).padStart(2, "0")}
                </p>
                {atual.titulo === "Fiado" ? (
                  <div className="mt-3">
                    <PainelFiado />
                  </div>
                ) : (
                  <p className="mt-3 max-w-[36ch] text-xl leading-relaxed text-white/75">{atual.texto}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`space-y-10 px-6 py-16 sm:px-10 lg:px-16 ${reduzirMovimento ? "" : "lg:hidden"}`}>
        {CAMADAS.map((c) => (
          <div key={c.titulo} className="border-t border-white/10 pt-6">
            <p className="font-[family-name:var(--font-archivo)] text-2xl font-semibold text-white">{c.titulo}</p>
            {c.titulo === "Fiado" ? (
              <div className="mt-3">
                <PainelFiado />
              </div>
            ) : (
              <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-white/65">{c.texto}</p>
            )}
          </div>
        ))}
      </div>
      <div className="h-16" />
    </section>
  );
}
