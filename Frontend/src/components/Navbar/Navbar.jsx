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
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      // Check sections from bottom to top to identify current section in view
      const sectionIds = ['contact', 'experience', 'projects', 'skills', 'about'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when section top is near upper viewport and still visible
          if (rect.top <= 260 && rect.bottom >= 140) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle hash scrolling when location has hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(targetId);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (e, link) => {
    closeNav();

    if (link.label === 'Home') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('home');
      }
      return;
    }

    const sectionMap = {
      About: 'about',
      Skills: 'skills',
      Projects: 'projects',
      Experience: 'experience',
      Contact: 'contact',
    };

    const sectionId = sectionMap[link.label];
    if (sectionId && location.pathname === '/') {
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `/#${sectionId}`);
        setActiveSection(sectionId);
      }
    }
  };

  const isLinkActive = (link) => {
    if (location.pathname === '/') {
      const sectionMap = {
        Home: 'home',
        About: 'about',
        Skills: 'skills',
        Projects: 'projects',
        Experience: 'experience',
        Contact: 'contact',
      };
      return activeSection === sectionMap[link.label];
    }

    if (link.path === '/') {
      return false;
    }

    return location.pathname === link.path || location.pathname.startsWith(link.path + '/');
  };

  return (
    <>
      <header id="main-navbar" className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="container navbar__inner">

          {/* Logo */}
          <div
            className="navbar__logo"
            onDoubleClick={(e) => {
              e.preventDefault();
              closeNav();
              navigate('/admin');
            }}
            aria-label="Ritesh Kumar Panda — Home"
          >
            <div className="navbar__logo-content">
              <Link to="/" onClick={closeNav} className="navbar__logo-text">
                Ritesh Kumar Panda
              </Link>
              <button
                type="button"
                className="navbar__logo-dot"
                title="Admin Panel"
                aria-label="Admin Panel"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeNav();
                  navigate('/admin');
                }}
              >
                .
              </button>
            </div>
          </div>

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
