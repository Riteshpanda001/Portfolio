import React from 'react';
import AdminNavbar from '../components/Navbar/AdminNavbar';

// ============================================================
// AdminLayout — Admin Shell with Top AdminNavbar
// ============================================================
export default function AdminLayout({
  activeSection,
  onSectionChange,
  profile,
  onSignOut,
  toasts = [],
  children,
}) {
  return (
    <div className="admin-dashboard-container admin-dashboard-container--fullwidth" style={{ minHeight: '100vh' }}>
      {/* Admin-only Top Navbar */}
      <AdminNavbar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        profile={profile}
        onSignOut={onSignOut}
      />

      {/* Toast Notification Stack */}
      {toasts && toasts.length > 0 && (
        <div className="admin-toast-stack" aria-live="polite">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`admin-toast admin-toast--${toast.severity || 'info'}`}
            >
              <span className="admin-toast__icon">
                {toast.severity === 'success' ? '✓' : toast.severity === 'error' ? '✕' : 'ℹ'}
              </span>
              <span className="admin-toast__msg">{toast.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="admin-main-panel admin-main-panel--fullwidth">
        {children}
      </div>
    </div>
  );
}

export { AdminLayout };
