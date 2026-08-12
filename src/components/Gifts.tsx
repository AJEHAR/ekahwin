import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import PhotoFrame from "./PhotoFrame"
import { DividerMark } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"

const STORAGE_KEY = "gift-qr-visible"

function QrToggle({ visible, onChange }: { visible: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <span className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-brown)]/70">
        {visible ? "Sorokkan QR" : "Tunjukkan QR"}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={visible}
        onClick={() => onChange(!visible)}
        className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
          visible ? "bg-[var(--color-maroon)]" : "bg-[var(--color-champagne)]"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-[var(--color-ivory)] shadow-md"
          style={{ x: visible ? 20 : 0 }}
        />
      </button>
    </label>
  )
}

export default function Gifts() {
  if (!weddingConfig.gift.enabled) return null

  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === null ? false : saved === "1"
  })

  const handleChange = (v: boolean) => {
    setVisible(v)
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0")
    } catch {
      // localStorage tak tersedia (mode private/incognito strict) — abaikan sahaja
    }
  }

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
        <DividerMark className="w-32 mx-auto mb-8" />

        <div className="mb-6">
          <QrToggle visible={visible} onChange={handleChange} />
        </div>

        <AnimatePresence initial={false}>
          {visible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
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
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
