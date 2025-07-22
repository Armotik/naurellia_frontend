<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import apiClient from '@/services/api';
import { useRouter } from 'vue-router';
import { activityLogger } from "@/services/activityLogger.js"

const authStore = useAuthStore();
const router = useRouter();
const showDeleteModal = ref(false);
const isDeleting = ref(false);
const confirmationText = ref('');

const deleteAccount = async () => {
  if (confirmationText.value !== 'SUPPRIMER') {
    return;
  }

  isDeleting.value = true;

  try {
    await apiClient.delete(`/api/users/${authStore.user.id}`);

    activityLogger.log('NOTICE', "User account deleted", {
      userId: authStore.user.id,
      username: authStore.user.username,
      email: authStore.user.email
    });

    // Déconnexion et redirection vers la page d'accueil
    authStore.logout();
    router.push('/');

    // Notification de succès (vous pouvez adapter selon votre système de notifications)
    alert('Votre compte a été supprimé avec succès.');

  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error);
    alert('Erreur lors de la suppression du compte. Veuillez réessayer.');
  } finally {
    isDeleting.value = false;
    showDeleteModal.value = false;
    confirmationText.value = '';
  }
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  confirmationText.value = '';
};
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">

        <aside class="lg:col-span-3">
          <nav class="space-y-1">
            <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Mon Compte
            </h3>
            <RouterLink
              to="/mon-compte"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md dark:text-gray-300 dark:hover:text-white"
              active-class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              exact-active-class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
            >
              <svg class="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              <span class="truncate">Tableau de bord</span>
            </RouterLink>
            <RouterLink
              to="/mon-compte/changer-mdp"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md dark:text-gray-300 dark:hover:text-white"
              active-class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              exact-active-class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
            >
              <svg class="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
              <span class="truncate">Changer le mot de passe</span>
            </RouterLink>

            <!-- Bouton de suppression de compte (uniquement pour les non-admins) -->
            <button
              v-if="!authStore.isAdmin"
              @click="openDeleteModal"
              class="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-900 dark:hover:text-red-300"
            >
              <svg class="text-red-400 group-hover:text-red-500 dark:text-red-500 dark:group-hover:text-red-300 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              <span class="truncate">Supprimer mon compte</span>
            </button>

            <a v-if="authStore.isAdmin" href="/admin" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
              <svg class="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="truncate">Accès Admin</span>
            </a>
          </nav>
        </aside>

        <main class="lg:col-span-9 mt-10 lg:mt-0">
          <div class="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/20 rounded-lg">
            <RouterView />
          </div>
        </main>

      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Supprimer le compte
              </h3>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </p>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3 mb-4">
              <p class="text-sm text-yellow-800 dark:text-yellow-200">
                Pour confirmer, veuillez taper <strong class="font-semibold">SUPPRIMER</strong> ci-dessous :
              </p>
            </div>
            <input
              v-model="confirmationText"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white text-sm"
              placeholder="SUPPRIMER"
            />
          </div>

          <div class="flex space-x-3">
            <button
              @click="closeDeleteModal"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Annuler
            </button>
            <button
              @click="deleteAccount"
              :disabled="confirmationText !== 'SUPPRIMER' || isDeleting"
              class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
            >
              {{ isDeleting ? 'Suppression...' : 'Supprimer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
