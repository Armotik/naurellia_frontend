<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import apiClient from '@/services/api';
import { activityLogger } from '@/services/activityLogger';

const authStore = useAuthStore();
const isResendingEmail = ref(false);
const resendMessage = ref('');
const resendError = ref('');

const resendVerificationEmail = async () => {
  isResendingEmail.value = true;
  resendMessage.value = '';
  resendError.value = '';

  try {
    await apiClient.post('/api/users/resend-verification', {
      email: authStore.user.email
    });

    resendMessage.value = 'Email de vérification envoyé avec succès !';

    await activityLogger.log('NOTICE', 'Verification email resent', {
      userId: authStore.user.id,
      email: authStore.user.email
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    resendError.value = error.response.data.error || 'Une erreur est survenue lors de l\'envoi de l\'email de vérification. Veuillez réessayer plus tard.';
  } finally {
    isResendingEmail.value = false;
  }
};

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getRoleDisplayName = (role) => {
  const roleMap = {
    'ROLE_USER': 'Utilisateur',
    'ROLE_ADMIN': 'Administrateur',
    'ROLE_MODERATOR': 'Modérateur'
  };
  return roleMap[role] || role;
};
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Tableau de bord
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Bienvenue, {{ authStore.user.username }} !
      </p>
    </div>

    <!-- Statut du compte -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Statut de vérification -->
      <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg v-if="authStore.isVerified" class="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <svg v-else class="h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Vérification
            </h3>
            <p class="text-sm" :class="authStore.isVerified ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'">
              {{ authStore.isVerified ? 'Compte vérifié' : 'En attente de vérification' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Informations du compte -->
      <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Compte actif
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Depuis {{ formatDate(authStore.user.iat) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Rôles -->
      <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3.75 5.25v3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Privilèges
            </h3>
            <div class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="role in authStore.user.roles"
                :key="role"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'"
              >
                {{ getRoleDisplayName(role) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerte pour compte non vérifié -->
    <div v-if="!authStore.isVerified" class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-8">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <h3 class="text-sm font-medium text-orange-800 dark:text-orange-200">
            Compte non vérifié
          </h3>
          <div class="mt-2 text-sm text-orange-700 dark:text-orange-300">
            <p>
              Votre compte n'est pas encore vérifié. Vérifiez votre boîte mail pour le lien de vérification.
              Si vous n'avez pas reçu d'email, vous pouvez en demander un nouveau.
            </p>
          </div>
          <div class="mt-4">
            <button
              @click="resendVerificationEmail"
              :disabled="isResendingEmail"
              class="bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-md text-sm font-medium text-orange-800 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isResendingEmail ? 'Envoi en cours...' : 'Renvoyer l\'email de vérification' }}
            </button>
          </div>

          <!-- Messages de retour -->
          <div v-if="resendMessage" class="mt-3 text-sm text-green-700 dark:text-green-400">
            {{ resendMessage }}
          </div>
          <div v-if="resendError" class="mt-3 text-sm text-red-700 dark:text-red-400">
            {{ resendError }}
          </div>
        </div>
      </div>
    </div>

    <!-- Informations détaillées du compte -->
    <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Informations du compte
      </h2>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Nom d'utilisateur</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ authStore.user.username }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ authStore.user.email }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">ID utilisateur</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white">#{{ authStore.user.id }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Compte créé le</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatDate(authStore.user.iat) }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
