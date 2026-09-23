import { Link }       from 'react-router-dom';
import SectionTitle   from '../../components/SectionTitle/SectionTitle';
import './SkillsPreview.css';

const SKILLS = [
  { name: 'React',      level: 95, color: '#61DAFB' },
  { name: 'Node.js',    level: 88, color: '#68A063' },
  { name: 'TypeScript', level: 82, color: '#3178C6' },
  { name: 'MongoDB',    level: 80, color: '#47A248' },
  { name: 'PostgreSQL', level: 75, color: '#336791' },
  { name: 'Docker',     level: 70, color: '#2496ED' },
];

export default function SkillsPreview() {
  return (
    <section id="skills-preview" className="section" style={{ background: 'rgba(20,27,45,0.4)' }}>
      <div className="container">
        <SectionTitle badge="Tech Stack" title="Skills & Technologies" subtitle="From intelligent algorithms to modern web interfaces — the tools behind my solutions." />
        <div className="skills-preview__grid stagger">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skills-preview__item animate-fadeInUp">
              <div className="skills-preview__label">
                <span>{skill.name}</span>
                <span className="skills-preview__pct">{skill.level}%</span>
              </div>
              <div className="skills-preview__bar-track">
                <div
                  className="skills-preview__bar-fill"
                  style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, var(--color-accent), ${skill.color})` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
          <Link to="/skills" className="btn btn--secondary btn--md">View All Skills →</Link>
        </div>
      </div>
    </section>
  );
}
