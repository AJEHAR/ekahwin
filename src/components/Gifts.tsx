import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import PhotoFrame from "./PhotoFrame"
import { DividerMark } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"

export default function Gifts() {
  return (
    <section className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="burgundy" opacity={0.06} />
      <FloralCorner corner="top-right" size={360} opacity={0.8} variant="burgundy" />
      <FloralCorner corner="bottom-left" size={360} opacity={0.8} variant="peony" />
      <TextVeil />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center relative z-10"
      >
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-brown)] mb-2">Wedding Gift</h2>
        <p className="font-heading italic text-[var(--color-maroon)] mb-8">
          Doa restu anda adalah hadiah paling bermakna
        </p>
        <DividerMark className="w-32 mx-auto mb-10" />

        <div className="glass-card p-8 inline-flex flex-col items-center">
          <PhotoFrame
            src={weddingConfig.gift.qrImage}
            alt="QR DuitNow"
            shape="rounded"
            className="w-56 h-56"
          />
          <p className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-brown)]/70 mt-5">
            Imbas untuk DuitNow
          </p>
        </div>
      </motion.div>
    </section>
  )
}
