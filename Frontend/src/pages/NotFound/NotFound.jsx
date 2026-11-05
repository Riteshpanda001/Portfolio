import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

// ============================================================
// 404 — Not Found Page
// ============================================================
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound__glow notfound__glow--left"  aria-hidden="true" />
      <div className="notfound__glow notfound__glow--right" aria-hidden="true" />

      <div className="notfound__content">
        {/* Animated 404 number */}
        <div className="notfound__code" aria-label="404">
          <span className="notfound__digit">4</span>
          <span className="notfound__circle">0</span>
          <span className="notfound__digit">4</span>
        </div>

        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__sub">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="notfound__actions">
          <button
            type="button"
            className="notfound__btn notfound__btn--primary"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
          <Link to="/" className="notfound__btn notfound__btn--secondary">
            🏠 Back to Portfolio
          </Link>
        </div>

        {/* Helpful links */}
        <div className="notfound__links">
          <p className="notfound__links-label">Or explore:</p>
          <div className="notfound__links-row">
            <Link to="/projects"   className="notfound__quick-link">Projects</Link>
            <Link to="/skills"     className="notfound__quick-link">Skills</Link>
            <Link to="/experience" className="notfound__quick-link">Experience</Link>
            <Link to="/contact"    className="notfound__quick-link">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

