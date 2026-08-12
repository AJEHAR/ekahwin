// ─────────────────────────────────────────────────────────
// SATU TEMPAT UNTUK UBAH SEMUA MAKLUMAT KAD JEMPUTAN
// Tukar nilai di bawah sahaja — tak perlu sentuh komponen lain.
// ─────────────────────────────────────────────────────────

export const weddingConfig = {
  couple: {
    groomShort: "Azhar",
    brideShort: "Syifa",
    groomFull: "Azharuddin Haniff",
    brideFull: "Nurus Syifa",
    monogram: "A ♡ S",
  },

  parents: {
    groom: {
      father: "Mohd Lowhim Bin Sapingi",
      mother: "Salmiah Binti Md Arof",
    },
    bride: {
      father: "Nama Bapa Pengantin Perempuan",
      mother: "Nama Ibu Pengantin Perempuan",
    },
  },

  event: {
    eventName: "Majlis Walimatul Urus",
    date: "2026-09-05T11:00:00+08:00", // ISO — dipakai oleh countdown
    dateDisplay: "05 SEPTEMBER 2026",
    venueName: "Lorong 6/5, Jalan Sungai Gulang-Gulang",
    venueAddress: "45500 Kuala Selangor, Selangor",
    // Tukar lat/lng ini ke lokasi sebenar untuk embed map yang tepat
    mapQuery: "Lorong 6/5, Jalan Sungai Gulang-Gulang, 45500 Kuala Selangor",
    googleMapsUrl: "https://maps.google.com/?q=Lorong+6/5+Jalan+Sungai+Gulang-Gulang+45500+Kuala+Selangor",
    wazeUrl: "https://waze.com/ul?q=Lorong%206/5%20Jalan%20Sungai%20Gulang-Gulang%2045500%20Kuala%20Selangor",
    schedule: [
      { time: "11.00 pagi", label: "Jamuan" },
      { time: "12.00 tengah hari", label: "Ketibaan Pengantin" },
      { time: "12.30 petang", label: "Bersanding" },
    ],
  },

  quran: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation:
      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    surah: "Surah Ar-Rum : 21",
  },

  gift: {
    // Letak gambar QR DuitNow di /public/images/duitnow-qr.png
    qrImage: "/images/duitnow-qr.png",
    note: "QR DuitNow untuk hadiah pernikahan",
  },

  // Muzik latar — letak fail di /public/music/song.mp3
  // Jika tiada, butang muzik tidak akan dipaparkan langsung (auto-hide).
  music: {
    src: "/music/song.mp3",
    title: "", // opsyenal — nama lagu, papar bila hover (kosongkan jika tak nak)
  },

  // RSVP — hantar data ke Google Sheets melalui Google Apps Script.
  // GANTI scriptUrl di bawah dengan URL "Web app" awak selepas deploy
  // Apps Script (rujuk panduan RSVP_SETUP.md dalam projek ni).
  rsvp: {
    scriptUrl: "GANTI_DENGAN_URL_APPS_SCRIPT_ANDA",
    attendanceOptions: [1, 2, 3, 4],
  },

  contacts: [
    { label: "Pengantin Lelaki", phone: "60136903995" },
    { label: "Bapa Pengantin", phone: "60193940268" },
    { label: "Ibu Pengantin", phone: "60196025684" },
  ],

  salam: {
    heading: "Assalamualaikum W.B.T",
    body:
      "Dengan penuh kesyukuran ke hadrat Allah SWT, kami menjemput YBhg Dato'/Datin/Tuan/Puan/Encik/Cik menghadiri Majlis Walimatul Urus anakanda kami.",
  },

  // Gambar — letak fail sebenar di /public/images/. Placeholder dipakai jika tiada.
  images: {
    couple: "/images/couple.jpg",
    groomFather: "/images/father.jpg",
    groomMother: "/images/mother.jpg",
    heroBackground: "/images/hero-bg.jpg",
    // Logo/monogram sendiri untuk splash screen (contoh: A & S logo custom).
    // Jika tiada, design bulatan "A ♡ S" asal akan dipaparkan.
    monogramLogo: "/images/monogram.png",
    // Gambar latar untuk splash screen SAHAJA (pembukaan jemputan).
    // Jika tiada, latar ivory + watercolor asal akan dipaparkan.
    splashBackground: "/images/splash-bg.jpg",
  },

  footer: {
    thankYouTitle: "Terima Kasih",
    thankYouBody: "Terima kasih atas doa dan kehadiran anda.",
  },
}

export type WeddingConfig = typeof weddingConfig
