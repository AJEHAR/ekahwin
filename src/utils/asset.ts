/**
 * Vite hanya auto-betulkan path gambar dalam index.html (link/meta tags) dengan
 * base path (sekarang "/" sebab guna custom domain). Path gambar yang di-render
 * secara runtime oleh React (dari weddingConfig.ts, FloralCorner, dsb) TIDAK
 * auto-betul — sebab itu guna fungsi ni untuk setiap <img src> yang datang
 * dari string path biasa.
 *
 * Guna: asset("/images/couple.jpg") -> "/images/couple.jpg" (base="/")
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/"
  return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "")
}
