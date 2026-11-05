import { useState, useEffect } from 'react';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../../../services/skillService';
import { getSkillIcon } from '../../../utils/skillIcons';

// ============================================================
// SkillsManagement — Domain-Wise Technical Competencies Manager
// ============================================================
export default function SkillsManagement({ onNotify, initialModalOpen }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states: null, 'new', or skill object
  const [modalState, setModalState] = useState(initialModalOpen ? 'new' : null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // skill to delete
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: 'Machine Learning',
    proficiencyLevel: 85,
    showProficiency: true,
    icon: '⚡',
    featured: true,
    displayOrder: 1,
  });

  const DOMAIN_ORDER = [
    'Machine Learning',
    'Data Analytics',
    'Java & Backend',
    'Frontend',
    'DevOps & Tools',
  ];

  const formatDomainName = (cat) => {
    if (!cat) return 'Other';
    if (cat.toLowerCase() === 'machine learning') return 'AI/ML';
    return cat;
  };

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await getAllSkills();
      if (Array.isArray(data) && data.length > 0) {
        setSkills(data);
      }
    } catch {
      // Keep existing skills
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openNew = (defaultCategory) => {
    const cat = defaultCategory || 'Machine Learning';
    setForm({
      name: '',
      category: cat,
      proficiencyLevel: 85,
      showProficiency: true,
      icon: '⚡',
      featured: true,
      displayOrder: skills.length + 1,
    });
    setModalState('new');
  };

  const openEdit = (skill) => {
    setForm({
      id: skill.id || skill._id,
      name: skill.name || '',
      category: skill.category || 'Machine Learning',
      proficiencyLevel: skill.proficiencyLevel || skill.level || 85,
      showProficiency: skill.showProficiency !== false,
      icon: skill.icon || skill.iconUrl || '⚡',
      featured: Boolean(skill.featured || skill.isFeatured),
      displayOrder: skill.displayOrder || 1,
    });
    setModalState(skill);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      onNotify?.('Skill name is required.', 'error');
      return;
    }
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      category: form.category,
      proficiencyLevel: Number(form.proficiencyLevel),
      icon: form.icon,
      featured: form.featured,
      displayOrder: Number(form.displayOrder) || 1,
    };

    try {
      if (modalState === 'new') {
        const created = await createSkill(payload);
        setSkills((prev) => [...prev, created || { ...payload, id: Date.now() }]);
        onNotify?.(`Skill "${form.name}" added successfully!`, 'success');
      } else {
        const id = modalState.id || modalState._id;
        const updated = await updateSkill(id, payload);
        setSkills((prev) =>
          prev.map((s) => (s.id === id || s._id === id ? { ...s, ...payload, ...updated } : s))
        );
        onNotify?.(`Skill "${form.name}" updated successfully!`, 'success');
      }
      setModalState(null);
    } catch (err) {
      onNotify?.(`Error saving skill: ${err?.message || 'Server error'}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id || deleteConfirm._id;
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id && s._id !== id));
      onNotify?.(`Skill "${deleteConfirm.name}" deleted.`, 'info');
    } catch {
      onNotify?.('Error deleting skill.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Calculate distinct domains to display
  const displayedCategories = Array.from(
    new Set([
      ...DOMAIN_ORDER.filter((cat) =>
        skills.some((s) => (s.category || '').toLowerCase() === cat.toLowerCase())
      ),
      ...skills.map((s) => s.category || 'Other'),
    ])
  );

  // Render a clean skill card with ONLY tech icon + skill name
  const renderSkillCard = (skill) => {
    return (
      <div
        key={skill.id || skill.name}
        className="admin-skill-card"
        onClick={() => openEdit(skill)}
        title={`Click to edit or remove ${skill.name}`}
      >
        <div className="admin-skill-card__icon-wrap">
          {getSkillIcon(skill.name)}
        </div>
        <div className="admin-skill-card__info">
          <h4 className="admin-skill-card__name">{skill.name}</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-tab-pane">
      {/* Pane Header — Clean text */}
      <div className="admin-pane-header">
        <div>
          <h2>Skills & Technologies Management</h2>
          <p>Organize, customize, and manage skills separated by technical domain and competency.</p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading technical competencies...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="admin-empty-state">
          <h3>No skills found</h3>
          <p>Add your first skill to showcase on the portfolio.</p>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            onClick={() => openNew()}
          >
            + Add New Skill
          </button>
        </div>
      ) : (
        /* Domain-Wise Grouped Skills */
        <div className="admin-domains-container">
          {displayedCategories.map((catName) => {
            const domainSkills = skills.filter(
              (s) =>
                (s.category || 'Other').toLowerCase() === catName.toLowerCase()
            );
            if (domainSkills.length === 0) return null;

            const domainLabel = formatDomainName(catName);

            return (
              <div key={catName} className="admin-domain-group">
                <div className="admin-domain-header">
                  <div className="admin-domain-title">
                    <h3 className="admin-domain-name">{domainLabel}</h3>
                  </div>
                  <button
                    type="button"
                    className="admin-domain-add-btn"
                    onClick={() => openNew(catName)}
                    title={`Add skill to ${domainLabel}`}
                  >
                    + Add to {domainLabel}
                  </button>
                </div>

                <div className="admin-skills-grid">
                  {domainSkills.map((skill) => renderSkillCard(skill))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      {modalState && (
        <div className="admin-modal-backdrop" onClick={() => setModalState(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>
                {modalState === 'new'
                  ? 'Add Technical Skill'
                  : `Edit Skill: ${form.name}`}
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
              <div className="admin-field">
                <label className="admin-label">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch, React, SQL, Docker"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Domain / Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="admin-select"
                >
                  <option value="Machine Learning">AI/ML</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Java & Backend">Java & Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="admin-field-checkbox">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                  />
                  <span>Show as Featured skill on home page</span>
                </label>
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
                    Delete Skill
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
                      ? 'Create Skill'
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
        <div
          className="admin-modal-backdrop"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="admin-modal admin-modal--sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal__header">
              <h3>Delete Skill?</h3>
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
                Are you sure you want to remove{' '}
                <strong>{deleteConfirm.name}</strong> from your skills catalog?
              </p>
              <p className="admin-modal__warning">
                This action cannot be undone.
              </p>
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
                Delete Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
