import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Problema } from "@/components/site/problema";
import { PassaOProduto } from "@/components/site/passa-o-produto";
import { BaixaOEstoque } from "@/components/site/baixa-o-estoque";
import { FechaOCaixa } from "@/components/site/fecha-o-caixa";
import { Camadas } from "@/components/site/camadas";
import { FichaTecnica } from "@/components/site/ficha-tecnica";
import { Footer } from "@/components/site/footer";
import { Divisor } from "@/components/site/divisor";
import { CtaFlutuante } from "@/components/site/cta-flutuante";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Divisor de="escura" para="clara" />
        <Problema />
        <PassaOProduto />
        <Divisor de="clara" para="escura" />
        <BaixaOEstoque />
        <Divisor de="escura" para="clara" />
        <FechaOCaixa />
        <Divisor de="clara" para="escura" />
        <Camadas />
        <Divisor de="escura" para="clara" />
        <FichaTecnica />
        <Divisor de="clara" para="escura" />
        <Footer />
      </main>
      <CtaFlutuante />
    </>
  );
}
