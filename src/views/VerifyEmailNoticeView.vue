<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-48 text-green-100/50 dark:text-green-900/50 transform -translate-y-1/2">
      <svg viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,160L80,176C160,192,320,224,480,218.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
    </div>

    <main class="relative z-10 flex flex-col items-center text-center px-6">

      <div class="w-32 h-32 mb-8 animate-fade-in-up">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <!-- Flèche vers le haut -->
          <path d="M12 21V3" class="text-green-600 dark:text-green-500 animate-arrow" stroke-width="2" stroke-linecap="round" />
          <path d="M7 8L12 3L17 8" class="text-green-600 dark:text-green-500 animate-arrow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

          <!-- Enveloppe qui s'envole -->
          <rect x="5" y="11" width="14" height="10" rx="2" class="text-gray-500 dark:text-gray-400 fill-white dark:fill-gray-700 animate-float" />

          <!-- Contenu de l'enveloppe -->
          <path d="M5 13l7 3 7-3" class="text-gray-500 dark:text-gray-400 animate-float" />
        </svg>
      </div>

      <h1 class="text-3xl md:text-4xl font-extrabold text-green-700 dark:text-green-500 tracking-tight animate-fade-in-up" style="animation-delay: 0.2s;">
        Presque terminé !
      </h1>
      <p class="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-400 animate-fade-in-up" style="animation-delay: 0.4s;">
        Nous venons de vous envoyer un email de confirmation. Veuillez cliquer sur le lien qu'il contient pour activer votre compte et finaliser votre inscription.
      </p>

      <div class="mt-6 text-sm text-gray-500 dark:text-gray-500 animate-fade-in-up" style="animation-delay: 0.5s;">
        <p>Cela peut prendre quelques minutes. Si vous ne le recevez pas, veuillez vérifier l'adresse e-mail que vous avez fournie.</p>
      </div>

      <div class="mt-8 text-sm text-gray-500 dark:text-gray-500 animate-fade-in-up" style="animation-delay: 0.6s;">
        <p>Pensez à vérifier votre dossier de courriers indésirables (spam).</p>
      </div>

      <RouterLink to="/login" class="mt-8 px-8 py-3 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-black dark:hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 animate-fade-in-up" style="animation-delay: 0.8s;">
        Retourner à la page de connexion
      </RouterLink>
    </main>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.7s ease-out both;
}

/* Nouvelles animations pour la flèche et l'enveloppe */
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}
.animate-float {
  animation: float 2s ease-in-out infinite;
}

@keyframes arrow {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}
.animate-arrow {
  animation: arrow 1.5s ease-in-out infinite;
}

@keyframes speed-up {
  0% { opacity: 0; transform: translateY(3px); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-3px); }
}
.animate-speed-up {
  animation: speed-up 1s linear infinite;
}
</style>
