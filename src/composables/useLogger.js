import { logger } from '@/services/logger';
import { onMounted, onUnmounted } from 'vue';

export function useLogger() {
  return {
    // Actions de base
    logAction: logger.logUserAction.bind(logger),
    logError: logger.logError.bind(logger),
    logPerformance: logger.logPerformance.bind(logger),

    // Actions spécifiques par page
    logHomeAction: logger.logHomeAction.bind(logger),
    logBlogAction: logger.logBlogAction.bind(logger),
    logMapAction: logger.logMapAction.bind(logger),
    logFormAction: logger.logFormAction.bind(logger),

    // Préférences
    logPreferenceChange: logger.logPreferenceChange.bind(logger),

    // Sécurité
    logSecurityEvent: logger.logSecurityEvent.bind(logger),
    logLoginAttempt: logger.logLoginAttempt.bind(logger),

    // Administration
    logAdminAction: logger.logAdminAction.bind(logger),

    logApiError: logger.logApiError.bind(logger),
    logFormError: logger.logFormError.bind(logger)
  };
}

// Composable pour le suivi du temps passé sur une section
export function usePageSectionTracking(sectionName) {
  let startTime = null;
  const { logAction } = useLogger();

  const startTracking = () => {
    startTime = Date.now();
  };

  const endTracking = () => {
    if (startTime) {
      const timeSpent = Date.now() - startTime;
      logAction('page_section', 'time_spent', {
        sectionName,
        timeSpent
      });
      startTime = null;
    }
  };

  onMounted(startTracking);
  onUnmounted(endTracking);

  return {
    startTracking,
    endTracking
  };
}

// Composable pour le suivi des interactions avec des éléments
export function useElementTracking(elementType) {
  const { logAction } = useLogger();

  const trackClick = (elementId, additionalData = {}) => {
    logAction('interaction', 'click', {
      elementType,
      elementId,
      ...additionalData,
      timestamp: Date.now()
    });
  };

  const trackHover = (elementId, duration) => {
    logAction('interaction', 'hover', {
      elementType,
      elementId,
      duration,
      timestamp: Date.now()
    });
  };

  const trackScroll = (elementId, scrollDepth) => {
    logAction('interaction', 'scroll', {
      elementType,
      elementId,
      scrollDepth,
      timestamp: Date.now()
    });
  };

  return {
    trackClick,
    trackHover,
    trackScroll
  };
}
