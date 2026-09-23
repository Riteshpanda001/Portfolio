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
          badge="About Me"
          title="Who I Am"
          subtitle="A passionate full-stack developer building scalable, elegant web applications."
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
            <h3 className="about-page__greeting">Hello! I'm Ritesh Kumar Panda 👋</h3>
            <p>
              I'm a full-stack developer with a strong passion for creating intuitive and
              high-performance web applications. I love solving complex problems with clean,
              maintainable code and modern technology stacks.
            </p>
            <p>
              When I'm not coding, you'll find me exploring open-source projects, writing
              technical articles, or levelling up my skills through side projects. I believe
              in continuous learning and sharing knowledge with the community.
            </p>
            <p>
              I have experience working with modern frontend frameworks like React, as well
              as backend technologies like Node.js, Express, and databases like MongoDB and
              PostgreSQL. I'm comfortable with the full software development lifecycle — from
              ideation and architecture to deployment and monitoring.
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
