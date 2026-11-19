import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages project site: https://aybc2025.github.io/whitecaps/
export const BASE = '/whitecaps/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icons/favicon-32.png', 'icons/apple-touch-icon.png'],
      manifest: {
        id: `${BASE}app`,
        name: 'ונקובר וייטקאפס',
        short_name: 'וייטקאפס',
        description: 'ספירה לאחור למשחקי הפלייאוף של הוויטקאפס',
        lang: 'he',
        dir: 'rtl',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#13305A',
        background_color: '#13305A',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        cacheId: 'whitecaps',
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,woff2,png,svg}'],
        navigateFallback: `${BASE}index.html`,
        runtimeCaching: [
          {
            // Daily content is data written by the scheduled task: network first.
            urlPattern: ({ url }) => url.pathname.startsWith(`${BASE}content/`),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'whitecaps-content',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 10 },
            },
          },
        ],
      },
    }),
  ],
})
