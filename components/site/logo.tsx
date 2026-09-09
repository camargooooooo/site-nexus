const TEAL = "#178F82";

export function Logo({
  invertido = false,
  grande = false,
  className,
}: {
  invertido?: boolean;
  grande?: boolean;
  className?: string;
}) {
  const arestaBase = invertido ? "#FFFFFF" : "var(--marinho)";
  const corTitulo = invertido ? "text-white" : "text-marinho";
  const corSubtitulo = invertido ? "text-white/55" : "text-marinho/50";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 40 40"
        className={grande ? "h-10 w-10 shrink-0" : "h-8 w-8 shrink-0"}
        aria-hidden="true"
      >
        <line x1="20" y1="8" x2="9" y2="30" stroke="var(--verde)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="8" x2="31" y2="30" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="9" y1="30" x2="31" y2="30" stroke={arestaBase} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="8" r="5.5" fill="var(--verde)" />
        <circle cx="9" cy="30" r="5.5" fill="var(--verde)" />
        <circle cx="31" cy="30" r="5.5" fill="var(--azul)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-archivo)] tracking-[-0.02em] ${corTitulo} ${
            grande ? "text-2xl font-bold" : "text-lg font-semibold"
          }`}
        >
          Nexo
        </span>
        <span
          className={`mt-0.5 font-medium tracking-[0.28em] ${corSubtitulo} ${
            grande ? "text-[10px]" : "text-[9px]"
          }`}
        >
          SISTEMAS
        </span>
      </span>
    </span>
  );
}
