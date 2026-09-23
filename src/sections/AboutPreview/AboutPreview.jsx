import { Link } from 'react-router-dom';
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
          <div className="about-preview__cards stagger">
            {[
              { icon: '🚀', label: 'Fast & Performant', desc: 'Optimized builds and lazy loading' },
              { icon: '🎨', label: 'Beautiful UI',      desc: 'Pixel-perfect, responsive designs' },
              { icon: '🔒', label: 'Secure',            desc: 'Best practices for auth & data' },
              { icon: '♿', label: 'Accessible',        desc: 'WCAG-compliant interfaces' },
            ].map((item) => (
              <div key={item.label} className="about-preview__card card animate-fadeInUp">
                <span className="about-preview__card-icon">{item.icon}</span>
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
