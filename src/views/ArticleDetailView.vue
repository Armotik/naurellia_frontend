<script setup>
import { ref, watch, computed } from 'vue' // MODIFICATION: Ajout de 'computed'
import { useRoute, useRouter } from 'vue-router' // MODIFICATION: Ajout de 'useRouter'
import apiClient from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useLogger } from '@/composables/useLogger'

// --- State Management ---
const route = useRoute()
const router = useRouter() // MODIFICATION: Instance du routeur pour la redirection
const authStore = useAuthStore()

const article = ref(null)
const isLoading = ref(true)
const error = ref(null)

const newComment = ref('')
const isSubmitting = ref(false)

const isAdmin = computed(() => authStore.user?.roles.includes('ROLE_ADMIN'))
const isSuperAdmin = computed(() => authStore.user?.roles.includes('ROLE_SUPER_ADMIN'))

const { logFormAction, logAdminAction, logApiError, logAction } = useLogger()

// --- API Fetching ---
async function fetchArticle(slug, force = false) {
  isLoading.value = true
  error.value = null
  article.value = null

  const requestConfig = {}

  if (force) {
    requestConfig.params = { timestamp: new Date().getTime() }
  }

  try {
    const response = await apiClient.get(`/api/articles/${slug}`, requestConfig)
    article.value = response.data
  } catch (err) {
    error.value = "Impossible de charger l'article. Il n'existe peut-être pas."
    console.error("Erreur de chargement de l'article:", err)

    logApiError(`/api/articles/${slug}`, err.response?.status || 0, err.message, {
      method: 'GET',
    })
  } finally {
    isLoading.value = false
  }
}

// NOUVEAU: Actions d'administration pour l'article
async function handleToggleFeatured() {
  if (!article.value) return

  try {
    const payload = {
      // La requête PUT nécessite les champs obligatoires du groupe de dénormalisation
      title: article.value.title,
      slug: article.value.slug,
      content: article.value.content,
      category: article.value.category ? '/api/categories/' + article.value.category.id : null,
      isFeatured: !article.value.isFeatured,
      imageUrl: article.value.imageUrl,
    }
    const response = await apiClient.patch(`/api/articles/${article.value.slug}`, payload, {
      headers: { 'Content-Type': 'application/merge-patch+json' },
    })
    // Met à jour l'état local pour un retour visuel immédiat
    article.value.isFeatured = response.data.isFeatured

    logAdminAction('Toggle Featured Article', 'article', article.value.id, {
      slug: article.value.slug,
      title: article.value.title,
      isFeatured: article.value.isFeatured,
    })

  } catch (err) {
    console.error("Erreur lors de la mise à jour du statut 'à la une':", err)
    logApiError(`/api/articles/${article.value.slug}`, err.response?.status || 0, err.message, {
      method: 'PATCH',
      action: 'toggle_featured',
    })
    alert('Une erreur est survenue lors de la mise à jour.')
  }
}

async function handleDeleteArticle() {
  if (
    !article.value ||
    !window.confirm(
      'Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.',
    )
  ) {
    return
  }
  try {
    await apiClient.delete(`/api/articles/${article.value.slug}`)
    // Redirection vers la page principale du blog après la suppression
    logAdminAction('Delete Article', 'article', article.value?.id || 0, {
      slug: article.value.slug,
      title: article.value.title,
    })
    router.push('/blog')
  } catch (err) {
    console.error("Erreur lors de la suppression de l'article:", err)
    logApiError(`/api/articles/${article.value.slug}`, err.response?.status || 0, err.message, {
      method: 'DELETE',
      action: 'delete_article',
    })
    alert("Impossible de supprimer l'article. Vous n'avez peut-être pas les droits nécessaires.")
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
      article: `/api/articles/${article.value.slug}`,
    }

    const response = await apiClient.post('/api/comments', payload)
    const newCommentData = response.data

    logFormAction('comment', 'submit_success', {
      articleSlug: article.value.slug,
      commentId: newCommentData.id,
      contentLength: newCommentData.content.length,
    })

    newComment.value = ''
    await fetchArticle(route.params.slug, true)
  } catch (err) {
    console.error('Erreur lors de la soumission du commentaire:', err)

    logApiError('/api/comments', err.response?.status || 0, err.message, {
      method: 'POST',
      action: 'submit_comment',
      articleSlug: article.value.slug,
      username: authStore.isAuthenticated ? authStore.user.username : 'Anonyme',
    })

    if (err.response && err.response.status === 400) {
      alert('Erreur de validation: ' + (err.response.data.detail || 'Vérifiez votre commentaire.'))
    } else if (err.response && err.response.status === 422) {
      alert("Merci d'attendre 1 minute entre chaque commentaire.")
    } else {
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

    if (authStore.isAuthenticated && authStore.isAdmin) {
      logAdminAction('Delete Comment', 'comment', commentId, {
        articleSlug: article.value.slug,
      })
    } else {
      logAction('Delete Comment', 'comment', commentId, {
        articleSlug: article.value.slug,
        username: authStore.isAuthenticated ? authStore.user.username : 'Anonyme',
      })
    }

    await fetchArticle(route.params.slug, true)
  } catch (err) {
    console.error('Erreur lors de la suppression du commentaire:', err)
    alert(
      "Impossible de supprimer le commentaire. Vous n'avez peut-être pas les droits nécessaires.",
    )
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
  <div class="bg-white dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="isLoading" class="animate-pulse">
        <v-skeleton-loader class="max-w-4xl mx-auto">
          <template #default>
            <div class="space-y-6">
              <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div class="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          </template>
        </v-skeleton-loader>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <p class="text-xl text-red-600 dark:text-red-400">{{ error }}</p>
        <RouterLink to="/blog" class="text-blue-600 dark:text-blue-400 hover:underline mt-4"
          >Retour à la liste des articles
        </RouterLink>
      </div>

      <article v-else-if="article">
        <div
          v-if="isAdmin || isSuperAdmin"
          class="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700 flex items-center justify-end space-x-4"
        >
          <span class="text-sm font-bold text-gray-800 dark:text-gray-200 mr-auto"
            >Panneau d'administration</span
          >

          <RouterLink
            :to="`/blog/edit/${article.slug}`"
            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
          >
            Modifier
          </RouterLink>

          <button
            @click="handleToggleFeatured"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            :class="
              article.isFeatured
                ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            "
          >
            {{ article.isFeatured ? 'Retirer de la une' : 'Mettre à la une' }}
          </button>

          <button
            v-if="isSuperAdmin"
            @click="handleDeleteArticle"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          >
            Supprimer
          </button>
        </div>

        <div class="text-center mb-8">
          <p
            v-if="article.category"
            class="text-base font-semibold text-green-700 dark:text-green-500 uppercase"
          >
            {{ article.category.name }}
          </p>
          <h1
            class="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl"
          >
            {{ article.title }}
          </h1>
          <p class="mt-6 text-md text-gray-500 dark:text-gray-400">
            Publié le
            <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
          </p>
        </div>

        <div
          class="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-12 flex items-center justify-center"
        >
          <img
            v-if="article.imageUrl"
            :src="article.imageUrl"
            :alt="article.title"
            class="h-full w-full object-contain"
            loading="lazy"
          />
          <svg
            v-else
            class="h-24 w-24 text-gray-400 dark:text-gray-500"
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

        <div
          class="article-content prose prose-lg max-w-none dark:prose-invert"
          v-html="article.content"
        ></div>

        <div class="mt-16 border-t dark:border-gray-700 pt-10">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Commentaires ({{ article.comments.length }})
          </h2>

          <div v-if="authStore.isAuthenticated && authStore.isVerified" class="mb-8">
            <form @submit.prevent="handleCommentSubmit">
              <textarea
                v-model="newComment"
                rows="4"
                class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Écrivez votre commentaire..."
                required
              ></textarea>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:bg-green-400"
              >
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
              </button>
            </form>
          </div>
          <div v-else class="text-center bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <p class="dark:text-gray-300">
              Vous devez être
              <RouterLink
                to="/login"
                class="font-medium text-green-700 dark:text-green-500 hover:underline"
                >connecté
              </RouterLink>
              et vérifié pour poster un commentaire.
            </p>
          </div>

          <div class="space-y-6 mt-8">
            <div v-if="article.comments.length === 0" class="text-gray-500 dark:text-gray-400">
              Soyez le premier à commenter !
            </div>
            <div v-else v-for="comment in article.comments" :key="comment.id" class="flex">
              <div class="flex-shrink-0 mr-4">
                <div
                  class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 text-gray-500 dark:text-gray-400"
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
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{
                        comment.authorDisplayName ||
                        comment.author?.username ||
                        'Utilisateur Anonyme'
                      }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      <time :datetime="comment.createdAt"
                        >{{ formatDate(comment.createdAt) }}
                      </time>
                    </div>
                  </div>

                  <button
                    v-if="
                      authStore.isAuthenticated &&
                      authStore.user &&
                      (isAdmin ||
                        isSuperAdmin ||
                        (comment.author && authStore.user.username === comment.author.username))
                    "
                    @click="handleDeleteComment(comment.id)"
                    class="ml-4 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:underline focus:outline-none"
                    title="Supprimer ce commentaire"
                  >
                    Supprimer
                  </button>
                </div>
                <p class="mt-2 text-gray-700 dark:text-gray-300">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style>
/* Styles pour adapter le contenu HTML au thème sombre */
.article-content {
  /* Styles de base pour le texte */
  color: #374151; /* text-gray-700 */
}

/* Styles spécifiques pour le mode sombre */
.dark .article-content {
  color: #d1d5db; /* text-gray-300 */
}

/* Adaptation des éléments HTML courants */
.dark .article-content h1,
.dark .article-content h2,
.dark .article-content h3,
.dark .article-content h4,
.dark .article-content h5,
.dark .article-content h6 {
  color: #f3f4f6; /* text-gray-100 */
}

.dark .article-content a {
  color: #10b981; /* text-green-500 */
}

.dark .article-content a:hover {
  color: #34d399; /* text-green-400 */
}

.dark .article-content strong,
.dark .article-content b {
  color: #f9fafb; /* text-gray-50 */
}

.dark .article-content blockquote {
  color: #9ca3af; /* text-gray-400 */
  border-left-color: #4b5563; /* border-gray-600 */
}

.dark .article-content code,
.dark .article-content pre {
  background-color: #1f2937; /* bg-gray-800 */
  color: #e5e7eb; /* text-gray-200 */
}

.dark .article-content img {
  filter: brightness(0.8) contrast(1.2);
}

.dark .article-content hr {
  border-color: #374151; /* border-gray-700 */
}

.dark .article-content table {
  border-color: #4b5563; /* border-gray-600 */
}

.dark .article-content th {
  background-color: #374151; /* bg-gray-700 */
  color: #f3f4f6; /* text-gray-100 */
}

.dark .article-content td {
  border-color: #4b5563; /* border-gray-600 */
}

.dark .article-content ul li::before,
.dark .article-content ol li::marker {
  color: #9ca3af; /* text-gray-400 */
}
</style>
