import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Experience.css';

// ============================================================
// Experience Data — real internship information only
// ============================================================

const EXPERIENCE = [
  {
    id: 'gen-ai-intern',
    role: 'Generative AI Intern',
    company: 'Asirudh Software Private Limited',
    type: 'Industry-Oriented Internship',
    duration: '45 Days',
    dateRange: 'May 2026 – July 2026',
    description:
      'Completed an industry-oriented Generative AI internship, working on real-world Generative AI projects and gaining practical experience in LLMs, prompt engineering, LangChain, RAG, vector databases, and Python.',
    responsibilities: [
      'Worked on real-world Generative AI projects using Python and modern AI technologies.',
      'Gained practical experience with Large Language Models (LLMs) and Prompt Engineering.',
      'Worked with LangChain for building LLM-powered applications and workflows.',
      'Explored Retrieval-Augmented Generation (RAG) and Vector Database concepts for knowledge-based AI systems.',
      'Applied Generative AI concepts to practical application development and problem-solving.',
    ],
    technologies: [
      'Python',
      'Generative AI',
      'LLMs',
      'Prompt Engineering',
      'LangChain',
      'RAG',
      'Vector Databases',
    ],
  },
  {
    id: 'web-dev-intern',
    role: 'Web Development Intern',
    company: 'Metacraq',
    type: 'Internship',
    duration: '3 Months',
    dateRange: 'Jan 2025 – Mar 2025',
    description:
      'Developed and optimized responsive web applications for enterprise clients, focusing on performance, cross-browser compatibility, and modern JavaScript frameworks. Collaborated with design and backend teams to build seamless user interfaces.',
    responsibilities: [
      'Built responsive web applications using React, HTML5, CSS3, and JavaScript ES6+.',
      'Integrated RESTful APIs for dynamic content rendering and real-time data updates.',
      'Improved page load performance through code optimization and lazy loading.',
      'Ensured cross-browser compatibility across Chrome, Firefox, Safari, and Edge.',
      'Created responsive UI patterns including infinite scroll and skeleton loaders.',
    ],
    technologies: ['React', 'JavaScript', 'REST APIs', 'Responsive Design', 'Performance'],
  },
  {
    id: 'ml-intern',
    role: 'Machine Learning Intern',
    company: 'CTTC, Bhubaneswar',
    type: 'Internship',
    duration: '1 Month',
    dateRange: 'Jun 2024 – Jul 2024',
    description:
      'Gained hands-on experience in developing and training machine learning models on real-world datasets. Worked on data preprocessing, feature engineering, model evaluation, and deploying classification pipelines.',
    responsibilities: [
      'Developed ML classification models achieving 80%+ accuracy on test datasets.',
      'Performed data preprocessing: cleaning, normalization, and feature extraction.',
      'Implemented algorithms using TensorFlow, Keras, and Scikit-learn libraries.',
      'Analyzed and visualized dataset patterns using Pandas, NumPy, and Matplotlib.',
      'Collaborated on real-world AI/ML problem-solving with industry mentors.',
    ],
    technologies: ['Python', 'TensorFlow', 'Machine Learning', 'Data Analysis', 'Model Training'],
  },
  {
    id: 'social-media',
    role: 'Social Media Handler',
    company: 'NRC, NIT Rourkela',
    type: 'Current',
    duration: 'Ongoing',
    dateRange: 'Mar 2025 – Present',
    description:
      'Managing digital presence and content strategy for the NIIT Robotics Club (NRC). Creating engaging content for major robotics events to increase student engagement and event participation.',
    responsibilities: [
      'Managing social media engagement and strategy through consistent content planning.',
      'Created promotional graphics, videos, and copy for robotics competitions.',
      'Managed Instagram, Facebook, and LinkedIn presence for 1000+ followers.',
      'Coordinated with event teams for real-time updates and live coverage.',
    ],
    technologies: ['Content Strategy', 'Social Media', 'Graphic Design', 'Community Management'],
  },
];

// ============================================================
// Experience Page Component
// ============================================================

export default function Experience() {
  return (
    <section id="experience-page" className="section exp-page">
      <div className="container">

        {/* Section Header */}
        <SectionTitle
          badge="Professional Journey"
          title="Experience"
          subtitle="Hands-on experience building and exploring real-world technology solutions."
        />

        {/* Timeline */}
        <div className="exp-timeline">
          {EXPERIENCE.map((exp, i) => (
            <article
              key={exp.id}
              className="exp-card animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Timeline dot */}
              <div className="exp-card__dot" aria-hidden="true" />

              {/* ── Card Header ─────────────────────────────── */}
              <div className="exp-card__header">
                {/* Left: role + company + date */}
                <div className="exp-card__left">
                  <h3 className="exp-card__role">{exp.role}</h3>
                  <div className="exp-card__meta">
                    <span className="exp-card__company">{exp.company}</span>
                    <span className="exp-card__badge">{exp.type}</span>
                  </div>
                  <span className="exp-card__date">{exp.dateRange}</span>
                </div>

                {/* Right: duration pill */}
                <div className="exp-card__right">
                  <span className="exp-card__duration-pill">{exp.duration}</span>
                </div>
              </div>

              {/* ── Divider ──────────────────────────────────── */}
              <div className="exp-card__divider" />

              {/* ── Description ─────────────────────────────── */}
              <p className="exp-card__desc">{exp.description}</p>

              {/* ── Bullet Points ───────────────────────────── */}
              <ul className="exp-card__bullets">
                {exp.responsibilities.map((item, idx) => (
                  <li key={idx} className="exp-card__bullet">
                    <span className="exp-card__bullet-arrow" aria-hidden="true">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* ── Tech Tags ───────────────────────────────── */}
              <div className="exp-card__tags">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="exp-card__tag">{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
