import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button    from '../../components/Button/Button';
import { SITE_NAME, SOCIAL_LINKS } from '../../utils/constants';
import { usePortfolio } from '../../context/PortfolioContext';
import './Hero.css';

// ============================================================
// Hero Section
// ============================================================

const ROLES = [
  'AI/ML Engineer',
  'Frontend Engineer',
  'Full-Stack Developer',
  'Software Developer',
  'Data Analyst',
];

const SOCIAL_ICONS = {
  github:   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  linkedin: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 012.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  twitter:  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  mail:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
};

export default function Hero() {
  const { openGmailModal } = usePortfolio();

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullText) {
      speed = 2000;
    } else if (isDeleting && displayText === '') {
      speed = 300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentFullText) {
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        const nextCharCount = isDeleting ? displayText.length - 1 : displayText.length + 1;
        setDisplayText(currentFullText.substring(0, nextCharCount));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleScrollClick = () => {
    const aboutEl = document.getElementById('about-page') || document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" aria-label="Hero introduction">
      {/* Animated background orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="container hero__content">
        {/* Main text */}
        <div className="hero__text">
          <span className="hero__badge badge animate-fadeInUp">AVAILABLE FOR WORK ✨</span>

          <h1 className="hero__heading animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Hi, I'm<br />
            <span className="text-gradient">{SITE_NAME}</span>
          </h1>

          <p className="hero__role animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="hero__role-text">{displayText}</span>
            <span className="hero__typewriter-cursor" aria-hidden="true">|</span>
          </p>

          <p className="hero__subtitle animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            Specializing in AI/ML Engineering, Data Analytics, and Java Full-Stack Development.
            Building intelligent algorithms, data insights, and enterprise-grade web applications.
          </p>

          <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Link to="/projects" className="btn btn--primary btn--lg">
              View My Projects →
            </Link>
            <Link to="/resume" className="btn btn--secondary btn--lg">
              Resume
            </Link>
          </div>

          {/* Social links horizontal row */}
          <div className="hero__socials animate-fadeInUp" style={{ animationDelay: '0.5s' }} role="list" aria-label="Social links">
            {SOCIAL_LINKS.map((s) => {
              const isMail = s.icon === 'mail' || s.url.startsWith('mailto');
              if (isMail) {
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={openGmailModal}
                    className="hero__social-link"
                    role="listitem"
                    aria-label={s.label}
                    title="Open Gmail Box"
                  >
                    {SOCIAL_ICONS[s.icon]}
                  </button>
                );
              }
              return (
                <a
                  key={s.label}
                  href={s.url}
                  className="hero__social-link"
                  role="listitem"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOCIAL_ICONS[s.icon]}
                </a>
              );
            })}
          </div>
        </div>

        {/* Avatar */}
        <div className="hero__avatar-wrap animate-fadeInUp" style={{ animationDelay: '0.2s' }} aria-hidden="true">
          <div className="hero__avatar-ring" />
          <div className="hero__avatar animate-float">
            <img src="/rkp-icon.svg" alt="RKP Logo" style={{ width: '75%', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(123, 44, 191, 0.6))' }} />
          </div>
          <div className="hero__avatar-glow" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero__scroll-indicator"
        onClick={handleScrollClick}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-label="Scroll to About section"
      >
        <div className="hero__scroll-dot" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
