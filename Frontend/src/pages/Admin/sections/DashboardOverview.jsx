import React, { useState, useEffect } from 'react';
import { getProfile } from '../../../services/profileService';
import UserProfileSection from './UserProfileSection';

// ============================================================
// DashboardOverview — Central Command Metric Panel
// ============================================================
export default function DashboardOverview({ onNotify, onProfileUpdated }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const profData = await getProfile();
        if (isMounted && profData) {
          setProfile(profData);
        }
      } catch {
        // use fallback state
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="admin-tab-pane">
      {/* Top Banner */}
      <div className="admin-overview__hero">
        <div className="admin-overview__hero-content">
          <h2 className="admin-overview__title">
            Welcome back, <span className="text-gradient">{profile?.name || 'Ritesh Kumar Panda'}</span> 👋
          </h2>
          <p className="admin-overview__subtitle">
            Single-page command center: manage your public portfolio content, review live project metrics, respond to inquiries, and deploy real-time updates seamlessly.
          </p>
        </div>
      </div>

      {/* User Profile Section in Content Area */}
      <UserProfileSection
        onNotify={onNotify}
        onProfileUpdated={(updated) => {
          setProfile(updated);
          onProfileUpdated?.(updated);
        }}
      />
    </div>
  );
}

