<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme';
import ThemeToggle from '@/components/ThemeToggle.vue';

// --- State ---
const authStore = useAuthStore()
const themeStore = useThemeStore();
const router = useRouter()
const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const profileMenu = ref(null)
const logoLoaded = ref(false);
const contentReady = ref(false);


// --- Fonctions ---
function handleLogoLoad() {
  logoLoaded.value = true;
}

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

onMounted(() => {

  const img = new Image();
  img.src = new URL('@/assets/img/logo.webp', import.meta.url).href;
  img.onload = handleLogoLoad

  document.addEventListener('click', handleClickOutside);

  setTimeout(() => {
    contentReady.value = true;
  }, 100);
})
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <!-- Placeholder pour la navbar pendant le chargement -->
  <div
    aria-hidden="true"
    v-if="!contentReady"
    class="navbar-placeholder fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20 z-40"
    style="height: 80px;">
  </div>

  <!-- La vraie navbar avec opacité conditionnelle -->
  <nav class="bg-white dark:bg-gray-900 backdrop-blur-md shadow-sm dark:shadow-gray-800/20 sticky top-0 z-9999 transition-opacity duration-300"
       :class="{ 'opacity-0': !contentReady, 'opacity-100': contentReady }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">

        <div class="flex items-center">
          <RouterLink to="/" @click="isMobileMenuOpen = false" class="flex-shrink-0 flex items-center gap-x-3">
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
            <span class="text-xl font-bold text-gray-800 dark:text-gray-100 hidden sm:block">Naurellia</span>
          </RouterLink>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink to="/blog" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Blog</RouterLink>
              <RouterLink to="/carte" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Carte Interactive</RouterLink>
              <RouterLink to="/partenaires" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Partenaires</RouterLink>
              <RouterLink to="/contact" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Contact</RouterLink>
            </div>
          </div>
        </div>

        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-3">
            <!-- ThemeToggle en version desktop -->
            <ThemeToggle />

            <template v-if="!authStore.isAuthenticated">
              <RouterLink to="/login" class="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800 transition-colors duration-300 shadow-sm">Connexion</RouterLink>
            </template>
            <template v-else>
              <div class="relative" ref="profileMenu">
                <div>
                  <button @click="isProfileMenuOpen = !isProfileMenuOpen" type="button" class="max-w-xs bg-white dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900">
                    <span class="sr-only">Ouvrir le menu utilisateur</span>
                    <div class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" /></svg>
                    </div>
                  </button>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <div v-show="isProfileMenuOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none" role="menu">
                    <div class="py-1 px-4 border-b dark:border-gray-700">
                      <p class="text-sm text-gray-700 dark:text-gray-300">Connecté en tant que</p>
                      <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ authStore.user?.email }}</p>
                    </div>
                    <div class="py-1">
                      <RouterLink to="/mon-compte" @click="isProfileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Mon Compte</RouterLink>
                      <a v-if="authStore.isAdmin" href="/admin" @click="isProfileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Administration</a>
                    </div>
                    <div class="py-1 border-t dark:border-gray-700">
                      <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Déconnexion</a>
                    </div>
                  </div>
                </transition>
              </div>
            </template>
          </div>
        </div>

        <div class="md:hidden flex items-center space-x-2">
          <!-- ThemeToggle en version mobile -->
          <ThemeToggle />

          <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 dark:focus:ring-green-600">
            <span class="sr-only">Ouvrir le menu principal</span>
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

      </div>
    </div>

    <div v-show="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink @click="isMobileMenuOpen = false" to="/blog" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 hover:bg-gray-50 dark:hover:bg-gray-800">Blog</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/carte" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 hover:bg-gray-50 dark:hover:bg-gray-800">Carte Interactive</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/partenaires" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 hover:bg-gray-50 dark:hover:bg-gray-800">Partenaires</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 hover:bg-gray-50 dark:hover:bg-gray-800">Contact</RouterLink>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
        <template v-if="authStore.isAuthenticated">
          <div class="flex items-center px-5 mb-3">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" /></svg>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800 dark:text-gray-200">{{ authStore.user?.username || authStore.user?.email }}</div>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</div>
            </div>
          </div>
          <div class="px-2 space-y-1">
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
.navbar-placeholder {
  z-index: 39; /* Juste en dessous de la navbar réelle */
}
</style>
