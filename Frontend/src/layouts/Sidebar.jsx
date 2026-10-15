import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// Sidebar — Persistent Admin Sidebar with Profile & Navigation
// ============================================================
export default function Sidebar({
  activeSection,
  onSectionChange,
  profile,
  unreadCount = 0,
  onSignOut,
  mobileOpen = false,
  onCloseMobile,
}) {
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'about', label: 'About Me', icon: '📝' },
    { id: 'skills', label: 'Skills & Technologies', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'training', label: 'Training & Certifications', icon: '🏆' },
    {
      id: 'messages',
      label: 'Contact Messages',
      icon: '📨',
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const adminName = profile?.name || 'Ritesh Kumar Panda';
  const adminTitle = profile?.title || 'AI/ML Engineer & Full-Stack Developer';
  const avatarUrl = profile?.avatarUrl || '';
  const initials =
    adminName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2) || 'RKP';

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        className={`admin-sidebar ${mobileOpen ? 'admin-sidebar--open' : ''}`}
        aria-label="Admin Navigation"
      >
        {/* Mobile Close Button */}
        <button
          type="button"
          className="admin-sidebar__close"
          onClick={onCloseMobile}
          aria-label="Close Sidebar"
        >
          ×
        </button>

        {/* Profile Card Header */}
        <div className="admin-sidebar__profile">
          <div className="admin-sidebar__avatar-wrap">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={adminName}
                className="admin-sidebar__avatar"
              />
            ) : (
              <div className="admin-sidebar__avatar-fallback">{initials}</div>
            )}
            <span
              className="admin-sidebar__status-dot"
              title="Admin Session Active"
            />
          </div>

          <h3 className="admin-sidebar__name">{adminName}</h3>
          <p className="admin-sidebar__title">
            {adminTitle.length > 32
              ? `${adminTitle.slice(0, 32)}…`
              : adminTitle}
          </p>

          <button
            type="button"
            className="admin-sidebar__edit-btn"
            onClick={() => {
              onSectionChange('profile');
              onCloseMobile?.();
            }}
          >
            ✏️ Edit Profile
          </button>
        </div>

        {/* In-Page Navigation Menu */}
        <nav className="admin-sidebar__nav">
          <span className="admin-sidebar__nav-heading">MANAGEMENT MENU</span>
          {navItems.map((item) => {
            const isSelected =
              activeSection === item.id ||
              (item.id === 'overview' && activeSection === 'dashboard') ||
              (item.id === 'training' && activeSection === 'certifications');

            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${
                  isSelected ? 'admin-nav-item--active' : ''
                }`}
                onClick={() => {
                  onSectionChange(item.id);
                  onCloseMobile?.();
                }}
              >
                <span className="admin-nav-item__icon">{item.icon}</span>
                <span className="admin-nav-item__label">{item.label}</span>
                {item.badge && (
                  <span className="admin-nav-item__badge">{item.badge}</span>
                )}
              </button>
            );
          })}

          <div className="admin-sidebar__divider" />

          {/* Sign Out Button */}
          <button
            type="button"
            className="admin-nav-item admin-nav-item--logout"
            onClick={onSignOut}
          >
            <span className="admin-nav-item__icon">🚪</span>
            <span className="admin-nav-item__label">Sign Out</span>
          </button>
        </nav>

        {/* Live Portfolio Shortcut */}
        <div className="admin-sidebar__footer">
          <Link
            to="/"
            className="admin-sidebar__live-link"
            title="Open Live Portfolio Homepage"
          >
            <span>🌐 View Live Portfolio</span>
            <span>↗</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
