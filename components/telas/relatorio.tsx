function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const LINHAS = [
  { rotulo: "Total vendido no mês", valor: formatarReal(18437.6) },
  { rotulo: "Ticket médio", valor: formatarReal(34.9) },
  { rotulo: "Produto mais vendido", valor: "Arroz tipo 1 5kg" },
];

export function Relatorio() {
  return (
    <div className="w-full border border-marinho/15 bg-white font-[family-name:var(--font-instrument)] text-[13px] text-marinho">
      <div className="flex items-center justify-between border-b border-marinho/10 px-4 py-2">
        <span className="font-medium">relatorio-vendas-agosto.xlsx</span>
        <span className="text-[11px] text-marinho/45">exportado</span>
      </div>
      <div>
        {LINHAS.map((l) => (
          <div key={l.rotulo} className="flex items-center justify-between border-b border-marinho/5 px-4 py-2">
            <span className="text-marinho/60">{l.rotulo}</span>
            <span className="tabular-nums">{l.valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
