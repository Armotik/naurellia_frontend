<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'

// --- State ---
const authStore = useAuthStore()
const router = useRouter()
const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const profileMenu = ref(null)

// --- Fonctions ---
function handleLogout() {
  authStore.logout()
  isMobileMenuOpen.value = false
  isProfileMenuOpen.value = false
  router.push('/login')
}

// Gère la fermeture du menu déroulant desktop si on clique en dehors
const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <nav class="bg-white backdrop-blur-md shadow-sm sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">

        <div class="flex items-center">
          <RouterLink to="/" @click="isMobileMenuOpen = false" class="flex-shrink-0 flex items-center gap-x-3">
            <img class="h-16 w-16 rounded-full object-cover" src="@/assets/img/logo.webp" alt="Logo Naurellia">
            <span class="text-xl font-bold text-gray-800 hidden sm:block">Naurellia</span>
          </RouterLink>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink to="/blog" class="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Blog</RouterLink>
              <RouterLink to="/carte" class="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Carte Interactive</RouterLink>
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
              <div class="relative" ref="profileMenu">
                <div>
                  <button @click="isProfileMenuOpen = !isProfileMenuOpen" type="button" class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <span class="sr-only">Ouvrir le menu utilisateur</span>
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" /></svg>
                    </div>
                  </button>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <div v-show="isProfileMenuOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                    <div class="py-1 px-4 border-b">
                      <p class="text-sm text-gray-700">Connecté en tant que</p>
                      <p class="text-sm font-medium text-gray-900 truncate">{{ authStore.user?.email }}</p>
                    </div>
                    <div class="py-1">
                      <RouterLink to="/mon-compte" @click="isProfileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Mon Compte</RouterLink>
                      <a v-if="authStore.isAdmin" href="/admin" @click="isProfileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Administration</a>
                    </div>
                    <div class="py-1 border-t">
                      <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Déconnexion</a>
                    </div>
                  </div>
                </transition>
              </div>
            </template>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-green-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
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
        <RouterLink @click="isMobileMenuOpen = false" to="/carte" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Carte Interactive</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/partenaires" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Partenaires</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Contact</RouterLink>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <template v-if="authStore.isAuthenticated">
          <div class="flex items-center px-5 mb-3">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" /></svg>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ authStore.user?.username || authStore.user?.email }}</div>
              <div class="text-sm font-medium text-gray-500">{{ authStore.user?.email }}</div>
            </div>
          </div>
          <div class="px-2 space-y-1">
            <RouterLink to="/mon-compte" @click="isMobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Mon Compte</RouterLink>
            <a v-if="authStore.isAdmin" href="/admin" @click="isMobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Administration</a>
            <a href="#" @click.prevent="handleLogout" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Déconnexion</a>
          </div>
        </template>
        <template v-else>
          <div class="px-2 space-y-1">
            <RouterLink @click="isMobileMenuOpen = false" to="/login" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50">Connexion</RouterLink>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>
