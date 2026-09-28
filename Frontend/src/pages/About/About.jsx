import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button        from '../../components/Button/Button';
import './About.css';

// ============================================================
// About Page
// ============================================================

const STATS = [
  { value: '3+',   label: 'Years Experience' },
  { value: '40+',  label: 'Projects Built' },
  { value: '15+',  label: 'Technologies' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function About() {
  return (
    <section id="about-page" className="section about-page">
      <div className="container">
        <SectionTitle
          badge="Get To Know Me"
          title="About Me"
          subtitle="More than just code — here's my story and what drives me"
        />

        <div className="about-page__grid">
          {/* Left Column - Image & Profile details */}
          <div className="about-page__left-col animate-fadeInUp">
            <div className="about-preview__frame-wrap">
              <div className="about-preview__circle-frame">
                <div className="about-preview__circle-ring" aria-hidden="true" />
                <div className="about-preview__circle-content">
                  <img src="/rkp-icon.svg" alt="Ritesh Kumar Panda" className="about-preview__circle-img" />
                </div>
                <div className="about-preview__circle-glow" aria-hidden="true" />
              </div>
            </div>

            {/* Education Card */}
            <div className="about-preview__edu-card card">
              <div className="about-preview__edu-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div className="about-preview__edu-info">
                <h4>B.Tech in Computer Science & Engineering</h4>
                <p className="about-preview__edu-school">NIST University, Berhampur</p>
                <p className="about-preview__edu-meta">2023 - 2027 &bull; CGPA: 7.5 &bull; Berhampur, Odisha</p>
              </div>
            </div>

            {/* What I Do Best */}
            <div className="about-preview__do-best">
              <h4 className="about-preview__do-best-heading">What I Do Best</h4>
              <div className="about-preview__do-best-grid">
                <div className="about-preview__do-best-card card">
                  <div className="do-best-icon-wrap do-best-icon--ml">🤖</div>
                  <div>
                    <h5>AI/ML Enginnering</h5>
                    <p>Building models that learn from data and make intelligent predictions</p>
                  </div>
                </div>
                <div className="about-preview__do-best-card card">
                  <div className="do-best-icon-wrap do-best-icon--ds">🧬</div>
                  <div>
                    <h5>Data Science</h5>
                    <p>Extracting insights, statistical patterns, and value from complex data</p>
                  </div>
                </div>
                <div className="about-preview__do-best-card card">
                  <div className="do-best-icon-wrap do-best-icon--web">🌐</div>
                  <div>
                    <h5>Web Development</h5>
                    <p>Creating responsive, performant web applications with modern tech</p>
                  </div>
                </div>
                <div className="about-preview__do-best-card card">
                  <div className="do-best-icon-wrap do-best-icon--da">📈</div>
                  <div>
                    <h5>Data Analytics</h5>
                    <p>Transforming raw data into actionable insights and business intelligence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="about-page__content animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            <h3 className="about-page__greeting" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>
              Building Ideas Into Intelligent Solutions
            </h3>
            <p>
              I'm Ritesh Kumar Panda, a Computer Science Engineering student and aspiring software engineer passionate about building modern web applications and intelligent systems that solve real-world problems.
            </p>
            <p style={{ marginTop: '1rem' }}>
              My journey into software development started with curiosity about how technology can transform ideas into useful products. Today, I work across frontend development, backend engineering, AI/ML, and data-driven applications, continuously exploring new technologies and better ways to build.
            </p>
            <p style={{ marginTop: '1rem' }}>
              I enjoy breaking complex problems into simple, reliable solutions. From designing responsive interfaces and developing REST APIs to experimenting with machine learning and building full-stack applications, I approach every project with curiosity, attention to detail, and a mindset of continuous improvement.
            </p>

            <div className="about-page__actions">
              <Button href="/resume/Ritesh_Panda_Resume.pdf" icon="↓" iconPosition="right">
                Download Resume
              </Button>
              <Button variant="secondary" href="#contact">Get in Touch</Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-page__stats stagger">
          {STATS.map((s) => (
            <div key={s.label} className="about-page__stat card animate-fadeInUp">
              <span className="about-page__stat-value text-gradient">{s.value}</span>
              <span className="about-page__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
