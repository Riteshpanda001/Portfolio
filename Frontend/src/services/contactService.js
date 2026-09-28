import api from './api';

// ============================================================
// Contact Service
// ============================================================

/**
 * Submit a contact form message.
 * @param {{ name: string, email: string, subject: string, message: string }} payload
 */
export const sendContactMessage = (payload) =>
  api.post('/contact', payload).then((r) => r.data);

/** Admin: Fetch all received messages. */
export const getAllMessages = (params = {}) =>
  api.get('/contact/messages', { params }).then((r) => r.data);

/** Admin: Mark a message as read. */
export const markMessageRead = (id) =>
  api.patch(`/contact/messages/${id}/read`).then((r) => r.data);

/** Admin: Delete a message. */
export const deleteMessage = (id) =>
  api.delete(`/contact/messages/${id}`).then((r) => r.data);

/**
 * Subscribe to newsletter.
 * @param {string} email
 */
export const subscribeNewsletter = (email) =>
  api.post('/newsletter/subscribe', { email }).then((r) => r.data);
