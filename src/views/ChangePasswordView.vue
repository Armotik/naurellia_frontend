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
  <div class="max-w-xl mx-auto py-12 px-4 bg-gray-50 dark:bg-gray-900">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Changer mon mot de passe</h1>
    <form @submit.prevent="handleChangePassword" class="space-y-6 bg-white dark:bg-gray-800 p-8 shadow-md dark:shadow-gray-900/30 rounded-lg">
      <!-- Mot de passe actuel -->
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-750">
        <label for="old-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe actuel</label>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Saisissez votre mot de passe actuel pour confirmer votre identité</p>
        <input v-model="formData.oldPassword" type="password" id="old-password" required
               class="mt-1 w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400">
      </div>

      <!-- Nouveau mot de passe -->
      <div class="p-4 border border-green-200 dark:border-green-900 rounded-lg bg-green-50 dark:bg-green-900/20">
        <label for="new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nouveau mot de passe</label>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Créez un nouveau mot de passe différent de l'ancien</p>
        <input v-model="formData.newPassword" type="password" id="new-password" required
               class="mt-1 w-full border-green-300 dark:border-green-700 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400">
      </div>

      <!-- Confirmation du nouveau mot de passe -->
      <div class="p-4 border border-green-200 dark:border-green-900 rounded-lg bg-green-50 dark:bg-green-900/20">
        <label for="confirm-new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le nouveau mot de passe</label>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Saisissez à nouveau votre nouveau mot de passe pour vérification</p>
        <input v-model="formData.confirmNewPassword" type="password" id="confirm-new-password" required
               class="mt-1 w-full border-green-300 dark:border-green-700 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400">
      </div>

      <div v-if="successMessage" class="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md">{{ successMessage }}</div>
      <div v-if="errorMessage" class="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md whitespace-pre-line">{{ errorMessage }}</div>

      <div>
        <button type="submit" :disabled="isLoading" class="px-6 py-2 bg-green-700 dark:bg-green-600 text-white rounded-md hover:bg-green-800 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50">
          {{ isLoading ? 'Enregistrement...' : 'Mettre à jour' }}
        </button>
      </div>
    </form>
  </div>
</template>
