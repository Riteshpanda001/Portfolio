import React from 'react';

// ============================================================
// AdminLayout — Single-Page Persistent Admin Shell
// ============================================================
export default function AdminLayout({
  activeSection: _activeSection,
  onSectionChange: _onSectionChange,
  profile: _profile,
  unreadCount: _unreadCount = 0,
  onSignOut: _onSignOut,
  toasts = [],
  children,
}) {
  return (
    <div className="admin-dashboard-container admin-dashboard-container--fullwidth">
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

      {/* Full-Width Content Panel */}
      <div className="admin-main-panel admin-main-panel--fullwidth">
        {children}
      </div>
    </div>
  );
}

export { AdminLayout };
