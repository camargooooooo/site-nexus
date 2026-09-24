const TEMAS = {
  menta: { faixa: "bg-menta text-tinta", bloco: "bg-cobalto text-white", destaque: "bg-sol" },
  sol: { faixa: "bg-sol text-tinta", bloco: "bg-tinta text-white", destaque: "bg-coral" },
  coral: { faixa: "bg-coral text-tinta", bloco: "bg-cobalto text-white", destaque: "bg-menta" },
} as const;

export type ConteudoSite = {
  marca: string;
  menu: string[];
  titulo: string;
  subtitulo: string;
  botao: string;
  itens: { nome: string; preco: string }[];
};

/** Janela de navegador com um site de exemplo (negócio fictício, dados ilustrativos). */
export function MockupNavegador({
  url,
  cor = "menta",
  conteudo,
  className,
}: {
  url: string;
  cor?: keyof typeof TEMAS;
  conteudo: ConteudoSite;
  className?: string;
}) {
  const t = TEMAS[cor];
  return (
    <div className={`overflow-hidden rounded-2xl bg-white text-tinta sombra-tela-escura ${className ?? ""}`} aria-hidden="true">
      <div className="flex items-center gap-1.5 border-b border-tinta/10 bg-papel px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" />
        <span className="h-2.5 w-2.5 rounded-full bg-sol" />
        <span className="h-2.5 w-2.5 rounded-full bg-menta" />
        <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-1 text-[11px] text-tinta/70">{url}</span>
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="titulo truncate text-[12px]">{conteudo.marca}</span>
          <span className="flex shrink-0 gap-2.5 text-[9px] font-medium text-tinta/70">
            {conteudo.menu.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </span>
        </div>
        <div className={`mt-3 flex items-end justify-between gap-3 rounded-xl p-3.5 ${t.bloco}`}>
          <div className="min-w-0">
            <p className="titulo text-[15px] leading-tight">{conteudo.titulo}</p>
            <p className="mt-1 text-[9px] leading-snug opacity-85">{conteudo.subtitulo}</p>
            <span className={`mt-2.5 inline-block rounded-full px-2.5 py-1 text-[9px] font-bold ${t.faixa}`}>
              {conteudo.botao}
            </span>
          </div>
          <div className={`h-11 w-11 shrink-0 rounded-full ${t.destaque}`} />
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {conteudo.itens.map((item) => (
            <div key={item.nome} className="rounded-lg bg-papel p-2">
              <p className="truncate text-[9px] font-semibold">{item.nome}</p>
              <p className="mt-0.5 text-[9px] tabular-nums text-tinta/70">{item.preco}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
