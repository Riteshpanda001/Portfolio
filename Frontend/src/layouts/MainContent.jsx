import React from 'react';
import DashboardOverview from '../pages/Admin/sections/DashboardOverview';
import ProfileManagement from '../pages/Admin/sections/ProfileManagement';
import AboutManagement from '../pages/Admin/sections/AboutManagement';
import SkillsManagement from '../pages/Admin/sections/SkillsManagement';
import ProjectsManagement from '../pages/Admin/sections/ProjectsManagement';
import ExperienceManagement from '../pages/Admin/sections/ExperienceManagement';
import TrainingManagement from '../pages/Admin/sections/TrainingManagement';
import ContactMessages from '../pages/Admin/sections/ContactMessages';
import SettingsManagement from '../pages/Admin/sections/SettingsManagement';

// ============================================================
// MainContent — Dynamic In-Page Section Renderer
// ============================================================
export default function MainContent({
  activeSection,
  onSectionChange,
  onNotify,
  onProfileUpdated,
  onMessagesUpdated,
  openModalInTab,
}) {
  return (
    <div className="admin-content-area" id="admin-main-panel-content">
      {(activeSection === 'overview' || activeSection === 'dashboard') && (
        <DashboardOverview
          onSwitchSection={onSectionChange}
          onNotify={onNotify}
          onProfileUpdated={onProfileUpdated}
          onOpenNewProject={() => onSectionChange('projects', 'new')}
          onOpenNewSkill={() => onSectionChange('skills', 'new')}
          onOpenNewExperience={() => onSectionChange('experience', 'new')}
          onOpenNewCert={() => onSectionChange('training', 'new')}
        />
      )}

      {activeSection === 'profile' && (
        <ProfileManagement
          onNotify={onNotify}
          onProfileUpdated={onProfileUpdated}
        />
      )}

      {activeSection === 'about' && (
        <AboutManagement onNotify={onNotify} />
      )}

      {activeSection === 'skills' && (
        <SkillsManagement
          onNotify={onNotify}
          initialModalOpen={openModalInTab === 'new'}
        />
      )}

      {activeSection === 'projects' && (
        <ProjectsManagement
          onNotify={onNotify}
          initialModalOpen={openModalInTab === 'new'}
        />
      )}

      {activeSection === 'experience' && (
        <ExperienceManagement
          onNotify={onNotify}
          initialModalOpen={openModalInTab === 'new'}
        />
      )}

      {(activeSection === 'training' || activeSection === 'certifications') && (
        <TrainingManagement
          onNotify={onNotify}
          initialModalOpen={openModalInTab === 'new'}
        />
      )}

      {activeSection === 'messages' && (
        <ContactMessages
          onNotify={onNotify}
          onMessagesUpdated={onMessagesUpdated}
        />
      )}

      {activeSection === 'settings' && (
        <SettingsManagement onNotify={onNotify} />
      )}
    </div>
  );
}
