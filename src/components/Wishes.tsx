import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import { DividerMark } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"

type Wish = {
  nama: string
  status: string
  ucapan: string
}

/**
 * Papar ucapan/wish yang dihantar tetamu (dari RSVP), diambil dari Google
 * Sheets yang sama melalui Apps Script (fungsi doGet — rujuk RSVP_SETUP.md).
 *
 * NOTA TEKNIKAL: berbeza dari penghantaran (POST, guna mode:no-cors), untuk
 * BACA balik data (GET) kita perlukan respons yang boleh dibaca — jadi guna
 * fetch biasa (mode:cors, default). Kebanyakan deployment Apps Script
 * "Anyone" access membenarkan ini, tapi jika ada isu CORS di sesetengah
 * kes, section ni akan senyap hilang (graceful fail) — tak papar error.
 *
 * refreshTrigger: tukar nilai ni (contoh naikkan counter) untuk paksa
 * fetch semula — dipakai lepas RSVP berjaya dihantar supaya ucapan baru
 * terus muncul tanpa tetamu perlu refresh manual.
 */
export default function Wishes({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loadFailed, setLoadFailed] = useState(false)

  const notConfigured = weddingConfig.rsvp.scriptUrl.startsWith("GANTI_")

  useEffect(() => {
    if (notConfigured) return

    let cancelled = false
    fetch(`${weddingConfig.rsvp.scriptUrl}?action=list`)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed")
        return res.json()
      })
      .then((data: Wish[]) => {
        if (cancelled) return
        // Papar yang ada ucapan sahaja, terbaru dahulu
        const withMessage = data.filter((w) => w.ucapan && w.ucapan.trim().length > 0).reverse()
        setWishes(withMessage)
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [notConfigured, refreshTrigger])

  // Sembunyi terus jika belum setup, gagal load, atau tiada ucapan lagi
  if (notConfigured || loadFailed || wishes.length === 0) return null

  return (
    <section className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="peony" opacity={0.06} />
      <FloralCorner corner="top-right" size={360} opacity={0.75} variant="blush" />
      <FloralCorner corner="bottom-left" size={360} opacity={0.75} variant="peony" />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-brown)] mb-3">Doa & Ucapan</h2>
        <DividerMark className="w-32 mx-auto mb-10" />

        <div className="space-y-4 text-left max-h-[420px] overflow-y-auto pr-1">
          {wishes.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="glass-card px-5 py-4"
            >
              <p className="font-heading text-sm text-[var(--color-brown)] leading-relaxed mb-2">"{w.ucapan}"</p>
              <p className="font-body text-xs text-[var(--color-gold)] tracking-wide">
                — {w.nama}
                {w.status === "Hadir" ? " 💐" : ""}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
