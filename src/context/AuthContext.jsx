import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginService, logout as logoutService, getStoredUser, isAuthenticated } from '../services/authService';

// ============================================================
// Auth Context
// ============================================================

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(getStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const isAuth = isAuthenticated();

  /** Attempt to log in with email + password. */
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Log out the current user. */
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutService();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  /** Clear any lingering auth errors. */
  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    isAuthenticated: !!isAuth,
    loading,
    error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook to consume the AuthContext. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export default AuthContext;
