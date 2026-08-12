import { motion, type Variants } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import PhotoFrame from "./PhotoFrame"
import { DividerMark, WatercolorWash } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

export default function HeroCouple() {
  return (
    <section id="couple" className="relative pt-28 pb-24 px-6 overflow-hidden">
      <WatercolorWash className="absolute -top-40 -right-40 w-[600px] h-[600px] opacity-60 pointer-events-none" />
      <SectionPattern variant="burgundy" opacity={0.06} />
      <FloralCorner corner="top-left" size={460} opacity={0.85} variant="burgundy" />
      <FloralCorner corner="bottom-right" size={460} opacity={0.85} variant="peony" />
      <TextVeil />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        <motion.p variants={fadeUp} className="font-heading italic text-[var(--color-maroon)] tracking-[0.15em] uppercase text-xs sm:text-sm mb-6">
          Together with our beloved families
        </motion.p>

        <motion.h1 variants={fadeUp} className="font-script leading-[1.15] text-[clamp(3.5rem,12vw,7rem)] text-[var(--color-maroon)] text-balance">
          {weddingConfig.couple.groomShort}
        </motion.h1>
        <motion.span variants={fadeUp} className="text-[var(--color-gold)] text-3xl my-1">♡</motion.span>
        <motion.h1 variants={fadeUp} className="font-script leading-[1.15] text-[clamp(3.5rem,12vw,7rem)] text-[var(--color-maroon)] text-balance">
          {weddingConfig.couple.brideShort}
        </motion.h1>

        <motion.div variants={fadeUp} className="relative mt-10 mb-10 flex items-center justify-center">
          <PhotoFrame
            src={weddingConfig.images.couple}
            alt={`${weddingConfig.couple.groomFull} & ${weddingConfig.couple.brideFull}`}
            shape="rounded"
            className="relative w-[260px] h-[300px] sm:w-[300px] sm:h-[360px] shadow-[0_20px_50px_rgba(106,46,57,0.18)]"
          />
        </motion.div>

        <motion.p variants={fadeUp} className="font-heading text-lg sm:text-xl text-[var(--color-brown)] tracking-wide text-balance">
          {weddingConfig.couple.groomFull}
          <span className="text-[var(--color-gold)] mx-3">♡</span>
          {weddingConfig.couple.brideFull}
        </motion.p>

        <motion.div variants={fadeUp}>
          <DividerMark className="w-36 mt-6 mb-3" />
        </motion.div>
        <motion.p variants={fadeUp} className="font-body text-xs tracking-[0.3em] uppercase text-[var(--color-brown)]/60">
          Together Forever
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-10 flex justify-center mt-16"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--color-maroon)] text-xl"
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
