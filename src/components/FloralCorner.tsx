import type { CSSProperties } from "react"
import { asset } from "../utils/asset"

/**
 * Dekorasi floral watercolor sebenar — dipakai berulang di sudut setiap
 * section untuk kesan "border floral" sepanjang kad. Sokong beberapa
 * varian gambar (variant prop) untuk variasi visual, bukan gambar sama
 * berulang di setiap tempat.
 *
 * z-0 secara eksplisit supaya SENTIASA di belakang teks (yang guna z-10),
 * tak kira susunan DOM — elak floral menutup tulisan.
 *
 * PENTING: posisi (top/left/bottom/right) diset terus guna inline style
 * (bukan className Tailwind) — elak isu Tailwind tak generate class untuk
 * nilai yang dibina secara dinamik dalam objek JS.
 *
 * Saiz responsive guna clamp() — lagi besar di telefon (majoriti tetamu
 * buka di telefon) berbanding sebelum ni, tapi kekal munasabah di desktop.
 */

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right"
type Variant = "burgundy" | "peony" | "blush"

const variantSrc: Record<Variant, string> = {
  burgundy: "/images/floral/corner-burgundy.webp",
  peony: "/images/floral/corner-peony.webp",
  blush: "/images/floral/corner-blush.webp",
}

const cornerStyles: Record<Corner, CSSProperties> = {
  "top-left": { top: 0, left: 0, transform: "none", transformOrigin: "top left" },
  "top-right": { top: 0, right: 0, transform: "scaleX(-1)", transformOrigin: "top right" },
  "bottom-left": { bottom: 0, left: 0, transform: "scaleY(-1)", transformOrigin: "bottom left" },
  "bottom-right": { bottom: 0, right: 0, transform: "scale(-1, -1)", transformOrigin: "bottom right" },
}

export default function FloralCorner({
  corner,
  size = 160,
  opacity = 1,
  variant = "burgundy",
  className = "",
}: {
  corner: Corner
  size?: number
  opacity?: number
  variant?: Variant
  className?: string
}) {
  return (
    <img
      src={asset(variantSrc[variant])}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none select-none ${className}`}
      style={{
        position: "absolute",
        zIndex: 0,
        width: `clamp(200px, 62vw, ${size}px)`,
        height: "auto",
        opacity,
        ...cornerStyles[corner],
      }}
    />
  )
}
