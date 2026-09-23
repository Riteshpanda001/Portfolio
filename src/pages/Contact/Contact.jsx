import { useState }         from 'react';
import SectionTitle          from '../../components/SectionTitle/SectionTitle';
import Button                from '../../components/Button/Button';
import { validateContactForm } from '../../utils/validators';
import { sendContactMessage } from '../../services/contactService';
import { SITE_EMAIL, SOCIAL_LINKS } from '../../utils/constants';
import './Contact.css';

// ============================================================
// Contact Page
// ============================================================

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
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
              <span>📧</span>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              </div>
            </div>
            <div className="contact-page__info-item card">
              <span>📍</span>
              <div>
                <h4>Location</h4>
                <p>Bhubaneswar, India</p>
              </div>
            </div>
            <div className="contact-page__info-item card">
              <span>🕐</span>
              <div>
                <h4>Availability</h4>
                <p>Open to freelance &amp; full-time</p>
              </div>
            </div>
            <div className="contact-page__socials">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.url} className="badge badge-mint contact-page__social" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
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
                    <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ritesh Panda" />
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
                  <input id="contact-subject" type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry" />
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
