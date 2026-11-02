"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { TituloRevelado } from "@/components/site/revelar";
import { EASE, Surgir } from "@/components/site/intelligence/comum";

const ETAPAS = [
  { titulo: "Diagnóstico", texto: "Entendimento da empresa, dos processos e das necessidades. Conversamos com quem opera, não só com quem decide." },
  { titulo: "Arquitetura", texto: "Planejamento das integrações, dos sistemas e das soluções. O que conecta com o quê, onde a IA entra e onde não entra." },
  { titulo: "Desenvolvimento", texto: "Construção e configuração da tecnologia, com entregas que a sua equipe acompanha e valida." },
  { titulo: "Implantação", texto: "Integração à operação real e preparação da equipe para usar, ajustar e confiar no que foi entregue." },
  { titulo: "Evolução", texto: "Acompanhamento, melhorias e expansão das funcionalidades conforme a operação muda e cresce." },
] as const;

export function Processo() {
  const reduzir = useReducedMotion();
  const trilho = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trilho, offset: ["start 75%", "end 55%"] });
  const preenchimento = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="int-processo" aria-label="Implementação personalizada" className="secao-noite text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <TituloRevelado
            texto="Tecnologia construída em torno da sua operação."
            className="titulo max-w-[18ch] text-[clamp(2.25rem,4.3vw,4rem)] leading-[0.97] text-white"
          />
          <Surgir>
            <p className="max-w-[46ch] text-lg leading-relaxed text-white/80">
              Cada empresa tem uma realidade operacional diferente. Por isso não existe pacote: o projeto nasce do
              diagnóstico e segue cinco etapas, do entendimento à evolução contínua.
            </p>
          </Surgir>
        </div>

        <ol ref={trilho} className="relative mt-16 grid gap-10 pl-12 lg:mt-24 lg:grid-cols-5 lg:gap-8 lg:pl-0 lg:pt-14">
          <span aria-hidden="true" className="absolute bottom-2 left-[0.9rem] top-2 w-px bg-white/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[0.9rem] lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden="true"
            style={reduzir ? undefined : { scaleY: preenchimento }}
            className="absolute bottom-2 left-[0.9rem] top-2 w-px origin-top bg-menta lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            style={reduzir ? undefined : { scaleX: preenchimento }}
            className="absolute left-0 right-0 top-[0.9rem] hidden h-px origin-left bg-menta lg:block"
          />
          {ETAPAS.map((e, i) => (
            <motion.li
              key={e.titulo}
              className="relative"
              initial={reduzir ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 * i }}
            >
              <span
                aria-hidden="true"
                className="absolute -left-12 top-0 flex h-[1.8rem] w-[1.8rem] items-center justify-center rounded-full bg-noite ring-1 ring-white/30 lg:-top-14 lg:left-0"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${i === ETAPAS.length - 1 ? "bg-sol" : "bg-menta"}`} />
              </span>
              <span className="titulo block text-[2.5rem] leading-none tabular-nums text-white/25">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="titulo mt-3 text-[clamp(1.25rem,1.7vw,1.5rem)] text-white">{e.titulo}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">{e.texto}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
