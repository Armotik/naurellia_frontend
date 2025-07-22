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
    await router.push('/mon-compte');
  } else {
    // Sinon, on affiche le message d'erreur spécifique renvoyé par le store.

    errorMessage.value = result.message;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <!-- Champ Email / Username -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <!-- On lie le v-model à credentials.username -->
          <input v-model="credentials.username" type="email" id="username" required class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600">
        </div>
        <!-- Champ Mot de passe -->
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</label>
          <input v-model="credentials.password" type="password" id="password" required class="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600">
        </div>
        <div class="flex items-center justify-end text-sm mt-2">
          <RouterLink to="/mot-de-passe-oublie" class="font-medium text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400 hover:underline">
            Mot de passe oublié ?
          </RouterLink>
        </div>
        <!-- Message d'erreur -->
        <p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
        <!-- Bouton de soumission -->
        <div class="mt-6">
          <button type="submit" class="w-full px-4 py-2 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800">
            Se connecter
          </button>
        </div>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Pas encore de compte ?
        <RouterLink to="/inscription" class="font-medium text-green-700 hover:underline dark:text-green-500 dark:hover:text-green-400">Inscrivez-vous</RouterLink>
      </p>
    </div>
  </div>
</template>
