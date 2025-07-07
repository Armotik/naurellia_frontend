import apiClient from './api';
import router from '@/router'; // Importation du routeur
import { useAuthStore } from '@/stores/auth'; // Importation du store d'authentification

const FRONTEND_API_KEY = import.meta.env.VITE_FRONTEND_API_KEY;

class ActivityLogger {
  async log(level, message, context = {}) {
    if (!FRONTEND_API_KEY) {
      console.warn('Frontend API Key is not defined. Logging is disabled.');
      return;
    }

    // Vérifier si la route actuelle commence par /admin/
    const currentPath = router.currentRoute.value.path;

    // Récupérer le store d'authentification
    const authStore = useAuthStore();

    // Cas spécial: logger les tentatives d'accès non autorisé aux pages admin
    if (currentPath.startsWith('/admin/') && (!authStore.isAuthenticated || !authStore.isAdmin)) {
      // On log explicitement cette tentative comme une alerte de sécurité
      return apiClient.post('/api/logs/frontend', {
        level: 'WARNING',
        message: 'Tentative d\'accès non autorisé à une page admin',
        context: {
          ...context,
          path: currentPath,
          isAuthenticated: authStore.isAuthenticated,
          userId: authStore.user?.id || null
        }
      }, {
        headers: {
          'X-API-KEY': FRONTEND_API_KEY
        }
      });
    }

    // Ne pas logger si:
    // 1. L'URL commence par /admin/ ET l'utilisateur est admin authentifié
    // 2. L'utilisateur est connecté ET est un administrateur (peu importe la page)
    if ((currentPath.startsWith('/admin/') && authStore.isAuthenticated && authStore.isAdmin)) {
      // Ne pas logger les activités normales des administrateurs
      return;
    }

    try {
      // MODIFICATION ICI : On ajoute "return" pour pouvoir attendre la fin de cette promesse.
      return apiClient.post('/api/logs/frontend', {
        level,
        message,
        context,
      }, {
        headers: {
          'X-API-KEY': FRONTEND_API_KEY
        }
      });
    } catch (error) {
      console.warn('Activity Logger failed:', error);
    }
  }
}

export const activityLogger = new ActivityLogger();
