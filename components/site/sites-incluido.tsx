const RECURSOS = [
  { nome: "Design exclusivo", texto: "Pensado para a sua marca, não um template pronto." },
  { nome: "Responsivo", texto: "Funciona bem em celular, tablet e computador." },
  { nome: "Formulário de contato", texto: "Pedidos e mensagens chegam direto no seu e-mail." },
  { nome: "Otimização básica para Google", texto: "Estrutura pensada para aparecer nas buscas." },
  { nome: "Domínio e hospedagem", texto: "Deixamos o site no ar, no seu domínio." },
  { nome: "Suporte após a entrega", texto: "Ajuste pontual depois que o site vai ao ar." },
];

const LINHAS = [
  { rotulo: "Prazo de entrega", valor: "Combinado antes de começar" },
  { rotulo: "Revisões inclusas", valor: "Conforme o plano" },
  { rotulo: "Hospedagem", valor: "Configurada e entregue" },
  { rotulo: "Domínio", valor: "Configurado no seu nome" },
  { rotulo: "Suporte", valor: "Disponível após a entrega" },
];

export function SitesIncluido() {
  return (
    <section id="incluido" className="secao-clara px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold tabular-nums text-marinho/40">
        Ficha do serviço
      </p>
      <h2 className="mt-2 max-w-[16ch] font-[family-name:var(--font-archivo)] text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1] tracking-[-0.03em] text-marinho">
        O que está incluído.
      </h2>

      <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-marinho/45">No pacote</p>
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
          <p className="text-sm font-medium text-marinho/45">Condições</p>
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
