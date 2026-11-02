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

// Os serviços da Nexo. Intelligence recebe destaque com o símbolo.
const SERVICOS = [
  { href: "/", rotulo: "Sistemas" },
  { href: "/sites", rotulo: "Sites" },
  { href: "/intelligence", rotulo: "Intelligence", destaque: true },
] as const;

/** Mini símbolo da Nexo que marca o link da Intelligence. */
function MarcaIntelligence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <line x1="20" y1="8" x2="9" y2="30" stroke="var(--menta)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="20" y1="8" x2="31" y2="30" stroke="var(--sol)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="9" y1="30" x2="31" y2="30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="20" cy="8" r="6.5" fill="var(--menta)" />
      <circle cx="9" cy="30" r="6.5" fill="var(--menta)" />
      <circle cx="31" cy="30" r="6.5" fill="var(--sol)" />
    </svg>
  );
}

export function Nav() {
  const reduzirMovimento = useReducedMotion();
  const { scrollY } = useScroll();
  const pathname = usePathname();
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

  function classeLink(ativo: boolean, destaque = false) {
    const base =
      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";
    if (destaque) {
      // Intelligence: sempre em pílula contornada, preenchida quando é a página atual.
      return `${base} font-semibold ${
        rolado
          ? ativo
            ? "bg-tinta text-white"
            : "text-tinta ring-1 ring-inset ring-tinta/20 hover:bg-tinta hover:text-white"
          : ativo
            ? "bg-white text-tinta"
            : "text-white ring-1 ring-inset ring-white/35 hover:bg-white hover:text-tinta"
      }`;
    }
    return `${base} ${
      rolado
        ? ativo
          ? "bg-cobalto/10 text-cobalto"
          : "text-tinta/65 hover:text-tinta"
        : ativo
          ? "bg-white/15 text-white"
          : "text-white/80 hover:text-white"
    }`;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`flex h-16 items-center justify-between gap-4 px-6 transition-[background-color,box-shadow] duration-300 sm:px-10 lg:px-16 ${
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

        <ul className="hidden items-center gap-1.5 whitespace-nowrap lg:flex">
          {SERVICOS.map((s) => {
            const ativo = pathname === s.href;
            const destaque = "destaque" in s && s.destaque;
            return (
              <li key={s.href}>
                <Link href={s.href} aria-current={ativo ? "page" : undefined} className={classeLink(ativo, destaque)}>
                  {destaque && <MarcaIntelligence className="h-4 w-4" />}
                  {s.rotulo}
                </Link>
              </li>
            );
          })}
          <li>
            <a href="#contato" onClick={(e) => irPara(e, "contato")} className={classeLink(false)}>
              Contato
            </a>
          </li>
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/orcamento"
            className={`${classeAcao("primaria")} !h-10 !px-5 !text-sm whitespace-nowrap`}
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
            <ul className="flex flex-col gap-1">
              {SERVICOS.map((s) => {
                const ativo = pathname === s.href;
                const destaque = "destaque" in s && s.destaque;
                return (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={() => setMenuAberto(false)}
                      aria-current={ativo ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-sm py-2.5 text-base focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        destaque ? "font-semibold text-tinta" : "font-medium"
                      } ${ativo ? "text-cobalto" : destaque ? "" : "text-tinta/70"}`}
                    >
                      {destaque && <MarcaIntelligence className="h-4 w-4 text-tinta" />}
                      {s.rotulo}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="#contato"
                  onClick={(e) => irPara(e, "contato")}
                  className="block rounded-sm py-2.5 text-base font-medium text-tinta/70 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Contato
                </a>
              </li>
            </ul>
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
