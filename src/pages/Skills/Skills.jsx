import { useState } from 'react';
import SectionTitle  from '../../components/SectionTitle/SectionTitle';
import Loading       from '../../components/Loading/Loading';
import ErrorMessage  from '../../components/ErrorMessage/ErrorMessage';
import { useSkills } from '../../hooks/useSkills';
import './Skills.css';

// ============================================================
// Skills Page
// ============================================================

export default function Skills() {
  const { skills, loading, error, refetch } = useSkills({ grouped: true });
  const [activeCategory, setActiveCategory] = useState('All');

  // Demo static data when API is unavailable
  const DEMO_SKILLS = {
    'Machine Learning': ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy', 'OpenCV', 'LLMs / RAG'],
    'Data Analytics':  ['SQL', 'Power BI', 'Tableau', 'Data Visualization', 'Exploratory Data Analysis (EDA)', 'Statistical Modeling'],
    'Java & Backend':  ['Java (Core & Advanced)', 'Spring Boot', 'Spring Security', 'REST APIs', 'Microservices', 'Hibernate / JPA'],
    'Frontend':        ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS', 'Redux'],
    'DevOps & Tools':  ['Docker', 'Git / GitHub', 'AWS', 'Linux', 'Postman', 'Maven', 'Vite'],
  };

  const displaySkills = (loading || error || !Object.keys(skills).length)
    ? DEMO_SKILLS
    : skills;

  const categories = ['All', ...Object.keys(displaySkills)];

  const filtered = activeCategory === 'All'
    ? displaySkills
    : { [activeCategory]: displaySkills[activeCategory] };

  if (loading) return <Loading />;

  return (
    <section id="skills-page" className="section">
      <div className="container">
        <SectionTitle
          badge="Skills"
          title="My Tech Stack"
          subtitle="Technologies and tools I work with to build amazing products."
        />

        {error && <ErrorMessage message={error} onRetry={refetch} />}

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
              {(Array.isArray(items) ? items : []).map((skill) => (
                <div key={typeof skill === 'string' ? skill : skill._id} className="skills-page__card card animate-fadeInUp">
                  <div className="skills-page__card-icon" aria-hidden="true">⚡</div>
                  <span className="skills-page__card-name">
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
