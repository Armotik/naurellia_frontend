import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({

  base: '/',

  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    // Configuration de la compression Gzip
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Taille minimale pour la compression (10ko)
      deleteOriginFile: false, // Conserve le fichier d'origine
      compressionOptions: { level: 9 }, // Niveau de compression maximum
    }),
    // Configuration de la compression Brotli
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // Taille minimale pour la compression (10ko)
      deleteOriginFile: false, // Conserve le fichier d'origine
      compressionOptions: { level: 11 }, // Niveau de compression maximum pour Brotli
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Activer les optimisations minify pour terser qui incluent le tree-shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        // Suppression des dead code
        dead_code: true,
        // Suppression des variables inutilisées
        unused: true,
        // Suppression des fonctions inutilisées
        drop_console: process.env.NODE_ENV === 'production',
      }
    },
    // Générer des rapports de bundle pour analyser la taille
    reportCompressedSize: true,
    // Diviser les chunks pour un meilleur caching et chargement
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // Remplacer le chunk 'ui-vendor' complet par uniquement le skeleton loader
          'vuetify-skeleton': ['vuetify/components/VSkeletonLoader']
        }
      }
    },
    // Assetsınfofilter pour éviter de générer des métadonnées inutiles pour les petits fichiers
    assetsInlineLimit: 4096, // 4kb
  }
})
