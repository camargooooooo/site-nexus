const RECURSOS = [
  { nome: "PDV", texto: "Venda com leitor de código de barras." },
  { nome: "Controle de estoque", texto: "Loja e depósito separados, com validade." },
  { nome: "Fiado", texto: "Pagamento parcial, tudo registrado." },
  { nome: "Caixa diário", texto: "Abertura, vendas e fechamento do dia." },
  { nome: "Contas a pagar", texto: "O que ainda falta pagar, num lugar só." },
  { nome: "Relatórios", texto: "Exportação em PDF e Excel." },
  { nome: "Operação offline", texto: "Funciona 100% sem internet." },
];

const LINHAS = [
  { rotulo: "Desenvolvimento", valor: "Sob medida para o seu negócio" },
  { rotulo: "Instalação", valor: "Simples" },
  { rotulo: "Treinamento", valor: "Incluso, conforme o plano" },
  { rotulo: "Suporte", valor: "Disponível" },
  { rotulo: "Operação offline", valor: "Sim, modo offline completo" },
  { rotulo: "Requisito de máquina", valor: "Qualquer computador com internet" },
];

export function FichaTecnica() {
  return (
    <section id="sec-06" className="secao-clara px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-marinho/40">
        06
      </p>
      <h2 className="mt-2 max-w-[16ch] font-[family-name:var(--font-archivo)] text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1] tracking-[-0.03em] text-marinho">
        Especificações.
      </h2>

      <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-marinho/45">O que tem dentro</p>
          <dl className="mt-4">
            {RECURSOS.map((r) => (
              <div key={r.nome} className="flex items-baseline justify-between gap-6 border-b border-marinho/10 py-4">
                <dt className="font-[family-name:var(--font-archivo)] text-xl font-semibold text-marinho">
                  {r.nome}
                </dt>
                <dd className="text-right text-[15px] text-marinho/60">{r.texto}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="text-sm font-medium text-marinho/45">Ficha técnica</p>
          <table className="mt-4 w-full border-collapse">
            <tbody>
              {LINHAS.map((linha) => (
                <tr key={linha.rotulo} className="border-b border-marinho/10">
                  <td className="py-4 pr-6 text-[15px] text-marinho/55">{linha.rotulo}</td>
                  <td className="py-4 text-right text-[15px] text-marinho sm:text-left">{linha.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
