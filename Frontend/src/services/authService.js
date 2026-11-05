import api from './api';

/**
 * Log in as admin.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, refreshToken: string, user: object }>}
 */
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', {
    email: (credentials?.email || '').trim().toLowerCase(),
    password: credentials?.password || '',
  });

  if (data.token) {
    localStorage.setItem('auth_token', data.token);
  }
  if (data.refreshToken) {
    localStorage.setItem('auth_refresh_token', data.refreshToken);
  }
  if (data) {
    localStorage.setItem('auth_user', JSON.stringify({
      id: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
    }));
  }
  return data;
};

/** Log out — clears local storage and hits the logout endpoint. */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch {
    // Ignore server error on logout
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_refresh_token');
    localStorage.removeItem('auth_user');
  }
};

/**
 * Refresh the current auth token using the stored refresh token.
 * @returns {Promise<{ token: string }>}
 */
export const refreshToken = () => {
  const rt = localStorage.getItem('auth_refresh_token');
  return api.post('/auth/refresh', { refreshToken: rt }).then((r) => {
    if (r.data.token) localStorage.setItem('auth_token', r.data.token);
    if (r.data.refreshToken) localStorage.setItem('auth_refresh_token', r.data.refreshToken);
    return r.data;
  });
};

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

