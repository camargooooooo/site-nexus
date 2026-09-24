export function Logo({
  invertido = false,
  grande = false,
  className,
}: {
  invertido?: boolean;
  grande?: boolean;
  className?: string;
}) {
  const noDireito = invertido ? "var(--sol)" : "var(--cobalto)";
  const arestaBase = invertido ? "#FFFFFF" : "var(--tinta)";
  const corTitulo = invertido ? "text-white" : "text-tinta";
  const corSubtitulo = invertido ? "text-white/60" : "text-tinta/55";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 40 40"
        className={grande ? "h-10 w-10 shrink-0" : "h-8 w-8 shrink-0"}
        aria-hidden="true"
      >
        <line x1="20" y1="8" x2="9" y2="30" stroke="var(--menta)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="8" x2="31" y2="30" stroke={noDireito} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="9" y1="30" x2="31" y2="30" stroke={arestaBase} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="8" r="5.5" fill="var(--menta)" />
        <circle cx="9" cy="30" r="5.5" fill="var(--menta)" />
        <circle cx="31" cy="30" r="5.5" fill={noDireito} />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`titulo ${corTitulo} ${grande ? "text-2xl" : "text-lg"}`}>Nexo</span>
        <span
          className={`mt-1 font-semibold tracking-[0.3em] ${corSubtitulo} ${grande ? "text-[10px]" : "text-[9px]"}`}
        >
          SISTEMAS
        </span>
      </span>
    </span>
  );
}
