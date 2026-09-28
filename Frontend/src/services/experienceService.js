import api from './api';

// ============================================================
// Experience Service
// ============================================================

/** Fetch all work-experience entries. */
export const getAllExperiences = () =>
  api.get('/experience').then((r) => r.data);

/** Fetch a single experience by ID. */
export const getExperienceById = (id) =>
  api.get(`/experience/${id}`).then((r) => r.data);

/** Admin: Create an experience entry. */
export const createExperience = (payload) =>
  api.post('/experience', payload).then((r) => r.data);

/** Admin: Update an experience entry. */
export const updateExperience = (id, payload) =>
  api.put(`/experience/${id}`, payload).then((r) => r.data);

/** Admin: Delete an experience entry. */
export const deleteExperience = (id) =>
  api.delete(`/experience/${id}`).then((r) => r.data);
