// ============================================================
// Date formatting utilities
// ============================================================

/**
 * Format an ISO date string to a human-readable month + year.
 * @param {string} dateStr  ISO date string, e.g. "2023-06-01"
 * @returns {string}        e.g. "June 2023"
 */
export function formatMonthYear(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Format an ISO date string to short month + year.
 * @param {string} dateStr
 * @returns {string}  e.g. "Jun 2023"
 */
export function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Format an ISO date string to a full date.
 * @param {string} dateStr
 * @returns {string}  e.g. "June 15, 2023"
 */
export function formatFullDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Calculate duration between two ISO date strings.
 * Pass null / undefined as end for "Present".
 * @param {string} start
 * @param {string|null} end
 * @returns {string}  e.g. "1 yr 3 mos"
 */
export function calcDuration(start, end) {
  if (!start) return '';
  const from = new Date(start);
  const to   = end ? new Date(end) : new Date();

  let months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());

  if (months < 0) months = 0;

  const years = Math.floor(months / 12);
  const rem   = months % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rem   > 0) parts.push(`${rem} mo${rem > 1 ? 's' : ''}`);

  return parts.join(' ') || 'Less than a month';
}

/**
 * Return "X time ago" string from an ISO date.
 * @param {string} dateStr
 * @returns {string}
 */
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);

  const intervals = [
    { label: 'year',   secs: 31536000 },
    { label: 'month',  secs: 2592000 },
    { label: 'week',   secs: 604800 },
    { label: 'day',    secs: 86400 },
    { label: 'hour',   secs: 3600 },
    { label: 'minute', secs: 60 },
  ];

  for (const { label, secs } of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }

  return 'Just now';
}
