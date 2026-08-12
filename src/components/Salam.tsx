import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"
import PhotoFrame from "./PhotoFrame"
import { useGuestName } from "../utils/guestName"

function ParentPhoto({ image, name }: { image: string; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center text-center"
    >
      <PhotoFrame
        src={image}
        alt={name}
        shape="circle"
        className="w-40 h-40 sm:w-52 sm:h-52 border-2 border-[var(--color-champagne)] shadow-[0_10px_30px_rgba(106,46,57,0.12)]"
      />
      <p className="font-heading text-base sm:text-lg mt-5 text-[var(--color-brown)]">{name}</p>
    </motion.div>
  )
}

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
          className="font-display text-3xl sm:text-4xl text-[var(--color-maroon)] mb-14"
        >
          {weddingConfig.salam.heading}
        </motion.h2>

        <div className="flex items-start justify-center gap-8 sm:gap-14 mb-14">
          <ParentPhoto image={weddingConfig.images.groomFather} name={weddingConfig.parents.groom.father} />
          <span className="text-[var(--color-gold)] text-2xl mt-14">♡</span>
          <ParentPhoto image={weddingConfig.images.groomMother} name={weddingConfig.parents.groom.mother} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-lg sm:text-xl leading-relaxed text-[var(--color-brown)] text-balance"
        >
          {weddingConfig.salam.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 font-display text-lg sm:text-2xl tracking-wide text-[var(--color-maroon)] uppercase text-balance"
        >
          <p>{weddingConfig.couple.groomLegalName}</p>
          <p className="text-[var(--color-gold)] text-xl sm:text-2xl my-2 normal-case font-body">&amp;</p>
          <p>{weddingConfig.couple.brideLegalName}</p>
        </motion.div>
      </div>
    </section>
  )
}
