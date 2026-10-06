import { useState, useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { getAllEducation } from '../../services/educationService';
import { formatMonthYear } from '../../utils/formatDate';
import './Education.css';

const DEFAULT_EDUCATION = [
  {
    _id: '1',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'NIST University',
    location: 'Berhampur, Odisha, India',
    startDate: '2023-08-01',
    endDate: '2027-06-30',
    current: true,
    grade: 'CGPA: 8.0 / 10',
    description: 'Pursuing Bachelor of Technology with focus on Data Structures & Algorithms, Artificial Intelligence, Machine Learning, Web Technologies, Database Systems, and Software Engineering.',
  },
  {
    _id: '2',
    degree: 'Higher Secondary Education — Science (PCM)',
    institution: 'Council of Higher Secondary Education',
    location: 'Odisha, India',
    startDate: '2021-06-01',
    endDate: '2023-05-31',
    current: false,
    grade: 'First Division',
    description: 'Coursework in Physics, Chemistry, Mathematics, and Computer Science fundamentals.',
  },
];

export default function Education() {
  const [educationList, setEducationList] = useState(DEFAULT_EDUCATION);

  useEffect(() => {
    getAllEducation()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEducationList(data);
        }
      })
      .catch(() => {
        // Fallback to default
      });
  }, []);

  return (
    <section id="education-page" className="section">
      <div className="container">
        <SectionTitle badge="Education" title="Academic Background" subtitle="My formal education and academic achievements." />
        <div className="education-page__list">
          {educationList.map((edu, i) => (
            <article key={edu._id || edu.id || i} className="education-card card animate-fadeInUp" style={{ animationDelay: `${i * 0.12}s` }}>
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
                  <span>
                    {edu.startDate ? formatMonthYear(edu.startDate) : '2023'} – {edu.current ? 'Present (2027)' : (edu.endDate ? formatMonthYear(edu.endDate) : '2027')}
                  </span>
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
