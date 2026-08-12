import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.6 6.32A8.86 8.86 0 0 0 3.16 16.87L2 21l4.24-1.11a8.85 8.85 0 0 0 4.23 1.08h.01a8.86 8.86 0 0 0 7.12-14.65Zm-6.12 13.6a7.36 7.36 0 0 1-3.75-1.03l-.27-.16-2.5.66.67-2.44-.18-.25a7.36 7.36 0 1 1 6.03 3.22Zm4.03-5.52c-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05a6.03 6.03 0 0 1-1.77-1.1 6.64 6.64 0 0 1-1.22-1.52c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.4.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.4-.06-.11-.5-1.21-.69-1.66-.18-.43-.36-.37-.5-.38h-.43a.82.82 0 0 0-.6.28c-.2.22-.79.77-.79 1.87s.81 2.17.92 2.32c.11.15 1.6 2.44 3.87 3.42.54.23.96.37 1.29.48.54.17 1.03.15 1.42.09.43-.06 1.3-.53 1.49-1.05.18-.51.18-.94.13-1.03-.05-.1-.2-.15-.42-.26Z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="peony" opacity={0.06} />
      <FloralCorner corner="top-left" size={380} opacity={0.8} variant="peony" />
      <FloralCorner corner="bottom-right" size={380} opacity={0.8} variant="burgundy" />
      <TextVeil />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-brown)] mb-3">Hubungi Kami</h2>
        <p className="font-body text-sm text-[var(--color-brown)]/70 mb-12">
          Ada pertanyaan? Sila hubungi kami melalui WhatsApp
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {weddingConfig.contacts.map((c, i) => (
            <motion.a
              key={c.phone}
              href={`https://wa.me/${c.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card px-5 py-8 flex flex-col items-center gap-3"
            >
              <div className="w-11 h-11 rounded-full bg-[var(--color-maroon)] text-[var(--color-ivory)] flex items-center justify-center">
                <WhatsAppIcon />
              </div>
              <span className="font-body text-sm text-[var(--color-brown)]">{c.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
