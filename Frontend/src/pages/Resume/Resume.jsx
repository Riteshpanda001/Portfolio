import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button from '../../components/Button/Button';
import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN } from '../../utils/constants';
import './Resume.css';

// ============================================================
// Resume Page — Interactive Digital Resume + PDF Options
// ============================================================

export default function Resume() {
  const resumeUrl = '/assets/resume/Ritesh_Panda_Resume.pdf';
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="resume-page" className="section">
      <div className="container">
        <SectionTitle
          badge="Curriculum Vitae"
          title="Interactive Resume"
          subtitle="A complete overview of my engineering background, technical expertise, and career journey."
        />

        <div className="resume-page__actions">
          <Button href={resumeUrl} target="_blank" download icon="↓" iconPosition="right" size="lg">
            Download PDF
          </Button>
          <Button href={resumeUrl} target="_blank" variant="secondary" size="lg" icon="↗" iconPosition="right">
            Open in New Tab
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Get in Touch →
          </Button>
        </div>

        {/* Filter Navigation */}
        <div className="resume-tabs">
          {[
            { id: 'all', label: 'Full Resume' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'skills', label: 'Technical Skills' },
            { id: 'certifications', label: 'Certifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`resume-tab-btn ${activeTab === tab.id ? 'resume-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Digital Resume Sheet */}
        <div className="resume-sheet card animate-fadeInUp">
          {/* Header */}
          <header className="resume-header">
            <div className="resume-header__info">
              <h2 className="resume-name text-gradient">Ritesh Kumar Panda</h2>
              <p className="resume-title">AI/ML Engineer & Full-Stack Developer</p>
              <div className="resume-contact-bar">
                <span>📍 Berhampur, Odisha, India</span>
                <span>•</span>
                <a href={`mailto:${SITE_EMAIL}`}>✉️ {SITE_EMAIL}</a>
                <span>•</span>
                <a href={SITE_GITHUB} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
                <span>•</span>
                <a href={SITE_LINKEDIN} target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
              </div>
            </div>
          </header>

          {/* Profile Summary */}
          {(activeTab === 'all') && (
            <div className="resume-section">
              <h3 className="resume-section-title">Professional Summary</h3>
              <p className="resume-text">
                Computer Science Engineering student at NIST University and aspiring software engineer with hands-on expertise in
                AI/ML engineering, LLM orchestration, Generative AI applications, Java/Spring Boot backend architecture, and modern
                frontend development with React. Driven by building scalable, intelligent solutions to real-world problems.
              </p>
            </div>
          )}

          {/* Experience */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <div className="resume-section">
              <h3 className="resume-section-title">Experience & Internships</h3>

              <div className="resume-item">
                <div className="resume-item__header">
                  <div>
                    <h4 className="resume-item__role">Generative AI Intern</h4>
                    <span className="resume-item__org">Asirudh Software Private Limited</span>
                  </div>
                  <span className="resume-item__date">May 2026 – July 2026</span>
                </div>
                <ul className="resume-bullets">
                  <li>Engineered real-world Generative AI solutions leveraging Python, LLMs, and prompt engineering paradigms.</li>
                  <li>Implemented LangChain orchestration workflows and Retrieval-Augmented Generation (RAG) with vector databases.</li>
                  <li>Bridged backend APIs with AI services for production-grade intelligent workflows.</li>
                </ul>
              </div>

              <div className="resume-item">
                <div className="resume-item__header">
                  <div>
                    <h4 className="resume-item__role">Data Science & Data Analysis (Course)</h4>
                    <span className="resume-item__org">NIST University</span>
                  </div>
                  <span className="resume-item__date">May 2025 – June 2025</span>
                </div>
                <ul className="resume-bullets">
                  <li>Mastered exploratory data analysis, statistical modeling, and data pipelines utilizing Python, Pandas, and NumPy.</li>
                  <li>Delivered end-to-end data processing workflows and actionable analytical reports.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Education */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <div className="resume-section">
              <h3 className="resume-section-title">Education</h3>
              <div className="resume-item">
                <div className="resume-item__header">
                  <div>
                    <h4 className="resume-item__role">B.Tech in Computer Science & Engineering</h4>
                    <span className="resume-item__org">NIST University, Berhampur, Odisha</span>
                  </div>
                  <span className="resume-item__date">2023 – 2027 • CGPA: 8.0 / 10</span>
                </div>
                <p className="resume-item__desc">
                  Core coursework: Data Structures & Algorithms, Artificial Intelligence, Database Management Systems, Software Engineering, Object-Oriented Programming, and Web Development.
                </p>
              </div>

              <div className="resume-item">
                <div className="resume-item__header">
                  <div>
                    <h4 className="resume-item__role">Higher Secondary Education — Science (PCM)</h4>
                    <span className="resume-item__org">Council of Higher Secondary Education, Odisha</span>
                  </div>
                  <span className="resume-item__date">2021 – 2023 • First Division</span>
                </div>
              </div>
            </div>
          )}

          {/* Skills */}
          {(activeTab === 'all' || activeTab === 'skills') && (
            <div className="resume-section">
              <h3 className="resume-section-title">Technical Skills</h3>
              <div className="resume-skills-grid">
                <div className="resume-skill-group">
                  <strong>AI & Machine Learning:</strong>
                  <span>Python, PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy, LLMs, LangChain, RAG, Prompt Engineering</span>
                </div>
                <div className="resume-skill-group">
                  <strong>Backend Development:</strong>
                  <span>Java (Core & Advanced), Spring Boot, Spring Security, JWT, REST APIs, Hibernate / JPA, FastAPI</span>
                </div>
                <div className="resume-skill-group">
                  <strong>Frontend Development:</strong>
                  <span>React.js, JavaScript (ES6+), HTML5, CSS3, Responsive Design, State Management</span>
                </div>
                <div className="resume-skill-group">
                  <strong>Data & Analytics:</strong>
                  <span>SQL, PostgreSQL, MySQL, Power BI, Data Visualization, Exploratory Data Analysis</span>
                </div>
                <div className="resume-skill-group">
                  <strong>Tools & DevOps:</strong>
                  <span>Git, GitHub, Docker, Maven, VS Code, Postman, Linux</span>
                </div>
              </div>
            </div>
          )}

          {/* Certifications */}
          {(activeTab === 'all' || activeTab === 'certifications') && (
            <div className="resume-section">
              <h3 className="resume-section-title">Certifications & Honors</h3>
              <div className="resume-item">
                <div className="resume-item__header">
                  <div>
                    <h4 className="resume-item__role">Agentic AI Certified Foundations Associate</h4>
                    <span className="resume-item__org">Oracle University (OCI)</span>
                  </div>
                  <span className="resume-item__date">2026 – 2028</span>
                </div>
              </div>
              <div className="resume-item">
                <div className="resume-item__header">
                  <div>
                    <h4 className="resume-item__role">Data Science & Data Analysis Using Python</h4>
                    <span className="resume-item__org">NIST University</span>
                  </div>
                  <span className="resume-item__date">2025</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
