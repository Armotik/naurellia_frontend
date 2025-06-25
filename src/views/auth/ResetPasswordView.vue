<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import apiClient from '@/services/api';

const route = useRoute();

const token = ref('');
const password = ref('');
const confirmPassword = ref('');
const message = ref('');
const error = ref('');
const isLoading = ref(false);

onMounted(() => {
  // On récupère le token depuis les paramètres de la query dans l'URL
  token.value = route.query.token || '';
  if (!token.value) {
    error.value = "Le lien de réinitialisation est invalide ou a expiré.";
  }
});

async function handleResetPassword() {
  message.value = '';
  error.value = '';
  if (password.value !== confirmPassword.value) {
    error.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  isLoading.value = true;
  try {
    const payload = {
      token: token.value,
      password: password.value
    };
    await apiClient.post('/api/reset-password/reset', payload);
    message.value = "Votre mot de passe a été réinitialisé avec succès ! Vous pouvez maintenant vous connecter.";
  } catch (err) {
    error.value = err.response?.data?.message || "Le lien de réinitialisation est invalide ou a expiré.";
    console.error("Reset password error:", err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/20">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Réinitialiser votre mot de passe</h2>

      <div v-if="!token || error" class="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-center">
        <p>{{ error || 'Token invalide.' }}</p>
        <RouterLink to="/login" class="mt-4 inline-block font-medium text-red-700 dark:text-red-400 hover:underline">Retour à la connexion</RouterLink>
      </div>

      <div v-else-if="message" class="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-md text-center">
        <p>{{ message }}</p>
        <RouterLink to="/login" class="mt-4 inline-block font-medium text-green-700 dark:text-green-400 hover:underline">Se connecter</RouterLink>
      </div>

      <form v-else @submit.prevent="handleResetPassword" class="space-y-6">
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nouveau mot de passe</label>
          <input v-model="password" type="password" id="new-password" required class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le mot de passe</label>
          <input v-model="confirmPassword" type="password" id="confirm-password" required class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
          <button type="submit" :disabled="isLoading" class="w-full px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-70">
            {{ isLoading ? 'Enregistrement...' : 'Réinitialiser le mot de passe' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
