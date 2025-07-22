<script setup>
import { onMounted } from 'vue';
import { useLogger } from '@/composables/useLogger';

const { logAction } = useLogger();

onMounted(() => {
  document.title = 'Naurellia | Politique de Confidentialité';
});

// Fonction pour logger les clics sur les liens mailto
function handleMailtoClick(emailType) {
  logAction('privacy_policy', 'mailto_click', {
    emailType: emailType, // 'admin'
    timestamp: Date.now()
  });
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16">
        <h2 class="text-base font-semibold text-green-700 dark:text-green-500 tracking-wide uppercase">Votre Vie Privée, Notre Priorité</h2>
        <p class="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Politique de Confidentialité
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
          Dernière mise à jour : 21 juillet 2025
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-md text-base leading-7 text-gray-700 dark:text-gray-300">
        <p class="mb-6">
          Le site Naurellia, accessible à l'adresse https://naurellia.com, accorde une grande importance à la protection de vos données personnelles et s'engage à ce que la collecte et le traitement de vos données soient effectués de manière licite, loyale et transparente, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">Article 1 : Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles est :<br>
          <strong class="font-semibold text-gray-900 dark:text-white">Anthony MUDET</strong><br>
          Adresse : 3 Chemin des Genêts, 17740 Sainte-Marie-De-Ré, Nouvelle-Aquitaine FRANCE<br>
          Email : <a href="mailto:admin@naurellia.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline" @click="handleMailtoClick('admin')">admin@naurellia.com</a>
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 2 : Données personnelles collectées</h2>
        <p class="mb-4">
          Dans le cadre de l'exploitation du site Naurellia, nous collectons les données suivantes :
        </p>

        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.1 Données de navigation et techniques</h3>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Données de connexion :</strong> Adresse IP, type et version de navigateur, système d'exploitation, résolution d'écran, pages visitées, date et heure de connexion, durée de session, référent HTTP.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Journalisation des activités :</strong> Actions effectuées sur le site, tentatives de connexion (réussies et échouées), accès aux pages administratives, erreurs système, pour des fins de sécurité et d'amélioration du service.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Données de géolocalisation :</strong> Localisation approximative (ville, région) dérivée de votre adresse IP, coordonnées géographiques si vous autorisez la géolocalisation pour l'utilisation de la carte interactive.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Données cartographiques :</strong> Interactions avec la carte (zoom, déplacements, points d'intérêt consultés), recherches géographiques effectuées.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.2 Données de compte utilisateur</h3>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Informations d'inscription :</strong> Adresse email (obligatoire), nom d'utilisateur choisi, mot de passe (chiffré avec algorithme bcrypt).</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Données de profil :</strong> Statut de vérification email, rôles attribués (utilisateur standard, administrateur), date de création du compte, dernière connexion.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Tokens d'authentification :</strong> Jetons JWT pour maintenir la session, tokens de réinitialisation de mot de passe (temporaires), tokens de vérification email.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.3 Données de contenu et interaction</h3>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Commentaires et contributions :</strong> Contenu des commentaires sur articles et POI, identifiant d'utilisateur associé, date et heure de publication, adresse IP de publication.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Messages de contact :</strong> Nom, adresse email, contenu du message via formulaire de contact ou partenariat.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Données éditoriales :</strong> Pour les administrateurs : articles créés, modifications apportées, historique éditorial.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.4 Données transmises à des tiers</h3>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Service de géocodage Geoapify :</strong> Adresses et coordonnées géographiques pour les fonctionnalités de recherche et cartographie.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">OpenStreetMap :</strong> Requêtes de tuiles cartographiques incluant votre adresse IP et zone géographique consultée.</li>
        </ul>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 3 : Finalités et bases légales du traitement</h2>

        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">3.1 Finalités du traitement</h3>
        <ul class="list-disc list-outside pl-5 space-y-2 mt-4">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Fourniture des services :</strong> Fonctionnement de la carte interactive, affichage des POI, système de navigation, recherche géographique.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Gestion des comptes :</strong> Création, authentification, gestion des sessions utilisateurs, vérification des emails, réinitialisation des mots de passe.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Modération et sécurité :</strong> Prévention des abus, spam et activités malveillantes, modération des commentaires, protection contre les accès non autorisés.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Communication :</strong> Réponse aux demandes de contact, notifications de sécurité, informations sur les services.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Amélioration du service :</strong> Analyse d'utilisation anonymisée, détection et correction des erreurs, optimisation des performances.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Obligations légales :</strong> Conservation des logs pour sécurité, réponse aux demandes des autorités compétentes.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">3.2 Bases légales</h3>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Consentement :</strong> Géolocalisation précise, cookies non essentiels, newsletter.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Exécution contractuelle :</strong> Fourniture des services demandés, gestion du compte utilisateur.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Intérêt légitime :</strong> Sécurité du site, prévention des abus, amélioration des services, analyse statistique.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Obligation légale :</strong> Conservation des logs, coopération avec les autorités.</li>
        </ul>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 4 : Durée de conservation</h2>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Données de navigation :</strong> 13 mois maximum (conformément aux recommandations CNIL).</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Comptes utilisateurs actifs :</strong> Durée de vie du compte + 3 ans après dernière connexion.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Logs de sécurité :</strong> 1 an à partir de la date de génération.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Messages de contact :</strong> 3 ans à partir de la réponse ou de l'abandon du traitement.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Commentaires :</strong> Durée de publication de l'article associé ou suppression volontaire.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Tokens temporaires :</strong> 24 heures maximum (réinitialisation mot de passe, vérification email).</li>
        </ul>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 5 : Partage des données avec des tiers</h2>
        <p class="mb-4">Vos données peuvent être transmises aux tiers suivants dans les cas strictement nécessaires :</p>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Hostinger International Ltd. :</strong> Notre hébergeur basé en UE, pour le stockage et la sécurité des données.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Geoapify :</strong> Service de géocodage européen pour les fonctionnalités de recherche d'adresses.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">OpenStreetMap Foundation :</strong> Pour le chargement des tuiles cartographiques (données anonymisées).</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Autorités compétentes :</strong> Sur demande légale dans le cadre d'enquêtes judiciaires ou administratives.</li>
        </ul>
        <p class="mt-4">Aucune donnée n'est vendue, louée ou cédée à des fins commerciales.</p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 6 : Vos droits sur vos données</h2>
        <p class="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Droit d'accès :</strong> Obtenir une copie de toutes les données vous concernant.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Droit de rectification :</strong> Corriger les données inexactes ou incomplètes.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Droit à l'effacement :</strong> Demander la suppression de vos données (sous conditions légales).</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Droit d'opposition :</strong> Vous opposer au traitement pour motif légitime.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Droit à la limitation :</strong> Demander la suspension temporaire du traitement.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Droit à la portabilité :</strong> Récupérer vos données dans un format structuré.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Droit de retrait du consentement :</strong> Annuler votre consentement à tout moment.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">6.1 Suppression de compte utilisateur</h3>
        <p class="mb-4">
          Vous pouvez supprimer votre compte à tout moment directement depuis votre espace personnel. Cette fonctionnalité vous permet d'exercer votre droit à l'effacement de manière autonome et immédiate.
        </p>

        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Procédure de suppression :</h4>
        <ol class="list-decimal list-outside pl-5 space-y-1 mb-4">
          <li>Connexion à votre compte vérifié</li>
          <li>Accès à la page "Mon compte"</li>
          <li>Clic sur le bouton "Supprimer mon compte"</li>
          <li>Confirmation en saisissant le mot "SUPPRIMER"</li>
          <li>Validation de la suppression définitive</li>
        </ol>

        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Conséquences de la suppression :</h4>
        <ul class="list-disc list-outside pl-5 space-y-1 mb-4">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Données supprimées immédiatement :</strong> Identifiants de connexion, informations de profil, préférences personnelles, tokens d'authentification</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Commentaires :</strong> Conservés mais anonymisés (nom d'utilisateur remplacé par "Utilisateur supprimé")</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Logs de sécurité :</strong> Conservés pour leur durée légale (1 an) avec pseudonymisation</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Action loggée :</strong> La suppression de compte est enregistrée à des fins de sécurité et de traçabilité</li>
        </ul>

        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 italic">
          <strong>Important :</strong> La suppression de compte est définitive et irréversible. Aucune récupération de données ne sera possible après confirmation de l'opération.
        </p>

        <p class="mt-4">
          <strong>Pour exercer ces droits :</strong> Contactez-nous à <a href="mailto:admin@naurellia.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline" @click="handleMailtoClick('admin')">admin@naurellia.com</a> avec une pièce d'identité. Délai de réponse : 1 mois maximum.
        </p>
        <p class="mt-4">
          <strong>Droit de réclamation :</strong> Vous pouvez porter réclamation auprès de la CNIL (www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 7 : Sécurité des données</h2>
        <p class="mb-4">Nous mettons en œuvre les mesures de sécurité suivantes :</p>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Chiffrement :</strong> HTTPS sur l'ensemble du site, chiffrement bcrypt des mots de passe.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Authentification :</strong> Tokens JWT sécurisés, vérification email obligatoire.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Surveillance :</strong> Monitoring des accès, détection des tentatives d'intrusion.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Accès restreint :</strong> Principe du moindre privilège pour les administrateurs.</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Sauvegardes :</strong> Sauvegardes régulières chiffrées chez notre hébergeur UE.</li>
        </ul>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 8 : Cookies et technologies similaires</h2>
        <p class="mb-4">Le site utilise différents types de cookies :</p>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li><strong class="font-semibold text-gray-900 dark:text-white">Cookies essentiels :</strong> Session utilisateur, préférences de thème, sécurité (pas de consentement requis).</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Cookies d'analyse :</strong> Mesure d'audience anonymisée, performance du site (consentement requis).</li>
          <li><strong class="font-semibold text-gray-900 dark:text-white">Stockage local :</strong> Sauvegarde des préférences utilisateur, cache des données cartographiques.</li>
        </ul>
        <p class="mt-4">
          Vous pouvez gérer vos préférences cookies via le bandeau de consentement ou les paramètres de votre navigateur. Le refus de certains cookies peut limiter les fonctionnalités du site.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 9 : Transferts internationaux</h2>
        <p>
          Les données sont principalement traitées au sein de l'Union Européenne. Les rares transferts hors UE (OpenStreetMap Foundation basée au Royaume-Uni) sont encadrés par des garanties appropriées conformes au RGPD.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 mt-12">Article 10 : Modifications de la politique</h2>
        <p>
          Cette politique peut être modifiée pour refléter les évolutions légales ou fonctionnelles du site. Toute modification substantielle sera communiquée par email aux utilisateurs enregistrés et par bannière sur le site. La date de dernière mise à jour est indiquée en haut de ce document.
        </p>
      </div>
    </div>
  </div>
</template>
