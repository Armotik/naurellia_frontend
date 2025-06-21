<script setup>
import { ref, watch, computed } from 'vue' // MODIFICATION: Ajout de 'computed'
import { useRoute, useRouter } from 'vue-router' // MODIFICATION: Ajout de 'useRouter'
import apiClient from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { activityLogger } from '@/services/activityLogger'

// --- State Management ---
const route = useRoute()
const router = useRouter() // MODIFICATION: Instance du routeur pour la redirection
const authStore = useAuthStore()

const article = ref(null)
const isLoading = ref(true)
const error = ref(null)

const newComment = ref('')
const isSubmitting = ref(false)

// NOUVEAU: Propriétés calculées pour vérifier les rôles
const isAdmin = computed(() => authStore.user?.roles.includes('ROLE_ADMIN'));
const isSuperAdmin = computed(() => authStore.user?.roles.includes('ROLE_SUPER_ADMIN'));


// --- API Fetching ---
async function fetchArticle(slug) {
  isLoading.value = true
  error.value = null
  article.value = null

  try {
    const response = await apiClient.get(`/api/articles/${slug}`)
    article.value = response.data
  } catch (err) {
    error.value = "Impossible de charger l'article. Il n'existe peut-être pas."
    console.error("Erreur de chargement de l'article:", err)
  } finally {
    isLoading.value = false
  }
}

// NOUVEAU: Actions d'administration pour l'article
async function handleToggleFeatured() {
  if (!article.value) return;

  try {
    const payload = {
      // La requête PUT nécessite les champs obligatoires du groupe de dénormalisation
      title: article.value.title,
      slug: article.value.slug,
      content: article.value.content,
      category: article.value.category ? '/api/categories/' + article.value.category.id : null,
      isFeatured: !article.value.isFeatured,
      imageUrl: article.value.imageUrl
    };
    const response = await apiClient.patch(`/api/articles/${article.value.slug}`, payload, {
      headers: { 'Content-Type': 'application/merge-patch+json' }
    });
    // Met à jour l'état local pour un retour visuel immédiat
    article.value.isFeatured = response.data.isFeatured;
  } catch (err) {
    console.error("Erreur lors de la mise à jour du statut 'à la une':", err);
    alert("Une erreur est survenue lors de la mise à jour.");
  }
}

async function handleDeleteArticle() {
  if (!article.value || !window.confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.')) {
    return;
  }
  try {
    await apiClient.delete(`/api/articles/${article.value.slug}`);
    // Redirection vers la page principale du blog après la suppression
    router.push('/blog');
  } catch (err) {
    console.error("Erreur lors de la suppression de l'article:", err);
    alert("Impossible de supprimer l'article. Vous n'avez peut-être pas les droits nécessaires.");
  }
}


// --- Comment Actions ---
async function handleCommentSubmit() {
  if (!newComment.value.trim() || !article.value) return

  isSubmitting.value = true
  try {
    const payload = {
      content: newComment.value,
      // Utilisation de l'@id (IRI) pour lier le commentaire à l'article, c'est la méthode préférée par API Platform
      article: article.value['@id'],
    }

    const response = await apiClient.post('/api/comments', payload)
    const newCommentData = response.data;

    await activityLogger.log('INFO', 'User posted a new comment', {
      articleId: article.value.id,
      articleTitle: article.value.title,
      commentId: newCommentData.id
    });

    newComment.value = ''
    await fetchArticle(route.params.slug)

  } catch (err) {
    console.error('Erreur lors de la soumission du commentaire:', err)
    if (err.response && err.response.status === 400) {
      alert('Erreur de validation: ' + (err.response.data.detail || 'Vérifiez votre commentaire.'))
    }
    else if (err.response && err.response.status === 422) {
      alert('Merci d\'attendre 1 minute entre chaque commentaire.')
    }
    else {
      alert('Une erreur est survenue. Vous devez être connecté pour commenter.')
    }
  } finally {
    isSubmitting.value = false
  }
}

async function handleDeleteComment(commentId) {
  if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    return
  }

  try {
    await apiClient.delete(`/api/comments/${commentId}`)
    await fetchArticle(route.params.slug)
  } catch (err) {
    console.error('Erreur lors de la suppression du commentaire:', err)
    alert('Impossible de supprimer le commentaire. Vous n\'avez peut-être pas les droits nécessaires.')
  }
}

// --- Lifecycle and Watchers ---
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      fetchArticle(newSlug)
    }
  },
  { immediate: true },
)

// --- Utility Functions ---
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}
</script>


<template>
  <div class="bg-white py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="isLoading" class="animate-pulse">
        <v-skeleton-loader class="max-w-4xl mx-auto">
          <template #default>
            <div class="space-y-6">
              <div class="h-8 bg-gray-200 rounded w-1/3"></div>
              <div class="h-6 bg-gray-200 rounded w-1/4"></div>
              <div class="h-96 bg-gray-200 rounded-lg"></div>
              <div class="h-6 bg-gray-200 rounded w-full"></div>
              <div class="h-6 bg-gray-200 rounded w-full"></div>
            </div>
          </template>
        </v-skeleton-loader>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <p class="text-xl text-red-600">{{ error }}</p>
        <RouterLink to="/blog" class="mt-4 inline-block text-green-700 hover:underline"
        >Retour au blog</RouterLink
        >
      </div>

      <article v-else-if="article">

        <div v-if="isAdmin || isSuperAdmin" class="mb-8 bg-gray-50 rounded-lg p-4 border flex items-center justify-end space-x-4">
          <span class="text-sm font-bold text-gray-800 mr-auto">Panneau d'administration</span>

          <RouterLink :to="`/blog/edit/${article.slug}`" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Modifier
          </RouterLink>

          <button @click="handleToggleFeatured" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2" :class="article.isFeatured ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'">
            {{ article.isFeatured ? 'Retirer de la une' : 'Mettre à la une' }}
          </button>

          <button v-if="isSuperAdmin" @click="handleDeleteArticle" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Supprimer
          </button>
        </div>


        <div class="text-center mb-8">
          <p
            v-if="article.category"
            class="text-base font-semibold text-green-700 uppercase"
          >
            {{ article.category.name }}
          </p>
          <h1 class="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {{ article.title }}
          </h1>
          <p class="mt-6 text-md text-gray-500">
            Publié le
            <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
          </p>
        </div>

        <div class="h-96 bg-gray-200 rounded-lg mb-12 flex items-center justify-center">
          <svg
            class="h-24 w-24 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
            />
          </svg>
        </div>

        <div class="prose prose-lg max-w-none" v-html="article.content"></div>

        <div class="mt-16 border-t pt-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Commentaires ({{ article.comments.length }})
          </h2>

          <div v-if="authStore.isAuthenticated" class="mb-8">
            <form @submit.prevent="handleCommentSubmit">
              <textarea
                v-model="newComment"
                rows="4"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Écrivez votre commentaire..."
                required
              ></textarea>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
              >
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
              </button>
            </form>
          </div>
          <div v-else class="text-center bg-gray-100 p-4 rounded-md">
            <p>
              Vous devez être
              <RouterLink to="/login" class="font-medium text-green-700 hover:underline"
              >connecté</RouterLink
              >
              pour poster un commentaire.
            </p>
          </div>

          <div class="space-y-6 mt-8">
            <div v-if="article.comments.length === 0" class="text-gray-500">
              Soyez le premier à commenter !
            </div>
            <div v-else v-for="comment in article.comments" :key="comment.id" class="flex">
              <div class="flex-shrink-0 mr-4">
                <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 text-gray-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex-grow">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ comment.author.username || 'Utilisateur Anonyme' }}
                    </div>
                    <div class="text-sm text-gray-500">
                      <time :datetime="comment.createdAt">{{
                          formatDate(comment.createdAt)
                        }}</time>
                    </div>
                  </div>

                  <button
                    v-if="authStore.isAuthenticated && authStore.user && (isAdmin || isSuperAdmin || authStore.user.email === comment.author.email)"
                    @click="handleDeleteComment(comment.id)"
                    class="ml-4 text-xs text-red-600 hover:text-red-800 hover:underline focus:outline-none"
                    title="Supprimer ce commentaire"
                  >
                    Supprimer
                  </button>
                </div>
                <p class="mt-2 text-gray-700">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
