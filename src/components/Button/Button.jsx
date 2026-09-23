import './Button.css';

// ============================================================
// Button — reusable CTA button component
// ============================================================

/**
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export default function Button({
  children,
  variant = 'primary',
  size    = 'md',
  href,
  to,
  disabled = false,
  loading  = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth  ? 'btn--full'    : '',
    loading    ? 'btn--loading' : '',
    disabled   ? 'btn--disabled': '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && icon && iconPosition === 'left'  && <span className="btn__icon">{icon}</span>}
      <span className="btn__label">{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="btn__icon">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
