"use client";

import { motion, useReducedMotion } from "motion/react";
import { MockupNavegador } from "@/components/site/mockup-navegador";
import { Acao, classeAcao } from "@/components/site/acao";

const EASE = [0.16, 1, 0.3, 1] as const;

// Negócios fictícios: só ilustram os formatos de site.
const MOCKUPS = [
  {
    cor: "sol" as const,
    url: "catalogo.estreladistribuidora.com.br",
    classe: "left-[22%] top-0 w-[60%] rotate-6",
    atraso: 0.5,
    conteudo: {
      marca: "Estrela Distribuidora",
      menu: ["Catálogo", "Pedidos"],
      titulo: "Catálogo de bebidas",
      subtitulo: "Pedido mínimo e entrega na região.",
      botao: "Ver catálogo",
      itens: [
        { nome: "Água 500ml cx", preco: "R$ 18,00" },
        { nome: "Refri 2L fardo", preco: "R$ 52,90" },
        { nome: "Suco 1L cx", preco: "R$ 39,90" },
      ],
    },
  },
  {
    cor: "coral" as const,
    url: "mercadinhobompreco.com.br/ofertas",
    classe: "left-0 top-[16%] w-[56%] -rotate-6",
    atraso: 0.35,
    conteudo: {
      marca: "Mercadinho Bom Preço",
      menu: ["Ofertas", "Contato"],
      titulo: "Ofertas da semana",
      subtitulo: "Válidas até domingo.",
      botao: "Chamar no WhatsApp",
      itens: [
        { nome: "Arroz 5kg", preco: "R$ 24,90" },
        { nome: "Detergente", preco: "R$ 2,49" },
        { nome: "Café 500g", preco: "R$ 17,90" },
      ],
    },
  },
  {
    cor: "menta" as const,
    url: "sabordacasa.com.br",
    classe: "bottom-0 right-0 w-[70%]",
    atraso: 0.2,
    conteudo: {
      marca: "Restaurante Sabor da Casa",
      menu: ["Cardápio", "Reservas", "Contato"],
      titulo: "Almoço caseiro todo dia",
      subtitulo: "Self-service e marmita para retirar.",
      botao: "Ver cardápio",
      itens: [
        { nome: "Executivo", preco: "R$ 24,00" },
        { nome: "Marmita P", preco: "R$ 19,00" },
        { nome: "Feijoada sáb", preco: "R$ 34,00" },
      ],
    },
  },
];

export function SitesHero() {
  const reduzirMovimento = useReducedMotion();
  const entrada = (atraso: number) =>
    reduzirMovimento
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, ease: EASE, delay: atraso },
        };

  return (
    <section className="secao-escura luz-topo relative isolate overflow-hidden">
      <div className="mx-auto flex min-h-dvh max-w-[90rem] flex-col justify-center gap-14 px-6 pb-20 pt-28 sm:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-16">
        <div className="order-1 lg:w-[52%]">
          <motion.h1 {...entrada(0.1)} className="titulo text-[clamp(2.5rem,4.9vw,4.9rem)] leading-[0.98] text-white">
            <span className="block font-normal text-white/80 [font-stretch:100%]">Sites sob medida,</span>
            <span className="mt-2 block">feitos para o seu negócio.</span>
          </motion.h1>
          <motion.p {...entrada(0.25)} className="mt-7 max-w-[46ch] text-lg leading-relaxed text-white/85 sm:text-xl">
            Nada de template pronto. Cada site é desenhado e construído do zero
            para o que o seu negócio precisa, do jeito que ele precisa.
          </motion.p>

          <motion.div {...entrada(0.4)} className="mt-10 flex flex-wrap items-center gap-3">
            <Acao href="/orcamento" tamanho="lg" seta>
              Pedir orçamento
            </Acao>
            <a href="#incluido" className={classeAcao("fantasma-escuro", "lg")}>
              Ver o que está incluído
            </a>
          </motion.div>
        </div>

        <div className="relative order-2 mx-auto h-[280px] w-full max-w-[520px] sm:h-[400px] lg:order-2 lg:h-[520px] lg:w-[48%] lg:max-w-none">
          {MOCKUPS.map((m) => (
            <motion.div
              key={m.url}
              initial={reduzirMovimento ? false : { opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 20, delay: m.atraso }}
              className={`absolute ${m.classe}`}
            >
              <MockupNavegador url={m.url} cor={m.cor} conteudo={m.conteudo} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
