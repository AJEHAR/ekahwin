# 💍 eWedding Card — Azhar & Syifa

Luxury Interactive Malay eWedding Card. Single-page microsite, tanpa backend/database — 100% frontend static site, sesuai untuk GitHub Pages.

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion (semua animasi)
- Tiada offline-cache (Service Worker) — setiap load terus ke server, elak isu fail versi lama tersekat dalam cache

## 🚀 Mula Guna (Local Development)

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## ✏️ Cara Ubah Kandungan

Semua teks, nama, tarikh, nombor telefon, dan path gambar ada di **SATU fail**:

```
src/data/weddingConfig.ts
```

Tukar nilai di situ sahaja — tak perlu sentuh komponen lain.

## 🖼️ Cara Letak Gambar

1. Letak fail gambar sebenar dalam folder `public/images/` dengan nama:
   - `couple.jpg` — gambar pasangan
   - `father.jpg` — gambar bapa pengantin lelaki
   - `mother.jpg` — gambar ibu pengantin lelaki
   - `duitnow-qr.png` — QR code DuitNow
   - `monogram.png` — logo/initial sendiri untuk splash screen (jika tiada, design bulatan "A ♡ S" asal dipaparkan)
   - `splash-bg.jpg` — gambar latar untuk splash screen sahaja (jika tiada, latar watercolor asal dipaparkan)
   - `og-cover.jpg` — gambar preview bila link dikongsi
2. Jika gambar belum diupload, placeholder elegan akan dipaparkan secara automatik — layout tidak akan pecah.

## 🎵 Cara Letak Muzik Latar

Letak fail lagu di `public/music/song.mp3`. Butang play/pause akan muncul
di penjuru atas kanan **selepas** jemputan dibuka (autoplay dimatikan —
tetamu kena tekan sendiri untuk main lagu). Jika fail tiada, butang tidak
akan dipaparkan langsung.

## 🌐 Deploy ke GitHub Pages (Custom Domain)

Repo: **ekahwin** · Username: **ajehar** · Domain: **kadkahwin.syazr.com**

```bash
git init
git add .
git commit -m "Initial commit - eWedding Card"
git remote add origin https://github.com/ajehar/ekahwin.git
git branch -M main
git push -u origin main
```

Selepas push:
1. Buka repo di GitHub → **Settings → Pages** → Source = **"GitHub Actions"**.
2. Dalam bahagian **"Custom domain"**, masukkan `kadkahwin.syazr.com` → Save.
   (Fail `CNAME` dalam `public/` folder sudah disediakan untuk ini — jangan padam fail tu.)
3. Pastikan DNS domain `syazr.com` ada rekod **CNAME** untuk subdomain `kadkahwin` menghala ke `ajehar.github.io` (buat di pembekal domain awak, contoh Cloudflare/Namecheap).
4. Tunggu ~1-2 minit (atau lebih lama untuk DNS propagate), semak tab **Actions** untuk status deploy.
5. Website akan hidup di: **https://kadkahwin.syazr.com/**

Untuk update lepas ni (contoh selepas tambah gambar sebenar):
```bash
git add .
git commit -m "Tambah gambar sebenar"
git push
```

## 📁 Struktur Fail Penting

```
src/
  data/weddingConfig.ts   ← Semua kandungan (nama, tarikh, contact, dll)
  components/             ← Setiap section (Splash, Hero, Parents, dst)
  index.css               ← Design tokens (warna, font)
public/
  images/                 ← Letak gambar sebenar di sini
  manifest.webmanifest    ← PWA config ("Add to Home Screen")
  sw.js                   ← Self-destruct script (buang cache lama peranti yang pernah lawat sebelum ni)
```

## 📋 Section yang Ada

Splash → Hero+Couple → Salam → Ibu Bapa → Quran Verse → Countdown → Wedding Details → Google Maps → **RSVP** (Google Sheets) → Gifts (DuitNow QR) → Contact (WhatsApp) → Footer

## 🎫 Setup RSVP

Borang RSVP hantar data ke Google Sheets — rujuk **[RSVP_SETUP.md](./RSVP_SETUP.md)** untuk panduan lengkap step-by-step (~15-20 minit, sekali sahaja).

*Nota: Wishes/Guest Book, Gallery, dan Admin Dashboard sengaja tidak disertakan kerana keputusan projek untuk kekal 100% frontend tanpa backend/database sendiri (RSVP guna Google Sheets sebagai "backend" ringan).*
