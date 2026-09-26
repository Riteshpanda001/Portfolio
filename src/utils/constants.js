// ============================================================
// Application-wide constants
// ============================================================

export const SITE_NAME = 'Ritesh Kumar Panda';
export const SITE_ROLE = 'Machine Learning Engineer | Data Analyst | Web Developer';
export const SITE_EMAIL = 'riteshkumar001@gmail.com';
export const SITE_GITHUB = 'https://github.com/Riteshpanda001';
export const SITE_LINKEDIN = 'https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a';
export const SITE_TWITTER = 'https://twitter.com/riteshpanda';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Skills',     path: '/skills' },
  { label: 'Projects',   path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact',    path: '/contact' },
];

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
  'Machine Learning',
  'Data Analytics',
  'Web Development',
  'Web',
  'Backend',
];

export const PAGINATION_LIMIT = 6;

export const TOAST_DURATION = 4000; // ms
