import { FechamentoCaixa } from "@/components/telas/fechamento-caixa";

const ENTRADAS = ["Vendas", "Pix", "Cartão", "Dinheiro", "Fiado"];

export function FechaOCaixa() {
  return (
    <section id="sec-04" className="secao-clara px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-marinho/40">
        04
      </p>
      <h2 className="mt-2 max-w-[16ch] font-[family-name:var(--font-archivo)] text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1] tracking-[-0.03em] text-marinho">
        Fecha o caixa.
      </h2>
      <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-marinho/65">
        Dinheiro, Pix, cartão e fiado, tudo somado do jeito que o seu caixa já funciona hoje.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 text-lg font-medium text-marinho/45">
        {ENTRADAS.map((etapa, i) => (
          <span key={etapa} className="flex items-center gap-3">
            <span className="text-marinho">{etapa}</span>
            {i < ENTRADAS.length - 1 && <span aria-hidden="true">+</span>}
          </span>
        ))}
        <span aria-hidden="true" className="text-marinho/30">
          →
        </span>
        <span className="font-[family-name:var(--font-archivo)] font-semibold text-marinho">Caixa</span>
        <span aria-hidden="true" className="text-marinho/30">
          →
        </span>
        <span className="font-[family-name:var(--font-archivo)] font-semibold text-verde-forte">
          Fechamento.
        </span>
      </div>

      <div className="mt-12 mx-auto max-w-2xl">
        <FechamentoCaixa />
      </div>
    </section>
  );
}
