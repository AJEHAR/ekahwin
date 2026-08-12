import { useState } from "react"
import { asset } from "../utils/asset"

/**
 * Paparkan gambar sebenar jika wujud di /public/images/.
 * Jika belum diupload, papar placeholder elegan supaya layout tetap kemas.
 */
export default function PhotoFrame({
  src,
  alt,
  shape = "rounded",
  className = "",
}: {
  src: string
  alt: string
  shape?: "circle" | "rounded"
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const radius = shape === "circle" ? "rounded-full" : "rounded-[24px]"

  if (failed) {
    return (
      <div
        className={`${radius} ${className} flex items-center justify-center bg-gradient-to-br from-[var(--color-champagne)] to-[var(--color-pistachio)] border border-[var(--color-gold)]/40`}
      >
        <svg width="34%" height="34%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 17.5 L9 11 L13 15 L16 11.5 L20 16.5"
            stroke="var(--color-maroon)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <circle cx="8" cy="8" r="1.6" fill="var(--color-gold)" opacity="0.7" />
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" stroke="var(--color-maroon)" strokeWidth="1.2" opacity="0.35" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${radius} ${className} object-cover`}
      loading="lazy"
    />
  )
}
