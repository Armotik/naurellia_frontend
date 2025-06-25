import { ref, onMounted } from 'vue';

export function useBatteryStatus() {
  const isBatterySaving = ref(false);
  const batteryLevel = ref(null);

  onMounted(async () => {
    // Vérifier si l'API Battery est disponible
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();

        // Mettre à jour l'état initial
        batteryLevel.value = battery.level * 100;

        // Détecter le mode économie d'énergie
        isBatterySaving.value =
          // Mode économie d'énergie du navigateur
          window.matchMedia('(prefers-reduced-data: reduce)').matches ||
          // Niveau de batterie bas (moins de 20%)
          (battery.level < 0.2 && !battery.charging);

        // Écouter les changements de niveau de batterie
        battery.addEventListener('levelchange', () => {
          batteryLevel.value = battery.level * 100;
          if (battery.level < 0.2 && !battery.charging) {
            isBatterySaving.value = true;
          } else if (battery.level > 0.3 && isBatterySaving.value) {
            // Réactiver le mode normal quand la batterie remonte au-dessus de 30%
            isBatterySaving.value = false;
          }
        });

        // Écouter les changements de statut de chargement
        battery.addEventListener('chargingchange', () => {
          if (battery.charging && battery.level > 0.3) {
            isBatterySaving.value = false;
          } else if (!battery.charging && battery.level < 0.2) {
            isBatterySaving.value = true;
          }
        });
      } catch (error) {
        console.log('Battery API non disponible', error);
      }
    }

    // Détecter les préférences réduites via les requêtes média
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      isBatterySaving.value = true;
    }

    reducedMotionQuery.addEventListener('change', () => {
      isBatterySaving.value = reducedMotionQuery.matches;
    });
  });

  return {
    isBatterySaving,
    batteryLevel
  };
}
