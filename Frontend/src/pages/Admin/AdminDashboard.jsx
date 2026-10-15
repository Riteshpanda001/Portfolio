import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { profileService } from '../../services/profileService';
import { getAllMessages } from '../../services/contactService';
import AdminLayout from '../../layouts/AdminLayout';
import MainContent from '../../layouts/MainContent';
import './AdminDashboard.css';

// ============================================================
// AdminDashboard — Single-Page Admin Management Hub
// ============================================================
export default function AdminDashboard({ defaultTab }) {
  const { logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Active section state: defaults to URL param, prop, or 'overview'
  const initialSection =
    searchParams.get('section') ||
    searchParams.get('tab') ||
    defaultTab ||
    'overview';

  const [activeSection, setActiveSection] = useState(initialSection);

  // Profile data for sidebar
  const [profile, setProfile] = useState({
    name: 'Ritesh Kumar Panda',
    title: 'AI/ML Engineer & Full-Stack Developer',
    avatarUrl: '',
  });

  // Unread messages count for sidebar badge
  const [unreadCount, setUnreadCount] = useState(0);

  // Toast notification queue
  const [toasts, setToasts] = useState([]);

  // Modal triggers requested from overview quick-action buttons
  const [openModalInTab, setOpenModalInTab] = useState(null);

  const addToast = (message, severity = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, severity }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Sync profile data and unread messages count on mount
  useEffect(() => {
    profileService
      .getProfile()
      .then((data) => {
        if (data) {
          setProfile({
            name: data.name || 'Ritesh Kumar Panda',
            title: data.title || 'AI/ML Engineer & Full-Stack Developer',
            avatarUrl: data.avatarUrl || '',
          });
        }
      })
      .catch(() => {});

    getAllMessages()
      .then((msgs) => {
        if (Array.isArray(msgs)) {
          setUnreadCount(msgs.filter((m) => !m.isRead && !m.read).length);
        }
      })
      .catch(() => {});
  }, []);

  // Update document title when active section changes
  useEffect(() => {
    const titles = {
      overview: 'Dashboard Overview — Admin',
      profile: 'Profile Management — Admin',
      about: 'About Me — Admin',
      skills: 'Skills & Tech — Admin',
      projects: 'Projects — Admin',
      experience: 'Experience — Admin',
      training: 'Training & Certs — Admin',
      certifications: 'Training & Certs — Admin',
      messages: 'Messages — Admin',
      settings: 'Settings — Admin',
    };
    document.title = titles[activeSection] || 'Portfolio Admin';
  }, [activeSection]);

  // Handle in-page section switching without full-page reloads
  const handleSectionChange = (sectionId, modalAction = null) => {
    setActiveSection(sectionId);
    setOpenModalInTab(modalAction);
    setSearchParams({ section: sectionId });

    // Smooth scroll content area to top
    const contentEl = document.getElementById('admin-main-panel-content');
    if (contentEl) {
      contentEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      profile={profile}
      unreadCount={unreadCount}
      onSignOut={handleSignOut}
      toasts={toasts}
    >
      <MainContent
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onNotify={addToast}
        onProfileUpdated={(updated) => {
          setProfile((prev) => ({
            ...prev,
            ...updated,
          }));
        }}
        onMessagesUpdated={(msgs) => {
          const unread = msgs.filter((m) => !m.isRead && !m.read).length;
          setUnreadCount(unread);
        }}
        openModalInTab={openModalInTab}
      />
    </AdminLayout>
  );
}
