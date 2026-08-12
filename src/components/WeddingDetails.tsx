import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import { DividerMark } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import AddToCalendar from "./AddToCalendar"

export default function WeddingDetails() {
  return (
    <section id="details" className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="burgundy" opacity={0.06} />
      <FloralCorner corner="top-left" size={380} opacity={0.85} variant="burgundy" />
      <FloralCorner corner="bottom-right" size={380} opacity={0.85} variant="peony" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto glass-card px-8 py-14 sm:px-14 text-center relative z-10"
      >
        <p className="font-body text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] mb-3">Tarikh Majlis</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-maroon)] mb-8">
          {weddingConfig.event.dateDisplay}
        </h2>

        <DividerMark className="w-32 mx-auto mb-8" />

        <p className="font-body text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] mb-3">Lokasi</p>
        <p className="font-heading text-lg sm:text-xl text-[var(--color-brown)] mb-1">{weddingConfig.event.venueName}</p>
        <p className="font-heading text-lg sm:text-xl text-[var(--color-brown)] mb-10">{weddingConfig.event.venueAddress}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {weddingConfig.event.schedule.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-display text-2xl text-[var(--color-maroon)]">{item.time}</span>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-brown)]/70 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <AddToCalendar />
      </motion.div>
    </section>
  )
}
