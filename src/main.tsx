import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// PENTING: Service Worker (offline-cache) SENGAJA tidak didaftarkan lagi.
// Keputusan projek: tiada custom caching — setiap load terus ke server,
// elak sepenuhnya risiko fail "tersekat" versi lama dalam cache.
//
// Untuk peranti yang PERNAH melawat laman ni semasa Service Worker lama
// masih aktif: browser akan check kemas kini secara automatik (built-in
// behaviour, tak perlu kod ni panggil register() lagi), jumpa versi
// self-destruct dalam public/sw.js, install, bersihkan semua cache lama,
// dan unregister dirinya sendiri. Lepas satu kitaran tu, peranti tu pun
// kembali beroperasi tanpa Service Worker macam pelawat baru.
