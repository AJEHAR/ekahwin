import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import PhotoFrame from "./PhotoFrame"
import { DividerMark } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"

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

export default function Parents() {
  return (
    <section className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="peony" opacity={0.06} />
      <FloralCorner corner="top-left" size={400} opacity={0.8} variant="peony" />
      <FloralCorner corner="bottom-right" size={400} opacity={0.8} variant="burgundy" />
      <TextVeil />
      <div className="max-w-xl mx-auto text-center relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-brown)] mb-3">Ibu Bapa</h2>
        <DividerMark className="w-32 mx-auto mb-16" />

        <div className="flex items-start justify-center gap-8 sm:gap-14">
          <ParentPhoto image={weddingConfig.images.groomFather} name={weddingConfig.parents.groom.father} />
          <span className="text-[var(--color-gold)] text-2xl mt-14">♡</span>
          <ParentPhoto image={weddingConfig.images.groomMother} name={weddingConfig.parents.groom.mother} />
        </div>
      </div>
    </section>
  )
}
