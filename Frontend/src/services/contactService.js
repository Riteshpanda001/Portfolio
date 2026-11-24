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
  } catch {
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
  let backendList = [];
  try {
    const res = await api.get('/contact/messages', { params });
    if (res.data && Array.isArray(res.data.content)) {
      backendList = res.data.content;
    } else if (Array.isArray(res.data)) {
      backendList = res.data;
    }
  } catch {
    // API not reachable or unauthenticated
  }

  // Merge any inquiries stored locally in offline mode
  const localList = getStoredMessages();
  const existingIds = new Set(backendList.map((m) => String(m.id || m._id)));
  const merged = [...backendList];

  for (const item of localList) {
    if (!existingIds.has(String(item.id || item._id))) {
      merged.push(item);
    }
  }

  if (params.unreadOnly) {
    return merged.filter((m) => !m.isRead && !m.read);
  }
  return merged;
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
export const markMessageAsRead = markMessageRead;

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

