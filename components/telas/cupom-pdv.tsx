export type ItemCupom = { nome: string; preco: number };

function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function CupomPDV({
  itens,
  total,
}: {
  itens: ItemCupom[];
  total: number;
}) {
  return (
    <div className="w-full rounded-md border border-marinho/10 bg-white p-4 font-[family-name:var(--font-instrument)]">
      <div className="flex items-center gap-2 border-b border-marinho/10 pb-3">
        <div className="flex h-5 items-end gap-[2px]">
          {[3, 5, 2, 6, 3, 4, 2, 5].map((h, i) => (
            <span key={i} className="w-[2px] bg-marinho/70" style={{ height: `${h * 2.5}px` }} />
          ))}
        </div>
        <span className="text-[11px] tracking-wide text-marinho/45">código lido</span>
      </div>

      <ul className="mt-3 min-h-[62px] space-y-1.5">
        {itens.map((item) => (
          <li key={item.nome} className="flex items-center justify-between text-[13px] text-marinho">
            <span>{item.nome}</span>
            <span className="tabular-nums">{formatarReal(item.preco)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-marinho/10 pt-3">
        <span className="text-[13px] font-medium text-marinho/60">Total</span>
        <span className="font-[family-name:var(--font-archivo)] text-lg font-semibold tabular-nums text-marinho">
          {formatarReal(total)}
        </span>
      </div>
    </div>
  );
}
