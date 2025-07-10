<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <aside class="w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col border-r dark:border-gray-700">
      <div class="p-4 text-2xl font-bold border-b border-gray-700 dark:border-gray-600">Naurellia Admin</div>
      <nav class="flex-grow p-4 space-y-2">
        <RouterLink to="/admin/accueil" class="block px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">Accueil</RouterLink>
        <a href="https://api.naurellia.com/admin" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">Panel API</a>
        <RouterLink to="/admin/logs" class="block px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">Logs Détaillés</RouterLink>
        <RouterLink to="/admin/suivi-sessions" class="block px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">Traqueur de Session</RouterLink>
        <RouterLink to="/admin/historique-ip" class="block px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">Traqueur d'IP</RouterLink>
        <RouterLink to="/admin/utilisateurs" class="block px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">Gestion des Utilisateurs</RouterLink>
      </nav>
    </aside>

    <main class="flex-grow p-8 overflow-y-auto dark:bg-gray-900">
      <RouterView />
    </main>
  </div>
</template>
