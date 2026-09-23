import api from './api';

// ============================================================
// Skill Service
// ============================================================

/** Fetch all skills, optionally filtered by category. */
export const getAllSkills = (params = {}) =>
  api.get('/skills', { params }).then((r) => r.data);

/** Fetch skills grouped by category. */
export const getSkillsByCategory = () =>
  api.get('/skills/grouped').then((r) => r.data);

/** Admin: Create a skill. */
export const createSkill = (payload) =>
  api.post('/skills', payload).then((r) => r.data);

/** Admin: Update a skill. */
export const updateSkill = (id, payload) =>
  api.put(`/skills/${id}`, payload).then((r) => r.data);

/** Admin: Delete a skill. */
export const deleteSkill = (id) =>
  api.delete(`/skills/${id}`).then((r) => r.data);
