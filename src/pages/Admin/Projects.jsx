import { Link } from 'react-router-dom';
import './Admin.css';

// ============================================================
// Admin — Projects Management (stub)
// ============================================================

export default function AdminProjects() {
  return (
    <div className="admin-page section">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Manage Projects</h1>
            <p>Add, edit, or remove portfolio projects.</p>
          </div>
          <Link to="/admin" className="btn btn--ghost btn--sm">← Dashboard</Link>
        </div>
        <div className="admin-stub card">
          <span className="admin-stub__icon">📁</span>
          <h2>Projects Management</h2>
          <p>Connect your backend API to manage projects here. This panel will list all projects with CRUD controls.</p>
        </div>
      </div>
    </div>
  );
}
