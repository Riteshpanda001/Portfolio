import api from './api';

// ============================================================
// Authorized Administrator Credentials
// ============================================================
export const AUTHORIZED_ADMIN_EMAILS = [
  'riteshkumarpanda001@gmail.com',
  'riteshkumarpaanda001@gmail.com',
];
export const AUTHORIZED_ADMIN_PASSWORDS = [
  'Ritesh Kumar Panda001@2005',
  'Riteshkumar Panda001@2005',
  'RiteshkumarPanda001@2005',
];

/**
 * Log in as admin.
 * Only the specific authorized email and password are permitted.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = async (credentials) => {
  const emailInput = (credentials?.email || '').trim().toLowerCase();
  const passInput = (credentials?.password || '').trim();

  // Strict credential check against allowed admin accounts
  const isEmailMatch = AUTHORIZED_ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(emailInput);
  const isPassMatch = AUTHORIZED_ADMIN_PASSWORDS.includes(passInput);

  if (!isEmailMatch || !isPassMatch) {
    throw new Error('Access denied. Invalid Gmail or password. Only authorized administrator can open this panel.');
  }

  try {
    const { data } = await api.post('/auth/login', {
      email: emailInput,
      password: passInput,
    });
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }
    return data;
  } catch {
    // Standalone fallback when backend server is in offline/mock mode
    const fallbackData = {
      token: 'admin-jwt-token-rkp-' + Date.now(),
      user: {
        id: 1,
        name: 'Ritesh Kumar Panda',
        email: emailInput || 'riteshkumarpanda001@gmail.com',
        role: 'ADMIN',
      },
    };
    localStorage.setItem('auth_token', fallbackData.token);
    localStorage.setItem('auth_user', JSON.stringify(fallbackData.user));
    return fallbackData;
  }
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
