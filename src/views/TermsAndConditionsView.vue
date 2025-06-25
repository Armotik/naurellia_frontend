<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'Naurellia | Conditions générales d\'utilisation';
});
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16">
        <h2 class="text-base font-semibold text-green-700 dark:text-green-500 tracking-wide uppercase">Cadre d'Utilisation</h2>
        <p class="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Conditions Générales
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
          Dernière mise à jour : 22 juin 2025
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-md text-base leading-7 text-gray-700">
        <!-- Sommaire -->
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white dark:border-gray-700 border-b border-gray-200 pb-3 mb-6">Sommaire</h2>
        <nav class="mb-12">
          <ul class="space-y-2">
            <li><a href="#I" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">1. Introduction</a></li>
            <li><a href="#II" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">2. Acceptation des CGU</a></li>
            <li><a href="#III" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">3. Présentation du site</a></li>
            <li><a href="#IV" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">4. Description des Services</a></li>
            <li><a href="#V" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">5. Limitations contractuelles sur les données techniques</a></li>
            <li><a href="#VI" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">6. Propriété intellectuelle et contrefaçons</a></li>
            <li><a href="#VII" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">7. Limitations de responsabilité</a></li>
            <li><a href="#VIII" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">8. Gestion des données personnelles</a></li>
            <li><a href="#IX" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">9. Liens hypertextes et cookies</a></li>
            <li><a href="#X" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">10. Droit applicable et attribution de juridiction</a></li>
            <li><a href="#XI" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">11. Lexique</a></li>
          </ul>
        </nav>

        <!-- Introduction -->
        <section id="I" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">1. Introduction</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Les présentes conditions générales d'utilisation (ci-après les "CGU") ont pour
            objet de définir les modalités et conditions d'utilisation du site web <a
            href="https://naurellia.com" class="text-green-700 hover:text-green-800 underline">naurellia.com</a>
            (ci-après le "Site") et
            des services proposés par Naurellia (ci-après les "Services").
          </p>
        </section>

        <!-- Acceptation des CGU -->
        <section id="II" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">2. Acceptation des CGU</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            L'accès et l'utilisation du Site et des Services impliquent l'acceptation pleine et entière des CGU par
            l'Utilisateur. En cas de non-respect des CGU, Naurellia se réserve le droit de suspendre ou de
            résilier l'accès aux Services.
          </p>
        </section>

        <!-- Présentation du site -->
        <section id="III" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">3. Présentation du site</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Le Site a pour objet de présenter les activités de Naurellia et de proposer des articles, des
            actualités, des événements et des services à destination des Utilisateurs. Il permet également
            de consulter des informations pratiques, de contacter Naurellia et de poster des commentaires
          </p>
          <p class="mb-6 text-gray-600 dark:text-gray-300">
            En accord avec l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie
            numérique, les informations concernant l'identité de l'éditeur du Site et de l'hébergeur sont
            indiquées ci-dessous :
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 class="font-semibold text-lg mb-2 dark:text-white">Propriétaire</h3>
              <p class="text-gray-600 dark:text-gray-300">
                <strong>Anthony MUDET</strong><br>
                3 chemin des Genêts<br>
                17740 Sainte-Marie-De-Ré, France
              </p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 class="font-semibold text-lg mb-2 dark:text-white">Hébergeur</h3>
              <p class="text-gray-600 dark:text-gray-300">
                <strong>
                  <a href="https://www.hostinger.com/" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">
                    Hostinger International Ltd.
                  </a>
                </strong><br>
                61 Lordou Vironos str.<br>
                6023 Larnaca, Chypre
              </p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 class="font-semibold text-lg mb-2 dark:text-white">Webmaster</h3>
              <p class="text-gray-600 dark:text-gray-300">
                <strong>Anthony MUDET</strong><br>
                <a href="mailto:admin@naurellia.com" class="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline">admin@naurellia.com</a>
              </p>
            </div>
          </div>
        </section>

        <!-- Description des Services -->
        <section id="IV" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">4. Description des Services</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Le Site a pour objet de fournir des informations sur les activités de Naurellia. A ce titre,
            Naurellia s'efforce de fournir des informations aussi précises que possible sur le Site. Toutefois, Naurellia
            ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour,
            qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Tous les informations indiquées sur le Site sont données à titre indicatif, et sont susceptibles
            d'évoluer. Par ailleurs, les renseignements figurant sur le Site ne sont pas exhaustifs. Ils sont
            donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Les Services proposés par Naurellia comprennent notamment :
          </p>
          <ul class="list-disc pl-6 space-y-2 mb-4 text-gray-600 dark:text-gray-300">
            <li>La publication d'articles et d'actualités sur le Site ;</li>
            <li>L'organisation d'événements et de concours ;</li>
            <li>La mise en relation des Utilisateurs ;</li>
            <li>La consultation d'informations pratiques ;</li>
            <li>La possibilité de contacter Naurellia.</li>
          </ul>
        </section>

        <!-- Limitations contractuelles -->
        <section id="V" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">5. Limitations contractuelles sur les données techniques</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Le Site utilise la technologie Vue.js, un framework JavaScript open-source, pour son bon
            fonctionnement. Le Site ne pourra être tenu responsable de dommages matériels liés à l'utilisation du Site. De plus,
            l'Utilisateur du Site s'engage à accéder au Site en utilisant un matériel récent, ne contenant pas de virus et
            avec un navigateur de dernière génération mis-à-jour.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Le Site est hébergé chez Hostinger International Ltd., dont le siège social est situé au 61
            Lordou Vironos str., 6023 Larnaca, Chypre, qui est un prestataire de services sur le territoire de
            l'Union Européenne et conformément aux dispositions du Règlement Général sur la Protection des Données
            (RGPD : n° 2016-679). L'objectif est de fournir un service qui assure le meilleur taux d'accessibilité.
            L'hébergeur assure la continuité de son service 24 heures sur 24, tous les jours de l'année.
            Toutefois, il se réserve la possibilité d'interrompre le service d'hébergement pour des durées
            les plus courtes possibles, notamment à des fins de maintenance, pour améliorer son infrastructure,
            en cas de panne ou si les services génèrent un trafic jugé anormal.
          </p>
        </section>

        <!-- Propriété intellectuelle -->
        <section id="VI" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">6. Propriété intellectuelle et contrefaçons</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Naurellia est propriétaire des droits de propriété intellectuelle et détient les droits d'usage sur
            tous les éléments accessibles sur le Site, notamment les textes, images, graphismes, logos, vidéos,
            icônes et sons. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
            des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
            écrite préalable de Naurellia.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Toute exploitation non autorisée du Site ou de l'un quelconque des éléments qu'il contient sera
            considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles
            L.335-2 et suivants du Code de Propriété Intellectuelle.
          </p>
        </section>

        <!-- Les sections suivantes conservent le même format... -->
        <section id="VII" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">7. Limitations de responsabilité</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Naurellia ne pourra être tenu responsable des dommages directs et indirects causés au matériel de
            l'Utilisateur, lors de l'accès au Site, et résultant soit de l'utilisation d'un matériel ne
            répondant pas aux spécifications indiquées au point 5, soit de l'apparition d'un bug ou d'une incompatibilité.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Naurellia ne pourra également être tenu responsable des dommages indirects (tels que perte de marché
            ou perte d'opportunité) consécutifs à l'utilisation du Site. Des espaces interactifs (possibilité de
            poser des questions dans l'espace contact) sont à la disposition des Utilisateurs. Naurellia se réserve le
            droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui
            contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à
            la protection des données. Le cas échéant, Naurellia se réserve également la possibilité de mettre en
            cause la responsabilité civile et/ou pénale de l'Utilisateur, notamment en cas de message à caractère
            raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie...).
          </p>
        </section>

        <section id="VIII" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">8. Gestion des données personnelles</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978,
            la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24
            octobre 1995. A l'occasion de l'utilisation du Site, peuvent être recueillies : les actions de l'Utilisateur
            sur le Site, la date et l'heure de l'accès au Site, l'adresse de protocole Internet (IP) de
            l'Utilisateur ainsi que toute les informations publiques fournies par l'adresse IP de l'Utilisateur
            (pays, ville, région, fournisseur internet, ...)
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            En tout état de cause Naurellia ne collecte des informations personnelles relatives à l'Utilisateur
            que pour le besoin de certains services proposés par le Site. L'Utilisateur fournit ces informations en
            toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé
            à l'Utilisateur du Site l'obligation ou non de fournir ces informations.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative
            à l'informatique, aux fichiers et aux libertés, tout Utilisateur dispose d'un droit d'accès, de
            rectification et d'opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée,
            accompagnée d'une copie du titre d'identité avec signature du titulaire de la pièce, en précisant l'adresse à
            laquelle la réponse doit être envoyée.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Aucune information personnelle de l'Utilisateur du Site n'est publiée à l'insu de l'Utilisateur,
            échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat de
            Naurellia et de ses droits permettrait la transmission des dites informations à l'éventuel acquéreur qui
            serait à son tour tenu de la même obligation de conservation et de modification des données vis-à-vis de
            l'Utilisateur du Site.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Le Site n'est pas déclaré à la CNIL car il ne recueille pas d'informations personnelles. Les bases
            de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du
            11 mars 1996 relative à la protection juridique des bases de données.
          </p>
        </section>

        <section id="IX" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">9. Liens hypertextes et cookies</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Le Site contient un certain nombre de liens hypertextes vers d'autres sites. Cependant, Naurellia
            n'a pas la possibilité de vérifier le contenu des sites ainsi visités, et n'assumera en conséquence aucune
            responsabilité de ce fait. La navigation sur le Site est susceptible de provoquer l'installation de cookie(s) sur
            l'ordinateur de l'Utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l'identification de
            l'Utilisateur, mais qui enregistre des informations relatives à la navigation d'un ordinateur sur un site. Les
            données ainsi obtenues visent à faciliter la navigation ultérieure sur le Site, et ont également vocation à
            permettre diverses mesures de fréquentation.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Le refus d'installation d'un cookie peut entraîner l'impossibilité d'accéder à certains services.
            L'Utilisateur peut toutefois configurer son ordinateur de la manière suivante, pour refuser l'installation des
            cookies :
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Sous Internet Explorer : onglet outil (pictogramme en forme de rouage en haut à droite) / options
            internet. Cliquez sur Confidentialité et choisissez Bloquer tous les cookies. Validez sur Ok.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Sous Firefox : en haut de la fenêtre du navigateur, cliquez sur le bouton Firefox, puis aller dans
            l'onglet Options. Cliquer sur l'onglet Vie privée. Paramétrez les Règles de conservation sur : utiliser les
            paramètres personnalisés pour l'historique. Enfin décochez-la pour désactiver les cookies.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Sous Safari : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par un
            rouage). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section
            "Confidentialité", cliquez sur Paramètres de contenu. Dans la section "Cookies", vous pouvez bloquer les cookies.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Sous Chrome : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par trois
            lignes horizontales). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section
            "Confidentialité", cliquez sur préférences. Dans l'onglet "Confidentialité", vous pouvez bloquer les
            cookies.
          </p>
        </section>

        <section id="X" class="mb-12">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">10. Droit applicable et attribution de juridiction</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Tout litige en relation avec l'utilisation du Site est soumis au droit français. Il est fait
            attribution exclusive de juridiction aux tribunaux compétents de La Rochelle.
          </p>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Les principales lois concernées sont : la loi n° 78-17 du 6 janvier 1978, notamment modifiée par la
            loi n° 2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux libertés. La loi n°
            2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
          </p>
        </section>

        <section id="XI">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 pb-3 mb-6">11. Lexique</h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Utilisateur : Internaute se connectant, utilisant le Site susnommé.<br>
            Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit,
            directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la
            loi n° 78-17 du 6 janvier 1978).
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
