export function ConnectionLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(210, 100%, 60%)" stopOpacity={0.6} />
          <stop offset="100%" stopColor="hsl(160, 100%, 50%)" stopOpacity={0.6} />
        </linearGradient>
      </defs>
      {/* Decorative flowing lines */}
      <path
        d="M 120 120 C 200 120, 200 240, 280 240"
        stroke="url(#lineGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        className="animate-flow-dash"
        opacity={0.4}
      />
      <path
        d="M 360 120 C 440 120, 440 360, 520 360"
        stroke="url(#lineGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        className="animate-flow-dash"
        opacity={0.3}
      />
      <path
        d="M 280 240 C 360 240, 360 360, 520 360"
        stroke="url(#lineGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        className="animate-flow-dash"
        opacity={0.35}
      />
    </svg>
  );
}
