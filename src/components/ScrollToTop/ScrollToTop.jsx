import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import './ScrollToTop.css';

// ============================================================
// ScrollToTop
// — auto-scrolls to top on route change
// — shows a "back to top" FAB after scrolling down
// ============================================================

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { scrollY, scrollToTop } = useScroll();
  const [visible, setVisible] = useState(false);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Show FAB after 400px of scroll
  useEffect(() => {
    setVisible(scrollY > 400);
  }, [scrollY]);

  return (
    <button
      id="scroll-to-top-btn"
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
