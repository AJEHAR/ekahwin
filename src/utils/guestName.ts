/**
 * Baca nama tetamu dari URL (contoh: ?kepada=Ahmad) untuk personalisasi
 * ringan tanpa perlu backend/database. Awak boleh hantar link berbeza
 * kepada setiap tetamu, contoh:
 *
 *   https://kadkahwin.syazr.com/?kepada=Ahmad%20Bin%20Ali
 *
 * Website akan terus papar "Kepada: Ahmad Bin Ali" secara automatik.
 * Kalau parameter tiada, function ni pulangkan null (fallback senyap,
 * papar salam biasa tanpa nama).
 */
export function useGuestName(): string | null {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.search)
  const name = params.get("kepada")
  return name && name.trim() ? name.trim() : null
}
