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
          {/* Image side */}
          <div className="about-page__image-wrap animate-fadeInUp">
            <div className="about-page__image-glow" aria-hidden="true" />
            <div className="about-page__image-placeholder">
              <span>RKP</span>
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
