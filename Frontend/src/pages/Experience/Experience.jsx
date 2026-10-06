import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { getAllExperiences, createExperience, DEFAULT_EXPERIENCES } from '../../services/experienceService';
import './Experience.css';

// ============================================================
// Experience Page Component
// ============================================================

export default function Experience() {
  const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCES);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    role: '',
    company: '',
    type: 'Industry-Oriented Internship',
    duration: '',
    dateRange: '',
    description: '',
    responsibilities: '',
    technologies: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  const loadExperiences = async () => {
    try {
      const data = await getAllExperiences();
      if (Array.isArray(data) && data.length > 0) {
        setExperiences(data);
      }
    } catch {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleOpenModal = () => {
    setForm({
      role: '',
      company: '',
      type: 'Industry-Oriented Internship',
      duration: '',
      dateRange: '',
      description: '',
      responsibilities: '',
      technologies: '',
    });
    setModalError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!form.role.trim() || !form.company.trim()) {
      setModalError('Please enter both the Role and Company.');
      return;
    }

    setIsSubmitting(true);
    setModalError('');

    try {
      const resp = await createExperience({
        role: form.role.trim(),
        company: form.company.trim(),
        type: form.type.trim() || 'Internship',
        duration: form.duration.trim() || 'Ongoing',
        dateRange: form.dateRange.trim() || 'Present',
        description: form.description.trim(),
        responsibilities: form.responsibilities
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        technologies: form.technologies
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      });

      setExperiences((prev) => [resp, ...prev]);
      setShowModal(false);
    } catch (err) {
      setModalError(err.message || 'Failed to save experience.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section id="experience-page" className="section exp-page">
      <div className="container">
        {/* Top Header Actions */}
        <div className="exp-page__top-actions">
          <Link to="/admin" className="btn btn--ghost btn--sm exp-page__back-btn">
            ← Back to Dashboard
          </Link>
          <button
            type="button"
            className="btn btn--primary btn--sm exp-page__add-btn"
            onClick={handleOpenModal}
          >
            + Add Experience
          </button>
        </div>

        {/* Section Header */}
        <SectionTitle
          badge="EXPERIENCE"
          title="Professional Journey"
          subtitle="Building real-world experience through software development, AI engineering, and continuous learning."
        />

        {/* Timeline */}
        <div className="exp-timeline">
          {experiences.map((exp, i) => {
            const expId = exp.id || exp._id || `exp-${i}`;
            const bullets = Array.isArray(exp.responsibilities) ? exp.responsibilities : [];
            const techs = Array.isArray(exp.technologies) ? exp.technologies : [];

            return (
              <div key={expId} className="exp-journey-item">
                {/* Timeline marker */}
                <motion.div
                  className="exp-journey-marker"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.1, ease: 'easeOut' }}
                />

                {/* Journey Card */}
                <motion.article
                  className="exp-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                >
                  {/* Header */}
                  <div className="exp-card__header">
                    <div className="exp-card__left">
                      <h3 className="exp-card__role">{exp.role}</h3>
                      <div className="exp-card__meta">
                        <span className="exp-card__company">{exp.company}</span>
                        {exp.type && <span className="exp-card__badge">{exp.type}</span>}
                      </div>
                      {exp.dateRange && <span className="exp-card__date">{exp.dateRange}</span>}
                    </div>

                    {exp.duration && (
                      <div className="exp-card__right">
                        <span className="exp-card__duration-pill">{exp.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="exp-card__divider" />

                  {/* Description */}
                  {exp.description && <p className="exp-card__desc">{exp.description}</p>}

                  {/* Bullet Points */}
                  {bullets.length > 0 && (
                    <ul className="exp-card__bullets">
                      {bullets.map((item, idx) => (
                        <li key={idx} className="exp-card__bullet">
                          <span className="exp-card__bullet-arrow" aria-hidden="true">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Tags */}
                  {techs.length > 0 && (
                    <div className="exp-card__tags">
                      {techs.map((tech) => (
                        <span key={tech} className="exp-card__tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Experience Modal */}
      {showModal && (
        <div className="exp-modal__backdrop" onClick={() => setShowModal(false)}>
          <div
            className="exp-modal__card card animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-exp-title"
          >
            <div className="exp-modal__header">
              <h2 id="add-exp-title" className="exp-modal__title">
                💼 Add New Experience
              </h2>
              <button
                type="button"
                className="exp-modal__close"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveExperience} className="exp-modal__form">
              <div className="exp-modal__row">
                <div className="exp-modal__field">
                  <label htmlFor="exp-role">Role / Job Title *</label>
                  <input
                    id="exp-role"
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Enter role title"
                    autoFocus
                    required
                  />
                </div>
                <div className="exp-modal__field">
                  <label htmlFor="exp-company">Company / Institution *</label>
                  <input
                    id="exp-company"
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Enter company or institution"
                    required
                  />
                </div>
              </div>

              <div className="exp-modal__row">
                <div className="exp-modal__field">
                  <label htmlFor="exp-type">Type / Badge</label>
                  <input
                    id="exp-type"
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Internship / Full-Time / Course"
                  />
                </div>
                <div className="exp-modal__field">
                  <label htmlFor="exp-duration">Duration Pill</label>
                  <input
                    id="exp-duration"
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Duration (e.g. 45 Days, 3 Months)"
                  />
                </div>
              </div>

              <div className="exp-modal__field">
                <label htmlFor="exp-daterange">Date Range</label>
                <input
                  id="exp-daterange"
                  type="text"
                  name="dateRange"
                  value={form.dateRange}
                  onChange={handleChange}
                  placeholder="Date range (e.g. May 2026 – July 2026)"
                />
              </div>

              <div className="exp-modal__field">
                <label htmlFor="exp-desc">Overview Description</label>
                <textarea
                  id="exp-desc"
                  name="description"
                  rows="2"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Overview description..."
                />
              </div>

              <div className="exp-modal__field">
                <label htmlFor="exp-responsibilities">Key Bullets / Highlights (1 per line)</label>
                <textarea
                  id="exp-responsibilities"
                  name="responsibilities"
                  rows="3"
                  value={form.responsibilities}
                  onChange={handleChange}
                  placeholder="Bullet 1&#10;Bullet 2"
                />
              </div>

              <div className="exp-modal__field">
                <label htmlFor="exp-tech">Technologies (comma separated)</label>
                <input
                  id="exp-tech"
                  type="text"
                  name="technologies"
                  value={form.technologies}
                  onChange={handleChange}
                  placeholder="Technologies used"
                />
              </div>

              {modalError && <div className="exp-modal__error">{modalError}</div>}

              <div className="exp-modal__actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Saving…' : 'Save Experience'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}


