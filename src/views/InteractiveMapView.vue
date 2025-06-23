<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { activityLogger } from '@/services/activityLogger';
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
} from "@vue-leaflet/vue-leaflet";

// --- Stores et Variables d'Environnement ---
const authStore = useAuthStore();
const geoapifyApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

const initialZoom = 12;
const initialCenter = [46.195, -1.37];

// --- State ---
const isLoading = ref(true);
const error = ref(null);
const pointsOfInterest = ref([]);
const poiTypes = ref([]);
const zoom = ref(12);
const center = ref([46.195, -1.37]);
const selectedPoiTypes = ref([]);
const isEditMode = ref(false);
const isPoiModalOpen = ref(false);
const isPickingCoordinates = ref(false);
const currentPoi = ref({});
const modalError = ref('');
const isGeocoding = ref(false);
const map = ref(null);

// --- NOUVEAU STATE pour la version mobile ---
const isAsideOpen = ref(false); // Gère l'ouverture/fermeture du panneau latéral sur mobile

// --- Configuration de la carte ---
const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// --- Fonctions (inchangées) ---

function recenterMap() {
  if (map.value) {
    map.value.leafletObject.flyTo(initialCenter, initialZoom);
  }
}

async function fetchData(force = false) {
  isLoading.value = true;
  error.value = null;

  const requestConfig = {
    params: {
      'itemsPerPage': 1000
    }
  };
  if (force) {
    requestConfig.params = { timestamp: new Date().getTime() };
  }

  try {
    const [typesResponse, poisResponse] = await Promise.all([
      apiClient.get('/api/poi_types', requestConfig),
      apiClient.get('/api/point_of_interests', requestConfig)
    ]);
    poiTypes.value = typesResponse.data['hydra:member'] || typesResponse.data;
    pointsOfInterest.value = poisResponse.data['hydra:member'] || poisResponse.data;

    if (isLoading.value) {
      selectAll();
    }
  } catch (err) {
    error.value = "Impossible de charger les données de la carte.";
    console.error("Erreur lors du chargement des données :", err);
  } finally {
    isLoading.value = false;
  }
}

const filteredPois = computed(() => {
  if (selectedPoiTypes.value.length === 0) return [];
  return pointsOfInterest.value.filter(poi => poi.type && selectedPoiTypes.value.includes(poi.type.id));
});

function selectAll() {
  selectedPoiTypes.value = poiTypes.value.map(type => type.id);
}

function deselectAll() {
  selectedPoiTypes.value = [];
}

function getMarkerIconUrl(poiType) {
  if (!poiType || !poiType.icon || !geoapifyApiKey) {
    return `https://api.geoapify.com/v1/icon/?type=material&color=black&icon=location_on&iconSize=large&apiKey=${geoapifyApiKey}`;
  }
  const color = poiType.iconColor.replace('#', '');
  return `https://api.geoapify.com/v1/icon/?type=${poiType.iconType}&color=%23${color}&icon=${poiType.icon}&iconSize=large&apiKey=${geoapifyApiKey}`;
}

function openPoiModal(poi = null, latlng = null) {
  modalError.value = '';
  if (poi) {
    currentPoi.value = JSON.parse(JSON.stringify(poi));
    currentPoi.value.type = poi.type.id;

  } else {
    currentPoi.value = {
      name: '',
      description: '',
      address: '',
      type: poiTypes.value[0]?.id || null,
      latitude: latlng ? latlng.lat.toFixed(7) : '',
      longitude: latlng ? latlng.lng.toFixed(7) : '',
    };
  }
  isPoiModalOpen.value = true;
}

function closePoiModal() {
  isPoiModalOpen.value = false;
  isPickingCoordinates.value = false;
}

function startCoordinatePicking() {
  isPickingCoordinates.value = true;
  isPoiModalOpen.value = false;
}

function handleMapClick(event) {
  if (isPickingCoordinates.value) {
    currentPoi.value.latitude = event.latlng.lat.toFixed(7);
    currentPoi.value.longitude = event.latlng.lng.toFixed(7);
    isPickingCoordinates.value = false;
    isPoiModalOpen.value = true;
  } else if (isEditMode.value) {
    openPoiModal(null, event.latlng);
  }
}

async function handleMarkerDragEnd(poi, event) {
  const newLatLng = event.target.getLatLng();
  const payload = {
    ...poi,
    latitude: newLatLng.lat.toFixed(7),
    longitude: newLatLng.lng.toFixed(7),
    type: `/api/poi_types/${poi.type.id}`
  };
  try {
    await apiClient.put(`/api/point_of_interests/${poi.id}`, payload);
    await activityLogger.log('NOTICE', 'POI position updated via drag-and-drop', { poiId: poi.id });
    await fetchData(true);
  } catch (err) {
    alert("La mise à jour de la position a échoué.");
    console.error("Erreur lors de la mise à jour du POI :", err);
    await fetchData(true);
  }
}

async function handlePoiSubmit() {
  modalError.value = '';
  if (!currentPoi.value.type) {
    modalError.value = "Veuillez sélectionner un type.";
    return;
  }
  const isCreating = !currentPoi.value.id;
  const payload = {
    ...currentPoi.value,
    latitude: String(currentPoi.value.latitude),
    longitude: String(currentPoi.value.longitude),
    type: `/api/poi_types/${currentPoi.value.type}`
  };
  try {
    if (isCreating) {
      await apiClient.post('/api/point_of_interests', payload);
      await activityLogger.log('NOTICE', 'Admin created a new POI', { name: payload.name });
    } else {
      await apiClient.put(`/api/point_of_interests/${currentPoi.value.id}`, payload);
      await activityLogger.log('NOTICE', 'Admin updated a POI', { poiId: payload.id, name: payload.name });
    }
    await fetchData(true);
    closePoiModal();
  } catch (err) {
    modalError.value = "Une erreur est survenue. Vérifiez les champs et réessayez.";
    console.error("Erreur lors de la soumission du POI :", err);
  }
}

async function handlePoiDelete(poiId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce Point d'Intérêt ?")) return;
  try {
    await apiClient.delete(`/api/point_of_interests/${poiId}`);
    await fetchData(true);
  } catch (err) {
    alert("Vous n'avez pas les droits suffisants pour supprimer ce POI.");
    console.error("Erreur lors de la suppression du POI :", err);
  }
}

async function geocodeAddress() {
  if (!currentPoi.value.address || !currentPoi.value.address.trim()) {
    modalError.value = "Veuillez d'abord saisir une adresse.";
    return;
  }
  isGeocoding.value = true;
  modalError.value = '';
  try {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(currentPoi.value.address)}&apiKey=${geoapifyApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      currentPoi.value.latitude = lat.toFixed(7);
      currentPoi.value.longitude = lon.toFixed(7);
    } else {
      modalError.value = "Adresse introuvable. Veuillez la préciser.";
    }
  } catch (err) {
    modalError.value = "Erreur lors du géocodage.";
    console.error("Geocoding error:", err);
  } finally {
    isGeocoding.value = false;
  }
}

function getDirectionsUrl(poi) {
  if (!poi.latitude || !poi.longitude) return '#';
  return `https://www.google.com/maps/dir/?api=1&destination=${poi.latitude},${poi.longitude}`;
}

onMounted(fetchData);
</script>

<template>
  <div class="relative h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
    <!-- Le conteneur principal est maintenant un flexbox sur les grands écrans, et un conteneur simple sur mobile -->
    <div class="md:flex h-full">

      <!-- CORRIGÉ : Bouton déplacé à droite avec right-4 -->
      <button
        @click="isAsideOpen = true"
        class="md:hidden absolute top-4 right-4 z-[999] p-2 bg-white rounded-full shadow-lg text-gray-700"
        aria-label="Ouvrir le menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <!-- MODIFIÉ : Panneau latéral avec gestion de l'affichage mobile -->
      <aside
        class="absolute md:relative inset-y-0 left-0 z-[1002] w-80 flex-shrink-0 bg-white shadow-lg overflow-y-auto p-6 transform transition-transform duration-300 ease-in-out"
        :class="{'translate-x-0': isAsideOpen, '-translate-x-full': !isAsideOpen, 'md:translate-x-0': true}"
      >
        <div class="flex justify-between items-center mb-5">
          <h2 class="text-xl font-bold text-gray-800 border-b pb-3 flex-grow">Légende</h2>
          <!-- Bouton pour fermer le panneau sur mobile -->
          <button @click="isAsideOpen = false" class="md:hidden ml-4 p-1 text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="isLoading" class="text-gray-500">Chargement...</div>
        <div v-else-if="error" class="text-red-600 p-3 bg-red-50 rounded-md">{{ error }}</div>
        <div v-else>
          <div class="flex justify-between mb-4">
            <button @click="selectAll" class="text-sm font-medium text-green-700 hover:underline focus:outline-none">Tout voir</button>
            <button @click="deselectAll" class="text-sm font-medium text-gray-500 hover:underline focus:outline-none">Ne rien voir</button>
          </div>
          <div class="space-y-4">
            <div v-for="poiType in poiTypes" :key="poiType.id" class="flex items-center">
              <input type="checkbox" :id="'type-' + poiType.id" :value="poiType.id" v-model="selectedPoiTypes" class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"/>
              <label :for="'type-' + poiType.id" class="ml-3 text-gray-700 select-none cursor-pointer flex items-center">
                <img :src="getMarkerIconUrl(poiType)" alt="" class="h-6 w-6 mr-2 object-contain" />
                <span>{{ poiType.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t">
          <button @click="recenterMap" class="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2"><path d="M9.653 16.915l.005-.003-.011.006.006-.003ZM10 18a8 8 0 100-16 8 8 0 000 16ZM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0Z" /><path d="M10 4.75a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 4.75Z" /><path d="M10 8a2 2 0 100 4 2 2 0 000-4Z" /></svg>
            Recentrer la carte
          </button>
        </div>

        <div v-if="authStore.isAdmin" class="mt-8 pt-6 border-t">
          <h3 class="text-lg font-bold text-gray-800">Administration</h3>
          <div class="mt-4 p-3 bg-gray-100 rounded-lg space-y-4">
            <label for="edit-mode-toggle" class="flex items-center justify-between cursor-pointer">
              <span class="text-gray-700 font-medium">Mode Édition</span>
              <div class="relative">
                <input type="checkbox" id="edit-mode-toggle" class="sr-only" v-model="isEditMode">
                <div class="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"></div>
              </div>
            </label>
            <p v-if="isEditMode" class="text-sm text-green-700">Le mode édition est actif.</p>
            <button @click="openPoiModal(null)" class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold">
              Créer un point
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-grow h-full relative z-0" :class="{ 'cursor-crosshair': isEditMode || isPickingCoordinates }">
        <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false" @click="handleMapClick" class="h-full">
          <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution"></l-tile-layer>
          <l-marker
            v-for="poi in filteredPois"
            :key="poi.id"
            :lat-lng="[poi.latitude, poi.longitude]"
            :draggable="isEditMode"
            @dragend="handleMarkerDragEnd(poi, $event)"
          >
            <l-icon :icon-url="getMarkerIconUrl(poi.type)" :icon-size="[38, 52]" :icon-anchor="[19, 50]" :popup-anchor="[0, -50]" />
            <l-popup :min-width="250">
              <div class="font-bold text-lg -mb-1">{{ poi.name }}</div>
              <div v-if="poi.description" class="mt-2 text-base prose max-w-none" v-html="poi.description"></div>
              <div v-if="poi.address" class="text-sm text-gray-500 mt-2 border-t pt-2">{{ poi.address }}</div>
              <div class="mt-4" v-if="poi.type.name !== 'Danger'">
                <a :href="getDirectionsUrl(poi)" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-200 font-semibold text-sm rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
                    <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                  </svg>
                  Itinéraire
                </a>
              </div>
              <div v-if="authStore.isAdmin" class="mt-3 pt-3 border-t flex items-center gap-4">
                <button @click="openPoiModal(poi)" class="text-sm text-blue-600 hover:underline">Modifier</button>
                <button v-if="authStore.user?.roles.includes('ROLE_SUPER_ADMIN')" @click="handlePoiDelete(poi.id)" class="text-sm text-red-600 hover:underline">Supprimer</button>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </main>
    </div>

    <!-- MODIFIÉ : Fond semi-transparent pour le mode mobile -->
    <div
      v-if="isAsideOpen"
      @click="isAsideOpen = false"
      class="md:hidden fixed inset-0 bg-black/50 z-[999]"
      aria-hidden="true"
    ></div>

    <!-- Le modal a un z-index de [1001] pour être au-dessus de tout -->
    <div v-if="isPoiModalOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]" @click.self="closePoiModal">
      <div class="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-lg mx-4">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ currentPoi.id ? 'Modifier le Point d\'Intérêt' : 'Nouveau Point d\'Intérêt' }}</h2>
        <form @submit.prevent="handlePoiSubmit" class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label for="poi-name" class="block text-sm font-medium text-gray-700">Nom</label>
            <input v-model="currentPoi.name" id="poi-name" type="text" required class="mt-1 w-full border-gray-300 rounded-md shadow-sm">
          </div>
          <div>
            <label for="poi-desc" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="currentPoi.description" id="poi-desc" required rows="4" class="mt-1 w-full border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div>
            <label for="poi-type" class="block text-sm font-medium text-gray-700">Type</label>
            <select v-model="currentPoi.type" id="poi-type" required class="mt-1 w-full border-gray-300 rounded-md shadow-sm">
              <option disabled :value="null">-- Choisir un type --</option>
              <option v-for="type in poiTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select>
          </div>
          <div>
            <label for="poi-address" class="block text-sm font-medium text-gray-700">Adresse</label>
            <div class="mt-1 flex items-center gap-2">
              <input v-model="currentPoi.address" id="poi-address" type="text" placeholder="Ex: 17 Rue de la Mairie, 17580" class="flex-grow border-gray-300 rounded-md shadow-sm">
              <button @click.prevent="geocodeAddress" :disabled="isGeocoding" type="button" class="flex-shrink-0 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md" title="Trouver les coordonnées">
                <svg v-if="isGeocoding" class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-600"><path d="m9.422 2.306.056.095.006.012A6.51 6.51 0 0 1 10 2.5a6.5 6.5 0 0 1 5.994 4.025.064.064 0 0 0 .056-.095.006.006 0 0 1 .006-.012A6.51 6.51 0 0 1 10 2.5a6.5 6.5 0 0 1-.578-.019Z" /><path fill-rule="evenodd" d="m11.455 8.165.23.133.06.035a1.503 1.503 0 0 1 1.64 1.112c.039.12.068.243.088.366l.02.122.001.006a1.5 1.5 0 0 1-2.928.63l-.001-.006-.02-.123a1.509 1.509 0 0 1-.088-.366 1.5 1.5 0 0 1 1.004-1.748l.053-.028Zm-3.48.337a1.5 1.5 0 0 1 1.946-.86l.053.028a1.5 1.5 0 0 1 1.004 1.748l.02.123.001.006a1.5 1.5 0 0 1-2.928-.63l-.001-.006-.02-.123a1.505 1.505 0 0 1-.087-.366c0-.02.002-.04.004-.06Zm-1.87-2.115a6.5 6.5 0 0 1 7.89 0 .064.064 0 0 0 .095.056.006.006 0 0 1 .012.006A6.51 6.51 0 0 1 16.5 10a6.5 6.5 0 0 1-4.025 5.994.064.064 0 0 0-.095.056.006.006 0 0 1-.012.006A6.51 6.51 0 0 1 10 16.5a6.5 6.5 0 0 1-5.994-4.025.064.064 0 0 0-.056.095.006.006 0 0 1-.012.012A6.51 6.51 0 0 1 3.5 10a6.5 6.5 0 0 1 4.025-5.994.064.064 0 0 0 .056.095.006.006 0 0 1 .012.012A6.51 6.51 0 0 1 10 3.5c.578 0 1.14.074 1.68.21Z" clip-rule="evenodd" /></svg>
              </button>
            </div>
          </div>
          <div class="bg-gray-50 p-3 rounded-md">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="poi-lat" class="block text-sm font-medium text-gray-700">Latitude</label>
                <input v-model="currentPoi.latitude" id="poi-lat" type="number" step="any" class="mt-1 w-full border-gray-300 rounded-md shadow-sm bg-gray-100" placeholder="Cliqué ou auto">
              </div>
              <div>
                <label for="poi-lng" class="block text-sm font-medium text-gray-700">Longitude</label>
                <input v-model="currentPoi.longitude" id="poi-lng" type="number" step="any" class="mt-1 w-full border-gray-300 rounded-md shadow-sm bg-gray-100" placeholder="Cliqué ou auto">
              </div>
            </div>
            <button type="button" @click="startCoordinatePicking" class="text-sm text-green-700 hover:underline mt-2">
              Choisir sur la carte...
            </button>
          </div>

          <div v-if="modalError" class="text-sm text-red-600 p-3 bg-red-50 rounded-md">{{ modalError }}</div>

          <div class="flex justify-end gap-4 pt-4">
            <button type="button" @click="closePoiModal" class="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md">Annuler</button>
            <button type="submit" class="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md">Sauvegarder</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Assurez-vous que leaflet n'interfère pas avec la hauteur */
.leaflet-container {
  height: 100%;
  width: 100%;
}
.cursor-crosshair {
  cursor: crosshair;
}
#edit-mode-toggle:checked ~ .dot {
  transform: translateX(1.5rem);
  background-color: #22c55e;
}
#edit-mode-toggle:checked + .block {
  background-color: #d1fae5;
}
</style>
