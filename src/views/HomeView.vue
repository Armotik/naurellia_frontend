<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import apiClient from '@/services/api';

import heroImage from '@/assets/img/ile-de-re-pont.webp';

const featuredArticle = ref(null);
const isLoading = ref(true);
const error = ref(null);

async function fetchFeaturedArticle() {
  try {
    const response = await apiClient.get('/api/articles', {
      params: {
        isFeatured: true,
        'order[publishedAt]': 'desc',
        itemsPerPage: 1
      }
    });
    const articles = response.data['hydra:member'] || response.data;
    if (articles && articles.length > 0) {
      featuredArticle.value = articles[0];
    }
  } catch (err) {
    error.value = "Impossible de charger l'article à la une pour le moment.";
    console.error("Erreur de chargement de l'article:", err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchFeaturedArticle();
});

function getExcerpt(content, length = 150) {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '');
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
</script>


<template>
  <div>
    <!-- Section Héros -->
    <header class="hero-section" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 px-4 text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-shadow-lg">
          <span class="block">Bienvenue sur Naurellia</span>
          <span class="block text-green-200 mt-4">L'Île de Ré, autrement.</span>
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-200 text-shadow">
          Découvrez une nouvelle façon de visiter, en harmonie avec la nature et les habitants. Protégeons ensemble ce joyau de l'Atlantique.
        </p>
        <div class="mt-8 flex justify-center">
          <div class="inline-flex rounded-md shadow-lg">
            <a href="#decouvrir" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-green-200 hc:bg-yellow-300 hc:text-black hc:hover:bg-yellow-400">
              Commencer la visite
            </a>
          </div>
        </div>
      </div>
      <div class="wave-container">
        <svg viewBox="0 0 1440 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 63l120-10.7c120-10.3 360-31.3 600-26.6s480 37.6 600 58.6l120 21.4V120H0V63z"></path>
        </svg>
      </div>
    </header>

    <!-- Section Chiffres Clés -->
    <section id="decouvrir" class="bg-gray-50 py-16 hc:bg-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold text-green-700 tracking-wide uppercase hc:text-yellow-400">Un Écosystème Précieux</h2>
          <p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl hc:text-white">
            L'Île de Ré en quelques chiffres
          </p>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div class="text-center"><p class="text-5xl font-extrabold text-gray-900 hc:text-white">138 km</p><p class="mt-2 text-lg font-medium text-gray-500 hc:text-gray-400">de pistes cyclables</p></div>
          <div class="text-center"><p class="text-5xl font-extrabold text-gray-900 hc:text-white">355</p><p class="mt-2 text-lg font-medium text-gray-500 hc:text-gray-400">espèces d'oiseaux observées</p></div>
          <div class="text-center"><p class="text-5xl font-extrabold text-gray-900 hc:text-white">80 %</p><p class="mt-2 text-lg font-medium text-gray-500 hc:text-gray-400">du territoire protégé</p></div>
        </div>
      </div>
    </section>

    <!-- Section Notre Mission -->
    <section class="bg-white py-20 hc:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 hc:text-white">Notre Mission : Allier Émerveillement et Respect</h2>
        </div>
        <dl class="mt-12 space-y-10">
          <div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white hc:bg-yellow-400 hc:text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900 hc:text-white">Sensibiliser au surtourisme</p></dt><dd class="mt-2 ml-16 text-base text-gray-500 hc:text-gray-400">Face à la popularité de l'île, nous souhaitons informer sur les risques qui menacent son équilibre fragile et la quiétude de ses villages.</dd></div>
          <div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white hc:bg-yellow-400 hc:text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9.75-12 12m0 0-9.75 2.25M12 12v9.75m0-9.75L21.75 9.75M12 12l-9.75-2.25M12 12 2.25 9.75m9.75 2.25 9.75 2.25M12 3v9.75m-9.75-2.25 9.75 2.25" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900 hc:text-white">Promouvoir les acteurs locaux</p></dt><dd class="mt-2 ml-16 text-base text-gray-500 hc:text-gray-400">Mettre en lumière les initiatives, associations et entreprises qui œuvrent au quotidien pour la préservation de l'environnement rétais.</dd></div>
          <div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white hc:bg-yellow-400 hc:text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.752H12.301M15 6.236a11.959 11.959 0 0 1-6 0" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900 hc:text-white">Fournir des outils pratiques</p></dt><dd class="mt-2 ml-16 text-base text-gray-500 hc:text-gray-400">Offrir des ressources concrètes, comme notre carte interactive, pour faciliter une découverte de l'île qui soit à la fois riche et responsable.</dd></div>
        </dl>
      </div>
    </section>

    <!-- Section À la Une (Dynamique) -->
    <section v-if="featuredArticle" class="bg-gray-800 hc:bg-black border-t border-b border-gray-700 hc:border-gray-800">
      <div class="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">À la une : {{ featuredArticle.title }}</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-300 hc:text-gray-400">
          {{ getExcerpt(featuredArticle.content) }}
        </p>
        <RouterLink :to="`/blog/articles/${featuredArticle.slug}`" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-100 sm:w-auto hc:bg-yellow-300 hc:text-black hc:hover:bg-yellow-400">
          Lire l'article complet
        </RouterLink>
      </div>
    </section>

    <!-- Section Découvrir le site -->
    <section class="bg-white py-20 hc:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-green-700 font-semibold tracking-wide uppercase hc:text-yellow-400">Un Outil Responsable</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl hc:text-white">
            Conçu pour vous, dans le respect de l'environnement
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto hc:text-gray-400">
            Naurellia est pensé pour être le plus léger et accessible possible, conformément aux principes de l'éco-conception numérique.
          </p>
        </div>
        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 hc:text-white">Le Blog : S'inspirer et Comprendre</p></dt><dd class="mt-2 text-base text-gray-500 hc:text-gray-400">Plus qu'une liste d'activités, notre blog est une porte d'entrée sur l'écosystème rétais. Découvrez des reportages sur la faune locale, des portraits d'artisans engagés, et des guides pour des visites hors des sentiers battus, respectueuses des saisons et des habitants.</dd></div>
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 hc:text-white">La Carte Interactive : L'Essentiel à portée de main</p></dt><dd class="mt-2 text-base text-gray-500 hc:text-gray-400">Planifiez vos déplacements à vélo, localisez les services d'urgence, les points de collecte pour vos déchets, et trouvez en un clin d'œil nos partenaires locaux qui partagent nos valeurs. Un outil central pour une expérience sereine et responsable.</dd></div>
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 hc:text-white">Une Conception Écologique : Moins, c'est mieux</p></dt><dd class="mt-2 text-base text-gray-500 hc:text-gray-400">Nous suivons les préceptes du "low-tech". Cela signifie des images optimisées, un minimum de scripts externes, un hébergement vert et un code épuré. Le but : réduire l'empreinte carbone du site et assurer une navigation rapide, même avec une connexion limitée.</dd></div>
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 hc:text-white">Accessibilité pour tous</p></dt><dd class="mt-2 text-base text-gray-500 hc:text-gray-400">Un site responsable est un site accessible. Nous veillons à ce que les contrastes de couleurs soient suffisants, que la navigation soit possible au clavier et que les informations soient lisibles par les technologies d'assistance, pour que chacun puisse profiter de Naurellia.</dd></div>
          </dl>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Ajoutez ces styles dans votre section <style> */
.wave-container {
  position: absolute;
  bottom: -1px; /* Assure que la vague touche exactement le bas */
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 20; /* S'assure que la vague est au-dessus de la section suivante */
}

.wave-container svg {
  display: block;
  width: 100%;
  height: 120px; /* Hauteur fixe pour la vague */
  transform: translateY(1px); /* Petit ajustement pour éviter les espaces blancs */
}

/* Ajustez votre hero-section */
.hero-section {
  position: relative;
  height: 85vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: -1px; /* Élimine l'espace entre les sections */
}
.text-shadow-lg { text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
.text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
</style>
