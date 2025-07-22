<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import apiClient from '@/services/api';
import { useLogger } from '@/composables/useLogger';

import heroImage from '@/assets/img/ile-de-re-pont.webp';

const featuredArticle = ref(null);
const isLoading = ref(true);
const error = ref(null);

const { logHomeAction, logApiError } = useLogger();

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
    logApiError('/api/articles', err.response?.status || 0, err.message, {
      params: { isFeatured: true, 'order[publishedAt]': 'desc', itemsPerPage: 1 }
    });
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

// Fonctions de tracking
function handleStartVisitClick() {
  logHomeAction('start_visit_click', {
    buttonLocation: 'hero_section',
    action: 'scroll_to_discover'
  });
}

function handleReadFullArticleClick() {
  logHomeAction('read_full_article_click', {
    articleId: featuredArticle.value?.id,
    articleSlug: featuredArticle.value?.slug,
    articleTitle: featuredArticle.value?.title,
    buttonLocation: 'featured_section'
  });
}
</script>


<template>
  <div>
    <!-- Section Héros -->
    <header class="hero-section" v-lazy-background="heroImage">
      <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      <div class="relative z-10 px-4 text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-shadow-lg">
          <span class="block">Bienvenue sur Naurellia</span>
          <span class="block text-green-200 dark:text-green-300 mt-4">L'Île de Ré, autrement.</span>
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-200 text-shadow">
          Découvrez une nouvelle façon de visiter, en harmonie avec la nature et les habitants. Protégeons ensemble ce joyau de l'Atlantique.
        </p>
        <div class="mt-8 flex justify-center">
          <div class="inline-flex rounded-md shadow-lg">
            <a
              href="#decouvrir"
              @click="handleStartVisitClick"
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-green-50 hover:bg-green-200 dark:bg-green-800 dark:text-white dark:hover:bg-green-700 hc:bg-yellow-300 hc:text-black hc:hover:bg-yellow-400"
            >
              Commencer la visite
            </a>
          </div>
        </div>
      </div>
      <div class="wave-container">
        <svg viewBox="0 0 1440 120" fill="currentColor" class="text-gray-50 dark:text-gray-900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 63l120-10.7c120-10.3 360-31.3 600-26.6s480 37.6 600 58.6l120 21.4V120H0V63z"></path>
        </svg>
      </div>
    </header>

    <!-- Section Chiffres Clés -->
    <section id="decouvrir" class="bg-gray-50 dark:bg-gray-900 py-16 hc:bg-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold text-green-700 dark:text-green-500 tracking-wide uppercase hc:text-yellow-400">Un Écosystème Précieux</h2>
          <p class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl hc:text-white">
            L'Île de Ré en quelques chiffres
          </p>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div class="text-center"><p class="text-5xl font-extrabold text-gray-900 dark:text-white hc:text-white">138 km</p><p class="mt-2 text-lg font-medium text-gray-500 dark:text-gray-300 hc:text-gray-400">de pistes cyclables</p></div>
          <div class="text-center"><p class="text-5xl font-extrabold text-gray-900 dark:text-white hc:text-white">355</p><p class="mt-2 text-lg font-medium text-gray-500 dark:text-gray-300 hc:text-gray-400">espèces d'oiseaux observées</p></div>
          <div class="text-center"><p class="text-5xl font-extrabold text-gray-900 dark:text-white hc:text-white">80 %</p><p class="mt-2 text-lg font-medium text-gray-500 dark:text-gray-300 hc:text-gray-400">du territoire protégé</p></div>
        </div>
      </div>
    </section>

    <!-- Section Notre Mission -->
    <section class="bg-white dark:bg-gray-800 py-20 hc:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white hc:text-white">Notre Mission : Allier Émerveillement et Respect</h2>
        </div>
        <dl class="mt-12 space-y-10">
          <div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-700 dark:bg-green-600 text-white hc:bg-yellow-400 hc:text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white hc:text-white">Sensibiliser au surtourisme</p></dt><dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300 hc:text-gray-400">Face à la popularité de l'île, nous souhaitons informer sur les risques qui menacent son équilibre fragile et la quiétude de ses villages.</dd></div>
          <div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-700 dark:bg-green-600 text-white hc:bg-yellow-400 hc:text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white hc:text-white">Promouvoir les acteurs locaux</p></dt><dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300 hc:text-gray-400">Mettre en lumière les initiatives, associations et entreprises qui œuvrent au quotidien pour la préservation de l'environnement rétais.</dd></div>
          <div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-700 dark:bg-green-600 text-white hc:bg-yellow-400 hc:text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white hc:text-white">Fournir des outils pratiques</p></dt><dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300 hc:text-gray-400">Offrir des ressources concrètes, comme notre carte interactive, pour faciliter une découverte de l'île qui soit à la fois riche et responsable.</dd></div>
        </dl>
      </div>
    </section>

    <!-- Section À la Une (Dynamique) -->
    <section v-if="featuredArticle" class="bg-gray-800 dark:bg-gray-900 hc:bg-black border-t border-b border-gray-700 dark:border-gray-600 hc:border-gray-800">
      <div class="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">À la une : {{ featuredArticle.title }}</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-300 hc:text-gray-400">
          {{ getExcerpt(featuredArticle.content) }}
        </p>
        <RouterLink
          :to="`/blog/articles/${featuredArticle.slug}`"
          @click="handleReadFullArticleClick"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 dark:text-white bg-white dark:bg-green-700 hover:bg-gray-100 dark:hover:bg-green-600 sm:w-auto hc:bg-yellow-300 hc:text-black hc:hover:bg-yellow-400"
        >
          Lire l'article complet
        </RouterLink>
      </div>
    </section>

    <!-- Section Découvrir le site -->
    <section class="bg-white dark:bg-gray-800 py-20 hc:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-green-700 dark:text-green-500 font-semibold tracking-wide uppercase hc:text-yellow-400">Un Outil Responsable</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl hc:text-white">
            Conçu pour vous, dans le respect de l'environnement
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto hc:text-gray-400">
            Naurellia est pensé pour être le plus léger et accessible possible, conformément aux principes de l'éco-conception numérique.
          </p>
        </div>
        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 dark:text-white hc:text-white">Le Blog : S'inspirer et Comprendre</p></dt><dd class="mt-2 text-base text-gray-500 dark:text-gray-300 hc:text-gray-400">Plus qu'une liste d'activités, notre blog est une porte d'entrée sur l'écosystème rétais. Découvrez des reportages sur la faune locale, des portraits d'artisans engagés, et des guides pour des visites hors des sentiers battus, respectueuses des saisons et des habitants.</dd></div>
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 dark:text-white hc:text-white">La Carte Interactive : L'Essentiel à portée de main</p></dt><dd class="mt-2 text-base text-gray-500 dark:text-gray-300 hc:text-gray-400">Planifiez vos déplacements à vélo, localisez les services d'urgence, les points de collecte pour vos déchets, et trouvez en un clin d'œil nos partenaires locaux qui partagent nos valeurs. Un outil central pour une expérience sereine et responsable.</dd></div>
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 dark:text-white hc:text-white">Une Conception Écologique : Moins, c'est mieux</p></dt><dd class="mt-2 text-base text-gray-500 dark:text-gray-300 hc:text-gray-400">Nous suivons les préceptes du "low-tech". Cela signifie des images optimisées, un minimum de scripts externes, un hébergement vert et un code épuré. Le but : réduire l'empreinte carbone du site et assurer une navigation rapide, même avec une connexion limitée.</dd></div>
            <div class="relative"><dt><p class="text-lg leading-6 font-medium text-gray-900 dark:text-white hc:text-white">Accessibilité pour tous</p></dt><dd class="mt-2 text-base text-gray-500 dark:text-gray-300 hc:text-gray-400">Un site responsable est un site accessible. Nous veillons à ce que les contrastes de couleurs soient suffisants, que la navigation soit possible au clavier et que les informations soient lisibles par les technologies d'assistance, pour que chacun puisse profiter de Naurellia.</dd></div>
          </dl>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.wave-container {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 20;
}

.wave-container svg {
  display: block;
  width: 100%;
  height: 120px; /* Hauteur par défaut pour les grands écrans */
  transform: translateY(1px);
}

/* Ajustement de la hero section pour mobile */
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
  margin-bottom: -1px;
  padding-bottom: 80px; /* Espace supplémentaire en bas pour la vague */
  /* Placeholder pour l'image de fond avant chargement */
  background-color: #2c3e50; /* Couleur temporaire avant chargement */
  transition: background-image 0.3s ease-in-out;
}

/* Style pour l'image chargée */
.bg-loaded {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

/* Media queries pour les appareils mobiles */
@media (max-width: 768px) {
  .wave-container svg {
    height: 60px; /* Hauteur réduite sur mobile */
  }

  .hero-section {
    padding-bottom: 50px; /* Espace réduit mais suffisant */
  }
}

/* Pour les très petits écrans */
@media (max-width: 480px) {
  .wave-container svg {
    height: 40px; /* Encore plus petit sur très petits écrans */
  }

  .hero-section {
    height: auto; /* Hauteur automatique plutôt que vh fixe */
    min-height: 80vh; /* Hauteur minimale */
    padding-top: 80px; /* Espace en haut */
    padding-bottom: 40px; /* Espace en bas */
  }
}

.text-shadow-lg { text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
.text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
</style>
