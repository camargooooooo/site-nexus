import { TituloRevelado } from "@/components/site/revelar";
import { Surgir } from "@/components/site/intelligence/comum";

// Aplicações possíveis por tipo de operação. São exemplos de uso, não casos de clientes.
const SEGMENTOS = [
  {
    nome: "Indústrias",
    aplicacao: "Pedidos de representantes que entram direto no CRM, alertas de prazo de produção e consulta de status por mensagem.",
  },
  {
    nome: "Empresas de serviços",
    aplicacao: "Triagem de chamados, agendamento de visitas e distribuição automática para a equipe técnica certa.",
  },
  {
    nome: "Distribuidoras",
    aplicacao: "Cotações montadas a partir do estoque, acompanhamento de carteira por vendedor e avisos de reposição.",
  },
  {
    nome: "Escritórios e operações comerciais",
    aplicacao: "Funil comercial organizado, follow-ups que não se perdem e indicadores que a gestão consulta sem planilha.",
  },
  {
    nome: "Empresas com processos complexos",
    aplicacao: "Fluxos com aprovações, várias áreas envolvidas e regras específicas, desenhados do jeito que a operação funciona.",
  },
  {
    nome: "Negócios com vários sistemas",
    aplicacao: "ERP, planilhas, e-mail e mensagens conversando entre si, sem retrabalho de copiar e colar informação.",
  },
] as const;

export function Empresas() {
  return (
    <section id="int-empresas" aria-label="Para quais empresas" className="secao-profunda text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <TituloRevelado
            texto="Para operações reais, de qualquer segmento."
            className="titulo max-w-[18ch] text-[clamp(2.25rem,4.3vw,4rem)] leading-[0.97] text-white"
          />
          <Surgir>
            <p className="max-w-[46ch] text-lg leading-relaxed text-white/80">
              A Intelligence não é feita para um setor só. Ela serve a empresas em que a operação depende de
              informação circulando bem entre pessoas, clientes e sistemas.
            </p>
          </Surgir>
        </div>

        <Surgir className="mt-14 lg:mt-20">
          <ul className="border-t border-white/15">
            {SEGMENTOS.map((s, i) => (
              <li
                key={s.nome}
                className="group grid gap-2 border-b border-white/15 py-6 transition-colors duration-300 hover:bg-white/[0.05] sm:px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12 lg:py-7"
              >
                <h3 className="titulo flex items-start gap-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">
                  <span
                    aria-hidden="true"
                    className={`mt-[0.4em] h-3 w-3 shrink-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-150 ${
                      i % 3 === 2 ? "bg-sol" : "bg-menta"
                    }`}
                  />
                  {s.nome}
                </h3>
                <p className="pl-7 text-[17px] leading-relaxed text-white/75 transition-colors group-hover:text-white lg:pl-0">
                  {s.aplicacao}
                </p>
              </li>
            ))}
          </ul>
        </Surgir>
      </div>
    </section>
  );
}
