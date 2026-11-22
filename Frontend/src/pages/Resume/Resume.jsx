import { usePortfolio } from '../../context/PortfolioContext';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Resume.css';

// ============================================================
// Resume Page — Official PDF Resume Actions
// ============================================================

export default function Resume() {
  const { profile } = usePortfolio();
  const resumeUrl = profile?.resumeUrl || '/Ritesh_Kumar_Panda_Resume.pdf';

  return (
    <section id="resume-page" className="section">
      <div className="container">
        <SectionTitle
          badge="Curriculum Vitae"
          title="Official Resume"
          subtitle="Explore my complete qualifications, AI/ML engineering experience, education, and technical skill matrix."
        />

        {/* Action Card with Open Full Page & Download buttons */}
        <div className="resume-card animate-fadeInUp">
          <div className="resume-card__content">
            <div className="resume-card__icon-box">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <div className="resume-card__meta">
              <div className="resume-card__badge-row">
                <span className="resume-pdf-badge">PDF DOCUMENT</span>
              </div>
              <h3 className="resume-card__filename">Ritesh_Kumar_Panda_Resume.pdf</h3>
              <p className="resume-card__description">
                Official curriculum vitae highlighting AI/ML engineering, Full-Stack development, and project achievements.
              </p>
            </div>

            <div className="resume-card__actions">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-pdf-btn resume-pdf-btn--open"
                title="Open PDF in full page"
              >
                <span>Open Full Page</span> ↗
              </a>
              <a
                href={resumeUrl}
                download="Ritesh_Kumar_Panda_Resume.pdf"
                className="resume-pdf-btn resume-pdf-btn--primary"
                title="Download PDF directly"
              >
                <span>Download</span> ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
