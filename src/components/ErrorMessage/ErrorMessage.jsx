import './ErrorMessage.css';

// ============================================================
// ErrorMessage — display API / runtime errors gracefully
// ============================================================

export default function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
  compact = false,
}) {
  return (
    <div
      className={`error-message ${compact ? 'error-message--compact' : ''}`}
      role="alert"
      aria-live="assertive"
    >
      <span className="error-message__icon" aria-hidden="true">⚠</span>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__retry btn btn--secondary btn--sm" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
