<script setup>
import { onMounted } from 'vue';
import { useLogger } from '@/composables/useLogger';

const { logAction } = useLogger();

onMounted(() => {
  document.title = 'Naurellia | Conditions générales d\'utilisation';
});

// Fonction pour logger les clics sur les liens du sommaire
function handleSummaryClick(sectionId, sectionName) {
  logAction('terms_and_conditions', 'summary_link_click', {
    sectionId: sectionId,
    sectionName: sectionName,
    timestamp: Date.now()
  });
}

// Fonction pour logger les clics sur les liens mailto
function handleMailtoClick(emailType) {
  logAction('terms_and_conditions', 'mailto_click', {
    emailType: emailType, // 'admin'
    timestamp: Date.now()
  });
}

// Fonction pour logger les clics vers la politique de confidentialité
function handlePrivacyPolicyClick() {
  logAction('terms_and_conditions', 'privacy_policy_link_click', {
    timestamp: Date.now()
  });
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16">
        <h2 class="text-base font-semibold text-green-700 dark:text-green-500 tracking-wide uppercase">Cadre d'Utilisation</h2>
        <p class="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Conditions Générales d'Utilisation
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
          Dernière mise à jour : 21 juillet 2025
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-md text-base leading-7 text-gray-700 dark:text-gray-300">
        <!-- Sommaire -->
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white dark:border-gray-700 border-b border-gray-200 pb-3 mb-6">Sommaire</h2>
        <nav class="mb-12">
          <ul class="space-y-2">
            <li><a href="#I" @click="handleSummaryClick('I', 'Définitions et objet')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">1. Définitions et objet</a></li>
            <li><a href="#II" @click="handleSummaryClick('II', 'Acceptation des CGU')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">2. Acceptation des CGU</a></li>
            <li><a href="#III" @click="handleSummaryClick('III', 'Description des services Naurellia')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">3. Description des services Naurellia</a></li>
            <li><a href="#IV" @click="handleSummaryClick('IV', 'Conditions d\'accès et inscription')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">4. Conditions d'accès et inscription</a></li>
            <li><a href="#V" @click="handleSummaryClick('V', 'Utilisation de la carte interactive')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">5. Utilisation de la carte interactive</a></li>
            <li><a href="#VI" @click="handleSummaryClick('VI', 'Commentaires et contributions')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">6. Commentaires et contributions</a></li>
            <li><a href="#VII" @click="handleSummaryClick('VII', 'Obligations et interdictions')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">7. Obligations et interdictions</a></li>
            <li><a href="#VIII" @click="handleSummaryClick('VIII', 'Propriété intellectuelle')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">8. Propriété intellectuelle</a></li>
            <li><a href="#IX" @click="handleSummaryClick('IX', 'Protection des données personnelles')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">9. Protection des données personnelles</a></li>
            <li><a href="#X" @click="handleSummaryClick('X', 'Responsabilité et garanties')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">10. Responsabilité et garanties</a></li>
            <li><a href="#XI" @click="handleSummaryClick('XI', 'Suspension et résiliation')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">11. Suspension et résiliation</a></li>
            <li><a href="#XII" @click="handleSummaryClick('XII', 'Droit applicable et juridiction')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">12. Droit applicable et juridiction</a></li>
          </ul>
        </nav>

        <!-- Définitions et objet -->
        <section id="I" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">1. Définitions et objet</h2>
          <div class="space-y-4">
            <p><strong class="font-semibold text-gray-900 dark:text-white">Définitions :</strong></p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong class="font-semibold text-gray-900 dark:text-white">Site :</strong> Le site web Naurellia accessible à l'adresse https://naurellia.com</li>
              <li><strong class="font-semibold text-gray-900 dark:text-white">Services :</strong> L'ensemble des fonctionnalités proposées par Naurellia (carte interactive, blog, POI, commentaires, compte utilisateur)</li>
              <li><strong class="font-semibold text-gray-900 dark:text-white">Utilisateur :</strong> Toute personne physique ou morale utilisant le Site</li>
              <li><strong class="font-semibold text-gray-900 dark:text-white">Compte :</strong> Espace personnel créé par l'Utilisateur après inscription</li>
              <li><strong class="font-semibold text-gray-900 dark:text-white">POI :</strong> Points d'Intérêt géographiques référencés sur la carte interactive</li>
              <li><strong class="font-semibold text-gray-900 dark:text-white">Contenu Utilisateur :</strong> Tout contenu créé par l'Utilisateur (commentaires, messages de contact)</li>
            </ul>
            <p class="mt-4">
              Les présentes conditions générales d'utilisation ont pour objet de définir les modalités et conditions d'utilisation du Site et des Services proposés par Naurellia, plateforme dédiée au tourisme durable sur l'Île de Ré.
            </p>
          </div>
        </section>

        <!-- Acceptation des CGU -->
        <section id="II" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">2. Acceptation des CGU</h2>
          <div class="space-y-4">
            <p>
              L'accès et l'utilisation du Site impliquent l'acceptation pleine et entière des présentes CGU par l'Utilisateur. Cette acceptation vaut conclusion d'un contrat entre l'Utilisateur et Naurellia.
            </p>
            <p>
              Pour les services nécessitant une inscription (commentaires, compte utilisateur), l'acceptation est matérialisée par la validation du formulaire d'inscription et la case à cocher "J'accepte les conditions générales d'utilisation".
            </p>
            <p>
              Si l'Utilisateur n'accepte pas les présentes CGU, il doit s'abstenir d'utiliser le Site et ses Services.
            </p>
          </div>
        </section>

        <!-- Description des services -->
        <section id="III" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">3. Description des services Naurellia</h2>
          <div class="space-y-4">
            <p>
              Naurellia propose les services suivants, accessibles gratuitement :
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">3.1 Carte interactive</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Visualisation interactive des POI de l'Île de Ré</li>
              <li>Fonctionnalités de navigation et zoom</li>
              <li>Recherche géographique et filtrage par catégories</li>
              <li>Géolocalisation utilisateur (avec consentement)</li>
              <li>Informations détaillées sur chaque POI</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">3.2 Contenu éditorial</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Articles de blog sur le tourisme durable</li>
              <li>Conseils pratiques et informations locales</li>
              <li>Actualités liées à l'Île de Ré</li>
              <li>Base de données de POI avec descriptions détaillées</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">3.3 Services utilisateur</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Création de compte sécurisé</li>
              <li>Système de commentaires modérés</li>
              <li>Formulaires de contact et partenariat</li>
              <li>Préférences personnalisables (thème, langue)</li>
            </ul>

            <p class="mt-4">
              <strong class="font-semibold text-gray-900 dark:text-white">Nature du service :</strong> Naurellia est un service d'information touristique à caractère non commercial. Les informations sont fournies à titre indicatif et peuvent évoluer sans préavis.
            </p>
          </div>
        </section>

        <!-- Conditions d'accès et inscription -->
        <section id="IV" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">4. Conditions d'accès et inscription</h2>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.1 Accès libre</h3>
            <p>
              La consultation du Site et de la carte interactive est libre et ne nécessite pas d'inscription.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.2 Inscription obligatoire</h3>
            <p>
              L'inscription est obligatoire pour :
            </p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>Publier des commentaires</li>
              <li>Accéder à des fonctionnalités personnalisées</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.3 Conditions d'inscription</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Être âgé de 13 ans minimum (avec accord parental pour les mineurs)</li>
              <li>Fournir des informations exactes et à jour</li>
              <li>Disposer d'une adresse email valide</li>
              <li>Choisir un mot de passe sécurisé</li>
              <li>Accepter la vérification par email</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.4 Responsabilité du compte</h3>
            <p>
              L'Utilisateur est seul responsable de la confidentialité de ses identifiants et de toutes les activités effectuées sous son compte. En cas d'utilisation non autorisée, il doit immédiatement contacter Naurellia.
            </p>
          </div>
        </section>

        <!-- Utilisation de la carte interactive -->
        <section id="V" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">5. Utilisation de la carte interactive</h2>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.1 Fonctionnalités autorisées</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Consultation des POI et de leurs informations</li>
              <li>Navigation et recherche géographique</li>
              <li>Utilisation de la géolocalisation (avec consentement)</li>
              <li>Partage de liens vers des POI spécifiques</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">5.2 Limitations techniques</h3>
            <p>
              La précision de la géolocalisation et des données cartographiques dépend des services tiers utilisés (OpenStreetMap, Geoapify). Naurellia recommande de vérifier les informations avant tout déplacement et d'utiliser des outils de navigation officiels.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">5.3 Utilisation interdite</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Extraction automatisée ou massive des données</li>
              <li>Utilisation commerciale sans autorisation</li>
              <li>Tentative de contournement des mesures de sécurité</li>
              <li>Surcharge intentionnelle des serveurs</li>
            </ul>
          </div>
        </section>

        <!-- Commentaires et contributions -->
        <section id="VI" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">6. Commentaires et contributions</h2>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.1 Règles de publication</h3>
            <p>Les commentaires doivent respecter les principes suivants :</p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>Être en rapport avec le sujet traité</li>
              <li>Respecter la courtoisie et la bienveillance</li>
              <li>Promouvoir les valeurs du tourisme responsable</li>
              <li>Ne pas contenir de contenu commercial non autorisé</li>
              <li>Respecter les droits de propriété intellectuelle</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">6.2 Contenu interdit</h3>
            <p>Sont strictement interdits les contenus :</p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>Diffamatoires, injurieux, haineux ou discriminatoires</li>
              <li>À caractère pornographique ou violent</li>
              <li>Portant atteinte à la vie privée ou à l'image de tiers</li>
              <li>Faisant l'apologie de comportements illégaux</li>
              <li>Contenant des virus ou codes malveillants</li>
              <li>Constituant du spam ou de la publicité non autorisée</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">6.3 Modération</h3>
            <p>
              Tous les commentaires sont soumis à modération avant publication. Naurellia se réserve le droit de refuser, modifier ou supprimer tout contenu ne respectant pas les présentes règles, sans préavis ni justification.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">6.4 Licence d'utilisation</h3>
            <p>
              En publiant un commentaire, l'Utilisateur accorde à Naurellia une licence gratuite, non exclusive et permanente d'utilisation, reproduction et diffusion du contenu dans le cadre du fonctionnement du Site.
            </p>
          </div>
        </section>

        <!-- Obligations et interdictions -->
        <section id="VII" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">7. Obligations et interdictions</h2>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">7.1 Obligations de l'Utilisateur</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Utiliser le Site conformément à sa destination</li>
              <li>Respecter les droits de propriété intellectuelle</li>
              <li>Ne pas porter atteinte au fonctionnement du Site</li>
              <li>Signaler tout contenu inapproprié ou dysfonctionnement</li>
              <li>Maintenir la confidentialité de ses identifiants</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.2 Comportements interdits</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Tentatives d'intrusion ou de piratage</li>
              <li>Utilisation de robots, scripts ou outils automatisés</li>
              <li>Création de faux comptes ou usurpation d'identité</li>
              <li>Perturbation volontaire du service</li>
              <li>Collecte non autorisée de données personnelles</li>
              <li>Contournement des mesures de sécurité</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.3 Sanctions</h3>
            <p>
              En cas de non-respect des présentes CGU, Naurellia peut, sans préavis :
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>Supprimer le contenu litigieux</li>
              <li>Suspendre temporairement ou définitivement le compte</li>
              <li>Bloquer l'accès au Site</li>
              <li>Engager des poursuites judiciaires si nécessaire</li>
            </ul>
          </div>
        </section>

        <!-- Propriété intellectuelle -->
        <section id="VIII" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">8. Propriété intellectuelle</h2>
          <div class="space-y-4">
            <p>
              Le Site, son interface, ses fonctionnalités, sa base de données de POI, ses textes, images et éléments graphiques sont protégés par le droit de la propriété intellectuelle et appartiennent à Naurellia ou à ses partenaires.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">8.1 Éléments propriétaires</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Interface utilisateur et design du Site</li>
              <li>Base de données des POI et leurs descriptions</li>
              <li>Articles de blog et contenus éditoriaux</li>
              <li>Logo et éléments graphiques Naurellia</li>
              <li>Code source et architecture technique</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">8.2 Éléments tiers</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Données cartographiques OpenStreetMap (licence ODbL)</li>
              <li>Services de géocodage Geoapify</li>
              <li>Bibliothèques et frameworks open source</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">8.3 Utilisation autorisée</h3>
            <p>
              L'Utilisateur peut consulter et utiliser le Site dans le cadre d'un usage personnel et non commercial. Toute autre utilisation nécessite l'autorisation écrite préalable de Naurellia.
            </p>
          </div>
        </section>

        <!-- Protection des données -->
        <section id="IX" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">9. Protection des données personnelles</h2>
          <div class="space-y-4">
            <p>
              La collecte et le traitement des données personnelles sont effectués dans le respect du RGPD et de la loi Informatique et Libertés.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">9.1 Données collectées</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Données d'inscription (email, nom d'utilisateur)</li>
              <li>Données de navigation et d'utilisation</li>
              <li>Données de géolocalisation (avec consentement)</li>
              <li>Logs de sécurité et d'activité</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">9.2 Vos droits</h3>
            <p>
              Vous disposez des droits d'accès, rectification, suppression, opposition, limitation et portabilité sur vos données personnelles.
            </p>

            <p class="mt-4">
              Pour plus d'informations et exercer vos droits, consultez notre <a href="/privacy-policy" @click="handlePrivacyPolicyClick" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">Politique de confidentialité</a> ou contactez-nous à <a href="mailto:admin@naurellia.com" @click="handleMailtoClick('admin')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">admin@naurellia.com</a>.
            </p>
          </div>
        </section>

        <!-- Responsabilité et garanties -->
        <section id="X" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">10. Responsabilité et garanties</h2>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">10.1 Limitation de responsabilité</h3>
            <p>
              Naurellia s'efforce de fournir des informations précises mais ne garantit pas :
            </p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>L'exactitude complète des informations sur les POI</li>
              <li>La disponibilité permanente du Site</li>
              <li>L'absence d'erreurs ou d'interruptions</li>
              <li>La précision absolue de la géolocalisation</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">10.2 Exclusions de responsabilité</h3>
            <p>
              Naurellia ne peut être tenu responsable :
            </p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>Des dommages résultant d'une utilisation inappropriée du Site</li>
              <li>Des erreurs de navigation dues à des informations inexactes</li>
              <li>Des dysfonctionnements liés aux services tiers</li>
              <li>Des contenus publiés par les utilisateurs</li>
              <li>Des interruptions dues à la maintenance ou aux pannes</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">10.3 Recommandations</h3>
            <p>
              Il est recommandé aux utilisateurs de :
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>Vérifier les informations pratiques avant déplacement</li>
              <li>Utiliser des outils de navigation officiels</li>
              <li>Sauvegarder leurs données importantes</li>
              <li>Maintenir leurs logiciels à jour</li>
            </ul>
          </div>
        </section>

        <!-- Suspension et résiliation -->
        <section id="XI" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">11. Suspension et résiliation</h2>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">11.1 Suspension par Naurellia</h3>
            <p>
              Naurellia peut suspendre l'accès au Site ou à un compte utilisateur en cas de :
            </p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>Violation des présentes CGU</li>
              <li>Activité suspecte ou malveillante</li>
              <li>Maintenance technique nécessaire</li>
              <li>Injonction d'une autorité compétente</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">11.2 Résiliation par l'Utilisateur</h3>
            <p>
              L'Utilisateur peut supprimer son compte à tout moment directement depuis son espace personnel via la fonctionnalité de suppression de compte. Cette action lui permet d'exercer son droit à l'effacement de manière autonome.
            </p>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Procédure de suppression autonome :</h4>
            <ol class="list-decimal list-outside pl-5 space-y-1 mb-4">
              <li>Vérification préalable du compte par email</li>
              <li>Connexion à l'espace personnel</li>
              <li>Accès à la section "Mon compte"</li>
              <li>Activation du bouton "Supprimer mon compte"</li>
              <li>Confirmation obligatoire en saisissant le mot "SUPPRIMER"</li>
              <li>Validation définitive de l'opération</li>
            </ol>

            <p class="text-sm text-gray-600 dark:text-gray-400 italic">
              Cette procédure garantit une suppression sécurisée et évite toute suppression accidentelle grâce au mécanisme de double confirmation.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">11.3 Effets de la résiliation</h3>
            <p>
              La résiliation entraîne :
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>La perte d'accès aux services nécessitant une inscription</li>
              <li>La suppression des données personnelles (sauf obligations légales)</li>
              <li>Le maintien des commentaires publiés (anonymisés)</li>
            </ul>
          </div>
        </section>

        <!-- Droit applicable -->
        <section id="XII">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">12. Droit applicable et juridiction</h2>
          <div class="space-y-4">
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux du ressort de La Rochelle.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.1 Résolution amiable</h3>
            <p>
              En cas de litige, les parties s'efforceront de trouver une solution amiable. L'Utilisateur peut contacter Naurellia à <a href="mailto:admin@naurellia.com" @click="handleMailtoClick('admin')" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">admin@naurellia.com</a> pour exposer sa réclamation.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.2 Modifications des CGU</h3>
            <p>
              Naurellia se réserve le droit de modifier les présentes CGU à tout moment. Les modifications sont communiquées par publication sur le Site et, pour les utilisateurs inscrits, par notification email. L'utilisation continue du Site après modification vaut acceptation des nouvelles CGU.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.3 Dispositions générales</h3>
            <p>
              Si une disposition des présentes CGU était déclarée nulle ou inapplicable, les autres dispositions demeureraient pleinement en vigueur. Les présentes CGU constituent l'intégralité de l'accord entre Naurellia et l'Utilisateur concernant l'utilisation du Site.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
