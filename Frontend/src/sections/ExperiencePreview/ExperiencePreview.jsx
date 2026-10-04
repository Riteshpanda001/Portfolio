import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './ExperiencePreview.css';

// ============================================================
// Experience Data — Real Verified Records
// ============================================================

const EXPERIENCES = [
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
    id: 'nist-data-science',
    role: 'Data Science & Data Analysis Using Python',
    company: 'NIST University',
    type: 'Summer Course',
    duration: '22 Days',
    dateRange: '20 May 2025 – 11 June 2025',
    description:
      'Successfully completed a summer course focused on Data Science and Data Analysis using Python, building a foundation in Python-based data analysis and data science concepts.',
    responsibilities: [
      'Python-based data analysis',
      'Data Science fundamentals',
      'Data analysis workflows',
      'Data processing and interpretation',
      'Practical application of Python for data analysis',
    ],
    technologies: ['Python', 'Data Science', 'Data Analysis', 'Data Processing'],
  },
  {
    id: 'oracle-agentic-ai',
    role: 'Agentic AI Certified Foundations Associate',
    company: 'Oracle University',
    type: 'Certification',
    duration: 'Valid 2 Years',
    dateRange: 'August 11, 2026 – August 11, 2028',
    description:
      'Demonstrated foundational knowledge and practical skills in Agentic AI, Autonomous AI agents, LLM orchestration, and Oracle Cloud AI infrastructure.',
    responsibilities: [
      'Validated expertise in Agentic AI architectures, autonomous decision-making agents, and multi-agent workflows.',
      'Demonstrated proficiency in Oracle Cloud Infrastructure (OCI) AI services and LLM integration.',
      'Mastered core principles of agent tool-use, planning, reasoning loops, and prompt engineering.',
      'Earned official certification from Oracle University upon rigorous evaluation of AI concepts and practical implementation.',
    ],
    technologies: ['Agentic AI', 'Oracle Cloud (OCI)', 'LLMs', 'Autonomous Agents', 'AI Infrastructure'],
  },
];

export default function ExperiencePreview() {
  return (
    <section id="experience" className="section exp-section">
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="EXPERIENCE"
          title="Professional Journey"
          subtitle="Building real-world experience through software development, AI engineering, and continuous learning."
        />

        {/* Stack of Experience Cards with Vertical Timeline */}
        <div className="exp-stack exp-timeline">
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.id} className="exp-journey-item">
              {/* Timeline Marker */}
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
                {/* Card Header */}
                <div className="exp-card__header">
                  <div className="exp-card__left">
                    <h3 className="exp-card__role">{exp.role}</h3>
                    <div className="exp-card__meta">
                      <span className="exp-card__company">{exp.company}</span>
                      <span className="exp-card__badge">{exp.type}</span>
                    </div>
                    <span className="exp-card__date">{exp.dateRange}</span>
                  </div>

                  <div className="exp-card__right">
                    <span className="exp-card__duration-pill">{exp.duration}</span>
                  </div>
                </div>

                {/* Top Divider */}
                <div className="exp-card__divider" />

                {/* Description */}
                <p className="exp-card__desc">{exp.description}</p>

                {/* Bullet Points */}
                <ul className="exp-card__bullets">
                  {exp.responsibilities.map((item, idx) => (
                    <li key={idx} className="exp-card__bullet">
                      <span className="exp-card__bullet-arrow" aria-hidden="true">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Divider & Tech Tags */}
                <div className="exp-card__tags">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="exp-card__tag">{tech}</span>
                  ))}
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

