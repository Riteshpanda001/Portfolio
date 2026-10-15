import { useState, useEffect, useRef } from 'react';
import {
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../../../services/certificationService';
import { uploadFile } from '../../../services/uploadService';

const DEFAULT_CERTS = [
  {
    id: 1,
    title: 'Oracle Cloud Infrastructure 2026 Certified Foundations Associate',
    issuingOrganization: 'Oracle University',
    issueDate: '2026-08-11',
    expirationDate: '2028-08-11',
    credentialId: 'ORCL-AI-FOUNDATIONS-2026',
    credentialUrl: 'https://catalog-education.oracle.com',
    badgeUrl: '',
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Data Science & Data Analysis Using Python',
    issuingOrganization: 'NIST University',
    issueDate: '2025-06-11',
    credentialId: 'NIST-DS-2025',
    credentialUrl: '',
    badgeUrl: '',
    displayOrder: 2,
  },
];

// ============================================================
// TrainingManagement — Training, Courses & Certifications Manager
// ============================================================
export default function TrainingManagement({ onNotify, initialModalOpen }) {
  const [certs, setCerts] = useState(DEFAULT_CERTS);
  const [loading, setLoading] = useState(true);

  const [modalState, setModalState] = useState(initialModalOpen ? 'new' : null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingBadge, setUploadingBadge] = useState(false);
  const badgeInputRef = useRef(null);

  const [form, setForm] = useState({
    title: '',
    issuingOrganization: 'Oracle University',
    issueDate: '2026-08-11',
    expirationDate: '2028-08-11',
    credentialId: '',
    credentialUrl: '',
    badgeUrl: '',
    displayOrder: 1,
  });

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const data = await getAllCertifications();
      if (Array.isArray(data) && data.length > 0) {
        setCerts(data);
      }
    } catch {
      // Keep static defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const openNew = () => {
    setForm({
      title: '',
      issuingOrganization: 'Oracle University',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: '',
      badgeUrl: '',
      displayOrder: certs.length + 1,
    });
    setModalState('new');
  };

  const openEdit = (cert) => {
    setForm({
      id: cert.id || cert._id,
      title: cert.title || '',
      issuingOrganization: cert.issuingOrganization || '',
      issueDate: cert.issueDate || '',
      expirationDate: cert.expirationDate || '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
      badgeUrl: cert.badgeUrl || '',
      displayOrder: cert.displayOrder || 1,
    });
    setModalState(cert);
  };

  const handleBadgeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBadge(true);
    try {
      const res = await uploadFile(file);
      if (res?.url) {
        setForm((prev) => ({ ...prev, badgeUrl: res.url }));
        onNotify?.('Certification badge uploaded!', 'success');
      }
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, badgeUrl: reader.result }));
        onNotify?.('Badge loaded for preview.', 'info');
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingBadge(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.issuingOrganization.trim()) {
      onNotify?.('Title and issuing organization are required.', 'error');
      return;
    }
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      issuingOrganization: form.issuingOrganization.trim(),
      issueDate: form.issueDate || null,
      expirationDate: form.expirationDate || null,
      credentialId: form.credentialId,
      credentialUrl: form.credentialUrl,
      badgeUrl: form.badgeUrl,
      displayOrder: Number(form.displayOrder) || 1,
    };

    try {
      if (modalState === 'new') {
        const created = await createCertification(payload);
        setCerts((prev) => [...prev, created || { ...payload, id: Date.now() }]);
        onNotify?.(`Certification "${form.title}" added successfully!`, 'success');
      } else {
        const id = modalState.id || modalState._id;
        const updated = await updateCertification(id, payload);
        setCerts((prev) =>
          prev.map((c) => (c.id === id || c._id === id ? { ...c, ...payload, ...updated } : c))
        );
        onNotify?.(`Certification "${form.title}" updated successfully!`, 'success');
      }
      setModalState(null);
    } catch (err) {
      onNotify?.(`Error saving certification: ${err?.message || 'Server error'}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id || deleteConfirm._id;
    try {
      await deleteCertification(id);
      setCerts((prev) => prev.filter((c) => c.id !== id && c._id !== id));
      onNotify?.(`Certification "${deleteConfirm.title}" deleted.`, 'info');
    } catch {
      onNotify?.('Error deleting certification.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2>🏆 Training & Certifications Management</h2>
          <p>Manage verified industry credentials, university training programs, and cloud certificates.</p>
        </div>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          <span>+</span> Add Certification
        </button>
      </div>

      {loading ? (
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading credentials catalog...</p>
        </div>
      ) : certs.length === 0 ? (
        <div className="admin-empty-state">
          <span className="admin-empty-icon">🏆</span>
          <h3>No certifications added</h3>
          <p>Showcase credentials from Oracle, NIST University, Coursera, or AWS.</p>
          <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
            + Add Certification
          </button>
        </div>
      ) : (
        <div className="admin-certs-grid">
          {certs.map((cert) => (
            <div key={cert.id || cert.title} className="admin-card admin-cert-card">
              <div className="admin-cert-card__badge-wrap">
                {cert.badgeUrl ? (
                  <img src={cert.badgeUrl} alt="" className="admin-cert-card__badge-img" />
                ) : (
                  <div className="admin-cert-card__badge-fallback">🏆</div>
                )}
              </div>

              <div className="admin-cert-card__content">
                <span className="admin-pill admin-pill--yellow">
                  {cert.issuingOrganization || 'Verified Issuer'}
                </span>
                <h3 className="admin-cert-card__title">{cert.title}</h3>

                <div className="admin-cert-card__meta">
                  {cert.issueDate && (
                    <span>
                      Issued: <strong>{cert.issueDate}</strong>
                    </span>
                  )}
                  {cert.expirationDate && (
                    <span>
                      Expires: <strong>{cert.expirationDate}</strong>
                    </span>
                  )}
                  {cert.credentialId && (
                    <span>
                      ID: <code>{cert.credentialId}</code>
                    </span>
                  )}
                </div>

                <div className="admin-cert-card__footer">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn--ghost admin-btn--xs"
                    >
                      Verify Credential ↗
                    </a>
                  ) : (
                    <span />
                  )}

                  <div className="admin-table-actions">
                    <button
                      type="button"
                      className="admin-icon-btn admin-icon-btn--edit"
                      onClick={() => openEdit(cert)}
                      title="Edit Certification"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="admin-icon-btn admin-icon-btn--del"
                      onClick={() => setDeleteConfirm(cert)}
                      title="Delete Certification"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Certification Modal */}
      {modalState && (
        <div className="admin-modal-backdrop" onClick={() => setModalState(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>
                {modalState === 'new'
                  ? '➕ Add Training or Certification'
                  : '✏️ Edit Certification'}
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
                <label className="admin-label">Certification / Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oracle Cloud Infrastructure Foundations Associate"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oracle University, NIST University, Coursera"
                  value={form.issuingOrganization}
                  onChange={(e) =>
                    setForm({ ...form, issuingOrganization: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-field">
                  <label className="admin-label">Issue Date</label>
                  <input
                    type="date"
                    value={form.issueDate}
                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Expiration Date (Optional)</label>
                  <input
                    type="date"
                    value={form.expirationDate}
                    onChange={(e) =>
                      setForm({ ...form, expirationDate: e.target.value })
                    }
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">Credential ID</label>
                <input
                  type="text"
                  placeholder="e.g. 101488118OCI2026CA"
                  value={form.credentialId}
                  onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Credential Verification URL</label>
                <input
                  type="url"
                  placeholder="https://catalog-education.oracle.com/pls/..."
                  value={form.credentialUrl}
                  onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                  className="admin-input"
                />
              </div>

              {/* Badge Image Upload */}
              <div className="admin-field">
                <label className="admin-label">Badge Icon or Certificate Image</label>
                <div className="admin-img-upload-row">
                  {form.badgeUrl && (
                    <img src={form.badgeUrl} alt="Badge" className="admin-badge-img-preview" />
                  )}
                  <input
                    type="file"
                    ref={badgeInputRef}
                    onChange={handleBadgeUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn--secondary"
                    onClick={() => badgeInputRef.current?.click()}
                    disabled={uploadingBadge}
                  >
                    {uploadingBadge ? 'Uploading...' : '📁 Upload Badge'}
                  </button>
                  <input
                    type="url"
                    placeholder="Or enter Badge URL"
                    value={form.badgeUrl}
                    onChange={(e) => setForm({ ...form, badgeUrl: e.target.value })}
                    className="admin-input admin-input--flex"
                  />
                </div>
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
                  {saving ? 'Saving...' : modalState === 'new' ? 'Add Certification' : 'Save Changes'}
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
              <h3>Delete Certification?</h3>
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
                Are you sure you want to remove <strong>{deleteConfirm.title}</strong>?
              </p>
              <p className="admin-modal__warning">This credential will no longer appear on your live site.</p>
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
