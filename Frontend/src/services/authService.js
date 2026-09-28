import api from './api';

// ============================================================
// Auth Service
// ============================================================

/**
 * Log in as admin.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  if (data.token) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
  }
  return data;
};

/** Log out — clears local storage and optionally hits logout endpoint. */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }
};

/**
 * Refresh the current auth token.
 * @returns {Promise<{ token: string }>}
 */
export const refreshToken = () =>
  api.post('/auth/refresh').then((r) => {
    if (r.data.token) localStorage.setItem('auth_token', r.data.token);
    return r.data;
  });

/**
 * Get the currently stored user from local storage (synchronous).
 * @returns {object|null}
 */
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/** Check whether a valid token exists in local storage. */
export const isAuthenticated = () => !!localStorage.getItem('auth_token');

/** Update admin profile. */
export const updateProfile = (payload) =>
  api.put('/auth/profile', payload).then((r) => r.data);

/** Change admin password. */
export const changePassword = (payload) =>
  api.put('/auth/password', payload).then((r) => r.data);
