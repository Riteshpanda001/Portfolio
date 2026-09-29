import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import nistCert    from '../../assets/images/certificates/nist-certificate.jpg';
import './Certifications.css';

// ============================================================
// Training & Learning Data
// ============================================================

const TRAININGS = [
  {
    id:          'nist-data-science',
    title:       'Data Science & Data Analysis Using Python',
    institution: 'NIST University',
    location:    'Institute Park, Berhampur, Odisha',
    type:        'Summer Course',
    dateRange:   '20 May 2025 – 11 June 2025',
    status:      'Completed',
    description:
      'Successfully completed a summer course focused on Data Science and Data Analysis using Python, building a foundation in Python-based data analysis and data science concepts.',
    learnings: [
      'Python-based data analysis',
      'Data Science fundamentals',
      'Data analysis workflows',
      'Data processing and interpretation',
      'Practical application of Python for data analysis',
    ],
    skills: ['Python', 'Data Science', 'Data Analysis', 'Data Processing'],
    certificate: nistCert,
  },
];

// ============================================================
// Certificate Modal
// ============================================================

function CertModal({ src, alt, onClose }) {
  return (
    <div
      className="cert-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate preview"
    >
      <div className="cert-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="cert-modal-close"
          onClick={onClose}
          aria-label="Close certificate preview"
        >
          ✕
        </button>
        <img src={src} alt={alt} className="cert-modal-img" />
      </div>
    </div>
  );
}

// ============================================================
// Training Card
// ============================================================

function TrainingCard({ item, index }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article
        className="exp-card tr-card animate-fadeInUp"
        style={{ animationDelay: `${index * 0.12}s` }}
      >
        {/* Timeline dot */}
        <div className="exp-card__dot" aria-hidden="true" />

        {/* ── Two-column layout ─────────────────────────── */}
        <div className="tr-card__body">

          {/* LEFT — course info */}
          <div className="tr-card__info">
            <div className="exp-card__header">
              <div className="exp-card__left">
                <h3 className="exp-card__role">{item.title}</h3>
                <div className="exp-card__meta">
                  <span className="exp-card__company">{item.institution}</span>
                  <span className="exp-card__badge">{item.type}</span>
                </div>
                <span className="exp-card__date">{item.dateRange}</span>
              </div>
              <div className="exp-card__right">
                <span className="tr-card__status-pill">{item.status}</span>
              </div>
            </div>

            <div className="exp-card__divider" />

            <p className="exp-card__desc">{item.description}</p>

            <p className="tr-card__learned-title">WHAT I LEARNED</p>
            <ul className="exp-card__bullets">
              {item.learnings.map((point, i) => (
                <li key={i} className="exp-card__bullet">
                  <span className="exp-card__bullet-arrow" aria-hidden="true">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="exp-card__tags">
              {item.skills.map((skill) => (
                <span key={skill} className="exp-card__tag">{skill}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — certificate preview */}
          <div className="tr-card__preview">
            <button
              className="tr-card__img-btn"
              onClick={() => setModalOpen(true)}
              aria-label="Open certificate preview"
            >
              <img
                src={item.certificate}
                alt={`${item.institution} — ${item.title}`}
                className="tr-card__cert-img"
              />
            </button>
            <button
              className="tr-card__view-btn"
              onClick={() => setModalOpen(true)}
            >
              View Certificate →
            </button>
          </div>

        </div>
      </article>

      {modalOpen && (
        <CertModal
          src={item.certificate}
          alt={`${item.institution} certificate`}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

// ============================================================
// Page Component — exported as default (route still /certifications)
// ============================================================

export default function TrainingAndLearning() {
  return (
    <section id="training-page" className="section exp-page">
      <div className="container">

        <SectionTitle
          badge="PROFESSIONAL LEARNING"
          title="Training & Learning"
          subtitle="Building practical knowledge through focused technical training."
        />

        <div className="exp-timeline">
          {TRAININGS.map((item, i) => (
            <TrainingCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
