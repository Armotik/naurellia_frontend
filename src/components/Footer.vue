<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';

// Variable pour contrôler le chargement
const logoLoaded = ref(false);
const contentReady = ref(false);

// Gérer le chargement du logo
function handleLogoLoad() {
  logoLoaded.value = true;
}

// Pour éviter les problèmes de CLS, précharger le logo
onMounted(() => {
  // Préchargement du logo
  const img = new Image();
  img.src = new URL('@/assets/img/logo.webp', import.meta.url).href;
  img.onload = handleLogoLoad;

  // Marquer le contenu comme prêt après un court délai pour s'assurer que tout est bien rendu
  // Cela évite les shifts dus au rendu progressif du contenu
  setTimeout(() => {
    contentReady.value = true;
  }, 100);
});
</script>

<template>
  <!-- Positionnement absolu d'un placeholder pour le footer pendant le chargement -->
  <div
    aria-hidden="true"
    v-if="!contentReady"
    class="footer-placeholder fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    style="height: 300px;">
  </div>

  <!-- Le vrai footer avec opacité conditionnelle -->
  <footer
    class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-opacity duration-300"
    :class="{ 'opacity-0': !contentReady, 'opacity-100': contentReady }">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" style="min-height: 300px;">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">

        <!-- Section Logo & Marque -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center">
            <div class="h-16 w-16 relative flex-shrink-0">
              <!-- Skeleton loader qui apparaît pendant le chargement -->
              <div v-if="!logoLoaded"
                   class="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse absolute">
              </div>
              <img
                class="h-16 w-16 rounded-full object-cover transition-all dark:invert dark:hue-rotate-180"
                src="@/assets/img/logo.webp"
                srcset="@/assets/img/logo.webp 500w, @/assets/img/logo.webp 64w"
                sizes="(max-width: 768px) 64px, 64px"
                alt="Logo Naurellia"
                width="500"
                height="500"
                @load="handleLogoLoad"
                :class="{ 'opacity-0': !logoLoaded, 'opacity-100': logoLoaded }">
            </div>
            <span class="text-xl font-bold text-gray-800 dark:text-white ml-2">Naurellia</span>
          </div>
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Promouvoir un tourisme durable et respectueux sur l'Île de Ré.
          </p>
        </div>

        <!-- Section Navigation -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigation</h3>
          <ul class="mt-4 space-y-2">
            <li><RouterLink to="/blog" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Blog</RouterLink></li>
            <li><RouterLink to="/map" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Carte Interactive</RouterLink></li>
            <li><RouterLink to="/contact" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Section Légal -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Légal</h3>
          <ul class="mt-4 space-y-2">
            <li><RouterLink to="/mentions-legales" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Mentions Légales</RouterLink></li>
            <li><RouterLink to="/politique-de-confidentialite" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Politique de Confidentialité</RouterLink></li>
            <li><RouterLink to="/conditions-generales" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Conditions Générales</RouterLink></li>
            <li><RouterLink to="/politique-ecoconception" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Politique d'éco-conception</RouterLink></li>
          </ul>
        </div>

        <!-- Section Partenaires -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Nous soutenir</h3>
          <ul class="mt-4 space-y-2">
            <li><RouterLink to="/partenaires" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Nos Partenaire</RouterLink></li>
            <li><RouterLink to="/devenir-partenaire" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Devenir Partenaire</RouterLink></li>
            <li><RouterLink to="/dons" class="text-base text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">Faire un don</RouterLink></li>
          </ul>
        </div>

      </div>

      <!-- Section Copyright et Réseaux Sociaux -->
      <div class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
        <p class="text-base text-gray-600 dark:text-gray-300 order-2 sm:order-1 mt-4 sm:mt-0">
          &copy; 2025 Naurellia. Tous droits réservés.
        </p>
        <div class="flex space-x-6 order-1 sm:order-2">
          <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            <span class="sr-only">Instagram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-2.34a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Section WebsiteCarbon Badge -->
      <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-center">
        <div id="wcb" class="carbonbadge dark:wcb-d"></div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
img {
  transition: opacity 0.3s ease-in-out;
}
.footer-placeholder {
  z-index: -1; /* S'assurer qu'il reste en arrière-plan */
}
</style>
