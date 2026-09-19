import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Milano 2026 — spørgeskema-PWA for turen til Milano, september 2026.
// Relative base + hash router, så den kan serveres fra enhver sub-path
// (Static Web Apps, GitHub Pages, en NAS, …). Samme opskrift som My Piemonte.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png,jpg,jpeg,webp,woff2}'],
      },
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Milano 2026',
        short_name: 'Milano 2026',
        description:
          'Det officielle spørgeskema for turen til Milano, september 2026. Alle svar er frivilligt positive.',
        theme_color: '#0d1526',
        background_color: '#0d1526',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
