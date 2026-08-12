import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"

export default function QuranVerse() {
  return (
    <section className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="burgundy" opacity={0.06} />
      <FloralCorner corner="top-left" size={380} opacity={0.85} variant="burgundy" />
      <FloralCorner corner="bottom-right" size={380} opacity={0.85} variant="blush" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto glass-card px-8 py-14 sm:px-14 text-center relative z-10"
      >
        <p dir="rtl" className="font-arabic text-2xl sm:text-3xl leading-loose text-[var(--color-maroon)] mb-8 text-balance">
          {weddingConfig.quran.arabic}
        </p>
        <p className="font-heading italic text-base sm:text-lg leading-relaxed text-[var(--color-brown)] text-balance mb-6">
          "{weddingConfig.quran.translation}"
        </p>
        <p className="font-body text-xs tracking-[0.25em] uppercase text-[var(--color-gold)]">
          {weddingConfig.quran.surah}
        </p>
      </motion.div>
    </section>
  )
}
