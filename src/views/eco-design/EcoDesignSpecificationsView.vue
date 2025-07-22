<template>
  <div class="bg-stone-50 dark:bg-gray-900 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back to overview link -->
      <router-link
        to="/politique-ecoconception"
        class="text-emerald-700 dark:text-emerald-400 hover:underline mb-4 inline-block"
      >
        ← Retour à la politique d'écoconception
      </router-link>

      <section id="specifications" class="mb-12">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">
          Spécifications
        </h2>
        <div class="text-center text-gray-500 dark:text-gray-400">
          À venir
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = "Spécifications - Politique d'Éco-conception - Naurellia"
})
</script>

