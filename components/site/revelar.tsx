"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Título que sobe e ganha foco quando entra na tela, palavra por palavra. */
export function TituloRevelado({
  texto,
  como: Tag = "h2",
  className,
}: {
  texto: string;
  como?: "h1" | "h2" | "p";
  className?: string;
}) {
  const reduzir = useReducedMotion();
  const palavras = texto.split(" ");

  if (reduzir) return <Tag className={className}>{texto}</Tag>;

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      aria-label={texto}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.045 }}
    >
      {palavras.map((palavra, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              oculto: { y: "105%", filter: "blur(6px)" },
              visivel: { y: "0%", filter: "blur(0px)" },
            }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {palavra}
            {i < palavras.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Tela de demonstração que se ergue em perspectiva ao entrar na tela. */
export function TelaErguida({ children, className }: { children: ReactNode; className?: string }) {
  const reduzir = useReducedMotion();
  return (
    <div className={`[perspective:1600px] ${className ?? ""}`}>
      <motion.div
        initial={reduzir ? false : { opacity: 0, rotateX: 14, y: 48, scale: 0.96 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ transformOrigin: "50% 100%" }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}
