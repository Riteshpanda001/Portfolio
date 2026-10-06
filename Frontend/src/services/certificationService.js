import api from './api';

export const getAllCertifications = () =>
  api.get('/certifications').then((r) => r.data);

export const getCertificationById = (id) =>
  api.get(`/certifications/${id}`).then((r) => r.data);

export const createCertification = (data) =>
  api.post('/certifications', data).then((r) => r.data);

export const updateCertification = (id, data) =>
  api.put(`/certifications/${id}`, data).then((r) => r.data);

export const deleteCertification = (id) =>
  api.delete(`/certifications/${id}`).then((r) => r.data);

export const certificationService = {
  getAll: getAllCertifications,
  getById: getCertificationById,
  create: createCertification,
  update: updateCertification,
  delete: deleteCertification,
};

export default certificationService;
