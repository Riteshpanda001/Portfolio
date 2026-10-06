import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import api from '../../services/api';
import { getAllMessages } from '../../services/contactService';
import './Admin.css';

// ============================================================
// Admin Dashboard
// ============================================================

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    projectsCount: 7,
    messagesCount: 0,
    skillsCount: 23,
    experienceCount: 3,
  });

  useEffect(() => {
    // Load accurate message count
    getAllMessages().then((msgs) => {
      if (Array.isArray(msgs)) {
        setStats((prev) => ({ ...prev, messagesCount: msgs.length }));
      }
    }).catch(() => {});

    api.get('/admin/dashboard')
      .then((res) => {
        if (res.data) {
          setStats((prev) => ({
            ...prev,
            projectsCount: res.data.totalProjects ?? prev.projectsCount,
            messagesCount: res.data.unreadMessagesCount ?? res.data.totalMessages ?? prev.messagesCount,
            skillsCount: res.data.totalSkills ?? prev.skillsCount,
            experienceCount: res.data.totalExperience ?? prev.experienceCount,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const statCards = [
    { label: 'Projects',   value: String(stats.projectsCount),   icon: '📁', path: '/admin/projects' },
    { label: 'Messages',   value: String(stats.messagesCount),   icon: '📨', path: '/admin/messages' },
    { label: 'Skills',     value: String(stats.skillsCount),     icon: '🛠️', path: '/skills' },
    { label: 'Experience', value: String(stats.experienceCount), icon: '💼', path: '/experience' },
  ];

  return (
    <div className="admin-page section">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">
              Welcome back, <span className="text-gradient">{user?.name || 'Ritesh'}</span> 👋
            </h1>
            <p>Manage your portfolio projects, view contact inquiries, and configure profile details.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/" className="btn btn--ghost btn--sm">View Live Site →</Link>
            <Button variant="secondary" onClick={logout} size="sm">Sign Out</Button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="admin-stats stagger">
          {statCards.map((s) => (
            <Link key={s.label} to={s.path} className="admin-stat card animate-fadeInUp">
              <span className="admin-stat__icon">{s.icon}</span>
              <span className="admin-stat__value text-gradient">{s.value}</span>
              <span className="admin-stat__label">{s.label}</span>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="admin-actions card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h2 className="admin-actions__title">Quick Management Actions</h2>
          <div className="admin-actions__grid">
            <Link to="/admin/projects" className="btn btn--primary btn--md">📁 Manage Projects</Link>
            <Link to="/admin/messages" className="btn btn--secondary btn--md">📨 View Inbox</Link>
            <Link to="/admin/profile"  className="btn btn--secondary btn--md">👤 Edit Profile</Link>
            <Link to="/certifications" className="btn btn--ghost btn--md">🏆 Certifications</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
