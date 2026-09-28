import { useState }         from 'react';
import SectionTitle          from '../../components/SectionTitle/SectionTitle';
import Button                from '../../components/Button/Button';
import { validateContactForm } from '../../utils/validators';
import { sendContactMessage } from '../../services/contactService';
import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN } from '../../utils/constants';
import { usePortfolio } from '../../context/PortfolioContext';
import './Contact.css';

// ============================================================
// Contact Page
// ============================================================

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { openGmailModal }    = usePortfolio();
  const [form, setForm]       = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: errs } = validateContactForm(form);
    if (!isValid) { setErrors(errs); return; }

    setLoading(true);
    setApiError('');
    try {
      await sendContactMessage(form);
      setSuccess(true);
      setForm(INITIAL);
    } catch {
      setApiError('Failed to send message. Please try emailing me directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-page" className="section">
      <div className="container">
        <SectionTitle badge="Contact" title="Get In Touch" subtitle="Have a project in mind or just want to say hi? I'd love to hear from you." />

        <div className="contact-page__grid">
          {/* Info */}
          <div className="contact-page__info animate-fadeInUp">
            <div className="contact-page__info-item card">
              <div className="contact-page__info-icon-box" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="contact-page__info-content">
                <h4>Email</h4>
                <button
                  type="button"
                  onClick={openGmailModal}
                  className="contact-page__info-link"
                >
                  {SITE_EMAIL}
                </button>
              </div>
            </div>

            <div className="contact-page__info-item card">
              <div className="contact-page__info-icon-box" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-page__info-content">
                <h4>Phone</h4>
                <a href="tel:+919692229676" className="contact-page__info-link">
                  +91 9692229676
                </a>
              </div>
            </div>

            <div className="contact-page__info-item card">
              <div className="contact-page__info-icon-box" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-page__info-content">
                <h4>Location</h4>
                <p className="contact-page__info-text">Berhampur, Odisha, India</p>
              </div>
            </div>
            <div className="contact-page__socials-section card">
              <h4 className="contact-page__socials-title">Connect on social</h4>
              <div className="contact-page__socials-icons">
                <a
                  href={SITE_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-page__social-circle"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a
                  href={SITE_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-page__social-circle"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={openGmailModal}
                  className="contact-page__social-circle"
                  title="Email"
                  aria-label="Email"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-page__form-wrap animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            {success ? (
              <div className="contact-page__success card">
                <div className="contact-page__success-icon">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <Button variant="secondary" onClick={() => setSuccess(false)} size="sm">Send Another</Button>
              </div>
            ) : (
              <form id="contact-form" className="contact-form card" onSubmit={handleSubmit} noValidate>
                <h3 className="contact-form__heading">Send a Message</h3>

                <div className="contact-form__row">
                  <div className={`contact-form__field ${errors.name ? 'contact-form__field--error' : ''}`}>
                    <label htmlFor="contact-name">Name *</label>
                    <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" />
                    {errors.name && <span className="contact-form__error">{errors.name}</span>}
                  </div>
                  <div className={`contact-form__field ${errors.email ? 'contact-form__field--error' : ''}`}>
                    <label htmlFor="contact-email">Email *</label>
                    <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                    {errors.email && <span className="contact-form__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input id="contact-subject" type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Project Inquiry" />
                </div>

                <div className={`contact-form__field ${errors.message ? 'contact-form__field--error' : ''}`}>
                  <label htmlFor="contact-message">Message *</label>
                  <textarea id="contact-message" name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." />
                  {errors.message && <span className="contact-form__error">{errors.message}</span>}
                </div>

                {apiError && <p className="contact-form__api-error">{apiError}</p>}

                <Button type="submit" loading={loading} fullWidth>
                  {loading ? 'Sending…' : 'Send Message →'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
