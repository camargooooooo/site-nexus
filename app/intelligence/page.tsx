import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Divisor } from "@/components/site/divisor";
import { CtaFlutuante } from "@/components/site/cta-flutuante";
import { MovimentoDoUsuario } from "@/components/site/intelligence/movimento";
import { IntelligenceHero } from "@/components/site/intelligence/hero";
import { OQueE } from "@/components/site/intelligence/o-que-e";
import { IA } from "@/components/site/intelligence/ia";
import { CRM } from "@/components/site/intelligence/crm";
import { Automacoes } from "@/components/site/intelligence/automacoes";
import { Demonstracao } from "@/components/site/intelligence/demonstracao";
import { Processo } from "@/components/site/intelligence/processo";
import { Empresas } from "@/components/site/intelligence/empresas";
import { CtaFinal } from "@/components/site/intelligence/cta-final";

const TITULO = "Nexo Intelligence | IA, CRM e automação sob medida";
const DESCRICAO =
  "A frente de tecnologia inteligente da Nexo Sistemas: inteligência artificial, CRM e automações desenvolvidos em torno da operação da sua empresa.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexosistems.com.br"),
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/intelligence" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/intelligence",
    siteName: "Nexo Sistemas",
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRICAO },
};

export default function IntelligencePage() {
  return (
    <MovimentoDoUsuario>
      <Nav />
      <main className="bg-noite">
        <IntelligenceHero />
        <OQueE />
        <Divisor de="noite" para="profunda" />
        <IA />
        <Divisor de="profunda" para="noite" />
        <CRM />
        <Divisor de="noite" para="profunda" />
        <Automacoes />
        <Divisor de="profunda" para="papel" />
        <Demonstracao />
        <Divisor de="papel" para="noite" />
        <Processo />
        <Divisor de="noite" para="profunda" />
        <Empresas />
        <Divisor de="profunda" para="noite" />
        <CtaFinal />
        <Divisor de="noite" para="escura" />
        <Footer />
      </main>
      <CtaFlutuante />
    </MovimentoDoUsuario>
  );
}
