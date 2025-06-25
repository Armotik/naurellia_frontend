<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/api';

// --- Codemirror Imports ---
import { Codemirror } from 'vue-codemirror'
import { html } from '@codemirror/lang-html'
import { EditorView } from '@codemirror/view'

// --- State Management ---
const route = useRoute();
const router = useRouter();

const article = ref({
  title: '',
  slug: '',
  imageUrl: '',
  content: `<h2 class="text-2xl font-bold text-gray-800 mb-4">Bienvenue !</h2>
<p class="mb-6 text-gray-600">
  Utilisez cet éditeur pour créer des mises en page complexes avec les classes de Tailwind CSS.
</p>
<div class="flex gap-4">
  <div class="w-1/2 bg-green-100 p-4 rounded-lg border border-green-300">
    <h3 class="font-semibold text-green-800">Colonne 1</h3>
    <p class="text-sm text-green-700">Vous pouvez utiliser Flexbox ou Grid.</p>
  </div>
  <div class="w-1/2 bg-blue-100 p-4 rounded-lg border border-blue-300">
    <h3 class="font-semibold text-blue-800">Colonne 2</h3>
    <p class="text-sm text-blue-700">La prévisualisation à droite reflètera vos styles.</p>
  </div>
</div>
`,
  category: null,
  isFeatured: false,
});
const categories = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const error = ref(null);

const isEditMode = computed(() => !!route.params.slug);

// --- Codemirror Configuration ---
const extensions = [html(), EditorView.lineWrapping];

// --- API Fetching & Form Actions ---
async function fetchData() {
  isLoading.value = true;
  error.value = null;
  try {
    const categoriesResponse = await apiClient.get('/api/categories');
    categories.value = categoriesResponse.data['hydra:member'] || categoriesResponse.data;

    if (isEditMode.value) {
      const articleResponse = await apiClient.get(`/api/articles/${route.params.slug}`);
      const fetchedArticle = articleResponse.data;
      article.value = {
        title: fetchedArticle.title,
        slug: fetchedArticle.slug,
        imageUrl: fetchedArticle.imageUrl || '',
        content: fetchedArticle.content,
        category: fetchedArticle.category ? `/api/categories/${fetchedArticle.category.id}` : null,
        isFeatured: fetchedArticle.isFeatured,
      };
    }
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err);
    error.value = "Impossible de charger les données.";
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmit() {
  if (!article.value.category) {
    alert("Veuillez sélectionner une catégorie.");
    return;
  }
  isSaving.value = true;
  error.value = null;

  try {
    const payload = { ...article.value };
    let response;
    if (isEditMode.value) {
      response = await apiClient.patch(`/api/articles/${route.params.slug}`, payload, {
        headers: { 'Content-Type': 'application/merge-patch+json' }
      });
    } else {
      response = await apiClient.post('/api/articles', payload);
    }
    router.push(`/blog/articles/${response.data.slug}`);
  } catch (err) {
    console.error("Erreur lors de la soumission de l'article:", err);
    error.value = err.response?.data?.['hydra:description'] || "Une erreur est survenue.";
  } finally {
    isSaving.value = false;
  }
}

function generateSlug() {
  if (article.value.title) {
    article.value.slug = article.value.title
      .toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
  }
}

watch(() => article.value.title, () => {
  if (!isEditMode.value) { generateSlug(); }
});

onMounted(fetchData);
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/20">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-6">
          {{ isEditMode ? 'Modifier l\'article' : 'Créer un nouvel article' }}
        </h1>

        <div v-if="isLoading" class="text-center dark:text-gray-300"><p>Chargement du formulaire...</p></div>
        <div v-else-if="error" class="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4" role="alert">
          <p class="font-bold">Erreur</p>
          <p>{{ error }}</p>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre</label>
              <input type="text" v-model="article.title" id="title" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100" required>
            </div>
            <div>
              <label for="slug" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
              <input type="text" v-model="article.slug" id="slug" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100" :readonly="isEditMode" required>
            </div>
            <div>
              <label for="imageUrl" class="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de l'image (optionnel)</label>
              <input type="url" v-model="article.imageUrl" id="imageUrl" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100">
            </div>
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie</label>
              <select v-model="article.category" id="category" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100" required>
                <option :value="null" disabled>-- Choisir une catégorie --</option>
                <option v-for="cat in categories" :key="cat.id" :value="`/api/categories/${cat.id}`">{{ cat.name }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contenu de l'article (HTML)</label>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-300 dark:border-gray-700 rounded-lg p-1 dark:bg-gray-800">
              <div>
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase p-2">Éditeur HTML</h3>
                <Codemirror
                  v-model="article.content"
                  placeholder="Écrivez votre code HTML ici..."
                  :style="{ height: '600px', 'font-size': '14px' }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="extensions"
                  @change="(value) => article.content = value"
                  class="dark:cm-s-dark"
                />
              </div>
              <div class="bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase p-2 border-b dark:border-gray-600">Prévisualisation en direct</h3>
                <div class="p-4 dark:text-gray-100 preview-content" v-html="article.content"></div>
              </div>
            </div>
          </div>

          <div class="flex items-center pt-4">
            <input v-model="article.isFeatured" id="isFeatured" type="checkbox" class="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-green-600 focus:ring-green-500 dark:bg-gray-700">
            <label for="isFeatured" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">Mettre en avant cet article ?</label>
          </div>

          <div class="flex justify-end space-x-4">
            <RouterLink to="/blog" type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Annuler</RouterLink>
            <button type="submit" :disabled="isSaving" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 dark:focus:ring-offset-gray-900">
              {{ isSaving ? 'Enregistrement...' : (isEditMode ? 'Mettre à jour' : 'Publier') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
/* Pour que l'éditeur Codemirror prenne toute la hauteur de son conteneur */
.cm-editor {
  height: 100%;
}
.cm-scroller {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

/* Styles pour CodeMirror en mode sombre */
.dark .cm-editor {
  background-color: #1f2937;
  color: #f3f4f6;
}

.dark .cm-scroller {
  border-color: #4b5563;
}

.dark .cm-gutters {
  background-color: #374151;
  color: #9ca3af;
  border-color: #4b5563;
}

.dark .cm-activeLine {
  background-color: rgba(55, 65, 81, 0.5);
}

.dark .cm-activeLineGutter {
  background-color: #4b5563;
}

/* Styles pour la prévisualisation en mode sombre */
.dark .preview-content h1,
.dark .preview-content h2,
.dark .preview-content h3,
.dark .preview-content h4,
.dark .preview-content h5,
.dark .preview-content h6 {
  color: #f3f4f6;
}

.dark .preview-content p {
  color: #d1d5db;
}

.dark .preview-content a {
  color: #60a5fa;
}
</style>
