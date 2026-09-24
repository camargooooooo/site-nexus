"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const COOKIE = "nexo_consentimento";
const EVENTO = "nexo:cookies";
const UM_ANO = 60 * 60 * 24 * 365;

type Escolha = "aceito" | "recusado";

function lerEscolha(): Escolha | null {
  const par = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  const valor = par?.split("=")[1];
  return valor === "aceito" || valor === "recusado" ? valor : null;
}

let reaberto = false;

function assinar(avisar: () => void) {
  window.addEventListener(EVENTO, avisar);
  return () => window.removeEventListener(EVENTO, avisar);
}

function visivelAgora() {
  return reaberto || lerEscolha() === null;
}

/** Reabre o aviso para a pessoa mudar a escolha (link do rodapé). */
export function abrirPreferenciasDeCookies() {
  reaberto = true;
  window.dispatchEvent(new Event(EVENTO));
}

/** Use antes de ligar qualquer medição (analytics, pixel etc.). */
export function consentiuMedicao() {
  return typeof document !== "undefined" && lerEscolha() === "aceito";
}

function salvar(escolha: Escolha) {
  const seguro = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${escolha}; Max-Age=${UM_ANO}; Path=/; SameSite=Lax${seguro}`;
  reaberto = false;
  window.dispatchEvent(new Event(EVENTO));
}

export function AvisoCookies() {
  const visivel = useSyncExternalStore(assinar, visivelAgora, () => false);
  const reduzir = useReducedMotion();

  return (
    <AnimatePresence>
      {visivel && (
        <motion.section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookies-titulo"
          initial={reduzir ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl bg-white p-5 text-tinta sombra-tela ring-1 ring-tinta/10 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
        >
          <h2 id="cookies-titulo" className="titulo text-lg">
            Cookies
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-tinta/75">
            Usamos só o necessário para o site funcionar. Com a sua permissão,
            poderemos medir as visitas para melhorar o site. Você pode mudar
            isso quando quiser no rodapé.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => salvar("aceito")}
              className="inline-flex h-10 items-center rounded-full bg-menta px-5 text-sm font-bold text-tinta transition-colors hover:bg-[#5cf0a8] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={() => salvar("recusado")}
              className="inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold text-tinta ring-1 ring-inset ring-tinta/20 transition-colors hover:bg-papel focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Só o necessário
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export function BotaoPreferenciasCookies({ className }: { className?: string }) {
  return (
    <button type="button" onClick={abrirPreferenciasDeCookies} className={className}>
      Preferências de cookies
    </button>
  );
}
