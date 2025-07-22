<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import apiClient from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useLogger } from '@/composables/useLogger';

// --- State Management ---
const authStore = useAuthStore(); // MODIFICATION: Instance du store d'authentification
const allArticles = ref([]);
const categories = ref([]);
const selectedCategory = ref(null);
const selectedYear = ref(null);
const isLoading = ref(true);
const error = ref(null);
const showFeaturedOnly = ref(false);
const searchQuery = ref('');

const { logBlogAction, logApiError, logAdminAction } = useLogger();

// --- Computed Properties ---

// NOUVEAU: Propriétés calculées pour vérifier les rôles de l'utilisateur
const isAdmin = computed(() => authStore.user?.roles.includes('ROLE_ADMIN'));
const isSuperAdmin = computed(() => authStore.user?.roles.includes('ROLE_SUPER_ADMIN'));

// Extrait les 3 articles mis en avant les plus récents pour la section du haut
const featuredArticles = computed(() =>
  allArticles.value.filter(article => article.isFeatured).slice(0, 3)
);

// Calcule la liste des articles à afficher en fonction de tous les filtres
const filteredArticles = computed(() => {
  let articles = allArticles.value;

  if (showFeaturedOnly.value) {
    articles = articles.filter(article => article.isFeatured);
  }
  if (selectedCategory.value) {
    console.log(selectedCategory.value + " " + articles[0].category.id);
    articles = articles.filter(article => article.category && article.category.id === selectedCategory.value);
  }
  if (selectedYear.value) {
    articles = articles.filter(article => new Date(article.publishedAt).getFullYear() === selectedYear.value);
  }
  if (searchQuery.value.trim() !== '') {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    articles = articles.filter(article =>
      article.title.toLowerCase().includes(lowerCaseQuery) ||
      (article.content && article.content.toLowerCase().includes(lowerCaseQuery))
    );
  }

  return articles;
});

// Calcule la liste des années uniques pour lesquelles des articles existent
const archiveYears = computed(() => {
  const years = allArticles.value.map(article => new Date(article.publishedAt).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
});

// --- API Fetching ---

async function fetchData() {
  try {
    const [articlesResponse, categoriesResponse] = await Promise.all([
      apiClient.get('/api/articles', { params: { 'order[publishedAt]': 'desc' } }),
      apiClient.get('/api/categories')
    ]);

    allArticles.value = articlesResponse.data['hydra:member'] || articlesResponse.data;
    categories.value = categoriesResponse.data['hydra:member'] || categoriesResponse.data;
  } catch (err) {
    error.value = "Impossible de charger le contenu pour le moment.";
    console.error('Error fetching data:', err);
    logApiError('/api/articles', err.response?.status || 0, err.message);
  } finally {
    isLoading.value = false;
  }
}

// MODIFICATION: La fonction utilise maintenant le slug et envoie une charge utile complète pour le PUT
async function toggleFeatured(article) {
  try {
    // Pour une requête PUT, il est souvent nécessaire d'envoyer les champs requis.
    // L'API attend l'IRI pour les relations.
    const payload = {
      title: article.title,
      slug: article.slug,
      content: article.content,
      category: article.category ? '/api/categories/' + article.category.id : null,
      isFeatured: !article.isFeatured,
      imageUrl: article.imageUrl
    };

    const response = await apiClient.patch(`/api/articles/${article.slug}`, payload, {
      headers: { 'Content-Type': 'application/merge-patch+json' }
    });

    // On met à jour l'article localement pour un retour visuel immédiat
    const index = allArticles.value.findIndex(a => a.id === article.id);
    if (index !== -1) {
      allArticles.value[index].isFeatured = response.data.isFeatured;
    }

    logAdminAction('toggle_featured', 'article', article.id, {
      articleSlug: article.slug,
      articleTitle: article.title,
      newFeaturedStatus: !article.isFeatured
    });
  } catch (err) {
    console.error("Erreur lors de la mise en avant de l'article:", err);
    alert("Une erreur est survenue lors de la mise à jour de l'article.");
    logApiError(`/api/articles/${article.slug}`, err.response?.status || 0, err.message);
  }
}

// MODIFICATION: La fonction utilise le slug pour l'appel API et l'ID pour la mise à jour locale
async function deleteArticle(articleSlug, articleId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.")) return;
  try {
    await apiClient.delete(`/api/articles/${articleSlug}`);
    // On retire l'article de la liste pour un retour visuel immédiat
    allArticles.value = allArticles.value.filter(a => a.id !== articleId);

    logAdminAction('delete', 'article', articleId, {
      articleSlug: articleSlug
    });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'article:", err);
    alert("Vous n'avez peut-être pas les droits nécessaires.");
    logApiError(`/api/articles/${articleSlug}`, err.response?.status || 0, err.message);
  }
}


onMounted(() => {
  fetchData();
});

// --- Utility Functions ---

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function getExcerpt(content, length = 100) {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '');
  return text.length > length ? text.substring(0, length) + '...' : text;
}

function getCategoryStyle(categoryName) {
  const colors = {
    'Écologie': 'bg-green-100 text-green-800',
    'Découvertes': 'bg-blue-100 text-blue-800',
    'Actualités': 'bg-yellow-100 text-yellow-800',
    'default': 'bg-gray-100 text-gray-800'
  };
  return colors[categoryName] || colors['default'];
}

// --- Tracking Functions ---
function handleArticleClick(article, isFeatured = false, position = null) {
  logBlogAction('article_click', {
    articleId: article.id,
    articleSlug: article.slug,
    articleTitle: article.title,
    categoryId: article.category?.id,
    categoryName: article.category?.name,
    isFeatured: isFeatured,
    inFeaturedSection: isFeatured,
    position: position // Position dans la liste (0 = premier article à la une, etc.)
  });
}

function handleCategoryFilter(categoryId, categoryName) {
  logBlogAction('filter_category', {
    categoryId: categoryId,
    categoryName: categoryName,
    previousCategory: selectedCategory.value
  });
  selectedCategory.value = categoryId;
}

function handleYearFilter(year) {
  logBlogAction('filter_year', {
    selectedYear: year,
    previousYear: selectedYear.value
  });
  selectedYear.value = year;
}

function handleFeaturedToggle(showFeatured) {
  logBlogAction('filter_featured', {
    showFeaturedOnly: showFeatured,
    previousValue: showFeaturedOnly.value
  });
  showFeaturedOnly.value = showFeatured;
}

function handleSearchInput(query) {
  if (query.trim().length >= 3) { // Log seulement si au moins 3 caractères
    logBlogAction('search', {
      searchQuery: query.trim(),
      resultCount: filteredArticles.value.length
    });
  }
}

function clearFilters() {
  logBlogAction('clear_filters', {
    hadCategoryFilter: !!selectedCategory.value,
    hadYearFilter: !!selectedYear.value,
    hadFeaturedFilter: showFeaturedOnly.value
  });

  selectedCategory.value = null;
  selectedYear.value = null;
  showFeaturedOnly.value = false;
  searchQuery.value = '';
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Le Blog de Naurellia</h1>
        <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Conseils, reportages et découvertes pour un tourisme respectueux sur l'Île de Ré.
        </p>
      </div>

      <div v-if="isLoading" class="text-center mt-12">
        <v-skeleton-loader class="max-w-2xl mx-auto" type="article" :loading="isLoading" />
      </div>
      <div v-else-if="error" class="mt-12 text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-md"><p class="text-red-700 dark:text-red-400">{{ error }}</p></div>

      <div v-else class="mt-12">
        <div v-if="featuredArticles.length > 0" class="mb-20">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">À la une</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article v-if="featuredArticles[0]" class="lg:col-span-2 relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 group bg-white dark:bg-gray-800">
              <RouterLink
                :to="`/blog/${featuredArticles[0].slug}`"
                @click="handleArticleClick(featuredArticles[0], true, 0)"
                class="block h-full"
              >
                <div class="h-96 bg-gray-200 dark:bg-gray-700">
                  <img
                    v-if="featuredArticles[0].imageUrl"
                    :src="featuredArticles[0].imageUrl"
                    :alt="featuredArticles[0].title"
                    class="h-full w-full object-contain"
                    loading="lazy"
                  />
                  <svg v-else class="h-full w-full text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"/></svg>
                </div>
                <div class="p-8">
                  <span :class="getCategoryStyle(featuredArticles[0].category.name)" class="text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-3">{{ featuredArticles[0].category.name }}</span>
                  <h3 class="text-2xl font-bold leading-tight mt-2">
                    <RouterLink
                      :to="`/blog/articles/${featuredArticles[0].slug}`"
                      @click="handleArticleClick(featuredArticles[0], true, 0)"
                      class="hover:text-green-700 dark:hover:text-green-500 text-gray-900 dark:text-white"
                    >
                      <span class="absolute inset-0"></span>{{ featuredArticles[0].title }}
                    </RouterLink>
                  </h3>
                  <p class="mt-4 text-gray-500 dark:text-gray-400">{{ getExcerpt(featuredArticles[0].content, 150) }}</p>
                </div>
              </RouterLink>
            </article>
            <div v-if="featuredArticles.length > 1" class="space-y-6">
              <article v-for="(article, index) in featuredArticles.slice(1)" :key="article.id" class="group">
                <RouterLink
                  :to="`/blog/${article.slug}`"
                  @click="handleArticleClick(article, true, index + 1)"
                  class="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div class="h-48 bg-gray-200 dark:bg-gray-700">
                    <img
                      v-if="article.imageUrl"
                      :src="article.imageUrl"
                      :alt="article.title"
                      class="h-full w-full object-contain"
                      loading="lazy"
                    />
                    <svg v-else class="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" /></svg>
                  </div>
                  <div class="p-4 flex-1">
                    <span :class="getCategoryStyle(article.category.name)" class="text-xs font-semibold uppercase px-2 py-0.5 rounded-full">{{ article.category.name }}</span>
                    <h3 class="text-lg font-semibold mt-1 text-gray-900 dark:text-white">
                      <RouterLink
                        :to="`/blog/articles/${article.slug}`"
                        @click="handleArticleClick(article, true, index + 1)"
                        class="hover:text-green-700 dark:hover:text-green-500"
                      >
                        <span class="absolute inset-0"></span>{{ article.title }}
                      </RouterLink>
                    </h3>
                  </div>
                </RouterLink>
              </article>
            </div>
          </div>
        </div>

        <div v-if="isAdmin || isSuperAdmin" class="my-12 text-center">
          <RouterLink to="/blog/create" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un article
          </RouterLink>
        </div>


        <div class="mt-16">
          <div class="border-b border-gray-200 dark:border-gray-700 pb-5 mb-8">
            <div class="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
              <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Explorer nos articles</h2>
              <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div class="relative w-full sm:w-auto mb-2 sm:mb-0">
                  <input
                    type="text"
                    v-model="searchQuery"
                    @input="handleSearchInput(searchQuery)"
                    placeholder="Rechercher..."
                    class="w-full sm:w-32 md:w-48 pl-10 pr-4 py-2 text-sm rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400"
                  >
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" /></svg></div>
                </div>
                <select
                  v-model="selectedCategory"
                  @change="handleCategoryFilter(selectedCategory, categories.find(c => c.id === selectedCategory)?.name)"
                  class="text-sm rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 pl-3 pr-8 py-2 mb-2 sm:mb-0 w-full sm:w-auto"
                >
                  <option :value="null">Catégories</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
                <select
                  v-model="selectedYear"
                  @change="handleYearFilter(selectedYear)"
                  class="text-sm rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 pl-3 pr-8 py-2 mb-2 sm:mb-0 w-full sm:w-auto"
                >
                  <option :value="null">Année</option>
                  <option v-for="year in archiveYears" :key="year" :value="year">{{ year }}</option>
                </select>
                <label class="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full sm:w-auto">
                  <input
                    type="checkbox"
                    v-model="showFeaturedOnly"
                    @change="handleFeaturedToggle(showFeaturedOnly)"
                    class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 mr-2"
                  >
                  À la une
                </label>
                <button
                  v-if="selectedCategory || selectedYear || showFeaturedOnly || searchQuery"
                  @click="clearFilters"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
                >
                  Effacer les filtres
                </button>
              </div>
            </div>
          </div>

          <div class="max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            <div v-if="filteredArticles.length === 0" class="lg:col-span-3 text-center text-gray-500 dark:text-gray-400 py-16">Aucun article ne correspond à vos critères.</div>
            <article v-for="article in filteredArticles" :key="article.id" class="group">
              <RouterLink
                :to="`/blog/${article.slug}`"
                @click="handleArticleClick(article, false, index)"
                class="block h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div class="flex-shrink-0 h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
                  <span v-if="article.isFeatured" class="absolute top-2 left-2 text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>
                  </span>
                  <img
                    v-if="article.imageUrl"
                    :src="article.imageUrl"
                    :alt="article.title"
                    class="h-full w-full object-contain"
                    loading="lazy"
                  />
                  <svg v-else class="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" /></svg>
                </div>
                <div class="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
                  <div>
                    <p class="text-sm font-medium"><span :class="getCategoryStyle(article.category.name)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold">{{ article.category.name }}</span></p>
                    <RouterLink :to="`/blog/articles/${article.slug}`" class="block mt-2">
                      <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ article.title }}</p>
                    </RouterLink>
                  </div>
                  <div class="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
                  </div>
                </div>

                <div v-if="isAdmin || isSuperAdmin" class="bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600 p-3 flex justify-end items-center space-x-3">
                  <RouterLink :to="`/blog/edit/${article.slug}`" class="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:underline">
                    Modifier
                  </RouterLink>
                  <button @click="toggleFeatured(article)" class="text-xs font-medium py-1 px-2 rounded" :class="article.isFeatured ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'">
                    {{ article.isFeatured ? 'Retirer' : 'À la une' }}
                  </button>
                  <button v-if="isSuperAdmin" @click="deleteArticle(article.slug, article.id)" class="text-xs font-medium py-1 px-2 rounded bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50">
                    Supprimer
                  </button>
                </div>

              </RouterLink>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
