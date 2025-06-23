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
  <div class="flex items-center justify-center min-h-screen bg-gray-50 py-12">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Créer un compte</h2>
        <p class="mt-2 text-sm text-gray-600">
          Déjà membre ?
          <RouterLink to="/login" class="font-medium text-green-700 hover:underline">Connectez-vous</RouterLink>
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
          <input v-model="formData.username" type="text" id="username" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="formData.email" type="email" id="email" required autocomplete="email" class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input v-model="formData.password" type="password" id="password" required autocomplete="new-password" class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
          <input v-model="formData.confirmPassword" type="password" id="confirm-password" required autocomplete="new-password" class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
        </div>

        <div v-if="errorMessage" class="p-3 bg-red-50 text-red-700 rounded-md">
          <p class="text-sm whitespace-pre-line">{{ errorMessage }}</p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center px-4 py-3 text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
          >
            {{ isLoading ? 'Création en cours...' : 'Créer mon compte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
