<script setup>
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
</script>

<template>
  <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-full p-1">
    <!-- Soleil (thème clair) -->
    <button @click="themeStore.setTheme('light')" class="p-1.5 rounded-full" :class="themeStore.theme === 'light' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'" title="Thème clair">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>
    </button>
    <!-- Croissant de lune (thème sombre) -->
    <button @click="themeStore.setTheme('dark')" class="p-1.5 rounded-full" :class="themeStore.theme === 'dark' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'" title="Thème sombre">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
      </svg>
    </button>
    <!-- Ordinateur (préférence système) -->
    <button @click="themeStore.setTheme('system')" class="p-1.5 rounded-full" :class="themeStore.theme === 'system' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'" title="Thème système">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
