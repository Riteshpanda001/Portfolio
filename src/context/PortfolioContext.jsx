import { createContext, useContext, useState, useCallback } from 'react';

// ============================================================
// Portfolio Context — light global UI/filter state
// ============================================================

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  // Active project category filter
  const [activeFilter, setActiveFilter] = useState('All');

  // Global search query (used across pages)
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile nav open state
  const [navOpen, setNavOpen] = useState(false);

  // Toast notifications queue
  const [toasts, setToasts] = useState([]);

  const openNav  = useCallback(() => setNavOpen(true),  []);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const toggleNav = useCallback(() => setNavOpen((v) => !v), []);

  /** Push a toast message. severity: 'success' | 'error' | 'info' | 'warning' */
  const addToast = useCallback((message, severity = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, severity }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    navOpen,
    openNav,
    closeNav,
    toggleNav,
    toasts,
    addToast,
    removeToast,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

/** Hook to consume the PortfolioContext. */
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return ctx;
}

export default PortfolioContext;
