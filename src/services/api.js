// src/services/api.js
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.js'

// On crée une instance d'Axios
const apiClient = axios.create({
  baseURL: 'https://127.0.0.1:8000', // L'URL de votre API Symfony
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  config => {
    // On ne récupère le store qu'à l'intérieur pour éviter les soucis d'initialisation
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  // Si la réponse est un succès (code 2xx), on la retourne sans rien faire.
  response => response,

  // Si la réponse est une erreur...
  error => {
    // On vérifie si l'erreur est une erreur 401 Unauthorized.
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();

      if (window.location.pathname !== '/login') {
        console.warn('Session expirée ou token invalide. Déconnexion et redirection...');

        // On déconnecte l'utilisateur (nettoyage du state et du localStorage)
        authStore.logout();

        // On redirige vers la page de connexion
        window.location.href = '/login?sessionExpired=true';
      }
    }

    // Pour toutes les autres erreurs, on les laisse se propager pour être
    // traitées par le bloc catch() de l'appel initial.
    return Promise.reject(error);
  }
);


export default apiClient;
