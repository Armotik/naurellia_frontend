<template>
  <div
    v-if="shouldShowBanner"
    class="bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-400 p-4 transition-all duration-300"
    role="alert"
    aria-live="polite"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700 dark:text-blue-200">
            <strong>Mise à jour des documents légaux : </strong>
            <span v-if="latestDocument.isMultiple">
              Nos documents légaux ({{ latestDocument.name }}) ont été mis à jour le {{ latestDocument.date }}.
            </span>
            <span v-else>
              {{ latestDocument.name }} a été mis à jour le {{ latestDocument.date }}.
            </span>
          </p>
        </div>
      </div>
      <div class="flex-shrink-0">
        <button
          @click="dismissBanner"
          class="inline-flex text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md p-1.5"
          aria-label="Fermer la notification"
        >
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLegalDocumentsBanner } from '@/composables/useLegalDocumentsBanner'

const { shouldShowBanner, dismissBanner, getLatestModifiedDocument } = useLegalDocumentsBanner()
const latestDocument = getLatestModifiedDocument()
</script>
