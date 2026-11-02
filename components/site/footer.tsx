import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { classeAcao, Seta } from "@/components/site/acao";
import { BotaoPreferenciasCookies } from "@/components/site/aviso-cookies";

export function Footer() {
  return (
    <footer id="contato" className="secao-escura px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <p className="titulo max-w-[16ch] text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] text-white">
            Quero controlar meu negócio
          </p>
          <Link
            href="/orcamento"
            className={`${classeAcao("primaria", "lg")} mt-10`}
          >
            Pedir orçamento
            <Seta />
          </Link>
        </div>

        <dl className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <dt className="text-sm font-medium text-white/80">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href="https://wa.me/5514991096832"
                className="titulo whitespace-nowrap text-lg text-white underline-offset-4 hover:text-menta hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                (14) 99109-6832
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-white/80">E-mail</dt>
            <dd className="mt-1">
              <a
                href="mailto:nnexosistemas@gmail.com"
                className="titulo whitespace-nowrap text-lg text-white underline-offset-4 hover:text-menta hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                nnexosistemas@gmail.com
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-20 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo invertido />
        <BotaoPreferenciasCookies className="text-left text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2" />
      </div>
    </footer>
  );
}
