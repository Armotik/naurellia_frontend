import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// On transforme l'objet en une fonction pour accéder à la commande (dev vs. build)
export default defineConfig(({ command }) => {

  // On définit une URL de base différente pour le build de production
  const base = command === 'build'
    // En production, on préfixe avec l'URL du site qui sera servie par le CDN
    ? 'https://www.naurellia.com/' // <--- ACTION REQUISE ICI
    // En développement, on garde le chemin relatif par défaut
    : '/';

  return {
    // On ajoute la propriété "base" à la configuration retournée
    base: base,

    // Le reste de votre configuration est conservé à l'identique
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
