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
    category: 'AI / Machine Learning',
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
    'AI / Machine Learning',
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

  const openNew = () => {
    setForm({
      title: '',
      category: categoryFilter !== 'All' ? categoryFilter : 'AI / Machine Learning',
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
      category: proj.category || 'AI / Machine Learning',
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
          <h2>📁 Projects & Case Studies</h2>
          <p>Create, update, or remove live applications, architectural case studies, and engineering prototypes.</p>
        </div>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          <span>+</span> Add New Project
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-cat-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`admin-cat-pill ${categoryFilter === cat ? 'admin-cat-pill--active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search projects by title or stack..."
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

      {/* Projects List */}
      {loading ? (
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading projects catalog...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="admin-empty-state">
          <span className="admin-empty-icon">📁</span>
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
        <div className="admin-projects-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Technologies</th>
                <th>Status</th>
                <th>Featured</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => {
                const tags = Array.isArray(p.technologies)
                  ? p.technologies
                  : Array.isArray(p.tags)
                  ? p.tags
                  : (p.technologies || '').split(',').map((s) => s.trim()).filter(Boolean);

                return (
                  <tr key={p.id || p.title}>
                    <td>
                      <div className="admin-proj-td">
                        {p.imageUrl || p.image ? (
                          <img
                            src={p.imageUrl || p.image}
                            alt=""
                            className="admin-proj-thumb"
                          />
                        ) : (
                          <div className="admin-proj-thumb admin-proj-thumb--fallback">📁</div>
                        )}
                        <div>
                          <strong>{p.title}</strong>
                          <p className="admin-proj-desc-clip">{p.description || p.problem}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-pill admin-pill--blue">{p.category}</span>
                    </td>
                    <td>
                      <div className="admin-tag-chips">
                        {tags.slice(0, 3).map((t, i) => (
                          <span key={i} className="admin-mini-chip">
                            {t}
                          </span>
                        ))}
                        {tags.length > 3 && (
                          <span className="admin-mini-chip admin-mini-chip--more">
                            +{tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="admin-status-badge admin-status-badge--live">
                        {p.status || 'Active'}
                      </span>
                    </td>
                    <td>
                      {p.featured || p.isFeatured ? (
                        <span className="admin-star-badge" title="Featured Project">★ Yes</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-table-actions">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-icon-btn"
                            title="View GitHub"
                          >
                            🔗
                          </a>
                        )}
                        <button
                          type="button"
                          className="admin-icon-btn admin-icon-btn--edit"
                          onClick={() => openEdit(p)}
                          title="Edit Project"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="admin-icon-btn admin-icon-btn--del"
                          onClick={() => setDeleteConfirm(p)}
                          title="Delete Project"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalState && (
        <div className="admin-modal-backdrop" onClick={() => setModalState(null)}>
          <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>
                {modalState === 'new'
                  ? '➕ Add New Project Showcase'
                  : '✏️ Edit Project Showcase'}
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
                    <option value="AI / Machine Learning">AI / Machine Learning</option>
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

                {/* Image Upload Area */}
                <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Showcase Image / Thumbnail</label>
                  <div className="admin-img-upload-row">
                    {form.imageUrl && (
                      <img src={form.imageUrl} alt="Preview" className="admin-modal-img-preview" />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFile}
                      accept="image/*"
                      style={{ display: 'none' }}
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
                  {saving ? 'Saving...' : modalState === 'new' ? 'Create Project' : 'Save Changes'}
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
                Are you sure you want to delete <strong>{deleteConfirm.title}</strong>?
              </p>
              <p className="admin-modal__warning">
                This will remove the project from public portfolio views and database storage.
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
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
