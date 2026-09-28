import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button       from '../../components/Button/Button';
import './AboutPreview.css';

export default function AboutPreview() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-preview__grid">
          <div className="about-preview__text animate-fadeInUp">
            <SectionTitle badge="Get To Know Me" title="About Me" subtitle="More than just code — here's my story and what drives me" align="left" divider />
            <h3 className="about-preview__subheading" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>
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
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" href="/about">Learn More →</Button>
            </div>
          </div>

          <div className="about-preview__right-col animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
                <p className="about-preview__edu-meta">2023 - 2027 &bull; CGPA: 8.0 &bull; Berhampur, Odisha</p>
              </div>
            </div>

            {/* What I Do Best */}
            <div className="about-preview__do-best">
              <h4 className="about-preview__do-best-heading">What I Do Best</h4>
              <div className="about-preview__do-best-grid">
                <div className="about-preview__do-best-card card">
                  <div className="do-best-icon-wrap do-best-icon--ml">🤖</div>
                  <div>
                    <h5>AI/ML Engineering</h5>
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
        </div>
      </div>
    </section>
  );
}
