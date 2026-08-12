import { useState } from "react"
import { motion } from "framer-motion"
import { weddingConfig } from "../data/weddingConfig"
import { DividerMark } from "./Botanical"
import FloralCorner from "./FloralCorner"
import SectionPattern from "./SectionPattern"
import TextVeil from "./TextVeil"
import { useGuestName } from "../utils/guestName"

type Status = "idle" | "submitting" | "success" | "error"

export default function RSVP({ onSubmitted }: { onSubmitted?: () => void }) {
  const guestName = useGuestName()
  const [nama, setNama] = useState(guestName ?? "")
  const [kehadiran, setKehadiran] = useState(1)
  const [hadir, setHadir] = useState<"Hadir" | "Tidak Hadir">("Hadir")
  const [ucapan, setUcapan] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const notConfigured = weddingConfig.rsvp.scriptUrl.startsWith("GANTI_")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nama.trim()) return

    setStatus("submitting")
    try {
      // mode:no-cors sengaja digunakan — Google Apps Script Web App tidak
      // hantar header CORS lengkap secara default untuk POST. Ini bermakna
      // kita tidak boleh baca respons balik, tapi penghantaran data tetap
      // berjaya selagi fetch tidak throw error rangkaian.
      await fetch(weddingConfig.rsvp.scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          masa: new Date().toLocaleString("ms-MY"),
          nama: nama.trim(),
          kehadiran,
          status: hadir,
          ucapan: ucapan.trim(),
        }),
      })
      setStatus("success")
      onSubmitted?.()
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="rsvp" className="py-28 sm:py-32 px-6 relative overflow-hidden">
      <SectionPattern variant="blush" opacity={0.06} />
      <FloralCorner corner="top-left" size={380} opacity={0.8} variant="peony" />
      <FloralCorner corner="bottom-right" size={380} opacity={0.8} variant="burgundy" />
      <TextVeil />

      <div className="relative z-10 max-w-md mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-brown)] mb-3">Sahkan Kehadiran</h2>
        <DividerMark className="w-32 mx-auto mb-10" />

        {notConfigured && (
          <p className="text-xs text-[var(--color-maroon)] bg-[var(--color-champagne)]/60 rounded-xl px-4 py-3 mb-6">
            ⚠️ RSVP belum disambung ke Google Sheets — tukar <code>scriptUrl</code> dalam{" "}
            <code>weddingConfig.ts</code> (rujuk RSVP_SETUP.md).
          </p>
        )}

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card px-6 py-10"
          >
            <p className="font-display text-2xl text-[var(--color-maroon)] mb-2">Terima Kasih!</p>
            <p className="font-heading italic text-[var(--color-brown)]">
              RSVP awak telah direkodkan. Kami tak sabar nak jumpa awak!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card px-6 py-8 sm:px-8 text-left space-y-5">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] mb-2">
                Nama
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] font-body text-sm text-[var(--color-brown)] focus:outline-none focus:border-[var(--color-maroon)]"
                placeholder="Nama penuh"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] mb-2">
                Kehadiran
              </label>
              <div className="flex gap-2">
                {(["Hadir", "Tidak Hadir"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHadir(opt)}
                    className={`active:scale-95 transition flex-1 py-2.5 rounded-xl text-sm font-body border ${
                      hadir === opt
                        ? "bg-[var(--color-maroon)] text-[var(--color-ivory)] border-[var(--color-maroon)]"
                        : "border-[var(--color-gold)]/30 text-[var(--color-brown)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {hadir === "Hadir" && (
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] mb-2">
                  Bilangan Kehadiran
                </label>
                <select
                  value={kehadiran}
                  onChange={(e) => setKehadiran(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] font-body text-sm text-[var(--color-brown)] focus:outline-none focus:border-[var(--color-maroon)]"
                >
                  {weddingConfig.rsvp.attendanceOptions.map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] mb-2">
                Ucapan (opsyenal, akan dipaparkan di website)
              </label>
              <textarea
                value={ucapan}
                onChange={(e) => setUcapan(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] font-body text-sm text-[var(--color-brown)] focus:outline-none focus:border-[var(--color-maroon)] resize-none"
                placeholder="Doa & ucapan untuk pengantin..."
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-red-700 bg-red-50 rounded-lg px-3 py-2">
                Maaf, penghantaran gagal. Sila cuba lagi atau hubungi kami terus.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting" || notConfigured}
              className="active:scale-95 transition-transform w-full py-3.5 rounded-full bg-[var(--color-maroon)] text-[var(--color-ivory)] text-sm tracking-[0.1em] uppercase font-body disabled:opacity-50 min-h-[48px]"
            >
              {status === "submitting" ? "Menghantar..." : "Hantar RSVP"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
