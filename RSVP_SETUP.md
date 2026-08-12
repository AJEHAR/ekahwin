# 📋 Panduan Setup RSVP → Google Sheets (+ Papar Ucapan di Website)

Borang RSVP dalam website ni hantar data terus ke Google Sheets awak
melalui "Google Apps Script" — dan ucapan yang tetamu tulis akan
**dipaparkan semula di website** (section "Doa & Ucapan"). Ikut langkah
ni (~15 minit, sekali sahaja):

---

## Langkah 1 — Buat Google Sheet kosong

1. Pergi ke **sheets.google.com** → **Blank** (buat spreadsheet kosong)
2. Namakan (contoh: "RSVP Kad Kahwin Azhar Syifa")
3. **Tak perlu taip apa-apa lagi** — struktur lajur akan dibina automatik oleh script di Langkah 3.

## Langkah 2 — Buka Apps Script

1. Dalam Google Sheet tu, klik menu **Extensions** (atau "Sambungan") → **Apps Script**
2. Ia akan buka tab baru dengan editor kod kosong

## Langkah 3 — Copy-paste kod PENUH ni

Padam semua kod default (`function myFunction() {}`) dalam editor tu, **ganti** dengan kod PENUH ni (copy semua sekali gus):

```javascript
// ============================================
// RSVP Kad Kahwin — Google Apps Script
// Copy SEMUA kod ni, paste terus dalam Apps Script editor
// ============================================

const HEADERS = ["Masa", "Nama", "Kehadiran", "Status", "Ucapan"];

// Jalankan fungsi ni SEKALI SAHAJA (klik "Run" di atas editor ni) untuk
// auto-bina struktur lajur dalam Google Sheet — tak perlu taip manual.
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.appendRow(HEADERS);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

// "Safety net" — kalau headers tak wujud lagi (contoh row 1 accidentally
// terpadam nanti), auto-bina balik sendiri. doPost & doGet panggil ni dulu.
function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders_(sheet);
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.masa,
    data.nama,
    data.kehadiran,
    data.status,
    data.ucapan
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders_(sheet);
  const rows = sheet.getDataRange().getValues();

  const result = [];
  for (let i = 1; i < rows.length; i++) {
    result.push({
      nama: rows[i][1],
      kehadiran: rows[i][2],
      status: rows[i][3],
      ucapan: rows[i][4]
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Klik ikon **Save** (disket) di atas, atau tekan `Ctrl+S`.

## Langkah 4 — Run `setupSheet` (bina struktur lajur)

1. Di atas editor, ada dropdown kecil (biasanya tertulis nama fungsi) — pilih **`setupSheet`**
2. Klik butang **▷ Run** (sebelah dropdown tu)
3. Google akan minta **"Authorize access"** kali pertama — klik, pilih akaun Google awak, mungkin ada amaran "Google hasn't verified this app" → klik **Advanced** → **Go to [nama project] (unsafe)** → **Allow**
   (Ni normal untuk script peribadi awak sendiri, bukan isu keselamatan sebenar)
4. Selepas run berjaya (tanda ✅ hijau bawah), **buka balik Google Sheet** tu — patut nampak row header dah terbina automatik (Masa, Nama, Kehadiran, Status, Ucapan, **bold**)

## Langkah 5 — Deploy sebagai "Web app"

1. Balik ke Apps Script editor, klik butang **Deploy** (biru, penjuru atas kanan) → **New deployment**
2. Klik ikon gear ⚙️ sebelah "Select type" → pilih **Web app**
3. Isi:
   - **Description**: "RSVP Kad Kahwin" (apa-apa nama)
   - **Execute as**: **Me** (akaun awak)
   - **Who has access**: **Anyone** ⚠️ PENTING — kena "Anyone", bukan "Only myself", supaya website boleh hantar & baca data
4. Klik **Deploy**
5. Awak akan dapat **URL** macam ni:
   ```
   https://script.google.com/macros/s/AKfycb.................../exec
   ```
   **Copy URL ni sepenuhnya.**

## Langkah 6 — Letak URL dalam kod website

1. Buka fail `src/data/weddingConfig.ts` dalam projek
2. Cari baris:
   ```ts
   rsvp: {
     scriptUrl: "GANTI_DENGAN_URL_APPS_SCRIPT_ANDA",
   ```
3. Ganti dengan URL yang awak copy tadi:
   ```ts
   rsvp: {
     scriptUrl: "https://script.google.com/macros/s/AKfycb.................../exec",
   ```
4. Save fail tu

## Langkah 7 — Push & Test

1. Commit & push macam biasa (git add, commit, push / GitHub Desktop)
2. Buka website, pergi section "Sahkan Kehadiran", isi borang (dengan ucapan), hantar
3. Buka balik Google Sheet awak — patut nampak **row baru** masuk automatik!
4. Scroll bawah sikit di website — section **"Doa & Ucapan"** patut muncul dengan ucapan awak tadi

---

## 🔧 Troubleshooting

**"Penghantaran gagal" bila submit RSVP:**
- Semak "Who has access" dalam deployment settings — WAJIB "Anyone"
- Semak URL dalam `weddingConfig.ts` tersalin **penuh** (sampai `/exec` di hujung)

**Section "Doa & Ucapan" tak muncul langsung** (walaupun dah ada ucapan dalam Sheet):
- Ini section direka untuk **senyap hilang** kalau ada masalah baca data (contoh isu CORS/network) — tak papar error yang mengganggu
- Semak: buka URL Apps Script awak terus dalam browser dengan tambah `?action=list` di hujung (contoh: `https://script.google.com/macros/s/xxx/exec?action=list`) — patut papar senarai JSON. Kalau ini pun tak jalan, semak semula deployment settings (Langkah 5)

**Terlupa run `setupSheet`, terus deploy je:**
- Tak mengapa — `doPost`/`doGet` ada "safety net" (`ensureHeaders_`) yang auto-bina headers sendiri bila pertama kali data masuk

**Nak edit kod Apps Script lepas ni** (contoh tambah lajur):
- Buka balik Apps Script editor (Extensions → Apps Script dalam Sheet tu)
- Ubah kod, Save
- **PENTING:** Kena buat **"New deployment"** semula (bukan edit deployment lama) — atau guna "Manage deployments" → edit → naikkan version — kalau tidak, perubahan kod TAK akan applied ke URL sedia ada

**Nak lihat submission masuk secara live:**
- Buka Google Sheet tu dalam tab berasingan semasa awak test — row baru muncul dalam saat
