import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

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
import RegisterView from '@/views/RegisterView.vue'
import VerifyEmailNoticeView from '@/views/VerifyEmailNoticeView.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import AccountView from '@/views/account/AccountView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'
import dashboardLayout from '@/views/admin/DashboardLayout.vue'
import AdminHomeView from '@/views/admin/AdminHomeView.vue'
import LogsView from '@/views/admin/LogsView.vue'
import SessionTrackerView from '@/views/admin/SessionTrackerView.vue'
import UserManagementView from '@/views/admin/UserManagementView.vue'

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
      path: '/carte',
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
      meta: {
        title: 'Éditer l\'article',
        description: 'Modifiez un article existant sur le blog.',
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/inscription',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Inscription',
        description: 'Créez un compte pour accéder à toutes les fonctionnalités de notre site.'
      }
    },
    {
      path: '/verifier-email',
      name: 'verify-email-notice',
      component: VerifyEmailNoticeView,
      meta: {
        title: 'Vérification de l\'email',
        description: 'Veuillez vérifier votre email pour activer votre compte.'
      }
    },
    {
      path: '/mon-compte',
      name: 'mon-compte',
      component: AccountView,
      meta: {
        title: 'Mon Compte',
        description: 'Gérez votre compte et vos informations personnelles.',
        requiresAuth: true
      },
      children: [
        {
          path: '',
          redirect: { name: 'change-password' }
        },
        {
          path: 'changer-mdp',
          name: 'change-password',
          component: ChangePasswordView,
          meta: {
            title: 'Changer le mot de passe',
            description: 'Modifiez votre mot de passe pour sécuriser votre compte.'
          }
        }
      ]
    },
    {
      path: '/mot-de-passe-oublie',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: {
        title: 'Mot de passe oublié',
        description: 'Réinitialisez votre mot de passe si vous l\'avez oublié.'
      }
    },
    {
      path: '/reinitialiser-mdp',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: {
        title: 'Réinitialiser le mot de passe',
        description: 'Entrez votre nouveau mot de passe pour réinitialiser votre compte.'
      }
    },
    {
      path: '/admin',
      component: dashboardLayout,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        title: 'Administration',
        description: 'Accédez au tableau de bord d\'administration pour gérer le site.'
      },
      children: [
        {
          path: '',
          redirect: '/admin/accueil'
        },
        {
          path: 'accueil',
          name: 'admin-home',
          component: AdminHomeView,
          meta: {
            title: 'Accueil Admin',
            description: 'Bienvenue dans le tableau de bord d\'administration.'
          }
        },
        {
          path: 'logs',
          name: 'admin-logs',
          component: LogsView,
          meta: {
            title: 'Logs Admin',
            description: 'Consultez les logs d\'activité du site pour surveiller les actions des utilisateurs.'
          }
        },
        {
          path: 'suivi-sessions',
          name: 'session-tracker',
          component: SessionTrackerView,
          meta: {
            title: 'Suivi des sessions',
            description: 'Surveillez les sessions actives et les activités des utilisateurs.'
          }
        },
        {
          path: 'utilisateurs',
          name: 'user-management',
          component: UserManagementView,
          meta: {
            title: 'Gestion des utilisateurs',
            description: 'Gérez les comptes utilisateurs, modifiez leurs rôles et gérez les permissions.'
          }
        }
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' }); // On le redirige vers la page de connexion
  }
  // Si l'utilisateur n'est pas admin et essaie d'accéder à une page admin
  else if (requiresAdmin && !authStore.isAdmin) {
    next({ name: 'home' }); // On le redirige vers l'accueil (ou une page 403)
  }
  // Sinon, on le laisse passer
  else {
    next();
  }
})

export default router
