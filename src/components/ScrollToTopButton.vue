<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-2 scale-95"
  >
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
      :title="buttonTitle"
      aria-label="Retour en haut de la page"
    >
      <svg
        class="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 11l5-5 5 5M7 18l5-5 5 5"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  showAfterScroll: {
    type: Number,
    default: 300
  },
  buttonTitle: {
    type: String,
    default: 'Retour en haut de la page'
  }
})

// État réactif
const showButton = ref(false)

// Fonction de scroll vers le haut
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Fonction pour gérer le scroll
const handleScroll = () => {
  showButton.value = window.scrollY > props.showAfterScroll
}

// Optimisation avec throttle
let ticking = false
const throttledHandleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', throttledHandleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledHandleScroll)
})
</script>
