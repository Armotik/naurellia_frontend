<script setup>
import { RouterView, useRouter } from 'vue-router'
import { activityLogger } from '@/services/activityLogger' // 1. On importe notre logger
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const router = useRouter()

router.afterEach((to, from) => {
  // Pour la toute première navigation de l'application, l'objet "from" est une route "vide"
  // qui n'a pas de "matched" components. C'est le moyen le plus sûr de détecter le chargement initial.
  if (from.matched.length === 0) {
    // C'est le chargement initial
    activityLogger.log(
      'INFO',
      `Initial page loaded: ${to.fullPath}`, // On utilise "to", la route de destination
      {
        path: to.path,
        name: to.name,
        params: to.params,
        query: to.query,
      }
    )
  } else {
    // C'est une navigation normale d'une page à une autre
    activityLogger.log(
      'INFO',
      `Mapsd from ${from.path} to ${to.path}`,
      {
        to: { path: to.path, name: to.name },
        from: { path: from.path, name: from.name },
      }
    )
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans flex flex-col dark:bg-black">
    <Navbar />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
