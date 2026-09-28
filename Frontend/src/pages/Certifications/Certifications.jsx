import SectionTitle    from '../../components/SectionTitle/SectionTitle';
import { formatMonthYear } from '../../utils/formatDate';
import './Certifications.css';

const DEMO_CERTS = [
  { _id: '1', name: 'AWS Certified Solutions Architect',   issuer: 'Amazon Web Services', date: '2023-08-01', credentialUrl: '#', badge: '☁️' },
  { _id: '2', name: 'Meta Front-End Developer Certificate', issuer: 'Meta / Coursera',      date: '2023-03-01', credentialUrl: '#', badge: '⚛️' },
  { _id: '3', name: 'Google Cloud Professional',            issuer: 'Google',               date: '2022-11-01', credentialUrl: '#', badge: '🌐' },
  { _id: '4', name: 'MongoDB Developer Associate',          issuer: 'MongoDB University',   date: '2022-07-01', credentialUrl: '#', badge: '🍃' },
];

export default function Certifications() {
  return (
    <section id="certifications-page" className="section">
      <div className="container">
        <SectionTitle badge="Certifications" title="My Credentials" subtitle="Industry certifications that validate my expertise." />
        <div className="certs-grid stagger">
          {DEMO_CERTS.map((cert, i) => (
            <article key={cert._id} className="cert-card card animate-fadeInUp" style={{ animationDelay: `${i*0.1}s` }}>
              <div className="cert-card__badge" aria-hidden="true">{cert.badge}</div>
              <h3 className="cert-card__name">{cert.name}</h3>
              <p className="cert-card__issuer">{cert.issuer}</p>
              <p className="cert-card__date">{formatMonthYear(cert.date)}</p>
              <a href={cert.credentialUrl} className="cert-card__link" target="_blank" rel="noopener noreferrer">
                View Credential →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
