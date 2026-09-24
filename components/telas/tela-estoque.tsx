const PRODUTOS = [
  { nome: "Arroz tipo 1 5kg", loja: 84, deposito: 240, validade: "22/03/2027", alerta: false },
  { nome: "Refrigerante 2L", loja: 31, deposito: 60, validade: "14/01/2027", alerta: false },
  { nome: "Água mineral 500ml", loja: 52, deposito: 18, validade: "05/10/2026", alerta: false },
  { nome: "Energético 250ml", loja: 12, deposito: 6, validade: "29/09/2025", alerta: true },
  { nome: "Detergente 500ml", loja: 9, deposito: 14, validade: "11/12/2026", alerta: false },
];

export { PRODUTOS };

export function TelaEstoque({ ativo = null }: { ativo?: number | null }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-tinta/10 bg-white font-corpo text-tinta">
      <div className="flex items-center justify-between bg-cobalto px-5 py-3 text-white sm:px-6">
        <span className="text-[15px] font-medium">Nexo Estoque</span>
        <span className="text-[13px] text-white/85">5 produtos</span>
      </div>

      <table className="w-full border-collapse text-[13px] sm:text-[15px]">
        <thead>
          <tr className="border-b border-tinta/10 text-left text-[12px] text-tinta/65">
            <th className="px-5 py-2.5 font-normal sm:px-6">Produto</th>
            <th className="px-2 py-2.5 sm:px-3 text-right font-normal">Loja</th>
            <th className="px-2 py-2.5 sm:px-3 text-right font-normal">Depósito</th>
            <th className="px-5 py-2.5 text-right font-normal sm:px-6">Validade</th>
          </tr>
        </thead>
        <tbody>
          {PRODUTOS.map((p, i) => (
            <tr
              key={p.nome}
              className={`border-b border-tinta/5 transition-colors ${
                ativo === i ? "bg-sol/20" : ""
              }`}
            >
              <td className="px-3 py-2.5 sm:px-6">{p.nome}</td>
              <td
                className={`px-2 py-2.5 sm:px-3 text-right tabular-nums ${
                  ativo === i ? "font-semibold text-menta-escura" : "text-tinta/70"
                }`}
              >
                {ativo === i ? p.loja - 1 : p.loja}
              </td>
              <td className="px-2 py-2.5 sm:px-3 text-right tabular-nums text-tinta/70">{p.deposito}</td>
              <td
                className={`px-5 py-2.5 text-right tabular-nums sm:px-6 ${
                  p.alerta ? "font-medium text-erro" : "text-tinta/70"
                }`}
              >
                {p.validade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
