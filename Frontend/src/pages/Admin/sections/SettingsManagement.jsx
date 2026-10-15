import { useState } from 'react';
import { changePassword } from '../../../services/authService';
import { profileService } from '../../../services/profileService';
import { getAllProjects } from '../../../services/projectService';
import { getAllSkills } from '../../../services/skillService';

// ============================================================
// SettingsManagement — Admin Preferences & System Diagnostic Panel
// ============================================================
export default function SettingsManagement({ onNotify }) {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingPassword, setSavingPassword] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 6) {
      onNotify?.('New password must be at least 6 characters.', 'error');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      onNotify?.('Passwords do not match.', 'error');
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      onNotify?.('Admin password updated successfully!', 'success');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      onNotify?.(err.message || 'Error updating password.', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleExportData = async () => {
    setExporting(true);
    try {
      const [profile, projects, skills] = await Promise.all([
        profileService.getProfile().catch(() => ({})),
        getAllProjects().catch(() => []),
        getAllSkills().catch(() => []),
      ]);

      const backup = {
        exportedAt: new Date().toISOString(),
        author: 'Ritesh Kumar Panda',
        profile,
        projects,
        skills,
      };

      const dataStr =
        'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute(
        'download',
        `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      onNotify?.('Portfolio backup JSON downloaded successfully!', 'success');
    } catch {
      onNotify?.('Error exporting portfolio backup data.', 'error');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2>⚙️ System Settings & Security</h2>
          <p>Configure administrator security credentials, perform data backups, and verify environment health.</p>
        </div>
      </div>

      <div className="admin-two-col">
        {/* Security & Password Change */}
        <div className="admin-card">
          <h3 className="admin-card__title">🔐 Security Credentials</h3>
          <p className="admin-card__subtitle">
            Update your master administration password for this portfolio portal.
          </p>

          <form onSubmit={handlePasswordChange} className="admin-settings-form" style={{ marginTop: '1.25rem' }}>
            <div className="admin-field">
              <label className="admin-label">Current Master Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                placeholder="••••••••••••"
                className="admin-input"
              />
            </div>

            <div className="admin-field" style={{ marginTop: '1rem' }}>
              <label className="admin-label">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                placeholder="At least 6 characters"
                className="admin-input"
              />
            </div>

            <div className="admin-field" style={{ marginTop: '1rem' }}>
              <label className="admin-label">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                placeholder="Re-enter new password"
                className="admin-input"
              />
            </div>

            <div className="admin-form-actions" style={{ marginTop: '1.5rem' }}>
              <button
                type="submit"
                disabled={savingPassword}
                className="admin-btn admin-btn--primary"
              >
                {savingPassword ? 'Updating...' : '🔒 Change Password'}
              </button>
            </div>
          </form>
        </div>

        {/* Data Management & Backup */}
        <div className="admin-card">
          <h3 className="admin-card__title">💾 Data Backup & Export</h3>
          <p className="admin-card__subtitle">
            Export a complete JSON snapshot of your skills, projects, and profile data.
          </p>

          <div className="admin-backup-box" style={{ marginTop: '1.25rem' }}>
            <div className="admin-backup-icon">📦</div>
            <p>
              Download an offline backup file containing all current database entities, structured configurations, and content records.
            </p>
            <button
              type="button"
              className="admin-btn admin-btn--secondary"
              onClick={handleExportData}
              disabled={exporting}
              style={{ marginTop: '1rem' }}
            >
              {exporting ? 'Exporting...' : '⬇️ Download JSON Backup'}
            </button>
          </div>

          <div className="admin-divider" style={{ margin: '1.75rem 0' }} />

          <h3 className="admin-card__title">🖥️ Environment Runtime</h3>
          <div className="admin-system-list" style={{ marginTop: '0.75rem' }}>
            <div className="admin-system-item">
              <div className="admin-system-item__info">
                <strong>Backend Platform</strong>
                <span>Spring Boot 3.2.4 • Java 22 SE</span>
              </div>
              <span className="admin-pill admin-pill--blue">Port 5000</span>
            </div>

            <div className="admin-system-item">
              <div className="admin-system-item__info">
                <strong>Frontend Client</strong>
                <span>React 19 • Vite 8 • Vanilla CSS</span>
              </div>
              <span className="admin-pill admin-pill--purple">Port 5173</span>
            </div>

            <div className="admin-system-item">
              <div className="admin-system-item__info">
                <strong>Database Engine</strong>
                <span>In-Memory H2 / PostgreSQL Dialect</span>
              </div>
              <span className="admin-pill admin-pill--green">Auto-synced</span>
            </div>

            <div className="admin-system-item">
              <div className="admin-system-item__info">
                <strong>Session Security</strong>
                <span>JWT Stateless HMAC-SHA512</span>
              </div>
              <span className="admin-pill admin-pill--cyan">24h Expiry</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
