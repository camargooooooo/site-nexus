const HISTORICO = [
  { data: "02/09", valor: 46.8, status: "Em aberto" },
  { data: "18/08", valor: 60.0, status: "Pago" },
  { data: "03/08", valor: 25.0, status: "Parcial" },
];

function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function FichaFiado() {
  return (
    <div className="w-full border border-marinho/15 bg-white font-[family-name:var(--font-instrument)] text-marinho">
      <div className="flex items-center justify-between bg-marinho px-4 py-2 text-white">
        <span className="text-[13px] font-medium">Nexo Fiado — Ficha do cliente</span>
      </div>

      <div className="flex items-center justify-between border-b border-marinho/10 px-4 py-3">
        <div>
          <p className="text-[15px] font-medium">Fernando Batista</p>
          <p className="text-[11px] text-marinho/45">Cliente desde jan/2024</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-marinho/45">Saldo devedor</p>
          <p className="font-[family-name:var(--font-archivo)] text-lg font-semibold text-erro">
            {formatarReal(46.8)}
          </p>
        </div>
      </div>

      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-marinho/10 text-left text-[11px] text-marinho/45">
            <th className="px-4 py-2 font-normal">Data</th>
            <th className="py-2 text-right font-normal">Valor</th>
            <th className="px-4 py-2 text-right font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {HISTORICO.map((h) => (
            <tr key={h.data} className="border-b border-marinho/5">
              <td className="px-4 py-1.5 tabular-nums text-marinho/70">{h.data}</td>
              <td className="py-1.5 text-right tabular-nums">{formatarReal(h.valor)}</td>
              <td
                className={`px-4 py-1.5 text-right text-[12px] ${
                  h.status === "Em aberto"
                    ? "text-erro"
                    : h.status === "Parcial"
                      ? "text-azul-forte"
                      : "text-verde-forte"
                }`}
              >
                {h.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end px-4 py-3">
        <span className="rounded-sm bg-verde-forte px-3 py-1.5 text-[12px] font-medium text-white">
          Registrar pagamento
        </span>
      </div>
    </div>
  );
}
