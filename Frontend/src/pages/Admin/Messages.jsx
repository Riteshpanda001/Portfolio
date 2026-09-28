import { Link } from 'react-router-dom';
import './Admin.css';

// ============================================================
// Admin — Messages (stub)
// ============================================================

export default function Messages() {
  return (
    <div className="admin-page section">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Messages</h1>
            <p>View and manage contact form submissions.</p>
          </div>
          <Link to="/admin" className="btn btn--ghost btn--sm">← Dashboard</Link>
        </div>
        <div className="admin-stub card">
          <span className="admin-stub__icon">📨</span>
          <h2>Inbox</h2>
          <p>Connect your backend API to display contact messages here with mark-as-read and delete actions.</p>
        </div>
      </div>
    </div>
  );
}
