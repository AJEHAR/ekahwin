import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import { DividerMark, WatercolorWash } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"

function getTimeLeft(targetIso: string) {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 sm:w-20 h-20 sm:h-24 rounded-2xl glass-card flex items-center justify-center overflow-hidden shadow-[0_8px_24px_rgba(106,46,57,0.12)]">
        <motion.span
          key={value}
          initial={reduceMotion ? false : { y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="font-display text-3xl sm:text-4xl text-[var(--color-maroon)]"
        >
          {pad(value)}
        </motion.span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--color-gold)] opacity-30" />
      </div>
      <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[var(--color-brown)]/70">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(() => getTimeLeft(weddingConfig.event.date))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Hentikan interval bila section tak nampak dalam viewport (jimat bateri
    // bila tetamu scroll jauh dari countdown, tab masih terbuka lama).
    let intervalId: ReturnType<typeof setInterval> | null = null

    const startTicking = () => {
      if (intervalId) return
      setTime(getTimeLeft(weddingConfig.event.date))
      intervalId = setInterval(() => setTime(getTimeLeft(weddingConfig.event.date)), 1000)
    }
    const stopTicking = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startTicking()
        else stopTicking()
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      stopTicking()
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[550px]"
    >
      <WatercolorWash className="absolute -bottom-56 -left-56 w-[500px] h-[500px] opacity-50 pointer-events-none" />
      <SectionPattern variant="peony" opacity={0.06} />
      <FloralCorner corner="top-right" size={380} opacity={0.8} variant="peony" />
      <FloralCorner corner="bottom-left" size={380} opacity={0.8} variant="burgundy" />
      <TextVeil />
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-heading italic text-[var(--color-maroon)] text-lg tracking-wide">Menghitung hari ke arah</p>
        <h2 className="font-display text-3xl sm:text-4xl mt-2 mb-6 text-[var(--color-brown)]">Hari Bahagia Kami</h2>
        <DividerMark className="w-32 mb-10" />
        <div className="flex gap-3 sm:gap-6">
          <FlipUnit value={time.days} label="Hari" />
          <FlipUnit value={time.hours} label="Jam" />
          <FlipUnit value={time.minutes} label="Minit" />
          <FlipUnit value={time.seconds} label="Saat" />
        </div>
      </div>
    </section>
  )
}
