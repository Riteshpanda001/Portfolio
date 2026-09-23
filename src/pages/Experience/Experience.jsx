import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { formatShortDate, calcDuration } from '../../utils/formatDate';
import './Experience.css';

// ============================================================
// Experience Page
// ============================================================

const DEMO_EXPERIENCE = [
  {
    _id: '1',
    role: 'Full-Stack Developer',
    company: 'TechCorp Inc.',
    type: 'Full-time',
    startDate: '2023-01-01',
    endDate: null,
    description: 'Led development of microservices architecture, improved API performance by 40%, and mentored junior developers.',
    technologies: ['React', 'Node.js', 'AWS', 'Docker'],
  },
  {
    _id: '2',
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    type: 'Full-time',
    startDate: '2021-06-01',
    endDate: '2022-12-31',
    description: 'Built and maintained React-based SPAs, implemented design systems, and collaborated with UX teams.',
    technologies: ['React', 'TypeScript', 'Redux', 'SASS'],
  },
  {
    _id: '3',
    role: 'Web Developer Intern',
    company: 'Digital Agency Co.',
    type: 'Internship',
    startDate: '2021-01-01',
    endDate: '2021-05-31',
    description: 'Developed client-facing websites and implemented responsive designs using HTML, CSS and JavaScript.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
  },
];

export default function Experience() {
  return (
    <section id="experience-page" className="section">
      <div className="container">
        <SectionTitle
          badge="Experience"
          title="Work History"
          subtitle="My professional journey and the companies I've had the pleasure to work with."
        />

        <div className="experience-page__timeline">
          {DEMO_EXPERIENCE.map((exp, i) => (
            <article
              key={exp._id}
              className="experience-card card animate-fadeInUp"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Timeline dot */}
              <div className="experience-card__dot" aria-hidden="true" />

              <div className="experience-card__header">
                <div>
                  <h3 className="experience-card__role">{exp.role}</h3>
                  <div className="experience-card__company">
                    <span className="text-gradient">{exp.company}</span>
                    <span className="badge badge-mint">{exp.type}</span>
                  </div>
                </div>
                <div className="experience-card__dates">
                  <span>{formatShortDate(exp.startDate)}</span>
                  <span>—</span>
                  <span>{exp.endDate ? formatShortDate(exp.endDate) : 'Present'}</span>
                  <span className="experience-card__duration">
                    ({calcDuration(exp.startDate, exp.endDate)})
                  </span>
                </div>
              </div>

              <p className="experience-card__desc">{exp.description}</p>

              <div className="experience-card__tech">
                {exp.technologies.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
