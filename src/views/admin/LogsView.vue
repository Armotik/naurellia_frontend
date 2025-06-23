<script setup>
import { ref, onMounted, watch } from 'vue';
import apiClient from '@/services/api';

// --- State de la Vue ---
const logs = ref([]);
const isLoading = ref(true);
const error = ref(null);

// State pour la pagination
const currentPage = ref(1);
const totalPages = ref(0);
const totalLogs = ref(0);
const limit = 30; // Nombre de logs par page

// State pour les filtres
const filters = ref({
  level: '',
  ip: '',
  message: '',
  // Ajoutez d'autres clés pour chaque filtre que vous voulez
  // ex: city: '', country: '', etc.
});

// Variable pour le "debounce" de la recherche
let searchTimeout = null;

// --- Fonctions ---

// Fonction principale pour récupérer les logs
async function fetchLogs(page = 1) {
  isLoading.value = true;
  error.value = null;

  // Prépare les paramètres de la requête
  const params = {
    page: page,
    limit: limit,
    ...filters.value // Ajoute tous les filtres actifs
  };

  try {
    const response = await apiClient.get('/api/dashboard/logs', { params });
    const result = response.data;

    logs.value = result.data;
    totalLogs.value = result.total;
    totalPages.value = Math.ceil(result.total / result.limit);
    currentPage.value = result.page;

  } catch (err) {
    error.value = "Impossible de charger les logs.";
    console.error("Erreur de chargement des logs:", err);
  } finally {
    isLoading.value = false;
  }
}

watch(filters, () => {
  // On utilise un "debounce" pour la recherche par message pour ne pas surcharger l'API
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchLogs(1); // On retourne toujours à la page 1 quand un filtre change
  }, 300); // Délai de 300ms après la dernière frappe
}, { deep: true });

// Fonctions de pagination
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    fetchLogs(page);
  }
}

// On charge les données au montage du composant
onMounted(() => {
  fetchLogs(1);
});

function formatDate(dateString) {
  if (!dateString) return 'Date inconnue';

  const formattedDateString = dateString.replace(' ', 'T');
  const date = new Date(formattedDateString);

  // Vérifier si la date est valide
  if (isNaN(date.getTime())) return 'Date invalide';

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  return date.toLocaleDateString('fr-FR', options);
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Explorateur de Logs</h1>
    <p class="text-gray-600 mb-8">Analysez toutes les activités du site en détail.</p>

    <div class="p-4 bg-white rounded-lg shadow-sm mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select v-model="filters.level" class="block w-full rounded-md border-gray-300 shadow-sm">
          <option value="">Tous les Niveaux</option>
          <option value="INFO">INFO</option>
          <option value="NOTICE">NOTICE</option>
          <option value="WARNING">WARNING</option>
          <option value="ERROR">ERROR</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
        <input v-model.lazy="filters.ip" type="text" placeholder="Filtrer par IP..." class="block w-full rounded-md border-gray-300 shadow-sm">
        <input v-model="filters.message" type="text" placeholder="Chercher dans les messages..." class="block w-full rounded-md border-gray-300 shadow-sm">
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-16">
      <p class="text-gray-500">Chargement des logs...</p>
    </div>
    <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-700">{{ error }}</div>

    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source (IP)</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="logs.length === 0">
          <td colspan="5" class="px-6 py-16 text-center text-gray-500">Aucun log ne correspond à vos critères.</td>
        </tr>
        <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(log.created_at) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">{{ log.level }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.user?.email || 'Anonyme' }}</td>
          <td class="px-6 py-4 text-sm text-gray-800">{{ log.message }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.context.request?.ip || 'N/A' }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Page <span class="font-medium">{{ currentPage }}</span> sur <span class="font-medium">{{ totalPages }}</span> ({{ totalLogs }} résultats)
      </div>
      <div class="flex gap-2">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1" class="px-4 py-2 text-sm font-medium bg-white border rounded-md disabled:opacity-50">Précédent</button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages" class="px-4 py-2 text-sm font-medium bg-white border rounded-md disabled:opacity-50">Suivant</button>
      </div>
    </div>
  </div>
</template>
