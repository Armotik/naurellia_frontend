<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api';
import { useLogger } from '@/composables/useLogger';

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const { logFormAction, logApiError } = useLogger();

async function handleSubmit() {
  isLoading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await apiClient.post('/api/contact', formData.value);

    successMessage.value = 'Merci ! Votre message a bien été envoyé. Nous vous répondrons dès que possible.';

    logFormAction('contact', 'submit_success', {
      subject: formData.value.subject,
      hasName: !!formData.value.name,
      hasEmail: !!formData.value.email,
      messageLength: formData.value.message.length
    });

    // On vide le formulaire après succès
    formData.value = { name: '', email: '', subject: '', message: '' };

  } catch (error) {
    let errorType;

    if (error.response) {
      if (error.response.status === 429) {
        errorMessage.value = "Vous avez déjà envoyé 3 messages récemment. Veuillez réessayer dans une heure.";
        errorType = 'rate_limit';
      } else if (error.response.status === 400) {
        errorMessage.value = "Le sujet et le message doivent contenir au moins 5 caractères.. Veuillez vérifier vos informations.";
        errorType = 'validation_error';
      } else {
        errorMessage.value = "Une erreur serveur est survenue. Veuillez réessayer plus tard.";
        errorType = 'server_error';
      }
    } else {
      errorMessage.value = "Erreur réseau. Impossible de contacter le serveur.";
      errorType = 'network_error';
    }

    console.error('Contact form error:', error);
    logApiError('/api/contact', error.response?.status || 0, error.message, {
      errorType: errorType,
      subject: formData.value.subject
    });

    logFormAction('contact', 'submit_error', {
      errorType: errorType,
      subject: formData.value.subject
    });
  } finally {
    isLoading.value = false;
  }
}

// Tracking des interactions avec le formulaire
function handleFieldFocus(fieldName) {
  logFormAction('contact', 'field_focus', { fieldName });
}

function handleFieldValidation(fieldName, isValid, errorMessage = null) {
  logFormAction('contact', 'field_validation', {
    fieldName,
    isValid,
    errorMessage
  });
}

// Validation en temps réel des champs
function validateField(fieldName, value) {
  let isValid = true;
  let errorMessage = null;

  switch (fieldName) {
    case 'name':
      isValid = value.trim().length >= 2;
      errorMessage = isValid ? null : 'Le nom doit contenir au moins 2 caractères';
      break;
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      errorMessage = isValid ? null : 'Format d\'email invalide';
      break;
    }
    case 'subject':
      isValid = value.trim().length >= 5;
      errorMessage = isValid ? null : 'Le sujet doit contenir au moins 5 caractères';
      break;
    case 'message':
      isValid = value.trim().length >= 10;
      errorMessage = isValid ? null : 'Le message doit contenir au moins 10 caractères';
      break;
  }

  handleFieldValidation(fieldName, isValid, errorMessage);
  return { isValid, errorMessage };
}

// Tracking du temps passé sur chaque champ
const fieldFocusTime = ref({});

function handleFieldFocusStart(fieldName) {
  fieldFocusTime.value[fieldName] = Date.now();
  handleFieldFocus(fieldName);
}

function handleFieldBlur(fieldName) {
  if (fieldFocusTime.value[fieldName]) {
    const timeSpent = Date.now() - fieldFocusTime.value[fieldName];
    logFormAction('contact', 'field_time_spent', {
      fieldName,
      timeSpent
    });
    delete fieldFocusTime.value[fieldName];
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
              <input
                v-model="formData.name"
                type="text"
                name="name"
                id="name"
                required
                autocomplete="name"
                @focus="handleFieldFocusStart('name')"
                @blur="handleFieldBlur('name')"
                @input="validateField('name', formData.name)"
                class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div class="mt-1">
              <input
                v-model="formData.email"
                id="email"
                name="email"
                type="email"
                required
                autocomplete="email"
                @focus="handleFieldFocusStart('email')"
                @blur="handleFieldBlur('email')"
                @input="validateField('email', formData.email)"
                class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sujet</label>
            <div class="mt-1">
              <input
                v-model="formData.subject"
                type="text"
                name="subject"
                id="subject"
                required
                @focus="handleFieldFocusStart('subject')"
                @blur="handleFieldBlur('subject')"
                @input="validateField('subject', formData.subject)"
                class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <div class="mt-1">
              <textarea
                v-model="formData.message"
                id="message"
                name="message"
                rows="4"
                required
                @focus="handleFieldFocusStart('message')"
                @blur="handleFieldBlur('message')"
                @input="validateField('message', formData.message)"
                class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"></textarea>
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
