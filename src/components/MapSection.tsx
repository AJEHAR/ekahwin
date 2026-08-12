import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"

export default function MapSection() {
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(weddingConfig.event.mapQuery)}&output=embed`

  return (
    <section className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="blush" opacity={0.06} />
      <FloralCorner corner="top-left" size={380} opacity={0.8} variant="blush" />
      <FloralCorner corner="bottom-right" size={380} opacity={0.8} variant="burgundy" />
      <TextVeil />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-brown)] mb-3">Lokasi Majlis</h2>
        <p className="font-body text-sm text-[var(--color-brown)]/70 mb-10">Tekan butang di bawah untuk navigasi</p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="rounded-[24px] overflow-hidden border border-[var(--color-gold)]/30 shadow-[0_20px_50px_rgba(106,46,57,0.12)] mb-8"
        >
          <iframe
            title="Lokasi Majlis"
            src={embedSrc}
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={weddingConfig.event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[var(--color-maroon)] text-[var(--color-ivory)] text-sm tracking-wide font-body shadow-md"
          >
            Google Maps
          </a>
          <a
            href={weddingConfig.event.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-[var(--color-maroon)] text-[var(--color-maroon)] text-sm tracking-wide font-body"
          >
            Waze
          </a>
        </div>
      </div>
    </section>
  )
}
