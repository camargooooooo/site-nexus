"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Faz toda animação de transformação da página respeitar prefers-reduced-motion. */
export function MovimentoDoUsuario({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
