<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api';

const formData = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});

const successMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

async function handleChangePassword() {
  successMessage.value = '';
  errorMessage.value = '';
  if (formData.value.newPassword !== formData.value.confirmNewPassword) {
    errorMessage.value = "Le nouveau mot de passe et sa confirmation ne correspondent pas.";
    return;
  }

  isLoading.value = true;
  try {
    const payload = {
      oldPassword: formData.value.oldPassword,
      newPassword: formData.value.newPassword
    };
    await apiClient.post('/api/users/change-password', payload);
    successMessage.value = "Votre mot de passe a été modifié avec succès !";
    formData.value = { oldPassword: '', newPassword: '', confirmNewPassword: '' }; // Reset form
  } catch (error) {
    if (error.response && error.response.data.violations) {
      errorMessage.value = error.response.data.violations.map(v => v.message).join('\n');
    } else {
      errorMessage.value = "Une erreur est survenue.";
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Changer mon mot de passe</h1>
      <p class="text-gray-600 dark:text-gray-400">Modifiez votre mot de passe actuel</p>
    </div>

    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8">
      <form @submit.prevent="handleChangePassword" class="space-y-8">
        <!-- Mot de passe actuel -->
        <div class="space-y-3">
          <label for="old-password" class="block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Mot de passe actuel
          </label>
          <input
            v-model="formData.oldPassword"
            type="password"
            id="old-password"
            required
            placeholder="Saisissez votre mot de passe actuel"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          >
        </div>

        <!-- Nouveau mot de passe -->
        <div class="space-y-3">
          <label for="new-password" class="block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Nouveau mot de passe
          </label>
          <input
            v-model="formData.newPassword"
            type="password"
            id="new-password"
            required
            placeholder="Créez un nouveau mot de passe"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          >
        </div>

        <!-- Confirmation du nouveau mot de passe -->
        <div class="space-y-3">
          <label for="confirm-new-password" class="block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Confirmer le nouveau mot de passe
          </label>
          <input
            v-model="formData.confirmNewPassword"
            type="password"
            id="confirm-new-password"
            required
            placeholder="Confirmez votre nouveau mot de passe"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          >
        </div>

        <!-- Messages -->
        <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg text-sm">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg text-sm whitespace-pre-line">
          {{ errorMessage }}
        </div>

        <!-- Bouton -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {{ isLoading ? 'Enregistrement...' : 'Mettre à jour le mot de passe' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
