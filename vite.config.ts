import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Custom domain: kadkahwin.syazr.com (serve dari akar, bukan sub-path repo)
  plugins: [react(), tailwindcss()],
})
