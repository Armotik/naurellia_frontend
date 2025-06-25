<script setup>
import { onMounted, ref, computed } from 'vue'
import apiClient from '@/services/api'

const dailySessions = ref([])
const selectedIp = ref(null)
const selectedIpLogs = ref([])
const isLoading = ref(true)
const userEmails = ref({}) // Cache pour stocker les emails des utilisateurs

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

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await apiClient.get('/api/dashboard/sessions/today')
    dailySessions.value = response.data
    console.log('Sessions chargées:', dailySessions.value)

    // Récupérer les emails pour tous les utilisateurs des sessions quotidiennes
    const userIdsToFetch = dailySessions.value
      .filter((session) => session.user_id)
      .map((session) => session.user_id)

    console.log('IDs utilisateurs à récupérer:', userIdsToFetch)

    // Récupérer tous les emails en parallèle
    await Promise.all(
      userIdsToFetch.map(async (userId) => {
        if (!userEmails.value[userId]) {
          await getUserEmail(userId)
        }
      }),
    )

    console.log('Emails récupérés:', userEmails.value)
  } catch (error) {
    console.error('Erreur lors du chargement des sessions:', error)
  } finally {
    isLoading.value = false
  }
})

async function viewSession(ip) {
  selectedIp.value = ip
  selectedIpLogs.value = [] // Reset
  currentPage.value = 1 // Réinitialiser la pagination
  const response = await apiClient.get(`/api/dashboard/sessions/ip/${ip}`)

  // Initialisation des logs avec la propriété showFullContext
  selectedIpLogs.value = response.data.map((log) => ({
    ...log,
    showFullContext: false, // Par défaut, les détails du contexte sont masqués
  }))

  // Récupérer les emails des utilisateurs pour les logs qui ont un user_id
  for (const log of selectedIpLogs.value) {
    if (log.user_id && !userEmails.value[log.user_id]) {
      await getUserEmail(log.user_id)
    }
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
</script>

<template>
  <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
    Suivi des Visites du Jour
  </h1>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <aside class="lg:col-span-4">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow dark:shadow-gray-900/10">
        <h2 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
          Visiteurs Uniques Aujourd'hui
        </h2>
        <div v-if="isLoading" class="text-center py-4 dark:text-gray-300">
          Chargement des sessions...
        </div>
        <ul v-else class="space-y-2 max-h-[70vh] overflow-y-auto">
          <li
            v-for="session in dailySessions"
            :key="session.ip_address"
            @click="viewSession(session.ip_address)"
            class="p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{
              'bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500 dark:ring-green-600':
                selectedIp === session.ip_address,
              'dark:bg-gray-800': selectedIp !== session.ip_address,
            }"
          >
            <p class="font-semibold text-gray-800 dark:text-gray-200">{{ session.ip_address }}</p>
            <div class="flex items-center text-sm mt-1">
              <span
                v-if="session.user_id && userEmails[session.user_id]"
                class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs mr-2"
              >
                {{ userEmails[session.user_id] }}
              </span>
              <span
                v-else-if="session.user_id"
                class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full text-xs mr-2"
              >
                ID: {{ session.user_id }}
              </span>
              <span
                v-else
                class="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs mr-2"
              >
                Anonyme
              </span>
              <span class="text-gray-500 dark:text-gray-400"
                >{{ session.action_count }} actions</span
              >
            </div>
          </li>
        </ul>
      </div>
    </aside>

    <main class="lg:col-span-8">
      <div
        class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow dark:shadow-gray-900/10 min-h-full"
      >
        <div v-if="!selectedIp" class="text-center text-gray-500 dark:text-gray-400 pt-20">
          Sélectionnez une adresse IP pour voir le détail de la session.
        </div>
        <div v-else>
          <h2 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
            Parcours de l'utilisateur : {{ selectedIp }}
          </h2>

          <!-- Informations utilisateur pour toutes les IP -->
          <div
            v-if="selectedIpLogs.length > 0"
            class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <h3 class="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Informations utilisateur
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <span class="font-medium">Utilisateur : </span>
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
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <span class="font-medium">Total des logs :</span> {{ selectedIpLogs.length }}
            </p>
          </div>

          <!-- Pagination en haut -->
          <div v-if="totalPages > 1" class="flex justify-between items-center mb-4">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <div class="flex space-x-1">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                class="px-3 py-1 rounded"
                :class="{
                  'bg-blue-500 text-white': page === currentPage,
                  'bg-gray-200 dark:bg-gray-700': page !== currentPage
                }"
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Suivant
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
                class="border-b dark:border-gray-700 pb-2"
              >
                <div class="flex justify-between items-start">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(log.created_at) }}
                  </p>
                </div>
                <p class="font-medium text-gray-900 dark:text-gray-200">{{ log.message }}</p>

                <!-- Affichage condensé du contexte -->
                <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div
                    v-if="log.context"
                    class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-300"
                  >
                    <p v-if="log.context.path">
                      <span class="font-medium">Page:</span> {{ log.context.path }}
                    </p>
                    <p v-if="log.context.name">
                      <span class="font-medium">Route:</span> {{ log.context.name }}
                    </p>

                    <!-- Bouton pour afficher le contexte complet -->
                    <button
                      @click="log.showFullContext = !log.showFullContext"
                      class="text-blue-600 dark:text-blue-400 hover:underline text-xs mt-1"
                    >
                      {{ log.showFullContext ? 'Masquer détails' : 'Afficher détails' }}
                    </button>
                  </div>

                  <!-- Contexte complet (affiché/caché) -->
                  <pre
                    v-if="log.showFullContext"
                    class="text-xs bg-gray-100 dark:bg-gray-700 p-2 mt-2 rounded overflow-x-auto dark:text-gray-300"
                    >{{ JSON.stringify(log.context, null, 2) }}</pre
                  >
                </div>
              </li>
            </ul>
          </div>

          <!-- Pagination en bas -->
          <div v-if="totalPages > 1" class="flex justify-between items-center mt-6">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <div>
              Page {{ currentPage }} sur {{ totalPages }}
            </div>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
