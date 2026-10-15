import { useState, useEffect } from 'react';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../../../services/skillService';

// ============================================================
// SkillsManagement — Technical Competencies Manager
// ============================================================
export default function SkillsManagement({ onNotify, initialModalOpen }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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

  const categories = [
    'All',
    'Machine Learning',
    'Data Analytics',
    'Java & Backend',
    'Frontend',
    'DevOps & Tools',
  ];

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

  const openNew = () => {
    setForm({
      name: '',
      category: activeCategory !== 'All' ? activeCategory : 'Machine Learning',
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

  // Filter skills by category & search
  const filteredSkills = skills.filter((s) => {
    const matchesCat =
      activeCategory === 'All' ||
      s.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.category?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="admin-tab-pane">
      {/* Pane Header */}
      <div className="admin-pane-header">
        <div>
          <h2>🛠️ Skills & Technologies Management</h2>
          <p>Add, edit, reorganize, or remove skills grouped by technical competency categories.</p>
        </div>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          <span>+</span> Add New Skill
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-cat-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`admin-cat-pill ${activeCategory === cat ? 'admin-cat-pill--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
          {search && (
            <button
              type="button"
              className="admin-search-clear"
              onClick={() => setSearch('')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading competencies...</p>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="admin-empty-state">
          <span className="admin-empty-icon">🛠️</span>
          <h3>No skills found</h3>
          <p>
            {search || activeCategory !== 'All'
              ? 'Try modifying your search or category filter.'
              : 'Add your first skill to showcase on the portfolio.'}
          </p>
          <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
            + Add New Skill
          </button>
        </div>
      ) : (
        /* Skills Grid */
        <div className="admin-skills-grid">
          {filteredSkills.map((skill) => {
            const level = skill.proficiencyLevel || skill.level || 85;
            return (
              <div key={skill.id || skill.name} className="admin-skill-card">
                <div className="admin-skill-card__top">
                  <div className="admin-skill-card__icon-wrap">
                    <span className="admin-skill-card__icon">
                      {skill.icon || skill.iconUrl || '⚡'}
                    </span>
                  </div>
                  <div className="admin-skill-card__actions">
                    <button
                      type="button"
                      className="admin-icon-btn admin-icon-btn--edit"
                      onClick={() => openEdit(skill)}
                      title="Edit Skill"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="admin-icon-btn admin-icon-btn--del"
                      onClick={() => setDeleteConfirm(skill)}
                      title="Delete Skill"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="admin-skill-card__info">
                  <h4 className="admin-skill-card__name">{skill.name}</h4>
                  <span className="admin-skill-card__cat">{skill.category}</span>
                </div>

                <div className="admin-skill-card__bar-wrap">
                  <div className="admin-skill-card__bar-meta">
                    <span>Proficiency</span>
                    <strong>{level}%</strong>
                  </div>
                  <div className="admin-progress-track">
                    <div
                      className="admin-progress-fill"
                      style={{ width: `${level}%` }}
                    />
                  </div>
                </div>

                {skill.featured && (
                  <span className="admin-badge admin-badge--purple">★ Featured</span>
                )}
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
              <h3>{modalState === 'new' ? '➕ Add Technical Skill' : '✏️ Edit Skill'}</h3>
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
                  placeholder="e.g. LangChain, React, PostgreSQL"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="admin-select"
                >
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Java & Backend">Java & Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="admin-field">
                <div className="admin-range-header">
                  <label className="admin-label">Proficiency Level</label>
                  <span className="admin-range-val">{form.proficiencyLevel}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={form.proficiencyLevel}
                  onChange={(e) =>
                    setForm({ ...form, proficiencyLevel: Number(e.target.value) })
                  }
                  className="admin-range"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Icon / Emoji</label>
                <div className="admin-icon-picker-row">
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    placeholder="⚡"
                    className="admin-input admin-input--icon"
                  />
                  <div className="admin-quick-emojis">
                    {['⚡', '🐍', '☕', '⚛️', '🧠', '📊', '🐳', '🔥', '☁️', '🗄️'].map(
                      (em) => (
                        <button
                          key={em}
                          type="button"
                          className="admin-emoji-btn"
                          onClick={() => setForm({ ...form, icon: em })}
                        >
                          {em}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-field-checkbox">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  <span>Show as Featured skill on home page</span>
                </label>
              </div>

              <div className="admin-modal__footer">
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
                  {saving ? 'Saving...' : modalState === 'new' ? 'Create Skill' : 'Save Changes'}
                </button>
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
                Are you sure you want to remove <strong>{deleteConfirm.name}</strong> from your skills catalog?
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
                Delete Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
