import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"
import { useGuestName } from "../utils/guestName"

export default function Salam() {
  const guestName = useGuestName()

  return (
    <section className="relative py-28 sm:py-32 px-6 overflow-hidden min-h-[550px] flex items-center">
      <SectionPattern variant="blush" opacity={0.06} />
      <FloralCorner corner="top-left" size={380} opacity={0.8} variant="burgundy" />
      <FloralCorner corner="bottom-right" size={380} opacity={0.8} variant="blush" />
      <TextVeil />
      <div className="max-w-xl mx-auto text-center relative z-10">
        {guestName && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
            className="font-body text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] mb-4"
          >
            Kepada
          </motion.p>
        )}

        {guestName && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-heading text-xl sm:text-2xl text-[var(--color-brown)] mb-6"
          >
            {guestName}
          </motion.p>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl text-[var(--color-maroon)] mb-8"
        >
          {weddingConfig.salam.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-lg sm:text-xl leading-relaxed text-[var(--color-brown)] text-balance"
        >
          {weddingConfig.salam.body}
        </motion.p>
      </div>
    </section>
  )
}
