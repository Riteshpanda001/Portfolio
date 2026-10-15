import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  FileText,
  Camera,
  Edit3,
  ExternalLink,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Check,
} from 'lucide-react';
import { profileService } from '../../../services/profileService';
import { uploadFile } from '../../../services/uploadService';
import { usePortfolio } from '../../../context/PortfolioContext';

// Lucide-style brand SVG icons
function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function TwitterIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

// ============================================================
// UserProfileSection — Modular Profile Management
// ============================================================

export default function UserProfileSection({ onNotify, onProfileUpdated }) {
  const { profile: globalProfile, updateProfileState, refreshProfile } = usePortfolio();

  const [profile, setProfile] = useState(
    globalProfile || {
      name: 'Ritesh Kumar Panda',
      title: 'AI/ML Engineer & Full-Stack Developer',
      bio: 'Computer Science Engineering student at NIST University passionate about building modern web applications, intelligent AI/ML systems, and data-driven solutions.',
      location: 'Berhampur, Odisha, India',
      email: 'riteshkumarpanda001@gmail.com',
      phone: '+91 9692229676',
      githubUrl: 'https://github.com/Riteshpanda001',
      linkedinUrl: 'https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a',
      twitterUrl: '',
      websiteUrl: '',
      avatarUrl: '',
      resumeUrl: '/resume.pdf',
      isAvailableForHire: true,
    }
  );

  // Active modal: null | 'identity' | 'social' | 'resume'
  const [activeModal, setActiveModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingDirectPhoto, setUploadingDirectPhoto] = useState(false);

  // Modal 1 Form: Profile & Identity
  const [identityForm, setIdentityForm] = useState({
    name: profile.name || '',
    title: profile.title || '',
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    bio: profile.bio || '',
    avatarUrl: profile.avatarUrl || '',
  });
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);

  // Modal 2 Form: Social & Portfolio Links
  const [socialForm, setSocialForm] = useState({
    githubUrl: profile.githubUrl || '',
    linkedinUrl: profile.linkedinUrl || '',
  });

  // Modal 3 Form: Resume & Availability
  const [resumeForm, setResumeForm] = useState({
    resumeUrl: profile.resumeUrl || '',
    isAvailableForHire: Boolean(profile.isAvailableForHire),
  });
  const [selectedResumeFile, setSelectedResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState('');

  // Form errors
  const [formErrors, setFormErrors] = useState({});
  const [formErrorMsg, setFormErrorMsg] = useState('');

  // Input refs
  const directPhotoInputRef = useRef(null);
  const modalAvatarInputRef = useRef(null);
  const modalResumeInputRef = useRef(null);

  // Load profile from API on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchProfileData() {
      try {
        const data = await profileService.getProfile();
        if (isMounted && data) {
          setProfile((prev) => {
            const merged = {
              ...prev,
              ...data,
              phone: data.phone || data.phoneNumber || prev.phone,
            };
            updateProfileState?.(merged);
            return merged;
          });
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      }
    }
    fetchProfileData();
    return () => {
      isMounted = false;
    };
  }, [updateProfileState]);

  // ============================================================
  // Modal Open Handlers
  // ============================================================

  const openIdentityModal = () => {
    setIdentityForm({
      name: profile.name || '',
      title: profile.title || '',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      bio: profile.bio || '',
      avatarUrl: profile.avatarUrl || '',
    });
    setPreviewAvatar(null);
    setSelectedAvatarFile(null);
    setFormErrors({});
    setFormErrorMsg('');
    setActiveModal('identity');
  };

  const openSocialModal = () => {
    setSocialForm({
      githubUrl: profile.githubUrl || '',
      linkedinUrl: profile.linkedinUrl || '',
    });
    setFormErrors({});
    setFormErrorMsg('');
    setActiveModal('social');
  };

  const openResumeModal = () => {
    setResumeForm({
      resumeUrl: profile.resumeUrl || '',
      isAvailableForHire: Boolean(profile.isAvailableForHire),
    });
    setSelectedResumeFile(null);
    setResumeFileName('');
    setFormErrors({});
    setFormErrorMsg('');
    setActiveModal('resume');
  };

  const closeModal = () => {
    if (previewAvatar && previewAvatar.startsWith('blob:')) {
      URL.revokeObjectURL(previewAvatar);
    }
    setPreviewAvatar(null);
    setSelectedAvatarFile(null);
    setSelectedResumeFile(null);
    setResumeFileName('');
    setFormErrors({});
    setFormErrorMsg('');
    setActiveModal(null);
  };

  // Direct Photo Select from Header Card
  const handleDirectPhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onNotify?.('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    setUploadingDirectPhoto(true);
    try {
      const uploadRes = await uploadFile(file);
      const newAvatarUrl = uploadRes?.url || '';

      const updatedPayload = {
        ...profile,
        avatarUrl: newAvatarUrl,
      };

      const saved = await profileService.updateProfile(updatedPayload);
      const finalized = {
        ...profile,
        ...(saved || {}),
        avatarUrl: newAvatarUrl,
      };

      setProfile(finalized);
      updateProfileState?.(finalized);
      refreshProfile?.();
      onProfileUpdated?.(finalized);
      onNotify?.('Profile photo updated successfully!', 'success');
    } catch (err) {
      console.error('Direct photo upload error:', err);
      onNotify?.('Failed to upload photo. Please try again.', 'error');
    } finally {
      setUploadingDirectPhoto(false);
      if (directPhotoInputRef.current) {
        directPhotoInputRef.current.value = '';
      }
    }
  };

  // Modal 1 Avatar Select
  const handleModalAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormErrors((prev) => ({ ...prev, avatar: 'Please select a valid image.' }));
      return;
    }

    setSelectedAvatarFile(file);
    const localUrl = URL.createObjectURL(file);
    setPreviewAvatar(localUrl);
    setFormErrors((prev) => ({ ...prev, avatar: null }));
  };

  // Modal 3 Resume Select
  const handleModalResumeFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedResumeFile(file);
    setResumeFileName(file.name);
  };

  // ============================================================
  // Save Handler 1: Profile & Identity
  // ============================================================
  const handleSaveIdentity = async (e) => {
    e.preventDefault();
    if (saving) return;

    const errors = {};
    if (!identityForm.name?.trim()) errors.name = 'Full name is required.';
    if (!identityForm.title?.trim()) errors.title = 'Professional title is required.';
    if (identityForm.email?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identityForm.email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    setFormErrorMsg('');

    try {
      let finalAvatarUrl = identityForm.avatarUrl || profile.avatarUrl || '';

      if (selectedAvatarFile) {
        try {
          const uploadRes = await uploadFile(selectedAvatarFile);
          if (uploadRes?.url) {
            finalAvatarUrl = uploadRes.url;
          }
        } catch (uploadErr) {
          console.warn('Avatar upload failed, retaining current URL', uploadErr);
        }
      }

      // Preserves existing social links and resume/availability
      const payload = {
        name: identityForm.name.trim(),
        title: identityForm.title.trim(),
        bio: identityForm.bio?.trim() || '',
        location: identityForm.location?.trim() || '',
        email: identityForm.email?.trim() || '',
        phone: identityForm.phone?.trim() || '',
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        twitterUrl: profile.twitterUrl || '',
        websiteUrl: profile.websiteUrl || '',
        avatarUrl: finalAvatarUrl,
        resumeUrl: profile.resumeUrl || '',
        isAvailableForHire: Boolean(profile.isAvailableForHire),
      };

      const updated = await profileService.updateProfile(payload);
      const merged = {
        ...profile,
        ...(updated || {}),
        name: payload.name,
        title: payload.title,
        bio: payload.bio,
        location: payload.location,
        email: payload.email,
        phone: payload.phone,
        avatarUrl: finalAvatarUrl,
      };

      setProfile(merged);
      updateProfileState?.(merged);
      refreshProfile?.();
      onProfileUpdated?.(merged);

      onNotify?.('Profile & identity updated successfully!', 'success');
      closeModal();
    } catch (err) {
      console.error('Failed to save identity:', err);
      setFormErrorMsg(err.response?.data?.message || err.message || 'Error updating profile.');
      onNotify?.('Failed to save profile changes.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // Save Handler 2: Social & Portfolio Links
  // ============================================================
  const handleSaveSocial = async (e) => {
    e.preventDefault();
    if (saving) return;

    const errors = {};
    const validateUrl = (url, fieldName) => {
      if (url?.trim() && !/^https?:\/\//i.test(url.trim())) {
        errors[fieldName] = 'URL must start with http:// or https://';
      }
    };

    validateUrl(socialForm.githubUrl, 'githubUrl');
    validateUrl(socialForm.linkedinUrl, 'linkedinUrl');

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    setFormErrorMsg('');

    try {
      // Preserves existing identity and resume/availability
      const payload = {
        name: profile.name,
        title: profile.title,
        bio: profile.bio || '',
        location: profile.location || '',
        email: profile.email || '',
        phone: profile.phone || '',
        githubUrl: socialForm.githubUrl?.trim() || '',
        linkedinUrl: socialForm.linkedinUrl?.trim() || '',
        twitterUrl: '',
        websiteUrl: '',
        avatarUrl: profile.avatarUrl || '',
        resumeUrl: profile.resumeUrl || '',
        isAvailableForHire: Boolean(profile.isAvailableForHire),
      };

      const updated = await profileService.updateProfile(payload);
      const merged = {
        ...profile,
        ...(updated || {}),
        githubUrl: payload.githubUrl,
        linkedinUrl: payload.linkedinUrl,
        twitterUrl: '',
        websiteUrl: '',
      };

      setProfile(merged);
      updateProfileState?.(merged);
      refreshProfile?.();
      onProfileUpdated?.(merged);

      onNotify?.('Social & portfolio links updated successfully!', 'success');
      closeModal();
    } catch (err) {
      console.error('Failed to save social links:', err);
      setFormErrorMsg(err.response?.data?.message || err.message || 'Error updating social links.');
      onNotify?.('Failed to save social links.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // Save Handler 3: Resume & Availability
  // ============================================================
  const handleSaveResume = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    setFormErrorMsg('');

    try {
      let finalResumeUrl = resumeForm.resumeUrl || profile.resumeUrl || '';

      if (selectedResumeFile) {
        try {
          const uploadRes = await uploadFile(selectedResumeFile);
          if (uploadRes?.url) {
            finalResumeUrl = uploadRes.url;
          }
        } catch (uploadErr) {
          console.warn('Resume upload failed, retaining current URL', uploadErr);
        }
      }

      // Preserves existing identity and social links
      const payload = {
        name: profile.name,
        title: profile.title,
        bio: profile.bio || '',
        location: profile.location || '',
        email: profile.email || '',
        phone: profile.phone || '',
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        twitterUrl: profile.twitterUrl || '',
        websiteUrl: profile.websiteUrl || '',
        avatarUrl: profile.avatarUrl || '',
        resumeUrl: finalResumeUrl,
        isAvailableForHire: Boolean(resumeForm.isAvailableForHire),
      };

      const updated = await profileService.updateProfile(payload);
      const merged = {
        ...profile,
        ...(updated || {}),
        resumeUrl: finalResumeUrl,
        isAvailableForHire: payload.isAvailableForHire,
      };

      setProfile(merged);
      updateProfileState?.(merged);
      refreshProfile?.();
      onProfileUpdated?.(merged);

      onNotify?.('Resume & availability settings updated successfully!', 'success');
      closeModal();
    } catch (err) {
      console.error('Failed to save resume settings:', err);
      setFormErrorMsg(err.response?.data?.message || err.message || 'Error updating settings.');
      onNotify?.('Failed to save settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Initials Fallback
  const getInitials = (name) => {
    if (!name) return 'RKP';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="admin-profile-section">
      {/* Hidden file input for header direct photo button */}
      <input
        type="file"
        ref={directPhotoInputRef}
        onChange={handleDirectPhotoSelect}
        accept="image/*"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* ============================================================
          MAIN PROFILE HEADER CARD
          ============================================================ */}
      <div className="admin-profile-header-card">
        <div className="admin-profile-header-card__inner">
          {/* Avatar Frame with Circular Border & Subtle Glow */}
          <div className="admin-profile-header__avatar-container">
            <div className="admin-profile-header__avatar-ring">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="admin-profile-header__avatar-img"
                />
              ) : (
                <div className="admin-profile-header__avatar-fallback">
                  {getInitials(profile.name)}
                </div>
              )}
            </div>

            {profile.isAvailableForHire && (
              <span
                className="admin-profile-header__status-badge"
                title="Available for Opportunities"
              >
                <span className="admin-pulse-dot" /> Available
              </span>
            )}
          </div>

          {/* Profile Identity Details */}
          <div className="admin-profile-header__info">
            <div className="admin-profile-header__title-row">
              <h2 className="admin-profile-header__name text-gradient">
                {profile.name || 'Ritesh Kumar Panda'}
              </h2>
              <span className="admin-profile-badge">
                <Sparkles size={13} style={{ marginRight: '4px' }} /> Verified Admin
              </span>
            </div>

            <p className="admin-profile-header__headline">
              {profile.title || 'AI/ML Engineer & Full-Stack Developer'}
            </p>

            <p className="admin-profile-header__bio">
              {profile.bio ||
                'Computer Science Engineering student at NIST University passionate about building modern web applications, intelligent AI/ML systems, and data-driven solutions.'}
            </p>

            {/* Metadata Chips: Email, Location, Phone */}
            <div className="admin-profile-header__meta">
              {profile.email && (
                <span className="admin-profile-meta-item">
                  <Mail size={15} className="admin-profile-meta-icon" />
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </span>
              )}
              {profile.location && (
                <span className="admin-profile-meta-item">
                  <MapPin size={15} className="admin-profile-meta-icon" />
                  <span>{profile.location}</span>
                </span>
              )}
              {profile.phone && (
                <span className="admin-profile-meta-item">
                  <Phone size={15} className="admin-profile-meta-icon" />
                  <span>{profile.phone}</span>
                </span>
              )}
            </div>

            {/* Social Links & Action Buttons */}
            <div className="admin-profile-header__footer">
              <div className="admin-profile-header__socials">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-social-pill"
                    title="View GitHub"
                  >
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                    <ExternalLink size={12} className="admin-social-pill__ext" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-social-pill"
                    title="View LinkedIn"
                  >
                    <LinkedinIcon size={15} />
                    <span>LinkedIn</span>
                    <ExternalLink size={12} className="admin-social-pill__ext" />
                  </a>
                )}
              </div>

              {/* Action Buttons: Change Photo */}
              <div className="admin-profile-header__actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  onClick={() => directPhotoInputRef.current?.click()}
                  disabled={uploadingDirectPhoto}
                  title="Upload a new profile picture"
                >
                  <Camera size={15} style={{ marginRight: '6px' }} />
                  {uploadingDirectPhoto ? 'Uploading...' : 'Change Photo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          INDEPENDENT PROFILE INFORMATION CARDS GRID (4 Cards)
          ============================================================ */}
      <div className="admin-profile-cards-grid">
        {/* Card 1: Personal Information */}
        <div className="admin-profile-info-card">
          <div className="admin-profile-info-card__header">
            <div className="admin-profile-info-card__title-wrap">
              <span className="admin-profile-info-card__icon" style={{ color: '#6C63FF' }}>
                <User size={20} />
              </span>
              <h3>Personal Information</h3>
            </div>
            <button
              type="button"
              className="admin-card-edit-action"
              onClick={openIdentityModal}
              title="Edit Personal Information"
            >
              <Edit3 size={14} /> Edit
            </button>
          </div>
          <div className="admin-profile-info-card__body">
            <div className="admin-info-item">
              <span className="admin-info-item__label">Full Name</span>
              <span className="admin-info-item__val">{profile.name || 'Not provided'}</span>
            </div>
            <div className="admin-info-item">
              <span className="admin-info-item__label">Email Address</span>
              <span className="admin-info-item__val">{profile.email || 'Not provided'}</span>
            </div>
            <div className="admin-info-item">
              <span className="admin-info-item__label">Phone Number</span>
              <span className="admin-info-item__val">{profile.phone || '+91 9692229676'}</span>
            </div>
            <div className="admin-info-item">
              <span className="admin-info-item__label">Location</span>
              <span className="admin-info-item__val">
                {profile.location || 'Berhampur, Odisha, India'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Professional Summary */}
        <div className="admin-profile-info-card">
          <div className="admin-profile-info-card__header">
            <div className="admin-profile-info-card__title-wrap">
              <span className="admin-profile-info-card__icon" style={{ color: '#00E5C3' }}>
                <Briefcase size={20} />
              </span>
              <h3>Professional Summary</h3>
            </div>
            <button
              type="button"
              className="admin-card-edit-action"
              onClick={openIdentityModal}
              title="Edit Professional Summary"
            >
              <Edit3 size={14} /> Edit
            </button>
          </div>
          <div className="admin-profile-info-card__body">
            <div className="admin-info-item" style={{ gridColumn: 'span 2' }}>
              <span className="admin-info-item__label">Professional Title</span>
              <span className="admin-info-item__val font-semibold text-gradient">
                {profile.title || 'AI/ML Engineer & Full-Stack Developer'}
              </span>
            </div>
            <div className="admin-info-item" style={{ gridColumn: 'span 2' }}>
              <span className="admin-info-item__label">Biography</span>
              <p className="admin-info-item__val admin-info-item__bio-text">
                {profile.bio || 'No biography written yet.'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Social & Portfolio Links (Independent Card with own Edit) */}
        <div className="admin-profile-info-card">
          <div className="admin-profile-info-card__header">
            <div className="admin-profile-info-card__title-wrap">
              <span className="admin-profile-info-card__icon" style={{ color: '#3B82F6' }}>
                <Globe size={20} />
              </span>
              <h3>Social Links</h3>
            </div>
            <button
              type="button"
              className="admin-card-edit-action"
              onClick={openSocialModal}
              title="Edit Social Links"
            >
              <Edit3 size={14} /> Edit
            </button>
          </div>
          <div className="admin-profile-info-card__body">
            <div className="admin-info-item">
              <span className="admin-info-item__label">GitHub Profile</span>
              {profile.githubUrl ? (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-link-row"
                >
                  <GithubIcon size={14} />
                  <span>{profile.githubUrl.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-muted">Not linked</span>
              )}
            </div>

            <div className="admin-info-item">
              <span className="admin-info-item__label">LinkedIn Profile</span>
              {profile.linkedinUrl ? (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-link-row"
                >
                  <LinkedinIcon size={14} />
                  <span>{profile.linkedinUrl.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-muted">Not linked</span>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Resume & Availability (Independent Card with own Edit) */}
        <div className="admin-profile-info-card">
          <div className="admin-profile-info-card__header">
            <div className="admin-profile-info-card__title-wrap">
              <span className="admin-profile-info-card__icon" style={{ color: '#F59E0B' }}>
                <FileText size={20} />
              </span>
              <h3>Resume & Availability</h3>
            </div>
            <button
              type="button"
              className="admin-card-edit-action"
              onClick={openResumeModal}
              title="Edit Resume & Availability"
            >
              <Edit3 size={14} /> Edit
            </button>
          </div>
          <div className="admin-profile-info-card__body">
            <div className="admin-resume-box">
              <div className="admin-resume-box__icon-wrap">
                <FileText size={28} className="text-amber-400" />
              </div>
              <div className="admin-resume-box__details">
                <span className="admin-resume-box__filename">
                  {profile.resumeUrl
                    ? profile.resumeUrl.split('/').pop()
                    : 'Ritesh_Panda_Resume.pdf'}
                </span>
                <span className="admin-resume-box__status">
                  <CheckCircle2 size={13} style={{ color: '#00E5C3', marginRight: '4px' }} />
                  Active on Public Website
                </span>
              </div>
            </div>

            <div className="admin-info-item" style={{ gridColumn: 'span 2' }}>
              <span className="admin-info-item__label">Recruitment Status</span>
              <div style={{ marginTop: '0.25rem' }}>
                {profile.isAvailableForHire ? (
                  <span className="admin-pill admin-pill--green">
                    <Check size={12} style={{ marginRight: '4px' }} /> Available for Opportunities
                  </span>
                ) : (
                  <span className="admin-pill admin-pill--gray">Not Actively Looking</span>
                )}
              </div>
            </div>

            <div className="admin-resume-actions">
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                >
                  <Download size={14} style={{ marginRight: '6px' }} />
                  Preview / Download
                </a>
              )}
              <button
                type="button"
                className="admin-btn admin-btn--ghost admin-btn--sm"
                onClick={openResumeModal}
              >
                <Upload size={14} style={{ marginRight: '6px' }} />
                Update Resume & Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MODAL 1: EDIT PROFILE & IDENTITY (Simplified: No Social/Resume)
          ============================================================ */}
      {activeModal === 'identity' && (
        <div
          className="admin-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="admin-modal admin-modal--lg admin-profile-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal__header">
              <div className="admin-modal__title-wrap">
                <span className="admin-modal__badge">Profile & Identity</span>
                <h3 className="admin-modal__title">Edit Personal & Professional Details</h3>
              </div>
              <button
                type="button"
                className="admin-modal__close"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveIdentity} className="admin-modal__form">
              {formErrorMsg && (
                <div className="admin-alert admin-alert--error">
                  <AlertCircle size={18} />
                  <span>{formErrorMsg}</span>
                </div>
              )}

              {/* Profile Image Row with Instant Preview */}
              <div className="admin-modal-avatar-section">
                <div className="admin-modal-avatar-preview-wrap">
                  {previewAvatar || identityForm.avatarUrl ? (
                    <img
                      src={previewAvatar || identityForm.avatarUrl}
                      alt="Preview"
                      className="admin-modal-avatar-img"
                    />
                  ) : (
                    <div className="admin-modal-avatar-placeholder">
                      {getInitials(identityForm.name)}
                    </div>
                  )}
                  <input
                    type="file"
                    ref={modalAvatarInputRef}
                    onChange={handleModalAvatarFile}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="admin-avatar-overlay-btn"
                    onClick={() => modalAvatarInputRef.current?.click()}
                    title="Change picture"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                <div className="admin-modal-avatar-meta">
                  <strong>Profile Picture</strong>
                  <p>PNG, JPG, or WebP. Displayed across the public portfolio and admin.</p>
                  <div className="admin-btn-group" style={{ marginTop: '0.4rem' }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn--secondary admin-btn--sm"
                      onClick={() => modalAvatarInputRef.current?.click()}
                    >
                      <Upload size={13} style={{ marginRight: '5px' }} /> Choose Image File
                    </button>
                    {(previewAvatar || identityForm.avatarUrl) && (
                      <button
                        type="button"
                        className="admin-btn admin-btn--ghost admin-btn--sm text-red"
                        onClick={() => {
                          setPreviewAvatar(null);
                          setSelectedAvatarFile(null);
                          setIdentityForm((p) => ({ ...p, avatarUrl: '' }));
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {formErrors.avatar && (
                    <span className="admin-error-text">{formErrors.avatar}</span>
                  )}
                </div>
              </div>

              {/* Identity Form Fields */}
              <div className="admin-form-grid-2">
                <div className="admin-field">
                  <label className="admin-label">
                    Full Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    value={identityForm.name}
                    onChange={(e) => {
                      setIdentityForm((prev) => ({ ...prev, name: e.target.value }));
                      if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: null }));
                    }}
                    placeholder="Ritesh Kumar Panda"
                    className={`admin-input ${formErrors.name ? 'admin-input--error' : ''}`}
                    required
                  />
                  {formErrors.name && (
                    <span className="admin-error-text">{formErrors.name}</span>
                  )}
                </div>

                <div className="admin-field">
                  <label className="admin-label">
                    Professional Title <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    value={identityForm.title}
                    onChange={(e) => {
                      setIdentityForm((prev) => ({ ...prev, title: e.target.value }));
                      if (formErrors.title) setFormErrors((prev) => ({ ...prev, title: null }));
                    }}
                    placeholder="AI/ML Engineer & Full-Stack Developer"
                    className={`admin-input ${formErrors.title ? 'admin-input--error' : ''}`}
                    required
                  />
                  {formErrors.title && (
                    <span className="admin-error-text">{formErrors.title}</span>
                  )}
                </div>

                <div className="admin-field">
                  <label className="admin-label">Email Address</label>
                  <input
                    type="email"
                    value={identityForm.email}
                    onChange={(e) => {
                      setIdentityForm((prev) => ({ ...prev, email: e.target.value }));
                      if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: null }));
                    }}
                    placeholder="riteshkumarpanda001@gmail.com"
                    className={`admin-input ${formErrors.email ? 'admin-input--error' : ''}`}
                  />
                  {formErrors.email && (
                    <span className="admin-error-text">{formErrors.email}</span>
                  )}
                </div>

                <div className="admin-field">
                  <label className="admin-label">Phone Number</label>
                  <input
                    type="text"
                    value={identityForm.phone}
                    onChange={(e) =>
                      setIdentityForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="+91 9692229676"
                    className="admin-input"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Location</label>
                  <input
                    type="text"
                    value={identityForm.location}
                    onChange={(e) =>
                      setIdentityForm((prev) => ({ ...prev, location: e.target.value }))
                    }
                    placeholder="Berhampur, Odisha, India"
                    className="admin-input"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Short Biography</label>
                  <textarea
                    rows={4}
                    value={identityForm.bio}
                    onChange={(e) =>
                      setIdentityForm((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    placeholder="Describe your engineering focus, academic journey, and key competencies..."
                    className="admin-textarea"
                  />
                </div>
              </div>

              <div className="admin-modal__actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn--primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="admin-btn-spinner" /> Saving Changes...
                    </>
                  ) : (
                    <>
                      <Check size={16} style={{ marginRight: '6px' }} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 2: EDIT SOCIAL & PORTFOLIO LINKS (Dedicated Modal)
          ============================================================ */}
      {activeModal === 'social' && (
        <div
          className="admin-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="admin-modal admin-modal--md admin-profile-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal__header">
              <div className="admin-modal__title-wrap">
                <span className="admin-modal__badge">Social Links</span>
                <h3 className="admin-modal__title">Edit Social Links</h3>
              </div>
              <button
                type="button"
                className="admin-modal__close"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSocial} className="admin-modal__form">
              {formErrorMsg && (
                <div className="admin-alert admin-alert--error">
                  <AlertCircle size={18} />
                  <span>{formErrorMsg}</span>
                </div>
              )}

              <p className="text-muted text-sm" style={{ marginBottom: '1.25rem' }}>
                Update your public GitHub and LinkedIn profile links.
              </p>

              <div className="admin-form-grid-1">
                <div className="admin-field">
                  <label className="admin-label">GitHub URL</label>
                  <input
                    type="url"
                    value={socialForm.githubUrl}
                    onChange={(e) => {
                      setSocialForm((prev) => ({ ...prev, githubUrl: e.target.value }));
                      if (formErrors.githubUrl)
                        setFormErrors((prev) => ({ ...prev, githubUrl: null }));
                    }}
                    placeholder="https://github.com/Riteshpanda001"
                    className={`admin-input ${formErrors.githubUrl ? 'admin-input--error' : ''}`}
                  />
                  {formErrors.githubUrl && (
                    <span className="admin-error-text">{formErrors.githubUrl}</span>
                  )}
                </div>

                <div className="admin-field">
                  <label className="admin-label">LinkedIn URL</label>
                  <input
                    type="url"
                    value={socialForm.linkedinUrl}
                    onChange={(e) => {
                      setSocialForm((prev) => ({ ...prev, linkedinUrl: e.target.value }));
                      if (formErrors.linkedinUrl)
                        setFormErrors((prev) => ({ ...prev, linkedinUrl: null }));
                    }}
                    placeholder="https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a"
                    className={`admin-input ${formErrors.linkedinUrl ? 'admin-input--error' : ''}`}
                  />
                  {formErrors.linkedinUrl && (
                    <span className="admin-error-text">{formErrors.linkedinUrl}</span>
                  )}
                </div>
              </div>

              <div className="admin-modal__actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn--primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="admin-btn-spinner" /> Saving Links...
                    </>
                  ) : (
                    <>
                      <Check size={16} style={{ marginRight: '6px' }} /> Save Links
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 3: EDIT RESUME & AVAILABILITY (Dedicated Modal)
          ============================================================ */}
      {activeModal === 'resume' && (
        <div
          className="admin-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="admin-modal admin-modal--md admin-profile-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal__header">
              <div className="admin-modal__title-wrap">
                <span className="admin-modal__badge">Resume & Availability</span>
                <h3 className="admin-modal__title">Edit Resume & Career Availability</h3>
              </div>
              <button
                type="button"
                className="admin-modal__close"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveResume} className="admin-modal__form">
              {formErrorMsg && (
                <div className="admin-alert admin-alert--error">
                  <AlertCircle size={18} />
                  <span>{formErrorMsg}</span>
                </div>
              )}

              <p className="text-muted text-sm" style={{ marginBottom: '1.25rem' }}>
                Upload an updated Curriculum Vitae (PDF) and configure your current availability status for recruiters and visitors.
              </p>

              <div className="admin-form-grid-1">
                {/* File Upload Button */}
                <div className="admin-field">
                  <label className="admin-label">Upload New Resume File</label>
                  <input
                    type="file"
                    ref={modalResumeInputRef}
                    onChange={handleModalResumeFile}
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                  />
                  <div className="admin-file-picker-row">
                    <button
                      type="button"
                      className="admin-btn admin-btn--secondary"
                      onClick={() => modalResumeInputRef.current?.click()}
                    >
                      <Upload size={14} style={{ marginRight: '6px' }} />
                      Choose Resume PDF
                    </button>
                    <span className="admin-file-picker-name">
                      {resumeFileName ||
                        resumeForm.resumeUrl?.split('/').pop() ||
                        'No new file chosen'}
                    </span>
                  </div>
                </div>

                {/* Direct Link input */}
                <div className="admin-field">
                  <label className="admin-label">Or Direct Resume Link / Path</label>
                  <input
                    type="text"
                    value={resumeForm.resumeUrl}
                    onChange={(e) =>
                      setResumeForm((prev) => ({ ...prev, resumeUrl: e.target.value }))
                    }
                    placeholder="/assets/resume/Ritesh_Panda_Resume.pdf"
                    className="admin-input"
                  />
                </div>

                {/* Availability Toggle */}
                <div className="admin-field" style={{ marginTop: '0.5rem' }}>
                  <div className="admin-toggle-row">
                    <div>
                      <strong>Available for Opportunities</strong>
                      <p className="text-muted text-xs">
                        Displays an active recruitment badge on the public hero section and header.
                      </p>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={Boolean(resumeForm.isAvailableForHire)}
                        onChange={(e) =>
                          setResumeForm((prev) => ({
                            ...prev,
                            isAvailableForHire: e.target.checked,
                          }))
                        }
                      />
                      <span className="admin-slider" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-modal__actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn--primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="admin-btn-spinner" /> Saving Settings...
                    </>
                  ) : (
                    <>
                      <Check size={16} style={{ marginRight: '6px' }} /> Save Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
