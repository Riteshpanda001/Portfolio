import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================
// useScroll — scroll position, direction, and visibility
// ============================================================

/**
 * Returns:
 *  - scrollY          current vertical scroll position
 *  - scrollDirection  'up' | 'down'
 *  - isAtTop          true if scrollY === 0
 *  - isVisible        true when scrolling up (useful for sticky navbars)
 *  - scrollToTop      helper to scroll back to the top
 *  - scrollToElement  helper to scroll to a DOM element by id
 */
export function useScroll() {
  const [scrollY, setScrollY]           = useState(0);
  const [scrollDirection, setDirection] = useState('down');
  const [isAtTop, setIsAtTop]           = useState(true);
  const [isVisible, setIsVisible]       = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsAtTop(y === 0);

      if (y < lastY) {
        setDirection('up');
        setIsVisible(true);
      } else if (y > lastY && y > 60) {
        setDirection('down');
        setIsVisible(false);
      }
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToElement = useCallback((elementId, offset = 80) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return { scrollY, scrollDirection, isAtTop, isVisible, scrollToTop, scrollToElement };
}

// ============================================================
// useInView — trigger animations when element enters viewport
// ============================================================

/**
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 * @returns {[React.RefObject, boolean]}
 */
export function useInView({ threshold = 0.15, rootMargin = '0px', once = true } = {}) {
  const ref             = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
