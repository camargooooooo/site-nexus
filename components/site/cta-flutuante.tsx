"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";

export function CtaFlutuante() {
  const { scrollY } = useScroll();
  const reduzirMovimento = useReducedMotion();
  const [visivel, setVisivel] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setVisivel(v > window.innerHeight * 0.6);
  });

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={reduzirMovimento ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-6 right-6 z-40 lg:hidden"
        >
          <Link
            href="/orcamento"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-menta px-5 text-sm font-bold text-tinta shadow-[0_14px_32px_-8px_rgb(11_22_80/0.45)] ring-2 ring-white transition-colors hover:bg-[#5cf0a8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M4 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Pedir orçamento
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
