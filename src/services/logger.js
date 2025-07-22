import apiClient from './api';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const FRONTEND_API_KEY = import.meta.env.VITE_FRONTEND_API_KEY;

class Logger {
  constructor() {
    this.pageStartTime = Date.now();
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    this.currentPageData = null;
    this.performanceData = new Map();

    this.initPageTracking();
    this.initPerformanceTracking();
    this.initErrorTracking();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async sendLog(type, category, action, data = {}) {
    if (!FRONTEND_API_KEY) {
      console.warn('Frontend API Key is not defined. Logging is disabled.');
      return;
    }

    const authStore = useAuthStore();
    const currentPath = router.currentRoute.value.path;

    // Ne pas logger les activités normales des administrateurs sur les pages admin
    if (currentPath.startsWith('/admin/') && authStore.isAuthenticated && authStore.isAdmin && type !== 'security') {
      return;
    }

    // Déterminer le level en fonction du type (utiliser le format attendu par l'API)
    let level;
    switch (type) {
      case 'error':
        level = 'ERROR';
        break;
      case 'security':
        level = 'WARNING';
        break;
      case 'performance_debug':
        level = 'DEBUG';
        break;
      case 'page_load':
        level = 'INFO';
        break;
      case 'admin':
        level = 'NOTICE';
        break;
      case 'user_action':
        level = 'NOTICE';
        break;

      default:
        level = 'INFO';
    }

    // Construire un message descriptif et compréhensible
    const message = this.buildMessage(type, category, action, data);

    // Construire le contexte simplifié (comme dans activityLogger.js)
    const context = {
      type,
      category,
      action,
      timestamp: Date.now(),
      sessionId: this.sessionData.sessionId,
      path: currentPath,
      isAuthenticated: authStore.isAuthenticated,
      userId: authStore.user?.id || null,
      ...data
    };

    try {
      return await apiClient.post('/api/logs/frontend', {
        level: level,
        message: message,
        context: context,
      }, {
        headers: {
          'X-API-KEY': FRONTEND_API_KEY
        }
      });
    } catch (error) {
      console.warn('Logger failed:', error);
    }
  }

  buildMessage(type, category, action, data = {}) {
    switch (type) {
      case 'page_load':
        if (action === 'page_view') {
          const loadTime = data.loadTime || 0;
          return `Page loaded: ${data.url || 'unknown'} (${loadTime}ms)`;
        }
        if (action === 'page_leave') {
          const timeSpent = data.timeSpent || 0;
          return `Page left: ${data.url || 'unknown'} (spent ${Math.round(timeSpent / 1000)}s)`;
        }
        return `Navigation: ${action} on ${data.url || 'unknown page'}`;

      case 'user_action':
        if (category === 'preference') {
          return `User changed preference: ${data.preference} from "${data.oldValue}" to "${data.newValue}"`;
        }
        if (category === 'form') {
          return `Form interaction: ${action} on ${data.formType || 'unknown'} form`;
        }
        return `User action: ${action} in ${category} section`;

      case 'error':
        if (category === 'javascript') {
          return `JavaScript error: ${data.message || 'Unknown error'}`;
        }
        if (category === 'api') {
          return `API error: ${data.status || 'Unknown'} on ${data.endpoint || 'unknown endpoint'}`;
        }
        if (category === 'form_validation') {
          return `Form validation error: ${data.errorMessage || 'Unknown'} on field ${data.fieldName || 'unknown'}`;
        }
        return `Error occurred: ${category} - ${data.message || 'No details available'}`;

      case 'performance':
        if (category === 'navigation') {
          const serverResponse = data.serverResponse || 0;
          return `Page performance metrics collected (server response: ${Math.round(serverResponse)}ms)`;
        }
        if (category === 'lcp') {
          return `Largest Contentful Paint measured: ${Math.round(data.value || 0)}ms`;
        }
        if (category === 'fid') {
          return `First Input Delay measured: ${Math.round(data.value || 0)}ms`;
        }
        if (category === 'cls') {
          return `Cumulative Layout Shift measured: ${(data.value || 0).toFixed(3)}`;
        }
        return `Performance metric: ${category} measured`;

      case 'performance_debug':
        if (category === 'navigation') {
          const serverResponse = data.serverResponse || 0;
          return `Page performance metrics collected (server response: ${Math.round(serverResponse)}ms)`;
        }
        if (category === 'lcp') {
          return `Largest Contentful Paint measured: ${Math.round(data.value || 0)}ms`;
        }
        if (category === 'fid') {
          return `First Input Delay measured: ${Math.round(data.value || 0)}ms`;
        }
        if (category === 'cls') {
          return `Cumulative Layout Shift measured: ${(data.value || 0).toFixed(3)}`;
        }
        return `Performance metric: ${category} measured`;

      case 'security':
        if (category === 'login_attempt') {
          const status = data.success ? 'successful' : 'failed';
          return `Login attempt ${status} for user: ${data.email || 'unknown'}`;
        }
        if (category === 'unauthorized_access') {
          return `Unauthorized access attempt to: ${data.attemptedPath || 'unknown path'}`;
        }
        return `Security event: ${category} - ${action}`;

      case 'admin':
        return `Admin action: ${action} on ${data.resourceType || 'unknown resource'}${data.resourceId ? ` (ID: ${data.resourceId})` : ''}`;

      default:
        return `${type}: ${category} - ${action}`;
    }
  }

  // === LOGS DE CHARGEMENT DE PAGE ===
  initPageTracking() {
    // Suivi du changement de route
    if (router) {
      router.beforeEach((to, from) => {
        if (this.currentPageData) {
          this.logPageLeave(from);
        }
        this.pageStartTime = Date.now();
      });

      router.afterEach((to, from) => {
        this.logPageLoad(to, from);
      });
    }

    // Suivi de la fermeture/rafraîchissement de page
    window.addEventListener('beforeunload', () => {
      if (this.currentPageData) {
        const timeSpent = Date.now() - this.pageStartTime;
        const currentPath = router.currentRoute.value.path;

        const data = {
          url: currentPath,
          timeSpent,
          scrollDepth: this.getScrollDepth()
        };

        const logData = {
          level: 'INFO',
          message: this.buildMessage('page_load', 'navigation', 'page_leave', data),
          context: {
            type: 'page_load',
            category: 'navigation',
            action: 'page_leave',
            timestamp: Date.now(),
            sessionId: this.sessionData.sessionId,
            path: currentPath,
            isAuthenticated: false, // Ne pas accéder au store dans beforeunload
            userId: null,
            ...data
          }
        };

        // Comme sendBeacon ne peut pas envoyer l'en-tête X-API-KEY,
        // on utilise une approche synchrone avec fetch
        try {
          fetch('/api/logs/frontend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': FRONTEND_API_KEY
            },
            body: JSON.stringify(logData),
            keepalive: true
          });
        } catch (error) {
          // En cas d'échec, essayer sendBeacon sans en-têtes
          const blob = new Blob([JSON.stringify(logData)], { type: 'application/json' });
          navigator.sendBeacon('/api/logs/frontend', blob);
        }
      }
    });
  }

  /**
   * Log the page load event.
   * @param to
   * @param from
   */
  logPageLoad(to, from) {
    const authStore = useAuthStore();
    const loadTime = Date.now() - this.pageStartTime;

    const referrerType = this.getReferrerType(from?.path, document.referrer);

    this.currentPageData = {
      type: 'page_load',
      category: 'navigation',
      action: 'page_view',
      data: {
        url: to.path,
        title: document.title,
        loadTime,
        referrerType,
        previousPage: from?.path || null,
        userPreferences: authStore.isAuthenticated ? {
          theme: localStorage.getItem('theme'),
          ecoBattery: localStorage.getItem('ecoBattery') === 'true'
        } : null
      }
    };

    this.sendLog(
      this.currentPageData.type,
      this.currentPageData.category,
      this.currentPageData.action,
      this.currentPageData.data
    );
  }

  logPageLeave(route) {
    if (!this.currentPageData) return;

    const timeSpent = Date.now() - this.pageStartTime;

    this.sendLog('page_load', 'navigation', 'page_leave', {
      url: route.path,
      timeSpent,
      scrollDepth: this.getScrollDepth()
    });
  }

  getReferrerType(fromPath, referrer) {
    if (fromPath) return 'internal_navigation';
    if (!referrer) return 'direct';
    if (referrer.includes(window.location.hostname)) return 'internal_link';
    if (referrer.includes('google.')) return 'search_google';
    if (referrer.includes('bing.')) return 'search_bing';
    if (referrer.includes('facebook.')) return 'social_facebook';
    if (referrer.includes('twitter.') || referrer.includes('x.com')) return 'social_twitter';
    return 'external_link';
  }

  getScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    return documentHeight > 0 ? Math.round((scrollTop / documentHeight) * 100) : 0;
  }

  // === LOGS DES ACTIONS UTILISATEUR ===
  /**
   * Log a user action.
   * @param category The category of the action (e.g., 'home', 'blog', 'map', 'form')
   * @param action The specific action performed (e.g., 'click', 'submit', 'view')
   * @param data Additional data related to the action (optional)
   */
  logUserAction(category, action, data = {}) {
    this.sendLog('user_action', category, action, data);
  }

  // Changements de préférences
  /**
   * Log a change in user preference.
   * @param preference
   * @param oldValue
   * @param newValue
   */
  logPreferenceChange(preference, oldValue, newValue) {
    this.logUserAction('preference', 'change', {
      preference,
      oldValue,
      newValue,
      timestamp: Date.now()
    });
  }

  // Actions spécifiques par page
  /**
   * Log a home page action.
   * @param action
   * @param data
   */
  logHomeAction(action, data = {}) {
    this.logUserAction('home', action, data);
  }

  /**
   * Log a blog action.
   * @param action
   * @param data
   */
  logBlogAction(action, data = {}) {
    this.logUserAction('blog', action, data);
  }

  /**
   * Log a map action.
   * @param action
   * @param data
   */
  logMapAction(action, data = {}) {
    this.logUserAction('map', action, data);
  }

  /**
   * Log a form action.
   * @param formType The type of form (e.g., 'contact', 'registration', 'login')
   * @param action The specific action performed (e.g., 'submit', 'reset', 'view')
   * @param data Additional data related to the form action (optional)
   */
  logFormAction(formType, action, data = {}) {
    this.logUserAction('form', action, { formType, ...data });
  }

  // === LOGS D'ERREURS ===
  initErrorTracking() {
    // Erreurs JavaScript
    window.addEventListener('error', (event) => {
      this.logError('javascript', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Erreurs de promesses non gérées
    window.addEventListener('unhandledrejection', (event) => {
      this.logError('promise_rejection', {
        reason: event.reason,
        stack: event.reason?.stack
      });
    });

    // Erreurs de ressources
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.logError('resource', {
          type: event.target.tagName,
          source: event.target.src || event.target.href,
          message: 'Failed to load resource'
        });
      }
    }, true);
  }

  /**
   * Log a general error.
   * @param errorType
   * @param errorData
   */
  logError(errorType, errorData) {
    this.sendLog('error', errorType, 'error_occurred', {
      ...errorData,
      url: window.location.href,
      timestamp: Date.now()
    });
  }

  // Erreurs API spécifiques
  /**
   * Log an API error.
   * @param endpoint
   * @param status
   * @param message
   * @param data
   */
  logApiError(endpoint, status, message, data = {}) {
    this.logError('api', {
      endpoint,
      status,
      message,
      ...data
    });
  }

  // Erreurs de validation de formulaire
  /**
   * Log a form validation error.
   * @param formType
   * @param fieldName
   * @param errorMessage
   */
  logFormError(formType, fieldName, errorMessage) {
    this.logError('form_validation', {
      formType,
      fieldName,
      errorMessage
    });
  }

  // === LOGS DE PERFORMANCE ===
  initPerformanceTracking() {
    // Performance Observer pour les métriques Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.logPerformance('lcp', { value: entry.startTime });
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.logPerformance('fid', { value: entry.processingStart - entry.startTime });
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.logPerformance('cls', { value: clsValue });
      }).observe({ entryTypes: ['layout-shift'] });
    }

    // Navigation Timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          this.logPerformance('navigation', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcpConnect: perfData.connectEnd - perfData.connectStart,
            serverResponse: perfData.responseEnd - perfData.requestStart
          });
        }
      }, 0);
    });
  }

  /**
   * Log a performance metric.
   * @param metric
   * @param data
   */
  logPerformance(metric, data) {
    this.sendLog('performance_debug', metric, 'measurement', data);
  }

  // === LOGS DE SÉCURITÉ ===
  /**
   * Log a security event.
   * @param eventType
   * @param data
   */
  logSecurityEvent(eventType, data = {}) {
    this.sendLog('security', eventType, 'security_event', data);
  }

  /**
   * Log an unauthorized access attempt.
   * @param attemptedPath
   */
  logUnauthorizedAccess(attemptedPath) {
    this.logSecurityEvent('unauthorized_access', {
      attemptedPath,
      timestamp: Date.now()
    });
  }

  /**
   * Log a login attempt.
   * @param success
   * @param email
   * @param errorMessage
   */
  logLoginAttempt(success, email, errorMessage = null) {
    this.logSecurityEvent('login_attempt', {
      success,
      email,
      errorMessage,
      timestamp: Date.now()
    });
  }

  // === LOGS D'ADMINISTRATION ===
  /**
   * Log an administrative action.
   * @param action The action performed by the admin
   * @param resourceType The type of resource affected (e.g., 'user', 'post', 'comment')
   * @param resourceId The ID of the resource affected (optional)
   * @param data Additional data related to the action (optional)
   */
  logAdminAction(action, resourceType, resourceId = null, data = {}) {
    this.sendLog('admin', 'admin_action', action, {
      resourceType,
      resourceId,
      ...data,
      timestamp: Date.now()
    });
  }
}

export const logger = new Logger();
export default logger;
