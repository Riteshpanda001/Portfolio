import './Loading.css';

// ============================================================
// Loading — full-page or inline spinner
// ============================================================

/** @param {'page'|'section'|'inline'} variant */
export default function Loading({ variant = 'section', message = 'Loading...' }) {
  return (
    <div className={`loading loading--${variant}`} role="status" aria-label={message}>
      <div className="loading__ring" aria-hidden="true">
        <div />
        <div />
        <div />
        <div />
      </div>
      {variant !== 'inline' && (
        <p className="loading__message">{message}</p>
      )}
    </div>
  );
}
