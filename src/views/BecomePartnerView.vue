<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api';
import { activityLogger } from '@/services/activityLogger';

import heroImage from '@/assets/img/ile-de-re-pont.webp';

const formData = ref({
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  website: '',
  businessType: '',
  message: '',
  subject: 'Nouvelle demande de partenariat'
});

const businessTypes = ['Hébergement', 'Restauration', 'Activité de loisir', 'Producteur local', 'Artisan', 'Association', 'Autre'];

const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function handleSubmit() {
  isLoading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await apiClient.post('/api/partner-inquiry', formData.value);

    successMessage.value = 'Merci ! Votre demande a bien été envoyée. Nous reviendrons vers vous très prochainement.';
    await activityLogger.log('INFO', 'User submitted a partnership inquiry', { companyName: formData.value.companyName });

  } catch (error) {
    let message = "Une erreur serveur est survenue. Veuillez réessayer plus tard.";
    if (error.response) {
      if (error.response.status === 429) {
        message = "Vous avez soumis trop de demandes. Veuillez réessayer dans une heure.";
      } else if (error.response.status === 422) {
        message = "Certains champs sont invalides. Veuillez vérifier vos informations.";
        if (error.response.data && error.response.data.violations) {
          message += '\n' + error.response.data.violations.join('\n');
        }
      }
    }
    errorMessage.value = message;
    console.error('Partnership form error:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <header class="hero-section" v-lazy-background="heroImage">
      <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      <div class="relative z-10 px-4 text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-shadow-lg">
          Ensemble, pour un tourisme durable
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-200 text-shadow">
          Rejoignez un réseau d'acteurs engagés et valorisez votre activité auprès d'un public passionné et respectueux.
        </p>
      </div>
      <div class="wave-container">
        <svg viewBox="0 0 1440 120" fill="currentColor" class="text-gray-50 dark:text-gray-900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 63l120-10.7c120-10.3 360-31.3 600-26.6s480 37.6 600 58.6l120 21.4V120H0V63z"></path>
        </svg>
      </div>
    </header>

    <main>
      <section class="bg-gray-50 dark:bg-gray-900 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-base font-semibold text-green-700 dark:text-green-500 tracking-wide uppercase">Un Partenariat de Valeurs</h2>
            <p class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
              Valorisons ensemble un tourisme authentique
            </p>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Rejoindre Naurellia, c'est plus qu'une simple publicité. C'est un engagement pour un avenir durable sur l'Île de Ré.
            </p>
          </div>
          <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 shadow-lg dark:shadow-green-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-4.44a1.012 1.012 0 0 1 1.433 0l4.43 4.44a1.012 1.012 0 0 1 0 .639l-4.43 4.44a1.012 1.012 0 0 1-1.433 0l-4.43-4.44Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-4.44a1.012 1.012 0 0 1 1.433 0l4.43 4.44a1.012 1.012 0 0 1 0 .639l-4.43 4.44a1.012 1.012 0 0 1-1.433 0l-4.43-4.44Z" /></svg>
              </div>
              <h3 class="mt-5 text-lg font-medium text-gray-900 dark:text-white">Visibilité Ciblée</h3>
              <p class="mt-2 text-base text-gray-500 dark:text-gray-400">Touchez une audience qualifiée, sensible aux valeurs de l'écologie et du tourisme responsable.</p>
            </div>
            <div>
              <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 shadow-lg dark:shadow-green-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              </div>
              <h3 class="mt-5 text-lg font-medium text-gray-900 dark:text-white">Image de Marque Positive</h3>
              <p class="mt-2 text-base text-gray-500 dark:text-gray-400">Associez votre nom à une initiative locale, moderne et respectueuse de l'environnement rétais.</p>
            </div>
            <div>
              <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 shadow-lg dark:shadow-green-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
              </div>
              <h3 class="mt-5 text-lg font-medium text-gray-900 dark:text-white">Soutien à la Mission</h3>
              <p class="mt-2 text-base text-gray-500 dark:text-gray-400">Participez activement à la protection du patrimoine naturel et culturel de l'île.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white dark:bg-gray-800 py-20">
        <div class="relative max-w-2xl mx-auto px-4">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Prêt à nous rejoindre ?
            </h2>
            <p class="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-400">
              Remplissez ce formulaire pour initier le contact. Nous étudions chaque demande avec la plus grande attention.
            </p>
          </div>
          <div class="mt-12">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                <div>
                  <label for="company-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom de votre structure</label>
                  <input v-model="formData.companyName" type="text" name="company-name" id="company-name" required class="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
                </div>
                <div>
                  <label for="business-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type d'activité</label>
                  <select v-model="formData.businessType" id="business-type" name="business-type" required class="mt-1 block w-full py-3 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600">
                    <option disabled value="">Veuillez choisir...</option>
                    <option v-for="type in businessTypes" :key="type" :value="type">{{ type }}</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                <div>
                  <label for="contact-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Votre nom (contact)</label>
                  <input v-model="formData.contactName" type="text" name="contact-name" id="contact-name" required class="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email de contact</label>
                  <input v-model="formData.email" id="email" name="email" type="email" required class="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
                </div>
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Téléphone <span class="text-gray-400 dark:text-gray-500">(Optionnel)</span></label>
                <input v-model="formData.phone" type="tel" name="phone" id="phone" class="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
              </div>
              <div>
                <label for="website" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Site web <span class="text-gray-400 dark:text-gray-500">(Optionnel)</span></label>
                <input v-model="formData.website" type="url" name="website" id="website" placeholder="https://..." class="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Votre message et vos motivations</label>
                <textarea v-model="formData.message" id="message" name="message" rows="5" required placeholder="Parlez-nous de vous, de vos valeurs, et de la manière dont votre activité s'inscrit dans une démarche de tourisme durable..." class="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"></textarea>
              </div>
              <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md">{{ successMessage }}</div>
              <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md whitespace-pre-line">{{ errorMessage }}</div>
              <div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Ajoutez ces styles dans votre section <style> */
.wave-container {
  position: absolute;
  bottom: -1px; /* Assure que la vague touche exactement le bas */
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 20; /* S'assure que la vague est au-dessus de la section suivante */
}

.wave-container svg {
  display: block;
  width: 100%;
  height: 120px; /* Hauteur fixe pour la vague */
  transform: translateY(1px); /* Petit ajustement pour éviter les espaces blancs */
}

/* Ajustez votre hero-section */
.hero-section {
  position: relative;
  height: 85vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: -1px;
  /* Placeholder pour l'image de fond avant chargement */
  background-color: #2c3e50; /* Couleur temporaire avant chargement */
  transition: background-image 0.3s ease-in-out;
}

/* Style pour l'image chargée */
.bg-loaded {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

.text-shadow-lg { text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
.text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
</style>
