<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="bg-gray-50 py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16">
        <h2 class="text-base font-semibold text-green-700 tracking-wide uppercase">Cadre d'Utilisation</h2>
        <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Conditions Générales
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
          Dernière mise à jour : 19/06/2025
        </p>
      </div>

      <div class="bg-white p-8 sm:p-12 rounded-lg shadow-md text-base leading-7 text-gray-700">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3 mb-6">Article 1 : Objet</h2>
        <p>
          Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition du site Naurellia, ci-après nommé "le Service", et les conditions d'utilisation du Service par l'Utilisateur. Tout accès et/ou utilisation du site https://naurellia.com suppose l'acceptation et le respect de l'ensemble des termes des présentes Conditions.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3 mb-6 mt-12">Article 2 : Accès aux services</h2>
        <p>
          Le Service est accessible gratuitement à tout Utilisateur disposant d'un accès à internet. Tous les coûts afférents à l'accès au Service, que ce soient les frais matériels, logiciels ou d'accès à internet, sont exclusivement à la charge de l'Utilisateur. L'Éditeur met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au Service, mais n'est tenu à aucune obligation d'y parvenir.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3 mb-6 mt-12">Article 3 : Propriété intellectuelle</h2>
        <p>
          Le site Naurellia, notamment son contenu, est protégé par le droit en vigueur en France. Anthony MUDET est le titulaire exclusif de l'intégralité des droits de propriété intellectuelle sur le site et son contenu (textes, photographies, illustrations, images, logos, etc.). Le contenu reproduit sur le Site fait l'objet d'un droit d'auteur et sa reproduction ou sa diffusion, sans autorisation expresse écrite de l'Éditeur, constitue une contrefaçon passible de sanctions pénales.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3 mb-6 mt-12">Article 4 : Obligations de l'Utilisateur</h2>
        <p class="mb-4">
          L'Utilisateur s'engage à respecter l'ensemble des présentes CGU. L'Utilisateur s'interdit notamment :
        </p>
        <ul class="list-disc list-outside pl-5 space-y-2">
          <li>
            De publier des contenus (notamment dans les commentaires) à caractère injurieux, diffamant, xénophobe, raciste, haineux, ou portant atteinte à l'honneur ou la réputation d'autrui.
          </li>
          <li>
            De publier tout contenu qui contreviendrait aux droits d'autrui ou à la législation en vigueur.
          </li>
          <li>
            D'utiliser le Service à des fins commerciales ou publicitaires sans l'autorisation préalable de l'Éditeur.
          </li>
        </ul>
        <p class="mt-4">
          L'Éditeur se réserve le droit de modérer ou de supprimer sans préavis tout contenu publié par un Utilisateur qui ne respecterait pas les présentes conditions.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3 mb-6 mt-12">Article 5 : Données Personnelles</h2>
        <p>
          Le traitement des données personnelles des Utilisateurs du site Naurellia est régi par notre
          <RouterLink to="/politique-de-confidentialite" class="text-green-700 hover:text-green-800 underline">Politique de Confidentialité</RouterLink>,
          conformément au RGPD. En utilisant le Service, vous consentez à la collecte et à l'utilisation de vos données personnelles telles que décrites dans notre Politique de Confidentialité.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3 mb-6 mt-12">Article 6 : Limitation de Responsabilité</h2>
        <p>
          Les informations diffusées sur le site Naurellia proviennent de sources réputées fiables. Toutefois, l'Éditeur ne peut garantir l'exactitude ou la pertinence de ces données. En outre, les informations mises à disposition sur ce site le sont uniquement à titre purement informatif et ne sauraient constituer en aucun cas un conseil ou une recommandation de quelque nature que ce soit. L'Éditeur décline toute responsabilité concernant les éventuels virus qui pourraient infecter l'équipement informatique de l'Utilisateur après utilisation ou accès à ce site.
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3 mb-6 mt-12">Article 7 : Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige non résolu à l'amiable entre l'Utilisateur et l'Éditeur, les tribunaux de La Rochelle, 17000 FRANCE seront seuls compétents pour en connaître.
        </p>

      </div>
    </div>
  </div>
</template>
