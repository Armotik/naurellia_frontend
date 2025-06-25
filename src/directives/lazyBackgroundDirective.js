/**
 * Directive Vue pour le lazy loading des images en background-image
 * Usage: v-lazy-background="imageUrl"
 */
export const lazyBackground = {
  mounted(el, binding) {
    // Fonction qui va appliquer l'image de fond
    function loadBackgroundImage() {
      // Préchargement de l'image
      const img = new Image();
      img.onload = () => {
        // Une fois l'image chargée, l'appliquer en fond
        el.style.backgroundImage = `url(${binding.value})`;
        // Ajouter une classe pour déclencher une transition si nécessaire
        el.classList.add('bg-loaded');
      };
      img.src = binding.value;
    }

    // Création de l'Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      // Si l'élément est visible ou s'approche de la visibilité
      if (entries[0].isIntersecting) {
        // Charger l'image
        loadBackgroundImage();
        // Arrêter d'observer une fois l'image chargée
        observer.disconnect();
      }
    }, {
      // Charger l'image lorsqu'elle est à 200px du viewport
      rootMargin: '200px 0px'
    });

    // Commencer à observer l'élément
    observer.observe(el);
  }
};

export default lazyBackground;

