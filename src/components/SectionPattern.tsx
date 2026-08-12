import { asset } from "../utils/asset"

/**
 * Latar belakang pattern floral berulang (tiled) — guna semula gambar
 * floral sedia ada (bukan asset baru), pada opacity rendah supaya
 * jadi "tekstur" lembut di belakang kandungan, bukan floral pekat
 * yang ganggu bacaan teks.
 *
 * Nota: gambar floral kita ialah cluster individu (bukan pattern
 * seamless yang direka khas untuk berulang), jadi pada opacity tinggi
 * mungkin nampak "grid" berulang. Kekal opacity rendah (~0.05-0.10)
 * untuk elak isu ni.
 */

type Variant = "burgundy" | "peony" | "blush"

const variantSrc: Record<Variant, string> = {
  burgundy: "/images/floral/corner-burgundy.webp",
  peony: "/images/floral/corner-peony.webp",
  blush: "/images/floral/corner-blush.webp",
}

export default function SectionPattern({
  variant = "burgundy",
  opacity = 0.07,
  size = 260,
}: {
  variant?: Variant
  opacity?: number
  size?: number
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: `url(${asset(variantSrc[variant])})`,
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: "repeat",
        opacity,
      }}
    />
  )
}
