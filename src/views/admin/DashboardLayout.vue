<template>
  <div class="flex h-screen bg-gray-100">
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-4 text-2xl font-bold border-b border-gray-700">Naurellia Admin</div>
      <nav class="flex-grow p-4 space-y-2">
        <RouterLink to="/admin/accueil" class="block px-4 py-2 rounded hover:bg-gray-700">Accueil</RouterLink>
        <router-link to="https://api.naurellia.com/admin" class="block px-4 py-2 rounded hover:bg-gray-700" target="_blank">API Admin</router-link>
        <RouterLink to="/admin/logs" class="block px-4 py-2 rounded hover:bg-gray-700">Logs Détaillés</RouterLink>
        <RouterLink to="/admin/suivi-sessions" class="block px-4 py-2 rounded hover:bg-gray-700">Suivi</RouterLink>
        <RouterLink to="/admin/utilisateurs" class="block px-4 py-2 rounded hover:bg-gray-700">Gestion des Utilisateurs</RouterLink>
      </nav>
    </aside>

    <main class="flex-grow p-8 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
