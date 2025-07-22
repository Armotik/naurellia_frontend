<script setup>
import { onMounted } from 'vue';
import { useLogger } from '@/composables/useLogger';

const { logAction } = useLogger();

onMounted(() => {
  document.title = 'Naurellia | Mentions légales';
});

// Fonction pour logger les clics sur les liens
function handlePrivacyPolicyClick() {
  logAction('legal_mentions', 'privacy_policy_link_click', {
    timestamp: Date.now()
  });
}

function handleMailtoClick(emailType) {
  logAction('legal_mentions', 'mailto_click', {
    emailType: emailType, // 'admin' ou 'support'
    timestamp: Date.now()
  });
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16">
        <h2 class="text-base font-semibold text-green-700 dark:text-green-500 tracking-wide uppercase">Informations Officielles</h2>
        <p class="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Mentions Légales
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
          En vigueur au 21 juillet 2025
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-md">
        <p class="text-base leading-7 text-gray-600 dark:text-gray-300 mb-8">
          Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., et aux articles L.111-1 et suivants du Code de la consommation, il est porté à la connaissance des utilisateurs et visiteurs du site Naurellia les présentes mentions légales.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">Article 1 : L'éditeur</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-2">
          <p>L'édition et la direction de la publication du site Naurellia (https://naurellia.com) est assurée par :</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Anthony MUDET</strong></p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Statut :</strong> Personne physique - Projet personnel non commercial</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Adresse :</strong> 3 Chemin des Genêts, 17740 Sainte-Marie-De-Ré, Nouvelle-Aquitaine FRANCE</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Email :</strong> <a href="mailto:admin@naurellia.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline" @click="handleMailtoClick('admin')">admin@naurellia.com</a></p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Téléphone :</strong> 07 71 14 20 02</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">SIRET/SIREN :</strong> Non applicable (projet personnel)</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Numéro TVA :</strong> Non applicable</p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 2 : L'hébergeur</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-2">
          <p>L'hébergement du site Naurellia est assuré par :</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Hostinger International Ltd.</strong></p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Siège social :</strong> 61 Lordou Vironos str. 6023 Larnaca, Cyprus</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Email :</strong> support@hostinger.com</p>
          <p><strong class="font-semibold text-gray-900 dark:text-white">Site web :</strong> <a href="https://www.hostinger.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">www.hostinger.com</a></p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 3 : Description du service</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            <strong class="font-semibold text-gray-900 dark:text-white">Naurellia</strong> est une plateforme web informative dédiée à la promotion d'un tourisme respectueux et durable sur l'Île de Ré. Le site propose les services suivants :
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong class="font-semibold text-gray-900 dark:text-white">Carte interactive :</strong> Visualisation des points d'intérêt (POI) de l'Île de Ré avec données géographiques fournies par OpenStreetMap et services de géocodage Geoapify.</li>
            <li><strong class="font-semibold text-gray-900 dark:text-white">Base de données POI :</strong> Informations détaillées sur les lieux touristiques, services, transports et conseils éco-responsables.</li>
            <li><strong class="font-semibold text-gray-900 dark:text-white">Blog éditorial :</strong> Articles d'information sur le tourisme durable, actualités locales et conseils pratiques.</li>
            <li><strong class="font-semibold text-gray-900 dark:text-white">Système de commentaires :</strong> Possibilité pour les utilisateurs enregistrés de commenter articles et POI (modération active).</li>
            <li><strong class="font-semibold text-gray-900 dark:text-white">Formulaires de contact :</strong> Mise en relation avec l'équipe Naurellia pour demandes d'information ou partenariats.</li>
            <li><strong class="font-semibold text-gray-900 dark:text-white">Espace utilisateur :</strong> Création de compte, authentification sécurisée, gestion de profil.</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 4 : Technologies et prestataires techniques</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p><strong class="font-semibold text-gray-900 dark:text-white">Technologies utilisées :</strong></p>
          <ul class="list-disc pl-6 space-y-2 mb-4">
            <li>Frontend : Vue.js 3.5, Vuetify, Tailwind CSS, Leaflet/Vue-Leaflet</li>
            <li>Backend : Symfony 7.3, API Platform, Doctrine ORM, base de données PostgreSQL</li>
            <li>Sécurité : Authentification JWT, chiffrement HTTPS (SSL/TLS), bcrypt pour mots de passe</li>
            <li>APIs externes : Geoapify (géocodage), OpenStreetMap (tuiles cartographiques)</li>
          </ul>

          <p><strong class="font-semibold text-gray-900 dark:text-white">Prestataires tiers :</strong></p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong class="font-semibold text-gray-900 dark:text-white">Geoapify :</strong> Service de géocodage européen (données géographiques) - <a href="https://www.geoapify.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">www.geoapify.com</a></li>
            <li><strong class="font-semibold text-gray-900 dark:text-white">OpenStreetMap Foundation :</strong> Données cartographiques libres - <a href="https://www.openstreetmap.org" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">www.openstreetmap.org</a></li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 5 : Propriété intellectuelle</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            L'ensemble de ce site, incluant les textes, images, graphismes, logo, icônes, interface utilisateur, base de données des POI ainsi que leur mise en forme, est la propriété exclusive de l'éditeur du site Naurellia, à l'exception des éléments suivants :
          </p>
          <ul class="list-disc pl-6 space-y-2 mb-4">
            <li>Données cartographiques OpenStreetMap (licence ODbL)</li>
            <li>Contributions utilisateurs (commentaires) - licence d'utilisation accordée à Naurellia</li>
            <li>Contenus tiers expressément mentionnés</li>
          </ul>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable ou dans les cas prévus par la loi.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 6 : Responsabilité et limitations</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p><strong class="font-semibold text-gray-900 dark:text-white">Concernant les informations :</strong></p>
          <p>
            Les informations présentes sur le site Naurellia sont fournies à titre informatif. Bien que nous nous efforcions de maintenir des informations précises et à jour sur les POI, horaires, services et conditions d'accès, nous ne garantissons pas l'exactitude, la complétude ou l'actualité de ces informations. Les utilisateurs sont invités à vérifier les informations avant de se déplacer.
          </p>

          <p><strong class="font-semibold text-gray-900 dark:text-white">Concernant la géolocalisation :</strong></p>
          <p>
            La fonctionnalité de géolocalisation et les données cartographiques sont fournies par des services tiers (Geoapify, OpenStreetMap). Nous ne garantissons pas la précision absolue des coordonnées et recommandons l'utilisation d'outils de navigation officiels pour les déplacements.
          </p>

          <p><strong class="font-semibold text-gray-900 dark:text-white">Limitation de responsabilité :</strong></p>
          <p>
            Naurellia ne pourra être tenu responsable des dommages directs et indirects résultant de l'utilisation du site, notamment en cas d'informations inexactes, d'indisponibilité temporaire du service, ou de problèmes techniques liés aux navigateurs ou connexions internet.
          </p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 7 : Modération et contenu utilisateur</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            Les espaces de commentaires sont modérés. Naurellia se réserve le droit de supprimer, sans préavis, tout contenu qui :
          </p>
          <ul class="list-disc pl-6 space-y-2 mb-4">
            <li>Contrevient à la législation française</li>
            <li>Est à caractère injurieux, diffamatoire, raciste, ou pornographique</li>
            <li>Constitue du spam ou de la publicité non autorisée</li>
            <li>Porte atteinte aux droits de tiers</li>
            <li>Est contraire à l'esprit de promotion du tourisme responsable</li>
          </ul>
          <p>
            En cas de contenu illicite, Naurellia se réserve le droit de transmettre les informations nécessaires aux autorités compétentes et de mettre en cause la responsabilité civile et/ou pénale de l'utilisateur.
          </p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 8 : Protection des données personnelles</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            Les données personnelles collectées sur ce site sont traitées dans le respect du Règlement (UE) 2016/679 (RGPD) et de la Loi n°78-17 du 6 janvier 1978 modifiée. Le traitement comprend notamment :
          </p>
          <ul class="list-disc pl-6 space-y-2 mb-4">
            <li>Gestion des comptes utilisateurs et authentification</li>
            <li>Journalisation des activités pour la sécurité</li>
            <li>Géolocalisation pour les services cartographiques</li>
            <li>Analyse d'usage pour l'amélioration du service</li>
          </ul>
          <p>
            Pour plus d'informations, consultez notre <a href="/privacy-policy" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline" @click="handlePrivacyPolicyClick">Politique de confidentialité</a>.
          </p>
          <p>
            Vous pouvez exercer vos droits (accès, rectification, suppression, opposition) en contactant : <a href="mailto:admin@naurellia.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline" @click="handleMailtoClick('admin')">admin@naurellia.com</a>.
          </p>
          <p>
            <strong class="font-semibold text-gray-900 dark:text-white">Suppression de compte :</strong> Vous pouvez à tout moment supprimer votre compte utilisateur directement depuis votre espace personnel. Cette action entraînera la suppression immédiate de vos informations personnelles, à l'exception des données nécessaires pour des obligations légales ou des fins statistiques anonymisées. La procédure requiert une confirmation explicite par saisie du mot "SUPPRIMER" pour éviter toute suppression accidentelle. L'action de suppression est automatiquement enregistrée dans nos logs de sécurité pour assurer la traçabilité et la conformité légale.
          </p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 9 : Cookies et technologies de suivi</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            Le site utilise des cookies et technologies similaires (localStorage, sessionStorage) pour :
          </p>
          <ul class="list-disc pl-6 space-y-2 mb-4">
            <li>Maintenir la session utilisateur (cookies essentiels)</li>
            <li>Mémoriser les préférences (thème, langue)</li>
            <li>Améliorer les performances de la carte interactive</li>
            <li>Analyser l'utilisation du site (avec consentement)</li>
          </ul>
          <p>
            La gestion des cookies est expliquée lors de votre première visite. Vous pouvez modifier vos préférences à tout moment via les paramètres de votre navigateur.
          </p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 10 : Liens externes</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            Le site peut contenir des liens vers des sites externes (partenaires, sources d'information, services connexes). Ces liens sont fournis uniquement pour votre commodité. Naurellia n'exerce aucun contrôle sur ces sites et n'assume aucune responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques de confidentialité.
          </p>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 11 : Droit applicable et juridiction</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            Les présentes mentions légales sont soumises au droit français. Tout litige relatif à l'utilisation du site sera de la compétence exclusive des tribunaux du ressort de La Rochelle, sous réserve d'une résolution amiable.
          </p>
          <p>
            Les principales dispositions légales applicables sont :
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique</li>
            <li>Règlement (UE) 2016/679 du 27 avril 2016 (RGPD)</li>
            <li>Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés</li>
            <li>Code de la propriété intellectuelle</li>
            <li>Code de la consommation</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 12 : Modifications</h2>
        <div class="text-base leading-7 text-gray-700 dark:text-gray-300">
          <p>
            Naurellia se réserve le droit de modifier les présentes mentions légales à tout moment. Les modifications prennent effet dès leur publication sur le site. Il est conseillé de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
