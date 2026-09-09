const ITENS = [
  { qtd: 2, nome: "Arroz tipo 1 5kg", unit: 24.9 },
  { qtd: 1, nome: "Refrigerante 2L", unit: 9.9 },
  { qtd: 1, nome: "Água mineral 500ml", unit: 3.0 },
  { qtd: 1, nome: "Energético 250ml", unit: 8.9 },
];

function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const TOTAL = ITENS.reduce((soma, i) => soma + i.qtd * i.unit, 0);

export type ParteDestacada = "busca" | "codigo" | "carrinho" | "pagamento" | "total" | null;

export function TelaPDV({ destaque = null }: { destaque?: ParteDestacada }) {
  function classe(parte: ParteDestacada) {
    return destaque === parte ? "bg-azul/[0.06] ring-1 ring-inset ring-azul/40" : "";
  }

  return (
    <div className="w-full border border-marinho/15 bg-white font-[family-name:var(--font-instrument)] text-marinho shadow-[0_24px_60px_-24px_rgba(23,53,94,0.25)]">
      <div className="flex items-center justify-between bg-marinho px-5 py-3 text-white sm:px-6">
        <span className="text-[15px] font-medium">Nexo PDV — Balcão 1</span>
        <span className="text-[13px] text-white/60">qui, 10 set · 14:32</span>
      </div>

      <div className={`grid gap-4 border-b border-marinho/10 px-5 py-4 sm:grid-cols-2 sm:px-6 sm:py-5 ${classe("busca")}`}>
        <div>
          <label className="block text-[12px] text-marinho/50">Buscar produto</label>
          <div className="mt-1.5 rounded-sm border border-marinho/20 px-3 py-2.5 text-[15px] text-marinho/70">
            arroz tipo 1
          </div>
        </div>
        <div className={classe("codigo")}>
          <label className="block text-[12px] text-marinho/50">Código de barras</label>
          <div className="mt-1.5 flex items-center justify-between rounded-sm border border-marinho/20 px-3 py-2.5">
            <span className="text-[15px] tabular-nums text-marinho/70">7891000100103</span>
            <div className="flex h-5 items-end gap-[2px]">
              {[3, 5, 2, 6, 3, 4, 2, 5, 3].map((h, i) => (
                <span key={i} className="w-[2px] bg-marinho/60" style={{ height: `${h * 2.5}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <table className={`w-full border-collapse text-[15px] ${classe("carrinho")}`}>
        <thead>
          <tr className="border-b border-marinho/10 text-left text-[12px] text-marinho/45">
            <th className="px-5 py-2.5 font-normal sm:px-6">Qtd</th>
            <th className="py-2.5 font-normal">Produto</th>
            <th className="py-2.5 text-right font-normal">Unit.</th>
            <th className="px-5 py-2.5 text-right font-normal sm:px-6">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {ITENS.map((item) => (
            <tr key={item.nome} className="border-b border-marinho/5">
              <td className="px-5 py-2 tabular-nums text-marinho/70 sm:px-6">{item.qtd}</td>
              <td className="py-2">{item.nome}</td>
              <td className="py-2 text-right tabular-nums text-marinho/70">
                {formatarReal(item.unit)}
              </td>
              <td className="px-5 py-2 text-right tabular-nums sm:px-6">
                {formatarReal(item.qtd * item.unit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`flex items-center justify-between border-b border-marinho/10 px-5 py-4 sm:px-6 ${classe("total")}`}>
        <span className="text-base font-medium text-marinho/60">Total</span>
        <span className="font-[family-name:var(--font-archivo)] text-3xl font-semibold tabular-nums">
          {formatarReal(TOTAL)}
        </span>
      </div>

      <div className={`flex flex-wrap gap-2.5 border-b border-marinho/10 px-5 py-4 sm:px-6 ${classe("pagamento")}`}>
        <span className="rounded-sm bg-verde-forte px-3.5 py-2 text-[13px] font-medium text-white">
          Dinheiro
        </span>
        <span className="rounded-sm border border-marinho/20 px-3.5 py-2 text-[13px] font-medium text-marinho/70">
          Pix
        </span>
        <span className="rounded-sm border border-marinho/20 px-3.5 py-2 text-[13px] font-medium text-marinho/70">
          Cartão
        </span>
        <span className="rounded-sm border border-marinho/20 px-3.5 py-2 text-[13px] font-medium text-marinho/70">
          Fiado
        </span>
      </div>

      <div className="flex items-center justify-between px-5 py-3 text-[12px] text-marinho/45 sm:px-6">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-verde" />
          on-line
        </span>
        <span className="tabular-nums">F2 desconto · F4 fiado · F8 cancelar item</span>
      </div>
    </div>
  );
}
