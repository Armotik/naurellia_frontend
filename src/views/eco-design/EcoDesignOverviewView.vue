<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLogger } from '@/composables/useLogger.js'

const { logAction } = useLogger()
const router = useRouter()

onMounted(() => {
  document.title = "Naurellia | Politique d'Éco-conception - Vue d'ensemble"

  logAction('eco_design_overview', 'page_view', {
    timestamp: Date.now(),
  })
})

// Navigation vers les sections détaillées
function navigateToSection(sectionSlug) {
  logAction('eco_design_overview', 'section_navigation', {
    section: sectionSlug,
    timestamp: Date.now(),
  })

  router.push(`/politique-ecoconception/${sectionSlug}`)
}

// Fonction pour logger les clics sur les liens mailto
function handleMailtoClick(emailType) {
  logAction('eco_design_overview', 'mailto_click', {
    emailType: emailType,
    timestamp: Date.now(),
  })
}
</script>

<template>
  <div class="bg-stone-50 dark:bg-gray-900 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête de la page -->
      <div class="text-center mb-16">
        <h2
          class="text-base font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase"
        >
          Numérique Responsable
        </h2>
        <p
          class="mt-3 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
        >
          Politique d'Éco-conception
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
          Vue d'ensemble de notre démarche conforme au RGESN
        </p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Dernière mise à jour : 22 juillet 2025
        </p>
      </div>

      <div
        class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-md border border-stone-200 dark:border-gray-700"
      >
        <!-- Introduction générale -->
        <section class="mb-12">
          <h2
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6"
          >
            Notre engagement environnemental
          </h2>
          <div class="space-y-4 text-base leading-7 text-gray-700 dark:text-gray-300">
            <p>
              Naurellia s'engage à réduire l'empreinte environnementale de ses services numériques.
              Cette politique d'éco-conception vise à intégrer les bonnes pratiques à chaque étape
              du cycle de vie de notre plateforme, en nous appuyant sur le
              <a
                href="https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/"
                class="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline"
                target="_blank"
                ><strong>Référentiel Général d'Écoconception de Services Numériques (RGESN)</strong
                >.
              </a>
            </p>
            <p>
              Notre objectif est de proposer une expérience utilisateur sobre, performante et
              respectueuse de l'environnement, tout en contribuant aux Objectifs de Développement
              Durable (ODD) et en respectant les limites planétaires.
            </p>
          </div>
        </section>

        <!-- Aperçu des thématiques RGESN -->
        <section class="mb-12">
          <h2
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6"
          >
            Thématiques du RGESN
          </h2>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <!-- 1. Stratégie -->
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-6 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 shadow-sm hover:shadow-md"
              @click="navigateToSection('strategie')"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-emerald-700 dark:bg-emerald-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">1</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Stratégie</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                La stratégie permet de déterminer et de suivre la pertinence, les enjeux et le
                pilotage de la conception du service numérique.
              </p>
              <div
                class="flex items-center text-emerald-700 dark:text-emerald-400 text-sm font-medium"
              >
                <span>10 critères implémentés</span>
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>

            <!-- 2. Spécifications -->
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-6 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 shadow-sm hover:shadow-md"
              @click="navigateToSection('specifications')"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-emerald-700 dark:bg-emerald-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">2</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Spécifications
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Cette partie regroupe les éléments de cadrage projet, les objectifs et contraintes
                du projet sur toute la durée de vie du service numérique.
              </p>
              <div
                class="flex items-center text-emerald-700 dark:text-emerald-400 text-sm font-medium"
              >
                <span>0 critère implémenté</span>
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>

            <!-- 3. Architecture -->
            <div
              class="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-75"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">3</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Architecture
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Cette partie porte sur la stratégie de conception et l'articulation des composants
                applicatifs entre le frontend et le backend.
              </p>
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <span>À venir</span>
              </div>
            </div>

            <!-- 4. UX/UI -->
            <div
              class="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-75"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">4</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">UX/UI</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Cette partie présente les étapes et méthodes de conception des services numériques
                pour définir les meilleures solutions d'interactions destinées aux utilisateurs.
              </p>
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <span>À venir</span>
              </div>
            </div>

            <!-- 5. Contenus -->
            <div
              class="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-75"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">5</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Contenus</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                La partie "contenus" concerne les documents et médias informatifs ajoutés au service
                numérique par des personnes contributrices et disponibles pour l'utilisateur final.
              </p>
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <span>À venir</span>
              </div>
            </div>

            <!-- 6. Frontend -->
            <div
              class="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-75"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">6</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Frontend</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Le frontend est l'ensemble des composants en opération sur un terminal utilisateur
                pour permettre l'utilisation d'un service numérique.
              </p>
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <span>À venir</span>
              </div>
            </div>

            <!-- 7. Backend -->
            <div
              class="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-75"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">7</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Backend</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                La partie s'intéresse à l'ensemble des composants en opération côté serveur pour
                permettre le fonctionnement d'un service numérique.
              </p>
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <span>À venir</span>
              </div>
            </div>

            <!-- 8. Hébergement -->
            <div
              class="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-75"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">8</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Hébergement
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Il s'agit des moyens mis en œuvre côté hébergement pour permettre la
                conception/développement, l'utilisation, et si applicable, l'entrainement d'un
                service numérique. Toute la chaîne d'hébergement mobilisée pour les fonctionnalités
                critiques du service (centres de données, Content Delivery Network, etc.) doit être
                prise en compte pour valider les critères de cette partie.
              </p>
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <span>À venir</span>
              </div>
            </div>

            <!-- 9. Algorithmie -->
            <div
              class="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-75"
            >
              <div class="flex items-center mb-4">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold">9</span>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Algorithmie
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Cette partie concerne les services numériques reposant sur une intelligence
                artificielle (IA). Elle vise la mise en place de princies d'écoconception et de
                frugalité quant à l'entraînement et l'inférence des modèles algorithmiques utilisés
                pour l'IA. La phase d'apprentissage désigne le processsus par lequel un système
                réalise, à partir de données et via des modèles algorithmiques, des calculs afin de
                proposer des fonctionnalités. Elle est suivie par une phase d'inférence, de mise en
                oeuvre des modèles entraînés.
              </p>
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <span>À venir</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Résumé des engagements -->
        <section class="mb-12">
          <h2
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6"
          >
            Nos engagements principaux
          </h2>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1"
                >
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Utilité justifiée</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Inscription dans les ODD 11, 12, 13 et 17
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1"
                >
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    Collecte de données responsable
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Principe de minimisation appliqué
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1"
                >
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Code source ouvert</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Publication sous licence MIT
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1"
                >
                  <span class="text-white text-xs font-bold">%</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    Objectifs de réduction
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    -20% poids pages, -30% émissions GES
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1"
                >
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Suivi et transparence</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Revues régulières et publication des résultats
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1"
                >
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Sécurité adaptée</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Équilibre sécurité-environnement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact -->
        <section>
          <h2
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6"
          >
            Contact et informations
          </h2>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 p-6 rounded-lg"
          >
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Pour toute question, suggestion ou retour d'expérience concernant notre politique
              d'éco-conception, n'hésitez pas à nous
              <a
                href="mailto:admin@naurellia.com"
                @click="handleMailtoClick('admin')"
                class="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline"
              >
                contacter </a
              >.
            </p>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Référent écoconception :</strong> Anthony MUDET</p>
              <p><strong>Formation :</strong> Écoconception numérique 2024</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles pour les transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
