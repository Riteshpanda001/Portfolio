import './SectionTitle.css';

// ============================================================
// SectionTitle — consistent heading block for every page section
// ============================================================

/**
 * @param {string}  title       Main heading text
 * @param {string}  subtitle    Optional sub-text below the heading
 * @param {string}  badge       Optional pill badge shown above the heading
 * @param {'left'|'center'|'right'} align
 * @param {boolean} divider     Show the gradient underline divider
 */
export default function SectionTitle({
  title,
  subtitle,
  badge,
  align   = 'center',
  divider = true,
  className = '',
}) {
  return (
    <div className={`section-title section-title--${align} ${className}`}>
      {badge && <span className="section-title__badge badge">{badge}</span>}

      <h2 className="section-title__heading">
        {title}
      </h2>

      {divider && (
        <span
          className="section-title__divider"
          aria-hidden="true"
          style={{ marginLeft: align === 'left' ? 0 : align === 'right' ? 'auto' : 'auto', marginRight: align === 'right' ? 0 : 'auto' }}
        />
      )}

      {subtitle && (
        <p className="section-title__subtitle">{subtitle}</p>
      )}
    </div>
  );
}
