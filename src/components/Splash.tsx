import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import { WatercolorWash } from "./Botanical"
import { asset } from "../utils/asset"

export default function Splash({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  // Auto-detect: kalau logo/gambar sendiri diupload, guna terus.
  // Jika tiada (fail 404), fallback ke design asal secara automatik.
  const [hasCustomLogo, setHasCustomLogo] = useState(true)
  const [hasCustomBg, setHasCustomBg] = useState(true)

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ivory)] px-6 overflow-hidden"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Gambar latar sendiri (pembukaan jemputan sahaja) — jika tiada, fallback ke watercolor wash */}
          {hasCustomBg && (
            <>
              <img
                src={asset(weddingConfig.images.splashBackground)}
                alt=""
                aria-hidden="true"
                onError={() => setHasCustomBg(false)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[var(--color-ivory)]/55" />
            </>
          )}
          {!hasCustomBg && <WatercolorWash className="absolute inset-0 w-full h-full opacity-80" />}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            {/* Logo/monogram sendiri — jika tiada, fallback ke design bulatan "A ♡ S" asal */}
            {hasCustomLogo ? (
              <motion.img
                src={asset(weddingConfig.images.monogramLogo)}
                alt={`${weddingConfig.couple.groomFull} & ${weddingConfig.couple.brideFull} logo`}
                onError={() => setHasCustomLogo(false)}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain mb-8"
              />
            ) : (
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[var(--color-gold)] flex items-center justify-center mb-8 relative"
              >
                <div className="absolute inset-2 rounded-full border border-[var(--color-gold)] opacity-50" />
                <span className="font-display text-2xl sm:text-3xl text-[var(--color-maroon)]">
                  {weddingConfig.couple.monogram}
                </span>
              </motion.div>
            )}

            <p className="font-heading italic text-[var(--color-maroon)] tracking-[0.15em] uppercase text-xs sm:text-sm mb-3">
              {weddingConfig.event.eventName}
            </p>

            <h1 className="font-script leading-[1.2] text-5xl sm:text-6xl text-[var(--color-maroon)] mb-2 text-balance">
              {weddingConfig.couple.groomShort}
              <span className="text-[var(--color-gold)] mx-3 font-body align-middle text-2xl">♡</span>
              {weddingConfig.couple.brideShort}
            </h1>

            <p className="font-body text-sm tracking-[0.2em] text-[var(--color-brown)]/70 mb-10">
              {weddingConfig.event.dateDisplay}
            </p>

            <motion.button
              onClick={onOpen}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              className="font-body text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full bg-[var(--color-maroon)] text-[var(--color-ivory)] shadow-[0_10px_30px_rgba(106,46,57,0.25)]"
            >
              Buka Jemputan
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
