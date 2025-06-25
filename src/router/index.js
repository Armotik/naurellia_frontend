import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'


const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const BlogView = () => import('@/views/BlogView.vue')
const ArticleDetailView = () => import('@/views/ArticleDetailView.vue')
const ContactView = () => import('@/views/ContactView.vue')
const PartnersView = () => import('@/views/PartnersView.vue')
const BecomePartnerView = () => import('@/views/BecomePartnerView.vue')
const LegalMentionsView = () => import('@/views/LegalMentionsView.vue')
const PrivacyPolicyView = () => import('@/views/PrivacyPolicyView.vue')
const TermsAndConditionsView = () => import('@/views/TermsAndConditionsView.vue')
const InteractiveMapView = () => import('@/views/InteractiveMapView.vue')
const WipView = () => import('@/views/WipView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')
const ArticleFormView = () => import('@/views/admin/ArticleFormView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const VerifyEmailNoticeView = () => import('@/views/VerifyEmailNoticeView.vue')
const ChangePasswordView = () => import('@/views/ChangePasswordView.vue')
const AccountView = () => import('@/views/account/AccountView.vue')
const ForgotPasswordView = () => import('@/views/auth/ForgotPasswordView.vue')
const ResetPasswordView = () => import('@/views/auth/ResetPasswordView.vue')
const DashboardLayout = () => import('@/views/admin/DashboardLayout.vue')
const AdminHomeView = () => import('@/views/admin/AdminHomeView.vue')
const LogsView = () => import('@/views/admin/LogsView.vue')
const SessionTrackerView = () => import('@/views/admin/SessionTrackerView.vue')
const UserManagementView = () => import('@/views/admin/UserManagementView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Naurellia - Tourisme durable sur l\'Île de Ré',
        metaTags: [
          {
            name: 'description',
            content: 'Naurellia - Découvrez l\'Île de Ré de manière responsable. Informations, conseils et ressources pour un tourisme durable et respectueux.'
          }
        ]
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
        title: 'Blog - Naurellia',
        metaTags: [
          {
            name: 'description',
            content: 'Articles et ressources sur le tourisme durable et responsable sur l\'Île de Ré.'
          }
        ]
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
      component: DashboardLayout,
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

// Mise à jour du titre et des métadonnées pour chaque navigation
router.beforeEach((to, from, next) => {
  // Mise à jour du titre
  document.title = to.meta.title || 'Naurellia';

  // Suppression des meta tags précédents
  const metaTags = document.querySelectorAll('meta[data-vue-router-controlled]');
  metaTags.forEach(tag => tag.remove());

  // Ajout des nouveaux meta tags
  if (to.meta.metaTags) {
    to.meta.metaTags.forEach(tagDef => {
      const tag = document.createElement('meta');
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute('data-vue-router-controlled', '');
      document.head.appendChild(tag);
    });
  }

  next();
});

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
