import { defineStore } from 'pinia'
import apiClient from '@/services/api'
import { jwtDecode } from 'jwt-decode'
import { activityLogger } from '@/services/activityLogger' // On importe notre logger

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('user-token') || null,
    user: JSON.parse(localStorage.getItem('user-data')) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isAdmin: (state) => state.user?.roles.includes('ROLE_ADMIN'),
    isVerified: (state) => state.user?.isVerified,
  },
  actions: {
    /**
     * Tente de connecter l'utilisateur. Appelé uniquement par le formulaire de connexion.
     */
    async login(credentials) {
      // On s'assure d'être dans un état propre, mais sans logger de déconnexion ici.
      this.token = null
      this.user = null
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-data')

      try {
        const response = await apiClient.post('/api/login_check', credentials)
        const token = response.data.token
        const userData = jwtDecode(token)

        localStorage.setItem('user-token', token)
        localStorage.setItem('user-data', JSON.stringify(userData))

        this.token = token
        this.user = userData

        await activityLogger.log('NOTICE', 'User logged in successfully', {
          email: this.user.email,
        })

        return { success: true }
      } catch (error) {
        // On logue également les tentatives de connexion échouées.

        if (error.response && error.response.status === 401) {
          await activityLogger.log('WARNING', 'Failed login attempt due to unauthorized access', {
            attemptedEmail: credentials.username,
            error: error.response.data.message || 'Unauthorized',
          });

          return { success: false, message: error.response.data.message || 'Compte non autorisé.' }
        }

        await activityLogger.log('WARNING', 'Failed login attempt', { attemptedEmail: credentials.username });

        console.error('Erreur de connexion :', error)
        return { success: false, message: 'Email ou mot de passe incorrect.' }
      }
    },


    logout() {
      const userEmail = this.user?.email; // On sauvegarde l'email avant de tout effacer

      // On s'assure de ne logger que si un utilisateur était vraiment connecté
      if (this.token && userEmail) {
        activityLogger.log('NOTICE', 'User logged out', { email: userEmail });
      }

      this.token = null;
      this.user = null;
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-data');
    },
  },
})

