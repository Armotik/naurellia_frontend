<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <footer class="bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">

        <!-- Section Logo & Marque -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center">
            <img src="@/assets/img/logo.webp" alt="Logo Naurellia" class="w-25 rounded-full" />
            <span class="text-xl font-bold text-gray-800">Naurellia</span>
          </div>
          <p class="mt-4 text-sm text-gray-500">
            Promouvoir un tourisme durable et respectueux sur l'Île de Ré.
          </p>
        </div>

        <!-- Section Navigation -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Navigation</h3>
          <ul class="mt-4 space-y-2">
            <li><RouterLink to="/blog" class="text-base text-gray-500 hover:text-green-700">Blog</RouterLink></li>
            <li><RouterLink to="/map" class="text-base text-gray-500 hover:text-green-700">Carte Interactive</RouterLink></li>
            <li><RouterLink to="/contact" class="text-base text-gray-500 hover:text-green-700">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Section Légal -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Légal</h3>
          <ul class="mt-4 space-y-2">
            <li><RouterLink to="/mentions-legales" class="text-base text-gray-500 hover:text-green-700">Mentions Légales</RouterLink></li>
            <li><RouterLink to="/politique-de-confidentialite" class="text-base text-gray-500 hover:text-green-700">Politique de Confidentialité</RouterLink></li>
            <li><RouterLink to="/conditions-generales" class="text-base text-gray-500 hover:text-green-700">Conditions Générales</RouterLink></li>
          </ul>
        </div>

        <!-- Section Partenaires -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Nous soutenir</h3>
          <ul class="mt-4 space-y-2">
            <li><RouterLink to="/partenaires" class="text-base text-gray-500 hover:text-green-700">Nos Partenaire</RouterLink></li>
            <li><RouterLink to="/devenir-partenaire" class="text-base text-gray-500 hover:text-green-700">Devenir Partenaire</RouterLink></li>
            <li><RouterLink to="/dons" class="text-base text-gray-500 hover:text-green-700">Faire un don</RouterLink></li>
          </ul>
        </div>

      </div>

      <!-- Section Copyright et Réseaux Sociaux -->
      <div class="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between">
        <p class="text-base text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">
          &copy; 2025 Naurellia. Tous droits réservés.
        </p>
        <div class="flex space-x-6 order-1 sm:order-2">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Instagram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-2.34a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
