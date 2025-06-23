<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';

const dailySessions = ref([]);
const selectedIp = ref(null);
const selectedIpLogs = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  const response = await apiClient.get('/api/dashboard/sessions/today');
  dailySessions.value = response.data;
  isLoading.value = false;
});

async function viewSession(ip) {
  selectedIp.value = ip;
  selectedIpLogs.value = []; // Reset
  const response = await apiClient.get(`/api/dashboard/sessions/ip/${ip}`);
  selectedIpLogs.value = response.data;
}

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
  <h1 class="text-3xl font-bold mb-8">Suivi des Visites du Jour</h1>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

    <aside class="lg:col-span-4">
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="font-bold text-lg mb-4">Visiteurs Uniques Aujourd'hui</h2>
        <ul class="space-y-2 max-h-[70vh] overflow-y-auto">
          <li v-for="session in dailySessions" :key="session.ip_address" @click="viewSession(session.ip_address)"
              class="p-3 rounded-md cursor-pointer hover:bg-gray-100"
              :class="{'bg-green-100 ring-2 ring-green-500': selectedIp === session.ip_address}">
            <p class="font-semibold text-gray-800">{{ session.ip_address }}</p>
            <p class="text-sm text-gray-500">{{ session.user_email }} - {{ session.action_count }} actions</p>
          </li>
        </ul>
      </div>
    </aside>

    <main class="lg:col-span-8">
      <div class="bg-white p-4 rounded-lg shadow min-h-full">
        <div v-if="!selectedIp" class="text-center text-gray-500 pt-20">
          Sélectionnez une adresse IP pour voir le détail de la session.
        </div>
        <div v-else>
          <h2 class="font-bold text-lg mb-4">Parcours de l'utilisateur : {{ selectedIp }}</h2>
          <ul class="space-y-3">
            <li v-for="log in selectedIpLogs" :key="log.id" class="border-b pb-2">
              <p class="text-sm text-gray-500">{{ formatDate(log.created_at) }}</p>
              <p class="font-medium text-gray-900">{{ log.message }}</p>
              <pre class="text-xs bg-gray-100 p-2 mt-1 rounded overflow-x-auto">{{ log.context }}</pre>
            </li>
          </ul>
        </div>
      </div>
    </main>

  </div>
</template>
