import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import { useScroll } from '../../hooks/useScroll';
import { usePortfolio } from '../../context/PortfolioContext';
import './Navbar.css';

// ============================================================
// Navbar
// ============================================================

export default function Navbar() {
  const { scrollY } = useScroll();
  const { navOpen, toggleNav, closeNav } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();
  const scrolled = scrollY > 20;

  const [activeSection, setActiveSection] = useState('home');

  // Close nav on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) closeNav(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeNav]);

  // Handle active section tracking on the homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const experienceEl = document.getElementById('experience');
      if (experienceEl) {
        const rect = experienceEl.getBoundingClientRect();
        if (rect.top <= 250 && rect.bottom >= 150) {
          setActiveSection('experience');
          return;
        }
      }

      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        if (rect.top <= 250 && rect.bottom >= 150) {
          setActiveSection('projects');
          return;
        }
      }

      const skillsEl = document.getElementById('skills');
      if (skillsEl) {
        const rect = skillsEl.getBoundingClientRect();
        if (rect.top <= 250 && rect.bottom >= 150) {
          setActiveSection('skills');
          return;
        }
      }

      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        if (rect.top <= 250 && rect.bottom >= 150) {
          setActiveSection('about');
          return;
        }
      }

      if (window.scrollY < 300) {
        setActiveSection('home');
        return;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle hash scrolling when location has #about, #skills, #projects, or #experience
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (e, link) => {
    closeNav();

    if (link.label === 'About') {
      e.preventDefault();
      if (location.pathname === '/') {
        const aboutEl = document.getElementById('about');
        if (aboutEl) {
          aboutEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', '/#about');
          setActiveSection('about');
        }
      } else {
        navigate('/#about');
      }
    } else if (link.label === 'Skills') {
      e.preventDefault();
      if (location.pathname === '/') {
        const skillsEl = document.getElementById('skills');
        if (skillsEl) {
          skillsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', '/#skills');
          setActiveSection('skills');
        }
      } else {
        navigate('/#skills');
      }
    } else if (link.label === 'Projects') {
      e.preventDefault();
      if (location.pathname === '/') {
        const projectsEl = document.getElementById('projects');
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', '/#projects');
          setActiveSection('projects');
        }
      } else {
        navigate('/#projects');
      }
    } else if (link.label === 'Experience') {
      e.preventDefault();
      if (location.pathname === '/') {
        const experienceEl = document.getElementById('experience');
        if (experienceEl) {
          experienceEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', '/#experience');
          setActiveSection('experience');
        }
      } else {
        navigate('/#experience');
      }
    } else if (link.label === 'Home' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      setActiveSection('home');
    }
  };

  const isLinkActive = (link) => {
    if (link.label === 'About') {
      return location.pathname === '/' && (activeSection === 'about' || location.hash === '#about');
    }
    if (link.label === 'Skills') {
      return location.pathname === '/' && (activeSection === 'skills' || location.hash === '#skills');
    }
    if (link.label === 'Projects') {
      return location.pathname === '/' && (activeSection === 'projects' || location.hash === '#projects');
    }
    if (link.label === 'Experience') {
      return location.pathname === '/' && (activeSection === 'experience' || location.hash === '#experience');
    }
    if (link.label === 'Home') {
      return location.pathname === '/' && activeSection === 'home' && !['#about', '#skills', '#projects', '#experience'].includes(location.hash);
    }
    return location.pathname === link.path;
  };

  return (
    <>
      <header id="main-navbar" className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeNav} aria-label="Ritesh Kumar Panda — Home">
            <div className="navbar__logo-content">
              <span className="navbar__logo-text">
                Ritesh Kumar Panda<span className="navbar__logo-dot"></span>
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="navbar__nav" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`navbar__link ${active ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="navbar__actions">
            <Link to="/contact" className="btn btn--primary btn--sm navbar__cta">
              Connect
            </Link>

            <button
              id="navbar-hamburger"
              className={`navbar__hamburger ${navOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={toggleNav}
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle mobile navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${navOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!navOpen}
      >
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`mobile-nav__link ${active ? 'mobile-nav__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Backdrop */}
      {navOpen && (
        <div className="nav-backdrop" onClick={closeNav} aria-hidden="true" />
      )}
    </>
  );
}
