<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';

const stats = ref({ totalUsers: 0, visitsToday: 0, latestLogs: [] });
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await apiClient.get('/api/dashboard/stats');
    stats.value = response.data;
  } catch (err) {
    error.value = "Impossible de charger les statistiques du tableau de bord.";
    console.error("Erreur de chargement des statistiques:", err);
  } finally {
    isLoading.value = false;
  }
});

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleString('fr-FR', options);
}

function getLevelClass(level) {
  const levelMap = {
    'INFO': 'bg-blue-100 text-blue-800',
    'NOTICE': 'bg-green-100 text-green-800',
    'WARNING': 'bg-yellow-100 text-yellow-800',
    'ERROR': 'bg-red-100 text-red-800',
    'CRITICAL': 'bg-red-200 text-red-900 font-bold',
  };
  return levelMap[level] || 'bg-gray-100 text-gray-800';
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Tableau de Bord</h1>

    <div v-if="isLoading" class="text-center text-gray-500">Chargement des données...</div>
    <div v-else-if="error" class="bg-red-50 text-red-700 p-4 rounded-md">{{ error }}</div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider">Utilisateurs Total</h3>
          <p class="mt-1 text-4xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider">Visites Aujourd'hui</h3>
          <p class="mt-1 text-4xl font-semibold text-gray-900">{{ stats.visitsToday }}</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Dernières Activités</h2>
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="stats.latestLogs.length === 0">
              <td colspan="5" class="px-6 py-10 text-center text-gray-500">Aucune activité récente.</td>
            </tr>
            <tr v-for="log in stats.latestLogs" :key="log.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(log.createdAt) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getLevelClass(log.level)">
                    {{ log.level }}
                  </span>
              </td>
              <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">{{ log.message }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.user?.email || 'Anonyme' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.context.request?.ip || 'N/A' }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
