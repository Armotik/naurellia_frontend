<script setup>
import { onMounted, ref } from 'vue';

const showBackToTop = ref(false);

onMounted(() => {
  document.title = 'Naurellia | Politique d\'Éco-conception';

  // Gestion du bouton retour en haut
  const handleScroll = () => {
    showBackToTop.value = window.scrollY > 500;
  };

  window.addEventListener('scroll', handleScroll);

  // Nettoyage lors du démontage
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<template>
  <div class="bg-stone-50 dark:bg-gray-900 py-16 sm:py-24 relative">
    <!-- Bouton de retour en haut flottant -->
    <Transition name="fade">
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Retour en haut de la page"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </Transition>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête de la page -->
      <div id="top" class="text-center mb-16">
        <h2 class="text-base font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">Numérique Responsable</h2>
        <p class="mt-3 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Politique d'Éco-conception
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
          Conformément au Référentiel Général d'Écoconception de Services Numériques (RGESN)
        </p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Dernière mise à jour : 10 juillet 2025
        </p>
        <div class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg max-w-2xl mx-auto">
          <p class="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note :</strong> Cette politique est un document évolutif. Vos retours sont précieux pour l'améliorer.
            N'hésitez pas à nous contacter pour toute question ou suggestion.
          </p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-md border border-stone-200 dark:border-gray-700 text-base leading-7 text-gray-700 dark:text-gray-300">
        <!-- Sommaire détaillé -->
        <div id="sommaire">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-stone-200 dark:border-gray-600 pb-3 mb-6">
            Sommaire
          </h2>

          <!-- Navigation rapide -->
          <div class="bg-gradient-to-r from-stone-50 to-emerald-50 dark:from-gray-800/50 dark:to-emerald-900/20 border border-stone-200 dark:border-gray-700 p-6 rounded-lg mb-8">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0 w-8 h-8 bg-emerald-700 dark:bg-emerald-600 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Navigation et organisation</h3>
            </div>
            <div class="space-y-3 text-sm">
              <p class="text-emerald-800 dark:text-emerald-300">
                <strong>Structure :</strong> Cette politique d'écoconception suit rigoureusement les 7 critères du RGESN
                (Référentiel Général d'Écoconception de Services Numériques) pour la thématique "Stratégie et Gouvernance".
              </p>
              <p class="text-emerald-800 dark:text-emerald-300">
                <strong>Navigation :</strong> Cliquez sur les liens du sommaire pour accéder directement aux sections.
                Le bouton flottant en bas à droite permet de revenir en haut à tout moment.
              </p>
              <p class="text-emerald-800 dark:text-emerald-300">
                <strong>Temps de lecture estimé :</strong> ~20-25 minutes pour une lecture complète,
                5-10 minutes pour une consultation ciblée selon vos besoins.
              </p>
            </div>
          </div>

          <nav class="space-y-6">
            <!-- Section 1: Introduction -->
            <div class="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/10">
              <div class="flex items-start space-x-3 mb-3">
                <div class="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">1</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <a href="#introduction" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 transition-colors">
                      Introduction générale
                    </a>
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Présentation de la démarche d'écoconception de Naurellia, contexte du RGESN et engagement environnemental.
                  </p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">Démarche globale</span>
                    <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">RGESN</span>
                    <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">Objectifs</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: Stratégie et Gouvernance -->
            <div class="border border-stone-300 dark:border-gray-600 rounded-lg p-4 bg-stone-50 dark:bg-gray-800/50">
              <div class="flex items-start space-x-3 mb-4">
                <div class="flex-shrink-0 w-8 h-8 bg-stone-700 dark:bg-stone-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">2</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <a href="#strategie" class="text-stone-800 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
                      Stratégie et Gouvernance (7 critères RGESN)
                    </a>
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Application détaillée des 7 critères fondamentaux de la thématique "Stratégie et Gouvernance"
                    du Référentiel Général d'Écoconception de Services Numériques.
                  </p>
                </div>
              </div>

              <!-- Sous-sections détaillées -->
              <div class="ml-11 space-y-4">
                <!-- Critère 1.1 -->
                <div class="border-l-4 border-emerald-600 dark:border-emerald-500 pl-4 bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-r">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    <a href="#critere-1-1" class="text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition-colors">
                      2.1 Critère 1.1 : Évaluation de l'utilité du service
                    </a>
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Justification de l'utilité du service par rapport aux ODD et limites planétaires.
                    Analyse critique de la valeur ajoutée versus impact environnemental.
                  </p>
                  <div class="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p class="font-medium text-emerald-900 dark:text-emerald-300 mb-1">Contenu principal :</p>
                      <ul class="space-y-1 text-emerald-800 dark:text-emerald-400">
                        <li>• Inscription dans les ODD 11, 12, 13, 17</li>
                        <li>• Limites planétaires et impact environnemental</li>
                        <li>• Analyse critique utilité vs ressources</li>
                        <li>• Bilan global impacts positifs/négatifs</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium text-emerald-900 dark:text-emerald-300 mb-1">Éléments techniques :</p>
                      <ul class="space-y-1 text-emerald-800 dark:text-emerald-400">
                        <li>• Justification des fonctionnalités</li>
                        <li>• Alternatives non numériques</li>
                        <li>• Analyse coût/bénéfice environnemental</li>
                        <li>• Prévention de l'effet rebond</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Critère 1.2 -->
                <div class="border-l-4 border-forest-600 dark:border-forest-500 pl-4 bg-forest-50 dark:bg-forest-900/10 p-3 rounded-r">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    <a href="#critere-1-2" class="text-forest-800 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-300 transition-colors">
                      2.2 Critère 1.2 : Identification des cibles utilisatrices et analyse des besoins métiers
                    </a>
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Définition précise des utilisateurs primaires et secondaires, analyse des besoins fonctionnels
                    et non fonctionnels, méthodologie de validation par l'usage.
                  </p>
                  <div class="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p class="font-medium text-forest-900 dark:text-forest-300 mb-1">Cibles utilisateurs :</p>
                      <ul class="space-y-1 text-forest-800 dark:text-forest-400">
                        <li>• Touristes écoresponsables</li>
                        <li>• Habitants locaux valorisateurs</li>
                        <li>• Acteurs tourisme local</li>
                        <li>• Collectivités et associations</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium text-forest-900 dark:text-forest-300 mb-1">Outils d'analyse :</p>
                      <ul class="space-y-1 text-forest-800 dark:text-forest-400">
                        <li>• ActivityLogger (interactions)</li>
                        <li>• SessionTracker (sessions)</li>
                        <li>• Analytics IP (parcours)</li>
                        <li>• Approche MVP itérative</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Critère 1.3 -->
                <div class="border-l-4 border-sage-600 dark:border-sage-500 pl-4 bg-sage-50 dark:bg-sage-900/10 p-3 rounded-r">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    <a href="#critere-1-3" class="text-sage-800 dark:text-sage-400 hover:text-sage-900 dark:hover:text-sage-300 transition-colors">
                      2.3 Critère 1.3 : Référent écoconception numérique
                    </a>
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Identification du référent écoconception, formation et compétences, responsabilités
                    et missions dans le contexte d'un projet personnel.
                  </p>
                  <div class="flex items-center space-x-4 bg-sage-100 dark:bg-sage-900/20 p-2 rounded text-xs">
                    <div class="font-medium text-sage-900 dark:text-sage-300">Référent :</div>
                    <div class="text-sage-800 dark:text-sage-400">Anthony MUDET - Formation écoconception 2024 - Contact unique projet</div>
                  </div>
                </div>

                <!-- Critère 1.4 -->
                <div class="border-l-4 border-amber-700 dark:border-amber-600 pl-4 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-r">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    <a href="#critere-1-4" class="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors">
                      2.4 Critère 1.4 : Revues régulières pour s'assurer du respect de la démarche d'écoconception
                    </a>
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Mise en place d'outils de monitoring, plan de revues en 3 phases,
                    transparence et publication des résultats.
                  </p>
                  <div class="grid grid-cols-3 gap-2 text-xs">
                    <div class="bg-amber-100 dark:bg-amber-900/20 p-2 rounded">
                      <p class="font-medium text-amber-900 dark:text-amber-300 mb-1">Phase 1: Stabilisation</p>
                      <p class="text-amber-800 dark:text-amber-400">Tests performance, documentation</p>
                    </div>
                    <div class="bg-amber-100 dark:bg-amber-900/20 p-2 rounded">
                      <p class="font-medium text-amber-900 dark:text-amber-300 mb-1">Phase 2: Montée en charge</p>
                      <p class="text-amber-800 dark:text-amber-400">Audits trimestriels, publication</p>
                    </div>
                    <div class="bg-amber-100 dark:bg-amber-900/20 p-2 rounded">
                      <p class="font-medium text-amber-900 dark:text-amber-300 mb-1">Phase 3: Optimisation</p>
                      <p class="text-amber-800 dark:text-amber-400">Revues mensuelles, amélioration</p>
                    </div>
                  </div>
                </div>

                <!-- Critère 1.5 -->
                <div class="border-l-4 border-orange-700 dark:border-orange-600 pl-4 bg-orange-50 dark:bg-orange-900/10 p-3 rounded-r">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    <a href="#critere-1-5" class="text-orange-800 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300 transition-colors">
                      2.5 Critère 1.5 : Objectifs en matière de réduction d'impacts environnementaux
                    </a>
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Définition des indicateurs environnementaux RGESN, stratégies d'écoconception déployées,
                    objectifs de réduction chiffrés à court, moyen et long terme.
                  </p>
                  <div class="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p class="font-medium text-orange-900 dark:text-orange-300 mb-1">Indicateurs prioritaires :</p>
                      <ul class="space-y-1 text-orange-800 dark:text-orange-400">
                        <li>• Consommation énergie primaire</li>
                        <li>• Émissions GES par utilisateur</li>
                        <li>• Consommation eau bleue</li>
                        <li>• Épuisement ressources abiotiques</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium text-orange-900 dark:text-orange-300 mb-1">Objectifs de réduction :</p>
                      <ul class="space-y-1 text-orange-800 dark:text-orange-400">
                        <li>• Court terme: -20% poids pages</li>
                        <li>• Moyen terme: -30% émissions GES</li>
                        <li>• Long terme: neutralité carbone</li>
                        <li>• Certification externe prévue</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Critère 1.6 -->
                <div class="border-l-4 border-lime-700 dark:border-lime-600 pl-4 bg-lime-50 dark:bg-lime-900/10 p-3 rounded-r">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    <a href="#critere-1-6" class="text-lime-800 dark:text-lime-400 hover:text-lime-900 dark:hover:text-lime-300 transition-colors">
                      2.6 Critère 1.6 : Collecte responsable et raisonnée des données
                    </a>
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Application du principe de minimisation, transparence totale, durées de conservation limitées,
                    exclusion volontaire du tracking comportemental.
                  </p>
                  <div class="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p class="font-medium text-lime-900 dark:text-lime-300 mb-1">Données collectées :</p>
                      <ul class="space-y-1 text-lime-800 dark:text-lime-400">
                        <li>• Comptes utilisateurs (minimum)</li>
                        <li>• Données techniques sécurité</li>
                        <li>• Analytics internes respectueux</li>
                        <li>• Géolocalisation optionnelle</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium text-lime-900 dark:text-lime-300 mb-1">Exclusions volontaires :</p>
                      <ul class="space-y-1 text-lime-800 dark:text-lime-400">
                        <li>• Tracking comportemental</li>
                        <li>• Cookies tiers (Google, etc.)</li>
                        <li>• Profilage utilisateur</li>
                        <li>• Données sensibles</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Critère 1.7 -->
                <div class="border-l-4 border-red-700 dark:border-red-600 pl-4 bg-red-50 dark:bg-red-900/10 p-3 rounded-r">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    <a href="#critere-1-7" class="text-red-800 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors">
                      2.7 Critère 1.7 : Niveau de chiffrement adapté aux besoins
                    </a>
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Équilibre sécurité-environnement, choix d'algorithmes optimisés, architecture MVC sécurisée,
                    principe de "sécurité suffisante" appliqué.
                  </p>
                  <div class="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p class="font-medium text-red-900 dark:text-red-300 mb-1">Sécurité déployée :</p>
                      <ul class="space-y-1 text-red-800 dark:text-red-400">
                        <li>• HTTPS/TLS 1.3 (transport)</li>
                        <li>• bcrypt (mots de passe)</li>
                        <li>• JWT optimisés (sessions)</li>
                        <li>• Pare-feu applicatif</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium text-red-900 dark:text-red-300 mb-1">Optimisations éco :</p>
                      <ul class="space-y-1 text-red-800 dark:text-red-400">
                        <li>• Algorithmes efficaces</li>
                        <li>• Sessions courtes</li>
                        <li>• Logging minimal</li>
                        <li>• Compression intelligente</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 3: Contact -->
            <div class="border border-emerald-200 dark:border-emerald-700 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-900/10">
              <div class="flex items-start space-x-3 mb-3">
                <div class="flex-shrink-0 w-8 h-8 bg-emerald-700 dark:bg-emerald-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">3</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <a href="#contact" class="text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition-colors">
                      Contact et informations complémentaires
                    </a>
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Informations de contact pour questions, retours et collaboration sur la démarche d'écoconception.
                    Engagement vers la transparence et l'amélioration continue.
                  </p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded">Contact unique</span>
                    <span class="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded">Retours bienvenus</span>
                    <span class="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded">Transparence</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <!-- Navigation rapide par badges -->
          <div class="mt-8 p-6 bg-gradient-to-r from-stone-50 to-emerald-50 dark:from-gray-800/50 dark:to-emerald-900/20 border border-stone-200 dark:border-gray-700 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-emerald-700 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Navigation rapide par thème
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Accédez directement aux sections selon vos besoins spécifiques :
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <!-- Badges par thème -->
              <a href="#critere-1-1" class="group p-3 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all">
                <div class="text-emerald-900 dark:text-emerald-200 font-medium text-sm">Utilité</div>
                <div class="text-emerald-700 dark:text-emerald-400 text-xs">ODD & justification</div>
              </a>
              <a href="#critere-1-2" class="group p-3 bg-forest-100 dark:bg-forest-900/30 border border-forest-200 dark:border-forest-800 rounded-lg hover:bg-forest-200 dark:hover:bg-forest-900/50 transition-all">
                <div class="text-forest-900 dark:text-forest-200 font-medium text-sm">Utilisateurs</div>
                <div class="text-forest-700 dark:text-forest-400 text-xs">Cibles & besoins</div>
              </a>
              <a href="#critere-1-3" class="group p-3 bg-sage-100 dark:bg-sage-900/30 border border-sage-200 dark:border-sage-800 rounded-lg hover:bg-sage-200 dark:hover:bg-sage-900/50 transition-all">
                <div class="text-sage-900 dark:text-sage-200 font-medium text-sm">Référent</div>
                <div class="text-sage-700 dark:text-sage-400 text-xs">Compétences & contact</div>
              </a>
              <a href="#critere-1-4" class="group p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all">
                <div class="text-amber-900 dark:text-amber-200 font-medium text-sm">Revues</div>
                <div class="text-amber-700 dark:text-amber-400 text-xs">Monitoring & suivi</div>
              </a>
              <a href="#critere-1-5" class="group p-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all">
                <div class="text-orange-900 dark:text-orange-200 font-medium text-sm">Objectifs</div>
                <div class="text-orange-700 dark:text-orange-400 text-xs">Réduction impacts</div>
              </a>
              <a href="#critere-1-6" class="group p-3 bg-lime-100 dark:bg-lime-900/30 border border-lime-200 dark:border-lime-800 rounded-lg hover:bg-lime-200 dark:hover:bg-lime-900/50 transition-all">
                <div class="text-lime-900 dark:text-lime-200 font-medium text-sm">Données</div>
                <div class="text-lime-700 dark:text-lime-400 text-xs">Collecte responsable</div>
              </a>
              <a href="#critere-1-7" class="group p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                <div class="text-red-900 dark:text-red-200 font-medium text-sm">Sécurité</div>
                <div class="text-red-700 dark:text-red-400 text-xs">Chiffrement adapté</div>
              </a>
              <a href="#contact" class="group p-3 bg-stone-100 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-800 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-900/50 transition-all">
                <div class="text-stone-900 dark:text-stone-200 font-medium text-sm">Contact</div>
                <div class="text-stone-700 dark:text-stone-400 text-xs">Questions & retours</div>
              </a>
            </div>
          </div>

          <!-- Statistiques du document -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-lg">
              <div class="text-2xl font-bold text-emerald-700 dark:text-emerald-400">7</div>
              <div class="text-sm text-emerald-600 dark:text-emerald-300">Critères RGESN</div>
            </div>
            <div class="bg-forest-50 dark:bg-forest-900/20 border border-forest-200 dark:border-forest-800 p-4 rounded-lg">
              <div class="text-2xl font-bold text-forest-700 dark:text-forest-400">1500+</div>
              <div class="text-sm text-forest-600 dark:text-forest-300">Lignes de contenu</div>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
              <div class="text-2xl font-bold text-amber-700 dark:text-amber-400">20-25</div>
              <div class="text-sm text-amber-600 dark:text-amber-300">Minutes de lecture</div>
            </div>
          </div>
        </div>

        <hr class="my-12 border-gray-200 dark:border-gray-700">

        <!-- Introduction -->
        <section id="introduction" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">1. Introduction</h2>
          <div class="space-y-4">
            <p>
              Naurellia s'engage à réduire l'empreinte environnementale de ses services numériques. Cette politique d'éco-conception vise à intégrer les bonnes pratiques à chaque étape du cycle de vie de notre plateforme, en nous appuyant sur le RGESN. Notre objectif est de proposer une expérience utilisateur sobre, performante et respectueuse de l'environnement.
            </p>
            <p>
              Le Référentiel Général d'Écoconception de Services Numériques (RGESN) structure notre approche autour de 9 thématiques principales, chacune déclinée en critères et indicateurs mesurables.
            </p>
          </div>
        </section>

        <!-- 1. Stratégie et Gouvernance -->
        <section id="strategie" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">2. Stratégie et Gouvernance</h2>

          <!-- Critère 1.1 : Évaluation de l'utilité -->
          <div class="mb-8" id="critere-1-1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critère 1.1 : Évaluation de l'utilité du service</h3>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Prendre en compte l'utilité du service numérique dès sa conception, par exemple son inscription dans au moins l'un des objectifs de développement durable (ODD), l'un des enjeux de limites planétaires ou tout autre référentiel du même type.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Il s'agit de déterminer en amont du projet si l'utilité du service est avérée en se référant à des référentiels reconnus.
              </p>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inscription dans les Objectifs de Développement Durable (ODD)</h4>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">11.</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Villes et communautés durables</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Naurellia contribue à rendre les villes plus inclusives, sûres, résilientes et durables en facilitant la découverte et la valorisation du patrimoine local, encourageant un tourisme respectueux et des déplacements écoresponsables.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">12.</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Consommation et production responsables</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">La plateforme promeut un tourisme local et responsable, réduisant les déplacements longue distance et valorisant les circuits courts.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">13.</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Lutte contre les changements climatiques</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Naurellia contribue à la sensibilisation et à l'éducation sur les enjeux climatiques en mettant en avant des pratiques de tourisme durable et en encourageant les utilisateurs à adopter des comportements écoresponsables.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">17.</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Partenariats pour la réalisation des objectifs</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Naurellia facilite les partenariats entre acteurs locaux, institutions et citoyens pour la préservation du patrimoine.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Limites planétaires et impact environnemental</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <p><strong class="text-gray-900 dark:text-white">Changement climatique :</strong> Promotion du tourisme local réduisant les émissions de transport et promouvant les modes de déplacement doux.</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <p><strong class="text-gray-900 dark:text-white">Biodiversité :</strong> Sensibilisation aux espaces naturels et leur préservation</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <p><strong class="text-gray-900 dark:text-white">Utilisation des sols :</strong> Valorisation des territoires existants sans artificialisation</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analyse critique de l'utilité</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">L'utilisation du numérique est-elle nécessaire ?</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Oui, Naurellia utilise le numérique pour faciliter l'accès à l'information sur le patrimoine local, promouvoir des pratiques de tourisme durable et encourager les interactions entre les acteurs locaux. Sans cette plateforme numérique, la diffusion de ces informations serait limitée et moins efficace.</p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Existe-t-il d'autres solutions non numériques ?</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Il existe des solutions non numériques, comme les brochures papier ou les visites guidées traditionnelles. Cependant, ces solutions sont moins interactives, moins accessibles et ne permettent pas de toucher un public aussi large que le numérique.</p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Quels sont les réels besoins justifiant la création du service ?</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Les besoins incluent la valorisation du patrimoine local, la promotion d'un tourisme durable, et la sensibilisation des citoyens aux enjeux environnementaux. Naurellia répond à ces besoins en fournissant une plateforme accessible et interactive.</p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">La valeur ajoutée justifie-t-elle les ressources requises ? Est-ce qu'on crée plus de valeur qu'on en détruit ?</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Oui, la valeur ajoutée de Naurellia réside dans sa capacité à sensibiliser et à éduquer le public sur les enjeux environnementaux tout en promouvant le patrimoine local. En facilitant un tourisme responsable, la plateforme contribue à la préservation des ressources naturelles et culturelles, créant ainsi plus de valeur qu'elle n'en détruit.</p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Pour chaque fonctionnalité, est-elle vraiment nécessaire ? Peut-on faire autrement ?</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Oui, chaque fonctionnalité de Naurellia est conçue pour répondre à des besoins spécifiques liés à la valorisation du patrimoine et à la promotion d'un tourisme durable. Par exemple, les fonctionnalités de géolocalisation et de cartographie permettent aux utilisateurs de découvrir facilement les sites d'intérêt local. Bien que certaines fonctionnalités puissent être réalisées autrement (par exemple, des visites guidées sans numérique), l'approche numérique permet une plus grande interactivité, accessibilité et mise à jour en temps réel des informations.</p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Que se passerait-il sans ce service ?</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Sans Naurellia, il y aurait une diminution de la visibilité et de la valorisation du patrimoine local, une moindre sensibilisation aux enjeux environnementaux, et un risque accru de tourisme de masse non régulé. La plateforme joue un rôle crucial dans l'éducation et la promotion d'un tourisme durable, et son absence limiterait les efforts pour encourager des comportements écoresponsables.</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analyse des impacts environnementaux</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold text-green-600 dark:text-green-400 mb-2">Impacts positifs</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Réduction des déplacements touristiques longue distance</li>
                    <li>Optimisation des parcours (moins de km parcourus)</li>
                    <li>Sensibilisation à l'environnement</li>
                    <li>Valorisation des transports doux</li>
                    <li>Réduction de l'impression de supports papier</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-red-600 dark:text-red-400 mb-2">Impacts négatifs</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Consommation énergétique des serveurs</li>
                    <li>Utilisation de terminaux mobiles</li>
                    <li>Transfert de données</li>
                    <li>Potentiel effet rebond (plus de visites)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bilan global</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Utilité justifiée :</strong> Naurellia répond à un besoin social et environnemental réel</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Inscription ODD :</strong> Contribution directe aux ODD 11, 12, 13 et 17</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Bilan positif :</strong> Les bénéfices environnementaux et sociaux dépassent les coûts</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-yellow-600 dark:text-yellow-400 font-bold">!</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Vigilance :</strong> Surveillance des effets rebond et optimisation continue</p>
                </div>
              </div>
            </div>
          </div>

          <hr class='my-12 border-gray-200 dark:border-gray-700'>

          <!-- Critère 1.2 : Identification des cibles utilisatrices et analyse des besoins métiers -->
          <div class="mb-8" id="critere-1-2">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critère 1.2 : Identification des cibles utilisatrices et analyse des besoins métiers</h3>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif du critère</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Pour répondre au plus juste aux utilisateurs du service numérique, il est indispensable de connaître ses cibles : leurs usages, leurs besoins et leurs comportements, afin de ne pas surcharger les services numériques en fonctionnalités et contenus, ni les appauvrir au point qu'ils ne répondent pas aux attentes.
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Sans l'identification des catégories d'utilisateurs primaires et secondaires, il est difficile de dimensionner correctement le service numérique. Les incertitudes poussent à extrapoler les besoins souvent au-delà des attentes réelles.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Il faut éviter toute fonctionnalité non essentielle et vérifier qu'un ou plusieurs services existants ne répondent pas déjà au besoin, pour ne pas les dupliquer.
              </p>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cibles utilisatrices identifiées</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Utilisateurs primaires</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Touristes :</strong> Cherchant à découvrir le patrimoine local de manière écoresponsable</li>
                    <li>• <strong>Habitants locaux :</strong> Souhaitant valoriser et préserver leur patrimoine culturel et naturel</li>
                    <li>• <strong>Acteurs du tourisme local :</strong> Cherchant à promouvoir des activités et des sites touristiques durables</li>
                    <li>• <strong>Visiteurs occasionnels sensibilisés à l'écologie :</strong> Intéressés par des pratiques de tourisme durable et écoresponsable</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Utilisateurs secondaires</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Collectivités locales :</strong> Intéressées par la promotion du patrimoine local et le développement d'un tourisme durable</li>
                    <li>• <strong>Associations culturelles et environnementales :</strong> Cherchant à collaborer pour la préservation du patrimoine</li>
                    <li>• <strong>Professionnels du tourisme :</strong> Intéressés par des outils facilitant la découverte du patrimoine local</li>
                    <li>• <strong>Chercheurs et universitaires :</strong> Souhaitant étudier les impacts du tourisme sur le patrimoine local</li>
                    <li>• <strong>Administrateurs de la plateforme :</strong> Chargés de la gestion et de l'animation de la plateforme Naurellia</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analyse des besoins métiers</h4>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-3">Besoins fonctionnels</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Carte interactive :</strong> Géolocalisation et navigation vers les points d'intérêt</li>
                    <li>• <strong>Points d'intérêt (POI) :</strong> Informations détaillées sur les sites touristiques, culturels et naturels, de recyclage, de santé, etc.</li>
                    <li>• <strong>Blog informatif :</strong> Articles sur le patrimoine local, les initiatives écoresponsables, les événements locaux</li>
                    <li>• <strong>Système de partenariat :</strong> Faciliter les collaborations entre acteurs locaux, institutions et citoyens</li>
                    <li>• <strong>Authentification et gestion des utilisateurs :</strong> Permettre aux utilisateurs de créer un compte, de sauvegarder leurs préférences et de contribuer au contenu</li>
                    <li>• <strong>Administration de la plateforme :</strong> Outils pour les administrateurs afin de gérer le contenu, les utilisateurs et les partenariats</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-3">Besoins non fonctionnels</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Accessibilité :</strong> Assurer que la plateforme est accessible à tous les utilisateurs, y compris ceux en situation de handicap</li>
                    <li>• <strong>Performance :</strong> Garantir un temps de chargement rapide et une expérience utilisateur fluide</li>
                    <li>• <strong>Sécurité :</strong> Protéger les données des utilisateurs et assurer la confidentialité des informations</li>
                    <li>• <strong>Responsivité :</strong> Assurer que la plateforme est utilisable sur différents appareils (ordinateurs, tablettes, smartphones)</li>
                    <li>• <strong>Thèmes sombres et clairs :</strong> Offrir une option de thème sombre pour le confort des utilisateurs, en particulier dans des conditions de faible luminosité</li>
                    <li>• <strong>Compatibilité avec les navigateurs :</strong> Assurer que la plateforme fonctionne correctement sur les principaux navigateurs web</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Méthodologie d'analyse des besoins</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Outils UX déployés</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>ActivityLogger :</strong> Suivi automatique des interactions utilisateurs</li>
                    <li>• <strong>SessionTracker :</strong> Analyse des sessions journalières</li>
                    <li>• <strong>Formulaires de contact :</strong> Collecte des retours utilisateurs</li>
                    <li>• <strong>Analytics IP :</strong> Suivi anonymisé des parcours de navigation</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Données collectées</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Parcours de navigation :</strong> Pages les plus consultées, chemins d'accès</li>
                    <li>• <strong>Demandes de partenariats :</strong> Besoins des acteurs économiques</li>
                    <li>• <strong>Interactions carte :</strong> Zones d'intérêt, zoom, déplacements</li>
                    <li>• <strong>Utilisation des filtres :</strong> Préférences de recherche</li>
                    <li>• <strong>Données de géolocalisation :</strong> Zones géographiques d'usage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">État actuel et limitations</h4>
              <div class="space-y-4">
                <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h5 class="font-semibold text-amber-800 dark:text-amber-300 mb-2">Note importante</h5>
                  <p class="text-sm text-amber-700 dark:text-amber-400">
                    Pour l'instant aucune étude formelle n'a été réalisée pour définir les cibles utilisatrices, les besoins métiers et les attentes réelles des utilisateurs-cibles. Les informations ci-dessus sont basées sur une analyse préliminaire et des hypothèses à valider.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Besoins d'approfondissement</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Études UX :</strong> Enquêtes et recherches auprès des utilisateurs potentiels</li>
                    <li>• <strong>Interviews :</strong> Entretiens approfondis avec les parties prenantes</li>
                    <li>• <strong>Tests utilisateurs :</strong> Validation des hypothèses par l'expérimentation</li>
                    <li>• <strong>Persona détaillés :</strong> Définition précise des profils utilisateurs</li>
                    <li>• <strong>Benchmark concurrentiel :</strong> Analyse des services existants similaires</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Objectifs de validation</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• Comprendre les attentes réelles et les besoins spécifiques de chaque groupe cible</li>
                    <li>• Orienter le développement de la plateforme de manière plus précise et efficace</li>
                    <li>• Éviter le sur-dimensionnement fonctionnel</li>
                    <li>• Maximiser l'utilité réelle du service</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priorisation des fonctionnalités</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Approche actuelle de validation</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    En l'absence d'études formelles, la priorisation se base sur l'analyse des données d'usage réelles et des retours utilisateurs via les outils déployés.
                  </p>

                  <div class="grid md:grid-cols-3 gap-4">
                    <div class="bg-red-100 dark:bg-red-900/30 p-3 rounded">
                      <p class="font-semibold text-red-800 dark:text-red-300 text-sm">Critique (Validé par l'usage)</p>
                      <ul class="text-xs text-red-600 dark:text-red-400 mt-1">
                        <li>• Carte interactive</li>
                        <li>• POI essentiels</li>
                        <li>• Navigation mobile</li>
                      </ul>
                    </div>
                    <div class="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded">
                      <p class="font-semibold text-yellow-800 dark:text-yellow-300 text-sm">Important (En validation)</p>
                      <ul class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                        <li>• Blog informatif</li>
                        <li>• Système de comptes</li>
                        <li>• Partenariats</li>
                      </ul>
                    </div>
                    <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded">
                      <p class="font-semibold text-green-800 dark:text-green-300 text-sm">Souhaitable (À valider)</p>
                      <ul class="text-xs text-green-600 dark:text-green-400 mt-1">
                        <li>• Analytics avancées</li>
                        <li>• Fonctions sociales</li>
                        <li>• Notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Évitement du sur-dimensionnement</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Approche MVP :</strong> Fonctionnalités essentielles d'abord, validation par l'usage</li>
                    <li>• <strong>Évolution progressive :</strong> Ajouts basés sur les données réelles d'utilisation</li>
                    <li>• <strong>Suppression régulière :</strong> Retrait des fonctionnalités peu utilisées selon les analytics</li>
                    <li>• <strong>Optimisation continue :</strong> Amélioration des performances des fonctionnalités existantes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Validation du critère</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Cibles identifiées :</strong> Utilisateurs primaires et secondaires clairement définis</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Besoins fonctionnels :</strong> Analyse complète des fonctionnalités requises</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Outils de suivi :</strong> Méthodologie d'analyse des besoins avec outils UX déployés</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-yellow-600 dark:text-yellow-400 font-bold">!</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Limitation reconnue :</strong> Absence d'études UX formelles - validation par l'usage réel</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Amélioration continue :</strong> Plan pour approfondir la connaissance utilisateur</p>
                </div>
              </div>
            </div>
          </div>

          <hr class='my-12 border-gray-200 dark:border-gray-700'>

          <!-- Critère 1.3 : Référent écoconception numérique -->
          <div class="mb-8" id="critere-1-3">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critère 1.3 : Référent écoconception numérique</h3>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif du critère</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                L'écoconception numérique adresse un très large périmètre, qu'il est difficile d'appréhender complètement dans chaque phase du projet. Il est indispensable que les professionnels intervenant sur ce dernier puissent s'appuyer à tout moment sur une ou des personnes référentes qui puissent les assister dans les meilleures pratiques à déployer.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                La fonction de référent écoconception est importante pour garantir une cohérence entre la mise en œuvre des mesures d'écoconception, leur suivi et leur pérennité.
              </p>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mise en œuvre du critère</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Responsabilités du référent écoconception</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Acculturation des équipes :</strong> S'assurer de l'acculturation des équipes projet à l'écoconception de service numérique, afin d'encourager sa prise en compte</li>
                    <li>• <strong>Documentation technique :</strong> Maintenir une documentation technique interne, afin que les techniques d'écoconception soient écrites et partagées dans l'équipe en charge du service numérique, pour en garantir la pérennité</li>
                    <li>• <strong>Revues régulières :</strong> S'assurer de la mise en place de revue régulière rendant compte de la démarche d'écoconception du service, et de la mise à jour de sa déclaration d'écoconception</li>
                    <li>• <strong>Formation des équipes :</strong> Vérifier que les équipes impliquées dans la conception du service numérique ont été sensibilisées (voire formées) à l'écoconception</li>
                    <li>• <strong>Suivi RGESN :</strong> Être chargé du suivi de la mise en œuvre du référentiel général de l'écoconception des services numériques</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Référent écoconception Naurellia</h4>
              <div class="space-y-4">
                <div class="flex items-start space-x-4">
                  <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <span class="text-green-600 dark:text-green-400 font-bold text-lg">Ref</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900 dark:text-white text-lg mb-2">Anthony MUDET</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Étudiant au Cursus Master Doctorat SMART Computing & Référent Écoconception</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Contact : <a href="mailto:admin@naurellia.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">admin@naurellia.com</a>
                    </p>
                    <div class="space-y-2">
                      <div class="flex items-center space-x-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Formation en écoconception web (Licence Informatique, 2024)</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Développeur unique et responsable de l'application du RGESN</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Veille technologique active sur les pratiques durables</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contexte projet personnel</h4>
              <div class="space-y-4">
                <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h5 class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Situation actuelle</h5>
                  <p class="text-sm text-orange-700 dark:text-orange-400">
                    Naurellia est actuellement un projet personnel développé par une seule personne. Le référent écoconception assume donc l'ensemble des responsabilités techniques et métier, s'appuyant sur sa formation initiale en écoconception numérique acquise lors de sa Licence en informatique en 2025.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Formation de base acquise</p>
                  <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Écoconception numérique</strong> - Cours dispensé durant la Licence Informatique dans l'UE "Écoconception Web" par M. Courboulay, Université de La Rochelle, 2024.
                    </p>
                    <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Fondamentaux théoriques et pratiques de l'écoconception appliquée au développement web et aux services numériques
                    </p>
                  </div>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Compétences développées</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Analyse ACV :</strong> Maîtrise des concepts d'analyse de cycle de vie appliqués au numérique</li>
                    <li>• <strong>Optimisation technique :</strong> Techniques de réduction de l'empreinte des services web</li>
                    <li>• <strong>Audit environnemental :</strong> Méthodologies d'évaluation de l'impact environnemental</li>
                    <li>• <strong>Veille technologique :</strong> Suivi actif des innovations en matière d'écoconception</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Évolution future</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    En cas de croissance de l'équipe, le référent écoconception conservera son rôle central tout en formant et accompagnant les nouveaux collaborateurs aux bonnes pratiques d'écoconception numérique.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Missions accomplies</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Documentation et suivi</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• Rédaction de cette déclaration d'écoconception</li>
                    <li>• Documentation technique interne des pratiques</li>
                    <li>• Mise en place d'outils de monitoring</li>
                    <li>• Suivi régulier des métriques de performance</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Mise en œuvre technique</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• Intégration des bonnes pratiques RGESN</li>
                    <li>• Optimisation des performances frontend/backend</li>
                    <li>• Choix d'hébergement écoresponsable</li>
                    <li>• Architecture sobre et performante</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Validation du critère</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Référent identifié :</strong> Anthony MUDET, formé à l'écoconception numérique</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Responsabilités assumées :</strong> Application du RGESN et suivi des bonnes pratiques</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Documentation maintenue :</strong> Déclaration d'écoconception et guides techniques</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-yellow-600 dark:text-yellow-400 font-bold">!</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Projet personnel :</strong> Référent unique - évolution prévue si croissance équipe</p>
                </div>
              </div>
            </div>
          </div>

          <hr class='my-12 border-gray-200 dark:border-gray-700'>

          <!-- Critère 1.4 : Revues régulières pour s'assurer du respect de la démarche d'écoconception -->
          <div class="mb-8" id="critere-1-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critère 1.4 : Revues régulières pour s'assurer du respect de la démarche d'écoconception</h3>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif du critère</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Selon le contexte, un service numérique peut évoluer : équipe qui change, ajout de contenu par les utilisateurs, traitements de plus en plus gourmands, etc. Pour veiller à ce que la démarche d'écoconception dure dans le temps, il est important de réaliser régulièrement une revue.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Par ailleurs, la publication d'une déclaration d'écoconception œuvre à davantage de transparence sur la performance environnementale des services numériques à destination des utilisateurs et parties prenantes.
              </p>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mise en œuvre</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Revues et auto-évaluations régulières</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Auto-évaluation RGESN :</strong> Application régulière de ce référentiel pour mesurer la conformité</li>
                    <li>• <strong>Audits de performance :</strong> Tests de charge et identification des goulots d'étranglement</li>
                    <li>• <strong>Analyse des ressources :</strong> Suivi de la consommation énergétique et des ressources utilisées</li>
                    <li>• <strong>Fréquence adaptée :</strong> Rythme ajusté selon la taille et la nature du service numérique</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Déclaration d'écoconception</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Mise à jour régulière :</strong> Au moins à chaque changement significatif du service</li>
                    <li>• <strong>Actions d'amélioration :</strong> Indication des mesures envisagées pour améliorer la performance environnementale</li>
                    <li>• <strong>Transparence :</strong> Publication accessible aux utilisateurs et parties prenantes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">État actuel de Naurellia</h4>
              <div class="space-y-4">
                <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h5 class="font-semibold text-amber-800 dark:text-amber-300 mb-2">Situation présente</h5>
                  <p class="text-sm text-amber-700 dark:text-amber-400">
                    À cette date, Naurellia, même si le site est en ligne, n'a pas encore été soumis à des tests de charge ou à des audits de performance formels. Cependant, une fois que le site sera plus développé et que le trafic augmentera, il sera essentiel de mettre en place ces revues régulières pour s'assurer que la plateforme reste performante et respecte les principes d'écoconception.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Développement actif</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Le site est encore en développement actif, donc il n'y a pas encore de déclaration d'écoconception formelle publiée. Cependant, dès que le site sera plus mature, il sera important de mettre en place ces processus pour garantir que Naurellia reste conforme aux principes d'écoconception numérique et continue à évoluer de manière durable.
                  </p>

                  <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Publication prévue :</strong> Une fois que le site sera développé, les revues seront publiées dans le blog de Naurellia, et la déclaration d'écoconception sera mise à jour pour refléter les résultats de ces évaluations et les actions envisagées pour améliorer la performance environnementale du service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Outils et méthodes déployés</h4>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <p class="font-semibold text-green-800 dark:text-green-300 mb-2">Monitoring en place</p>
                  <ul class="text-sm text-green-700 dark:text-green-400 space-y-1 ml-4">
                    <li>• <strong>ActivityLogger :</strong> Suivi des performances en temps réel</li>
                    <li>• <strong>SessionTracker :</strong> Analyse des sessions utilisateurs</li>
                    <li>• <strong>Analytics IP :</strong> Monitoring du trafic et des performances</li>
                    <li>• <strong>Logs système :</strong> Surveillance des ressources serveur</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-green-800 dark:text-green-300 mb-2">Métriques surveillées</p>
                  <ul class="text-sm text-green-700 dark:text-green-400 space-y-1 ml-4">
                    <li>• <strong>Temps de chargement :</strong> Performance front-end</li>
                    <li>• <strong>Consommation bande passante :</strong> Optimisation des transferts</li>
                    <li>• <strong>Utilisation serveur :</strong> CPU, mémoire, stockage</li>
                    <li>• <strong>Erreurs et goulots :</strong> Identification des problèmes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Plan de mise en œuvre des revues</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Phase 1 : Stabilisation (Court terme)</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Finalisation des fonctionnalités core :</strong> Stabilisation de l'architecture de base</li>
                    <li>• <strong>Tests de performance initiaux :</strong> Établissement des métriques de référence</li>
                    <li>• <strong>Documentation des pratiques :</strong> Formalisation des choix d'écoconception</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Phase 2 : Montée en charge (Moyen terme)</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Tests de charge réguliers :</strong> Simulation d'augmentation du trafic</li>
                    <li>• <strong>Audits trimestriels :</strong> Revue complète RGESN tous les 3 mois</li>
                    <li>• <strong>Publication des résultats :</strong> Transparence via le blog Naurellia</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Phase 3 : Optimisation continue (Long terme)</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Revues mensuelles :</strong> Suivi continu des performances</li>
                    <li>• <strong>Amélioration itérative :</strong> Actions correctives basées sur les données</li>
                    <li>• <strong>Certification externe :</strong> Validation par organismes tiers si pertinent</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Validation du critère</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Outils déployés :</strong> Monitoring et analytics en place pour le suivi continu</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Plan établi :</strong> Roadmap claire pour la mise en œuvre des revues régulières</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Déclaration en cours :</strong> Présente politique d'écoconception comme base</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-yellow-600 dark:text-yellow-400 font-bold">!</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">En développement :</strong> Revues formelles à implémenter lors de la montée en charge</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Transparence prévue :</strong> Publication future des résultats via le blog</p>
                </div>
              </div>
            </div>
          </div>

          <hr class='my-12 border-gray-200 dark:border-gray-700'>

          <!-- Critère 1.5 : Objectifs en matière de réduction d'impacts environnementaux -->
          <div class="mb-8" id="critere-1-5">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critère 1.5 : Objectifs en matière de réduction d'impacts environnementaux</h3>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Connaître et réduire l'empreinte environnementale du service numérique. Cela implique d'avoir une vision globale des conséquences du service numérique, à chaque phase (début, usage, fin) et en intégrant les impacts environnementaux des équipements matériels utilisés, dans la production mais aussi dans l'usage de ce service numérique.
              </p>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mise en œuvre</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Définition des indicateurs environnementaux</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Définir les indicateurs environnementaux à suivre, si possible suite à un diagnostic basé sur une méthodologie d'analyse de cycle de vie (ACV) multicritère afin d'identifier les indicateurs permettant de documenter la majorité de l'empreinte environnementale du service.
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Consommation d'énergie primaire</strong></li>
                    <li>• <strong>Émissions de gaz à effet de serre (GES)</strong></li>
                    <li>• <strong>Consommation d'eau bleue</strong> (eaux de surface et souterraines)</li>
                    <li>• <strong>Épuisement des ressources abiotiques</strong> (métaux et minéraux)</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Fixation d'objectifs de réduction</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Fixer les objectifs de réduction de l'empreinte environnementale du service numérique (à court, moyen ou long terme) au regard du nombre d'utilisateurs escompté, en précisant s'il s'agit d'indicateurs en valeur absolue ou relative.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">État actuel de l'évaluation Naurellia</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Démarche d'évaluation initiée</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Naurellia a commencé à évaluer son empreinte environnementale en se basant sur les principes d'écoconception numérique. Bien que le site soit encore en développement, des indicateurs ont été identifiés pour suivre la consommation d'énergie, les émissions de gaz à effet de serre et l'utilisation des ressources.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Objectifs de réduction fixés</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Des objectifs de réduction d'impact environnemental ont été fixés, notamment en ce qui concerne la consommation d'énergie primaire et les émissions de GES. Ces objectifs seront régulièrement révisés et mis à jour dans la déclaration d'écoconception du service.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Transparence et publication</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Une fois que le site sera plus mature, Naurellia prévoit de publier ces indicateurs et objectifs sur son blog, afin de garantir la transparence et l'engagement envers une démarche d'écoconception durable. La méthodologie utilisée pour évaluer ces indicateurs sera également accessible publiquement, conformément aux bonnes pratiques en matière d'écoconception numérique.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stratégies d'écoconception déployées</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Naurellia a néanmoins mis en place des stratégies pour minimiser son empreinte environnementale dès le début de son développement, en intégrant des pratiques durables dans la conception et l'architecture du site :
              </p>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Optimisations techniques</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• <strong>Lazy loading :</strong> Images et ressources chargées à la demande</li>
                    <li>• <strong>CDN :</strong> Optimisation de la distribution des ressources</li>
                    <li>• <strong>Optimisation des médias :</strong> Compression et formats adaptés</li>
                    <li>• <strong>Mise en cache agressive :</strong> Réduction des requêtes serveur</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Fonctionnalités éco-responsables</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• <strong>Mode sombre :</strong> Réduction de la consommation sur écrans OLED</li>
                    <li>• <strong>Mode éco batterie :</strong> Adaptation pour utilisateurs mobiles</li>
                    <li>• <strong>Technologies légères :</strong> Stack technique optimisée</li>
                    <li>• <strong>Architecture sobre :</strong> Minimisation de la charge serveur</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Indicateurs environnementaux identifiés</h4>
              <div class="space-y-4">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Indicateurs prioritaires (RGESN)</p>
                    <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                      <li>• <strong>Consommation d'énergie primaire :</strong> kWh/utilisateur/an</li>
                      <li>• <strong>Émissions GES :</strong> kg CO2e/utilisateur/an</li>
                      <li>• <strong>Consommation d'eau bleue :</strong> L/utilisateur/an</li>
                      <li>• <strong>Épuisement ressources abiotiques :</strong> kg Sb eq/utilisateur/an</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Indicateurs techniques complémentaires</p>
                    <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                      <li>• <strong>Transfert de données :</strong> MB/session utilisateur</li>
                      <li>• <strong>Temps de traitement CPU :</strong> ms/requête</li>
                      <li>• <strong>Utilisation mémoire :</strong> MB/utilisateur actif</li>
                      <li>• <strong>Stockage :</strong> MB/utilisateur enregistré</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectifs de réduction fixés</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Court terme (6-12 mois)</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Réduction de 20% du poids des pages</strong> par optimisation continue</li>
                    <li>• <strong>Amélioration de 15% des temps de chargement</strong> via optimisations techniques</li>
                    <li>• <strong>Réduction de 10% de la consommation serveur</strong> par optimisation du code</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Moyen terme (1-2 ans)</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Réduction de 30% des émissions GES par utilisateur</strong> (baseline à établir)</li>
                    <li>• <strong>Migration vers hébergement 100% renouvelable</strong> si pas déjà le cas</li>
                    <li>• <strong>Optimisation de 25% de la consommation énergétique globale</strong></li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Long terme (2-5 ans)</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Neutralité carbone</strong> sur l'ensemble du cycle de vie</li>
                    <li>• <strong>Réduction de 50% de l'empreinte environnementale par utilisateur</strong></li>
                    <li>• <strong>Certification environnementale externe</strong> si pertinente</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Méthodologie et suivi</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Référentiels utilisés</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>RGESN :</strong> Référentiel général d'écoconception des services numériques</li>
                    <li>• <strong>ISO 14040/14044 :</strong> Normes d'analyse de cycle de vie (future application)</li>
                    <li>• <strong>PEF/OEF :</strong> Product/Organisation Environmental Footprint (Commission européenne)</li>
                    <li>• <strong>SBTi :</strong> Science Based Targets initiative pour les objectifs climatiques</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Rythme d'évaluation</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Suivi mensuel :</strong> Indicateurs techniques et de performance</li>
                    <li>• <strong>Évaluation trimestrielle :</strong> Bilan environnemental complet</li>
                    <li>• <strong>Revue annuelle :</strong> Mise à jour des objectifs et de la stratégie</li>
                    <li>• <strong>Publication semestrielle :</strong> Transparence via le blog Naurellia</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Validation du critère</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Indicateurs identifiés :</strong> Indicateurs prioritaires RGESN définis et mesurables</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Objectifs fixés :</strong> Objectifs de réduction à court, moyen et long terme établis</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Stratégies déployées :</strong> Pratiques d'écoconception intégrées dès la conception</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Méthodologie définie :</strong> Référentiels et rythme d'évaluation établis</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-yellow-600 dark:text-yellow-400 font-bold">!</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">En cours :</strong> ACV complète et baseline à établir lors de la maturation du service</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Transparence prévue :</strong> Publication future des indicateurs et méthodologie</p>
                </div>
              </div>
            </div>
          </div>

          <hr class='my-12 border-gray-200 dark:border-gray-700'>

          <!-- Critère 1.6 : Collecte responsable et raisonnée des données -->
          <div class="mb-8" id="critere-1-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critère 1.6 : Le service numérique collecte-t-il la donnée de façon responsable et raisonnée ?</h3>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif du critère</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Cette pratique vise à encourager une collecte de données responsable et raisonnée en complément des obligations légales de minimisation prévues par le Règlement général sur la protection des données (RGPD) en ce qui concerne les données personnelles.
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Comme le souligne le rapport de la CNIL « Données, Empreinte et Libertés » (2023), certains impératifs de respect de la vie privée et objectifs d'écoconception se rejoignent. Il s'agira donc d'œuvrer à réduire la quantité de données collectées, traitées et stockées par le service, y compris les données non personnelles et métadonnées, pour optimiser l'utilisation des ressources informatiques.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Afin de limiter le profilage des utilisateurs, consommateur en ressources, le critère vise également à restreindre la collecte et le traitement de métadonnées aux fins de tracking.
              </p>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mise en œuvre</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Définition des données nécessaires</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Définir clairement les données nécessaires au fonctionnement du service, en cohérence avec les cibles utilisatrices et leurs attentes. Si une donnée ne contribue pas directement à l'amélioration de l'expérience utilisateur ou au fonctionnement du service, mieux vaut envisager de ne pas la collecter.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Conditions de collecte</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Pour chaque type de donnée jugée essentielle, définir les conditions de collecte qui devront expressément respecter les dispositifs du RGPD concernant les données personnelles. Pour les données non personnelles, la durée de conservation devra également être minimisée.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Information et consentement</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Systématiser la mise en place d'une information complète, le droit de s'opposer et/ou la demande de consentement explicite de l'utilisateur pour l'ensemble des données collectées, y compris pour les données non personnelles.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Application chez Naurellia</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Approche de minimisation des données</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Naurellia applique strictement le principe de minimisation des données, ne collectant que les informations strictement nécessaires au fonctionnement du service et à l'expérience utilisateur. Seul le créateur du site a accès aux données collectées, et aucune donnée n'est partagée avec des tiers commerciaux.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Responsable unique</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Dans le contexte d'un projet personnel, Anthony MUDET assume seul la responsabilité de la collecte et du traitement des données, garantissant un contrôle strict et une approche responsable de la gestion des données personnelles et techniques.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Types de données collectées et justification</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Données strictement nécessaires au service</p>
                  <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                    <li>• <strong>Comptes utilisateurs :</strong> Email (authentification), nom d'utilisateur (identification), mot de passe chiffré (sécurité)</li>
                    <li>• <strong>Sessions :</strong> Tokens JWT (maintien de session), préférences utilisateur (thème, langue)</li>
                    <li>• <strong>Commentaires :</strong> Contenu et métadonnées minimales (date, auteur) pour la modération et l'affichage</li>
                    <li>• <strong>Géolocalisation :</strong> Coordonnées approximatives pour les fonctionnalités cartographiques (avec consentement explicite)</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Données techniques pour la sécurité et les performances</p>
                  <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                    <li>• <strong>Logs de sécurité :</strong> Adresses IP, tentatives de connexion (prévention des abus)</li>
                    <li>• <strong>Analytics minimaux :</strong> Pages visitées et intéractions sur le site</li>
                    <li>• <strong>Données de performance :</strong> Temps de chargement, erreurs (optimisation technique)</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Données exclues volontairement</p>
                  <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                    <li>• <strong>Tracking comportemental :</strong> Pas de suivi des clics détaillés ou de profilage utilisateur</li>
                    <li>• <strong>Données commerciales :</strong> Pas de collecte à des fins publicitaires ou marketing</li>
                    <li>• <strong>Métadonnées excessives :</strong> Limitation aux métadonnées strictement nécessaires</li>
                    <li>• <strong>Données sensibles :</strong> Aucune collecte de données sensibles (santé, opinions, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Durées de conservation et suppression</h4>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Données personnelles</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• <strong>Comptes actifs :</strong> Durée de vie du compte + 3 ans</li>
                    <li>• <strong>Messages de contact :</strong> 3 ans maximum</li>
                    <li>• <strong>Commentaires :</strong> Liés à la durée de publication</li>
                    <li>• <strong>Tokens temporaires :</strong> 24h maximum</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Données techniques</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• <strong>Logs de navigation :</strong> 13 mois (conformité CNIL)</li>
                    <li>• <strong>Logs de sécurité :</strong> 1 an maximum</li>
                    <li>• <strong>Analytics :</strong> Données anonymisées, 25 mois</li>
                    <li>• <strong>Cache technique :</strong> Suppression automatique</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transparence et contrôle utilisateur</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Information complète</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Naurellia fournit une information détaillée sur toutes les données collectées via :
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Politique de confidentialité :</strong> Description exhaustive des données et traitements</li>
                    <li>• <strong>Mentions légales :</strong> Informations sur le responsable de traitement</li>
                    <li>• <strong>CGU :</strong> Conditions d'utilisation et finalités de collecte</li>
                    <li>• <strong>Bannières de consentement :</strong> Information et choix pour cookies et géolocalisation</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Droits utilisateurs garantis</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Accès :</strong> Consultation de toutes les données personnelles</li>
                    <li>• <strong>Rectification :</strong> Correction des données inexactes</li>
                    <li>• <strong>Suppression :</strong> Effacement sur demande (droit à l'oubli)</li>
                    <li>• <strong>Opposition :</strong> Refus du traitement pour motif légitime</li>
                    <li>• <strong>Portabilité :</strong> Récupération des données dans un format standard</li>
                    <li>• <strong>Limitation :</strong> Suspension temporaire du traitement</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Exercice des droits simplifié</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Contact unique : <a href="mailto:admin@naurellia.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">admin@naurellia.com</a> - Réponse sous 1 mois maximum
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mesures techniques de limitation</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Prévention du tracking excessif</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Pas de cookies tiers :</strong> Aucun tracker externe (Google Analytics, Facebook, etc.)</li>
                    <li>• <strong>Analytics maison :</strong> Système interne respectueux de la vie privée</li>
                    <li>• <strong>Géolocalisation optionnelle :</strong> Consentement explicite requis</li>
                    <li>• <strong>Sessions limitées :</strong> Expiration automatique des tokens</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Optimisation des ressources</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Compression des logs :</strong> Réduction de l'espace de stockage</li>
                    <li>• <strong>Purge automatique :</strong> Suppression programmée des données expirées</li>
                    <li>• <strong>Anonymisation :</strong> Données techniques dépersonnalisées quand possible</li>
                    <li>• <strong>Cache intelligent :</strong> Réduction des requêtes de base de données</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Sécurité par design</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Chiffrement systématique :</strong> HTTPS, bcrypt pour mots de passe</li>
                    <li>• <strong>Minimisation des accès :</strong> Principe du moindre privilège</li>
                    <li>• <strong>Audit régulier :</strong> Vérification des collectes et traitements</li>
                    <li>• <strong>Notification de breach :</strong> Procédure en cas de faille de sécurité</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services tiers et transferts de données</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-red-800 dark:text-red-300 mb-2">Services tiers essentiels uniquement</p>
                  <ul class="text-sm text-red-700 dark:text-red-400 space-y-1 ml-4">
                    <li>• <strong>Geoapify :</strong> Géocodage européen pour recherche d'adresses (données minimales)</li>
                    <li>• <strong>OpenStreetMap :</strong> Tuiles cartographiques (IP transmise, données anonymes)</li>
                    <li>• <strong>Hostinger :</strong> Hébergement UE avec garanties RGPD</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-red-800 dark:text-red-300 mb-2">Services volontairement exclus</p>
                  <ul class="text-sm text-red-700 dark:text-red-400 space-y-1 ml-4">
                    <li>• <strong>Analytics tiers :</strong> Google Analytics, Adobe Analytics</li>
                    <li>• <strong>Réseaux sociaux :</strong> Boutons de partage avec tracking</li>
                    <li>• <strong>Publicité :</strong> Aucun réseau publicitaire</li>
                    <li>• <strong>CDN tiers :</strong> Pas de CDN avec tracking (sauf fonts)</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-red-800 dark:text-red-300 mb-2">Contrôle des transferts</p>
                  <p class="text-sm text-red-700 dark:text-red-400">
                    Tous les transferts vers des services tiers sont documentés dans la politique de confidentialité avec leur finalité précise et les garanties de protection appliquées.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Validation du critère</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Minimisation appliquée :</strong> Collecte limitée aux données strictement nécessaires</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Finalités justifiées :</strong> Chaque donnée collectée répond à un besoin fonctionnel précis</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Consentement respecté :</strong> Information complète et choix utilisateur garantis</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Durées limitées :</strong> Conservation minimisée et suppression automatique</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Pas de profilage :</strong> Exclusion volontaire du tracking comportemental</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Transparence totale :</strong> Documentation complète accessible aux utilisateurs</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Contrôle unique :</strong> Responsable unique garantissant la maîtrise des données</p>
                </div>
              </div>
            </div>
          </div>

          <hr class='my-12 border-gray-200 dark:border-gray-700'>

          <!-- Critère 1.7 : Niveau de chiffrement adapté aux besoins -->
          <div class="mb-8" id="critere-1-7">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critère 1.7 : Le service numérique a-t-il recours à un niveau de chiffrement adapté à ses besoins ?</h3>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif du critère</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Dans la plupart des situations, le recours à des mécanismes cryptographiques est absolument essentiel pour protéger les systèmes informatiques, ainsi que les données – notamment personnelles – collectées ou traitées. Ces mécanismes ont une empreinte environnementale à considérer.
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Le chiffrement augmente automatiquement la consommation énergétique, d'abord par le calcul nécessaire à cette opération et au déchiffrement, mais aussi par le stockage et la charge pour les réseaux de communication. Néanmoins, ils peuvent dans certains cas permettre d'alléger les systèmes informatiques.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Cette pratique vise donc à promouvoir la minimisation du coût environnemental du chiffrement, en tenant compte des contraintes de sécurité à respecter. Le chiffrement contribue par ailleurs à la protection et à la sécurité des données, et réduit le risque de faille et de fuite de données, dont les traitements ultérieurs ont une empreinte énergétique.
              </p>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mise en œuvre</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Optimisation pour un niveau de sécurité donné</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Mesures comparatives :</strong> Sélection d'algorithmes de chiffrement minimisant les ressources processeur</li>
                    <li>• <strong>Évaluation de pertinence :</strong> Adapter le chiffrement à la nature des données et des risques</li>
                    <li>• <strong>Implémentation optimisée :</strong> Minimiser l'empreinte environnementale sans compromettre la sécurité</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Mécanismes cryptographiques efficaces</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Preuves cryptographiques :</strong> Générer des preuves sans nécessité de conserver ou divulguer le fichier original</li>
                    <li>• <strong>Archives optimisées :</strong> Conservation d'archives chiffrées et compressées simultanément</li>
                    <li>• <strong>Compression parallèle :</strong> Utilisation d'outils comme 7zip pour optimiser stockage et chiffrement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Architecture de sécurité Naurellia</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Architecture MVC sécurisée</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Naurellia utilise une architecture Model-View-Controller (MVC) avec une API dédiée pour la communication avec la base de données. Cette séparation permet une sécurisation ciblée de chaque couche applicative.
                  </p>
                  <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Avantage écoconception :</strong> L'architecture MVC permet d'appliquer le chiffrement uniquement aux couches qui en ont besoin, optimisant ainsi les ressources.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mécanismes de chiffrement déployés</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Protection des données sensibles</p>
                  <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                    <li>• <strong>Hachage des mots de passe :</strong> Utilisation d'algorithmes de hachage sécurisés (bcrypt) optimisés pour un bon équilibre sécurité/performance</li>
                    <li>• <strong>Stockage sécurisé :</strong> Données stockées de manière chiffrée, accessibles uniquement avec autorisation appropriée</li>
                    <li>• <strong>Chiffrement adaptatif :</strong> Niveau de chiffrement adapté à la sensibilité des données</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Chiffrement des communications</p>
                  <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                    <li>• <strong>Certificat SSL/TLS :</strong> Chiffrement de toutes les données échangées entre navigateur et serveur</li>
                    <li>• <strong>HTTPS obligatoire :</strong> Garantie de confidentialité et d'intégrité des transmissions</li>
                    <li>• <strong>Protection des identifiants :</strong> Transmission sécurisée des données de connexion et personnelles</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-orange-800 dark:text-orange-300 mb-2">Sécurisation de l'API</p>
                  <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1 ml-4">
                    <li>• <strong>Clés d'API :</strong> Authentification des applications autorisées</li>
                    <li>• <strong>Jetons d'authentification :</strong> Tokens JWT sécurisés avec expiration automatique</li>
                    <li>• <strong>Contrôle d'accès :</strong> Protection contre les accès non autorisés</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mesures de sécurité renforcées</h4>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Protection périmétrique</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• <strong>Pare-feu configuré :</strong> Règles d'accès limitant les connexions aux IP autorisées</li>
                    <li>• <strong>Filtrage des routes :</strong> Blocage des accès aux endpoints non autorisés</li>
                    <li>• <strong>Monitoring en temps réel :</strong> Surveillance des tentatives d'intrusion</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-teal-800 dark:text-teal-300 mb-2">Authentification renforcée</p>
                  <ul class="text-sm text-teal-700 dark:text-teal-400 space-y-1 ml-4">
                    <li>• <strong>Clé rotative :</strong> Clé d'authentification dans les en-têtes, changement régulier</li>
                    <li>• <strong>Vérification API :</strong> Contrôle que les requêtes proviennent bien du site légitime</li>
                    <li>• <strong>Anti-spoofing :</strong> Protection contre l'usurpation d'identité</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Optimisations écoconception appliquées</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Choix algorithmiques optimisés</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>bcrypt paramétré :</strong> Facteur de coût adapté pour équilibrer sécurité et performance énergétique</li>
                    <li>• <strong>TLS optimisé :</strong> Configuration SSL/TLS privilégiant les algorithmes efficaces énergétiquement</li>
                    <li>• <strong>Chiffrement ciblé :</strong> Application du chiffrement uniquement aux données qui le nécessitent</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Réduction de l'empreinte cryptographique</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Sessions optimisées :</strong> Durée de vie des tokens adaptée pour minimiser les re-calculs</li>
                    <li>• <strong>Cache cryptographique :</strong> Réutilisation de calculs quand c'est sécuritairement acceptable</li>
                    <li>• <strong>Compression intelligente :</strong> Compression avant chiffrement pour réduire la charge</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Surveillance et logging écologiques</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Logs ciblés :</strong> Journalisation uniquement des actions potentiellement malveillantes</li>
                    <li>• <strong>Analyse différée :</strong> Traitement des logs en mode batch pour optimiser les ressources</li>
                    <li>• <strong>Rétention adaptée :</strong> Durée de conservation des logs minimisée selon les besoins sécuritaires</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Évaluation et adaptation continue</h4>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Analyse des risques vs impact environnemental</p>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded">
                      <p class="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">Données peu sensibles</p>
                      <p class="text-xs text-green-600 dark:text-green-400">Chiffrement léger ou transmission en clair si approprié</p>
                    </div>
                    <div class="bg-orange-100 dark:bg-orange-900/30 p-3 rounded">
                      <p class="font-semibold text-orange-800 dark:text-orange-300 text-sm mb-1">Données sensibles</p>
                      <p class="text-xs text-orange-600 dark:text-orange-400">Chiffrement renforcé avec algorithmes optimisés</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Métriques de performance énergétique</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Consommation CPU :</strong> Mesure de l'impact des opérations cryptographiques</li>
                    <li>• <strong>Temps de réponse :</strong> Optimisation pour réduire la latence et l'usage énergétique</li>
                    <li>• <strong>Taille des données :</strong> Minimisation du volume chiffré à transmettre</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">Veille technologique sécuritaire et écologique</p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>• <strong>Nouveaux algorithmes :</strong> Évaluation continue des innovations en cryptographie verte</li>
                    <li>• <strong>Optimisations matérielles :</strong> Exploitation des accélérations cryptographiques disponibles</li>
                    <li>• <strong>Standards émergents :</strong> Adoption de protocoles plus efficaces énergétiquement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Équilibre sécurité-environnement</h4>
              <div class="space-y-4">
                <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h5 class="font-semibold text-amber-800 dark:text-amber-300 mb-2">Principe directeur</h5>
                  <p class="text-sm text-amber-700 dark:text-amber-400">
                    Naurellia applique le principe de <strong>"sécurité suffisante"</strong> : utiliser le niveau de chiffrement minimal nécessaire pour atteindre le niveau de sécurité requis, en évitant le sur-chiffrement qui consommerait inutilement des ressources.
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-red-800 dark:text-red-300 mb-2">Compromis évalués</p>
                  <ul class="text-sm text-red-700 dark:text-red-400 space-y-1 ml-4">
                    <li>• <strong>Sécurité vs Performance :</strong> Algorithmes offrant le meilleur ratio sécurité/efficacité énergétique</li>
                    <li>• <strong>Protection vs Ressources :</strong> Adaptation du niveau de protection selon la criticité des données</li>
                    <li>• <strong>Conformité vs Écologie :</strong> Respect des exigences légales avec optimisation environnementale</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-red-800 dark:text-red-300 mb-2">Bénéfices collatéraux</p>
                  <ul class="text-sm text-red-700 dark:text-red-400 space-y-1 ml-4">
                    <li>• <strong>Prévention des fuites :</strong> Le chiffrement évite les coûts énergétiques de gestion des incidents</li>
                    <li>• <strong>Confiance utilisateur :</strong> Sécurité renforcée encourageant l'utilisation locale vs alternatives cloud</li>
                    <li>• <strong>Compliance énergétique :</strong> Conformité RGPD avec bonus environnemental</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Validation du critère</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Chiffrement adapté :</strong> Niveau de sécurité proportionné aux risques et données traitées</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Algorithmes optimisés :</strong> Choix d'implémentations équilibrant sécurité et efficacité énergétique</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Architecture sécurisée :</strong> MVC avec chiffrement ciblé sur les couches nécessaires</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Protection multicouche :</strong> SSL/TLS, authentification renforcée, pare-feu optimisé</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Surveillance efficace :</strong> Logging ciblé et analyse optimisée des événements sécuritaires</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Évaluation continue :</strong> Analyse régulière de l'équilibre sécurité-performance énergétique</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <p class="text-sm"><strong class="text-gray-900 dark:text-white">Documentation complète :</strong> Justification des choix cryptographiques dans cette déclaration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 10. Contact -->
        <section id="contact" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">11. Contact</h2>
          <div class="space-y-4">
            <p>
              L'éco-conception est un processus itératif. Nous nous engageons à évaluer régulièrement nos pratiques, à mesurer nos progrès et à chercher constamment de nouvelles opportunités d'amélioration pour minimiser notre impact environnemental.
            </p>
            <p>
              Vos retours sont précieux pour nous aider à améliorer notre démarche d'éco-conception. Pour toute question, suggestion ou retour d'expérience concernant notre politique d'éco-conception, n'hésitez pas à nous <router-link to="/contact" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">contacter</router-link>.
            </p>
          </div>
        </section>

        <!-- Footer de la politique -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Cette politique d'éco-conception est mise à jour régulièrement pour refléter nos améliorations continues et les évolutions du RGESN.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for the navigation */
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}

/* Ensure proper contrast for links */
a {
  transition: color 0.2s ease-in-out;
}

/* Status indicators */
.status-green {
  color: #16a34a;
}

.status-yellow {
  color: #ca8a04;
}

.status-red {
  color: #dc2626;
}

/* Section spacing */
section {
  scroll-margin-top: 2rem;
}
</style>
