import api from './api';

export const certificationService = {
  getAll: async () => {
    const response = await api.get('/certifications');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/certifications/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/certifications', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/certifications/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/certifications/${id}`);
  }
};
