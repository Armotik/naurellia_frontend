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

// Fonction pour déterminer la classe CSS en fonction du niveau de log
function getLogLevelClass(level) {
  switch (level) {
    case 'DEBUG':
      return 'text-gray-500 dark:text-gray-400';
    case 'INFO':
      return 'text-blue-600 dark:text-blue-400';
    case 'NOTICE':
      return 'text-green-600 dark:text-green-400';
    case 'WARNING':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'ERROR':
      return 'text-red-600 dark:text-red-400';
    case 'CRITICAL':
      return 'text-purple-700 dark:text-purple-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

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

// Fonction pour afficher l'utilisateur
function displayUser(log) {
  // Utiliser user_email qui est disponible directement dans l'objet log
  return log.user_email || 'Anonyme';
}
</script>

<template>
  <div class="dark:bg-gray-900">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Explorateur de Logs</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">Analysez toutes les activités du site en détail.</p>

    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select v-model="filters.level" class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white">
          <option value="">Tous les Niveaux</option>
          <option value="DEBUG">DEBUG</option>
          <option value="INFO">INFO</option>
          <option value="NOTICE">NOTICE</option>
          <option value="WARNING">WARNING</option>
          <option value="ERROR">ERROR</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
        <input v-model.lazy="filters.ip" type="text" placeholder="Filtrer par IP..." class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400">
        <input v-model="filters.message" type="text" placeholder="Chercher dans les messages..." class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400">
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-16">
      <p class="text-gray-500 dark:text-gray-400">Chargement des logs...</p>
    </div>
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-700 dark:text-red-400">{{ error }}</div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Niveau</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Utilisateur</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Source (IP)</th>
        </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-if="logs.length === 0">
          <td colspan="5" class="px-6 py-16 text-center text-gray-500 dark:text-gray-400">Aucun log ne correspond à vos critères.</td>
        </tr>
        <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ formatDate(log.created_at) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold" :class="getLogLevelClass(log.level)">{{ log.level }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ displayUser(log) }}</td>
          <td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{{ log.message }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ log.context.request?.ip || 'N/A' }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Page <span class="font-medium">{{ currentPage }}</span> sur <span class="font-medium">{{ totalPages }}</span> ({{ totalLogs }} résultats)
      </div>
      <div class="flex gap-2">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1" class="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600">Précédent</button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages" class="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600">Suivant</button>
      </div>
    </div>
  </div>
</template>
