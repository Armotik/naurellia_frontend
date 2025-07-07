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

// === CONFIGURATION ET STORES ===
const authStore = useAuthStore();
const geoapifyApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

// Configuration initiale de la carte (centré sur l'Île de Ré)
const initialZoom = 12;
const initialCenter = [46.195, -1.37];

// === ÉTAT RÉACTIF DE L'APPLICATION ===
// Gestion du chargement et des erreurs
const isLoading = ref(true);
const error = ref(null);

// Données des POI et types
const pointsOfInterest = ref([]);
const poiTypes = ref([]);
const busSchedules = ref([]); // Nouveaux horaires de bus

// État de la carte
const zoom = ref(12);
const center = ref([46.195, -1.37]);
const selectedPoiTypes = ref([]); // Types de POI sélectionnés dans les filtres
const map = ref(null); // Référence à l'instance Leaflet

// Gestion du mode édition (admin uniquement)
const isEditMode = ref(false);
const isPoiModalOpen = ref(false);
const isPickingCoordinates = ref(false);
const currentPoi = ref({
  busSchedules: [] // Initialiser comme tableau vide réactif
});
const modalError = ref('');
const isGeocoding = ref(false);

// Interface utilisateur mobile
const isAsideOpen = ref(false); // Contrôle l'affichage du panneau latéral sur mobile

// Fonctionnalité de recherche
const searchQuery = ref(''); // Terme de recherche saisi par l'utilisateur
const isSearching = ref(false); // Indicateur de recherche en cours (debounce)

// Configuration de la couche de tuiles OpenStreetMap
const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// === FONCTIONS UTILITAIRES ===

/**
 * Recentre la carte sur sa position initiale
 */
function recenterMap() {
  if (map.value) {
    map.value.leafletObject.flyTo(initialCenter, initialZoom);
  }
}

/**
 * Récupère les données POI et types depuis l'API
 * @param {boolean} force - Force le rechargement en ajoutant un timestamp
 */
async function fetchData(force = false) {
  isLoading.value = true;
  error.value = null;

  const requestConfig = {
    params: {
      'itemsPerPage': 1000
    }
  };

  // Ajouter le filtre de recherche si un terme est saisi
  if (searchQuery.value.trim()) {
    requestConfig.params.partial = searchQuery.value.trim();
  }

  // Forcer le rechargement en évitant le cache
  if (force) {
    requestConfig.params.timestamp = new Date().getTime();
  }

  try {
    // Récupération parallèle des types POI et des POI
    const [typesResponse, poisResponse] = await Promise.all([
      apiClient.get('/api/poi_types', { params: { 'itemsPerPage': 1000 } }),
      apiClient.get('/api/point_of_interests', requestConfig)
    ]);

    // Gestion des différents formats de réponse API Platform
    poiTypes.value = typesResponse.data['hydra:member'] || typesResponse.data;
    pointsOfInterest.value = poisResponse.data['hydra:member'] || poisResponse.data;

    // Sélectionner tous les types disponibles au premier chargement
    if (isLoading.value && !searchQuery.value) {
      selectAll();
    }
  } catch (err) {
    error.value = "Impossible de charger les données de la carte.";
    console.error("Erreur lors du chargement des données :", err);
  } finally {
    isLoading.value = false;
    isSearching.value = false;
  }
}

/**
 * Récupère les horaires de bus actifs depuis l'API
 */
async function fetchBusSchedules() {
  try {
    const response = await apiClient.get('/api/bus_schedules', {
      params: {
        'itemsPerPage': 1000,
        'isActive': true
      }
    });
    busSchedules.value = response.data['hydra:member'] || response.data;
  } catch (err) {
    console.error("Erreur lors du chargement des horaires de bus :", err);
  }
}

// === PROPRIÉTÉS CALCULÉES ===

/**
 * Vérifie si le type de POI sélectionné est un arrêt de bus
 */
const isBusStopType = computed(() => {
  if (!currentPoi.value.type || !poiTypes.value.length) return false;
  const selectedType = poiTypes.value.find(type => type.id === currentPoi.value.type);
  return selectedType?.icon === 'directions_bus';
});

/**
 * Filtre les POI selon les types sélectionnés, la recherche et la visibilité
 */
const filteredPois = computed(() => {
  if (selectedPoiTypes.value.length === 0) return [];

  // Filtrage par type sélectionné
  let filtered = pointsOfInterest.value.filter(poi =>
    poi.type && selectedPoiTypes.value.includes(poi.type.id)
  );

  // Filtrage par visibilité selon les permissions
  if (!authStore.isAdmin) {
    // Les utilisateurs normaux ne voient que les POI visibles
    filtered = filtered.filter(poi => poi.isVisible !== false);
  }
  // Les admins voient tous les POI (visibles et non visibles)

  // Filtrage par recherche textuelle (double sécurité côté client)
  if (searchQuery.value.trim()) {
    const searchTerm = searchQuery.value.trim().toLowerCase();
    filtered = filtered.filter(poi => {
      const nameMatch = poi.name?.toLowerCase().includes(searchTerm);
      const descMatch = poi.description?.toLowerCase().includes(searchTerm);
      return nameMatch || descMatch;
    });
  }

  return filtered;
});

/**
 * Retourne uniquement les types de POI qui ont au moins un POI associé
 * Évite d'afficher des filtres vides dans l'interface
 */
const availablePoiTypes = computed(() => {
  if (!pointsOfInterest.value || pointsOfInterest.value.length === 0) {
    return [];
  }

  // Créer un Set des IDs de types utilisés pour une recherche O(1)
  const usedTypeIds = new Set(
    pointsOfInterest.value
      .filter(poi => poi.type && poi.type.id)
      .map(poi => poi.type.id)
  );

  // Retourner seulement les types qui ont des POI associés
  return poiTypes.value.filter(type => usedTypeIds.has(type.id));
});

// === GESTION DE LA RECHERCHE ===

/**
 * Fonction de recherche avec debounce pour éviter trop de requêtes API
 * Attendre 500ms après la dernière frappe avant de lancer la recherche
 */
const searchPois = (() => {
  let timeoutId;
  return () => {
    isSearching.value = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fetchData(true);
    }, 500);
  };
})();

// === GESTION DES FILTRES ===

/**
 * Sélectionne tous les types de POI disponibles
 */
function selectAll() {
  selectedPoiTypes.value = availablePoiTypes.value.map(type => type.id);
}

/**
 * Désélectionne tous les types de POI
 */
function deselectAll() {
  selectedPoiTypes.value = [];
}

// === GESTION DES ICÔNES ===

/**
 * Génère l'URL de l'icône Geoapify pour un type de POI
 * @param {Object} poiType - Le type de POI avec ses propriétés d'icône
 * @param {Object} poi - Le POI pour vérifier la visibilité (optionnel)
 * @returns {string} URL de l'icône
 */
function getMarkerIconUrl(poiType, poi = null) {
  if (!poiType || !poiType.icon || !geoapifyApiKey) {
    return `https://api.geoapify.com/v1/icon/?type=material&color=black&icon=location_on&iconSize=large&apiKey=${geoapifyApiKey}`;
  }

  // Si c'est un admin et que le POI n'est pas visible, utiliser une couleur grise
  let color = poiType.iconColor.replace('#', '');
  if (authStore.isAdmin && poi && poi.isVisible === false) {
    color = '808080'; // Couleur grise en hexadécimal
  }

  return `https://api.geoapify.com/v1/icon/?type=${poiType.iconType}&color=%23${color}&icon=${poiType.icon}&iconSize=large&apiKey=${geoapifyApiKey}`;
}

// === GESTION DES MODALES (ADMIN) ===

/**
 * Ouvre la modale d'édition/création de POI
 * @param {Object|null} poi - POI à éditer ou null pour création
 * @param {Object|null} latlng - Coordonnées si création depuis clic carte
 */
function openPoiModal(poi = null, latlng = null) {
  modalError.value = '';
  if (poi) {
    // Mode édition : copier les données existantes
    currentPoi.value = JSON.parse(JSON.stringify(poi));
    currentPoi.value.type = poi.type.id;
    // Gérer les busSchedules s'ils existent (extraire les IDs)
    currentPoi.value.busSchedules = poi.busSchedules?.map(schedule => schedule.id) || [];
  } else {
    // Mode création : initialiser avec valeurs par défaut
    currentPoi.value = {
      name: '',
      description: '',
      address: '',
      type: poiTypes.value[0]?.id || null,
      latitude: latlng ? latlng.lat.toFixed(7) : '',
      longitude: latlng ? latlng.lng.toFixed(7) : '',
      isVisible: true, // Par défaut, les nouveaux POI sont visibles
      busSchedules: [] // Initialiser le champ busSchedules comme tableau vide
    };
  }
  isPoiModalOpen.value = true;
}

/**
 * Ferme la modale et réinitialise les états
 */
function closePoiModal() {
  isPoiModalOpen.value = false;
  isPickingCoordinates.value = false;
}

/**
 * Active le mode sélection de coordonnées sur la carte
 */
function startCoordinatePicking() {
  isPickingCoordinates.value = true;
  isPoiModalOpen.value = false;
}

// === GESTION DES ÉVÉNEMENTS CARTE ===

/**
 * Gère les clics sur la carte selon le mode actuel
 * @param {Object} event - Événement Leaflet avec coordonnées
 */
function handleMapClick(event) {
  if (isPickingCoordinates.value) {
    // Mode sélection : récupérer les coordonnées
    currentPoi.value.latitude = event.latlng.lat.toFixed(7);
    currentPoi.value.longitude = event.latlng.lng.toFixed(7);
    isPickingCoordinates.value = false;
    isPoiModalOpen.value = true;
  } else if (isEditMode.value) {
    // Mode édition : créer un nouveau POI
    openPoiModal(null, event.latlng);
  }
}

/**
 * Gère le déplacement d'un marqueur (drag & drop)
 * @param {Object} poi - POI déplacé
 * @param {Object} event - Événement Leaflet
 */
async function handleMarkerDragEnd(poi, event) {
  const newLatLng = event.target.getLatLng();
  const payload = {
    name: poi.name,
    description: poi.description,
    address: poi.address,
    latitude: newLatLng.lat.toFixed(7),
    longitude: newLatLng.lng.toFixed(7),
    isVisible: poi.isVisible,
    type: `/api/poi_types/${poi.type.id}` // Format API Platform
  };

  // Conserver les busSchedules existants lors du drag & drop
  if (poi.busSchedules && poi.busSchedules.length > 0) {
    payload.busSchedules = poi.busSchedules.map(schedule => `/api/bus_schedules/${schedule.id}`);
  } else {
    payload.busSchedules = [];
  }

  try {
    await apiClient.put(`/api/point_of_interests/${poi.id}`, payload);
    await activityLogger.log('NOTICE', 'POI position updated via drag-and-drop', { poiId: poi.id });
    await fetchData(true);
  } catch (err) {
    alert("La mise à jour de la position a échoué.");
    console.error("Erreur lors de la mise à jour du POI :", err);
    await fetchData(true); // Restaurer l'état original
  }
}

// === GESTION CRUD DES POI ===

/**
 * Sauvegarde un POI (création ou modification)
 */
async function handlePoiSubmit() {
  modalError.value = '';

  if (!currentPoi.value.type) {
    modalError.value = "Veuillez sélectionner un type.";
    return;
  }

  const isCreating = !currentPoi.value.id;
  const payload = {
    name: currentPoi.value.name,
    description: currentPoi.value.description,
    address: currentPoi.value.address,
    latitude: String(currentPoi.value.latitude),
    longitude: String(currentPoi.value.longitude),
    isVisible: currentPoi.value.isVisible,
    type: `/api/poi_types/${currentPoi.value.type}` // Format API Platform
  };

  // Gestion correcte des busSchedules pour la relation ManyToMany
  const validSchedules = Array.isArray(currentPoi.value.busSchedules)
    ? currentPoi.value.busSchedules.filter(schedule =>
        schedule !== null &&
        schedule !== undefined &&
        schedule !== '' &&
        !isNaN(schedule)
      )
    : [];

  if (validSchedules.length > 0) {
    payload.busSchedules = validSchedules.map(schedule => {
      const scheduleId = typeof schedule === 'object' ? schedule.id : schedule;
      return `/api/bus_schedules/${scheduleId}`;
    });
  } else {
    payload.busSchedules = [];
  }

  try {
    let response;
    if (isCreating) {
      response = await apiClient.post('/api/point_of_interests', payload);
      await activityLogger.log('NOTICE', 'Admin created a new POI', { name: payload.name });
    } else {
      response = await apiClient.put(`/api/point_of_interests/${currentPoi.value.id}`, payload);
      await activityLogger.log('NOTICE', 'Admin updated a POI', { poiId: currentPoi.value.id, name: payload.name });
    }

    await fetchData(true);
    closePoiModal();
  } catch (err) {
    console.error("Erreur complète lors de la soumission du POI :", err);
    modalError.value = "Une erreur est survenue. Vérifiez les champs et réessayez.";
  }
}

/**
 * Supprime un POI après confirmation
 * @param {number} poiId - ID du POI à supprimer
 */
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

// === GÉOCODAGE ===

/**
 * Convertit une adresse en coordonnées GPS via l'API Geoapify
 */
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

// === UTILITAIRES ===

/**
 * Génère l'URL Google Maps pour l'itinéraire vers un POI
 * @param {Object} poi - POI de destination
 * @returns {string} URL Google Maps
 */
function getDirectionsUrl(poi) {
  if (!poi.latitude || !poi.longitude) return '#';
  return `https://www.google.com/maps/dir/?api=1&destination=${poi.latitude},${poi.longitude}`;
}

// === CYCLE DE VIE ===

/**
 * Initialisation du composant : chargement des données
 */
onMounted(() => {
  fetchData();
  fetchBusSchedules(); // Charger les horaires de bus actifs
});

</script>

<template>
  <!-- === CONTENEUR PRINCIPAL === -->
  <div class="relative h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 overflow-hidden">
    <!-- Layout responsive : flexbox sur desktop, stack sur mobile -->
    <div class="md:flex h-full">

      <!-- === BOUTON MOBILE POUR OUVRIR LE PANNEAU === -->
      <button
        @click="isAsideOpen = true"
        class="md:hidden absolute top-4 right-4 z-[999] p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-700 dark:text-gray-300"
        aria-label="Ouvrir le menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <!-- === PANNEAU LATÉRAL DE CONTRÔLES === -->
      <!-- Sidebar responsive : overlay sur mobile, fixe sur desktop -->
      <aside
        class="absolute md:relative inset-y-0 left-0 z-[1002] w-80 flex-shrink-0 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 overflow-y-auto p-6 transform transition-transform duration-300 ease-in-out"
        :class="{'translate-x-0': isAsideOpen, '-translate-x-full': !isAsideOpen, 'md:translate-x-0': true}"
      >
        <!-- En-tête du panneau avec bouton fermer mobile -->
        <div class="flex justify-between items-center mb-5">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3 flex-grow">Légende</h2>
          <!-- Bouton fermer (mobile uniquement) -->
          <button @click="isAsideOpen = false" class="md:hidden ml-4 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- === BARRE DE RECHERCHE === -->
        <div class="mb-6">
          <div class="relative">
            <!-- Champ de recherche avec debounce -->
            <input
              v-model="searchQuery"
              @input="searchPois"
              type="text"
              placeholder="Rechercher un point d'intérêt..."
              class="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 text-sm"
            />
            <!-- Icône de recherche (gauche) -->
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <!-- Bouton effacer la recherche (droite) -->
            <button
              v-if="searchQuery"
              @click="searchQuery = ''; searchPois()"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <!-- Spinner de chargement (droite) -->
            <div v-if="isSearching" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg class="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          <!-- Compteur de résultats -->
          <div v-if="searchQuery" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {{ pointsOfInterest.length }} résultat{{ pointsOfInterest.length > 1 ? 's' : '' }} trouvé{{ pointsOfInterest.length > 1 ? 's' : '' }}
          </div>
        </div>

        <!-- === ÉTATS DE CHARGEMENT === -->
        <div v-if="isLoading" class="text-gray-500 dark:text-gray-400">Chargement...</div>
        <div v-else-if="error" class="text-red-600 dark:text-red-400 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">{{ error }}</div>

        <!-- === FILTRES DES TYPES DE POI === -->
        <div v-else>
          <!-- Boutons de sélection rapide -->
          <div class="flex justify-between mb-4">
            <button @click="selectAll" class="text-sm font-medium text-green-700 dark:text-green-500 hover:underline focus:outline-none">Tout voir</button>
            <button @click="deselectAll" class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline focus:outline-none">Ne rien voir</button>
          </div>

          <!-- Liste des types de POI disponibles (avec POI associés uniquement) -->
          <div class="space-y-4">
            <div v-for="poiType in availablePoiTypes" :key="poiType.id" class="flex items-center">
              <input type="checkbox" :id="'type-' + poiType.id" :value="poiType.id" v-model="selectedPoiTypes" class="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-500 focus:ring-green-500 dark:focus:ring-green-600 cursor-pointer"/>
              <label :for="'type-' + poiType.id" class="ml-3 text-gray-700 dark:text-gray-300 select-none cursor-pointer flex items-center">
                <img :src="getMarkerIconUrl(poiType)" alt="" class="h-6 w-6 mr-2 object-contain" loading="lazy" />
                <span>{{ poiType.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- === PANNEAU ADMINISTRATION === -->
        <div v-if="authStore.isAdmin" class="mt-6 pt-6 border-t dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Administration</h3>

          <!-- Mode édition -->
          <div class="mb-4">
            <div class="flex items-center">
              <input
                v-model="isEditMode"
                id="edit-mode"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300 dark:border-gray-600 rounded"
              />
              <label for="edit-mode" class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mode édition
              </label>
            </div>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Cliquez sur la carte pour ajouter un POI
            </p>
          </div>

          <!-- Bouton ajout manuel -->
          <button
            @click="openPoiModal()"
            class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 text-sm font-semibold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Créer un POI manuellement
          </button>
        </div>

        <!-- === UTILITAIRES === -->
        <div class="mt-6 pt-6 border-t dark:border-gray-700">
          <button @click="recenterMap" class="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2"><path d="M9.653 16.915l.005-.003-.011.006.006-.003ZM10 18a8 8 0 100-16 8 8 0 000 16ZM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0Z" /><path d="M10 4.75a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 4.75Z" /><path d="M10 8a2 2 0 100 4 2 2 0 000-4Z" /></svg>
            Recentrer la carte
          </button>
        </div>
      </aside>

      <!-- === ZONE DE CARTE PRINCIPALE === -->
      <main class="flex-grow h-full relative z-0" :class="{ 'cursor-crosshair': isEditMode || isPickingCoordinates }">
        <!-- Composant Leaflet Map -->
        <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false" @click="handleMapClick" class="h-full dark:bg-gray-800 dark:text-gray-200 [&_.leaflet-tile-pane]:dark:brightness-[0.85] [&_.leaflet-tile-pane]:dark:contrast-[0.9] [&_.leaflet-tile-pane]:dark:invert-[0.1]">
          <!-- Couche de tuiles OpenStreetMap -->
          <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution"></l-tile-layer>

          <!-- Marqueurs POI avec popups -->
          <l-marker
            v-for="poi in filteredPois"
            :key="poi.id"
            :lat-lng="[poi.latitude, poi.longitude]"
            :draggable="isEditMode"
            @dragend="handleMarkerDragEnd(poi, $event)"
          >
            <!-- Icône personnalisée du marqueur -->
            <l-icon :icon-url="getMarkerIconUrl(poi.type, poi)" :icon-size="[38, 52]" :icon-anchor="[19, 50]" :popup-anchor="[0, -50]" />

            <!-- Popup d'informations du POI -->
            <l-popup :min-width="250" class="leaflet-popup-custom">
              <!-- Nom du POI -->
              <div class="font-bold text-lg -mb-1 text-gray-800 dark:text-white">{{ poi.name }}</div>

              <!-- Description (HTML autorisé) -->
              <div v-if="poi.description" class="mt-2 text-base prose max-w-none text-gray-700 dark:text-gray-300" v-html="poi.description"></div>

              <!-- Adresse -->
              <div v-if="poi.address" class="text-sm text-gray-500 dark:text-gray-400 mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">{{ poi.address }}</div>

              <!-- Horaires de bus (visible pour les arrêts de bus) -->
              <div v-if="poi.busSchedules && poi.busSchedules.length > 0" class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                <div class="flex items-center mb-2">
                  <img
                    :src="getMarkerIconUrl(poi.type)"
                    alt="Icône arrêt de bus"
                    class="w-4 h-4 mr-2 object-contain"
                    loading="lazy"
                  />
                  <span class="text-sm font-medium text-blue-800 dark:text-blue-200">Horaires de bus</span>
                </div>
                <div class="space-y-1">
                  <div v-for="schedule in poi.busSchedules" :key="schedule.id" class="text-sm">
                    <div class="font-medium text-blue-700 dark:text-blue-300">{{ schedule.name }}</div>
                    <a
                      v-if="schedule.url"
                      :href="schedule.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                    >
                      Consulter les horaires
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Bouton itinéraire (sauf pour les dangers) -->
              <div class="mt-4" v-if="poi.type.name !== 'Danger'">
                <a :href="getDirectionsUrl(poi)" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-blue-400 font-semibold text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
                    <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                  </svg>
                  Itinéraire voiture
                </a>
              </div>

              <!-- Actions admin (modifier/supprimer) -->
              <div v-if="authStore.isAdmin" class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <button @click="openPoiModal(poi)" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Modifier</button>
                <button v-if="authStore.user?.roles.includes('ROLE_SUPER_ADMIN')" @click="handlePoiDelete(poi.id)" class="text-sm text-red-600 dark:text-red-400 hover:underline">Supprimer</button>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </main>
    </div>

    <!-- === OVERLAY MOBILE === -->
    <!-- Fond semi-transparent pour fermer le panneau sur mobile -->
    <div
      v-if="isAsideOpen"
      @click="isAsideOpen = false"
      class="md:hidden fixed inset-0 bg-black/50 z-[999]"
      aria-hidden="true"
    ></div>

    <!-- === MODALE D'ÉDITION POI (ADMIN) === -->
    <div v-if="isPoiModalOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]" @click.self="closePoiModal">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl dark:shadow-black/60 p-6 md:p-8 w-full max-w-lg mx-4">
        <!-- En-tête modale -->
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {{ currentPoi.id ? 'Modifier le Point d\'Intérêt' : 'Nouveau Point d\'Intérêt' }}
        </h2>

        <!-- Formulaire POI -->
        <form @submit.prevent="handlePoiSubmit" class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <!-- Champ nom -->
          <div>
            <label for="poi-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
            <input v-model="currentPoi.name" id="poi-name" type="text" required class="mt-1 w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400">
          </div>

          <!-- Champ description -->
          <div>
            <label for="poi-desc" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea v-model="currentPoi.description" id="poi-desc" required rows="4" class="mt-1 w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400"></textarea>
          </div>

          <!-- Sélection du type -->
          <div>
            <label for="poi-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
            <select v-model="currentPoi.type" id="poi-type" required class="mt-1 w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400">
              <option disabled :value="null">-- Choisir un type --</option>
              <option v-for="type in poiTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select>
          </div>

          <!-- Sélection des horaires de bus (visible seulement pour les arrêts de bus) -->
          <div v-if="isBusStopType" class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 1-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m6.75 4.5v-3.375a1.125 1.125 0 0 1 1.125-1.125h2.25a1.125 1.125 0 0 1 1.125 1.125v3.375m-6 0h4.5m0 0h1.5m-1.5 0v-1.5m1.5 1.5v-1.5" />
              </svg>
              Horaires de bus associés
            </label>

            <!-- Liste des horaires disponibles avec cases à cocher -->
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div v-for="schedule in busSchedules" :key="schedule.id" class="flex items-start space-x-3">
                <input
                  type="checkbox"
                  :id="`schedule-${schedule.id}`"
                  :value="schedule.id"
                  v-model="currentPoi.busSchedules"
                  class="mt-1 h-4 w-4 text-yellow-600 focus:ring-yellow-500 dark:focus:ring-yellow-400 border-gray-300 dark:border-gray-600 rounded"
                />
                <label :for="`schedule-${schedule.id}`" class="flex-1 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <div class="font-medium">{{ schedule.name }}</div>
                  <a
                    v-if="schedule.url"
                    :href="schedule.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center mt-1"
                    @click.stop
                  >
                    Consulter les horaires
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 ml-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </label>
              </div>
            </div>

            <p class="mt-3 text-xs text-gray-600 dark:text-gray-400">
              Sélectionnez un ou plusieurs horaires de bus pour cet arrêt. Seuls les horaires actifs sont disponibles.
            </p>

            <!-- Résumé des horaires sélectionnés -->
            <div v-if="currentPoi.busSchedules.length > 0" class="mt-3 p-3 bg-white dark:bg-gray-800 rounded border">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ currentPoi.busSchedules.length }} horaire{{ currentPoi.busSchedules.length > 1 ? 's' : '' }} sélectionné{{ currentPoi.busSchedules.length > 1 ? 's' : '' }} :
              </p>
              <div class="mt-2 space-y-1">
                <div
                  v-for="scheduleId in currentPoi.busSchedules"
                  :key="scheduleId"
                  class="text-sm text-gray-600 dark:text-gray-400"
                >
                  • {{ busSchedules.find(s => s.id === scheduleId)?.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- Champ adresse avec géocodage -->
          <div>
            <label for="poi-address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Adresse</label>
            <div class="mt-1 flex items-center gap-2">
              <input v-model="currentPoi.address" id="poi-address" type="text" placeholder="Ex: 17 Rue de la Mairie, 17580" class="flex-grow border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400">
              <!-- Bouton de géocodage -->
              <button @click.prevent="geocodeAddress" :disabled="isGeocoding" type="button" class="flex-shrink-0 px-3 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md" title="Trouver les coordonnées">
                <!-- Spinner pendant géocodage -->
                <svg v-if="isGeocoding" class="animate-spin h-5 w-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <!-- Icône géocodage -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-600 dark:text-gray-300"><path d="m9.422 2.306.056.095.006.012A6.51 6.51 0 0 1 10 2.5a6.5 6.5 0 0 1 5.994 4.025.064.064 0 0 0 .056-.095.006.006 0 0 1 .006-.012A6.51 6.51 0 0 1 10 2.5a6.5 6.5 0 0 1-.578-.019Z" /><path fill-rule="evenodd" d="m11.455 8.165.23.133.06.035a1.503 1.503 0 0 1 1.64 1.112c.039.12.068.243.088.366l.02.122.001.006a1.5 1.5 0 0 1-2.928.63l-.001-.006-.02-.123a1.509 1.509 0 0 1-.088-.366 1.5 1.5 0 0 1 1.004-1.748l.053-.028Zm-3.48.337a1.5 1.5 0 0 1 1.946-.86l.053.028a1.5 1.5 0 0 1 1.004 1.748l.02.123.001.006a1.5 1.5 0 0 1-2.928-.63l-.001-.006-.02-.123a1.505 1.505 0 0 1-.087-.366c0-.02.002-.04.004-.06Zm-1.87-2.115a6.5 6.5 0 0 1 7.89 0 .064.064 0 0 0 .095.056.006.006 0 0 1 .012.006A6.51 6.51 0 0 1 16.5 10a6.5 6.5 0 0 1-4.025 5.994.064.064 0 0 0-.095.056.006.006 0 0 1-.012.006A6.51 6.51 0 0 1 10 16.5a6.5 6.5 0 0 1-5.994-4.025.064.064 0 0 0-.056.095.006.006 0 0 1-.012.012A6.51 6.51 0 0 1 3.5 10a6.5 6.5 0 0 1 4.025-5.994.064.064 0 0 0 .056.095.006.006 0 0 1 .012.012A6.51 6.51 0 0 1 10 3.5c.578 0 1.14.074 1.68.21Z" clip-rule="evenodd" /></svg>
              </button>
            </div>
          </div>

          <!-- Section coordonnées -->
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div class="grid grid-cols-2 gap-4">
              <!-- Latitude -->
              <div>
                <label for="poi-lat" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Latitude</label>
                <input v-model="currentPoi.latitude" id="poi-lat" type="number" step="any" class="mt-1 w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-600 dark:text-white" placeholder="Cliqué ou auto">
              </div>
              <!-- Longitude -->
              <div>
                <label for="poi-lng" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Longitude</label>
                <input v-model="currentPoi.longitude" id="poi-lng" type="number" step="any" class="mt-1 w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-600 dark:text-white" placeholder="Cliqué ou auto">
              </div>
            </div>
            <!-- Bouton sélection sur carte -->
            <button type="button" @click="startCoordinatePicking" class="text-sm text-green-700 dark:text-green-500 hover:underline mt-2">
              Choisir sur la carte...
            </button>
          </div>

          <!-- Champ de visibilité -->
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
            <div class="flex items-center">
              <input
                v-model="currentPoi.isVisible"
                id="poi-visible"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300 dark:border-gray-600 rounded"
              />
              <label for="poi-visible" class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Point d'intérêt visible publiquement
              </label>
            </div>
            <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Si décoché, ce POI ne sera visible que par les administrateurs (affiché en gris sur la carte)
            </p>
          </div>

          <!-- Message d'erreur -->
          <div v-if="modalError" class="text-sm text-red-600 dark:text-red-400 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">{{ modalError }}</div>

          <!-- Boutons d'action -->
          <div class="flex justify-end gap-4 pt-4">
            <button type="button" @click="closePoiModal" class="px-5 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md">Annuler</button>
            <button type="submit" class="px-5 py-2 bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white rounded-md">Sauvegarder</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === STYLES SPÉCIFIQUES AU COMPOSANT === */

/* Configuration de base pour Leaflet */
.leaflet-container {
  height: 100%;
  width: 100%;
}

/* Curseur crosshair pour les modes d'interaction carte */
.cursor-crosshair {
  cursor: crosshair;
}

/* === STYLES POUR UN ÉVENTUEL TOGGLE MODE ÉDITION === */
/* Styles pour un éventuel toggle mode édition */
#edit-mode-toggle:checked ~ .dot {
  transform: translateX(1.5rem);
  background-color: #22c55e;
}

#edit-mode-toggle:checked + .block {
  background-color: #d1fae5;
}

/* === STYLES DARK MODE === */
/* Toggle mode édition en mode sombre */
.dark #edit-mode-toggle:checked ~ .dot {
  background-color: #22c55e;
}

.dark #edit-mode-toggle:checked + .block {
  background-color: #065f46;
}

/* Toggle couche cyclable en mode sombre (pour usage futur) */
.dark #cycle-layer-toggle:checked + .block {
  background-color: #1e3a8a;
}
</style>

<!-- === STYLES GLOBAUX POUR L'INTÉGRATION LEAFLET === -->
<style>
/* === CUSTOMISATION DES POPUPS LEAFLET EN MODE SOMBRE === */
.dark .leaflet-popup-content-wrapper,
.dark .leaflet-popup-tip {
  background-color: #1f2937 !important; /* Equivalent bg-gray-800 Tailwind */
  color: #e5e7eb !important; /* Equivalent text-gray-200 Tailwind */
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4) !important;
}

/* Bouton fermer popup en mode sombre */
.dark .leaflet-container a.leaflet-popup-close-button {
  color: #9ca3af !important; /* Equivalent text-gray-400 Tailwind */
}

.dark .leaflet-container a.leaflet-popup-close-button:hover {
  color: #f3f4f6 !important; /* Equivalent text-gray-100 Tailwind */
}

/* === CUSTOMISATION DU CONTENU PROSE EN MODE SOMBRE === */
/* Texte principal des descriptions POI */
.dark .prose {
  color: #d1d5db !important; /* Equivalent text-gray-300 Tailwind */
}

/* Liens dans les descriptions */
.dark .prose a {
  color: #60a5fa !important; /* Equivalent text-blue-400 Tailwind */
}

/* Texte en gras dans les descriptions */
.dark .prose strong {
  color: #f3f4f6 !important; /* Equivalent text-gray-100 Tailwind */
}

/* Puces des listes dans les descriptions */
.dark .prose ul > li::before {
  background-color: #4b5563 !important; /* Equivalent bg-gray-600 Tailwind */
}
</style>
