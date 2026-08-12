// Elemen dekoratif SVG reka sendiri — motif "dahan botanikal" bergaya pelamin,
// dipakai berulang sebagai signature visual seluruh laman.

export function BotanicalSprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 8 C 40 20, 70 45, 90 90" stroke="var(--color-gold)" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      <path d="M20 4 C 55 18, 85 40, 105 78" stroke="var(--color-maroon)" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      {[
        [30, 18, 14], [45, 30, 11], [58, 44, 15], [70, 60, 10], [80, 76, 13],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={r}
          ry={r * 0.55}
          fill="var(--color-pistachio)"
          opacity={0.7 - i * 0.06}
          transform={`rotate(${30 + i * 12} ${x} ${y})`}
        />
      ))}
      {[
        [12, 12], [50, 20], [65, 52], [88, 85],
      ].map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="2.2" fill="var(--color-gold)" opacity="0.9" />
      ))}
    </svg>
  )
}

export function ArchFrame({ className = "" }: { className?: string }) {
  // Bentuk gerbang/arch — merujuk kepada pelamin pengantin Melayu tradisional
  return (
    <svg viewBox="0 0 520 640" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M20 630 V 220 C 20 100, 120 20, 260 20 C 400 20, 500 100, 500 220 V 630"
        stroke="var(--color-gold)"
        strokeWidth="1.6"
        opacity="0.65"
      />
      <path
        d="M46 630 V 224 C 46 116, 140 46, 260 46 C 380 46, 474 116, 474 224 V 630"
        stroke="var(--color-maroon)"
        strokeWidth="1"
        opacity="0.35"
      />
      {/* Sprigs bertaburan di sepanjang lengkung */}
      <g opacity="0.85">
        <ellipse cx="70" cy="240" rx="16" ry="8" fill="var(--color-pistachio)" transform="rotate(-30 70 240)" />
        <ellipse cx="94" cy="140" rx="14" ry="7" fill="var(--color-pistachio)" transform="rotate(-45 94 140)" />
        <ellipse cx="160" cy="70" rx="15" ry="7.5" fill="var(--color-pistachio)" transform="rotate(-60 160 70)" />
        <ellipse cx="450" cy="240" rx="16" ry="8" fill="var(--color-pistachio)" transform="rotate(30 450 240)" />
        <ellipse cx="426" cy="140" rx="14" ry="7" fill="var(--color-pistachio)" transform="rotate(45 426 140)" />
        <ellipse cx="360" cy="70" rx="15" ry="7.5" fill="var(--color-pistachio)" transform="rotate(60 360 70)" />
        <circle cx="70" cy="240" r="2" fill="var(--color-gold)" />
        <circle cx="450" cy="240" r="2" fill="var(--color-gold)" />
        <circle cx="160" cy="70" r="2" fill="var(--color-gold)" />
        <circle cx="360" cy="70" r="2" fill="var(--color-gold)" />
      </g>
    </svg>
  )
}

export function DividerMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0" y1="12" x2="60" y2="12" stroke="var(--color-gold)" strokeWidth="1" opacity="0.7" />
      <path d="M80 4 C 84 10, 84 14, 80 20 C 76 14, 76 10, 80 4 Z" fill="var(--color-maroon)" opacity="0.8" />
      <line x1="100" y1="12" x2="160" y2="12" stroke="var(--color-gold)" strokeWidth="1" opacity="0.7" />
    </svg>
  )
}

export function WatercolorWash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 800" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="wash1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-pistachio)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-pistachio)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wash2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-champagne)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-champagne)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="180" r="260" fill="url(#wash1)" />
      <circle cx="620" cy="560" r="300" fill="url(#wash2)" />
    </svg>
  )
}
