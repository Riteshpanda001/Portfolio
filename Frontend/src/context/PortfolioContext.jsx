import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getProfile } from '../services/profileService';

// ============================================================
// Portfolio Context — light global UI/filter & profile state
// ============================================================

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  // Global Profile State (synchronized between Admin and Public portfolio)
  const [profile, setProfile] = useState({
    name: 'Ritesh Kumar Panda',
    title: 'AI/ML Engineer & Full-Stack Developer',
    bio: 'Computer Science Engineering student at NIST University passionate about building modern web applications, intelligent AI/ML systems, and data-driven solutions.',
    location: 'Berhampur, Odisha, India',
    email: 'riteshkumarpanda001@gmail.com',
    phone: '+91 9692229676',
    githubUrl: 'https://github.com/Riteshpanda001',
    linkedinUrl: 'https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a',
    twitterUrl: 'https://twitter.com/riteshpanda',
    websiteUrl: 'https://riteshpanda.dev',
    avatarUrl: '',
    resumeUrl: '/resume.pdf',
    isAvailableForHire: true,
  });

  const refreshProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      if (data) {
        setProfile((prev) => ({
          ...prev,
          ...data,
          phone: data.phone || data.phoneNumber || prev.phone,
        }));
      }
      return data;
    } catch {
      // keep fallback
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const updateProfileState = useCallback((updated) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
      phone: updated.phone || updated.phoneNumber || prev.phone,
    }));
  }, []);

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

  // Gmail Modal state
  const [gmailModalOpen, setGmailModalOpen] = useState(false);

  const openGmailModal = useCallback(() => setGmailModalOpen(true), []);
  const closeGmailModal = useCallback(() => setGmailModalOpen(false), []);

  const value = {
    profile,
    setProfile,
    updateProfileState,
    refreshProfile,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    navOpen,
    openNav,
    closeNav,
    toggleNav,
    gmailModalOpen,
    openGmailModal,
    closeGmailModal,
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
