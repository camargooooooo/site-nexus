import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "primaria" | "fantasma-escuro" | "fantasma-claro" | "cobalto";
type Tamanho = "md" | "lg";

const VARIANTES: Record<Variante, string> = {
  primaria:
    "bg-menta text-tinta shadow-[0_10px_30px_-10px_rgb(46_232_143/0.7)] hover:bg-[#5cf0a8] hover:shadow-[0_14px_36px_-10px_rgb(46_232_143/0.85)]",
  cobalto:
    "bg-cobalto text-white shadow-[0_10px_30px_-12px_rgb(29_63_255/0.7)] hover:bg-cobalto-escuro",
  "fantasma-escuro": "text-white ring-1 ring-inset ring-white/35 hover:bg-white/10 hover:ring-white/60",
  "fantasma-claro": "text-tinta ring-1 ring-inset ring-tinta/20 hover:bg-tinta/[0.04] hover:ring-tinta/40",
};

const TAMANHOS: Record<Tamanho, string> = {
  md: "h-11 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

export function classeAcao(variante: Variante = "primaria", tamanho: Tamanho = "md") {
  return `group/acao relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 ${VARIANTES[variante]} ${TAMANHOS[tamanho]}`;
}

export function Seta({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/acao:translate-x-1 ${className ?? ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Acao({
  variante = "primaria",
  tamanho = "md",
  seta = false,
  children,
  className,
  ...props
}: ComponentProps<typeof Link> & {
  variante?: Variante;
  tamanho?: Tamanho;
  seta?: boolean;
  children: ReactNode;
}) {
  return (
    <Link {...props} className={`${classeAcao(variante, tamanho)} ${className ?? ""}`}>
      {children}
      {seta && <Seta />}
    </Link>
  );
}
