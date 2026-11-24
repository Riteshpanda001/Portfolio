// ============================================================
// Application-wide constants
// ============================================================

export const SITE_NAME = 'Ritesh Kumar Panda';
export const SITE_ROLE = 'AI/ML Engineer & Full-Stack Developer';
export const SITE_EMAIL = 'riteshkumarpanda001@gmail.com';
export const SITE_PHONE = '+91 9692229676';
export const SITE_GITHUB = 'https://github.com/Riteshpanda001';
export const SITE_LINKEDIN = 'https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a';
export const SITE_TWITTER = 'https://twitter.com/riteshpanda';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Resolves a media or image URL to ensure compatibility across local dev and production.
 * Handles relative /media/* paths, absolute URLs, and transforms legacy localhost URLs in production.
 */
export const getMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('blob:')) return url;
  if (url.startsWith('https://')) return url;

  const backendOrigin = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

  if (url.startsWith('http://localhost:5000') || url.startsWith('http://127.0.0.1:5000')) {
    if (import.meta.env.PROD && import.meta.env.VITE_API_URL) {
      return url.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000/, backendOrigin);
    }
    return url;
  }

  if (url.startsWith('/media/')) {
    return `${backendOrigin}${url}`;
  }

  return url;
};

export const PUBLIC_NAV_LINKS = [
  { label: 'Home',       id: 'home',       path: '/' },
  { label: 'About',      id: 'about',      path: '/about' },
  { label: 'Skills',     id: 'skills',     path: '/skills' },
  { label: 'Projects',   id: 'projects',   path: '/projects' },
  { label: 'Experience', id: 'experience', path: '/experience' },
  { label: 'Contact',    id: 'contact',    path: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard',             id: 'dashboard'  },
  { label: 'About Me',              id: 'about'       },
  { label: 'Skills & Technologies', id: 'skills'      },
  { label: 'Projects',              id: 'projects'    },
  { label: 'Experience',            id: 'experience'  },
  { label: 'Messages',              id: 'messages'    },
];

// Backward compatibility alias
export const NAV_LINKS = PUBLIC_NAV_LINKS;

export const SOCIAL_LINKS = [
  { label: 'GitHub',   url: SITE_GITHUB,   icon: 'github' },
  { label: 'LinkedIn', url: SITE_LINKEDIN, icon: 'linkedin' },
  { label: 'Email',    url: `mailto:${SITE_EMAIL}`, icon: 'mail' },
];

export const SKILL_CATEGORIES = [
  'Machine Learning',
  'Data Analytics',
  'Web Development',
  'Frontend',
  'DevOps & Tools',
  'Other',
];

export const PROJECT_FILTERS = [
  'All',
  'AI/ML',
  'Generative AI',
  'Data Science',
  'Data Analysis',
  'Web Development',
];

export const PAGINATION_LIMIT = 6;

export const TOAST_DURATION = 4000; // ms
