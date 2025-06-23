<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';

const users = ref([]);
const isLoading = ref(true);
const error = ref(null);

// State pour la modale d'édition
const isModalOpen = ref(false);
const currentUser = ref(null);

// Rôles disponibles dans le système
const availableRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'];

async function fetchUsers() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await apiClient.get('/api/users');
    users.value = response.data['hydra:member'] || response.data;
  } catch (err) {
    error.value = "Impossible de charger la liste des utilisateurs.";
    console.error("Erreur de chargement des utilisateurs:", err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchUsers);

function openEditModal(user) {
  // On crée une copie pour ne pas modifier l'original directement
  currentUser.value = { ...user };
  isModalOpen.value = true;
}

async function handleUpdateUser() {
  if (!currentUser.value) return;

  try {
    // On prépare le payload avec uniquement les données modifiables
    const payload = {
      roles: currentUser.value.roles
    };
    await apiClient.put(`/api/users/${currentUser.value.id}`, payload);

    // On rafraîchit la liste après la mise à jour
    await fetchUsers();
    isModalOpen.value = false;
  } catch (err) {
    console.error("Erreur de mise à jour de l'utilisateur:", err);
    alert("La mise à jour a échoué.");
  }
}

async function deleteUser(userId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) return;
  try {
    await apiClient.delete(`/api/users/${userId}`);
    await fetchUsers(); // Rafraîchir la liste
  } catch (err) {
    console.error("Erreur de suppression de l'utilisateur:", err);
    alert("Vous n'avez pas les droits nécessaires.");
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

async function toggleVerifiedStatus(user) {
  try {
    const payload = { isVerified: !user.isVerified };
    await apiClient.patch(`/api/users/${user.id}`, payload, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    });
    user.isVerified = !user.isVerified;
  } catch (err) {
    console.error("Erreur lors du changement de statut de vérification:", err);
    alert("La modification a échoué.");
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Gestion des Utilisateurs</h1>

    <div v-if="isLoading" class="text-center py-10">Chargement...</div>
    <div v-else-if="error" class="bg-red-50 text-red-700 p-4 rounded-md">{{ error }}</div>

    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôles</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inscrit le</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Vérifié</th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
            <div class="text-sm text-gray-500">{{ user.email }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span v-for="role in user.roles" :key="role" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-1"
                    :class="{'bg-green-100 text-green-800': role === 'ROLE_USER', 'bg-blue-100 text-blue-800': role === 'ROLE_ADMIN', 'bg-purple-100 text-purple-800': role === 'ROLE_SUPER_ADMIN'}">
                {{ role.replace('ROLE_', '') }}
              </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.createdAt) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-center">
            <label :for="'verified-' + user.id" class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" :id="'verified-' + user.id" class="sr-only peer" :checked="user.isVerified" @change="toggleVerifiedStatus(user)">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ user.isVerified ? 'Vérifié' : 'Non vérifié' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button @click="openEditModal(user)" class="text-indigo-600 hover:text-indigo-900">Modifier</button>
            <button @click="deleteUser(user.id)" class="ml-4 text-red-600 hover:text-red-900">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50" @click.self="isModalOpen = false">
      <div v-if="currentUser" class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-6">Modifier les rôles de {{ currentUser.username }}</h2>
        <form @submit.prevent="handleUpdateUser">
          <div class="space-y-2">
            <p class="text-sm font-medium text-gray-700">Rôles :</p>
            <div v-for="role in availableRoles" :key="role" class="flex items-center">
              <input :id="role" type="checkbox" :value="role" v-model="currentUser.roles" class="h-4 w-4 text-indigo-600 border-gray-300 rounded">
              <label :for="role" class="ml-3 block text-sm text-gray-900">{{ role }}</label>
            </div>
          </div>
          <div class="mt-8 flex justify-end gap-4">
            <button @click="isModalOpen = false" type="button" class="px-4 py-2 bg-gray-200 rounded-md">Annuler</button>
            <button type="submit" class="px-4 py-2 bg-green-700 text-white rounded-md">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
