<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/services/api'

const searchIp = ref('')
const selectedIp = ref(null)
const selectedIpLogs = ref([])
const isLoading = ref(false)
const isSearching = ref(false)
const userEmails = ref({}) // Cache pour stocker les emails des utilisateurs
const searchError = ref('')
const availableIps = ref([]) // Liste des adresses IP disponibles
const isLoadingIps = ref(false) // État de chargement des IPs

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(30)

// Logs regroupés par utilisateur
const groupedLogs = computed(() => {
  if (!selectedIpLogs.value.length) return []

  const groups = {}

  selectedIpLogs.value.forEach(log => {
    const userId = log.user_id || 'anonymous'
    if (!groups[userId]) {
      groups[userId] = {
        userId: userId,
        userName: userId === 'anonymous' ? 'Anonyme' : (userEmails.value[userId] || `ID: ${userId}`),
        logs: []
      }
    }
    groups[userId].logs.push(log)
  })

  return Object.values(groups)
})

// Pagination des logs
const totalPages = computed(() => {
  return Math.ceil(selectedIpLogs.value.length / itemsPerPage.value)
})

const paginatedGroups = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value

  // Créer une version paginée des logs tout en préservant les groupes
  const result = []
  let itemsCount = 0

  for (const group of groupedLogs.value) {
    // Déterminer quels logs de ce groupe sont dans la page actuelle
    const logsInPage = group.logs.filter((_, index) => {
      const absoluteIndex = itemsCount + index
      return absoluteIndex >= startIndex && absoluteIndex < endIndex
    })

    if (logsInPage.length > 0) {
      result.push({
        ...group,
        logs: logsInPage
      })
    }

    itemsCount += group.logs.length
  }

  return result
})

// Fonction pour récupérer la liste des adresses IP disponibles
async function fetchAvailableIps() {
  isLoadingIps.value = true
  try {
    const response = await apiClient.get('/api/dashboard/stats')
    if (response.data && response.data.uniqueIps) {
      // Extraire uniquement les adresses IP du tableau d'objets
      availableIps.value = response.data.uniqueIps.map(item => item.ip_address)
    } else {
      console.warn('Les données d\'IPs uniques sont introuvables dans la réponse:', response.data)
      availableIps.value = []
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des adresses IP:', error)
    availableIps.value = []
  } finally {
    isLoadingIps.value = false
  }
}

// Charger la liste des IPs au montage du composant
onMounted(() => {
  fetchAvailableIps()
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

async function searchIpLogs() {
  if (!searchIp.value.trim()) {
    searchError.value = 'Veuillez entrer une adresse IP'
    return
  }

  // Validation basique de l'IP
  const ipPattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  if (!ipPattern.test(searchIp.value.trim())) {
    searchError.value = 'Format d\'adresse IP invalide'
    return
  }

  isSearching.value = true
  searchError.value = ''
  selectedIp.value = null
  selectedIpLogs.value = []
  currentPage.value = 1

  try {
    const response = await apiClient.get(`/api/dashboard/logs/ip/${searchIp.value.trim()}`)

    if (response.data.length === 0) {
      searchError.value = 'Aucune activité trouvée pour cette adresse IP'
      return
    }

    selectedIp.value = searchIp.value.trim()

    // Initialisation des logs avec la propriété showFullContext
    selectedIpLogs.value = response.data.map((log) => ({
      ...log,
      showFullContext: false, // Par défaut, les détails du contexte sont masqués
    }))

    // Récupérer les emails des utilisateurs pour les logs qui ont un user_id
    const userIdsToFetch = [...new Set(selectedIpLogs.value
      .filter(log => log.user_id && !userEmails.value[log.user_id])
      .map(log => log.user_id))]

    await Promise.all(
      userIdsToFetch.map(async (userId) => {
        await getUserEmail(userId)
      })
    )

  } catch (error) {
    console.error('Erreur lors de la recherche des logs:', error)
    if (error.response?.status === 404) {
      searchError.value = 'Aucune activité trouvée pour cette adresse IP'
    } else {
      searchError.value = 'Erreur lors de la recherche. Veuillez réessayer.'
    }
  } finally {
    isSearching.value = false
  }
}

// Fonction pour gérer le clic sur une adresse IP
function handleIpClick(ip) {
  if (ip && ip !== 'Inconnue' && ip !== selectedIp.value) {
    searchIp.value = ip
    searchIpLogs()
  }
}

// Fonction pour sélectionner une IP dans la liste déroulante
function selectIp(ip) {
  if (ip && ip !== selectedIp.value) {
    searchIp.value = ip
    searchIpLogs()
  }
}

async function getUserEmail(userId) {
  if (userEmails.value[userId]) return userEmails.value[userId]

  try {
    console.log(`Récupération de l'email pour l'utilisateur ${userId}`)
    const response = await apiClient.get(`/api/users/${userId}`)
    if (response.data && response.data.email) {
      console.log(`Email récupéré pour l'utilisateur ${userId}:`, response.data.email)
      userEmails.value[userId] = response.data.email
    } else {
      console.warn(`Pas d'email trouvé pour l'utilisateur ${userId}`, response.data)
      userEmails.value[userId] = `Utilisateur #${userId}`
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'email pour l'utilisateur ${userId}:`, error)
    userEmails.value[userId] = `Utilisateur #${userId}`
  }

  return userEmails.value[userId]
}

function formatDate(dateString) {
  if (!dateString) return 'Date inconnue'

  const formattedDateString = dateString.replace(' ', 'T')
  const date = new Date(formattedDateString)

  // Vérifier si la date est valide
  if (isNaN(date.getTime())) return 'Date invalide'

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }

  return date.toLocaleDateString('fr-FR', options)
}

function extractUserInfoFromLog(log) {
  if (!log || !log.context) return { device: 'Inconnu', location: 'Inconnue', ip: 'Inconnue' }

  const context = log.context;

  // Extraction des informations sur l'appareil
  let deviceInfo = 'Inconnu';
  if (context.device) {
    const device = context.device;
    const parts = [];

    if (device.type) parts.push(device.type.charAt(0).toUpperCase() + device.type.slice(1));
    if (device.os) parts.push(device.os);
    if (device.browser) parts.push(device.browser);

    deviceInfo = parts.join(' - ') || 'Inconnu';
  }

  // Extraction des informations de localisation
  let locationInfo = 'Inconnue';
  if (context.geo) {
    const geo = context.geo;
    const parts = [];

    if (geo.city) parts.push(geo.city);
    if (geo.region) parts.push(geo.region);
    if (geo.country) parts.push(geo.country);

    locationInfo = parts.join(', ') || 'Inconnue';
  }

  // Extraction de l'adresse IP
  const ip = log.ip_address ||
             (context.geo && context.geo.ip) ||
             (context.request && context.request.ip) ||
             'Inconnue';

  return {
    device: deviceInfo,
    location: locationInfo,
    ip: ip
  }
}

function clearSearch() {
  searchIp.value = ''
  selectedIp.value = null
  selectedIpLogs.value = []
  searchError.value = ''
  currentPage.value = 1
}

// Fonction pour gérer la recherche avec Enter
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    searchIpLogs()
  }
}

// Fonction pour générer un tableau de pages à afficher (avec ellipsis)
function getVisiblePageNumbers(currentPage, totalPages) {
  // Si moins de 8 pages, afficher toutes les pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Sinon, utiliser une logique avec ellipsis
  let pages = []

  // Toujours afficher la première page
  pages.push(1)

  // Gérer les ellipsis en fonction de la position de la page courante
  if (currentPage <= 3) {
    // Proche du début: 1 2 3 4 5 ... n
    pages.push(2, 3, 4, 5, 'ellipsis', totalPages)
  } else if (currentPage >= totalPages - 2) {
    // Proche de la fin: 1 ... n-4 n-3 n-2 n-1 n
    pages.push('ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
  } else {
    // Au milieu: 1 ... c-1 c c+1 ... n
    pages.push('ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages)
  }

  // Filtrer les doublons et trier
  return [...new Set(pages)].sort((a, b) => {
    if (a === 'ellipsis') return 1
    if (b === 'ellipsis') return -1
    return a - b
  })
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
    Historique des Adresses IP
  </h1>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Panneau de recherche -->
    <aside class="lg:col-span-4">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/10">
        <h2 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
          Rechercher une adresse IP
        </h2>

        <!-- Sélecteur d'adresses IP -->
        <div class="mb-6">
          <label for="ip-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sélectionner parmi les IPs disponibles
          </label>
          <div class="relative">
            <select
              id="ip-select"
              v-model="searchIp"
              @change="selectIp(searchIp)"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              :disabled="isLoadingIps"
            >
              <option value="">Sélectionner une adresse IP</option>
              <option v-for="ip in availableIps" :key="ip" :value="ip">{{ ip }}</option>
            </select>
            <div v-if="isLoadingIps" class="absolute right-2 top-2">
              <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{{ availableIps.length }} adresses IP disponibles</span>
            <button
              @click="fetchAvailableIps"
              class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              :disabled="isLoadingIps"
            >
              Rafraîchir la liste
            </button>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">OU</span>
          </div>
        </div>

        <!-- Formulaire de recherche manuelle -->
        <div class="space-y-4">
          <div>
            <label for="ip-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recherche manuelle
            </label>
            <div class="relative">
              <input
                id="ip-search"
                v-model="searchIp"
                @keypress="handleKeyPress"
                type="text"
                placeholder="Ex: 192.168.1.1"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                :disabled="isSearching"
              />
              <button
                v-if="searchIp"
                @click="clearSearch"
                class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <button
            @click="searchIpLogs"
            :disabled="isSearching || !searchIp.trim()"
            class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <span v-if="isSearching" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Recherche...
            </span>
            <span v-else>Rechercher</span>
          </button>

          <!-- Message d'erreur -->
          <div v-if="searchError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            <p class="text-sm text-red-600 dark:text-red-400">{{ searchError }}</p>
          </div>
        </div>

        <!-- Informations sur la recherche actuelle -->
        <div v-if="selectedIp" class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h3 class="font-medium text-green-800 dark:text-green-200 mb-2">IP sélectionnée</h3>
          <p class="text-sm text-green-700 dark:text-green-300 font-mono">{{ selectedIp }}</p>
          <p class="text-sm text-green-600 dark:text-green-400 mt-1">{{ selectedIpLogs.length }} log(s) trouvé(s)</p>
        </div>

        <!-- Instructions -->
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Instructions</h3>
          <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Sélectionnez une IP dans la liste déroulante ou</li>
            <li>• Entrez une adresse IP valide manuellement</li>
            <li>• Utilisez le format IPv4 (ex: 192.168.1.1)</li>
            <li>• Appuyez sur Entrée pour rechercher</li>
            <li>• Toutes les activités historiques seront affichées</li>
          </ul>
        </div>
      </div>
    </aside>

    <!-- Panneau principal -->
    <main class="lg:col-span-8">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow dark:shadow-gray-900/10 min-h-full">
        <div v-if="!selectedIp" class="text-center text-gray-500 dark:text-gray-400 pt-20">
          <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Rechercher une adresse IP</h3>
          <p class="text-gray-500 dark:text-gray-400">Entrez une adresse IP dans le panneau de gauche pour voir son historique complet d'activités.</p>
        </div>

        <div v-else>
          <h2 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
            Historique complet de l'adresse IP : {{ selectedIp }}
          </h2>

          <!-- Informations utilisateur pour l'IP sélectionnée -->
          <div
            v-if="selectedIpLogs.length > 0"
            class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <h3 class="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Informations utilisateur
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <span class="font-medium">Utilisateur principal : </span>
                <span class="text-blue-600 dark:text-blue-300">
                  {{ selectedIpLogs[0].user_id
                    ? (userEmails[selectedIpLogs[0].user_id] || `ID: ${selectedIpLogs[0].user_id}`)
                    : 'Anonyme' }}
                </span>
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <span class="font-medium">Appareil : </span>
                {{ extractUserInfoFromLog(selectedIpLogs[0]).device }}
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <span class="font-medium">Localisation : </span>
                {{ extractUserInfoFromLog(selectedIpLogs[0]).location }}
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <span class="font-medium">IP : </span>
                {{ extractUserInfoFromLog(selectedIpLogs[0]).ip }}
              </p>
            </div>
          </div>

          <!-- Statistiques des logs -->
          <div class="mb-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">Total des logs :</span>
                <span class="text-gray-900 dark:text-gray-100 ml-1">{{ selectedIpLogs.length }}</span>
              </div>
              <div v-if="selectedIpLogs.length > 0">
                <span class="font-medium text-gray-700 dark:text-gray-300">Première activité :</span>
                <span class="text-gray-900 dark:text-gray-100 ml-1">
                  {{ formatDate(selectedIpLogs[selectedIpLogs.length - 1].created_at) }}
                </span>
              </div>
              <div v-if="selectedIpLogs.length > 0">
                <span class="font-medium text-gray-700 dark:text-gray-300">Dernière activité :</span>
                <span class="text-gray-900 dark:text-gray-100 ml-1">
                  {{ formatDate(selectedIpLogs[0].created_at) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Pagination en haut - Version améliorée -->
          <div v-if="totalPages > 1" class="flex justify-between items-center mb-4">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span class="hidden sm:inline">Précédent</span>
              <span class="sm:hidden">&lt;</span>
            </button>

            <div class="flex flex-wrap justify-center space-x-1">
              <template v-for="(page, index) in getVisiblePageNumbers(currentPage, totalPages)" :key="index">
                <div v-if="page === 'ellipsis'" class="px-3 py-1 text-gray-500 dark:text-gray-400">
                  ...
                </div>
                <button
                  v-else
                  @click="goToPage(page)"
                  class="px-3 py-1 rounded transition-colors"
                  :class="{
                    'bg-blue-500 text-white hover:bg-blue-600': page === currentPage,
                    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600': page !== currentPage
                  }"
                >
                  {{ page }}
                </button>
              </template>
            </div>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span class="hidden sm:inline">Suivant</span>
              <span class="sm:hidden">&gt;</span>
            </button>
          </div>

          <!-- Liste des logs par groupe d'utilisateur -->
          <div v-for="group in paginatedGroups" :key="group.userId" class="mb-6">
            <div class="flex items-center mb-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                {{ group.userName }}
              </h3>
              <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                ({{ group.logs.length }} logs)
              </span>
            </div>

            <ul class="space-y-3 pl-4">
              <li
                v-for="log in group.logs"
                :key="log.id"
                class="border-l-4 border-blue-200 dark:border-blue-600 pl-4 pb-3 bg-gray-50 dark:bg-gray-800 rounded-r-lg"
              >
                <!-- En-tête du log avec timestamp et niveau -->
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center space-x-2">
                    <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {{ formatDate(log.created_at) }}
                    </span>
                    <span
                      class="px-2 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200': log.level === 'ERROR',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200': log.level === 'WARNING',
                        'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200': log.level === 'NOTICE',
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200': log.level === 'INFO',
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': !log.level || log.level === 'DEBUG'
                      }"
                    >
                      {{ log.level || 'INFO' }}
                    </span>
                  </div>
                </div>

                <!-- Message principal du log -->
                <div class="mb-3">
                  <h4 class="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">Message :</h4>
                  <p class="text-gray-700 dark:text-gray-300 text-sm bg-white dark:bg-gray-700 p-2 rounded border">
                    {{ log.message }}
                  </p>
                </div>

                <!-- Bouton pour afficher/masquer le contexte -->
                <div class="flex items-center justify-between">
                  <button
                    v-if="log.context"
                    @click="log.showFullContext = !log.showFullContext"
                    class="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <svg
                      class="w-3 h-3 mr-1 transition-transform duration-200"
                      :class="{ 'rotate-180': log.showFullContext }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    {{ log.showFullContext ? 'Masquer le contexte' : 'Afficher le contexte' }}
                  </button>
                  <span v-else class="text-xs text-gray-400 dark:text-gray-500 italic">
                    Aucun contexte disponible
                  </span>
                </div>

                <!-- Contexte détaillé (affiché/caché avec animation) -->
                <div
                  v-if="log.context"
                  class="mt-3 overflow-hidden transition-all duration-300"
                  :class="{ 'max-h-0': !log.showFullContext, 'max-h-96': log.showFullContext }"
                >
                  <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 border">
                    <h5 class="font-medium text-gray-800 dark:text-gray-200 text-xs mb-2 uppercase tracking-wide">
                      Contexte détaillé :
                    </h5>

                    <!-- Informations principales du contexte -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-xs">
                      <div v-if="log.context.path" class="bg-white dark:bg-gray-600 p-2 rounded">
                        <span class="font-medium text-gray-600 dark:text-gray-300">Chemin :</span>
                        <span class="text-gray-800 dark:text-gray-100 ml-1">{{ log.context.path }}</span>
                      </div>
                      <div v-if="log.context.name" class="bg-white dark:bg-gray-600 p-2 rounded">
                        <span class="font-medium text-gray-600 dark:text-gray-300">Route :</span>
                        <span class="text-gray-800 dark:text-gray-100 ml-1">{{ log.context.name }}</span>
                      </div>
                      <div v-if="log.context.method" class="bg-white dark:bg-gray-600 p-2 rounded">
                        <span class="font-medium text-gray-600 dark:text-gray-300">Méthode :</span>
                        <span class="text-gray-800 dark:text-gray-100 ml-1">{{ log.context.method }}</span>
                      </div>
                      <div v-if="log.context.userAgent" class="bg-white dark:bg-gray-600 p-2 rounded col-span-full">
                        <span class="font-medium text-gray-600 dark:text-gray-300">User Agent :</span>
                        <span class="text-gray-800 dark:text-gray-100 ml-1 break-all">{{ log.context.userAgent }}</span>
                      </div>
                      <!-- Ajout d'une information IP cliquable -->
                      <div v-if="log.ip_address || (log.context.geo && log.context.geo.ip) || (log.context.request && log.context.request.ip)" class="bg-white dark:bg-gray-600 p-2 rounded">
                        <span class="font-medium text-gray-600 dark:text-gray-300">Adresse IP :</span>
                        <span
                          v-if="extractUserInfoFromLog(log).ip !== 'Inconnue' && extractUserInfoFromLog(log).ip !== selectedIp"
                          @click="handleIpClick(extractUserInfoFromLog(log).ip)"
                          class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-1 cursor-pointer hover:underline"
                        >
                          {{ extractUserInfoFromLog(log).ip }}
                        </span>
                        <span v-else class="text-gray-800 dark:text-gray-100 ml-1">
                          {{ extractUserInfoFromLog(log).ip }}
                        </span>
                      </div>
                    </div>

                    <!-- JSON complet du contexte -->
                    <details class="mt-2">
                      <summary class="cursor-pointer text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                        Voir le JSON complet du contexte
                      </summary>
                      <pre class="text-xs bg-white dark:bg-gray-800 p-3 mt-2 rounded border overflow-x-auto text-gray-700 dark:text-gray-300 max-h-64 overflow-y-auto">{{ JSON.stringify(log.context, null, 2) }}</pre>
                    </details>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Pagination en bas - Version améliorée -->
          <div v-if="totalPages > 1" class="flex justify-between items-center mt-6">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span class="hidden sm:inline">Précédent</span>
              <span class="sm:hidden">&lt;</span>
            </button>

            <div class="hidden sm:flex flex-wrap justify-center space-x-1">
              <template v-for="(page, index) in getVisiblePageNumbers(currentPage, totalPages)" :key="index">
                <div v-if="page === 'ellipsis'" class="px-3 py-1 text-gray-500 dark:text-gray-400">
                  ...
                </div>
                <button
                  v-else
                  @click="goToPage(page)"
                  class="px-3 py-1 rounded transition-colors"
                  :class="{
                    'bg-blue-500 text-white hover:bg-blue-600': page === currentPage,
                    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600': page !== currentPage
                  }"
                >
                  {{ page }}
                </button>
              </template>
            </div>

            <div class="text-gray-700 dark:text-gray-300">
              Page {{ currentPage }} sur {{ totalPages }}
            </div>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span class="hidden sm:inline">Suivant</span>
              <span class="sm:hidden">&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
