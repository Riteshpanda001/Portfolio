import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle  from '../../components/SectionTitle/SectionTitle';
import Loading       from '../../components/Loading/Loading';
import Button        from '../../components/Button/Button';
import { getSkillIcon } from '../../utils/skillIcons';
import { getSkillsByCategory, createSkill, DEFAULT_SKILLS } from '../../services/skillService';
import './Skills.css';

// ============================================================
// Skills Page
// ============================================================

export default function Skills() {
  const [skillsData, setSkillsData] = useState(DEFAULT_SKILLS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');
  const [customCategory, setCustomCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  const loadSkills = async () => {
    try {
      const data = await getSkillsByCategory();
      if (data && Object.keys(data).length > 0) {
        setSkillsData(data);
      }
    } catch {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const categories = ['All', ...Object.keys(skillsData)];

  const filtered = activeCategory === 'All'
    ? skillsData
    : { [activeCategory]: skillsData[activeCategory] || [] };

  const handleOpenModal = () => {
    setNewSkillName('');
    setNewSkillCategory('Frontend');
    setCustomCategory('');
    setModalError('');
    setShowModal(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      setModalError('Please enter a skill name.');
      return;
    }

    const finalCategory = newSkillCategory === '__custom__'
      ? (customCategory.trim() || 'Other')
      : newSkillCategory;

    setIsSubmitting(true);
    setModalError('');

    try {
      await createSkill({
        name: newSkillName.trim(),
        category: finalCategory,
      });

      // Update local state immediately
      setSkillsData((prev) => {
        const currentList = prev[finalCategory] ? [...prev[finalCategory]] : [];
        if (!currentList.includes(newSkillName.trim())) {
          currentList.push(newSkillName.trim());
        }
        return {
          ...prev,
          [finalCategory]: currentList,
        };
      });

      setShowModal(false);
    } catch (err) {
      setModalError(err.message || 'Failed to add skill.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section id="skills-page" className="section">
      <div className="container">
        {/* Top Header Actions */}
        <div className="skills-page__top-actions">
          <Link to="/admin" className="btn btn--ghost btn--sm skills-page__back-btn">
            ← Back to Dashboard
          </Link>
          <button
            type="button"
            className="btn btn--primary btn--sm skills-page__add-btn"
            onClick={handleOpenModal}
          >
            + Add Skill
          </button>
        </div>

        <SectionTitle
          badge="Skills"
          title="My Tech Stack"
          subtitle="Technologies and tools I work with to build amazing products."
        />

        {/* Filter tabs */}
        <div className="skills-page__filters" role="tablist" aria-label="Skill category filter">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`skills-page__filter-btn ${activeCategory === cat ? 'skills-page__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill groups */}
        {Object.entries(filtered).map(([category, items]) => (
          <div key={category} className="skills-page__group">
            <h3 className="skills-page__group-title">
              <span className="badge">{category}</span>
            </h3>
            <div className="skills-page__grid stagger">
              {(Array.isArray(items) ? items : []).map((skill) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                const skillId = typeof skill === 'string' ? skill : skill._id || skill.name;
                return (
                  <div key={skillId} className="skills-page__card card animate-fadeInUp">
                    <div className="skills-page__card-icon-wrap" aria-hidden="true">
                      {getSkillIcon(skillName)}
                    </div>
                    <span className="skills-page__card-name">{skillName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showModal && (
        <div className="skills-modal__backdrop" onClick={() => setShowModal(false)}>
          <div
            className="skills-modal__card card animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-skill-title"
          >
            <div className="skills-modal__header">
              <h2 id="add-skill-title" className="skills-modal__title">
                ✨ Add New Skill
              </h2>
              <button
                type="button"
                className="skills-modal__close"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="skills-modal__form">
              <div className="skills-modal__field">
                <label htmlFor="skill-name-input">Skill Name *</label>
                <input
                  id="skill-name-input"
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Enter skill name"
                  autoFocus
                  required
                />
              </div>

              <div className="skills-modal__field">
                <label htmlFor="skill-category-select">Category</label>
                <select
                  id="skill-category-select"
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                >
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Java & Backend">Java & Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                  <option value="__custom__">+ Custom Category...</option>
                </select>
              </div>

              {newSkillCategory === '__custom__' && (
                <div className="skills-modal__field">
                  <label htmlFor="custom-category-input">Custom Category Name *</label>
                  <input
                    id="custom-category-input"
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter category name"
                    required
                  />
                </div>
              )}

              {modalError && (
                <div className="skills-modal__error">
                  {modalError}
                </div>
              )}

              <div className="skills-modal__actions">
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
                  {isSubmitting ? 'Adding…' : 'Add Skill'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

