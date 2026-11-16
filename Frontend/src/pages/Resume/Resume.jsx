import { usePortfolio } from '../../context/PortfolioContext';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button from '../../components/Button/Button';
import './Resume.css';

// ============================================================
// Resume Page — Official PDF Resume Viewer + Actions
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

        <div className="resume-page__actions">
          <Button
            href={resumeUrl}
            target="_blank"
            download="Ritesh_Kumar_Panda_Resume.pdf"
            icon="↓"
            iconPosition="right"
            size="lg"
          >
            Download PDF
          </Button>
          <Button
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            icon="↗"
            iconPosition="right"
          >
            Open in New Tab
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Get in Touch →
          </Button>
        </div>

        {/* Embedded PDF Document Display */}
        <div className="resume-pdf-card animate-fadeInUp">
          <div className="resume-pdf-toolbar">
            <div className="resume-pdf-doc-meta">
              <span className="resume-pdf-badge">PDF DOCUMENT</span>
              <span className="resume-pdf-filename">Ritesh_Kumar_Panda_Resume.pdf</span>
            </div>
            <div className="resume-pdf-toolbar-btns">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-pdf-btn"
                title="Open PDF in new window"
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

          <div className="resume-pdf-frame-wrapper">
            <object
              data={`${resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
              type="application/pdf"
              className="resume-pdf-frame"
            >
              <iframe
                src={`${resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
                title="Ritesh Kumar Panda Resume PDF"
                className="resume-pdf-frame"
              >
                <div className="resume-pdf-fallback">
                  <p>Your browser doesn't support inline PDF previews.</p>
                  <a
                    href={resumeUrl}
                    download="Ritesh_Kumar_Panda_Resume.pdf"
                    className="btn btn--primary btn--md"
                  >
                    Download Resume PDF ↓
                  </a>
                </div>
              </iframe>
            </object>
          </div>
        </div>
      </div>
    </section>
  );
}
