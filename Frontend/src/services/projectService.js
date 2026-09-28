import api from './api';

// ============================================================
// Project Service
// ============================================================

/** Fetch all projects (optionally filtered by category). */
export const getAllProjects = (params = {}) =>
  api.get('/projects', { params }).then((r) => r.data);

/** Fetch a single project by ID or slug. */
export const getProjectById = (id) =>
  api.get(`/projects/${id}`).then((r) => r.data);

/** Fetch featured projects for the home page. */
export const getFeaturedProjects = () =>
  api.get('/projects/featured').then((r) => r.data);

/** Admin: Create a new project. */
export const createProject = (payload) =>
  api.post('/projects', payload).then((r) => r.data);

/** Admin: Update a project. */
export const updateProject = (id, payload) =>
  api.put(`/projects/${id}`, payload).then((r) => r.data);

/** Admin: Delete a project. */
export const deleteProject = (id) =>
  api.delete(`/projects/${id}`).then((r) => r.data);
