const GRADIENTES = {
  verde: "from-verde/35 via-azul/10 to-marinho",
  azul: "from-azul/35 via-verde/10 to-marinho",
  duplo: "from-verde/30 via-azul/25 to-marinho",
} as const;

export function MockupNavegador({
  url,
  cor = "verde",
  className,
}: {
  url: string;
  cor?: keyof typeof GRADIENTES;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-marinho/12 bg-white shadow-[0_24px_60px_-24px_rgba(23,53,94,0.25)] ${className ?? ""}`}
    >
      <div className="flex items-center gap-1.5 border-b border-marinho/10 bg-gelo px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-marinho/15" />
        <span className="h-2 w-2 rounded-full bg-marinho/15" />
        <span className="h-2 w-2 rounded-full bg-marinho/15" />
        <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-1 text-[11px] text-marinho/40">
          {url}
        </span>
      </div>
      <div className={`aspect-[16/10] bg-gradient-to-br ${GRADIENTES[cor]} p-4`}>
        <div className="h-2.5 w-2/5 rounded-full bg-white/70" />
        <div className="mt-4 h-16 rounded-lg bg-white/45" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-md bg-white/35" />
          <div className="h-10 rounded-md bg-white/35" />
          <div className="h-10 rounded-md bg-white/35" />
        </div>
      </div>
    </div>
  );
}
