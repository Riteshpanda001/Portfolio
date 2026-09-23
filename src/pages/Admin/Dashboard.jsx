import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import './Admin.css';

// ============================================================
// Admin Dashboard
// ============================================================

const STATS = [
  { label: 'Projects',   value: '12', icon: '📁', path: '/admin/projects' },
  { label: 'Messages',   value: '8',  icon: '📨', path: '/admin/messages' },
  { label: 'Skills',     value: '24', icon: '⚡', path: '/skills' },
  { label: 'Experience', value: '3',  icon: '💼', path: '/experience' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-page section">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">
              Welcome back, <span className="text-gradient">{user?.name || 'Admin'}</span> 👋
            </h1>
            <p>Here's what's happening with your portfolio.</p>
          </div>
          <Button variant="ghost" onClick={logout} size="sm">Sign Out</Button>
        </div>

        {/* Quick stats */}
        <div className="admin-stats stagger">
          {STATS.map((s) => (
            <Link key={s.label} to={s.path} className="admin-stat card animate-fadeInUp">
              <span className="admin-stat__icon">{s.icon}</span>
              <span className="admin-stat__value text-gradient">{s.value}</span>
              <span className="admin-stat__label">{s.label}</span>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="admin-actions card">
          <h2 className="admin-actions__title">Quick Actions</h2>
          <div className="admin-actions__grid">
            <Link to="/admin/projects" className="btn btn--secondary btn--md">Manage Projects</Link>
            <Link to="/admin/messages" className="btn btn--secondary btn--md">View Messages</Link>
            <Link to="/admin/profile"  className="btn btn--secondary btn--md">Edit Profile</Link>
            <Link to="/" className="btn btn--ghost btn--md">View Site →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
