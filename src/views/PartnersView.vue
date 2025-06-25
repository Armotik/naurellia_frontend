<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';
import { RouterLink } from 'vue-router';

// State pour stocker les données et les états de chargement/erreur
const partners = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Fonction pour récupérer les partenaires depuis l'API
async function fetchPartners() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await apiClient.get('/api/partners', {
      params: {
        'order[name]': 'asc'
      }
    });
    partners.value = response.data['hydra:member'] || response.data;
  } catch (err) {
    error.value = "Impossible de charger la liste des partenaires pour le moment.";
    console.error("Erreur de chargement des partenaires:", err);
  } finally {
    isLoading.value = false;
  }
}

// On appelle la fonction au chargement du composant
onMounted(() => {
  fetchPartners();
});
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-base font-semibold text-green-700 dark:text-green-500 tracking-wide uppercase">Nos Alliés</h2>
        <p class="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Ils s'engagent avec nous
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
          Découvrez les acteurs locaux qui partagent notre vision d'un tourisme durable et contribuent à la richesse de l'Île de Ré.
        </p>
      </div>

      <div class="mt-20">
        <div v-if="isLoading">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/30 animate-pulse">
              <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
              <div class="p-6">
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
          <p class="text-red-700 dark:text-red-400">{{ error }}</p>
        </div>

        <div v-else-if="partners.length > 0" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="partner in partners" :key="partner.id" class="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div class="flex-shrink-0 h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <img v-if="partner.logoUrl" class="h-full w-full object-contain p-4" :src="partner.logoUrl" :alt="'Logo de ' + partner.name" loading="lazy">
              <div v-else class="text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" /></svg>
              </div>
            </div>
            <div class="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ partner.name }}</h3>
                <p class="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-4">{{ partner.description }}</p>
              </div>
              <div class="mt-6">
                <a v-if="partner.website" :href="partner.website" target="_blank" rel="noopener noreferrer" class="text-base font-medium text-green-700 hover:text-green-600 dark:text-green-500 dark:hover:text-green-400">
                  Visiter le site &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 dark:text-gray-400 py-16">
          <p>Nos premiers partenaires seront bientôt annoncés. Restez connectés !</p>
        </div>
      </div>

      <hr class="text-gray-200 dark:text-gray-700 mt-10">

      <section class="bg-green-700 dark:bg-green-800 rounded-lg mt-24">
        <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            <span class="block">Vous aussi, rejoignez l'aventure.</span>
          </h2>
          <p class="mt-4 text-lg leading-6 text-green-200 dark:text-green-300">
            Vous partagez nos valeurs et souhaitez figurer sur cette page ? Contactez-nous pour devenir un partenaire officiel de Naurellia.
          </p>
          <RouterLink to="/devenir-partenaire" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700 sm:w-auto">
            Devenir partenaire
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Utilitaire de Tailwind pour limiter le nombre de lignes (nécessite le plugin @tailwindcss/line-clamp) */
/* Si vous ne l'avez pas, le texte s'affichera en entier */
.line-clamp-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
</style>
