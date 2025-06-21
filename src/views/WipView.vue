<script setup>
import { RouterLink } from 'vue-router';
import { useKonamiCode } from '@/composables/useKonamiCode';

// Le même Easter Egg !
useKonamiCode(() => {
  alert('Merci pour votre patience ! 🚲');
});
</script>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-48 text-green-100 transform -translate-y-1/2">
      <svg viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,160L80,176C160,192,320,224,480,218.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
    </div>

    <main class="relative z-10 flex flex-col items-center text-center px-6">

      <div class="w-64 h-48 mb-8 animate-fade-in-up">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" fill="none" stroke-width="1.5" class="text-green-700/70">
          <path d="M -5,50 C 20,40 40,60 60,50 S 80,40 105,50 L 105,65 L -5,65 Z" fill="currentColor" class="text-blue-200/50" stroke="none" />
          <path d="M -5,55 C 15,45 35,65 55,55 S 75,45 105,55" stroke="currentColor" class="text-blue-300/50" />

          <line x1="10" y1="50" x2="10" y2="40" stroke="currentColor" stroke-linecap="round" />
          <line x1="30" y1="50" x2="30" y2="37" stroke="currentColor" stroke-linecap="round" />
          <line x1="50" y1="50" x2="50" y2="34" stroke="currentColor" stroke-linecap="round" />

          <path d="M 5,40 C 20,30 40,30 55,34" stroke="currentColor" stroke-linecap="round" />

          <path d="M 65,50 L 65,30 L 85,30" stroke="currentColor" class="text-gray-400" />
          <line x1="75" y1="30" x2="75" y2="36" stroke="currentColor" class="text-gray-400" />
          <circle cx="55" cy="34" r="1.5" fill="currentColor" class="text-yellow-500" />
        </svg>
      </div>

      <h1 class="text-5xl md:text-7xl font-extrabold text-green-700 tracking-tighter animate-fade-in-up" style="animation-delay: 0.2s;">En Construction</h1>
      <h2 class="mt-2 text-2xl md:text-3xl font-bold text-gray-800 animate-fade-in-up" style="animation-delay: 0.4s;">Nous préparons quelque chose de spécial.</h2>
      <p class="mt-4 max-w-md text-gray-600 animate-fade-in-up" style="animation-delay: 0.6s;">
        Cette partie du site n'est pas encore tout à fait prête. Nos équipes (d'une personne) travaillent dur pour vous apporter une nouvelle fonctionnalité incroyable. Revenez bientôt !
      </p>

      <RouterLink to="/" class="mt-8 px-8 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style="animation-delay: 0.8s;">
        Retourner à l'accueil
      </RouterLink>
    </main>

    <div class="absolute bottom-0 left-0 w-full h-48 text-green-100 transform translate-y-1/2">
      <svg viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out both; }
</style>
