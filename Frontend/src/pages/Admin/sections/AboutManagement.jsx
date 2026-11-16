import { useState, useEffect } from 'react';
import { profileService } from '../../../services/profileService';

// ============================================================
// AboutManagement — About Page & Bio Highlights Manager
// ============================================================

const DEFAULT_ABOUT = {
  heading: 'About Me — Passionate AI/ML & Software Engineer',
  intro:
    'Computer Science Engineering student at NIST University with proven practical exposure in Generative AI, Large Language Models, and modern Full-Stack engineering.',
  educationSummary:
    'B.Tech in Computer Science and Engineering @ NIST University (2023 - 2027) with deep focus on algorithms, distributed computing, and artificial intelligence.',
};

// Read persisted About content once, up front, so the effect only syncs
// with the external profile API (no synchronous setState inside an effect).
function loadStoredAbout() {
  try {
    const saved = localStorage.getItem('portfolio_about_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        heading: parsed.heading || DEFAULT_ABOUT.heading,
        intro: parsed.intro || DEFAULT_ABOUT.intro,
        educationSummary: parsed.educationSummary || DEFAULT_ABOUT.educationSummary,
      };
    }
  } catch {
    // Ignore malformed storage
  }
  return { ...DEFAULT_ABOUT };
}

export default function AboutManagement({ onNotify }) {
  const [formData, setFormData] = useState(loadStoredAbout);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    profileService
      .getProfile()
      .then((data) => {
        if (!cancelled && data) {
          setFormData((prev) => ({
            ...prev,
            intro: data.bio || prev.intro,
          }));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Update backend profile bio with the intro text
      await profileService.updateProfile({
        bio: formData.intro,
      });

      // Persist to localStorage
      localStorage.setItem('portfolio_about_content', JSON.stringify(formData));

      onNotify?.('About content saved successfully!', 'success');
    } catch (err) {
      onNotify?.(`Error saving content: ${err.message || 'Server error'}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-tab-pane">
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading About page content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2>📝 About Me Content & Highlights</h2>
          <p>Control the narrative, career trajectory, core strengths, and highlights featured on the public About page.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="admin-about-layout">
        {/* Main Editorial Form */}
        <div className="admin-card">
          <h3 className="admin-card__title">Story & Philosophy</h3>

          <div className="admin-field">
            <label className="admin-label">Section Headline</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              className="admin-input"
            />
          </div>

          <div className="admin-field" style={{ marginTop: '1.25rem' }}>
            <label className="admin-label">Introduction Summary</label>
            <textarea
              name="intro"
              rows={4}
              value={formData.intro}
              onChange={handleChange}
              className="admin-textarea"
            />
          </div>

          <div className="admin-field" style={{ marginTop: '1.25rem' }}>
            <label className="admin-label">Education Overview</label>
            <input
              type="text"
              name="educationSummary"
              value={formData.educationSummary}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-actions" style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            disabled={saving}
            className="admin-btn admin-btn--primary admin-btn--lg"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
