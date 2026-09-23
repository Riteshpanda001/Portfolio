import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import { useScroll } from '../../hooks/useScroll';
import { usePortfolio } from '../../context/PortfolioContext';
import './Navbar.css';

// ============================================================
// Navbar
// ============================================================

export default function Navbar() {
  const { scrollY, isAtTop }    = useScroll();
  const { navOpen, toggleNav, closeNav } = usePortfolio();
  const scrolled = scrollY > 20;

  // Close nav on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) closeNav(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeNav]);

  return (
    <>
      <header id="main-navbar" className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeNav} aria-label="Ritesh Kumar Panda — Home">
            <div className="navbar__logo-content">
              <img src="/rkp-icon.svg" alt="RKP Logo" className="navbar__logo-badge" />
              <span className="navbar__logo-text">
                Ritesh Kumar Panda<span className="navbar__logo-dot">.</span>
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="navbar__nav" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="navbar__actions">
            <Link to="/contact" className="btn btn--primary btn--sm navbar__cta">
              Hire Me
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
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`
              }
              onClick={closeNav}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {navOpen && (
        <div className="nav-backdrop" onClick={closeNav} aria-hidden="true" />
      )}
    </>
  );
}
