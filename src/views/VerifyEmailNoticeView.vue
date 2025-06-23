<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-48 text-green-100/50 transform -translate-y-1/2">
      <svg viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,160L80,176C160,192,320,224,480,218.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
    </div>

    <main class="relative z-10 flex flex-col items-center text-center px-6">

      <div class="w-32 h-32 mb-8 animate-fade-in-up">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" class="text-gray-400" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.25c-1-3.5 2-6 2-6s-4.5 2-3.5 6.5c1 4.5 5 2.5 5 2.5s-4-1.5-3.5-3" class="text-green-600 animate-leaf-grow" />
        </svg>
      </div>

      <h1 class="text-3xl md:text-4xl font-extrabold text-green-700 tracking-tight animate-fade-in-up" style="animation-delay: 0.2s;">
        Presque terminé !
      </h1>
      <p class="mt-4 max-w-lg text-lg text-gray-600 animate-fade-in-up" style="animation-delay: 0.4s;">
        Nous venons de vous envoyer un email de confirmation. Veuillez cliquer sur le lien qu'il contient pour activer votre compte et finaliser votre inscription.
      </p>

      <div class="mt-6 text-sm text-gray-500 animate-fade-in-up" style="animation-delay: 0.5s;">
        <p>Cela peut prendre quelques minutes. Si vous ne le recevez pas, veuillez vérifier l'adresse e-mail que vous avez fournie.</p>
      </div>

      <div class="mt-8 text-sm text-gray-500 animate-fade-in-up" style="animation-delay: 0.6s;">
        <p>Pensez à vérifier votre dossier de courriers indésirables (spam).</p>
      </div>

      <RouterLink to="/login" class="mt-8 px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-black transition-colors duration-300 transform hover:scale-105 animate-fade-in-up" style="animation-delay: 0.8s;">
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

/* Animation pour la feuille */
.animate-leaf-grow {
  transform-origin: bottom center;
  animation: leaf-grow 1.5s ease-out 1s both; /* 1s de délai avant de commencer */
}
@keyframes leaf-grow {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
