// PENTING: Service Worker ini SENGAJA "self-destruct" — projek ni dah
// tukar keputusan untuk TIDAK guna offline-cache lagi (elak isu fail lama
// "tersekat" dalam cache, contoh bug 404 gambar yang pernah berlaku).
//
// Peranti yang dah install Service Worker LAMA akan auto-download fail ni,
// dan bila ia "activate", ia akan:
// 1. Padam semua cache yang tersimpan sebelum ni
// 2. Unregister dirinya sendiri (buang Service Worker sepenuhnya)
// Lepas ni, browser kembali guna cara normal (tiada custom cache layer),
// setiap request terus ke server macam biasa.

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()

      const clients = await self.clients.matchAll({ type: "window" })
      clients.forEach((client) => client.navigate(client.url))
    })()
  )
})
