import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Projects', path: '/admin/projects' },
    { label: 'Skills', path: '/admin/skills' },
    { label: 'Experience', path: '/admin/experience' },
    { label: 'Messages', path: '/admin/messages' },
    { label: 'Profile', path: '/admin/profile' },
  ];

  return (
    <div className="admin-layout min-h-screen bg-[#0B0F1A] text-[#E6EAF2] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#141B2D] p-6 flex flex-col border-r border-slate-800">
        <h2 className="text-xl font-bold text-[#6C63FF] mb-8">Admin Control</h2>
        <nav className="flex-grow space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#6C63FF] text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-6 border-t border-slate-800">
          <div className="text-xs text-slate-400 mb-2">Logged in as {user?.name || 'Admin'}</div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
