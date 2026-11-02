import { classeAcao, Seta } from "@/components/site/acao";
import { TituloRevelado } from "@/components/site/revelar";
import { MiniSimbolo, Surgir } from "@/components/site/intelligence/comum";
import { EMAIL, LINK_DIAGNOSTICO, LINK_ESPECIALISTA } from "@/components/site/intelligence/contato";

export function CtaFinal() {
  return (
    <section id="int-contato" aria-label="Solicitar diagnóstico" className="secao-noite relative isolate overflow-hidden text-white">
      <div className="mx-auto max-w-[72rem] px-6 py-28 text-center sm:px-10 lg:px-16 lg:py-40">
        <Surgir className="flex justify-center">
          <MiniSimbolo className="h-14 w-14" />
        </Surgir>
        <TituloRevelado
          texto="Sua operação pode ser mais inteligente."
          className="titulo mx-auto mt-10 max-w-[14ch] text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.95] text-white"
        />
        <Surgir>
          <p className="mx-auto mt-8 max-w-[44ch] text-lg leading-relaxed text-white/80 sm:text-xl">
            Vamos entender os desafios da sua empresa e descobrir onde a tecnologia pode gerar resultados reais.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a href={LINK_DIAGNOSTICO} target="_blank" rel="noopener noreferrer" className={classeAcao("primaria", "lg")}>
              Solicitar diagnóstico
              <Seta />
            </a>
            <a href={LINK_ESPECIALISTA} className={classeAcao("fantasma-escuro", "lg")}>
              Conversar com um especialista
            </a>
          </div>
          <p className="mt-8 text-sm text-white/65">
            O diagnóstico começa pelo WhatsApp (14) 99109-6832. Se preferir, escreva para{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold text-white underline underline-offset-4 hover:text-menta">
              {EMAIL}
            </a>
            .
          </p>
        </Surgir>
      </div>
    </section>
  );
}
