<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const credentials = ref({
  username: '', // La clé est bien "username" pour correspondre à Symfony
  password: ''
});

const errorMessage = ref('');
const isLoading = ref(false);

async function handleLogin() {
  errorMessage.value = '';
  isLoading.value = true;

  // On récupère l'objet de résultat complet du store
  const result = await authStore.login(credentials.value);

  isLoading.value = false;

  // CORRECTION : On ne redirige que si le login a réussi.
  if (result.success) {
    await router.push('/');
  } else {
    // Sinon, on affiche le message d'erreur spécifique renvoyé par le store.
    errorMessage.value = result.message;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <!-- Champ Email / Username -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Email</label>
          <!-- On lie le v-model à credentials.username -->
          <input v-model="credentials.username" type="email" id="username" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
        </div>
        <!-- Champ Mot de passe -->
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input v-model="credentials.password" type="password" id="password" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
        </div>
        <!-- Message d'erreur -->
        <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
        <!-- Bouton de soumission -->
        <div class="mt-6">
          <button type="submit" class="w-full px-4 py-2 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
