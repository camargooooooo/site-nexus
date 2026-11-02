"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TelaErguida, TituloRevelado } from "@/components/site/revelar";
import { EASE, Surgir } from "@/components/site/intelligence/comum";

// Exemplos ilustrativos de como cada função pode ser configurada. Não são integrações em produção.
const FUNCOES = [
  {
    titulo: "Atendimento inteligente",
    texto: "Responde às dúvidas frequentes com as informações da empresa, a qualquer hora, e sabe quando chamar uma pessoa.",
    entrada: "Vocês atendem aos sábados?",
    saida: "Resposta com o horário cadastrado: sábados das 8h às 12h.",
  },
  {
    titulo: "Interpretação de mensagens",
    texto: "Lê textos livres, com erros de digitação e abreviações, e extrai o que importa: o quê, quanto, quando e para quem.",
    entrada: "preciso de 40 cx do item 2231 pra sexta, entrega no galpão 2",
    saida: "Item 2231 · 40 caixas · prazo: sexta · local: galpão 2",
  },
  {
    titulo: "Identificação de necessidades",
    texto: "Percebe a intenção por trás da mensagem: pedido de orçamento, reclamação, dúvida técnica, segunda via.",
    entrada: "O equipamento parou de novo depois da visita de ontem.",
    saida: "Intenção: reclamação pós-atendimento · ligada à visita anterior",
  },
  {
    titulo: "Organização e classificação",
    texto: "Separa e etiqueta solicitações por tipo, urgência e área, seguindo as categorias que a sua empresa já usa.",
    entrada: "Nota fiscal veio com o CNPJ errado.",
    saida: "Categoria: financeiro · subtipo: correção de NF · prioridade média",
  },
  {
    titulo: "Consulta de informações",
    texto: "Busca dados nos sistemas da empresa (catálogo, status de pedidos, políticas internas) para responder com precisão.",
    entrada: "Qual o status do pedido 18.204?",
    saida: "Consulta ao sistema de pedidos: em separação, previsão de saída amanhã.",
  },
  {
    titulo: "Encaminhamento para equipes",
    texto: "Envia cada caso para a pessoa ou o setor certo, com um resumo pronto, sem ninguém precisar repassar à mão.",
    entrada: "Quero renegociar o contrato de manutenção.",
    saida: "Encaminhado ao comercial, com o histórico do cliente anexado.",
  },
  {
    titulo: "Apoio à tomada de decisão",
    texto: "Resume volumes, aponta padrões e destaca o que pede atenção, para a gestão decidir com base no que está acontecendo.",
    entrada: "O que mais gerou chamados nesta semana?",
    saida: "Resumo: atrasos de entrega lideram, concentrados em uma rota.",
  },
  {
    titulo: "Agentes personalizados",
    texto: "Agentes dedicados a uma tarefa específica da operação, com regras, limites e tom definidos junto com a sua equipe.",
    entrada: "Agente de cotação: confere estoque e monta a proposta.",
    saida: "Rascunho de proposta gerado para revisão do vendedor.",
  },
] as const;

export function IA() {
  const [ativa, setAtiva] = useState(0);
  const reduzir = useReducedMotion();
  const funcao = FUNCOES[ativa];

  return (
    <section id="int-ia" aria-label="Inteligência artificial" className="secao-profunda text-white">
      <div className="mx-auto max-w-[72rem] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <TituloRevelado
            texto="IA que entende o contexto da sua operação."
            className="titulo max-w-[18ch] text-[clamp(2.25rem,4.3vw,4rem)] leading-[0.96] text-white"
          />
          <Surgir>
            <p className="max-w-[46ch] text-lg leading-relaxed text-white/80">
              A inteligência artificial pode atuar em diferentes etapas da operação: no primeiro contato, na triagem,
              na consulta de dados e no apoio a quem decide. Cada agente é configurado conforme os processos, as
              regras e as necessidades da sua empresa.
            </p>
          </Surgir>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Surgir>
            <ul className="border-t border-white/12" role="list">
              {FUNCOES.map((f, i) => {
                const selecionada = i === ativa;
                return (
                  <li key={f.titulo}>
                    <button
                      type="button"
                      aria-pressed={selecionada}
                      aria-controls="ia-exemplo"
                      onClick={() => setAtiva(i)}
                      onMouseEnter={() => setAtiva(i)}
                      className="group flex w-full items-center gap-4 border-b border-white/12 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          selecionada ? "w-6 bg-sol" : "w-2 bg-white/30 group-hover:bg-white/60"
                        }`}
                      />
                      <span
                        className={`text-[17px] font-semibold transition-colors ${
                          selecionada ? "text-white" : "text-white/65 group-hover:text-white/90"
                        }`}
                      >
                        {f.titulo}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Surgir>

          <TelaErguida className="lg:sticky lg:top-28 lg:self-start">
            <div id="ia-exemplo" aria-live="polite" className="overflow-hidden rounded-[1.35rem] bg-white text-tinta sombra-tela-escura">
              <div className="flex items-center justify-between gap-3 bg-cobalto px-6 py-3 text-[15px] font-medium text-white">
                <span>Agente de exemplo</span>
                <span className="text-white/75">simulação</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ativa}
                  initial={reduzir ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduzir ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="p-6 sm:p-8"
                >
                  <h3 className="titulo text-2xl leading-tight">{funcao.titulo}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-tinta/75">{funcao.texto}</p>

                  <div className="mt-7 space-y-3">
                    <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-papel px-4 py-3 text-[15px] ring-1 ring-inset ring-tinta/8">
                      <span className="block text-xs font-semibold text-tinta/60">Entrada</span>
                      {funcao.entrada}
                    </div>
                    <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-tinta px-4 py-3 text-[15px] text-white">
                      <span className="flex items-center gap-2 text-xs font-semibold text-sol">
                        <span className="h-1.5 w-1.5 rounded-full bg-sol" aria-hidden="true" />
                        O agente entende
                      </span>
                      {funcao.saida}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-2 border-t border-tinta/10 px-6 py-3 text-xs text-tinta/60">
                <span className="h-1.5 w-1.5 rounded-full bg-menta-forte" aria-hidden="true" />
                Exemplo ilustrativo. As regras reais são definidas com a sua equipe.
              </div>
            </div>
          </TelaErguida>
        </div>

        <Surgir className="mt-16 grid gap-6 border-t border-white/12 pt-10 lg:mt-24 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="grid gap-4 lg:col-span-2 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            <h3 className="titulo text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.05] text-white">
              Modelos de IA rodando na sua própria infraestrutura.
            </h3>
            <p className="text-[17px] leading-relaxed text-white/75">
              Quando o projeto pede, a solução pode usar modelos de IA locais, instalados em servidores da própria
              empresa. Isso dá mais controle sobre a infraestrutura e sobre onde os dados ficam. Avaliamos no
              diagnóstico se essa é a melhor escolha para o seu caso, ou se um modelo em nuvem atende melhor.
            </p>
          </div>
        </Surgir>
      </div>
    </section>
  );
}
