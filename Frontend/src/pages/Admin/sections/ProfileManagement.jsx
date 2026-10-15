import React from 'react';
import UserProfileSection from './UserProfileSection';

// ============================================================
// ProfileManagement — Profile Information Section
// ============================================================
export default function ProfileManagement({ onNotify, onProfileUpdated }) {
  return (
    <div className="admin-tab-pane">
      <UserProfileSection
        onNotify={onNotify}
        onProfileUpdated={onProfileUpdated}
      />
    </div>
  );
}
