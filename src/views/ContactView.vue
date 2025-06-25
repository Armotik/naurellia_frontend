<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api';
import { activityLogger } from '@/services/activityLogger';

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function handleSubmit() {
  isLoading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await apiClient.post('/api/contact', formData.value);

    successMessage.value = 'Merci ! Votre message a bien été envoyé. Nous vous répondrons dès que possible.';
    await activityLogger.log('INFO', 'User submitted the contact form', { subject: formData.value.subject });

    // On vide le formulaire après succès
    formData.value = { name: '', email: '', subject: '', message: '' };

  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        errorMessage.value = "Vous avez déjà envoyé un message récemment. Veuillez réessayer dans une heure.";
      } else if (error.response.status === 400) {
        errorMessage.value = "Le sujet et le message doivent contenir au moins 5 caractères.. Veuillez vérifier vos informations.";
      } else {
        errorMessage.value = "Une erreur serveur est survenue. Veuillez réessayer plus tard.";
      }
    } else {
      errorMessage.value = "Erreur réseau. Impossible de contacter le serveur.";
    }
    console.error('Contact form error:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
    <div class="relative max-w-xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Nous Contacter
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-400">
          Une question, une suggestion, ou une proposition de partenariat ? N'hésitez pas à nous laisser un message.
        </p>
      </div>
      <div class="mt-12">
        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">

          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom complet</label>
            <div class="mt-1">
              <input v-model="formData.name" type="text" name="name" id="name" required autocomplete="name" class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div class="mt-1">
              <input v-model="formData.email" id="email" name="email" type="email" required autocomplete="email" class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sujet</label>
            <div class="mt-1">
              <input v-model="formData.subject" type="text" name="subject" id="subject" required class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <div class="mt-1">
              <textarea v-model="formData.message" id="message" name="message" rows="4" required class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"></textarea>
            </div>
          </div>

          <div v-if="successMessage" class="sm:col-span-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="sm:col-span-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
            {{ errorMessage }}
          </div>

          <div class="sm:col-span-2">
            <button type="submit" :disabled="isLoading" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:bg-green-400">
              {{ isLoading ? 'Envoi en cours...' : 'Envoyer le message' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
