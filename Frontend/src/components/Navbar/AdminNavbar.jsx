import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_NAV_LINKS } from '../../utils/constants';
import './AdminNavbar.css';

export default function AdminNavbar({ activeSection, onSectionChange, onSignOut }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavClick = (item) => {
    if (item.id === 'dashboard') {
      onSectionChange('overview');
    } else {
      onSectionChange(item.id);
    }
  };

  const isActive = (item) => {
    if (item.id === 'dashboard') {
      return activeSection === 'overview' || activeSection === 'dashboard';
    }
    return activeSection === item.id;
  };

  const handleSignOut = async () => {
    if (onSignOut) {
      await onSignOut();
    }
    navigate('/admin/login');
  };

  return (
    <header className="admin-navbar" role="banner">
      <div className="admin-navbar__inner">
        {/* Back Button */}
        <div className="admin-navbar__brand">
          <Link
            to="/"
            onClick={() => logout()}
            className="admin-navbar__back-btn"
            title="Back to Portfolio (Sign out)"
          >
            <svg
              className="admin-navbar__back-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </Link>
        </div>

        {/* Nav Items — Text only */}
        <nav className="admin-navbar__nav" aria-label="Admin navigation">
          {ADMIN_NAV_LINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-navbar__link ${isActive(item) ? 'admin-navbar__link--active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="admin-navbar__link-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sign Out Action Button */}
        <div className="admin-navbar__actions">
          <button
            type="button"
            className="admin-navbar__signout"
            onClick={handleSignOut}
            aria-label="Sign out"
          >
            <span className="admin-navbar__signout-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
