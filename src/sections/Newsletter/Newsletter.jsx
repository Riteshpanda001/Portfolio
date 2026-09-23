import { useState } from 'react';
import { validateEmail } from '../../utils/validators';
import { subscribeNewsletter } from '../../services/contactService';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, error: err } = validateEmail(email);
    if (!isValid) { setError(err); return; }
    setLoading(true);
    setError('');
    try {
      await subscribeNewsletter(email);
      setSuccess(true);
    } catch {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="newsletter section">
      <div className="container">
        <div className="newsletter__inner card">
          <h2 className="newsletter__title">Stay in the loop 📬</h2>
          <p className="newsletter__sub">
            Get notified when I publish new articles, projects, or tutorials.
            No spam, ever. Unsubscribe anytime.
          </p>

          {success ? (
            <p className="newsletter__success">🎉 You're subscribed! Thanks for joining.</p>
          ) : (
            <form id="newsletter-form" className="newsletter__form" onSubmit={handleSubmit} noValidate>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="your@email.com"
                aria-label="Email address"
                className={error ? 'newsletter__input newsletter__input--error' : 'newsletter__input'}
              />
              <button type="submit" className="btn btn--primary btn--md" disabled={loading}>
                {loading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
          {error && <p className="newsletter__error">{error}</p>}
        </div>
      </div>
    </section>
  );
}
