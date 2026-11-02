"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { TelaErguida, TituloRevelado } from "@/components/site/revelar";
import { EASE, SeloDemo, Surgir } from "@/components/site/intelligence/comum";

const ETAPAS = ["Novo lead", "Qualificação", "Proposta", "Negociação", "Fechado"] as const;

type Oportunidade = {
  id: string;
  empresa: string;
  contato: string;
  valor: number;
  etapa: number;
  origem: string;
  responsavel: string;
  proxima: string;
  historico: string[];
};

// Empresas, pessoas e valores fictícios, só para a demonstração.
const INICIAIS: Oportunidade[] = [
  {
    id: "o1",
    empresa: "Metalúrgica Vale Azul",
    contato: "Compras · Renata",
    valor: 48600,
    etapa: 0,
    origem: "Mensagem triada pelo agente",
    responsavel: "Rafael",
    proxima: "Ligar hoje, 15h",
    historico: ["Pediu catálogo de peças sob encomenda", "Agente classificou como orçamento"],
  },
  {
    id: "o2",
    empresa: "Clínica Bem Viver",
    contato: "Administração · Paulo",
    valor: 12900,
    etapa: 0,
    origem: "Formulário do site",
    responsavel: "Camila",
    proxima: "Enviar apresentação",
    historico: ["Preencheu o formulário de contato"],
  },
  {
    id: "o3",
    empresa: "Distribuidora Horizonte",
    contato: "Diretoria · Sérgio",
    valor: 96400,
    etapa: 1,
    origem: "Indicação de cliente",
    responsavel: "Rafael",
    proxima: "Visita técnica na quinta",
    historico: ["Reunião inicial realizada", "Levantamento de rotas enviado"],
  },
  {
    id: "o4",
    empresa: "Construtora Alvorada",
    contato: "Engenharia · Luana",
    valor: 31200,
    etapa: 2,
    origem: "Mensagem triada pelo agente",
    responsavel: "Camila",
    proxima: "Retorno da proposta até sexta",
    historico: ["Proposta v1 enviada", "Cliente pediu ajuste de prazo"],
  },
  {
    id: "o5",
    empresa: "Grupo Sabor Serrano",
    contato: "Operações · Diego",
    valor: 57800,
    etapa: 3,
    origem: "Evento do setor",
    responsavel: "Rafael",
    proxima: "Reunião de fechamento",
    historico: ["Proposta aprovada pelo financeiro", "Negociando condições de pagamento"],
  },
  {
    id: "o6",
    empresa: "Transportes Rota Sul",
    contato: "Frota · Marcos",
    valor: 22400,
    etapa: 4,
    origem: "Cliente recorrente",
    responsavel: "Camila",
    proxima: "Agendar implantação",
    historico: ["Contrato assinado"],
  },
];

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const RECURSOS = [
  "Cadastro e gestão de clientes",
  "Gestão de leads",
  "Pipeline comercial",
  "Histórico de interações",
  "Acompanhamento de oportunidades",
  "Organização de atividades",
  "Distribuição de atendimentos",
  "Indicadores comerciais",
  "Integração com agentes inteligentes",
];

/** Total que conta do valor anterior até o novo quando o pipeline muda. */
function ValorContado({ valor }: { valor: number }) {
  const reduzir = useReducedMotion();
  const [exibido, setExibido] = useState(valor);
  const anterior = useRef(valor);

  useEffect(() => {
    const de = anterior.current;
    anterior.current = valor;
    if (de === valor) return;
    if (reduzir) {
      const t = setTimeout(() => setExibido(valor), 0);
      return () => clearTimeout(t);
    }
    const controle = animate(de, valor, { duration: 0.9, ease: EASE, onUpdate: (v) => setExibido(Math.round(v)) });
    return () => controle.stop();
  }, [valor, reduzir]);

  return <>{moeda.format(exibido)}</>;
}

function Cartao({
  o,
  ativo,
  reduzir,
  aoSelecionar,
}: {
  o: Oportunidade;
  ativo: boolean;
  reduzir: boolean | null;
  aoSelecionar: (o: Oportunidade) => void;
}) {
  return (
    <motion.li layout={!reduzir} layoutId={reduzir ? undefined : o.id} transition={{ duration: 0.5, ease: EASE }}>
      <button
        type="button"
        onClick={() => aoSelecionar(o)}
        aria-pressed={ativo}
        className={`w-full rounded-[0.6rem] border bg-white p-3 text-left transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          ativo
            ? "border-cobalto shadow-[0_0_0_3px_rgb(29_63_255/0.15),0_10px_20px_-12px_rgb(11_22_80/0.35)]"
            : "border-tinta/12 shadow-[0_1px_0_rgb(11_22_80/0.05)] hover:border-tinta/25 hover:shadow-[0_10px_20px_-14px_rgb(11_22_80/0.35)]"
        }`}
      >
        <span className="block text-[13px] font-semibold leading-snug text-tinta">{o.empresa}</span>
        <span className="mt-1 block text-xs text-tinta/60">{o.contato}</span>
        <span className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold tabular-nums text-tinta">{moeda.format(o.valor)}</span>
          {o.origem.includes("agente") && (
            <span className="rounded-full bg-sol/30 px-2 py-0.5 text-[10px] font-semibold text-tinta">IA</span>
          )}
        </span>
      </button>
    </motion.li>
  );
}

export function CRM() {
  const reduzir = useReducedMotion();
  const [ops, setOps] = useState(INICIAIS);
  const [selecionada, setSelecionada] = useState<string>("o3");
  const [etapaMovel, setEtapaMovel] = useState(1);

  const op = ops.find((o) => o.id === selecionada) ?? ops[0];
  const totais = useMemo(
    () =>
      ETAPAS.map((_, i) => {
        const daEtapa = ops.filter((o) => o.etapa === i);
        return { qtd: daEtapa.length, valor: daEtapa.reduce((s, o) => s + o.valor, 0) };
      }),
    [ops],
  );
  const emAberto = ops.filter((o) => o.etapa < 4).reduce((s, o) => s + o.valor, 0);

  function mover(delta: number) {
    const etapa = Math.min(ETAPAS.length - 1, Math.max(0, op.etapa + delta));
    if (etapa === op.etapa) return;
    const registro = `Movida para ${ETAPAS[etapa]} (demonstração)`;
    setOps((atual) =>
      atual.map((o) => (o.id === op.id ? { ...o, etapa, historico: [...o.historico, registro] } : o)),
    );
    setEtapaMovel(etapa);
  }

  function selecionar(o: Oportunidade) {
    setSelecionada(o.id);
    setEtapaMovel(o.etapa);
  }

  return (
    <section id="int-crm" aria-label="CRM inteligente" className="secao-noite text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <TituloRevelado
            texto="Seus relacionamentos, oportunidades e informações em um só lugar."
            className="titulo max-w-[21ch] text-[clamp(2.25rem,4.3vw,4rem)] leading-[0.97] text-white"
          />
          <Surgir>
            <p className="max-w-[46ch] text-lg leading-relaxed text-white/80">
              O CRM é o centro do ecossistema: é nele que os agentes registram o que entenderam e que as automações
              buscam o que precisam. As etapas, os campos e os indicadores são adaptados ao processo comercial de
              cada negócio.
            </p>
          </Surgir>
        </div>

        <Surgir className="mt-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/80">
            {RECURSOS.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-menta" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </Surgir>

        <TelaErguida className="mt-14">
          <div className="overflow-hidden rounded-[1.05rem] bg-white text-tinta sombra-tela-escura">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-cobalto px-5 py-3 text-[15px] font-medium text-white sm:px-6">
              <span>Pipeline comercial · demonstração</span>
              <span className="flex items-center gap-3">
                <span className="hidden text-white/75 sm:inline">Em aberto</span>
                <span className="titulo text-lg tabular-nums"><ValorContado valor={emAberto} /></span>
              </span>
            </div>

            {/* Abas de etapa no celular; colunas no desktop. */}
            <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] border-b border-tinta/10 px-3 py-2 lg:hidden" role="group" aria-label="Etapas do pipeline">
              {ETAPAS.map((e, i) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEtapaMovel(i)}
                  aria-pressed={etapaMovel === i}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 ${
                    etapaMovel === i ? "bg-cobalto text-white" : "text-tinta/65 hover:bg-papel"
                  }`}
                >
                  {e} <span className="tabular-nums opacity-70">{totais[i].qtd}</span>
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-[1fr_19rem]">
              <LayoutGroup>
                <div className="grid grid-cols-1 gap-3 bg-papel/70 p-3 sm:p-4 lg:grid-cols-5">
                  {ETAPAS.map((e, i) => (
                    <div key={e} className={`${etapaMovel === i ? "block" : "hidden"} lg:block lg:min-h-[14rem]`}>
                      <div className="mb-2 hidden items-baseline justify-between px-1 lg:flex">
                        <span className="text-[13px] font-semibold text-tinta">{e}</span>
                        <span className="text-xs tabular-nums text-tinta/55">{totais[i].qtd}</span>
                      </div>
                      <div className="mb-3 hidden h-1 overflow-hidden rounded-full bg-tinta/8 lg:block">
                        <div
                          className={`h-full origin-left rounded-full ${i === 4 ? "bg-menta-forte" : "bg-cobalto"}`}
                          style={{
                            transform: `scaleX(${Math.max(totais[i].qtd ? 0.18 : 0, Math.min(1, totais[i].valor / 100000))})`,
                            transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
                          }}
                        />
                      </div>
                      <ul className="flex flex-col gap-2">
                        {ops
                          .filter((o) => o.etapa === i)
                          .map((o) => (
                            <Cartao key={o.id} o={o} ativo={o.id === op.id} reduzir={reduzir} aoSelecionar={selecionar} />
                          ))}
                        {totais[i].qtd === 0 && (
                          <li className="rounded-[0.6rem] border border-dashed border-tinta/15 px-3 py-6 text-center text-xs text-tinta/50">
                            Nenhuma oportunidade nesta etapa
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </LayoutGroup>

              <aside aria-live="polite" aria-label="Detalhes da oportunidade" className="border-t border-tinta/10 p-5 sm:p-6 lg:border-l lg:border-t-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={op.id}
                    initial={reduzir ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduzir ? undefined : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <p className="text-xs font-semibold text-tinta/55">{ETAPAS[op.etapa]}</p>
                    <h3 className="titulo mt-1 text-xl leading-tight">{op.empresa}</h3>
                    <p className="text-sm text-tinta/65">{op.contato}</p>

                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div>
                        <dt className="text-xs text-tinta/55">Valor estimado</dt>
                        <dd className="font-semibold tabular-nums">{moeda.format(op.valor)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-tinta/55">Responsável</dt>
                        <dd className="font-semibold">{op.responsavel}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-xs text-tinta/55">Origem</dt>
                        <dd className="font-semibold">{op.origem}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-xs text-tinta/55">Próxima atividade</dt>
                        <dd className="font-semibold">{op.proxima}</dd>
                      </div>
                    </dl>

                    <p className="mt-5 text-xs font-semibold text-tinta/55">Histórico</p>
                    <ol className="mt-2 space-y-2 border-l border-tinta/12 pl-4 text-[13px] text-tinta/80">
                      {op.historico.map((h, i) => (
                        <li key={i} className="relative">
                          <span className="absolute -left-[1.29rem] top-1.5 h-2 w-2 rounded-full bg-cobalto ring-2 ring-white" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ol>

                    <div className="mt-6 flex gap-2">
                      <button
                        type="button"
                        onClick={() => mover(-1)}
                        disabled={op.etapa === 0}
                        className="h-10 flex-1 rounded-full text-sm font-semibold text-tinta ring-1 ring-inset ring-tinta/20 transition-[background-color,transform] hover:bg-tinta/[0.04] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        Voltar etapa
                      </button>
                      <button
                        type="button"
                        onClick={() => mover(1)}
                        disabled={op.etapa === ETAPAS.length - 1}
                        className="h-10 flex-1 rounded-full bg-cobalto text-sm font-semibold text-white transition-[background-color,transform] hover:bg-cobalto-escuro active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        Avançar etapa
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </aside>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-tinta/10 px-5 py-3 sm:px-6">
              <span className="flex items-center gap-2 text-xs text-tinta/60">
                <span className="h-1.5 w-1.5 rounded-full bg-menta-forte" aria-hidden="true" />
                Clique numa oportunidade e mova entre as etapas
              </span>
              <span className="flex items-center gap-3">
                <SeloDemo>Dados fictícios</SeloDemo>
                <button
                  type="button"
                  onClick={() => {
                    setOps(INICIAIS);
                    setSelecionada("o3");
                    setEtapaMovel(1);
                  }}
                  className="text-xs font-semibold text-cobalto underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Restaurar exemplo
                </button>
              </span>
            </div>
          </div>
        </TelaErguida>
      </div>
    </section>
  );
}
