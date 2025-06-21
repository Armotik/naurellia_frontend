import apiClient from './api';

const FRONTEND_API_KEY = import.meta.env.VITE_FRONTEND_API_KEY;

class ActivityLogger {
  async log(level, message, context = {}) {
    if (!FRONTEND_API_KEY) {
      console.warn('Frontend API Key is not defined. Logging is disabled.');
      return;
    }

    try {
      // MODIFICATION ICI : On ajoute "return" pour pouvoir attendre la fin de cette promesse.
      return apiClient.post('/api/logs/frontend', {
        level,
        message,
        context,
      }, {
        headers: {
          'X-API-KEY': FRONTEND_API_KEY
        }
      });
    } catch (error) {
      console.warn('Activity Logger failed:', error);
    }
  }
}

export const activityLogger = new ActivityLogger();
