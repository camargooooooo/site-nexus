const TONS = {
  clara: "var(--branco)",
  papel: "var(--papel)",
  escura: "var(--cobalto)",
  profunda: "var(--cobalto-profundo)",
  noite: "var(--noite)",
} as const;

/** Costura entre capítulos: o próximo sobe por cima do anterior com cantos arredondados. */
export function Divisor({
  de,
  para,
}: {
  de: keyof typeof TONS;
  para: keyof typeof TONS;
}) {
  return (
    <div aria-hidden="true" className="relative h-10 sm:h-14" style={{ background: TONS[de] }}>
      <div
        className="absolute inset-x-0 bottom-0 h-full rounded-t-[2rem] sm:rounded-t-[3rem]"
        style={{ background: TONS[para] }}
      />
    </div>
  );
}
