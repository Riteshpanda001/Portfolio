// ============================================================
// Application-wide constants
// ============================================================

export const SITE_NAME = 'Ritesh Kumar Panda';
export const SITE_ROLE = 'Full-Stack Developer';
export const SITE_EMAIL = 'ritesh@example.com';
export const SITE_GITHUB = 'https://github.com/riteshpanda';
export const SITE_LINKEDIN = 'https://linkedin.com/in/riteshpanda';
export const SITE_TWITTER = 'https://twitter.com/riteshpanda';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Skills',     path: '/skills' },
  { label: 'Projects',   path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact',    path: '/contact' },
  { label: 'Resume',     path: '/resume' },
];

export const SOCIAL_LINKS = [
  { label: 'GitHub',   url: SITE_GITHUB,   icon: 'github' },
  { label: 'LinkedIn', url: SITE_LINKEDIN, icon: 'linkedin' },
  { label: 'Twitter',  url: SITE_TWITTER,  icon: 'twitter' },
  { label: 'Email',    url: `mailto:${SITE_EMAIL}`, icon: 'mail' },
];

export const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
  'Other',
];

export const PROJECT_FILTERS = [
  'All',
  'Web',
  'Mobile',
  'Backend',
  'Open Source',
];

export const PAGINATION_LIMIT = 6;

export const TOAST_DURATION = 4000; // ms
