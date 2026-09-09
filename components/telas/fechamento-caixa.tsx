function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const LINHAS = [
  { rotulo: "Abertura de caixa", valor: 150.0 },
  { rotulo: "+ Vendas em dinheiro", valor: 320.5 },
  { rotulo: "+ Vendas em Pix", valor: 268.0 },
  { rotulo: "+ Vendas em cartão", valor: 460.3 },
  { rotulo: "− Sangria", valor: -200.0 },
];

const ESPERADO = LINHAS.reduce((soma, l) => soma + l.valor, 0);
const INFORMADO = 998.8;
const DIFERENCA = INFORMADO - ESPERADO;

export function FechamentoCaixa() {
  return (
    <div className="w-full border border-marinho/15 bg-white font-[family-name:var(--font-instrument)] text-marinho shadow-[0_24px_60px_-24px_rgba(23,53,94,0.25)]">
      <div className="flex items-center justify-between bg-marinho px-5 py-3 text-white sm:px-6">
        <span className="text-[15px] font-medium">Nexo Caixa — Fechamento do dia</span>
        <span className="text-[13px] text-white/60">10/09</span>
      </div>

      <div className="text-[15px]">
        {LINHAS.map((l) => (
          <div key={l.rotulo} className="flex items-center justify-between border-b border-marinho/5 px-5 py-2.5 sm:px-6">
            <span className="text-marinho/70">{l.rotulo}</span>
            <span className="tabular-nums">{formatarReal(l.valor)}</span>
          </div>
        ))}

        <div className="flex items-center justify-between border-b border-marinho/10 px-5 py-2.5 font-medium sm:px-6">
          <span>Fechamento esperado</span>
          <span className="tabular-nums">{formatarReal(ESPERADO)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-marinho/10 px-5 py-2.5 sm:px-6">
          <span className="text-marinho/70">Fechamento informado</span>
          <span className="tabular-nums">{formatarReal(INFORMADO)}</span>
        </div>
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <span className="font-medium">Diferença</span>
          <span
            className={`font-[family-name:var(--font-archivo)] text-2xl font-semibold tabular-nums ${
              DIFERENCA === 0 ? "text-verde-forte" : "text-erro"
            }`}
          >
            {formatarReal(DIFERENCA)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-marinho/10 px-5 py-3 text-[12px] text-marinho/45 sm:px-6">
        <span>Contas a pagar hoje</span>
        <span className="tabular-nums text-marinho/70">Fornecedor Rio Claro — {formatarReal(1890)}</span>
      </div>
    </div>
  );
}
