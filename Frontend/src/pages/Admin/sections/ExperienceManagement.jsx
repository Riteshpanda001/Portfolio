import { useState, useEffect } from 'react';
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  DEFAULT_EXPERIENCES,
} from '../../../services/experienceService';

// ============================================================
// ExperienceManagement — Work Experience & Industry Roles Manager
// ============================================================
export default function ExperienceManagement({ onNotify, initialModalOpen }) {
  const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCES);
  const [loading, setLoading] = useState(true);

  // Modal: null, 'new', or experience object
  const [modalState, setModalState] = useState(initialModalOpen ? 'new' : null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    role: '',
    company: '',
    type: 'Industry-Oriented Internship',
    duration: '45 Days',
    dateRange: 'May 2026 – July 2026',
    location: 'Remote / India',
    description: '',
    responsibilities: '',
    technologies: 'Python, Generative AI, LangChain, RAG, Prompt Engineering',
  });

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await getAllExperiences();
      if (Array.isArray(data) && data.length > 0) {
        setExperiences(data);
      }
    } catch {
      // Keep static defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openNew = () => {
    setForm({
      role: '',
      company: '',
      type: 'Industry-Oriented Internship',
      duration: '45 Days',
      dateRange: '',
      location: 'India',
      description: '',
      responsibilities: '',
      technologies: 'Python, Generative AI, LLMs',
    });
    setModalState('new');
  };

  const openEdit = (exp) => {
    const respStr = Array.isArray(exp.responsibilities)
      ? exp.responsibilities.join('\n')
      : exp.responsibilities || '';
    const techStr = Array.isArray(exp.technologies)
      ? exp.technologies.join(', ')
      : exp.technologies || '';

    setForm({
      id: exp.id || exp._id,
      role: exp.role || '',
      company: exp.company || '',
      type: exp.type || 'Internship',
      duration: exp.duration || '',
      dateRange: exp.dateRange || '',
      location: exp.location || 'India',
      description: exp.description || '',
      responsibilities: respStr,
      technologies: techStr,
    });
    setModalState(exp);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.role.trim() || !form.company.trim()) {
      onNotify?.('Role title and company name are required.', 'error');
      return;
    }
    setSaving(true);

    const respArray = form.responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      role: form.role.trim(),
      company: form.company.trim(),
      type: form.type,
      duration: form.duration,
      dateRange: form.dateRange,
      location: form.location,
      description: form.description,
      responsibilities: respArray,
      technologies: techArray,
    };

    try {
      if (modalState === 'new') {
        const created = await createExperience(payload);
        setExperiences((prev) => [created || { ...payload, id: Date.now() }, ...prev]);
        onNotify?.(`Experience at "${form.company}" added successfully!`, 'success');
      } else {
        const id = modalState.id || modalState._id;
        const updated = await updateExperience(id, payload);
        setExperiences((prev) =>
          prev.map((e) => (e.id === id || e._id === id ? { ...e, ...payload, ...updated } : e))
        );
        onNotify?.(`Experience at "${form.company}" updated successfully!`, 'success');
      }
      setModalState(null);
    } catch (err) {
      onNotify?.(`Error saving experience: ${err?.message || 'Server error'}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id || deleteConfirm._id;
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((e) => e.id !== id && e._id !== id));
      onNotify?.(`Experience at "${deleteConfirm.company}" removed.`, 'info');
    } catch {
      onNotify?.('Error deleting experience.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2>💼 Work Experience & Internships</h2>
          <p>Document technical internships, software roles, academic responsibilities, and achievements.</p>
        </div>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          <span>+</span> Add Experience
        </button>
      </div>

      {loading ? (
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading experience history...</p>
        </div>
      ) : experiences.length === 0 ? (
        <div className="admin-empty-state">
          <span className="admin-empty-icon">💼</span>
          <h3>No experience entries yet</h3>
          <p>Add your internships or full-time roles to present your industry readiness.</p>
          <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
            + Add Experience
          </button>
        </div>
      ) : (
        <div className="admin-experience-list">
          {experiences.map((exp) => {
            const resp = Array.isArray(exp.responsibilities)
              ? exp.responsibilities
              : (exp.responsibilities || '').split('\n').filter(Boolean);
            const tech = Array.isArray(exp.technologies)
              ? exp.technologies
              : (exp.technologies || '').split(',').map((s) => s.trim()).filter(Boolean);

            return (
              <div
                key={exp.id || exp.role}
                className="admin-card admin-exp-item"
                onClick={() => openEdit(exp)}
                style={{ cursor: 'pointer' }}
                title={`Click to edit ${exp.role}`}
              >
                <div className="admin-exp-item__top">
                  <div>
                    <span className="admin-pill admin-pill--purple">{exp.type || 'Internship'}</span>
                    <h3 className="admin-exp-item__role">{exp.role}</h3>
                    <h4 className="admin-exp-item__company">
                      {exp.company} <span className="admin-sep">•</span> {exp.location || 'India'}
                    </h4>
                  </div>
                  <div className="admin-exp-item__actions">
                    <span className="admin-exp-item__dates">
                      {exp.dateRange || exp.duration}
                    </span>
                  </div>
                </div>

                {exp.description && (
                  <p className="admin-exp-item__desc">{exp.description}</p>
                )}

                {resp.length > 0 && (
                  <ul className="admin-exp-item__resp-list">
                    {resp.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}

                {tech.length > 0 && (
                  <div className="admin-tag-chips" style={{ marginTop: '1rem' }}>
                    {tech.map((t, i) => (
                      <span key={i} className="admin-mini-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Experience Modal */}
      {modalState && (
        <div className="admin-modal-backdrop" onClick={() => setModalState(null)}>
          <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>
                {modalState === 'new'
                  ? '➕ Add Professional Experience'
                  : '✏️ Edit Professional Experience'}
              </h3>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setModalState(null)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal__form">
              <div className="admin-form-grid-2">
                <div className="admin-field">
                  <label className="admin-label">Role / Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Generative AI Intern"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asirudh Software Private Limited"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Employment Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="admin-select"
                  >
                    <option value="Industry-Oriented Internship">Industry-Oriented Internship</option>
                    <option value="Full-Time Role">Full-Time Role</option>
                    <option value="Part-Time Role">Part-Time Role</option>
                    <option value="Summer Course">Summer Course</option>
                    <option value="Research Project">Research Project</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label className="admin-label">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote / Berhampur, India"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 45 Days, 6 Months"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Date Range</label>
                  <input
                    type="text"
                    placeholder="e.g. May 2026 – July 2026"
                    value={form.dateRange}
                    onChange={(e) => setForm({ ...form, dateRange: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">General Description</label>
                  <textarea
                    rows={2}
                    placeholder="Summary of scope and role objectives..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Key Responsibilities / Bullet Points (one per line)</label>
                  <textarea
                    rows={4}
                    placeholder="• Developed conversational workflows with LangChain&#10;• Implemented RAG pipeline with Vector DB"
                    value={form.responsibilities}
                    onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Technologies Used (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Python, LangChain, RAG, Vector DBs, LLMs"
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div
                className="admin-modal__footer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {modalState !== 'new' ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    onClick={() => {
                      setDeleteConfirm(modalState);
                      setModalState(null);
                    }}
                  >
                    🗑️ Delete Experience
                  </button>
                ) : (
                  <div />
                )}

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost"
                    onClick={() => setModalState(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="admin-btn admin-btn--primary"
                  >
                    {saving
                      ? 'Saving...'
                      : modalState === 'new'
                      ? 'Create Experience'
                      : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>Delete Experience?</h3>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setDeleteConfirm(null)}
              >
                ×
              </button>
            </div>
            <div className="admin-modal__body">
              <p>
                Are you sure you want to remove <strong>{deleteConfirm.role}</strong> at{' '}
                <strong>{deleteConfirm.company}</strong>?
              </p>
              <p className="admin-modal__warning">This action cannot be undone.</p>
            </div>
            <div className="admin-modal__footer">
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={handleDelete}
              >
                Delete Experience
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
