import { useState } from "react"
import { weddingConfig } from "../data/weddingConfig"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard tak tersedia — abaikan senyap
    }
  }

  return (
    <footer className="relative pt-20 pb-16 px-6 bg-[var(--color-maroon)] text-[var(--color-ivory)] text-center overflow-hidden">
      <SectionPattern variant="burgundy" opacity={0.14} />
      <FloralCorner corner="top-left" size={430} opacity={0.45} variant="burgundy" />
      <FloralCorner corner="bottom-right" size={430} opacity={0.45} variant="peony" />

      <div className="relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl mb-3">{weddingConfig.footer.thankYouTitle}</h2>
        <p className="font-heading italic text-[var(--color-champagne)] mb-8">{weddingConfig.footer.thankYouBody}</p>

        <p className="font-script text-4xl sm:text-5xl mb-8">
          {weddingConfig.couple.groomShort}
          <span className="text-[var(--color-gold)] mx-3 font-body align-middle text-2xl">♡</span>
          {weddingConfig.couple.brideShort}
        </p>

        <button
          onClick={handleCopy}
          className="active:scale-95 transition-transform inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-ivory)]/40 text-sm font-body tracking-wide mb-10 min-h-[48px]"
        >
          {copied ? "Pautan disalin ✓" : "Salin Pautan Jemputan"}
        </button>

        <p className="font-body text-[11px] tracking-[0.15em] uppercase text-[var(--color-ivory)]/50">
          {weddingConfig.event.eventName} · {weddingConfig.event.dateDisplay}
        </p>
      </div>
    </footer>
  )
}
