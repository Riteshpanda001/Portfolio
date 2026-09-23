import { Link } from 'react-router-dom';
import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section id="contact-cta" className="contact-cta section">
      <div className="container">
        <div className="contact-cta__inner">
          <div className="contact-cta__orb contact-cta__orb--1" aria-hidden="true" />
          <div className="contact-cta__orb contact-cta__orb--2" aria-hidden="true" />
          <div className="contact-cta__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>Open to Work</span>
            <h2 className="contact-cta__title">
              Have a project in mind?<br />
              <span className="text-gradient">Let's build it together.</span>
            </h2>
            <p className="contact-cta__sub">
              I'm currently available for freelance projects and full-time opportunities.
              Let's create something amazing together.
            </p>
            <div className="contact-cta__actions">
              <Link to="/contact" className="btn btn--primary btn--lg animate-pulse-glow">
                Start a Conversation →
              </Link>
              <a href="mailto:ritesh@example.com" className="btn btn--ghost btn--lg">
                ritesh@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
