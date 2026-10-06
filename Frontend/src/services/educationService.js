import api from './api';

export const getAllEducation = () =>
  api.get('/education').then((r) => r.data);

export const getEducationById = (id) =>
  api.get(`/education/${id}`).then((r) => r.data);

export const createEducation = (data) =>
  api.post('/education', data).then((r) => r.data);

export const updateEducation = (id, data) =>
  api.put(`/education/${id}`, data).then((r) => r.data);

export const deleteEducation = (id) =>
  api.delete(`/education/${id}`).then((r) => r.data);

export const educationService = {
  getAll: getAllEducation,
  getById: getEducationById,
  create: createEducation,
  update: updateEducation,
  delete: deleteEducation,
};

export default educationService;
