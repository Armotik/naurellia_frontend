// src/composables/useKonamiCode.js
import { onMounted, onUnmounted, ref } from 'vue';

export function useKonamiCode(callback) {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const userInput = ref([]);

  const onKeyDown = (event) => {
    userInput.value.push(event.key);

    // On ne garde que les 10 dernières touches pour correspondre à la longueur du code
    if (userInput.value.length > konamiCode.length) {
      userInput.value.shift();
    }

    // On vérifie si la séquence correspond
    if (userInput.value.join('') === konamiCode.join('')) {
      callback(); // On déclenche l'action !
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown);
  });
}
