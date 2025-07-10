<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, RouterLink } from 'vue-router';
import apiClient from '@/services/api.js'
import { activityLogger } from '@/services/activityLogger'

const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
});

if (authStore.isAuthenticated) {
  // Si l'utilisateur est déjà connecté, on le redirige vers la page d'accueil
  router.push('/');
}

const errorMessage = ref('');
const isLoading = ref(false);

async function handleRegister() {
  errorMessage.value = '';

  // 1. Validation côté client (simple mais utile)
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.';
    return;
  }

  isLoading.value = true;

  try {
    // 2. Préparer les données pour l'API
    const payload = {
      email: formData.value.email,
      username: formData.value.username,
      plainPassword: formData.value.password
    };

    // 3. Appeler l'endpoint de création d'utilisateur
    await apiClient.post('/api/users', payload);

    // On ne connecte plus automatiquement.
    // On redirige vers une page qui dit "Vérifiez vos emails".

    await activityLogger.log('NOTICE', "New user registration", {
      email: formData.value.email,
      username: formData.value.username
    });
    await router.push('/verifier-email');

  } catch (error) {
    if (error.response && error.response.data && error.response.data.violations) {
      // Affiche les erreurs de validation de l'API (ex: email déjà utilisé)
      errorMessage.value = error.response.data.violations.map(v => v.message).join('\n');
    } else {
      errorMessage.value = 'Une erreur est survenue lors de la création de votre compte.';
    }
    console.error('Registration error:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">Créer un compte</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Déjà membre ?
          <RouterLink to="/login" class="font-medium text-green-700 hover:underline dark:text-green-500 dark:hover:text-green-400">Connectez-vous</RouterLink>
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom d'utilisateur</label>
          <input v-model="formData.username" type="text" id="username" required class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600">
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input v-model="formData.email" type="email" id="email" required autocomplete="email" class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600">
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</label>
          <input v-model="formData.password" type="password" id="password" required autocomplete="new-password" class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600">
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le mot de passe</label>
          <input v-model="formData.confirmPassword" type="password" id="confirm-password" required autocomplete="new-password" class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600">
        </div>

        <div v-if="errorMessage" class="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
          <p class="text-sm whitespace-pre-line">{{ errorMessage }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            En vous inscrivant, vous acceptez nos
            <RouterLink to="/terms" class="font-medium text-green-700 hover:underline dark:text-green-500 dark:hover:text-green-400">Conditions d'utilisation</RouterLink> et notre
            <RouterLink to="/privacy" class="font-medium text-green-700 hover:underline dark:text-green-500 dark:hover:text-green-400">Politique de confidentialité</RouterLink>.
          </p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center px-4 py-3 text-white bg-green-700 dark:bg-green-600 rounded-md hover:bg-green-800 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:bg-green-400"
          >
            {{ isLoading ? 'Création en cours...' : 'Créer mon compte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
