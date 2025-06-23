<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import apiClient from '@/services/api';

const email = ref('');
const message = ref('');
const isLoading = ref(false);

async function handleRequestReset() {
  isLoading.value = true;
  message.value = '';
  try {
    await apiClient.post('/api/reset-password/request', { email: email.value });
    // On affiche toujours le même message de succès pour ne pas révéler si un email existe ou non dans la base.
    message.value = "Si un compte est associé à cet email, un lien de réinitialisation vient de vous être envoyé.";
  } catch (error) {
    // Même en cas d'erreur, on affiche un message générique pour la sécurité.
    message.value = "Si un compte est associé à cet email, un lien de réinitialisation vient de vous être envoyé. Cela peut prendre quelques minutes.";
    console.error("Forgot password error:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Mot de passe oublié</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Saisissez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>

      <div v-if="message" class="p-4 bg-green-50 text-green-800 rounded-md text-center">
        <p>{{ message }}</p>
        <RouterLink to="/login" class="mt-4 inline-block font-medium text-green-700 hover:underline">Retour à la connexion</RouterLink>
      </div>

      <form v-else @submit.prevent="handleRequestReset" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" id="email" required autocomplete="email" class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
        </div>
        <div>
          <button type="submit" :disabled="isLoading" class="w-full px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-800">
            {{ isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
