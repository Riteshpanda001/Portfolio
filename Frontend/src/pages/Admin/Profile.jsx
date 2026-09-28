import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

// ============================================================
// Admin — Profile (stub)
// ============================================================

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="admin-page section">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Edit Profile</h1>
            <p>Update your personal info and password.</p>
          </div>
          <Link to="/admin" className="btn btn--ghost btn--sm">← Dashboard</Link>
        </div>
        <div className="admin-stub card">
          <span className="admin-stub__icon">👤</span>
          <h2>{user?.name || 'Admin'}</h2>
          <p>Profile editing form will go here. Connect to <code>/api/auth/profile</code> and <code>/api/auth/password</code> endpoints.</p>
        </div>
      </div>
    </div>
  );
}
