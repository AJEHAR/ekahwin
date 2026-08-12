/**
 * Lapisan "pelindung bacaan" — glow lembut ivory yang duduk DI ANTARA
 * floral (z-0) dan teks (z-10). Tujuannya supaya teks kekal jelas dibaca
 * walaupun floral di belakang dibesarkan, tanpa perlu letak kotak putih
 * yang jelas kelihatan (kekal nampak "editorial", bukan kotak borang).
 *
 * Punca floral direka lebih lut sinar di tengah (di mana teks berada)
 * dan makin telus ke tepi (supaya floral di sudut masih kelihatan).
 */
export default function TextVeil({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-[1] pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(ellipse 68% 72% at 50% 50%, var(--color-ivory) 52%, transparent 80%)",
      }}
    />
  )
}
