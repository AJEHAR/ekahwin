import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import { asset } from "../utils/asset"

/**
 * Butang muzik latar terapung. Muzik mula main SEBAIK SAHAJA tetamu tekan
 * "Buka Jemputan" — bukan true page-load autoplay (browser sentiasa block
 * itu), tapi terikat terus dengan klik tetamu tu (dikira "user gesture"
 * oleh browser, jadi dibenarkan). Loop automatik bila habis.
 *
 * Auto-hide sepenuhnya jika fail lagu belum diupload / tak wujud (404 atau
 * format tak disokong) — tak papar butang rosak/kosong.
 *
 * PENTING: status "playing" diambil terus dari event audio sebenar
 * (onPlay/onPause), bukan andaian — jadi UI sentiasa padan dengan status
 * sebenar biar apa pun jadi. Kegagalan play() yang sementara (contoh:
 * tekan butang laju-laju, atau browser tertentu masih block) TIDAK
 * sembunyikan butang — tetamu boleh cuba tekan manual, hanya kegagalan
 * SUMBER fail (404/format rosak) yang sembunyikan terus.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleSourceError = () => setAvailable(false)
    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)

    audio.addEventListener("error", handleSourceError)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handlePause)

    // Cuba mula main terus — komponen ni baru "mount" sebaik sahaja tetamu
    // tekan "Buka Jemputan", jadi masih dalam tempoh "user gesture" browser.
    // Kalau tersekat jugak (browser tertentu lebih ketat), senyap sahaja —
    // butang play/pause manual tetap ada sebagai fallback.
    audio.play().catch(() => {
      // Sengaja senyap — tetamu boleh tekan butang manual sebagai fallback.
    })

    return () => {
      audio.removeEventListener("error", handleSourceError)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handlePause)
    }
  }, [])

  if (!available) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      // .play() pulangkan Promise — kalau gagal sebab sementara (contoh
      // klik laju-laju), jangan sembunyikan butang, biar tetamu cuba lagi.
      audio.play().catch(() => {
        // Sengaja senyap — status "playing" tetap ikut event audio sebenar,
        // bukan andaian, jadi UI takkan "tersangkut" salah status.
      })
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <audio ref={audioRef} src={asset(weddingConfig.music.src)} loop preload="auto" />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? "Jeda muzik" : "Mainkan muzik"}
        title={weddingConfig.music.title || undefined}
        className="fixed top-4 right-4 z-40 w-12 h-12 rounded-full glass-card flex items-center justify-center"
      >
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-maroon)">
              <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" />
              <path d="M9 8h1.6v8H9V8Zm4.4 0H15v8h-1.6V8Z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-maroon)">
              <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" />
              <path d="M10 8.2 16 12l-6 3.8V8.2Z" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </>
  )
}
