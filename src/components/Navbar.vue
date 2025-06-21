<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

// --- State ---
const authStore = useAuthStore()
const router = useRouter()
// NOUVEAU : State pour gérer l'ouverture/fermeture du menu mobile
const isMobileMenuOpen = ref(false)

// --- Fonctions ---
function handleLogout() {
  authStore.logout()
  // On s'assure que le menu mobile se ferme après la déconnexion
  isMobileMenuOpen.value = false
  router.push('/login')
}
</script>

<template>
  <nav class="bg-white backdrop-blur-md shadow-sm top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center">
          <RouterLink to="/" @click="isMobileMenuOpen = false" class="flex-shrink-0 flex items-center">
            <img class="h-12 w-auto" src="@/assets/img/logo.webp" alt="Logo Naurellia">
            <span class="ml-2 text-xl font-bold text-gray-800">Naurellia</span>
          </RouterLink>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink to="/blog" class="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Blog</RouterLink>
              <RouterLink to="/map" class="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Carte Interactive</RouterLink>
              <RouterLink to="/partenaires" class="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Partenaires</RouterLink>
              <RouterLink to="/contact" class="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Contact</RouterLink>
            </div>
          </div>
        </div>

        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <template v-if="!authStore.isAuthenticated">
              <RouterLink to="/login" class="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800 transition-colors duration-300 shadow-sm">Connexion</RouterLink>
            </template>
            <template v-else>
              <button @click="handleLogout" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors duration-300">Déconnexion</button>
            </template>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-green-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Ouvrir le menu principal</span>
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

      </div>
    </div>

    <div v-show="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink @click="isMobileMenuOpen = false" to="/blog" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Blog</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/map" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Carte Interactive</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/partenaires" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Partenaires</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Contact</RouterLink>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="px-2 space-y-1">
          <template v-if="!authStore.isAuthenticated">
            <RouterLink @click="isMobileMenuOpen = false" to="/login" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Connexion</RouterLink>
          </template>
          <template v-else>
            <button @click="handleLogout" class="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Déconnexion</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
