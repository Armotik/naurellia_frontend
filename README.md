# Naurellia

## 🌿 Mission et Vue d'ensemble

**Naurellia** est une plateforme web dédiée à la promotion d'un tourisme respectueux et durable sur l'Île de Ré. Notre mission est d'offrir aux visiteurs et aux résidents toutes les informations nécessaires pour explorer l'île de manière éclairée, en favorisant les pratiques éco-responsables et le respect du patrimoine local. Nous nous adressons à un public varié, des touristes soucieux de leur impact environnemental aux habitants désireux de redécouvrir leur territoire sous un angle durable.

## ✨ Fonctionnalités Clés

Au cœur de Naurellia se trouve une **carte interactive** intuitive, conçue pour guider les utilisateurs à travers les richesses de l'Île de Ré.

* **Points d'Intérêt (POI) Détaillés :** Chaque POI (plages, marchés, services de santé, transports, etc.) est accompagné d'une description claire et concise, intégrant des informations pratiques (horaires, accessibilité) et des **Conseils Naurellia** spécifiques pour encourager les bonnes pratiques environnementales, la sécurité et le respect des lieux.
* **Navigation Intelligente :** La carte permet aux utilisateurs de visualiser facilement les emplacements clés de l'île.

Pour l'instant, le site se concentre sur l'expérience de la carte interactive.

## 💻 Technologies Utilisées

Naurellia est une application construite avec des technologies modernes et performantes pour offrir une expérience utilisateur fluide et réactive.

### Frontend

Le frontend est développé avec :

* **Vue.js 3.5:** Un framework JavaScript progressif pour la construction d'interfaces utilisateur interactives.
* **Pinia:** Un gestionnaire d'état intuitif et léger pour Vue.js.
* **Vue Router:** Le routeur officiel pour Vue.js, permettant une navigation SPA (Single Page Application).
* **Vuetify 3.8.10:** Un framework de composants UI pour Vue.js, offrant un design Material Design.
* **Tailwind CSS:** Un framework CSS utilitaire pour un stylisme rapide et personnalisé.
    * `@tailwindcss/cli` et `@tailwindcss/vite` pour l'intégration et la compilation.
* **Leaflet avec Vue-Leaflet:** Une bibliothèque JavaScript open-source pour des cartes interactives et son wrapper Vue.js. Les données cartographiques proviennent d'**OpenStreetMap**.
* **Tiptap avec @tiptap/vue-3:** Un éditeur de texte riche extensible pour Vue.js.
* **Vue-Codemirror avec @codemirror/lang-html et @codemirror/view:** Pour l'intégration d'un éditeur de code.
* **Axios:** Client HTTP pour effectuer des requêtes API.
* **jwt-decode:** Pour le décodage des jetons JWT.
* **Vite 6.2.4:** Un outil de build rapide pour le développement frontend.
    * `@vitejs/plugin-vue` et `vite-plugin-vue-devtools` pour l'intégration Vue et les outils de développement.
    * `vite-plugin-compression` pour l'optimisation des assets.

### Backend

Le backend est architecturé autour de :

* **Symfony 7.3:** Un framework PHP robuste et flexible.
    * Nécessite **PHP >= 8.2**.
* **API Platform :** Utilisé pour la création d'APIs REST et GraphQL.
    * `api-platform/doctrine-orm` et `api-platform/symfony` pour l'intégration avec Doctrine ORM et Symfony.
* **Doctrine ORM:** Pour la persistance des données.
    * `doctrine/dbal`, `doctrine/doctrine-bundle`, `doctrine/doctrine-migrations-bundle` pour la gestion de la base de données et des migrations.
* **Base de données :** PostgreSQL.
* **Sécurité et Authentification :**
    * `lexik/jwt-authentication-bundle` pour l'authentification JWT.
    * `nelmio/cors-bundle` pour la gestion des requêtes Cross-Origin.
    * `nelmio/security-bundle` pour des mesures de sécurité supplémentaires.
    * `symfony/security-bundle`.
    * `symfonycasts/reset-password-bundle` et `symfonycasts/verify-email-bundle` pour la gestion des mots de passe et la vérification des emails.
* **Administration :** `easycorp/easyadmin-bundle` pour un back-office simple et efficace.
* **Autres Composants Symfony :** `symfony/asset`, `symfony/asset-mapper`, `symfony/console`, `symfony/dotenv`, `symfony/mailer`, `symfony/messenger`, `symfony/serializer`, `symfony/validator`, `symfony/yaml`, etc., assurant diverses fonctionnalités du framework.

### Optimisation et Linting

* **Oxlint:** Pour le linting rapide et la correction des erreurs de code.
* **ESLint:** Analyse statique du code JavaScript pour identifier les problèmes de programmation.
* **Prettier:** Formatteur de code pour assurer une cohérence stylistique.
* **Sharp:** Bibliothèque Node.js pour l'optimisation des images.

## 🚀 Démarrage Rapide (Développement)

Pour lancer le projet en environnement de développement :

### Prérequis

Assurez-vous d'avoir installé :

* Node.js (version LTS recommandée) et npm (ou Yarn)
* PHP >= 8.2
* Composer
* Une instance PostgreSQL fonctionnelle

### Installation du Backend (Symfony)

1.  **Installez les dépendances Composer :**
    ```bash
    composer install
    ```
2.  **Configurez votre base de données :**
    Mettez à jour votre fichier `.env` avec les informations de connexion à votre base de données PostgreSQL.
3.  **Créez et migrez la base de données :**
    ```bash
    php bin/console doctrine:database:create
    php bin/console doctrine:migrations:migrate
    ```
4.  **Lancez le serveur Symfony :**
    ```bash
    symfony server:start
    ```

### Installation du Frontend (Vue.js)

1.  **Naviguez dans le dossier du frontend :**
    ```bash
    cd naurellia-frontend
    ```
2.  **Installez les dépendances npm :**
    ```bash
    npm install
    ```
3.  **Lancez le serveur de développement Vite :**
    ```bash
    npm run dev
    ```

Le site sera accessible à l'adresse indiquée par Vite (généralement `http://localhost:5173`).

### Scripts Utiles

* **Linting et Correction :**
    ```bash
    npm run lint # Lance oxlint et eslint
    npm run format # Formatte le code avec Prettier
    ```
* **Optimisation des Images :**
    ```bash
    npm run optimize-images # Optimise les images du frontend
    ```
* **Build de Production avec Optimisation :**
    ```bash
    npm run build:eco # Lance l'optimisation des images puis le build de production
    ```

## 📦 Déploiement

Le site Naurellia est hébergé sur un **serveur VPS via Hostinger**. Les détails de déploiement spécifiques à l'environnement de production ne sont pas partagés dans ce `README.md`.

## 🤝 Contribution

Actuellement, ce projet n'est pas ouvert aux contributions externes via des pull requests. Cependant, nous sommes toujours ouverts aux retours et suggestions.

## 📄 Licence

Ce projet est sous licence **propriétaire**.

## 📧 Contact

Pour toute question ou information, veuillez contacter l'équipe Naurellia.

---
*Ce README est généré automatiquement et reflète l'état du projet et les technologies utilisées.*