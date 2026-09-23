import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button        from '../../components/Button/Button';
import './Resume.css';

// ============================================================
// Resume Page
// ============================================================

export default function Resume() {
  const resumeUrl = '/assets/resume/Ritesh_Panda_Resume.pdf';

  return (
    <section id="resume-page" className="section">
      <div className="container">
        <SectionTitle
          badge="Resume"
          title="My Resume"
          subtitle="Download or view my latest resume to learn more about my experience and skills."
        />

        <div className="resume-page__actions">
          <Button href={resumeUrl} icon="↓" iconPosition="right" size="lg">
            Download PDF
          </Button>
          <Button href={resumeUrl} variant="secondary" size="lg" icon="↗" iconPosition="right">
            Open in Browser
          </Button>
        </div>

        {/* PDF Viewer embed */}
        <div className="resume-page__viewer card">
          <div className="resume-page__viewer-placeholder">
            <span className="resume-page__viewer-icon" aria-hidden="true">📄</span>
            <h3>Resume Preview</h3>
            <p>Upload <code>Ritesh_Panda_Resume.pdf</code> to <code>public/assets/resume/</code> to see a live preview here.</p>
            <Button href={resumeUrl} variant="secondary" size="sm">View PDF</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
