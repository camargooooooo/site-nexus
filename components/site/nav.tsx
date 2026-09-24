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
import { classeAcao } from "@/components/site/acao";
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
        className={`flex h-16 items-center justify-between px-6 transition-[background-color,box-shadow] duration-300 sm:px-10 lg:px-16 ${
          rolado
            ? "bg-white/95 shadow-[0_1px_0_rgb(11_22_80/0.08),0_8px_24px_-16px_rgb(11_22_80/0.25)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 "
          aria-label="Nexo Sistemas"
        >
          <Logo grande invertido={!rolado} />
        </Link>

        <ol className="hidden items-center gap-1 lg:flex">
          {SECOES.map((secaoItem) => {
            const ativoAtual = emSistemas && secaoItem.id === ativo;
            return (
              <li key={secaoItem.id}>
                <Link
                  href={`/#${secaoItem.id}`}
                  onClick={(e) => irPara(e, secaoItem.id)}
                  aria-current={ativoAtual ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    rolado
                      ? ativoAtual
                        ? "bg-cobalto/10 text-cobalto"
                        : "text-tinta/65 hover:text-tinta"
                      : ativoAtual
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:text-white"
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
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                rolado
                  ? pathname === "/sites"
                    ? "bg-cobalto/10 text-cobalto"
                    : "text-tinta/65 hover:text-tinta"
                  : pathname === "/sites"
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Sites
            </Link>
          </li>
        </ol>

        <div className="hidden lg:block">
          <Link
            href="/orcamento"
            className={`${classeAcao("primaria")} !h-10 !px-5 !text-sm`}
          >
            Pedir orçamento
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className={`flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2  lg:hidden ${
            rolado ? "text-tinta" : "text-white"
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

      <div className={`h-[3px] w-full ${rolado ? "bg-tinta/5" : "bg-white/10"}`}>
        <motion.div
          className="h-full rounded-r-full bg-menta"
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
            className="mx-3 mt-2 rounded-2xl bg-white px-5 py-5 sombra-tela lg:hidden"
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
                      className={`block rounded-sm py-2.5 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2  ${
                        ativoAtual ? "text-cobalto" : "text-tinta/70"
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
                  className={`block rounded-sm py-2.5 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2  ${
                    pathname === "/sites" ? "text-cobalto" : "text-tinta/70"
                  }`}
                >
                  Sites
                </Link>
              </li>
            </ol>
            <Link
              href="/orcamento"
              onClick={() => setMenuAberto(false)}
              className={`${classeAcao("primaria")} mt-5 w-full`}
            >
              Pedir orçamento
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
