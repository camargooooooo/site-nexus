"use client";

import { useEffect, useState } from "react";
import { SECOES } from "@/components/site/secoes";

const ULTIMA = SECOES[SECOES.length - 1].id;

export function useSecaoAtiva() {
  const [ativo, setAtivo] = useState<string>(SECOES[0].id);

  useEffect(() => {
    const elementos = SECOES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setAtivo(entrada.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elementos.forEach((el) => observer.observe(el));

    function aoRolar() {
      const pertoDoFim =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (pertoDoFim) setAtivo(ULTIMA);
    }

    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  const indice = SECOES.findIndex((s) => s.id === ativo);
  return { ativo, secao: SECOES[indice === -1 ? 0 : indice], indice: indice === -1 ? 0 : indice };
}
