import { useState, useEffect, useRef } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../../../data/projects';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../../services/projectService';
import { uploadFile } from '../../../services/uploadService';

// ============================================================
// ProjectsManagement — Portfolio Projects & Case Studies Manager
// ============================================================
export default function ProjectsManagement({ onNotify, initialModalOpen }) {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal: null, 'new', or project object
  const [modalState, setModalState] = useState(initialModalOpen ? 'new' : null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: '',
    category: 'AI/ML',
    status: 'Completed',
    description: '',
    problem: '',
    solution: '',
    keyLearnings: '',
    technologies: 'Python, PyTorch, React, FastAPI',
    imageUrl: '',
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: '',
    featured: false,
    displayOrder: 1,
  });

  const categories = [
    'All',
    'AI/ML',
    'Full-Stack',
    'Data Science',
    'Business Intelligence',
  ];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getAllProjects();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
    } catch {
      // Keep static defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getProjectImage = (p) => {
    if (
      p.imageUrl &&
      (p.imageUrl.startsWith('http') ||
        p.imageUrl.startsWith('/assets') ||
        p.imageUrl.startsWith('data:') ||
        p.imageUrl.startsWith('/src'))
    ) {
      return p.imageUrl;
    }
    const match = DEFAULT_PROJECTS.find(
      (dp) =>
        dp.id === p.id ||
        dp.title?.toLowerCase() === p.title?.toLowerCase()
    );
    return match?.imageUrl || p.imageUrl || null;
  };

  const openNew = () => {
    setForm({
      title: '',
      category: categoryFilter !== 'All' ? categoryFilter : 'AI/ML',
      status: 'Completed',
      description: '',
      problem: '',
      solution: '',
      keyLearnings: '',
      technologies: 'Python, Machine Learning, React',
      imageUrl: '',
      githubUrl: 'https://github.com/Riteshpanda001',
      liveUrl: '',
      featured: false,
      displayOrder: projects.length + 1,
    });
    setModalState('new');
  };

  const openEdit = (proj) => {
    const techStr = Array.isArray(proj.technologies)
      ? proj.technologies.join(', ')
      : Array.isArray(proj.tags)
      ? proj.tags.join(', ')
      : proj.technologies || '';

    setForm({
      id: proj.id || proj._id,
      title: proj.title || '',
      category: proj.category || 'AI/ML',
      status: proj.status || 'Completed',
      description: proj.description || '',
      problem: proj.problem || proj.longDescription || '',
      solution: proj.solution || '',
      keyLearnings: proj.keyLearnings || '',
      technologies: techStr,
      imageUrl: proj.imageUrl || proj.image || '',
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featured: Boolean(proj.featured || proj.isFeatured),
      displayOrder: proj.displayOrder || 1,
    });
    setModalState(proj);
  };

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    try {
      const res = await uploadFile(file);
      if (res?.url) {
        setForm((prev) => ({ ...prev, imageUrl: res.url }));
        onNotify?.('Project image uploaded successfully!', 'success');
      }
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result }));
        onNotify?.('Image loaded for preview.', 'info');
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      onNotify?.('Project title is required.', 'error');
      return;
    }
    setSaving(true);

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: form.title.trim(),
      category: form.category,
      status: form.status,
      description: form.description || form.problem,
      longDescription: form.problem || form.solution || form.description,
      problem: form.problem,
      solution: form.solution,
      keyLearnings: form.keyLearnings,
      tags: techArray,
      technologies: techArray,
      imageUrl: form.imageUrl,
      githubUrl: form.githubUrl,
      liveUrl: form.liveUrl,
      isFeatured: form.featured,
      featured: form.featured,
      displayOrder: Number(form.displayOrder) || 1,
    };

    try {
      if (modalState === 'new') {
        const created = await createProject(payload);
        setProjects((prev) => [created || { ...payload, id: Date.now() }, ...prev]);
        onNotify?.(`Project "${form.title}" created successfully!`, 'success');
      } else {
        const id = modalState.id || modalState._id;
        const updated = await updateProject(id, payload);
        setProjects((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? { ...p, ...payload, ...updated } : p))
        );
        onNotify?.(`Project "${form.title}" updated successfully!`, 'success');
      }
      setModalState(null);
    } catch (err) {
      onNotify?.(`Error saving project: ${err?.message || 'Server error'}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id || deleteConfirm._id;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      onNotify?.(`Project "${deleteConfirm.title}" deleted.`, 'info');
    } catch {
      onNotify?.('Error deleting project.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      categoryFilter === 'All' ||
      p.category?.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2>Projects & Case Studies</h2>
          <p>Create, update, or remove live applications, architectural case studies, and engineering prototypes.</p>
        </div>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          <span>+</span> Add New Project
        </button>
      </div>

      {/* Projects List — Premium Responsive Card Grid */}
      {loading ? (
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading projects catalog...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="admin-empty-state">
          <h3>No projects found</h3>
          <p>
            {search || categoryFilter !== 'All'
              ? 'Try adjusting your search criteria.'
              : 'Add your first project showcase.'}
          </p>
          <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
            + Add New Project
          </button>
        </div>
      ) : (
        <div className="admin-projects-grid">
          {filteredProjects.map((p) => {
            const img = getProjectImage(p);
            const tags = Array.isArray(p.technologies)
              ? p.technologies
              : Array.isArray(p.tags)
              ? p.tags
              : (p.technologies || '').split(',').map((s) => s.trim()).filter(Boolean);

            return (
              <div
                key={p.id || p.title}
                className="admin-project-card"
                onClick={() => openEdit(p)}
                style={{ cursor: 'pointer' }}
                title={`Click to edit ${p.title}`}
              >
                {/* Banner Image Preview */}
                <div className="admin-project-card__img-wrap">
                  {img ? (
                    <img
                      src={img}
                      alt={p.title}
                      className="admin-project-card__img"
                    />
                  ) : (
                    <div className="admin-project-card__placeholder">
                      <span>💻</span>
                      <small>No preview image</small>
                    </div>
                  )}

                  <div className="admin-project-card__badges">
                    <span className="admin-pill admin-pill--blue">
                      {p.category}
                    </span>
                    {(p.featured || p.isFeatured) && (
                      <span className="admin-star-badge" title="Featured Project">
                        ★ Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="admin-project-card__content">
                  <div className="admin-project-card__title-row">
                    <h4 className="admin-project-card__title">{p.title}</h4>
                    <span
                      className={`admin-status-badge ${
                        (p.status || '').toLowerCase() === 'completed'
                          ? 'admin-status-badge--live'
                          : 'admin-status-badge--draft'
                      }`}
                    >
                      {p.status || 'Active'}
                    </span>
                  </div>

                  <p className="admin-project-card__desc">
                    {p.description || p.problem}
                  </p>

                  {/* Clean, separated tech tags */}
                  <div className="admin-project-card__tags">
                    {tags.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="admin-tech-tag">
                        {t}
                      </span>
                    ))}
                    {tags.length > 4 && (
                      <span
                        className="admin-tech-tag"
                        style={{ opacity: 0.75 }}
                      >
                        +{tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Footer Links */}
                  <div className="admin-project-card__footer">
                    <div className="admin-project-card__links">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="View GitHub Repository"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="View Live Application"
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalState && (
        <div className="admin-modal-backdrop" onClick={() => setModalState(null)}>
          <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>
                {modalState === 'new'
                  ? 'Add New Project Showcase'
                  : `Edit Project: ${form.title}`}
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
                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Risk Manager"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                    <option value="AI/ML">AI/ML</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business Intelligence">Business Intelligence</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label className="admin-label">Development Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="admin-select"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Concept">Concept</option>
                  </select>
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Short Description (Cards & Previews)</label>
                  <textarea
                    rows={2}
                    placeholder="Concise 1-2 sentence overview of what this project achieves..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Long Description / Problem Statement</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the architectural challenge, problem addressed, and methodology..."
                    value={form.problem}
                    onChange={(e) => setForm({ ...form, problem: e.target.value })}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Solution & Engineering Implementation</label>
                  <textarea
                    rows={3}
                    placeholder="Explain the solution architecture, models, or algorithms..."
                    value={form.solution}
                    onChange={(e) => setForm({ ...form, solution: e.target.value })}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Python, PyTorch, React, FastAPI, Docker, PostgreSQL"
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Cover / Thumbnail Image</label>
                  <div className="admin-file-upload-row">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleImageFile}
                    />
                    <button
                      type="button"
                      className="admin-btn admin-btn--secondary"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImg}
                    >
                      {uploadingImg ? 'Uploading...' : '📁 Choose Image File'}
                    </button>
                    <input
                      type="url"
                      placeholder="Or enter image URL (https://...)"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      className="admin-input admin-input--flex"
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label className="admin-label">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/Riteshpanda001/..."
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Live Demo URL (optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field-checkbox" style={{ alignSelf: 'center', marginTop: '1rem' }}>
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    />
                    <span>Feature this project on Homepage</span>
                  </label>
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
                    🗑️ Delete Project
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
                    {saving ? 'Saving...' : modalState === 'new' ? 'Create Project' : 'Save Changes'}
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
              <h3>Delete Project?</h3>
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
                Are you sure you want to permanently delete{' '}
                <strong>{deleteConfirm.title}</strong>?
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
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
