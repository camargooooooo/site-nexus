import { ContadorReal } from "@/components/site/contador";

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
    <div className="w-full overflow-hidden rounded-xl border border-tinta/10 bg-white font-corpo text-tinta sombra-tela">
      <div className="flex items-center justify-between bg-cobalto px-5 py-3 text-white sm:px-6">
        <span className="text-[15px] font-medium">Nexo Caixa — Fechamento do dia</span>
        <span className="text-[13px] text-white/85">10/09</span>
      </div>

      <div className="text-[15px]">
        {LINHAS.map((l, i) => (
          <div key={l.rotulo} className="flex items-center justify-between border-b border-tinta/5 px-5 py-2.5 sm:px-6">
            <span className="text-tinta/70">{l.rotulo}</span>
            <ContadorReal valor={l.valor} atraso={i * 0.08} />
          </div>
        ))}

        <div className="flex items-center justify-between border-b border-tinta/10 px-5 py-2.5 font-medium sm:px-6">
          <span>Fechamento esperado</span>
          <ContadorReal valor={ESPERADO} atraso={0.45} />
        </div>
        <div className="flex items-center justify-between border-b border-tinta/10 px-5 py-2.5 sm:px-6">
          <span className="text-tinta/70">Fechamento informado</span>
          <span className="tabular-nums">{formatarReal(INFORMADO)}</span>
        </div>
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <span className="flex items-center gap-3 font-medium">
            Diferença
            {DIFERENCA === 0 && (
              <span className="rounded-full bg-menta/25 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-menta-escura">
                Conferido
              </span>
            )}
          </span>
          <span
            className={`titulo text-2xl tabular-nums ${
              DIFERENCA === 0 ? "text-menta-escura" : "text-erro"
            }`}
          >
            {formatarReal(DIFERENCA)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-tinta/10 px-5 py-3 text-[12px] text-tinta/65 sm:px-6">
        <span>Contas a pagar hoje</span>
        <span className="tabular-nums text-tinta/70">Fornecedor Rio Claro — {formatarReal(1890)}</span>
      </div>
    </div>
  );
}
