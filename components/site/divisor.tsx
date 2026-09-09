const TONS = {
  clara: "var(--branco)",
  escura: "var(--marinho)",
} as const;

export function Divisor({
  de,
  para,
}: {
  de: keyof typeof TONS;
  para: keyof typeof TONS;
}) {
  return (
    <div aria-hidden="true" className="relative h-16 overflow-hidden sm:h-24 lg:h-32" style={{ background: TONS[de] }}>
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="divisor-onda absolute inset-x-0 -top-6 h-[calc(100%+3rem)] w-full"
      >
        <path
          d="M0,64 C 220,160 460,10 720,96 C 980,182 1220,24 1440,110 L1440,220 L0,220 Z"
          fill={TONS[para]}
        />
      </svg>
    </div>
  );
}
