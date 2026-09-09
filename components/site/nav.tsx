"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "motion/react";
import { Logo } from "@/components/site/logo";
import { SECOES } from "@/components/site/secoes";
import { useSecaoAtiva } from "@/components/site/use-secao-ativa";

export function Nav() {
  const { ativo } = useSecaoAtiva();
  const reduzirMovimento = useReducedMotion();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const emSistemas = pathname === "/";
  const [progresso, setProgresso] = useState(0);
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (typeof document === "undefined") return;
    setRolado(v > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setProgresso(max > 0 ? Math.min(100, Math.round((v / max) * 100)) : 0);
  });

  function irPara(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    e.preventDefault();
    setMenuAberto(false);
    elemento.scrollIntoView({ behavior: reduzirMovimento ? "auto" : "smooth" });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`flex h-16 items-center justify-between px-6 transition-colors duration-300 sm:px-10 lg:px-16 ${
          rolado
            ? "bg-branco/85 shadow-[0_1px_0_rgba(23,53,94,0.08)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
          aria-label="Nexo Sistemas"
        >
          <Logo grande invertido={!rolado} />
        </Link>

        <ol className="hidden items-center gap-7 lg:flex">
          {SECOES.map((secaoItem) => {
            const ativoAtual = emSistemas && secaoItem.id === ativo;
            return (
              <li key={secaoItem.id}>
                <Link
                  href={`/#${secaoItem.id}`}
                  onClick={(e) => irPara(e, secaoItem.id)}
                  aria-current={ativoAtual ? "true" : undefined}
                  className={`text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul ${
                    rolado
                      ? ativoAtual
                        ? "text-marinho"
                        : "text-marinho/50 hover:text-marinho"
                      : ativoAtual
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                  }`}
                >
                  {secaoItem.rotulo}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/sites"
              aria-current={pathname === "/sites" ? "true" : undefined}
              className={`text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul ${
                rolado
                  ? pathname === "/sites"
                    ? "text-marinho"
                    : "text-marinho/50 hover:text-marinho"
                  : pathname === "/sites"
                    ? "text-white"
                    : "text-white/60 hover:text-white"
              }`}
            >
              Sites
            </Link>
          </li>
        </ol>

        <div className="hidden lg:block">
          <Link
            href="/orcamento"
            className="inline-flex h-10 items-center justify-center rounded-full bg-verde-forte px-6 text-sm font-medium text-white transition-colors hover:bg-[#12694A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
          >
            Pedir orçamento
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className={`flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul lg:hidden ${
            rolado ? "text-marinho" : "text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            {menuAberto ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      <div className="h-[2px] w-full bg-marinho/10">
        <motion.div
          className="h-full bg-verde-forte"
          animate={{ width: `${progresso}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={reduzirMovimento ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="border-b border-marinho/10 bg-branco px-6 py-6 shadow-lg lg:hidden"
          >
            <ol className="flex flex-col gap-1">
              {SECOES.map((secaoItem) => {
                const ativoAtual = emSistemas && secaoItem.id === ativo;
                return (
                  <li key={secaoItem.id}>
                    <Link
                      href={`/#${secaoItem.id}`}
                      onClick={(e) => irPara(e, secaoItem.id)}
                      aria-current={ativoAtual ? "true" : undefined}
                      className={`block rounded-sm py-2.5 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul ${
                        ativoAtual ? "text-marinho" : "text-marinho/55"
                      }`}
                    >
                      {secaoItem.rotulo}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/sites"
                  onClick={() => setMenuAberto(false)}
                  aria-current={pathname === "/sites" ? "true" : undefined}
                  className={`block rounded-sm py-2.5 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul ${
                    pathname === "/sites" ? "text-marinho" : "text-marinho/55"
                  }`}
                >
                  Sites
                </Link>
              </li>
            </ol>
            <Link
              href="/orcamento"
              onClick={() => setMenuAberto(false)}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-verde-forte px-6 text-base font-medium text-white transition-colors hover:bg-[#12694A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
            >
              Pedir orçamento
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
