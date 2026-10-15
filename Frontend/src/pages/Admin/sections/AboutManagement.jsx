import { useState, useEffect } from 'react';
import { profileService } from '../../../services/profileService';

// ============================================================
// AboutManagement — About Page & Bio Highlights Manager
// ============================================================
export default function AboutManagement({ onNotify }) {
  const [formData, setFormData] = useState({
    heading: 'About Me — Passionate AI/ML & Software Engineer',
    intro:
      'Computer Science Engineering student at NIST University with proven practical exposure in Generative AI, Large Language Models, and modern Full-Stack engineering.',
    bio:
      'I am a passionate software engineer and AI enthusiast driven by solving complex challenges through intelligent systems, performant web applications, and scalable backend architectures. I have completed industry-oriented internships in Generative AI at Asirudh Software and achieved credentials including the Oracle Cloud Infrastructure 2026 Certified Foundations Associate.',
    careerGoals:
      'To spearhead innovative AI/ML products and architect production-grade, highly available full-stack systems that positively impact millions of users.',
    educationSummary:
      'B.Tech in Computer Science and Engineering @ NIST University (2023 - 2027) with deep focus on algorithms, distributed computing, and artificial intelligence.',
    highlights: [
      'AI/ML & Generative AI Engineering',
      'B.Tech CSE @ NIST University (2023-2027)',
      'Full-Stack Development (React 19 + Spring Boot 3)',
      'LangChain, Vector DBs, & RAG Architectures',
      'Oracle Cloud Infrastructure Certified Associate',
    ],
  });

  const [newHighlight, setNewHighlight] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    profileService
      .getProfile()
      .then((data) => {
        if (data) {
          setFormData((prev) => ({
            ...prev,
            bio: data.bio || prev.bio,
            highlights:
              Array.isArray(data.highlights) && data.highlights.length > 0
                ? data.highlights
                : prev.highlights,
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    if (formData.highlights.includes(newHighlight.trim())) {
      onNotify?.('Highlight already exists.', 'info');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight.trim()],
    }));
    setNewHighlight('');
  };

  const removeHighlight = (idxToRemove) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== idxToRemove),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Save bio and highlights to backend profile
      await profileService.updateProfile({
        bio: formData.bio,
        highlights: formData.highlights,
      });

      // Also persist to localStorage for client-side enrichment
      localStorage.setItem('portfolio_about_content', JSON.stringify(formData));

      onNotify?.('About content & highlights saved successfully!', 'success');
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
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="admin-btn admin-btn--primary"
        >
          {saving ? 'Saving...' : '💾 Save Changes'}
        </button>
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
              rows={3}
              value={formData.intro}
              onChange={handleChange}
              className="admin-textarea"
            />
          </div>

          <div className="admin-field" style={{ marginTop: '1.25rem' }}>
            <label className="admin-label">In-Depth Professional Bio</label>
            <textarea
              name="bio"
              rows={5}
              value={formData.bio}
              onChange={handleChange}
              className="admin-textarea"
            />
          </div>

          <div className="admin-field" style={{ marginTop: '1.25rem' }}>
            <label className="admin-label">Career Objectives & Vision</label>
            <textarea
              name="careerGoals"
              rows={3}
              value={formData.careerGoals}
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

        {/* Key Highlights Card */}
        <div className="admin-card" style={{ marginTop: '1.5rem' }}>
          <h3 className="admin-card__title">Key Highlights & Badges</h3>
          <p className="admin-card__subtitle">Bulleted items showcased in the About section sidebar</p>

          <div className="admin-tag-input-row" style={{ marginTop: '1rem' }}>
            <input
              type="text"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="e.g. LLM Fine-Tuning & Quantization"
              className="admin-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addHighlight();
                }
              }}
            />
            <button
              type="button"
              className="admin-btn admin-btn--secondary"
              onClick={addHighlight}
            >
              + Add
            </button>
          </div>

          <div className="admin-highlight-chips" style={{ marginTop: '1.25rem' }}>
            {formData.highlights.map((item, idx) => (
              <span key={idx} className="admin-highlight-chip">
                <span>{item}</span>
                <button
                  type="button"
                  className="admin-highlight-chip__del"
                  onClick={() => removeHighlight(idx)}
                  title="Remove highlight"
                >
                  ×
                </button>
              </span>
            ))}
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
