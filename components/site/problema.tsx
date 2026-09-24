"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const FRASES = [
  "A gente identifica o que trava a sua operação.",
  "Simplifica a gestão. Automatiza o que é repetitivo.",
  "Menos planilha, menos retrabalho, menos tempo perdido.",
  "Tecnologia que resolve problemas reais do seu negócio.",
];

function Frase({
  texto,
  progresso,
  indice,
  total,
  destaque,
}: {
  texto: string;
  progresso: MotionValue<number>;
  indice: number;
  total: number;
  destaque?: boolean;
}) {
  const banda = 1 / total;
  const inicio = indice * banda;
  const fim = (indice + 1) * banda;
  const aceno = banda * 0.4;

  const opacidade = useTransform(
    progresso,
    indice === 0
      ? [inicio, fim - aceno, fim]
      : indice === total - 1
        ? [inicio, inicio + aceno, fim]
        : [inicio, inicio + aceno, fim - aceno, fim],
    indice === 0 ? [1, 1, 0] : indice === total - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const deslocamento = useTransform(opacidade, [0, 1], [22, 0]);
  const escala = useTransform(opacidade, [0, 1], [0.96, 1]);
  const desfoque = useTransform(opacidade, [0, 1], [6, 0]);
  const filtro = useMotionTemplate`blur(${desfoque}px)`;

  return (
    <motion.p
      style={{ opacity: opacidade, y: deslocamento, scale: escala, filter: filtro }}
      className={`absolute inset-x-0 max-w-[22ch] titulo leading-[1.02] ${
        destaque
          ? "text-[clamp(2.75rem,6.5vw,5.75rem)] text-cobalto"
          : "text-[clamp(2.25rem,5.2vw,4.5rem)] font-medium text-tinta [font-stretch:100%]"
      }`}
    >
      {texto}
    </motion.p>
  );
}

export function Problema() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="secao-clara">
      {!reduzirMovimento && (
        <div ref={ref} className="relative hidden lg:block" style={{ height: "260vh" }}>
          <div className="sticky top-0 flex h-dvh items-center px-16">
            <div className="relative h-[340px] w-full">
              {FRASES.map((texto, i) => (
                <Frase
                  key={texto}
                  texto={texto}
                  progresso={scrollYProgress}
                  indice={i}
                  total={FRASES.length}
                  destaque={i === FRASES.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`space-y-14 px-6 py-24 sm:px-10 ${reduzirMovimento ? "" : "lg:hidden"}`}>
        {FRASES.map((texto, i) => (
          <p
            key={texto}
            className={`max-w-[18ch] titulo text-[clamp(2rem,8vw,3rem)] leading-[1.08] ${
              i === FRASES.length - 1 ? "text-cobalto" : "font-medium text-tinta [font-stretch:100%]"
            }`}
          >
            {texto}
          </p>
        ))}
      </div>
    </section>
  );
}
