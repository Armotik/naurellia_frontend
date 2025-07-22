<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { activityLogger } from '@/services/activityLogger' // 1. On importe notre logger
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import JsonLdData from './components/JsonLdData.vue'
import LegalDocumentsBanner from './components/LegalDocumentsBanner.vue'
import { useBatteryStatus } from './composables/useBatteryStatus';

// Utilisation du composable pour le mode économie d'énergie
const { isBatterySaving, batteryLevel } = useBatteryStatus();
const ecoModeClass = ref('');

// Surveillance du mode économie d'énergie pour modifier les classes CSS
watch(isBatterySaving, (newValue) => {
  ecoModeClass.value = newValue ? 'battery-saving' : '';

  if (newValue) {
    activityLogger.log(
      'INFO',
      `Mode économie d'énergie activé. Niveau de batterie: ${batteryLevel.value?.toFixed(0)}%`,
      { batteryLevel: batteryLevel.value }
    );
  }
});

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
  <div
    class="min-h-screen bg-gray-50 font-sans flex flex-col dark:bg-black"
    :class="ecoModeClass"
  >
    <JsonLdData type="Organization" />
    <Navbar />
    <LegalDocumentsBanner />
    <main class="flex-grow">
      <div v-if="isBatterySaving" class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs py-1 px-2 text-center">
        Mode économie d'énergie activé
      </div>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Styles pour le mode économie d'énergie */
.battery-saving img:not(.essential-image) {
  /* Réduire la qualité des images en mode économie */
  filter: brightness(0.95);
}

.battery-saving .animation,
.battery-saving .transition {
  /* Désactiver les transitions en mode économie d'énergie */
  transition: none !important;
  animation: none !important;
}

.battery-saving .bg-image {
  /* Simplifier les arrière-plans */
  background-size: cover !important;
  background-attachment: scroll !important;
  filter: brightness(0.97);
}

/* Appliquer un format plus simple pour les ombres */
.battery-saving .shadow,
.battery-saving .shadow-md,
.battery-saving .shadow-lg,
.battery-saving .shadow-xl {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
}
</style>
