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
  <div class="max-w-xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold mb-8">Changer mon mot de passe</h1>
    <form @submit.prevent="handleChangePassword" class="space-y-6 bg-white p-8 shadow-md rounded-lg">
      <!-- Mot de passe actuel -->
      <div class="p-4 border border-gray-200 rounded-lg">
        <label for="old-password" class="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
        <p class="text-xs text-gray-500 mb-2">Saisissez votre mot de passe actuel pour confirmer votre identité</p>
        <input v-model="formData.oldPassword" type="password" id="old-password" required
               class="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>

      <!-- Nouveau mot de passe -->
      <div class="p-4 border border-green-200 rounded-lg bg-green-50">
        <label for="new-password" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
        <p class="text-xs text-gray-500 mb-2">Créez un nouveau mot de passe différent de l'ancien</p>
        <input v-model="formData.newPassword" type="password" id="new-password" required
               class="mt-1 w-full border-green-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500">
      </div>

      <!-- Confirmation du nouveau mot de passe -->
      <div class="p-4 border border-green-200 rounded-lg bg-green-50">
        <label for="confirm-new-password" class="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
        <p class="text-xs text-gray-500 mb-2">Saisissez à nouveau votre nouveau mot de passe pour vérification</p>
        <input v-model="formData.confirmNewPassword" type="password" id="confirm-new-password" required
               class="mt-1 w-full border-green-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500">
      </div>

      <div v-if="successMessage" class="p-3 bg-green-50 text-green-700 rounded-md">{{ successMessage }}</div>
      <div v-if="errorMessage" class="p-3 bg-red-50 text-red-700 rounded-md whitespace-pre-line">{{ errorMessage }}</div>

      <div>
        <button type="submit" :disabled="isLoading" class="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50">
          {{ isLoading ? 'Enregistrement...' : 'Mettre à jour' }}
        </button>
      </div>
    </form>
  </div>
</template>
