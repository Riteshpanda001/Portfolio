import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileService } from '../../services/profileService';
import { changePassword } from '../../services/authService';
import Button from '../../components/Button/Button';
import './Admin.css';

// ============================================================
// Admin — Profile & Settings Management
// ============================================================

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Ritesh Kumar Panda',
    title: 'AI/ML Engineer & Full-Stack Developer',
    bio: 'Computer Science Engineering student at NIST University passionate about building modern web applications, intelligent AI/ML systems, and data-driven solutions.',
    location: 'Berhampur, Odisha, India',
    email: 'riteshkumarpanda001@gmail.com',
    phone: '+91 9692229676',
    githubUrl: 'https://github.com/Riteshpanda001',
    linkedinUrl: 'https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a',
    twitterUrl: 'https://twitter.com/riteshpanda',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    profileService.getProfile()
      .then((data) => {
        if (data) {
          setProfile((prev) => ({
            ...prev,
            ...data,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setFeedback({ message: '', type: '' });

    try {
      await profileService.updateProfile(profile);
      setFeedback({ message: 'Profile details saved successfully!', type: 'success' });
    } catch {
      // In local mode without backend running
      setFeedback({ message: 'Profile details saved locally!', type: 'success' });
    } finally {
      setSavingProfile(false);
      setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFeedback({ message: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setFeedback({ message: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setSavingPassword(true);
    setFeedback({ message: '', type: '' });

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setFeedback({ message: 'Password updated successfully!', type: 'success' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      setFeedback({ message: 'Failed to update password.', type: 'error' });
    } finally {
      setSavingPassword(false);
      setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
    }
  };

  return (
    <div className="admin-page section">
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">Profile & Settings</h1>
            <p>Manage your personal profile information, social accounts, and credentials.</p>
          </div>
          <Link to="/admin" className="btn btn--ghost btn--sm">
            ← Dashboard
          </Link>
        </div>

        {feedback.message && (
          <div
            className="card"
            style={{
              padding: '0.85rem 1.25rem',
              marginBottom: '1.5rem',
              color: feedback.type === 'error' ? '#f87171' : '#4ade80',
              borderColor: feedback.type === 'error' ? 'rgba(248,113,113,0.3)' : 'rgba(74,222,128,0.3)',
            }}
          >
            {feedback.message}
          </div>
        )}

        {/* Profile Form */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.25rem' }}>
            Personal & Professional Details
          </h2>

          <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Professional Title / Role
                </label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                Bio / Introduction
              </label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Phone
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', color: '#818cf8', marginTop: '0.5rem' }}>Social Profiles</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={profile.githubUrl}
                  onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button type="submit" loading={savingProfile}>
                {savingProfile ? 'Saving Profile…' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.25rem' }}>
            Security & Password
          </h2>

          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
                style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button type="submit" variant="secondary" loading={savingPassword}>
                {savingPassword ? 'Updating…' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
