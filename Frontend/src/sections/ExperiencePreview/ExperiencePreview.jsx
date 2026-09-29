import { Link }     from 'react-router-dom';
import SectionTitle  from '../../components/SectionTitle/SectionTitle';
import { formatShortDate } from '../../utils/formatDate';
import './ExperiencePreview.css';

const EXP = [
  { _id:'1', role:'Generative AI Internship',   company:'Asirudh Software Private Limited', startDate:'2026-05-20', endDate:'2026-07-04',   type:'Internship' },
  { _id:'2', role:'Web Development Intern',     company:'Metacraq',             startDate:'2025-01-01', endDate:'2025-03-31',   type:'Internship' },
  { _id:'3', role:'Machine Learning Intern',    company:'CTTC, Bhubaneswar',    startDate:'2024-06-01', endDate:'2024-07-31',   type:'Internship' },
  { _id:'4', role:'Social Media Handler',       company:'NRC, NIT Rourkela',    startDate:'2025-03-01', endDate: null,          type:'Current' },
];

export default function ExperiencePreview() {
  return (
    <section id="experience-preview" className="section" style={{ background: 'rgba(20,27,45,0.4)' }}>
      <div className="container">
        <SectionTitle badge="Career" title="Work & Experience" subtitle="Real-world engineering experience, collaboration, and continuous growth." />
        <div className="exp-preview__list stagger">
          {EXP.map((e, i) => (
            <div key={e._id} className="exp-preview__item card animate-fadeInUp" style={{ animationDelay: `${i*0.1}s` }}>
              <div className="exp-preview__dot" aria-hidden="true" />
              <div className="exp-preview__content">
                <h4 className="exp-preview__role">{e.role}</h4>
                <p className="exp-preview__meta">
                  <span className="text-gradient">{e.company}</span>
                  <span className="badge">{e.type}</span>
                  <span>{formatShortDate(e.startDate)} – {e.endDate ? formatShortDate(e.endDate) : 'Present'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
          <Link to="/experience" className="btn btn--secondary btn--md">Full Work History →</Link>
        </div>
      </div>
    </section>
  );
}
