"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TituloRevelado } from "@/components/site/revelar";
import { EASE, Surgir } from "@/components/site/intelligence/comum";

const ETAPAS = [
  {
    nome: "Entrada de informação",
    curto: "Entrada",
    cor: "#ffffff",
    papel: "Tudo começa num evento: uma mensagem, um formulário, um pedido no sistema, uma planilha atualizada ou um e-mail recebido.",
    exemplo: "Um pedido novo cai no sistema de vendas às 14h02.",
  },
  {
    nome: "Processamento",
    curto: "Processa",
    cor: "var(--ceu)",
    papel: "Os dados são validados, padronizados e cruzados com o que já existe: cliente cadastrado, estoque, histórico, condições.",
    exemplo: "O cliente é localizado no CRM e o estoque dos itens é conferido.",
  },
  {
    nome: "Inteligência artificial",
    curto: "IA",
    cor: "var(--sol)",
    papel: "Onde há texto livre ou decisão por contexto, a IA interpreta, classifica e sugere o próximo passo, dentro das regras definidas.",
    exemplo: "A observação do pedido pede entrega urgente: prioridade alta.",
  },
  {
    nome: "Ação automática",
    curto: "Ação",
    cor: "var(--menta)",
    papel: "O fluxo executa: cria registros, dispara notificações, atualiza outros sistemas e distribui tarefas para as pessoas certas.",
    exemplo: "A expedição recebe o alerta e a tarefa de separação é criada.",
  },
  {
    nome: "Resultado",
    curto: "Resultado",
    cor: "var(--menta)",
    papel: "A operação anda sem ninguém repassar informação à mão, e cada passo fica registrado para consulta e indicadores.",
    exemplo: "O cliente recebe a confirmação e o gestor vê o pedido no painel.",
  },
] as const;

const EXEMPLOS = [
  "Integração entre sistemas",
  "Distribuição automática de solicitações",
  "Notificações e alertas",
  "Atualização de registros",
  "Fluxos de atendimento",
  "Integrações com ferramentas externas",
  "Processos comerciais automatizados",
  "Comunicação entre departamentos",
];

export function Automacoes() {
  const reduzir = useReducedMotion();
  const [ativa, setAtiva] = useState(0);
  const [automatico, setAutomatico] = useState(true);

  // Percorre as etapas sozinho até o visitante interagir.
  useEffect(() => {
    if (!automatico || reduzir) return;
    const t = setInterval(() => setAtiva((a) => (a + 1) % ETAPAS.length), 3200);
    return () => clearInterval(t);
  }, [automatico, reduzir]);

  function escolher(i: number) {
    setAutomatico(false);
    setAtiva(i);
  }

  const etapa = ETAPAS[ativa];

  return (
    <section id="int-automacoes" aria-label="Automações inteligentes" className="secao-profunda text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <TituloRevelado
            texto="Processos que acontecem sem depender de tarefas manuais."
            className="titulo max-w-[19ch] text-[clamp(2.25rem,4.3vw,4rem)] leading-[0.97] text-white"
          />
          <Surgir>
            <p className="max-w-[46ch] text-lg leading-relaxed text-white/80">
              Conectamos os sistemas que a sua empresa já usa e automatizamos o caminho entre eles. Clique em cada
              etapa do fluxo para ver o papel que ela cumpre.
            </p>
          </Surgir>
        </div>

        <Surgir className="mt-16">
          <ol className="relative grid grid-cols-1 gap-3 md:grid-cols-5 md:gap-0" aria-label="Fluxo de automação">
            {/* Trilho com o pulso que percorre o fluxo. */}
            <div aria-hidden="true" className="pointer-events-none absolute left-[1.75rem] top-7 bottom-7 w-px bg-white/15 md:left-[10%] md:right-[10%] md:top-[1.75rem] md:bottom-auto md:h-px md:w-auto">
              <div
                className="absolute inset-0 origin-top bg-menta md:hidden"
                style={{ transform: `scaleY(${ativa / (ETAPAS.length - 1)})`, transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)" }}
              />
              <div
                className="absolute inset-0 hidden origin-left bg-menta md:block"
                style={{ transform: `scaleX(${ativa / (ETAPAS.length - 1)})`, transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)" }}
              />
            </div>
            {ETAPAS.map((e, i) => {
              const selecionada = i === ativa;
              const passou = i <= ativa;
              return (
                <li key={e.nome} className="relative md:flex md:justify-center">
                  <button
                    type="button"
                    onClick={() => escolher(i)}
                    aria-pressed={selecionada}
                    aria-controls="fluxo-detalhe"
                    className="group flex w-full items-center gap-4 rounded-2xl p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 md:w-auto md:flex-col md:gap-3 md:text-center"
                  >
                    <span
                      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                        selecionada ? "scale-110 bg-noite-alta ring-white/40" : passou ? "bg-noite-alta ring-white/25" : "bg-noite ring-white/15"
                      }`}
                      style={selecionada ? { boxShadow: `0 12px 28px -10px ${e.cor}` } : undefined}
                    >
                      <span
                        className="h-4 w-4 rounded-full transition-transform duration-500"
                        style={{ background: e.cor, transform: selecionada ? "scale(1.25)" : "scale(1)", opacity: passou ? 1 : 0.5 }}
                        aria-hidden="true"
                      />
                      {selecionada && !reduzir && (
                        <span className="absolute inset-0 animate-ping rounded-full ring-1 ring-white/30 [animation-duration:2.2s]" aria-hidden="true" />
                      )}
                    </span>
                    <span className="flex flex-col md:items-center">
                      <span className="text-xs font-semibold tabular-nums text-white/55">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`text-[15px] font-semibold transition-colors ${selecionada ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                        {e.nome}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Surgir>

        <div id="fluxo-detalhe" aria-live="polite" className="mt-12 rounded-[1.65rem] bg-white/[0.04] p-6 ring-1 ring-inset ring-white/12 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={ativa}
              initial={reduzir ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduzir ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid gap-6 md:grid-cols-2 md:gap-12"
            >
              <div>
                <h3 className="titulo flex items-center gap-3 text-2xl text-white">
                  <span className="h-3 w-3 rounded-full" style={{ background: etapa.cor }} aria-hidden="true" />
                  {etapa.nome}
                </h3>
                <p className="mt-3 max-w-[48ch] text-[17px] leading-relaxed text-white/80">{etapa.papel}</p>
              </div>
              <div className="border-t border-white/12 pt-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <p className="text-sm font-semibold text-white/60">Na prática, por exemplo</p>
                <p className="titulo mt-2 text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-white">{etapa.exemplo}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {!reduzir && (
        <div className="mt-4 flex items-center justify-end gap-3 text-sm">
          <button
            type="button"
            onClick={() => setAutomatico((v) => !v)}
            className="rounded-full px-3 py-1.5 font-semibold text-white/75 ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {automatico ? "Pausar o fluxo" : "Percorrer sozinho"}
          </button>
        </div>
        )}

        <Surgir className="mt-20 grid gap-8 border-t border-white/12 pt-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h3 className="titulo text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.05] text-white">O que dá para automatizar</h3>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {EXEMPLOS.map((ex) => (
              <li key={ex} className="flex items-center gap-3 border-b border-white/10 py-3.5 text-[17px] text-white/85">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sol" aria-hidden="true" />
                {ex}
              </li>
            ))}
          </ul>
        </Surgir>
      </div>
    </section>
  );
}
