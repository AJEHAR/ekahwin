# 📋 Panduan Setup RSVP → Google Sheets (+ Papar Ucapan di Website)

Borang RSVP dalam website ni hantar data terus ke Google Sheets awak
melalui "Google Apps Script" — dan ucapan yang tetamu tulis akan
**dipaparkan semula di website** (section "Doa & Ucapan"). Ikut langkah
ni (~20 minit, sekali sahaja):

---

## Langkah 1 — Buat Google Sheet baru

1. Pergi ke **sheets.google.com** → **Blank** (buat spreadsheet kosong)
2. Namakan (contoh: "RSVP Kad Kahwin Azhar Syifa")
3. Di baris pertama (row 1), taip nama lajur ni (satu per sel, A1 hingga E1):
   ```
   Masa | Nama | Kehadiran | Status | Ucapan
   ```

## Langkah 2 — Buka Apps Script

1. Dalam Google Sheet tu, klik menu **Extensions** (atau "Sambungan") → **Apps Script**
2. Ia akan buka tab baru dengan editor kod kosong

## Langkah 3 — Copy-paste kod ni

Padam semua kod default (`function myFunction() {}`) dalam editor tu, **ganti** dengan kod ni:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

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
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();

  // Baris pertama (row 1) ialah header — langkau
  var result = [];
  for (var i = 1; i < rows.length; i++) {
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

## Langkah 4 — Deploy sebagai "Web app"

1. Klik butang **Deploy** (biru, penjuru atas kanan) → **New deployment**
2. Klik ikon gear ⚙️ sebelah "Select type" → pilih **Web app**
3. Isi:
   - **Description**: "RSVP Kad Kahwin" (apa-apa nama)
   - **Execute as**: **Me** (akaun awak)
   - **Who has access**: **Anyone** ⚠️ PENTING — kena "Anyone", bukan "Only myself", supaya website boleh hantar & baca data
4. Klik **Deploy**
5. Google akan minta awak **"Authorize access"** — klik, pilih akaun Google awak, mungkin ada amaran "Google hasn't verified this app" → klik **Advanced** → **Go to [nama project] (unsafe)** → **Allow**
   (Ni normal untuk script peribadi awak sendiri, bukan isu keselamatan sebenar)
6. Selepas deploy berjaya, awak akan dapat **URL** macam ni:
   ```
   https://script.google.com/macros/s/AKfycb.................../exec
   ```
   **Copy URL ni sepenuhnya.**

## Langkah 5 — Letak URL dalam kod website

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

## Langkah 6 — Push & Test

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
- Semak: buka URL Apps Script awak terus dalam browser dengan tambah `?action=list` di hujung (contoh: `https://script.google.com/macros/s/xxx/exec?action=list`) — patut papar senarai JSON. Kalau ini pun tak jalan, semak semula deployment settings (Langkah 4)
- Pastikan `doGet` function tu wujud dalam Apps Script (Langkah 3) — kalau awak cuma copy `doPost` sahaja, baca-balik takkan berfungsi

**Nak edit kod Apps Script lepas ni** (contoh tambah lajur):
- Buka balik Apps Script editor (Extensions → Apps Script dalam Sheet tu)
- Ubah kod, Save
- **PENTING:** Kena buat **"New deployment"** semula (bukan edit deployment lama) — atau guna "Manage deployments" → edit → naikkan version — kalau tidak, perubahan kod TAK akan applied ke URL sedia ada

**Nak lihat submission masuk secara live:**
- Buka Google Sheet tu dalam tab berasingan semasa awak test — row baru muncul dalam saat
