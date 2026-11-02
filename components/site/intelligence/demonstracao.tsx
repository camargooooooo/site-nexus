"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TelaErguida, TituloRevelado } from "@/components/site/revelar";
import { EASE, SeloDemo, Surgir } from "@/components/site/intelligence/comum";

const MENSAGEM =
  "Boa tarde! Vocês fazem manutenção preventiva de ar-condicionado para empresas? Temos 14 aparelhos no escritório e queria um orçamento.";

const PASSOS = [
  {
    titulo: "A mensagem chega",
    texto: "Um potencial cliente escreve pelo canal de mensagens da empresa, fora do horário comercial. Ninguém precisa estar online.",
  },
  {
    titulo: "A IA interpreta a solicitação",
    texto: "O agente lê o texto livre e separa o que importa: o que a pessoa quer, qual serviço, quanto e para quem.",
  },
  {
    titulo: "O sistema identifica o contexto",
    texto: "Os dados extraídos são cruzados com o que a empresa já sabe: se o contato é novo, se a região é atendida, se o serviço existe no catálogo.",
  },
  {
    titulo: "A solicitação é classificada",
    texto: "Com intenção e contexto, a solicitação ganha categoria, prioridade e a equipe responsável, pelas regras que a empresa definiu.",
  },
  {
    titulo: "O CRM registra o atendimento",
    texto: "Um lead é criado no pipeline com a conversa, os dados extraídos e a origem. Nada se perde entre o contato e o comercial.",
  },
  {
    titulo: "A equipe recebe a oportunidade",
    texto: "A pessoa responsável é avisada com um resumo pronto e uma sugestão de resposta, que ela revisa antes de enviar.",
  },
] as const;

function Linha({ rotulo, valor, destaque }: { rotulo: string; valor: ReactNode; destaque?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-tinta/8 py-2.5 text-[14px] last:border-0">
      <span className="text-tinta/60">{rotulo}</span>
      <span className={`text-right font-semibold ${destaque ? "text-cobalto" : "text-tinta"}`}>{valor}</span>
    </div>
  );
}

function Marca({ children, cor }: { children: ReactNode; cor: string }) {
  return (
    <mark className="rounded-[0.3rem] px-1 py-0.5 text-tinta" style={{ background: cor }}>
      {children}
    </mark>
  );
}

function Tela({ passo }: { passo: number }) {
  const interpretado = passo >= 1;
  return (
    <div className="space-y-4">
      <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-papel px-4 py-3 ring-1 ring-inset ring-tinta/8">
        <span className="flex items-center justify-between gap-3 text-xs font-semibold text-tinta/60">
          <span>Juliana · (11) 9xxxx-xx12</span>
          <span className="tabular-nums">19:47</span>
        </span>
        <p className="mt-1 text-[15px] leading-relaxed text-tinta">
          {interpretado ? (
            <>
              Boa tarde! Vocês fazem <Marca cor="rgb(255 197 61 / 0.45)">manutenção preventiva de ar-condicionado</Marca>{" "}
              para <Marca cor="rgb(46 232 143 / 0.4)">empresas</Marca>? Temos{" "}
              <Marca cor="rgb(185 200 255 / 0.7)">14 aparelhos</Marca> no escritório e queria um{" "}
              <Marca cor="rgb(255 197 61 / 0.45)">orçamento</Marca>.
            </>
          ) : (
            MENSAGEM
          )}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={passo}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {passo === 0 && (
            <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-tinta/70 ring-1 ring-inset ring-tinta/10">
              <span className="pulso-vivo h-2 w-2 rounded-full bg-menta-forte" aria-hidden="true" />
              Nova mensagem recebida. Encaminhando para o agente…
            </div>
          )}
          {passo === 1 && (
            <div className="rounded-xl bg-white px-4 py-2 ring-1 ring-inset ring-tinta/10">
              <p className="pt-1 text-xs font-semibold text-tinta/55">O agente extraiu</p>
              <Linha rotulo="Intenção" valor="Pedido de orçamento" destaque />
              <Linha rotulo="Serviço" valor="Manutenção preventiva" />
              <Linha rotulo="Quantidade" valor={<span className="tabular-nums">14 aparelhos</span>} />
              <Linha rotulo="Tipo de cliente" valor="Empresa" />
            </div>
          )}
          {passo === 2 && (
            <ul className="space-y-2">
              {[
                ["Contato", "Novo, sem cadastro"],
                ["Região", "Dentro da área atendida"],
                ["Serviço", "Existe no catálogo"],
                ["Volume", "Acima de 10 aparelhos: contrato empresarial"],
              ].map(([r, v], i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.12 * i }}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-[14px] ring-1 ring-inset ring-tinta/10"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-menta-escura" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-tinta/60">{r}</span>
                  <span className="ml-auto text-right font-semibold text-tinta">{v}</span>
                </motion.li>
              ))}
            </ul>
          )}
          {passo === 3 && (
            <div className="flex flex-wrap gap-2">
              {[
                ["Categoria", "Comercial · orçamento", "bg-cobalto text-white"],
                ["Prioridade", "Alta", "bg-sol text-tinta"],
                ["Equipe", "Contratos empresariais", "bg-menta text-tinta"],
              ].map(([r, v, c], i) => (
                <motion.span
                  key={r}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 * i }}
                  className={`inline-flex flex-col rounded-2xl px-4 py-2.5 ${c}`}
                >
                  <span className="text-[11px] font-semibold opacity-75">{r}</span>
                  <span className="text-[15px] font-semibold">{v}</span>
                </motion.span>
              ))}
            </div>
          )}
          {passo === 4 && (
            <div className="overflow-hidden rounded-xl bg-white ring-1 ring-inset ring-tinta/10">
              <div className="flex items-center justify-between bg-cobalto px-4 py-2 text-[13px] font-medium text-white">
                <span>CRM · Novo lead</span>
                <span className="tabular-nums text-white/75">#2.481</span>
              </div>
              <div className="px-4 py-1">
                <Linha rotulo="Contato" valor="Juliana" />
                <Linha rotulo="Origem" valor="Mensagem · triada pelo agente" />
                <Linha rotulo="Interesse" valor="Manutenção preventiva, 14 un." />
                <Linha rotulo="Etapa" valor="Novo lead" destaque />
              </div>
            </div>
          )}
          {passo === 5 && (
            <div className="rounded-xl bg-tinta px-4 py-4 text-white">
              <p className="flex items-center gap-2 text-xs font-semibold text-menta">
                <span className="h-1.5 w-1.5 rounded-full bg-menta" aria-hidden="true" />
                Para Rafael · Contratos empresariais
              </p>
              <p className="mt-2 text-[15px] font-semibold">Nova oportunidade: manutenção preventiva, 14 aparelhos.</p>
              <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[14px] leading-relaxed text-white/85">
                Sugestão de resposta: “Oi, Juliana! Atendemos empresas, sim. Para montar o orçamento, posso agendar uma
                visita técnica nesta semana?”
              </p>
              <p className="mt-2 text-xs text-white/60">Rafael revisa e envia. A decisão continua com a equipe.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Demonstracao() {
  const reduzir = useReducedMotion();
  const [passo, setPasso] = useState(0);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    if (!tocando || passo >= PASSOS.length - 1) return;
    const t = setTimeout(() => {
      setPasso(passo + 1);
      if (passo + 1 >= PASSOS.length - 1) setTocando(false);
    }, 2600);
    return () => clearTimeout(t);
  }, [tocando, passo]);

  function ir(p: number) {
    setTocando(false);
    setPasso(Math.min(PASSOS.length - 1, Math.max(0, p)));
  }

  return (
    <section id="int-demonstracao" aria-label="Demonstração interativa" className="secao-papel text-tinta">
      <div className="mx-auto max-w-[80rem] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <TituloRevelado
            texto="Uma mensagem. Seis passos. Uma oportunidade na mão certa."
            className="titulo max-w-[20ch] text-[clamp(2.25rem,4.3vw,4rem)] leading-[0.97] text-tinta"
          />
          <Surgir className="space-y-4">
            <p className="max-w-[46ch] text-lg leading-relaxed text-tinta/75">
              Acompanhe, passo a passo, o que acontece entre a mensagem de um potencial cliente e o momento em que a
              equipe recebe a oportunidade.
            </p>
            <SeloDemo>Simulação interativa, não é um atendimento real</SeloDemo>
          </Surgir>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Surgir>
            <ol className="flex flex-col" aria-label="Etapas da demonstração">
              {PASSOS.map((p, i) => {
                const atual = i === passo;
                const feito = i < passo;
                return (
                  <li key={p.titulo} className="relative">
                    {i < PASSOS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`absolute left-[1.05rem] top-11 h-[calc(100%-2.25rem)] w-px transition-colors duration-500 ${feito ? "bg-cobalto" : "bg-tinta/15"}`}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => ir(i)}
                      aria-current={atual ? "step" : undefined}
                      className="group flex w-full gap-4 rounded-2xl py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span
                        className={`relative z-10 flex h-[2.1rem] w-[2.1rem] shrink-0 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums transition-colors duration-300 ${
                          atual ? "bg-cobalto text-white" : feito ? "bg-cobalto/12 text-cobalto" : "bg-white text-tinta/60 ring-1 ring-inset ring-tinta/15 group-hover:ring-tinta/35"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="pt-1">
                        <span className={`block text-[17px] font-semibold transition-colors ${atual ? "text-tinta" : "text-tinta/60 group-hover:text-tinta/85"}`}>
                          {p.titulo}
                        </span>
                        <AnimatePresence initial={false}>
                          {atual && (
                            <motion.span
                              initial={reduzir ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduzir ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="block overflow-hidden"
                            >
                              <span className="block max-w-[46ch] pt-1.5 text-[15px] leading-relaxed text-tinta/70">{p.texto}</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Surgir>

          <TelaErguida className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.05rem] border border-tinta/10 bg-white sombra-tela">
              <div className="flex items-center justify-between bg-cobalto px-5 py-3 text-[15px] font-medium text-white">
                <span>Atendimento · simulação</span>
                <span className="tabular-nums text-white/80">
                  Passo {passo + 1} de {PASSOS.length}
                </span>
              </div>
              <div className="h-1 bg-cobalto/10">
                <div
                  className="h-full origin-left bg-menta transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: `scaleX(${(passo + 1) / PASSOS.length})` }}
                />
              </div>
              <div aria-live="polite" className="min-h-[24rem] bg-white p-5 sm:p-6">
                <p className="sr-only">
                  Passo {passo + 1}: {PASSOS[passo].titulo}
                </p>
                <Tela passo={passo} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-tinta/10 px-5 py-3">
                <button
                  type="button"
                  onClick={() => ir(passo - 1)}
                  disabled={passo === 0}
                  className="h-10 rounded-full px-4 text-sm font-semibold text-tinta ring-1 ring-inset ring-tinta/20 transition-[background-color,transform] hover:bg-tinta/[0.04] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Anterior
                </button>
                <div className="flex gap-2">
                  {passo === PASSOS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setPasso(0);
                        setTocando(!reduzir);
                      }}
                      className="h-10 rounded-full bg-cobalto px-5 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-cobalto-escuro active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      Ver de novo
                    </button>
                  ) : (
                    <>
                      {!reduzir && (
                        <button
                          type="button"
                          onClick={() => setTocando((v) => !v)}
                          className="h-10 rounded-full px-4 text-sm font-semibold text-tinta ring-1 ring-inset ring-tinta/20 transition-[background-color,transform] hover:bg-tinta/[0.04] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          {tocando ? "Pausar" : "Reproduzir"}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => ir(passo + 1)}
                        className="h-10 rounded-full bg-cobalto px-5 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-cobalto-escuro active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        Próximo passo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TelaErguida>
        </div>
      </div>
    </section>
  );
}
