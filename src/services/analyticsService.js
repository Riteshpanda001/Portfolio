import api from './api';

export const analyticsService = {
  recordVisit: async (page = '/') => {
    try {
      await api.post('/analytics/visit', { page });
    } catch (e) {
      console.warn('Analytics visit recording skipped:', e);
    }
  },
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  }
};
