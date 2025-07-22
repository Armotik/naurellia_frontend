import { logger } from '@/services/logger';

export const trackingDirective = {
  mounted(el, binding) {
    const { action, category, data = {} } = binding.value || {};

    if (!action || !category) {
      console.warn('v-track directive requires action and category');
      return;
    }

    // Fonction pour logger l'action
    const logInteraction = (event) => {
      logger.logUserAction(category, action, {
        ...data,
        elementTag: el.tagName.toLowerCase(),
        elementId: el.id || null,
        elementClass: el.className || null,
        elementText: el.textContent?.trim().substring(0, 100) || null,
        eventType: event.type,
        timestamp: Date.now(),
        mousePosition: event.type === 'click' ? { x: event.clientX, y: event.clientY } : null
      });
    };

    // Ajouter les écouteurs d'événements
    el.addEventListener('click', logInteraction);

    // Stocker la fonction pour pouvoir la supprimer plus tard
    el._trackingHandler = logInteraction;
  },

  unmounted(el) {
    if (el._trackingHandler) {
      el.removeEventListener('click', el._trackingHandler);
      delete el._trackingHandler;
    }
  }
};

// Directive pour le tracking du temps passé sur un élément
export const hoverTrackingDirective = {
  mounted(el, binding) {
    const { category, action, data = {} } = binding.value || {};
    let hoverStartTime = null;

    const onMouseEnter = () => {
      hoverStartTime = Date.now();
    };

    const onMouseLeave = () => {
      if (hoverStartTime) {
        const hoverDuration = Date.now() - hoverStartTime;
        if (hoverDuration > 1000) { // Seulement si hover > 1 seconde
          logger.logUserAction(category || 'interaction', action || 'hover', {
            ...data,
            elementTag: el.tagName.toLowerCase(),
            elementId: el.id || null,
            hoverDuration,
            timestamp: Date.now()
          });
        }
        hoverStartTime = null;
      }
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    el._hoverTrackingHandlers = { onMouseEnter, onMouseLeave };
  },

  unmounted(el) {
    if (el._hoverTrackingHandlers) {
      el.removeEventListener('mouseenter', el._hoverTrackingHandlers.onMouseEnter);
      el.removeEventListener('mouseleave', el._hoverTrackingHandlers.onMouseLeave);
      delete el._hoverTrackingHandlers;
    }
  }
};
