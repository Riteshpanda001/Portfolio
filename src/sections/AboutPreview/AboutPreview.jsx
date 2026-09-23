import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button       from '../../components/Button/Button';
import './AboutPreview.css';

export default function AboutPreview() {
  return (
    <section id="about-preview" className="section">
      <div className="container">
        <div className="about-preview__grid">
          <div className="about-preview__text animate-fadeInUp">
            <SectionTitle badge="About" title="Who Am I?" subtitle="" align="left" divider />
            <p>I'm a full-stack developer passionate about building elegant, high-performance web applications that solve real-world problems.</p>
            <p style={{ marginTop: '1rem' }}>With 3+ years of professional experience, I've worked across the entire stack — from pixel-perfect UIs to scalable backend architectures.</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" href="/about">Learn More →</Button>
              <Button variant="ghost" href="/resume">My Resume</Button>
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
