import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('system');

  const updateDOM = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Logique principale pour déterminer et appliquer le thème
  const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // On met à jour la préférence actuelle de l'utilisateur
    theme.value = savedTheme || 'system';

    // On applique le thème
    if (theme.value === 'dark') {
      updateDOM(true);
    } else if (theme.value === 'light') {
      updateDOM(false);
    } else {
      // Si c'est 'system', on se base sur la préférence de l'OS
      updateDOM(systemPrefersDark);
    }
  };

  // Action appelée par le bouton pour changer de thème
  const setTheme = (newTheme) => {
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', newTheme);
    }
    applyTheme(); // On applique immédiatement le nouveau thème
  };

  // Initialise le thème au chargement et écoute les changements du système
  const initTheme = () => {
    applyTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      // On ré-applique le thème uniquement si l'utilisateur est en mode "système"
      if (theme.value === 'system') {
        applyTheme();
      }
    });
  };

  return { theme, initTheme, setTheme };
});
