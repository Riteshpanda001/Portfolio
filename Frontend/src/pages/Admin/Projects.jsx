import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS as DEFAULT_PROJECTS } from '../../data/projects';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../services/projectService';
import Button from '../../components/Button/Button';
import './Admin.css';

// ============================================================
// Admin — Projects Management
// ============================================================

export default function AdminProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [search, setSearch] = useState('');
  const [editModal, setEditModal] = useState(null); // null, 'new', or project object
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    status: 'Incomplete',
    problem: '',
    solution: '',
    keyLearnings: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getAllProjects();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
    } catch {
      // Keep local defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openNewModal = () => {
    setFormData({
      title: '',
      category: 'AI / Machine Learning',
      status: 'Incomplete',
      problem: '',
      solution: '',
      keyLearnings: '',
      technologies: 'Python, Machine Learning, React',
      githubUrl: 'https://github.com/Riteshpanda001',
      liveUrl: '',
      featured: false,
    });
    setEditModal('new');
  };

  const openEditModal = (project) => {
    setFormData({
      id: project.id || project._id,
      title: project.title || '',
      category: project.category || '',
      status: project.status || 'Completed',
      problem: project.problem || project.description || '',
      solution: project.solution || project.longDescription || '',
      keyLearnings: project.keyLearnings || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : (project.tags || []).join(', '),
      githubUrl: project.githubUrl || project.github || '',
      liveUrl: project.liveUrl || project.live || '',
      featured: Boolean(project.featured),
    });
    setEditModal(project);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFeedback({ message: 'Project title is required.', type: 'error' });
      return;
    }

    setSaving(true);
    setFeedback({ message: '', type: '' });

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      category: formData.category,
      status: formData.status,
      problem: formData.problem,
      solution: formData.solution,
      keyLearnings: formData.keyLearnings,
      technologies: techArray,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl || null,
      featured: formData.featured,
    };

    try {
      if (editModal === 'new') {
        const newProj = await createProject(payload).catch(() => ({
          ...payload,
          id: 'proj-' + Date.now(),
        }));
        setProjects((prev) => [newProj, ...prev]);
        setFeedback({ message: 'Project created successfully!', type: 'success' });
      } else {
        const targetId = formData.id;
        const updated = await updateProject(targetId, payload).catch(() => ({
          ...editModal,
          ...payload,
        }));
        setProjects((prev) =>
          prev.map((p) => ((p.id || p._id) === targetId ? { ...p, ...updated } : p))
        );
        setFeedback({ message: 'Project updated successfully!', type: 'success' });
      }
      setTimeout(() => {
        setEditModal(null);
        setFeedback({ message: '', type: '' });
      }, 1000);
    } catch {
      setFeedback({ message: 'Failed to save project. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id).catch(() => {});
      setProjects((prev) => prev.filter((p) => (p.id || p._id) !== id));
      setFeedback({ message: 'Project removed.', type: 'success' });
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    } catch {
      setFeedback({ message: 'Failed to delete project.', type: 'error' });
    }
  };

  const toggleFeatured = (id) => {
    setProjects((prev) =>
      prev.map((p) => {
        if ((p.id || p._id) === id) {
          const nextFeatured = !p.featured;
          updateProject(id, { ...p, featured: nextFeatured }).catch(() => {});
          return { ...p, featured: nextFeatured };
        }
        return p;
      })
    );
  };

  const toggleStatus = (id) => {
    setProjects((prev) =>
      prev.map((p) => {
        if ((p.id || p._id) === id) {
          const nextStatus = p.status === 'Completed' ? 'Incomplete' : 'Completed';
          updateProject(id, { ...p, status: nextStatus }).catch(() => {});
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const filtered = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page section">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">Manage Projects</h1>
            <p>Add, edit, toggle featured status, or delete portfolio projects.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Button onClick={openNewModal} size="sm">
              + New Project
            </Button>
            <Link to="/admin" className="btn btn--ghost btn--sm">
              ← Dashboard
            </Link>
          </div>
        </div>

        {feedback.message && (
          <div
            className={`card`}
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

        {/* Search bar */}
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title or category..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Project Table / List */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Project Title</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Category</th>
                  <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>Status</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Featured</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((proj) => {
                  const id = proj.id || proj._id;
                  const isCompleted = proj.status === 'Completed';
                  return (
                    <tr
                      key={id}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                    >
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#ffffff' }}>
                        {proj.title}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>
                        {proj.category || 'General'}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                        <button
                          type="button"
                          onClick={() => toggleStatus(id)}
                          title="Click to toggle status"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            lineHeight: 1,
                            cursor: 'pointer',
                            background: isCompleted
                              ? 'rgba(74, 222, 128, 0.12)'
                              : 'rgba(251, 191, 36, 0.12)',
                            color: isCompleted ? '#4ade80' : '#fbbf24',
                            border: `1px solid ${
                              isCompleted
                                ? 'rgba(74, 222, 128, 0.35)'
                                : 'rgba(251, 191, 36, 0.35)'
                            }`,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              background: isCompleted ? '#4ade80' : '#fbbf24',
                              display: 'inline-block',
                            }}
                          />
                          {proj.status || 'In Development'}
                        </button>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <button
                          type="button"
                          onClick={() => toggleFeatured(id)}
                          style={{
                            background: proj.featured ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${proj.featured ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)'}`,
                            color: proj.featured ? '#818cf8' : '#94a3b8',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {proj.featured ? '⭐ Featured' : '☆ Standard'}
                        </button>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <Link
                            to={`/projects/${id}`}
                            className="btn btn--ghost btn--sm"
                            target="_blank"
                            title="Preview"
                          >
                            👁️
                          </Link>
                          <button
                            onClick={() => openEditModal(proj)}
                            className="btn btn--secondary btn--sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="btn btn--danger btn--sm"
                            style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit / New Modal */}
        {editModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 8, 18, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setEditModal(null)}
          >
            <div
              className="card"
              style={{
                maxWidth: '640px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2rem',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#ffffff' }}>
                  {editModal === 'new' ? 'Add New Project' : 'Edit Project'}
                </h2>
                <button
                  onClick={() => setEditModal(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. AI / Machine Learning"
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                    >
                      <option value="Incomplete">Incomplete</option>
                      <option value="In Development">In Development</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Problem Statement
                  </label>
                  <textarea
                    rows={2}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Solution
                  </label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="Python, React, FastAPI, SQL"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://..."
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <label htmlFor="featured-check" style={{ fontSize: '0.9rem', color: '#ffffff', cursor: 'pointer' }}>
                    Feature this project on the homepage
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <Button variant="ghost" onClick={() => setEditModal(null)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" loading={saving}>
                    {saving ? 'Saving…' : 'Save Project'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
