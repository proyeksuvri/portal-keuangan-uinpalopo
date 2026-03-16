import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ganti 'portal-keuangan' dengan nama repo GitHub Anda jika deploy ke GitHub Pages.
// Contoh: jika repo adalah https://github.com/username/portal-keuangan
// maka base = '/portal-keuangan/'
//
// Jika deploy ke domain kustom (misal Netlify/Vercel), set base = '/'

export default defineConfig({
  plugins: [react()],
  base: '/portal-keuangan/',
})
