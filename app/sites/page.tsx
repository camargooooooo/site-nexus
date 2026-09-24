import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { SitesHero } from "@/components/site/sites-hero";
import { SitesTipos } from "@/components/site/sites-tipos";
import { SitesIncluido } from "@/components/site/sites-incluido";
import { Footer } from "@/components/site/footer";
import { Divisor } from "@/components/site/divisor";
import { CtaFlutuante } from "@/components/site/cta-flutuante";

export const metadata: Metadata = {
  title: "Sites | Nexo Sistemas",
  description: "Sites sob medida — institucionais, landing pages e catálogos — feitos pela Nexo Sistemas.",
};

export default function SitesPage() {
  return (
    <>
      <Nav />
      <main>
        <SitesHero />
        <Divisor de="escura" para="papel" />
        <SitesTipos />
        <Divisor de="papel" para="clara" />
        <SitesIncluido />
        <Divisor de="clara" para="escura" />
        <Footer />
      </main>
      <CtaFlutuante />
    </>
  );
}
