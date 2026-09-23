import SectionTitle    from '../../components/SectionTitle/SectionTitle';
import { formatMonthYear } from '../../utils/formatDate';
import './Education.css';

const DEMO_EDUCATION = [
  {
    _id: '1',
    degree: 'Bachelor of Technology — Computer Science',
    institution: 'National Institute of Technology',
    location: 'Rourkela, India',
    startDate: '2018-07-01',
    endDate: '2022-05-31',
    grade: 'CGPA: 8.6 / 10',
    description: 'Focused on Data Structures, Algorithms, Operating Systems, DBMS, and Full-Stack Web Development.',
  },
  {
    _id: '2',
    degree: 'Higher Secondary — Science (PCM)',
    institution: 'DAV Public School',
    location: 'Bhubaneswar, India',
    startDate: '2016-04-01',
    endDate: '2018-03-31',
    grade: 'Percentage: 92.4%',
    description: 'Physics, Chemistry and Mathematics. School topper in Computer Science.',
  },
];

export default function Education() {
  return (
    <section id="education-page" className="section">
      <div className="container">
        <SectionTitle badge="Education" title="Academic Background" subtitle="My formal education and academic achievements." />
        <div className="education-page__list">
          {DEMO_EDUCATION.map((edu, i) => (
            <article key={edu._id} className="education-card card animate-fadeInUp" style={{ animationDelay: `${i*0.12}s` }}>
              <div className="education-card__icon" aria-hidden="true">🎓</div>
              <div className="education-card__body">
                <div className="education-card__header">
                  <h3 className="education-card__degree">{edu.degree}</h3>
                  <span className="badge badge-mint">{edu.grade}</span>
                </div>
                <div className="education-card__meta">
                  <span className="text-gradient">{edu.institution}</span>
                  <span>·</span>
                  <span>{edu.location}</span>
                  <span>·</span>
                  <span>{formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}</span>
                </div>
                <p className="education-card__desc">{edu.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
