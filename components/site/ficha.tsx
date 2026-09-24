import { TituloRevelado } from "@/components/site/revelar";

type Recurso = { nome: string; texto: string };
type Linha = { rotulo: string; valor: string };

function Check() {
  return (
    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-menta" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-tinta" fill="none">
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Ficha em duas colunas: o que vem dentro (lista) e as condições (tabela invertida em cobalto). */
export function Ficha({
  id,
  titulo,
  rotuloRecursos,
  recursos,
  rotuloLinhas,
  linhas,
}: {
  id: string;
  titulo: string;
  rotuloRecursos: string;
  recursos: Recurso[];
  rotuloLinhas: string;
  linhas: Linha[];
}) {
  return (
    <section id={id} className="secao-clara px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <TituloRevelado
          texto={titulo}
          className="titulo max-w-[16ch] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-tinta"
        />

        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h3 className="titulo text-lg text-tinta">{rotuloRecursos}</h3>
            <ul className="mt-4 divide-y divide-tinta/10 border-y border-tinta/10">
              {recursos.map((r) => (
                <li key={r.nome} className="flex gap-4 py-4">
                  <Check />
                  <div>
                    <p className="text-lg font-bold text-tinta">{r.nome}</p>
                    <p className="mt-0.5 text-[15px] leading-relaxed text-tinta/70">{r.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="self-start overflow-hidden rounded-3xl bg-cobalto text-white sombra-tela">
            <h3 className="titulo border-b border-white/15 px-7 py-5 text-lg">{rotuloLinhas}</h3>
            <table className="w-full border-collapse">
              <tbody>
                {linhas.map((linha) => (
                  <tr key={linha.rotulo} className="border-b border-white/10 last:border-0">
                    <th scope="row" className="px-7 py-4 text-left align-top text-[15px] font-medium text-white/80">
                      {linha.rotulo}
                    </th>
                    <td className="py-4 pr-7 text-right align-top text-[15px] font-bold text-white">{linha.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
