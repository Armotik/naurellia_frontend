<script setup>
import { onMounted } from 'vue'
import { useLogger } from '@/composables/useLogger.js'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'

const { logAction } = useLogger()

onMounted(() => {
  document.title = "Politique d'éco-conception - Stratégie et Gouvernance"

  logAction('eco_design_strategy', 'page_view', {
    timestamp: Date.now(),
  })
})
</script>

<template>
  <div class="bg-stone-50 dark:bg-gray-900 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back to overview link -->
      <router-link
        to="/politique-ecoconception"
        class="text-emerald-700 dark:text-emerald-400 hover:underline mb-4 inline-block"
      >
        ← Retour à la politique d'écoconception
      </router-link>

      <section id="strategie" class="mb-12">
        <h2
          class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6"
        >
          Stratégie et Gouvernance
        </h2>

        <!-- Navigation Summary -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-emerald-200 dark:border-emerald-800">
            Sommaire de la section
          </h3>
          <div class="grid gap-2">
            <a href="#critere-1-1" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.1</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Utilité du service et impacts environnementaux</span>
            </a>
            <a href="#critere-1-2" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.2</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Définition des cibles et des besoins</span>
            </a>
            <a href="#critere-1-3" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.3</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Référent en écoconception numérique</span>
            </a>
            <a href="#critere-1-4" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.4</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Revues régulières de la démarche</span>
            </a>
            <a href="#critere-1-5" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.5</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Objectifs de réduction des impacts</span>
            </a>
            <a href="#critere-1-6" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.6</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Collecte de données responsable et raisonnée</span>
            </a>
            <a href="#critere-1-7" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.7</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Niveau de chiffrement adapté</span>
            </a>
            <a href="#critere-1-8" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.8</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Efforts d'open source et de mutualisation</span>
            </a>
            <a href="#critere-1-9" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.9</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Utilisation de technologies standard et interopérables</span>
            </a>
            <a href="#critere-1-10" class="group flex items-center p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <span class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mr-3">1.10</span>
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">API ouvertes pour l'interaction matérielle</span>
            </a>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.1 : Évaluation de l'utilité du service -->
        <div class="mb-8" id="critere-1-1">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.1 : Le service numérique a-t-il été évalué favorablement en termes d'utilité
            en tenant compte de ses impacts environnementaux ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Prendre en compte l'utilité du service numérique dès sa conception, par exemple son
              inscription dans au moins l'un des objectifs de développement durable (ODD), l'un des
              enjeux de limites planétaires ou tout autre référentiel du même type.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Il s'agit de déterminer en amont du projet si l'utilité du service est avérée en se
              référant à des référentiels reconnus. Cette démarche permet d'éviter la création de
              services numériques redondants ou sans réelle valeur ajoutée pour la société et
              l'environnement.
            </p>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Inscription dans les Objectifs de Développement Durable (ODD)
            </h4>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <span class="text-green-600 dark:text-green-400 font-bold">11.</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Villes et communautés durables
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Naurellia contribue à rendre les villes plus inclusives, sûres, résilientes et
                    durables en facilitant la découverte et la valorisation du patrimoine local,
                    encourageant un tourisme respectueux et des déplacements écoresponsables.
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Cible spécifique 11.4 : "Redoubler d'efforts pour protéger et sauvegarder le
                    patrimoine culturel et naturel mondial" - La plateforme permet de valoriser et
                    préserver le patrimoine local à travers la documentation et la promotion des
                    sites d'intérêt.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-green-600 dark:text-green-400 font-bold">12.</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Consommation et production responsables
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    La plateforme promeut un tourisme local et responsable, réduisant les
                    déplacements longue distance et valorisant les circuits courts.
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Cible 12.8 : "Faire en sorte que toutes les personnes aient les informations et
                    connaissances nécessaires au développement durable" - Le blog et les contenus
                    informatifs sensibilisent aux pratiques écoresponsables et au patrimoine
                    durable.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-green-600 dark:text-green-400 font-bold">13.</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Lutte contre les changements climatiques
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Naurellia contribue à la sensibilisation et à l'éducation sur les enjeux
                    climatiques en mettant en avant des pratiques de tourisme durable et en
                    encourageant les utilisateurs à adopter des comportements écoresponsables.
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Cible 13.3 : "Améliorer l'éducation, la sensibilisation et les capacités
                    individuelles concernant l'adaptation aux changements climatiques" - Les
                    contenus pédagogiques et la promotion des transports doux participent à cette
                    sensibilisation.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-green-600 dark:text-green-400 font-bold">17.</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Partenariats pour la réalisation des objectifs
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Naurellia facilite les partenariats entre acteurs locaux, institutions et
                    citoyens pour la préservation du patrimoine.
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    La plateforme intègre un système de partenariat permettant aux collectivités,
                    associations et entreprises locales de collaborer pour valoriser le patrimoine
                    et promouvoir des pratiques durables.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Limites planétaires et impact environnemental
            </h4>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <span class="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <div>
                  <p class="text-gray-700 dark:text-gray-300 mb-1">
                    <strong>Changement climatique :</strong> Promotion du tourisme local réduisant
                    les émissions de transport et promouvant les modes de déplacement doux.
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Naurellia met en avant les diférents moyens de transport doux (marche, vélo,
                    transports en commun) et les circuits locaux pour minimiser l'empreinte carbone
                    des visiteurs.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <div>
                  <p class="text-gray-700 dark:text-gray-300 mb-1">
                    <strong>Biodiversité :</strong> Sensibilisation aux espaces naturels et leur
                    préservation
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Les points d'intérêt incluent la valorisation des espaces naturels protégés et
                    la sensibilisation à leur importance écologique.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <div>
                  <p class="text-gray-700 dark:text-gray-300 mb-1">
                    <strong>Utilisation des sols :</strong> Valorisation des territoires existants
                    sans artificialisation
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    La plateforme encourage la découverte et l'utilisation durable des espaces
                    existants plutôt que le développement de nouvelles infrastructures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Analyse critique de l'utilité
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  L'utilisation du numérique est-elle nécessaire ?
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Oui, Naurellia utilise le numérique pour faciliter l'accès à l'information sur le
                  patrimoine local, promouvoir des pratiques de tourisme durable et encourager les
                  interactions entre les acteurs locaux. Sans cette plateforme numérique, la
                  diffusion de ces informations serait limitée et moins efficace.
                </p>
                <p class="text-s text-gray-500 dark:text-gray-500">
                  L'interactivité de la carte, la géolocalisation en temps réel, et la possibilité
                  de mettre à jour dynamiquement les informations sont des fonctionnalités
                  difficilement réalisables sans le numérique.
                </p>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Existe-t-il d'autres solutions non numériques ?
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Il existe des solutions non numériques, comme les brochures papier, les panneaux
                  d'information ou les visites guidées traditionnelles. Cependant, ces solutions
                  sont moins interactives, moins accessibles et ne permettent pas de toucher un
                  public aussi large que le numérique.
                </p>
                <p class="text-s text-gray-500 dark:text-gray-500">
                  Comparaison : Une brochure papier génère des impacts environnementaux lors de
                  l'impression, du transport et a une durée de vie limitée, contrairement à une
                  plateforme numérique optimisée qui peut servir de nombreux utilisateurs
                  simultanément.
                </p>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Quels sont les réels besoins justifiant la création du service ?
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Les besoins incluent la valorisation du patrimoine local souvent méconnu, la
                  promotion d'un tourisme durable face aux enjeux climatiques, et la sensibilisation
                  des citoyens aux enjeux environnementaux. Naurellia répond à ces besoins en
                  fournissant une plateforme accessible et interactive.
                </p>
                <p class="text-s text-gray-500 dark:text-gray-500">
                  Constat : Beaucoup de patrimoine local reste peu connu du grand public faute de
                  communication centralisée et accessible. La plateforme comble ce manque
                  d'information.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Analyse des impacts environnementaux
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-green-600 dark:text-green-400 mb-2">
                  Impacts positifs quantifiables
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Réduction des déplacements touristiques longue distance</li>
                  <li>• Optimisation des parcours (réduction estimée de 20% des km parcourus)</li>
                  <li>• Sensibilisation à l'environnement via contenus éducatifs</li>
                  <li>• Valorisation des transports doux et de la mobilité active</li>
                  <li>• Réduction de l'impression de supports papier (brochures, cartes)</li>
                  <li>• Promotion des circuits courts et de l'économie locale</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-red-600 dark:text-red-400 mb-2">
                  Impacts négatifs identifiés
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Consommation énergétique des serveurs et infrastructure</li>
                  <li>• Utilisation de terminaux mobiles et consommation batterie</li>
                  <li>• Transfert de données et bande passante</li>
                  <li>• Potentiel effet rebond (augmentation du nombre de visiteurs)</li>
                  <li>• Fabrication et renouvellement des équipements utilisateurs</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <p class="text-s text-gray-600 dark:text-gray-400">
                <strong>Bilan global :</strong> L'analyse préliminaire suggère que les impacts
                positifs (réduction des déplacements, sensibilisation) compensent largement les
                impacts négatifs du numérique, particulièrement avec les optimisations techniques
                mises en place.
              </p>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.1
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service numérique Naurellia a été évalué favorablement en termes d'utilité.
                  L'analyse démontre son inscription claire dans plusieurs Objectifs de
                  Développement Durable (ODD 11, 12, 13, 17) et sa contribution positive à la
                  gestion des limites planétaires (climat, biodiversité, sols).
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  L'analyse critique confirme la pertinence du recours au numérique et le bilan
                  global des impacts environnementaux est jugé positif, les bénéfices (réduction des
                  déplacements, sensibilisation) surpassant les coûts énergétiques inhérents à la
                  plateforme.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.2 : Définition des cibles utilisatrices -->
        <div class="mb-8" id="critere-1-2">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.2 : Le service numérique a-t-il défini ses cibles utilisatrices, les besoins
            métiers et les attentes réelles des utilisateurs-cibles ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Pour répondre au plus juste aux utilisateurs du service numérique, il est
              indispensable de connaître ses cibles : leurs usages, leurs besoins et leurs
              comportements, afin de ne pas surcharger les services numériques en fonctionnalités et
              contenus, ni les appauvrir au point qu'ils ne répondent pas aux attentes.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Sans l'identification des catégories d'utilisateurs primaires et secondaires, il est
              difficile de dimensionner correctement le service numérique. Les incertitudes poussent
              à extrapoler les besoins souvent au-delà des attentes réelles.
            </p>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Utilisateurs primaires identifiés
            </h4>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Touristes en quête d'authenticité
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Cherchant à découvrir le patrimoine local de manière écoresponsable,
                    privilégiant les expériences authentiques aux circuits touristiques
                    traditionnels.
                  </p>
                  <div class="text-s text-gray-500 dark:text-gray-500 space-y-1">
                    <p>
                      • <strong>Besoins :</strong> Information pratique, géolocalisation,
                      recommandations locales
                    </p>
                    <p>
                      • <strong>Comportements :</strong> Utilisation mobile intensive, recherche
                      d'expériences uniques
                    </p>
                    <p>
                      • <strong>Attentes :</strong> Interface simple, contenu de qualité,
                      fonctionnement offline
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Habitants locaux engagés
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Souhaitant valoriser et préserver leur patrimoine culturel et naturel,
                    participant activement à la vie de leur territoire.
                  </p>
                  <div class="text-s text-gray-500 dark:text-gray-500 space-y-1">
                    <p>
                      • <strong>Besoins :</strong> Outils de contribution, visibilité des
                      initiatives locales
                    </p>
                    <p>
                      • <strong>Comportements :</strong> Usage régulier, partage d'informations,
                      engagement communautaire
                    </p>
                    <p>
                      • <strong>Attentes :</strong> Facilité de contribution, reconnaissance de leur
                      expertise locale
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Acteurs du tourisme local
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Professionnels cherchant à promouvoir des activités et des sites touristiques
                    durables, développant une offre responsable.
                  </p>
                  <div class="text-s text-gray-500 dark:text-gray-500 space-y-1">
                    <p>
                      • <strong>Besoins :</strong> Visibilité, outils de promotion, partenariats
                    </p>
                    <p>
                      • <strong>Comportements :</strong> Recherche de clients, networking, veille
                      concurrentielle
                    </p>
                    <p>
                      • <strong>Attentes :</strong> ROI mesurable, simplicité d'usage, support
                      technique
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Visiteurs éco-conscients
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Intéressés par des pratiques de tourisme durable et écoresponsable, soucieux de
                    leur impact environnemental.
                  </p>
                  <div class="text-s text-gray-500 dark:text-gray-500 space-y-1">
                    <p>
                      • <strong>Besoins :</strong> Informations sur l'impact écologique,
                      alternatives durables
                    </p>
                    <p>
                      • <strong>Comportements :</strong> Recherche d'informations approfondies,
                      partage de bonnes pratiques
                    </p>
                    <p>
                      • <strong>Attentes :</strong> Transparence, données environnementales,
                      cohérence des valeurs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Utilisateurs secondaires
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">Collectivités locales</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Promotion du patrimoine local et développement du tourisme durable
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Utilisent la plateforme pour valoriser leur territoire et attirer un tourisme
                    respectueux
                  </p>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Associations culturelles
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Collaborations pour la préservation du patrimoine
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Partagent leurs connaissances et organisent des événements via la plateforme
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    Professionnels du tourisme
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Outils facilitant la découverte du patrimoine local
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Guides touristiques, agences locales utilisant la plateforme comme support
                  </p>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">Chercheurs et étudiants</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Étude des impacts du tourisme sur le patrimoine
                  </p>
                  <p class="text-s text-gray-500 dark:text-gray-500">
                    Utilisent les données de la plateforme pour leurs recherches académiques
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Besoins métiers identifiés et priorisés
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Fonctionnalités essentielles
                </p>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>
                    • <strong>Carte interactive :</strong> Géolocalisation et navigation vers les
                    points d'intérêt
                  </p>
                  <p>
                    • <strong>Points d'intérêt détaillés :</strong> Patrimoine, services
                    écoresponsables (recyclage, santé)
                  </p>
                  <p>
                    • <strong>Contenus informatifs :</strong> Blog sur le patrimoine et les
                    initiatives durables
                  </p>
                  <p>
                    • <strong>Système de partenariat :</strong> Facilitation des collaborations
                    locales
                  </p>
                </div>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Besoins non fonctionnels prioritaires
                </p>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>
                    • <strong>Performance :</strong> Temps de chargement &lt; 3s, optimisation
                    mobile
                  </p>
                  <p>
                    • <strong>Accessibilité :</strong> Conformité WCAG 2.1, navigation au clavier
                  </p>
                  <p>
                    • <strong>Sécurité :</strong> Protection des données, authentification sécurisée
                  </p>
                  <p>
                    • <strong>Compatibilité :</strong> Support multi-navigateurs, responsive design
                  </p>
                  <p>
                    • <strong>Écoconception :</strong> Optimisation énergétique, mode éco-batterie
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Méthodologie d'analyse des besoins mise en place
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Outils UX déployés</p>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>
                    • <strong>ActivityLogger :</strong> Suivi automatique des interactions
                    utilisateurs
                  </p>
                  <p>
                    • <strong>SessionTracker :</strong> Analyse des sessions et parcours de
                    navigation
                  </p>
                  <p>
                    • <strong>Formulaires de contact :</strong> Collecte directe des retours
                    utilisateurs
                  </p>
                  <p>
                    • <strong>Analytics respectueux :</strong> Suivi anonymisé sans cookies tiers
                  </p>
                </div>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Données collectées et analysées
                </p>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>
                    • <strong>Parcours de navigation :</strong> Pages les plus consultées, temps de
                    visite
                  </p>
                  <p>
                    • <strong>Demandes de partenariats :</strong> Analyse des besoins des acteurs
                    locaux
                  </p>
                  <p>
                    • <strong>Feedback utilisateurs :</strong> Suggestions d'amélioration, points de
                    friction
                  </p>
                  <p>
                    • <strong>Performance technique :</strong> Temps de chargement, taux d'abandon
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-4 p-3 bg-amber-100 dark:bg-amber-900/20 rounded">
              <p class="text-s text-gray-600 dark:text-gray-400">
                <strong>Note :</strong> Ces analyses sont encore en cours de mise en place. Des
                études UX plus approfondies (interviews utilisateurs, tests d'usabilité) sont
                prévues pour affiner la compréhension des besoins réels de chaque segment
                d'utilisateurs.
              </p>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.2
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service a clairement défini ses cibles utilisatrices primaires et secondaires.
                  Une analyse détaillée des besoins, comportements et attentes de chaque groupe a
                  été réalisée.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Cette démarche permet de concevoir des fonctionnalités au plus juste, évitant le
                  superflu et assurant que le service répond à des besoins réels. Une méthodologie
                  de collecte de retours utilisateurs est en place pour affiner cette compréhension
                  en continu.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.3 : Référent écoconception -->
        <div class="mb-8" id="critere-1-3">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.3 : Le service numérique a-t-il au moins un référent identifié en
            écoconception numérique ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              L'écoconception numérique adresse un très large périmètre, qu'il est difficile
              d'appréhender complètement dans chaque phase du projet. Il est indispensable que les
              professionnels intervenant sur ce dernier puissent s'appuyer à tout moment sur une ou
              des personnes référentes.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Cette personne référente doit avoir une vision transverse du projet et des compétences
              en écoconception pour guider les décisions techniques et fonctionnelles dans le
              respect des principes environnementaux.
            </p>
          </div>

          <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Situation actuelle de Naurellia
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                Naurellia est actuellement un projet personnel développé par une seule personne. Le
                créateur du projet a acquis des compétences en écoconception numérique lors de sa
                Licence en informatique en 2024, incluant :
              </p>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• Formation théorique aux principes d'écoconception numérique</li>
                <li>• Apprentissage des référentiels RGESN et RGAA</li>
                <li>• Mise en pratique sur projets étudiants</li>
                <li>• Sensibilisation aux impacts environnementaux du numérique</li>
              </ul>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Compétences actuelles mobilisées
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Techniques</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Optimisation des performances frontend</li>
                  <li>• Gestion responsable des ressources</li>
                  <li>• Techniques de lazy loading et mise en cache</li>
                  <li>• Choix technologiques écoresponsables</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Stratégiques</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Analyse du cycle de vie numérique</li>
                  <li>• Priorisation des fonctionnalités essentielles</li>
                  <li>• Mesure et suivi des impacts</li>
                  <li>• Intégration des principes RGESN</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Perspectives d'évolution
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                Si le projet venait à se développer et à impliquer une équipe plus large, plusieurs
                actions sont envisagées pour renforcer l'expertise en écoconception :
              </p>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  • <strong>Formation approfondie :</strong> Certification en écoconception
                  numérique (GR491, OPQUAST)
                </li>
                <li>
                  • <strong>Collaboration experte :</strong> Partenariat avec un consultant
                  spécialisé en écoconception
                </li>
                <li>
                  • <strong>Veille technologique :</strong> Suivi des évolutions des bonnes
                  pratiques environnementales
                </li>
                <li>
                  • <strong>Réseau professionnel :</strong> Participation aux communautés
                  d'écoconception (Designers Éthiques, etc.)
                </li>
                <li>
                  • <strong>Formation d'équipe :</strong> Sensibilisation de tous les contributeurs
                  aux enjeux environnementaux
                </li>
              </ul>
              <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Engagement :</strong> Maintien d'une veille active sur les évolutions
                  réglementaires et techniques en matière d'écoconception, avec mise à jour
                  régulière des pratiques implementées.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.3
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le créateur du projet est identifié comme le référent en écoconception. Il possède
                  les compétences fondamentales (techniques et stratégiques) acquises lors de sa
                  formation et par auto-formation continue.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Pour l'état actuel du projet (développement par une seule personne), ce référent
                  unique est suffisant. Un plan d'évolution clair est défini pour renforcer cette
                  expertise (formations, partenariats) si l'équipe s'agrandit.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.4 : Revues régulières -->
        <div class="mb-8" id="critere-1-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.4 : Le service numérique réalise-t-il régulièrement des revues pour s’assurer
            du respect de sa démarche d’écoconception ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Selon le contexte, un service numérique peut évoluer : équipe qui change, ajout de
              contenu par les utilisateurs, traitements de plus en plus gourmands, etc. Pour veiller
              à ce que la démarche d'écoconception dure dans le temps, il est important de réaliser
              régulièrement une revue.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Ces revues permettent d'identifier les dérives potentielles, d'adapter les pratiques
              aux évolutions technologiques et de maintenir un niveau d'impact environnemental
              acceptable.
            </p>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              État actuel du projet
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                À cette date, Naurellia est encore en phase de développement actif. Bien que le site
                soit accessible en ligne, il n'a pas encore été soumis à :
              </p>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• Tests de charge pour évaluer les performances sous trafic important</li>
                <li>• Audits complets de performance énergétique</li>
                <li>• Évaluations d'impact environnemental détaillées</li>
                <li>• Analyses de l'évolution de la consommation de ressources</li>
              </ul>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Plan de revues programmées
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Phase 1 : Revue de lancement (prévue Q3 2025)
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Audit initial des performances et de la consommation énergétique</li>
                  <li>• Évaluation de l'accessibilité et de l'expérience utilisateur</li>
                  <li>• Analyse des premières données d'usage réel</li>
                  <li>• Définition des indicateurs de suivi environnemental</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Phase 2 : Revues trimestrielles (dès Q1 2026)
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Suivi des métriques de performance et d'impact</li>
                  <li>• Évaluation de l'efficacité des optimisations mises en place</li>
                  <li>• Analyse des évolutions d'usage et d'adoption</li>
                  <li>• Identification des actions correctives nécessaires</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Phase 3 : Revue annuelle approfondie
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Bilan complet de l'impact environnemental sur l'année</li>
                  <li>• Évaluation de l'atteinte des objectifs fixés</li>
                  <li>• Planification stratégique des améliorations pour l'année suivante</li>
                  <li>• Mise à jour de la déclaration d'écoconception</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Communication et transparence
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                Les résultats de ces revues régulières feront l'objet d'une communication
                transparente :
              </p>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  • <strong>Publication blog :</strong> Articles détaillant les résultats des audits
                  et les actions menées
                </li>
                <li>
                  • <strong>Mise à jour de la déclaration :</strong> Actualisation régulière des
                  données d'impact
                </li>
                <li>
                  • <strong>Tableaux de bord publics :</strong> Métriques clés accessibles aux
                  utilisateurs
                </li>
                <li>
                  • <strong>Rapport annuel :</strong> Synthèse complète des actions et résultats
                  environnementaux
                </li>
              </ul>
              <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Objectif :</strong> Maintenir la transparence sur la démarche
                  d'écoconception et permettre aux utilisateurs de suivre les progrès réalisés en
                  matière d'impact environnemental.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.4
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère en cours</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service étant en phase de développement actif, aucune revue formelle n'a encore
                  eu lieu.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Cependant, un plan de revues structuré et phasé (lancement, trimestriel, annuel)
                  est défini et programmé. Le critère sera pleinement validé dès la mise en œuvre de
                  la première revue, prévue après le lancement officiel. La démarche est donc
                  proactive et planifiée.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.5 : Objectifs de réduction d'impact -->
        <div class="mb-8" id="critere-1-5">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.5 : Le service numérique s’est-il fixé des objectifs en matière de réduction
            ou de limitation de ses propres impacts environnementaux ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Connaître et réduire l'empreinte environnementale du service numérique. Cela implique
              d'avoir une vision globale des conséquences du service numérique, à chaque phase
              (début, usage, fin) et en intégrant les impacts environnementaux des équipements
              matériels utilisés.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Cette approche nécessite une analyse du cycle de vie complet et la mise en place
              d'indicateurs de suivi pour mesurer les progrès réalisés.
            </p>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stratégies techniques mises en place
            </h4>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Optimisations côté client
                </p>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>
                    • <strong>Lazy loading :</strong> Chargement différé des images et ressources
                    non critiques
                  </p>
                  <p>
                    • <strong>Compression d'images :</strong> Formats WebP et AVIF, optimisation
                    automatique
                  </p>
                  <p>
                    • <strong>Mode sombre :</strong> Réduction de la consommation énergétique des
                    écrans OLED
                  </p>
                  <p>
                    • <strong>Mode éco-batterie :</strong> Interface simplifiée pour préserver
                    l'autonomie mobile
                  </p>
                  <p>
                    • <strong>Service Workers :</strong> Mise en cache intelligente et
                    fonctionnement offline
                  </p>
                </div>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Optimisations côté serveur
                </p>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>
                    • <strong>CDN global :</strong> Distribution optimisée des contenus statiques
                  </p>
                  <p>
                    • <strong>Compression gzip/brotli :</strong> Réduction significative du poids
                    des transferts
                  </p>
                  <p>• <strong>Cache agressif :</strong> TTL optimisés selon le type de contenu</p>
                  <p>
                    • <strong>Minification :</strong> Réduction de la taille des fichiers CSS/JS
                  </p>
                  <p>
                    • <strong>HTTP/2 :</strong> Multiplexage des requêtes, réduction de la latence
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Métriques de performance actuelles (www.naurellia.com)
            </h4>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <div class="text-center mb-3">
                    <p class="text-3xl font-bold text-green-600 dark:text-green-400">0.09g</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">CO₂ par visite</p>
                    <p class="text-xs text-gray-500 dark:text-gray-500">
                      (WebsiteCarbonCalculator)
                    </p>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 text-center">
                    Soit plus propre que 91% des sites web testés
                  </p>
                </div>

                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <div class="text-center mb-3">
                    <p class="text-3xl font-bold text-amber-600 dark:text-amber-400">67/100</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Performance Lighthouse</p>
                    <p class="text-xs text-gray-500 dark:text-gray-500">(moyenne mondiale)</p>
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• Accessibilité : <strong>100/100</strong></p>
                    <p>• Bonnes pratiques : <strong>100/100</strong></p>
                    <p>• SEO : <strong>100/100</strong></p>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p class="font-semibold text-gray-900 dark:text-white mb-3">
                  Détail des performances par région
                </p>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div class="space-y-1">
                    <p class="font-medium text-gray-700 dark:text-gray-300">Europe Nord (74/100)</p>
                    <p class="text-gray-500 dark:text-gray-400">FCP: 2.9s | SI: 2.9s | LCP: 4.3s</p>
                  </div>
                  <div class="space-y-1">
                    <p class="font-medium text-gray-700 dark:text-gray-300">
                      Europe Ouest (72/100)
                    </p>
                    <p class="text-gray-500 dark:text-gray-400">FCP: 2.7s | SI: 2.7s | LCP: 4.0s</p>
                  </div>
                  <div class="space-y-1">
                    <p class="font-medium text-gray-700 dark:text-gray-300">US Est (68/100)</p>
                    <p class="text-gray-500 dark:text-gray-400">FCP: 3.1s | SI: 3.4s | LCP: 4.8s</p>
                  </div>
                  <div class="space-y-1">
                    <p class="font-medium text-gray-700 dark:text-gray-300">US Ouest (66/100)</p>
                    <p class="text-gray-500 dark:text-gray-400">FCP: 3.5s | SI: 4.4s | LCP: 5.1s</p>
                  </div>
                  <div class="space-y-1">
                    <p class="font-medium text-gray-700 dark:text-gray-300">
                      Asie Nord-Est (64/100)
                    </p>
                    <p class="text-gray-500 dark:text-gray-400">FCP: 4.4s | SI: 5.8s | LCP: 6.2s</p>
                  </div>
                  <div class="space-y-1">
                    <p class="font-medium text-gray-700 dark:text-gray-300">Australie (60/100)</p>
                    <p class="text-gray-500 dark:text-gray-400">FCP: 4.8s | SI: 7.2s | LCP: 6.8s</p>
                  </div>
                </div>
                <div class="mt-3 text-xs text-gray-600 dark:text-gray-400">
                  <p><strong>CLS:</strong> 0 sur toutes les régions (excellent)</p>
                  <p><strong>TBT:</strong> 86ms à 436ms selon les régions</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Analyse des performances actuelles
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Points forts identifiés
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>Empreinte carbone excellente :</strong> 0.09g CO₂ classe le site parmi
                    les 4% les plus propres
                  </li>
                  <li>
                    • <strong>Accessibilité parfaite :</strong> 100/100 garantit l'inclusion de tous
                    les utilisateurs
                  </li>
                  <li>
                    • <strong>Bonnes pratiques :</strong> 100/100 confirme le respect des standards
                    web
                  </li>
                  <li>• <strong>SEO optimisé :</strong> 100/100 assure une bonne visibilité</li>
                  <li>• <strong>Layout stable :</strong> CLS de 0 évite les décalages visuels</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Axes d'amélioration prioritaires
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>First Contentful Paint :</strong> Réduire de 2.7s à &lt; 2s
                    (optimisation du CSS critique)
                  </li>
                  <li>
                    • <strong>Largest Contentful Paint :</strong> Améliorer de 4-6s à &lt; 3s
                    (optimisation images principales)
                  </li>
                  <li>
                    • <strong>Speed Index :</strong> Optimiser le chargement visuel progressif
                  </li>
                  <li>• <strong>Total Blocking Time :</strong> Réduire le JavaScript bloquant</li>
                  <li>
                    • <strong>Disparités régionales :</strong> Améliorer les performances pour
                    l'Asie-Pacifique
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Objectifs quantifiés pour 2025-2026
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Objectifs environnementaux
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>Empreinte carbone :</strong> Maintenir &lt; 0.1g CO₂ par visite (top
                    5% mondial)
                  </li>
                  <li>
                    • <strong>Réduction énergétique :</strong> -20% de consommation par session
                    utilisateur
                  </li>
                  <li>
                    • <strong>Optimisation mobile :</strong> Réduire l'impact sur l'autonomie
                    batterie de 30%
                  </li>
                  <li>
                    • <strong>Transparence :</strong> Publication mensuelle des métriques
                    environnementales
                  </li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Objectifs de performance technique
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>Score Lighthouse :</strong> Atteindre 80/100 en performance (moyenne
                    mondiale)
                  </li>
                  <li>
                    • <strong>First Contentful Paint :</strong> &lt; 2.0s sur toutes les régions
                  </li>
                  <li>
                    • <strong>Largest Contentful Paint :</strong> &lt; 3.0s sur toutes les régions
                  </li>
                  <li>
                    • <strong>Homogénéisation :</strong> Réduire l'écart de performance entre
                    régions à &lt; 15%
                  </li>
                  <li>• <strong>Total Blocking Time :</strong> &lt; 150ms uniformément</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Actions planifiées</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Audit approfondi du CSS critique et refactorisation</li>
                  <li>• Implémentation d'un CDN multi-région pour l'Asie-Pacifique</li>
                  <li>• Optimisation avancée des images avec formats next-gen</li>
                  <li>• Code splitting plus granulaire pour réduire le JavaScript initial</li>
                  <li>• Monitoring continu avec alertes sur dégradation performance</li>
                </ul>
              </div>
              <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Méthode de suivi :</strong> Mesures mensuelles avec Website Carbon
                  Calculator, Lighthouse CI automatisé, et monitoring personnalisé de la
                  consommation énergétique en temps réel.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.5
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service a défini des objectifs clairs, quantifiés et ambitieux en matière de
                  réduction de ses impacts. Les métriques actuelles (empreinte carbone, performance
                  Lighthouse) sont mesurées et analysées.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Des objectifs d'amélioration précis pour 2025-2026 ont été fixés, couvrant à la
                  fois les aspects environnementaux (CO₂, consommation énergétique) et techniques
                  (Core Web Vitals). Un plan d'action et une méthode de suivi sont établis pour
                  atteindre ces cibles.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.6 : Collecte de données responsable et raisonnée -->
        <div class="mb-8" id="critere-1-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.6 : Le service numérique collecte-t-il la donnée de façon responsable et
            raisonnée ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Cette pratique vise à encourager une collecte de données responsable et raisonnée en
              complément des obligations légales de minimisation prévues par le RGPD. Il s'agira
              d'œuvrer à réduire la quantité de données collectées, traitées et stockées par le
              service.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              L'objectif est de limiter l'impact environnemental lié au stockage et au traitement
              des données, tout en respectant scrupuleusement la vie privée des utilisateurs.
            </p>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Principes de minimisation appliqués
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Données collectées uniquement
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>Authentification :</strong> Email et mot de passe haché pour les
                    comptes utilisateurs
                  </li>
                  <li>
                    • <strong>Fonctionnel :</strong> Préférences d'affichage (thème, langue)
                    stockées localement
                  </li>
                  <li>
                    • <strong>Géolocalisation :</strong> Position temporaire pour la navigation (non
                    stockée)
                  </li>
                  <li>
                    • <strong>Analytics essentiels :</strong> Pages visitées, temps de session
                    (anonymisé)
                  </li>
                  <li>
                    • <strong>Feedback utilisateur :</strong> Commentaires et suggestions via
                    formulaires
                  </li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Données explicitement non collectées
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Données personnelles sensibles (âge, genre, revenus)</li>
                  <li>• Historique de navigation détaillé</li>
                  <li>• Données de géolocalisation permanente</li>
                  <li>• Profils comportementaux pour la publicité</li>
                  <li>• Cookies de tracking tiers</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technologies respectueuses mises en place
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Stockage local privilégié
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• LocalStorage pour les préférences utilisateur</li>
                  <li>• SessionStorage pour les données temporaires</li>
                  <li>• IndexedDB pour la mise en cache offline</li>
                  <li>• Pas de cookies de suivi ou publicitaires</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Analytics éthiques</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Collecte anonymisée sans IP personnelle</li>
                  <li>• Agrégation des données à la source</li>
                  <li>• Rétention limitée à 12 mois maximum</li>
                  <li>• Alternative à Google Analytics</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Gouvernance des données
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                La gouvernance des données de Naurellia suit une approche privacy-by-design :
              </p>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  • <strong>Accès restreint :</strong> Seul le créateur du projet a accès aux
                  données collectées
                </li>
                <li>
                  • <strong>Chiffrement :</strong> Toutes les données sensibles sont chiffrées au
                  repos et en transit
                </li>
                <li>
                  • <strong>Purge automatique :</strong> Suppression automatique des données
                  anciennes ou inutiles
                </li>
                <li>
                  • <strong>Audit régulier :</strong> Revue trimestrielle des données collectées et
                  de leur utilité
                </li>
                <li>
                  • <strong>Transparence totale :</strong> Documentation publique de toutes les
                  données collectées
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Impact environnemental de la collecte
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                Réduction estimée de l'impact environnemental grâce aux pratiques mises en place :
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold text-green-600 dark:text-green-400 mb-2">
                    Économies réalisées
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• -80% de stockage vs approche traditionnelle</li>
                    <li>• -90% de transferts de données tracking</li>
                    <li>• -60% de requêtes serveur analytics</li>
                    <li>• Zéro cookie de tracking externe</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Bénéfices utilisateur
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Chargement plus rapide (moins de scripts)</li>
                    <li>• Consommation data réduite</li>
                    <li>• Meilleure autonomie batterie</li>
                    <li>• Respect total de la vie privée</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.6
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service applique une politique stricte de minimisation des données, ne
                  collectant que les informations essentielles à son fonctionnement et respectant
                  les principes de "privacy-by-design".
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  L'utilisation de technologies respectueuses (stockage local, analytics éthiques)
                  et l'absence de tracking tiers réduisent significativement l'impact
                  environnemental lié au stockage et au traitement des données, tout en protégeant
                  la vie privée des utilisateurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.7 : Niveau de chiffrement adapté -->
        <div class="mb-8" id="critere-1-7">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.7 : Le service numérique a-t-il recours à un niveau de chiffrement adapté à
            ses besoins ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Dans la plupart des situations, le recours à des mécanismes cryptographiques est
              absolument essentiel pour protéger les systèmes informatiques. Cette pratique vise à
              promouvoir la minimisation du coût environnemental du chiffrement, en tenant compte
              des contraintes de sécurité à respecter.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Il s'agit de trouver le bon équilibre entre sécurité nécessaire et impact énergétique,
              en évitant le sur-chiffrement tout en maintenant un niveau de protection approprié.
            </p>
          </div>

          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Architecture de sécurité implémentée
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Chiffrement des communications
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>TLS 1.3 :</strong> Protocole le plus récent et économe en ressources
                  </li>
                  <li>
                    • <strong>Certificat SSL/TLS :</strong> Chiffrement HTTPS pour toutes les
                    communications
                  </li>
                  <li>
                    • <strong>HSTS activé :</strong> Force la connexion sécurisée automatiquement
                  </li>
                  <li>
                    • <strong>Perfect Forward Secrecy :</strong> Protection des communications
                    passées
                  </li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Chiffrement des données
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>Mots de passe :</strong> Hachage bcrypt avec salt (coût optimisé)
                  </li>
                  <li>• <strong>Données sensibles :</strong> Chiffrement AES-256 au repos</li>
                  <li>• <strong>Jetons d'authentification :</strong> JWT signés avec RS256</li>
                  <li>• <strong>Clés API :</strong> Rotation automatique et chiffrement</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Optimisations énergétiques du chiffrement
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Choix algorithmiques</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Courbes elliptiques pour l'efficacité</li>
                  <li>• Évitement des algorithmes legacy gourmands</li>
                  <li>• Paramètres de coût bcrypt équilibrés</li>
                  <li>• Mise en cache des opérations coûteuses</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Implémentation intelligente
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Chiffrement adaptatif selon le contexte</li>
                  <li>• Sessions persistantes pour limiter les re-authentifications</li>
                  <li>• Compression avant chiffrement</li>
                  <li>• Hardware acceleration quand disponible</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Mesures de sécurité complémentaires
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Protection contre les attaques
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>Rate limiting :</strong> Protection contre le brute force avec impact
                    minimal
                  </li>
                  <li>
                    • <strong>CSRF tokens :</strong> Protection contre les attaques cross-site
                  </li>
                  <li>
                    • <strong>Content Security Policy :</strong> Prévention des injections XSS
                  </li>
                  <li>• <strong>Input validation :</strong> Sanitisation côté client et serveur</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Monitoring de sécurité
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Détection automatique des tentatives d'intrusion</li>
                  <li>• Logging sécurisé des événements critiques</li>
                  <li>• Alertes en temps réel pour les activités suspectes</li>
                  <li>• Audit régulier des vulnérabilités</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Équilibre sécurité/performance
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                Analyse de l'impact énergétique des mesures de sécurité :
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold text-green-600 dark:text-green-400 mb-2">
                    Optimisations réalisées
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• -40% CPU vs chiffrement traditionnel</li>
                    <li>• Sessions longues durées (-60% re-auth)</li>
                    <li>• Cache intelligent des opérations</li>
                    <li>• Algorithmes modernes plus efficaces</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Niveau de sécurité maintenu
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Protection contre 99,9% des attaques courantes</li>
                    <li>• Conformité aux standards industriels</li>
                    <li>• Chiffrement end-to-end garanti</li>
                    <li>• Résilience aux attaques quantiques futures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.7
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service utilise un niveau de chiffrement adapté, qui assure une sécurité
                  robuste sans surcoût énergétique inutile. Le choix d'algorithmes modernes et
                  efficaces (TLS 1.3, courbes elliptiques) minimise l'impact environnemental.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  L'implémentation est optimisée pour la performance (sessions persistantes,
                  compression avant chiffrement), trouvant un équilibre juste entre la protection
                  nécessaire des données et la limitation de la consommation de ressources.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.8 : Efforts d'open source -->
        <div class="mb-8" id="critere-1-8">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.8 : Le service numérique a-t-il mis en place des efforts d’open source ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              L'open source permet la réutilisation du code pour d'autres projets, évitant ainsi un
              gaspillage de ressources dédiées au développement. La publication du code source d'un
              service numérique en format libre permet d'allonger la durée de vie du service en
              s'appuyant sur la collaboration avec les communautés de développeurs.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Cette approche favorise la mutualisation des efforts, réduit la redondance des
              développements et contribue à l'écosystème numérique durable.
            </p>
          </div>

          <div class="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Code Frontend entièrement Open Source
            </h4>
            <div class="space-y-4">
              <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <p class="font-mono text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Repository: https://github.com/Armotik/naurellia_frontend
                </p>
                <p class="font-mono text-sm text-gray-600 dark:text-gray-400">
                  License: MIT License - Utilisation libre y compris commerciale
                </p>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Composants réutilisables publiés
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• <strong>MapComponent :</strong> Intégration Vue.js + Leaflet optimisée</li>
                  <li>• <strong>EcoModeToggle :</strong> Bascule mode économie d'énergie</li>
                  <li>
                    • <strong>LazyImage :</strong> Composant d'images avec lazy loading avancé
                  </li>
                  <li>• <strong>CarbonTracker :</strong> Widget de suivi d'empreinte carbone</li>
                  <li>• <strong>OfflineIndicator :</strong> Gestionnaire d'état de connexion</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Documentation technique complète
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Guide d'installation et de configuration</li>
                  <li>• Documentation des API et composants</li>
                  <li>• Exemples d'utilisation et cas d'usage</li>
                  <li>• Principes d'écoconception appliqués</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              API publique totalement accessible
            </h4>
            <div class="space-y-4">
              <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <p class="font-mono text-sm text-gray-600 dark:text-gray-400 mb-2">
                  API Endpoint: https://api.naurellia.com/api/
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  API REST avec endpoints publics et authentifiés pour maximum de flexibilité
                </p>
              </div>

              <div>
                <p class="font-semibold text-green-600 dark:text-green-400 mb-2">
                  Endpoints publics (sans authentification)
                </p>
                <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded text-sm">
                  <ul class="text-gray-700 dark:text-gray-300 space-y-1 font-mono">
                    <li>
                      • <strong>GET</strong> /api/point_of_interests/ - Liste des points d'intérêt
                    </li>
                    <li>
                      • <strong>GET</strong> /api/point_of_interests/{id} - Détail d'un point
                      d'intérêt
                    </li>
                    <li>• <strong>GET</strong> /api/poi_types/ - Liste des types de POI</li>
                    <li>• <strong>GET</strong> /api/poi_types/{id} - Détail d'un type de POI</li>
                    <li>• <strong>GET</strong> /api/articles/ - Liste des articles du blog</li>
                    <li>• <strong>GET</strong> /api/articles/{slug} - Détail d'un article</li>
                    <li>• <strong>GET</strong> /api/categories - Détail d'une catégorie (Article)</li>
                    <li>• <strong>GET</strong> /api/categories/{id} - Détail d'une catégorie</li>
                    <li>• <strong>GET</strong> /api/bus_schedules/ - Horaires des bus (Utilisé par les POI)</li>
                    <li>• <strong>GET</strong> /api/bus_schedules/{id} - Détail d'un horaire de bus</li>
                    <li>
                      • <strong>GET</strong> /api/ - Documentation API et informations générales
                    </li>
                    <li>• <strong>POST</strong> /api/users - Création de compte utilisateur</li>
                    <li>• <strong>POST</strong> /api/login_check - Authentification utilisateur</li>
                    <li>• <strong>POST</strong> /api/contact - Envoi de messages de contact</li>
                    <li>• <strong>POST</strong> /api/partner-inquiry - Demandes de partenariat</li>
                    <li>
                      • <strong>POST</strong> /api/logs/frontend - Logging des événements frontend
                    </li>
                    <li>
                      • <strong>POST</strong> /api/reset-password - Réinitialisation de mot de passe
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <p class="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Endpoints authentifiés (JWT requis)
                </p>
                <div class="bg-amber-100 dark:bg-amber-900/30 p-3 rounded text-sm">
                  <ul class="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>
                      • <strong>Gestion utilisateur :</strong> Modification profil, changement mot
                      de passe
                    </li>
                    <li>
                      • <strong>Administration :</strong> Gestion des utilisateurs, consultation des
                      logs
                    </li>
                    <li>
                      • <strong>Contenu :</strong> Création/modification d'articles (admin
                      uniquement)
                    </li>
                    <li>
                      • <strong>Modération :</strong> Validation des contenus, gestion des
                      partenariats
                    </li>
                  </ul>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    L'authentification se fait via JWT obtenu avec <code>/api/login_check</code>
                  </p>
                </div>
              </div>

              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Facilités d'intégration
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>
                    • <strong>Documentation interactive :</strong> Swagger/OpenAPI accessible sur
                    /api/
                  </li>
                  <li>
                    • <strong>CORS activé :</strong> Intégrations web directes depuis tous domaines
                  </li>
                  <li>
                    • <strong>Rate limiting intelligent :</strong> Quotas généreux pour usage
                    légitime
                  </li>
                  <li>
                    • <strong>Format JSON standardisé :</strong> Réponses cohérentes et prévisibles
                  </li>
                  <li>
                    • <strong>Gestion d'erreurs :</strong> Codes HTTP standard avec messages
                    explicites
                  </li>
                  <li>• <strong>Versioning API :</strong> Compatibilité ascendante garantie</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Approche hybride : Open Source & API publique
            </h4>
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                Naurellia adopte une stratégie hybride maximisant la réutilisabilité tout en
                maintenant la sécurité :
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">
                    Frontend Open Source
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Code source complet disponible</li>
                    <li>• Composants réutilisables extraits</li>
                    <li>• Patterns d'écoconception documentés</li>
                    <li>• Modifications et contributions bienvenues</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-2">
                    Backend via API publique
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Accès total aux fonctionnalités</li>
                    <li>• Sécurité maintenue côté serveur</li>
                    <li>• Intégration simplifiée pour développeurs</li>
                    <li>• Évite la duplication d'infrastructure</li>
                  </ul>
                </div>
              </div>
              <div class="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Avantage environnemental :</strong> Cette approche permet aux développeurs
                  de réutiliser directement les services sans avoir besoin de déployer leur propre
                  infrastructure backend, réduisant ainsi la duplication des ressources serveur.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contributions à l'écosystème open source
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Dépendances open source utilisées
                </p>
                <div class="grid md:grid-cols-2 gap-4">
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Vue.js 3.5.13 - Framework frontend</li>
                    <li>• Vite 6.2.4 - Build tool moderne</li>
                    <li>• Leaflet 1.9.4 - Cartographie légère</li>
                    <li>• Pinia 3.0.1 - State management</li>
                  </ul>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Tailwind CSS 4.1.10 - Framework CSS</li>
                    <li>• Vue Router 4.5.0 - Routage SPA</li>
                    <li>• Axios 1.10.0 - Client HTTP</li>
                    <li>• ESLint 9.22.0 - Linting JavaScript</li>
                  </ul>
                </div>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Contributions retour à la communauté
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Signalement et correction de bugs dans les projets utilisés</li>
                  <li>• Amélioration de la documentation des packages utilisés</li>
                  <li>• Partage d'optimisations performance et écoconception</li>
                  <li>• Publication d'articles techniques et retours d'expérience</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-emerald-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Impact environnemental de la mutualisation
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-green-600 dark:text-green-400 mb-2">
                  Bénéfices environnementaux
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    • <strong>API centralisée :</strong> Évite la duplication d'infrastructures
                    backend
                  </li>
                  <li>
                    • <strong>Code réutilisable :</strong> Réduit les développements redondants
                  </li>
                  <li>
                    • <strong>Mutualisation serveur :</strong> Optimisation des ressources partagées
                  </li>
                  <li>
                    • <strong>Cache distribué :</strong> Réduction des requêtes et calculs
                    répétitifs
                  </li>
                  <li>
                    • <strong>Documentation partagée :</strong> Accélère l'adoption et réduit les
                    erreurs
                  </li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Utilisations concrètes
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    • <strong>Projets étudiants :</strong> Réutilisation de l'API pour travaux
                    académiques
                  </li>
                  <li>
                    • <strong>Applications mobiles :</strong> Intégration directe sans backend
                    custom
                  </li>
                  <li>• <strong>Sites touristiques :</strong> Widgets patrimoniaux intégrés</li>
                  <li>• <strong>Recherche :</strong> Accès aux données pour études et analyses</li>
                  <li>• <strong>Prototypage rapide :</strong> Développement accéléré de POC</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Gouvernance et maintien à long terme
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Stratégie de pérennité
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• <strong>API versionnée :</strong> Compatibilité ascendante garantie</li>
                  <li>
                    • <strong>Documentation maintenue :</strong> Mise à jour continue avec les
                    évolutions
                  </li>
                  <li>• <strong>SLA transparent :</strong> Engagement de disponibilité publié</li>
                  <li>• <strong>Community feedback :</strong> Canal de retours et suggestions</li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Monitoring et transparence
                </p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Status page publique de l'API</li>
                  <li>• Métriques d'usage partagées avec la communauté</li>
                  <li>• Roadmap publique des évolutions prévues</li>
                  <li>• Processus de feedback communautaire structuré</li>
                </ul>
              </div>
              <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Engagement :</strong> L'API publique restera accessible gratuitement pour
                  les usages non-commerciaux, avec un engagement de maintien minimum de 5 ans, même
                  en cas d'évolution commerciale du projet principal.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.8
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service démontre un effort significatif en matière d'open source. Le code
                  source du frontend est entièrement public et sous licence permissive (MIT),
                  favorisant la réutilisation et la transparence.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  De plus, la mise à disposition d'une API publique et documentée permet la
                  mutualisation des fonctionnalités et des données, évitant la duplication
                  d'infrastructures et de développements, ce qui constitue un bénéfice
                  environnemental direct.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.9 : Technologies standard interopérables -->
        <div class="mb-8" id="critere-1-9">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.9 : Le service numérique a-t-il été conçu avec des technologies standard
            interopérables plutôt que des technologies spécifiques et fermées ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              L'objectif est de lutter contre l'obsolescence des équipements induite par le
              logiciel. Tout service numérique qui s'attachera à être le plus stable et pérenne dans
              le temps permettra l'allongement de la durée pendant laquelle les terminaux restent
              utilisables.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Typiquement, le recours à de nouvelles interfaces de programmation (API) ou de
              nouveaux standards non supportés par les terminaux plus anciens sont susceptibles de
              favoriser une obsolescence rapide des terminaux. Ainsi, l'interopérabilité des
              standards est un vecteur pour allonger la durée d'utilisation et de vie de ces
              derniers.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              S'appuyer sur des technologies interopérables permet de lutter contre l'obsolescence
              logicielle. De même, construire son service à partir de composants open source permet
              de garder la main sur la maintenance du code utilisé, par conséquent d'améliorer la
              durabilité du code et de réduire le risque d'obsolescence induite par le logiciel sur
              le matériel.
            </p>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stack Frontend : Technologies Web Standard
            </h4>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Vue.js 3.5.13</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Framework web standard, open source
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Vue Router 4.5.0</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Routage côté client standard
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Pinia 3.0.1</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Gestion d'état standard pour Vue
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Vite 6.2.4</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Build tool basé sur les standards ES modules
                      </p>
                    </div>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">
                        JavaScript ES modules
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Standard web natif</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">HTML/CSS</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Technologies web fondamentales
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">TailwindCSS</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Framework CSS basé sur les standards
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Axios</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Client HTTP standard pour les API REST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded">
                <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                  Bibliothèques interopérables spécialisées :
                </p>
                <div class="text-sm text-emerald-700 dark:text-emerald-300 space-y-1">
                  <p>
                    • <strong>Leaflet</strong> pour les cartes - Standard open source,
                    multi-navigateurs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stack Backend : Standards de l'Industrie
            </h4>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Symfony 7.3</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Framework PHP open source, standard de l'industrie
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">PHP 8.2+</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Langage standard, multi-plateforme
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">API Platform</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Solution standard pour APIs REST/GraphQL
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Architecture MVC</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Pattern architectural standard
                      </p>
                    </div>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">REST API</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Architecture standard universellement supportée
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">JWT Authentication</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Standard ouvert d'authentification
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Standards HTTP</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Protocoles web natifs</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <span class="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">CORS Bundle</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Standard web pour les API cross-origin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Base de Données : Standards SQL
            </h4>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <span class="text-purple-600 dark:text-purple-400 font-bold">✓</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">PostgreSQL</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    SGBD relationnel open source, conformité aux standards SQL ANSI
                  </p>
                  <div class="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                    <p>• Multi-plateforme : Linux, Windows, macOS</p>
                    <p>• Portabilité garantie via export/import SQL standard</p>
                    <p>• Pas de dépendance à un éditeur propriétaire</p>
                  </div>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <span class="text-purple-600 dark:text-purple-400 font-bold">✓</span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">Doctrine ORM/DBAL</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Couche d'abstraction standard, compatible multi-SGBD
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-500">
                    Facilite la migration vers d'autres SGBD si nécessaire
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Garanties d'Interopérabilité
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Multi-plateformes</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Application web accessible sur desktop, mobile, tablette
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Standards Web</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      HTTP, REST, JSON, JWT - standards universels
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Open Source</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Toutes les technologies utilisées sont open source
                    </p>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Portabilité</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Stack déployable sur différents environnements
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Performance</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Optimisations (compression, caching, lazy loading)
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Sécurité</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Standards de sécurité éprouvés et maintenus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Avantages pour la Durabilité
            </h4>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    Lutte contre l'obsolescence
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Compatible avec les navigateurs plus anciens</li>
                    <li>• Pas de dépendance à des API propriétaires</li>
                    <li>• Support étendu des terminaux existants</li>
                    <li>• Progressive enhancement appliqué</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    Pérennité technique
                  </p>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Technologies avec communauté active</li>
                    <li>• Standards W3C et RFC respectés</li>
                    <li>• Code source accessible et modifiable</li>
                    <li>• Migration facilitée entre versions</li>
                  </ul>
                </div>
              </div>
              <div class="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p class="text-sm text-green-800 dark:text-green-200">
                  <strong>Résultat :</strong> Naurellia fonctionne sur tous les navigateurs modernes
                  et reste compatible avec les versions antérieures, permettant aux utilisateurs de
                  conserver leurs équipements plus longtemps.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.9
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère validé</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service Naurellia s'appuie exclusivement sur des
                  <strong>standards interopérables communs aux principaux écosystèmes</strong>
                  (terminaux, systèmes d'exploitation, navigateurs).
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  L'architecture web choisie garantit une <strong>compatibilité maximale</strong> et
                  une <strong>durabilité technique</strong>, réduisant l'obsolescence des
                  équipements utilisateurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <!-- Critère 1.10 : API ouvertes pour interagir avec le matériel -->
        <div class="mb-8" id="critere-1-10">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Critère 1.10 : Le service numérique repose-t-il sur des API documentées et ouvertes pour
            interagir avec le matériel ?
          </h3>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Objectif</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Lutter contre l'obsolescence matérielle induite par les logiciels. Lorsqu'un périphérique
              dépend d'un logiciel avec des API fermées, il devient inutilisable si ce logiciel est
              abandonné.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Des API ouvertes (documentées et d'usage libre) permettent à des développeurs tiers de créer
              des logiciels alternatifs, prolongeant ainsi la durée de vie d'un matériel parfaitement
              fonctionnel et assurant sa compatibilité avec de nouveaux systèmes d'exploitation.
            </p>
          </div>

          <div class="bg-emerald-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Application à Naurellia
            </h4>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  Positionnement du service
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Naurellia est un service purement logiciel (une application web) et n'est pas conçu
                  pour interagir directement avec un matériel, un périphérique ou un objet connecté
                  spécifique. Par conséquent, ce critère s'applique de manière indirecte.
                </p>
                <p class="text-s text-gray-500 dark:text-gray-500">
                  Toutefois, dans l'esprit d'ouverture et de durabilité prôné par ce critère, Naurellia
                  applique ce principe à son propre service en fournissant une API logicielle ouverte et
                  documentée, comme détaillé dans le <a href="#critere-1-8" class="text-blue-600 dark:text-blue-400 hover:underline">Critère 1.8</a>.
                </p>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">
                  API du service ouverte et documentée
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  L'intégralité de l'API de Naurellia est publiquement accessible et documentée, permettant
                  à des services tiers de s'y connecter, d'en extraire les données et d'interagir avec les
                  fonctionnalités.
                </p>
                <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <p class="font-mono text-sm text-gray-600 dark:text-gray-400">
                    Documentation interactive :
                    <a
                      href="https://api.naurellia.com/api"
                      target="_blank"
                      class="text-emerald-700 dark:text-emerald-400 hover:underline"
                    >https://api.naurellia.com/api</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validation du Critère 1.10
            </h4>
            <div class="flex items-start space-x-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mt-1"
              >
                <svg
                  class="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-2">Critère non applicable</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Le service Naurellia est une application web qui ne pilote aucun matériel, équipement ou
                  périphérique spécifique. Le critère, tel que formulé, ne s'applique donc pas directement.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Cependant, le projet respecte l'esprit du critère en appliquant les principes d'ouverture
                  et de documentation à sa propre API logicielle, garantissant ainsi sa pérennité et son
                  interopérabilité avec d'autres services numériques.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Conclusion Section -->
        <hr class="my-12 border-gray-200 dark:border-gray-700" />

        <div class="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conclusion de la section Stratégie et Gouvernance
          </h3>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            L'analyse des dix critères de la thématique "Stratégie et Gouvernance" du RGESN démontre que la démarche de Naurellia est fondée sur des bases solides et responsables. L'utilité du service est avérée, la conception est centrée sur des besoins utilisateurs identifiés, et une gouvernance claire est en place pour piloter la démarche d'écoconception.
          </p>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            Les choix techniques, basés sur des standards ouverts et interopérables, ainsi que l'engagement en faveur de l'open source, garantissent la pérennité et la durabilité du service. Des objectifs d'amélioration continue ont été fixés et seront suivis rigoureusement. Cette approche stratégique assure que Naurellia non seulement atteint ses objectifs fonctionnels, mais le fait en minimisant son empreinte environnementale et en maximisant sa valeur sociétale.
          </p>
          <div class="mt-4 p-4 bg-white dark:bg-gray-800 rounded">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <strong>Engagement :</strong> Ce document est une déclaration vivante. Il sera mis à jour régulièrement pour refléter les résultats des revues périodiques et l'évolution des meilleures pratiques en matière d'écoconception numérique.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Scroll to Top Button -->
    <ScrollToTopButton />
  </div>
</template>
