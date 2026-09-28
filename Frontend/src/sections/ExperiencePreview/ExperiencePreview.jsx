import { Link }     from 'react-router-dom';
import SectionTitle  from '../../components/SectionTitle/SectionTitle';
import { formatShortDate } from '../../utils/formatDate';
import './ExperiencePreview.css';

const EXP = [
  { _id:'1', role:'AI/ML & Data Analytics Specialist', company:'Tech Analytics Solutions', startDate:'2023-01-01', endDate: null,          type:'Full-time' },
  { _id:'2', role:'Web Developer',                   company:'Enterprise Software',      startDate:'2021-06-01', endDate:'2022-12-31',   type:'Full-time' },
  { _id:'3', role:'Data & Software Intern',           company:'Innovate Labs',            startDate:'2021-01-01', endDate:'2021-05-31',  type:'Internship' },
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
