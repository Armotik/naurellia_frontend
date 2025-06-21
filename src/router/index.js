import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import BlogView from '@/views/BlogView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ContactView from '@/views/ContactView.vue'
import PartnersView from '@/views/PartnersView.vue'
import BecomePartnerView from '@/views/BecomePartnerView.vue'
import LegalMentionsView from '@/views/LegalMentionsView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import TermsAndConditionsView from '@/views/TermsAndConditionsView.vue'
import InteractiveMapView from '@/views/InteractiveMapView.vue'
import WipView from '@/views/WipView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ArticleFormView from '@/views/admin/ArticleFormView.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0, left: 0 }
    }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil',
        description: 'Bienvenue sur notre site. Découvrez nos services et notre communauté.'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Connexion',
        description: 'Connectez-vous à votre compte pour accéder à toutes les fonctionnalités.'
      }
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
      meta: {
        title: 'Blog',
        description: 'Découvrez nos derniers articles et actualités sur notre blog.'
      }
    },
    {
      path: '/blog/articles/:slug',
      name: 'article-detail',
      component: ArticleDetailView,
      props: true,
      meta: {
        title: 'Article',
        description: 'Détails de l’article du blog. Découvrez des articles intéressants et informatifs.'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Contact',
        description: 'Contactez-nous pour toute question ou demande d’information.'
      }
    },
    {
      path: '/partenaires',
      name: 'become-partner',
      component: PartnersView,
      meta: {
        title: 'Partenaires',
        description: 'Découvrez nos partenaires et comment vous pouvez rejoindre notre réseau.'
      }
    },
    {
      path: '/devenir-partenaire',
      name: 'become-partner-form',
      component: BecomePartnerView,
      meta: {
        title: 'Devenir Partenaire',
        description: 'Remplissez notre formulaire pour devenir partenaire et rejoindre notre communauté.'
      }
    },
    {
      path: '/mentions-legales',
      name: 'legal-mentions',
      component: LegalMentionsView,
      meta: {
        title: 'Mentions Légales',
        description: 'Consultez nos mentions légales pour en savoir plus sur notre entreprise et nos responsabilités.'
      }
    },
    {
      path: '/politique-de-confidentialite',
      name: 'privacy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Politique de Confidentialité',
        description: 'Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée.'
      }
    },
    {
      path: '/conditions-generales',
      name: 'terms-and-conditions',
      component: TermsAndConditionsView,
      meta: {
        title: 'Conditions Générales',
        description: 'Consultez nos conditions générales d’utilisation pour en savoir plus sur les règles et réglementations de notre site.'
      }
    },
    {
      path: '/map',
      name: 'interactive-map',
      component: InteractiveMapView,
      meta: {
        title: 'Carte interactive',
        description: 'Explorez notre carte interactive pour découvrir les lieux et événements liés à notre communauté.'
      }
    },
    {
      path: '/bientot-disponible',
      name: 'wip',
      component: WipView,
      meta: {
        title: 'Bientôt disponible',
        description: 'Cette page est en cours de développement. Revenez bientôt pour plus d’informations.'
      },
      children : [
        {
          path: '/dons',
          name: 'dons',
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Page non trouvée',
        description: 'La page que vous recherchez n’existe pas. Veuillez vérifier l’URL ou retourner à la page d’accueil.'
      }
    },
    {
      path: '/blog/create',
      name: 'article-create',
      component: ArticleFormView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAdmin) {
          next();
        } else {
          next('/login'); // ou vers une page d'erreur 403
        }
      }
    },
    // NOUVELLE ROUTE : Édition d'article
    {
      path: '/blog/edit/:slug',
      name: 'article-edit',
      component: ArticleFormView,
      props: true,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAdmin) {
          next();
        } else {
          next('/login'); // ou vers une page d'erreur 403
        }
      }
    },
  ],
})

export default router
