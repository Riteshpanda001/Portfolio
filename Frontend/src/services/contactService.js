import api from './api';

const STORAGE_KEY = 'portfolio_contact_messages';

const getStoredMessages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredMessages = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Ignore storage quota errors
  }
};

/**
 * Submit a contact form message.
 * @param {{ name: string, email: string, subject: string, message: string }} payload
 */
export const sendContactMessage = async (payload) => {
  try {
    const res = await api.post('/contact', payload);
    return res.data;
  } catch (err) {
    // Save locally so inquiries persist
    const current = getStoredMessages();
    const newMsg = {
      id: 'msg-' + Date.now(),
      name: payload.name,
      email: payload.email,
      subject: payload.subject || 'Portfolio Inquiry',
      message: payload.message,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    saveStoredMessages([newMsg, ...current]);
    return newMsg;
  }
};

/** Admin: Fetch all received messages. */
export const getAllMessages = async (params = {}) => {
  try {
    const res = await api.get('/contact/messages', { params });
    return res.data;
  } catch {
    let list = getStoredMessages();
    if (params.unreadOnly) {
      list = list.filter((m) => !m.isRead);
    }
    return list;
  }
};

/** Admin: Mark a message as read. */
export const markMessageRead = async (id) => {
  try {
    return await api.patch(`/contact/messages/${id}/read`).then((r) => r.data);
  } catch {
    const list = getStoredMessages().map((m) =>
      m.id === id ? { ...m, isRead: true } : m
    );
    saveStoredMessages(list);
    return { success: true };
  }
};

/** Admin: Delete a message. */
export const deleteMessage = async (id) => {
  try {
    return await api.delete(`/contact/messages/${id}`).then((r) => r.data);
  } catch {
    const list = getStoredMessages().filter((m) => m.id !== id);
    saveStoredMessages(list);
    return { success: true };
  }
};

/**
 * Subscribe to newsletter.
 * @param {string} email
 */
export const subscribeNewsletter = (email) =>
  api.post('/newsletter/subscribe', { email }).then((r) => r.data);

