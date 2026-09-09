const RUIDO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='r'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23r)'/></svg>";

export function Grao() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: `url("${RUIDO}")`, backgroundSize: "180px 180px" }}
    />
  );
}
