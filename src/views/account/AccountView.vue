<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">

        <aside class="lg:col-span-3">
          <nav class="space-y-1">
            <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Mon Compte
            </h3>
            <RouterLink
              to="/mon-compte/changer-mdp"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md dark:text-gray-300 dark:hover:text-white"
              active-class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              exact-active-class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
            >
              <svg class="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
              <span class="truncate">Changer le mot de passe</span>
            </RouterLink>

            <a v-if="authStore.isAdmin" href="/admin" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
              <svg class="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="truncate">Accès Admin</span>
            </a>
          </nav>
        </aside>

        <main class="lg:col-span-9 mt-10 lg:mt-0">
          <div class="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/20 rounded-lg">
            <RouterView />
          </div>
        </main>

      </div>
    </div>
  </div>
</template>
