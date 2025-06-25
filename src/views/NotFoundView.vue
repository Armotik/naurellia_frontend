<script setup>
import { RouterLink } from 'vue-router';
import { useKonamiCode } from '@/composables/useKonamiCode';

// On active l'Easter Egg. Quand le code est entré, une alerte s'affiche.
useKonamiCode(() => {
  alert('Vous avez trouvé le passage secret des sternes ! 🚲');
});
</script>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-48 text-green-100 dark:text-green-900 transform -translate-y-1/2">
      <svg viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,160L80,176C160,192,320,224,480,218.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
    </div>

    <main class="relative z-10 flex flex-col items-center text-center px-6">
      <div class="w-48 h-48 mb-8 animate-fade-in-up">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-green-700/50 dark:text-green-500/50">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 2, 14 10, 12 12, 10 10" fill="currentColor" class="text-green-700 dark:text-green-500 needle" />
          <polygon points="12 22, 14 14, 12 12, 10 14" fill="currentColor" class="text-gray-400 dark:text-gray-600" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
        </svg>
      </div>

      <h1 class="text-6xl md:text-8xl font-extrabold text-green-700 dark:text-green-500 tracking-tighter animate-fade-in-up" style="animation-delay: 0.2s;">404</h1>
      <h2 class="mt-2 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white animate-fade-in-up" style="animation-delay: 0.4s;">Oups ! Cette page s'est égarée.</h2>
      <p class="mt-4 max-w-md text-gray-600 dark:text-gray-400 animate-fade-in-up" style="animation-delay: 0.6s;">
        Le sentier que vous cherchez n'existe pas. Peut-être qu'un petit retour à l'accueil vous aidera à retrouver votre chemin ?
      </p>

      <RouterLink to="/" class="mt-8 px-8 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:shadow-green-900/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style="animation-delay: 0.8s;">
        Retourner à l'accueil
      </RouterLink>
    </main>

    <div class="absolute bottom-0 left-0 w-full h-48 text-green-100 dark:text-green-900 transform translate-y-1/2">
      <svg viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out both; }

/* Animation pour l'aiguille de la boussole */
.needle {
  transform-origin: center;
  animation: spin 4s linear infinite;
}
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
